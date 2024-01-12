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

// doPost Function start
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
// doPost Function end

// doGet Function start
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
// doGet Function end

// function doPost(e) {
//   try {
//     const data = JSON.parse(e.postData.contents);
//     Logger.log(data, ' data')
//     const sheet = getSheetByName('hippatask')

//     const contact_id = data.contact_id
//     // const firstName = data.first_name;
//     // const lastName = data.last_name;
//     // const phone = data.phone;
//     // const AuthorisedPersonLegalGuardian = data["Authorised Person (Legal Guardian)"];
//     // const AuthorisedPersonSignature = data["Authorised Person Signature"].url;
//     // const patientSignature = data["Patient  Signature "].url;
//     // const Relationship = data.Relationship
//     // const fullName = data.full_name;
//     // const NameofPatientPrinted = data["Name of Patient (Printed)"];
//     // const ConsentSignaturePatient = data["Consent Signature Patient"].url;
//     // const WitnessName = data["Witness Name"];
//     // const WitnessSignature = data["Witness Signature"].url;
//     // const PhysicianName = data["Physician Name"]
//     sheet.appendRow([contact_id, JSON.stringify(data)]);
//     // firstName, lastName, phone, AuthorisedPersonLegalGuardian, AuthorisedPersonSignature, patientSignature, Relationship, fullName, NameofPatientPrinted, ConsentSignaturePatient, WitnessName, WitnessSignature, PhysicianName
//     // sheet.appendRow([JSON.stringify(data)]);

//     return ContentService.createTextOutput('Success').setMimeType(ContentService.MimeType.JSON)
//   }
//   catch (error) {
//     return ContentService.createTextOutput('error', error).setMimeType(ContentService.MimeType.JSON)

//   }

// }

// const deployedWebAppUrl = 'https://script.google.com/macros/s/AKfycbz_4r_gUY4f0dHDm7uX_CMsTLmzvhThcv1RuWPILMYCdrAzw07435195x_P1GhAVYdVmg/exec';

// function generateLinkUrl(contact_id) {
//   return `${deployedWebAppUrl}?contact_id=${contact_id}`;
// }
