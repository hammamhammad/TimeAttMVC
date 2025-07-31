//Public Varible
/////////////////////////////////////////////////////
var resources = null; // Global variable.
var dataTableLanguage = null;
var spinnerVisible = false;
var CurrentID = 0;
var Select_Employee_Control = null;
var Select_Schedule_Control = null;
var Select_Section_Control = null;
var Select_Branch_Control = null;
var Select_Location_Control = null;
var Select_Shift_Control = null;
var SectionTree = null;
var SectionTable = null;
var EmployeeListTable = null;
var EmployeeListData = null;
var ScheduleListTable = null;
var ShiftListTable = null;
var BranchListTable = null;
var LocationListTable = null;
var SectionListTable = null;
var SectionData = null;
var SectionTreeData = null;
var currentNode = null;
var action = "View";
var messages = null;
var notes = null;
var ReportUrlAction = "";
var ReportPara = null;
var CachedEmployees = null;
var prefixApiURL = "/TimeAttWebAPI/";
var IsAllowTwoShifts = false;
var MonthListTable = null;
var YearListTable = null;
var Select_Year_Control = null;
var Select_Month_Control = null;
/////////////////////////////////////////////////////

//public Functions

/////Common Functions
function loadResource() {

    $.ajax({
        url: $("#ResourceUrlHF").val(),
        dataType: 'json',
        async: false,
        data: [],
        cache: true,
        success: function (data) {
            resources = data;

        },
        error: function () {

        }

    });
    // $.ajax({
    //     url: "Resource/GetDataTableLanguage",
    //    dataType: 'json',
    //    async: false,
    //    data: [],
    //    success: function (data) {
    //        dataTableLanguage = data;

    //    },
    //    error: function () {

    //    }

    //});
}
function setAllowTwoShifts() {
    var apiurl = prefixApiURL + 'Company/Settings/Get/6';
    $.getJSON(apiurl, function (data) {
        if (data.Status == "1" && data.Result != null) {
            IsAllowTwoShifts = data.Result == "1";
        } else {
            IsAllowTwoShifts = false;
        }

        if (IsAllowTwoShifts)
            $('#allowtwoshifts').css('visibility', 'visible');
    });
}
function IsDisabled(obj) {
    if ($(obj).prop('disabled'))
        return true;
    if ($(obj).parent().prop('disabled'))
        return true;
    if ($(obj).parents('fieldset').prop('disabled'))
        return true;
    if ($(obj).parent().find('input').prop('disabled'))
        return true;
    return false;
}
function HasPermission(groupno, permname) {
    var IsOk = false;
    $.ajax({
        url: prefixApiURL + "Users/HasPermission/" + groupno + "/" + permname,
        dataType: 'json',
        async: false,
        data: [],
        success: function (data) {
            IsOk = data.Status == "1" && data.Result == true;
        }
    });
    return IsOk;
}
function GetErrorFromString(responseText) {
    return jQuery.parseJSON(responseText);
}
function setHeader(xhr) {

    //var USERNAME = $("#usernameHF").val();
    //var PASSWORD = $("#userPasswordHF").val();
    //xhr.setRequestHeader('Authorization', "Basic " + btoa(USERNAME + ":" + PASSWORD));
    //xhr.setRequestHeader("Accept-Language", resources.lang)

    // return;
}
function showProgress() {
    //if (!spinnerVisible) {
    //   $("div#spinner").fadeIn("fast");
    //   spinnerVisible = true;
    //}
    $.blockUI({ message: '<h3></h3>', css: { width: '100px', height: '100px', background: 'url(Content/spiffygif.gif) no-repeat center #fff', border: '1px solid #666' } });
};
function hideProgress() {
    //if (spinnerVisible) {
    //    var spinner = $("div#spinner");
    //    spinner.stop();
    //    spinner.fadeOut("fast");

    //    spinnerVisible = false;
    //}
    $.unblockUI
};

function RemoveRow(table, id) {
    table.row().deleteRow(id);

    // table.fnDeleteRow(GetRowPostion(table, id));
}
function AddRow(table, data) {
    table.row().addRow(data, true);
    //table.fnAddData(data);
}
function InitializeNotifications() {
    messages = $('#messages').notify({
        type: 'messages',
        removeIcon: '<i class="fa fa-remove"></i>'
    });

    notes = $('#notes').notify({
        removeIcon: '<i class="fa fa-remove"></i>'
    });
}
function OpenFile(url, data) {
    jQuery.OpenFile(url, data, "Post");

}

