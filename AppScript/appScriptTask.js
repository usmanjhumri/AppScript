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

data.first_name,
  data.last_name,
  data.phone,
  data["Authorized Person (Legal Guardian)"],
  data["Patient Signature "].url,
  data.Relationship;

data.full_name;

// script for survey to get data from google sheet
const contactId = prompt('Enter contactId:');

// Check if the user canceled the prompt or entered an empty string
if (contactId === null || contactId.trim() === '') {
  console.log('Invalid contactId provided. Operation canceled.');
} else {
  const url = `https://script.google.com/macros/s/AKfycbz_4r_gUY4f0dHDm7uX_CMsTLmzvhThcv1RuWPILMYCdrAzw07435195x_P1GhAVYdVmg/exec?contact_id=${contactId}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Extracting specific fields
      const extractedData = {
        
        first_name: data.first_name,
        last_name: data.last_name,  
        full_name: data.full_name,
        phone: data.phone,
        AuthorizedPerson: data["Authorized Person (Legal Guardian)"],
        "Authorised Person Signature": data["Authorised Person Signature"]?.url,
        "Patient Signature": data["Patient Signature "]?.url,
        Relationship: data.Relationship,
        NameOfPatient: data["Name of Patient (Printed)"], 
        ConsentSignaturePatient : data["Consent Signature Patient"].url,
        WitnessName : data["Witness Name"],
        WitnessSignature :  data["Witness Signature"].url,
         PhysicianName : data["Physician Name"],
         PatientName : data["Patient Name"],
         Feedback :  data.Feedback,
         JerseyWeight : data["Jersey Weight Loss Clinic Representative"],
        // Add more fields as needed
      };

      // Log the extracted data to the console
      console.log('Extracted Data:', extractedData);

      // Assuming you want to set these values in some input fields, you can access them like this:
      const first_name = document.getElementById('first_name'); // Replace with your actual HTML element ID
      const last_name = document.getElementById('last_name');
      const phone = document.getElementById('phone');
      const authorisedPerson  document.querySelector('[data-q="authorised_person"]')
      // Add more input elements as needed

      // Set values in input fields
      first_name.value = extractedData.first_name;
      last_name.value = extractedData.last_name;
      phone.value = extractedData.phone;
        authorisedPerson.value = extractedData.AuthorizedPerson
        
      // Set values in more input fields as needed
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// end script for survey to get data from google sheet

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
