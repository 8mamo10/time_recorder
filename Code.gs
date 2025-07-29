// スプレッドシートのIDをここに設定
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // 例: 1abcdefg_your_spreadsheet_id

// シート名を指定
const SHEET_NAME = 'Record'; // データ追加先のシート名

function doPost(e) {
  // POSTリクエストで送られてきたデータを取得
  const name = e.parameter.name;
  const inOut = e.parameter.inOut;
  const latitude = e.parameter.latitude;
  const longitude = e.parameter.longitude;

  if (!name || !inOut || !latitude || !longitude) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Missing parameters' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);

  // タイムスタンプを追加
  const timestamp = new Date();

  // 新しい行としてデータを追加
  sheet.appendRow([timestamp, name, inOut, latitude, longitude]);

  return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Finish registration' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ウェブアプリケーションとしてデプロイするための関数 (初回のみ実行)
function doGet(e) {
  // この関数はGETリクエストがあった場合に実行されます
  // 通常はここでHTMLファイルを提供します
  return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // <iframe>で埋め込む場合などに必要
}

// HTMLファイルの内容を返す関数
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}