function ShowMessage(msg, title) {
    $.alert({
        title: title,
        content: msg,
        confirmButton: resources.btOk,
        cancelButton: resources.btCancel,
        confirmButtonClass: 'btn-primary',
        icon: 'fa fa-hand-paper-o red',
        animation: 'scalex',
        backgroundDismiss: false,
    })
}
function ShowAlert(msg, title, type) {
    //  type=success,info,warning,danger
    // position=top-left,top-right,top-left,bottom-left,bottom-right
    var icon = "";
    switch (type) {
        case "success":
            icon = '<i class="fa fa-check"></i>';
            break;
        case "info":
            icon = '<i class="fa fa-info"></i>';
            break;
        case "warning":
            icon = '<i class="fa fa-warning"></i>';
            break;
        case "danger":
            icon = '<i class="fa fa-exclamation"></i>';
            break;
        default:
            icon = '';
    }
    if (notes == null)
        InitializeNotifications();
    notes.show(msg, {
        type: type,
        title: title,
        sticky: false,
        icon: icon,
        // speed: 1000,
        // effect: 'slide',
        delay: 5000

    });

}
function form_validate(form_id) {
    var result = true;
    $('#' + form_id).validator('validate');
    $('#' + form_id + ' .form-group').each(function () {
        if ($(this).hasClass('has-error') && $(this).is(':visible')) {
            result = false;
            return false;
        }
    });
    return result;
}
function choosefile() {
    $('#uploadImage').click();
}
function LoadSettings() {
    $('#uploadImage').val("");
    $.getJSON(prefixApiURL + "Company/Get").done(function (data) {
        jQuery("#txt_CompanyName_Edit").val(data.Result.name);
        jQuery("#uploadPreview").attr("src", prefixApiURL + "/Company/Image/Get");

    }).fail(function (jqxhr, textStatus, error) {
        jQuery("#uploadPreview").attr("src", $("#RootUrlHF").val() + 'Content/no_image.jpg');
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });


    // jQuery("#uploadPreview").attr("src", $("#RootUrlHF").val() + 'Content/no_image.jpg');
}
function saveSettings() {
    if ($('#uploadImage').val().length > 0) {
        var ext = $('#uploadImage').val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
            ShowMessage(resources.CompanyLogoMustBeImageMsg, resources.SystemSettingsTitle);
            return;
        }
        var s = $('#uploadImage')[0].files[0].size / (1024)
        if ((Math.round((s / 1024) * 100) / 100) > 1.0) {
            ShowMessage(resources.CompanyLogoSizeMusBeLessThan1MBMsg, resources.SystemSettingsTitle);
            return;
        }
    }

    var formData = new FormData();
    var logoFile = $('#uploadImage')[0];
    formData.append("logoFile", logoFile.files[0]);
    formData.append("CompanyName", jQuery("#txt_CompanyName_Edit").val())
    $.ajax({
        url: prefixApiURL + "Company/Update",
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).success(function (data) {
        if (data.Status != "1") {
            ShowMessage(data.Msg, resources.SystemSettingsTitle);

        }
        else {
            $('#SettingsFormDialog').modal('hide');
            ShowAlert(data.Msg, resources.SystemSettingsTitle, "success");
        }
    }).fail(function (jqxhr, settings, exception) {
        ShowMessage(GetErrorFromString(jqxhr.responseText).Msg, resources.SystemSettingsTitle);
    });
}
function PreviewImage() {
    if ($('#uploadImage').val().length > 0) {
        var ext = $('#uploadImage').val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
            ShowMessage(resources.CompanyLogoMustBeImageMsg, resources.SystemSettingsTitle);
            $('#uploadImage').val("")
            return;
        }
        var s = $('#uploadImage')[0].files[0].size / (1024)
        if ((Math.round((s / 1024) * 100) / 100) > 1.0) {
            ShowMessage(resources.CompanyLogoSizeMusBeLessThan1MBMsg, resources.SystemSettingsTitle);
            $('#uploadImage').val("")
            return;
        }

        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);
        oFReader.onload = function (oFREvent) {
            document.getElementById("uploadPreview").src = oFREvent.target.result;
        };
    }

}
function ShowSettings() {

    $('#SettingsFormDialog').modal('show');
}
function LoadCharts()
{
}
function InitializePrintModeView() {
    $(".rg").mousedown(function (e) {
        e.preventDefault();
        $(this).closest('.ReportGroupByRadios').find('.radio-inline, .radio').removeClass('checked');
        if ($(this).closest('.rg').find('input[type=radio]').is(':checked')) {
            $(this).closest('.rg').find('input[type=radio]').prop("checked", "");
        }
        else {
            $(this).closest('.rg').find('input[type=radio]').prop("checked", "checked");
            $(this).closest('.radio-inline, .radio').addClass('checked');
        }
    });
    $(".rg").click(function (e) {
        e.preventDefault();
    });



}
function ShowReportMode(url, para, withgroupby) {
    ReportUrlAction = url;
    ReportPara = para;
    if (withgroupby)
        $("#ReportGroupBy").show();
    else
        $("#ReportGroupBy").hide();
    $('#PrintModeDialog').modal('show');
}
function PrintReportMode(obj) {
    var PM = $(obj).attr("print-mode");
    if (ReportPara != null)
    {
        if  ($("#ReportGroupBy").is(":visible"))
        {
            var selectedVal = "";
            var selected = $(".ReportGroupByRadios input[type='radio']:checked");
            if (selected.length > 0) {
                selectedVal = selected.val();
            }
            ReportPara.GroupBy = selectedVal;
        }
    }
    $('#PrintModeDialog').modal('hide');
    switch (PM) {
        case "PR":  //Print Report
            {
                OpenFile(ReportUrlAction, ReportPara);
                break;
            }
        case "ETPDF":  //Export Report to PDF
            {
                OpenFile(ReportUrlAction + "/pdf", ReportPara);
                break;
            }
        case "ETExcel":  //Export Report to Excel
            {
                OpenFile(ReportUrlAction + "/Excel", ReportPara);
                break;
            }
        case "ETExcelD":  //Export Report to Excel Data
            {
                OpenFile(ReportUrlAction + "/ExcelDataOnly", ReportPara);
                break;
            }
        case "ETWord":  //Export Report to Word
            {
                OpenFile(ReportUrlAction + "/word", ReportPara);
                break;
            }
        default://Print Report
            {
                OpenFile(ReportUrlAction, ReportPara);
            }

    }
}
function ChangePassword() {
    $('#ChangePasswordFormDialog').modal('show');
}
function saveChangePassword() {
    if ($("#txt_CurrentPassword_Edit").length > 0) {
        if ($.trim($("#txt_CurrentPassword_Edit").val()).length == 0) {
            ShowMessage(resources.CurrentPasswordNotValidMsg, resources.ChangePassword);
            return;
        }
    }
    if ($.trim($("#txt_NewPassword_Edit").val()).length == 0) {
        ShowMessage(resources.YouMustTypeNewPasswordMsg, resources.ChangePassword);
        return;
    }
    if ($("#txt_NewPassword_Edit").val() != $("#txt_ConfirmPassword_Edit").val()) {
        ShowMessage(resources.NewpasswordNotIdenticalWithPasswordConfirmationMsg, resources.ChangePassword);
        return;
    }
    var formdata = {
        "user_id": 0,
        "user_name": $("#txt_UserName_Display").val(),
        "user_pass": $("#txt_CurrentPassword_Edit").val(),
        "user_per": 0,
        "user_empid": 0,
        "user_active": false,
        "user_email": "",
        "user_permchange": null,
        "user_mustchangepassword": false,
        "EmpName": "",
        "EmpNO": "",
        "user_Group": 0,
        "GroupName": "",
        "UserBranches": "",
        "NewPassword": $("#txt_NewPassword_Edit").val(),
    }
    var apiurl = prefixApiURL + "Users/ChangePassword";
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
            ShowMessage(data.Msg, resources.ChangePassword);
        }
        else {

            $.alert({
                title: resources.ChangePassword,
                content: data.Msg,
                confirmButton: resources.btOk,
                confirmButtonClass: 'btn-primary',
                icon: 'fa fa-check-circle green',
                animation: 'zoom',
                backgroundDismiss: false,
                confirm: function () {
                    document.location.href = $("#LogOutUrlHF").val();
                },
            })
        }
    }).fail(function (jqxhr, settings, exception) {
        ShowMessage(GetErrorFromString(jqxhr.responseText).Msg, resources.ChangePassword);
    }).always(function () {
    });
}
jQuery(document).ajaxStart(function () {
    //console.log("ajaxStart");
    // jQuery(".LayoutContent").addClass("loading");
    // jQuery(".modal").show();

});
$(document).ajaxStop($.unblockUI);
$.ajaxSetup({
    dataType: 'json',
    //async: false,
    
    cache: true,
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    beforeSend: function (xhr) {
        //xhr.withCredentials = true;
        $.blockUI({ message: '<h3></h3>', css: { width: '128px', height: '15px', background: 'url(' + $("#RootUrlHF").val() + 'Content/ajax-loader.gif) no-repeat center #fff', border: '1px solid #666', 'z-index': '100000', overflow: 'auto' } });
        if (resources != null) {
            var USERNAME = $("#usernameHF").val();
            var PASSWORD = $("#userPasswordHF").val();
            //xhr.setRequestHeader('Authorization', "Basic " + btoa(USERNAME + ":" + PASSWORD));
            xhr.setRequestHeader("Accept-Language", resources.lang)
        }

    }
});
/////////////////////////////////////////////////////////////////////////////////////

