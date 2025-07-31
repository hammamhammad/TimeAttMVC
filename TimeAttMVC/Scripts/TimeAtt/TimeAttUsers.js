var UsersGroupTable = null;
var UsersGroupData = null;
var UsersInfoTable = null;
var UsersInfoData = null;
var ModulesData = null;
var BrachesData = null;
var UserBranchesData = null;
var Select_UserGroup_Control = null;
var Select_UserBranch_Control = null;
var UserGroupListTable = null;
var UserBranchListTable = null;
var ChangeSelectedBranch = false;
var lastUserRecord = null;

//Groups & Users
function InitializeUsersView() {
    CurrentView = "Group";
    CurrentID = 0;
    ClearAllUsersGroupForms();
    $("#UsersTab").tab;
    $('#UsersTab a').click(function (e) {
        e.preventDefault()
        ShowTab($(this));
    })
    $('.ChangeUserTypeRadios').on('click', 'input[type=radio]', function () {
        $(this).closest('.ChangeUserTypeRadios').find('.radio-inline, .radio').removeClass('checked');
        $(this).closest('.radio-inline, .radio').addClass('checked');
    });
    $("#RB_All").click();
    ReloadUsersData();
    $("#bt_saveGroup").click(function (e) { e.preventDefault(); if ($(this).hasClass('disabled')) return; else SaveGroupData(); })
    $("#bt_CancelGroup").click(function (e) { e.preventDefault(); ClearAllUsersGroupForms(); FillGroupInformation(); })
    $("#bt_saveUser").click(function (e) { e.preventDefault(); if ($(this).hasClass('disabled')) return; else SaveUserData(); })
    $("#bt_CancelUser").click(function (e) { e.preventDefault(); ClearAllUsersGroupForms(); FillUserInformation(); })
    $('#UserBranchDialog').on('shown.bs.modal', function () {
        LoadUserBranchListTable();
        $("#bt_saveUserBranchData").unbind('click');
        $("#bt_saveUserBranchData").click(function (e) { e.preventDefault(); if ($(this).hasClass('disabled')) return; else saveUserBranchData(); })
    });
    $('#UserBranchDialog').on('hidden.bs.modal', function () {
        if (ChangeSelectedBranch)
        {
            UserBranchesData = [];
            UserBranchListTable.$('input:checked').each(function () { UserBranchesData.push($(this).attr('data-id')) })
        }
        $("#txt_Select_UserBranchesAccess").val(GetUserBranch());
       
        if (UserBranchListTable != null) {

            UserBranchListTable.clear().draw();
            UserBranchListTable.destroy();
        }
        UserBranchListTable = null;


        ChangeSelectedBranch = false;
    });
}
function UserTypeRadioChanged() {
    UsersInfoData = null;
    ClearAllUsersGroupForms();
    ReloadUsersData();
}
function ShowUsersGroupForms(id) {
    var formid = "";
    switch (id) {
        case "linkgrouptab":
            formid = 'Groupformdiv';
            CurrentView = 'Group';
            break;
        case "linkusertab":
            formid = 'Userformdiv';
            CurrentView = 'User';
            break;
        default:
            formid = 'Groupformdiv';
            CurrentView = 'Group';
    }

    $('.UsersGroupsforms').removeClass('hide');
    $('.UsersGroupsforms').addClass('hide');
    $("#" + formid).removeClass('hide')
}
function ShowTab(obj) {
    obj.tab('show');
    ShowUsersGroupForms(obj[0].id);
    ClearAllUsersGroupForms();
    if (CurrentView == 'Group') {
        $("#bt_DeleteUserGroup").show();
        if (UsersGroupTable != null && UsersGroupTable.rows('.selected').count() > 0) {
            CurrentID = UsersGroupTable.rows('.selected').data()[0].GroupID;
            UsersGroupTable.row().showRow(CurrentID, true);
            FillGroupInformation();
        }
        else
            CurrentID = 0;
        
        ReloadUsersData();
    }
    if (CurrentView == 'User') {
        $("#bt_DeleteUserGroup").hide();
        if (UsersInfoTable != null && UsersInfoTable.rows('.selected').count() > 0 && UsersInfoData!=null) {
            CurrentID = UsersInfoTable.rows('.selected').data()[0].user_id;
            UsersInfoTable.row().showRow(CurrentID, true);
            FillUserInformation();
        }
        else
            CurrentID = 0;
       
        ReloadUsersData();
    }


}
function SetUGActionButtons(flag) {
    $("#bt_AddUserGroup").prop('disabled', flag);
    $("#bt_EditUserGroup").prop('disabled', flag);
    $("#bt_DeleteUserGroup").prop('disabled', flag);
}
function ClearAllUsersGroupForms() {
    CurrentID = 0;
    SetUGActionButtons(false);
    action = "View";
    if (CurrentView == "Group") {
        $('form#GroupForm')[0].reset();
        $("#Groupfieldset").prop('disabled', true);
        $("#Privilegediv").empty();
        setTimeout(function () {
            $("form#GroupForm").validator("destroy");
            $("#list-unstyled").remove();
            $("form#GroupForm").find('.has-error').removeClass("has-error");
            $("form#GroupForm").find('.has-success').removeClass("has-success");
            //$("form#SecForm").find('.glyphicon-remove').removeClass("glyphicon-remove");
            //$("form#SecForm").find('.glyphicon-ok').removeClass("glyphicon-ok");
            $("form#GroupForm").find('.glyphicon-remove').not($('.add-on').find("span:first")).removeClass("glyphicon-remove");
            $("form#GroupForm").find('.glyphicon-ok').not($('.add-on').find("span:first")).removeClass("glyphicon-ok");

            $('form#GroupForm').validator();
        }, 100);
    }
    else if (CurrentView == 'User') {
        UserBranchesData = null;
        $("#GroupforUserdiv").hide();
        $('.ChangeUserFormTypeRadios').find('.radio-inline, .radio').removeClass('checked');
        $("input[name$='UserFormType']").prop("checked", false);
        
        $('#togglechk').find("div:first").removeAttr("disabled");
        $("#txt_Select_UserformEmployee").val("").attr("data-id", 0);
        $("#txt_Select_GroupforUser").val("").attr("data-id", 0);
        $('form#UserForm')[0].reset();
        $("#Userfieldset").prop('disabled', true);
        $("#chk_UserStatus").prop('disabled', false);
        $('#chk_UserStatus').prop('checked', true).change();
        $("#chk_UserStatus").prop('disabled', false);
        setTimeout(function () {
            $("form#UserForm").validator("destroy");
            $("#list-unstyled").remove();
            $("form#UserForm").find('.has-error').removeClass("has-error");
            $("form#UserForm").find('.has-success').removeClass("has-success");
            $("form#UserForm").find('.glyphicon-remove').not($('.add-on').find("span:first")).removeClass("glyphicon-remove");
            $("form#UserForm").find('.glyphicon-ok').not($('.add-on').find("span:first")).removeClass("glyphicon-ok");
            $('#UserForm').validator({
                custom: {
                    required: function ($el) { return !!$.trim($el.val()) }
                },
                errors: {
                    required: 'Please fill out this field.'
                }
            });

        }, 100);
    }

}
function ReloadUsersData() {

    if (ModulesData == null) {
        $.ajax
    ({
        type: "GET",
        url: prefixApiURL + "Users/Groups/GetModules",
        dataType: 'json',
        cache: false,
        async: false,
        data: null
    }).done(function (data) {
        ModulesData = data.Result;
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });
    }
    if (BrachesData == null) {
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
                BrachesData = data.Result;
            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert(resources.LoadBranchListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.BranchListTitle, "danger");
        }).always(function () {
        });
    }

    if (CurrentView == 'Group') {
        if (UsersGroupData != null)
            return;
        $.getJSON(prefixApiURL + "Users/Groups/GetAll").done(function (data) {

            UsersGroupData = data.Result;

            if (UsersGroupTable != null) {
                UsersGroupTable.clear();
                UsersGroupTable.destroy();
            }
            UsersGroupTable = $('#UsersGroupTable').DataTable(
       {
           ajax: "",
           autoWidth: false,
           data: data.Result,
           columns: [{ data: "GroupName" }],
           columnDefs: [
           { "width": "100%", "targets": 0 }],
           filter: true,
           rowId: 'GroupID',
           info: false,
           ordering: true,
           "order": [],
           language: { "url": resources.Datatable_Lang },
           pagingType: "simple_numbers",
           "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',
           createdRow: function (row, data, index) {
               if (data.length != 0) {
                   jQuery(row).attr('data-id', data.GroupID).attr('data-index', index);
                   jQuery(row).addClass("handcursor");
               }
           }
       });
            UsersGroupTable.rows('.selected').deselect();
            $('#UsersGroupTable tbody').unbind('click');
            $('#UsersGroupTable tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    UsersGroupTable.rows('.selected').deselect()
                    UsersGroupTable.rows($(this)).select();
                }
                else {
                    UsersGroupTable.rows('.selected').deselect()
                    UsersGroupTable.rows($(this)).select();

                }
                UserGroupSelection(UsersGroupTable.rows({ selected: true }).data()[0].GroupID);
            });
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
    }
    else if (CurrentView == 'User') {
        if (UsersInfoData != null)
            return;
        
        $.getJSON(prefixApiURL + "Users/GetAll/" + $('input[name=UserType]:checked').val()).done(function (data) {

            UsersInfoData = data.Result;

            if (UsersInfoTable != null) {
                UsersInfoTable.clear();
                UsersInfoTable.destroy();
            }
            UsersInfoTable = $('#UsersInfoTable').DataTable(
       {
           ajax: "",
           autoWidth: false,
           data: data.Result,
           columns: [{ data: "user_name" }, { data: "EmpName" }, { data: "GroupName" }],
           columnDefs: [
           { "width": "25%", "targets": 0 },
           { "width": ($('input[name=UserType]:checked').val() == 2 ? "30%" : "55%"), "targets": 1 },
           { "width": "30%", "targets": 2, "visible": $('input[name=UserType]:checked').val() == 2, "searchable": $('input[name=UserType]:checked').val() == 2 },
           {
               "width": "15%",
               "targets": 3,
               "render": function (data, type, row) {
                   if (row.user_per == 1)
                       return resources.AdminUserType;
                   else if (row.user_per == 2)
                       return resources.ManagerUserType;
                   else
                       return resources.EmployeeUserType;
               }
           }
           ],
           filter: true,
           rowId: 'user_id',
           info: false,
           ordering: true,
           "order": [],
           language: { "url": resources.Datatable_Lang },
           pagingType: "simple_numbers",
           "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',
           createdRow: function (row, data, index) {
               if (data.length != 0) {
                   jQuery(row).attr('data-id', data.user_id).attr('data-index', index);
                   jQuery(row).addClass("handcursor");
                   if (!data.user_active)
                       jQuery(row).addClass("usernotactive");
                   else
                       jQuery(row).removeClass("usernotactive");

               }
           }
           , "initComplete": function () {
               if (lastUserRecord != null) {
                   UsersInfoTable.row().getRow(lastUserRecord.user_id).show(true);
                   lastUserRecord = null;
               }
           }
           
       });
            
            UsersInfoTable.rows('.selected').deselect();
            $('#UsersInfoTable tbody').unbind('click');
            $('#UsersInfoTable tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    UsersInfoTable.rows('.selected').deselect()
                    UsersInfoTable.rows($(this)).select();
                }
                else {
                    UsersInfoTable.rows('.selected').deselect()
                    UsersInfoTable.rows($(this)).select();

                }
                UserInfoSelection(UsersInfoTable.rows({ selected: true }).data()[0].user_id);

            });
            
           
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
    }
}
function SetUserGroupFormForAdd() {
    ClearAllUsersGroupForms();
    if (CurrentView == "Group") {


        action = "Add";
        $("#Groupfieldset").prop('disabled', false);
        $("#txt_GroupName_edit").focus();
        SetUGActionButtons(true);
        FillGroupInformation();

    }
    if (CurrentView == "User") {
        action = "Add";
        $("#Userfieldset").prop('disabled', false);
        $("#txt_UserName_edit").focus();

        SetUGActionButtons(true);


    }

}
function SetUserGroupFormForEdit() {
    ClearAllUsersGroupForms();
    if (CurrentView == "Group") {

        if (UsersGroupTable.rows('.selected').data().length > 0) {
            CurrentID = UsersGroupTable.rows('.selected').data()[0].GroupID;
            UsersGroupTable.row().showRow(CurrentID, true);
        }

        if (CurrentID == 0) {
            ShowAlert(resources.YouMustSelectUserGroupToContinueMsg, resources.GroupsUserTitle, "danger");
            return;
        }
        FillGroupInformation();
        $("#Groupfieldset").prop('disabled', false);
        $("#txt_GroupName_edit").focus();
    }
    if (CurrentView == "User") {
        if (UsersInfoTable.rows('.selected').data().length > 0) {
            CurrentID = UsersInfoTable.rows('.selected').data()[0].user_id;
            UsersInfoTable.row().showRow(CurrentID, true);
        }

        if (CurrentID == 0) {
            ShowAlert(resources.YouMustSelectUserToContinueMsg, resources.UsersTitle, "danger");
            return;
        }
        FillUserInformation();
        $("#Userfieldset").prop('disabled', false);
        $("#txt_UserName_edit").focus();


    }
    SetUGActionButtons(true);
    action = "Update";
}
function DeleteUserFormGroup() {
    if (CurrentView == "Group") {
        if (CurrentID == 0) {
            ShowAlert(resources.YouMustSelectUserGroupToContinueMsg, resources.GroupsUserTitle, "danger");
            return;
        }
        DelteUserGroupData();
    }
    if (CurrentView == "User") {
        return;
    }
}
function DelteUserGroupData() {

    action = "Delete";
    $.confirm({
        title: resources.DeleteUserGroupTitle,
        content: resources.DeleteUserGroupConfirmationMsg.format($("#txt_GroupName_edit").val()),
        confirmButton: resources.btDelete,
        cancelButton: resources.btCancel,
        confirmButtonClass: 'btn-danger',
        autoClose: 'cancel|15000',
        icon: 'fa fa-warning',
        animation: 'scalex',
        confirm: function () {
            var apiurl = prefixApiURL + "Users/Groups/Delete/" + CurrentID;
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
                    ShowAlert(data.Msg, resources.DeleteUserGroupTitle, "danger");
                }
                else {
                    UsersGroupTable.row().deleteRow(data.Result.GroupID);
                    UsersGroupData.pop(data.Result);
                    ClearAllUsersGroupForms()
                    ShowAlert(data.Msg, resources.DeleteUserGroupTitle, "success");
                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.DeleteUserGroupErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.DeleteUserGroupTitle, "danger");
            }).always(function () {
            });
        }
    });
}


