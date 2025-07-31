using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using TimeAtt.DBContext;
using TimeAtt.Model.Models;

namespace TimeAtt.Models
{
    public enum QueryType : int
    {
        Employees = 1, Deprtment, Vacations, BusinessTrip, Execuses, ForgetFingerPrint, DeletedViolations
    }
    public enum SyncType : int
    {
        Late = 1, Absence, Penalty
    }
    public interface IOracleIntegrationRepository : IGenericRepository<EmployeeInfo>
    {


    }
    public class OracleIntegrationRepository : GenericRepository<WorkFlowDB, EmployeeInfo>, IOracleIntegrationRepository
    {

        private string conStr = "";
        private string conStrDev3 = "";
        private const string EmployeeQuery = "select * from XXTA_EMPLOYEES_INTEG LASTUPDATE";
        private const string DepartmentQuery = "select * from XXTA_DEPARTMENT_INTEG";
        private const string VacationsQuery = "select * from XXTA_EMP_VAC_INTEG";
        private const string TripsQuery = "select * from XXTA_EMP_BTRIP_INTEG";
        private const string ExecusesQuery = "select * from XXTA_EMP_PERMISSION_INTEG";
        private const string ForgetFingerPrintQuery = "select * from XXTA_FRGT_FNGR_PRNT_INTEG";
        private const string DeletedViolationsQuery = "select * from XXTA_PENALTY_INTEG_PAYROLL";

        private const string DeleteEmployeesAbsenceQuery = "DELETE FROM XXTA_ABSENCE_INTEG_PAYROLL where UPLOAD_REFERENCE = :ID";
        private const string EmployeesAbsenceQuery = "insert into  XXTA_ABSENCE_INTEG_PAYROLL (EMPLOYEE_NUMBER,UPLOAD_DATE,ABSENCE_START_DATE,ABSENCE_END_DATE,DURATION,UPLOAD_REFERENCE ) VALUES  (:1,:2,:3,:4,:5,:6 )";

        private const string EmployeesLateQuery = "insert into XXTA_LATENESS_INTEG_PAYROLL (EMPLOYEE_NUMBER,UPLOAD_DATE,LATE_DATE,DURATION,UPLOAD_REFERENCE) VALUES(:1,:2,:3,:4,:5) ";

        private const string EmployeesViolationQuery = @"insert into XXTA_PENALTY_INTEG_PAYROLL (PENALTY_ID,EMPLOYEE_NUMBER,REQUEST_DATE,VIOLATION_DATE,VIOLATION_TYPE,VIOLATION_SPECIFIC,NUMBER_OF_REPETITION,ABSENCE_DURATION,DELAY_IN_MINUTES,UPLOAD_REFERENCE,UPLOAD_STATUS) 
                                                            VALUES(:1,:2,:3,:4,:5,:6,:7,:8,:9,:10,:11) ";

        string insertTimesheetSickLeaveQuery = @"insert into XXTA.XXTA_TIMESHEET_ABSENCE_INTEG 
                            (
UPLOAD_DATE,
EMPLOYEE_NUMBER,
ABSENCE_TYPE,
ABSENCE_START_DATE,
ABSENCE_END_DATE,
DURATION,
UPLOAD_REFERENCE)
VALUES  (
SYSDATE,
:1,
:2,
:3,
:4,
:5,
:6
)";
        string insertTimeSheetSummaryQuery = @"insert into XXTA.XXTA_TIMESHEET_ELEMENT_INTEG
                            (
UPLOAD_DATE,
EMPLOYEE_NUMBER,
ELEMENT_TYPE,
ELEMENT_DATE,
VALUE,
UPLOAD_REFERENCE)
VALUES  (
SYSDATE,
:1,
:2,
:3,
:4,
:5
)";

        public OracleIntegrationRepository()
        {
            conStr = System.Configuration.ConfigurationManager.ConnectionStrings["OracleConnection"].ConnectionString;
            conStrDev3 = System.Configuration.ConfigurationManager.ConnectionStrings["OracleConnectionDev3"].ConnectionString;
        }


        private string GetQuery(QueryType queryType, DateTime? lastUpdatedDate = null)
        {
            var Query = "";
            switch (queryType)
            {
                case QueryType.Employees:
                    Query = EmployeeQuery;
                    break;
                case QueryType.Deprtment:
                    Query = DepartmentQuery;
                    break;
                case QueryType.Vacations:
                    Query = VacationsQuery;
                    break;
                case QueryType.BusinessTrip:
                    Query = TripsQuery;
                    break;
                case QueryType.Execuses:
                    Query = ExecusesQuery;
                    break;
                case QueryType.ForgetFingerPrint:
                    Query = ForgetFingerPrintQuery;
                    break;
                case QueryType.DeletedViolations:
                    Query = DeletedViolationsQuery;
                    break;
                default:
                    Query = "";
                    break;
            }
            if (lastUpdatedDate != null && lastUpdatedDate.HasValue && queryType != QueryType.DeletedViolations)
            {
                if (queryType == QueryType.Employees)
                {
                    var Where = " Where TO_DATE('" + lastUpdatedDate.Value.ToString("yyyy-MM-dd") + "','YYYY-MM-DD')" + @"
                        <= TRUNC(LASTUPDATE) and PAYROLL_ID not in (61,88,673,674,229,169,691,792,189,269,672,831,550,771,249,250,290,491)";
                    return Query + Where + " order by LASTUPDATE";
                }
                else
                {
                    var Where = " Where TO_DATE('" + lastUpdatedDate.Value.ToString("yyyy-MM-dd") + "','YYYY-MM-DD')" + " <= TRUNC(LASTUPDATE)";
                    return Query + Where + " order by LASTUPDATE";
                }
            }
            else if (queryType == QueryType.DeletedViolations)
            {
                var Where = " Where TO_DATE('" + lastUpdatedDate.Value.ToString("yyyy-MM-dd") + "','YYYY-MM-DD')" + " <= TRUNC(DELETED_DATE) and PENALTY_ID is not null ";
                return Query + Where + " order by DELETED_DATE";
            }
            else
                return Query;
        }
        public IEnumerable<dynamic> GetResultsFromQuery(QueryType queryType, DateTime? lastUpdatedDate = null)
        {
            string Query = GetQuery(queryType, lastUpdatedDate);
            //How to connect to an Oracle DB with a DB alias.
            //Uncomment below and comment above.
            //"Data Source=<service name alias>;";
            using (OracleConnection con = new OracleConnection(conStr))
            {
                using (OracleCommand cmd = con.CreateCommand())
                {
                    try
                    {
                        con.Open();
                        cmd.BindByName = true;
                        //if (lastUpdatedDate != null && lastUpdatedDate.HasValue)
                        //{
                        //    OracleParameter LASTUPDATE = new OracleParameter("LASTUPDATE", lastUpdatedDate.Value);
                        //    cmd.Parameters.Add(LASTUPDATE);
                        //}

                        cmd.CommandText = Query;
                        //Execute the command and use DataReader to display the data
                        OracleDataReader reader = cmd.ExecuteReader();
                        DataTable dt = new DataTable();
                        dt.Load(reader);

                        reader.Dispose();
                        return dt.ToDynamic();
                    }
                    catch (Exception ex)
                    {
                        throw;
                    }

                }
            }
        }