///////////////////Tree Functions///////////////////////////////////////////////
function treeify(list, idAttr, parentAttr, childrenAttr) {
    if (!idAttr) idAttr = 'id';
    if (!parentAttr) parentAttr = 'Parent';
    if (!childrenAttr) childrenAttr = 'children';
    var treeList = [];
    var lookup = {};
    list.forEach(function (obj) {
        lookup[obj[idAttr]] = obj;
        obj[childrenAttr] = [];
    });
    list.forEach(function (obj) {
        if (obj[parentAttr] != null) {
            lookup[obj[parentAttr]][childrenAttr].push(obj);
        } else {
            treeList.push(obj);
        }
    });
    return treeList;
};
function AppendNode(data) {
    var newnodedata = {
        "id": data.sec_ID,
        "label": data.sec_Name,
        "label2": data.sec_No,
        "Parent": data.sec_Parent
    }
    SectionTree.tree(
    'appendNode', newnodedata,
    currentNode
);
    //SectionTable.fnAddData(newnodedata);
    AddRow(SectionTable, newnodedata)
}
function UpdateNode(data) {
    var updatednodedata = {
        "id": data.sec_ID,
        "label": data.sec_Name,
        "label2": data.sec_No,
        "Parent": data.sec_Parent
    }
    SectionTree.tree(
'updateNode',
currentNode, updatednodedata
);
    SectionTable.row().updateRow(data.sec_ID, updatednodedata, false);
    // SectionTable.fnUpdate(updatednodedata, GetRowPostion(SectionTable, data.sec_ID));
    //RemoveRow(SectionTable, data.sec_ID);
    //SectionTable.fnAddData(updatednodedata);

}
function RemoveNodeByID(id) {
    var node = SectionTree.tree('getNodeById', id);
    SectionTree.tree('removeNode', node);
}
function CloseNodeByID(id) {
    var node = SectionTree.tree('getNodeById', id);
    if (node!=null)
    SectionTree.tree('closeNode', node);
}
function GetNodeByID(id) {
    return SectionTree.tree('getNodeById', id);
}
function GetSelectedNode() {
    return SectionTree.tree('getSelectedNode');
}
function SelectNode(id) {
    var node = GetNodeByID(id);
    SectionTree.tree('selectNode', node);
    if (node != null) {
        SectionTree.tree('scrollToNode', node);
    }
}
///////////////////////////////////////////////////////////////////////////////

