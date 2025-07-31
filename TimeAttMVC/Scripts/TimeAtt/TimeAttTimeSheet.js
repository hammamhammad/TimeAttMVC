//CurrentView=Reasons,Daily,Monthly,Transactions
var Reasonsview = false;
var Dailyview = false;
var Monthlyview = false;
var Exemptionsview = false;
var ExemptionsFilter = null;
var ExemptionsTimeSheetTable = null;

var FingerPrintview = false;
var Transactionsview = false;
var ReasonTable = null;
var ReasonsData = null;
var DailyTimeSheetTable = null;
var MonthlyDailyTimeSheetTable = null;
var MonthlyTimeSheetSummaryTable = null;
var MonthlyTimeSheetTable = null;
var TransviewTimeSheetTable = null
var reloaddata = true;
var DailyFilter = null;
var MonthlyFilter = null;
var ViolationFilter = null;
var TransactionFilter = null;
var EmpID = 0;
var DateNo = 0;
var DateNo2 = 0;
var Monthlyfrom_dateno = 0;
var Monthlyto_dateno = 0;
var DailyTimeSheetTransactions = null;
var TransID = 0;
var noteTrans = null;
var TimeOutID = null;
var DailyChanged = false;
var ExcuseReasonData = null;
var Select_Device_Control = null;
var DevicesListData = null;
var DeviceListTable = null;
var ViolationTimeSheetTable = null;
var ViolationLateTable = null;
var ViolationAbsenceTable = null;
var EmpNo = 0;
var UploadRef = 0;
///////////////////////////////////////////////////////////////
function InitializeTimeSheetView() {


    checkPermssions();
    if (Reasonsview) {
        InitializeReasons();
    }
    if (Dailyview) {
        InitializeDaily();
        if (!Reasonsview) {
            if (ReasonsData == null) {
                var apiurl = prefixApiURL + "TimeSheet/Reasons/GetAll";
                $.get(apiurl).done(function (data) {
                    if (data.Status != "1") {
                        ReasonsData = [];
                    }
                    else {
                        if (data.Result != null && data.Result.length > 0)
                            ReasonsData = data.Result;
                    }

                }).fail(function (jqxhr, settings, exception) {
                    ReasonsData = [];
                })
            }
        }
    }
    if (FingerPrintview) {
        InitializeFingerPrint();
        //if (!Reasonsview)
        //{
        //    if (ReasonsData == null) {
        //        var apiurl = prefixApiURL + "TimeSheet/Reasons/GetAll";
        //        $.get(apiurl).done(function (data) {
        //            if (data.Status != "1") {
        //                ReasonsData = [];
        //            }
        //            else {
        //                if (data.Result != null && data.Result.length > 0)
        //                    ReasonsData = data.Result;
        //            }

        //        }).fail(function (jqxhr, settings, exception) {
        //            ReasonsData = [];
        //        })
        //    }
        //}
    }
    if (Monthlyview) {
        InitializeMonthly();
    }
    if (Transactionsview) {
        InitializeTransactions();
    }
    if (Violationview) {
        InitializeViolation();
    }
    if (Exemptionsview) {
        InitializeExemptions();
    }

}
function hideTab(tabname) {
    if (tabname == '') return;
    $('#' + tabname).hide();
    $('#' + tabname + '-li').hide();
    $('#' + tabname + '-link').hide();
    $('#TimeSheetTabs  a:visible:first').tab('show')
}
function checkPermssions() {
    Reasonsview = HasPermission(4, 'timesheet-transreason');
    Dailyview = HasPermission(4, 'timesheet-daily');
    Monthlyview = HasPermission(4, 'timesheet-monthly');
    Transactionsview = HasPermission(4, 'timesheet-transdet');
    FingerPrintview = HasPermission(4, 'timesheet-daily');
    Violationview = HasPermission(4, 'timesheet-penalty');
    Exemptionsview = HasPermission(4, 'timesheet-exemptions');
    if (!Reasonsview && !Dailyview && !Monthlyview && !Transactionsview && !Exemptionsview)
        window.location.replace("Account/NotAuthorized");

    hideTab(Reasonsview ? '' : 'Reasonstab');
    hideTab(Dailyview ? '' : 'Dailytab');
    hideTab(Monthlyview ? '' : 'Monthlytab');
    hideTab(Transactionsview ? '' : 'Transactionstab');
    hideTab(Violationview ? '' : 'Violationtab');
    hideTab(FingerPrintview ? '' : 'FingerPrinttab');
    hideTab(Exemptionsview ? '' : 'ExemptionsPrinttab');
}
function ShowTransAlert(msg, classname) {
    if (TimeOutID != null)
        clearTimeout(TimeOutID);
    $("#divtransmsg").fadeOut("100");
    $("#divtransmsg").html(msg);
    $("#divtransmsg").removeClass();
    $("#divtransmsg").addClass("alert alert-" + classname)
    $("#divtransmsg").fadeIn("500");
    TimeOutID = setTimeout(function () {
        $("#divtransmsg").fadeOut("500");
    }, 5000);
}
/////////////////Reasons///////////////////
function InitializeReasons() {
    CreateReasonsTable();
    ReloadReason();
    $('#ReasonDialog').on('shown.bs.modal', function () {
        if (CurrentID == 0)
            ClearReasonForm();
        else {
            ClearReasonForm();
            GetReasonData();

        }
        $('#txt_ReasonName_Edit').focus()
    })
    $("#bt_saveReason").click(function (e) { e.preventDefault(); if ($(this).hasClass('disabled')) return; else SaveReasonData(); })

}
function CreateReasonsTable() {
    ReasonTable = $('#ReasonTable').DataTable(
        {
            ajax: "",
            autoWidth: false,
            data: [],
            columns: [{ data: "uptTransReason_id" }, { data: "uptTransReason_name" }, { data: "uptTransReason_nameEN" }
            ],
            columnDefs: [

                { "width": "10%", "targets": 0, "visible": false, "searchable": false },
                { "width": "45%", "targets": 1 },
                { "width": "45%", "targets": 2 },
                {
                    className: "col-centered", "width": "5%", "targets": 3,
                    "render": function (data, type, row) {
                        return '<span class="glyphicon glyphicon-edit  col-edit handcursor" data-id=' + row.uptTransReason_id + ' onclick="if(IsDisabled(this)) { return };EditReasonRow($(this))"></span>';
                    }
                },
                {
                    className: "col-centered", "width": "5%", "targets": 4,
                    "render": function (data, type, row) {
                        return '<span class="glyphicon glyphicon-trash  col-delete handcursor" data-id=' + row.uptTransReason_id + ' onclick="if(IsDisabled(this)) { return };DeleteReasonRow($(this))"></span>';
                    }
                }
            ],
            filter: true,
            rowId: 'uptTransReason_id',
            info: false,
            ordering: true,
            "order": [],
            language: { "url": resources.Datatable_Lang },
            pagingType: "full_numbers",
            "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

        });
    $('#ReasonTable tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            ReasonTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
}
function ReloadReason() {
    if (ReasonTable != null) {
        ReasonTable.clear().draw();
        var apiurl = prefixApiURL + "TimeSheet/Reasons/GetAll";
        $.get(apiurl).done(function (data) {
            if (data.Status != "1") {
                ShowAlert(resources.LoadReasonTransListErrorMsg + data.Msg, resources.TransactionEditReasonsTitle, "danger");
            }
            else {
                if (data.Result != null && data.Result.length > 0)
                    ReasonTable.rows.add(data.Result).draw();
                ReasonsData = data.Result;
            }

        }).fail(function (jqxhr, settings, exception) {
            ShowAlert(resources.LoadReasonTransListErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.TransactionEditReasonsTitle, "danger");
        })
    }
}
function ClearReasonForm() {

    $('#txt_ReasonName_Edit').val("");
    $('#txt_ReasonNameEN_Edit').val("");
    setTimeout(function () {
        $("form#ReasonForm").validator("destroy");
        $("#list-unstyled").remove();
        $("form#ReasonForm").find('.has-error').removeClass("has-error");
        $("form#ReasonForm").find('.has-success').removeClass("has-success");
        $("form#ReasonForm").find('.glyphicon-remove').not($('.add-on').find("span:first")).removeClass("glyphicon-remove");
        $("form#ReasonForm").find('.glyphicon-ok').not($('.add-on').find("span:first")).removeClass("glyphicon-ok");
        $('#ReasonForm').validator({
            custom: {
                required: function ($el) { return !!$.trim($el.val()) }
            },
            errors: {
                required: 'Please fill out this field.'
            }
        });
    }, 100);
}
function GetReasonData() {
    var apiurl = prefixApiURL + "TimeSheet/Reasons/GetByID/" + CurrentID;
    $.get(apiurl).done(function (data) {
        if (data.Status != "1") {
            ShowMessage(resources.LoadDataErrorMsg + data.Msg, resources.TransactionEditReasonsTitle);
        }
        else {
            if (data.Result != null) {
                $('#txt_ReasonName_Edit').val(data.Result.uptTransReason_name);
                $('#txt_ReasonNameEN_Edit').val(data.Result.uptTransReason_nameEN);
            }
        }

    }).fail(function (jqxhr, settings, exception) {
        ShowMessage(resources.LoadDataErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.TransactionEditReasonsTitle);
    })
}
function EditReasonRow(obj) {
    ClearReasonForm();

    CurrentID = $(obj).attr("data-id");
    $("#gridSystemModalReason").html(resources.ReasonEditTitle)
    $('#ReasonDialog').modal('show');
    action = 'Update';
}
function DeleteReasonRow(obj) {
    CurrentID = $(obj).attr("data-id");
    ReasonTable.row().showRow(CurrentID, true);
    $.confirm({
        title: resources.DeleteReasonTransEditTitle,
        content: resources.DeleteReasonTransEditConfirmationMsg.format(ReasonTable.rows('.selected').data()[0].uptTransReason_name),
        confirmButton: resources.btDelete,
        cancelButton: resources.btCancel,
        confirmButtonClass: 'btn-danger',
        autoClose: 'cancel|15000',
        icon: 'fa fa-warning',
        animation: 'scalex',
        confirm: function () {

            var apiurl = prefixApiURL + "TimeSheet/Reasons/Delete/" + CurrentID;
            $.ajax
                ({
                    type: "POST",
                    url: apiurl,
                    dataType: 'json',
                    //async: false,
                    cache: false,
                    // beforeSend: setHeader,
                    data: [] //formdata
                }).done(function (data) {
                    if (data.Status != "1") {
                        ShowAlert(data.Msg, resources.DeleteReasonTransEditTitle, "danger");
                    }
                    else {
                        ReasonTable.row().deleteRow(CurrentID);
                        ReasonsData.pop(data.Result);
                        ShowAlert(data.Msg, resources.DeleteReasonTransEditTitle, "success");
                    }
                }).fail(function (jqxhr, settings, exception) {
                    ShowAlert(resources.DeleteTrasnsReasonErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.TransactionEditReasonsTitle, "danger");
                }).always(function () {
                });
        }
    });
}
function AddReasonRow() {
    ClearReasonForm();
    CurrentID = 0;
    $("#gridSystemModalReason").html(resources.ReasonAddTitle)
    $('#ReasonDialog').modal('show');
    action = 'Add';

}
function SaveReasonData() {
    if (!form_validate("ReasonForm")) {
        return;
    }
    var formdata = {
        "uptTransReason_id": CurrentID,
        "uptTransReason_name": $('#txt_ReasonName_Edit').val(),
        "uptTransReason_nameEN": $('#txt_ReasonNameEN_Edit').val()
    }
    var apiurl = "";

    apiurl = prefixApiURL + "TimeSheet/Reasons/" + action;
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
                ShowMessage(data.Msg, resources.TransactionEditReasonsTitle);
            }
            else {
                if (action == 'Add') {
                    ReasonTable.row().addRow(data.Result, true);
                    ReasonsData.push(data.Result);
                }
                else if (action == 'Update') {
                    ReasonTable.row().updateRow(CurrentID, data.Result, true);
                    jQuery.grep(ReasonsData, function (a) {
                        if (a.uptTransReason_id == CurrentID) { a.uptTransReason_name = data.Result.uptTransReason_name }
                    });
                }

                $('#ReasonDialog').modal('hide');
                ShowAlert(data.Msg, resources.TransactionEditReasonsTitle, "success");
            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert((action == 'Add' ? resources.AddTransReasonErrorMsg : resources.SaveTransReasonErrorMsg) + GetErrorFromString(jqxhr.responseText).Msg, resources.TransactionEditReasonsTitle, "danger");
        }).always(function () {
        });

}
/////////////////////////////////////////////
///////////Daily////////////////////////////
function InitializeDaily() {

    $('.ChangeShiftINOUTRadios').on('click', 'input[type=radio]', function () {
        $(this).closest('.ChangeShiftINOUTRadios').find('.radio-inline, .radio').removeClass('checked');
        $(this).closest('.radio-inline, .radio').addClass('checked');



    });
    $('.ExcuseTypeRadios').on('click', 'input[type=radio]', function () {
        $(this).closest('.ExcuseTypeRadios').find('.radio-inline, .radio').removeClass('checked');
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
    $('#shiftfromtimetrans').timepicker({ 'timeFormat': 'H:i', 'step': 1 }).bind('timeFormatError timeRangeError', function () {
        $('#shiftfromtimetrans').val('');
        $('#shiftfromtimetrans').focus();
    });
    $('#DailyDetailsAttendanceDialog').on('shown.bs.modal', function () {
        DailyChanged = false;
        FillDetailsAttendance();
    });
    $('#DailyDetailsAttendanceDialog').on('hidden.bs.modal', function () {
        if (DailyChanged) {
            SearchDaily();
            DailyChanged = false;
        }
    })
    //$('#ExcuseDailyFormDialog').on('shown.bs.modal', function () {
    //ClearExcuseForm();
    //});
    $('#TransactionFormDialog').on('shown.bs.modal', function () {
        ClearTransactionForm();
        fillReasonsDropDown();
        if (TransID > 0) {
            var objdata = DailyTimeSheetTransactions.row().getRow(TransID).data();
            $("#dd_Reason_edit").val(objdata.ModifiedReasonID == null ? '' : objdata.ModifiedReasonID)
            $('#shiftfromtimetrans').timepicker('setTime', objdata.m_time);
            $('#plusoneday').prop('checked', objdata.acc_date > objdata.DateNo).change();
            $("input[name='shiftINOUT'][value='" + objdata.CV_CODE + "']").prop('checked', true).change().click();
        }
        else {

        }
    });
    $("#filterdiv").hide();
    $('.dpd').datepicker({ todayHighlight: true, todayBtn: "linked", });
    $('.dpd').datepicker('update', new Date());
    $("#pn_dailyspan").on('click', function (e) {
        var $this = $(this);
        if (!$this.hasClass('panel-collapsed')) {
            $("#pn_dailybody").slideUp();
            $this.addClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        } else {
            $("#pn_dailybody").slideDown();
            $this.removeClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
    });
    $('.TimeSheetRadios').on('click', 'input[type=checkbox]', function () {
        if (!$(this).prop('checked'))
            $(this).closest('.checkbox-inline').removeClass("checked");
        else
            $(this).closest('.checkbox-inline').addClass("checked");
    });
    $('.PlusOneDay').on('change', 'input[type=checkbox]', function () {
        if (!$(this).prop('checked'))
            $(this).closest('.checkbox-inline').removeClass("checked");
        else
            $(this).closest('.checkbox-inline').addClass("checked");
    });
    $('#ShiftINOUT_CVCode').on('change', 'input[type=checkbox]', function () {
        if (!$(this).prop('checked'))
            $(this).closest('.checkbox-inline').removeClass("checked");
        else
            $(this).closest('.checkbox-inline').addClass("checked");
    });
    $("#dd_filter").on('change', function () {
        if (this.value == 'ra_Attendance')
            $("#filterdiv").show();
        else
            $("#filterdiv").hide();
    });
    $("#txt_Select_DailyBranch,#txt_Select_DailySection").change(function () {
        $('#txt_Select_DailyEmployee').attr('data-id', 0).val('').html('');
    });
    if (!HasPermission(8, "rep-daly")) {
        $("#printDaily").hide();
    }
    else {
        $("#printDaily").click(function (e) { e.preventDefault(); printDaily(); })
    }


    var apiurl = prefixApiURL + "TimeSheet/Daily/GetAll"
    DailyTimeSheetTable = $('#DailyTimeSheetTable').DataTable(
        {
            ajax:
                function (data, callback, settings) {
                    if (!reloaddata) {
                        reloaddata = true;
                        return;
                    }

                    data.Sec_ID = DailyFilter == null ? 0 : DailyFilter.Sec_ID;
                    data.Reg_ID = DailyFilter == null ? 0 : DailyFilter.Reg_ID;
                    data.Emp_ID = DailyFilter == null ? 0 : DailyFilter.Emp_ID;
                    //data.Emp_Loc = DailyFilter == null ? null : DailyFilter.Emp_Loc;
                    data.FromDate = DailyFilter == null ? 0 : DailyFilter.FromDate;
                    data.ToDate = DailyFilter == null ? 0 : DailyFilter.ToDate;
                    data.RowFilter = DailyFilter == null ? '' : DailyFilter.RowFilter;
                    // make a regular ajax request using data.start and data.length
                    $.get(apiurl, data,
                        function (res) {
                            // map your server's response to the DataTables format and pass it to
                            // DataTables' callback
                            callback({
                                recordsTotal: res.Result.recordsTotal,
                                recordsFiltered: res.Result.recordsFiltered,
                                draw: res.Result.draw,
                                data: res.Result.data
                            });
                        });

                },
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip(
                    {
                        html: true,
                        delay: { show: 300, hide: 0 },
                        placement: function (tip, element) { //$this is implicit
                            var position = $(element).position();
                            if (position.left > 515) {
                                return "left";
                            }
                            if (position.left < 515) {
                                return "right";
                            }
                            if (position.top < 110) {
                                return "bottom";
                            }
                            return "top";
                        }
                    }
                );
                $('#DailyTimeSheetTable a').click(function (e) {
                    e.preventDefault()
                    OpenDetailsAttendance(this);
                })
                $("#DailyTimeSheetTable_wrapper div.toolbar").addClass('pull-right').addClass('flip');
                $("#DailyTimeSheetTable_wrapper div.toolbar").html('<span class="alert alert-incomplete">' + resources.IncompleteLable + '</span>'
                    //+ '<span class="label label-primary">Primary</span>'
                    //  + '<span class="label label-success">Success</span>'
                    + '<span class="alert alert-info">' + resources.VacationsLable + '</span>'
                    + '<span class="alert alert-warning">' + resources.LateLable + '</span>'
                    + '<span class="alert alert-danger">' + resources.AbsentLable + '</span>'
                    //+ '</nav>'
                )
            },
            // StatusCode
            createdRow: function (row, data, index) {
                var dd = new Date();
                if (data.length != 0) {
                    if (data.StatusCode == 'abs' || data.vacinfo.includes('Absence'))
                        jQuery(row).addClass('alert-danger');
                    else if (data.StatusCode == 'inc' && data.m_dateno < dd.ToOADate())
                        jQuery(row).addClass('alert-incomplete');
                    else if (data.StatusCode == 'vac' && !data.vacinfo.includes('Absence'))
                        jQuery(row).addClass('alert-info');
                    else if (data.StatusCode == 'lat')
                        jQuery(row).addClass('alert-warning');
                    else if (data.StatusCode == 'off')
                        jQuery(row).addClass('alert-default');
                    else
                        jQuery(row).addClass('active');
                }
            },
            // processing: true, // control the processing indicator.
            serverSide: true,
            stateSave: true,
            deferRender: true,
            "lengthMenu": [[10, 20, 50], [10, 20, 50]],
            autoWidth: false,
            rowId: 'ID',
            columns: [{ data: "emp_no" }, { data: "emp_name" }, { data: "m_date" }
                , { data: "timefin" }, { data: "timefout" }, { data: "LateIn" }, { data: "Earlyout" }
                , { data: "timeTotal" }, { data: "ActualTime" }, { data: "TotalLate" }, { data: "OverTime" }],
            columnDefs: [
                {
                    "width": "9%", "targets": 0, type: "num", "orderable": false,
                    "render": function (data, type, row) {
                        if (data != null) {
                            return "<a  title='" + resources.ClickHereToShowDetailsTooltip + "' class='transdetails' data-empid='" + row.emp_id + "' data-dateno='" + row.m_dateno + "' href=''>"
                                + (row.vac_id != '0' ? "<span data-toggle='tooltip' data-container='body' role='tooltip' data-placement='top' title='" + row.vacinfo + "'>" : "<span title='" + resources.ClickHereToShowDetailsTooltip + "'>") + data + "</span> </a>";
                        }
                        else

                            return "<a href=''></a>";
                    }
                },
                { "width": "19%", "targets": 1, "orderable": false },
                { "width": "10%", "targets": 2, "orderable": false },
                { "width": "6%", "targets": 3, "orderable": false },
                { "width": "6%", "targets": 4, "orderable": false },
                { "width": "7%", "targets": 5, "orderable": false },
                { "width": "7%", "targets": 6, "orderable": false },
                { "width": "8%", "targets": 7, "orderable": false },
                { "width": "10%", "targets": 8, "orderable": false },
                { "width": "8%", "targets": 9, "orderable": false },
                { "width": "9%", "targets": 10, "orderable": false },
                {
                    className: "col-centered", "width": "5%", "targets": 11,
                    "render": function (data, type, row) {

                        if (row.exc_id != '0') {
                            return "<span data-toggle='tooltip' data-container='body' data-id='" + row.exc_id + "' data-placement='top' title='" + row.Excuseinfo + "'><div class='alertIco'></div></span>";
                        }
                        else {
                            return "<div class='alertIco-off'></div>";
                        }
                    },
                },
            ],
            filter: false,
            info: true,
            ordering: false,
            //"order": [],
            // searchDelay: 1500,
            language: { "url": resources.Datatable_Lang },
            pagingType: "full_numbers",
            "dom": '<"toolbar">lfrtip',// '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

        });

    //$('#DailyTimeSheetTable tbody').on('click', 'tr', function () {
    //    if ($(this).hasClass('selected')) {
    //        $(this).removeClass('selected');
    //    }
    //    else {
    //        DailyTimeSheetTable.$('tr.selected').removeClass('selected');
    //        $(this).addClass('selected');
    //    }
    //});

}
function SearchDaily() {
    var filter = GetRowsDailyFilter();
    var emploc = $('#txt_Select_DailyLocation').attr('data-id');
    if (emploc !== "0") {
        if (filter.trim().length === 0) {
            filter = "(LOCATION_CODE='" + emploc + "')";
        } else {
            filter += " AND (LOCATION_CODE='" + emploc + "')";
        }
    }

    DailyFilter = {
        RowFilter: filter,
        Sec_ID: $('#txt_Select_DailySection').attr('data-id'),
        Reg_ID: $('#txt_Select_DailyBranch').attr('data-id'),
        Emp_ID: $('#txt_Select_DailyEmployee').attr('data-id'),
        //Emp_Loc: $('#txt_Select_DailyLocation').attr('data-id'),
        FromDate: $("#dailay_FromDate").datepicker("getDate").ToOADate(),
        ToDate: $("#dailay_ToDate").datepicker("getDate").ToOADate()
    }
    DailyTimeSheetTable.ajax.reload();
}
function printDaily() {
    var filter = GetRowsDailyFilter();
    var emploc = $('#txt_Select_DailyLocation').attr('data-id');
    if (emploc !== "0") {
        if (filter.trim().length === 0) {
            filter = "(tb_employee.LOCATION_CODE='" + emploc + "')";
        } else {
            filter += " AND (tb_employee.LOCATION_CODE='" + emploc + "')";
        }
    }
    DailyFilter = {
        RowFilter: filter,
        Sec_ID: $('#txt_Select_DailySection').attr('data-id'),
        Reg_ID: $('#txt_Select_DailyBranch').attr('data-id'),
        Emp_ID: $('#txt_Select_DailyEmployee').attr('data-id'),
        FromDate: $("#dailay_FromDate").datepicker("getDate").ToOADate(),
        ToDate: $("#dailay_ToDate").datepicker("getDate").ToOADate()
    }
    ShowReportMode(GetRootURL() + "TimeSheet/Daily/PrintReport", DailyFilter, true);
}
//Daily - Change Shift/////
function SaveShift() {
    if (!HasPermission(5, 'trans-edit')) {
        ShowMessage(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle);
        return;
    }
    if ($("#txt_changeShift").attr("data-id") == "0") {
        ShowMessage(resources.YouMustSelectShiftToContinue, resources.TransactioninfoTitle);
        return;
    }
    var apiurl = "";
    apiurl = prefixApiURL + "TimeSheet/Daily/UpdateShift/" + EmpID + "/" + DateNo + "/" + $("#txt_changeShift").attr("data-id");
    $.ajax
        ({
            type: "POST",
            url: apiurl,
            dataType: 'json',
            cache: false,
        }).done(function (data) {
            if (data.Status != "1") {
                ShowTransAlert(data.Msg, "danger");
            }
            else {
                ShowTransAlert(data.Msg, "success");
                $("#txt_detailsCurrentShift").val(data.Result.shift_name);
                $('#txt_changeShift').attr('data-id', 0).val('').html('');
                DailyChanged = true;
            }

        }).fail(function (jqxhr, settings, exception) {
            ShowTransAlert(resources.SaveShiftErrorMsg, "danger");
        }).always(function () {
        });
}
//////////////////
//Daily - Add or update excuse for dayly//////
function ExcuseTypeRadioChanged(obj) {
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
                    return a.exc_type == parseInt($('input[name=ExcuseType]:checked').val());
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
            return a.exc_type == parseInt($('input[name=ExcuseType]:checked').val());
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

    $('#RB_ExcuseNormalType').prop('checked', true).change().click();
    //ExcuseReasonData = null;
    //FillExcuseReason();
    setTimeout(function () {
        $("form#frmExcuseDailyFormDialog").validator("destroy");
        $("#list-unstyled").remove();
        $("form#frmExcuseDailyFormDialog").find('.has-error').removeClass("has-error");
        $("form#frmExcuseDailyFormDialog").find('.has-success').removeClass("has-success");
        $("form#frmExcuseDailyFormDialog").find('.glyphicon-remove').not($('.add-on').find("span:first")).removeClass("glyphicon-remove");
        $("form#frmExcuseDailyFormDialog").find('.glyphicon-ok').not($('.add-on').find("span:first")).removeClass("glyphicon-ok");
        $('#frmExcuseDailyFormDialog').validator({
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
    if (!form_validate("frmExcuseDailyFormDialog")) {
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
    var ExcuseData = {
        "exc_id": exc_id,
        "exc_empid": EmpID,
        "exc_date": DateNo,
        "exc_ftime": $("#shiftfromtime").val(),
        "exc_ttime": $("#shifttotime").val(),
        "exc_reason": $("#excNotes_edit").val(),
        "exc_deleted": false,
        "exc_status": true,
        "execuseReason_ID": $("#dd_ExcuseReason_edit").val(),
        "exc_type": $('input[name=ExcuseType]:checked').val()
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
                ShowTransAlert(data.Msg, "danger");
            }
            else {
                ShowTransAlert(data.Msg, "success");
                $('#ExcuseDailyFormDialog').modal('hide');
                $("#bt_AddExcuse").html(resources.ClmEdit);
                $("#bt_AddExcuse").unbind('click');
                $("#bt_AddExcuse").on('click', function () {
                    EditExcuse();
                });
                $("#exc_info").html(resources.ExcuseInfoForEmployee.format(data.Result.exc_ftime, data.Result.exc_ttime, data.Result.exc_hours, data.Result.execuseReason_Name + " " + (data.Result.exc_reason == null ? "" : data.Result.exc_reason)));
                DailyChanged = true;
            }

        }).fail(function (jqxhr, settings, exception) {
            ShowAlert((action == 'Add' ? resources.AddExcuseErrorMsg : resources.UpdateExcuseErrorMsg) + GetErrorFromString(jqxhr.responseText).Msg, resources.ExcuseInfoTitle, "danger");
        }).always(function () {
        });

}
function AddExcuse() {
    ClearExcuseForm();
    $("#gridSystemModalExcuseDailyTitle").html(resources.AddExcuseTitle);
    $('#ExcuseDailyFormDialog').modal("show");
    $("#bt_saveExcuse").unbind('click');
    $("#bt_saveExcuse").on('click', function () {
        SaveExcuse(0);
    });
}
function EditExcuse() {
    var exc_id = $("#exc_info").attr("data-id");
    if (exc_id == "0" || exc_id == 0)
        return;
    ClearExcuseForm();
    $("#gridSystemModalExcuseDailyTitle").html(resources.EditExcuseTitle);

    $("#bt_saveExcuse").unbind('click');
    var apiurl = prefixApiURL + "Excuses/GetByID/" + $("#exc_info").attr("data-id")
    $.get(apiurl).done(function (data) {
        if (data.Status != "1") {
            ShowTransAlert(data.Msg, resources.DailyReportTitle, "danger");
        }
        else {
            if (data.Result != null) {
                if (data.Result.exc_type == 1)
                    $('#RB_ExcuseNormalType').prop('checked', true).change().click();
                else
                    $('#RB_ExcuseJobType').prop('checked', true).change().click();
                $("#dd_ExcuseReason_edit").val(data.Result.execuseReason_ID);
                $('#shiftfromtime').val(data.Result.exc_ftime);
                $('#shifttotime').val(data.Result.exc_ttime);
                $('#excNotes_edit').val(data.Result.exc_reason);
                $("#bt_saveExcuse").on('click', function () {
                    SaveExcuse(exc_id);
                });
                $('#ExcuseDailyFormDialog').modal("show");
            }
        }
    }).fail(function (jqxhr, settings, exception) {
        ShowAlert(resources.ErrorExcusRetriveData + GetErrorFromString(jqxhr.responseText).Msg, resources.DailyReportTitle, "danger");
    });
}
//////////////////////////////////
/////Daily - Transactions//////////////
function DeleteTransRow(obj) {
    if (!HasPermission(5, 'trans-include')) {
        ShowMessage(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle);
        return;
    }
    if (obj != null) {
        TransID = $(obj).attr('data-id');
        var apiurl = "";
        apiurl = prefixApiURL + "TimeSheet/Daily/DeleteTrans/" + TransID;
        $.ajax
            ({
                type: "POST",
                url: apiurl,
                dataType: 'json',
                cache: false,
            }).done(function (data) {
                if (data.Status != "1") {
                    ShowTransAlert(data.Msg, "danger");
                }
                else {
                    DailyTimeSheetTransactions.row().updateRow(TransID, data.Result, true);
                    ShowTransAlert(data.Msg, "success");
                    DailyChanged = true;
                }


            }).fail(function (jqxhr, settings, exception) {
                ShowTransAlert(resources.DeleteTransErrorMsg, "danger");
            }).always(function () {
            });
    }
}
function SaveTrans() {
    if (!form_validate("frmTransactionFormDialog")) {
        return;
    }

    if (IsTwoShift && IsAllowTwoShifts && $("input[name='shiftINOUT']:checked").val() == null) {
        ShowTransAlert(resources.SelectTransCVCodeMSG, "danger");
        return;
    }

    if ($("#dd_Reason_edit").val() != "" && $("#shiftfromtimetrans").val() != "") {
        var TransData = {
            "trans_id": TransID,
            "m_time": $("#shiftfromtimetrans").val(),
            "emp_id": EmpID,
            "ModifiedReasonID": $("#dd_Reason_edit").val(),
            "acc_date": ($('#plusoneday').prop("checked") ? parseInt(DateNo, 10) + 1 : DateNo),
            "DateNo": DateNo,
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
            "CV_CODE": $("input[name='shiftINOUT']:checked").val() == null ? 1 : $("input[name='shiftINOUT']:checked").val()

        }
        var apiurl = "";

        apiurl = prefixApiURL + "TimeSheet/Daily/" + action;
        $.ajax
            ({
                type: "POST",
                url: apiurl,
                dataType: 'json',
                cache: false,
                data: TransData
            }).done(function (data) {
                if (data.Status != "1") {
                    $('#TransactionFormDialog').modal('hide');
                    ShowTransAlert(data.Msg, "danger");
                }
                else {
                    if (action == 'AddTrans') {
                        DailyTimeSheetTransactions.row().addRow(data.Result, true);
                    }
                    else if (action == 'UpdateTrans') {
                        DailyTimeSheetTransactions.row().updateRow(TransID, data.Result, true);
                    }
                    $('#TransactionFormDialog').modal('hide');
                    ShowTransAlert(data.Msg, "success");
                    DailyChanged = true;
                }
            }).fail(function (jqxhr, settings, exception) {
                $('#TransactionFormDialog').modal('hide');
                ShowTransAlert((action == 'AddTrans' ? resources.AddTransErrorMsg : resources.SaveTransErrorMsg) + GetErrorFromString(jqxhr.responseText).Msg, "danger");
            }).always(function () {
            });
    }
}
function fillReasonsDropDown() {

    var options = $("#dd_Reason_edit");
    options.empty();
    options.append($("<option />").val('').text(''));
    $.each(ReasonsData, function () {
        options.append($("<option />").val(this.uptTransReason_id).text(this.uptTransReason_name));
    });
    $("#dd_Reason_edit option[value='']").attr('selected', true)
}
function GetRowsDailyFilter() {
    var RowFilter = "";
    var TransType = $("#dd_filter").val();

    if (TransType == "ra_all") {
        return "";

    }
    else if (TransType == "ra_vication") {
        RowFilter = "m_vac_id>0";
    }
    else if (TransType == "ra_absent") {
        RowFilter = "(ISNULL(m_timefin, N'--:--')='--:--' and ISNULL(m_timefout, N'--:--')='--:--' and ISNULL(m_actualtime, N'--:--')  <>'00:00')";
    }
    else if (TransType == "ra_off") {
        RowFilter = "(ISNULL(tb_transSummey.m_actualtime, N'00:00') = N'00:00' and isnull(m_vac_id,0)=0)";
    }
    else if (TransType == "ra_Attendance") {
        var addfilter = false;

        RowFilter = " (ISNULL(m_status, N'abs') <> 'abs' AND isnull(m_vac_id,0)=0) AND ISNULL(m_timefin, N'--:--')<>'--:--' ";
        if ($("#ra_latein").prop('checked')) {
            RowFilter += "And (" + "(ISNULL(m_latein, N'--:--')<>'--:--')";
            addfilter = true;
        }
        if ($("#ra_onlyin").prop('checked')) {
            if (addfilter) {
                RowFilter += " And (ISNULL(m_status, N'abs') = 'inc' )";
            }
            else {
                RowFilter += "And (" + "(ISNULL(m_status, N'abs') = 'inc' )";
                addfilter = true;
            }
        }

        if ($("#ra_earlyout").prop('checked')) {
            if (addfilter) {
                RowFilter += " And (ISNULL(m_earlyout, N'--:--')<>'--:--')";
            }
            else {
                RowFilter += "And (" + "(ISNULL(m_earlyout, N'--:--')<>'--:--')";
                addfilter = true;
            }
        }
        if ($("#ra_late").prop('checked')) {
            if (addfilter) {
                RowFilter += " And (ISNULL(m_totallate, N'--:--') <>'--:--')";
            }
            else {
                RowFilter += "And (" + "(ISNULL(m_totallate, N'--:--') <>'--:--')";
                addfilter = true;
            }
        }
        if ($("#ra_over").prop('checked')) {
            if (addfilter) {
                RowFilter += " And (ISNULL(m_overtime, N'--:--') <>'--:--' and m_overtime <>'00:00')";
            }
            else {
                RowFilter += "And (" + "(ISNULL(m_overtime, N'--:--') <>'--:--' and m_overtime <>'00:00')";
                addfilter = true;
            }
        }
        if ($("#ra_exc").prop('checked')) {
            if (addfilter) {
                RowFilter += " And (Isnull(exc_id, 0)>0)";
            }
            else {
                RowFilter += "And (" + "(Isnull(exc_id, 0)>0)";
                addfilter = true;
            }
        }
        if ($("#ra_incomplete").prop('checked')) {
            if (addfilter) {
                RowFilter += " And (ISNULL(m_status, N'abs') = 'inc' AND dbo.getnofromdate(getdate())>m_date)";
            }
            else {
                RowFilter += "And (" + "(ISNULL(m_status, N'abs') = 'inc' AND dbo.getnofromdate(getdate())>m_date)";
                addfilter = true;
            }
        }
        if ($("#ra_manule").prop('checked')) {
            if (addfilter) {
                RowFilter += " And (m_manual=1)";
            }
            else {
                RowFilter += "And (" + "(m_manual=1)";
                addfilter = true;
            }
        }

        if (addfilter) {
            RowFilter += ")";
        }
    }

    return RowFilter;
}
var IsTwoShift = false;
function FillDetailsAttendance() {
    $("#exc_info").attr("data-id", 0);
    var apiurl = prefixApiURL + "TimeSheet/Daily/GetTransactionDetails/" + DateNo.toString() + "/" + EmpID.toString();
    $.get(apiurl).done(function (data) {
        if (data.Status != "1") {
            ShowAlert(resources.LoadDailyTransDetailsErrorMsg + data.Msg, resources.DailyReportTitle, "danger");
        }
        else {
            if (data.Result != null)
                DailyTimeSheetTransactions = $('#DailyTimeSheetTransactions').DataTable({
                    ajax: "",
                    autoWidth: true,
                    data: data.Result.Trans,
                    columns: [{ data: "m_time" }, { data: "StatusName" }, { data: "m_unit" }, { data: "ModifiedReason" }
                    ],
                    columnDefs: [
                        { "width": "8%", "targets": 0 },
                        { "width": "22%", "targets": 1 },
                        { "width": "27%", "targets": 2 },
                        { "width": "23%", "targets": 3 },
                        {
                            className: "col-centered", "width": "5%", "targets": 4,
                            "render": function (data, type, row) {
                                return '<span class="glyphicon glyphicon-edit  col-edit handcursor" data-id=' + row.trans_id + ' onclick="if(IsDisabled(this)) { return };OpenTransactionDialog($(this))"></span>';
                            }
                        },
                        {
                            className: "col-centered", "width": "15%", "targets": 5,
                            "render": function (data, type, row) {
                                return (row.m_deleted == false ? '<span class="glyphicon glyphicon-trash  col-delete handcursor"' : '<span class="glyphicon glyphicon-plus  col-add handcursor"') + ' data_deleted=' + row.m_deleted + ' data-id=' + row.trans_id + ' onclick="if(IsDisabled(this)) { return };DeleteTransRow($(this))"></span>';
                            }
                        }
                    ],
                    createdRow: function (row, data, index) {
                        if (data.length != 0) {
                            if (!data.m_status) {
                                jQuery(row).addClass('alert-danger');
                                jQuery(row).prop('disabled', 'true')
                            }

                        }
                    },
                    "drawCallback": function (settings) {

                    },
                    filter: false,
                    rowId: 'trans_id',
                    info: false,
                    ordering: false,
                    language: { "url": resources.Datatable_Lang },
                    paging: false

                });
        }
        var canedit = HasPermission(5, 'trans-edit');
        if (DailyTimeSheetTransactions != null) {

            var candelete = HasPermission(5, 'trans-include');
            DailyTimeSheetTransactions.columns(4).visible(canedit);
            DailyTimeSheetTransactions.columns(5).visible(candelete);
            DailyTimeSheetTransactions.columns.adjust().draw(false);
        }
        $("#bt_AddTransaction").unbind('click');
        $("#bt_SaveShift").unbind('click');
        if (!HasPermission(5, 'trans-add')) {

            $("#bt_AddTransaction").hide();
        }
        else {
            $("#bt_AddTransaction").show();
            $("#bt_AddTransaction").on('click', function () {
                OpenTransactionDialog(null);
            });
        }
        if (!canedit) {
            $("#bt_SaveShift").hide();
        }
        else {
            $("#bt_SaveShift").show();
            $("#bt_SaveShift").on('click', function () {
                SaveShift();
            });
        }

        IsTwoShift = data.Result.Daily.shift_twoshifts && IsAllowTwoShifts;
        $("#txt_employeno_transdetails").val(data.Result.Daily.emp_no);
        $("#txt_employename_transdetails").val(data.Result.Daily.emp_name);
        $("#txt_attdate_transdetails").val(data.Result.Daily.m_date);
        $("#txt_detailsCurrentShift").val(data.Result.Daily.shift_name);
        $("#exc_info").attr("data-id", data.Result.Daily.exc_id);
        if (data.Result.Daily.vac_id == 0) {
            $("#vac_info").html('');
            $("#vac_panel").hide();
            $("#exc_panel").show();
            $("#bt_AddExcuse").unbind('click');
            //if (data.Result.Daily.exc_id > 0) {

            //    $("#exc_info").html(data.Result.Daily.Excuseinfo);
            //    if (!HasPermission(7, 'exc-edit')) {
            //        $("#bt_AddExcuse").hide();
            //    }
            //    else {
            //        $("#bt_AddExcuse").show();
            //        $("#bt_AddExcuse").html(resources.ClmEdit);
            //        $("#bt_AddExcuse").on('click', function () {
            //            EditExcuse();
            //        });
            //    }

            //}
            //else {
            $("#exc_info").html(resources.NoDataFoundLable);
            if (!HasPermission(7, 'exc-add')) {
                $("#bt_AddExcuse").hide();
            }
            else {
                $("#bt_AddExcuse").show();
                $("#bt_AddExcuse").html(resources.btAdd);
                $("#bt_AddExcuse").on('click', function () {
                    AddExcuse();
                });
            }

            //}
        }
        else {
            $("#exc_info").html('');
            $("#exc_panel").hide();
            $("#vac_panel").show();
            $("#vac_info").html(data.Result.Daily.vacinfo);
        }

    }).fail(function (jqxhr, settings, exception) {
        ShowAlert(resources.LoadDailyTransDetailsErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.DailyReportTitle, "danger");
    });

}
function OpenDetailsAttendance(obj) {
    if (!HasPermission(5, "trans-view")) {

        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    if (DailyTimeSheetTransactions != null) {
        DailyTimeSheetTransactions.clear();
        DailyTimeSheetTransactions.destroy();
        //$('#DailyTimeSheetTransactions').empty();
    }
    $("#txt_employeno_transdetails").val("");
    $("#txt_employename_transdetails").val("");
    $("#txt_attdate_transdetails").val("");
    $("#txt_detailsCurrentShift").val("");
    $('#txt_changeShift').attr('data-id', 0).val('').html('');
    $("p.bg-info").html("");
    EmpID = $(obj).attr("data-empid");
    DateNo = $(obj).attr("data-dateno");


    $('#DailyDetailsAttendanceDialog').modal('show');

}
function OpenTransactionDialog(obj) {
    $("#bt_saveTrans").unbind('click');
    if (obj == null) {
        if (!HasPermission(5, "trans-add")) {

            ShowMessage(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle);
            return;
        }
        TransID = 0
        $("#bt_saveTrans").on('click', function (e) {
            e.preventDefault(); if ($(this).hasClass('disabled')) return;
            else {
                action = 'AddTrans';
                SaveTrans();
            }

        });
        $('#TransactionFormDialog').modal('show');
    }
    else {
        if (!HasPermission(5, "trans-edit")) {

            ShowMessage(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle);
            return;
        }

        TransID = $(obj).attr('data-id');

        var objdata = DailyTimeSheetTransactions.row().getRow(TransID).data();
        if (!objdata.m_status) {
            ShowMessage(resources.CantEditFailedTransaction, resources.TransactioninfoTitle);
            return;
        }

        $("#bt_saveTrans").on('click', function (e) {
            e.preventDefault(); if ($(this).hasClass('disabled')) return;
            else {
                action = 'UpdateTrans';
                SaveTrans();
            }
        });
        $('#TransactionFormDialog').modal('show');
    }


}
function ClearTransactionForm() {
    $('#shiftfromtimetrans').val("");
    $('#plusoneday').prop('checked', false).change();
    $("input[name$='shiftINOUT']").prop("checked", false);
    $('.ChangeShiftINOUTRadios').closest('.ChangeShiftINOUTRadios').find('.radio-inline, .radio').removeClass('checked');
    $('#ShiftINOUT_CVCode').css('display', IsTwoShift && IsAllowTwoShifts ? 'block' : 'none');
    setTimeout(function () {
        $("form#frmTransactionFormDialog").validator("destroy");
        $("#list-unstyled").remove();
        $("form#frmTransactionFormDialog").find('.has-error').removeClass("has-error");
        $("form#frmTransactionFormDialog").find('.has-success').removeClass("has-success");
        $("form#frmTransactionFormDialog").find('.glyphicon-remove').not($('.add-on').find("span:first")).removeClass("glyphicon-remove");
        $("form#frmTransactionFormDialog").find('.glyphicon-ok').not($('.add-on').find("span:first")).removeClass("glyphicon-ok");
        $('#frmTransactionFormDialog').validator({
            custom: {
                required: function ($el) { return !!$.trim($el.val()) }
            },
            errors: {
                required: 'Please fill out this field.'
            }
        });
    }, 100);
}
///////////////////////////////////////////

////////////////////////////////////////////////////
///////////////Monthly/////////////////////////
function InitializeMonthly() {
    $('#MonthlyDetailsAttendanceDialog').on('shown.bs.modal', function () {
        GetMonthlyDailyTimeSheetTable();
    });
    $('.dpM').datepicker({ todayHighlight: true, todayBtn: "linked", });
    var CurrentDate = new Date();
    $('#monthly_FromDate').datepicker('update', new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(), 1));
    $('#monthly_ToDate').datepicker('update', new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(), CurrentDate.daysInMonth()));
    $("#pn_monthlyspan").on('click', function (e) {
        var $this = $(this);
        if (!$this.hasClass('panel-collapsed')) {
            $("#pn_monthlybody").slideUp();
            $this.addClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        } else {
            $("#pn_monthlybody").slideDown();
            $this.removeClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
    });

    if (!HasPermission(8, "rep-monthly")) {
        $("#printMonthly").hide();
        $("#printMonthlyDetails").hide();
    }
    else {
        $("#printMonthly").click(function (e) { e.preventDefault(); printMonthly(); })
        $("#printMonthlyDetails").click(function (e) { e.preventDefault(); printMonthlyDetails(); })
    }

    setupMonthlyToolBar();
    var apiurl = prefixApiURL + "TimeSheet/Monthly/GetAll"
    MonthlyTimeSheetTable = $('#MonthlyTimeSheetTable').DataTable(
        {
            ajax:
                function (data, callback, settings) {
                    if (!reloaddata) {
                        reloaddata = true;
                        return;
                    }

                    data.Sec_ID = MonthlyFilter == null ? 0 : MonthlyFilter.Sec_ID;
                    data.Emp_Loc = MonthlyFilter == null ? 0 : MonthlyFilter.Emp_Loc;
                    data.Reg_ID = MonthlyFilter == null ? 0 : MonthlyFilter.Reg_ID;
                    data.Emp_ID = MonthlyFilter == null ? 0 : MonthlyFilter.Emp_ID;
                    data.FromDate = MonthlyFilter == null ? 0 : MonthlyFilter.FromDate;
                    data.ToDate = MonthlyFilter == null ? 0 : MonthlyFilter.ToDate;
                    data.RowFilter = MonthlyFilter == null ? '' : MonthlyFilter.RowFilter;
                    // make a regular ajax request using data.start and data.length
                    $.get(apiurl, data,
                        function (res) {
                            // map your server's response to the DataTables format and pass it to
                            // DataTables' callback
                            callback({
                                recordsTotal: res.Result.recordsTotal,
                                recordsFiltered: res.Result.recordsFiltered,
                                draw: res.Result.draw,
                                data: res.Result.data
                            });
                        });

                },
            "drawCallback": function (settings) {
                // $('[data-toggle="tooltip"]').tooltip({ html: true });
                $('#MonthlyTimeSheetTable a').click(function (e) {
                    e.preventDefault()
                    OpenMonthlyDetailsDialog(this);
                })
                $("#MonthlyTimeSheetTable_wrapper div.toolbar").addClass('pull-right').addClass('flip');


            },
            // StatusCode
            createdRow: function (row, data, index) {
                if (data.length != 0) {
                }
            },
            // processing: true, // control the processing indicator.
            serverSide: true,
            stateSave: true,
            deferRender: true,
            "lengthMenu": [[10, 20, 50], [10, 20, 50]],
            autoWidth: false,
            rowId: 'emp_id',
            columns: [{ data: "m_id" }, { data: "emp_name" }, { data: "daysno" }
                , { data: "daysabsent" }, { data: "daysoff" }, { data: "daysvication" }, { data: "totalwork" }
                , { data: "ac_work" }, { data: "totallate" }, { data: "totalover" }, { data: "totalExecuse" }],
            columnDefs: [
                {
                    "width": "9%", "targets": 0, type: "num", "orderable": true,
                    "render": function (data, type, row) {
                        if (data != null) {
                            return "<a  title='" + resources.ClickHereToShowDetailsTooltip + "' class='transdetails' data-empid='" + row.emp_id + "' data-fromdateno='" + Monthlyfrom_dateno + "' data-todateno='" + Monthlyto_dateno + "' href=''>"
                                + "<span title='" + resources.ClickHereToShowDetailsTooltip + "'>" + data + "</span> </a>";
                        }
                        else

                            return "<a href=''></a>";
                    }
                },
                { "width": "19%", "targets": 1, "orderable": false },
                { "width": "6%", "targets": 2, "orderable": false },
                { "width": "6%", "targets": 3, "orderable": false },
                { "width": "6%", "targets": 4, "orderable": false },
                { "width": "6%", "targets": 5, "orderable": false },
                { "width": "7%", "targets": 6, "orderable": false },
                { "width": "9%", "targets": 7, "orderable": false },
                { "width": "7%", "targets": 8, "orderable": false },
                { "width": "8%", "targets": 9, "orderable": false },
                { "width": "9%", "targets": 10, "orderable": false },
            ],
            filter: false,
            info: true,
            ordering: true,
            language: { "url": resources.Datatable_Lang },
            pagingType: "full_numbers",
            "dom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

        });

}
function GetMonthlyFilter() {
    var timeregx = /\d+\:\d+/;
    var numberregx = /^\d+$/;
    var inputval = $("#MontlyFilterValue").val();
    if (inputval.trim().length == 0)
        return "";
    var datatype = $('option:selected', "#MonthlyFilterdd").attr('data-type');
    if (datatype == "d") {
        if (numberregx.test(inputval)) {
            switch ($("#MonthlyFilterdd").val()) {
                case "daysno":
                    return "having sum(CASE WHEN (m_timefin <> '--:--' AND m_actualtime <> '00:00') OR (isnull(tb_execuse.exc_type, 0) = 2) THEN 1 ELSE 0 END) " + $("#MonthlyOperationdd").val() + " " + inputval;
                case "daysabsent":
                    return "having sum(CASE WHEN (m_timefin = '--:--' AND m_timefout = '--:--' AND m_actualtime <> '00:00') AND (isnull(tb_execuse.exc_type, 0) <> 2) THEN 1 ELSE 0 END) " + $("#MonthlyOperationdd").val() + " " + inputval;
                case "daysoff":
                    return "having sum(CASE WHEN m_actualtime = '00:00' AND m_vac_id = 0 THEN 1 ELSE 0 END) " + $("#MonthlyOperationdd").val() + " " + inputval;
                case "daysvication":
                    return "having sum(CASE WHEN isnull(m_vac_id, 0) > 0 THEN 1 ELSE 0 END) " + $("#MonthlyOperationdd").val() + " " + inputval;
                default:
                    return "";
            }

        }
        else
            return "";
    }
    else if (datatype == "h") {
        if (timeregx.test(inputval)) {
            switch ($("#MonthlyFilterdd").val()) {
                case "totalwork":
                    return "having sum(CASE WHEN m_timetotal = '--:--' THEN 0 ELSE dbo.GetTotalMinutsFromTime(m_timetotal) END) " + $("#MonthlyOperationdd").val() + " dbo.GetTotalMinutsFromTime('" + inputval + "')";
                case "ac_work":
                    return "having sum(dbo.GetTotalMinutsFromTime(m_actualtime)) " + $("#MonthlyOperationdd").val() + " dbo.GetTotalMinutsFromTime('" + inputval + "')";
                case "totallate":
                    return "having sum(CASE WHEN m_totallate = '--:--' THEN 0 ELSE dbo.GetTotalMinutsFromTime(m_totallate) END) " + $("#MonthlyOperationdd").val() + " dbo.GetTotalMinutsFromTime('" + inputval + "')";
                case "totalover":
                    return "having sum(CASE WHEN m_overtime = '--:--' THEN 0 ELSE dbo.GetTotalMinutsFromTime(m_overtime) END) " + $("#MonthlyOperationdd").val() + " dbo.GetTotalMinutsFromTime('" + inputval + "')";
                case "totalExecuse":
                    return "having sum(CASE WHEN tb_execuse.exc_id IS NULL THEN 0 ELSE exc_minuts END)  " + $("#MonthlyOperationdd").val() + " dbo.GetTotalMinutsFromTime('" + inputval + "')";
                default:
                    return "";
            }

        }
        else
            return "";
    }
    else {
        return "";
    }

}
function setupMonthlyToolBar() {


    var MonthlyFilterdd = $("#MonthlyFilterdd");
    var MonthlyOperationdd = $("#MonthlyOperationdd");

    MonthlyFilterdd.append($("<option data-type='d' />").val("daysno").text(resources.Clmdaysno));
    MonthlyFilterdd.append($("<option data-type='d' />").val("daysabsent").text(resources.Clmdaysabsent));
    MonthlyFilterdd.append($("<option data-type='d' />").val("daysoff").text(resources.Clmdaysoff));
    MonthlyFilterdd.append($("<option data-type='d' />").val("daysvication").text(resources.Clmdaysvication));

    MonthlyFilterdd.append($("<option data-type='h' />").val("totalwork").text(resources.Clmtotalwork));
    MonthlyFilterdd.append($("<option data-type='h' />").val("ac_work").text(resources.Clmac_work));
    MonthlyFilterdd.append($("<option data-type='h' />").val("totallate").text(resources.Clmtotallate));
    MonthlyFilterdd.append($("<option data-type='h' />").val("totalover").text(resources.Clmtotalover));
    MonthlyFilterdd.append($("<option data-type='h' />").val("totalExecuse").text(resources.ClmtotalExecuse));

    MonthlyOperationdd.append($("<option />").val("=").text("="));
    MonthlyOperationdd.append($("<option />").val("<").text("<"));
    MonthlyOperationdd.append($("<option />").val(">").text(">"));
    MonthlyOperationdd.append($("<option />").val("<=").text("<="));
    MonthlyOperationdd.append($("<option />").val(">=").text(">="));
    MonthlyOperationdd.append($("<option />").val("<>").text("<>"));
}
function GetMonthlyDailyTimeSheetTable() {
    var apiurl = prefixApiURL + "TimeSheet/Monthly/GetDetails"
    $.post(prefixApiURL + "TimeSheet/Monthly/GetDetails", {
        Emp_ID: EmpID,
        FromDate: DateNo,
        ToDate: DateNo2
    }).done(function (data) {
        MonthlyDailyTimeSheetTable = $('#MonthlyDailyTimeSheetTable').DataTable({
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip({
                    html: true, tooltipClass: "tooltip",
                    delay: { show: 300, hide: 0 },
                    placement: function (tip, element) { //$this is implicit
                        var position = $(element).position();
                        if (position.left > 515) {
                            return "left";
                        }
                        if (position.left < 515) {
                            return "right";
                        }
                        if (position.top < 110) {
                            return "bottom";
                        }
                        return "top";
                    }

                });
            },
            data: data.Result.Details,
            createdRow: function (row, data, index) {
                var dd = new Date();
                if (data.length != 0) {
                    if (data.StatusCode == 'abs' || data.vacinfo.includes('Absence'))
                        jQuery(row).addClass('alert-danger');
                    else if (data.StatusCode == 'inc' && data.m_dateno < dd.ToOADate())
                        jQuery(row).addClass('alert-incomplete');
                    else if (data.StatusCode == 'vac' && !data.vacinfo.includes('Absence'))
                        jQuery(row).addClass('alert-info');
                    else if (data.StatusCode == 'lat')
                        jQuery(row).addClass('alert-warning');
                    else if (data.StatusCode == 'off')
                        jQuery(row).addClass('alert-default');
                    else
                        jQuery(row).addClass('active');
                }
            },
            autoWidth: true,
            rowId: 'ID',
            columns: [{ data: "m_date" }
                , { data: "timefin" }, { data: "timefout" }, { data: "LateIn" }, { data: "Earlyout" }
                , { data: "timeTotal" }, { data: "ActualTime" }, { data: "TotalLate" }, { data: "OverTime" }],
            columnDefs: [

                {
                    "width": "12%", "targets": 0, "orderable": false,
                    "render": function (data, type, row) {
                        if (data != null) {
                            return (row.vac_id != '0' ? "<span data-toggle='tooltip' data-container='#MonthlyDetailsAttendanceDialog' role='tooltip' data-placement='top' title='" + row.vacinfo + "'>" : "<span>") + data + "</span>";
                        }
                        else

                            return "<span></span>";
                    }
                },
                { "width": "9%", "targets": 1, "orderable": false },
                { "width": "9%", "targets": 2, "orderable": false },
                { "width": "10%", "targets": 3, "orderable": false },
                { "width": "10%", "targets": 4, "orderable": false },
                { "width": "10%", "targets": 5, "orderable": false },
                { "width": "12%", "targets": 6, "orderable": false },
                { "width": "10%", "targets": 7, "orderable": false },
                { "width": "12%", "targets": 8, "orderable": false },
                {
                    className: "col-centered", "width": "5%", "targets": 9,
                    "render": function (data, type, row) {

                        if (row.exc_id != '0') {
                            return "<span data-toggle='tooltip' data-container='#MonthlyDetailsAttendanceDialog' data-id='" + row.exc_id + "' data-placement='top' title='" + row.Excuseinfo + "'><div class='alertIco'></div></span>";
                        }
                        else {
                            return "<div class='alertIco-off'></div>";
                        }
                    },
                },
            ],
            filter: false,
            info: false,
            ordering: false,
            "scrollY": "400px",
            "scrollCollapse": true,
            paging: false,
        });
        MonthlyTimeSheetSummaryTable = $('#MonthlyTimeSheetSummaryTable').DataTable({
            data: data.Result.Summary,
            autoWidth: true,
            rowId: 'emp_id',
            columns: [{ data: "daysno" }
                , { data: "daysabsent" }, { data: "daysoff" }, { data: "daysvication" }, { data: "totalwork" }
                , { data: "ac_work" }, { data: "totallate" }, { data: "totalover" }, { data: "totalExecuse" }],
            filter: false,
            info: false,
            ordering: false,
            paging: false,
        });
        $("#txt_employeno_Montlydetails").val(data.Result.Summary[0].emp_no);
        $("#txt_employename_Montlydetails").val(data.Result.Summary[0].emp_name);
        $("#txt_sec_Montlydetails").val(data.Result.Summary[0].sec_name);
        $("#MonthlyDetails_DateRangeInfo").html((resources.lang == "en-US" ? "From {0} To {1}" : "من {0} إلى {1}").format((parseInt(DateNo).FromOADate()).ToDateString("dd/MM/yyyy"), (parseInt(DateNo2).FromOADate()).ToDateString("dd/MM/yyyy")));
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });


}
function OpenMonthlyDetailsDialog(obj) {
    if (MonthlyDailyTimeSheetTable != null) {
        MonthlyDailyTimeSheetTable.clear();
        MonthlyDailyTimeSheetTable.destroy();

    }
    if (MonthlyTimeSheetSummaryTable != null) {
        MonthlyTimeSheetSummaryTable.clear();
        MonthlyTimeSheetSummaryTable.destroy();

    }
    $("#txt_employeno_Montlydetails").val("");
    $("#txt_employename_Montlydetails").val("");
    $("#txt_sec_Montlydetails").val("");
    $("#MonthlyDetails_DateRangeInfo").html("");
    EmpID = $(obj).attr("data-empid");
    DateNo = $(obj).attr("data-fromdateno");
    DateNo2 = $(obj).attr("data-todateno");
    $('#MonthlyDetailsAttendanceDialog').modal('show');
}
function SearchMonthly() {

    Monthlyfrom_dateno = $("#monthly_FromDate").datepicker("getDate").ToOADate();
    Monthlyto_dateno = $("#monthly_ToDate").datepicker("getDate").ToOADate();
    MonthlyFilter = {
        RowFilter: GetMonthlyFilter(),
        Sec_ID: $('#txt_Select_MonthlySection').attr('data-id'),
        Reg_ID: $('#txt_Select_MonthlyBranch').attr('data-id'),
        Emp_ID: $('#txt_Select_MonthlyEmployee').attr('data-id'),
        Emp_Loc: $('#txt_Select_MonthlyLocation').attr('data-id'),
        FromDate: Monthlyfrom_dateno,
        ToDate: Monthlyto_dateno
    }
    MonthlyTimeSheetTable.ajax.reload();
}
function printMonthly() {
    Monthlyfrom_dateno = $("#monthly_FromDate").datepicker("getDate").ToOADate();
    Monthlyto_dateno = $("#monthly_ToDate").datepicker("getDate").ToOADate();
    MonthlyFilter = {
        RowFilter: GetMonthlyFilter(),
        Sec_ID: $('#txt_Select_MonthlySection').attr('data-id'),
        Reg_ID: $('#txt_Select_MonthlyBranch').attr('data-id'),
        Emp_ID: $('#txt_Select_MonthlyEmployee').attr('data-id'),
        Emp_Loc: $('#txt_Select_MonthlyLocation').attr('data-id'),
        FromDate: Monthlyfrom_dateno,
        ToDate: Monthlyto_dateno,
        OrderBy: "0",
        OrderDirection: MonthlyTimeSheetTable.order()[0][1]
    }
    ShowReportMode(GetRootURL() + "TimeSheet/Monthly/PrintReport", MonthlyFilter, true);
}
function printMonthlyDetails() {
    MonthlyFilter = {
        Emp_ID: EmpID,
        FromDate: Monthlyfrom_dateno,
        ToDate: Monthlyto_dateno
    }
    ShowReportMode(GetRootURL() + "TimeSheet/Monthly/Details/PrintReport", MonthlyFilter, false);
}
///////////////////////////////////////////

////////Transactions//////////////////////
function UserDeviceListSelection(id, uname) {
    $(Select_Device_Control).val(uname).change();
    $(Select_Device_Control).attr("data-id", id);
    $('#DeviceDialog').modal('hide');
    $(Select_Device_Control).focus();
}
function LoadDevicesListTable() {
    if (DevicesListData == null) {
        if (DeviceListTable != null) {
            DeviceListTable.clear();
            DeviceListTable.destroy();

        }
        $.getJSON(prefixApiURL + "TimeSheet/Transactions/GetDevices").done(function (data) {
            DevicesListData = data.Result;
            DeviceListTable = $('#DeviceListTable').DataTable(
                {

                    ajax: "",
                    autoWidth: true,
                    data: DevicesListData,
                    columns: [{ data: "uname" }],
                    columnDefs: [
                        { "width": "100%", "targets": 0 },

                    ],
                    filter: true,
                    rowId: 'id',
                    info: false,
                    ordering: true,
                    "order": [],
                    createdRow: function (row, data, index) {
                        if (data.length != 0) {
                            jQuery(row).attr('data-id', data.id).attr('data-index', index);
                            jQuery(row).attr('data-name', data.uname);
                            jQuery(row).on('click', function (event) {
                                UserDeviceListSelection(jQuery(this).attr('data-id'), jQuery(this).attr('data-name'));

                            });
                        }
                    },
                    language: { "url": resources.Datatable_Lang },
                    pagingType: "full_numbers",
                    "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

                });

        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });


    }
}
function InitializeTransactions() {
    if (!HasPermission(8, "rep-trans")) {
        $("#printTransactions").hide();
    }
    else {
        $("#printTransactions").click(function (e) { e.preventDefault(); PrintTransactionReport(); })
    }

    $('#DeviceDialog').on('shown.bs.modal', function () {
        LoadDevicesListTable();
    });
    $('.dpt').datepicker({ todayHighlight: true, todayBtn: "linked", });
    $('.dpt').datepicker('update', new Date());
    $("#pn_Transviewspan").on('click', function (e) {
        var $this = $(this);
        if (!$this.hasClass('panel-collapsed')) {
            $("#pn_Transviewbody").slideUp();
            $this.addClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        } else {
            $("#pn_Transviewbody").slideDown();
            $this.removeClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
    });


    var apiurl = prefixApiURL + "TimeSheet/Transactions/GetAll"
    TransviewTimeSheetTable = $('#TransviewTimeSheetTable').DataTable(
        {
            ajax:
                function (data, callback, settings) {
                    if (!reloaddata) {
                        reloaddata = true;
                        return;
                    }

                    data.Sec_ID = TransactionFilter == null ? 0 : TransactionFilter.Sec_ID;
                    data.DeviceId = TransactionFilter == null ? 0 : TransactionFilter.Device_ID;
                    data.Reg_ID = TransactionFilter == null ? 0 : TransactionFilter.Reg_ID;
                    data.Emp_ID = TransactionFilter == null ? 0 : TransactionFilter.Emp_ID;
                    data.FromDate = TransactionFilter == null ? 0 : TransactionFilter.FromDate;
                    data.ToDate = TransactionFilter == null ? 0 : TransactionFilter.ToDate;
                    data.RowFilter = TransactionFilter == null ? '' : TransactionFilter.RowFilter;
                    // make a regular ajax request using data.start and data.length
                    $.get(apiurl, data,
                        function (res) {
                            // map your server's response to the DataTables format and pass it to
                            // DataTables' callback
                            callback({
                                recordsTotal: res.Result.recordsTotal,
                                recordsFiltered: res.Result.recordsFiltered,
                                draw: res.Result.draw,
                                data: res.Result.data
                            });
                        });

                },

            createdRow: function (row, data, index) {
                if (data.length != 0) {
                    if (!data.m_status)
                        jQuery(row).addClass('alert-danger');
                    else if (data.m_manual == 1)
                        jQuery(row).addClass('alert-warning');
                    else
                        jQuery(row).addClass('active');
                }
            },
            // processing: true, // control the processing indicator.
            serverSide: true,
            stateSave: true,
            deferRender: true,
            "lengthMenu": [[10, 20, 50], [10, 20, 50]],
            autoWidth: false,
            rowId: 'trans_id',
            columns: [{ data: "m_id" }, { data: "emp_name" }, { data: "m_date" }
                , { data: "m_time" }, { data: "StatusName" }, { data: "m_unit" }],
            columnDefs: [
                { "width": "10%", "targets": 0, type: "num", "orderable": false },
                { "width": "25%", "targets": 1, "orderable": false },
                { "width": "10%", "targets": 2, "orderable": false },
                { "width": "10%", "targets": 3, "orderable": false },
                { "width": "10%", "targets": 4, "orderable": false },
                { "width": "25%", "targets": 5, "orderable": false },
                {
                    className: "col-centered", "width": "15%", "targets": 6,
                    "render": function (data, type, row) {
                        return (row.m_deleted == false ? '<span class="glyphicon glyphicon-trash  col-delete handcursor"' : '<span class="glyphicon glyphicon-plus  col-add handcursor"') + ' data_deleted=' + row.m_deleted + ' data-id=' + row.trans_id + ' onclick="if(IsDisabled(this)) { return };DeleteTransViewRow($(this))"></span>';
                    }
                }
            ],
            filter: false,
            info: true,
            ordering: false,
            language: { "url": resources.Datatable_Lang },
            pagingType: "full_numbers",
            "dom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

        });
    if (TransviewTimeSheetTable != null) {

        var candelete = HasPermission(5, 'trans-include');
        TransviewTimeSheetTable.columns(6).visible(candelete);
        TransviewTimeSheetTable.columns.adjust().draw(false);
    }

}
function DeleteTransViewRow(obj) {
    if (!HasPermission(5, 'trans-include')) {
        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    if (obj != null) {
        TransID = $(obj).attr('data-id');
        var apiurl = "";
        apiurl = prefixApiURL + "TimeSheet/Daily/DeleteTrans/" + TransID;
        $.ajax
            ({
                type: "POST",
                url: apiurl,
                dataType: 'json',
                cache: false,
            }).done(function (data) {
                if (data.Status != "1") {
                    ShowAlert(data.Msg, resources.TransactionDetailsReportTitle, "danger");
                }
                else {
                    TransviewTimeSheetTable.row().updateRow(TransID, data.Result, true);
                    ShowAlert(data.Msg, resources.TransactionDetailsReportTitle, "success");
                    DailyChanged = true;
                }


            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.DeleteTransErrorMsg, resources.TransactionDetailsReportTitle, "danger");

            }).always(function () {
            });
    }
}
function SearchTransaction() {

    TransactionFilter = {
        RowFilter: $("#dd_Transviewfilter").val(),
        Sec_ID: $('#txt_Select_TransviewSection').attr('data-id'),
        Reg_ID: $('#txt_Select_TransviewBranch').attr('data-id'),
        Emp_ID: $('#txt_Select_TransviewEmployee').attr('data-id'),
        Device_ID: $('#txt_Select_TransviewDevice').attr('data-id'),
        FromDate: $("#Transview_FromDate").datepicker("getDate").ToOADate(),
        ToDate: $("#Transview_ToDate").datepicker("getDate").ToOADate()
    }
    TransviewTimeSheetTable.ajax.reload();
}
function PrintTransactionReport() {
    TransactionFilter = {
        RowFilter: $("#dd_Transviewfilter").val(),
        Sec_ID: $('#txt_Select_TransviewSection').attr('data-id'),
        Reg_ID: $('#txt_Select_TransviewBranch').attr('data-id'),
        Emp_ID: $('#txt_Select_TransviewEmployee').attr('data-id'),
        Device_ID: $('#txt_Select_TransviewDevice').attr('data-id'),
        FromDate: $("#Transview_FromDate").datepicker("getDate").ToOADate(),
        ToDate: $("#Transview_ToDate").datepicker("getDate").ToOADate()
    };
    ShowReportMode(GetRootURL() + "TimeSheet/Transactions/PrintReport", TransactionFilter, true);
}

///////////////Violation/////////////////////////
function InitializeViolation() {
    var ViolationList = null;

    $('#ViolationDetailsAttendanceDialog').on('shown.bs.modal', function () {
        debugger;
        GetViolationDetails();
    });
    //$('.dpM').datepicker({ todayHighlight: true, todayBtn: "linked", });
    //var CurrentDate = new Date();
    //$('#monthly_FromDate').datepicker('update', new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(), 1));
    //$('#monthly_ToDate').datepicker('update', new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(), CurrentDate.daysInMonth()));
    //$("#pn_monthlyspan").on('click', function (e) {
    //    var $this = $(this);
    //    if (!$this.hasClass('panel-collapsed')) {
    //        $("#pn_monthlybody").slideUp();
    //        $this.addClass('panel-collapsed');
    //        $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    //    } else {
    //        $("#pn_monthlybody").slideDown();
    //        $this.removeClass('panel-collapsed');
    //        $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    //    }
    //});

    if (!HasPermission(8, "rep-monthly")) {
        $("#printViolation").hide();
        // $("#printViolationDetails").hide();
    }
    else {
        $("#printViolation").click(function (e) { e.preventDefault(); printViolation(); })
        // $("#printViolationDetails").click(function (e) { e.preventDefault(); printMonthlyDetails(); })
    }

    //setupViolationToolBar();
    var apiurl = prefixApiURL + "TimeSheet/Violations/GetAll"
    ViolationTimeSheetTable = $('#ViolationTimeSheetTable').DataTable(
        {
            ajax:
                function (data, callback, settings) {


                    data.Year = ViolationFilter == null ? 0 : ViolationFilter.Year;
                    data.Month = ViolationFilter == null ? 0 : ViolationFilter.Month;
                    data.Company = ViolationFilter == null ? 0 : ViolationFilter.Company;
                    // make a regular ajax request using data.start and data.length
                    $.get(apiurl, data,
                        function (res) {
                            // map your server's response to the DataTables format and pass it to
                            // DataTables' callback
                            if (!res.Result || res.Result.length == 0) {
                                callback({ data: [] });
                            } else {
                                callback({ data: res.Result });
                            }
                        });

                },
            "drawCallback": function (settings) {
                // $('[data-toggle="tooltip"]').tooltip({ html: true });
                $('#ViolationTimeSheetTable a').click(function (e) {
                    e.preventDefault()
                    OpenViolationDetailsDialog(this);
                })
                $("#ViolationTimeSheetTable_wrapper div.toolbar").addClass('pull-right').addClass('flip');


            },
            // StatusCode
            //createdRow: function (row, data, index) {
            //    if (data.length != 0) {
            //    }
            //},
            // processing: true, // control the processing indicator.
            //serverSide: false,
            //stateSave: fa,
            // deferRender: true,
            "lengthMenu": [[10, 20, 50], [10, 20, 50]],
            autoWidth: false,
            rowId: 'empNO',
            columns: [{ data: "empNO" }, { data: "EMPNAME" }, { data: "AbsenceDuration" }
                , { data: "Abs_NumberOfRepletion" }, { data: "abs_ViolationText" }, { data: "DelayDuration" }, { data: "TotalLateStr" }
                , { data: "Late_NumberOfRepletion" }, { data: "late_ViolationText" }, { data: "UploadMonth" }, { data: "ExEmployee" }, { data: "TERMINATION_DATE" }],
            columnDefs: [
                {
                    "targets": 0, type: "num", "orderable": true,
                    "render": function (data, type, row) {
                        if (data != null) {
                            return "<a  title='" + resources.ClickHereToShowDetailsTooltip + "' class='transdetails' data-empid='" + row.empNO + "' data-UploadRef='" + row.UploadRef + "' href=''>"
                                + "<span title='" + resources.ClickHereToShowDetailsTooltip + "'>" + data + "</span> </a>";
                        }
                        else

                            return "<a href=''></a>";
                    }
                },
                { "targets": 1, "orderable": false },
                { "targets": 2, "orderable": false },
                { "targets": 3, "orderable": false },
                { "targets": 4, "orderable": false },
                { "targets": 5, "orderable": false },
                { "targets": 6, "orderable": false },
                { "targets": 7, "orderable": false },
                { "targets": 8, "orderable": false },
                { "targets": 9, "orderable": false },
                { "targets": 10, "orderable": false },
                { "targets": 11, "orderable": false }
            ],
            filter: true,
            info: true,
            ordering: true,
            pageLength: 10,
            language: { "url": resources.Datatable_Lang },
            pagingType: "full_numbers",
            "dom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

        });

}
//function GetViolationFilter() {
//    var timeregx = /\d+\:\d+/;
//    var numberregx = /^\d+$/;
//    var inputval = $("#MontlyFilterValue").val();
//    if (inputval.trim().length == 0)
//        return "";
//    var datatype = $('option:selected', "#MonthlyFilterdd").attr('data-type');
//    if (datatype == "d") {
//        if (numberregx.test(inputval)) {
//            switch ($("#MonthlyFilterdd").val()) {
//                case "daysno":
//                    return "having sum(CASE WHEN (m_timefin <> '--:--' AND m_actualtime <> '00:00') OR (isnull(tb_execuse.exc_type, 0) = 2) THEN 1 ELSE 0 END) " + $("#MonthlyOperationdd").val() + " " + inputval;
//                case "daysabsent":
//                    return "having sum(CASE WHEN (m_timefin = '--:--' AND m_timefout = '--:--' AND m_actualtime <> '00:00') AND (isnull(tb_execuse.exc_type, 0) <> 2) THEN 1 ELSE 0 END) " + $("#MonthlyOperationdd").val() + " " + inputval;
//                case "daysoff":
//                    return "having sum(CASE WHEN m_actualtime = '00:00' AND m_vac_id = 0 THEN 1 ELSE 0 END) " + $("#MonthlyOperationdd").val() + " " + inputval;
//                case "daysvication":
//                    return "having sum(CASE WHEN isnull(m_vac_id, 0) > 0 THEN 1 ELSE 0 END) " + $("#MonthlyOperationdd").val() + " " + inputval;
//                default:
//                    return "";
//            }

//        }
//        else
//            return "";
//    }
//    else if (datatype == "h") {
//        if (timeregx.test(inputval)) {
//            switch ($("#MonthlyFilterdd").val()) {
//                case "totalwork":
//                    return "having sum(CASE WHEN m_timetotal = '--:--' THEN 0 ELSE dbo.GetTotalMinutsFromTime(m_timetotal) END) " + $("#MonthlyOperationdd").val() + " dbo.GetTotalMinutsFromTime('" + inputval + "')";
//                case "ac_work":
//                    return "having sum(dbo.GetTotalMinutsFromTime(m_actualtime)) " + $("#MonthlyOperationdd").val() + " dbo.GetTotalMinutsFromTime('" + inputval + "')";
//                case "totallate":
//                    return "having sum(CASE WHEN m_totallate = '--:--' THEN 0 ELSE dbo.GetTotalMinutsFromTime(m_totallate) END) " + $("#MonthlyOperationdd").val() + " dbo.GetTotalMinutsFromTime('" + inputval + "')";
//                case "totalover":
//                    return "having sum(CASE WHEN m_overtime = '--:--' THEN 0 ELSE dbo.GetTotalMinutsFromTime(m_overtime) END) " + $("#MonthlyOperationdd").val() + " dbo.GetTotalMinutsFromTime('" + inputval + "')";
//                case "totalExecuse":
//                    return "having sum(CASE WHEN tb_execuse.exc_id IS NULL THEN 0 ELSE exc_minuts END)  " + $("#MonthlyOperationdd").val() + " dbo.GetTotalMinutsFromTime('" + inputval + "')";
//                default:
//                    return "";
//            }

//        }
//        else
//            return "";
//    }
//    else {
//        return "";
//    }

//}
//function setupViolationToolBar() {


//    var MonthlyFilterdd = $("#MonthlyFilterdd");
//    var MonthlyOperationdd = $("#MonthlyOperationdd");

//    MonthlyFilterdd.append($("<option data-type='d' />").val("daysno").text(resources.Clmdaysno));
//    MonthlyFilterdd.append($("<option data-type='d' />").val("daysabsent").text(resources.Clmdaysabsent));
//    MonthlyFilterdd.append($("<option data-type='d' />").val("daysoff").text(resources.Clmdaysoff));
//    MonthlyFilterdd.append($("<option data-type='d' />").val("daysvication").text(resources.Clmdaysvication));

//    MonthlyFilterdd.append($("<option data-type='h' />").val("totalwork").text(resources.Clmtotalwork));
//    MonthlyFilterdd.append($("<option data-type='h' />").val("ac_work").text(resources.Clmac_work));
//    MonthlyFilterdd.append($("<option data-type='h' />").val("totallate").text(resources.Clmtotallate));
//    MonthlyFilterdd.append($("<option data-type='h' />").val("totalover").text(resources.Clmtotalover));
//    MonthlyFilterdd.append($("<option data-type='h' />").val("totalExecuse").text(resources.ClmtotalExecuse));

//    MonthlyOperationdd.append($("<option />").val("=").text("="));
//    MonthlyOperationdd.append($("<option />").val("<").text("<"));
//    MonthlyOperationdd.append($("<option />").val(">").text(">"));
//    MonthlyOperationdd.append($("<option />").val("<=").text("<="));
//    MonthlyOperationdd.append($("<option />").val(">=").text(">="));
//    MonthlyOperationdd.append($("<option />").val("<>").text("<>"));
//}
function GetViolationDetails() {
    var apiurl = prefixApiURL + "TimeSheet/Violations/GetDetails";
    var formdata =
    {
        empNO: EmpNo,
        UploadRef: UploadRef
    };

    $.post(apiurl, formdata).done(function (data) {
        ViolationLateTable = $('#ViolationLateTable').DataTable({
            //"drawCallback": function (settings) {
            //    $('[data-toggle="tooltip"]').tooltip({
            //        html: true, tooltipClass: "tooltip",
            //        delay: { show: 300, hide: 0 },
            //        placement: function (tip, element) { //$this is implicit
            //            var position = $(element).position();
            //            if (position.left > 515) {
            //                return "left";
            //            }
            //            if (position.left < 515) {
            //                return "right";
            //            }
            //            if (position.top < 110) {
            //                return "bottom";
            //            }
            //            return "top";
            //        }

            //    });
            //},
            data: data.Result.Lateness,
            //createdRow: function (row, data, index) {
            //    var dd = new Date();
            //    if (data.length != 0) {
            //        if (data.StatusCode == 'abs' || data.vacinfo.includes('Absence'))
            //            jQuery(row).addClass('alert-danger');
            //        else if (data.StatusCode == 'inc' && data.m_dateno < dd.ToOADate())
            //            jQuery(row).addClass('alert-incomplete');
            //        else if (data.StatusCode == 'vac' && !data.vacinfo.includes('Absence'))
            //            jQuery(row).addClass('alert-info');
            //        else if (data.StatusCode == 'lat')
            //            jQuery(row).addClass('alert-warning');
            //        else if (data.StatusCode == 'off')
            //            jQuery(row).addClass('alert-default');
            //        else
            //            jQuery(row).addClass('active');
            //    }
            //},
            autoWidth: true,
            rowId: 'EmpNo',
            columns: [{ data: "TransactionDate" }, { data: "TotalLateStr" }],
            //columnDefs: [

            //    {
            //        "width": "12%", "targets": 0, "orderable": false,
            //        "render": function (data, type, row) {
            //            if (data != null) {
            //                return (row.vac_id != '0' ? "<span data-toggle='tooltip' data-container='#MonthlyDetailsAttendanceDialog' role='tooltip' data-placement='top' title='" + row.vacinfo + "'>" : "<span>") + data + "</span>";
            //            }
            //            else

            //                return "<span></span>";
            //        }
            //    },
            //    { "width": "9%", "targets": 1, "orderable": false },
            //    { "width": "9%", "targets": 2, "orderable": false },
            //    { "width": "10%", "targets": 3, "orderable": false },
            //    { "width": "10%", "targets": 4, "orderable": false },
            //    { "width": "10%", "targets": 5, "orderable": false },
            //    { "width": "12%", "targets": 6, "orderable": false },
            //    { "width": "10%", "targets": 7, "orderable": false },
            //    { "width": "12%", "targets": 8, "orderable": false },
            //    {
            //        className: "col-centered", "width": "5%", "targets": 9,
            //        "render": function (data, type, row) {

            //            if (row.exc_id != '0') {
            //                return "<span data-toggle='tooltip' data-container='#MonthlyDetailsAttendanceDialog' data-id='" + row.exc_id + "' data-placement='top' title='" + row.Excuseinfo + "'><div class='alertIco'></div></span>";
            //            }
            //            else {
            //                return "<div class='alertIco-off'></div>";
            //            }
            //        },
            //    },
            //],
            filter: false,
            info: false,
            ordering: false,
            paging: false
        });
        ViolationAbsenceTable = $('#ViolationAbsenceTable').DataTable({
            data: data.Result.Absence,
            autoWidth: true,
            rowId: 'EmpNo',
            columns: [{ data: "AbsenceStart" }
                , { data: "AbsenceEnd" }, { data: "Duration" }],
            filter: false,
            info: false,
            ordering: false,
            paging: false
        });
        $("#txt_employeno_Violationdetails").val(data.Result.EmpNo);
        $("#txt_employename_Violationdetails").val(resources.lang == "en-US" ? data.Result.emp_nameEn : data.Result.emp_name);
        $("#txt_sec_Violationdetails").val(data.Result.sec_Name);
        $("#ViolationDetails_DateRangeInfo").html(data.Result.ViolationMonth);
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });


}
function OpenViolationDetailsDialog(obj) {
    if (ViolationLateTable != null) {
        ViolationLateTable.clear();
        ViolationLateTable.destroy();

    }
    if (ViolationAbsenceTable != null) {
        ViolationAbsenceTable.clear();
        ViolationAbsenceTable.destroy();

    }
    $("#txt_employeno_Montlydetails").val("");
    $("#txt_employename_Montlydetails").val("");
    $("#txt_sec_Montlydetails").val("");
    $("#MonthlyDetails_DateRangeInfo").html("");
    EmpNo = $(obj).attr("data-empid");
    UploadRef = $(obj).attr("data-UploadRef");
    $('#ViolationDetailsAttendanceDialog').modal('show');
}
function SearchViolation() {

    //Monthlyfrom_dateno = $("#monthly_FromDate").datepicker("getDate").ToOADate();
    //Monthlyto_dateno = $("#monthly_ToDate").datepicker("getDate").ToOADate();
    ViolationFilter = {
        Year: $('#txt_Select_ViolationYear').attr('data-id'),
        Month: $('#txt_Select_ViolationMonth').attr('data-id'),
        Company: $('#txt_Select_ViolationBranch').attr('data-id')
    }
    ViolationTimeSheetTable.ajax.reload();
}
function printViolation() {

    ViolationFilter = {
        Year: $('#txt_Select_ViolationYear').attr('data-id'),
        Month: $('#txt_Select_ViolationMonth').attr('data-id'),
        Company: $('#txt_Select_ViolationBranch').attr('data-id')
    }
    ShowReportMode(GetRootURL() + "TimeSheet/vaiolation/PrintReport", ViolationFilter, false);
}
//function printViolationDetails() {
//    MonthlyFilter = {
//        Emp_ID: EmpID,
//        FromDate: Monthlyfrom_dateno,
//        ToDate: Monthlyto_dateno
//    }
//    ShowReportMode(GetRootURL() + "TimeSheet/Monthly/Details/PrintReport", MonthlyFilter, false);
//}
///////////////////////////////////////////


///////////////Exemptions/////////////////////////
function InitializeExemptions() {
    if (!HasPermission(4, "rep-exemptions")) {
        $("#printExemptions").hide();
    }
    else {
        $("#printExemptions").click(function (e) { e.preventDefault(); printExemptions(); })
    }
    var apiurl = prefixApiURL + "TimeSheet/Exemptions/GetAll"
    ExemptionsTimeSheetTable = $('#ExemptionsTimeSheetTable').DataTable(
        {
            ajax:
                function (data, callback, settings) {
                    data.Sec_ID = ExemptionsFilter == null ? 0 : ExemptionsFilter.Sec_ID;
                    data.Emp_ID = ExemptionsFilter == null ? 0 : ExemptionsFilter.Emp_ID;
                    data.Company = ExemptionsFilter == null ? 0 : ExemptionsFilter.Company;
                    // make a regular ajax request using data.start and data.length
                    $.get(apiurl, data,
                        function (res) {
                            // map your server's response to the DataTables format and pass it to
                            // DataTables' callback
                            if (!res.Result || res.Result.length == 0) {
                                callback({ data: [] });
                            } else {
                                callback({ data: res.Result });                             
                            }
                        });
                },
            "drawCallback": function (settings) {

            },
            "lengthMenu": [[10, 20, 50], [10, 20, 50]],
            autoWidth: false,
            rowId: 'emp_no',
            columns: [
                { data: "emp_no" },
                { data: "emp_name" },
                { data: "reg_name" },
                { data: "sec_name" },
                { data: "AttendanceExempted" },
                { data: "PenaltyExempted" }
                //{ data: "emp_id" },
                //{ data: "emp_JobTitle" },  
                //{ data: "reg_id" },                              
                //{ data: "sec_id" },
            ],

            columnDefs: [
                //{
                //    "targets": 0, type: "num", "orderable": true,
                //    "render": function (data, type, row) {
                //        if (data != null) {
                //            return "<a  title='" + resources.ClickHereToShowDetailsTooltip + "' class='transdetails' data-empid='" + row.empNO + "' data-UploadRef='" + row.UploadRef + "' href=''>"
                //                + "<span title='" + resources.ClickHereToShowDetailsTooltip + "'>" + data + "</span> </a>";
                //        }
                //        else
                //            return "<a href=''></a>";
                //    }
                //},
                { "targets": 0, "orderable": false },
                { "targets": 1, "orderable": true },
                { "targets": 2, "orderable": true },
                { "targets": 3, "orderable": true },               
                {
                    "targets": 4, "orderable": false,
                    "render": function (data, type, row) {
                        if (data != null) {
                            return "<span style='font - family: Segoe UI Symbol; font - size: 32px;'>" + (row.AttendanceExempted ? '&#10004;' : '&#10060;') + "</span>";
                        }
                    }
                },
                {
                    "targets": 5, "orderable": false,
                    "render": function (data, type, row) {
                        if (data != null) {
                            return "<span style='font - family: Segoe UI Symbol; font - size: 32px;'>" + (row.PenaltyExempted ? '&#10004;' : '&#10060;') + "</span>";
                        }
                    }
                }
            ],
            filter: true,
            info: true,
            ordering: true,
            pageLength: 10,
            language: { "url": resources.Datatable_Lang },
            pagingType: "full_numbers",
            "dom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'
        });
}

function SearchExemptions() {
    ExemptionsFilter = {
        //Year: $('#txt_Select_ViolationYear').attr('data-id'),
        //Month: $('#txt_Select_ViolationMonth').attr('data-id'),
        Sec_ID: $('#txt_Select_ExemptionsSection').attr('data-id'),
        Emp_ID: $('#txt_Select_ExemptionsEmployee').attr('data-id'),
        Company: $('#txt_Select_ExemptionsBranch').attr('data-id')
    }
    ExemptionsTimeSheetTable.ajax.reload();
}
function printExemptions() {
    ExemptionsFilter = {
        Sec_ID: $('#txt_Select_ExemptionsSection').attr('data-id'),
        Emp_ID: $('#txt_Select_ExemptionsEmployee').attr('data-id'),
        Company: $('#txt_Select_ExemptionsBranch').attr('data-id')
    }
    ShowReportMode(GetRootURL() + "TimeSheet/Exemptions/PrintReport", ExemptionsFilter, true);
}
///////////////////////////////////////////