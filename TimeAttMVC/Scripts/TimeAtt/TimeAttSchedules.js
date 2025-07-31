//Schedules Code

var CurrentView = 'Shift';

var ShiftTable = null;
var ShiftsData = null;
var ScheduleTable = null;
var SchedulesData = null;
var ScheduleGroupTable = null;
var ScheduleGroupsData = null;
var ScheduleGroupsEmployeeData = null;
///Function For All
function ShowTab(obj) {
    obj.tab('show')
    ShowScheduleForms(obj[0].id);
    InitializeScheduleTables();
    FillAllDataInformation();
    ClearAllScheduleForms();
    if (CurrentView == 'Shift') {
        if (ShiftTable != null && ShiftTable.rows('.selected').count() > 0) {
            CurrentID = ShiftTable.rows('.selected').data()[0].shift_id;
            ShiftTable.row().showRow(CurrentID, true);
            FillShiftsInformation();
        }
        else
            CurrentID = 0;
    }
    if (CurrentView == 'Schedule') {
        if (ScheduleTable != null && ScheduleTable.rows('.selected').count() > 0) {
            CurrentID = ScheduleTable.rows('.selected').data()[0].sch_id;
            ScheduleTable.row().showRow(CurrentID, true);
            FillScheduleInformation();
        }
        else
            CurrentID = 0;
    }
    if (CurrentView == 'Group') {
        if (ScheduleGroupTable != null && ScheduleGroupTable.rows('.selected').count() > 0) {
            CurrentID = ScheduleGroupTable.rows('.selected').data()[0].schGroup_id;
            ScheduleGroupTable.row().showRow(CurrentID, true);
            FillScheduleGroupInformation();
        }
        else
            CurrentID = 0;
    }
}
function InitializeSchedulesView() {
    setAllowTwoShifts();
    CurrentView = 'Shift';
    //When checkboxes/radios checked/unchecked, toggle background color
    $('.ChangeScheduleRadios').on('click', 'input[type=radio]', function () {
        $(this).closest('.ChangeScheduleRadios').find('.radio-inline, .radio').removeClass('checked');
        $(this).closest('.radio-inline, .radio').addClass('checked');



    });

    $('#txt_Select_Employee').change(function () {

        var empID = $('#txt_Select_Employee').attr("data-id");
        if (empID == "")
            FillScheduleGroupsInformationByEmployee(0);
        else
            FillScheduleGroupsInformationByEmployee(empID);
    });
    $('.ShiftCheckBoxes').on('change', 'input[type=checkbox]', function () {

        if (!$(this).prop('checked'))
            $(this).closest('.checkbox-inline').removeClass("checked");
        else
            $(this).closest('.checkbox-inline').addClass("checked");

        if ($(this).prop('id') == "Chk_FlexibleHour" && $(this).prop('checked')) {
            $("#FlexibleHourdiv").slideDown("fast");
            $("#Chk_TwoShifts").prop('checked', false).closest('.checkbox-inline').removeClass("checked");
        }
        else if ($(this).prop('id') == "Chk_FlexibleHour" && !$(this).prop('checked')) {
            $("#FlexibleHourdiv").slideUp("fast");
        }

        if ($(this).prop('id') == "Chk_TwoShifts" && $(this).prop('checked')) {
            $("#FlexibleHourdiv").slideDown("fast");
            $("#Chk_FlexibleHour").prop('checked', false).closest('.checkbox-inline').removeClass("checked");
        }
        else if ($(this).prop('id') == "Chk_TwoShifts" && !$(this).prop('checked')) {
            $("#FlexibleHourdiv").slideUp("fast");
        }

    });
    $('.SchGroupCheckBoxes').on('change', 'input[type=checkbox]', function () {
        if (!$(this).prop('checked'))
            $(this).closest('.checkbox-inline').removeClass("checked");
        else
            $(this).closest('.checkbox-inline').addClass("checked");

        if ($(this).prop('id') == "Chk_SelectDateLable" && $(this).prop('checked')) {
            $("#schGropDates").slideDown("fast");
        }
        else if ($(this).prop('id') == "Chk_SelectDateLable" && !$(this).prop('checked'))
            $("#schGropDates").slideUp("fast");
    });
    $("#FlexibleHourdiv").hide();
    $("#schGropDates").hide();

    $("#ScheduleTab").tab;
    $('#ScheduleTab a').click(function (e) {
        e.preventDefault()
        ShowTab($(this));
    })

    InitializeScheduleTables();
    InitializeShiftTimes();
    InitializeScheGroup();
    FillAllDataInformation();
    ClearAllScheduleForms();

    $("#bt_saveShift").click(function (e) { e.preventDefault(); if ($(this).hasClass('disabled')) return; else SaveScheduleChange(); })
    $("#bt_CancelShift").click(function (e) { e.preventDefault(); ClearShiftForm(); FillShiftsInformation(); })

    $("#bt_saveSchedule").click(function (e) { e.preventDefault(); if ($(this).hasClass('disabled')) return; else SaveScheduleChange(); })
    $("#bt_CancelSchedule").click(function (e) { e.preventDefault(); ClearScheduleForm(); FillScheduleInformation(); })

    $("#bt_saveSchGroup").click(function (e) { e.preventDefault(); if ($(this).hasClass('disabled')) return; else SaveScheduleChange(); })
    $("#bt_CancelSchGroup").click(function (e) { e.preventDefault(); ClearScheduleGroupForm(); FillScheduleGroupInformation(); })
    $("#bt_saveChangeSchedule").click(function (e) { e.preventDefault(); if ($(this).hasClass('disabled')) return; else SaveScheduleChangeBy(); })

}

