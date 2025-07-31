using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TimeAtt;
using TimeAtt.Model.Models;
using TimeAtt.Models;
using TimeAtt.Security;

namespace TimeAttWebAPI.Controllers
{
    [RoutePrefix("TimeSheet")]
    [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-view")]
    public class TimeSheetController : ApiController
    {
        private TransReasonRepository transReasonRepository;
        private TimeSheetRepositry timeSheetRepositry;
        public TimeSheetController()
        {
            this.transReasonRepository = new TransReasonRepository();
            this.timeSheetRepositry = new TimeSheetRepositry();
        }
        public TimeSheetController(TransReasonRepository transReasonRepository, TimeSheetRepositry timeSheetRepositry)
        {
            this.transReasonRepository = transReasonRepository;
            this.timeSheetRepositry = timeSheetRepositry;
        }
        #region Reasons

        [HttpGet]
        [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-transreason")]
        [Route("Reasons/GetByID/{id}")]
        [ResponseType(typeof(ResponseResult<TransReason>))]
        public HttpResponseMessage GetReason(int id)
        {
            //return sectionsRepository.GetSingle(id);
            HttpResponseMessage response = null;
            try
            {
                var Result = transReasonRepository.GetSingle(id);
                //object myresult =  new  {data = result  };
                var responeResult = new ResponseResult<TransReason>("1", Resources.Resources.SuccessRetrievedDataMsg, Result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Reasons/GetAll")]
        [ResponseType(typeof(ResponseResult<IEnumerable<TransReason>>))]

        public HttpResponseMessage GetAllReasons()
        {
            //return sectionsRepository.GetSingle(id);
            HttpResponseMessage response = null;
            try
            {
                var Result = transReasonRepository.GetAll();
                //object myresult =  new  {data = result  };
                var responeResult = new ResponseResult<IEnumerable<TransReason>>("1", Resources.Resources.SuccessRetrievedDataMsg, Result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }

        [HttpPost]
        [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-transreason")]
        [Route("Reasons/Add")]
        [ResponseType(typeof(ResponseResult<TransReason>))]
        public HttpResponseMessage AddReason([FromBody] TransReason Reason)
        {

            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var NewID = transReasonRepository.Add(Credential.Username, Reason);

                if (NewID > 0)
                {
                    var Result = transReasonRepository.GetSingle(NewID);
                    var responeResult = new ResponseResult<TransReason>("1", Resources.Resources.SuccessAddDataMsg, Result);

                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<TransReason>("0", Resources.Resources.AddTransReasonErrorMsg, Reason);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.AddTransReasonErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }
        [HttpPost]
        [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-transreason")]
        [Route("Reasons/Update")]
        [ResponseType(typeof(ResponseResult<TransReason>))]
        public HttpResponseMessage UpdateReason([FromBody] TransReason Reason)
        {

            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var RowsEffected = transReasonRepository.Update(Credential.Username, Reason);

                if (RowsEffected > 0)
                {

                    var responeResult = new ResponseResult<TransReason>("1", Resources.Resources.SuccessSaveDataMsg, Reason);

                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<TransReason>("0", Resources.Resources.SaveTransReasonErrorMsg, Reason);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveTransReasonErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }

        [HttpPost]
        [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-transreason")]
        [Route("Reasons/Delete/{ID}")]
        [ResponseType(typeof(ResponseResult<TransReason>))]
        public HttpResponseMessage DeleteReason(int ID)
        {

            HttpResponseMessage response = null;
            try
            {
                TransReason Reason = transReasonRepository.GetSingle(ID);
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var ReturnValue = transReasonRepository.Delete(Credential.Username, ID);
                if (ReturnValue > 0)
                {
                    var responeResult = new ResponseResult<TransReason>("1", Resources.Resources.SuccessDeleteMsg, Reason);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    string msg = "";
                    if (ReturnValue == 0)
                        msg = Resources.Resources.YouCannotDeleteTrasnsReasonelatedTrans;
                    var responeResult = new ResponseResult<TransReason>("0", Resources.Resources.DeleteTrasnsReasonErrorMsg + Environment.NewLine + msg, Reason);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.DeleteTrasnsReasonErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }
        #endregion

        #region Daily
        [HttpGet]
        [Route("Daily/GetAll")]
        [ResponseType(typeof(ResponseResult<DataTableData<DailyTimeSheet>>))]
        [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-daily")]
        public HttpResponseMessage GetDailyTimeSheetPaging()
        {

            Dictionary<string, string> QueryString = Request.GetQueryStrings();
            int? Sec_ID = QueryString["Sec_ID"].ToInt();
            long? Reg_ID = QueryString["Reg_ID"].ToLong();
            int? Emp_ID = QueryString["Emp_ID"].ToInt();
            //string Emp_Loc = QueryString["Emp_Loc"].ToNullableString();
            int FromDate = QueryString["FromDate"].ToInt();
            int ToDate = QueryString["ToDate"].ToInt();

            string RowFilter = QueryString["RowFilter"].ToString();

            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var result = timeSheetRepositry.GetDailyTimeSheet(Credential.Username, FromDate, ToDate, Emp_ID, Sec_ID, Reg_ID, RowFilter, Resources.Resources.lang, QueryString);//, Emp_Loc);
                var responeResult = new ResponseResult<DataTableData<DailyTimeSheet>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpGet]
        [Route("Daily/GetDailyTimeSheet/{empno}/{date?}")]
        [ResponseType(typeof(ResponseResult<IEnumerable<DailyTimeSheet>>))]
        [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-daily")]
        public HttpResponseMessage GetDailyTimeSheet(string empno, DateTime? date = null)
        {
            HttpResponseMessage response = null;
            try
            {
                if (!date.HasValue)
                    date = DateTime.Now.Date;
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var employeesRepository = new EmployeesRepository();
                var empresult = employeesRepository.GetSingle(empno);
                var searchDailyParameter = new FormParameters()
                {
                    Emp_ID = empresult.emp_id,
                    FromDate = date.GetNumberFromDate(),
                    ToDate = date.GetNumberFromDate()
                };
                employeesRepository.Dispose();
                var result = timeSheetRepositry.GetDailyTimeSheet(Credential.Username, searchDailyParameter, Resources.Resources.lang);
                var responeResult = new ResponseResult<DailyTimeSheet>("1", Resources.Resources.SuccessRetrievedDataMsg, result.FirstOrDefault());
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpGet]
        [Route("Daily/GetDailyTimeSheetMT/{date?}")]
        [ResponseType(typeof(ResponseResult<IEnumerable<DailyTimeSheet>>))]
        [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-daily")]
        public HttpResponseMessage GetDailyTimeSheetMT(DateTime? date = null)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (!date.HasValue)
                    date = DateTime.Now.Date;
                var result = timeSheetRepositry.GetDailyTimeSheet(date.GetNumberFromDate(), Resources.Resources.lang);
                var responeResult = new ResponseResult<IEnumerable<DailyTimeSheet>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpPost]
        [Route("Daily/GetDailyTimeSheet")]
        [ResponseType(typeof(ResponseResult<IEnumerable<DailyTimeSheet>>))]
        [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-daily")]
        public HttpResponseMessage GetDailyTimeSheet([FromBody] FormParameters searchDailyParameter)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                // var cult = CultureHelper.GetCurrentCulture();
                var thelang = Request.Headers.AcceptLanguage.FirstOrDefault();
                var lang = "ar";
                if (thelang == null)
                {
                    lang = Resources.Resources.lang;
                }
                else
                {
                    lang = thelang.Value;
                }
                var result = timeSheetRepositry.GetDailyTimeSheet(Credential.Username, searchDailyParameter, lang);
                var responeResult = new ResponseResult<IEnumerable<DailyTimeSheet>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }

        [HttpGet]
        [Route("Daily/GetTransactionDetails/{dateno}/{emp_id}")]
        [ResponseType(typeof(ResponseResult<DailyTransactions>))]
        [CustomAuthorize(GroupNo = "5", PermissionName = "trans-view")]
        public HttpResponseMessage GetTransactionDetails(int dateno, int emp_id)
        {
            HttpResponseMessage response = null;
            try
            {
                var resultDaily = timeSheetRepositry.GetDailyTimeSheet(dateno, emp_id, Resources.Resources.lang).SingleOrDefault();
                var resultTrans = timeSheetRepositry.GetTransactions(dateno, emp_id, Resources.Resources.lang);
                var data = new DailyTransactions
                {
                    Daily = resultDaily,
                    Trans = resultTrans
                };
                var responeResult = new ResponseResult<DailyTransactions>("1", Resources.Resources.SuccessRetrievedDataMsg, data);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpGet]
        [Route("Daily/GetTransactionDetailsForEmployee/{empno}/{date?}")]
        [ResponseType(typeof(ResponseResult<DailyTransactions>))]
        [CustomAuthorize(GroupNo = "5", PermissionName = "trans-view")]
        public HttpResponseMessage GetTransactionDetails(string empno, DateTime? date = null)
        {
            HttpResponseMessage response = null;
            try
            {
                if (!date.HasValue)
                    date = DateTime.Now.Date;
                var employeesRepository = new EmployeesRepository();
                var empresult = employeesRepository.GetSingle(empno);
                var FromDate = date.GetNumberFromDate();
                var EMPID = empresult.emp_id;

                employeesRepository.Dispose();
                var resultDaily = timeSheetRepositry.GetDailyTimeSheet(FromDate, EMPID, Resources.Resources.lang).SingleOrDefault();
                var resultTrans = timeSheetRepositry.GetTransactions(FromDate, EMPID, Resources.Resources.lang);
                var data = new DailyTransactions
                {
                    Daily = resultDaily,
                    Trans = resultTrans
                };
                var responeResult = new ResponseResult<DailyTransactions>("1", Resources.Resources.SuccessRetrievedDataMsg, data);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpGet]
        [Route("Daily/GetTransactionByID/{TransID}")]
        [ResponseType(typeof(ResponseResult<Transactions>))]
        [CustomAuthorize(GroupNo = "5", PermissionName = "trans-view")]
        public HttpResponseMessage GetTransactionDetails(long TransID)
        {
            HttpResponseMessage response = null;
            try
            {

                var resultTrans = timeSheetRepositry.GetTransactionByID(TransID, Resources.Resources.lang);

                var responeResult = new ResponseResult<Transactions>("1", Resources.Resources.SuccessRetrievedDataMsg, resultTrans);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpPost]
        [Route("Daily/AddTrans")]
        [ResponseType(typeof(ResponseResult<Transactions>))]
        [CustomAuthorize(GroupNo = "5", PermissionName = "trans-add")]
        public HttpResponseMessage AddTrans([FromBody] Transactions Trans)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var result = timeSheetRepositry.AddTransactions(Trans, Credential.Username);
                if (result > 0)
                {
                    var NewTransData = timeSheetRepositry.GetTransactionByID(result, Resources.Resources.lang);
                    var responeResult = new ResponseResult<Transactions>("1", Resources.Resources.SuccessSaveDataMsg, NewTransData);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<Transactions>("0", Resources.Resources.AddTransErrorMsg, Trans);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.AddTransErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpPost]
        [Route("Daily/AddUpdateTransMT")]
        [ResponseType(typeof(ResponseResult<TransactionsMT>))]
        [CustomAuthorize(GroupNo = "5", PermissionName = "trans-add")]
        public HttpResponseMessage AddUpdateTransMT([FromBody] TransactionsMT Trans)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var result = timeSheetRepositry.AddUpdateTransactionsMT(Trans, Credential.Username);
                if (result > 0)
                {
                    var NewTransData = timeSheetRepositry.GetTransactionByID(result, Resources.Resources.lang);
                    var responeResult = new ResponseResult<Transactions>("1", Resources.Resources.SuccessSaveDataMsg, NewTransData);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<TransactionsMT>("0", Resources.Resources.AddTransErrorMsg + ' ' + "Employee not in group", Trans);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.AddTransErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpPost]
        [Route("Daily/UpdateTrans")]
        [ResponseType(typeof(ResponseResult<Transactions>))]
        [CustomAuthorize(GroupNo = "5", PermissionName = "trans-edit")]
        public HttpResponseMessage UpdateTrans([FromBody] Transactions Trans)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var result = timeSheetRepositry.UpdateTransactions(Trans, Credential.Username);
                if (result > 0)
                {
                    var UpdatedTransData = timeSheetRepositry.GetTransactionByID(Trans.trans_id, Resources.Resources.lang);
                    var responeResult = new ResponseResult<Transactions>("1", Resources.Resources.SuccessSaveDataMsg, UpdatedTransData);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<Transactions>("0", Resources.Resources.SaveTransErrorMsg, Trans);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveTransErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpPost]
        [Route("Daily/DeleteTrans/{TransID}")]
        [ResponseType(typeof(ResponseResult<Transactions>))]
        [CustomAuthorize(GroupNo = "5", PermissionName = "trans-include")]
        public HttpResponseMessage DeleteTrans(long TransID)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var result = timeSheetRepositry.DeleteTransactions(TransID, Credential.Username);
                if (result > 0)
                {
                    var UpdatedTransData = timeSheetRepositry.GetTransactionByID(TransID, Resources.Resources.lang);
                    var responeResult = new ResponseResult<Transactions>("1", Resources.Resources.SuccessSaveDataMsg, UpdatedTransData);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<Transactions>("0", Resources.Resources.DeleteTransErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.DeleteTransErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpPost]
        [Route("Daily/UpdateShift/{EmpID}/{mDate}/{newShiftID}")]
        [ResponseType(typeof(ResponseResult<DailyTimeSheet>))]
        [CustomAuthorize(GroupNo = "5", PermissionName = "trans-edit")]
        public HttpResponseMessage UpdateShift(int EmpID, int mDate, int newShiftID)
        {

            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var result = timeSheetRepositry.UpdateShift(EmpID, mDate, newShiftID, Credential.Username);
                if (result > 0)
                {
                    var UpdatedDailyData = timeSheetRepositry.GetSingle(mDate, EmpID, Resources.Resources.lang);
                    var responeResult = new ResponseResult<DailyTimeSheet>("1", Resources.Resources.SuccessSaveDataMsg, UpdatedDailyData);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<DailyTimeSheet>("0", Resources.Resources.SaveShiftErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveShiftErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpPost]
        [Route("Daily/UpdateTransactionShiftMT/{EmpNO}/{mDate}/{newShiftID}")]
        [ResponseType(typeof(ResponseResult<DailyTimeSheet>))]
        [CustomAuthorize(GroupNo = "5", PermissionName = "trans-edit")]
        public HttpResponseMessage UpdateShiftMT(long EmpNO, DateTime mDate, int newShiftID)
        {

            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var result = timeSheetRepositry.UpdateShiftMT(EmpNO, mDate.GetNumberFromDate(), newShiftID, Credential.Username);

                if (result > 0)
                {
                    var employeesRepository = new EmployeesRepository();
                    var empresult = employeesRepository.GetSingle(EmpNO.ToString());
                    var UpdatedDailyData = timeSheetRepositry.GetSingle(mDate.GetNumberFromDate(), empresult.emp_id, Resources.Resources.lang);
                    var responeResult = new ResponseResult<DailyTimeSheet>("1", Resources.Resources.SuccessSaveDataMsg, UpdatedDailyData);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<DailyTimeSheet>("0", Resources.Resources.SaveShiftErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveShiftErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }

        #endregion

        #region Monthly
        [HttpGet]
        [Route("Monthly/GetAll")]
        [ResponseType(typeof(ResponseResult<DataTableData<MonthlyTimeSheet>>))]
        [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-monthly")]
        public HttpResponseMessage GetMonthlyTimeSheetPaging()
        {

            Dictionary<string, string> QueryString = Request.GetQueryStrings();
            int? Sec_ID = QueryString["Sec_ID"].ToInt();
            string emp_loc = QueryString["Emp_Loc"].ToString();
            long? Reg_ID = QueryString["Reg_ID"].ToLong();
            int? Emp_ID = QueryString["Emp_ID"].ToInt();
            int FromDate = QueryString["FromDate"].ToInt();
            int ToDate = QueryString["ToDate"].ToInt();
            string RowFilter = QueryString["RowFilter"].ToString();

            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var result = timeSheetRepositry.GetMonthlyTimeSheet(Credential.Username, FromDate, ToDate, Emp_ID, Sec_ID, emp_loc, Reg_ID, RowFilter, Resources.Resources.lang, QueryString);
                var responeResult = new ResponseResult<DataTableData<MonthlyTimeSheet>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpPost]
        [Route("Monthly/GetMonthlyTimeSheet")]
        [ResponseType(typeof(ResponseResult<IEnumerable<MonthlyTimeSheet>>))]
        [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-monthly")]
        public HttpResponseMessage GetMonthlyTimeSheet([FromBody] FormParameters Para)
        {


            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var thelang = Request.Headers.AcceptLanguage.FirstOrDefault();
                var lang = "ar";
                if (thelang == null)
                {
                    lang = Resources.Resources.lang;
                }
                else
                {
                    lang = thelang.Value;
                }
                var result = timeSheetRepositry.GetMonthlyTimeSheet(Credential.Username, lang, Para);
                var responeResult = new ResponseResult<IEnumerable<MonthlyTimeSheet>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpPost]
        [Route("Monthly/GetDetails")]
        [ResponseType(typeof(ResponseResult<MonthlyDailyTimeSheet>))]
        [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-monthly")]
        public HttpResponseMessage GetMonthlyTimeSheetGetDetails([FromBody] FormParameters Para)
        {
            // Dictionary<string, string> QueryString = Request.GetQueryStrings();
            int Emp_ID = Para.Emp_ID.Value; //QueryString["Emp_ID"].ToInt();
            int FromDate = Para.FromDate;//QueryString["FromDate"].ToInt();
            int ToDate = Para.ToDate;//QueryString["ToDate"].ToInt();

            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var thelang = Request.Headers.AcceptLanguage.FirstOrDefault();
                var lang = "ar";
                if (thelang == null)
                {
                    lang = Resources.Resources.lang;
                }
                else
                {
                    lang = thelang.Value;
                }
                var resultDetails = timeSheetRepositry.GetMothlyTimeSheetDetails(Credential.Username, FromDate, ToDate, Emp_ID, lang);
                var resultMonthly = timeSheetRepositry.GetMonthlyTimeSheetSummary(Credential.Username, FromDate, ToDate, Emp_ID, lang);
                var result = new MonthlyDailyTimeSheet
                {
                    Details = resultDetails,
                    Summary = resultMonthly
                };
                var responeResult = new ResponseResult<MonthlyDailyTimeSheet>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }

        [HttpGet]
        [Route("Monthly/GetDetailsEX/{UData}/{EmpID}/{fDate}/{tDate}/{lang?}")]
        [ResponseType(typeof(ResponseResult<MonthlyDailyTimeSheet>))]
        [AllowAnonymous]
        public HttpResponseMessage GetMonthlyTimeSheetGetDetailsEX(string UData, int EmpID, int fDate, int tDate, string lang = "")
        {
            HttpResponseMessage response = null;
            int Emp_ID = EmpID;
            int FromDate = fDate;
            int ToDate = tDate;
            if (string.IsNullOrEmpty(lang))
                lang = "ar";
            var Username = "";
            var dt = "";
            try
            {
                TimeSpan duration;
                string dec = Common.Decrypt(UData);
                Username = dec.Split('|')[0].ToString().ToLower();
                dt = dec.Split('|')[1].ToString();
                duration = DateTime.Now - Convert.ToDateTime(dt);
                if (duration.TotalHours > 1)
                {
                    var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, "Token is expired");
                    response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
                    return response;
                }
            }
            catch (Exception ex)
            {

                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, ex.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
                return response;
            }




            try
            {
                //  var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var resultDetails = timeSheetRepositry.GetMothlyTimeSheetDetails(null, FromDate, ToDate, Emp_ID, lang);
                var resultMonthly = timeSheetRepositry.GetMonthlyTimeSheetSummary(null, FromDate, ToDate, Emp_ID, lang);
                var result = new MonthlyDailyTimeSheet
                {
                    Details = resultDetails,
                    Summary = resultMonthly
                };
                var responeResult = new ResponseResult<MonthlyDailyTimeSheet>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        #endregion

        //that will be called by botton+API get data
        #region Exemptions
        [HttpGet]
        [Route("Exemptions/GetAll")]
        [ResponseType(typeof(ResponseResult<DataTableData<ExemptionsTimeSheet>>))]
        [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-exemptions")]
        public HttpResponseMessage GetExemptionsTimeSheet()
        {
            Dictionary<string, string> QueryString = Request.GetQueryStrings();
            int? Sec_ID = QueryString["Sec_ID"].ToNullableInt();
            long? Company = QueryString["Company"].ToNullableLong();
            //long? Reg_ID = QueryString["Reg_ID"].ToLong();
            int? Emp_ID = QueryString["Emp_ID"].ToNullableInt();
           
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var result = timeSheetRepositry.GetExemptionsTimeSheet(Credential.Username, Resources.Resources.lang,Sec_ID,Emp_ID,Company);
                var responeResult = new ResponseResult<List<ExemptionsTimeSheet>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpPost]
        [Route("Exemptions/GetAllFiltered")]
        [ResponseType(typeof(ResponseResult<DataTableData<ExemptionsTimeSheet>>))]
        [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-exemptions")]
        public HttpResponseMessage GetExemptionsTimeSheetFiltered([FromBody] FormParameters Para)
        {
            HttpResponseMessage response = null;
            var lang = "ar";
            var thelang = Request.Headers.AcceptLanguage.FirstOrDefault();                       
            lang = (thelang == null ? Resources.Resources.lang : thelang.Value);
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var result = timeSheetRepositry.GetExemptionsTimeSheet(Credential.Username, lang, Para.Sec_ID.Value,Para.Emp_ID.Value,Para.Company.Value);
                var responeResult = new ResponseResult<List<ExemptionsTimeSheet>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        #endregion

        #region Transactions
        [HttpGet]
        [Route("Transactions/GetDevices")]
        [ResponseType(typeof(ResponseResult<IEnumerable<Devices>>))]
        [AllowAnonymous]
        public HttpResponseMessage GetDevices()
        {

            HttpResponseMessage response = null;
            try
            {


                var result = timeSheetRepositry.GetDevices();

                var responeResult = new ResponseResult<IEnumerable<Devices>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpGet]
        [Route("Transactions/GetAll")]
        [ResponseType(typeof(ResponseResult<DataTableData<Transactions>>))]
        [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-transdet")]
        public HttpResponseMessage GetAllTransactionsPaging()
        {

            Dictionary<string, string> QueryString = Request.GetQueryStrings();
            int? Sec_ID = QueryString["Sec_ID"].ToInt();
            long? Reg_ID = QueryString["Reg_ID"].ToLong();
            int? Emp_ID = QueryString["Emp_ID"].ToInt();
            int FromDate = QueryString["FromDate"].ToInt();
            int? DeviceId = QueryString["DeviceId"].ToInt();
            int ToDate = QueryString["ToDate"].ToInt();
            string RowFilter = QueryString["RowFilter"].ToString();

            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var result = timeSheetRepositry.GetAllTransDetails(Credential.Username, FromDate, ToDate, Emp_ID, Sec_ID, Reg_ID, DeviceId, RowFilter, Resources.Resources.lang, QueryString);
                var responeResult = new ResponseResult<DataTableData<Transactions>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpPost]
        [Route("Transactions/GetTransactions")]
        [ResponseType(typeof(ResponseResult<IEnumerable<Transactions>>))]
        [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-transdet")]
        public HttpResponseMessage GetAllTransactionsWithoutPaging([FromBody] FormParameters searchTransactionsParameter)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var thelang = Request.Headers.AcceptLanguage.FirstOrDefault();
                var lang = "ar";
                if (thelang == null)
                {
                    lang = Resources.Resources.lang;
                }
                else
                {
                    lang = thelang.Value;
                }
                var result = timeSheetRepositry.GetAllTransDetails(Credential.Username, searchTransactionsParameter, lang);
                var responeResult = new ResponseResult<IEnumerable<Transactions>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        #endregion

        #region Violation

        [HttpGet]
        [Route("Violations/GetYears")]
        [ResponseType(typeof(ResponseResult<List<ViolationsYears>>))]
        [AllowAnonymous]
        //[CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-penalty")]
        public HttpResponseMessage GetViolationsYears()
        {

            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var result = timeSheetRepositry.GetViolationsYears();
                var responeResult = new ResponseResult<List<ViolationsYears>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }

        [HttpGet]
        [Route("Violations/GetMonths")]
        [ResponseType(typeof(ResponseResult<List<ViolationsMonths>>))]
        [AllowAnonymous]
        public HttpResponseMessage GetViolationsMonths()
        {

            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var result = timeSheetRepositry.GetViolationsMonths();
                var responeResult = new ResponseResult<List<ViolationsMonths>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpGet]
        [Route("Violations/GetAll")]
        [ResponseType(typeof(ResponseResult<List<Violations>>))]
        //[CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-penalty")]
        public HttpResponseMessage GetViolations()
        {

            Dictionary<string, string> QueryString = Request.GetQueryStrings();
            int year = QueryString["year"].ToInt();
            int month = QueryString["month"].ToInt();
            long company = QueryString["company"].ToLong();


            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var result = timeSheetRepositry.GetViolations(year, month, company, Credential.Username);
                var responeResult = new ResponseResult<List<Violations>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpPost]
        [Route("Violations/GetViolations")]
        [ResponseType(typeof(ResponseResult<List<Violations>>))]
        //[CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-penalty")]
        public HttpResponseMessage GetViolations([FromBody] FormParameters searchTransactionsParameter)
        {

           


            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var result = timeSheetRepositry.GetViolations(searchTransactionsParameter.Year.Value, searchTransactionsParameter.Month.Value, searchTransactionsParameter.Company.Value, Credential.Username);
                var responeResult = new ResponseResult<List<Violations>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }

        [HttpPost]
        [Route("Violations/GetDetails")]
        [ResponseType(typeof(ResponseResult<List<Violations>>))]
        //[CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-penalty")]
        public HttpResponseMessage GetViolationDetails([FromBody] Violations par)
        {
            HttpResponseMessage response = null;
            try
            {


                var res = timeSheetRepositry.GetViolationDetails(par);
                var result = Common.MapTo<ViolationDetails>(res.Tables[0]).SingleOrDefault();
                var late = Common.MapTo<ViolationLateness>(res.Tables[1]);
                var absence = Common.MapTo<ViolationAbsence>(res.Tables[2]);

                result.Absence = absence;
                result.Lateness = late;

                var responeResult = new ResponseResult<ViolationDetails>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        #endregion

        #region Fingerprint requests Manage
        [HttpPost]
        [Route("GetAllFingerPrint")]
        [ResponseType(typeof(ResponseResult<IEnumerable<TransInfo>>))]
        //[CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-transdet")]
        public HttpResponseMessage GetAllFingerPrint([FromBody] FormParameters transSearchParamater)
        {
            //return sectionsRepository.GetSingle(id);
            HttpResponseMessage response = null;
            try
            {
                TransBody excuseSearch = new TransBody();

                excuseSearch.trans_secid = transSearchParamater.Sec_ID.HasValue ? transSearchParamater.Sec_ID : 0;
                excuseSearch.trans_RegID = transSearchParamater.Reg_ID.HasValue ? transSearchParamater.Reg_ID : 0;
                excuseSearch.trans_empid = transSearchParamater.Emp_ID.HasValue ? transSearchParamater.Emp_ID : 0;
                excuseSearch.trans_fdate = transSearchParamater.FromDate;
                excuseSearch.trans_tdate = transSearchParamater.ToDate;
                excuseSearch.trans_reason = transSearchParamater.Type.HasValue ? transSearchParamater.Type : 0;
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var thelang = Request.Headers.AcceptLanguage.FirstOrDefault();
                var lang = "ar";
                if (thelang == null)
                {
                    lang = Resources.Resources.lang;
                }
                else
                {
                    lang = thelang.Value;
                }

                var Result = timeSheetRepositry.GetAllFingerPrint(Credential.Username, excuseSearch, lang);
                var responeResult = new ResponseResult<IEnumerable<TransInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, Result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.ErrorExcuseReasonRetriveData + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }
        [HttpGet]
        [Route("GetTransRequestByID/{transID}")]
        [ResponseType(typeof(ResponseResult<IEnumerable<TransInfo>>))]
        [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-transdet")]
        public HttpResponseMessage GetTransRequestByID(int transID)
        {
            //return sectionsRepository.GetSingle(id);
            HttpResponseMessage response = null;
            try
            {
                
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var Result = timeSheetRepositry.GetTransRequestByID(Credential.Username, transID);
                var responeResult = new ResponseResult<TransInfo>("1", Resources.Resources.SuccessRetrievedDataMsg, Result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.ErrorExcuseReasonRetriveData + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }
        
        [HttpPost]
        [Route("UpdateFingerPrintRequest")]
        [ResponseType(typeof(ResponseResult<int>))]
        [CustomAuthorize(GroupNo = "4", PermissionName = "timesheet-transdet")]
        public HttpResponseMessage UpdateFingerPrintRequest([FromBody] Transactions Trans)
        {
            //return sectionsRepository.GetSingle(id);
            HttpResponseMessage response = null;
            try
            {
                
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var Result = timeSheetRepositry.UpdateFingerPrintRequest(Trans,Credential.Username);
                var responeResult = new ResponseResult<int>("1", Resources.Resources.SuccessSaveDataMsg, Result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.ErrorExcuseReasonRetriveData + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }
        #endregion

        protected override void Dispose(bool disposing)
        {
            transReasonRepository.Dispose();
            timeSheetRepositry.Dispose();
            base.Dispose(disposing);
        }
    }
}
