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

function baixarForm() {
  const TABLE_FORM = document.getElementById('table-form');
  const QTD_LINHAS_UTEIS = TABLE_FORM.rows.length - 1;
  const allCheckedRadios = document.querySelectorAll('td > input[type=radio]:checked');

  const filenameEl = document.getElementById('filename');
  if (!filenameEl) return;

  const filename = filenameEl.value + '.csv';
  const parsedText = tableDataToString(TABLE_FORM, allCheckedRadios);

  if (filename &&
      !!filename.trim() &&
      allCheckedRadios.length == QTD_LINHAS_UTEIS) download(filename, parsedText);
  else alert('Algo Incompleto');
}
