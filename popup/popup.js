// Xử lý khi mới mở form
getData(function(data){
  if(data){
    afterImportFile(data);
  }
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

// Khởi tạo sự kiện khi click vào nhập
$(".list-item").on("click", ".action", function(){
  let index = $(this).parent().attr("index");

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
        }, 7000);
      }
    }
  });
});

// Khởi tạo sự kiện khi click vào nhập
$(".list-item").on("click", ".delete", function(){
  let index = $(this).parent().attr("index");

  // Lấy dữ liệu để xóa bỏ một phần tử
  getData(function(data){
    if(data && data.Data){
      data.Data.splice(index, 1);

      setData(data, (response) => {
        afterImportFile(response)
      });
    }
  });
});

// Xử lý sau khi import file
function afterImportFile(data){
  let totalRecords = data.Data.length;

  $(".total-record").find("b").text(totalRecords);
  $(".total-record").show();

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
                    <div class="item-title">${item.Ten_Tai_San}</div>
                    <div class="action">Nhập</div>
                    <div class="delete">Xóa</div>
                  </div>`;

        $(".list-item").append(itemChild);
    });
  }
}