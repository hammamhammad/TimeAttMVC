var prefixApiURL = "/TimeAttWebAPI/";
var ResourcesdataTable = null;
var ResourcesData = null;
var ResouceSetData = null;
var CurrentID = 0;
var Validator = null;

$.ajaxSetup({
    dataType: 'json',
    async: true,
    cache: true,
    xhrFields: {
        withCredentials: true
    },
    beforeSend: function (xhr) {
        $.blockUI({
            message: '<h3></h3>', css: {
                width: '128px', height: '15px', background: 'url(Content/spiffygif.gif) no-repeat center #fff no-repeat center #fff', border: '1px solid #666', 'z-index': '100000', overflow: 'auto' } });
    }
});
$(document).ajaxStop($.unblockUI);


function InitializeView() {
    $("#bt_save").on("click", function () {

        if ($('#ResorceForm').valid()) {
            SaveData();
        }
    })
    $("#bt_saveRename").on("click", function () {

        if ($('#RenameResorceSetForm').valid()) {
            RenameResourceSet();
            $('#RenameResorceSetFormDialog').modal('hide');
        }
    })
    $.validator.setDefaults({
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
    Validator = $("#ResorceForm").validate({
        rules: {
            dd_ResourceSet_Edit: "required",
            txt_ResourceID: "required",
            txt_ResourceEn: "required",
            txt_ResourceAr: "required"
        },
        messages: {
            dd_ResourceSet_Edit: "",
            txt_ResourceID: "",
            txt_ResourceEn: "",
            txt_ResourceAr: ""

        }
    });
    Validator = $("#RenameResorceSetForm").validate({
        rules: {
            txt_ResourceSetRename: "required"
        },
        messages: {
            txt_ResourceSetRenameAr: ""

        }
    });
    $('#ResorceFormDialog').on('shown.bs.modal', function () {
        if (CurrentID == 0)
            ClearForm();
        else {
            ClearForm();
            GetResourceData();

        }
        $('#txt_ResourceID').focus()
    });

    $('#RenameResorceSetFormDialog').on('shown.bs.modal', function () {
        $('#txt_ResourceSetRename').val('');
        $('#txt_ResourceSetRename').focus()
    });

    ResourcesdataTable = $('#ResourcesdataTable').DataTable(
    {

        ajax: "",
        autoWidth: false,
        data: ResourcesData,
        columns: [{ data: "ID" }, { data: "RName" }, { data: "RValueEN" }, { data: "RValueAR" }, { data: "ResourceSet" }
        ],
        columnDefs: [
        { "targets": 0, "visible": false, "searchable": false },
        { "width": "15%", "targets": 1 },
        { "width": "30%", "targets": 2 },
        { "width": "30%", "targets": 3, "className": "rightDirection" },
         { "width": "15%", "targets": 4 },
        {
            className: "col-centered", "width": "5%", "targets": 5,
            "render": function (data, type, row) {
                return '<span class="glyphicon glyphicon-edit  col-edit handcursor" data-id=' + row.ID + ' onclick="EditRow($(this))"></span>';
            }
        },
        {
            className: "col-centered", "width": "5%", "targets": 6,
            "render": function (data, type, row) {
                return '<span class="glyphicon glyphicon-trash  col-delete handcursor" data-id=' + row.ID + ' onclick="DeleteRow($(this))"></span>';
            }
        }
        ],
        filter: true,
        rowId: 'ID',
        info: true,
        ordering: true,
        "order": [],
        pagingType: "full_numbers",
        "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

    });
    $('#ResourcesdataTable tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            ResourcesdataTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    ReloadData();
}


function ReloadData(d) {
    $("#dd_ResourceSet").unbind("change");

    if (ResourcesdataTable != null) {
        ResourcesdataTable.clear().draw();
    }
    var apiurl = prefixApiURL + "Resources/GetAll/true";

    $.get(apiurl).done(function (data) {

        if (data != null && data.length > 0) {
            ResourcesdataTable.rows.add(data).draw();

        }
        ResourcesData = data;
        ReloadResourceSet();

        var options = $("#dd_ResourceSet");
        fillResourceSet(options);

        $('#dd_ResourceSet').on('change', function () {
            onResourceSetChange(this);
        });
        if (d && d.length > 0) {
            $('#dd_ResourceSet').val(d).trigger('change');
        }
        else
            $("#dd_ResourceSet option[value='']").attr('selected', true)
    }).fail(function (jqxhr, settings, exception) {
        console.log("error ReloadData")
    });


}
function ReloadResourceSet() {
    var RS = null;
    RS = ResourcesData.map(function (obj) { return obj.ResourceSet; });
    RS = RS.filter(function (v, i) { return RS.indexOf(v) == i; });
    ResouceSetData = RS;
}
function onResourceSetChange(obj) {
    if (ResourcesdataTable != null) {
        ResourcesdataTable.clear().draw();
    }
    if (obj.value == "") {
        ResourcesdataTable.rows.add(ResourcesData).draw();

    }
    else {
        var filterdata = $.grep(ResourcesData, function (a) {
            return a.ResourceSet == obj.value;

        });
        ResourcesdataTable.rows.add(filterdata).draw();
    }
}
function ClearForm() {
    Validator.resetForm();
    var defaultResourceSet = $("#dd_ResourceSet").val();
    ///fill Resource set data
    var options = $("#dd_ResourceSet_Edit");
    fillResourceSet(options);
    $("#dd_ResourceSet_Edit option[value='" + defaultResourceSet + "']").attr('selected', true)
    if (CurrentID == 0)
        $("#txt_ResourceSet").val(defaultResourceSet)
    $("#txt_ResourceID").val("");
    $("#txt_ResourceEn").val("");
    $("#txt_ResourceAr").val("");
}
function fillResourceSet(options) {
    options.empty();
    options.append($("<option />").val('').text(''));
    $.each(ResouceSetData, function () {
        options.append($("<option />").val(this).text(this));
    });

}
function GetResourceData() {
    var apiurl = prefixApiURL + "Resources/GetByID/" + CurrentID;
    $.get(apiurl).done(function (data) {

        if (data != null) {
            $('#txt_ResourceSet').val(data.ResourceSet);
            $('#txt_ResourceID').val(data.RName);
            $('#txt_ResourceEn').val(data.RValueEN);
            $('#txt_ResourceAr').val(data.RValueAR);
        }
    }).fail(function (jqxhr, settings, exception) {
        console.log("error ReloadData")
    })
}
function OpenRenameDialog() {
    if ($('#dd_ResourceSet').val().trim().length > 0) {
        $("#RenameResorceSetFormDialogTitle").html('Rename Resource Set[' + $('#dd_ResourceSet').val() + ']')
        $('#RenameResorceSetFormDialog').modal('show');
    }


}
function RenameResourceSet() {
    if ($('#dd_ResourceSet').val().trim().length > 0 && $("#txt_ResourceSetRename").val().trim().length > 0) {
        var ResourceSet = $('#dd_ResourceSet').val();
        var newResourceSet = $("#txt_ResourceSetRename").val();
        var apiurl = prefixApiURL + "Resources/Rename/";
        $.post(apiurl + ResourceSet + "/" + newResourceSet).done(function (data) {
            if (data != null && data.Status != "0") {
                // alert(data.Msg);
                ReloadData(newResourceSet);

            }
        }).fail(function (jqxhr, settings, exception) {
            console.log("error RenameResourceSet")
        });
    }

}
function AddNewRow() {
    CurrentID = 0;
    $("#ResorceFormDialogTitle").html('Add New Resource')
    $('#ResorceFormDialog').modal('show');
}
function EditRow(obj) {
    CurrentID = $(obj).attr("data-id");
    $("#ResorceFormDialogTitle").html('Edit Resource')
    $('#ResorceFormDialog').modal('show');
}
function DeleteRow(obj) {
    var ID = $(obj).attr("data-id");
    var RS = $('#txt_ResourceSet').val();
    if (confirm('Are you sure you want to delete this Resource [' + ResourcesdataTable.row().getRow(ID).data().RName + ']?')) {
        var apiurl = prefixApiURL + "Resources/Delete/" + ID;
        $.post(apiurl).done(function (data) {
            if (data != null && data.Status != "0") {
                ResourcesdataTable.row().deleteRow(ID);
                ResourcesData.pop(data.Result);
                ReloadResourceSet();
                var options = $("#dd_ResourceSet");
                fillResourceSet(options);
                if ($.inArray(RS, ResouceSetData))
                    $('#dd_ResourceSet').val(RS).trigger('change');
            }
            else {
                alert(data.Msg);
            }
        }).fail(function (jqxhr, settings, exception) {
            console.log("error Delete Resource")
        });

    } else {
        // Do nothing!
    }
}
function SaveData() {
    var RS = $('#txt_ResourceSet').val();
    var ID = 0;
    var formdata = {
        "ID": CurrentID,
        "RName": $('#txt_ResourceID').val(),
        "RValueEN": $('#txt_ResourceEn').val(),
        "RValueAR": $('#txt_ResourceAr').val(),
        "ResourceSet": $('#txt_ResourceSet').val(),
    }
    var apiurl = prefixApiURL + "Resources/CreateUpdate";
    $.post(apiurl, formdata).done(function (data) {
        if (data != null && data.Status != "0") {
            ID = data.Result.ID;
            if (CurrentID == 0) {
                ResourcesdataTable.row().addRow(data.Result, true);
                ResourcesData.push(data.Result);
            }
            else {
                ResourcesdataTable.row().updateRow(CurrentID, data.Result, true);
                jQuery.grep(ResourcesData, function (a) {
                    if (a.ID == CurrentID) {
                        a.RName = data.Result.RName;
                        a.RValueEN = data.Result.RValueEN;
                        a.RValueAR = data.Result.RValueAR;
                        a.ResourceSet = data.Result.ResourceSet;
                    }
                });
            }
            ReloadResourceSet();
            var options = $("#dd_ResourceSet");
            fillResourceSet(options);
            $('#dd_ResourceSet').val(RS).trigger('change');

            $('#ResorceFormDialog').modal('hide');
            ResourcesdataTable.row().showRow(ID, true);
        }
        else {
            alert(data.Msg);
        }
    }).fail(function (jqxhr, settings, exception) {
        console.log("error Save Data")
    });
    $('#ResorceFormDialog').modal('hide');

}



////DataTable Plugin
jQuery.fn.dataTable.Api.register('row().show()', function (select) {
    var page_info = this.table().page.info();
    // Get row index
    var new_row_index = this.index();
    // Row position
    var row_position = this.table().rows()[0].indexOf(new_row_index);
    // Already on right page ?
    if (row_position >= page_info.start && row_position < page_info.end) {
        // Return row object
        if (select) {
            this.table().$('tr.selected').removeClass('selected');
            $(this.table().row(new_row_index).node()).addClass('selected')
        }
        return this;
    }
    // Find page number
    var page_to_display = Math.floor(row_position / this.table().page.len());
    if (select) {
        this.table().$('tr.selected').removeClass('selected');
        $(this.table().row(new_row_index).node()).addClass('selected')
    }
    // Go to that page
    this.table().page(page_to_display);
    // Return row object
    return this;
});
jQuery.fn.dataTable.Api.register('row().showRow()', function (cid, select) {
    var id = parseInt(cid, 10)
    if (id.toString() == 'NaN')
        return;
    var index = parseInt(this.rows("#" + id.toString())[0], 10)
    var row = null;
    if (index >= 0) {

        row = this.row(index).show(select != null ? select : false).draw(false);

    }
    return row;
});
jQuery.fn.dataTable.Api.register('row().updateRow()', function (id, updatedate, select) {
    var index = parseInt(this.rows("#" + id.toString())[0], 10)
    var row = null;
    if (index >= 0) {
        if (updatedate != null) {
            row = this.row(index).show(select != null ? select : false).data(updatedate).draw(false);
        }
        else {
            row = this.row(index).show(select != null ? select : false);
        }
    }
    return row;
});
jQuery.fn.dataTable.Api.register('row().addRow()', function (data, select) {

    var row = this.row.add(data).draw().show(select != null ? select : false).draw(false)
    return row;
});
jQuery.fn.dataTable.Api.register('row().getRow()', function (id) {
    var index = parseInt(this.rows("#" + id.toString())[0], 10)
    if (index >= 0) {
        var page = Math.floor(index / this.page.info().length);
        this.page(page).draw(false);
        return this.row(index);
    }
    return null;
});
jQuery.fn.dataTable.Api.register('row().deleteRow()', function (id) {
    var index = parseInt(this.rows("#" + id.toString())[0], 10)
    if (index >= 0) {
        this.table().row(index).show(false).remove().draw(false)
    }
});
jQuery.fn.dataTable.Api.register('row().Exists()', function (id) {
    var index = parseInt(this.rows("#" + id.toString())[0], 10)
    return index.toString() != 'NaN'
});
////////////////////

