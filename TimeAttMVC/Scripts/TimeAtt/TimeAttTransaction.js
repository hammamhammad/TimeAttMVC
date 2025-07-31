var FingerTimeSheetTable = null;
var TransviewTimeSheetTable = null
var FingerFilter = null;
var FingerChanged = false;
var FingerReasonData = null;
var FingerReasoListTable = null;

///////////FingerPrint////////////////////////////
var isFingerPrintUpdate = false;
function InitializeFingerPrint() {
    
    ReloadFingerReasons();
    FillFingerReason();
    $('#FingerReasonListDialog').on('shown.bs.modal', function () {
        
        ReloadFingerReasonList(true);
    });
    $('#fb_shiftfromtimetrans').timepicker({ 'timeFormat': 'H:i', 'step': 1 }).bind('timeFormatError timeRangeError', function () {
        $('#fb_shiftfromtimetrans').val('');
        $('#fb_shiftfromtimetrans').focus();
    });
    $('#fb_TransRequestTime').timepicker({ 'timeFormat': 'H:i', 'step': 1 }).bind('timeFormatError timeRangeError', function () {
        $('#fb_TransRequestTime').val('');
        $('#fb_TransRequestTime').focus();
    });
    $("#bt_AddFinger").unbind('click');

    if (!HasPermission(5, 'trans-add')) {

        $("#bt_AddFinger").hide();
    }
    else {
        $("#bt_AddFinger").show();
        $("#bt_AddFinger").on('click', function () {
            OpenFingerTransactionDialog(null);
        });
    }

    $('.dpe').datepicker({ todayHighlight: true, todayBtn: "linked", });
    $('.dpe').datepicker('update', new Date());
    $('.dpef').datepicker({ todayHighlight: true, todayBtn: "linked", });


}
function UserFingerReasonListSelection(id, excname) {
    $(Select_FingerReason_Control).val(excname).change();
    $(Select_FingerReason_Control).attr("data-id", id);
    $('#FingerReasonListDialog').modal('hide');
    $(Select_FingerReason_Control).focus();
}
function ReloadFingerReasons() {


    var apiurl = prefixApiURL + "TimeSheet/Reasons/GetAll";
    $.get(apiurl).done(function (data) {
        if (data.Status != "1") {
            ShowAlert(resources.LoadReasonTransListErrorMsg + data.Msg, resources.TransactionEditReasonsTitle, "danger");
        }
        else {
            //if (data.Result != null && data.Result.length > 0)
            //    FingerReasoListTable.rows.add(data.Result).draw();
            FingerReasonData = data.Result;

        }

    }).fail(function (jqxhr, settings, exception) {
        ShowAlert(resources.LoadReasonTransListErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.TransactionEditReasonsTitle, "danger");
    })

}
function ReloadFingerReasonList(DontCreateTable) {
    
    if (DontCreateTable && FingerReasoListTable != null)
        return;
    if (FingerReasoListTable != null) {
        FingerReasoListTable.clear();
        FingerReasoListTable.destroy();
    }
    FingerReasoListTable = $('#FingerReasoListTable').DataTable({
        ajax: "",
        autoWidth: false,
        data: FingerReasonData,
        columns: [{ data: "uptTransReason_name" }],
        columnDefs: [
            { "targets": 0 }
        ],
        createdRow: function (row, data, index) {
            if (data.length != 0) {
                jQuery(row).attr('data-id', data.uptTransReason_id).attr('data-index', index);
                jQuery(row).attr('data-name', data.uptTransReason_name);
                jQuery(row).on('click', function (event) {
                    UserFingerReasonListSelection(jQuery(this).attr('data-id'), jQuery(this).attr('data-name'));

                });
            }
        },
        filter: true,
        rowId: 'uptTransReason_id',
        info: false,
        ordering: true,
        "order": [],
        language: { "url": resources.Datatable_Lang },
        pagingType: "full_numbers",
        "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

    });
}
function SearchFinger() {
    $("#bt_AddExcuse").unbind('click');
    $("#bt_saveExcuse").unbind('click');
    var candeleteexc = HasPermission(7, 'exc-delete');
    var caneditexc = HasPermission(7, 'exc-edit');
    var canaddexc = HasPermission(7, 'exc-add');

    var searchBody = {
        FromDate: $("#Finger_FromDate").datepicker("getDate").ToOADate(),
        ToDate: $("#Finger_ToDate").datepicker("getDate").ToOADate(),
        Type: $('#txt_Select_FingerReason').attr('data-id'),
        Emp_ID: $('#txt_Select_FingerEmployee').attr('data-id'),
        Sec_ID: $('#txt_Select_FingerSection').attr('data-id'),
        Reg_ID: $('#txt_Select_FingerBranch').attr('data-id'),
    }
    $.post(prefixApiURL + "TimeSheet/GetAllFingerPrint", searchBody).done(function (data) {
        if (FingerTimeSheetTable != null) {
            FingerTimeSheetTable.clear();
            FingerTimeSheetTable.destroy();
        }
        FingerTimeSheetTable = $('#FingerTimeSheetTable').DataTable(
            {
                ajax: "",
                autoWidth: false,
                data: data.Result,
                columns: [{ data: "emp_no" }, { data: "emp_name" }, { data: "trans_reasonName" }, { data: "trans_date_s" }, { data: "trans_time" }],
                columnDefs: [
                    { "width": "10%", "targets": 0 },
                    { "width": "30%", "targets": 1 },
                    { "width": "20%", "targets": 2 },
                    { "width": "10%", "targets": 3 },
                    { "width": "10%", "targets": 4 },

                    {
                        "width": "10%", "targets": 5,
                        "render": function (data, type, row) {
                            return '<input type="checkbox" class="bigCheckbox" disabled name="id[]" ' + (row.trans_status ? 'checked' : '') + '>';
                        }, "searchable": false
                    },
                    {
                        className: "col-centered", "width": "5%", "targets": 6,
                        "render": function (data, type, row) {
                            return '<span class="glyphicon glyphicon-edit  col-edit handcursor" data-id=' + row.trans_id + ' onclick="if(IsDisabled(this)) { return };EditFingerRow($(this))"></span>';
                        }, "visible": caneditexc, "searchable": false
                    }
                ],
                filter: true,
                rowId: 'exc_id',
                info: false,
                ordering: true,
                'order': [[0, 'asc']],
                language: { "url": resources.Datatable_Lang },
                pagingType: "full_numbers",
                "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

            });
        $('#ExcusesviewTable tbody').unbind('click');
        $('#ExcusesviewTable tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                ExcusesviewTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });




}

function OpenFingerTransactionDialog(obj) {
    $("#fb_bt_saveFingerTrans").unbind('click');
    if (obj == null) {
        if (!HasPermission(5, "trans-add")) {

            ShowMessage(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle);
            return;
        }
        TransID = 0
        $("#fb_bt_saveFingerTrans").on('click', function (e) {
            e.preventDefault(); if ($(this).hasClass('disabled')) return;
            else {
                action = 'AddTrans';
                SaveFingerTrans();
            }

        });
        $('#fb_TransactionFormDialog').modal('show');
    }

}
function FillFingerReason() {
    
    var options = $("#fb_Reason_AddTrans");
    var options2 = $("#fb_Reason_TransRequest");
    options.empty();
    options2.empty();
    if (FingerReasonData == null) {

        var apiurl = prefixApiURL + "TimeSheet/Reasons/GetAll";
        $.get(apiurl).done(function (data) {
            if (data.Status != "1") {
                ShowMessage(data.Msg, action == "AddTrans" ? resources.AddTransactionTitle : resources.UpdateTransactionTitle);
            }
            else {
                FingerReasonData = data.Result;
                $.each(FingerReasonData, function () {
                    options.append($("<option />").val(this.uptTransReason_id).text(this.uptTransReason_name));
                    options2.append($("<option />").val(this.uptTransReason_id).text(this.uptTransReason_name));
                });
            }
        }).fail(function (jqxhr, settings, exception) {
            ShowMessage(GetErrorFromString(jqxhr.responseText).Msg, action == "AddTrans" ? resources.AddTransactionTitle : resources.UpdateTransactionTitle);
        })
    }
    else {
        $.each(FingerReasonData, function () {            
            options.append($("<option />").val(this.uptTransReason_id).text(this.uptTransReason_name));
            options2.append($("<option />").val(this.uptTransReason_id).text(this.uptTransReason_name));
        });
    }
}
function ClearFingerForm() {

    $('#shiftfromtime').val("");
    $('#shifttotime').val("");
    $('#excNotes_edit').val("");
    $('.dpef').datepicker('update', new Date());
    $('.dpef').datepicker('update', '');
    $("#txt_Select_ExcusesformEmployee").val("").attr("data-id", 0).prop('disabled', false);
    $('#RB_ExcuseNormalReason').prop('checked', true).change().click();
    $("#chk_IsApproved").prop('disabled', false);
    $('#chk_IsApproved').prop('checked', true).change();
    $("#chk_IsApproved").prop('disabled', false);
    //ExcuseReasonData = null;
    //FillExcuseReason();
    setTimeout(function () {
        $("form#frmExcuseFormDialog").validator("destroy");
        $("#list-unstyled").remove();
        $("form#frmExcuseFormDialog").find('.has-error').removeClass("has-error");
        $("form#frmExcuseFormDialog").find('.has-success').removeClass("has-success");
        $("form#frmExcuseFormDialog").find('.glyphicon-remove').not($('.add-on').find("span:first")).removeClass("glyphicon-remove");
        $("form#frmExcuseFormDialog").find('.glyphicon-ok').not($('.add-on').find("span:first")).removeClass("glyphicon-ok");
        $('#frmExcuseFormDialog').validator({
            custom: {
                required: function ($el) { return !!$.trim($el.val()) }
            },
            errors: {
                required: 'Please fill out this field.'
            }
        });
    }, 100);
}
function SaveFingerTrans() {
    if (!form_validate("frmTransactionFormDialog")) {
        return;
    }

    if (IsTwoShift && IsAllowTwoShifts && $("input[name='shiftINOUT']:checked").val() == null) {
        ShowTransAlert(resources.SelectTransCVCodeMSG, "danger");
        return;
    }
    var transEmpID = $('#txt_Select_FingerformEmployee').attr('data-id');
    var transDateNo = new Date($("#addTrans_Date").datepicker("getDate").ToDateString("yyyy-MM-dd")).ToOADate()

    if ($("#fb_Reason_AddTrans").val() != "" && $("#fb_shiftfromtimetrans").val() != "") {
        var TransData = {
            "trans_id": TransID,
            "m_time": $("#fb_shiftfromtimetrans").val(),
            "emp_id": transEmpID,
            "ModifiedReasonID": $("#fb_Reason_AddTrans").val(),
            "acc_date": ($('#fb_plusoneday').prop("checked") ? parseInt(transDateNo, 10) + 1 : transDateNo),
            "DateNo": transDateNo,
            "m_id": 0,
            "m_date": "",
            "m_status": true,
            "m_typ": 1,
            "StatusName": "ناجحة",
            "emp_no": "",
            "emp_card": "",
            "emp_name": "",
            "m_deleted": false,
            "m_mode": 1,
            "m_manual": true,
            "m_unitid": 0,
            "m_unit": "",
            "ModifiedReason": null,
            "m_transtype": 1,
            "CV_CODE": $("input[name='fb_shiftINOUT']:checked").val() == null ? 1 : $("input[name='fb_shiftINOUT']:checked").val()

        }
        var apiurl = "";

        apiurl = prefixApiURL + "TimeSheet/Daily/" + action;
        $.ajax({
            type: "POST",
            url: apiurl,
            dataType: 'json',
            cache: false,
            data: TransData
        }).done(function (data) {
            if (data.Status != "1") {
                $('#fb_TransactionFormDialog').modal('hide');
                ShowAlert(data.Msg, "danger");
            }
            else {
                $('#fb_TransactionFormDialog').modal('hide');
                ShowAlert(data.Msg, "success");
            }
        }).fail(function (jqxhr, settings, exception) {
            $('#fb_TransactionFormDialog').modal('hide');
            ShowTransAlert((action == 'AddTrans' ? resources.AddTransErrorMsg : resources.SaveTransErrorMsg) + GetErrorFromString(jqxhr.responseText).Msg, "danger");
        }).always(function () {
        });
    }
}

function EditFingerRow(obj) {

    var req_id = parseInt((obj.attr("data-id")));
    if (req_id == "0" || req_id == 0)
        return;
    ClearExcuseForm();
    isUpdate = true;
   // $("#gridSystemModalExcuseTitle").html(resources.EditExcuseTitle);
    $("#fb_bt_saveRequestData").unbind('click');
    
    var apiurl = prefixApiURL + "TimeSheet/GetTransRequestByID/" + req_id;
    $.get(apiurl).done(function (data) {
        if (data.Status != "1") {
            ShowAlert(data.Msg, resources.TransRequestInfoTitle, "danger");
        }
        else {
            if (data.Result != null) {    

                $("#fb_Reason_TransRequest").val(data.Result.trans_reason);
                $('#fb_TransRequestTime').val(data.Result.trans_time);
                $('#fb_TransRequestNotes_edit').val(data.Result.Note);
                $("#chk_IsApproved").prop('disabled', false);
                $('#chk_IsApproved').prop('checked', data.Result.trans_status).change();
                $("#chk_IsApproved").prop('disabled', false);
                $("#TransRequest_Date").datepicker('update', new Date((data.Result.trans_date).FromOADate()));
                $("#lblRequestEmployee").html(data.Result.emp_name);
                $("#fb_bt_saveRequestData").on('click', function () {
                    
                    UpdateFingerRequest(data.Result.trans_empid,req_id);
                });
                $('#fb_RequestDataDialog').modal("show");
            }
        }
    }).fail(function (jqxhr, settings, exception) {
        ShowAlert(resources.ErrorExcusRetriveData + GetErrorFromString(jqxhr.responseText).Msg, resources.ExcuseInfoTitle, "danger");
    });
}
function UpdateFingerRequest(transEmpID, req_id) {
    debugger
    var transDateNo = new Date($("#TransRequest_Date").datepicker("getDate").ToDateString("yyyy-MM-dd")).ToOADate()
    var TransData = {
        "trans_id": req_id,
        "m_time": $("#fb_TransRequestTime").val(),
        "emp_id": transEmpID,
        "ModifiedReasonID": $("#fb_Reason_TransRequest").val(),
        "acc_date": transDateNo,
        "DateNo": transDateNo,
        "m_id": 0,
        "m_date": "",
        "m_status": $("#chk_IsApproved").prop('checked'),
        "m_typ": 1,
        "StatusName": "ناجحة",
        "emp_no": "",
        "emp_card": "",
        "emp_name": "",
        "m_deleted": false,
        "m_mode": 1,
        "m_manual": true,
        "m_unitid": 0,
        "m_unit": "",
        "ModifiedReason": null,
        "m_transtype": 1,
        "CV_CODE": 1,
        "Note": $("#fb_TransRequestNotes_edit").val()
    }
    var apiurl = "";

    apiurl = prefixApiURL + "TimeSheet/UpdateFingerPrintRequest";
    $.ajax({
        type: "POST",
        url: apiurl,
        dataType: 'json',
        cache: false,
        data: TransData
    }).done(function (data) {
        if (data.Status != "1") {
            $('#fb_RequestDataDialog').modal('hide');
            ShowAlert(data.Msg, "danger");
        }
        else {
            SearchFinger();
            $('#fb_RequestDataDialog').modal('hide');

            ShowAlert(data.Msg, "success");
        }
    }).fail(function (jqxhr, settings, exception) {
        $('#fb_RequestDataDialog').modal('hide');
        ShowAlert( resources.SaveTransErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, "danger");
    }).always(function () {
    });
}

function printFingerTrans() {

    searchBody = {
        FromDate: $("#Finger_FromDate").datepicker("getDate").ToOADate(),
        ToDate: $("#Finger_ToDate").datepicker("getDate").ToOADate(),
        Type: $('#txt_Select_FingerReason').attr('data-id'),
        Emp_ID: $('#txt_Select_FingerEmployee').attr('data-id'),
        Sec_ID: $('#txt_Select_FingerSection').attr('data-id'),
        Reg_ID: $('#txt_Select_FingerBranch').attr('data-id'),
    }
    ShowReportMode(GetRootURL() + "TimeSheet/FingerPrint/PrintReport", searchBody, true);
}
