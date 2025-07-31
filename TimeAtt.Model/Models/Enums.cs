using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeAtt.Models
{
    public enum Applications
    {
        /// <summary>
        ///Time Attendance Execuse Application
        /// </summary>
        ExecuseApp = 1,

        /// <summary>
        /// Finger Print App
        /// </summary>
        FingerPrintApp = 2,
        /// <summary>
        /// Vacation App
        /// </summary>
        VacationApp =3
    }
    /// <summary>
    /// WorkFlow
    /// </summary>
    public enum WorkFlow
    {
        /// <summary>
        ///Time Attendance Execuse WorkFlow
        /// </summary>
        ExecuseWF = 1,

        /// <summary>
        ///Finger Print WorkFlow
        /// </summary>
        FingerPrintWF = 17,
        /// <summary>
        /// Vacation Workflow
        /// </summary>
        VacationWF= 18,
        RemotelyWF = 21

    }
}
