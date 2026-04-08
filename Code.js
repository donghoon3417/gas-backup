const SHEET_NAME = "운행일지";
//테스트
// 웹앱
function doGet() {
  return HtmlService
    .createTemplateFromFile("index")
    .evaluate();
}

// include (🔥 app.html 불러오기용)
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// 저장
function saveDriveLog(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const today = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd");

  if (!data.km || data.km === "") {
    throw new Error("차량,운행자,km는 필수입니다.");
  }

const row = sheet.getLastRow() + 1;

sheet.getRange(row, 1, 1, 7).setValues([[
  today,
  data.car,
  data.name,
  data.start || "",
  data.end || "",
  Number(data.km),
  data.note || ""
]]);

  // km 서식
  sheet.getRange(row, 6).setNumberFormat('0" km"');
}

// 전체 데이터
function getAllLogs() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getDisplayValues();

  // 🔥 행 번호 추가
  return data.map((row, i) => [...row, i]);
}

function updateDriveLog(rowIndex, data) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

sheet.getRange(rowIndex + 1, 2, 1, 6).setValues([[
  data.car,
  data.name,
  data.start || "",
  data.end || "",
  Number(data.km),
  data.note || ""
]]);
  // km 포맷 유지
  sheet.getRange(rowIndex + 1, 6).setNumberFormat('0" km"');
}

function deleteRow(rowIndex){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  sheet.deleteRow(rowIndex + 1);
}

