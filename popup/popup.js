// Lấy ra tab hiện tại
async function getCurrentTab() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  return tab;
};

// Khởi tạo sự kiện khi click vào bắt đầu
$("#btnStartProcess").off("click");
$("#btnStartProcess").on("click", async function(){
  let tab = await getCurrentTab();

  let field = "TS";

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: bindingData,
    args: [field]
  });
});

// Binding dữ liệu cho ô 
function bindingData(field){
  debugger
  $("#mainSideBar").hide();
};
