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
                    case 6: // Checkbox
                        bindingControlCheckbox(item, data);
                        break;
                }
            });
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