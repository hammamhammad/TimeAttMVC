using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using System.IO;
using System.Linq;
using System.Net;
using TimeAtt.DBContext;
using TimeAtt.Model.Models;
using TimeAtt.Models;

namespace TimeAtt.Model.Repository
{
    public class WorkFlowRepository : IDisposable
    {
        private WorkFlowDB Context = null;
        public WorkFlowRepository()
        {
            Context = new WorkFlowDB();
        }
        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    Context.Dispose();
                }
            }
            this.disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public EmailEntity GetEmailByAction(int TaskID, int ActionID)
        {
            try
            {
                return Context.ExecuteToDataTable<EmailEntity>("GetEmailByAction", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", TaskID),
                    new System.Data.SqlClient.SqlParameter("@ActionID", ActionID)
                }).SingleOrDefault();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string AssignTo(int TaskID, string Usename)
        {
            try
            {
                var ds = Context.ExecuteToDataSet("AssignTo", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", TaskID),
                    new System.Data.SqlClient.SqlParameter("@AssignUser", Usename)
                });
                if (ds != null && ds.Tables.Count > 0)
                {

                    string Response = ds.Tables[0].Rows[0][0].ToString();
                    return Response;

                }
                return null;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string AssignToGroup(int TaskID, int GroupID)
        {
            try
            {
                var ds = Context.ExecuteToDataSet("AssignToGroup", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", TaskID),
                    new System.Data.SqlClient.SqlParameter("@GroupID", GroupID)
                });
                if (ds != null && ds.Tables.Count > 0)
                {

                    string Response = ds.Tables[0].Rows[0][0].ToString();
                    return Response;

                }
                return null;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string AssignToSSCoordinator(int TaskID)
        {
            try
            {
                var ds = Context.ExecuteToDataSet("AssignToSSCoordinator", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", TaskID)
                });
                if (ds != null && ds.Tables.Count > 0)
                {

                    string Response = ds.Tables[0].Rows[0][0].ToString();
                    return Response;

                }
                return null;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string AssignToAICRegionMGR(int TaskID)
        {
            try
            {
                var ds = Context.ExecuteToDataSet("AssignToAICRegionMGR", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", TaskID)
                });
                if (ds != null && ds.Tables.Count > 0)
                {

                    string Response = ds.Tables[0].Rows[0][0].ToString();
                    return Response;

                }
                return null;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string AssignToStationaryCoordinator(int TaskID)
        {
            try
            {
                var ds = Context.ExecuteToDataSet("AssignToStationaryCoordinator", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", TaskID)
                });
                if (ds != null && ds.Tables.Count > 0)
                {

                    string Response = ds.Tables[0].Rows[0][0].ToString();
                    return Response;

                }
                return null;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int UpdateStationeryRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "UpdateStationeryRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public int UpdateCarPermitRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "UpdateCarPermitRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public int UpdateCarParkingRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "UpdateCarParkingRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public int UpdateYourVoiceRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "UpdateYourVoiceRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public int UpdateSupportServiceRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "UpdateSupportServiceRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public int UpdateFacilityServiceRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "UpdateFacilityServiceRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public int UpdateLaborReplacementRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "UpdateLaborReplacementRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public int UpdateWarehouseAssetRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "UpdateWarehouseAssetRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        //public int UpdateDigitalChampionRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        //{
        //    try
        //    {
        //        SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
        //        var sql = "UpdateDigitalChampionRequestStatus";
        //        SqlParameter[] para = new SqlParameter[]{
        //          new SqlParameter("@RefID", refID),
        //          new SqlParameter("@WFStatus", wFStatus),
        //          new SqlParameter("@UserName", userName),
        //         outparasql
        //      };
        //        var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
        //        outpara = outparasql.Value.ToString();
        //        return result;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}


        public int UpdateDisabilityRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "UpdateDisabilityRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public int UpdateAlternativeUsersStatusV2(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "UpdateAlternativeUsersStatusV2";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  //new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public int UpdateCourseRegistrationRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "UpdateCourseRegistrationRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<CourseRegistration> GetRegistrationRequestByID(long refID)
        {
            try
            {
                return Context.ExecuteToDataTable<CourseRegistration>("LMS_GetRegistrationRequestByID_SP", new SqlParameter[] {
                   new SqlParameter("@RefID",unchecked((int)refID) )
                });
            }
            catch (Exception)
            {
                throw;
            }
        }
        public int LMS_Registration(long EmpNo, string EmpUsername, int CourseID, bool? AssignedByGroup = null, int? groupID = null)
        {
            try
            {
                var result = Context.ExecuteNonQuery("LMS_Registration_SP", new SqlParameter[] {
                    new SqlParameter("@EmpNo", EmpNo),
                    new SqlParameter("@EmpUsername ", EmpUsername),
                    new SqlParameter("@CourseID", CourseID),
                     new SqlParameter("@AssignedByGroup ", AssignedByGroup),
                    new SqlParameter("@GroupID", groupID)
                });

                return result.ToInt();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public int UpdateWorkersAccommodationRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "UpdateWorkersAccommodationRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public int ApproveActivity(int TaskID, string TaskNote, string AssignTask, string CurrentUser, out string response)
        {

            try
            {

                SqlParameter outpara = new SqlParameter("@Result", SqlDbType.NVarChar, 500);
                outpara.Direction = ParameterDirection.Output;
                object data = Context.ExecuteNonQuery("ApproveActivity", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", TaskID),
                    new System.Data.SqlClient.SqlParameter("@TaskNote", TaskNote),
                    new System.Data.SqlClient.SqlParameter("@CurrentUser", CurrentUser),
                    new System.Data.SqlClient.SqlParameter("@AssignTask", AssignTask),outpara

                }, true);
                response = outpara.Value.ToString();
                return data.ToInt();
            }
            catch (Exception)
            {

                throw;
            }

        }
        public int CancelActivity(int TaskID, string RequesterUser, out string response)
        {
            try
            {

                SqlParameter outpara = new SqlParameter("@Result", SqlDbType.NVarChar, 500);
                outpara.Direction = ParameterDirection.Output;
                object data = Context.ExecuteNonQuery("CancelActivity", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", TaskID),
                    new System.Data.SqlClient.SqlParameter("@RequesterUser", RequesterUser),
                    outpara

                }, true);
                response = outpara.Value.ToString();
                return data.ToInt();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public int ReAssignActivity(int TaskID, string CurrentUser, string TaskNote, out string response)
        {
            try
            {

                SqlParameter outpara = new SqlParameter("@Result", SqlDbType.NVarChar, 500);
                outpara.Direction = ParameterDirection.Output;
                object data = Context.ExecuteNonQuery("ReassignActivity", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", TaskID),
                    new System.Data.SqlClient.SqlParameter("@TaskNote", TaskNote),
                    new System.Data.SqlClient.SqlParameter("@CurrentUser", CurrentUser),
                    outpara

                }, true);
                response = outpara.Value.ToString();
                return data.ToInt();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public int RejectActivity(int TaskID, string TaskNote, string CurrentUser, out string response)
        {

            try
            {

                SqlParameter outpara = new SqlParameter("@Result", SqlDbType.NVarChar, 500);
                outpara.Direction = ParameterDirection.Output;
                object data = Context.ExecuteNonQuery("RejectActivity", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", TaskID),
                    new System.Data.SqlClient.SqlParameter("@CurrentUser", CurrentUser),
                    new System.Data.SqlClient.SqlParameter("@TaskNote", TaskNote),
                    outpara

                }, true);
                response = outpara.Value.ToString();
                return data.ToInt();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<TaskInfo> GetMyAllRequest(string Udata, int? taskStatus)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                    new SqlParameter("@Username", Udata),
                    new SqlParameter("@TaskStatus", taskStatus)
                };

                return Context.ExecuteToDataTable<TaskInfo>("GetMyAllRequest", param);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<TaskInfo> GetMyAllTasks(string user, short? taskStatus)
        {
            try
            {
                return Context.ExecuteToDataTable<TaskInfo>("GetMyAllTasks", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@Username", user),
                    new System.Data.SqlClient.SqlParameter("@TaskStatus", taskStatus)
                });
            }
            catch (Exception)
            {

                throw;
            }

        }

        public List<TimeAtt.Models.TaskStatus> GetTaskStatus()
        {
            try
            {
                return Context.ExecuteToDataTable<TimeAtt.Models.TaskStatus>("GetTaskStatus");
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<WorkFlowStatus> GetWorkFlowStatus()
        {
            try
            {
                return Context.ExecuteToDataTable<WorkFlowStatus>("GetWorkFlowStatus");
            }
            catch (Exception)
            {
                throw;
            }
        }
        public DataSet GetTaskDetails(int TaskID, string user, string dt, out string response)
        {

            try
            {
                SqlParameter outpara = new SqlParameter("@Response", SqlDbType.NVarChar, 500);
                outpara.Direction = ParameterDirection.Output;
                DataSet data = Context.ExecuteToDataSet("GetTaskDetails", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", TaskID),
                    new System.Data.SqlClient.SqlParameter("@user", user),
                    new System.Data.SqlClient.SqlParameter("@datetime", dt),outpara

                });
                response = outpara.Value.ToString();
                return data;
            }
            catch (Exception)
            {

                throw;
            }

        }
        public string CreateNewTask(int AppID, int RefID, int WorkFlowID, string Title, string TitleEN, string TaskDetails, string Requester, byte[] AttachmentFile = null, string AttachmentFileExt = null)
        {
            try
            {
                SqlParameter attachFile = new SqlParameter("AttachmentFile", SqlDbType.VarBinary);
                attachFile.Value = AttachmentFile;

                SqlParameter outPara = new SqlParameter("@Response", SqlDbType.NVarChar, 4000);
                outPara.Direction = ParameterDirection.Output;

                int res = Context.ExecuteNonQuery("CreateNewTask", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@AppID", AppID),
                    new System.Data.SqlClient.SqlParameter("@RefID", RefID),
                    new System.Data.SqlClient.SqlParameter("@WorkFlowID", WorkFlowID),
                    new System.Data.SqlClient.SqlParameter("@Title", Title),
                    new System.Data.SqlClient.SqlParameter("@TitleEN", TitleEN),
                    new System.Data.SqlClient.SqlParameter("@TaskDetails", TaskDetails),
                    new System.Data.SqlClient.SqlParameter("@Requester", Requester),
                    attachFile,
                    new SqlParameter("@AttachmentFile_ext",AttachmentFileExt),
                    outPara
                }, true).ToInt();
                if (res >= 1)
                    return outPara.Value.ToString();
                else
                    throw new Exception(outPara.Value.ToString());
            }
            catch (Exception)
            {

                throw;
            }
        }
        public ResponseStatus CreateNewTaskV2(int AppID, int RefID, int WorkFlowID, string Title, string TitleEN, string TaskDetails, string Requester, byte[] AttachmentFile = null, string AttachmentFileExt = null)
        {
            try
            {
                SqlParameter attachFile = new SqlParameter("AttachmentFile", SqlDbType.VarBinary);
                attachFile.Value = AttachmentFile;

                SqlParameter outPara = new SqlParameter("@Response", SqlDbType.NVarChar, 4000);
                outPara.Direction = ParameterDirection.Output;

                var res = Context.ExecuteToDataTable<ResponseStatus>("CreateNewTaskV2", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@AppID", AppID),
                    new System.Data.SqlClient.SqlParameter("@RefID", RefID),
                    new System.Data.SqlClient.SqlParameter("@WorkFlowID", WorkFlowID),
                    new System.Data.SqlClient.SqlParameter("@Title", Title),
                    new System.Data.SqlClient.SqlParameter("@TitleEN", TitleEN),
                    new System.Data.SqlClient.SqlParameter("@TaskDetails", TaskDetails),
                    new System.Data.SqlClient.SqlParameter("@Requester", Requester),
                    attachFile,
                    new SqlParameter("@AttachmentFile_ext",AttachmentFileExt)
                   // outPara
                });
                return res.SingleOrDefault();

                //if (res >= 1)
                //    return outPara.Value.ToString();
                //else
                //    throw new Exception(outPara.Value.ToString());
            }
            catch (Exception)
            {

                throw;
            }
        }

        public DataSet GetYourTaskDetails(int taskID, string user, string dt, out string response)
        {
            try
            {
                SqlParameter outpara = new SqlParameter("@Response", SqlDbType.NVarChar, 500);
                outpara.Direction = ParameterDirection.Output;
                DataSet data = Context.ExecuteToDataSet("GetYourTaskDetails", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", taskID),
                    new System.Data.SqlClient.SqlParameter("@user", user),
                    new System.Data.SqlClient.SqlParameter("@datetime", dt),outpara

                });
                response = outpara.Value.ToString();
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public DataSet GetTaskDetailsView(int taskID, string username, string dt, out string response)
        {
            try
            {
                SqlParameter outpara = new SqlParameter("@Response", SqlDbType.NVarChar, 500);
                outpara.Direction = ParameterDirection.Output;
                DataSet data = Context.ExecuteToDataSet("GetTaskDetailsView", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", taskID),
                    new System.Data.SqlClient.SqlParameter("@user", username),
                    new System.Data.SqlClient.SqlParameter("@datetime", dt),outpara

                });
                response = outpara.Value.ToString();
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public TaskDetailsEntity GetTaskAttachment(long taskID)
        {
            try
            {
                return Context.ExecuteToDataTable<TaskDetailsEntity>("GetTaskAttachment", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", taskID) }).SingleOrDefault();
            }
            catch (Exception)
            {

                throw;
            }
        }
        private static byte[] getImageFromExchange(string email)
        {
            if (string.IsNullOrEmpty(email))
                return null;
            MemoryStream ms = null;
            HttpWebRequest request = null;
            try
            {
                var url = ConfigurationManager.AppSettings["ExchangeEmailPhoto"];
                var username = ConfigurationManager.AppSettings["ExchangeEmailUserName"];
                var password = ConfigurationManager.AppSettings["ExchangeEmailPassword"];
                var domain = ConfigurationManager.AppSettings["ExchangeEmailDomain"];
                request = WebRequest.Create(String.Format(url + @"&size=HR120x120", email)) as HttpWebRequest;
                request.Credentials = new NetworkCredential(username, password, domain);
                // Submit the request.
                using (HttpWebResponse resp = request.GetResponse() as HttpWebResponse)
                {
                    ms = new MemoryStream();
                    // Take the response and save it as an image.
                    resp.GetResponseStream().CopyTo(ms);

                    return ms.ToArray();
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            finally
            {
                if (ms != null)
                    ms.Dispose();
                ms = null;
                request = null;
            }
            // Create the web request with the REST URL.


        }
        private bool SyncActiveDirectory(DataTable dt)
        {
            try
            {
                SqlParameter ADTable = new SqlParameter("@ADTable", dt);
                ADTable.SqlDbType = SqlDbType.Structured;

                object ret = Context.ExecuteNonQuery("ADIntegration", new System.Data.SqlClient.SqlParameter[] { ADTable }, true);
                return ret.ToInt() > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public DataTable GetActiveDiroctryUsers()
        {
            try
            {
                var username = ConfigurationManager.AppSettings["ADUserName"];
                var password = ConfigurationManager.AppSettings["ADUserPassword"];
                var domain = ConfigurationManager.AppSettings["ADDomain"];
                var employeePropName = ConfigurationManager.AppSettings["ADEmpNoPropertyName"];

                DataTable DT = new DataTable("ActiveDirectoryUsersTable");
                DT.Columns.Add(new DataColumn("EMPNO", typeof(string)));
                DT.Columns.Add(new DataColumn("USERNAME", typeof(string)));
                DT.Columns.Add(new DataColumn("EMAIL", typeof(string)));
                DT.Columns.Add(new DataColumn("DisplayName", typeof(string)));
                DT.Columns.Add(new DataColumn("JobTitle", typeof(string)));
                DT.Columns.Add(new DataColumn("City", typeof(string)));
                DT.Columns.Add(new DataColumn("MobileNumber", typeof(string)));
                DT.Columns.Add(new DataColumn("Department", typeof(string)));
                DT.Columns.Add(new DataColumn("CountryRegion", typeof(string)));
                DT.Columns.Add(new DataColumn("Country", typeof(string)));
                DT.Columns.Add(new DataColumn("Manager", typeof(string)));
                DT.Columns.Add(new DataColumn("GivenName", typeof(string)));
                DT.Columns.Add(new DataColumn("Surname", typeof(string)));
                DT.Columns.Add(new DataColumn("Company", typeof(string)));
                DT.Columns.Add(new DataColumn("TelephoneNumber", typeof(string)));
                DT.Columns.Add(new DataColumn("FaxNumber", typeof(string)));
                DT.Columns.Add(new DataColumn("Office", typeof(string)));
                DT.Columns.Add(new DataColumn("ISENABLED", typeof(bool)));

                using (var context = new PrincipalContext(ContextType.Domain, domain, username, password))
                {
                    UserPrincipal up = new UserPrincipal(context);

                    up.UserPrincipalName = "*";
                    up.Description = "*";
                    up.Name = "*";
                    using (var searcher = new PrincipalSearcher(new UserPrincipal(context)))
                    {
                        searcher.QueryFilter = up;
                        var allUsers = searcher.FindAll().OfType<UserPrincipal>();

                        foreach (var result in allUsers)
                        {

                            DataRow dr = DT.NewRow();
                            DirectoryEntry de = result.GetUnderlyingObject() as DirectoryEntry;


                            if (result.Description?.Length > 10)
                                dr["EMPNO"] = "0";  //(de.Properties[employeePropName].Value == null ? "" : de.Properties[employeePropName].Value.ToString());
                            else
                                dr["EMPNO"] = result.Description; //(de.Properties[employeePropName].Value == null ? "" : de.Properties[employeePropName].Value.ToString());


                            dr["USERNAME"] = result.SamAccountName; //(de.Properties["sAMAccountName"].Value == null ? "" : de.Properties["sAMAccountName"].Value.ToString());
                            dr["EMAIL"] = result.EmailAddress;//(de.Properties["mail"].Value == null ? "" : de.Properties["mail"].Value.ToString());
                            dr["DisplayName"] = result.DisplayName;// (de.Properties["displayName"].Value == null ? "" : de.Properties["displayName"].Value.ToString());

                            dr["JobTitle"] = de.Properties["title"].Value == null ? "" : de.Properties["title"].Value;
                            dr["City"] = de.Properties["l"].Value == null ? "" : de.Properties["l"].Value;
                            dr["MobileNumber"] = de.Properties["mobile"].Value == null ? "" : de.Properties["mobile"].Value;
                            dr["Department"] = de.Properties["department"].Value == null ? "" : de.Properties["department"].Value;
                            dr["CountryRegion"] = de.Properties["c"].Value == null ? "" : de.Properties["c"].Value;
                            dr["Country"] = de.Properties["co"].Value == null ? "" : de.Properties["co"].Value;
                            dr["Manager"] = de.Properties["manager"].Value == null ? "" : de.Properties["manager"].Value;
                            dr["GivenName"] = result.GivenName;
                            dr["Surname"] = result.Surname;
                            dr["Company"] = de.Properties["company"].Value == null ? "" : de.Properties["company"].Value;
                            dr["TelephoneNumber"] = de.Properties["ipPhone"].Value == null ? "" : de.Properties["ipPhone"].Value;
                            dr["FaxNumber"] = de.Properties["facsimileTelephoneNumber"].Value == null ? "" : de.Properties["facsimileTelephoneNumber"].Value;
                            dr["Office"] = de.Properties["telephoneNumber"].Value == null ? "" : de.Properties["telephoneNumber"].Value;

                            dr["ISENABLED"] = result.Enabled.HasValue ? result.Enabled.Value : false;  //(tempUser.Enabled.HasValue ? tempUser.Enabled.Value : false);

                            DT.Rows.Add(dr);

                            //if (DT.Rows.Count == 100)
                            //    break;
                        }
                    }
                }
                return DT;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public ResponseStatus SyncWithActiveDiroctry()
        {
            try
            {
                var username = ConfigurationManager.AppSettings["ADUserName"];
                var password = ConfigurationManager.AppSettings["ADUserPassword"];
                var domain = ConfigurationManager.AppSettings["ADDomain"];
                var employeePropName = ConfigurationManager.AppSettings["ADEmpNoPropertyName"];
                DataTable DT = new DataTable("ActiveDirectoryUsersTable");

                DT.Columns.Add(new DataColumn("EMPID", typeof(string)));
                DT.Columns.Add(new DataColumn("EMPNO", typeof(string)));
                DT.Columns.Add(new DataColumn("USERNAME", typeof(string)));
                DT.Columns.Add(new DataColumn("EMAIL", typeof(string)));
                DT.Columns.Add(new DataColumn("FULLNAMEAR", typeof(string)));
                DT.Columns.Add(new DataColumn("FULLNAMEEN", typeof(string)));
                DT.Columns.Add(new DataColumn("MANAGEREMPID", typeof(string)));
                DT.Columns.Add(new DataColumn("MANAGERNAMEAR", typeof(string)));
                DT.Columns.Add(new DataColumn("MANAGERNAMEEN", typeof(string)));
                DT.Columns.Add(new DataColumn("MANAGEREMAIL", typeof(string)));
                DT.Columns.Add(new DataColumn("MANAGERUSERNAME", typeof(string)));
                DT.Columns.Add(new DataColumn("BRANCH", typeof(string)));
                DT.Columns.Add(new DataColumn("JOBTITLE", typeof(string)));
                DT.Columns.Add(new DataColumn("EXTENTION", typeof(string)));
                DT.Columns.Add(new DataColumn("ISENABLED", typeof(bool)));
                DT.Columns.Add(new DataColumn("Photo", typeof(byte[])));

                DataTable tempDT = new DataTable("ActiveDirectoryUsersTable");
                tempDT.Columns.Add(new DataColumn("EMPNO", typeof(string)));
                tempDT.Columns.Add(new DataColumn("USERNAME", typeof(string)));
                tempDT.Columns.Add(new DataColumn("EMAIL", typeof(string)));
                tempDT.Columns.Add(new DataColumn("DisplayName", typeof(string)));
                tempDT.Columns.Add(new DataColumn("JobTitle", typeof(string)));
                tempDT.Columns.Add(new DataColumn("City", typeof(string)));
                tempDT.Columns.Add(new DataColumn("MobileNumber", typeof(string)));
                tempDT.Columns.Add(new DataColumn("Department", typeof(string)));
                tempDT.Columns.Add(new DataColumn("CountryRegion", typeof(string)));
                tempDT.Columns.Add(new DataColumn("Country", typeof(string)));
                tempDT.Columns.Add(new DataColumn("Manager", typeof(string)));
                tempDT.Columns.Add(new DataColumn("GivenName", typeof(string)));
                tempDT.Columns.Add(new DataColumn("Surname", typeof(string)));
                tempDT.Columns.Add(new DataColumn("Company", typeof(bool)));
                tempDT.Columns.Add(new DataColumn("TelephoneNumber", typeof(byte[])));
                tempDT.Columns.Add(new DataColumn("FaxNumber", typeof(byte[])));
                tempDT.Columns.Add(new DataColumn("Office", typeof(byte[])));


                using (var context = new PrincipalContext(ContextType.Domain, domain, username, password))
                {
                    UserPrincipal up = new UserPrincipal(context);

                    // up.EmailAddress = "*";
                    up.UserPrincipalName = "*";
                    up.Description = "*";
                    up.Name = "*";
                    using (var searcher = new PrincipalSearcher(new UserPrincipal(context)))
                    {
                        searcher.QueryFilter = up;
                        var allUsers = searcher.FindAll().OfType<UserPrincipal>();
                        //var xx= allUsers.Where(o => o.EmailAddress!=null&& o.EmailAddress.ToString().ToLower() == "ashoaip@alkhorayef.com".ToString()).ToList();
                        //var user=xx[0].GetUnderlyingObject() as DirectoryEntry;
                        //var proplist = new Dictionary<string, object>();
                        //foreach (PropertyValueCollection prp in user.Properties)
                        //{
                        //    proplist.Add(prp.PropertyName, prp.Value);
                        //}


                        foreach (var result in allUsers)
                        {

                            DataRow dr = DT.NewRow();
                            DirectoryEntry de = result.GetUnderlyingObject() as DirectoryEntry;
                            //foreach (PropertyValueCollection item in de.Properties)
                            //{
                            //    Console.Write(item.PropertyName + ":" + item.Value);
                            //}
                            if (result.EmailAddress == "er@alkhorayef.com")
                            {
                                Console.Write("test");
                            }

                            if (result.Description == "14937")
                            {
                                Console.Write("test");
                            }
                            if (result.Description?.Length > 10)
                            {
                                dr["EMPID"] = "0"; //(de.Properties[employeePropName].Value == null ? "" : de.Properties[employeePropName].Value.ToString());
                                dr["EMPNO"] = "0";  //(de.Properties[employeePropName].Value == null ? "" : de.Properties[employeePropName].Value.ToString());

                            }
                            else
                            {
                                dr["EMPID"] = result.Description; //(de.Properties[employeePropName].Value == null ? "" : de.Properties[employeePropName].Value.ToString());
                                dr["EMPNO"] = result.Description; //(de.Properties[employeePropName].Value == null ? "" : de.Properties[employeePropName].Value.ToString());

                            }

                            dr["USERNAME"] = result.SamAccountName; //(de.Properties["sAMAccountName"].Value == null ? "" : de.Properties["sAMAccountName"].Value.ToString());
                            dr["EMAIL"] = result.EmailAddress;//(de.Properties["mail"].Value == null ? "" : de.Properties["mail"].Value.ToString());
                            dr["FULLNAMEAR"] = result.DisplayName;// (de.Properties["displayName"].Value == null ? "" : de.Properties["displayName"].Value.ToString());
                            dr["FULLNAMEEN"] = result.DisplayName;//(de.Properties["displayName"].Value == null ? "" : de.Properties["displayName"].Value.ToString());
                            if (de.Properties["manager"].Value != null)
                            {
                                UserPrincipal Manageruser = UserPrincipal.FindByIdentity(context, IdentityType.DistinguishedName, de.Properties["manager"].Value.ToString());
                                dr["MANAGEREMPID"] = (Manageruser.Description == null ? "" : Manageruser.Description);
                                dr["MANAGERNAMEAR"] = (Manageruser.DisplayName == null ? "" : Manageruser.DisplayName);
                                dr["MANAGERNAMEEN"] = (Manageruser.DisplayName == null ? "" : Manageruser.DisplayName);
                                dr["MANAGEREMAIL"] = (Manageruser.EmailAddress == null ? "" : Manageruser.EmailAddress);
                                dr["MANAGERUSERNAME"] = (Manageruser.SamAccountName == null ? "" : Manageruser.SamAccountName);
                            }
                            else
                            {
                                dr["MANAGEREMPID"] = "";
                                dr["MANAGERNAMEAR"] = "";
                                dr["MANAGERNAMEEN"] = "";
                                dr["MANAGEREMAIL"] = "";
                                dr["MANAGERUSERNAME"] = "";
                            }

                            dr["BRANCH"] = (de.Properties["physicalDeliveryOfficeName"].Value == null ? "" : de.Properties["physicalDeliveryOfficeName"].Value.ToString());
                            dr["JOBTITLE"] = (de.Properties["title"].Value == null ? "" : de.Properties["title"].Value.ToString());
                            // var ext = (de.Properties["telephoneNumber"].Value == null ? "" : de.Properties["telephoneNumber"].Value.ToString());
                            //if (ext.Length <= 10)
                            dr["EXTENTION"] = (de.Properties["telephoneNumber"].Value == null ? "" : de.Properties["telephoneNumber"].Value.ToString());

                            // UserPrincipal tempUser = UserPrincipal.FindByIdentity(context, IdentityType.SamAccountName, de.Properties["sAMAccountName"].Value.ToString());
                            dr["ISENABLED"] = result.Enabled.HasValue ? result.Enabled.Value : false;  //(tempUser.Enabled.HasValue ? tempUser.Enabled.Value : false);
                            byte[] photo = null;
                            //if (de.Properties["thumbnailPhoto"].Value != null && de.Properties["thumbnailPhoto"].Value is byte[])
                            //{
                            //    try
                            //    {
                            //        photo = getImageFromExchange(dr["EMAIL"].ToString());
                            //        PhotoUpdateCount++;
                            //    }
                            //    catch (Exception)
                            //    {
                            //        photo = null;

                            //    }

                            //    if (photo == null)
                            //    {
                            //        photo = de.Properties["thumbnailPhoto"].Value as byte[];
                            //    }

                            //}

                            dr["Photo"] = photo;
                            DT.Rows.Add(dr);

                        }
                    }
                }
                var res = SyncActiveDirectory(DT);
                if (res)
                {
                    var resp = new ResponseStatus()
                    {
                        Status = "OK",
                        Response = "Active Directory has been synced with database successfully"
                    };
                    return resp;
                }
                else
                {
                    var resp = new ResponseStatus()
                    {
                        Status = "Exception",
                        Response = "Error to sync Active Directory with database "
                    };
                    return resp;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public DataSet GetEmployeesForViolation(long refID)
        {
            try
            {
                var data = Context.ExecuteToDataSet("GetEmployeesForViolation_SP", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@RefID", refID)
                });

                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public List<TimeAttEmployees_LATE> GetEmployeesLate(long refID)
        {
            try
            {
                var data = Context.ExecuteToDataTable<TimeAttEmployees_LATE>("GetEmployeesLate_SP", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@RefID", refID)
                });

                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<TimeAttEmployees_Violation> GetEmployeesViolation(long refID)
        {
            try
            {
                var data = Context.ExecuteToDataTable<TimeAttEmployees_Violation>("GetEmployeesViolation_SP", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@RefID", refID)
                });

                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int UpdateTimeAttIntegStatus(long refID)
        {
            try
            {
                var data = Context.ExecuteNonQuery("UpdateTimeAttIntegrationMaster_SP", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@ID", refID)
                });

                return data.ToInt();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string AssignToHRGroup(int TaskID)
        {
            try
            {
                var ds = Context.ExecuteToDataSet("AssignToHRGroup", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", TaskID)
                });
                if (ds != null && ds.Tables.Count > 0)
                {

                    string Response = ds.Tables[0].Rows[0][0].ToString();
                    return Response;

                }
                return null;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string AssignToPRGroup(int TaskID)
        {
            try
            {
                var ds = Context.ExecuteToDataSet("AssignToPR_Group", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", TaskID)
                });
                if (ds != null && ds.Tables.Count > 0)
                {

                    string Response = ds.Tables[0].Rows[0][0].ToString();
                    return Response;

                }
                return null;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public DataSet GetViolationTaskDetails(int taskID, string username, string dt, out string response)
        {
            try
            {
                SqlParameter outpara = new SqlParameter("@Response", SqlDbType.NVarChar, 500);
                outpara.Direction = ParameterDirection.Output;
                DataSet data = Context.ExecuteToDataSet("GetEmployeesViolationByTaskID_SP", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", taskID),
                    new System.Data.SqlClient.SqlParameter("@user", username),
                    new System.Data.SqlClient.SqlParameter("@datetime", dt),outpara

                });
                response = outpara.Value.ToString();
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public bool CheckExecuseRequestedByMGR(int taskID)
        {
            try
            {

                return Context.ExecuteScaler("CheckExecuseRequestedByMGR", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", taskID)
                }).ToBoolean();

            }
            catch (Exception)
            {

                throw;
            }
        }
        public bool CheckExecuseRequestedByAIC(int taskID)
        {
            try
            {

                return Context.ExecuteScaler("CheckExecuseRequestedByAIC", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", taskID)
                }).ToBoolean();

            }
            catch (Exception)
            {

                throw;
            }
        }
        public bool CheckExecuseNotPersonal(int taskID)
        {
            try
            {

                return Context.ExecuteScaler("CheckExecuseNotPersonal", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", taskID)
                }).ToBoolean();

            }
            catch (Exception)
            {

                throw;
            }
        }
        public bool CheckFingerprintRequestedByMGR(int taskID)
        {
            try
            {

                return Context.ExecuteScaler("CheckFingerprintRequestedByMGR", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", taskID)
                }).ToBoolean();

            }
            catch (Exception)
            {

                throw;
            }
        }
        public bool CheckRequesterCompany(int taskID, long company)
        {
            try
            {

                return Context.ExecuteScaler("CheckRequesterCompany", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", taskID),
                    new System.Data.SqlClient.SqlParameter("@companyID", company)
                }).ToBoolean();

            }
            catch (Exception)
            {

                throw;
            }
        }
        public bool CheckAPCTimeAttRequestedByMGR(int taskID)
        {
            try
            {

                return Context.ExecuteScaler("CheckAPCTimeAttRequestedByMGR", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", taskID)
                }).ToBoolean();

            }
            catch (Exception)
            {

                throw;
            }
        }
        public bool CheckExEmployeeRequesterGrade(int taskID)
        {
            try
            {

                return Context.ExecuteScaler("CheckExEmployeeRequesterGrade", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", taskID)
                }).ToBoolean();

            }
            catch (Exception)
            {

                throw;
            }
        }
		public bool CheckAPCOvertimeReqOver80(int taskID)
        {
            try
            {

                return Context.ExecuteScaler("TimeAtt_APC_CheckOvertimeReqOver80", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", taskID)
                }).ToBoolean();

            }
            catch (Exception)
            {

                throw;
            }
        }												 


        public int UpdateTimesheetRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "Portal_UpdateTimesheetStatus_SP";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public int UpdateExEmployeeRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "EX_UpdateExceptionRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataSet GetTimesheetAttendanceBatch(int TaskID)
        {
            try
            {
                return Context.ExecuteToDataSet("TimeAtt.[dbo].[Portal_GetTimesheetAttendanceBatch]", new SqlParameter[] {
                    new SqlParameter("@TaskID", TaskID),
                });
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public string AssignToEC_DeptMGR(int TaskID)
        {
            try
            {
                var ds = Context.ExecuteToDataSet("AssignToEC_DeptMGR", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", TaskID)
                });
                if (ds != null && ds.Tables.Count > 0)
                {

                    string Response = ds.Tables[0].Rows[0][0].ToString();
                    return Response;

                }
                return null;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public bool CheckAICRequesterIsRegionManager(int taskID)
        {
            try
            {

                return Context.ExecuteScaler("CheckAICRequesterIsRegionManager", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", taskID)
                }).ToBoolean();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public int UpdateAICFacilityRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "AIC_CFR_UpdateRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public int UpdateOccasionRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "EC_UpdateOccasionRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
			public int UpdateOvertimeManagerRequest(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "TimeAtt_UpdateOvertimeManagerRequest";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public int UpdateOvertimePresidentRequest(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "TimeAtt_UpdateOvertimePresidentRequest";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public int UpdateBusinessCardRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "UpdateBusinessCardRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public int UpdateOra_EmpTrainingRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "UpdateOra_EmpTrainingRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public int RejectViolationRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "RejectViolationRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public int SendMobileAppNotification(long TaskID, string userName,int appID,int ActionID)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "SendMobileAppNotification";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@TaskID", TaskID),
                  new SqlParameter("@UserName", userName),
                  new SqlParameter("@appID",appID),
new SqlParameter("@ActionID",ActionID),
                 
              };
                var result = Context.ExecuteNonQuery(sql, para, false).ToInt();
                //outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        
        public bool CheckExecuseApprovedByCSSO(int taskID)
        {
            try
            {

                return Context.ExecuteScaler("CheckExecuseApprovedByCSSO", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", taskID)
                }).ToBoolean();

            }
            catch (Exception)
            {

                throw;
            }
        }
        public bool CheckExecuseApprovedByCurrentUser(int taskID)
        {
            try
            {

                return Context.ExecuteScaler("CheckExecuseApprovedByCurrentUser", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@TaskID", taskID)
                }).ToBoolean();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public int UpdateRedemptionRequestStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "UpdateRedemptionRequestStatus";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
