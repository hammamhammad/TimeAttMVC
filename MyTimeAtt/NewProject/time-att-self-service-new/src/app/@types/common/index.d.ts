declare interface String {
    stringFormat: (...arg: any) => string;
  }
  declare interface Number {
    FromOADate: () => Date;
    paddy: (p: any, c?: any) => string;
  }
  declare interface Date {
    ToOADate: () => number;
    daysInMonth: () => number;
    ToDateString: (format: string) => string;
  }
  
  declare interface JQuery{
    //collapse(d: any);
  }
  
  declare namespace DataTables {
  
  
    interface RowMethodsModel {
      (): any;
      show(select: any): Api;
      showRow(id: any, select: any): Api;
      updateRow(id: any, data: any, select: any): Api;
      addRow(data: any, select: any): Api;
      getRow(id: any): Api;
      deleteRow(id: any): Api;
      Exists(id: any): Api;
      drawRow(id: any): Api;
    }
    
    export interface Api extends CoreMethods {
      $(): JQuery;
      $(selectorF: string): JQuery;
      row: RowMethodsModel;
    }
}