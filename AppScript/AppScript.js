function getSheetByName(name) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  return sheet;
}

function getRows(sheet) {
  var rows = sheet.getDataRange().getValues();
  return rows;
}

function updateRowByIndex(sheet, rowIndex, newValues) {
  const range = sheet.getRange(rowIndex, 1, 1, newValues.length);
  range.setValues([newValues]);
}

function appendDate(row) {
  row.push(new Date().toLocaleString());
  return row;
}

function appendRow(sheet, row, skipdt = false) {
  if (!skipdt) {
    row = appendDate(row);
  }

  sheet.appendRow(row);
}

function addLogs(logdata, isImportant = false) {
  try {
    let sheet = getSheetByName("Logs");
    appendRow(sheet, logdata);
  } catch (error) {
    return error;
  }
}

function doPost(e) {}

function doGet(e) {
  const parms = e.parameters || {};
  return ContentService.createTextOutput(JSON.stringify(parms)).setMimeType(
    ContentService.MimeType.JSON
  );
}
