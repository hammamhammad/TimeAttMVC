using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TimeAtt.Model.Models;
using TimeAtt.Model.Repository;
using TimeAtt.Models;
using TimeAtt.Security;

namespace TimeAttWebAPI.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [RoutePrefix("ORAINTEG")]
    [CustomAuthorize(ValidateUserAndPassword = true)]
    public class OracleIntegrationController : ApiController
    {
        private WorkFlowRepository ContextDb = null;

        public OracleIntegrationController()
        {

            ContextDb = new WorkFlowRepository();
        }

        /// <summary>
        /// Api  to get all employees from oracle database by using query
        /// </summary>
        /// <param name="queryType">select which query you need</param>
        /// <param name="LastUpdated">Query where last update date >= , this parameter is optional</param>
        /// <returns>Results with status and Response message</returns>
        [HttpGet]
        [Route("GetDataFromOracleDB/{queryType}/{LastUpdated?}")]
        public HttpResponseMessage GetDataFromOracle(QueryType queryType, DateTime? LastUpdated = default(DateTime?))
        {
            HttpResponseMessage response = null;
            object Result = null;
            try
            {
                var oraRepos = new OracleIntegrationRepository();
                var data = oraRepos.GetResultsFromQuery(queryType, LastUpdated);
                //Result = new
                //{
                //    Status = "OK",
                //    Response = "True"
                //};

                response = Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception Exception)
            {

                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message + Environment.NewLine + Exception.InnerException
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;

        }
        /// <summary>
        /// Api  to sync all employees from oracle database to workflow DB
        /// </summary>
        /// <param name="queryType">select which query you need</param>
        /// <param name="LastUpdated">Query where last update date >= , this parameter is optional</param>
        /// <returns>Results with status and Response message</returns>
        [HttpGet]
        [Route("SyncDataFromOracleDB/{queryType}/{LastUpdated?}")]
        public HttpResponseMessage SyncDataFromOracleDB(QueryType queryType, [DefaultValue(null)] DateTime? LastUpdated = null)
        {
            HttpResponseMessage response = null;
            object Result = null;
            try
            {
                var oraRepos = new OracleIntegrationRepository();
                bool result = oraRepos.SyncResultsFromQuery(queryType, LastUpdated);
                if (result)
                    Result = new
                    {
                        Status = "OK",
                        Response = "True"
                    };
                else
                {
                    Result = new
                    {
                        Status = "Exception",
                        Response = "An unexpected error occurred while sync data."
                    };
                }

                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception Exception)
            {

                Result = new
                {
                    Status = "Exception",
                    Response = "An unexpected error occurred while sync data." + Environment.NewLine + Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;

        }

        [HttpGet]
        [Route("SyncEmployeesTimeAttToOracle/{masterID}")]
        public HttpResponseMessage SyncEmployeesTimeAttToOracle(long masterID)
        {
            HttpResponseMessage response = null;
            object Result = null;
            DataSet ds = null;
            List<TimeAttEmployees_Absence> listAbsence = null;
            List<TimeAttEmployees_LATE> listLate = null;
            List<TimeAttEmployees_Violation> listViolation = null;
            try
            {
                bool resultAbsence = false, resultLate = false, resultViolation = false;

                var oraRepos = new OracleIntegrationRepository();

                ds = ContextDb.GetEmployeesForViolation(masterID);

                listAbsence = TimeAtt.Common.MapTo<TimeAttEmployees_Absence>(ds.Tables[0]);
                if (listAbsence.Count > 0)
                    resultAbsence = oraRepos.SaveEmployeesAbsenceToOracle(listAbsence);
                else
                    resultAbsence = true;

                listLate = TimeAtt.Common.MapTo<TimeAttEmployees_LATE>(ds.Tables[1]);
                if (listLate.Count > 0)
                    resultLate = oraRepos.SaveEmployeesLateToOracle(listLate);
                else
                    resultLate = true;

                listViolation = TimeAtt.Common.MapTo<TimeAttEmployees_Violation>(ds.Tables[2]);
                if (listViolation.Count > 0)
                    resultViolation = oraRepos.SaveEmployeesViolationToOracle(listViolation);
                else
                    resultViolation = true;

                if (resultAbsence & resultLate & resultViolation)
                {
                    ContextDb.UpdateTimeAttIntegStatus(masterID);
                    Result = new
                    {
                        Status = "OK",
                        Response = "True"
                    };
                }
                else
                {
                    Result = new
                    {
                        Status = "Exception",
                        Response = "An unexpected error occurred while sync data."
                    };
                }

                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception Exception)
            {

                Result = new
                {
                    Status = "Exception",
                    Response = "An unexpected error occurred while sync data." + Environment.NewLine + Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }
    }
}