function FillAllDataInformation() {
    var apiurl = prefixApiURL;
    if (ShiftsData == null && CurrentView == 'Shift') {
        apiurl = apiurl + "Schedules/Shifts/GetAll";
        var data = null;
        $.ajax
            ({
                type: "GET",
                url: apiurl,
                dataType: 'json',
                //async: false,
                cache: false,
                // beforeSend: setHeader,
                data: data
            }).done(function (data) {
                if (data.Status != "1") {
                    ShowAlert(resources.LoadShiftsListErrorMsg + " " + data.Msg, resources.SchduleMsgTitle, "danger");
                }
                else {

                    ShiftsData = data.Result;
                    ShiftTable.clear().draw();
                    if (ShiftsData != null && ShiftsData.length > 0)
                        ShiftTable.rows.add(ShiftsData).draw();
                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.LoadShiftsListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.SchduleMsgTitle, "danger");

            }).always(function () {
            });
    }
    if (SchedulesData == null && CurrentView == 'Schedule') {
        apiurl = apiurl + "Schedules/GetAll";
        var data = null;
        $.ajax
            ({
                type: "GET",
                url: apiurl,
                dataType: 'json',
                //async: false,
                cache: false,
                // beforeSend: setHeader,
                data: data
            }).done(function (data) {
                if (data.Status != "1") {
                    ShowAlert(resources.LoadScheduleListErrorMsg + " " + data.Msg, resources.SchduleMsgTitle, "danger");
                }
                else {


                    SchedulesData = data.Result;
                    ScheduleTable.clear().draw();
                    if (SchedulesData != null && SchedulesData.length > 0)
                        ScheduleTable.rows.add(SchedulesData).draw();
                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.LoadScheduleListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.SchduleMsgTitle, "danger");

            }).always(function () {
            });
    }
    if (ScheduleGroupsData == null && CurrentView == 'Group') {
        apiurl = apiurl + "Schedules/Groups/GetAll";
        var data = null;
        $.ajax
            ({
                type: "GET",
                url: apiurl,
                dataType: 'json',
                //async: false,
                cache: false,
                // beforeSend: setHeader,
                data: data
            }).done(function (data) {
                if (data.Status != "1") {
                    ShowAlert(resources.LoadScheduleGroupListErrorMsg + " " + data.Msg, resources.SchduleMsgTitle, "danger");
                }
                else {
                    ScheduleGroupsData = data.Result;
                    ScheduleGroupTable.clear().draw();
                    if (ScheduleGroupsData != null && ScheduleGroupsData.length > 0)
                        ScheduleGroupTable.rows.add(ScheduleGroupsData).draw();
                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.LoadScheduleGroupListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.SchduleMsgTitle, "danger");

            }).always(function () {
            });
    }

}
function ReloadScheduleData() {
    CurrentID = 0;
    if (ShiftTable != null)
        ShiftTable.$('tr.selected').removeClass('selected');
    if (ScheduleTable != null)
        ScheduleTable.$('tr.selected').removeClass('selected');
    if (ScheduleGroupTable != null)
        ScheduleGroupTable.$('tr.selected').removeClass('selected');

    $('#txt_Select_Employee').attr('data-id', 0).val('').html('');
    ShiftsData = null;
    SchedulesData = null;
    ScheduleGroupsData = null;
    ClearAllScheduleForms();
    // FillAllDataInformation();
}
function InitializeScheduleTables() {
    if (ShiftTable == null && CurrentView == 'Shift') {
        ShiftTable = $('#ShiftTable').DataTable(
            {
                ajax: "",
                autoWidth: false,
                columns: [{ data: "shift_id" }, { data: "shift_name" }, { data: "shift_fin" }, { data: "shift_fout" }
                ],
                columnDefs: [
                    {
                        "targets": [0],
                        "visible": false,
                        "searchable": false
                    },
                    { "width": "70%", "targets": 1 },
                    { "width": "15%", "targets": 2 },
                    { "width": "15%", "targets": 3 },

                ],
                //"scrollY": $('#scheduleformsdiv').height() - 155,
                //"scrollCollapse": true,
                filter: true,
                ordering: true,
                info: false,
                rowId: 'shift_id',
                "paging": true,
                "order": [],
                createdRow: function (row, data, index) {
                    if (data.length != 0) {
                        jQuery(row).attr('data-id', data.shift_id).attr('data-index', index);
                        jQuery(row).addClass("handcursor");
                    }
                },

                language: { "url": resources.Datatable_Lang },
                pagingType: "simple_numbers",
                "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'
            });

        $('#ShiftTable tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                ShiftTable.rows('.selected').deselect()
                ShiftTable.rows($(this)).select();
            }
            else {
                ShiftTable.rows('.selected').deselect()
                ShiftTable.rows($(this)).select();

            }
            UserShiftSelection(ShiftTable.rows({ selected: true }).data()[0].shift_id);
        });
    }

    if (ScheduleTable == null && CurrentView == 'Schedule') {
        ScheduleTable = $('#ScheduleTable').DataTable(
            {
                ajax: "",
                autoWidth: false,
                columns: [{ data: "sch_id" }, { data: "sch_name" }, { data: "sch_desc" }
                ],
                columnDefs: [
                    {
                        "targets": [0],
                        "visible": false,
                        "searchable": false
                    },
                    { "width": "40%", "targets": 1 },
                    { "width": "60%", "targets": 2 },
                ],
                //"scrollY": $('#scheduleformdiv').height() - 155,
                //"scrollCollapse": true,
                filter: true,
                info: false,
                rowId: 'sch_id',
                ordering: true,
                "paging": true,
                "order": [],
                createdRow: function (row, data, index) {
                    if (data.length != 0) {
                        jQuery(row).attr('data-id', data.sch_id).attr('data-index', index);
                        jQuery(row).addClass("handcursor");
                    }
                },
                language: { "url": resources.Datatable_Lang },
                pagingType: "simple_numbers",
                "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'
            });
        $('#ScheduleTable tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                ScheduleTable.rows('.selected').deselect()
                ScheduleTable.rows($(this)).select();
            }
            else {
                ScheduleTable.rows('.selected').deselect()
                ScheduleTable.rows($(this)).select();
            }
            UserScheduleSelection(ScheduleTable.rows({ selected: true }).data()[0].sch_id);

        });

    }

    if (ScheduleGroupTable == null && CurrentView == 'Group') {
        ScheduleGroupTable = $('#ScheduleGroupTable').DataTable(
            {
                ajax: "",
                autoWidth: false,
                columns: [{ data: "schGroup_id" }, { data: "schGroup_name" }, { data: "sch_name" }
                ],
                columnDefs: [
                    {
                        "targets": [0],
                        "visible": false,
                        "searchable": false
                    },
                    { "width": "60%", "targets": 1 },
                    { "width": "40%", "targets": 2 },
                ],
                //"scrollY": $('#schedulegroupformdiv').height() - 200,
                //"scrollCollapse": true,
                filter: true,
                info: false,
                rowId: 'schGroup_id',
                ordering: true,
                "paging": true,
                "order": [],
                createdRow: function (row, data, index) {
                    if (data.length != 0) {
                        jQuery(row).attr('data-id', data.schGroup_id).attr('data-index', index);
                        jQuery(row).addClass("handcursor");
                    }
                },
                language: { "url": resources.Datatable_Lang },
                pagingType: "simple_numbers",
                "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'
            });
        $('#ScheduleGroupTable tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                ScheduleGroupTable.rows('.selected').deselect()
                ScheduleGroupTable.rows($(this)).select();
            }
            else {
                ScheduleGroupTable.rows('.selected').deselect()
                ScheduleGroupTable.rows($(this)).select();

            }
            UserScheduleGroupSelection(ScheduleGroupTable.rows({ selected: true }).data()[0].schGroup_id);

        });
    }


}
function ShowScheduleForms(id) {
    var formid = "";
    switch (id) {
        case "linkshifttab":
            formid = 'shiftformdiv';
            CurrentView = 'Shift';
            break;
        case "linkscheduletab":
            formid = 'scheduleformdiv';
            CurrentView = 'Schedule';
            break;
        case "linkschgrouptab":
            formid = 'schedulegroupformdiv';
            CurrentView = 'Group';
            break;
        default:
            formid = 'shiftformdiv';
            CurrentView = 'Shift';
    }

    $('.schedulforms').removeClass('hide');
    $('.schedulforms').addClass('hide');
    $("#" + formid).removeClass('hide')




}
function SetActionButtons(flag) {
    $("#bt_AddSechedule").prop('disabled', flag);
    $("#bt_EditSechedule").prop('disabled', flag);
    $("#bt_DeleteSechedule").prop('disabled', flag);
}
function ClearAllScheduleForms() {

    ClearScheduleGroupForm();
    ClearScheduleForm();
    ClearShiftForm();
    SetActionButtons(false);
}
function SetScheduleFormForEdit() {

    if (CurrentView == "Shift") {
        if (!HasPermission(2, "sch-editshift")) {
            ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
            return;
        }
        if (CurrentID == 0) {
            ShowAlert(resources.YouMustSelectShiftToContinue, resources.SchduleMsgTitle, "danger");
            return;
        }
        FillShiftsInformation();
        $("#Shiftfieldset").prop('disabled', false);
        $("#txt_ShiftName_edit").focus();
    }
    if (CurrentView == "Schedule") {
        if (!HasPermission(2, "sch-edit")) {
            ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
            return;
        }
        if (CurrentID == 0) {
            ShowAlert(resources.YouMustSelectScheduleToContinueMsg, resources.SchduleMsgTitle, "danger");
            return;
        }
        FillScheduleInformation();
        $("#Schfieldset").prop('disabled', false);
        $("#txt_ScheduleName_edit").focus();
    }
    if (CurrentView == "Group") {
        if (!HasPermission(2, "sch-editschGroup")) {
            ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
            return;
        }
        if (CurrentID == 0) {
            ShowAlert(resources.YouMustSelectScheduleGroupToContinueMsg, resources.SchduleMsgTitle, "danger");
            return;
        }
        FillScheduleGroupInformation();
        $("#SchGroupfieldset").prop('disabled', false);
        $("#txt_GroupName_edit").focus();
    }
    SetActionButtons(true);
    action = "Update";
}
function SetScheduleFormForAdd() {
    if (CurrentView == "Shift") {
        if (!HasPermission(2, "sch-addshift")) {
            ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
            return;
        }
        ClearShiftForm();
        $("#Shiftfieldset").prop('disabled', false);
        $("#txt_ShiftName_edit").focus();
        SetActionButtons(true);
        action = "Add";
    }
    if (CurrentView == "Schedule") {
        if (!HasPermission(2, "sch-add")) {
            ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
            return;
        }
        ClearScheduleForm();
        $("#Schfieldset").prop('disabled', false);
        $("#txt_ScheduleName_edit").focus();
        SetActionButtons(true);
        action = "Add";
    }
    if (CurrentView == "Group") {
        if (!HasPermission(2, "sch-addschGroup")) {
            ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
            return;
        }
        ClearScheduleGroupForm();
        $("#SchGroupfieldset").prop('disabled', false);
        $("#txt_GroupName_edit").focus();
        SetActionButtons(true);
        action = "Add";
    }
}
function SaveScheduleChange() {
    if (CurrentView == "Shift") {
        if (CurrentID == 0 && action != "Add") {
            ShowAlert(resources.YouMustSelectShiftToContinue, resources.SchduleMsgTitle, "danger");
            return;
        }
        SaveShiftInformation();
    }
    if (CurrentView == "Schedule") {
        if (CurrentID == 0 && action != "Add") {
            ShowAlert(resources.YouMustSelectScheduleToContinueMsg, resources.SchduleMsgTitle, "danger");
            return;
        }
        SaveScheduleInformation();
    }
    if (CurrentView == "Group") {
        if (CurrentID == 0 && action != "Add") {
            ShowAlert(resources.YouMustSelectScheduleGroupToContinueMsg, resources.SchduleMsgTitle, "danger");
            return;
        }
        SaveScheduleGroupInformation();
    }
}
function DeleteSchedule() {
    if (CurrentView == "Shift") {
        if (!HasPermission(2, "sch-deleteshift")) {
            ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
            return;
        }
        if (CurrentID == 0) {
            ShowAlert(resources.YouMustSelectShiftToContinue, resources.SchduleMsgTitle, "danger");
            return;
        }
        DeleteShiftInformation();
    }
    if (CurrentView == "Schedule") {
        if (!HasPermission(2, "sch-delete")) {
            ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
            return;
        }
        if (CurrentID == 0) {
            ShowAlert(resources.YouMustSelectScheduleToContinueMsg, resources.SchduleMsgTitle, "danger");
            return;
        }
        DeleteScheduleIformation();
    }
    if (CurrentView == "Group") {
        if (!HasPermission(2, "sch-deleteschGroup")) {
            ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
            return;
        }
        if (CurrentID == 0) {
            ShowAlert(resources.YouMustSelectScheduleGroupToContinueMsg, resources.SchduleMsgTitle, "danger");
            return;
        }
        DeleteScheduleGroupIformation();
    }
}
function MoveSchedule() {
    if (!HasPermission(2, "sch-move")) {
        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
}

//For Shifts
function InitializeShiftTimes() {
    $('#shiftfromtime').timepicker({
        'timeFormat': 'H:i', 'step': 10,
    }).bind('timeFormatError timeRangeError', function () {
        $('#shiftfromtime').val('');
        $('#shiftfromtime').focus();
    });
    $('#shifttotime').timepicker({ 'timeFormat': 'H:i', 'step': 10 }).bind('timeFormatError timeRangeError', function () {
        $('#shifttotime').val('');
        $('#shifttotime').focus();
    });
    $('#shiftfromtimeFH').timepicker({ 'timeFormat': 'H:i', 'step': 10 }).bind('timeFormatError timeRangeError', function () {
        $('#shiftfromtimeFH').val('');
        $('#shiftfromtimeFH').focus();
    });
    $('#shifttotimeFH').timepicker({ 'timeFormat': 'H:i', 'step': 10 }).bind('timeFormatError timeRangeError', function () {
        $('#shifttotimeFH').val('');
        $('#shifttotimeFH').focus();
    });

    $("#AllowMinIN").spinner({
        max: 59,
        min: 0
    }).on('input', function () {
        if ($(this).data('onInputPrevented')) return;
        var val = this.value,
            $this = $(this),
            max = $this.spinner('option', 'max'),
            min = $this.spinner('option', 'min');
        // We want only number, no alpha. 
        // We set it to previous default value.         
        if (!val.match(/^[+-]?[\d]{0,}$/)) val = $(this).data('defaultValue');
        this.value = val > max ? max : val < min ? min : val;
    }).on('keydown', function (e) {
        // we set default value for spinner.
        if (!$(this).data('defaultValue')) $(this).data('defaultValue', this.value);
        // To handle backspace
        $(this).data('onInputPrevented', e.which === 8 ? true : false);
    });
    $("#AllowMinOut").spinner({
        max: 59,
        min: 0
    }).on('input', function () {
        if ($(this).data('onInputPrevented')) return;
        var val = this.value,
            $this = $(this),
            max = $this.spinner('option', 'max'),
            min = $this.spinner('option', 'min');
        // We want only number, no alpha. 
        // We set it to previous default value.         
        if (!val.match(/^[+-]?[\d]{0,}$/)) val = $(this).data('defaultValue');
        this.value = val > max ? max : val < min ? min : val;
    }).on('keydown', function (e) {
        // we set default value for spinner.
        if (!$(this).data('defaultValue')) $(this).data('defaultValue', this.value);
        // To handle backspace
        $(this).data('onInputPrevented', e.which === 8 ? true : false);
    });
}
function UserShiftSelection(id) {
    //console.log(ShiftTable.row('.selected').data().shift_id);
    if (id == CurrentID)
        return;
    ClearShiftForm();
    CurrentID = id;
    FillShiftsInformation();

}
function ClearShiftForm() {
    $("#Shiftfieldset").prop('disabled', true);
    $('#Chk_FlexibleHour').prop('checked', false).change();
    $('#Chk_TwoShifts').prop('checked', false).change();
    $('#Chk_NightShift').prop('checked', false).change();
    $('#Chk_OpenHours').prop('checked', false).change();
    $('#Chk_AutoTrans').prop('checked', false).change();
    $('form#ShiftForm')[0].reset();
    $("#ShiftForm").find("input[data-id]").attr('data-id', 0);
    setTimeout(function () {
        $("form#ShiftForm").validator("destroy");
        $("#list-unstyled").remove();
        $("form#ShiftForm").find('.has-error').removeClass("has-error");
        $("form#ShiftForm").find('.has-success').removeClass("has-success");
        $("form#ShiftForm").find('.glyphicon-remove').not($('.add-on').find("span:first")).removeClass("glyphicon-remove");
        $("form#ShiftForm").find('.glyphicon-ok').not($('.add-on').find("span:first")).removeClass("glyphicon-ok");

        $('#ShiftForm').validator({
            custom: {
                required: function ($el) { return !!$.trim($el.val()) }
            },
            errors: {
                required: 'Please fill out this field.'
            }
        });
    }, 100);
    action = "view";
    SetActionButtons(false);
}
function FillShiftsInformation() {
    if (CurrentID == 0)
        return;
    var apiurl = prefixApiURL + "/Schedules/Shifts/GetByID/" + CurrentID;
    var data = null;
    $.ajax
        ({
            type: "GET",
            url: apiurl,
            dataType: 'json',
            cache: false,
            //beforeSend: setHeader,
            data: data
        }).done(function (data) {
            if (data.Status != "1") {
                ShowAlert(resources.LoadShiftsDataErrorMsg + data.Msg, resources.SchduleMsgTitle, "danger");
            }
            else {
                debugger
                $("#txt_ShiftName_edit").val(data.Result.shift_name);
                $('#shiftfromtime').timepicker('setTime', data.Result.shift_fin);
                $('#shifttotime').timepicker('setTime', data.Result.shift_fout);

                $('#Chk_FlexibleHour').prop('checked', data.Result.IsFH);
                if (data.Result.IsFH)
                    $('#Chk_FlexibleHour').change();
                $('#Chk_TwoShifts').prop('checked', data.Result.shift_twoshifts && IsAllowTwoShifts);
                if (data.Result.shift_twoshifts && IsAllowTwoShifts)
                    $('#Chk_TwoShifts').change();
                $('#Chk_NightShift').prop('checked', data.Result.shift_isnight).change();
                $('#Chk_AutoTrans').prop('checked', data.Result.auto_trans).change();
                $('#Chk_OpenHours').prop('checked', data.Result.IsOpenHours).change();
                $("#AllowMinIN").spinner("value", data.Result.shift_allow)
                $("#AllowMinOut").spinner("value", data.Result.shift_allow_out)
                if (data.Result.IsFH) {
                    $('#shiftfromtimeFH').timepicker('setTime', data.Result.shift_FH_from == null ? "00:00" : data.Result.shift_FH_from);
                    $('#shifttotimeFH').timepicker('setTime', data.Result.shift_FH_to == null ? "00:00" : data.Result.shift_FH_to);
                } else if (data.Result.shift_twoshifts && IsAllowTwoShifts) {
                    $('#shiftfromtimeFH').timepicker('setTime', data.Result.shift_sin == '--:--' ? "" : data.Result.shift_sin);
                    $('#shifttotimeFH').timepicker('setTime', data.Result.shift_sout == '--:--' ? "" : data.Result.shift_sout);
                }


            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert(resources.LoadShiftsDataErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.SchduleMsgTitle, "danger");
        }).always(function () {
        });
}
function DeleteShiftInformation() {

    action = "Delete";
    $.confirm({
        title: resources.DeleteShiftTitle,
        content: resources.DeleteShiftConfirmationMsg.format($("#txt_ShiftName_edit").val()),
        confirmButton: resources.btDelete,
        cancelButton: resources.btCancel,
        confirmButtonClass: 'btn-danger',
        autoClose: 'cancel|15000',
        icon: 'fa fa-warning',
        animation: 'scalex',
        confirm: function () {
            var apiurl = prefixApiURL + "Schedules/Shifts/Delete/" + CurrentID;
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
                        ShowAlert(data.Msg, resources.DeleteShiftTitle, "danger");
                    }
                    else {
                        ShiftTable.row().deleteRow(data.Result.shift_id);
                        CurrentID = 0;
                        ClearShiftForm();
                        ShowAlert(data.Msg, resources.DeleteShiftTitle, "success");
                    }
                }).fail(function (jqxhr, settings, exception) {
                    ShowAlert(resources.DeleteShiftErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.DeleteShiftTitle, "danger");
                }).always(function () {
                });
        }
    });
}
function SaveShiftInformation() {
    if (!form_validate("ShiftForm")) {
        return;
    }
    var apiurl = prefixApiURL + "Schedules/Shifts/" + action;
    var shift_sin = '--:--';
    var shift_sout = '--:--';
    var IsFH = false;
    var IsTwoShifts = false;

    if ($("#Chk_TwoShifts").prop("checked")) {
        IsFH = false;
        IsTwoShifts = true;
        shift_sin = $('#shiftfromtimeFH').val() == "" ? "--:--" : $('#shiftfromtimeFH').val();
        shift_sout = $('#shifttotimeFH').val() == "" ? "--:--" : $('#shifttotimeFH').val();
    } else if ($("#Chk_FlexibleHour").prop("checked")) {
        IsFH = true;
        IsTwoShifts = false;
    }
    var formdata = {
        "shift_id": action == "Add" ? 0 : CurrentID,
        "shift_name": $("#txt_ShiftName_edit").val(),
        "shift_fin": $('#shiftfromtime').val(),
        "shift_fout": $('#shifttotime').val(),
        "shift_sin": shift_sin,
        "shift_sout": shift_sout,
        "shift_off": $('#shiftfromtime').val() == "00:00" && $('#shifttotime').val() == "00:00",
        "shift_allow": $("#AllowMinIN").spinner("value"),
        "shift_deleted": false,
        "shift_withbreak": false,
        "shift_fbreak": null,
        "shift_tbreak": null,
        "shift_withOverTime": false,
        "shift_fOverTime": null,
        "shift_tOverTime": null,
        "shift_OverTimeMinutes": null,
        "shift_twoshifts": IsTwoShifts,
        "shift_isnight": $("#Chk_NightShift").prop("checked"),
        "shift_allow_out": $("#AllowMinOut").spinner("value"),
        "shift_FH_from": IsFH ? $('#shiftfromtimeFH').val() == "" ? "00:00" : $('#shiftfromtimeFH').val() : '00:00',
        "shift_FH_to": IsFH ? $('#shifttotimeFH').val() == "" ? "00:00" : $('#shifttotimeFH').val() : '00:00',
        "IsFH": IsFH,
        "IsOpenHours": $("#Chk_OpenHours").prop("checked"),
        "auto_trans": $("#Chk_AutoTrans").prop("checked")
    }
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
                ShowAlert(data.Msg, resources.SchduleMsgTitle, "danger");
            }
            else {
                if (action == "Add") {
                    ShiftTable.row().addRow(data.Result, true);
                }
                else if (action == "Update") {
                    ShiftTable.row().updateRow(data.Result.shift_id, data.Result, true);
                }
                ClearShiftForm();
                CurrentID = data.Result.shift_id;
                FillShiftsInformation();
                ShowAlert(data.Msg, resources.SchduleMsgTitle, "success");
            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert(action == "Add" ? resources.AddShiftErrorMsg + GetErrorFromString(jqxhr.responseText).Msg : resources.SaveShiftErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.SchduleMsgTitle, "danger");
        }).always(function () {
        });

}

