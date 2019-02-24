import normalize from "../scss/vendor/normalize.css";
//import skeleton from "../scss/vendor/skeleton.css";
import style from "../scss/main.scss";
//import img from "../images/wow.jpg";
import $ from "jquery";
import { callbackify } from "util";
//import {myFunc} from "./test.js";

// Functions meant to include the assets files if they can not be included via the css or html
//function requireAll(r) { r.keys().forEach(r); }
//requireAll(require.context('../assets/SVG/', true, /\.svg$/));
//requireAll(require.context('../assets/images/', true,  /\.(png|jpeg|jpg)$/));
//requireAll(require.context('../assets/videos/', true,  /\.(mp4|webm|mov)$/));

var TSR_Model = (function() {
  /* List of all collumns of information needed */
  var tableData = [
    {
      ActionNeeded: "Do things",
      AssessorFinalNotes: "these are my notes 1",
      CommentWeek1: "this is comment for week 1",
      CommentWeek2: "this is comment for week 2",
      CommentWeek3: "this is comment for week 3",
      CommentWeek4: "this is comment for week 4",
      CommentWeek5: "this is comment for week 5",
      CommentWeek6: "this is comment for week 6",
      CommentWeek7: "this is comment for week 7",
      ControlAssessor: "K3Bi",
      DataClassification: "Internal",
      DateIQUploaded: "2018-09-02T02:10:04Z",
      DateComplete: "2018-12-07T02:10:04Z",
      ID: 1,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: "2018-11-04T02:10:04Z",
      LOB: "Customer Care & CRE",
      OrderNumber: "123143",
      ProjectName: "GII Planning",
      Remediation_Notes: "These are my remediation Notes",
      Remediation_Status: "Remediation Complete",
      SMCWorkOrderNumber: "WO0000004126234",
      Third_x0020_Party_x0020_Name: "Radius Global Market",
      Tier: 1,
      TSr_x0020_Status: "Review Complete"
    },
    {
      ActionNeeded: "Do things",
      AssessorFinalNotes: "these are my notes 1",
      CommentWeek1: "this is comment for week 1",
      CommentWeek2: "this is comment for week 2",
      CommentWeek3: "this is comment for week 3",
      CommentWeek4: "this is comment for week 4",
      CommentWeek5: "this is comment for week 5",
      CommentWeek6: "this is comment for week 6",
      CommentWeek7: "this is comment for week 7",
      ControlAssessor: "K3bi",
      DataClassification: "Internal",
      DateIQUploaded: "2018-10-02T02:10:04Z",
      DateComplete: "2018-12-07T02:10:04Z",
      ID: 2,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: "2018-12-04T02:10:04Z",
      LOB: "Customer Care & CRE",
      OrderNumber: "7299462",
      ProjectName: "GII Planning",
      Remediation_Notes: "These are my remediation Notes",
      Remediation_Status: "Remediation Complete",
      SMCWorkOrderNumber: "WO00000983574",
      Third_x0020_Party_x0020_Name: "Admail West",
      Tier: 3,
      TSr_x0020_Status: "Review Complete"
    },
    {
      ActionNeeded: "Do things",
      AssessorFinalNotes: "these are my notes 1",
      CommentWeek1: "this is comment for week 1",
      CommentWeek2: "this is comment for week 2",
      CommentWeek3: "this is comment for week 3",
      CommentWeek4: "this is comment for week 4",
      CommentWeek5: "this is comment for week 5",
      CommentWeek6: "this is comment for week 6",
      CommentWeek7: "this is comment for week 7",
      ControlAssessor: "K3BI",
      DataClassification: "Internal",
      DateIQUploaded: "2018-10-02T02:10:04Z",
      DateComplete: "2018-12-07T02:10:04Z",
      ID: 3,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: "2018-11-04T02:10:04Z",
      LOB: "Customer Care & CRE",
      OrderNumber: "123143",
      ProjectName: "GII Planning",
      Remediation_Notes: "These are my remediation Notes",
      Remediation_Status: null,
      SMCWorkOrderNumber: "WO000000012643",
      Third_x0020_Party_x0020_Name: "Radius Global Market",
      Tier: 3,
      TSr_x0020_Status: "Review Complete"
    },
    {
      ActionNeeded: "Do things",
      AssessorFinalNotes: "these are my notes 1",
      CommentWeek1: "this is comment for week 1",
      CommentWeek2: "this is comment for week 2",
      CommentWeek3: "this is comment for week 3",
      CommentWeek4: "this is comment for week 4",
      CommentWeek5: "this is comment for week 5",
      CommentWeek6: "this is comment for week 6",
      CommentWeek7: "this is comment for week 7",
      ControlAssessor: "K3BI",
      DataClassification: "Internal",
      DateIQUploaded: "2018-10-02T02:10:04Z",
      DateComplete: "2018-12-07T02:10:04Z",
      ID: 4,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: "2018-11-04T02:10:04Z",
      LOB: "Customer Care & CRE",
      OrderNumber: "123143",
      ProjectName: "GII Planning",
      Remediation_Notes: "These are my remediation Notes",
      Remediation_Status: "Remediation Complete",
      SMCWorkOrderNumber: "WO000000012643",
      Third_x0020_Party_x0020_Name: "Radius Global Market",
      Tier: 3,
      TSr_x0020_Status: "Review Complete"
    },
    {
      ActionNeeded: "Do things",
      AssessorFinalNotes: "these are my notes 1",
      CommentWeek1: "this is comment for week 1",
      CommentWeek2: "this is comment for week 2",
      CommentWeek3: "this is comment for week 3",
      CommentWeek4: "this is comment for week 4",
      CommentWeek5: "this is comment for week 5",
      CommentWeek6: "this is comment for week 6",
      CommentWeek7: "this is comment for week 7",
      ControlAssessor: "K3BI",
      DataClassification: "Internal",
      DateIQUploaded: "2018-10-02T02:10:04Z",
      DateComplete: "2018-12-07T02:10:04Z",
      ID: 5,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: "2018-11-04T02:10:04Z",
      LOB: "Customer Care & CRE",
      OrderNumber: "123143",
      ProjectName: "GII Planning",
      Remediation_Notes: "These are my remediation Notes",
      Remediation_Status: "Remediation Complete",
      SMCWorkOrderNumber: "WO000000012643",
      Third_x0020_Party_x0020_Name: "Radius Global Market",
      Tier: 3,
      TSr_x0020_Status: "Review Complete"
    },
    {
      ActionNeeded: "Do things",
      AssessorFinalNotes: "these are my notes 1",
      CommentWeek1: "this is comment for week 1",
      CommentWeek2: "this is comment for week 2",
      CommentWeek3: "this is comment for week 3",
      CommentWeek4: "this is comment for week 4",
      CommentWeek5: "this is comment for week 5",
      CommentWeek6: "this is comment for week 6",
      CommentWeek7: "this is comment for week 7",
      ControlAssessor: "K3BI",
      DataClassification: "Internal",
      DateIQUploaded: "2018-10-02T02:10:04Z",
      DateComplete: "2018-12-07T02:10:04Z",
      ID: 6,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: "2018-11-04T02:10:04Z",
      LOB: "Customer Care & CRE",
      OrderNumber: "123143",
      ProjectName: "GII Planning",
      Remediation_Notes: "These are my remediation Notes",
      Remediation_Status: "Remediation Complete",
      SMCWorkOrderNumber: "WO000000012643",
      Third_x0020_Party_x0020_Name: "Radius Global Market",
      Tier: 3,
      TSr_x0020_Status: "Review Complete"
    },
    {
      ActionNeeded: "Do things",
      AssessorFinalNotes: "these are my notes 1",
      CommentWeek1: "this is comment for week 1",
      CommentWeek2: "this is comment for week 2",
      CommentWeek3: "this is comment for week 3",
      CommentWeek4: "this is comment for week 4",
      CommentWeek5: "this is comment for week 5",
      CommentWeek6: "this is comment for week 6",
      CommentWeek7: "this is comment for week 7",
      ControlAssessor: "K3BI",
      DataClassification: "Internal",
      DateIQUploaded: "2018-10-02T02:10:04Z",
      DateComplete: "2018-12-07T02:10:04Z",
      ID: 7,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: "2018-11-04T02:10:04Z",
      LOB: "Customer Care & CRE",
      OrderNumber: "123143",
      ProjectName: "GII Planning",
      Remediation_Notes: "These are my remediation Notes",
      Remediation_Status: "Remediation Complete",
      SMCWorkOrderNumber: "WO000000012643",
      Third_x0020_Party_x0020_Name: "Radius Global Market",
      Tier: 3,
      TSr_x0020_Status: "Review Complete"
    },
    {
      ActionNeeded: "Do things",
      AssessorFinalNotes: "these are my notes 1",
      CommentWeek1: "this is comment for week 1",
      CommentWeek2: "this is comment for week 2",
      CommentWeek3: "this is comment for week 3",
      CommentWeek4: "this is comment for week 4",
      CommentWeek5: "this is comment for week 5",
      CommentWeek6: "this is comment for week 6",
      CommentWeek7: "this is comment for week 7",
      ControlAssessor: "K3BI",
      DataClassification: "Internal",
      DateIQUploaded: "2018-10-02T02:10:04Z",
      DateComplete: "2018-12-07T02:10:04Z",
      ID: 8,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: "2018-11-04T02:10:04Z",
      LOB: "Customer Care & CRE",
      OrderNumber: "123143",
      ProjectName: "GII Planning",
      Remediation_Notes: "These are my remediation Notes",
      Remediation_Status: "Remediation Complete",
      SMCWorkOrderNumber: "WO000000012643",
      Third_x0020_Party_x0020_Name: "Radius Global Market",
      Tier: 3,
      TSr_x0020_Status: "Review Complete"
    },
    {
      ActionNeeded: "Do things",
      AssessorFinalNotes: "these are my notes 1",
      CommentWeek1: "this is comment for week 1",
      CommentWeek2: "this is comment for week 2",
      CommentWeek3: "this is comment for week 3",
      CommentWeek4: "this is comment for week 4",
      CommentWeek5: "this is comment for week 5",
      CommentWeek6: "this is comment for week 6",
      CommentWeek7: "this is comment for week 7",
      ControlAssessor: "K3BI",
      DataClassification: "Internal",
      DateIQUploaded: "2018-10-02T02:10:04Z",
      DateComplete: "2018-12-07T02:10:04Z",
      ID: 9,
      IsCEUD: false,
      IsPII: true,
      IsPHI: false,
      Last_x0020_Update: "2018-11-04T02:10:04Z",
      LOB: "Customer Care & CRE",
      OrderNumber: "123143",
      ProjectName: "GII Planning",
      Remediation_Notes: "These are my remediation Notes",
      Remediation_Status: "Remediation Complete",
      SMCWorkOrderNumber: "WO000000012643",
      Third_x0020_Party_x0020_Name: "Radius Global Market",
      Tier: 3,
      TSr_x0020_Status: "Review Complete"
    }
  ];

  // Helper Functions
  function showBtnSuccess(data, status) {
    console.log("You did the thing!!!")
    console.log(data);
    console.log(status);
  } 

  function showBtnFailure(status, error) {
    console.log("You did not do the thing!!!")
    console.log(error);
    console.log(status);
  } 

  function genericError(status , error) {
    console.log("You did not do the thing!!!")
    console.log(error);
    console.log(status);
  }

  return {
    getModifyTableData: function(usingSP, callback) {
      if (usingSP) {

        var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('tblAssessments')/items?$top=800&$filter=IsLegacyData eq false&$orderby=Id desc";
        $.ajax({
        url: requestUri,
        type: 'GET',
        headers: {
        'accept':'application/json; odata=verbose'
        },
        success: callback,
        error: genericError
        });

      } else {
        setTimeout(function() {
          callback(tableData);
        }, 500);
      }
    },
    getSingleModifyAssessment: function(usingSP, ID, callback) {
      if (usingSP) {

        $.ajax  
        ({  
          url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('tblAssessments')/items("+ID+")",
          type: "GET",  
          headers:  
          {  
              "Accept": "application/json;odata=verbose",  // Requests that return SharePoint metadata
          },  
          success: callback,  
          error: function(data)  
          {  
              alert("Item Not Avilible");
              
          }  
        }); 

      } else {
        setTimeout(function() {
          callback(tableData[assessment - 1]);
        }, 500);
      }
    },
    postSingleAssessment: function(usingSP, id , columnName, value, callback) {
      var myDate = new Date();
      var myObj = {
        __metadata: {
          type: "SP.ListItem",
        }
      }
      myObj[columnName] = value;
      myObj.Last_x0020_Update = myDate.toISOString(); 

      if(usingSP) {

        $.ajax  
        ({  
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('tblAssessments')/items(" + id + ")", // list item ID  
            type: "POST",  
            data: JSON.stringify  
            (myObj),  
            headers:  
            {  
                "Accept": "application/json;odata=verbose",  
                "Content-Type": "application/json;odata=verbose",  
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
                "IF-MATCH": "*",  
                "X-HTTP-Method": "MERGE"  
            },  
            success: callback,  
            error: showBtnFailure
        });

      }
      else {
        setTimeout(function() {
          //callback(tableData[assessment - 1]);
          console.log('information Posted')
        }, 500);
      }
    }
  };
})();

