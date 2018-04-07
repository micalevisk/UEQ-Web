function download(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function tableDataToString(t, allCheckedRadios) {
  const arrAllData = Array.from(allCheckedRadios)
                          .map((el, i) => `${i+1},${el.value}`);
  return arrAllData.join('\r\n');
}

function downloadForm() {
  const allCheckedRadios = document.querySelectorAll('td > input[type=radio]:checked');

  const filenameEl = document.getElementById('filename');
  if (!filenameEl) return;

  const filename = filenameEl.value + '.csv';
  const parsedText = '# item row, scale\r\n' + tableDataToString(TABLE_FORM, allCheckedRadios);

  if (filename &&
      !!filename.trim() &&
      allCheckedRadios.length == questionnarieItems.length) download(filename, parsedText);
  else alert('Fill all fields');
}

function replaceSpaces(str, replacer='-') {
  return str.replace(/\s/g, replacer);
}

// building the table
const TABLE_FORM = document.getElementById('table-form').getElementsByTagName('tbody')[0];

for (let row=0; row < questionnarieItems.length; ++row) {

  const leftItem = questionnarieItems[row].left;
  const rightItem = questionnarieItems[row].right;
  const leftItemName = replaceSpaces(leftItem);
  const rightItemName = replaceSpaces(rightItem);

  const newRow = TABLE_FORM.insertRow(TABLE_FORM.rows.length);
  newRow.innerHTML += `
    <td>${leftItem}</td>
    <td><input name="${leftItemName}_${rightItemName}" value="-3" type="radio" required></td>
    <td><input name="${leftItemName}_${rightItemName}" value="-2" type="radio" required></td>
    <td><input name="${leftItemName}_${rightItemName}" value="-1" type="radio" required></td>
    <td><input name="${leftItemName}_${rightItemName}" value="0" type="radio" required></td>
    <td><input name="${leftItemName}_${rightItemName}" value="1" type="radio" required></td>
    <td><input name="${leftItemName}_${rightItemName}" value="2" type="radio" required></td>
    <td><input name="${leftItemName}_${rightItemName}" value="3" type="radio" required></td>
    <td>${rightItem}</td>
    <td>${row+1}</td>
  `;

}