/////////////Schedule Dialog/////////////////////////////////////////////////////////
function UserScheduleListSelection(sch_id, sch_name) {
    $(Select_Schedule_Control).val(sch_name);
    $(Select_Schedule_Control).attr("data-id", sch_id);
    $('#ScheduleDialog').modal('hide');
    $(Select_Schedule_Control).focus();
}
function CreateScheduleListTable(schdata) {
    ScheduleListTable = $('#ScheduleListTable').DataTable(
      {

          ajax: "",
          autoWidth: false,
          data: schdata,
          columns: [{ data: "sch_name" }, { data: "sch_desc" }],
          columnDefs: [
          { "width": "40%", "targets": 0 },
          { "width": "60%", "targets": 0 },
          ],
          filter: true,
          info: false,
          rowId: 'sch_id',
          ordering: true,
          "order": [],
          createdRow: function (row, data, index) {
              if (data.length != 0) {
                  jQuery(row).attr('data-id', data.sch_id);
                  jQuery(row).attr('data-name', data.sch_name);
                  jQuery(row).on('click', function (event) {
                      UserScheduleListSelection(jQuery(this).attr('data-id'), jQuery(this).attr('data-name'));

                  });
              }
          },
          language: { "url": resources.Datatable_Lang },
          pagingType: "full_numbers",
          "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

      });
}
function LoadScheduleListTable() {
    if (ScheduleListTable == null) {
        var apiurl = prefixApiURL + "/Schedules/GetAll";
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
                    ShowAlert(resources.LoadScheduleListErrorMsg + " " + data.Msg, resources.SchduleMsgTitle, "danger");
                }
                else {
                    CreateScheduleListTable(data.Result);
                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.LoadScheduleListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.SchduleMsgTitle, "danger");
            }).always(function () {
            });
    }
}
function ReloadScheduleListTable() {
    if (ScheduleListTable != null) {
        var apiurl = prefixApiURL + "/Schedules/GetAll";
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
                ScheduleListTable.fnClearTable();
                ScheduleListTable.fnAddData(data.Result);
            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert(resources.LoadScheduleListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.SchduleMsgTitle, "danger");
        }).always(function () {
        });
    }
}
///////////////////////////////////////////////////////////////////////////////////////

