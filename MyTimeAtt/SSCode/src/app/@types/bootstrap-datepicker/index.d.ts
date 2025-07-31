// Type definitions for bootstrap-datepicker
// Project: https://github.com/eternicode/bootstrap-datepicker
// Definitions by: Boris Yankov <https://github.com/borisyankov/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="jquery"/>

/**
 * All options that take a “Date” can handle a Date object; a String
 * formatted according to the given format; or a timedelta relative
 * to today, eg “-1d”, “+6m +1y”, etc, where valid units are “d” (day),
 * “w” (week), “m” (month), and “y” (year).
 *
 * See online docs for more info:
 *  https://bootstrap-datepicker.readthedocs.io/en/latest/options.html
 */
interface DefaultViewDate{
  year:number;
  month:number;
  day:number;
}
interface DatepickerOptions {
    format?: string | DatepickerCustomFormatOptions;
    weekStart?: number;
    startDate?: any;
    endDate?: any;
    autoclose?: boolean;
    startView?: number;
    todayBtn?: any;
    todayHighlight?: boolean;
    keyboardNavigation?: boolean;
    language?: string;
    beforeShowDay?: (date: any) => any;
    calendarWeeks?: boolean;
    clearBtn?: boolean;
    daysOfWeekDisabled?: number[];
    forceParse?: boolean;
    inputs?: any[];
    minViewMode?: any;
    multidate?: any;
    multidateSeparator?: string;
    orientation?: string;
    assumeNearbyYear?: any;
    viewMode?: string;
    templates?: any;
    zIndexOffset?: number;
    showOnFocus?: boolean;
    immediateUpdates?: boolean;
    title?: string;
    toggleActive?:boolean;
    container?:string;
    defaultViewDate?:DefaultViewDate;
    enableOnReadonly?:boolean;
}
interface TimepickerConfig{
     //Override where the dropdown is appended.
  //Takes either a string to use as a selector, a function that gets passed the clicked input element as argument or a jquery object to use directly.
  appendTo : string ;
  
    //A class name to apply to the HTML element that contains the timepicker dropdown.
    className : string
  
    //Close the timepicker when the window is scrolled. (Replicates <select> behavior.)
    closeOnWindowScroll : boolean ;
  
    //Disable selection of certain time ranges. Input is an array of time pairs, like `[['3:00am', '4:30am'], ['5:00pm', '8:00pm']]. The start of the interval will be disabled but the end won't. default: []
    disableTimeRanges : any[];
  
    //Disable typing in the timepicker input box; force users to select from list. More information here.
    disableTextInput : boolean ;
  
    //Disable the onscreen keyboard for touch devices. There can be instances where Firefox or Chrome have touch events enabled (such as on Surface tablets but not actually be a touch device. In this case disableTouchKeyboard will prevent the timepicker input field from being focused. More information here.
    disableTouchKeyboard : boolean ;
  
    //The time against which showDuration will compute relative times. If this is a function, its result will be used.
    durationTime : string;
  
    //Force update the time to step settings as soon as it loses focus.
    forceRoundTime : boolean ;
  
    //Language constants used in the timepicker. Can override the defaults by passing an object with one or more of the following properties: decimal, mins, hr, hrs.
    lang : Object ;
  
    //The time that should appear last in the dropdown list. Can be used to limit the range of time options.
    //default: 24 hours after minTime
    maxTime : string;
  
    //The time that should appear first in the dropdown list.
    minTime :string ;
  
    /**Adds one or more custom options to the top of the dropdown. Can accept several different value types:
    Boolean (true): Adds a "None" option that results in an empty input value
    String: Adds an option with a custom label that results in an empty input value
    Object: Similar to string, but allows customizing the element's class name and the resulting input value. Can contain label, value, and className properties. value must be a string type.
    Array: An array of strings or objects to add multiple non-time options **/
    noneOption : any;
  
    //By default the timepicker dropdown will be aligned to the bottom right of the input element, or aligned to the top left if there isn't enough room below the input. Force alignment with l (left), r (right), t (top), and b (bottom). Examples: tl, rb. default: 'l'
    orientation : string;
  
    //Function used to compute rounded times. The function will receive time in seconds and a settings object as arguments. The function should handle a null value for seconds. default: round to nearest step
    roundingFunction : Function;
  
    //If no time value is selected, set the dropdown scroll position to show the time provided, e.g. "09:00". A time string, Date object, or integer (seconds past midnight) is acceptible, as well as the string 'now'.
    scrollDefault : string;
  
    selectOnBlur : boolean;
    //Update the input with the currently highlighted time value when the timepicker loses focus.
  
    //Show "24:00" as an option when using 24-hour time format. You must also set timeFormat for this option to work.
    show2400 : boolean;
  
    //Shows the relative time for each item in the dropdown. minTime or durationTime must be set.
    showDuration : boolean;
  
    //Display a timepicker dropdown when the input fires a particular event. Set to null or an empty array to disable automatic display. Setting should be an array of strings. default: ['focus']
    showOn : string[];
  
  
    //The amount of time, in minutes, between each item in the dropdown. Alternately, you can specify a function to generate steps dynamically. The function will receive a count integer (0, 1, 2...) and is expected to return a step integer.
    step : number;
  
    //When scrolling on the edge of the picker, it prevent parent containers () to scroll. default: false
    stopScrollPropagation : boolean;
  
    //How times should be displayed in the list and input element. Uses PHP's date() formatting syntax. Characters can be escaped with a preceeding double slash (e.g. H\\hi). Alternatively, you can specify a function instead of a string, to use completely custom time formatting. In this case, the format function receives a Date object and is expected to return a formatted time as a string. default: 'g:ia'
    timeFormat : string;
  
    //Highlight the nearest corresponding time option as a value is typed into the form input.
    typeaheadHighlight : boolean ;
  
    //Convert the input to an HTML <SELECT> control. This is ideal for small screen devices, or if you want to prevent the user from entering arbitrary values. This option is not compatible with the following options: appendTo, closeOnWindowScroll, disableTouchKeyboard, forceRoundTime, scrollDefault, selectOnBlur, typeAheadHighlight.
    useSelect : boolean ;
  
    //If a time greater than 24 hours (27:30, for example) is entered, apply modolo 24 to create a valid time. Setting this to false will cause an input of 27:30 to result in a timeFormatError event.
    wrapHours : boolean ;
}
interface DatepickerCustomFormatOptions {
    toDisplay?(date: string, format: any, language: any): string;
    toValue?(date: string, format: any, language: any): Date;
}

interface DatepickerEventObject extends JQueryEventObject {
    date: Date;
    format(format?: string): string;
}

interface JQuery {
    datepicker(): JQuery;
    datepicker(methodName: string): any;
    datepicker(methodName: string, params: any): any;
    datepicker(options: DatepickerOptions): JQuery;
    timepicker(): JQuery;
    timepicker(methodName: string): any;
    timepicker(methodName: string, params: any): any;
    timepicker(options: TimepickerConfig): JQuery;

    off(events: "changeDate", selector?: string, handler?: (eventObject: DatepickerEventObject) => any): JQuery;
    off(events: "changeDate", handler: (eventObject: DatepickerEventObject) => any): JQuery;

    on(events: "changeDate", selector: string, data: any, handler?: (eventObject: DatepickerEventObject) => any): JQuery;
    on(events: "changeDate", selector: string, handler: (eventObject: DatepickerEventObject) => any): JQuery;
    on(events: 'changeDate', handler: (eventObject: DatepickerEventObject) => any): JQuery;
}
