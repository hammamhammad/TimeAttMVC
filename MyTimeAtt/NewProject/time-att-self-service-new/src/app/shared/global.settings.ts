import { ResponseResult } from "./responseresult";

export class AppSettings {
  // public static get ReportApiUrl(): string { return '/timeattmvc/'; }
  // public static get WebApiUrl(): string { return '/TimeAttWebAPI/'; }
  // public static get ResourceUrl(): string { return '/TimeAttWebAPI/Anonymous/GetResources'; }
  // public static get IamHereUrl(): string { return '/TimeAttWebAPI/Anonymous/IamHere'; }
  // public static get CookiDomain(): string {return 'timeatt.t4edu.com';}

  public static get ReportApiUrl(): string {
    return "/";
  }
  public static get WebApiUrl(): string {
    return "http://mytimeatttest.com/TimeAttWebAPI/";
  }
  public static get ResourceUrl(): string {
    return "http://mytimeatttest.com/TimeAttWebAPI/Anonymous/GetResources";
  }
  public static get IamHereUrl(): string {
    return "http://mytimeatttest.com/TimeAttWebAPI/Anonymous/IamHere";
  }
  public static get CookiDomain(): string {
    //return "ontime.alkhorayef.com";
    return "mytimeatttest.com";
  }
  public static get DataTableLanguage() {
    return this.CurrentLang === "ar"
      ? this.DataTableARLanguage
      : this.DataTableENLanguage;
  }

  public static CurrentLang: string = "ar";
  public static resourceBundle = null;
  public static PublicUserInfo : ResponseResult | null;
  private static DataTableARLanguage = {
    decimal: "",
    emptyTable: "لا يوجد بيانات",
    info: "عرض من _START_ إلى _END_ من أصل _TOTAL_",
    infoEmpty: "",
    infoFiltered: "(منتقاة من مجموع _MAX_ مُدخل)",
    infoPostFix: "",
    thousands: ",",
    lengthMenu: "_MENU_",
    loadingRecords: "تحميل....",
    processing: "جاري التنفيذ....",
    search:
      '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>',
    zeroRecords: "لم يتم العثور على سجلات",
    paginate: {
      first: "الأول",
      last: "الأخير",
      next: "التالي",
      previous: "السابق"
    },
    aria: {
      sortAscending: ": فرز تصاعدي",
      sortDescending: ": فرز تنازلي"
    },
    searchPlaceholder: "بحث..."
  };
  private static DataTableENLanguage = {
    decimal: "",
    emptyTable: "No data available in table",
    info: "Showing _START_ to _END_ of _TOTAL_ entries",
    infoEmpty: "",
    infoFiltered: "(filtered from _MAX_ total entries)",
    infoPostFix: "",
    thousands: ",",
    lengthMenu: "_MENU_",
    loadingRecords: "Loading...",
    processing: "Processing...",
    search:
      '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>',
    zeroRecords: "No matching records found",
    paginate: {
      first: "First",
      last: "Last",
      next: "Next",
      previous: "Previous"
    },
    aria: {
      sortAscending: ": sort ascending",
      sortDescending: ": sort descending"
    },
    searchPlaceholder: "Search..."
  };
  public static get getCurrentLanguage(): string {
    let _culture = "ar";
    let cookie = document.cookie;
    if (cookie && cookie.length > 0 && cookie.indexOf("_culture") >= 0) {
      let cookiearry = document.cookie.split(";");
      let userinfo = "";
      cookiearry.forEach(e => {
        if (e.indexOf("_culture") >= 0) {
          _culture = e.split("_culture=")[1];
        }
      });
    }
    return _culture;
  }
}