//////////////////Shifts Dialog/////////////////////////////////////////////////////////
function UserShiftListSelection(shit_id, shift_name) {
    $(Select_Shift_Control).val(shift_name);
    $(Select_Shift_Control).attr("data-id", shit_id);
    $('#ShiftDialog').modal('hide');
    $(Select_Shift_Control).focus();
}
function CreateShiftListTable(shiftdata) {
    ShiftListTable = $('#ShiftListTable').DataTable(
      {

          ajax: "",
          autoWidth: false,
          data: shiftdata,
          columns: [{ data: "shift_name" }, { data: "shift_fin" }, { data: "shift_fout" }],
          columnDefs: [
           { "width": "70%", "targets": 0 },
           { "width": "15%", "targets": 1 },
           { "width": "15%", "targets": 2 },
          ],
          filter: true,
          info: false,
          rowId: 'shift_id',
          ordering: true,
          "order": [],
          createdRow: function (row, data, index) {
              if (data.length != 0) {
                  jQuery(row).attr('data-id', data.shift_id);
                  jQuery(row).attr('data-name', data.shift_name);
                  jQuery(row).on('click', function (event) {
                      UserShiftListSelection(jQuery(this).attr('data-id'), jQuery(this).attr('data-name'));

                  });
              }
          },
          language: { "url": resources.Datatable_Lang },
          pagingType: "full_numbers",
          "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

      });
}
function LoadShiftListTable() {
    if (ShiftListTable == null) {
        var apiurl = prefixApiURL + "/Schedules/Shifts/GetAll";
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
                    ShowAlert(resources.LoadShiftsListErrorMsg + " " + data.Msg, resources.ShiftTitle, "danger");
                }
                else {
                    CreateShiftListTable(data.Result);
                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.LoadShiftsListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.ShiftTitle, "danger");
            }).always(function () {
            });
    }
}
function ReloadShiftListTable() {
    if (ShiftListTable != null) {
        var apiurl = prefixApiURL + "/Schedules/Shifts/GetAll";
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
                ShowAlert(resources.LoadShiftsListErrorMsg + " " + data.Msg, resources.ShiftTitle, "danger");
            }
            else {
                ShiftListTable.clear().draw();
                if (data.Result != null && data.Result.length > 0) {

                    ShiftListTable.rows.add(data.Result).draw();
                }
            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert(resources.LoadShiftsListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.ShiftTitle, "danger");
        }).always(function () {
        });
    }
}
///////////////////////////////////////////////////////////////////////////////////////

/////////////////////////Employees Dialog/////////////////////////////////////////////
function UserEmployeeSelection(aData) {
    debugger
    if ($(Select_Employee_Control).is("input")) {
        $(Select_Employee_Control).attr("data-id", aData.emp_id);
        $(Select_Employee_Control).val(resources.lang != 'en-US' ? aData.emp_name : aData.emp_nameEn).change();

    }
    else if ($(Select_Employee_Control).is("table")) {
        if (!$(Select_Employee_Control).DataTable().row().Exists(aData.emp_id, 0)) {
            var data = [{ "emp_id": aData.emp_id, "emp_no": aData.emp_no, "emp_name": resources.lang != 'en-US' ? aData.emp_name : aData.emp_nameEn }]
            $(Select_Employee_Control).DataTable().rows.add(data).draw();
        }

    }

    $('#EmployeeDialog').modal('hide');
}
function CreateEmployeeListTable(empdata) {
    EmployeeListTable = $('#EmployeeListTable').DataTable(
      {

          ajax: "",
          autoWidth: false,
          data: empdata,
            columns: [{ data: "emp_no" }, {
                data: resources.lang != 'en-US' ? "emp_name" : "emp_nameEn"}, { data: "sec_Name" }, { data: "reg_name" }],
          columnDefs: [
          { "width": "15%", "targets": 0 },
          { "width": "27%", "targets": 1 },
          { "width": "30%", "targets": 2 },
          { "width": "28%", "targets": 3 },
          ],
          filter: true,
          info: false,
          rowId: 'emp_id',
          ordering: true,
          "order": [],
          createdRow: function (row, data, index) {
              if (data.length != 0) {
                  jQuery(row).attr('data-id', data.emp_id);
                  jQuery(row).attr('data-name', resources.lang!='en-US'? data.emp_name:data.emp_nameEn);
                  jQuery(row).on('click', function (event) {
                      UserEmployeeSelection(data);

                  });
              }
          },
          language: { "url": resources.Datatable_Lang },
          pagingType: "full_numbers",
          "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

      });
}
function LoadEmployeeListTable(sec_id, reg_id) {
    if (EmployeeListData == null) {
        var apiurl = prefixApiURL + "/Employees/GetAll/" + sec_id + "/" + reg_id;
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
                 ShowAlert(resources.LoadScheduleListErrorMsg + " " + data.Msg, resources.EmployeesMsgTitle, "danger");
             }
             else {
                 EmployeeListData = data.Result;
                 if (EmployeeListTable == null)
                     CreateEmployeeListTable(data.Result);
                 else {
                     EmployeeListTable.clear().draw();
                     if (data.Result.length > 0)
                         EmployeeListTable.rows.add(data.Result).draw();
                 }
             }
         }).fail(function (jqxhr, settings, exception) {
             ShowAlert(resources.LoadScheduleListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.EmployeesMsgTitle, "danger");
         }).always(function () {

         });
    }
}
function ReloadEmployeeListTable(sec_id, reg_id) {
    if (EmployeeListTable != null) {
        var apiurl = prefixApiURL + "/Employees/GetAll/" + sec_id + "/" + reg_id;
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
                    ShowAlert(resources.LoadEmployeeListErrorMsg + " " + data.Msg, resources.EmployeesMsgTitle, "danger");
                }
                else {
                    EmployeeListData = data.Result;
                    EmployeeListTable.clear().draw();
                    if (data.Result != null && data.Result.length > 0) {

                        EmployeeListTable.rows.add(data.Result).draw();
                    }

                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.LoadEmployeeListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.EmployeesMsgTitle, "danger");
            }).always(function () {
            });
    }
}
//////////////////////////////////////////////////////////////////////////////////////

