// Nhập khẩu file
$("#importLink").on("click", function(){
  $("#importJson").click();   
});

// Xử lý sau khi import file
function afterImportFile(data){
  debugger
}

// Sự kiện khi thay đổi
$("#importJson").on('change',function(e){
  var file =  e.target.files[0];
  var path = (window.URL || window.webkitURL).createObjectURL(file);

  readTextFile(path, function(text){
    var data = JSON.parse(text);

    setData(data, afterImportFile);
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