///Groups
function GetSelected() {
    var selected = [];
    $('.PermCheckBoxes input:checked').each(function () {
        selected.push($(this).attr('value'));
    });
    return selected;
}
function FillGroupInformation() {
    if (UsersGroupTable != null && action == "View")
        if (UsersGroupTable.rows('.selected').data().length > 0) {
            CurrentID = UsersGroupTable.rows('.selected').data()[0].GroupID;
            UsersGroupTable.row().showRow(CurrentID, true);
        }
    $("#Privilegediv").empty();
    $("#Privilegediv").hide();
    if (ModulesData == null)
        return;
    if (CurrentID == 0 && action == "View")
        return;
    var htmlcode = '<div class="form-group col-md-12 columns PermCheckBoxes"><input type="checkbox" onchange="ChangeCheckBoxfieldset(this)" data-id="{1}" class="bigCheckbox checkboxclosefeidset pull-left flip"><fieldset id="Groupfieldset{0}" data-id="{1}"><legend>{2}</legend></fieldset></div>';
    var Prev = null;
    var Perm = null;
    $.getJSON(prefixApiURL + "Users/Groups/GetByID/" + CurrentID).done(function (data) {
        if (data.Status != "1")
            return;
        else {
            if (data.Result != null)
                $("#txt_GroupName_edit").val(data.Result.GroupName);
            $.getJSON(prefixApiURL + "Users/Groups/GetPermissions/" + CurrentID).done(function (data) {
                Prev = data.Result;
                $.each(ModulesData, function (index, Module) {
                    $("#Privilegediv").append(htmlcode.format(Module.ModuleID, Module.ModuleID, (resources.lang == 'ar' ? Module.ModuleName_AR : Module.ModuleName_EN)))
                    Perm = $.grep(Prev, function (p) {
                        return p.ModuleID == Module.ModuleID;
                    });
                    $.each(Perm, function (index, p) {
                        $('<label class="checkbox-inline' + (p.IsOK ? ' checked' : '') + '" for="check_' + p.PrivilegeID + '"><input type="checkbox"' + (p.IsOK ? ' checked ' : ' ') + 'class="bigCheckbox" name="chkgroup' + p.ModuleID + '" id="check_' + p.PrivilegeID + '" value="' + p.PrivilegeID + '">' + (resources.lang == 'ar' ? p.Name_AR : p.Name_EN) + '</label>').appendTo("#Groupfieldset" + Module.ModuleID);
                    });
                });
                $('.PermCheckBoxes').unbind('change', 'input[type=checkbox]');
                $('.PermCheckBoxes').on('change', 'input[type=checkbox]', function () {

                    if (!$(this).prop('checked'))
                        $(this).closest('.checkbox-inline').removeClass("checked");
                    else
                        $(this).closest('.checkbox-inline').addClass("checked");
                });

                $("#Privilegediv").fadeIn("500");
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });




}
function ChangeCheckBoxfieldset(obj) {
    $("input[name=chkgroup" + $(obj).attr("data-id") + "]").prop("checked", $(obj).prop("checked")).change();
}
function UserGroupSelection(ID) {
    ClearAllUsersGroupForms();
    CurrentID = ID;
    action = "View";
    FillGroupInformation();
}
function SaveGroupData() {
    if (!form_validate("GroupForm")) {
        return;
    }
    var formdata = { "GroupID": action == "Add" ? 0 : CurrentID, "GroupName": $("#txt_GroupName_edit").val(), "Permissions": GetSelected().join() }
    var apiurl = prefixApiURL + "Users/Groups/" + action;
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
            ShowAlert(data.Msg, resources.GroupsUserTitle, "danger");
        }
        else {
            if (action == "Add") {
                UsersGroupTable.row().addRow(data.Result, true);
                UsersGroupData.push(data.Result);
            }
            else if (action == "Update") {
                UsersGroupTable.row().updateRow(data.Result.GroupID, data.Result, true);
                jQuery.grep(UsersGroupData, function (a) {
                    if (a.GroupID == CurrentID) { a.GroupName = data.Result.GroupName; }
                });
            }
            ClearAllUsersGroupForms();
            CurrentID = data.Result.GroupID;
            FillGroupInformation();
            ShowAlert(data.Msg, resources.GroupsUserTitle, "success");
        }
    }).fail(function (jqxhr, settings, exception) {
        ShowAlert(action == "Add" ? resources.AddUserGroupErrorMsg + GetErrorFromString(jqxhr.responseText).Msg : resources.SaveUserGroupErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.SchduleMsgTitle, "danger");
    }).always(function () {
    });


}


