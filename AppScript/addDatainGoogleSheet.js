function getSheetByName(name) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  return sheet;
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    Logger.log(data, " data");
    const sheet = getSheetByName("getData");

    const contact_id = data.contact_id;
    const firstName = data.first_name;
    const lastName = data.last_name;
    const fullName = data.full_name;
    const email = data.email;
    const phone = data.phone;
    const address = data.address1;
    const city = data.city;
    const country = data.country;
    const StageName = data["Stage Name"];
    const Gender = data.Gender;
    const School = data.School;
    const SchoolJoin = School.join(" , ");
    const Signature = data.Signature.url;
    sheet.appendRow([
      contact_id,
      firstName,
      lastName,
      fullName,
      email,
      phone,
      address,
      city,
      country,
      StageName,
      Gender,
      SchoolJoin,
      Signature,
    ]);

    // sheet.appendRow([JSON.stringify(data)]);

    return ContentService.createTextOutput("Success").setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (error) {
    return ContentService.createTextOutput("error", error).setMimeType(
      ContentService.MimeType.JSON
    );
  }
}
