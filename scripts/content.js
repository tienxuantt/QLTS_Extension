// Thêm mới một tài sản
function addFixedAsset(obj){
    // Binding dữ liệu vào form
    bindingDataForm(obj);
}

// Show form
function showFormAdd(obj){
    goToLink(true, 6, false, false);
}

// Điều hướng tới trang thêm mới
function goToLink(isTangMoi, _loaiHinh, _isCreateTSDA, _isTSQL) {
	try {
        let _url = `/TaiSan/Create?LoaiHinhTSId=${_loaiHinh}&loailydobiendongId=1&isTangMoi=${isTangMoi}&isCreateTSDA=False&isTSQL=${_isTSQL}`;

        window.location.replace(_url);
    } catch (error) {
        alert("Đã có lỗi xảy ra. Vui lòng nhấn F5");
    }
}

// Xử lý binding dữ liệu form
function bindingDataForm(obj){
    try {
        if(obj){
            let columnConfig = obj.ColumnConfig,
                data = obj.Data;
    
            // Duyệt từng control để binding
            if(columnConfig && columnConfig.length > 0){
                columnConfig.filter(function(item){
                    switch(item.ControlType){
                        case 1: // String
                            bindingControlString(item, data);
                            break;
                        case 2: // Number
                            bindingControlNumber(item, data);
                            break;
                        case 3: // DateTime
                            bindingControlDateTime(item, data);
                            break;
                        case 4: // Combobox
                            bindingControlCombobox(item, data);
                            break;
                        case 6: // Checkbox
                            bindingControlCheckbox(item, data);
                            break;
                    }
                });
    
                // Tự động bấm lưu
                setTimeout(function(){
                    $(".card-header .btnAdd:first").click();
    
                    setTimeout(function(){
                        if($(`[data-bb-handler="confirm"]`).is(":visible")){
                            // Gửi thông báo đã xong
                            pushNofitySuccess();
                            $(`[data-bb-handler="confirm"]`).click();
                        }
                    }, 600);
                }, 800);
            }
        }
    } catch (error) {
        alert("Đã có lỗi xảy ra. Vui lòng nhấn F5");
    }
}

// Gửi lên để lấy tài sản tiếp theo
function pushNofitySuccess(){
    try {
        chrome.runtime.sendMessage("success", (response) => {});
    } catch (error) {
        alert("Đã có lỗi xảy ra. Vui lòng nhấn F5");
    }
}

// Xử lý binding control String
function bindingControlString(config, data){
    try {
        let control = $(`#${config.Field_TSC}`);

        if(control.length > 0){
            let value = data[config.Field_QLTS];
    
            if(value){
                control.val(value);
                control.blur();
            }
        }
    } catch (error) {
        alert("Đã có lỗi xảy ra. Vui lòng nhấn F5");
    }
}

// Xử lý binding control Number
function bindingControlNumber(config, data){
    try {
        let control = $(`#${config.Field_TSC}`);

        if(control.length > 0){
            let value = data[config.Field_QLTS];

            if(value){
                let valueFormat = value.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");

                control.val(value);
                control.prev().val(valueFormat);
                control.attr("aria-valuenow", value);
                control.prev().attr("aria-valuenow", value);
            }
        }
    } catch (error) {
        alert("Đã có lỗi xảy ra. Vui lòng nhấn F5");
    }
}

// Xử lý binding control Combobox
function bindingControlCombobox(config, data){
    try {
        let control = $(`ul#${config.Field_TSC}`);

        if(control.length > 0){
            let value = data[config.Field_QLTS];

            if(value){
                control.find("li").each(function(){
                    let spanText = $(this).text();

                    if(spanText.toLocaleLowerCase().trim().includes(value.toLocaleLowerCase().trim())){
                        $(this).click();
                    }
                });
            }
        }
    } catch (error) {
        alert("Đã có lỗi xảy ra. Vui lòng nhấn F5");
    }
}

// Xử lý binding control DateTime
function bindingControlDateTime(config, data){
    try {
        let control = $(`#${config.Field_TSC}`);

        if(control.length > 0){
            let value = data[config.Field_QLTS];

            if(value){
                control.val(value);
                control.blur();
            }
        }
    } catch (error) {
        alert("Đã có lỗi xảy ra. Vui lòng nhấn F5");
    }
}

// Xử lý binding control Checkbox
function bindingControlCheckbox(config, data){
    try {
        let controlId = data[config.Field_QLTS],
            control = $(`#${controlId}`);

        if(control.length > 0 && !control.prop("checked")){
            control.click();
        }
    } catch (error) {
        alert("Đã có lỗi xảy ra. Vui lòng nhấn F5");
    }
}