//Users
function ChangeCheckBoxfBranchList(obj) {
    var flag = $(obj).prop("checked");
    UserBranchListTable.$('input[type="checkbox"]').prop('checked', flag)

}
function GetUserBranch() {
    if (UserBranchesData == null)
        return '';
    var br = [];
    var brarr = UserBranchesData.slice(0, 3);
    for (var k in brarr) {
        var d = jQuery.grep(BrachesData, function (a) {
            if (a.reg_id == brarr[k])
                br.push(a);
        });
    }
    if (br.length > 0) {
        var s = br.map(function (item) {
            return item.reg_name;
        }).join(",")
        return s + (UserBranchesData.length > 3 ? " ..." : "");

    }
    return '';

}
function UserFormTypeRadioChanged(obj) {
    $(obj).closest('.ChangeUserFormTypeRadios').find('.radio-inline, .radio').removeClass('checked');
    if ($(obj).prop('checked'))
        $(obj).closest('.radio-inline').addClass("checked");
    if ($(obj).val() == "2") {
        $("#GroupforUserdiv").show();
    }
    else {
        $("#GroupforUserdiv").hide();
    }

}
function UserInfoSelection(ID) {
    ClearAllUsersGroupForms();
    CurrentID = ID;
    action = "View";
    FillUserInformation();
}
function LoadUserBranchListTable() {
    if (BrachesData == null) {
        $('#UserBranchDialog').modal('hide');
        return;
    }
    if (UserBranchListTable != null) {

        UserBranchListTable.clear().draw(false);
        UserBranchListTable.destroy();
    }
    UserBranchListTable = $('#UserBranchListTable').DataTable({
        ajax: "",
        autoWidth: false,
        data: BrachesData,
        columns: [{ data: "reg_id" }, { data: "reg_id" }, { data: "reg_name" }],
        columnDefs: [
            {
                "width": "5%", "targets": 0,
                "render": function (data, type, row) {
                    return '<input type="checkbox" class="bigCheckbox" data-id="' + row.reg_id + '"  name="id[]" ' + ($.inArray(row.reg_id.toString(), UserBranchesData) >= 0 ? 'checked' : '') + '>';
                }, "searchable": false
            },
        { "width": "15%", "targets": 1 },
        { "width": "80%", "targets": 2 },
        ],
        "scrollY": "500px",
        "scrollCollapse": true,

        paging: false,
        filter: true,
        rowId: 'reg_id',
        info: false,
        ordering: false,

        language: { "url": resources.Datatable_Lang },
        "drawCallback": function (settings) {
            $("#UserBranchListTable_wrapper div.toolbar").addClass('pull-left').addClass('flip');
            $("#UserBranchListTable_wrapper div.toolbar").html('<label class="checkbox-inline' +
                '" for="check_allbranch"><input type="checkbox" class="bigCheckbox" onchange="ChangeCheckBoxfBranchList(this)" name="chkbranchgroup" id="check_allbranch" >' + resources.SelectAllLable + '</label>');
        },
        "dom": '<"toolbar">lfrtip'


    });
    //UserBranchListTable.columns.adjust().draw();

}
function saveUserBranchData() {
    ChangeSelectedBranch = true;
    $('#UserBranchDialog').modal('hide');
}
function SaveUserData() {
    if (!form_validate("UserForm")) {
        return;
    }
    var formdata = {
        "user_id": action == "Add" ? 0 : CurrentID,
        "user_name": $("#txt_UserName_edit").val(),
        "user_pass": $("#txt_UserPassword_edit").val(),
        "user_per": $("input[type='radio'][name='UserFormType']:checked").val(),
        "user_empid": $("#txt_Select_UserformEmployee").attr("data-id"),
        "user_active": $("#chk_UserStatus").prop('checked'),
        "user_email": null,
        "user_permchange": 1,
        "user_mustchangepassword": false,
        "EmpName": null,
        "EmpNO": null,
        "user_Group": $("#txt_Select_GroupforUser").attr("data-id"),
        "GroupName": "",
        "UserBranches": (UserBranchesData == null || UserBranchesData.length == 0 ? null : UserBranchesData.join(","))
    }
    var apiurl = prefixApiURL + "Users/" + action;
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
            ShowAlert(data.Msg, resources.UsersTitle, "danger");
        }
        else {
            var curUserType = $("input[type='radio'][name='UserType']:checked").val();
            if (curUserType.toString() != "0" && curUserType.toString() != data.Result.user_per.toString()) {
                lastUserRecord = data.Result;
                $("#RB_All").click();
            }
            else {
                if (action == "Add") {
                    UsersInfoTable.row().addRow(data.Result, true);
                    UsersInfoData.push(data.Result);
                }
                else if (action == "Update") {

                    var row = UsersInfoTable.row().updateRow(data.Result.user_id, data.Result, true);
                    if (data.Result.user_active)
                        $(row.node()).removeClass("usernotactive");
                    else
                        $(row.node()).addClass("usernotactive");
                }
            }
            ClearAllUsersGroupForms();
            CurrentID = data.Result.user_id;
            FillUserInformation();
            ShowAlert(data.Msg, resources.UsersTitle, "success");
        }


    }).fail(function (jqxhr, settings, exception) {
        ShowAlert(action == "Add" ? resources.AddUserErrorMsg + GetErrorFromString(jqxhr.responseText).Msg : resources.SaveUserErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.SchduleMsgTitle, "danger");
    }).always(function () {
    });


}
function FillUserInformation() {
    if (UsersInfoTable != null && action == "View")
        if (UsersInfoTable.rows('.selected').data().length > 0) {
            CurrentID = UsersInfoTable.rows('.selected').data()[0].user_id;
            UsersInfoTable.row().showRow(CurrentID, true);
        }
    if (CurrentID == 0)
        return;
    $.getJSON(prefixApiURL + "Users/GetByID/" + CurrentID).done(function (data) {
        if (data.Status != "1")
            return;
        else {

            $("#txt_UserName_edit").val(data.Result.user_name);
            $("#txt_UserPassword_edit").val($("#txt_UserPassword_edit").val() == "123456" ? "123456" : (data.Result.user_pass));
            $("#txt_Select_UserformEmployee").val(data.Result.EmpName).attr("data-id", data.Result.user_empid);
            if (data.Result.user_per == 1)
                $('#RB_FormAdmin').prop('checked', true).change().click();
            else if (data.Result.user_per == 2) {
                $('#RB_FormManager').prop('checked', true).change().click();
                $("#txt_Select_GroupforUser").val(data.Result.GroupName).attr("data-id", data.Result.user_Group);
                if (data.Result.UserBranches.length > 0) {
                    UserBranchesData = data.Result.UserBranches.split(',')

                }

            }
            else if (data.Result.user_per == 3)
                $('#RB_FormEmployee').prop('checked', true).change().click();
            $("#chk_UserStatus").prop('disabled', false);
            $('#chk_UserStatus').prop('checked', data.Result.user_active).change();
            $("#chk_UserStatus").prop('disabled', false);
            $("#txt_Select_UserBranchesAccess").val(GetUserBranch());


        }

    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });
}
function ReloadUserGroup(DontCreateTable) {
    $.getJSON(prefixApiURL + "Users/Groups/GetAll").done(function (data) {

        UsersGroupData = data.Result;
        if (DontCreateTable)
            return;
        if (UsersGroupTable != null) {
            UsersGroupTable.clear();
            UsersGroupTable.destroy();
        }
        UsersGroupTable = $('#UsersGroupTable').DataTable(
   {
       ajax: "",
       autoWidth: false,
       data: data.Result,
       columns: [{ data: "GroupName" }],
       columnDefs: [
       { "width": "100%", "targets": 0 }],
       filter: true,
       rowId: 'GroupID',
       info: false,
       ordering: true,
       "order": [],
       language: { "url": resources.Datatable_Lang },
       pagingType: "simple_numbers",
       "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',
       createdRow: function (row, data, index) {
           if (data.length != 0) {
               jQuery(row).attr('data-id', data.GroupID).attr('data-index', index);
               jQuery(row).addClass("handcursor");
           }
       }
   });
        UsersGroupTable.rows('.selected').deselect();
        $('#UsersGroupTable tbody').unbind('click');
        $('#UsersGroupTable tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                UsersGroupTable.rows('.selected').deselect()
                UsersGroupTable.rows($(this)).select();
            }
            else {
                UsersGroupTable.rows('.selected').deselect()
                UsersGroupTable.rows($(this)).select();

            }
            UserGroupSelection(UsersGroupTable.rows({ selected: true }).data()[0].GroupID);
        });
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });
}
function ReloadUserGroupList(DontCreateTable) {
    if (DontCreateTable && UserGroupListTable != null)
        return;
    if (UserGroupListTable != null) {
        UserGroupListTable.clear();
        UserGroupListTable.destroy();
    }
    UserGroupListTable = $('#UserGroupListTable').DataTable({
        ajax: "",
        autoWidth: false,
        data: UsersGroupData,
        columns: [{ data: "GroupName" }],
        columnDefs: [
        { "width": "100%", "targets": 0 },
        ],
        createdRow: function (row, data, index) {
            if (data.length != 0) {
                jQuery(row).attr('data-id', data.GroupID).attr('data-index', index);
                jQuery(row).attr('data-name', data.GroupName);
                jQuery(row).on('click', function (event) {
                    UserGroupListSelection(jQuery(this).attr('data-id'), jQuery(this).attr('data-name'));

                });
            }
        },
        filter: true,
        rowId: 'GroupID',
        info: false,
        ordering: true,
        "order": [],
        language: { "url": resources.Datatable_Lang },
        pagingType: "full_numbers",
        "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

    });
}
function UserGroupListSelection(id, gname) {
    $(Select_UserGroup_Control).val(gname).change();
    $(Select_UserGroup_Control).attr("data-id", id);
    $('#UserGroupListDialog').modal('hide');
    $(Select_UserGroup_Control).focus();
}
