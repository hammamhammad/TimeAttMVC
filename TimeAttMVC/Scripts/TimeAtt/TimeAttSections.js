//Section Code
/////////////////////////////////////////////////////

function InitializeSectionView() {
   
    SectionTree = $('#SectionsTree');
    $("#SectionsTablediv").hide();
    LoadSectionTree();
    $("#reloadtree").click(function () { ReLoadSectionTree(); })
    $("printtree")
    $("#searchtree").click(function () { ShowView(); })
    $("#bt_AddSection").click(function () { SetSectionViewForAdd(); })
    $("#bt_EditSection").click(function () { SetSectionViewForEdit(); })
    $("#bt_DeleteSection").click(function () { DeleteSection(); })
    $("#bt_saveSection").click(function (e) { e.preventDefault(); if ($(this).hasClass('disabled')) return; else SaveSectionChange(); })
    $("#bt_Cancel").click(function (e) { e.preventDefault(); SetSectionViewForView(); })
    if (!HasPermission(8, "rep-sec")) {
        $("#printtree").hide();
    }
    else
    {
        $("#printtree").click(function (e) { e.preventDefault(); PrintSectionTree(); })
    }

}
function ClearSectionForm() {
    $('form#SecForm')[0].reset();
    setTimeout(function () {
        $("form#SecForm").validator("destroy");
        $("#list-unstyled").remove();
        $("form#SecForm").find('.has-error').removeClass("has-error");
        $("form#SecForm").find('.has-success').removeClass("has-success");
        //$("form#SecForm").find('.glyphicon-remove').removeClass("glyphicon-remove");
        //$("form#SecForm").find('.glyphicon-ok').removeClass("glyphicon-ok");
        $("form#SecForm").find('.glyphicon-remove').not($('.add-on').find("span:first")).removeClass("glyphicon-remove");
        $("form#SecForm").find('.glyphicon-ok').not($('.add-on').find("span:first")).removeClass("glyphicon-ok");
        $("#sectionfieldset").prop('disabled', true);
        $("#chk_SendNotification").prop('disabled', true);
        $("#bt_AddSection").prop('disabled', false);
        $("#bt_EditSection").prop('disabled', false);
        $("#bt_DeleteSection").prop('disabled', false);
        $('form#SecForm').validator();
    }, 100);
}