//////////////////Branches Dialog/////////////////////////////////////////////////////////
function UserBranchListSelection(reg_id, reg_name) {
    $(Select_Branch_Control).val(reg_name).change();
    $(Select_Branch_Control).attr("data-id", reg_id);
    $('#BranchDialog').modal('hide');
    $(Select_Branch_Control).focus();
}
function CreateBranchListTable(branchdata) {
    BranchListTable = $('#BranchListTable').DataTable(
      {

          ajax: "",
          autoWidth: false,
          data: branchdata,
          columns: [{ data: "reg_id" }, { data: "reg_name" }],
          columnDefs: [
          { "width": "20%", "targets": 0 },
           { "width": "80%", "targets": 1 },
          ],
          filter: true,
          rowId: 'reg_id',
          info: false,
          ordering: true,
          "order": [],
          createdRow: function (row, data, index) {
              if (data.length != 0) {
                  jQuery(row).attr('data-id', data.reg_id).attr('data-index', index);
                  jQuery(row).attr('data-name', data.reg_name);
                  jQuery(row).on('click', function (event) {
                      UserBranchListSelection(jQuery(this).attr('data-id'), jQuery(this).attr('data-name'));

                  });
              }
          },
          language: { "url": resources.Datatable_Lang },
          pagingType: "full_numbers",
          "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

      });
}
function LoadBranchListTable() {
    if (BranchListTable == null) {
        var apiurl = prefixApiURL + "/Branches/GetAll";
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
                    ShowAlert(resources.LoadBranchListErrorMsg + " " + data.Msg, resources.BranchListTitle, "danger");
                }
                else {
                    CreateBranchListTable(data.Result);
                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.LoadBranchListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.BranchListTitle, "danger");
            }).always(function () {
            });
    }
}
function ReloadBranchListTable() {
    if (BranchListTable != null) {
        var apiurl = prefixApiURL + "/Branches/GetAll";
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
                ShowAlert(resources.LoadBranchListErrorMsg + " " + data.Msg, resources.BranchListTitle, "danger");
            }
            else {
                BranchListTable.clear().draw();
                BranchListTable.rows.add(data.Result).draw();
            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert(resources.LoadBranchListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.BranchListTitle, "danger");
        }).always(function () {
        });
    }
}
///////////////////////////////////////////////////////////////////////////////////////

//////////////////Years Dialog/////////////////////////////////////////////////////////
function UserYearListSelection(reg_id, reg_name) {
    $(Select_Year_Control).val(reg_name).change();
    $(Select_Year_Control).attr("data-id", reg_id);
    $('#YearDialog').modal('hide');
    $(Select_Year_Control).focus();
}
function CreateYearListTable(Yeardata) {
    YearListTable = $('#YearListTable').DataTable(
        {

            ajax: "",
            autoWidth: false,
            data: Yeardata,
            columns: [{ data: "Year" }],
            //columnDefs: [
            //    { "width": "20%", "targets": 0 },
            //    { "width": "80%", "targets": 1 },
            //],
            filter: true,
            rowId: 'Year',
            info: false,
            ordering: true,
            "order": [],
            createdRow: function (row, data, index) {
                if (data.length != 0) {
                    jQuery(row).attr('data-id', data.Year).attr('data-index', index);
                    jQuery(row).attr('data-name', data.Year);
                    jQuery(row).on('click', function (event) {
                        UserYearListSelection(jQuery(this).attr('data-id'), jQuery(this).attr('data-name'));

                    });
                }
            },
            language: { "url": resources.Datatable_Lang },
            pagingType: "full_numbers",
            "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

        });
}
function LoadYearListTable() {
    if (YearListTable == null) {
        var apiurl = prefixApiURL + "/TimeSheet/Violations/GetYears";
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
                    ShowAlert(resources.LoadYearListErrorMsg + " " + data.Msg, resources.YearListTitle, "danger");
                }
                else {
                    CreateYearListTable(data.Result);
                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.LoadYearListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.YearListTitle, "danger");
            }).always(function () {
            });
    }
}
function ReloadYearListTable() {
    if (YearListTable != null) {
        var apiurl = prefixApiURL + "/TimeSheet/Violations/GetYears";
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
                    ShowAlert(resources.LoadYearListErrorMsg + " " + data.Msg, resources.YearListTitle, "danger");
                }
                else {
                    YearListTable.clear().draw();
                    YearListTable.rows.add(data.Result).draw();
                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.LoadYearListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.YearListTitle, "danger");
            }).always(function () {
            });
    }
}
///////////////////////////////////////////////////////////////////////////////////////

