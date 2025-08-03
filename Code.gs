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
  let address = 'Fetching address...';

  try {
    // 緯度経度から住所を取得する関数を呼び出し
    address = getAddressFromCoordinates(latitude, longitude);
  } catch (err) {
    console.error("Failed to fetch address:", err);
    address = 'Failed to fetch address';
  }

  // 新しい行としてデータを追加
  sheet.appendRow([timestamp, name, inOut, latitude, longitude, address]);

  return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Finish registration' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getAddressFromCoordinates(lat, lng) {
  // スクリプトプロパティからAPIキーを取得する場合:
  const apiKey = PropertiesService.getScriptProperties().getProperty('Maps_API_KEY');
  if (!apiKey) {
    throw new Error("Google Maps API Key is not set in Script Properties.");
  }
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&language=ja`;

  const response = UrlFetchApp.fetch(url);
  const json = JSON.parse(response.getContentText());

  if (json.status === 'OK' && json.results.length > 0) {
    // 最も正確な結果 (通常は results[0]) の formatted_address を返す
    return json.results[0].formatted_address;
  } else if (json.status === 'ZERO_RESULTS') {
    return 'Not found';
  } else {
    throw new Error(`Geocoding API Error: ${json.status} - ${json.error_message || ''}`);
  }
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
