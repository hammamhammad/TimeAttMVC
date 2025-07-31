var BranchesTable = null;
function ClearBranchForm() {
    $('#txt_BranchNumber_Edit').val("");
    $('#txt_BranchName_Edit').val("");
    setTimeout(function () {
        $("form#BranchForm").validator("destroy");
        $("#list-unstyled").remove();
        $("form#BranchForm").find('.has-error').removeClass("has-error");
        $("form#BranchForm").find('.has-success').removeClass("has-success");
        $("form#BranchForm").find('.glyphicon-remove').not($('.add-on').find("span:first")).removeClass("glyphicon-remove");
        $("form#BranchForm").find('.glyphicon-ok').not($('.add-on').find("span:first")).removeClass("glyphicon-ok");
        $('#BranchForm').validator({
            custom: {
                required: function ($el) { return !!$.trim($el.val()) }
            },
            errors: {
                required: 'Please fill out this field.'
            }
        });
    }, 100);
}
function DeleteBranchRow(obj) {
    if (!HasPermission(20, "reg-delete")) {

        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    CurrentID = $(obj).attr("data-id");
    BranchesTable.row().showRow(CurrentID, true);
    $.confirm({
        title: resources.DeleteBranchesTitle,
        content: resources.DeleteBranchConfirmationMsg.format(BranchesTable.rows('.selected').data()[0].reg_name),
        confirmButton: resources.btDelete,
        cancelButton: resources.btCancel,
        confirmButtonClass: 'btn-danger',
        autoClose: 'cancel|15000',
        icon: 'fa fa-warning',
        animation: 'scalex',
        confirm: function () {
          
            var apiurl = prefixApiURL + "Branches/Delete/" + CurrentID;
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
                    ShowAlert(data.Msg, resources.BranchesTitle, "danger");
                }
                else {
                    BranchesTable.row().deleteRow(CurrentID);
                   
                    ShowAlert(data.Msg, resources.BranchesTitle, "success");
                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.DeleteBranchErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.BranchesTitle, "danger");
            }).always(function () {
            });
        }
    });    
}
function EditBranchRow(obj) {
    if (!HasPermission(20, "reg-edit")) {

        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    ClearBranchForm();
    CurrentID = $(obj).attr("data-id");
    $("#BranchFormDialogTitle").html(resources.BranchEditRecordTitle)
    $('#BranchFormDialog').modal( 'show');
}
function AddBranchRow() {
    if (!HasPermission(20, "reg-add")) {

        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    ClearBranchForm();
    CurrentID = 0;
    $("#BranchFormDialogTitle").html(resources.BranchAddRecordTitle)
    $('#BranchFormDialog').modal('show');
}
function GetBranchData()
{
    //Branches/GetByID/1000
    var apiurl = prefixApiURL + "Branches/GetByID/" + CurrentID;
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
         if (data.Status != "1" || data.Result.length==0) {
             ShowAlert(resources.LoadDataErrorMsg + " "  + data.Msg, resources.SchduleMsgTitle, "danger");
         }
         else {
             $('#txt_BranchNumber_Edit').val(data.Result.reg_id);
             $('#txt_BranchName_Edit').val(data.Result.reg_name);
            

         }
     }).fail(function (jqxhr, settings, exception) {
         ShowAlert(resources.LoadShiftsDataErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.SchduleMsgTitle, "danger");
     }).always(function () {
     });
}
function SaveBranchData() {
   
    if (!form_validate("BranchForm")) {
        return;
    }
    var formdata = {
        "reg_id": $('#txt_BranchNumber_Edit').val(),
        "reg_name": $('#txt_BranchName_Edit').val()
    }
    var apiurl = "";
    if (CurrentID>0)
    {
        apiurl = prefixApiURL + "Branches/Update/" + CurrentID;
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
            ShowMessage(data.Msg, resources.BranchesTitle);
        }
        else {
            
            BranchesTable.row().updateRow(CurrentID, data.Result, true);
            $('#BranchFormDialog').modal('hide');
            ShowAlert(data.Msg, resources.BranchesTitle, "success");
            }
    }).fail(function (jqxhr, settings, exception) {
        ShowAlert(resources.SaveBranchErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.BranchesTitle, "danger");
    }).always(function () {
    });

    }
    else if (CurrentID == 0)
    {
        apiurl = prefixApiURL + "Branches/Add";
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
            ShowMessage(data.Msg, resources.BranchesTitle);
        }
        else {

            BranchesTable.row().addRow(data.Result, true);
            $('#BranchFormDialog').modal('hide');
            ShowAlert(data.Msg, resources.BranchesTitle, "success");
        }
    }).fail(function (jqxhr, settings, exception) {
        ShowAlert(resources.AddBranchErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.BranchesTitle, "danger");
    }).always(function () {
    });
    }
}
function ReloadBranchesData() {
    var apiurl = prefixApiURL + "Branches/GetAll";
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
             ShowAlert(resources.LoadBranchListErrorMsg + data.Msg, resources.BranchesTitle, "danger");
         }
         else {
             BranchesTable.clear().draw();
             if (data.Result != null && data.Result.length > 0)
                 BranchesTable.rows.add(data.Result).draw();

         }
     }).fail(function (jqxhr, settings, exception) {
         ShowAlert(resources.LoadBranchListErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.BranchesTitle, "danger");
     }).always(function () {
     });
}
function InitializeBranchesView() {
    $('#BranchFormDialog').on('shown.bs.modal', function () {
        if (CurrentID == 0)
            ClearBranchForm();
        else {
            ClearBranchForm();
            GetBranchData();

        }
        $('#txt_BranchNumber_Edit').focus()
    });
    BranchesTable = $('#BranchesTable').DataTable(
     {
         ajax: "",
         autoWidth: false,
         data: SectionData,
         columns: [{ data: "reg_id" }, { data: "reg_name" }
         ],
         columnDefs: [
            
         { "width": "15%", "targets": 0 },
         { "width": "75%", "targets": 1 },
         {
             className: "col-centered", "width": "5%", "targets": 2,
             "render": function (data, type, row) {
                 return '<span class="glyphicon glyphicon-edit  col-edit handcursor" data-id=' + row.reg_id + ' onclick="if(IsDisabled(this)) { return };EditBranchRow($(this))"></span>';
             }
         },
         {
             className: "col-centered", "width": "5%", "targets": 3,
             "render": function (data, type, row) {
                 return '<span class="glyphicon glyphicon-trash  col-delete handcursor" data-id=' + row.reg_id + ' onclick="if(IsDisabled(this)) { return };DeleteBranchRow($(this))"></span>';
             }
         }
         ],
         filter: true,
         rowId: 'reg_id',
         info: false,
         ordering: true,
         "order": [],
         language: { "url": resources.Datatable_Lang },
         pagingType: "full_numbers",
         "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

     });
    $('#BranchesTable tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            BranchesTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    $("#bt_saveBranch").click(function (e) { e.preventDefault(); if ($(this).hasClass('disabled')) return; else SaveBranchData(); })
    ReloadBranchesData();
}