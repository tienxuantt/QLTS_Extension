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
		
    if (isTangMoi === true) {
        let _url = ""
        if (_isTSQL == true) {
            _url = "/TaiSan/Create?LoaiHinhTSId=" + _loaiHinh + "&loailydobiendongId=1&isTangMoi=true&isCreateTSDA=False&isTSQL=true";
        }
        else {
            _url = "/TaiSan/Create?LoaiHinhTSId=" + _loaiHinh + "&loailydobiendongId=1&isTangMoi=true&isCreateTSDA=False&isTSQL=false";
        }
        window.location.replace(_url);
    }
    else {
        let _url = ""
        if (_isTSQL == true) {
            _url = "/TaiSan/Create?LoaiHinhTSId=" + _loaiHinh + "&loailydobiendongId=1&isTangMoi=false&isCreateTSDA=False&isTSQL=true";
        }
        else {
            _url = "/TaiSan/Create?LoaiHinhTSId=" + _loaiHinh + "&loailydobiendongId=1&isTangMoi=false&isCreateTSDA=False&isTSQL=false";
        }
        window.location.replace(_url);
    }
}

// Xử lý binding dữ liệu form
function bindingDataForm(obj){
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
                $(".card-header .btnAdd").click();

                setTimeout(function(){
                    if($(`[data-bb-handler="confirm"]`).is(":visible")){
                        $(`[data-bb-handler="confirm"]`).click();
                    }
                }, 400);
            }, 600);
        }
    }
}

// Xử lý binding control String
function bindingControlString(config, data){
    let control = $(`#${config.Field_TSC}`);

    if(control.length > 0){
        let value = data[config.Field_QLTS];

        if(value){
            control.val(value);
            control.blur();
        }
    }
}

// Xử lý binding control Number
function bindingControlNumber(config, data){
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
}

// Xử lý binding control Combobox
function bindingControlCombobox(config, data){
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
}

// Xử lý binding control DateTime
function bindingControlDateTime(config, data){
    let control = $(`#${config.Field_TSC}`);

    if(control.length > 0){
        let value = data[config.Field_QLTS];

        if(value){
            control.val(value);
            control.blur();
        }
    }
}

// Xử lý binding control Checkbox
function bindingControlCheckbox(config, data){
    let controlId = data[config.Field_QLTS],
        control = $(`#${controlId}`);

    if(control.length > 0 && !control.prop("checked")){
       control.click();
    }
}