var TSR_View = (function() {
  var modifyFormElements = [
    {
      show: true,
      eleID: "K_vendorName",
      colName: "Third_x0020_Party_x0020_Name"
    },
    {
      show: true,
      eleID: "K_LOB",
      colName: "LOB"
    },
    {
      show: true,
      eleID: "K_orderNum",
      colName: "OrderNumber"
    },
    {
      show: true,
      eleID: "K_Tier",
      colName: "Tier"
    },
    {
      show: true,
      eleID: "K_dateStarted",
      colName: "DateIQUploaded"
    },
    {
      show: true,
      eleID: "K_workOrderNum",
      colName: "SMCWorkOrderNumber"
    },
    {
      show: true,
      eleID: "K_infoClass",
      colName: "DataClassification"
    },
    {
      show: true,
      eleID: "K_assessor",
      colName: "ControlAssessor"
    },
    {
      show: true,
      eleID: "K_projectName",
      colName: "ProjectName"
    },
    {
      show: false,
      eleID: "K_contactTitle",
      colName: ""
    },
    {
      show: false,
      eleID: "K_generalStatus",
      colName: ""
    },
    {
      show: false,
      eleID: "K_actionNeeded",
      colName: ""
    },
    {
      show: true,
      eleID: "K_commentsWeek1",
      colName: "CommentWeek1"
    },
    {
      show: true,
      eleID: "K_commentsWeek2",
      colName: "CommentWeek2"
    },
    {
      show: true,
      eleID: "K_commentsWeek3",
      colName: "CommentWeek3"
    },
    {
      show: true,
      eleID: "K_commentsWeek4",
      colName: "CommentWeek4"
    },
    {
      show: true,
      eleID: "K_commentsWeek5",
      colName: "CommentWeek5"
    },
    {
      show: true,
      eleID: "K_commentsWeek6",
      colName: "CommentWeek6"
    },
    {
      show: true,
      eleID: "K_commentsWeek7",
      colName: "CommentWeek7"
    },
    {
      show: true,
      eleID: "K_assessorNotes",
      colName: "AssessorFinalNotes"
    },
    {
      show: true,
      eleID: "K_remediationStatus",
      colName: "Remediation_Status"
    },
    {
      show: true,
      eleID: "K_remediationNotes",
      colName: "Remediation_Notes"
    }
  ];

  return {
    renderModifyTable: function(data) {
      var content = "";
      var date1;
      var date2;
      var date3;
      //var flag = true;
      //var start;
      //var end;


      //start = new Date();
      //console.log("start : ", start);

      data.forEach(function(record) {
        date1 = new Date(record.DateIQUploaded);
        date2 = new Date(record.DateComplete);
        date3 = new Date(record.Last_x0020_Update);

        content = content + "<tr class='tableBody__row'>";

        content = content + "<td class='tableBody__row__col'>" + record.ID + "</td>";
        content = content + "<td class='tableBody__row__col'>" + record.Third_x0020_Party_x0020_Name + "</td>";
        content = content + "<td class='tableBody__row__col'>" + record.LOB + "</td>";
        content = content + "<td class='tableBody__row__col'>" + record.IsCEUD + "</td>";
        content = content + "<td class='tableBody__row__col'>" + record.IsPII + "</td>";
        content = content + "<td class='tableBody__row__col'>" + record.IsPHI + "</td>";
        content = content + "<td class='tableBody__row__col'>" + (record.DateIQUploaded === null ? null : ((date1.getMonth() + 1) + "/" + date1.getDate() + "/" + date1.getFullYear())) + "</td>";
        content = content + "<td class='tableBody__row__col'>" + (record.DateComplete === null ? null : ((date2.getMonth() + 1) + "/" + date2.getDate() + "/" + date2.getFullYear())) + "</td>";
        content = content + "<td class='tableBody__row__col'>" + record.ControlAssessor.toUpperCase() + "</td>";
        content = content + "<td class='tableBody__row__col'>" + record.TSr_x0020_Status + "</td>";
        content = content + "<td class='tableBody__row__col'>" + (record.Last_x0020_Update === null ? null : ((date3.getMonth() + 1) + "/" + date3.getDate() + "/" + date3.getFullYear())) + "</td>";

        content = content + "</tr>";
      });


      $(".tableBody").html(content);
      //end = new Date();
      //console.log("End : ", end);
      //console.log("total : ", end - start );
    },
    renderAssessorTable: function() {},
    renderModifyElements: function(data) {
      var date1;
      modifyFormElements.forEach(function(ele) {
        if (ele.show) {
          if (ele.colName === "DateIQUploaded") {
            date1 = new Date(data[ele.colName]);
            if (/Trident\/|MSIE /.test(window.navigator.userAgent)) {
              $("#" + ele.eleID).val(date1.toLocaleDateString());
            } else {
              $("#" + ele.eleID).val(
                date1.getFullYear() +
                  "-" +
                  (date1.getMonth().toString().length === 1
                    ? "0" + date1.getMonth().toString()
                    : date1.getMonth()) +
                  "-" +
                  (date1.getDate().toString().length === 1
                    ? "0" + date1.getDate().toString()
                    : date1.getDate())
              );
            }
          } else if (ele.colName === "ControlAssessor") {
            $("#" + ele.eleID).val(data[ele.colName].toUpperCase());
          } else {
            $("#" + ele.eleID).val(data[ele.colName]);
          }
        }
      });
    }
  };
})();

