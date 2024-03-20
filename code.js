function doPost(e) {
    var ss = SpreadsheetApp.openById('AKfycby_hlV1Aj4j93tCOGJiQqyet1pO6aFOFm7CQ0z8Q_uygfBZY7DB2-rMS6CdeEhRdbo');
    var sheet = ss.getSheetByName('Sheet1'); // Change 'Sheet1' to the name of your sheet
    var data = JSON.parse(e.postData.contents);

    var rowData = [
        new Date(),
        data.username,
        data.password,
        data.email
    ];

    sheet.appendRow(rowData);

    return ContentService.createTextOutput('Registration successful').setMimeType(ContentService.MimeType.TEXT);
}