//////////////////Months Dialog/////////////////////////////////////////////////////////
function UserMonthListSelection(reg_id, reg_name) {
    $(Select_Month_Control).val(reg_name).change();
    $(Select_Month_Control).attr("data-id", reg_id);
    $('#MonthDialog').modal('hide');
    $(Select_Month_Control).focus();
}
function CreateMonthListTable(Monthdata) {
    MonthListTable = $('#MonthListTable').DataTable(
        {

            ajax: "",
            autoWidth: false,
            data: Monthdata,
            columns: [{ data: "MonthNo" }, { data: "MonthName" }],
            columnDefs: [
                { "width": "20%", "targets": 0 },
                { "width": "80%", "targets": 1 },
            ],
            filter: true,
            rowId: 'MonthNo',
            info: false,
            ordering: true,
            "order": [],
            createdRow: function (row, data, index) {
                if (data.length != 0) {
                    jQuery(row).attr('data-id', data.MonthNo).attr('data-index', index);
                    jQuery(row).attr('data-name', data.MonthName);
                    jQuery(row).on('click', function (event) {
                        UserMonthListSelection(jQuery(this).attr('data-id'), jQuery(this).attr('data-name'));

                    });
                }
            },
            language: { "url": resources.Datatable_Lang },
            pagingType: "full_numbers",
            "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

        });
}
function LoadMonthListTable() {
    if (MonthListTable == null) {
        var apiurl = prefixApiURL + "/TimeSheet/Violations/GetMonths";
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
                    ShowAlert(resources.LoadMonthListErrorMsg + " " + data.Msg, resources.MonthListTitle, "danger");
                }
                else {
                    CreateMonthListTable(data.Result);
                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.LoadMonthListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.MonthListTitle, "danger");
            }).always(function () {
            });
    }
}
function ReloadMonthListTable() {
    if (MonthListTable != null) {
        var apiurl = prefixApiURL + "/TimeSheet/Violations/GetMonths";
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
                    ShowAlert(resources.LoadMonthListErrorMsg + " " + data.Msg, resources.MonthListTitle, "danger");
                }
                else {
                    MonthListTable.clear().draw();
                    MonthListTable.rows.add(data.Result).draw();
                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.LoadMonthListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.MonthListTitle, "danger");
            }).always(function () {
            });
    }
}
///////////////////////////////////////////////////////////////////////////////////////

//////////////////Locations Dialog/////////////////////////////////////////////////////////
function UserLocationListSelection(reg_id, reg_name) {
    $(Select_Location_Control).val(reg_name).change();
    $(Select_Location_Control).attr("data-id", reg_id);
    $('#LocationDialog').modal('hide');
    $(Select_Location_Control).focus();
}
function CreateLocationListTable(Locationdata) {
    LocationListTable = $('#LocationListTable').DataTable(
      {

          ajax: "",
          autoWidth: false,
          data: Locationdata,
            columns: [{ data: "LocationName" }],
         
          filter: true,
            rowId: 'LocationName',
          info: false,
          ordering: true,
          "order": [],
          createdRow: function (row, data, index) {
              if (data.length != 0) {
                  jQuery(row).attr('data-id', data.LocationName).attr('data-index', index);
                  jQuery(row).attr('data-name', data.LocationName);
                  jQuery(row).on('click', function (event) {
                      UserLocationListSelection(jQuery(this).attr('data-id'), jQuery(this).attr('data-name'));

                  });
              }
          },
          language: { "url": resources.Datatable_Lang },
          pagingType: "full_numbers",
          "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

      });
}