var TSR_App = (function(model, view) {
  var state = {
    modifyTable: {
      currentAssessment: null,
      currentRow: null
    },
    usingSP: true
  };

  var buttons = [
    {
      active: false,
      eleID: "K_vendorName",
      colName: "Third_x0020_Party_x0020_Name",
      btnID: 'btn-1',
      uiColID: 1
    },
    {
      active: true,
      eleID: "K_LOB",
      colName: "LOB",
      btnID: 'btn-2',
      uiColID: 2
    },
    {
      active: true,
      eleID: "K_orderNum",
      colName: "OrderNumber",
      btnID: 'btn-3',
      uiColID: null
    },
    {
      active: true,
      eleID: "K_Tier",
      colName: "Tier",
      btnID: 'btn-4',
      uiColID: null
    },
    {
      active: true,
      eleID: "K_dateStarted",
      colName: "DateIQUploaded",
      btnID: 'btn-5',
      uiColID: 6
    },
    {
      active: true,
      eleID: "K_workOrderNum",
      colName: "SMCWorkOrderNumber",
      btnID: 'btn-6',
      uiColID: null
    },
    {
      active: true,
      eleID: "K_infoClass",
      colName: "DataClassification",
      btnID: 'btn-7',
      uiColID: null
    },
    {
      active: true,
      eleID: "K_assessor",
      colName: "ControlAssessor",
      btnID: 'btn-8',
      uiColID: 8
    },
    {
      active: true,
      eleID: "K_projectName",
      colName: "ProjectName",
      btnID: 'btn-9',
      uiColID: null
    },
    {
      active: false,
      eleID: "K_generalStatus",
      colName: "",
      btnID: 'btn-10',
      uiColID: null
    },
    {
      active: false,
      eleID: "K_actionNeeded",
      colName: "",
      btnID: 'btn-11',
      uiColID: null
    },
    {
      active: true,
      eleID: "K_commentsWeek1",
      colName: "CommentWeek1",
      btnID: 'btn-12',
      uiColID: null
    },
    {
      active: true,
      eleID: "K_commentsWeek2",
      colName: "CommentWeek2",
      btnID: 'btn-13',
      uiColID: null
    },
    {
      active: true,
      eleID: "K_commentsWeek3",
      colName: "CommentWeek3",
      btnID: 'btn-14',
      uiColID: null
    },
    {
      active: true,
      eleID: "K_commentsWeek4",
      colName: "CommentWeek4",
      btnID: 'btn-15',
      uiColID: null
    },
    {
      active: true,
      eleID: "K_commentsWeek5",
      colName: "CommentWeek5",
      btnID: 'btn-16',
      uiColID: null
    },
    {
      active: true,
      eleID: "K_commentsWeek6",
      colName: "CommentWeek6",
      btnID: 'btn-17',
      uiColID: null
    },
    {
      active: true,
      eleID: "K_commentsWeek7",
      colName: "CommentWeek7",
      btnID: 'btn-18',
      uiColID: null
    },
    {
      active: true,
      eleID: "K_assessorNotes",
      colName: "AssessorFinalNotes",
      btnID: 'btn-19',
      uiColID: null
    },
    {
      active: true,
      eleID: "K_remediationStatus",
      colName: "Remediation_Status",
      btnID: 'btn-20',
      uiColID: null
    },
    {
      active: true,
      eleID: "K_remediationNotes",
      colName: "Remediation_Notes",
      btnID: 'btn-21',
      uiColID: null
    }
  ]


  return {
    initialize: function() {
      /*  Table functionality to synchronize horizontal scroll */
      $(".tableContainer__bottom").on("scroll", function() {
        $(".tableContainer__top").scrollLeft($(this).scrollLeft());
      });

      /* Highlights the row that is clicked on inside the table*/
      $(".tableBody__row").click(function() {
        var selected = $(this).hasClass("tableBody__row__selected");
        if (!selected) {
          $(".tableBody__row").removeClass("tableBody__row__selected");
          $(this).addClass("tableBody__row__selected");
        }
      });

      /* Main tab functionality*/
      $(".mainContainer__header--tab").each(function() {
        $(this).on("click", function() {
          $(".mainContainer__header--tab").each(function() {
            $(this).removeClass("tabActive");
          });

          $(this).addClass("tabActive");

          $(".tabcontent").each(function() {
            $(this).css("display", "none");
          });

          if ($(this).hasClass("tab1")) {
            $("#Begin").css("display", "block");
          } else if ($(this).hasClass("tab2")) {
            $("#Modify").css("display", "block");
          } else if ($(this).hasClass("tab3")) {
            $("#Task").css("display", "block");
          } else if ($(this).hasClass("tab4")) {
            $("#Report").css("display", "block");
          } else {
            console.log("no tabs were matched");
          }
        });
      });

      $(".tab2").click();

      /* Secondary tab functionality*/
      $(".tabs__header--tab").each(function() {
        $(this).on("click", function() {
          $(".tabs__header--tab").each(function() {
            $(this).removeClass("tabs__Active");
          });

          $(this).addClass("tabs__Active");

          $(".tabs__body--content").each(function() {
            $(this).css("display", "none");
          });

          if ($(this).hasClass("option-1")) {
            $("#option-1").css("display", "block");
          } else if ($(this).hasClass("option-2")) {
            $("#option-2").css("display", "block");
          } else if ($(this).hasClass("option-3")) {
            $("#option-3").css("display", "block");
          } else if ($(this).hasClass("option-4")) {
            $("#option-4").css("display", "block");
          } else if ($(this).hasClass("option-5")) {
            $("#option-5").css("display", "block");
          } else if ($(this).hasClass("option-6")) {
            $("#option-6").css("display", "block");
          } else {
            console.log("no tabs were matched");
          }
        });
      });

      $(".option-1").click();
    },
    setButtons: function() {
      buttons.forEach(function(ele) {
        if(ele.active) {

          $('#' + ele.btnID).click(function() {

            if (!(state.modifyTable.currentAssessment === null)) {
              model.postSingleAssessment(state.usingSP , state.modifyTable.currentAssessment , ele.colName , $('#' + ele.eleID).val(), function(data) {
                var myDate = new Date();
                if (!(ele.uiColID === null)) {
                  state.modifyTable.currentRow.children().eq(ele.uiColID).text( $('#' + ele.eleID).val() );
                }
                state.modifyTable.currentRow.children().eq(10).text( ((myDate.getMonth() + 1) + "/" + myDate.getDate() + "/" + myDate.getFullYear()) );
              });
            }
            else {
              $.toast({
                heading: 'Warning',
                text: 'Please click an assessment',
                showHideTransition: 'plain',
                icon: 'warning'
            })
            }
           
          })
        }
      });
    },
    setModifyTable: function() {

      //Get list of all assessments
      model.getModifyTableData(state.usingSP, function(data) {

        //render the list of assessments
        view.renderModifyTable(data.d.results);

        //add functionality when user selects a row

        $(".tableBody__row").click(function() {
          if (!(state.modifyTable.currentRow === null)) {
            state.modifyTable.currentRow.removeClass("tableBody__row__selected");
          }

          state.modifyTable.currentRow = $(this);
          state.modifyTable.currentAssessment = state.modifyTable.currentRow.children(":first").text();
          state.modifyTable.currentRow.addClass("tableBody__row__selected");
        
          model.getSingleModifyAssessment(state.usingSP, state.modifyTable.currentAssessment , function(data) {
            view.renderModifyElements(data.d);
          });
        
        });

      });

    },
    setCurrentAssessment: function(id) {
      state.currentAssessment = id;
    },
    getCurrentAssessment: function() {
      return state.currentAssessment;
    }
  };
})(TSR_Model, TSR_View);


$(document).ready(function() {
  console.log('Webpage is Ready');

  TSR_App.initialize();
  TSR_App.setModifyTable();
  TSR_App.setButtons();


})