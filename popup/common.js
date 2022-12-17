// Lấy ra tab hiện tại
async function getCurrentTab() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    return tab;
};
  
// Gửi dữ liệu đến trang web xử lý
async function sendDataToWeb(data, funcName){
    let tab = await getCurrentTab();
  
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: funcName,
      args: [data]
    });
};

// Lưu lại dữ liệu 
function setData(data, callBack){
    chrome.storage.local.set({ QLTS_Data: data }).then(callBack(data));
}
  
// Lấy dữ liệu
function getData(callBack){
    chrome.storage.local.get(["QLTS_Data"]).then((result) => {
      callBack(result.QLTS_Data);
    });
}