//For Schedule
function ClearScheduleForm() {
    $('form#SchForm')[0].reset();
    $("#SchForm").find("input[data-id]").attr('data-id', 0);
    $("#Schfieldset").prop('disabled', true);
    setTimeout(function () {
        $("form#SchForm").validator("destroy");
        $("#list-unstyled").remove();
        $("form#SchForm").find('.has-error').removeClass("has-error");
        $("form#SchForm").find('.has-success').removeClass("has-success");
        $("form#SchForm").find('.glyphicon-remove').not($('.add-on').find("span:first")).removeClass("glyphicon-remove");
        $("form#SchForm").find('.glyphicon-ok').not($('.add-on').find("span:first")).removeClass("glyphicon-ok");
        $('#SchForm').validator({
            custom: {
                required: function ($el) { return !!$.trim($el.val()) }
            },
            errors: {
                required: 'Please fill out this field.'
            }
        });
    }, 100);
    action = "view";
    SetActionButtons(false);
}
function UserScheduleSelection(id) {
    if (id == CurrentID)
        return;
    ClearScheduleForm();
    CurrentID = id;
    FillScheduleInformation();
}
function GetShiftNameByID(ShiftID) {
    if (ShiftsData != null && ShiftsData.length > 0) {
        var shiftInfo = $.grep(ShiftsData, function (e) {
            return (ShiftID == e.shift_id);
        });
        if (shiftInfo != null && shiftInfo.length > 0)
            return shiftInfo[0].shift_name;
    }
    return '';
}
function FillScheduleInformation() {
    if (CurrentID == 0)
        return;
    var apiurl = prefixApiURL + "/Schedules/GetByID/" + CurrentID;
    var data = null;
    $.ajax
        ({
            type: "GET",
            url: apiurl,
            dataType: 'json',
            cache: false,
            // beforeSend: setHeader,
            data: data
        }).done(function (data) {
            if (data.Status != "1") {
                ShowAlert(resources.LoadScheduleDataErrorMsg + data.Msg, resources.SchduleMsgTitle, "danger");
            }
            else {
                $("#txt_ScheduleName_edit").val(data.Result.sch_name);
                $('#txt_SchDesc_edit').val(data.Result.sch_desc);
                $("#txt_shiftForSat").val(GetShiftNameByID(data.Result.sch_1));
                $("#txt_shiftForSat").attr("data-id", data.Result.sch_1);

                $("#txt_shiftForSun").val(GetShiftNameByID(data.Result.sch_2));
                $("#txt_shiftForSun").attr("data-id", data.Result.sch_2);

                $("#txt_shiftForMon").val(GetShiftNameByID(data.Result.sch_3));
                $("#txt_shiftForMon").attr("data-id", data.Result.sch_3);

                $("#txt_shiftForTue").val(GetShiftNameByID(data.Result.sch_4));
                $("#txt_shiftForTue").attr("data-id", data.Result.sch_4);

                $("#txt_shiftForWed").val(GetShiftNameByID(data.Result.sch_5));
                $("#txt_shiftForWed").attr("data-id", data.Result.sch_5);

                $("#txt_shiftForThu").val(GetShiftNameByID(data.Result.sch_6));
                $("#txt_shiftForThu").attr("data-id", data.Result.sch_6);

                $("#txt_shiftForFri").val(GetShiftNameByID(data.Result.sch_7));
                $("#txt_shiftForFri").attr("data-id", data.Result.sch_7);

            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert(resources.LoadScheduleDataErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.SchduleMsgTitle, "danger");
        }).always(function () {
        });
}
function DeleteScheduleIformation() {

    action = "Delete";
    $.confirm({
        title: resources.DeleteScheduleTitle,
        content: resources.DeleteScheduleConfirmationMsg.format($("#txt_ScheduleName_edit").val()),
        confirmButton: resources.btDelete,
        cancelButton: resources.btCancel,
        confirmButtonClass: 'btn-danger',
        autoClose: 'cancel|15000',
        icon: 'fa fa-warning',
        animation: 'scalex',
        confirm: function () {
            var apiurl = prefixApiURL + "Schedules/Delete/" + CurrentID;
            $.ajax
                ({
                    type: "POST",
                    url: apiurl,
                    dataType: 'json',
                    //async: false,
                    cache: false,
                    //  beforeSend: setHeader,
                    data: [] //formdata
                }).done(function (data) {
                    if (data.Status != "1") {
                        ShowAlert(data.Msg, resources.DeleteScheduleTitle, "danger");
                    }
                    else {
                        ScheduleTable.row().deleteRow(data.Result.sch_id);
                        CurrentID = 0;
                        ClearScheduleForm();
                        ShowAlert(data.Msg, resources.DeleteScheduleTitle, "success");
                    }
                }).fail(function (jqxhr, settings, exception) {
                    ShowAlert(resources.DeleteScheduleErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.DeleteScheduleTitle, "danger");
                }).always(function () {
                });
        }
    });
}
function SaveScheduleInformation() {
    if (!form_validate("SchForm")) {
        return;
    }
    var apiurl = prefixApiURL + "Schedules/" + action;
    var formdata = {
        "sch_id": action == "Add" ? 0 : CurrentID,
        "sch_name": $("#txt_ScheduleName_edit").val(),
        "sch_oneshift": true,
        "sch_desc": $("#txt_SchDesc_edit").val(),
        "sch_1": $("#txt_shiftForSat").attr("data-id"),
        "sch_2": $("#txt_shiftForSun").attr("data-id"),
        "sch_3": $("#txt_shiftForMon").attr("data-id"),
        "sch_4": $("#txt_shiftForTue").attr("data-id"),
        "sch_5": $("#txt_shiftForWed").attr("data-id"),
        "sch_6": $("#txt_shiftForThu").attr("data-id"),
        "sch_7": $("#txt_shiftForFri").attr("data-id"),
        "sch_delete": false,
        "sch_isnight": false
    }
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
                ShowAlert(data.Msg, resources.SchduleMsgTitle, "danger");
            }
            else {
                if (action == "Add") {
                    ScheduleTable.row().addRow(data.Result, true);
                }
                else if (action == "Update") {
                    ScheduleTable.row().updateRow(data.Result.sch_id, data.Result, true);
                }
                ClearScheduleForm();
                CurrentID = data.Result.sch_id;
                FillScheduleInformation();
                ShowAlert(data.Msg, resources.SchduleMsgTitle, "success");
            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert(action == "Add" ? resources.AddScheduleErrorMsg + GetErrorFromString(jqxhr.responseText).Msg : resources.SaveScheduleErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.SchduleMsgTitle, "danger");
        }).always(function () {
        });

}

