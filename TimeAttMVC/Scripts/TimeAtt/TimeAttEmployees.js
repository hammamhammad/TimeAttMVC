var EmployeesTable = null;
var EmployeeTypeData = null;
var reloaddata = true;
function InitializeEmployeesView() {
    $("#SectionsTablediv").hide();
    SectionTree = $('#SectionsTree');

    LoadSectionTree();
    $("#reloadtree").click(function () { ReLoadSectionTree(); })
    $("#searchtree").click(function () { ShowView(); })
    $("#bt_AddEmployee").click(function () { AddEmployeeRow(); })
    CreateEmployeeListTable();
    $('#EmployeeFormDialog').on('shown.bs.modal', function () {

        if (CurrentID == 0)
            ClearEmployeeForm();
        else {
            ClearEmployeeForm();
            GetEmployeeData();

        }
        // $('#txt_BranchNumber_Edit').focus()
    });

    $('.EmpGroupCheckBoxes').on('change', 'input[type=checkbox]', function () {
        if (!$(this).prop('checked'))
            $(this).closest('.checkbox-inline').removeClass("checked");
        else
            $(this).closest('.checkbox-inline').addClass("checked");


    });
    $("#bt_saveEmployee").click(function (e) { e.preventDefault(); if ($(this).hasClass('disabled')) return; else SaveEmployeeChange(); })

    if (!HasPermission(8, "rep-emp")) {
        $("#printemployee").hide();
    }
    else {
        $("#printemployee").click(function (e) { e.preventDefault(); PrintEmployee(); })
    }
    

}
function PrintEmployee() {
    ShowReportMode(GetRootURL() + "Employees/PrintReport", { Sec_ID: (currentNode == null ? 0 : currentNode.id) }, true);
}
function FillEmployeeTypeDropDown() {
    var options = $("#dd_EmpType_edit");
    options.empty();
    options.append($("<option />").val('').text(''));
    var lang = resources.lang
    $.each(EmployeeTypeData, function () {
        options.append($("<option />").val(this.ConstantCode).text(lang == 'ar' ? this.ConstantArabicName : this.ConstantEnglishName));
    });
    $("#dd_EmpType_edit option[value='']").attr('selected', true)
}
function FillEmployeeType() {
    if (EmployeeTypeData == null) {
        var apiurl = prefixApiURL + "Employees/GetEmployeeType";
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
                 ShowAlert(resources.LoadDataErrorMsg + " " + data.Msg, resources.EmployeeesTitle, "danger");

             }
             else {

                 EmployeeTypeData = data.Result;
                 FillEmployeeTypeDropDown();
             }
         }).fail(function (jqxhr, settings, exception) {
             ShowAlert(resources.LoadDataErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.EmployeeesTitle, "danger");

         }).always(function () {
         });

    }
    else {
        FillEmployeeTypeDropDown();
    }
}
function CreateEmployeeListTable() {
  
   
    var apiurl = prefixApiURL + "Employees/GetAll/0/0"
    EmployeesTable = $('#EmployeesTable').DataTable(
      {
          ajax: "",
          "lengthMenu": [[10, 20, 50, 100], [10, 20, 50, 100]],
          autoWidth: false,
            rowId: 'emp_id',
            columns: [{ data: "emp_id" }, { data: "emp_card" }, { data: "emp_no" }, {
                data: resources.lang != 'en-US' ? "emp_name" : "emp_nameEn" }, { data: "sec_Name" }, { data: "reg_name" }, { data: "sch_Name" }],
         
          columnDefs: [
          { "targets": 0, "visible": false, "searchable": false },
          { "width": "11%", "targets": 1, "orderable": false, "visible": false, "searchable": false },
          { "width": "13%", "targets": 2 ,type:"num"},
          { "width": "20%", "targets": 3 },
          { "width": "22%", "targets": 4 },
          { "width": "15%", "targets": 5 },
          { "width": "20%", "targets": 6 },
          {
              className: "col-centered", "width": "5%", "targets": 7,
              "render": function (data, type, row) {
                  return '<span class="glyphicon glyphicon-edit  col-edit handcursor" data-id=' + row.emp_id + ' onclick="if(IsDisabled(this)) { return };EditEmployeeRow($(this))"></span>';
              }
          },
         {
             className: "col-centered", "width": "5%", "targets": 8,
             "render": function (data, type, row) {
                 return '<span class="glyphicon glyphicon-trash  col-delete handcursor" data-id=' + row.emp_id + ' onclick="if(IsDisabled(this)) { return };DeleteEmployeeRow($(this))"></span>';
             }
         }
          ],
          filter: true,
          info: true,
          ordering: true,
          "order": [[2,'asc']],
          language: { "url": resources.Datatable_Lang },
          pagingType: "full_numbers",
          "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

      });
    $('#EmployeesTable tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            EmployeesTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    

}
function ShowView() {
    var treeview = $('#SectionsTree').is(":visible")
    var searchview = $('#SectionsTablediv').is(":visible")
    if (treeview && !searchview) {
        $('#SectionsTree').fadeOut("fast");
        $('#SectionsTablediv').fadeIn("fast");
        SectionTable.columns.adjust().draw();

        return;
    }
    if (searchview && !treeview) {
        $('#SectionsTablediv').fadeOut("fast");
        $.when($('#SectionsTree').fadeIn("fast")).done(function () {
            if (currentNode != null) {
                SectionTree.tree('scrollToNode', currentNode);
            }
        });
        return;
    }
}
function SetTableSettings()
{
    //EmployeesTable.select(true);
    //EmployeesTable.select.info(false);
    //EmployeesTable.select.style('single');
}
function LoadSectionTree() {
    var apiurl = prefixApiURL + "Sections/GetAll/Tree";
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
             ShowAlert(resources.LoadSectionListErrorMsg + " " + data.Msg, resources.SectionsMsgTitle, "danger");

         }
         else {
             SectionTreeData = treeify(data.Result);
             SectionTree.tree({
                 data: SectionTreeData,
                 dragAndDrop: true,
                 autoOpen: 2
             });
             SectionTree.bind(
                'tree.select',
                 function (event) {
                     if (event.node) {
                         // node was selected
                         var node = event.node;
                         currentNode = node;
                         SetSectionViewForView();
                     }
                     else {
                         // event.node is null
                         // a node was deselected
                         // e.previous_node contains the deselected node
                     }
                 });
             SectionTree.bind(
                'tree.move',
                    function (event) {
                        StartMove(event);
                        //console.log('moved_node', event.move_info.moved_node);
                        //console.log('target_node', event.move_info.target_node);
                        //console.log('position', event.move_info.position);
                        //console.log('previous_parent', event.move_info.previous_parent);
                    }
);
             SectionData = data.Result;
             CloseNodeByID(1924);
             SelectNode(1);
             LoadSectionTable();
         }
     }).fail(function (jqxhr, settings, exception) {
         ShowAlert(resources.LoadSectionListErrorMsg + " " + GetErrorFromString(jqxhr.responseText).Msg, resources.SectionsMsgTitle, "danger");

     }).always(function () {
     });

}
function ReLoadSectionTree() {
    EmployeeTypeData = null;
    var apiurl = prefixApiURL + "Sections/GetAll/Tree";
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
             ShowAlert(resources.LoadSectionListErrorMsg + data.Msg, resources.SectionsMsgTitle, "danger");
         }
         else {
             SectionTreeData = treeify(data.Result);
             SectionTree.tree('loadData', SectionTreeData);
             SectionData = data.Result;
             CloseNodeByID(1924);
             SelectNode(1);
             ReLoadSectionTable();
         }
     }).fail(function (jqxhr, settings, exception) {
         ShowAlert(resources.LoadSectionListErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.SectionsMsgTitle, "danger");
     }).always(function () {
     });
}
function UserSectionSelection(secid) {
    ShowView();
    SelectNode(secid);
}
function LoadSectionTable() {
    SectionTable = $('#SectionsTable').DataTable(
      {
          ajax: "",
          autoWidth: false,
          data: SectionData,
          columns: [{ data: "id" }, { data: "label2" },
                  { data: "label" },
          ],
          columnDefs: [
              {
                  "targets": [0],
                  "visible": false,
                  "searchable": false
              },
          { "width": "30%", "targets": 1 },
          { "width": "70%", "targets": 2 },

          ],
          //dataSrc: "data",
          filter: true,
          info: false,
          ordering: true,
          "order": [],
          //processing: true,
          //retrieve: true,
          createdRow: function (row, data, index) {
              if (data.length != 0) {
                  jQuery(row).attr('data-id', data.id).attr('data-index', index);
                  jQuery(row).on('click', function (event) {
                      UserSectionSelection(jQuery(this).attr('data-id'));

                  });
              }
          },
          language: { "url": resources.Datatable_Lang },
          //pagingType: "simple_numbers",
          //"scrollY": "500px",
          //"scrollCollapse": false,
          "paging": true,
          "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',

      });

}
function ReLoadSectionTable() {
    SectionTable.clear().draw();
    if (SectionData != null && SectionData.length > 0)
        SectionTable.rows.add(SectionData).draw();

    //SectionTable.fnClearTable();
    //SectionTable.fnAddData(SectionData);
}
function SetSectionViewForView() {

    $("#secSelectedTitle").html(resources.lbTitleViewEmployeesForSection + " [" + currentNode.name + "]");
    action = "view";
    FillEmployeesInformation();
    // FillSectionInformation();
}
function FillEmployeesInformation() {
    if (EmployeesTable != null)
    {
        EmployeesTable.clear().draw();
        var apiurl = prefixApiURL + "Employees/GetAll/" + (currentNode == null ? 0 : currentNode.id).toString() + "/0"
        $.get(apiurl).done(function (data) {
            if (data.Status != "1") {
                ShowAlert(resources.LoadEmployeeListErrorMsg + data.Msg, resources.EmployeeesTitle, "danger");
            }
            else {
                if (data.Result != null && data.Result.length > 0)
                    EmployeesTable.rows.add(data.Result).draw();
            }
        }).fail(function (jqxhr, settings, exception) {
            ShowAlert(resources.LoadEmployeeListErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.EmployeeesTitle, "danger");
        })

        //EmployeesTable.ajax.url(apiurl).load(SetTableSettings, false);
        
    }
        
}
function ClearEmployeeForm() {
    $('#txt_Select_BySection').val("").attr("data-id", 0);
    $('#txt_Select_ByBranch').val("").attr("data-id", 0);
    $('#txt_EmpNo_edit').val("");
    $('#txt_EmpName_edit').val("");
    $('#txt_EmpIDNo_edit').val("");
    $('#txt_EmpJobTitle_edit').val("");
    $('#txt_Select_Schedule').val("").attr("data-id", 0);
    $("#dd_EmpSendEmail_edit option[value=-1]").attr('selected', true)
    $('#Chk_ExceptionReport').prop('checked', false).change();
    $('#Chk_ExceptionViolation').prop('checked', false).change();
    $('#Chk_ExceptionInPeriod').prop('checked', false).change();
    $("#ex_FromDate").datepicker('update', new Date());
    $("#ex_ToDate").datepicker('update', new Date());
    $('#hasschgroup').hide();
    $('#divExceptionInPeriod').hide();
    $('#divExceptionInPeriodDate').hide();
    $('#txt_Select_Schedule').prop("disabled", false);
    FillEmployeeType();
    setTimeout(function () {
        $("form#EmployeeForm").validator("destroy");
        $("#list-unstyled").remove();
        $("form#EmployeeForm").find('.has-error').removeClass("has-error");
        $("form#EmployeeForm").find('.has-success').removeClass("has-success");
        $("form#EmployeeForm").find('.glyphicon-remove').not($('.add-on').find("span:first")).removeClass("glyphicon-remove");
        $("form#EmployeeForm").find('.glyphicon-ok').not($('.add-on').find("span:first")).removeClass("glyphicon-ok");
        $('#EmployeeForm').validator({
            custom: {
                required: function ($el) { return !!$.trim($el.val()) }
            },
            errors: {
                required: 'Please fill out this field.'
            }
        });
    }, 100);
}
function GetEmployeeData() {
    if (CurrentID == 0)
        return;
    var apiurl = prefixApiURL + "Employees/GetByID/" + CurrentID;
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
             ShowAlert(resources.LoadEmployeeDataErrorMsg + data.Msg, resources.EmployeeesTitle, "danger");
         }
         else {
             var senEmail = -1
             if (data.Result.emp_sendnotif == true)
                 senEmail = 1;
             else if (data.Result.emp_sendnotif == false)
                 senEmail = 0;
             $('#divExceptionInPeriod').fadeIn(200);
             $('#divExceptionInPeriodDate').fadeIn(200);
             $('#txt_Select_BySection').val(data.Result.sec_Name).attr("data-id", data.Result.emp_section);
             $('#txt_Select_ByBranch').val(data.Result.reg_name).attr("data-id", data.Result.emp_region);
             $('#txt_EmpNo_edit').val(data.Result.emp_no);
             $('#txt_EmpName_edit').val(data.Result.emp_name);
             $('#txt_EmpIDNo_edit').val(data.Result.emp_PersonalID);
             $('#txt_EmpJobTitle_edit').val(data.Result.emp_JobTitle);
             $('#txt_Select_Schedule').val(data.Result.sch_Name).attr("data-id", data.Result.emp_sch);
             $("#dd_EmpSendEmail_edit").val(senEmail);// option[value=" + senEmail + "]").attr('selected', true)
             $('#Chk_ExceptionReport').prop('checked', data.Result.emp_violatedException).change();
             $('#Chk_ExceptionViolation').prop('checked', data.Result.emp_ExceptionViolation).change();
             if (data.Result.ex_FromDate) {
                 $('#Chk_ExceptionInPeriod').prop('checked', true).change();
                 $("#ex_FromDate").datepicker('update', new Date((data.Result.ex_FromDate).FromOADate()));
                 $("#ex_ToDate").datepicker('update', new Date((data.Result.ex_ToDate).FromOADate()));
             }
             $("#dd_EmpType_edit").val(data.Result.emp_jointype);// option[value=" + data.Result.emp_jointype + "]").attr('selected', true)
             if (data.Result.GroupName != null && data.Result.GroupName != '') {
                 $('#hasschgroup').show();
                 $('#hasschgroup').html(resources.EmployeeHasSchGroupMsg.format(data.Result.GroupName));
                 $('#txt_Select_Schedule').prop("disabled", true);
             }
         }
     }).fail(function (jqxhr, settings, exception) {
         ShowAlert(resources.LoadEmployeeDataErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.EmployeeesTitle, "danger");
     }).always(function () {
     });
}
function EditEmployeeRow(obj) {
    if (!HasPermission(3, "emp-edit")) {

        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    ClearEmployeeForm();
    
    action = "Update";
    CurrentID = $(obj).attr("data-id");
    $("#EmployeeFormDialogTitle").html(resources.EmployeeEditRecordTitle)
    $('#EmployeeFormDialog').modal('show');
}
function DeleteEmployeeRow(obj) {
    if (!HasPermission(3, "emp-delete")) {

        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    Delete(obj);
}
function AddEmployeeRow() {
    if (!HasPermission(3, "emp-add")) {

        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    ClearEmployeeForm();
    CurrentID = 0;
    action = "Add";
    $("#EmployeeFormDialogTitle").html(resources.EmployeeAddRecordTitle)
    $('#EmployeeFormDialog').modal('show');

}
function GetFormData() {
    
    var ex_FromDate = $('#Chk_ExceptionInPeriod').prop('checked') ? $("#ex_FromDate").datepicker("getDate").ToOADate() : null;
    var ex_ToDate = $('#Chk_ExceptionInPeriod').prop('checked') ? $("#ex_ToDate").datepicker("getDate").ToOADate() : null;
    var formdata = {
        "emp_id": CurrentID,
        "emp_no": $('#txt_EmpNo_edit').val(),
        "emp_section": $('#txt_Select_BySection').attr("data-id"),
        "emp_name": $('#txt_EmpName_edit').val(),
        "emp_sch": $('#txt_Select_Schedule').attr("data-id"),
        "emp_PersonalID": $('#txt_EmpIDNo_edit').val(),
        "emp_JobTitle": $('#txt_EmpJobTitle_edit').val(),
        "emp_jointype": $("#dd_EmpType_edit").val(),
        "emp_violatedException": $('#Chk_ExceptionReport').prop('checked'),
        "emp_ExceptionViolation": $('#Chk_ExceptionViolation').prop('checked'),
        "ex_FromDate": ex_FromDate,
        "ex_ToDate": ex_ToDate,
        "emp_sendnotif": $("#dd_EmpSendEmail_edit").val() == -1 ? null : ($("#dd_EmpSendEmail_edit").val() == 1 ? true : false),
        "emp_region": $('#txt_Select_ByBranch').attr("data-id"),
    };
    
    return formdata;
}
function SaveEmployee(formdata) {
    var apiurl = prefixApiURL + "Employees/" + action;

    $.ajax
   ({
       type: "POST",
       url: apiurl,
       dataType: 'json',
       //async: false,
       cache: false,
       data: formdata //formdata
   }).done(function (data) {
       if (data.Status != "1") {
           ShowAlert(data.Msg, resources.EmployeeesTitle, "danger");
       }
       else {
           if (action == "Add") {
               EmployeesTable.row().addRow(data.Result, true);
           }
           else if (action == "Update") {
               reloaddata = false;
              
               EmployeesTable.row().updateRow(data.Result.emp_id,data.Result , true );
           }
           $('#EmployeeFormDialog').modal('hide');
           ShowAlert(data.Msg, resources.EmployeeesTitle, "success");
       }
   }).fail(function (jqxhr, settings, exception) {
       ShowAlert(action == "Add" ? resources.AddEmployeeErrorMsg : resources.SaveEmployeeErrorMsg + ":" + GetErrorFromString(jqxhr.responseText).Msg, action == "Add" ? resources.EmployeeAddRecordTitle : resources.EmployeeEditRecordTitle, "danger");
   }).always(function () {
   });
}
function DeleteOldDate(emp_id) {
    var apiurl = prefixApiURL + "Employees/Delete/" + emp_id + "/true";
    var ret = false;
    $.ajax
  ({
      type: "POST",
      url: apiurl,
      dataType: 'json',
      async: false,
      cache: false,
      data: formdata //formdata
  }).done(function (data) {
      if (data.Status != "1") {
          ShowAlert(data.Msg, action == "Add" ? resources.EmployeeAddRecordTitle : resources.EmployeeEditRecordTitle, "danger");
          ret = false;
      }
      else {
          if (data.Status == "1") {
              ret = true;
          }
      }
  }).fail(function (jqxhr, settings, exception) {
      ret = false;
      ShowAlert(action == "Add" ? resources.AddEmployeeErrorMsg : resources.SaveEmployeeErrorMsg + ":" + GetErrorFromString(jqxhr.responseText).Msg, action == "Add" ? resources.EmployeeAddRecordTitle : resources.EmployeeEditRecordTitle, "danger");
  }).always(function () {
  });
    return ret;
}
function Delete(obj) {
    CurrentID = $(obj).attr("data-id");
    var apiurl = prefixApiURL + "Employees/Delete/" + CurrentID + "/false"
    $.confirm({
        title: resources.EmployeeDeleteRecordTitle,
        content: resources.DeleteEmployeeConfirmationMsg.format(EmployeesTable.rows($(obj).first().closest("tr")).data()[0].emp_name),
        confirmButton: resources.btDelete,
        cancelButton: resources.btCancel,
        confirmButtonClass: 'btn-danger',
        autoClose: 'cancel|15000',
        icon: 'fa fa-warning',
        animation: 'scalex',
        confirm: function () {
            $.ajax
            ({
                type: "POST",
                url: apiurl,
                dataType: 'json',
               // async: false,
                cache: false,
            }).done(function (data) {
                if (data.Status != "1") {
                    ShowAlert(data.Msg, resources.EmployeeDeleteRecordTitle, "danger");
                }
                else {
                    if (data.Status == "1") {
                        ShowAlert(data.Msg, resources.EmployeeesTitle, "success");
                        EmployeesTable.row().deleteRow(CurrentID);
                    }
                }
            }).fail(function (jqxhr, settings, exception) {
                ret = false;
                ShowAlert(resources.DeleteEmployeeErrorMsg + ":" + GetErrorFromString(jqxhr.responseText).Msg, resources.EmployeeDeleteRecordTitle, "danger");
            }).always(function () {
            });
        }
    });

}
function SaveEmployeeChange() {
    if (!form_validate("EmployeeForm")) {
        return;
    }
    var apiurl = prefixApiURL + "Employees/CheckEmployee";
    formdata = GetFormData();
    $.ajax
  ({
      type: "POST",
      url: apiurl,
      dataType: 'json',
      async: false,
      cache: false,
      data: formdata //formdata
  }).done(function (data) {
      if (data.Status != "1") {
          ShowMessage(data.Msg, action == "Add" ? resources.EmployeeAddRecordTitle : resources.EmployeeEditRecordTitle);
      }
      else {
          if (data.Status == "1") {
              SaveEmployee(formdata);
          }
          else if (data.Status == "2") {
              $.confirm({
                  title: action == "Add" ? resources.EmployeeAddRecordTitle : resources.EmployeeEditRecordTitle,
                  content: resources.ConfirmationChangeEmployeeNoMsg,
                  confirmButton: resources.btOk,
                  cancelButton: resources.btCancel,
                  confirmButtonClass: 'btn-warning',
                  //cancelButtonClass: 'btn-danger',
                  animation: 'scalex',
                  backgroundDismiss: false,
                  confirm: function () {
                      if (DeleteOldDate(data.Result.emp_id)) {
                          SaveEmployee(formdata);
                      }

                  },
                  cancel: function () {

                  }
              });
          }
      }
  }).fail(function (jqxhr, settings, exception) {
      ShowAlert(action == "Add" ? resources.AddEmployeeErrorMsg : resources.SaveEmployeeErrorMsg + ":" + GetErrorFromString(jqxhr.responseText).Msg, action == "Add" ? resources.EmployeeAddRecordTitle : resources.EmployeeEditRecordTitle, "danger");
  }).always(function () {
  });



}