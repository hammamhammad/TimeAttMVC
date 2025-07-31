var VacationTypeTable = null;
var VacationTypeData = null;
var Select_VacType_Control = null;
var VacationTypeListTable = null;
var VacationsviewTable = null;
function InitializeVacationsView() {
    InitializeVacationsType();
    InitializeVacationsManagment();
    $('#VacationsTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab("show");
        if ($(this).attr("id") == "Vacationstab-link" && VacationsviewTable == null) {
            SearchVacations();
        }
    })
}

///////////////////Vacation Types//////////////////////
function InitializeVacationsType() {
    ReloadVacationType();
    $('#VacationTypeDialog').on('shown.bs.modal', function () {
        $('#txt_VacationTypeName_Edit').focus();
    });

}
function EditVacationTypeRow(obj) {
    if (!HasPermission(6, 'vac-edittype')) {
        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    var vacTypID = 0;
    if (obj != null) {
        vacTypID = $(obj).attr('data-id');
        if (vacTypID == "0" || vacTypID == 0)
            return;
    }
    else
        return;

    ClearVacationTypeForm();
    $("#gridSystemModalVacationtype").html(resources.VacationTypeEditTitle);
    $('#VacationTypeDialog').modal("show");
    $("#bt_saveVacationType").unbind('click');
    var apiurl = prefixApiURL + "Vacations/Types/GetByID/" + vacTypID
    $.get(apiurl).done(function (data) {
        if (data.Status != "1") {
            ShowTransAlert(data.Msg, resources.VacationsTypeTitle, "danger");
        }
        else {
            if (data.Result != null) {

                $("#txt_VacationTypeName_Edit").val(data.Result.vtype_name);
                $("#chk_Isbusnisstrip").prop('disabled', false);
                $('#chk_Isbusnisstrip').prop('checked', data.Result.istrip).change();
                $("#chk_Isbusnisstrip").prop('disabled', false);
                $("#bt_saveVacationType").on('click', function () {
                    SaveVacationType(vacTypID);
                });
                action = 'Update';
                $('#txt_VacationTypeName_Edit').focus();
            }
        }
    }).fail(function (jqxhr, settings, exception) {
        ShowAlert(resources.ErrorRetrievedDataMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.VacationsTypeTitle, "danger");
    });
}
function DeleteVacationTypeRow(obj) {
    if (!HasPermission(6, 'vac-deletetype')) {
        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    var vacTypID = 0;
    if (obj != null) {
        vacTypID = $(obj).attr('data-id');
        if (vacTypID == "0" || vacTypID == 0)
            return;
    }
    else
        return;
    $.confirm({
        title: resources.VacationTypeDeleteTitle,
        content: resources.DeleteVacationTypeConfirmationMsg.format(VacationTypeTable.row().getRow(vacTypID).data().vtype_name),
        confirmButton: resources.btDelete,
        cancelButton: resources.btCancel,
        confirmButtonClass: 'btn-danger',
        autoClose: 'cancel|15000',
        icon: 'fa fa-warning',
        animation: 'scalex',
        confirm: function () {

            var apiurl = prefixApiURL + "Vacations/Types/Delete/" + vacTypID;
            $.ajax
                ({
                    type: "POST",
                    url: apiurl,
                    dataType: 'json',
                    cache: false,
                    data: [] //formdata
                }).done(function (data) {
                    if (data.Status != "1") {
                        ShowAlert(data.Msg, resources.VacationTypeDeleteTitle, "danger");
                    }
                    else {
                        VacationTypeTable.row().deleteRow(vacTypID);
                        VacationTypeData.pop(data.Result);
                        ShowAlert(data.Msg, resources.VacationTypeDeleteTitle, "success");
                    }
                }).fail(function (jqxhr, settings, exception) {
                    ShowAlert(resources.DeleteVacationTypeErrorMsg + ":" + GetErrorFromString(jqxhr.responseText).Msg, resources.VacationTypeDeleteTitle, "danger");
                }).always(function () {
                });
        }
    });
}
function AddVacationType() {
    if (!HasPermission(6, 'vac-addtype')) {
        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    ClearVacationTypeForm();
    $("#gridSystemModalVacationtype").html(resources.VacationTypeAddTitle);
    $('#VacationTypeDialog').modal("show");
    $("#bt_saveVacationType").unbind('click');
    $("#bt_saveVacationType").on('click', function () {
        SaveVacationType(0);
    });
    action = 'Add';
    $('#txt_VacationTypeName_Edit').focus();
}
function SaveVacationType(ID) {
    if (!form_validate("VacationTypeForm")) {
        return;
    }
    var formdata = {
        "vtype_id": ID,
        "vtype_name": $('#txt_VacationTypeName_Edit').val(),
        "istrip": $('#chk_Isbusnisstrip').prop('checked')
    }
    var apiurl = "";

    apiurl = prefixApiURL + "Vacations/Types/" + action;
    $.ajax
        ({
            type: "POST",
            url: apiurl,
            dataType: 'json',
            //async: false,
            cache: false,
            // beforeSend: setHeader,
            data: formdata //formdata
        }).done(function (data) {
            if (data.Status != "1") {
                ShowMessage(data.Msg, resources.VacationsTypeTitle);
            }
            else {
                if (action == 'Add') {
                    VacationTypeTable.row().addRow(data.Result, true);
                    VacationTypeData.push(data.Result);
                }
                else if (action == 'Update') {
                    VacationTypeTable.row().updateRow(ID, data.Result, true);
                    jQuery.grep(VacationTypeData, function (a) {
                        if (a.vtype_id == ID) { a.vtype_name = data.Result.vtype_name }
                    });
                }

                $('#VacationTypeDialog').modal('hide');
                ShowAlert(data.Msg, (action == 'Add' ? resources.VacationTypeAddTitle : resources.VacationTypeEditTitle), "success");
            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert((action == 'Add' ? resources.AddVactionTypeErrorMsg : resources.SaveVacationTypeErrorMsg) + ":" + GetErrorFromString(jqxhr.responseText).Msg, resources.VacationsTypeTitle, "danger");
        }).always(function () {
        });
}
function ClearVacationTypeForm() {
    action = "";
    $('#txt_VacationTypeName_Edit').val("");
    $("#chk_Isbusnisstrip").prop('disabled', false);
    $('#chk_Isbusnisstrip').prop('checked', true).change();
    $("#chk_Isbusnisstrip").prop('disabled', false);
    setTimeout(function () {
        $('#txt_VacationTypeName_Edit').focus();
        $("form#VacationTypeForm").validator("destroy");
        $("#list-unstyled").remove();
        $("form#VacationTypeForm").find('.has-error').removeClass("has-error");
        $("form#VacationTypeForm").find('.has-success').removeClass("has-success");
        $("form#VacationTypeForm").find('.glyphicon-remove').not($('.add-on').find("span:first")).removeClass("glyphicon-remove");
        $("form#VacationTypeForm").find('.glyphicon-ok').not($('.add-on').find("span:first")).removeClass("glyphicon-ok");
        $('#VacationTypeForm').validator({
            custom: {
                required: function ($el) { return !!$.trim($el.val()) }
            },
            errors: {
                required: 'Please fill out this field.'
            }
        });
    }, 100);
}
function ReloadVacationType(DontCreateTable) {
    $("#bt_AddVacationType").unbind('click');
    var candeletevactype = HasPermission(6, 'vac-deletetype');
    var caneditvactype = HasPermission(6, 'vac-edittype');
    var canaddvactype = HasPermission(6, 'vac-addtype');

    $.getJSON(prefixApiURL + "Vacations/Types/GetAll").done(function (data) {
        VacationTypeData = data.Result;
        if (DontCreateTable)
            return;
        if (VacationTypeTable != null) {
            VacationTypeTable.clear();
            VacationTypeTable.destroy();
        }
        VacationTypeTable = $('#VacationTypeTable').DataTable(
            {
                ajax: "",
                autoWidth: false,
                data: data.Result,
                columns: [{ data: "vtype_name" }, { data: "istrip" }],
                columnDefs: [
                    { "width": "80%", "targets": 0 },
                    {
                        "width": "10%", "targets": 1, "render": function (data, type, row) {
                            return '<input type="checkbox" class="bigCheckbox" disabled name="id[]" ' + (row.istrip ? 'checked' : '') + '>';
                        }, "searchable": false
                    },
                    {
                        className: "col-centered", "width": "5%", "targets": 2,
                        "render": function (data, type, row) {
                            return '<span class="glyphicon glyphicon-edit  col-edit handcursor" data-id=' + row.vtype_id + ' onclick="if(IsDisabled(this)) { return };EditVacationTypeRow($(this))"></span>';
                        }, "visible": caneditvactype, "searchable": false
                    },
                    {
                        className: "col-centered", "width": "5%", "targets": 3,
                        "render": function (data, type, row) {
                            return '<span class="glyphicon glyphicon-trash  col-delete handcursor" data-id=' + row.vtype_id + ' onclick="if(IsDisabled(this)) { return };DeleteVacationTypeRow($(this))"></span>';
                        }, "visible": candeletevactype, "searchable": false
                    }
                ],
                filter: true,
                rowId: 'vtype_id',
                info: false,
                ordering: true,
                "order": [],
                language: { "url": resources.Datatable_Lang },
                pagingType: "full_numbers",
                "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

            });
        $('#VacationTypeTable tbody').unbind('click');
        $('#VacationTypeTable tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                VacationTypeTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });



    if (!canaddvactype) {
        $("#bt_AddVacationType").hide(0);
        $("#bt_AddVacationType").unbind('click');
    }
    else {
        $("#bt_AddVacationType").show(0);
        $("#bt_AddVacationType").on('click', function () {
            AddVacationType();
        });
    }

}
////////////////////////////////////////////////////
///////////////////Vacations////////////////////////
function InitializeVacationsManagment() {

    $('#VacationTypeListDialog').on('shown.bs.modal', function () {
        ReloadVacationTypeList(true);
    });
    $('#VacationsDialog').on('shown.bs.modal', function () {
        if (CurrentID == 0) {
            $("#gridSystemModalvacationTitle").html(resources.VacationAddNewTitle);
            $("#NewDiv").show(0);
            $("#EditDiv").hide(0);

        }
        else {
            $("#gridSystemModalvacationTitle").html(resources.VacationEditTitle);
            $("#NewDiv").hide(0);
            $("#EditDiv").show(0);
        }
    });
    $('.dpv').datepicker({ todayHighlight: true, todayBtn: "linked", });
    $('.dpv').datepicker('update', new Date());
    $('.dpvf').datepicker({ todayHighlight: true, todayBtn: "linked", });
    $('.dpvf').datepicker('update', new Date());
    $("#pn_Vacationsviewspan").on('click', function (e) {
        var $this = $(this);
        if (!$this.hasClass('panel-collapsed')) {
            $("#pn_Vacationsviewbody").slideUp();
            $this.addClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        } else {
            $("#pn_Vacationsviewbody").slideDown();
            $this.removeClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
    });
    $('.VacationFormRadios').on('click', 'input[type=radio]', function () {
        $(this).closest('.VacationFormRadios').find('.radio-inline, .radio').removeClass('checked');
        $(this).closest('.radio-inline, .radio').addClass('checked');
    });
    ClearVacationForm();
    if (!HasPermission(8, "rep-vac")) {
        $("#PrintVacation").hide();
    }
    else {
        $("#PrintVacation").click(function (e) { e.preventDefault(); PrintVacations(); })
    }
}
function ClearVacationForm() {
    $('.VacationFormRadios').closest('.VacationFormRadios').find('.radio-inline, .radio').removeClass('checked');
    $("input[name$='VacationForm']").prop("checked", false);
    $("#txt_Select_VacationsformEmployee").val("").attr("data-id", 0);
    $("#txt_Select_ByBranch").val("").attr("data-id", 0);
    $("#txt_Select_BySection").val("").attr("data-id", 0);
    $("#txt_Select_VacationsformType").val("").attr("data-id", 0);

    $('.dpvf').datepicker('update', '');
    $("#chk_IsApproved").prop('disabled', false);
    $('#chk_IsApproved').prop('checked', true).change();
    $("#chk_IsApproved").prop('disabled', false);
    $('#togglechk').find("div:first").removeAttr("disabled");
    $(".fixed-panel-60").hide();
    setTimeout(function () {
        $("form#VacationForms").validator("destroy");
        $("#list-unstyled").remove();
        $("form#VacationForms").find('.has-error').removeClass("has-error");
        $("form#VacationForms").find('.has-success').removeClass("has-success");
        $("form#VacationForms").find('.glyphicon-remove').not($('.add-on').find("span:first")).removeClass("glyphicon-remove");
        $("form#VacationForms").find('.glyphicon-ok').not($('.add-on').find("span:first")).removeClass("glyphicon-ok");
        $('#VacationForms').validator({
            custom: {
                required: function ($el) { return !!$.trim($el.val()) }
            },
            errors: {
                required: 'Please fill out this field.'
            }
        });
    }, 100);
}
function SaveVacation() {
    if (CurrentID == 0) {
        if (!($("#RB_ByEmployee").prop("checked") || $("#RB_ByBranch").prop("checked") || $("#RB_BySection").prop("checked"))) {
            ShowMessage(resources.YouMustSelectVacationTowhomMsg, resources.VacationAddNewTitle);
            return;
        }
    }

    if (!form_validate("VacationForms")) {
        return;
    }
    var fdate = $("#Vacationsform_FromDate").datepicker("getDate").ToOADate();
    var tdate = $("#Vacationsform_ToDate").datepicker("getDate").ToOADate();
    var ByEmp = 0;
    var BySection = 0;
    var ByRegion = 0;
    if (fdate > tdate) {
        ShowMessage(resources.FromdateMustBeGraterThanToDateMsg, resources.VacationAddNewTitle);
        return;
    }
    if ($("#RB_ByEmployee").prop("checked")) {
        ByEmp = $('#txt_Select_VacationsformEmployee').attr('data-id');
        BySection = 0;
        ByRegion = 0;
    }
    if ($("#RB_BySection").prop("checked")) {
        ByEmp = 0;
        BySection = $('#txt_Select_BySection').attr('data-id');;
        ByRegion = 0;
    }
    if ($("#RB_ByBranch").prop("checked")) {
        ByEmp = 0;
        BySection = 0;
        ByRegion = $('#txt_Select_ByBranch').attr('data-id');;
    }


    var formdata = {
        vac_id: CurrentID,
        vac_fdate: $("#Vacationsform_FromDate").datepicker("getDate").ToOADate(),
        vac_tdate: $("#Vacationsform_ToDate").datepicker("getDate").ToOADate(),
        vac_type: $('#txt_Select_VacationsformType').attr('data-id'),
        vac_deleted: false,
        vac_empid: ByEmp,
        vac_secid: BySection,
        vac_RegID: ByRegion,
        vac_status: $("#chk_IsApproved").prop('checked'),
    }
    var apiurl = "";

    apiurl = prefixApiURL + "Vacations/" + action;
    $.ajax
        ({
            type: "POST",
            url: apiurl,
            dataType: 'json',
            //async: false,
            cache: false,
            // beforeSend: setHeader,
            data: formdata //formdata
        }).done(function (data) {
            if (data.Status != "1") {
                ShowMessage(data.Msg, resources.VacationsManagmentTitle);
            }
            else {
                if (action == 'Add') {
                    if (ByEmp > 0)
                        VacationsviewTable.row().addRow(data.Result, true);
                    else {
                        $("#Vacationsview_FromDate").datepicker('update', $("#Vacationsform_FromDate").datepicker("getDate"));
                        $("#Vacationsview_ToDate").datepicker('update', $("#Vacationsform_ToDate").datepicker("getDate"));
                        SearchVacations();
                    }

                }
                else if (action == 'Update') {
                    VacationsviewTable.row().updateRow(CurrentID, data.Result, true);

                }

                $('#VacationsDialog').modal('hide');
                ShowAlert(data.Msg, (action == 'Add' ? resources.VacationAddNewTitle : resources.VacationEditTitle), "success");
            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert((action == 'Add' ? resources.AddVactionErrorMsg : resources.SaveVacationErrorMsg) + ":" + GetErrorFromString(jqxhr.responseText).Msg, resources.VacationsManagmentTitle, "danger");
        }).always(function () {
        });

}
function AddVacation() {
    if (!HasPermission(6, 'vac-addvac')) {
        ShowMessage(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle);
        return;
    }
    action = "Add";
    CurrentID = 0;
    ClearVacationForm();
    $('#VacationsDialog').modal("show");
}
function EditVacationRow(obj) {
    if (!HasPermission(6, 'vac-editvac')) {
        ShowMessage(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle);
        return;
    }
    action = "Update";
    CurrentID = parseInt((obj.attr("data-id")));
    ClearVacationForm();
    var urlapi = prefixApiURL + "Vacations/GetByID/" + CurrentID;
    $.getJSON(urlapi).done(function (data) {
        if (data.Result != null) {
            $("#Vacationsform_FromDate").datepicker('update', new Date((data.Result.fdate).FromOADate()));
            $("#Vacationsform_ToDate").datepicker('update', new Date((data.Result.tdate).FromOADate()));
            $("#txt_vac_employeno").val(data.Result.emp_no);
            $("#txt_vac_employename").val(data.Result.emp_name);
            $("#txt_Select_VacationsformType").val(data.Result.vtype_name).attr("data-id", data.Result.vac_type);
            $("#chk_IsApproved").prop('disabled', false);
            $('#chk_IsApproved').prop('checked', data.Result.vac_status).change();
            $("#chk_IsApproved").prop('disabled', false);
            $('#VacationsDialog').modal("show");
        }

    }
    ).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });


}
function DeleteVacationRow(obj) {
    if (!HasPermission(6, 'vac-deletevac')) {
        ShowMessage(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle);
        return;
    }
    var vac_ID = 0;
    if (obj != null) {
        vac_ID = $(obj).attr('data-id');
        if (vac_ID == "0" || vac_ID == 0)
            return;
    }
    else
        return;
    $.confirm({
        title: resources.VacationDeleteTitle,
        content: resources.DeleteVacationConfirmationMsg,
        confirmButton: resources.btDelete,
        cancelButton: resources.btCancel,
        confirmButtonClass: 'btn-danger',
        autoClose: 'cancel|15000',
        icon: 'fa fa-warning',
        animation: 'scalex',
        confirm: function () {

            var apiurl = prefixApiURL + "Vacations/Delete/" + vac_ID;
            $.ajax
                ({
                    type: "POST",
                    url: apiurl,
                    dataType: 'json',
                    cache: false,
                    data: [] //formdata
                }).done(function (data) {
                    if (data.Status != "1") {
                        ShowAlert(data.Msg, resources.VacationDeleteTitle, "danger");
                    }
                    else {
                        VacationsviewTable.row().deleteRow(vac_ID);

                        ShowAlert(data.Msg, resources.VacationDeleteTitle, "success");
                    }
                }).fail(function (jqxhr, settings, exception) {
                    ShowAlert(resources.DeleteVacationErrorMsg + ":" + GetErrorFromString(jqxhr.responseText).Msg, resources.VacationDeleteTitle, "danger");
                }).always(function () {
                });
        }
    });
}
function VacationFormRadioChanged(obj) {
    $(".fixed-panel-60").show();
    var thediv = $(obj).val();
    $(".VacationFormRadiosdiv").hide();
    if ($(obj).prop("checked"))
        $("#" + thediv).slideDown("fast");
}
function PrintVacations() {
    var searchBody = {

        FromDate: $("#Vacationsview_FromDate").datepicker("getDate").ToOADate(),
        ToDate: $("#Vacationsview_ToDate").datepicker("getDate").ToOADate(),
        Type: $('#txt_Select_VacationsviewType').attr('data-id'),
        Emp_ID: $('#txt_Select_VacationsviewEmployee').attr('data-id'),
        Sec_ID: $('#txt_Select_VacationsviewSection').attr('data-id'),
        Reg_ID: $('#txt_Select_VacationsviewBranch').attr('data-id'),
    }
    ShowReportMode(GetRootURL() + "Vacations/PrintReport", searchBody, true);
}
function SearchVacations() {
    $("#bt_AddVacation").unbind('click');
    $("#bt_saveVacationForm").unbind('click');
    var candeletevac = HasPermission(6, 'vac-deletevac');
    var caneditvac = HasPermission(6, 'vac-editvac');
    var canaddvac = HasPermission(6, 'vac-addvac');
    var searchBody = {

        FromDate: $("#Vacationsview_FromDate").datepicker("getDate").ToOADate(),
        ToDate: $("#Vacationsview_ToDate").datepicker("getDate").ToOADate(),
        Type: $('#txt_Select_VacationsviewType').attr('data-id'),
        Emp_ID: $('#txt_Select_VacationsviewEmployee').attr('data-id'),
        Sec_ID: $('#txt_Select_VacationsviewSection').attr('data-id'),
        Reg_ID: $('#txt_Select_VacationsviewBranch').attr('data-id'),
    }
    $.post(prefixApiURL + "Vacations/GetAll", searchBody).done(function (data) {
        if (VacationsviewTable != null) {
            VacationsviewTable.clear();
            VacationsviewTable.destroy();
        }
        VacationsviewTable = $('#VacationsviewTable').DataTable(
            {
                ajax: "",
                autoWidth: false,
                data: data.Result,
                columns: [{ data: "emp_no" }, { data: "emp_name" }, { data: "vtype_name" }, { data: "vac_fdate" }, { data: "vac_tdate" }],
                columnDefs: [
                    { "width": "10%", "targets": 0 },
                    { "width": "25%", "targets": 1 },
                    { "width": "20%", "targets": 2 },
                    { "width": "15%", "targets": 3 },
                    { "width": "15%", "targets": 4 },
                    {
                        "width": "5%", "targets": 5,
                        "render": function (data, type, row) {
                            return '<input type="checkbox" class="bigCheckbox" disabled name="id[]" ' + (row.vac_status ? 'checked' : '') + '>';
                        }, "searchable": false
                    },
                    {
                        className: "col-centered", "width": "5%", "targets": 6,
                        "render": function (data, type, row) {
                            return '<span class="glyphicon glyphicon-edit  col-edit handcursor" data-id=' + row.vac_id + ' onclick="if(IsDisabled(this)) { return };EditVacationRow($(this))"></span>';
                        }, "visible": caneditvac, "searchable": false
                    },
                    {
                        className: "col-centered", "width": "5%", "targets": 7,
                        "render": function (data, type, row) {
                            return '<span class="glyphicon glyphicon-trash  col-delete handcursor" data-id=' + row.vac_id + ' onclick="if(IsDisabled(this)) { return };DeleteVacationRow($(this))"></span>';
                        }, "visible": candeletevac, "searchable": false
                    }
                ],
                filter: true,
                rowId: 'vac_id',
                info: false,
                ordering: true,
                'order': [[0, 'asc']],
                language: { "url": resources.Datatable_Lang },
                pagingType: "full_numbers",
                "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

            });
        $('#VacationsviewTable tbody').unbind('click');
        $('#VacationsviewTable tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                VacationsviewTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });



    if (!canaddvac) {
        $("#bt_AddVacation").hide(0);
        $("#bt_AddVacation").unbind('click');
    }
    else {
        $("#bt_AddVacation").show(0);
        $("#bt_AddVacation").on('click', function () {
            AddVacation();
        });
    }
    if (canaddvac || caneditvac) {
        $("#bt_saveVacationForm").on('click', function () {
            SaveVacation();
        });
    }

}
function UserVacationTypeListSelection(id, vname) {
    $(Select_VacType_Control).val(vname).change();
    $(Select_VacType_Control).attr("data-id", id);
    $('#VacationTypeListDialog').modal('hide');
    $(Select_VacType_Control).focus();
}
function ReloadVacationTypeList(DontCreateTable) {
    if (DontCreateTable && VacationTypeListTable != null)
        return;
    if (VacationTypeListTable != null) {
        VacationTypeListTable.clear();
        VacationTypeListTable.destroy();
    }
    VacationTypeListTable = $('#VacationTypeListTable').DataTable({
        ajax: "",
        autoWidth: false,
        data: VacationTypeData,
        columns: [{ data: "vtype_name" }],
        columnDefs: [
            { "width": "100%", "targets": 0 },
        ],
        createdRow: function (row, data, index) {
            if (data.length != 0) {
                jQuery(row).attr('data-id', data.vtype_id).attr('data-index', index);
                jQuery(row).attr('data-name', data.vtype_name);
                jQuery(row).on('click', function (event) {
                    UserVacationTypeListSelection(jQuery(this).attr('data-id'), jQuery(this).attr('data-name'));

                });
            }
        },
        filter: true,
        rowId: 'vtype_id',
        info: false,
        ordering: true,
        "order": [],
        language: { "url": resources.Datatable_Lang },
        pagingType: "full_numbers",
        "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

    });
}