//For Schedule Group
function DeleteEmpGroupRow(obj) {
    ScheduleGroupsEmployeeData.row(obj.parents("tr")).remove().draw();
}
function InitializeScheGroup() {
    $('#schGroup_FromDate').datepicker();
    $('#schGroup_ToDate').datepicker();
    ScheduleGroupsEmployeeData = $('#EmployeeScheGroupTable').DataTable({
        ajax: "",
        autoWidth: false,
        columns: [{ data: "emp_id" }, { data: "emp_no" }, { data: "emp_name" }],
        columnDefs: [
            {
                "targets": [0],
                "visible": false,
                "searchable": false
            },
            { "width": "25%", "targets": 1 },
            { "width": "65%", "targets": 2 },
            {
                className: "col-centered", "width": "10%", "targets": 3,
                "render": function (data, type, row) {
                    return '<span class="glyphicon glyphicon-remove-circle col-delete" data-id=' + row.emp_id + ' onclick="if(IsDisabled(this)) { return };DeleteEmpGroupRow($(this))"></span>';
                }
            }],
        filter: false,
        rowId: 'emp_id',
        info: false,
        ordering: false,
        language: { "url": resources.Datatable_Lang },
        paging: false
    });

}
function UserScheduleGroupSelection(id) {
    if (id == CurrentID)
        return;
    CurrentID = id
    ClearScheduleGroupForm();
    FillScheduleGroupInformation();
}
function ClearScheduleGroupForm() {


    $('form#SchGroupForm')[0].reset();
    $("#SchGroupForm").find("input[data-id]").attr('data-id', 0)
    $('#schGroup_FromDate').datepicker('update', '');
    $('#schGroup_ToDate').datepicker('update', '');
    $('#Chk_SelectDateLable').prop('checked', false).change();
    $("#SchGroupfieldset").prop('disabled', true);
    ScheduleGroupsEmployeeData.clear().draw();
    setTimeout(function () {
        $("form#SchGroupForm").validator("destroy");
        $("#list-unstyled").remove();
        $("form#SchGroupForm").find('.has-error').removeClass("has-error");
        $("form#SchGroupForm").find('.has-success').removeClass("has-success");
        $("form#SchGroupForm").find('.glyphicon-remove').not($('.add-on').find("span:first")).removeClass("glyphicon-remove");
        $("form#SchGroupForm").find('.glyphicon-ok').not($('.add-on').find("span:first")).removeClass("glyphicon-ok");
        $('#SchGroupForm').validator({
            custom: {
                required: function ($el) { return !!$.trim($el.val()) }
            },
            errors: {
                required: 'Please fill out this field.'
            }
        });
    }, 100);
    action = "view";
    SetActionButtons(false);
}
function FillScheduleGroupInformation() {
    if (CurrentID == 0)
        return;
    var apiurl = prefixApiURL + "Schedules/Groups/GetByID/" + CurrentID;
    var data = null;
    $.ajax
        ({
            type: "GET",
            url: apiurl,
            dataType: 'json',
            cache: false,
            // beforeSend: setHeader,
            data: data
        }).done(function (data) {
            if (data.Status != "1") {
                ShowAlert(resources.LoadScheduleGroupDataErrorMsg + data.Msg, resources.SchduleMsgTitle, "danger");
            }
            else {
                $("#txt_GroupName_edit").val(data.Result.schGroup_name);
                $("#txt_Select_Schedule").val(data.Result.sch_name);
                $("#txt_Select_Schedule").attr("data-id", data.Result.sch_id);
                $('#Chk_SelectDateLable').prop('checked', data.Result.IsApply).change()
                $('#schGroup_FromDate').datepicker('update', data.Result.StartDate);
                $('#schGroup_ToDate').datepicker('update', data.Result.EndDate);
                ScheduleGroupsEmployeeData.clear().draw();
                if (data.Result.scheduleGroupEmployees != null && data.Result.scheduleGroupEmployees.length > 0) {
                    var empdata = [];
                    $.each(data.Result.scheduleGroupEmployees, function (i) {
                        empdata.push({ "emp_id": data.Result.scheduleGroupEmployees[i].emp_id, "emp_no": data.Result.scheduleGroupEmployees[i].emp_no, "emp_name": data.Result.scheduleGroupEmployees[i].emp_name });
                    });

                    ScheduleGroupsEmployeeData.rows.add(empdata).draw();
                }
            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert(resources.LoadScheduleGroupDataErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.SchduleMsgTitle, "danger");
        }).always(function () {
        });
}
function FillScheduleGroupsInformationByEmployee(EmpID) {

    ClearScheduleGroupForm();
    CurrentID = 0;
    if (EmpID == 0) {
        var apiurl = prefixApiURL + "Schedules/Groups/GetAll";
        var data = null;
        $.ajax
            ({
                type: "GET",
                url: apiurl,
                dataType: 'json',
                //async: false,
                cache: false,
                //beforeSend: setHeader,
                data: data
            }).done(function (data) {
                if (data.Status != "1") {
                    ShowAlert(resources.LoadScheduleGroupListErrorMsg + " " + data.Msg, resources.SchduleMsgTitle, "danger");
                }
                else {
                    ScheduleGroupsData = data.Result;
                    ScheduleGroupTable.clear().draw();
                    if (ScheduleGroupsData != null && ScheduleGroupsData.length > 0)
                        ScheduleGroupTable.rows.add(ScheduleGroupsData).draw();
                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.LoadScheduleGroupListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.SchduleMsgTitle, "danger");

            }).always(function () {
            });
        return;
    }
    var apiurl = prefixApiURL + "Schedules/Groups/GetAll/" + EmpID;
    var data = null;
    $.ajax
        ({
            type: "GET",
            url: apiurl,
            dataType: 'json',
            //async: false,
            cache: false,
            // beforeSend: setHeader,
            data: data
        }).done(function (data) {
            if (data.Status != "1") {
                ShowAlert(resources.LoadScheduleGroupListErrorMsg + " " + data.Msg, resources.SchduleMsgTitle, "danger");
            }
            else {
                ScheduleGroupsData = data.Result;
                ScheduleGroupTable.clear().draw();
                if (ScheduleGroupsData != null && ScheduleGroupsData.length > 0)
                    ScheduleGroupTable.rows.add(ScheduleGroupsData).draw();
            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert(resources.LoadScheduleGroupListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.SchduleMsgTitle, "danger");

        }).always(function () {
        });
}
function DeleteScheduleGroupIformation() {
    action = "Delete";
    $.confirm({
        title: resources.DeleteScheduleGroupTitle,
        content: resources.DeleteScheduleGroupConfirmationMsg.format($("#txt_GroupName_edit").val()),
        confirmButton: resources.btDelete,
        cancelButton: resources.btCancel,
        confirmButtonClass: 'btn-danger',
        autoClose: 'cancel|15000',
        icon: 'fa fa-warning',
        animation: 'scalex',
        confirm: function () {
            var apiurl = prefixApiURL + "Schedules/Groups/Delete/" + CurrentID;
            $.ajax
                ({
                    type: "POST",
                    url: apiurl,
                    dataType: 'json',
                    //async: false,
                    cache: false,
                    //  beforeSend: setHeader,
                    data: [] //formdata
                }).done(function (data) {
                    if (data.Status != "1") {
                        ShowAlert(data.Msg, resources.DeleteScheduleGroupTitle, "danger");
                    }
                    else {
                        ScheduleGroupTable.row().deleteRow(data.Result.schGroup_id);
                        CurrentID = 0;
                        ClearScheduleGroupForm();
                        ShowAlert(data.Msg, resources.DeleteScheduleGroupTitle, "success");
                    }
                }).fail(function (jqxhr, settings, exception) {
                    ShowAlert(resources.DeleteScheduleGroupErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.DeleteScheduleGroupTitle, "danger");
                }).always(function () {
                });
        }
    });
}
function SaveScheduleGroupInformation() {
    if (!form_validate("SchGroupForm")) {
        return;
    }
    var apiurl = prefixApiURL + "Schedules/Groups/" + action;
    var employeedate = ScheduleGroupsEmployeeData.data()
    var empdata = [];
    $.each(employeedate, function (i) {
        empdata.push({ "emp_id": employeedate[i].emp_id, "emp_no": employeedate[i].emp_no, "emp_name": employeedate[i].emp_name });
    })
    var formdata = {
        "schGroup_id": action == "Add" ? 0 : CurrentID,
        "schGroup_name": $("#txt_GroupName_edit").val(),
        "sch_id": $("#txt_Select_Schedule").attr("data-id"),
        "schGroup_deleted": false,
        "sch_startdate": $("#Chk_SelectDateLable").prop("checked") ? $("#schGroup_FromDate").datepicker("getDate").ToOADate() : null,
        "sch_enddate": $("#Chk_SelectDateLable").prop("checked") ? $("#schGroup_ToDate").datepicker("getDate").ToOADate() : null,
        "StartDate": $("#schGroup_FromDate").val(),
        "EndDate": $("#schGroup_ToDate").val(),
        "IsApply": $("#Chk_SelectDateLable").prop("checked"),
        "sch_name": $("#txt_Select_Schedule").val(),
        "scheduleGroupEmployees": empdata
    }
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
                ShowAlert(data.Msg, resources.SchduleMsgTitle, "danger");
            }
            else {
                if (action == "Add") {
                    ScheduleGroupTable.row().addRow(data.Result, true);
                }
                else if (action == "Update") {
                    ScheduleGroupTable.row().updateRow(data.Result.schGroup_id, data.Result, true);
                }
                ClearScheduleGroupForm();
                CurrentID = data.Result.schGroup_id;
                FillScheduleGroupInformation();
                ShowAlert(data.Msg, resources.SchduleMsgTitle, "success");
            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert(action == "Add" ? resources.AddScheduleGroupErrorMsg + GetErrorFromString(jqxhr.responseText).Msg : resources.SaveScheduleGroupErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.SchduleMsgTitle, "danger");
        }).always(function () {
        });

}

