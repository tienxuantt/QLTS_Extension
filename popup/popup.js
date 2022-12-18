// Tự động thêm các bản ghi
var autoAdd = false;
// Index của bản ghi hiện tại đang thực thi
var indexActive = 0;

// Xử lý khi mới mở form
getData(function(data){
  if(data){
    afterImportFile(data);
  }
});

// Khởi tạo sự kiện tự động nhập liệu kế tiếp
$("#autoAdd").change(function() {
  autoAdd = this.checked;
});

// Nhập khẩu file
$("#importLink").on("click", function(){
  $("#importJson").click();   
});

// Sự kiện khi thay đổi
$("#importJson").on('change',function(e){
  var file =  e.target.files[0];
  var path = (window.URL || window.webkitURL).createObjectURL(file);

  readTextFile(path, function(text){
    try {
      var data = JSON.parse(text);

      setData(data, afterImportFile);
    } catch (error) {
      alert("File dữ liệu không hợp lệ!");
    }
  });
});

// Đọc nội dung file json
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();

    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }

    rawFile.send(null);
}

// Chuẩn bị dữ liệu trước khi binding
function prepareData(obj){
  addFixedAsset(obj);
}

// Mở form thêm mới
function openFormAdd(obj){
  showFormAdd(obj);
}

// Gọi tới bản ghi tiếp theo
function executeNextData(){
    setTimeout(function(){
      if(autoAdd){
        $(".item-title:not(.success):first").next().click();
      }
    }, 6500);
}

// Cập nhật trạng thái sau khi thành công
function updateStatusData(){
  // Lấy dữ liệu để xóa bỏ một phần tử
  getData(function(data){
    if(data && data.Data){
      data.Data[indexActive].success = true;

      setData(data, (response) => {
        afterImportFile(response);

        // Gọi tới bản ghi tiếp theo
        executeNextData();
      });
    }
  });
}

// Xử lý khi nhận được thông báo thành công
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'success') {
      updateStatusData();
  }
});

// Thêm mới một tài sản
function addFixedAssetByIndex(index){
  // Lấy dữ liệu để binding
  getData(function(data){
    if(data && data.Data){
      let obj = {
        Data: data.Data[index],
        ColumnConfig: data.ColumnConfig
      };

      if(obj){
        // Mở form
        sendDataToWeb(obj, openFormAdd);

        // Truyền dữ liệu
        setTimeout(function(){
          sendDataToWeb(obj, prepareData);
        }, 6500);
      }
    }
  });
}

// Khởi tạo sự kiện khi click vào nhập
$(".list-item").on("click", ".action", function(){
    let index = $(this).parent().attr("index");

    // Lưu lại index đang thao tác
    indexActive = index;

    addFixedAssetByIndex(index);
});

// Khởi tạo sự kiện khi click vào nhập
$(".list-item").on("click", ".delete", function(){
    let index = $(this).parent().attr("index");

    // Lấy dữ liệu để xóa bỏ một phần tử
    getData(function(data){
      if(data && data.Data){
        data.Data.splice(index, 1);

        setData(data, (response) => {
          afterImportFile(response);
        });
      }
    });
});

// Xử lý sau khi import file
function afterImportFile(data){
  let totalRecords = data.Data.length;

  $(".total-record").find("b").text(totalRecords);
  $(".main-content").show();

  // Render dữ liệu
  renderListData(data);
}

/**
 * Xử lý render dữ liệu nhập khẩu
 */
function renderListData(data){
  if(data && data.Data){
    $(".list-item").empty();

    data.Data.filter(function(item, index){
      let itemChild = `<div class="item-detail" index='${index}'>
                    <div class="item-title ${item.success ? 'success' : ''}">${item.Ma_Tai_San} - ${item.Ten_Tai_San}</div>
                    <div class="action">Nhập</div>
                    <div class="delete">Xóa</div>
                  </div>`;

        $(".list-item").append(itemChild);
    });
  }
}