        public bool SyncResultsFromQuery(QueryType queryType, DateTime? lastUpdatedDate = null)
        {
            try
            {
                var data = GetResultsFromQuery(queryType, lastUpdatedDate);
                switch (queryType)
                {
                    case QueryType.Employees:
                        return SyncWithEmployee(data);
                    case QueryType.Deprtment:
                        return SyncWithDepartment(data);
                    case QueryType.Vacations:
                        return SyncWithVacations(data);
                    case QueryType.BusinessTrip:
                        return SyncWithBusinessTrip(data);
                    case QueryType.Execuses:
                        return SyncWithExecuses(data);
                    case QueryType.ForgetFingerPrint:
                        return SyncWithForgetFingerPrint(data);
                    case QueryType.DeletedViolations:
                        return SyncWithDeletedViolations(data);
                    default:
                        throw new NotImplementedException();
                }
            }
            catch (Exception)
            {

                throw;
            }

        }

        private bool SyncWithDeletedViolations(IEnumerable<dynamic> data)
        {

            try
            {
                var DT = new DataTable("HRDeletedViolations");
                DT.Columns.AddRange(new DataColumn[]{
                                new DataColumn("PenaltyID", typeof(long)),
                                new DataColumn("IsDeleted", typeof(string)),
                                new DataColumn("DeletedDate", typeof(DateTime))
                });
                foreach (var item in data)
                {
                    DataRow dr = DT.NewRow();
                    dr["PenaltyID"] = item.PENALTY_ID;
                    dr["IsDeleted"] = item.DELETED_FLAG;
                    dr["DeletedDate"] = item.DELETED_DATE;
                    DT.Rows.Add(dr);
                }
                SqlParameter DepTable = new SqlParameter("@HRTable", DT);
                DepTable.SqlDbType = SqlDbType.Structured;

                var ret = Context.ExecuteNonQuery("HRDeletedViolationsSyncIntegration", new System.Data.SqlClient.SqlParameter[] { DepTable }, true);
                return ret.ToInt() > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private bool SyncWithEmployee(IEnumerable<dynamic> data)
        {


            //Sample data comming from oracle database
            /*
                "EMPNO": 3257,
                "EMPNAME": "كوشي كوتورازاهيكاتو  أومن",
                "ENG_NAME": "Koshy Kottoorazhikath Oomen",
                "NATIONALTY": "Indian",
                "JOB_NAME": "APC Management.Vice Chair Secretary",
                "HIRE_DATE": "2000-10-15T00:00:00",
                "TERMINATION_DATE": null,
                "EMP_CATEGORY": null,
                "EMAIL_ADDRESS": "kkoshy@alkhorayef.com",
                "ID_NUMBER": "2074114394",
                "GRADE_NAME": "APC.Professionals.01.E",
                "PAYROLL_ID": 61,
                "PAYROLL_NAME": "APC Payroll",
                "DEPID": 126,
                "RELIGIONS": null,
                "BRANCHID_OR_OMPANYID": 141,
                "COMPANY_NAME": "APC Company",
                "MNGR_ID": 1261,
                "MNGR_NAME": "David George Henderson",
                "MNGR_EMAIL": "dhenderson@alkhorayef.com",
                "LASTUPDATE": "2018-07-16T11:44:31",
                "MOBILE_NO": "502263425",
                "DIRECT_MNGR_ID": 10976,
                "DIRECT_MNGR_NAME": "Mohamed Amin Mahmoud Abdelrazek",
                "DIRECT_MNGR_EMAIL": "mabdelrazek@alkhorayef.com"
             */
            try
            {
                var DT = new DataTable("HREmployeesTable");
                DT.Columns.AddRange(new DataColumn[]{
                    new DataColumn("EMPNO", typeof(long)),
                    new DataColumn("EMPNAME", typeof(string)),
                    new DataColumn("ENG_NAME", typeof(string)),
                    new DataColumn("REGION_ID", typeof(string)),
                    new DataColumn("REGION_NAME", typeof(string)),
                    new DataColumn("SECT_ID", typeof(string)),
                    new DataColumn("SECT_NAME", typeof(string)),
                    new DataColumn("DEPT_CODE", typeof(string)),
                    new DataColumn("DEPT_DESCRIPTION", typeof(string)),
                    new DataColumn("ORG_ID", typeof(long)),
                    new DataColumn("ORG_NAME", typeof(string)),
                    new DataColumn("POSITION", typeof(string)),
                    new DataColumn("NATIONALITY_ID", typeof(string)),
                    new DataColumn("NATIONALITY", typeof(string)),
                    new DataColumn("JOB_NAME", typeof(string)),
                    new DataColumn("HIRE_DATE", typeof(DateTime)),
                    new DataColumn("TERMINATION_DATE", typeof(DateTime)),
                    new DataColumn("GRADE", typeof(string)),
                    new DataColumn("EMP_CATID", typeof(string)),
                    new DataColumn("EMP_CATEGORY", typeof(string)),
                    new DataColumn("GROUP_NAME", typeof(string)),
                    new DataColumn("EMAIL_ADDRESS", typeof(string)),
                    new DataColumn("ID_NUMBER", typeof(string)),
                    new DataColumn("EXPIQM_GDATE", typeof(DateTime)),
                    new DataColumn("PASSPORT_NUMBER", typeof(string)),
                    new DataColumn("EXP_PASSPORT", typeof(DateTime)),
                    new DataColumn("BASIC_SAL", typeof(float )),
                    new DataColumn("HOUSE_ALLOWANCE", typeof(float )),
                    new DataColumn("TRANSPORT_ALLOWANCE", typeof(float )),
                    new DataColumn("IT_ALLOWANCE", typeof(float)),
                    new DataColumn("TOTAL_SAL", typeof(float)),
                    new DataColumn("MNGR_ID", typeof(string)),
                    new DataColumn("MNGR_NAME", typeof(string)),
                    new DataColumn("MNGR_EMAIL", typeof(string)),
                    new DataColumn("ANNUAL_BALANCE", typeof(float )),
                    new DataColumn("EMERGENCY_BALANCE", typeof(float )),
                    new DataColumn("Religions",typeof(string)),
                    new DataColumn("PAYROLL_ID", typeof(long)),
                    new DataColumn("PAYROLL_NAME", typeof(string)),
                    new DataColumn("MOBILE_NO", typeof(string)),
                    new DataColumn("DIRECT_MNGR_ID",typeof(string)),
                    new DataColumn("DIRECT_MNGR_NAME", typeof(string)),
                    new DataColumn("DIRECT_MNGR_EMAIL", typeof(string)),
                    new DataColumn("IN_OUT_KSA", typeof(string)),
                    new DataColumn("LOCATION_CODE", typeof(string)),
                    new DataColumn("JOB", typeof(string)),
                    new DataColumn("ASSIGNMENT_CATEGORY", typeof(string)),
                    new DataColumn("BirthOfDate", typeof(DateTime)),
                    new DataColumn("Gender", typeof(string)),
                    new DataColumn("FusionID", typeof(long))

                });

                foreach (var item in data)
                {
                    if (item.EMPNO == 25790)
                    {
                        Console.WriteLine("test");
                    }
                    DataRow dr = DT.NewRow();
                    dr["MOBILE_NO"] = item.MOBILE_NO;
                    dr["PAYROLL_ID"] = item.PAYROLL_ID;
                    dr["PAYROLL_NAME"] = item.PAYROLL_NAME;


                    dr["EMAIL_ADDRESS"] = (object)item.EMAIL_ADDRESS != System.DBNull.Value ? item.EMAIL_ADDRESS.Trim() : item.EMAIL_ADDRESS;


                    dr["EMP_CATEGORY"] = item.EMP_CATEGORY;
                    dr["EMPNAME"] = item.EMPNAME;
                    dr["EMPNO"] = item.EMPNO;
                    dr["ENG_NAME"] = item.ENG_NAME;
                    dr["GRADE"] = item.GRADE_NAME;
                    if (item.HIRE_DATE == null)
                        dr["HIRE_DATE"] = DBNull.Value;
                    else
                        dr["HIRE_DATE"] = item.HIRE_DATE;//DateTime.ParseExact(item.HIRE_DATE, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);
                    dr["ID_NUMBER"] = item.ID_NUMBER;
                    dr["JOB_NAME"] = item.JOB_NAME;
                    dr["MNGR_EMAIL"] = item.MNGR_EMAIL;
                    dr["MNGR_ID"] = item.MNGR_ID;
                    dr["MNGR_NAME"] = item.MNGR_NAME;
                    dr["NATIONALITY"] = item.NATIONALTY;
                    dr["ORG_ID"] = item.DEPID;
                    dr["REGION_ID"] = item.BRANCHID_OR_OMPANYID;
                    dr["REGION_NAME"] = item.COMPANY_NAME;
                    dr["Religions"] = item.RELIGIONS;
                    if (item.TERMINATION_DATE == null)
                        dr["TERMINATION_DATE"] = DBNull.Value;
                    else
                        dr["TERMINATION_DATE"] = item.TERMINATION_DATE; //DateTime.ParseExact(item.TERMINATION_DATE, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);

                    dr["DIRECT_MNGR_ID"] = item.DIRECT_MNGR_ID;
                    dr["DIRECT_MNGR_NAME"] = item.DIRECT_MNGR_NAME;
                    dr["DIRECT_MNGR_EMAIL"] = item.DIRECT_MNGR_EMAIL;
                    //this columns not included with data that retrived from oracle database
                    dr["TOTAL_SAL"] = DBNull.Value;//item.TOTAL_SAL;
                    dr["TRANSPORT_ALLOWANCE"] = DBNull.Value;//item.TRANSPORT_ALLOWANCE;
                    dr["ANNUAL_BALANCE"] = DBNull.Value; //item.ANNUAL_BALANCE;
                    dr["BASIC_SAL"] = DBNull.Value;
                    dr["SECT_ID"] = DBNull.Value;
                    dr["SECT_NAME"] = DBNull.Value;
                    dr["DEPT_CODE"] = DBNull.Value;
                    dr["DEPT_DESCRIPTION"] = DBNull.Value;
                    dr["ORG_NAME"] = DBNull.Value;
                    dr["PASSPORT_NUMBER"] = DBNull.Value;
                    dr["POSITION"] = DBNull.Value;
                    dr["NATIONALITY_ID"] = DBNull.Value;
                    dr["IT_ALLOWANCE"] = DBNull.Value; //item.IT_ALLOWANCE;
                    dr["HOUSE_ALLOWANCE"] = DBNull.Value;  //item.HOUSE_ALLOWANCE;
                    dr["GROUP_NAME"] = DBNull.Value;
                    dr["EXPIQM_GDATE"] = DBNull.Value;
                    dr["EXP_PASSPORT"] = DBNull.Value;
                    dr["EMP_CATID"] = DBNull.Value;
                    dr["EMERGENCY_BALANCE"] = DBNull.Value;
                    dr["IN_OUT_KSA"] = item.IN_OUT_KSA;
                    dr["LOCATION_CODE"] = item.LOCATION_CODE;
                    dr["JOB"] = item.JOB;
                    dr["ASSIGNMENT_CATEGORY"] = item.ASSIGNMENT_CATEGORY;
                    if (item.DATE_OF_BIRTH == null)
                        dr["BirthOfDate"] = DBNull.Value;
                    else
                        dr["BirthOfDate"] = item.DATE_OF_BIRTH;
                    if (item.SEX == null)
                        dr["Gender"] = DBNull.Value;
                    else
                        dr["Gender"] = item.SEX;
                    //if (item.EXP_PASSPORT == "")
                    //    dr["EXP_PASSPORT"] = DBNull.Value;
                    //else
                    //    dr["EXP_PASSPORT"] = DateTime.ParseExact(item.EXP_PASSPORT, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);

                    //if (item.EXPIQM_GDATE == "")
                    //    dr["EXPIQM_GDATE"] = DBNull.Value;
                    //else
                    //    dr["EXPIQM_GDATE"] = DateTime.ParseExact(item.EXPIQM_GDATE, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);
                    DT.Rows.Add(dr);
                }
                SqlParameter EmpTable = new SqlParameter("@HRTable", DT);
                EmpTable.SqlDbType = SqlDbType.Structured;

                var ret = Context.ExecuteNonQuery("HREMPSyncIntegration", new System.Data.SqlClient.SqlParameter[] { EmpTable }, true);
                return ret.ToInt() > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        private bool SyncWithDepartment(IEnumerable<dynamic> data)
        {

            //Sample data comming from oracle database
            /*
                "DEPID": 7584,
                "DEPT_CODE": null,
                "DEPNAME": "ALC B2C Sales Department - Central and North",
                "DEPPARENTID": 6198,
                "LASTUPDATE": "2018-07-16T07:58:21"
             */
            try
            {
                var DT = new DataTable("HRDepartments");
                DT.Columns.AddRange(new DataColumn[]{
                    new DataColumn("DEPID", typeof(long)),
                    new DataColumn("DEPT_CODE", typeof(string)),
                    new DataColumn("DEPNAME", typeof(string)),
                    new DataColumn("DEPPARENTID", typeof(long)),
                    new DataColumn("IN_OUT_KSA", typeof(string)),
                    new DataColumn("EffectiveEndDate", typeof(string)),
                    new DataColumn("DeptStatus", typeof(bool))
                });
                foreach (var item in data)
                {
                    DataRow dr = DT.NewRow();
                    dr["DEPID"] = item.DEPID;
                    dr["DEPT_CODE"] = item.DEPT_CODE;
                    dr["DEPNAME"] = item.DEPNAME;
                    dr["DEPPARENTID"] = item.DEPPARENTID;
                    dr["IN_OUT_KSA"] = item.IN_OUT_KSA;
                    DT.Rows.Add(dr);
                }
                SqlParameter DepTable = new SqlParameter("@HRTable", DT);
                DepTable.SqlDbType = SqlDbType.Structured;

                var ret = Context.ExecuteNonQuery("HRDepartmentSyncIntegration", new System.Data.SqlClient.SqlParameter[] { DepTable }, true);
                return ret.ToInt() > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        private bool SyncWithVacations(IEnumerable<dynamic> data)
        {
            //Sample data comming from oracle database
            /*
                "EMPNO": 14419,
                "VACID": 1100178,
                "VACNAME": "Annual Leave",
                "STARTDATE": "2017-12-20T00:00:00",
                "ENDDATE": "2017-12-21T00:00:00",
                "DAYSNO": 2,
                "LASTUPDATE": "2018-07-16T11:49:22",
                "DELETED_FLAG": "N"
             */
            try
            {

                var DT = new DataTable("HRVacationsTABLE");
                DT.Columns.AddRange(new DataColumn[]{
                                new DataColumn("EMPID", typeof(long)),
                                new DataColumn("VACID", typeof(long)),
                                new DataColumn("VACNAME", typeof(string)),
                                new DataColumn("STARTDATE", typeof(DateTime)),
                                new DataColumn("ENDDATE", typeof(DateTime)),
                                new DataColumn("DaysNo", typeof(int)),
                                new DataColumn("BTID", typeof(long)),
                                new DataColumn("DELETED_FLAG", typeof(string))

                });
                foreach (var item in data)
                {
                    DataRow dr = DT.NewRow();
                    dr["EMPID"] = item.EMPNO;
                    dr["VACID"] = item.VACID;
                    dr["VACNAME"] = item.VACNAME;
                    dr["STARTDATE"] = item.STARTDATE;
                    dr["ENDDATE"] = item.ENDDATE;
                    dr["DaysNo"] = item.DAYSNO;
                    dr["BTID"] = DBNull.Value;
                    dr["DELETED_FLAG"] = item.DELETED_FLAG;
                    DT.Rows.Add(dr);
                }
                SqlParameter VacTable = new SqlParameter("@HRVacTable", DT);
                VacTable.SqlDbType = SqlDbType.Structured;

                var ret = Context.ExecuteNonQuery("HRVacationsSyncIntegration", new System.Data.SqlClient.SqlParameter[] { VacTable }, true);
                return ret.ToInt() > 0;
            }
            catch (Exception)
            {

                throw;
            }

        }
        private bool SyncWithBusinessTrip(IEnumerable<dynamic> data)
        {
            //Sample data comming from oracle database
            /*
                "EMPNO": 15313,
                "BTID": 1197222,
                "BTNAME": "Business Trip / visit to hafar albatin for pm service volvo work",
                "BTNUMBER": null,
                "STARTDATE": "2017-12-27T00:00:00",
                "ENDDATE": "2017-12-28T00:00:00",
                "DAYSNO": 2,
                "LASTUPDATE": "2018-07-16T11:51:26",
                "DELETED_FLAG": "N"
             */
            try
            {

                var DT = new DataTable("HRVacationsTABLE");
                DT.Columns.AddRange(new DataColumn[]{
                                new DataColumn("EMPID", typeof(long)),
                                new DataColumn("VACID", typeof(long)),
                                new DataColumn("VACNAME", typeof(string)),
                                new DataColumn("STARTDATE", typeof(DateTime)),
                                new DataColumn("ENDDATE", typeof(DateTime)),
                                new DataColumn("DaysNo", typeof(int)),
                                new DataColumn("BTID", typeof(long)),
                                new DataColumn("DELETED_FLAG", typeof(string))

                });
                foreach (var item in data)
                {
                    DataRow dr = DT.NewRow();
                    dr["EMPID"] = item.EMPNO;
                    dr["VACID"] = DBNull.Value;
                    dr["VACNAME"] = item.BTNAME;
                    dr["STARTDATE"] = item.STARTDATE;
                    dr["ENDDATE"] = item.ENDDATE;
                    dr["DaysNo"] = item.DAYSNO;
                    dr["BTID"] = item.BTID;
                    dr["DELETED_FLAG"] = item.DELETED_FLAG;
                    DT.Rows.Add(dr);
                }
                SqlParameter TripTable = new SqlParameter("@HRVacTable", DT);
                TripTable.SqlDbType = SqlDbType.Structured;

                var ret = Context.ExecuteNonQuery("HRVacationsSyncIntegration", new System.Data.SqlClient.SqlParameter[] { TripTable, new SqlParameter("@IsBusinessTrip", true) }, true);
                return ret.ToInt() > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        private bool SyncWithExecuses(IEnumerable<dynamic> data)
        {
            //Sample data comming from oracle database
            /*
                "EMPNO": 13213,
                "PERMISSIONID": 1303344,
                "PERMISSIONTYPE": 1,
                "PERMISSIONDATE": "2018-07-12T00:00:00",
                "STARTTIME": "16:45",
                "ENDTIME": "17:45",
                "LASTUPDATE": "2018-07-16T11:53:45",
                "DELETED_FLAG": "N"
             */
            try
            {

                var DT = new DataTable("ExecusesTable");
                DT.Columns.AddRange(new DataColumn[]{
                                new DataColumn("EMPNO", typeof(long)),
                                new DataColumn("PERMISSIONID", typeof(long)),
                                new DataColumn("PERMISSIONTYPE", typeof(short)),
                                new DataColumn("PERMISSIONDATE", typeof(DateTime)),
                                new DataColumn("STARTTIME", typeof(string)),
                                new DataColumn("ENDTIME", typeof(string)),
                                new DataColumn("LASTUPDATE", typeof(DateTime)),
                                new DataColumn("DELETED_FLAG", typeof(string))

                });
                foreach (var item in data)
                {
                    DataRow dr = DT.NewRow();
                    dr["EMPNO"] = item.EMPNO;
                    dr["PERMISSIONID"] = item.PERMISSIONID;
                    dr["PERMISSIONTYPE"] = item.PERMISSIONTYPE;
                    dr["PERMISSIONDATE"] = item.PERMISSIONDATE;
                    dr["STARTTIME"] = item.STARTTIME;
                    dr["ENDTIME"] = item.ENDTIME;
                    dr["LASTUPDATE"] = item.LASTUPDATE;
                    dr["DELETED_FLAG"] = item.DELETED_FLAG;
                    DT.Rows.Add(dr);
                }
                SqlParameter ExecuseTable = new SqlParameter("@HRExcTable", DT);
                ExecuseTable.SqlDbType = SqlDbType.Structured;

                var ret = Context.ExecuteNonQuery("HRExecusesSyncIntegration", new System.Data.SqlClient.SqlParameter[] { ExecuseTable }, true);
                return ret.ToInt() > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        private bool SyncWithForgetFingerPrint(IEnumerable<dynamic> data)
        {
            throw new NotImplementedException();
        }

        public bool SaveEmployeesAbsenceToOracle(List<TimeAttEmployees_Absence> dt)
        {
            try
            {
                using (OracleConnection con = new OracleConnection(conStr))
                {
                    con.Open();
                    long[] Employees = new long[dt.Count];
                    DateTime[] UploadDates = new DateTime[dt.Count];
                    DateTime[] StartDates = new DateTime[dt.Count];

                    DateTime[] EndDates = new DateTime[dt.Count];
                    int[] Durations = new int[dt.Count];
                    string[] UploadReferences = new string[dt.Count];


                    for (int j = 0; j < dt.Count; j++)
                    {
                        Employees[j] = Convert.ToInt32(dt[j].EmpNo);
                        UploadDates[j] = DateTime.Now;
                        StartDates[j] = dt[j].AbsenceStart;
                        EndDates[j] = dt[j].AbsenceEnd;
                        Durations[j] = dt[j].Duration;
                        UploadReferences[j] = dt[j].UploadReference;
                    }

                    ///Delete Exists Data 

                    //// IDbTransaction trans = con.BeginTransaction(); // Turn off AUTOCOMMIT
                    //OracleCommand deleteCmd = new OracleCommand(DeleteEmployeesAbsenceQuery, con);
                    //OracleTransaction transaction=                    con.BeginTransaction(IsolationLevel.ReadCommitted);
                    //deleteCmd.Transaction = transaction;


                    //deleteCmd.Parameters.Add(new OracleParameter(":ID", UploadReferences[0]));
                    //deleteCmd.ExecuteNonQuery();
                    //deleteCmd.Dispose();
                    //transaction.Commit();

                    ///End



                    OracleParameter EmpNo = new OracleParameter();
                    EmpNo.OracleDbType = OracleDbType.Int64;
                    EmpNo.Value = Employees;

                    OracleParameter UploadDate = new OracleParameter();
                    UploadDate.OracleDbType = OracleDbType.Date;
                    UploadDate.Value = UploadDates;

                    OracleParameter AbsenceStart = new OracleParameter();
                    AbsenceStart.OracleDbType = OracleDbType.Date;
                    AbsenceStart.Value = StartDates;

                    OracleParameter AbsenceEnd = new OracleParameter();
                    AbsenceEnd.OracleDbType = OracleDbType.Date;
                    AbsenceEnd.Value = EndDates;

                    OracleParameter Duration = new OracleParameter();
                    Duration.OracleDbType = OracleDbType.Int32;
                    Duration.Value = Durations;

                    OracleParameter UploadReference = new OracleParameter();
                    UploadReference.OracleDbType = OracleDbType.Varchar2;
                    UploadReference.Value = UploadReferences;

                    // create command and set properties  
                    OracleCommand cmd = con.CreateCommand();
                    cmd.CommandText = EmployeesAbsenceQuery;
                    cmd.ArrayBindCount = Employees.Length;
                    cmd.Parameters.Add(EmpNo);
                    cmd.Parameters.Add(UploadDate);
                    cmd.Parameters.Add(AbsenceStart);
                    cmd.Parameters.Add(AbsenceEnd);
                    cmd.Parameters.Add(Duration);
                    cmd.Parameters.Add(UploadReference);
                    var ret = cmd.ExecuteNonQuery();
                    return ret.ToInt() > 0;

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public bool SaveEmployeesLateToOracle(List<TimeAttEmployees_LATE> dt)
        {
            try
            {
                //"EMPLOYEE_NUMBER,UPLOAD_DATE,LATE_DATE,DURATION,UPLOAD_REFERENCE";

                using (OracleConnection con = new OracleConnection(conStr))
                {
                    con.Open();

                    long[] Employees = new long[dt.Count];
                    DateTime[] UploadDates = new DateTime[dt.Count];
                    DateTime[] LateDates = new DateTime[dt.Count];

                    int[] Durations = new int[dt.Count];
                    string[] UploadReferences = new string[dt.Count];


                    for (int j = 0; j < dt.Count; j++)
                    {
                        Employees[j] = dt[j].EmpNo;
                        UploadDates[j] = DateTime.Now;
                        LateDates[j] = dt[j].TransactionDate;
                        Durations[j] = dt[j].TotalLate;
                        UploadReferences[j] = dt[j].UploadReference;
                    }



                    OracleParameter EmpNo = new OracleParameter();
                    EmpNo.OracleDbType = OracleDbType.Int64;
                    EmpNo.Value = Employees;

                    OracleParameter UploadDate = new OracleParameter();
                    UploadDate.OracleDbType = OracleDbType.Date;
                    UploadDate.Value = UploadDates;

                    OracleParameter LateDate = new OracleParameter();
                    LateDate.OracleDbType = OracleDbType.Date;
                    LateDate.Value = LateDates;



                    OracleParameter Duration = new OracleParameter();
                    Duration.OracleDbType = OracleDbType.Int32;
                    Duration.Value = Durations;

                    OracleParameter UploadReference = new OracleParameter();
                    UploadReference.OracleDbType = OracleDbType.Varchar2;
                    UploadReference.Value = UploadReferences;

                    // create command and set properties  
                    OracleCommand cmd = con.CreateCommand();
                    cmd.CommandText = EmployeesLateQuery;
                    cmd.ArrayBindCount = Employees.Length;
                    cmd.Parameters.Add(EmpNo);
                    cmd.Parameters.Add(UploadDate);
                    cmd.Parameters.Add(LateDate);
                    cmd.Parameters.Add(Duration);
                    cmd.Parameters.Add(UploadReference);
                    var ret = cmd.ExecuteNonQuery();
                    return ret.ToInt() > 0;

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool SaveEmployeesViolationToOracle(List<TimeAttEmployees_Violation> dt)
        {
            try
            {
                //"EMPLOYEE_NUMBER,UPLOAD_DATE,LATE_DATE,DURATION,UPLOAD_REFERENCE";

                using (OracleConnection con = new OracleConnection(conStr))
                {
                    con.Open();
                    long[] listPenaltyID = new long[dt.Count];
                    long[] listEmp = new long[dt.Count];

                    DateTime[] listRequestDate = new DateTime[dt.Count];
                    DateTime[] listViolationDate = new DateTime[dt.Count];
                    string[] listViolationType = new string[dt.Count];
                    string[] listViolationSpecific = new string[dt.Count];
                    string[] listNumberOfRepletion = new string[dt.Count];

                    int?[] listAbsenceDuration = new int?[dt.Count];
                    int?[] listDelayDuration = new int?[dt.Count];

                    string[] UploadReferences = new string[dt.Count];
                    string[] UploadStatus = new string[dt.Count];


                    for (int j = 0; j < dt.Count; j++)
                    {
                        listPenaltyID[j] = dt[j].PenaltyID;
                        listEmp[j] = dt[j].EmpNo;
                        listRequestDate[j] = DateTime.Now;
                        listViolationDate[j] = dt[j].Created;
                        listViolationType[j] = dt[j].ViolationType;
                        listViolationSpecific[j] = dt[j].ViolationSpecific;
                        listNumberOfRepletion[j] = dt[j].RepetitionValue;
                        listAbsenceDuration[j] = dt[j].AbsenceDuration;
                        listDelayDuration[j] = dt[j].DelayDuration;
                        UploadReferences[j] = dt[j].UploadReference;
                        UploadStatus[j] = dt[j].ExEmployee;
                    }



                    OracleParameter PENALTY_ID = new OracleParameter();
                    PENALTY_ID.OracleDbType = OracleDbType.Int64;
                    PENALTY_ID.Value = listPenaltyID;

                    OracleParameter EMPLOYEE_NUMBER = new OracleParameter();
                    EMPLOYEE_NUMBER.OracleDbType = OracleDbType.Int64;
                    EMPLOYEE_NUMBER.Value = listEmp;

                    OracleParameter REQUEST_DATE = new OracleParameter();
                    REQUEST_DATE.OracleDbType = OracleDbType.Date;
                    REQUEST_DATE.Value = listRequestDate;

                    OracleParameter VIOLATION_DATE = new OracleParameter();
                    VIOLATION_DATE.OracleDbType = OracleDbType.Date;
                    VIOLATION_DATE.Value = listViolationDate;

                    OracleParameter VIOLATION_TYPE = new OracleParameter();
                    VIOLATION_TYPE.OracleDbType = OracleDbType.Varchar2;
                    VIOLATION_TYPE.Value = listViolationType;

                    OracleParameter VIOLATION_SPECIFIC = new OracleParameter();
                    VIOLATION_SPECIFIC.OracleDbType = OracleDbType.Varchar2;
                    VIOLATION_SPECIFIC.Value = listViolationSpecific;

                    OracleParameter NUMBER_OF_REPETITION = new OracleParameter();
                    NUMBER_OF_REPETITION.OracleDbType = OracleDbType.Varchar2;
                    NUMBER_OF_REPETITION.Value = listNumberOfRepletion;

                    OracleParameter ABSENCE_DURATION = new OracleParameter();
                    ABSENCE_DURATION.OracleDbType = OracleDbType.Int32;
                    ABSENCE_DURATION.Value = listAbsenceDuration;

                    OracleParameter DELAY_IN_MINUTES = new OracleParameter();
                    DELAY_IN_MINUTES.OracleDbType = OracleDbType.Int32;
                    DELAY_IN_MINUTES.Value = listDelayDuration;

                    OracleParameter UPLOAD_REFERENCE = new OracleParameter();
                    UPLOAD_REFERENCE.OracleDbType = OracleDbType.Varchar2;
                    UPLOAD_REFERENCE.Value = UploadReferences;

                    OracleParameter UPLOAD_STATUS = new OracleParameter();
                    UPLOAD_STATUS.OracleDbType = OracleDbType.Varchar2;
                    UPLOAD_STATUS.Value = UploadStatus;

                    // create command and set properties  
                    OracleCommand cmd = con.CreateCommand();
                    cmd.CommandText = EmployeesViolationQuery;
                    cmd.ArrayBindCount = listEmp.Length;
                    cmd.Parameters.Add(PENALTY_ID);
                    cmd.Parameters.Add(EMPLOYEE_NUMBER);
                    cmd.Parameters.Add(REQUEST_DATE);
                    cmd.Parameters.Add(VIOLATION_DATE);
                    cmd.Parameters.Add(VIOLATION_TYPE);
                    cmd.Parameters.Add(VIOLATION_SPECIFIC);
                    cmd.Parameters.Add(NUMBER_OF_REPETITION);
                    cmd.Parameters.Add(ABSENCE_DURATION);
                    cmd.Parameters.Add(DELAY_IN_MINUTES);
                    cmd.Parameters.Add(UPLOAD_REFERENCE);
                    cmd.Parameters.Add(UPLOAD_STATUS);

                    var ret = cmd.ExecuteNonQuery();
                    return ret.ToInt() > 0;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




        public bool SaveEmployeeTimesheetToOracle(List<APCTimeSheetIntegration.TimeSheetSickLeave> model)
        {
            int effectedRow = 0;
            try
            {

                using (OracleConnection con = new OracleConnection(conStrDev3))
                {
                    OracleCommand objCmd = new OracleCommand();
                    objCmd.Connection = con;
                    con.OpenAsync();

                    long[] arEMPLOYEE_NUMBER = new long[model.Count];
                    string[] arABSENCE_TYPE = new string[model.Count];
                    DateTime[] arABSENCE_START_DATE = new DateTime[model.Count];
                    DateTime[] arABSENCE_END_DATE = new DateTime[model.Count];
                    int[] arDURATION = new int[model.Count];
                    string[] arUPLOAD_REFERENCE = new string[model.Count];

                    for (int i = 0; i < model.Count; i++)
                    {
                        //var newInsertQuery = string.Format(insertTimesheetSickLeaveQuery,
                        arEMPLOYEE_NUMBER[i] = model[i].EMPLOYEE_NUMBER;
                        arABSENCE_TYPE[i] = model[i].ABSENCE_TYPE;
                        arABSENCE_START_DATE[i] = model[i].ABSENCE_START_DATE;
                        arABSENCE_END_DATE[i] = model[i].ABSENCE_END_DATE;
                        arDURATION[i] = model[i].DURATION;
                        arUPLOAD_REFERENCE[i] = model[i].UPLOAD_REFERENCE;
                          // );
                    }

                    OracleParameter EMPLOYEE_NUMBER = new OracleParameter();
                    EMPLOYEE_NUMBER.OracleDbType = OracleDbType.Int64;
                    EMPLOYEE_NUMBER.Value = arEMPLOYEE_NUMBER;

                    OracleParameter ABSENCE_TYPE = new OracleParameter();
                    ABSENCE_TYPE.OracleDbType = OracleDbType.Varchar2;
                    ABSENCE_TYPE.Value = arABSENCE_TYPE;

                    OracleParameter ABSENCE_START_DATE = new OracleParameter();
                    ABSENCE_START_DATE.OracleDbType = OracleDbType.Date;
                    ABSENCE_START_DATE.Value = arABSENCE_START_DATE;

                    OracleParameter ABSENCE_END_DATE = new OracleParameter();
                    ABSENCE_END_DATE.OracleDbType = OracleDbType.Date;
                    ABSENCE_END_DATE.Value = arABSENCE_END_DATE;

                    OracleParameter DURATION = new OracleParameter();
                    DURATION.OracleDbType = OracleDbType.Int32;
                    DURATION.Value = arDURATION;

                    OracleParameter UPLOAD_REFERENCE = new OracleParameter();
                    UPLOAD_REFERENCE.OracleDbType = OracleDbType.Varchar2;
                    UPLOAD_REFERENCE.Value = arUPLOAD_REFERENCE;

                    OracleCommand cmd = con.CreateCommand();
                    cmd.CommandText = insertTimesheetSickLeaveQuery;
                    cmd.ArrayBindCount = arEMPLOYEE_NUMBER.Length;
                    cmd.Parameters.Add(EMPLOYEE_NUMBER);
                    cmd.Parameters.Add(ABSENCE_TYPE);
                    cmd.Parameters.Add(ABSENCE_START_DATE);
                    cmd.Parameters.Add(ABSENCE_END_DATE);
                    cmd.Parameters.Add(DURATION);
                    cmd.Parameters.Add(UPLOAD_REFERENCE);

                    effectedRow = cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return effectedRow > 0;
        }

        public bool SaveEmployeeTimesheetSummaryToOracle(List<APCTimeSheetIntegration.FieldTimeSheetSummary> model)
        {
            int effectedRow = 0;
            try
            {
 
                using (OracleConnection con = new OracleConnection(conStrDev3))
                {
                    OracleCommand objCmd = new OracleCommand();
                    objCmd.Connection = con;
                    con.OpenAsync();

                    long[] arEMPLOYEE_NUMBER = new long[model.Count];
                    string[] arELEMENT_TYPE = new string[model.Count];
                    DateTime[] arELEMENT_DATE = new DateTime[model.Count];
                    int[] arVALUE = new int[model.Count];
                    string[] arUPLOAD_REFERENCE = new string[model.Count];

                    for (int i = 0; i < model.Count; i++)
                    {
                        arEMPLOYEE_NUMBER[i] = model[i].EMPLOYEE_NUMBER;
                        arELEMENT_TYPE[i] = model[i].ELEMENT_TYPE;
                        arELEMENT_DATE[i] = model[i].ELEMENT_DATE;
                        arVALUE[i] = model[i].VALUE;
                        arUPLOAD_REFERENCE[i] = model[i].UPLOAD_REFERENCE;
                    }
                    OracleParameter EMPLOYEE_NUMBER = new OracleParameter();
                    EMPLOYEE_NUMBER.OracleDbType = OracleDbType.Int64;
                    EMPLOYEE_NUMBER.Value = arEMPLOYEE_NUMBER;

                    OracleParameter ELEMENT_TYPE = new OracleParameter();
                    ELEMENT_TYPE.OracleDbType = OracleDbType.Varchar2;
                    ELEMENT_TYPE.Value = arELEMENT_TYPE;

                    OracleParameter ELEMENT_DATE = new OracleParameter();
                    ELEMENT_DATE.OracleDbType = OracleDbType.Date;
                    ELEMENT_DATE.Value = arELEMENT_DATE;

                    OracleParameter VALUE = new OracleParameter();
                    VALUE.OracleDbType = OracleDbType.Int32;
                    VALUE.Value = arVALUE;

                    OracleParameter UPLOAD_REFERENCE = new OracleParameter();
                    UPLOAD_REFERENCE.OracleDbType = OracleDbType.Varchar2;
                    UPLOAD_REFERENCE.Value = arUPLOAD_REFERENCE;

                    OracleCommand cmd = con.CreateCommand();
                    cmd.CommandText = insertTimeSheetSummaryQuery;
                    cmd.ArrayBindCount = arEMPLOYEE_NUMBER.Length;

                    cmd.Parameters.Add(EMPLOYEE_NUMBER);
                    cmd.Parameters.Add(ELEMENT_TYPE);
                    cmd.Parameters.Add(ELEMENT_DATE);
                    cmd.Parameters.Add(VALUE);
                    cmd.Parameters.Add(UPLOAD_REFERENCE);

                    effectedRow = cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return effectedRow > 0;
        }
    }
}
