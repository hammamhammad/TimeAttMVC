namespace TimeAtt.DBContext
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Data;
using System.Collections.Generic;

    public partial class TimeAttDBModel : DBContextBase
    {
        public TimeAttDBModel()
            : base("TimeAttConnectionString")
        {
        }

        //public virtual DbSet<Constant> Constants { get; set; }
        //public virtual DbSet<EmployeeInfo> Employee { get; set; }
        //public virtual DbSet<ExecuseInfo> Execuse { get; set; }
        //public virtual DbSet<ExecuseReasonInfo> ExecuseReason { get; set; }
        //public virtual DbSet<RegionsInfo> Regions { get; set; }
        //public virtual DbSet<ScheduleInfo> Schedule { get; set; }
        //public virtual DbSet<SchedulGroupInfo> SchedulGroup { get; set; }
        //public virtual DbSet<SchedulGroupEmployees> SchedulgroupEmployees { get; set; }
        //public virtual DbSet<SectionsInfo> Sections { get; set; }
        //public virtual DbSet<ShiftInfo> Shifts { get; set; }
        //public virtual DbSet<TransReasonInfo> TransReason { get; set; }
        //public virtual DbSet<VacationsInfo> Vacations { get; set; }
        //public virtual DbSet<VacationType> Vacationtype { get; set; }
        //public virtual DbSet<LogType> Logtype { get; set; }
        //public virtual DbSet<CompanyInfo> Company { get; set; }
        //public virtual DbSet<UserLogs> Userlog { get; set; }
        //public virtual DbSet<UserPermissions> Userpermissions { get; set; }
        //public virtual DbSet<UserInfo> Users { get; set; }
        //public virtual DbSet<UsersRegions> Usersregions { get; set; }

  


    }
}