function LoadLocationListTable() {
    if (LocationListTable == null) {
        var apiurl = prefixApiURL + "/Employees/GetAllLocations";
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
                    ShowAlert(resources.LoadLocationsListErrorMsg + " " + data.Msg, resources.LocationsListTitle, "danger");
                }
                else {
                    CreateLocationListTable(data.Result);
                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.LoadLocationsListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.LocationsListTitle, "danger");
            }).always(function () {
            });
    }
}
function ReloadLocationListTable() {
    if (LocationListTable != null) {
        var apiurl = prefixApiURL + "/Employees/GetAllLocations";
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
                ShowAlert(resources.LoadLocationsListErrorMsg + " " + data.Msg, resources.LocationsListTitle, "danger");
            }
            else {
                LocationListTable.clear().draw();
                LocationListTable.rows.add(data.Result).draw();
            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert(resources.LoadLocationsListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.LocationsListTitle, "danger");
        }).always(function () {
        });
    }
}
///////////////////////////////////////////////////////////////////////////////////////

//////////////////Sections Dialog/////////////////////////////////////////////////////////
function UserSectionListSelection(sec_id, sec_name) {

    $(Select_Section_Control).val(sec_name).change();
    $(Select_Section_Control).attr("data-id", sec_id);
    $('#SectionDialog').modal('hide');
    $(Select_Section_Control).focus();
}
function CreateSectionListTable(sectiondata) {
    SectionListTable = $('#SectionListTable').DataTable(
      {

          ajax: "",
          autoWidth: false,
          data: sectiondata,
          columns: [{ data: "sec_No" }, { data: "sec_Name" }],
          columnDefs: [
          { "width": "20%", "targets": 0 },
           { "width": "80%", "targets": 1 },
          ],
          filter: true,
          info: false,
          ordering: true,
          rowId: 'sec_ID',
          "order": [],
          createdRow: function (row, data, index) {
              if (data.length != 0) {
                  jQuery(row).attr('data-id', data.sec_ID).attr('data-index', index);
                  jQuery(row).attr('data-name', data.sec_Name);
                  jQuery(row).on('click', function (event) {
                      UserSectionListSelection(jQuery(this).attr('data-id'), jQuery(this).attr('data-name'));

                  });
              }
          },
          language: { "url": resources.Datatable_Lang },
          pagingType: "full_numbers",
          "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

      });
}
function LoadSectionListTable() {
    if (SectionListTable == null) {
        var apiurl = prefixApiURL + "/Sections/GetAll";
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
                    ShowAlert(resources.LoadSectionListErrorMsg + " " + data.Msg, resources.SectionListTitle, "danger");
                }
                else {
                    CreateSectionListTable(data.Result);
                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.LoadSectionListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.SectionListTitle, "danger");
            }).always(function () {
            });
    }
}
function ReloadSectionListTable() {
    if (SectionListTable != null) {
        var apiurl = prefixApiURL + "/Sections/GetAll";
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
                ShowAlert(resources.LoadSectionListErrorMsg + " " + data.Msg, resources.SectionListTitle, "danger");
            }
            else {
                SectionListTable.clear().draw();
                SectionListTable.rows.add(data.Result).draw();
            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert(resources.LoadSectionListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.SectionListTitle, "danger");
        }).always(function () {
        });
    }
}
///////////////////////////////////////////////////////////////////////////////////////

//////DataTable Plugin

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

////////////////////////////////////////////////////////////////////

//////Helper function
var oaDate = new Date(1899, 11, 31);
var ToaDate = new Date(1899, 11, 30);
var millisecondsOfaDay = 24 * 60 * 60 * 1000;

Date.prototype.ToOADate = function () {
    var result = (Date.parse(this) - Date.parse(ToaDate)) / millisecondsOfaDay;
    return parseInt(result);
};

Number.prototype.FromOADate = function () {
    
    var result = new Date();
    result.setTime((this * millisecondsOfaDay) + Date.parse(oaDate));
    return result;
};


Date.prototype.daysInMonth = function () {
    var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
    return d.getDate();
}

function GetRootURL() {
    return $("#RootUrlHF").val();
}
String.prototype.format = String.prototype.f = function () {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};
Date.prototype.ToDateString = function (format) {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    format = format.replace('yyyy', yyyy);
    format = format.replace('MM', mm[1] ? mm : "0" + mm[0]);
    format = format.replace('dd', dd[1] ? dd : "0" + dd[0]);

    return format;
};

jQuery.OpenFile = function (url, data, method) {
    if (data == null)
        data = {};
    //url and data options required
    if (url && data) {
        //data can be string of parameters or array/object
        data = typeof data == 'string' ? data : jQuery.param(data);
        //split params into form inputs
        var inputs = '';
        jQuery.each(data.split('&'), function () {
            var pair = this.split('=');
            inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
        });
        //send request
        jQuery('<form action="' + url + '" method="' + (method || 'post') + '" target="_blank">' + inputs + '</form>')
        .appendTo('body').submit().remove();
    };
};
$(document).on('show.bs.modal', '.modal', function (event) {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);

    setTimeout(function () {

        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});
$(document).on('hidden.bs.modal', '.modal', function (event) {

});



