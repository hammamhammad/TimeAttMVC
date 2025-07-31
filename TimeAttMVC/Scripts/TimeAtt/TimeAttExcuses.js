var ExcuseReasonTable = null;
var ExcuseReasonData = null;
var ExcusesviewTable = null;
var Select_ExcuseReason_Control = null;
var ExcuseReasoListTable = null;
function InitializeExcusesView() {
    InitializeExcuseReasons();
    InitializeExcusesManagment();
    $('#ExcusesTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab("show");
        if ($(this).attr("id") == "Excusestab-link" && ExcusesviewTable == null) {
            SearchExcuses();
        }
    })

}
//////Excuse Reasons////////////////////
function InitializeExcuseReasons() {
    ReloadExcuseReasons();
    $('#ExcuseReasonDialog').on('shown.bs.modal', function () {

        $('#txt_ExcuseReasonName_Edit').focus();
    });
    $('.ExcuseTypeRadios').on('click', 'input[type=radio]', function () {
        $(this).closest('.ExcuseTypeRadios').find('.radio-inline, .radio').removeClass('checked');
        $(this).closest('.radio-inline, .radio').addClass('checked');
    });
}
function ClearExcuseReasonsForm() {
    action = "";
    $('#txt_ExcuseReasonName_Edit').val("");
    $('#txt_ExcuseReasonNameEN_Edit').val("");
    $('#RB_ExcuseNormalType').prop('checked', true).change().click();
    setTimeout(function () {
        $("form#ExcuseReasonForm").validator("destroy");
        $("#list-unstyled").remove();
        $("form#ExcuseReasonForm").find('.has-error').removeClass("has-error");
        $("form#ExcuseReasonForm").find('.has-success').removeClass("has-success");
        $("form#ExcuseReasonForm").find('.glyphicon-remove').not($('.add-on').find("span:first")).removeClass("glyphicon-remove");
        $("form#ExcuseReasonForm").find('.glyphicon-ok').not($('.add-on').find("span:first")).removeClass("glyphicon-ok");
        $('#ExcuseReasonForm').validator({
            custom: {
                required: function ($el) { return !!$.trim($el.val()) }
            },
            errors: {
                required: 'Please fill out this field.'
            }
        });
    }, 100);
}
function SaveExcuseReason(ID) {
    if (!form_validate("ExcuseReasonForm")) {
        return;
    }
    var formdata = {
        "execuseReason_id": ID,
        "execuseReason_name": $('#txt_ExcuseReasonName_Edit').val(),
        "execuseReason_nameEN": $('#txt_ExcuseReasonNameEN_Edit').val(),
        "exc_type": $('input[name=ExcuseType]:checked').val()
    }
    var apiurl = "";

    apiurl = prefixApiURL + "Excuses/Reasons/" + action;
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
                ShowMessage(data.Msg, resources.ExcuesReasonsTitle);
            }
            else {
                if (action == 'Add') {
                    ExcuseReasonTable.row().addRow(data.Result, true);
                    ExcuseReasonData.push(data.Result);
                }
                else if (action == 'Update') {
                    ExcuseReasonTable.row().updateRow(ID, data.Result, true);
                    jQuery.grep(ExcuseReasonData, function (a) {
                        if (a.execuseReason_id == ID) { a.execuseReason_name = data.Result.execuseReason_name; a.exc_type = data.Result.exc_type }
                    });
                }

                $('#ExcuseReasonDialog').modal('hide');
                ShowAlert(data.Msg, (action == 'Add' ? resources.ExcuseReasonAddTitle : resources.ExcuseReasonEditTitle), "success");
            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert((action == 'Add' ? resources.AddExcuseReasonErrorMsg : resources.SaveExcuseReasonErrorMsg) + ":" + GetErrorFromString(jqxhr.responseText).Msg, resources.ExcuseReasonEditTitle, "danger");
        }).always(function () {
        });
}
function EditExcuseReasonRow(obj) {
    if (!HasPermission(7, 'exc-editReason')) {
        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    var ExcReasonID = 0;
    if (obj != null) {
        ExcReasonID = $(obj).attr('data-id');
        if (ExcReasonID == "0" || ExcReasonID == 0)
            return;
    }
    else
        return;

    ClearExcuseReasonsForm();
    $("#gridSystemModalExcuseReason").html(resources.ExcuseReasonEditTitle);
    $('#ExcuseReasonDialog').modal("show");
    $("#bt_saveExcuseReason").unbind('click');
    var apiurl = prefixApiURL + "Excuses/Reasons/GetByID/" + ExcReasonID
    $.get(apiurl).done(function (data) {
        if (data.Status != "1") {
            ShowTransAlert(data.Msg, resources.ExcuesReasonsTitle, "danger");
        }
        else {
            if (data.Result != null) {
                if (data.Result.exc_type == 1)
                    $('#RB_ExcuseNormalType').prop('checked', true).change().click();
                else if (data.Result.exc_type == 2)
                    $('#RB_ExcuseJobType').prop('checked', true).change().click();
                else if (data.Result.exc_type == 3)
                    $('#RB_RemotelyWorkType').prop('checked', true).change().click();
                else if (data.Result.exc_type == 4)
                    $('#RB_SpecialType').prop('checked', true).change().click();

                $("#txt_ExcuseReasonName_Edit").val(data.Result.execuseReason_name);
                $("#txt_ExcuseReasonNameEN_Edit").val(data.Result.execuseReason_nameEN);
                $("#bt_saveExcuseReason").on('click', function () {
                    SaveExcuseReason(ExcReasonID);
                });
                action = 'Update';

            }
        }
    }).fail(function (jqxhr, settings, exception) {
        ShowAlert(resources.ErrorRetrievedDataMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.ExcuesReasonsTitle, "danger");
    });
}
function DeleteExcuseReasonRow(obj) {
    if (!HasPermission(7, 'exc-deleteReason')) {
        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    var ExcReasonID = 0;
    if (obj != null) {
        ExcReasonID = $(obj).attr('data-id');
        if (ExcReasonID == "0" || ExcReasonID == 0)
            return;
    }
    else
        return;
    $.confirm({
        title: resources.ExcuseReasonDeleteTitle,
        content: resources.DeleteExcuseReasonConfirmationMsg.format(ExcuseReasonTable.row().getRow(ExcReasonID).data().execuseReason_name),
        confirmButton: resources.btDelete,
        cancelButton: resources.btCancel,
        confirmButtonClass: 'btn-danger',
        autoClose: 'cancel|15000',
        icon: 'fa fa-warning',
        animation: 'scalex',
        confirm: function () {

            var apiurl = prefixApiURL + "Excuses/Reasons/Delete/" + ExcReasonID;
            $.ajax
                ({
                    type: "POST",
                    url: apiurl,
                    dataType: 'json',
                    cache: false,
                    data: [] //formdata
                }).done(function (data) {
                    if (data.Status != "1") {
                        ShowAlert(data.Msg, resources.ExcuseReasonDeleteTitle, "danger");
                    }
                    else {
                        ExcuseReasonTable.row().deleteRow(ExcReasonID);
                        ExcuseReasonData.pop(data.Result);
                        ShowAlert(data.Msg, resources.ExcuseReasonDeleteTitle, "success");
                    }
                }).fail(function (jqxhr, settings, exception) {
                    ShowAlert(resources.DeleteExcuseReasonErrorMsg + ":" + GetErrorFromString(jqxhr.responseText).Msg, resources.ExcuseReasonDeleteTitle, "danger");
                }).always(function () {
                });
        }
    });
}
function AddExcuseReason() {
    if (!HasPermission(7, 'exc-addReason')) {
        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    ClearExcuseReasonsForm();
    $("#gridSystemModalExcuseReason").html(resources.ExcuseReasonAddTitle);
    $('#ExcuseReasonDialog').modal('show');
    $("#bt_saveExcuseReason").unbind('click');
    $("#bt_saveExcuseReason").on('click', function () {
        SaveExcuseReason(0);
    });
    action = 'Add';


}
function ReloadExcuseReasons(DontCreateTable) {
    $("#bt_AddExcuseReason").unbind('click');
    var candeleteReason = HasPermission(7, 'exc-deleteReason');
    var caneditReason = HasPermission(7, 'exc-editReason');
    var canaddReason = HasPermission(7, 'exc-addReason');

    $.getJSON(prefixApiURL + "Excuses/Reasons/GetAll").done(function (data) {
        ExcuseReasonData = data.Result;
        if (DontCreateTable)
            return;
        if (ExcuseReasonTable != null) {
            ExcuseReasonTable.clear();
            ExcuseReasonTable.destroy();
        }
        ExcuseReasonTable = $('#ExcuseReasonTable').DataTable(
            {
                ajax: "",
                autoWidth: false,
                data: data.Result,
                columns: [{ data: "execuseReason_name" }, { data: "execuseReason_nameEN" }],
                columnDefs: [
                    { "width": "40%", "targets": 0 },
                    { "width": "40%", "targets": 1 },
                    {
                        "width": "10%", "targets": 2,
                        "render": function (data, type, row) {
                            if (row.exc_type == 1)
                                return resources.NormalLable;
                            else if (row.exc_type == 2)
                                return resources.JobMissionLable;
                            else if (row.exc_type == 3)
                                return resources.RemotelyWorkLable;
                            else if (row.exc_type == 4)
                                return resources.SpecialDaysLable;
                            //return (row.exc_type == 1 ? resources.NormalLable : (row.exc_type == 3 ? resources.RemotelyWorkLable : resources.JobMissionLable));
                        }
                    },
                    {
                        className: "col-centered", "width": "5%", "targets": 3,
                        "render": function (data, type, row) {
                            return '<span class="glyphicon glyphicon-edit  col-edit handcursor" data-id=' + row.execuseReason_id + ' onclick="if(IsDisabled(this)) { return };EditExcuseReasonRow($(this))"></span>';
                        }, "visible": caneditReason, "searchable": false
                    },
                    {
                        className: "col-centered", "width": "5%", "targets": 4,
                        "render": function (data, type, row) {
                            return '<span class="glyphicon glyphicon-trash  col-delete handcursor" data-id=' + row.execuseReason_id + ' onclick="if(IsDisabled(this)) { return };DeleteExcuseReasonRow($(this))"></span>';
                        }, "visible": candeleteReason, "searchable": false
                    }
                ],
                filter: true,
                rowId: 'execuseReason_id',
                info: false,
                ordering: true,
                "order": [],
                language: { "url": resources.Datatable_Lang },
                pagingType: "full_numbers",
                "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

            });
        $('#ExcuseReasonTable tbody').unbind('click');
        $('#ExcuseReasonTable tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                ExcuseReasonTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });



    if (!canaddReason) {
        $("#bt_AddExcuseReason").hide(0);
        $("#bt_AddExcuseReason").unbind('click');
    }
    else {
        $("#bt_AddExcuseReason").show(0);
        $("#bt_AddExcuseReason").on('click', function () {
            AddExcuseReason();
        });
    }
}
////////////////////////////////////////

////// Excuses /////////////////////////
var isUpdate = false;
function InitializeExcusesManagment() {
    $('#ExcuseReasonListDialog').on('shown.bs.modal', function () {
        ReloadExcuseReasonList(true);
    });
    $('.ExcuseResonRadios').on('click', 'input[type=radio]', function () {
        $(this).closest('.ExcuseResonRadios').find('.radio-inline, .radio').removeClass('checked');
        $(this).closest('.radio-inline, .radio').addClass('checked');
    });
    $('#shiftfromtime').timepicker({ 'timeFormat': 'H:i', 'step': 1 }).bind('timeFormatError timeRangeError', function () {
        $('#shiftfromtime').val('');
        $('#shiftfromtime').focus();
    });
    $('#shifttotime').timepicker({ 'timeFormat': 'H:i', 'step': 1 }).bind('timeFormatError timeRangeError', function () {
        $('#shifttotime').val('');
        $('#shifttotime').focus();
    });
    //$('#ExcuseFormDialog').on('shown.bs.modal', function () {
    //    if (CurrentID == 0) {
    //        $("#gridSystemModalExcuseTitle").html(resources.AddExcuseTitle);
    //    }
    //    else {
    //        $("#gridSystemModalvacationTitle").html(resources.EditExcuseTitle);
    //    }
    //});


    $('.dpe').datepicker({ todayHighlight: true, todayBtn: "linked", });
    $('.dpe').datepicker('update', new Date());
    $('.dpef').datepicker({ todayHighlight: true, todayBtn: "linked", });
    $("#pn_Excuseviewspan").on('click', function (e) {
        var $this = $(this);
        if (!$this.hasClass('panel-collapsed')) {
            $("#pn_Excuseviewbody").slideUp();
            $this.addClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        } else {
            $("#pn_Excuseviewbody").slideDown();
            $this.removeClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
    });
    if (!HasPermission(8, "rep-exc")) {
        $("#PrintExcuse").hide();
    }
    else {
        $("#PrintExcuse").click(function (e) { e.preventDefault(); PrintExcuse(); })
    }
    //

}
function UserExcuseReasonListSelection(id, excname) {
    $(Select_ExcuseReason_Control).val(excname).change();
    $(Select_ExcuseReason_Control).attr("data-id", id);
    $('#ExcuseReasonListDialog').modal('hide');
    $(Select_ExcuseReason_Control).focus();
}
function ReloadExcuseReasonList(DontCreateTable) {
    if (DontCreateTable && ExcuseReasoListTable != null)
        return;
    if (ExcuseReasoListTable != null) {
        ExcuseReasoListTable.clear();
        ExcuseReasoListTable.destroy();
    }
    ExcuseReasoListTable = $('#ExcuseReasoListTable').DataTable({
        ajax: "",
        autoWidth: false,
        data: ExcuseReasonData,
        columns: [{ data: "execuseReason_name" }],
        columnDefs: [
            { "width": "80%", "targets": 0 },
            {
                "width": "10%", "targets": 1,
                "render": function (data, type, row) {
                    return (row.exc_type == 1 ? resources.NormalLable : resources.JobMissionLable);
                }
            },
        ],
        createdRow: function (row, data, index) {
            if (data.length != 0) {
                jQuery(row).attr('data-id', data.execuseReason_id).attr('data-index', index);
                jQuery(row).attr('data-name', data.execuseReason_name);
                jQuery(row).on('click', function (event) {
                    UserExcuseReasonListSelection(jQuery(this).attr('data-id'), jQuery(this).attr('data-name'));

                });
            }
        },
        filter: true,
        rowId: 'execuseReason_id',
        info: false,
        ordering: true,
        "order": [],
        language: { "url": resources.Datatable_Lang },
        pagingType: "full_numbers",
        "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

    });
}
function SearchExcuses() {
    $("#bt_AddExcuse").unbind('click');
    $("#bt_saveExcuse").unbind('click');
    var candeleteexc = HasPermission(7, 'exc-delete');
    var caneditexc = HasPermission(7, 'exc-edit');
    var canaddexc = HasPermission(7, 'exc-add');

    var searchBody = {
        FromDate: $("#Excuseview_FromDate").datepicker("getDate").ToOADate(),
        ToDate: $("#Excuseview_ToDate").datepicker("getDate").ToOADate(),
        Type: $('#txt_Select_ExcuseReason').attr('data-id'),
        Emp_ID: $('#txt_Select_ExcuseviewEmployee').attr('data-id'),
        Sec_ID: $('#txt_Select_ExcuseviewSection').attr('data-id'),
        Reg_ID: $('#txt_Select_ExcuseviewBranch').attr('data-id'),
    }
    $.post(prefixApiURL + "Excuses/GetAll", searchBody).done(function (data) {
        if (ExcusesviewTable != null) {
            ExcusesviewTable.clear();
            ExcusesviewTable.destroy();
        }
        ExcusesviewTable = $('#ExcusesviewTable').DataTable(
            {
                ajax: "",
                autoWidth: false,
                data: data.Result,
                columns: [{ data: "emp_no" }, { data: "emp_name" }, { data: "execuseReason_Name" }, { data: "exc_date" }, { data: "exc_ftime" }, { data: "exc_ttime" }, { data: "exc_hours" }],
                columnDefs: [
                    { "width": "10%", "targets": 0 },
                    { "width": "20%", "targets": 1 },
                    { "width": "20%", "targets": 2 },
                    { "width": "10%", "targets": 3 },
                    { "width": "8%", "targets": 4 },
                    { "width": "8%", "targets": 5 },
                    { "width": "10%", "targets": 6 },

                    {
                        "width": "4%", "targets": 7,
                        "render": function (data, type, row) {
                            return '<input type="checkbox" class="bigCheckbox" disabled name="id[]" ' + (row.exc_status ? 'checked' : '') + '>';
                        }, "searchable": false
                    },
                    {
                        className: "col-centered", "width": "5%", "targets": 8,
                        "render": function (data, type, row) {
                            return '<span class="glyphicon glyphicon-edit  col-edit handcursor" data-id=' + row.exc_id + ' onclick="if(IsDisabled(this)) { return };EditExcuseRow($(this))"></span>';
                        }, "visible": caneditexc, "searchable": false
                    },
                    {
                        className: "col-centered", "width": "5%", "targets": 9,
                        "render": function (data, type, row) {
                            return '<span class="glyphicon glyphicon-trash  col-delete handcursor" data-id=' + row.exc_id + ' onclick="if(IsDisabled(this)) { return };DeleteExcuseRow($(this))"></span>';
                        }, "visible": candeleteexc, "searchable": false
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



    if (!canaddexc) {
        $("#bt_AddExcuse").hide(0);
        $("#bt_AddExcuse").unbind('click');
    }
    else {
        $("#bt_AddExcuse").show(0);
        $("#bt_AddExcuse").on('click', function () {
            AddExcuse();
        });
    }
    if (canaddexc || caneditexc) {
        $("#bt_saveExcuse").on('click', function () {
            SaveExcuse();
        });
    }
}
function PrintExcuse() {
    ///
    var searchBody = {
        FromDate: $("#Excuseview_FromDate").datepicker("getDate").ToOADate(),
        ToDate: $("#Excuseview_ToDate").datepicker("getDate").ToOADate(),
        Type: $('#txt_Select_ExcuseReason').attr('data-id'),
        Emp_ID: $('#txt_Select_ExcuseviewEmployee').attr('data-id'),
        Sec_ID: $('#txt_Select_ExcuseviewSection').attr('data-id'),
        Reg_ID: $('#txt_Select_ExcuseviewBranch').attr('data-id'),
    }
    ShowReportMode(GetRootURL() + "Excuses/PrintReport", searchBody, true);
}
function ExcuseTypeRadioChanged(obj) {
    if (!isUpdate ) {
        if (obj.value == 1) {
            $("#divExcuseform_ToDate").hide();
        }
        else {
            $("#divExcuseform_ToDate").fadeIn(200);
        }
    }
    FillExcuseReason();
    
}
function FillExcuseReason() {
    var options = $("#dd_ExcuseReason_edit");
    options.empty();
    if (ExcuseReasonData == null) {

        var apiurl = prefixApiURL + "Excuses/Reasons/GetAll";
        $.get(apiurl).done(function (data) {
            if (data.Status != "1") {
                ShowMessage(data.Msg, action == "AddExcuse" ? resources.AddExcuseTitle : resources.EditExcuseTitle);
            }
            else {
                ExcuseReasonData = data.Result;
                var ExcuseReasonDatabyType = jQuery.grep(ExcuseReasonData, function (a) {
                    return a.exc_type == parseInt($('input[name=ExcuseReason]:checked').val());
                });
                if (ExcuseReasonDatabyType != null && ExcuseReasonDatabyType.length > 0) {
                    $.each(ExcuseReasonDatabyType, function () {
                        options.append($("<option />").val(this.execuseReason_id).text(this.execuseReason_name));
                    });
                }
            }

        }).fail(function (jqxhr, settings, exception) {
            ShowMessage(GetErrorFromString(jqxhr.responseText).Msg, action == "AddExcuse" ? resources.AddExcuseTitle : resources.EditExcuseTitle);
        })
    }
    else {
        var ExcuseReasonDatabyType = jQuery.grep(ExcuseReasonData, function (a) {
            return a.exc_type == parseInt($('input[name=ExcuseReason]:checked').val());
        });
        if (ExcuseReasonDatabyType != null && ExcuseReasonDatabyType.length > 0) {
            $.each(ExcuseReasonDatabyType, function () {
                options.append($("<option />").val(this.execuseReason_id).text(this.execuseReason_name));
            });
        }
    }
}
function ClearExcuseForm() {

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
function SaveExcuse(exc_id) {
    if (!form_validate("frmExcuseFormDialog")) {
        return;
    }
    if (exc_id == 0) {
        if (!HasPermission(7, 'exc-add')) {
            ShowMessage(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle);
            return;
        }

    }
    else {
        if (!HasPermission(7, 'exc-edit')) {
            ShowMessage(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle);
            return;
        }
    }
    action = exc_id == 0 ? "Add" : "Update";
    var type = $('input[name=ExcuseReason]:checked').val();
    var ExcuseData = {
        "exc_id": exc_id,
        "exc_empid": $("#txt_Select_ExcusesformEmployee").attr("data-id"),
        "exc_date": new Date($("#Excuseform_FromDate").datepicker("getDate").ToDateString("yyyy-MM-dd")).ToOADate(),//$("#Excuseform_FromDate").datepicker("getDate").ToOADate(),
        "exc_todate": type != 1 ? (new Date($("#Excuseform_ToDate").datepicker("getDate").ToDateString("yyyy-MM-dd")).ToOADate()) : new Date($("#Excuseform_FromDate").datepicker("getDate").ToDateString("yyyy-MM-dd")).ToOADate(),//$("#Excuseform_FromDate").datepicker("getDate").ToOADate(),
        "exc_ftime": $("#shiftfromtime").val(),
        "exc_ttime": $("#shifttotime").val(),
        "exc_reason": $("#excNotes_edit").val(),
        "exc_deleted": false,
        "exc_status": $("#chk_IsApproved").prop('checked'),
        "execuseReason_ID": $("#dd_ExcuseReason_edit").val(),
        "exc_type": type

    };

    var apiurl = "";

    apiurl = prefixApiURL + "Excuses/" + action;
    $.ajax
        ({
            type: "POST",
            url: apiurl,
            dataType: 'json',
            cache: false,
            data: ExcuseData
        }).done(function (data) {
            if (data.Status != "1") {
                ShowMessage(data.Msg, (action == 'Add' ? resources.AddExcuseTitle : resources.EditExcuseTitle));
            }
            else {
                if (action == 'Add') {
                    ExcusesviewTable.row().addRow(data.Result, true);
                }
                else if (action == 'Update') {
                    ExcusesviewTable.row().updateRow(exc_id, data.Result, true);
                }
                $('#ExcuseFormDialog').modal('hide');
                ShowAlert(data.Msg, (action == 'Add' ? resources.AddExcuseTitle : resources.EditExcuseTitle), "success");
            }

        }).fail(function (jqxhr, settings, exception) {
            ShowAlert((action == 'Add' ? resources.AddExcuseErrorMsg : resources.UpdateExcuseErrorMsg) + GetErrorFromString(jqxhr.responseText).Msg, (action == 'Add' ? resources.AddExcuseTitle : resources.EditExcuseTitle), "danger");
        }).always(function () {
        });

}
function AddExcuse() {

    isUpdate = false;
    ClearExcuseForm();
    $("#gridSystemModalExcuseTitle").html(resources.AddExcuseTitle);
    $('#ExcuseFormDialog').modal("show");
    $("#bt_saveExcuse").unbind('click');
    $("#bt_saveExcuse").on('click', function () {
        SaveExcuse(0);
    });
}
function EditExcuseRow(obj) {

    var exc_id = parseInt((obj.attr("data-id")));
    if (exc_id == "0" || exc_id == 0)
        return;
    ClearExcuseForm();
    isUpdate = true;
    $("#gridSystemModalExcuseTitle").html(resources.EditExcuseTitle);
    $("#bt_saveExcuse").unbind('click');
    var apiurl = prefixApiURL + "Excuses/GetByID/" + exc_id;
    $.get(apiurl).done(function (data) {
        if (data.Status != "1") {
            ShowTransAlert(data.Msg, resources.ExcuseInfoTitle, "danger");
        }
        else {
            if (data.Result != null) {
                if (data.Result.exc_type == 1)
                    $('#RB_ExcuseNormalReason').prop('checked', true).change().click();
                else if(data.Result.exc_type == 2)
                    $('#RB_ExcuseJobReason').prop('checked', true).change().click();
                else
                    $('#RB_RemotelyWorkReason').prop('checked', true).change().click();

                $("#dd_ExcuseReason_edit").val(data.Result.execuseReason_ID);
                $('#shiftfromtime').val(data.Result.exc_ftime);
                $('#shifttotime').val(data.Result.exc_ttime);
                $('#excNotes_edit').val(data.Result.exc_reason);
                $("#chk_IsApproved").prop('disabled', false);
                $('#chk_IsApproved').prop('checked', data.Result.exc_status).change();
                $("#chk_IsApproved").prop('disabled', false);
                $("#Excuseform_FromDate").datepicker('update', new Date((data.Result.exc_dateNo).FromOADate()));
                $("#txt_Select_ExcusesformEmployee").val(data.Result.emp_name).attr("data-id", data.Result.exc_empid).prop('disabled', true);
                $("#bt_saveExcuse").on('click', function () {
                    SaveExcuse(exc_id);
                });
                $('#ExcuseFormDialog').modal("show");
            }
        }
    }).fail(function (jqxhr, settings, exception) {
        ShowAlert(resources.ErrorExcusRetriveData + GetErrorFromString(jqxhr.responseText).Msg, resources.ExcuseInfoTitle, "danger");
    });
}
function DeleteExcuseRow(obj) {
    if (!HasPermission(7, 'exc-delete')) {
        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    var exc_id = 0;
    if (obj != null) {
        exc_id = $(obj).attr('data-id');
        if (exc_id == "0" || exc_id == 0)
            return;
    }
    else
        return;
    $.confirm({
        title: resources.ExcuseDeleteTitle,
        content: resources.DeleteExcuseConfirmationMsg,
        confirmButton: resources.btDelete,
        cancelButton: resources.btCancel,
        confirmButtonClass: 'btn-danger',
        autoClose: 'cancel|15000',
        icon: 'fa fa-warning',
        animation: 'scalex',
        confirm: function () {

            var apiurl = prefixApiURL + "Excuses/Delete/" + exc_id;
            $.ajax
                ({
                    type: "POST",
                    url: apiurl,
                    dataType: 'json',
                    cache: false,
                    data: [] //formdata
                }).done(function (data) {
                    if (data.Status != "1") {
                        ShowAlert(data.Msg, resources.ExcuseDeleteTitle, "danger");
                    }
                    else {
                        ExcusesviewTable.row().deleteRow(exc_id);

                        ShowAlert(data.Msg, resources.ExcuseDeleteTitle, "success");
                    }
                }).fail(function (jqxhr, settings, exception) {
                    ShowAlert(resources.DeleteExcuseErrorMsg + ":" + GetErrorFromString(jqxhr.responseText).Msg, resources.ExcuseDeleteTitle, "danger");
                }).always(function () {
                });
        }
    });
}
////////////////////////////////////////
