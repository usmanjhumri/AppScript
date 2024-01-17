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

function doGet(e) {
  try {
    const contact_id = e.parameter.contact_id;

    if (!contact_id) {
      return ContentService.createTextOutput(
        "Contact_id is required"
      ).setMimeType(ContentService.MimeType.JSON);
    }
    Logger.log(contact_id, " contact_id");
    const sheet = getSheetByName("hippatask");
    const getRange = sheet.getDataRange();
    const getValues = getRange.getValues();
    let rowData = null;
    for (let i of getValues) {
      if (getValues[0] === contact_id) {
        rowData = getValues[i];
        break;
      }
    }
    if (!rowData) {
      return ContentService.createTextOutput(
        "Contact_id not found"
      ).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput("Success").setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (error) {
    // Return an error response if there is an exception
    return ContentService.createTextOutput("Error: " + error).setMimeType(
      ContentService.MimeType.JSON
    );
  }
}