function ShowView() {
    var treeview = $('#SectionsTree').is(":visible")
    var searchview = $('#SectionsTablediv').is(":visible")
    if (treeview && !searchview) {
        $('#SectionsTree').fadeOut("fast");
        $('#SectionsTablediv').fadeIn("fast");


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
function StartMove(event) {
    event.preventDefault();
    if (!HasPermission(1, "sec-move")) {
        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    var moved_node = event.move_info.moved_node;
    var target_node = event.move_info.target_node;

    if (moved_node.Parent == null) {
        ShowAlert(resources.YouCannotMoveMainSectionMsg, resources.MoveSectionTitle, "danger");
        return;
    }
    if (moved_node.id == target_node.id)
        return;
    if (typeof target_node.parent.id != 'undefined' && moved_node.id == target_node.parent.id) {
        ShowAlert(resources.YouCannotMoveSectionMsg, resources.MoveSectionTitle, "danger");
        return;
    }
    if (typeof moved_node.parent.id != 'undefined' && moved_node.parent.id == target_node.id) {
        return;
    }
    $.confirm({
        title: resources.MoveSectionTitle,
        content: resources.MoveSectionConfirmatinMsg.format(moved_node.name, target_node.name),
        confirmButton: resources.btMove,
        cancelButton: resources.btCancel,
        confirmButtonClass: 'btn-primary',
        autoClose: 'cancel|15000',
        icon: 'fa fa-warning',
        animation: 'scalex',
        confirm: function () {
            var apiurl = prefixApiURL + "Sections/Move/" + moved_node.id + "/" + target_node.id;
            $.ajax
            ({
                type: "POST",
                url: apiurl,
                dataType: 'json',
                //async: false,
                cache: false,
                //beforeSend: setHeader,
                data: [] //formdata
            }).done(function (data) {
                if (data.Status != "1") {
                    ShowAlert(data.Msg, resources.MoveSectionTitle, "danger");
                }
                else {
                    event.move_info.do_move();
                    SelectNode(moved_node.id);
                    SetSectionViewForView();
                    ShowAlert(data.Msg, resources.MoveSectionTitle, "success");
                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.MoveSectionErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.MoveSectionTitle, "danger");
            }).always(function () {
            });



        }
    });

}
function PrintSectionTree() {
    ShowReportMode(GetRootURL() + "Sections/PrintReport", null,false);
    
}
function ReLoadSectionTree() {
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
          columns: [{ data: "id" },{ data: "label2" },
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
          rowId: 'id',
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
          pagingType: "simple_numbers",
          "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>'

      });

}
function ReLoadSectionTable() {
    SectionTable.clear().draw();
    if (SectionData != null && SectionData.length > 0)
        SectionTable.rows.add(SectionData).draw();

    //SectionTable.fnClearTable();
    //SectionTable.fnAddData(SectionData);
}
function FillSectionInformation() {
    if (currentNode == null) return;
    var sec_id = currentNode.id;
    var apiurl = prefixApiURL + "Sections/GetByID/" + sec_id;
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
             ShowAlert(resources.LoadDataErrorMsg + data.Msg, resources.SectionsMsgTitle, "danger");
         }
         else {
             $("#txt_SecNo_edit").val(data.Result.sec_No);
             $("#txt_SecName_edit").val(data.Result.sec_Name);
             $("#txt_SecLoc_edit").val(data.Result.sec_Location);
             $("#txt_Select_Employee").val(data.Result.sec_managerName);
             $("#txt_Select_Schedule").val(data.Result.sch_name);
             $("#txt_Select_Employee").attr("data-id", data.Result.sec_manager);
             $("#txt_Select_Schedule").attr("data-id", data.Result.sec_sch);
             $("#chk_SendNotification").prop('disabled', false);
             $('#chk_SendNotification').prop('checked', data.Result.sec_sendnotif).change();
             $("#chk_SendNotification").prop('disabled', true);
         }
     }).fail(function (jqxhr, settings, exception) {
         ShowAlert(resources.LoadDataErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.SectionsMsgTitle, "danger");
     }).always(function () {
     });
}
function SetSectionViewForView() {
    ClearSectionForm();
    $("#secSelectedTitle").html(resources.lbTitleFormSectionForView + " [" + currentNode.name + "]");
    action = "view";
    FillSectionInformation();
}
function SetSectionViewForEdit() {
    if (!HasPermission(1, "sec-edit"))
    {
        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    $("#secSelectedTitle").html(resources.lbTitleFormSectionForEdit + " [" + currentNode.name + "]");
    $("#sectionfieldset").prop('disabled', false);
    $("#chk_SendNotification").prop('disabled', false);
    $('#togglechk').find("div:first").removeAttr("disabled");
    $("#bt_AddSection").prop('disabled', true);
    $("#bt_EditSection").prop('disabled', true);
    $("#bt_DeleteSection").prop('disabled', true);
    action = "Update";
}
function SetSectionViewForAdd() {
    if (!HasPermission(1, "sec-add")) {
        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    $('#SecForm')[0].reset();
    action = "Add";
    $("#secSelectedTitle").html(resources.lbTitleFormSectionForAdd + " [" + currentNode.name + "]");
    $("#sectionfieldset").prop('disabled', false);
    $("#chk_SendNotification").prop('disabled', false);
    $('#togglechk').find("div:first").removeAttr("disabled");
    $("#bt_AddSection").prop('disabled', true);
    $("#bt_EditSection").prop('disabled', true);
    $("#bt_DeleteSection").prop('disabled', true);
    $('#chk_SendNotification').prop('checked', false).change();
}
function DeleteSection() {
    if (!HasPermission(1, "sec-delete")) {
        ShowAlert(resources.RequestUnauthorizedMsg, resources.AccessDeniedTitle, "danger");
        return;
    }
    action = "Delete";
    $.confirm({
        title: resources.DeleteSectionTitle,
        content: resources.DeleteSectionConfirmationMsg.format(currentNode.name),
        confirmButton: resources.btDelete,
        cancelButton: resources.btCancel,
        confirmButtonClass: 'btn-danger',
        autoClose: 'cancel|15000',
        icon: 'fa fa-warning',
        animation: 'scalex',
        confirm: function () {
            var apiurl = prefixApiURL + "Sections/Delete/" + currentNode.id;
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
                    ShowAlert(data.Msg, resources.DeleteSectionTitle, "danger");
                }
                else {
                    RemoveNodeByID(currentNode.id);
                    RemoveRow(SectionTable, currentNode.id);
                    SelectNode(data.Result.sec_Parent)
                    SetSectionViewForView();
                    ShowAlert(data.Msg, resources.DeleteSectionTitle, "success");
                }
            }).fail(function (jqxhr, settings, exception) {
                ShowAlert(resources.DeleteSectionErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.DeleteSectionTitle, "danger");
            }).always(function () {
            });
        }
    });
}
function SaveSectionChange() {
    var apiurl = prefixApiURL + "Sections/" + action;
    var formdata = {
        "sec_Name": $("#txt_SecName_edit").val(),
        "sec_Parent": action == "Add" ? currentNode.id : currentNode.Parent,
        "sec_Location": $("#txt_SecLoc_edit").val(),
        "sec_manager": $("#txt_Select_Employee").attr('data-id'),
        "sec_No": $("#txt_SecNo_edit").val(),
        "sec_sch": $("#txt_Select_Schedule").attr('data-id'),
        "sec_sendnotif": $("#chk_SendNotification").prop('checked'),
        "sec_ID": currentNode.id
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
            ShowAlert(data.Msg, resources.SectionsMsgTitle, "danger");
        }
        else {
            if (action == "Add") {
                AppendNode(data.Result)
            }
            else if (action == "Update") {
                UpdateNode(data.Result)
            }
            SelectNode(data.Result.sec_ID)
            SetSectionViewForView();
            ShowAlert(data.Msg, resources.SectionsMsgTitle, "success");
        }
    }).fail(function (jqxhr, settings, exception) {
        ShowAlert(action == "Add" ? resources.AddSectionErrorMsg + GetErrorFromString(jqxhr.responseText).Msg : resources.SaveSectionErrorMsg + GetErrorFromString(jqxhr.responseText).Msg, resources.SectionsMsgTitle, "danger");
    }).always(function () {
    });

}
/////////////////////End Sctions Code////////////////////////////////