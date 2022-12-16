// Lấy ra tab hiện tại
let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
let btnStartProcess = document.getElementById('btnStartProcess');

// Lấy ra tab hiện tại
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);

  return tab;
};

// Khởi tạo sự kiện khi click vào bắt đầu
btnStartProcess.addEventListener('click', async () => {
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
  document.getElementById("msId638068244500163992").previousElementSibling.style.display = "none";
};
