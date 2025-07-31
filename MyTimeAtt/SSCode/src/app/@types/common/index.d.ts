declare interface String {
    stringFormat: (...arg) => string;
  }
  declare interface Number {
    FromOADate: () => Date;
    paddy: (p, c?) => string;
  }
  declare interface Date {
    ToOADate: () => number;
    daysInMonth: () => number;
    ToDateString: (format: string) => string;
  }
  
  declare interface JQuery{
    collapse(d);
  }
  
  declare namespace DataTables {
  
  
    interface RowMethodsModel {
      (): any;
      show(select): Api;
      showRow(id, select): Api;
      updateRow(id, data, select): Api;
      addRow(data, select): Api;
      getRow(id): Api;
      deleteRow(id): Api;
      Exists(id): Api;
      drawRow(id): Api;
    }
    
    export interface Api extends CoreMethods {
      $(): JQuery;
      $(selectorF): JQuery;
      row: RowMethodsModel;
    }
}