//For Change Schedule
function ChangeScheduleRadioChanged(obj) {
    $(".fixed-panel-60").show();
    var thediv = $(obj).val();
    $(".ChangeScheduleRadiosdiv").hide();
    if ($(obj).prop("checked"))
        $("#" + thediv).slideDown("fast");
}
function ClearChangeScheduleForm() {
    $('.ChangeScheduleRadios').closest('.ChangeScheduleRadios').find('.radio-inline, .radio').removeClass('checked');
    $("input[name$='ChangeSchedule']").prop("checked", false);
    $("#txt_Select_ChangeSchedule").val("").attr("data-id", 0);
    $("#txt_Select_ByBranch").val("").attr("data-id", 0);
    $("#txt_Select_BySchedule").val("").attr("data-id", 0);
    $(".fixed-panel-60").hide();
    setTimeout(function () {
        $("form#ChangeScheduleForm").validator("destroy");
        $("#list-unstyled").remove();
        $("form#ChangeScheduleForm").find('.has-error').removeClass("has-error");
        $("form#ChangeScheduleForm").find('.has-success').removeClass("has-success");
        $("form#ChangeScheduleForm").find('.glyphicon-remove').not($('.add-on').find("span:first")).removeClass("glyphicon-remove");
        $("form#ChangeScheduleForm").find('.glyphicon-ok').not($('.add-on').find("span:first")).removeClass("glyphicon-ok");
        $('#ChangeScheduleForm').validator({
            custom: {
                required: function ($el) { return !!$.trim($el.val()) }
            },
            errors: {
                required: 'Please fill out this field.'
            }
        });
    }, 100);

}
function ShowChangeScheduleDialog() {
    if (!HasPermission(2, "sch-move")) {

        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    ClearChangeScheduleForm();
    $('#ChangeScheduleDialog').modal('show');
}
function SaveScheduleChangeBy() {

    if (!form_validate("ChangeScheduleForm"))
        return;
    if (!($("#RB_ByAllEmployees").prop("checked") || $("#RB_BySection").prop("checked") || $("#RB_ByBranch").prop("checked"))) {
        ShowMessage(resources.YouMustSelectTypeOfScheduleChangeMsg, resources.ChangeScheduleTitle);
        return;
    }
    var Sch_ID = $("#txt_Select_ChangeSchedule").attr("data-id");
    var ByEmployee = $("#RB_ByAllEmployees").prop("checked");
    var BySection = $("#RB_BySection").prop("checked") ? $("#txt_Select_BySchedule").attr("data-id") : 0;
    var ByRegion = $("#RB_ByBranch").prop("checked") ? $("#txt_Select_ByBranch").attr("data-id") : 0;
    $.confirm({
        title: resources.ChangeScheduleTitle,
        content: resources.ChangeScheduleConfirmationMsg.format($("#txt_Select_ChangeSchedule").val()),
        confirmButton: resources.ChangeScheduleTitle,
        cancelButton: resources.btCancel,
        confirmButtonClass: 'btn-primary',
        autoClose: 'cancel|15000',
        icon: 'fa fa-warning',
        animation: 'scalex',
        confirm: function () {
            var apiurl = prefixApiURL + "Schedules/ChangeSchedule/" + Sch_ID + "/" + ByEmployee + "/" + BySection + "/" + ByRegion;
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
                        $('#ChangeScheduleDialog').modal('hide');
                        ShowAlert(data.Msg, resources.ChangeScheduleTitle, "danger");
                    }
                    else {
                        $('#ChangeScheduleDialog').modal('hide');
                        ShowAlert(data.Msg, resources.ChangeScheduleTitle, "success");
                    }
                }).fail(function (jqxhr, settings, exception) {
                    ShowAlert(resources.ChangeScheduleErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.ChangeScheduleTitle, "danger");
                }).always(function () {
                });
        }
    });
}


