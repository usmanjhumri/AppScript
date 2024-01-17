function getSheetByName(name) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  return sheet;
}

function updateRowByIndex(sheet, rowIndex, newValues) {
  const range = sheet.getRange(rowIndex, 1, 1, newValues.length);
  range.setValues([newValues]);
}
function findRowIndex(data, contact_id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] == contact_id) {
      return i;
    }
  }
  return -1;
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    Logger.log(data, " data");
    const sheet = getSheetByName("hippatask");
    const contact_id = data.contact_id;

    const allData = sheet.getDataRange().getValues();
    const rowIndex = findRowIndex(allData, contact_id);

    if (rowIndex !== -1) {
      updateRowByIndex(sheet, rowIndex + 1, [contact_id, JSON.stringify(data)]);
    } else {
      sheet.appendRow([contact_id, JSON.stringify(data)]);
    }
    return ContentService.createTextOutput("Success").setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (error) {
    return ContentService.createTextOutput("error: " + error).setMimeType(
      ContentService.MimeType.JSON
    );
  }
}
