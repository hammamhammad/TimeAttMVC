if object_id('dbo.ChangeSchedule') is not null
DROP Proc dbo.ChangeSchedule
GO
if object_id('dbo.CheckIfUserRegisterForEservices') is not null
DROP Proc dbo.CheckIfUserRegisterForEservices
GO
if object_id('dbo.CheckIsEmployeeInGroup') is not null
DROP Proc dbo.CheckIsEmployeeInGroup
GO
if object_id('dbo.CheckIsEmployeeManager') is not null
DROP Proc dbo.CheckIsEmployeeManager
GO
if object_id('dbo.CheckUserExist') is not null
DROP Proc dbo.CheckUserExist
GO
if object_id('dbo.CheckUserExistForRegester') is not null
DROP Proc dbo.CheckUserExistForRegester
GO
if object_id('dbo.CheckUserPending') is not null
DROP Proc dbo.CheckUserPending
GO
if object_id('dbo.GetallEmployeeBysecManagerid') is not null
DROP Proc dbo.GetallEmployeeBysecManagerid
GO
if object_id('dbo.GetEmployeeSearchByMangerNo') is not null
DROP Proc dbo.GetEmployeeSearchByMangerNo
GO
if object_id('dbo.GetSectionByAll') is not null
DROP Proc dbo.GetSectionByAll
GO
if object_id('dbo.GetSectionByID') is not null
DROP Proc dbo.GetSectionByID
GO
if object_id('dbo.GetTimeSheetMonthlyDetails') is not null
DROP Proc dbo.GetTimeSheetMonthlyDetails
GO
if object_id('dbo.GetTimeSheetSummry') is not null
DROP Proc dbo.GetTimeSheetSummry
GO
if object_id('dbo.GetTransaction') is not null
DROP Proc dbo.GetTransaction
GO
if object_id('dbo.GetTransactionLog') is not null
DROP Proc dbo.GetTransactionLog
GO
if object_id('dbo.GetTransDetails') is not null
DROP Proc dbo.GetTransDetails
GO
if object_id('dbo.GetUserInfoByUser') is not null
DROP Proc dbo.GetUserInfoByUser
GO
if object_id('dbo.GetUserPermssionByUser') is not null
DROP Proc dbo.GetUserPermssionByUser
GO
if object_id('dbo.GetValidateTransDetails') is not null
DROP Proc dbo.GetValidateTransDetails
GO
if object_id('dbo.IfHasPermssion') is not null
DROP Proc dbo.IfHasPermssion
GO
if object_id('dbo.InsertPendingUser') is not null
DROP Proc dbo.InsertPendingUser
GO
if object_id('dbo.IntegrateWithActiveDirectory') is not null
DROP Proc dbo.IntegrateWithActiveDirectory
GO
if object_id('dbo.IntegrateWithHREmployeeData') is not null
DROP Proc dbo.IntegrateWithHREmployeeData
GO
if object_id('dbo.IntegrateWithHRVacations') is not null
DROP Proc dbo.IntegrateWithHRVacations
GO
if object_id('dbo.Readers_GetByGroupID') is not null
DROP Proc dbo.Readers_GetByGroupID
GO
if object_id('dbo.ReadersGroups_Get') is not null
DROP Proc dbo.ReadersGroups_Get
GO
if object_id('dbo.Report_GetTimeSheetSummry_Paging') is not null
DROP Proc dbo.Report_GetTimeSheetSummry_Paging
GO
if object_id('dbo.Report_GetTimeSheetSummry_WithOutPaging') is not null
DROP Proc dbo.Report_GetTimeSheetSummry_WithOutPaging
GO
if object_id('dbo.Report_GetTransaction') is not null
DROP Proc dbo.Report_GetTransaction
GO
if object_id('dbo.Report_tb_Employee') is not null
DROP Proc dbo.Report_tb_Employee
GO
if object_id('dbo.Report_tb_Execuse') is not null
DROP Proc dbo.Report_tb_Execuse
GO
if object_id('dbo.Report_tb_Section_Tree') is not null
DROP Proc dbo.Report_tb_Section_Tree
GO
if object_id('dbo.Report_tb_Vacations') is not null
DROP Proc dbo.Report_tb_Vacations
GO
if object_id('dbo.Repotr_DailyTimeSheet') is not null
DROP Proc dbo.Repotr_DailyTimeSheet
GO
if object_id('dbo.Repotr_DailyTimeSheet_ByDate') is not null
DROP Proc dbo.Repotr_DailyTimeSheet_ByDate
GO
if object_id('dbo.Repotr_DailyTimeSheet_Paging') is not null
DROP Proc dbo.Repotr_DailyTimeSheet_Paging
GO
if object_id('dbo.Repotr_DailyTimeSheet_WithOutPaging') is not null
DROP Proc dbo.Repotr_DailyTimeSheet_WithOutPaging
GO
if object_id('dbo.Repotr_MonthlyDetailsTimeSheet') is not null
DROP Proc dbo.Repotr_MonthlyDetailsTimeSheet
GO
if object_id('dbo.Repotr_MonthlyTimeSheet') is not null
DROP Proc dbo.Repotr_MonthlyTimeSheet
GO
if object_id('dbo.schGroupByEmpID') is not null
DROP Proc dbo.schGroupByEmpID
GO
if object_id('dbo.schGroupGetAll') is not null
DROP Proc dbo.schGroupGetAll
GO
if object_id('dbo.schGroupGetByID') is not null
DROP Proc dbo.schGroupGetByID
GO
if object_id('dbo.schGroupGetEmployee') is not null
DROP Proc dbo.schGroupGetEmployee
GO
if object_id('dbo.SendEmail') is not null
DROP Proc dbo.SendEmail
GO
if object_id('dbo.SendEmailForAbsentAndIncomplate') is not null
DROP Proc dbo.SendEmailForAbsentAndIncomplate
GO
if object_id('dbo.SendNoficationForAbsent') is not null
DROP Proc dbo.SendNoficationForAbsent
GO
if object_id('dbo.SendNoficationForExecuseAdd') is not null
DROP Proc dbo.SendNoficationForExecuseAdd
GO
if object_id('dbo.SendNoficationForExecuseApprove') is not null
DROP Proc dbo.SendNoficationForExecuseApprove
GO
if object_id('dbo.SendNoficationForIncomplete') is not null
DROP Proc dbo.SendNoficationForIncomplete
GO
if object_id('dbo.SendNoficationForLate') is not null
DROP Proc dbo.SendNoficationForLate
GO
if object_id('dbo.SendViolationsEmailToEmployees') is not null
DROP Proc dbo.SendViolationsEmailToEmployees
GO
if object_id('dbo.spChangePassword') is not null
DROP Proc dbo.spChangePassword
GO
if object_id('dbo.spcheckallemplyeeshavetrans') is not null
DROP Proc dbo.spcheckallemplyeeshavetrans
GO
if object_id('dbo.spCheckEmpExists') is not null
DROP Proc dbo.spCheckEmpExists
GO
if object_id('dbo.spdeleteemployee') is not null
DROP Proc dbo.spdeleteemployee
GO
if object_id('dbo.spdeleteexecuse') is not null
DROP Proc dbo.spdeleteexecuse
GO
if object_id('dbo.spdeleteexecuseReason') is not null
DROP Proc dbo.spdeleteexecuseReason
GO
if object_id('dbo.spdeleteRegions') is not null
DROP Proc dbo.spdeleteRegions
GO
if object_id('dbo.spdeletesection') is not null
DROP Proc dbo.spdeletesection
GO
if object_id('dbo.spdeletetrans') is not null
DROP Proc dbo.spdeletetrans
GO
if object_id('dbo.spdeletetrans_twoshifts') is not null
DROP Proc dbo.spdeletetrans_twoshifts
GO
if object_id('dbo.spdeleteuptTransReason') is not null
DROP Proc dbo.spdeleteuptTransReason
GO
if object_id('dbo.spdeletevacation') is not null
DROP Proc dbo.spdeletevacation
GO
if object_id('dbo.spdeletevacationtype') is not null
DROP Proc dbo.spdeletevacationtype
GO
if object_id('dbo.spdologin') is not null
DROP Proc dbo.spdologin
GO
if object_id('dbo.spdologin_Ext') is not null
DROP Proc dbo.spdologin_Ext
GO
if object_id('dbo.spdoWindlogin_Ext') is not null
DROP Proc dbo.spdoWindlogin_Ext
GO
if object_id('dbo.spGetAllRegions') is not null
DROP Proc dbo.spGetAllRegions
GO
if object_id('dbo.spGetContinuousAbsenceRpt') is not null
DROP Proc dbo.spGetContinuousAbsenceRpt
GO
if object_id('dbo.spGetDailyTimeSheetForManager') is not null
DROP Proc dbo.spGetDailyTimeSheetForManager
GO
if object_id('dbo.spGetEmployee') is not null
DROP Proc dbo.spGetEmployee
GO
if object_id('dbo.spGetEmployeeByEmpNO') is not null
DROP Proc dbo.spGetEmployeeByEmpNO
GO
if object_id('dbo.spGetEmployeeByID') is not null
DROP Proc dbo.spGetEmployeeByID
GO
if object_id('dbo.spGetEmployeeBySec') is not null
DROP Proc dbo.spGetEmployeeBySec
GO
if object_id('dbo.spGetEmployeesummary') is not null
DROP Proc dbo.spGetEmployeesummary
GO
if object_id('dbo.spGetExecusesEmployee') is not null
DROP Proc dbo.spGetExecusesEmployee
GO
if object_id('dbo.spGetExecusesForManager') is not null
DROP Proc dbo.spGetExecusesForManager
GO
if object_id('dbo.spGetOrganization') is not null
DROP Proc dbo.spGetOrganization
GO
if object_id('dbo.spGetpenalty') is not null
DROP Proc dbo.spGetpenalty
GO
if object_id('dbo.spGetSection') is not null
DROP Proc dbo.spGetSection
GO
if object_id('dbo.spGetSectionSearch') is not null
DROP Proc dbo.spGetSectionSearch
GO
if object_id('dbo.spGetSetting') is not null
DROP Proc dbo.spGetSetting
GO
if object_id('dbo.spGetTimeSheet') is not null
DROP Proc dbo.spGetTimeSheet
GO
if object_id('dbo.spGetTimeSheetByEmp') is not null
DROP Proc dbo.spGetTimeSheetByEmp
GO
if object_id('dbo.spGetTimeSheetByEmpAndSection') is not null
DROP Proc dbo.spGetTimeSheetByEmpAndSection
GO
if object_id('dbo.spGetTimeSheetByGroup') is not null
DROP Proc dbo.spGetTimeSheetByGroup
GO
if object_id('dbo.spGetTimeSheetBySection') is not null
DROP Proc dbo.spGetTimeSheetBySection
GO
if object_id('dbo.spGetTimeSheetForEmployee') is not null
DROP Proc dbo.spGetTimeSheetForEmployee
GO
if object_id('dbo.spGetTimeSheetForManager') is not null
DROP Proc dbo.spGetTimeSheetForManager
GO
if object_id('dbo.spGetTransSummery') is not null
DROP Proc dbo.spGetTransSummery
GO
if object_id('dbo.spGetUsers') is not null
DROP Proc dbo.spGetUsers
GO
if object_id('dbo.spGetUsersRegion') is not null
DROP Proc dbo.spGetUsersRegion
GO
if object_id('dbo.spGetUserTimeSheetByEmp') is not null
DROP Proc dbo.spGetUserTimeSheetByEmp
GO
if object_id('dbo.spGetVacationByID') is not null
DROP Proc dbo.spGetVacationByID
GO
if object_id('dbo.spinsertemployee') is not null
DROP Proc dbo.spinsertemployee
GO
if object_id('dbo.spinsertexecuse') is not null
DROP Proc dbo.spinsertexecuse
GO
if object_id('dbo.spinsertexecuse_twoshifts') is not null
DROP Proc dbo.spinsertexecuse_twoshifts
GO
if object_id('dbo.spinsertexecuseFromEmployee') is not null
DROP Proc dbo.spinsertexecuseFromEmployee
GO
if object_id('dbo.spinsertexecuseReason') is not null
DROP Proc dbo.spinsertexecuseReason
GO
if object_id('dbo.spinsertpullconfig') is not null
DROP Proc dbo.spinsertpullconfig
GO
if object_id('dbo.spinsertRegions') is not null
DROP Proc dbo.spinsertRegions
GO
if object_id('dbo.spinsertschedule') is not null
DROP Proc dbo.spinsertschedule
GO
if object_id('dbo.spinsertschGroup') is not null
DROP Proc dbo.spinsertschGroup
GO
if object_id('dbo.spinsertsection') is not null
DROP Proc dbo.spinsertsection
GO
if object_id('dbo.spinsertshift') is not null
DROP Proc dbo.spinsertshift
GO
if object_id('dbo.spinserttotb_empschedual') is not null
DROP Proc dbo.spinserttotb_empschedual
GO
if object_id('dbo.spinsertTotransSummey') is not null
DROP Proc dbo.spinsertTotransSummey
GO
if object_id('dbo.spinserttrans') is not null
DROP Proc dbo.spinserttrans
GO
if object_id('dbo.spinserttrans_BioAuto') is not null
DROP Proc dbo.spinserttrans_BioAuto
GO
if object_id('dbo.spinserttrans_progeny') is not null
DROP Proc dbo.spinserttrans_progeny
GO
if object_id('dbo.spinsertuptTransReason') is not null
DROP Proc dbo.spinsertuptTransReason
GO
if object_id('dbo.spinsertuser') is not null
DROP Proc dbo.spinsertuser
GO
if object_id('dbo.spInsertUsersRegion') is not null
DROP Proc dbo.spInsertUsersRegion
GO
if object_id('dbo.spinsertvacation') is not null
DROP Proc dbo.spinsertvacation
GO
if object_id('dbo.spinsertvacationBySection') is not null
DROP Proc dbo.spinsertvacationBySection
GO
if object_id('dbo.spinsertvacationtype') is not null
DROP Proc dbo.spinsertvacationtype
GO
if object_id('dbo.spManagerApprovedExecuse') is not null
DROP Proc dbo.spManagerApprovedExecuse
GO
if object_id('dbo.spmoveemployeesection') is not null
DROP Proc dbo.spmoveemployeesection
GO
if object_id('dbo.spmovesection') is not null
DROP Proc dbo.spmovesection
GO
if object_id('dbo.sprecalculatetranssummery') is not null
DROP Proc dbo.sprecalculatetranssummery
GO
if object_id('dbo.sprecalculatetranssummery_Period') is not null
DROP Proc dbo.sprecalculatetranssummery_Period
GO
if object_id('dbo.sprecalculatetranssummery_twoshifts') is not null
DROP Proc dbo.sprecalculatetranssummery_twoshifts
GO
if object_id('dbo.spregeneratetranssummery') is not null
DROP Proc dbo.spregeneratetranssummery
GO
if object_id('dbo.spsaveorganization') is not null
DROP Proc dbo.spsaveorganization
GO
if object_id('dbo.spsavetranssummery') is not null
DROP Proc dbo.spsavetranssummery
GO
if object_id('dbo.spsavetranssummery_twoshifts') is not null
DROP Proc dbo.spsavetranssummery_twoshifts
GO
if object_id('dbo.spsaveuserlog') is not null
DROP Proc dbo.spsaveuserlog
GO
if object_id('dbo.spscheduledelete') is not null
DROP Proc dbo.spscheduledelete
GO
if object_id('dbo.spsearchExecuse') is not null
DROP Proc dbo.spsearchExecuse
GO
if object_id('dbo.spsearchVacations') is not null
DROP Proc dbo.spsearchVacations
GO
if object_id('dbo.spshiftdelete') is not null
DROP Proc dbo.spshiftdelete
GO
if object_id('dbo.spsynchronizedb') is not null
DROP Proc dbo.spsynchronizedb
GO
if object_id('dbo.spupdate_empschedual') is not null
DROP Proc dbo.spupdate_empschedual
GO
if object_id('dbo.spupdateemployee') is not null
DROP Proc dbo.spupdateemployee
GO
if object_id('dbo.spupdateemployeeW') is not null
DROP Proc dbo.spupdateemployeeW
GO
if object_id('dbo.spupdateexecuse') is not null
DROP Proc dbo.spupdateexecuse
GO
if object_id('dbo.spupdateexecuse_twoshifts') is not null
DROP Proc dbo.spupdateexecuse_twoshifts
GO
if object_id('dbo.spupdateexecuseReason') is not null
DROP Proc dbo.spupdateexecuseReason
GO
if object_id('dbo.spUpdateIncomplete') is not null
DROP Proc dbo.spUpdateIncomplete
GO
if object_id('dbo.spUpdateIncomplete_twoshifts') is not null
DROP Proc dbo.spUpdateIncomplete_twoshifts
GO
if object_id('dbo.spupdatepullconfig') is not null
DROP Proc dbo.spupdatepullconfig
GO
if object_id('dbo.spupdateRegions') is not null
DROP Proc dbo.spupdateRegions
GO
if object_id('dbo.spupdateschedule') is not null
DROP Proc dbo.spupdateschedule
GO
if object_id('dbo.spupdateschGroup') is not null
DROP Proc dbo.spupdateschGroup
GO
if object_id('dbo.spupdatesection') is not null
DROP Proc dbo.spupdatesection
GO
if object_id('dbo.spupdateshift') is not null
DROP Proc dbo.spupdateshift
GO
if object_id('dbo.spupdatetrans') is not null
DROP Proc dbo.spupdatetrans
GO
if object_id('dbo.spupdatetrans_twoshifts') is not null
DROP Proc dbo.spupdatetrans_twoshifts
GO
if object_id('dbo.spupdateuptTransReason') is not null
DROP Proc dbo.spupdateuptTransReason
GO
if object_id('dbo.spupdateuser') is not null
DROP Proc dbo.spupdateuser
GO
if object_id('dbo.spupdatevacation') is not null
DROP Proc dbo.spupdatevacation
GO
if object_id('dbo.spupdatevacationtype') is not null
DROP Proc dbo.spupdatevacationtype
GO
if object_id('dbo.spUserCanDo') is not null
DROP Proc dbo.spUserCanDo
GO
if object_id('dbo.TimeAtt__MonthlySummaryTimeSheet') is not null
DROP Proc dbo.TimeAtt__MonthlySummaryTimeSheet
GO
if object_id('dbo.TimeAtt_AddTransaction') is not null
DROP Proc dbo.TimeAtt_AddTransaction
GO
if object_id('dbo.TimeAtt_CanAddTransaction') is not null
DROP Proc dbo.TimeAtt_CanAddTransaction
GO
if object_id('dbo.TimeAtt_ChangePassword') is not null
DROP Proc dbo.TimeAtt_ChangePassword
GO
if object_id('dbo.TimeAtt_GerBrefInfoByUserName') is not null
DROP Proc dbo.TimeAtt_GerBrefInfoByUserName
GO
if object_id('dbo.TimeAtt_GetAllUsers') is not null
DROP Proc dbo.TimeAtt_GetAllUsers
GO
if object_id('dbo.TimeAtt_GetDevices') is not null
DROP Proc dbo.TimeAtt_GetDevices
GO
if object_id('dbo.TimeAtt_GetExcuseByID') is not null
DROP Proc dbo.TimeAtt_GetExcuseByID
GO
if object_id('dbo.TimeAtt_GetExecuseReason') is not null
DROP Proc dbo.TimeAtt_GetExecuseReason
GO
if object_id('dbo.TimeAtt_GetModules') is not null
DROP Proc dbo.TimeAtt_GetModules
GO
if object_id('dbo.TimeAtt_GetPermissionGroups') is not null
DROP Proc dbo.TimeAtt_GetPermissionGroups
GO
if object_id('dbo.TimeAtt_GetPrivileges') is not null
DROP Proc dbo.TimeAtt_GetPrivileges
GO
if object_id('dbo.TimeAtt_GetSectionsByUsername') is not null
DROP Proc dbo.TimeAtt_GetSectionsByUsername
GO
if object_id('dbo.TimeAtt_GetTimeSheetMonthlyDetails') is not null
DROP Proc dbo.TimeAtt_GetTimeSheetMonthlyDetails
GO
if object_id('dbo.TimeAtt_GetTimeSheetMonthlyDetailsForEmployee') is not null
DROP Proc dbo.TimeAtt_GetTimeSheetMonthlyDetailsForEmployee
GO
if object_id('dbo.TimeAtt_GetTransaction') is not null
DROP Proc dbo.TimeAtt_GetTransaction
GO
if object_id('dbo.TimeAtt_GetTransactionByID') is not null
DROP Proc dbo.TimeAtt_GetTransactionByID
GO
if object_id('dbo.TimeAtt_GetTransactionForEmployee') is not null
DROP Proc dbo.TimeAtt_GetTransactionForEmployee
GO
if object_id('dbo.TimeAtt_GetTransDetails') is not null
DROP Proc dbo.TimeAtt_GetTransDetails
GO
if object_id('dbo.TimeAtt_GetTransDetails_Paging') is not null
DROP Proc dbo.TimeAtt_GetTransDetails_Paging
GO
if object_id('dbo.TimeAtt_GetTransDetails_WithoutPaging') is not null
DROP Proc dbo.TimeAtt_GetTransDetails_WithoutPaging
GO
if object_id('dbo.TimeAtt_GetUserInfoByID') is not null
DROP Proc dbo.TimeAtt_GetUserInfoByID
GO
if object_id('dbo.TimeAtt_PermissionGroupsDelete') is not null
DROP Proc dbo.TimeAtt_PermissionGroupsDelete
GO
if object_id('dbo.TimeAtt_PermissionGroupsGetByID') is not null
DROP Proc dbo.TimeAtt_PermissionGroupsGetByID
GO
if object_id('dbo.TimeAtt_PermissionGroupsInsert') is not null
DROP Proc dbo.TimeAtt_PermissionGroupsInsert
GO
if object_id('dbo.TimeAtt_PermissionGroupsUpdate') is not null
DROP Proc dbo.TimeAtt_PermissionGroupsUpdate
GO
if object_id('dbo.TimeAtt_spCanEmployeeAddExecuse') is not null
DROP Proc dbo.TimeAtt_spCanEmployeeAddExecuse
GO
if object_id('dbo.TimeAtt_spCanManagerAddExecuse') is not null
DROP Proc dbo.TimeAtt_spCanManagerAddExecuse
GO
if object_id('dbo.TimeAtt_spDeleteFaieldexecuse') is not null
DROP Proc dbo.TimeAtt_spDeleteFaieldexecuse
GO
if object_id('dbo.TimeAtt_spGetDailyTimeSheetForManager') is not null
DROP Proc dbo.TimeAtt_spGetDailyTimeSheetForManager
GO
if object_id('dbo.TimeAtt_spGetEmployee') is not null
DROP Proc dbo.TimeAtt_spGetEmployee
GO
if object_id('dbo.TimeAtt_spGetShiftInfoByEmpAndDate') is not null
DROP Proc dbo.TimeAtt_spGetShiftInfoByEmpAndDate
GO
if object_id('dbo.TimeAtt_spinsertexecuseFromEmployee') is not null
DROP Proc dbo.TimeAtt_spinsertexecuseFromEmployee
GO
if object_id('dbo.TimeAtt_spinsertexecuseFromManager') is not null
DROP Proc dbo.TimeAtt_spinsertexecuseFromManager
GO
if object_id('dbo.TimeAtt_spinsertvacation') is not null
DROP Proc dbo.TimeAtt_spinsertvacation
GO
if object_id('dbo.TimeAtt_UpdateEmpExecuseFromWorkFlow') is not null
DROP Proc dbo.TimeAtt_UpdateEmpExecuseFromWorkFlow
GO
if object_id('dbo.TimeAtt_UpdateTransactionFromWorkFlow') is not null
DROP Proc dbo.TimeAtt_UpdateTransactionFromWorkFlow
GO
if object_id('dbo.TimeAtt_UsersInsert') is not null
DROP Proc dbo.TimeAtt_UsersInsert
GO
if object_id('dbo.TimeAtt_UsersUpdate') is not null
DROP Proc dbo.TimeAtt_UsersUpdate
GO
if object_id('dbo.TransGetByGroupReadrs') is not null
DROP Proc dbo.TransGetByGroupReadrs
GO
if object_id('dbo.UpdateHREmployeeIntegrationSettings') is not null
DROP Proc dbo.UpdateHREmployeeIntegrationSettings
GO
if object_id('dbo.UpdateHRVacationsIntegrationSettings') is not null
DROP Proc dbo.UpdateHRVacationsIntegrationSettings
GO
if object_id('dbo.uptTransReason_GetAll') is not null
DROP Proc dbo.uptTransReason_GetAll
GO
if object_id('dbo.usp_GetErrorInfo') is not null
DROP Proc dbo.usp_GetErrorInfo
GO

CREATE PROCEDURE [dbo].[ChangeSchedule] @sch_ID INT,
	@ByAllEmployees BIT,
	@BySection INT,
	@ByRegion BIGINT,
	@Username NVARCHAR(150)
AS
BEGIN
	DECLARE @RowCount INT,
		@CurrentDate INT

	SELECT @CurrentDate = dbo.getnofromdate(getdate())

	IF @ByAllEmployees = 1
	BEGIN
		UPDATE tb_employee
		SET emp_sch = @sch_ID
		WHERE emp_deleted = 0
		and emp_id in(select emp_id from dbo.GetEmployeeByUserRegion(@Username))

		SELECT @RowCount = @@ROWCOUNT
	END
	ELSE IF @BySection > 0
	BEGIN
		UPDATE tb_employee
		SET emp_sch = @sch_ID
		WHERE emp_section IN (
				SELECT emp_id
				FROM tb_employee
				WHERE EXISTS (
						SELECT 1
						FROM dbo.GetSectionUnderManager('', @BySection) t
						WHERE t.sec_ID = emp_section
						)
				)
				and emp_id in(select emp_id from dbo.GetEmployeeByUserRegion(@Username))

		SELECT @RowCount = @@ROWCOUNT

		UPDATE tb_section
		SET sec_sch = @sch_ID
		WHERE sec_ID = @BySection
	END
	ELSE IF @ByRegion > 0
	BEGIN
		UPDATE tb_employee
		SET emp_sch = @sch_ID
		WHERE emp_region = @ByRegion
		and emp_id in(select emp_id from dbo.GetEmployeeByUserRegion(@Username))
		SELECT @RowCount = @@ROWCOUNT
	END

	IF @RowCount > 0
		EXEC spsaveuserlog 11,
			@sch_ID,
			4,
			@UserName,
			0,
			'',
			@CurrentDate

	SELECT @RowCount
END















GO
CREATE procedure [dbo].[CheckIfUserRegisterForEservices]
@username nvarchar(150)
as
begin

IF EXISTS (
			SELECT 1
			FROM tb_PendingUsers
			WHERE username = @username
				AND st IS NULL
			)
		RETURN - 1
	IF EXISTS (
			SELECT 1
			FROM tb_PendingUsers
			WHERE isnull(empno,0)<>0
				AND username = @username
				AND st = 1
			)
		RETURN - 2
return 1
end



GO
  CREATE PROCEDURE [dbo].[CheckIsEmployeeInGroup]
	 @schGroup_id int
     ,@schEmployees NVARCHAR(max)
AS
BEGIN
declare @result int=0
if len(ltrim(rtrim(@schEmployees))) >0
    begin
    DECLARE @text NVARCHAR(max),@employees NVARCHAR(max)
 	SET @text = 'select emp_id from tb_employee where emp_id in (' + @schEmployees + ')'
	CREATE TABLE #tbl (
		id INT identity(1, 1)
		,emp_id NVARCHAR(250)
		)
	DECLARE @textInsert NVARCHAR(max)
	SET @textInsert = 'Insert into #tbl(emp_id)  ' + @text
	EXEC (@textInsert)
	select @result = 1 from tb_schGroupEmployees
	   join tb_schGroup
	   on tb_schGroupEmployees.schGroup_id=tb_schGroup.schGroup_id
	  join #tbl t
	  on tb_schGroupEmployees.emp_id=t.emp_id
	   where    tb_schGroupEmployees.schGroup_id <> @schGroup_id
	   and tb_schGroup.schGroup_deleted=0
   end	   
	return isnull(@result,0)
END


















GO
  create PROCEDURE [dbo].[CheckIsEmployeeManager]
	 @emp_id int
	,@username NVARCHAR(50)
AS
BEGIN
	declare @result  int=0
	select @result=1 from dbo.GetSectionUnderManager(@username,-1) tbl
	   join tb_employee
	   on tb_employee.emp_section=tbl.sec_ID
	   where tb_employee.emp_id=  @emp_id
	return @result
END


















GO
CREATE PROCEDURE [dbo].[CheckUserExist]
	@username NVARCHAR(50)
AS
BEGIN
if exists (select 1 from tb_PendingUsers  where [username] =@username )
return 1
else
return -1
--	BEGIN TRY
--		IF EXISTS (
--				SELECT 1
--				FROM tb_users
--				WHERE user_name = @username
--				)
--			RETURN 1
--		DECLARE @user_empid INT
--			,@emp_no NVARCHAR(50),@query nvarchar(500)
--		DECLARE @tab TABLE (
--			EmployeeId NVARCHAR(50)
--			,EmpName NVARCHAR(250)
--			,EmpTypeID INT
--			,DepartmentID NVARCHAR(10)
--			,DepartmentName NVARCHAR(250)
--			,Rankcode NVARCHAR(50)
--			,JobName NVARCHAR(150)
--			,CivilID NVARCHAR(50)
--			,UserName NVARCHAR(50)
--			,Email NVARCHAR(250)
--			)
--set @query='select EmployeeId ,EmpName ,EmpTypeID ,DepartmentID,DepartmentName,Rankcode ,JobName , CivilID,UserName ,Email from Openquery([MCI-HR],''select * FROM [MCI-HR].[FingerPrint].[dbo].[VW_EmpBasicPasma] where username= ''''' + @username + ''''''')' 
--		INSERT INTO @tab (
--			EmployeeId
--			,EmpName
--			,EmpTypeID
--			,DepartmentID
--			,DepartmentName
--			,Rankcode
--			,JobName
--			,CivilID
--			,UserName
--			,Email
--			)
--		exec(@query)
--		if (select count(1) from @tab)>1
--		return -2
--	select  @emp_no=EmpInfo.EmployeeId  from @tab EmpInfo
--	if @emp_no is null
--	return -3
--	select @user_empid=emp_id from tb_employee where emp_no=@emp_no 
--	if @user_empid is null return -4
--	INSERT INTO [dbo].[tb_users]
--           ([user_name]
--           ,[user_pass]
--           ,[user_per]
--           ,[user_empid]
--           ,[user_active])
--     VALUES
--           (@username 
--           ,'123'
--           ,3
--           ,@user_empid
--           ,1)
--		RETURN 1
--	END TRY
--	BEGIN CATCH
--	DECLARE @ErrorMessage NVARCHAR(4000);
--	DECLARE @ErrorSeverity INT;
--	DECLARE @ErrorState INT;
--	SELECT @ErrorMessage = ERROR_MESSAGE()
--		, @ErrorSeverity = ERROR_SEVERITY()
--		, @ErrorState = ERROR_STATE();
--	select @ErrorMessage
--		RETURN -5
--	END CATCH
END


















GO
CREATE PROCEDURE [dbo].[CheckUserExistForRegester]
	@username NVARCHAR(50)
AS
BEGIN
if exists (select 1 from tb_PendingUsers  where [username] =@username )
begin
SELECT 'OK' [Status], '' Response
end

else
begin
SELECT 'Exception' [Status], N'أنت غير مسجل في نظام خدماتي لتنفيذ طلب الاستئذان' Response

	RETURN;
end
END



GO
CREATE PROCEDURE [dbo].[CheckUserPending] @empno NVARCHAR(50),
	@username NVARCHAR(150)
AS
BEGIN
SET NOCOUNT ON
	IF EXISTS (
			--waiting for approval
			SELECT 1
			FROM tb_PendingUsers
			WHERE empno = @empno
				AND username = @username
				AND st IS NULL
			)
		RETURN - 1
	IF EXISTS (
			--rejected
			SELECT 1
			FROM tb_PendingUsers
			WHERE empno = @empno
				AND username = @username
				AND st = 0
			)
		RETURN - 2
	IF EXISTS (
			--approved
			SELECT 1
			FROM tb_PendingUsers
			WHERE empno = @empno
				AND username = @username
				AND st = 1
			)
		RETURN 1
	RETURN 2
END
















GO
CREATE PROCEDURE [dbo].[GetallEmployeeBysecManagerid] @user_name NVARCHAR(100)
AS
BEGIN
	DECLARE @secmanager_id INT
	SELECT @secmanager_id = user_empid
	FROM dbo.tb_users
	WHERE [user_name] = @user_name;
	IF @secmanager_id IS NULL
		SET @secmanager_id = 0
	ELSE
		IF @secmanager_id = 0
			SET @secmanager_id = - 1
	SET @secmanager_id = ISNULL(@secmanager_id, 0);
	WITH RecursionCTE (
		id
		,Parent
		,emp_name
		,managername
		)
	AS (
		SELECT emp_id
			,secmanagerid
			,emp_name
			,secmanagername
		FROM dbo.view_employee
		WHERE (secmanagerid = @secmanager_id)
		UNION ALL
		SELECT emp_id
			,secmanagerid
			,view_employee.emp_name
			,view_employee.secmanagername
		FROM dbo.view_employee
		JOIN RecursionCTE AS R2 ON secmanagerid = R2.id
		)
	SELECT T1.emp_id
		,T1.secmanagerid
		,T1.emp_name
		,T1.secmanagername
	FROM view_employee AS R1
	INNER JOIN view_employee AS T1 ON R1.emp_id = T1.emp_id
	JOIN RecursionCTE AS R2 ON R1.emp_id = R2.id
END


















GO
CREATE PROCEDURE GetEmployeeSearchByMangerNo @Mangr_No BIGINT,
	@Key NVARCHAR(500)
AS
BEGIN
	SELECT emp_id,emp_no,
		emp_name,sec_Name
	FROM [dbo].[GetAllEmployeeByManager](@Mangr_No) Mng
	inner join tb_section on Mng.emp_section =tb_section.sec_ID
	WHERE emp_no LIKE isnull(@Key, '') + N'%'
		OR emp_name LIKE N'%' + isnull(@Key, '') + '%'
END















GO
CREATE PROCEDURE [dbo].[GetSectionByAll]
AS
BEGIN
	SELECT tb_section.*,
		isnull(empmanager.emp_name, '') sec_managerName,
		isnull(sempmanager.emp_name, '') sec_secondmanagerName,
		isnull(tb_schedule.sch_name, '') sch_name
	FROM tb_section
	LEFT JOIN tb_employee empmanager
		ON tb_section.sec_manager = empmanager.emp_id
	LEFT JOIN tb_employee sempmanager
		ON tb_section.sec_secondmanager = sempmanager.emp_id
	LEFT JOIN tb_schedule
		ON tb_schedule.sch_id = sec_sch
END















GO
CREATE PROCEDURE [dbo].[GetSectionByID] @Sec_ID INT
AS
BEGIN
	SELECT tb_section.*,
		isnull(empmanager.emp_name, '') sec_managerName,
		isnull(sempmanager.emp_name, '') sec_secondmanagerName,
		isnull(tb_schedule.sch_name, '') sch_name
	FROM tb_section
	LEFT JOIN tb_employee empmanager
		ON tb_section.sec_manager = empmanager.emp_id
	LEFT JOIN tb_employee sempmanager
		ON tb_section.sec_secondmanager = sempmanager.emp_id
	LEFT JOIN tb_schedule
		ON tb_schedule.sch_id = sec_sch
	WHERE sec_ID = @Sec_ID
END















GO

CREATE PROCEDURE [dbo].[GetTimeSheetMonthlyDetails] @fm_date INT
	,@tm_date INT
	,@emp_id INT
	,@username NVARCHAR(100) = NULL
AS
BEGIN
	--------			
	SELECT *
	FROM dbo.GetTimeSheetSummryTable(@fm_date, @tm_date, @emp_id, NULL, @username, NULL)

	SELECT tb_transSummey.m_date m_dateno
		,dbo.GetDayOfName(tb_transSummey.m_date) + ' ' + dbo.GetDateAsString(tb_transSummey.m_date) AS m_date
		,dbo.GetDayOfName(tb_transSummey.m_date) AS NameOfDay
		,tb_transSummey.m_timefin
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefin), N'--:--') AS timefin
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefout), N'--:--') AS timefout
		,ISNULL(tb_transSummey.m_flatein, N'--:--') AS fLateIn
		,ISNULL(tb_transSummey.m_fearlyout, N'--:--') AS fEarlyout
		,ISNULL(tb_transSummey.m_timesin, N'--:--') AS timesin
		,ISNULL(tb_transSummey.m_timesout, N'--:--') AS timesout
		,ISNULL(tb_transSummey.m_slatein, N'--:--') AS sLateIn
		,ISNULL(tb_transSummey.m_searlyout, N'--:--') AS sEarlyout
		,ISNULL(tb_transSummey.m_timetotal, N'--:--') AS timeTotal
		,ISNULL(tb_transSummey.m_actualtime, N'--:--') AS ActualTime
		,ISNULL(tb_transSummey.m_latein, N'--:--') AS LateIn
		,ISNULL(tb_transSummey.m_overtime, N'--:--') AS OverTime
		,ISNULL(tb_transSummey.m_totallate, N'--:--') AS TotalLate
		,ISNULL(tb_transSummey.m_earlyout, N'--:--') AS Earlyout
		,m_vac_id AS vac_id
		,m_manual
		,Isnull(exc_id, 0) exc_id
		,CASE 
			WHEN exc_id IS NOT NULL
				THEN exc_hours
			ELSE '--:--'
			END ExecuseTime
		,execuseReason_name
	FROM tb_transSummey(NOLOCK)
	INNER JOIN tb_employee(NOLOCK) ON tb_transSummey.m_id = tb_employee.emp_card
	INNER JOIN [dbo].[GetEmployeeByUserRegion](@username) empreg ON tb_employee.emp_id = empreg.emp_id
	LEFT JOIN tb_execuse(NOLOCK) ON tb_employee.emp_id = tb_execuse.exc_empid
		AND tb_transSummey.m_date = tb_execuse.exc_date
		AND exc_status = 1
		AND ApprovalByManager = 'EAS02'
		AND exc_deleted = 0
	LEFT JOIN tb_execuseReason(NOLOCK) ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
	WHERE tb_employee.emp_id = @emp_id
		AND (
			tb_transSummey.m_date BETWEEN @fm_date
				AND @tm_date
			)
		AND (tb_employee.emp_deleted = 0)
		AND (tb_employee.emp_violatedException <> 1)
	ORDER BY tb_transSummey.m_date
		,tb_transSummey.m_id
END















GO
CREATE PROC [dbo].[GetTimeSheetSummry] @fm_date INT
	,@tm_date INT
	,@emp_id INT = NULL
	,@secid INT = NULL
	,@username nvarchar(100)=null
	,@reg_id INT = NULL
AS
BEGIN
	--------			
--	EXEC spcheckallemplyeeshavetrans;

	SELECT *
	FROM dbo.GetTimeSheetSummryTable(@fm_date, @tm_date, @emp_id, @secid,@username,@reg_id)
END

















GO
CREATE PROCEDURE [dbo].[GetTransaction]
	-- Add the parameters for the stored procedure here
	@f_date INT,
	@t_date INT,
	@emp_id INT,
	@secID INT = - 1,
	@username NVARCHAR(100) = NULL,
	@reg_id INT = NULL
AS
BEGIN
	DECLARE @tbl TABLE (
		sec_ID INT,
		sec_Name NVARCHAR(500)
		)
	INSERT INTO @tbl
	SELECT sec_ID,
		sec_Name
	FROM dbo.GetSectionUnderManager(NULL, @secID)
	SELECT dbo.tb_trans.trans_id,
		dbo.tb_trans.m_id,
		dbo.GetDateAsString(m_date) AS m_date,
		dbo.GetDateAsString(m_date) AS m_date_h,
		m_date dateno,
		dbo.GetDayOfName(m_date) AS NameOfDay,
		dbo.tb_trans.m_time,
		dbo.tb_trans.m_status,
		dbo.tb_employee.emp_no,
		dbo.tb_employee.emp_card,
		dbo.tb_employee.emp_name,
		dbo.tb_employee.emp_id,
		dbo.tb_trans.m_deleted,
		dbo.tb_trans.m_mode,
		dbo.tb_trans.m_manual,
		isnull(dbo.tb_trans.m_unitid, 0) m_unitid,
		ISNULL(m_unitname, N'مدخلة يدوياً') AS m_unit,
		CASE 
			WHEN m_status = 1
				THEN 'Success'
			ELSE 'Fail'
			END AS SStatus,
		CASE 
			WHEN m_status = 1
				THEN N'ناجحة'
			ELSE N'فاشلة'
			END AS AStatus
	FROM dbo.tb_trans
	INNER JOIN dbo.tb_employee
		ON dbo.tb_trans.m_id = dbo.tb_employee.emp_card
	INNER JOIN [dbo].[GetEmployeeByUserRegion](@username) empreg
		ON tb_employee.emp_id = empreg.emp_id
	WHERE (
			tb_employee.emp_id = @emp_id
			OR @emp_id = - 1
			)
		AND (
			EXISTS (
				SELECT 1
				FROM @tbl t
				WHERE t.sec_ID = emp_section
				)
			OR @secID = - 1
			)
		AND (
			m_date BETWEEN @f_date
				AND @t_date
			)
		AND (
			@reg_id IS NULL
			OR emp_region = @reg_id
			)
	ORDER BY m_date,
		m_time
END
















GO
CREATE PROCEDURE [dbo].[GetTransactionLog]
	@f_date INT
	,@t_date INT
	,@emp_id INT=null
	,@secid INT=null
AS
BEGIN
	SELECT dbo.tb_trans.trans_id
		,dbo.tb_trans.m_id
		,dbo.tb_employee.emp_name
		,dbo.getdatefromno(ModifiedDate) AS ModifiedDate
			,dbo.GetDayOfName(ModifiedDate) AS NameOfDay
		,dbo.tb_translog.m_timeModified
		,dbo.tb_translog.m_timeNew
		,dbo.tb_trans.m_time
		,dbo.tb_translog.ModifiedBy
		,dbo.tb_translog.transtype
		,case when dbo.tb_translog.transtype=1 then N'جديد' else N'تعديل' end transtypeArabic
		,case when dbo.tb_translog.transtype=1 then N'New' else N'Update' end transtypeEnglish
		,dbo.tb_uptTransReason.uptTransReason_name ModifiedReason
	FROM dbo.tb_trans
	INNER JOIN dbo.tb_employee ON dbo.tb_trans.m_id = dbo.tb_employee.emp_card
	join tb_translog
	 on tb_trans.trans_id=tb_translog.trans_id
	 join tb_uptTransReason
	  on tb_translog.TransReasonID=tb_uptTransReason.uptTransReason_id
	WHERE 
		 m_date BETWEEN @f_date
			AND @t_date
			and (emp_id = @emp_id or @emp_id is null)
			and (emp_section in(select sec_ID from dbo.GetSectionUnderManager(null,@secid))  or @secid is null)
	ORDER BY m_date
		,m_time
END


















GO
CREATE PROCEDURE [dbo].[GetTransDetails]
	-- Add the parameters for the stored procedure here
	@m_date INT
	,@emp_id INT
AS
BEGIN
	SELECT dbo.tb_trans.trans_id
		,dbo.tb_trans.m_id
		,dbo.getdatefromno(dbo.tb_trans.m_date) AS m_date
			,dbo.GetDayOfName(m_date) AS NameOfDay
		,dbo.tb_trans.m_time
		,dbo.tb_trans.m_status
		,dbo.tb_trans.m_typ
		,CASE 
			WHEN m_status = 1
				THEN 'Success'
			ELSE 'Fail'
			END AS SStatus
			,CASE 
			WHEN m_status = 1
				THEN N'ناجحة'
			ELSE N'فاشلة'
			END AS AStatus
		,dbo.tb_employee.emp_no
		,cast(dbo.tb_employee.emp_card as nvarchar)emp_card
		,dbo.tb_employee.emp_name
		,dbo.tb_employee.emp_id
		,dbo.tb_trans.m_deleted
		,dbo.tb_trans.m_mode
		,dbo.tb_trans.m_manual
		,isnull(dbo.tb_trans.m_unitid,0)m_unitid
		,ISNULL(m_unitname, N'مدخلة يدوياً') AS m_unit
		,tb_uptTransReason.uptTransReason_id ModifiedReasonID
		,tb_uptTransReason.uptTransReason_name  ModifiedReason
		,dbo.tb_trans.m_transtype
		,ISNULL(dbo.tb_trans.CV_CODE,1) CV_CODE
	FROM dbo.tb_trans
	INNER JOIN dbo.tb_employee ON dbo.tb_trans.m_id = dbo.tb_employee.emp_card
	        left join (select max(translog_id) translog_id,trans_id from tb_translog group by trans_id) t
			on tb_trans.trans_id= t.trans_id
			left join tb_translog
			on t.translog_id=tb_translog.translog_id
			left join tb_uptTransReason
		 	on tb_translog.TransReasonID=tb_uptTransReason.uptTransReason_id
	WHERE emp_id = @emp_id
		AND m_date = @m_date
	ORDER BY m_time
END


















GO
CREATE PROCEDURE [dbo].[GetUserInfoByUser] @username NVARCHAR(100)
AS
BEGIN
--exec CheckUserExist @username
	SELECT tb_users.[user_name]
		,tb_users.[user_id]
		,tb_users.user_per
		,tb_users.user_empid
		,tb_users.user_mustchangepassword 
		,tb_employee.emp_no
		,tb_employee.emp_name
	FROM tb_users
	LEFT JOIN tb_employee ON tb_employee.emp_id = tb_users.user_empid
	WHERE user_name = @username
		AND tb_users.user_active = 1
END


















GO
Create PROCEDURE [dbo].[GetUserPermssionByUser] @username NVARCHAR(100)
AS
BEGIN
	SELECT group_no
		,prev_name
		,prev_ok
	FROM tb_users
	JOIN tb_userperm ON user_id = user_no
	WHERE user_name = @username
END


















GO
Create PROCEDURE [dbo].[GetValidateTransDetails]
	 @m_date INT
	,@emp_id INT
	,@m_time AS NVARCHAR(12)
	,@isnew  bit
AS
BEGIN
    declare @m_id bigint
    select @m_id =emp_card from tb_employee where emp_id=@emp_id
  if (select count(1) from tb_trans	WHERE m_id = @m_id AND m_date = @m_date  )=0
  begin
      select -1  --لا يوجد حركات للموظف
      return 
  end
  if  (@isnew =1) and (select count(1) from tb_trans	WHERE m_id = @m_id AND m_date = @m_date and m_transtype=2 and m_deleted=0)> 0
  begin
      select -2 --يوجد حركة مخافة سابقة
      return 
  end
    Declare  @sid int,@shift_fin nvarchar(12), @shift_fout nvarchar(12)
  	SELECT @sid = dbo.GeatSchedualID(@emp_id, @m_date)
  	SELECT @shift_fin = shift_fin
		  ,@shift_fout = shift_fout
	FROM tb_shift
	WHERE shift_id = @sid
  if   DATEDIFF(minute, @m_time, @shift_fin)> 0
  begin
      select -3 --يجب ان يكون الوقت اكبر من وقت دخول الموظف
      return 
  end
 if   DATEDIFF(minute, @shift_fout ,@m_time)> 0
  begin
      select -4 --يجب ان يكون الوقت اقل من وقت خروج الموظف
      return 
  end
Declare  @exc_ftime nvarchar(12), @exc_ttime nvarchar(12)
select @exc_ftime=exc_ftime,@exc_ttime=exc_ttime from tb_Execuse  WHERE exc_empid = @emp_id AND exc_date = @m_date and exc_status=1 and exc_deleted=0
if @exc_ftime is not null and   (( DATEDIFF(minute, @exc_ftime ,@m_time) > 0) and ( DATEDIFF(minute, @exc_ttime ,@m_time) < 0)) 
  begin
      select -5 --يوجد إستئذان للموظف في هذا الوقت
      return 
  end
  select 1
end


















GO

CREATE PROCEDURE [dbo].[IfHasPermssion] @userID INT
	,@group_no INT
	,@prev_name NVARCHAR(150)
AS
BEGIN
	DECLARE @GroupID INT
		,@user_per SMALLINT
		,@user_active BIT

	SELECT @GroupID = user_Group
		,@user_per = user_per
		,@user_active = user_active
	FROM tb_users
	WHERE user_id = @userID

	IF isnull(@user_active, 0) = 0
	BEGIN
		SELECT cast(0 AS BIT)

		RETURN;
	END

	IF isnull(@user_per, 0) = 1
	BEGIN
		SELECT cast(1 AS BIT)

		RETURN;
	END

	IF isnull(@GroupID, 0) = 0
	BEGIN
		SELECT cast(0 AS BIT)

		RETURN;
	END

	IF isnull(@user_per, 0) = 2
	BEGIN
		IF EXISTS (
				SELECT 1
				FROM [tb_Permissions] PS
				INNER JOIN [tb_Privilege] PR
					ON PS.Prev_ID = PR.PrivilegeID
				WHERE PR.PrivilegeName = @prev_name AND PR.ModuleID = @group_no AND PS.IsOK = 1 AND PS.GroupID = @GroupID
				)
			SELECT cast(1 AS BIT)
		ELSE
			SELECT cast(0 AS BIT)
	END

	SELECT cast(0 AS BIT)
END















GO

CREATE PROCEDURE [dbo].[InsertPendingUser] @username NVARCHAR(150)
	, @useremail NVARCHAR(150)
	, @empno NVARCHAR(50)
	, @empname NVARCHAR(150)
	, @empnameen NVARCHAR(150)
	, @empextno NVARCHAR(10)
	, @empsector NVARCHAR(150)
	, @managerusername NVARCHAR(150)
	, @manageremail NVARCHAR(150)
	, @emporg NVARCHAR(150)
	, @empbranch NVARCHAR(150)
	, @empjobtitle NVARCHAR(150)
	, @branchid NVARCHAR(50)
	, @sectorid NVARCHAR(50)
	, @orgid NVARCHAR(50)
	, @natid NVARCHAR(15)
	, @jobGrade NVARCHAR(50)
	, @managerempno NVARCHAR(50)
	, @deflang NVARCHAR(50) = 'Ar'
AS
BEGIN
	DECLARE @ID INT
		, @empID INT
		, @secID INT
		, @schID INT

	IF EXISTS (
			SELECT 1
			FROM tb_PendingUsers
			WHERE empno = @empno
				AND username = @username
				AND st IS NULL
			)
		RETURN - 1

	IF EXISTS (
			SELECT 1
			FROM tb_PendingUsers
			WHERE empno = @empno
				AND username = @username
				AND st = 1
			)
		RETURN - 2

	BEGIN
		INSERT INTO [dbo].[tb_PendingUsers] (
			[username]
			, [useremail]
			, [empno]
			, [empname]
			, [empnameen]
			, [empextno]
			, [empsector]
			, [managerusername]
			, [manageremail]
			, [managerempno]
			, [emporg]
			, [empbranch]
			, [empjobtitle]
			, [branchid]
			, [sectorid]
			, [orgid]
			, [natid]
			, [jobGrade]
			, [deflang]
			, [st]
			)
		VALUES (
			@username
			, @useremail
			, @empno
			, @empname
			, @empnameen
			, @empextno
			, @empsector
			, @managerusername
			, @manageremail
			, @managerempno
			, @emporg
			, @empbranch
			, @empjobtitle
			, @branchid
			, @sectorid
			, @orgid
			, @natid
			, @jobGrade
			, @deflang
			, 1
			)

		SELECT @ID = @@identity

		IF @ID > 0
		BEGIN
			INSERT INTO SaptcoWorkFlow.dbo.tb_RegisterUsers (
				[username]
				, [useremail]
				, [empno]
				, [empname]
				, [empnameen]
				, [empextno]
				, [empsector]
				, [managerusername]
				, [manageremail]
				, [managerempno]
				, [emporg]
				, [empbranch]
				, [empjobtitle]
				, [branchid]
				, [sectorid]
				, [orgid]
				, [natid]
				, [jobGrade]
				, [deflang]
				, [created]
				)
			VALUES (
				@username
				, @useremail
				, @empno
				, @empname
				, @empnameen
				, @empextno
				, @empsector
				, @managerusername
				, @manageremail
				, @managerempno
				, @emporg
				, @empbranch
				, @empjobtitle
				, @branchid
				, @sectorid
				, @orgid
				, @natid
				, @jobGrade
				, @deflang
				, getdate()
				)

			SELECT TOP (1) @secID = sec_ID
				, @schID = sec_sch
			FROM tb_section
			WHERE sec_No = @orgid

			--1- Add Employee if not exists
			SELECT @empID = emp_id
			FROM tb_employee
			WHERE emp_no = @empno

			IF @empID IS NULL
			BEGIN
				INSERT INTO [dbo].[tb_employee] (
					[emp_no]
					, [emp_card]
					, [emp_section]
					, [emp_name]
					, [emp_sch]
					, [emp_deleted]
					, [emp_createddate]
					, [emp_PersonalID]
					, [emp_JobTitle]
					, [emp_JobID]
					, [emp_Grade]
					, [emp_HiringDate]
					, [emp_email]
					, [emp_mobile]
					, [emp_dep]
					, [emp_username]
					, [emp_type]
					, [emp_jointype]
					)
				SELECT @empno
					, cast(@empno AS BIGINT)
					, @secID
					, @empname
					, @schID
					, 0
					, dbo.getnofromdate(GETDATE())
					, @natid
					, @empjobtitle
					, '0'
					, @jobGrade
					, GETDATE()
					, @useremail
					, '000'
					, @empbranch
					, @username
					, 0
					, 'EJT01'

				SELECT @empID = @@IDENTITY
			END
			ELSE
			BEGIN
				UPDATE [dbo].[tb_employee]
				SET emp_section = @secID
					,
					--emp_sch = @schID,
					emp_name = @empname
					, emp_PersonalID = @natid
					, emp_grade = @jobGrade
					, emp_JobTitle = @empjobtitle
					, emp_dep = @empbranch
					, emp_username = @username
					, emp_email = @useremail
				WHERE emp_id = @empID
			END

			SET @ID = NULL

			SELECT @ID = [user_id]
			FROM tb_users
			WHERE [user_name] = @username

			IF @ID IS NULL
				EXEC @ID = dbo.spinsertuser @username
					, N'CTRC4XTZ57s='
					, 3
					, @empID
					, 1
					, @username
					, @useremail
			ELSE
				EXEC dbo.spupdateuser @ID
					, @username
					, null
					, @empID
					, @username
					, NULL
					, NULL
					, @useremail
		END

		RETURN Isnull(@ID, 1)
	END
END















GO
CREATE PROCEDURE [dbo].[IntegrateWithActiveDirectory]
AS
BEGIN
	----EXEC sp_addlinkedserver @server = N'ADSI2', @srvproduct=N'Active Directory Service Interfaces', @provider=N'ADSDSOObject', @datasrc=N'adsdatasource'
	----EXEC sp_addlinkedsrvlogin @rmtsrvname=N'ADSI2',@useself=N'False',@locallogin=NULL,@rmtuser=N'mci\fpuser01',@rmtpassword=N'#####'
	--RHQDC01.MCI.GOV/DC=MCI,DC=GOV
	--SELECT sAMAccountName, userPrincipalName, Name, department, Manager, title, mobile, ipPhone, mail, distinguishedName, streetAddress, l, postalCode, co, company
	--FROM OPENQUERY(ADSI2,'<LDAP://RHQDC01.MCI.GOV/DC=MCI,DC=GOV>;(objectClass=user);sAMAccountName,Name,Manager,userPrincipalName,title,ipPhone,mail,mobile,department,distinguishedName,streetAddress,l,postalCode,co,company;subtree')
	--GO
	IF CURSOR_STATUS('global', 'curs_ActiveDirectory') = 1
	BEGIN
		CLOSE curs_ActiveDirectory
		DEALLOCATE curs_ActiveDirectory
	END
	DECLARE @username NVARCHAR(50)
		,@email NVARCHAR(150)
	DECLARE @tab TABLE (
		username NVARCHAR(50)
		,email NVARCHAR(150)
		)
	DECLARE @query NVARCHAR(2000)
	DECLARE curs_ActiveDirectory CURSOR
	FOR
	SELECT user_name
	FROM tb_users
	WHERE user_email IS NULL
	OPEN curs_ActiveDirectory
	FETCH NEXT
	FROM curs_ActiveDirectory
	INTO @username
	WHILE @@FETCH_STATUS = 0
	BEGIN
		SET @query = 'SELECT 
	samaccountname ,mail
FROM Openquery(ADSI2, ''SELECT sAMAccountName ,mail
  FROM ''''LDAP://RHQDC01.MCI.GOV/DC=MCI,DC=GOV'''' where objectCategory =''''Person''''  AND objectClass = ''''user''''
 AND samaccountname=''''' + @username + ''''''')'
		BEGIN TRY
			DELETE @tab
			INSERT INTO @tab
			EXEC (@query)
			SELECT @email = email
			FROM @tab
			WHERE username = @username
			UPDATE tb_users
			SET user_email = @email
			WHERE user_name = @username
			PRINT @username + ' update with email ' + isnull(@email, 'No Email Found')
		END TRY
		BEGIN CATCH
			PRINT @username + ' Error'
		END CATCH
		FETCH NEXT
		FROM curs_ActiveDirectory
		INTO @username
	END
	CLOSE curs_ActiveDirectory
	DEALLOCATE curs_ActiveDirectory
END


















GO

CREATE PROCEDURE [dbo].[IntegrateWithHREmployeeData]
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @LastUpdateDate DATE, @DefSchadule INT
	DECLARE @ErrMsg NVARCHAR(4000), @ErrSeverity INT
	DECLARE @HREmployeeTable TABLE (
		sec_id INT, sec_sch INT, EMPNO NVARCHAR(50), EmpName NVARCHAR(250), EmpNameEN NVARCHAR(250), REGION_ID BIGINT, Sector_ID BIGINT, 
		EMPCatCode NVARCHAR(50), ORG_ID NVARCHAR(50), ORG_Name NVARCHAR(250), GRADE NVARCHAR(50), JobName NVARCHAR(250), HiringDate DATE, 
		TermDate DATE, ID_Number NVARCHAR(50), EMPEmail NVARCHAR(250), Mngr_No NVARCHAR(50), Mngr_Email NVARCHAR(250)
		)

	SELECT TOP (1) @DefSchadule = [sec_sch]
	FROM [SaptcoTimeAtt].[dbo].tb_section
	WHERE [sec_Parent] = 0

	SELECT @DefSchadule = isnull(@DefSchadule, 1)

	SET @LastUpdateDate = '2015-05-01'

	--SELECT @LastUpdateDate = [SaptcoTimeAtt].[dbo].getdatefromno(value)
	--FROM tb_setting
	--WHERE SettingID = 2
	BEGIN TRY
		BEGIN TRANSACTION TAupdate

		BEGIN --Integrate Departments
			--------------------------------------------------------------------
			INSERT INTO [SaptcoTimeAtt].[dbo].tb_section (
				[sec_Name], [sec_Parent], [sec_Location], [sec_Level], [sec_manager], [sec_No], [sec_sch], [sec_path], [sec_secondmanager]
				, [IsRoot], [sec_secondmanageractive], [sec_sendnotif]
				)
			SELECT [DEPNAME], 1924, N'', 2, isnull([MANAGERID], 0), [DEPID], @DefSchadule, N'1/1924', 0, 0, 0, 1
			FROM [SaptcoWorkFlow].[dbo].[HRDepartment] HRD
			LEFT JOIN [SaptcoTimeAtt].[dbo].tb_section
				ON [sec_No] = [DEPID]
			WHERE [Sec_ID] IS NULL
				AND HRD.LastUpdate > @LastUpdateDate

			UPDATE sec
			SET sec.sec_name = HRDep.DEPNAME
			FROM [SaptcoTimeAtt].[dbo].tb_section sec
			INNER JOIN [SaptcoWorkFlow].[dbo].[HRDepartment] HRDep
				ON sec.sec_no = HRDep.[DEPID]
			WHERE HRDep.LastUpdate > @LastUpdateDate
				--------------------------------------------------------------------
		END

		COMMIT TRANSACTION TAupdate

		PRINT 'IntegrateWithHREmployeeData [Department] has been excuted successfully '
	END TRY

	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION TAupdate

		SELECT @ErrMsg = ERROR_MESSAGE(), @ErrSeverity = ERROR_SEVERITY()

		RAISERROR (@ErrMsg, @ErrSeverity, 1)

		PRINT 'Error IntegrateWithHREmployeeData [Department]: ' + @ErrMsg

		RETURN - 1
	END CATCH

	--Integrate Employee Information
	--------------------------------------------------------------------
	BEGIN TRY
		BEGIN TRANSACTION TAupdate2

		BEGIN --Insert If New Employee Added to HR DataBase
			INSERT INTO @HREmployeeTable (
				sec_id, sec_sch, EMPNO, EmpName, EmpNameEN, REGION_ID, Sector_ID, EMPCatCode, ORG_ID, ORG_Name, GRADE, JobName, HiringDate, 
				TermDate, ID_Number, EMPEmail, Mngr_No, Mngr_Email
				)
			SELECT [sec_id], [sec_sch], [EMPNO], [EMPNAME], [ENG_NAME], [REGION_ID], [SECT_ID], [EMP_CATID], [ORG_ID], [ORG_NAME], [GRADE], 
				[JOB_NAME], [HIRE_DATE], [TERMINATION_DATE], [ID_NUMBER], [EMAIL_ADDRESS], [MNGR_ID], [MNGR_EMAIL]
			FROM [SaptcoWorkFlow].[dbo].[HREmployees] HREep
			INNER JOIN [SaptcoTimeAtt].[dbo].tb_section
				ON ORG_ID = Sec_No
			WHERE HREep.LastUpdate > @LastUpdateDate

			INSERT INTO [SaptcoTimeAtt].[dbo].[tb_employee] (
				[emp_no], [emp_card], [emp_section], [emp_name], [emp_nameEn], [emp_sch], [emp_deleted], [emp_createddate], 
				[emp_PersonalID], [emp_JobTitle], [emp_Grade], [emp_HiringDate], [emp_TerminationDate], [emp_email], [emp_sectorid], 
				[emp_Catcode], [emp_region], [Mngr_No], [Mngr_Email], [emp_jointype], [emp_sendnotif], [emp_violatedException]
				)
			SELECT TEMP.[EMPNO], cast(TEMP.[EMPNO] AS BIGINT), TEMP.[sec_id], TEMP.[EMPNAME], TEMP.[EmpNameEN], TEMP.[sec_sch], 0, 
				[SaptcoTimeAtt].dbo.getnofromdate(GETDATE()), TEMP.[ID_NUMBER], TEMP.[JobName], TEMP.[GRADE], TEMP.[HiringDate], TEMP.
				[TermDate], isnull(TEMP.[EMPEmail], ''), TEMP.[Sector_ID], TEMP.[EMPCatCode], TEMP.[REGION_ID], TEMP.[Mngr_No], TEMP.
				[MNGR_EMAIL], CASE 
					WHEN TEMP.TermDate <= getdate()
						THEN 'EJT08'
					ELSE 'EJT01'
					END, 1, 0
			FROM @HREmployeeTable TEMP
			LEFT JOIN [SaptcoTimeAtt].[dbo].[tb_employee] tbEmp
				ON TEMP.EMPNO = tbEmp.emp_no
			WHERE emp_id IS NULL
		END

		BEGIN --Update Employee Info If Employee has been updated from HR DataBase
			UPDATE Emp
			SET Emp.[emp_section] = TEMP.Sec_ID
				--, Emp.[emp_sch] = CASE 
				--	WHEN TEMP.Sec_ID <> Emp.[emp_section]
				--		THEN TEMP.sec_sch
				--	ELSE Emp.emp_sch
				--	END
				, Emp.[emp_name] = TEMP.[EMPNAME], Emp.[emp_nameEn] = TEMP.[EmpNameEN],
				--Emp.[emp_deleted] =
				Emp.emp_jointype = CASE 
					WHEN TEMP.TermDate <= getdate()
						THEN 'EJT08'
					WHEN Emp.[emp_TerminationDate] <= getdate()
						THEN 'EJT08'
					ELSE 'EJT01'
					END, Emp.emp_PersonalID = TEMP.ID_Number, Emp.emp_JobTitle = TEMP.[JobName], Emp.emp_Grade = TEMP.GRADE, Emp.
				emp_HiringDate = TEMP.HiringDate, Emp.emp_TerminationDate = TEMP.TermDate, Emp.[emp_email] = CASE 
					WHEN isnull(TEMP.[EMPEmail], '') = ''
						THEN [emp_email]
					ELSE TEMP.[EMPEmail]
					END, Emp.[emp_sectorid] = TEMP.[Sector_ID], Emp.[emp_region] = TEMP.[REGION_ID], Emp.emp_Catcode = TEMP.EMPCatCode, Emp.
				Mngr_No = CASE 
					WHEN isnull(TEMP.Mngr_No, '') <> ''
						THEN TEMP.Mngr_No
					ELSE Emp.Mngr_No
					END, Emp.Mngr_Email = CASE 
					WHEN isnull(TEMP.Mngr_Email, '') <> ''
						THEN TEMP.Mngr_Email
					ELSE Emp.Mngr_Email
					END
			FROM [SaptcoTimeAtt].[dbo].[tb_employee] Emp
			INNER JOIN @HREmployeeTable TEMP
				ON Emp.emp_no = TEMP.EMPNO
		END

		EXEC [dbo].[UpdateHREmployeeIntegrationSettings]

		UPDATE SaptcoTimeAtt.dbo.tb_employee --update for wamon section
		SET emp_section = 1921
		WHERE emp_no IN (
				SELECT empid
				FROM SaptcoWorkFlow.dbo.UsersGroup
				WHERE Group_ID = 5
				)

		COMMIT TRANSACTION TAupdate2

		PRINT 'IntegrateWithHREmployeeData [Employee] has been excuted successfully '

		RETURN 1
	END TRY

	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION TAupdate2

		SELECT @ErrMsg = ERROR_MESSAGE(), @ErrSeverity = ERROR_SEVERITY()

		RAISERROR (@ErrMsg, @ErrSeverity, 1)

		PRINT 'Error IntegrateWithHREmployeeData [Employee]: ' + @ErrMsg

		RETURN - 1
	END CATCH
END















GO
CREATE PROCEDURE [dbo].[IntegrateWithHRVacations]
AS
BEGIN
SET NOCOUNT ON;
	IF CURSOR_STATUS('global', 'curs_Vac') = 1
	BEGIN
		CLOSE curs_Vac
		DEALLOCATE curs_Vac
	END
	DECLARE @vaclastdate DATE,
		@ErrMsg NVARCHAR(4000),
		@ErrSeverity INT
	DECLARE @tb_Vac TABLE (
		[EMPID] [nvarchar](50) NOT NULL,
		[VACID] [nvarchar](50) NULL,
		[VACNAME] [nvarchar](250) NOT NULL,
		[STARTDATE] [date] NOT NULL,
		[ENDDATE] [date] NOT NULL,
		[DaysNo] [int] NULL,
		[TripNo] [nvarchar](50) NULL
		)
	DECLARE @EMPID NVARCHAR(50),
		@VACID NVARCHAR(50),
		@VACNAME NVARCHAR(250),
		@STARTDATE INT,
		@ENDDATE INT,
		@DaysNo INT,
		@TripNo NVARCHAR(50),
		@vac_empid BIGINT,
		@vac_ID INT,@RowsAdded int ,@RowsUpdated int
	SELECT @vaclastdate = dbo.getdatefromno(value)
	FROM tb_setting
	WHERE SettingID = 3
	INSERT INTO @tb_Vac (
		[EMPID],
		[VACID],
		[VACNAME],
		[STARTDATE],
		[ENDDATE],
		[DaysNo],
		[TripNo]
		)
	SELECT Distinct [EMPID],
		[VACID],
		[VACNAME],
		[STARTDATE],
		[ENDDATE],
		[DaysNo],
		[TripNo]
	FROM [SaptcoWorkFlow].[dbo].[HRVacations] HRVac
	WHERE HRVac.LastUpdate > @vaclastdate
	order by [EMPID]
	BEGIN --Start Add & Update Vaction From HR DB
		BEGIN TRY
			BEGIN TRANSACTION TAupdate
			DECLARE curs_Vac CURSOR FAST_FORWARD
			FOR
			SELECT [EMPID],
				[VACID],
				[VACNAME],
				dbo.getnofromdate([STARTDATE]),
				dbo.getnofromdate([ENDDATE]),
				[DaysNo],
				[TripNo],
				[emp_id]
			FROM @tb_Vac
			INNER JOIN tb_employee ON Emp_no = [EMPID]
			OPEN curs_Vac
			FETCH NEXT
			FROM curs_Vac
			INTO @EMPID,
				@VACID,
				@VACNAME,
				@STARTDATE,
				@ENDDATE,
				@DaysNo,
				@TripNo,
				@vac_empid
			WHILE @@FETCH_STATUS = 0
			BEGIN
				SELECT @vac_ID = 0
				SELECT @vac_ID = [dbo].[HasVacation](@vac_empid, @STARTDATE)
				IF (@vac_ID = 0)
				BEGIN
					EXEC @vac_ID = spinsertvacation 1,
						@vac_empid,
						@STARTDATE,
						@ENDDATE,
						1,
						0,
						N'SystemDB'
					IF @vac_ID > 0
						UPDATE tb_vacation
						SET vac_HRLastupdate = getdate(),
							vac_HRTransCode = CASE 
								WHEN @TripNo IS NULL
									THEN 'V'
								ELSE 'T'
								END,
							vac_HRTransName = @VACNAME,
							vac_HRID = @VACID,
							vac_DaysNo = @DaysNo
						WHERE vac_id = @vac_ID
						select @RowsAdded =isnull(@RowsAdded,0)+1
				END
				ELSE
				BEGIN
					EXEC dbo.spupdatevacation @vac_ID,
						1,
						@STARTDATE,
						@ENDDATE,
						1,
						N'SystemDB'
					UPDATE tb_vacation
					SET vac_HRLastupdate = getdate(),
						vac_HRTransCode = CASE 
							WHEN @TripNo IS NULL
								THEN 'V'
							ELSE 'T'
							END,
						vac_HRTransName = @VACNAME
					WHERE vac_id = @vac_ID
					select @RowsUpdated =isnull(@RowsUpdated,0)+1
				END
				FETCH NEXT
				FROM curs_Vac
				INTO @EMPID,
					@VACID,
					@VACNAME,
					@STARTDATE,
					@ENDDATE,
					@DaysNo,
					@TripNo,
					@vac_empid
			END
			CLOSE curs_Vac
			DEALLOCATE curs_Vac
			exec [dbo].[UpdateHRVacationsIntegrationSettings]
			Print 'Tiem Attendance has been syncd successfully with Row Added:' + cast(isnull(@RowsAdded,0) as nvarchar(50)) + ' And Row Updated:' + cast(isnull(@RowsUpdated,0) as nvarchar(50))
			COMMIT TRANSACTION TAupdate
		END TRY
		BEGIN CATCH
			IF @@TRANCOUNT > 0
				ROLLBACK TRANSACTION TAupdate
			SELECT @ErrMsg = ERROR_MESSAGE(),
				@ErrSeverity = ERROR_SEVERITY()
			RAISERROR (
					@ErrMsg,
					@ErrSeverity,
					1
					)
			PRINT 'Error TimeAtt IntegrateWithHRVacations: ' + @ErrMsg
			RETURN - 1
		END CATCH
	END
END















GO
CREATE PROCEDURE [dbo].[Readers_GetByGroupID]
@grp_id int
AS
BEGIN
	select id,uname,groupid  from Bio_Auto_MCI.dbo.Readers where groupid=@grp_id
END


















GO
CREATE PROCEDURE [dbo].[ReadersGroups_Get]
AS
BEGIN
	select * from Bio_Auto_MCI.dbo.Groups
END


















GO
-- Batch submitted through debugger: SQLQuery1.sql|7|0|C:\Users\hando\AppData\Local\Temp\~vsE101.sql

CREATE PROCEDURE [dbo].[Report_GetTimeSheetSummry_Paging] @f_date INT
	,@t_date INT
	,@empID INT = NULL
	,@secid INT = NULL
	,@username NVARCHAR(100) = NULL
	,@reg_id INT = NULL
	,@DisplayLength AS INT = NULL
	,@DisplayStart AS INT = NULL
	,@OrderBy AS NVARCHAR(50) = NULL
	,@OrderDir AS NVARCHAR(10) = NULL
	,@Lang VARCHAR(10) = 'en-US'
	,@SQLUp2008 BIT =1
	,@RowFilter nvarchar(max)=''
	,@Count INT OUTPUT
AS
BEGIN
DECLARE @SQL nvarchar(max),@Reg BIGINT,@ParmDefinition NVARCHAR(max),
		@Sec INT,
		@Emp INT,
		@Fdate NVARCHAR(20),
		@Tdate  NVARCHAR(20),
		@User NVARCHAR(150),
		@Order NVARCHAR(max),
		@FirstRecord  NVARCHAR(250),
		@LastRecord  NVARCHAR(250),
		@Filter NVARCHAR(max),
		@OutCount INT,
		@VacInfo NVARCHAR(250),
		@ExcInfo NVARCHAR(250),
		@TStatus NVARCHAR(2000),
		@Having nvarchar(max)
	SELECT @Fdate =cast( @f_date as NVARCHAR(20)) ,
		@Tdate = cast( @t_date as NVARCHAR(20)),
		@Reg = @reg_id,
		@Sec = @secID,
		@Emp = @empID,
		@User = @username,
		@Having=@RowFilter,
		@FirstRecord = cast(@DisplayStart as nvarchar(250)) ,
		@LastRecord = cast ((@DisplayStart + @DisplayLength) as nvarchar(250)),
		@Order = CASE 
			WHEN @OrderBy IS NULL
				THEN N'm_id'
			ELSE @OrderBy + ' ' + @OrderDir
			END
select emp_card 
into #TempEmp
from tb_employee EMP
inner join [dbo].[GetEmployeeByUserRegion](@User) EmpReg on EmpReg.emp_id=EMP.emp_id
where (
			@Emp IS NULL
			OR @Emp = EMP.emp_id
			)
		AND (
			@Sec IS NULL
			OR emp_section IN (
				SELECT sec_ID
				FROM dbo.GetSectionUnderManager(NULL, @Sec)
				)
			)
		AND (
			@Reg IS NULL
			OR emp_region = @Reg
			)
		AND (EMP.emp_deleted = 0)
		AND (EMP.emp_violatedException <> 1)
if @SQLUp2008 =1
select @SQL=';WITH pg AS   (select * FROM #TempEmp EMP
	INNER JOIN (SELECT emp_card m_id
	    ,sum(CASE WHEN (m_timefin <> ''--:--'' AND m_actualtime <> ''00:00'') OR (isnull(tb_execuse.exc_type, 0) = 2) THEN 1 ELSE 0 END) daysno
		,sum(CASE WHEN (m_timefin = ''--:--'' AND m_timefout = ''--:--'' AND m_actualtime <> ''00:00'') AND (isnull(tb_execuse.exc_type, 0) <> 2) THEN 1 ELSE 0 END) daysabsent
		,sum(CASE WHEN m_actualtime = ''00:00'' AND m_vac_id = 0 THEN 1 ELSE 0 END) daysoff
		,sum(CASE WHEN isnull(m_vac_id, 0) > 0 THEN 1 ELSE 0 END) daysvication
		,sum(CASE WHEN tb_execuse.exc_id IS NULL THEN 0 ELSE exc_minuts END) totalExecuseM
		,sum(dbo.GetTotalMinutsFromTime(m_actualtime)) ac_workM
		,sum(CASE WHEN m_timetotal = ''--:--'' THEN 0 ELSE dbo.GetTotalMinutsFromTime(m_timetotal) END) totalworkM
		,sum(CASE WHEN m_totallate = ''--:--'' THEN 0 ELSE dbo.GetTotalMinutsFromTime(m_totallate) END) totallateM
		,sum(CASE WHEN m_overtime = ''--:--'' THEN 0 ELSE dbo.GetTotalMinutsFromTime(m_overtime) END) totaloverM
	FROM #TempEmp EMP
	INNER JOIN tb_transSummey(NOLOCK) trans
		ON trans.m_id = EMP.emp_card
	LEFT JOIN tb_execuse
		ON trans.m_exc_id = tb_execuse.exc_id 
	
	Where m_date between '+  @Fdate + N' and ' + @Tdate + N'
	group by emp_card ' + @Having + ') TransTable ON TransTable.m_id = EMP.emp_card
	 ORDER BY '+ @Order + N' OFFSET ' + cast(@DisplayStart AS NVARCHAR(50)) + N' ROWS FETCH NEXT ' + cast(@DisplayLength AS NVARCHAR(50)) + N' ROWS ONLY) 
	select m_id
	,emp_id
	,emp_no
	,emp_name
	,sec_name
	,sec_id
	,daysno
	,daysabsent
	,daysoff
	,daysvication
	,dbo.GetTimeFromTotalMinuts(totalExecuseM) totalExecuse

	,dbo.GetTimeFromTotalMinuts(ac_workM) ac_work
	,dbo.GetTimeFromTotalMinuts(totalworkM) totalwork
	,dbo.GetTimeFromTotalMinuts(totallateM) totallate
	,dbo.GetTimeFromTotalMinuts(totaloverM) totalover
	,totalExecuseM
	,ac_workM
	,totalworkM
	,totallateM
	,totaloverM  FROM pg
INNER JOIN tb_employee
	ON pg.emp_card = tb_employee.emp_card
INNER JOIN tb_section(NOLOCK)
	ON tb_employee.emp_section = tb_section.sec_ID'
else
select @SQL=N';WITH pg AS   (select m_id,ROW_NUMBER() OVER (ORDER BY '+ @Order + N') AS RowNum 
	,sum(CASE WHEN (m_timefin <> ''--:--'' AND m_actualtime <> ''00:00'') OR (isnull(tb_execuse.exc_type, 0) = 2) THEN 1 ELSE 0 END) daysno
		,sum(CASE WHEN (m_timefin = ''--:--'' AND m_timefout = ''--:--'' AND m_actualtime <> ''00:00'') AND (isnull(tb_execuse.exc_type, 0) <> 2) THEN 1 ELSE 0 END) daysabsent
		,sum(CASE WHEN m_actualtime = ''00:00'' AND m_vac_id = 0 THEN 1 ELSE 0 END) daysoff
		,sum(CASE WHEN isnull(m_vac_id, 0) > 0 THEN 1 ELSE 0 END) daysvication
		,sum(CASE WHEN tb_execuse.exc_id IS NULL THEN 0 ELSE exc_minuts END) totalExecuseM
		,sum(dbo.GetTotalMinutsFromTime(m_actualtime)) ac_workM
		,sum(CASE WHEN m_timetotal = ''--:--'' THEN 0 ELSE dbo.GetTotalMinutsFromTime(m_timetotal) END) totalworkM
		,sum(CASE WHEN m_totallate = ''--:--'' THEN 0 ELSE dbo.GetTotalMinutsFromTime(m_totallate) END) totallateM
		,sum(CASE WHEN m_overtime = ''--:--'' THEN 0 ELSE dbo.GetTotalMinutsFromTime(m_overtime) END) totaloverM
	From 
	#TempEmp EMP inner join tb_transSummey (NOLOCK) trans
	ON trans.m_id=EMP.emp_card
	LEFT JOIN tb_execuse ON trans.m_exc_id = tb_execuse.exc_id
	Where m_date between '+  @Fdate + N' and ' + @Tdate + N'
	group by m_id  ' + @Having + ')
	select m_id
	,emp_id
	,emp_no
	,emp_name
	,sec_name
	,sec_id
	,daysno
	,daysabsent
	,daysoff
	,daysvication
	,dbo.GetTimeFromTotalMinuts(totalExecuseM) totalExecuse
	
	,dbo.GetTimeFromTotalMinuts(ac_workM) ac_work
	,dbo.GetTimeFromTotalMinuts(totalworkM) totalwork
	,dbo.GetTimeFromTotalMinuts(totallateM) totallate
	,dbo.GetTimeFromTotalMinuts(totaloverM) totalover
	,totalExecuseM
	,ac_workM
	,totalworkM
	,totallateM
	,totaloverM  from pg 
	inner join tb_employee (NOLOCK) EMP
	on emp_card=pg.m_id 
	INNER JOIN tb_section (NOLOCK) ON EMP.emp_section = tb_section.sec_ID
	where  RowNum >' +  @FirstRecord + N' and RowNum <= ' + @LastRecord 
	print @SQL
	EXECUTE sp_executesql @SQL

	
	select @SQL=N'select @MYCount=count(*) from(
	select count(1)MyCount,EMP.emp_card from 
	#TempEmp EMP 
	inner join tb_transSummey (NOLOCK) trans
	ON trans.m_id=EMP.emp_card
	LEFT JOIN tb_execuse 
	ON trans.m_exc_id = tb_execuse.exc_id
	Where m_date between  @Fdate  and @Tdate 
	group by EMP.emp_card ' + @Having + ')X'
	SET @ParmDefinition =  N'@Fdate INT,@Tdate INT,@MYCount INT output'
	print @sql
	EXECUTE sp_executesql @sql,
		@ParmDefinition,
		@Fdate = @Fdate,
		@Tdate = @Tdate,
		@MYCount = @OutCount OUTPUT
	IF OBJECT_ID('tempdb..#TempEmp') IS NOT NULL
		DROP TABLE #TempEmp
	SELECT @Count = @OutCount

END












GO
-- Batch submitted through debugger: SQLQuery1.sql|7|0|C:\Users\hando\AppData\Local\Temp\~vsE101.sql

CREATE PROCEDURE [dbo].[Report_GetTimeSheetSummry_WithOutPaging] @f_date INT
	,@t_date INT
	,@empID INT = NULL
	,@secid INT = NULL
	,@username NVARCHAR(100) = NULL
	,@reg_id INT = NULL
	,@OrderBy AS NVARCHAR(50) = NULL
	,@OrderDir AS NVARCHAR(10) = NULL
	,@Lang VARCHAR(10) = 'en-US'
	,@RowFilter nvarchar(max)=''
AS
BEGIN
DECLARE @SQL nvarchar(max),@Reg BIGINT,
		@Sec INT,
		@Emp INT,
		@Fdate NVARCHAR(20),
		@Tdate  NVARCHAR(20),
		@User NVARCHAR(150),
		@Order NVARCHAR(max),
		@Having nvarchar(max)
	SELECT @Fdate =cast( @f_date as NVARCHAR(20)) ,
		@Tdate = cast( @t_date as NVARCHAR(20)),
		@Reg = @reg_id,
		@Sec = @secID,
		@Emp = @empID,
		@User = @username,
		@Having=isnull(@RowFilter,''),
		
		@Order = CASE 
			WHEN @OrderBy IS NULL or @OrderBy='0'
				THEN N'm_id' + case when  @OrderBy='0' then ' ' + isnull(@OrderDir,'asc') else '' end
			ELSE @OrderBy + ' ' + isnull(@OrderDir,'asc')
			END
select emp_card ,EMP.emp_id
into #TempEmp
from tb_employee EMP
inner join [dbo].[GetEmployeeByUserRegion](@User) EmpReg on EmpReg.emp_id=EMP.emp_id
where (
			@Emp IS NULL
			OR @Emp = EMP.emp_id
			)
		AND (
			@Sec IS NULL
			OR emp_section IN (
				SELECT sec_ID
				FROM dbo.GetSectionUnderManager(NULL, @Sec)
				)
			)
		AND (
			@Reg IS NULL
			OR emp_region = @Reg
			)
		AND (EMP.emp_deleted = 0)
		AND (EMP.emp_violatedException <> 1)

select @SQL=';WITH pg AS   (select * FROM #TempEmp EMP
	INNER JOIN (SELECT EMP.emp_card m_id
	    ,sum(CASE WHEN (m_timefin <> ''--:--'' AND m_actualtime <> ''00:00'') OR (isnull(tb_execuse.exc_type, 0) = 2) THEN 1 ELSE 0 END) daysno
		,sum(CASE WHEN (m_timefin = ''--:--'' AND m_timefout = ''--:--'' AND m_actualtime <> ''00:00'') AND (isnull(tb_execuse.exc_type, 0) <> 2) THEN 1 ELSE 0 END) daysabsent
		,sum(CASE WHEN m_actualtime = ''00:00'' AND m_vac_id = 0 THEN 1 ELSE 0 END) daysoff
		,sum(CASE WHEN isnull(m_vac_id, 0) > 0 THEN 1 ELSE 0 END) daysvication
		,sum(CASE WHEN tb_execuse.exc_id IS NULL THEN 0 ELSE exc_minuts END) totalExecuseM
		,sum(dbo.GetTotalMinutsFromTime(m_actualtime)) ac_workM
		,sum(CASE WHEN m_timetotal = ''--:--'' THEN 0 ELSE dbo.GetTotalMinutsFromTime(m_timetotal) END) totalworkM
		,sum(CASE WHEN m_totallate = ''--:--'' THEN 0 ELSE dbo.GetTotalMinutsFromTime(m_totallate) END) totallateM
		,sum(CASE WHEN m_overtime = ''--:--'' THEN 0 ELSE dbo.GetTotalMinutsFromTime(m_overtime) END) totaloverM
	FROM #TempEmp TEMP
	inner join tb_employee EMP on EMP.emp_id=TEMP.emp_id
	INNER JOIN tb_transSummey(NOLOCK) trans
		ON trans.m_id = EMP.emp_card
	LEFT JOIN tb_execuse
		ON trans.m_exc_id = tb_execuse.exc_id 
	Where m_date between '+  @Fdate + N' and ' + @Tdate + N'
	group by EMP.emp_card ' + @Having + ') TransTable ON TransTable.m_id = EMP.emp_card) 
	select m_id
	,tb_employee.emp_id
	,emp_no
	,emp_name
	,sec_name
	,reg_name
	,sec_id
	,reg_id
	,daysno
	,daysabsent
	,daysoff
	,daysvication
	,dbo.GetTimeFromTotalMinuts(totalExecuseM) totalExecuse
	,dbo.GetTimeFromTotalMinuts(ac_workM) ac_work
	,dbo.GetTimeFromTotalMinuts(totalworkM) totalwork
	,dbo.GetTimeFromTotalMinuts(totallateM) totallate
	,dbo.GetTimeFromTotalMinuts(totaloverM) totalover
	,totalExecuseM
	,ac_workM
	,totalworkM
	,totallateM
	,totaloverM  FROM pg
INNER JOIN tb_employee
	ON pg.emp_card = tb_employee.emp_card
INNER JOIN tb_section(NOLOCK)
	ON tb_employee.emp_section = tb_section.sec_ID
Inner join tb_Regions on tb_Regions.reg_id=emp_region
	ORDER BY '+ @Order 

	print @SQL
	EXECUTE sp_executesql @SQL

	
	
	IF OBJECT_ID('tempdb..#TempEmp') IS NOT NULL
		DROP TABLE #TempEmp
	

END












GO
CREATE PROCEDURE [dbo].[Report_GetTransaction]
	-- Add the parameters for the stored procedure here
	@f_date INT,
	@t_date INT,
	@emp_id INT = - 1,
	@secID INT = - 1,
	@username NVARCHAR(100) = NULL,
	@reg_id INT = NULL
AS
BEGIN
	DECLARE @tbl TABLE (
		sec_ID INT,
		sec_Name NVARCHAR(500)
		)
	INSERT INTO @tbl
	SELECT sec_ID,
		sec_Name
	FROM dbo.GetSectionUnderManager(NULL, @secID)
	SELECT dbo.tb_trans.trans_id,
		dbo.tb_trans.m_id,
		dbo.GetDateAsString(m_date) AS m_date,
		dbo.GetDateAsString(m_date) AS m_date_h,
		m_date dateno,
		dbo.GetDayOfName(m_date) AS NameOfDay,
		dbo.tb_trans.m_time,
		dbo.tb_trans.m_status,
		dbo.tb_employee.emp_no,
		dbo.tb_employee.emp_card,
		dbo.tb_employee.emp_name,
		dbo.tb_employee.emp_id,
		dbo.tb_trans.m_deleted,
		dbo.tb_trans.m_mode,
		dbo.tb_trans.m_manual,
		isnull(dbo.tb_trans.m_unitid, 0) m_unitid,
		ISNULL(m_unitname, N'مدخلة يدوياً') AS m_unit,
		CASE 
			WHEN m_status = 1
				THEN 'Success'
			ELSE 'Fail'
			END AS SStatus,
		CASE 
			WHEN m_status = 1
				THEN N'ناجحة'
			ELSE N'فاشلة'
			END AS AStatus,
		sec_id,
		sec_name
	FROM dbo.tb_trans
	INNER JOIN dbo.tb_employee
		ON dbo.tb_trans.m_id = dbo.tb_employee.emp_card
	INNER JOIN [dbo].[GetEmployeeByUserRegion](@username) empreg
		ON tb_employee.emp_id = empreg.emp_id
	INNER JOIN tb_section
		ON tb_employee.emp_section = tb_section.sec_ID
	WHERE (
			tb_employee.emp_id = @emp_id
			OR @emp_id = - 1
			)
		AND (
			EXISTS (
				SELECT 1
				FROM @tbl t
				WHERE t.sec_ID = emp_section
				)
			OR @secID = - 1
			)
		AND (
			m_date BETWEEN @f_date
				AND @t_date
			)
		AND (
			@reg_id IS NULL
			OR emp_region = @reg_id
			)
	ORDER BY m_date,
		m_time
END
















GO
CREATE PROCEDURE [dbo].[Report_tb_Employee] @secID INT = NULL
	,@username NVARCHAR(150) = NULL
	,@Lang VARCHAR(10) = 'en-US'
AS
BEGIN
	SELECT tb_schGroup.schGroup_name
		,emp_id group_empID
		,sch_name group_schname
	INTO #GroupTemp
	FROM tb_schGroupEmployees
	INNER JOIN tb_schGroup
		ON tb_schGroupEmployees.schGroup_id = tb_schGroup.schGroup_id
	INNER JOIN tb_schedule
		ON tb_schGroup.sch_id = tb_schedule.sch_id
	WHERE tb_schGroup.schGroup_deleted = 0 AND (
			tb_schGroup.sch_startdate IS NULL OR dbo.getnofromdate(getdate()) BETWEEN tb_schGroup.sch_startdate
				AND tb_schGroup.sch_enddate
			)

	SELECT emp.emp_id
		,emp.emp_card
		,emp.emp_no
		,emp.emp_name
		,emp.emp_JobTitle
		,isnull(N'*' + GT.group_schname, Sch.sch_name) sch_name
		,sec.sec_id
		,sec.Section_Name sec_name
		,REG.reg_id
		,Reg.reg_name
		,CASE WHEN @Lang = 'AR' THEN ConstantArabicName ELSE const.ConstantEnglishName END emp_jointype
	FROM tb_employee emp
	INNER JOIN [dbo].[GetEmployeeByUserRegion](@username) EmpReg
		ON EmpReg.emp_id = emp.emp_id
	INNER JOIN tb_schedule sch
		ON sch.sch_id = emp.emp_sch
	INNER JOIN tb_Regions REG
		ON REG.reg_id = emp.emp_region
	INNER JOIN [dbo].[Constant] const
		ON emp.emp_jointype = const.ConstantCode
	INNER JOIN dbo.GetSectionHierarchy() sec
		ON sec.sec_ID = emp.emp_section
	LEFT JOIN #GroupTemp GT
		ON GT.group_empID = emp.emp_id
	WHERE @secID IS NULL OR EXISTS (
			SELECT 1
			FROM dbo.GetSectionUnderManager('', @secID) t
			WHERE t.sec_ID = emp_section
			)
	ORDER BY SortKey
		,emp_no
		drop table #GroupTemp
END



GO

CREATE PROCEDURE [dbo].[Report_tb_Execuse] @exc_fdate INT
	,@exc_tdate INT
	,@exc_type INT = NULL
	,@exc_empid INT = NULL
	,@exc_secid INT = NULL
	,@username NVARCHAR(100) = NULL
AS
BEGIN
	IF @exc_empid IS NOT NULL
		SELECT [emp_name]
			,[exc_id]
			,[exc_empid]
			,[exc_date]
			,[exc_dateNo]
			,[exc_ftime]
			,[exc_ttime]
			,[exc_reason]
			,[exc_deleted]
			,[exc_status]
			,exc.[sec_ID]
			,[emp_no]
			,[exc_date_h]
			,[execuseReason_id]
			,[execuseReason_name]
			,[Section_Name]
			,exc_hours excHours
		FROM [view_execuse] exc
		INNER JOIN [dbo].[GetEmployeeByUserRegion](@username) empreg ON exc.exc_empid = empreg.emp_id
		INNER JOIN dbo.GetSectionHierarchy() X ON X.sec_id = exc.sec_ID
		WHERE (
				exc_dateNo BETWEEN @exc_fdate
					AND @exc_tdate
				)
			AND (
				execuseReason_id = @exc_type
				OR @exc_type IS NULL
				)
			AND (exc_empid = @exc_empid)
		ORDER BY exc_dateNo
			,X.SortKey
			,emp_no
	ELSE IF @exc_secid IS NOT NULL
		SELECT [emp_name]
			,[exc_id]
			,[exc_empid]
			,[exc_date]
			,[exc_dateNo]
			,[exc_ftime]
			,[exc_ttime]
			,[exc_reason]
			,[exc_deleted]
			,[exc_status]
			,exc.[sec_ID]
			,[emp_no]
			,[exc_date_h]
			,[execuseReason_id]
			,[execuseReason_name]
			,[Section_Name]
			,exc_hours excHours
		FROM [view_execuse] exc
		INNER JOIN [dbo].[GetEmployeeByUserRegion](@username) empreg ON exc.exc_empid = empreg.emp_id
		INNER JOIN dbo.GetSectionHierarchy() X ON X.sec_id = exc.sec_ID
		WHERE (
				exc_dateNo BETWEEN @exc_fdate
					AND @exc_tdate
				)
			AND (
				execuseReason_id = @exc_type
				OR @exc_type IS NULL
				)
			AND exc.sec_id IN (
				SELECT sec_id
				FROM dbo.GetSectionUnderManager('', @exc_secid)
				)
		ORDER BY exc_dateNo
			,X.SortKey
			,emp_no
	ELSE
		SELECT [emp_name]
			,[exc_id]
			,[exc_empid]
			,[exc_date]
			,[exc_dateNo]
			,[exc_ftime]
			,[exc_ttime]
			,[exc_reason]
			,[exc_deleted]
			,[exc_status]
			,exc.[sec_ID]
			,[emp_no]
			,[exc_date_h]
			,[execuseReason_id]
			,[execuseReason_name]
			,[Section_Name]
			,exc_hours excHours
		FROM [view_execuse] exc
		INNER JOIN [dbo].[GetEmployeeByUserRegion](@username) empreg ON exc.exc_empid = empreg.emp_id
		INNER JOIN dbo.GetSectionHierarchy() X ON X.sec_id = exc.sec_ID
		WHERE (
				exc_dateNo BETWEEN @exc_fdate
					AND @exc_tdate
				)
			AND (
				execuseReason_id = @exc_type
				OR @exc_type IS NULL
				)
END















GO

CREATE PROCEDURE [dbo].[Report_tb_Section_Tree] 
AS
BEGIN
	

		WITH DirectReports
		AS (
			-- Anchor member definition
			SELECT e.sec_Parent
				, e.sec_ID
				, e.sec_Level 
				, Space(e.sec_Level  * 2) + sec_Name  sec_Name
				, CAST(e.sec_Name AS VARBINARY(900)) SortKey
				,e.sec_manager 
				,e.sec_sch  
				,e.IsRoot 
				,e.sec_No
				, isnull(e.sec_Location,'') sec_Location
				
			FROM tb_section AS e
			
			WHERE e.sec_Parent  = 0
			
			UNION ALL
			
			-- Recursive member definition
			SELECT e.sec_Parent
				, e.sec_ID
				, e.sec_Level 
				, Space(e.sec_Level * 2) +    e.sec_Name  sec_Name
				, CAST(d.SortKey + CAST(e.sec_ID  AS BINARY (4)) AS VARBINARY(900)) SortKey
				,e.sec_manager 
				,e.sec_sch 
				,e.IsRoot 
				,e.sec_No
				, isnull(e.sec_Location,'') sec_Location
			FROM dbo.tb_section AS e
			INNER JOIN DirectReports AS d ON e.sec_Parent = d.sec_ID 
		where e.IsRoot is not null
			)
		-- Statement that executes the CTE
		SELECT sec_No,sec_name,sec_Location , sec_manager,ISNULL(emp.emp_name,'')sec_managerName
				, isnull(s.sch_name ,'')sch_name from DirectReports X
		left join tb_employee emp on emp.emp_id=X.sec_manager  
			left join tb_schedule s on s.sch_id=X.sec_sch 
		
		ORDER BY SortKey
	
END












GO

CREATE PROCEDURE [dbo].[Report_tb_Vacations] @vac_fdate INT
	,@vac_tdate INT
	,@vac_type INT = NULL
	,@vac_empid INT = NULL
	,@vac_secid INT = NULL
	,@username nvarchar(100)=null
AS
BEGIN
	IF @vac_empid IS NOT NULL
		SELECT [emp_name]
			,[vac_id]
			,[vtype_name]
			,[vac_empid]
			,[vac_fdate]
			,[vac_tdate]
			,[vac_status]
			,[emp_no]
			,[vac_type]
			,vac.[sec_ID]
			,[vac_fdate_h]
			,[vac_tdate_h]
			,[fdate]
			,[tdate]
			,[sec_Name]
		FROM [view_vacation] vac
		INNER JOIN [dbo].[GetEmployeeByUserRegion](@username) empreg ON vac.vac_empid=empreg.emp_id
		INNER JOIN dbo.GetSectionHierarchy() X ON X.sec_ID = vac.sec_ID
		WHERE (
				fdate BETWEEN @vac_fdate
					AND @vac_tdate
				)
			AND (
				vac_type = @vac_type
				OR @vac_type IS NULL
				)
			AND (vac_empid = @vac_empid)
		ORDER BY fdate
			,X.SortKey
			,emp_no
	ELSE
		IF @vac_secid IS NOT NULL
			SELECT [emp_name]
				,[vac_id]
				,[vtype_name]
				,[vac_empid]
				,[vac_fdate]
				,[vac_tdate]
				,[vac_status]
				,[emp_no]
				,[vac_type]
				,vac.[sec_ID]
				,[vac_fdate_h]
				,[vac_tdate_h]
				,[fdate]
				,[tdate]
				,[sec_Name]
			FROM [view_vacation] vac
			INNER JOIN [dbo].[GetEmployeeByUserRegion](@username) empreg ON vac.vac_empid=empreg.emp_id
			INNER JOIN dbo.GetSectionHierarchy() X ON X.sec_ID = vac.sec_ID
			WHERE (
					fdate BETWEEN @vac_fdate
						AND @vac_tdate
					)
				AND (
					vac_type = @vac_type
					OR @vac_type IS NULL
					)
				AND X.sec_ID IN (
					SELECT sec_id
					FROM dbo.GetSectionUnderManager('', @vac_secid)
					)
			ORDER BY fdate
				,X.SortKey
				,emp_no
		ELSE
			SELECT [emp_name]
				,[vac_id]
				,[vtype_name]
				,[vac_empid]
				,[vac_fdate]
				,[vac_tdate]
				,[vac_status]
				,[emp_no]
				,[vac_type]
				,vac.[sec_ID]
				,[vac_fdate_h]
				,[vac_tdate_h]
				,[fdate]
				,[tdate]
				,[sec_Name]
			FROM [view_vacation] vac
			INNER JOIN dbo.GetSectionHierarchy() X ON X.sec_ID = vac.sec_ID
			INNER JOIN [dbo].[GetEmployeeByUserRegion](@username) empreg ON vac.vac_empid=empreg.emp_id
			WHERE (
					fdate BETWEEN @vac_fdate
						AND @vac_tdate
					)
				AND (
					vac_type = @vac_type
					OR @vac_type IS NULL
					)
			ORDER BY fdate
				,X.SortKey
				,emp_no
END



















GO

CREATE PROCEDURE [dbo].[Repotr_DailyTimeSheet] @f_date INT
	,@t_date INT
	,@empID INT = NULL
	,@secID INT = NULL
	,@RowFilter NVARCHAR(max) = NULL
	,@rowsPerPage AS BIGINT = NULL
	,@pageNum AS BIGINT = NULL
	,@username NVARCHAR(100) = NULL
	,@reg_id INT = NULL
AS
BEGIN
	--EXEC spcheckallemplyeeshavetrans;
	SELECT @RowFilter = REPLACE(@RowFilter, '(ISNULL(m_timefin, N''--:--'')=''--:--'' and ISNULL(m_timefout, N''--:--'')=''--:--'' and ISNULL(m_actualtime, N''--:--'')  <>''00:00'')', '(ISNULL(m_timefin, N''--:--'')=''--:--'' and ISNULL(m_timefout, N''--:--'')=''--:--'' and ISNULL(m_actualtime, N''--:--'')  <>''00:00''  and (isnull(tb_execuse.exc_type,0) <>2))')

	SELECT @RowFilter = REPLACE(@RowFilter, '(ISNULL(m_timefin, N''--:--'') <> ''--:--'')', '(ISNULL(m_timefin, N''--:--'') <> ''--:--'' or isnull(tb_execuse.exc_type,0) =2)')

	DECLARE @sql NVARCHAR(max)
		,@ParmDefinition NVARCHAR(max)

	SET @ParmDefinition = N'@f_date INT	
		  ,@t_date INT
         ,@empID INT 
         ,@secID INT,@username nvarchar(100),@reg_id int'
	SET @sql = (
			CASE 
				WHEN @rowsPerPage IS NULL
					THEN N'SELECT '
				ELSE N'SELECT *
		FROM (
			SELECT ROW_NUMBER() OVER (
					ORDER BY m_Date,m_id
					) AS NUMBER
				,'
				END
			) + 
		N' tb_transSummey.m_id
				,tb_transSummey.ID
				,tb_employee.emp_id
				,tb_employee.emp_card
				,tb_employee.emp_no
				,tb_employee.emp_name
				,tb_section.sec_name
				,tb_employee.emp_section
				,tb_transSummey.m_date m_dateno
				,dbo.GetDayOfName(tb_transSummey.m_date) + '' '' + dbo.GetDateAsString(tb_transSummey.m_date) AS m_date
				,dbo.GetDayOfName(tb_transSummey.m_date) + '' '' + dbo.GetDateAsString(tb_transSummey.m_date) AS m_date_h
				,dbo.GetDayOfName(tb_transSummey.m_date) AS NameOfDay
				,ISNULL(convert(nvarchar(5),tb_transSummey.m_timefin), N''--:--'') AS timefin
				,ISNULL(convert(nvarchar(5),tb_transSummey.m_timefout), N''--:--'') AS timefout
				,ISNULL(tb_transSummey.m_flatein, N''--:--'') AS fLateIn
				,ISNULL(tb_transSummey.m_fearlyout, N''--:--'') AS fEarlyout
				,ISNULL(tb_transSummey.m_timesin, N''--:--'') AS timesin
				,ISNULL(tb_transSummey.m_timesout, N''--:--'') AS timesout
				,ISNULL(tb_transSummey.m_slatein, N''--:--'') AS sLateIn
				,ISNULL(tb_transSummey.m_searlyout, N''--:--'') AS sEarlyout
				,ISNULL(tb_transSummey.m_timetotal, N''--:--'') AS timeTotal
				,ISNULL(tb_transSummey.m_actualtime, N''--:--'') AS ActualTime
				,ISNULL(tb_transSummey.m_latein, N''--:--'') AS LateIn
				,ISNULL(tb_transSummey.m_overtime, N''--:--'') AS OverTime
				,ISNULL(tb_transSummey.m_totallate, N''--:--'') AS TotalLate
				,ISNULL(tb_transSummey.m_earlyout, N''--:--'') AS Earlyout
				,0 f_trans
				--,ISNULL(dbo.HasVacation(tb_employee.emp_id, tb_transSummey.m_date), 0) AS vac_id
				,m_vac_id AS vac_id
				,m_manual
				--,ISNULL(replace(replace(tb_transSummey.m_timefout, '':'', ''''), ''-'', ''0''), N''0000'') AS timefoutNo
				,0 ContAbsent
				,Isnull(exc_id, 0) exc_id
				,CASE 
					WHEN exc_id IS NOT NULL
						THEN exc_hours
						ELSE ''--:--''
					END ExecuseTime
				,execuseReason_name
				,CASE 
		WHEN isnull(m_vac_id, 0) > 0
			THEN N''إجازة''
		WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') <> ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--'' AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''غير مكتمل''
		WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') = ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--''
			AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''غياب''
		WHEN -- ISNULL(tb_transSummey.m_timefin, N''--:--'') = ''--:--''
			--AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--''
			--AND
			 ISNULL(tb_transSummey.m_actualtime, N''--:--'') = N''00:00''
			THEN N''عطلة''
		WHEN ISNULL(m_totallate, N''--:--'') <> ''--:--''
			THEN N''متأخر''
		ELSE N''حضور'' END TStatus
			FROM tb_transSummey(NOLOCK)
			INNER JOIN tb_employee(NOLOCK) ON tb_transSummey.m_id = tb_employee.emp_card
			INNER JOIN [dbo].[GetEmployeeByUserRegion](@username) empreg ON tb_employee.emp_id=empreg.emp_id
			INNER JOIN tb_section(NOLOCK) ON tb_employee.emp_section = tb_section.sec_ID
			LEFT JOIN tb_execuse(NOLOCK) ON tb_employee.emp_id = tb_execuse.exc_empid
				AND tb_transSummey.m_date = tb_execuse.exc_date
				And ApprovalByManager=''EAS02''
				AND exc_status = 1
			LEFT JOIN tb_execuseReason(NOLOCK) ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
			 WHERE (@empID is null or tb_employee.emp_id =@empID)AND (
				@reg_id IS NULL
				OR emp_region = @reg_id
				)
				AND (tb_employee.emp_deleted = 0) 
				AND (tb_employee.emp_violatedException <> 1)
				AND (@secID is null or EXISTS (
					SELECT 1
					FROM (SELECT sec_ID
		,sec_Name
	FROM dbo.GetSectionUnderManager(null,@secID)) t  
					WHERE t.sec_ID = emp_section
					))
				AND (
					tb_transSummey.m_date BETWEEN @f_date AND @t_date ) 
				AND ' 
		+ isnull(@RowFilter, '1=1') + (
			CASE 
				WHEN @rowsPerPage IS NULL
					THEN N' order by tb_transSummey.m_date,emp_no'
				ELSE ') AS TBL
		WHERE NUMBER BETWEEN(' + cast(((@pageNum - 1) * @rowsPerPage + 1) AS VARCHAR) + ')
				AND (' + cast((@pageNum * @rowsPerPage) AS VARCHAR) + ')'
				END
			)

	BEGIN TRY
		EXECUTE sp_executesql @sql
			,@ParmDefinition
			,@f_date = @f_date
			,@t_date = @t_date
			,@empID = @empID
			,@secID = @secID
			,@username = @username
			,@reg_id = @reg_id
	END TRY

	BEGIN CATCH
		DECLARE @ErrorMessage NVARCHAR(max);
		DECLARE @ErrorSeverity INT;
		DECLARE @ErrorState INT;

		SELECT @ErrorMessage = ERROR_MESSAGE()
			,@ErrorSeverity = ERROR_SEVERITY()
			,@ErrorState = ERROR_STATE();

		-- Use RAISERROR inside the CATCH block to return error
		-- information about the original error that caused
		-- execution to jump to the CATCH block.
		RAISERROR (
				@ErrorMessage
				,-- Message text.
				@ErrorSeverity
				,-- Severity.
				@ErrorState -- State.
				);
	END CATCH;
END















GO
CREATE PROCEDURE [dbo].[Repotr_DailyTimeSheet_ByDate] @m_date INT,
	@emp_id INT ,
	@Lang VARCHAR(10) = 'en-US'
	
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @sql NVARCHAR(max),
		@ParmDefinition NVARCHAR(max),
		@VacInfo NVARCHAR(250),
		@ExcInfo NVARCHAR(250),
		@TStatus NVARCHAR(2000)

	SELECT 
		@VacInfo = CASE 
			WHEN @Lang = 'en-US'
				THEN N'N'' From: '' + dbo.GetDateAsString(vac_fdate) + N''  To: '' + dbo.GetDateAsString(vac_tdate) + N''<br/>  Vacation Name : '''
			ELSE N'N''من: '' + dbo.GetDateAsString(vac_fdate) + N''  الى: '' + dbo.GetDateAsString(vac_tdate) + N''<br/>  اسم الإجازة : '''
			END,
		@ExcInfo = CASE 
			WHEN @Lang = 'en-US'
				THEN N'N''Excuse from '' + exc_ftime + N'' to '' + exc_ttime +N'' Total Hours : '' + exc_hours + N''<br/>  Reason : '''
			ELSE N'N''الاستئذان من '' + exc_ftime + N'' إلى '' + exc_ttime +N''  مجموع الساعات : '' + exc_hours + N''<br/>  السبب : '''
			END,
		@TStatus = CASE 
			WHEN @Lang = 'en-US'
				THEN N',CASE 
			WHEN isnull(m_vac_id, 0) > 0
			THEN N''Vacation''
			WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') <> ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--'' AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''Incomplete''
			WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') = ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--''
			AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''Abcent''
			WHEN
			 ISNULL(tb_transSummey.m_actualtime, N''--:--'') = N''00:00''
			THEN N''Off day''
			WHEN ISNULL(m_totallate, N''--:--'') <> ''--:--''
			THEN N''Late''
			ELSE N''Attend'' END TStatus'
			ELSE N',CASE 
			WHEN isnull(m_vac_id, 0) > 0
			THEN N''إجازة''
			WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') <> ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--'' AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''غير مكتمل''
			WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') = ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--''
			AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''غياب''
			WHEN
			 ISNULL(tb_transSummey.m_actualtime, N''--:--'') = N''00:00''
			THEN N''عطلة''
			WHEN ISNULL(m_totallate, N''--:--'') <> ''--:--''
			THEN N''متأخر''
			ELSE N''حضور'' END TStatus'
			END

	SET @ParmDefinition = N'@m_date INT,@emp_id INT'

	
		SELECT @sql = N'
			SELECT tb_transSummey.ID TransID
				,m_id
				,tb_employee.emp_no
				,tb_employee.emp_name
				,tb_transSummey.m_date m_dateno
				,' + CASE 
				WHEN @Lang = 'en-US'
					THEN N'dbo.GetDayOfNameEN'
				ELSE N'dbo.GetDayOfName'
				END + N'(tb_transSummey.m_date) + '' '' + dbo.GetDateAsString(tb_transSummey.m_date) AS m_date
				,ISNULL(convert(nvarchar(5),tb_transSummey.m_timefin), N''--:--'') AS timefin
				,ISNULL(convert(nvarchar(5),tb_transSummey.m_timefout), N''--:--'') AS timefout
				,ISNULL(tb_transSummey.m_flatein, N''--:--'') AS fLateIn
				,ISNULL(tb_transSummey.m_fearlyout, N''--:--'') AS fEarlyout
				,ISNULL(tb_transSummey.m_timetotal, N''--:--'') AS timeTotal
				,ISNULL(tb_transSummey.m_actualtime, N''--:--'') AS ActualTime
				,ISNULL(tb_transSummey.m_latein, N''--:--'') AS LateIn
				,ISNULL(tb_transSummey.m_overtime, N''--:--'') AS OverTime
				,ISNULL(tb_transSummey.m_totallate, N''--:--'') AS TotalLate
				,ISNULL(tb_transSummey.m_earlyout, N''--:--'') AS Earlyout
				,m_manual
				,m_shiftid
				,shift_name
				,m_vac_id AS vac_id
				,CASE WHEN m_vac_id > 0
				THEN ' + @VacInfo + 
			' + CASE 
						WHEN isnull([vac_HRTransName], '''') = ''''
							THEN vtype_name
						ELSE [vac_HRTransName]
						END
				ELSE ''''
				END vacinfo
				,Isnull(exc_id, 0) exc_id
				,CASE 
					WHEN exc_id IS NOT NULL
						THEN exc_hours
						ELSE ''--:--''
					END ExecuseTime
				,CASE 
					WHEN tb_execuse.exc_id IS NOT NULL
					THEN 
						' + @ExcInfo + N'
				 + CASE 
						WHEN isnull(execuseReason_name, '''') = ''''
							THEN exc_reason
						ELSE execuseReason_name + '' '' + exc_reason
						END
				ELSE ''''
				END Excuseinfo
				,execuseReason_name
				' + @TStatus + 
			N' 
				,CASE 
			WHEN isnull(m_vac_id, 0) > 0
			THEN N''vac''
			WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') <> ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--'' AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''inc''
			WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') = ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--''
			AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''abs''
			WHEN
			 ISNULL(tb_transSummey.m_actualtime, N''--:--'') = N''00:00''
			THEN N''off''
			WHEN ISNULL(m_totallate, N''--:--'') <> ''--:--''
			THEN N''lat''
			ELSE N''att'' END StatusCode
	  FROM tb_transSummey
			INNER JOIN tb_employee ON tb_transSummey.m_id = tb_employee.emp_card 
			Inner Join tb_shift on m_shiftid=shift_id
			LEFT JOIN tb_execuse ON tb_employee.emp_id = tb_execuse.exc_empid
				AND tb_transSummey.m_date = tb_execuse.exc_date
				And ApprovalByManager=''EAS02''
				AND exc_status = 1 and exc_deleted=0
			
				LEFT JOIN tb_execuseReason ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
				LEFT JOIN tb_vacation ON  vac_id=m_vac_id and m_vac_id is not null
				LEFT JOIN tb_vacationtype ON tb_vacation.vac_type = tb_vacationtype.vtype_id
			 WHERE 
					(tb_employee.emp_id =@emp_id)
				
				AND (tb_transSummey.m_date = @m_Date)'
			
		

	PRINT isnull(@SQL,'??')

	EXECUTE sp_executesql @sql,
		@ParmDefinition,
		@m_date = @m_date,
		@emp_id = @emp_id
END















GO
CREATE PROCEDURE [dbo].[Repotr_DailyTimeSheet_Paging] @f_date INT,
	@t_date INT,
	@empID INT = NULL,
	@secID INT = NULL,
	@username NVARCHAR(100) = NULL,
	@reg_id BIGINT = NULL,
	@RowFilter NVARCHAR(max) = NULL,
	@DisplayLength AS INT = NULL,
	@DisplayStart AS INT = NULL,
	@OrderBy AS NVARCHAR(50) = NULL,
	@OrderDir AS NVARCHAR(10) = NULL,
	@Lang VARCHAR(10) = 'en-US',
	@SQLUp2008 BIT = 1,
	@Count INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @sql NVARCHAR(max),
		@ParmDefinition NVARCHAR(max)
	DECLARE @Reg BIGINT,
		@Sec INT,
		@Emp INT,
		@Fdate INT,
		@Tdate INT,
		@User NVARCHAR(150),
		@Order NVARCHAR(max),
		@FirstRecord NVARCHAR(500),
		@LastRecord NVARCHAR(500),
		@Filter NVARCHAR(max),
		@OutCount INT,
		@VacInfo NVARCHAR(250),
		@ExcInfo NVARCHAR(250),
		@TStatus NVARCHAR(2000)
	SELECT @Fdate = @f_date,
		@Tdate = @t_date,
		@Reg = @reg_id,
		@Sec = @secID,
		@Emp = @empID,
		@User = @username,
		@Filter = @RowFilter,
		@FirstRecord = cast(@DisplayStart AS VARCHAR),
		@LastRecord = cast((@DisplayStart + @DisplayLength) AS VARCHAR),
		@Order = CASE 
			WHEN @OrderBy IS NULL
				THEN N'm_Date,m_id'
			ELSE @OrderBy + ' ' + @OrderDir
			END,
		@VacInfo = CASE 
			WHEN @Lang = 'en-US'
				THEN N'N'' From: '' + dbo.GetDateAsString(vac_fdate) + N''  To: '' + dbo.GetDateAsString(vac_tdate) + N''<br/>  Vacation Name : '''
			ELSE N'N''من: '' + dbo.GetDateAsString(vac_fdate) + N''  الى: '' + dbo.GetDateAsString(vac_tdate) + N''<br/>  اسم الإجازة : '''
			END,
		@ExcInfo = CASE 
			WHEN @Lang = 'en-US'
				THEN N'N'' Total Hours : '' + exc_hours + N''<br/>  Reason : '''
			ELSE N'N'' مجموع الساعات : '' + exc_hours + N''<br/>  السبب : '''
			END,
		@TStatus = CASE 
			WHEN @Lang = 'en-US'
				THEN N',CASE 
			WHEN isnull(m_vac_id, 0) > 0
			THEN N''Vacation''
			WHEN  tb_transSummey.m_date<>dbo.getnofromdate(getdate()) AND ISNULL(tb_transSummey.m_timefin, N''--:--'') <> ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--'' AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''Incomplete''
			WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') = ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--''
			AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''Abcent''
			WHEN
			 ISNULL(tb_transSummey.m_actualtime, N''--:--'') = N''00:00''
			THEN N''Off day''
			WHEN ISNULL(m_totallate, N''--:--'') <> ''--:--''
			THEN N''Late''
			ELSE N''Attend'' END TStatus'
			ELSE N',CASE 
			WHEN isnull(m_vac_id, 0) > 0
			THEN N''إجازة''
			WHEN tb_transSummey.m_date<>dbo.getnofromdate(getdate()) AND ISNULL(tb_transSummey.m_timefin, N''--:--'') <> ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--'' AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''غير مكتمل''
			WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') = ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--''
			AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''غياب''
			WHEN
			 ISNULL(tb_transSummey.m_actualtime, N''--:--'') = N''00:00''
			THEN N''عطلة''
			WHEN ISNULL(m_totallate, N''--:--'') <> ''--:--''
			THEN N''متأخر''
			ELSE N''حضور'' END TStatus'
			END
	SET @ParmDefinition = N'@Fdate INT,@Tdate INT,@Emp INT ,@Sec INT,@Reg INT'
	SELECT emp_id
	INTO #TempUserRegion
	FROM [dbo].[GetEmployeeByUserRegion](@User)
	
	IF @SQLUp2008 = 0
		SELECT @sql = N';WITH pg AS   (
			SELECT 
				ROW_NUMBER() OVER (ORDER BY m_date,m_id ) AS RowNum,
				tb_transSummey.ID TransID
				,m_Date
				,m_id
			FROM tb_transSummey
			INNER JOIN tb_employee ON tb_transSummey.m_id = tb_employee.emp_card 
			INNER JOIN #TempUserRegion empreg ON tb_employee.emp_id=empreg.emp_id
			LEFT JOIN  tb_execuse ON tb_transSummey.m_exc_id = tb_execuse.exc_id
			 WHERE 
					(@Emp is null or tb_employee.emp_id =@Emp)
				AND (@Sec is null or EXISTS (
					SELECT 1
					FROM (SELECT sec_ID,sec_Name FROM dbo.GetSectionUnderManager(null,@Sec)) t  
					WHERE t.sec_ID = emp_section
					))
				AND (@Reg IS NULL OR emp_region = @Reg)
				AND (tb_employee.emp_deleted = 0) 
				AND (tb_employee.emp_violatedException <> 1)
				AND (tb_transSummey.m_date BETWEEN @Fdate AND @Tdate)
				AND ' + isnull(
				@Filter, '1=1') + N') 
		Select pg.TransID ID,pg.m_id,pg.RowNum ,tb_employee.emp_id
				,tb_employee.emp_no
				,tb_employee.emp_name
				,tb_transSummey.m_date m_dateno
				,' + CASE 
				WHEN @Lang = 'en-US'
					THEN N'dbo.GetDayOfNameEN'
				ELSE N'dbo.GetDayOfName'
				END + N'(tb_transSummey.m_date) + '' '' + dbo.GetDateAsString(tb_transSummey.m_date) AS m_date
				,ISNULL(convert(nvarchar(5),tb_transSummey.m_timefin), N''--:--'') AS timefin
				,ISNULL(convert(nvarchar(5),tb_transSummey.m_timefout), N''--:--'') AS timefout
				,ISNULL(tb_transSummey.m_flatein, N''--:--'') AS fLateIn
				,ISNULL(tb_transSummey.m_fearlyout, N''--:--'') AS fEarlyout
				,ISNULL(tb_transSummey.m_timetotal, N''--:--'') AS timeTotal
				,ISNULL(tb_transSummey.m_actualtime, N''--:--'') AS ActualTime
				,ISNULL(tb_transSummey.m_latein, N''--:--'') AS LateIn
				,ISNULL(tb_transSummey.m_overtime, N''--:--'') AS OverTime
				,ISNULL(tb_transSummey.m_totallate, N''--:--'') AS TotalLate
				,ISNULL(tb_transSummey.m_earlyout, N''--:--'') AS Earlyout
				,m_manual
				,m_vac_id AS vac_id
				,CASE WHEN m_vac_id > 0
				THEN ' + @VacInfo + 
			' + CASE 
						WHEN isnull([vac_HRTransName], '''') = ''''
							THEN vtype_name
						ELSE [vac_HRTransName]
						END
				ELSE ''''
				END vacinfo
				,Isnull(exc_id, 0) exc_id
				,CASE 
					WHEN exc_id IS NOT NULL
						THEN exc_hours
						ELSE ''--:--''
					END ExecuseTime
				,CASE 
					WHEN tb_execuse.exc_id IS NOT NULL
					THEN 
						' + @ExcInfo + N'
				 + CASE 
						WHEN isnull(execuseReason_name, '''') = ''''
							THEN exc_reason
						ELSE execuseReason_name + '' '' + isnull(exc_reason,'''')
						END
				ELSE ''''
				END Excuseinfo
				,execuseReason_name
				' + @TStatus + 
			N' 
				,CASE 
			WHEN isnull(m_vac_id, 0) > 0
			THEN N''vac''
			WHEN  tb_transSummey.m_date<>dbo.getnofromdate(getdate()) AND ISNULL(tb_transSummey.m_timefin, N''--:--'') <> ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--'' AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''inc''
			WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') = ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--''
			AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''abs''
			WHEN
			 ISNULL(tb_transSummey.m_actualtime, N''--:--'') = N''00:00''
			THEN N''off''
			WHEN ISNULL(m_totallate, N''--:--'') <> ''--:--''
			THEN N''lat''
			ELSE N''att'' END StatusCode
	 from pg inner join 
			tb_transSummey on pg.TransID=tb_transSummey.ID 
			INNER JOIN tb_employee ON tb_transSummey.m_id = tb_employee.emp_card 
			INNER JOIN #TempUserRegion empreg ON tb_employee.emp_id=empreg.emp_id
			LEFT JOIN  tb_execuse ON tb_transSummey.m_exc_id = tb_execuse.exc_id
				LEFT JOIN tb_execuseReason ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
				LEFT JOIN tb_vacation ON  vac_id=m_vac_id and m_vac_id is not null
				LEFT JOIN tb_vacationtype ON tb_vacation.vac_type = tb_vacationtype.vtype_id
		Where ( RowNum >' 
			+ @FirstRecord + N' and RowNum <=' + @LastRecord + N') order by RowNum'
	ELSE
		SELECT @sql = N';WITH pg AS   (
			SELECT 
				0 AS RowNum,
				tb_transSummey.ID TransID
				,m_Date
				,m_id
			FROM tb_transSummey
			INNER JOIN tb_employee ON tb_transSummey.m_id = tb_employee.emp_card 
			INNER JOIN #TempUserRegion empreg ON tb_employee.emp_id=empreg.emp_id
			LEFT JOIN  tb_execuse ON tb_transSummey.m_exc_id = tb_execuse.exc_id
			 WHERE 
					(@Emp is null or tb_employee.emp_id =@Emp)
				AND (@Sec is null or EXISTS (
					SELECT 1
					FROM (SELECT sec_ID,sec_Name FROM dbo.GetSectionUnderManager(null,@Sec)) t  
					WHERE t.sec_ID = emp_section
					))
				AND (@Reg IS NULL OR emp_region = @Reg)
				AND (tb_employee.emp_deleted = 0) 
				AND (tb_employee.emp_violatedException <> 1)
				AND (tb_transSummey.m_date BETWEEN @Fdate AND @Tdate)
				AND ' + isnull(@Filter, '1=1') + 
			N'
				ORDER BY m_Date asc,m_id asc 
			 OFFSET ' + cast(@DisplayStart AS NVARCHAR(50)) + N' ROWS FETCH NEXT ' + cast(@DisplayLength AS NVARCHAR(50)) + N' ROWS ONLY) 
		Select pg.TransID ID,pg.m_id,pg.RowNum ,tb_employee.emp_id
				,tb_employee.emp_no
				,tb_employee.emp_name
				,tb_transSummey.m_date m_dateno
				,' + CASE 
				WHEN @Lang = 'en-US'
					THEN N'dbo.GetDayOfNameEN'
				ELSE N'dbo.GetDayOfName'
				END + N'(tb_transSummey.m_date) + '' '' + dbo.GetDateAsString(tb_transSummey.m_date) AS m_date
				,ISNULL(convert(nvarchar(5),tb_transSummey.m_timefin), N''--:--'') AS timefin
				,ISNULL(convert(nvarchar(5),tb_transSummey.m_timefout), N''--:--'') AS timefout
				,ISNULL(tb_transSummey.m_flatein, N''--:--'') AS fLateIn
				,ISNULL(tb_transSummey.m_fearlyout, N''--:--'') AS fEarlyout
				,ISNULL(tb_transSummey.m_timetotal, N''--:--'') AS timeTotal
				,ISNULL(tb_transSummey.m_actualtime, N''--:--'') AS ActualTime
				,ISNULL(tb_transSummey.m_latein, N''--:--'') AS LateIn
				,ISNULL(tb_transSummey.m_overtime, N''--:--'') AS OverTime
				,ISNULL(tb_transSummey.m_totallate, N''--:--'') AS TotalLate
				,ISNULL(tb_transSummey.m_earlyout, N''--:--'') AS Earlyout
				,m_manual
				,m_vac_id AS vac_id
				,CASE WHEN m_vac_id > 0
				THEN ' + @VacInfo + 
			' + CASE 
						WHEN isnull([vac_HRTransName], '''') = ''''
							THEN vtype_name
						ELSE [vac_HRTransName]
						END
				ELSE ''''
				END vacinfo
				,Isnull(exc_id, 0) exc_id
				,CASE 
					WHEN exc_id IS NOT NULL
						THEN exc_hours
						ELSE ''--:--''
					END ExecuseTime
				,CASE 
					WHEN tb_execuse.exc_id IS NOT NULL
					THEN 
						' + @ExcInfo + N'
				 + CASE 
						WHEN isnull(execuseReason_name, '''') = ''''
							THEN exc_reason
						ELSE execuseReason_name + '' '' + isnull(exc_reason,'''')
						END
				ELSE ''''
				END Excuseinfo
				,execuseReason_name
				' + @TStatus + 
			N' 
				,CASE 
			WHEN isnull(m_vac_id, 0) > 0
			THEN N''vac''
			WHEN  tb_transSummey.m_date<>dbo.getnofromdate(getdate()) AND ISNULL(tb_transSummey.m_timefin, N''--:--'') <> ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--'' AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''inc''
			WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') = ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--''
			AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''abs''
			WHEN
			 ISNULL(tb_transSummey.m_actualtime, N''--:--'') = N''00:00''
			THEN N''off''
			WHEN ISNULL(m_totallate, N''--:--'') <> ''--:--''
			THEN N''lat''
			ELSE N''att'' END StatusCode
	 from pg inner join 
			tb_transSummey on pg.TransID=tb_transSummey.ID 
			INNER JOIN tb_employee ON tb_transSummey.m_id = tb_employee.emp_card 
			INNER JOIN #TempUserRegion empreg ON tb_employee.emp_id=empreg.emp_id
				LEFT JOIN tb_execuse ON tb_transSummey.m_exc_id = tb_execuse.exc_id
				LEFT JOIN tb_execuseReason ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
				LEFT JOIN tb_vacation ON  vac_id=m_vac_id and m_vac_id is not null
				LEFT JOIN tb_vacationtype ON tb_vacation.vac_type = tb_vacationtype.vtype_id  ORDER BY pg.m_Date asc,pg.m_id asc'
	PRINT isnull(@SQL, @OrderBy)
	EXECUTE sp_executesql @sql,
		@ParmDefinition,
		@Fdate = @Fdate,
		@Tdate = @Tdate,
		@Emp = @Emp,
		@Sec = @Sec,
		@Reg = @Reg
	SET @sql = N'select @MYCount=count(1) FROM tb_transSummey(NOLOCK)
			INNER JOIN tb_employee ON tb_transSummey.m_id = tb_employee.emp_card 
			INNER JOIN #TempUserRegion empreg ON tb_employee.emp_id=empreg.emp_id
			LEFT JOIN  tb_execuse ON tb_transSummey.m_exc_id = tb_execuse.exc_id
			 WHERE 
					(@Emp is null or tb_employee.emp_id =@Emp)
				AND (@Sec is null or EXISTS (
					SELECT 1
					FROM (SELECT sec_ID,sec_Name FROM dbo.GetSectionUnderManager(null,@Sec)) t  
					WHERE t.sec_ID = emp_section
					))
				AND (@Reg IS NULL OR emp_region = @Reg)
				AND (tb_employee.emp_deleted = 0) 
				AND (tb_employee.emp_violatedException <> 1)
				AND (tb_transSummey.m_date BETWEEN @Fdate AND @Tdate)
				AND ' + isnull(@Filter, '1=1')
	SET @ParmDefinition = @ParmDefinition + ',@MYCount INT output'
	print @sql
	EXECUTE sp_executesql @sql,
		@ParmDefinition,
		@Fdate = @Fdate,
		@Tdate = @Tdate,
		@Emp = @Emp,
		@Sec = @Sec,
		@Reg = @Reg,
		@MYCount = @OutCount OUTPUT
	IF OBJECT_ID('tempdb..#TempUserRegion') IS NOT NULL
		DROP TABLE #TempUserRegion
	SELECT @Count = @OutCount
END














GO
CREATE PROCEDURE [dbo].[Repotr_DailyTimeSheet_WithOutPaging] @f_date INT,
	@t_date INT,
	@empID INT = NULL,
	@secID INT = NULL,
	@username NVARCHAR(100) = NULL,
	@reg_id BIGINT = NULL,
	@RowFilter NVARCHAR(max) = NULL,
	@Lang VARCHAR(10) = 'en-US'
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @sql NVARCHAR(max),
		@ParmDefinition NVARCHAR(max)
	DECLARE @Reg BIGINT,
		@Sec INT,
		@Emp INT,
		@Fdate INT,
		@Tdate INT,
		@User NVARCHAR(150),
		@Filter NVARCHAR(max),
		@VacInfo NVARCHAR(250),
		@ExcInfo NVARCHAR(250),
		@TStatus NVARCHAR(2000)
	SELECT @Fdate = @f_date,
		@Tdate = @t_date,
		@Reg = @reg_id,
		@Sec = @secID,
		@Emp = @empID,
		@User = @username,
		@Filter = @RowFilter,
		@VacInfo = CASE 
			WHEN @Lang = 'en-US'
				THEN N'N'' From: '' + dbo.GetDateAsString(vac_fdate) + N''  To: '' + dbo.GetDateAsString(vac_tdate) + N''<br/>  Vacation Name : '''
			ELSE N'N''من: '' + dbo.GetDateAsString(vac_fdate) + N''  الى: '' + dbo.GetDateAsString(vac_tdate) + N''<br/>  اسم الإجازة : '''
			END,
		@ExcInfo = CASE 
			WHEN @Lang = 'en-US'
				THEN N'N'' Total Hours : '' + exc_hours + N''<br/>  Reason : '''
			ELSE N'N'' مجموع الساعات : '' + exc_hours + N''<br/>  السبب : '''
			END,
		@TStatus = CASE 
			WHEN @Lang = 'en-US'
				THEN N',CASE 
			WHEN isnull(m_vac_id, 0) > 0
			THEN N''Vacation''
			WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') <> ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--'' AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''Incomplete''
			WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') = ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--''
			AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''Abcent''
			WHEN
			 ISNULL(tb_transSummey.m_actualtime, N''--:--'') = N''00:00''
			THEN N''Off day''
			WHEN ISNULL(m_totallate, N''--:--'') <> ''--:--''
			THEN N''Late''
			ELSE N''Attend'' END TStatus'
			ELSE N',CASE 
			WHEN isnull(m_vac_id, 0) > 0
			THEN N''إجازة''
			WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') <> ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--'' AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''غير مكتمل''
			WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') = ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--''
			AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''غياب''
			WHEN
			 ISNULL(tb_transSummey.m_actualtime, N''--:--'') = N''00:00''
			THEN N''عطلة''
			WHEN ISNULL(m_totallate, N''--:--'') <> ''--:--''
			THEN N''متأخر''
			ELSE N''حضور'' END TStatus'
			END
	SET @ParmDefinition = N'@Fdate INT,@Tdate INT,@Emp INT ,@Sec INT,@Reg INT'
	
	SELECT EMP.*
	INTO #TempUserRegion
	from tb_employee EMP
inner join [dbo].[GetEmployeeByUserRegion](@User) EmpReg on EmpReg.emp_id=EMP.emp_id
where (
			@Emp IS NULL
			OR @Emp = EMP.emp_id
			)
		AND (
			@Sec IS NULL
			OR emp_section IN (
				SELECT sec_ID
				FROM dbo.GetSectionUnderManager(NULL, @Sec)
				)
			)
		AND (
			@Reg IS NULL
			OR emp_region = @Reg
			)
		AND (EMP.emp_deleted = 0)
		AND (EMP.emp_violatedException <> 1)



	SELECT @sql = N';WITH pg AS   (
			SELECT 
				ROW_NUMBER() OVER (ORDER BY m_date,m_id ) AS RowNum,
				tb_transSummey.ID TransID
				,m_Date
				,m_id
			FROM tb_transSummey
			INNER JOIN tb_employee ON tb_transSummey.m_id = tb_employee.emp_card 
			INNER JOIN #TempUserRegion empreg ON tb_employee.emp_id=empreg.emp_id
			LEFT JOIN  tb_execuse ON tb_transSummey.m_exc_id = tb_execuse.exc_id
			 WHERE  (tb_transSummey.m_date BETWEEN @Fdate AND @Tdate)
				AND ' + isnull(@Filter, '1=1') + N') 
		Select pg.TransID ID,pg.m_id,pg.RowNum ,tb_employee.emp_id
				,tb_employee.emp_no
				,tb_employee.emp_name
				,tb_transSummey.m_date m_dateno
				,' + CASE 
				WHEN @Lang = 'en-US'
					THEN N'dbo.GetDayOfNameEN'
				ELSE N'dbo.GetDayOfName'
				END + N'(tb_transSummey.m_date) + '' '' + dbo.GetDateAsString(tb_transSummey.m_date) AS m_date
				,ISNULL(convert(nvarchar(5),tb_transSummey.m_timefin), N''--:--'') AS timefin
				,ISNULL(convert(nvarchar(5),tb_transSummey.m_timefout), N''--:--'') AS timefout
				,ISNULL(tb_transSummey.m_timetotal, N''--:--'') AS timeTotal
				,ISNULL(tb_transSummey.m_actualtime, N''--:--'') AS ActualTime
				,ISNULL(tb_transSummey.m_latein, N''--:--'') AS LateIn
				,ISNULL(tb_transSummey.m_overtime, N''--:--'') AS OverTime
				,ISNULL(tb_transSummey.m_totallate, N''--:--'') AS TotalLate
				,ISNULL(tb_transSummey.m_earlyout, N''--:--'') AS Earlyout
				,m_manual
				,m_vac_id AS vac_id
				,CASE WHEN m_vac_id > 0
				THEN ' + @VacInfo + 
			' + CASE 
						WHEN isnull([vac_HRTransName], '''') = ''''
							THEN vtype_name
						ELSE [vac_HRTransName]
						END
				ELSE ''''
				END vacinfo
				,Isnull(exc_id, 0) exc_id
				,CASE 
					WHEN exc_id IS NOT NULL
						THEN exc_hours
						ELSE ''--:--''
					END ExecuseTime
				,CASE 
					WHEN tb_execuse.exc_id IS NOT NULL
					THEN 
						' + @ExcInfo + N'
				 + CASE 
						WHEN isnull(execuseReason_name, '''') = ''''
							THEN exc_reason
						ELSE execuseReason_name + '' '' + isnull(exc_reason,'''')
						END
				ELSE ''''
				END Excuseinfo
				,execuseReason_name
				' + @TStatus + 
			N' 
				,CASE 
			WHEN isnull(m_vac_id, 0) > 0
			THEN N''vac''
			WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') <> ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--'' AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''inc''
			WHEN ISNULL(tb_transSummey.m_timefin, N''--:--'') = ''--:--''
			AND ISNULL(tb_transSummey.m_timefout, N''--:--'') = N''--:--''
			AND ISNULL(tb_transSummey.m_actualtime, N''--:--'') <> N''00:00''
			THEN N''abs''
			WHEN
			 ISNULL(tb_transSummey.m_actualtime, N''--:--'') = N''00:00''
			THEN N''off''
			WHEN ISNULL(m_totallate, N''--:--'') <> ''--:--''
			THEN N''lat''
			ELSE N''att'' END StatusCode
			,X.sec_ID,X.Section_Name sec_Name,X.SortKey
			,reg.reg_id,reg.reg_name
	 from pg inner join 
			tb_transSummey on pg.TransID=tb_transSummey.ID 
			INNER JOIN tb_employee ON tb_transSummey.m_id = tb_employee.emp_card 
			INNER JOIN #TempUserRegion empreg ON tb_employee.emp_id=empreg.emp_id
			INNER JOIN dbo.GetSectionHierarchy() X ON X.sec_ID = tb_employee.emp_section 
			INNER JOIN tb_Regions reg on reg.reg_id=tb_employee.emp_region
			LEFT JOIN  tb_execuse ON tb_transSummey.m_exc_id = tb_execuse.exc_id
			LEFT JOIN tb_execuseReason ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
			LEFT JOIN tb_vacation ON  vac_id=m_vac_id and m_vac_id is not null
			LEFT JOIN tb_vacationtype ON tb_vacation.vac_type = tb_vacationtype.vtype_id
				order by RowNum'

	EXECUTE sp_executesql @sql,
		@ParmDefinition,
		@Fdate = @Fdate,
		@Tdate = @Tdate,
		@Emp = @Emp,
		@Sec = @Sec,
		@Reg = @Reg
	IF OBJECT_ID('tempdb..#TempUserRegion') IS NOT NULL
		DROP TABLE #TempUserRegion
	
END














GO

CREATE PROCEDURE [dbo].[Repotr_MonthlyDetailsTimeSheet] @fm_date INT
	,@tm_date INT
	,@emp_id INT = NULL
	,@secid INT = NULL
	,@username NVARCHAR(100) = NULL
	,@reg_id INT = NULL
AS
BEGIN
	--	EXEC spcheckallemplyeeshavetrans;
	--------
	DECLARE @tbl TABLE (sec_ID INT)

	IF @secid IS NOT NULL
		INSERT INTO @tbl
		SELECT sec_ID
		FROM dbo.GetSectionUnderManager(NULL, @secid)

	SELECT *
	FROM (
		SELECT tb_employee.emp_id
			,tb_transSummey.m_date m_dateno
			,dbo.GetDayOfName(tb_transSummey.m_date) + ' ' + dbo.GetDateAsString(tb_transSummey.m_date) AS m_date
			,dbo.GetDayOfName(tb_transSummey.m_date) + ' ' + dbo.GetDateAsString(tb_transSummey.m_date) AS m_date_h
			,dbo.GetDayOfName(tb_transSummey.m_date) AS NameOfDay
			,tb_transSummey.m_timefin
			,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefin), N'--:--') AS timefin
			,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefout), N'--:--') AS timefout
			,ISNULL(tb_transSummey.m_flatein, N'--:--') AS fLateIn
			,ISNULL(tb_transSummey.m_fearlyout, N'--:--') AS fEarlyout
			,ISNULL(tb_transSummey.m_timesin, N'--:--') AS timesin
			,ISNULL(tb_transSummey.m_timesout, N'--:--') AS timesout
			,ISNULL(tb_transSummey.m_slatein, N'--:--') AS sLateIn
			,ISNULL(tb_transSummey.m_searlyout, N'--:--') AS sEarlyout
			,ISNULL(tb_transSummey.m_timetotal, N'--:--') AS timeTotal
			,ISNULL(tb_transSummey.m_actualtime, N'--:--') AS ActualTime
			,ISNULL(tb_transSummey.m_latein, N'--:--') AS LateIn
			,ISNULL(tb_transSummey.m_overtime, N'--:--') AS OverTime
			,ISNULL(tb_transSummey.m_totallate, N'--:--') AS TotalLateD
			,ISNULL(tb_transSummey.m_earlyout, N'--:--') AS Earlyout
			,m_vac_id AS vac_id
			,m_manual
			,Isnull(exc_id, 0) exc_id
			,CASE 
				WHEN exc_id IS NOT NULL
					THEN exc_hours
				ELSE '--:--'
				END ExecuseTime
			,execuseReason_name
			,CASE 
				WHEN isnull(m_vac_id, 0) > 0
					THEN N'إجازة'
				WHEN ISNULL(tb_transSummey.m_timefin, N'--:--') <> '--:--'
					AND ISNULL(tb_transSummey.m_timefout, N'--:--') = N'--:--'
					AND ISNULL(tb_transSummey.m_actualtime, N'--:--') <> N'00:00'
					THEN N'غير مكتمل'
				WHEN ISNULL(tb_transSummey.m_timefin, N'--:--') = '--:--'
					AND ISNULL(tb_transSummey.m_timefout, N'--:--') = N'--:--'
					AND ISNULL(tb_transSummey.m_actualtime, N'--:--') <> N'00:00'
					THEN N'غياب'
				WHEN ISNULL(tb_transSummey.m_actualtime, N'--:--') = N'00:00'
					THEN N'عطلة'
				WHEN ISNULL(m_totallate, N'--:--') <> '--:--'
					THEN N'متأخر'
				ELSE N'حضور'
				END TStatus
		FROM tb_transSummey(NOLOCK)
		INNER JOIN tb_employee(NOLOCK) ON tb_transSummey.m_id = tb_employee.emp_card
		INNER JOIN [dbo].[GetEmployeeByUserRegion](@username) empreg ON tb_employee.emp_id = empreg.emp_id
		LEFT JOIN tb_execuse(NOLOCK) ON tb_employee.emp_id = tb_execuse.exc_empid
			AND tb_transSummey.m_date = tb_execuse.exc_date
			AND exc_status = 1
			AND ApprovalByManager = 'EAS02'
			AND exc_deleted = 0
		LEFT JOIN tb_execuseReason(NOLOCK) ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
		WHERE (
				@emp_id IS NULL
				OR tb_employee.emp_id = @emp_id
				)
			AND (
				tb_transSummey.m_date BETWEEN @fm_date
					AND @tm_date
				)
			AND (
				@secid IS NULL
				OR emp_section IN (
					SELECT sec_ID
					FROM @tbl
					)
				)
			AND (
				@reg_id IS NULL
				OR emp_region = @reg_id
				)
		) tb
	INNER JOIN dbo.GetTimeSheetSummryTable(@fm_date, @tm_date, @emp_id, @secid, @username, @reg_id) sumery ON tb.emp_id = sumery.emp_id
	ORDER BY sumery.sec_id
		,m_dateno
		,emp_no
END















GO
CREATE PROC [dbo].[Repotr_MonthlyTimeSheet] @fm_date INT
	,@tm_date INT
	,@emp_id INT = NULL
	,@secid INT = NULL
	,@username nvarchar(100)=null
	,@reg_id INT = NULL
AS
BEGIN
	--------			
	--EXEC spcheckallemplyeeshavetrans;

	SELECT *
	FROM dbo.GetTimeSheetSummryTable(@fm_date, @tm_date, @emp_id, @secid,@username,@reg_id) t
	--order by t.sec_id
END

















GO

CREATE PROCEDURE [dbo].[schGroupByEmpID] @EmpID int,@username NVARCHAR(150)=null
AS
BEGIN
if @username is not null
	SELECT *
	FROM tb_schGroup schgroup
	WHERE schGroup_deleted = 0
		AND (
			SELECT count(1)
			FROM dbo.GetEmployeeByUserRegion(@username) empreg
			INNER JOIN tb_schGroupEmployees
				ON tb_schGroupEmployees.emp_id = empreg.emp_id
			WHERE tb_schGroupEmployees.schGroup_id = schgroup.schGroup_id and tb_schGroupEmployees.emp_id=@EmpID
			) > 0
else
SELECT *
	FROM tb_schGroup schgroup
	WHERE schGroup_deleted = 0
	AND (
			SELECT count(1)
			FROM  tb_schGroupEmployees
				
			WHERE tb_schGroupEmployees.schGroup_id = schgroup.schGroup_id and tb_schGroupEmployees.emp_id=@EmpID
			) > 0
END















GO

CREATE PROCEDURE [dbo].[schGroupGetAll] @username NVARCHAR(150)=null
AS
BEGIN
if @username is not null
	SELECT schgroup.*,sch_name
	FROM tb_schGroup schgroup
	inner join tb_schedule sch on schgroup.sch_id=sch.sch_id
	WHERE schGroup_deleted = 0
		AND (
			SELECT count(1)
			FROM dbo.GetEmployeeByUserRegion(@username) empreg
			INNER JOIN tb_schGroupEmployees
				ON tb_schGroupEmployees.emp_id = empreg.emp_id
			WHERE tb_schGroupEmployees.schGroup_id = schgroup.schGroup_id
			) > 0
else
SELECT *
	FROM tb_schGroup schgroup
	WHERE schGroup_deleted = 0
END















GO

CREATE PROCEDURE [dbo].[schGroupGetByID] @schGroup_id INT
AS
BEGIN
	SELECT tb_schGroup.*,
		isnull(dbo.GetDateAsStringSqlFormat(tb_schGroup.sch_startdate), '') StartDate,
		isnull(dbo.GetDateAsStringSqlFormat(tb_schGroup.sch_enddate), '') EndDate,
		cast(CASE 
				WHEN tb_schGroup.sch_startdate IS NULL
					THEN 0
				ELSE 1
				END AS BIT) IsApply,
		tb_schedule.sch_name
	FROM tb_schGroup
	INNER JOIN tb_schedule
		ON tb_schedule.sch_id = tb_schGroup.sch_id
	WHERE schGroup_id = @schGroup_id
END















GO

CREATE PROCEDURE [dbo].[schGroupGetEmployee] @schGroup_id INT
AS
BEGIN
	SELECT *
	FROM tb_schGroupEmployees
	JOIN tb_employee ON tb_schGroupEmployees.emp_id = tb_employee.emp_id
	WHERE schGroup_id = @schGroup_id
END
















GO
CREATE PROCEDURE [dbo].[SendEmail] @emp_id INT
	,@subject NVARCHAR(500)
	,@title NVARCHAR(500)
	,@body NVARCHAR(4000)
	,@senderID INT
	,@TemplateID INT
AS
BEGIN
	IF @emp_id IS NULL
		OR @emp_id = 0
		RETURN
	IF dbo.AllowSendNotifcation(@emp_id) = 0
		RETURN
	DECLARE @SendTO NVARCHAR(250)
	SELECT top(1) @SendTO = emp_email
	FROM tb_employee 
	WHERE emp_id = @emp_id
	IF isnull(@SendTO,'') =''
		RETURN
	if @SendTO='hogail@saptco.com.sa'
	set @SendTO='AlJohaniAA@saptco.com.sa'
	EXEC SaptcoNotifications.dbo.MessagesAddSingleEmail @senderID
		,@SendTO
		,@subject
		,@body
		,@title
		,@TemplateID
END









GO

CREATE PROCEDURE [dbo].[SendEmailForAbsentAndIncomplate] @c_date INT
AS
BEGIN
	SET NOCOUNT ON
	--Friday,Saturday
	if datename(dw, getdate()) ='Friday' or datename(dw, getdate()) ='Saturday'
	return 0;


	DECLARE @MangerID INT
		, @SecondMangerID INT
		, @subject NVARCHAR(500)
		, @title NVARCHAR(500)
		, @body NVARCHAR(4000)
		, @m_actualtime NVARCHAR(5)
		, @m_timefin VARCHAR(10)
		, @m_timefout VARCHAR(10)
		, @m_totallate VARCHAR(10)
		, @emp_id INT
		, @sec_id INT
		, @emp_name NVARCHAR(250)
		, @bodyrep NVARCHAR(max)
		, @emp_no NVARCHAR(50)
		,@DayName nvarchar(50)
		,@EmpCount int

	--SELECT @c_date = @c_date -- 1

	DECLARE @tb_absent TABLE (
		emp_id INT
		, sec_id INT
		, Mngr_ID INT
		)
	DECLARE @tb_incomplete TABLE (
		emp_id INT
		, sec_id INT
		, Mngr_ID INT
		)
	DECLARE @tb_lates TABLE (
		emp_id INT
		, sec_id INT
		, m_totallate VARCHAR(10)
		, Mngr_ID INT
		)

	--DECLARE @tb_secabsent TABLE (sec_id INT)
	--DECLARE @tb_secincomplete TABLE (sec_id INT)
	--DECLARE @tb_secLate TABLE (sec_id INT)
	SELECT emp_id
		, emp_section
		, isnull(m_timefin, N'--:--') m_timefin
		, isnull(m_timefout, N'--:--') m_timefout
		, isnull(m_actualtime, N'00:00') m_actualtime
		, ISNULL(m_totallate, N'00:00') m_totallate
	INTO #tempSummryTrans
	FROM tb_transSummey
	INNER JOIN tb_employee
		ON emp_card = m_id
	INNER JOIN tb_section
		ON emp_section = sec_ID
	WHERE m_date = @c_date
		AND emp_violatedException = 0
		--AND emp_region IN (
		--	1000
		--	, 1001
		--	)
	select @DayName= dbo.GetDayOfFullName(@c_date)
	DECLARE curs_pltn CURSOR FAST_FORWARD
	FOR
	SELECT emp_id
		, emp_section
		, m_timefin
		, m_timefout
		, m_actualtime
		, m_totallate
	FROM #tempSummryTrans

	OPEN curs_pltn

	FETCH NEXT
	FROM curs_pltn
	INTO @emp_id
		, @sec_id
		, @m_timefin
		, @m_timefout
		, @m_actualtime
		, @m_totallate

	WHILE @@FETCH_STATUS = 0
	BEGIN
		IF @m_timefin = '--:--'
			AND @m_timefout = '--:--'
			AND @m_actualtime <> '00:00'
			AND isnull(dbo.HasVacation(@emp_id, @c_date), 0) = 0
			INSERT INTO @tb_absent (
				emp_id
				, sec_id
				, Mngr_ID
				)
			VALUES (
				@emp_id
				, @sec_id
				, dbo.GetHRDirectManagerEmpID(@emp_id)
				)

		IF @m_timefin <> N'--:--'
			AND @m_timefout = N'--:--'
			AND @m_actualtime <> N'00:00' And @m_totallate=@m_actualtime
			AND @emp_id IS NOT NULL
			INSERT INTO @tb_incomplete (
				emp_id
				, sec_id
				, Mngr_ID
				)
			VALUES (
				@emp_id
				, @sec_id
				, dbo.GetHRDirectManagerEmpID(@emp_id)
				)

		IF @m_totallate <> N'--:--'
			AND @m_totallate <> N'00:00'
			AND @m_timefout <> N'--:--'
			AND @m_timefout <> N'00:00'
			INSERT INTO @tb_lates (
				emp_id
				, sec_id
				, m_totallate
				, Mngr_ID
				)
			VALUES (
				@emp_id
				, @sec_id
				, @m_totallate
				, dbo.GetHRDirectManagerEmpID(@emp_id)
				)

		FETCH NEXT
		FROM curs_pltn
		INTO @emp_id
			, @sec_id
			, @m_timefin
			, @m_timefout
			, @m_actualtime
			, @m_totallate
	END

	CLOSE curs_pltn

	DEALLOCATE curs_pltn

	---absent
	DECLARE curs_absent CURSOR FAST_FORWARD
	FOR
	SELECT emp_id
	FROM @tb_absent

	OPEN curs_absent

	FETCH NEXT
	FROM curs_absent
	INTO @emp_id

	WHILE @@FETCH_STATUS = 0
	BEGIN
		EXEC dbo.SendNoficationForAbsent @emp_id
			, @c_date

		FETCH NEXT
		FROM curs_absent
		INTO @emp_id
	END

	CLOSE curs_absent

	DEALLOCATE curs_absent

	---
	---incomplete
	DECLARE curs_incomplete CURSOR FAST_FORWARD
	FOR
	SELECT emp_id
	FROM @tb_incomplete

	OPEN curs_incomplete

	FETCH NEXT
	FROM curs_incomplete
	INTO @emp_id

	WHILE @@FETCH_STATUS = 0
	BEGIN
		EXEC dbo.SendNoficationForIncomplete @emp_id
			, @c_date

		FETCH NEXT
		FROM curs_incomplete
		INTO @emp_id
	END

	CLOSE curs_incomplete

	DEALLOCATE curs_incomplete

	----
	----Lates
	DECLARE curs_late CURSOR FAST_FORWARD
	FOR
	SELECT emp_id
		, m_totallate
	FROM @tb_lates

	OPEN curs_late

	FETCH NEXT
	FROM curs_late
	INTO @emp_id
		, @m_totallate

	WHILE @@FETCH_STATUS = 0
	BEGIN
		EXEC dbo.SendNoficationForLate @emp_id
			, @c_date
			, @m_totallate

		FETCH NEXT
		FROM curs_late
		INTO @emp_id
			, @m_totallate
	END

	CLOSE curs_late

	DEALLOCATE curs_late

	---
	--INSERT INTO @tb_secabsent (sec_id)
	--SELECT DISTINCT sec_id
	--FROM @tb_absent
	--INSERT INTO @tb_secincomplete (sec_id)
	--SELECT DISTINCT sec_id
	--FROM @tb_incomplete
	--INSERT INTO @tb_secLate (sec_id)
	--SELECT DISTINCT sec_id
	--FROM @tb_lates
	SET @bodyrep = N'<tr><td>?emp_no</td><td>?emp_name</td></tr>'

	--حركات الغياب
	DECLARE curs_ManagerAbsent CURSOR FAST_FORWARD
	FOR
	SELECT Mngr_ID
	FROM @tb_absent
	WHERE Mngr_ID > 0
	GROUP BY Mngr_ID

	OPEN curs_ManagerAbsent

	FETCH NEXT
	FROM curs_ManagerAbsent
	INTO @MangerID

	WHILE @@FETCH_STATUS = 0
	BEGIN
		SET @body = N'<div  dir="rtl"><div ><h3>لقد تم تسجيل حركة غياب على الموظفين التابعين لإدارتكم في تاريخ [' + @DayName + N' ' + dbo.GetDateAsString(@c_date) + 
			N'] </h3></div><div dir="rtl" ><table border="1" width="100%" ><tr><td><b>رقم الموظف</b></td><td><b>اسم الموظف</b></td></tr>'

		DECLARE curs_EmpAbsent CURSOR FAST_FORWARD
		FOR
		SELECT emp_no
			, emp_name
		FROM @tb_absent empabsent
		INNER JOIN tb_employee emp
			ON empabsent.emp_id = emp.emp_id
		WHERE empabsent.Mngr_ID = @MangerID
		and emp_card not in(select EMPID  from  EmailException )

		OPEN curs_EmpAbsent

		FETCH NEXT
		FROM curs_EmpAbsent
		INTO @emp_no
			, @emp_name

		WHILE @@FETCH_STATUS = 0
		BEGIN
			SET @body = ISNULL(@body, '') + Replace(REPLACE(@bodyrep, '?emp_no', @emp_no), '?emp_name', @emp_name)
			select @EmpCount=isnull(@EmpCount,0)+1
			FETCH NEXT
			FROM curs_EmpAbsent
			INTO @emp_no
				, @emp_name
		END

		CLOSE curs_EmpAbsent

		DEALLOCATE curs_EmpAbsent

		SET @body = @body + '</table></div></div>'

		--PRINT @body
		IF isnull(@body, '') <> '' and isnull(@EmpCount,0)>0
			EXEC SendEmail @MangerID
				, N'تقرير غياب موظفيني'
				, NULL
				, @body
				, 1
				, 1

		select @body = NULL,@EmpCount=NULL

		FETCH NEXT
		FROM curs_ManagerAbsent
		INTO @MangerID
	END

	CLOSE curs_ManagerAbsent

	DEALLOCATE curs_ManagerAbsent

	SET @MangerID = NULL

	--DECLARE curs_ManagerAbsent CURSOR FAST_FORWARD
	--FOR
	--SELECT sec.sec_id
	--	,sec_manager
	--	,CASE 
	--		WHEN sec_secondmanageractive = 1
	--			THEN sec_secondmanager
	--		ELSE 0
	--		END
	--FROM @tb_secabsent sec
	--JOIN tb_section ON sec.sec_id = tb_section.sec_id
	--OPEN curs_ManagerAbsent
	--FETCH NEXT
	--FROM curs_ManagerAbsent
	--INTO @sec_id
	--	,@MangerID
	--	,@SecondMangerID
	--WHILE @@FETCH_STATUS = 0
	--BEGIN
	--	SET @body = N'<div  dir="rtl"><div ><h3>لقد تم تسجيل حركة غياب على الموظفين التابعين لإدارتكم في تاريخ [' + @DayName + N' ' + dbo.GetDateAsString(@c_date) + N'] </h3></div><div dir="rtl" ><table border="1" width="100%" ><tr><td>رقم الموظف</td><td>اسم الموظف</td></tr>'
	--	DECLARE curs_EmpAbsent CURSOR FAST_FORWARD
	--	FOR
	--	SELECT emp_no
	--		,emp_name
	--	FROM @tb_absent empabsent
	--	JOIN tb_employee emp ON empabsent.emp_id = emp.emp_id
	--	WHERE empabsent.sec_id = @sec_id
	--	OPEN curs_EmpAbsent
	--	FETCH NEXT
	--	FROM curs_EmpAbsent
	--	INTO @emp_no
	--		,@emp_name
	--	WHILE @@FETCH_STATUS = 0
	--	BEGIN
	--		SET @body = ISNULL(@body, '') + Replace(REPLACE(@bodyrep, '?emp_no', @emp_no), '?emp_name', @emp_name)
	--		FETCH NEXT
	--		FROM curs_EmpAbsent
	--		INTO @emp_no
	--			,@emp_name
	--	END
	--	CLOSE curs_EmpAbsent
	--	DEALLOCATE curs_EmpAbsent
	--	SET @body = @body + '</table></div></div>'
	--	PRINT @body
	--	IF isnull(@body, '') <> ''
	--		EXEC SendEmail @MangerID
	--			,N'تقرير غياب موظفيني'
	--			,NULL
	--			,@body
	--			,1
	--			,1
	--	SET @body = NULL
	--	FETCH NEXT
	--	FROM curs_ManagerAbsent
	--	INTO @sec_id
	--		,@MangerID
	--		,@SecondMangerID
	--END
	--CLOSE curs_ManagerAbsent
	--DEALLOCATE curs_ManagerAbsent
	--SET @MangerID = NULL

	PRINT 'Absents Report has been sent successfully'

	----الحركات الغير مكتملة
	select @body = NULL,@EmpCount=NULL

	DECLARE curs_ManagerIncomplete CURSOR FAST_FORWARD
	FOR
	SELECT Mngr_ID
	FROM @tb_incomplete
	WHERE Mngr_ID > 0
	GROUP BY Mngr_ID

	OPEN curs_ManagerIncomplete

	FETCH NEXT
	FROM curs_ManagerIncomplete
	INTO @MangerID

	WHILE @@FETCH_STATUS = 0
	BEGIN
		SET @body = N'<div  dir="rtl"><div ><h3>لم يقم الموظفين التابعين لإدارتكم بتسجيل حركة دخول أو خروج في تاريخ ['  + @DayName + N' ' + dbo.GetDateAsString(@c_date) + 
			N'] </h3></div><div dir="rtl" ><table border="1" width="100%" ><tr><td><b>رقم الموظف</b></td><td><b>اسم الموظف</b></td></tr>'

		DECLARE curs_EmpIncomplete CURSOR FAST_FORWARD
		FOR
		SELECT emp_no
			, emp_name
		FROM @tb_incomplete empincomplete
		INNER JOIN tb_employee emp
			ON empincomplete.emp_id = emp.emp_id
		WHERE empincomplete.Mngr_ID = @MangerID
		and emp_card not in(select EMPID  from  EmailException )
		OPEN curs_EmpIncomplete

		FETCH NEXT
		FROM curs_EmpIncomplete
		INTO @emp_no
			, @emp_name

		WHILE @@FETCH_STATUS = 0
		BEGIN
			SET @body = ISNULL(@body, '') + Replace(REPLACE(@bodyrep, '?emp_no', @emp_no), '?emp_name', @emp_name)
			select @EmpCount=isnull(@EmpCount,0)+1
			FETCH NEXT
			FROM curs_EmpIncomplete
			INTO @emp_no
				, @emp_name
		END

		CLOSE curs_EmpIncomplete

		DEALLOCATE curs_EmpIncomplete

		SET @body = @body + '</table></div></div>'

		--PRINT @body
		IF isnull(@body, '') <> '' and isnull(@EmpCount,0)>0
			EXEC SendEmail @MangerID
				, N'تقرير عدم تسجيل حركة الخروج'
				, NULL
				, @body
				, 1
				, 1

		select @body = NULL,@EmpCount=NULL

		FETCH NEXT
		FROM curs_ManagerIncomplete
		INTO @MangerID
	END

	CLOSE curs_ManagerIncomplete

	DEALLOCATE curs_ManagerIncomplete

	SET @MangerID = NULL

	--DECLARE curs_ManagerIncomplete CURSOR FAST_FORWARD
	--FOR
	--SELECT sec.sec_id
	--	,sec_manager
	--	,CASE 
	--		WHEN sec_secondmanageractive = 1
	--			THEN sec_secondmanager
	--		ELSE 0
	--		END
	--FROM @tb_secincomplete sec
	--JOIN tb_section ON sec.sec_id = tb_section.sec_id
	--OPEN curs_ManagerIncomplete
	--FETCH NEXT
	--FROM curs_ManagerIncomplete
	--INTO @sec_id
	--	,@MangerID
	--	,@SecondMangerID
	--WHILE @@FETCH_STATUS = 0
	--BEGIN
	--	SET @body = N'<div  dir="rtl"><div ><h3>لم يقم الموظفين التابعين لإدارتكم بتسجيل حركة خروج في تاريخ [' + @DayName + N' ' + dbo.GetDateAsString(@c_date) + N'] </h3></div><div dir="rtl" ><table border="1" width="100%" ><tr><td>رقم الموظف</td><td>اسم الموظف</td></tr>'
	--	DECLARE curs_EmpIncomplete CURSOR FAST_FORWARD
	--	FOR
	--	SELECT emp_no
	--		,emp_name
	--	FROM @tb_incomplete empincomplete
	--	JOIN tb_employee emp ON empincomplete.emp_id = emp.emp_id
	--	WHERE empincomplete.sec_id = @sec_id
	--	OPEN curs_EmpIncomplete
	--	FETCH NEXT
	--	FROM curs_EmpIncomplete
	--	INTO @emp_no
	--		,@emp_name
	--	WHILE @@FETCH_STATUS = 0
	--	BEGIN
	--		SET @body = ISNULL(@body, '') + Replace(REPLACE(@bodyrep, '?emp_no', @emp_no), '?emp_name', @emp_name)
	--		FETCH NEXT
	--		FROM curs_EmpIncomplete
	--		INTO @emp_no
	--			,@emp_name
	--	END
	--	CLOSE curs_EmpIncomplete
	--	DEALLOCATE curs_EmpIncomplete
	--	SET @body = @body + '</table></div></div>'
	--	PRINT @body
	--	IF isnull(@body, '') <> ''
	--		EXEC SendEmail @MangerID
	--			,N'تقرير عدم تسجيل حركة الخروج'
	--			,NULL
	--			,@body
	--			,1
	--			,1
	--	SET @body = NULL
	--	FETCH NEXT
	--	FROM curs_ManagerIncomplete
	--	INTO @sec_id
	--		,@MangerID
	--		,@SecondMangerID
	--END
	--CLOSE curs_ManagerIncomplete
	--DEALLOCATE curs_ManagerIncomplete
	PRINT 'Incomplete Report has been sent successfully'

	----تقرير المتأخرين
	select @body = NULL,@EmpCount=NULL
	SET @bodyrep = N'<tr><td>?emp_no</td><td>?emp_name</td><td>?late</td></tr>'

	DECLARE curs_ManagerLate CURSOR FAST_FORWARD
	FOR
	SELECT Mngr_ID
	FROM @tb_lates
	WHERE Mngr_ID > 0
	GROUP BY Mngr_ID

	OPEN curs_ManagerLate

	FETCH NEXT
	FROM curs_ManagerLate
	INTO @MangerID

	WHILE @@FETCH_STATUS = 0
	BEGIN
		SET @body = N'<div  dir="rtl"><div ><h3>تم تسجيل ساعات تأخير على الموظفين التابعين لإدارتكم في تاريخ [' + @DayName + N' ' + dbo.GetDateAsString(@c_date) + 
			N'] </h3></div><div dir="rtl" ><table border="1" width="100%" ><tr><td><b>رقم الموظف</b></td><td><b>اسم الموظف</b></td><td><b>ساعات التأخير</b></td></tr>'

		DECLARE curs_EmpLate CURSOR FAST_FORWARD
		FOR
		SELECT emp_no
			, emp_name
			, m_totallate
		FROM @tb_lates emplate
		INNER JOIN tb_employee emp
			ON emplate.emp_id = emp.emp_id
		WHERE emplate.Mngr_ID = @MangerID
		and emp_card not in(select EMPID  from  EmailException )

		OPEN curs_EmpLate

		FETCH NEXT
		FROM curs_EmpLate
		INTO @emp_no
			, @emp_name
			, @m_totallate

		WHILE @@FETCH_STATUS = 0
		BEGIN
			SET @body = ISNULL(@body, '') + Replace(Replace(REPLACE(@bodyrep, '?emp_no', @emp_no), '?emp_name', @emp_name), '?late', @m_totallate)
			select @EmpCount=isnull(@EmpCount,0)+1
			FETCH NEXT
			FROM curs_EmpLate
			INTO @emp_no
				, @emp_name
				, @m_totallate
		END

		CLOSE curs_EmpLate

		DEALLOCATE curs_EmpLate

		SET @body = @body + '</table></div></div>'

		--PRINT @body
		IF isnull(@body, '') <> '' and isnull(@EmpCount,0)>0
			EXEC SendEmail @MangerID
				, N'تقرير الموظفين المتأخرين'
				, NULL
				, @body
				, 1
				, 1

		select @body = NULL,@EmpCount=NULL

		FETCH NEXT
		FROM curs_ManagerLate
		INTO @MangerID
	END

	CLOSE curs_ManagerLate

	DEALLOCATE curs_ManagerLate

	--DECLARE curs_ManagerLate CURSOR FAST_FORWARD
	--FOR
	--SELECT sec.sec_id
	--	,sec_manager
	--	,CASE 
	--		WHEN sec_secondmanageractive = 1
	--			THEN sec_secondmanager
	--		ELSE 0
	--		END
	--FROM @tb_secLate sec
	--JOIN tb_section ON sec.sec_id = tb_section.sec_id
	--OPEN curs_ManagerLate
	--FETCH NEXT
	--FROM curs_ManagerLate
	--INTO @sec_id
	--	,@MangerID
	--	,@SecondMangerID
	--WHILE @@FETCH_STATUS = 0
	--BEGIN
	--	SET @body = N'<div  dir="rtl"><div ><h3>تم تسجيل ساعات تأخير على الموظفين التابعين لإدارتكم في تاريخ [' + @DayName + N' ' + dbo.GetDateAsString(@c_date) + N'] </h3></div><div dir="rtl" ><table border="1" width="100%" ><tr><td>رقم الموظف</td><td>اسم الموظف</td><td>ساعات التأخير</td></tr>'
	--	DECLARE curs_EmpLate CURSOR FAST_FORWARD
	--	FOR
	--	SELECT emp_no
	--		,emp_name
	--		,m_totallate
	--	FROM @tb_lates emplate
	--	JOIN tb_employee emp ON emplate.emp_id = emp.emp_id
	--	WHERE emplate.sec_id = @sec_id
	--	OPEN curs_EmpLate
	--	FETCH NEXT
	--	FROM curs_EmpLate
	--	INTO @emp_no
	--		,@emp_name
	--		,@m_totallate
	--	WHILE @@FETCH_STATUS = 0
	--	BEGIN
	--		SET @body = ISNULL(@body, '') + Replace(Replace(REPLACE(@bodyrep, '?emp_no', @emp_no), '?emp_name', @emp_name), '?late', @m_totallate)
	--		FETCH NEXT
	--		FROM curs_EmpLate
	--		INTO @emp_no
	--			,@emp_name
	--			,@m_totallate
	--	END
	--	CLOSE curs_EmpLate
	--	DEALLOCATE curs_EmpLate
	--	SET @body = @body + '</table></div></div>'
	--	PRINT @body
	--	IF isnull(@body, '') <> ''
	--		EXEC SendEmail @MangerID
	--			,N'تقرير الموظفين المتأخرين'
	--			,NULL
	--			,@body
	--			,1
	--			,1
	--	SET @body = NULL
	--	FETCH NEXT
	--	FROM curs_ManagerLate
	--	INTO @sec_id
	--		,@MangerID
	--		,@SecondMangerID
	--END
	--CLOSE curs_ManagerLate
	--DEALLOCATE curs_ManagerLate
	------
	DROP TABLE #tempSummryTrans
	return 1
END















GO

CREATE PROCEDURE [dbo].[SendNoficationForAbsent] @emp_id INT
	, @m_date INT
AS
BEGIN
	DECLARE @MangerID INT
		, @SecondMangerID INT
		, @subject NVARCHAR(500)
		, @title NVARCHAR(500)
		, @body NVARCHAR(4000)
		, @bodyEN NVARCHAR(4000)
		, @senderID INT
		, @TemplateID INT
		, @Emp_no NVARCHAR(50)
		, @emp_name NVARCHAR(250)
		, @emp_nameEn NVARCHAR(250)
		, @DayName NVARCHAR(50)
		, @DayNameEN NVARCHAR(50)

	SELECT @DayName = dbo.GetDayOfFullName(@m_date)
		, @DayNameEN = dbo.GetDayOfFullNameEN(@m_date)

	SELECT @Emp_no = emp_no
		, @emp_name = emp_name
		, @emp_nameEn = isnull(emp_nameEN, emp_name)
	FROM tb_employee
	WHERE emp_id = @emp_id

	SELECT @body = N'<B>' + N'عزيزي الموظف ' + @emp_name + N'</B><br/><br/>' + N' لقد تم تسجيل حركة غياب في الحضور والإنصراف الخاص بك في تاريخ: ' + N'<br/><b>' + 
		@DayName + N' ' + dbo.GetDateAsString(@m_date) + 
		N'</b><br/><br/><b>للتكرم بالإطلاع وسرعة التبرير أن وجد قبل تطبيق الجزاء بحقكم حسب لائحة الشركة .</b> '
		, @bodyEN = N'<B>' + N'Dear ' + @emp_nameEn + N'</B><br/><br/>' + N' Your absence has been recorded on date:  ' + N'<br/><b>' + @DayNameEN + N' ' + dbo.
		GetDateAsString(@m_date) + 
		N'</b><br/><br/><b>Please clarify with the reason if exist before applying the penalty according to the company policy  .</b> '

	SELECT @body = 
		N'<table cellpadding="0" cellspacing="0"  style="background: #fff;">
                                        <tr>
                                            <td  dir="rtl" align="right" style="border-left:2px solid #9a9a9a">
                                                <div dir="rtl" style="float:right;">
                                                   ' 
		+ @body + 
		'
                                                </div>
                                            </td>
                                            <td  dir="ltr" align="left">
                                                <div dir="ltr" style="float:left;">
                                                    ' 
		+ @bodyEN + 
		'
                                                </div>
                                            </td>
                                        </tr>
                                    </table>'
		, @subject = N'نظام الحضور والإنصراف | Attendance System'
		, @title = N'رسالة تنبيه الغياب | Absence alert'
		, @senderID = 1
		, @TemplateID = 2

	EXEC SendEmail @emp_id = @emp_id
		, @subject = @subject
		, @title = @title
		, @body = @body
		, @senderID = @senderID
		, @TemplateID = @TemplateID

END















GO
CREATE PROCEDURE [dbo].[SendNoficationForExecuseAdd] @emp_id INT
	,@execuseMsg NVARCHAR(max)
AS
BEGIN
	DECLARE @MangerID INT
		,@SecondMangerID INT
		,@subject NVARCHAR(500)
		,@title NVARCHAR(500)
		,@body NVARCHAR(4000)
		,@senderID INT
		,@TemplateID INT
		,@Emp_no NVARCHAR(50)
		,@emp_name NVARCHAR(250)
	SELECT @Emp_no = emp_no
		,@emp_name = emp_name
	FROM tb_employee
	WHERE emp_id = @emp_id
	SELECT @body =N'<B>' + N'عزيزي الموظف ' + @emp_name + N'</B><br/>' + N' لقد قمت بتقديم طلب استئذان ،وهو بانتظار موافقة المدير المباشر..' + '<br/>' + @execuseMsg
		,@subject = N'طلب إستئذان'
		,@title = null
		,@senderID = 1
		,@TemplateID = 1
		,@MangerID = dbo.GetManagerbyEmpID(@emp_id)
		,@SecondMangerID = dbo.GetSecondManagerbyEmpID(@emp_id)
	EXEC SendEmail @emp_id = @emp_id
		,@subject = @subject
		,@title = @title
		,@body = @body
		,@senderID = @senderID
		,@TemplateID = @TemplateID
	SELECT @body = N'يوجد طلب إستئذان جديد للموظف ' +  @Emp_no + ' ' + @emp_name +  N'<br/>' + @execuseMsg
		,@subject = N'طلب إستئذان جديد'
	EXEC SendEmail @emp_id = @MangerID
		,@subject = @subject
		,@title = @title
		,@body = @body
		,@senderID = @senderID
		,@TemplateID = @TemplateID
	EXEC SendEmail @emp_id = @SecondMangerID
		,@subject = @subject
		,@title = @title
		,@body = @body
		,@senderID = @senderID
		,@TemplateID = @TemplateID
END


















GO
CREATE PROCEDURE [dbo].[SendNoficationForExecuseApprove] @exec_id INT
	,@emp_id INT
	,@emp_name NVARCHAR(250)
	,@ApprovalType CHAR(5)
AS
BEGIN
	DECLARE @subject NVARCHAR(500)
		,@title NVARCHAR(500)
		,@body NVARCHAR(4000)
		,@senderID INT
		,@TemplateID INT
		,@exc_date INT
		,@exc_ftime NVARCHAR(5)
		,@exc_ttime NVARCHAR(5)
		,@exc_reason NVARCHAR(MAX)
		,@execuseReason_ID INT
		,@execRes NVARCHAR(250)
		,@ExecuseMsg NVARCHAR(max)
	SELECT @exc_date = exc_date
		,@exc_ftime = exc_ftime
		,@exc_ttime = exc_ttime
		,@exc_reason = exc_reason
		,@execRes = tb_execuseReason.execuseReason_name
	FROM tb_execuse
	LEFT JOIN tb_execuseReason ON tb_execuseReason.execuseReason_id = tb_execuse.execuseReason_ID
where tb_execuse.exc_id =@exec_id 
	SET @ExecuseMsg = N'<table border="1"><tr><td>التاريخ</td><td>الوقت من</td><td>الوقت إلى</td><td>السبب</td></tr><tr><td>' + dbo.GetDateAsString(@exc_date) + N'</td><td>' + @exc_ftime + N'</td><td>' + @exc_ttime + N'</td><td>' + isnull(@execRes, '') + ' - ' + @exc_reason + N' </td></tr></table>'
	IF @ApprovalType = 'EAS02'
		SELECT @body =N'<B>عزيزي الموظف ' + @emp_name + N'</B><br/>'+ N' لقد تمت الموافقة على طلبك للاستئذان' + '<br/>' + @execuseMsg
	ELSE
		SELECT @body =N'<B>عزيزي الموظف ' + @emp_name + N'</B><br/>'+ N' لقد تم الرفض على طلبك للاستئذان' + '<br/>' + @execuseMsg
	SELECT @subject = N'حالة الإستئذان'
		,@title = null
		,@senderID = 1
		,@TemplateID = 1
	EXEC SendEmail @emp_id = @emp_id
		,@subject = @subject
		,@title = @title
		,@body = @body
		,@senderID = @senderID
		,@TemplateID = @TemplateID
END


















GO

CREATE PROCEDURE [dbo].[SendNoficationForIncomplete] @emp_id INT
	, @m_date INT
AS
BEGIN
	DECLARE @MangerID INT
		, @SecondMangerID INT
		, @subject NVARCHAR(500)
		, @title NVARCHAR(500)
		, @body NVARCHAR(4000)
		, @bodyEN NVARCHAR(4000)
		, @senderID INT
		, @TemplateID INT
		, @Emp_no NVARCHAR(50)
		, @emp_name NVARCHAR(250)
		, @emp_nameEn NVARCHAR(250)
		, @bodyrep NVARCHAR(max)
		, @DayName NVARCHAR(50)
		, @DayNameEN NVARCHAR(50)

	SELECT @DayName = dbo.GetDayOfFullName(@m_date)
		, @DayNameEN = dbo.GetDayOfFullNameEN(@m_date)

	SELECT @Emp_no = emp_no
		, @emp_name = emp_name
		, @emp_nameEn = isnull(emp_nameEN, emp_name)
	FROM tb_employee
	WHERE emp_id = @emp_id

	SELECT @body = N'<B>' + N'عزيزي الموظف ' + @emp_name + N'</B><br/><br/>' + N' لم تقم بتسجيل حركة دخول أو خروج في الحضور والإنصراف الخاص بك في تاريخ: ' + 
		N'<br/><b>' + @DayName + N' ' + dbo.GetDateAsString(@m_date) + 
		N'</b><br/><br/><b>للتكرم بالإطلاع وسرعة التبرير أن وجد قبل تطبيق الجزاء بحقكم حسب لائحة الشركة .</b> '
		, @bodyEN = N'<B>' + N'Dear ' + @emp_nameEn + N'</B><br/><br/>' + N' You forgot to fingerprint in or out and it has been recorded on date: ' + N'<br/><b>' + 
		@DayNameEN + N' ' + dbo.GetDateAsString(@m_date) + 
		N'</b><br/><br/><b>Please clarify with the proper reason if exist before applying the penalty according to the company policy.</b> '
		, @subject = N'نظام الحضور والإنصراف | Attendance System'
		, @title = N'نسيان تسجيل بصمة الدخول أو الخروج | Forgot finger print –in or out'
		, @senderID = 1
		, @TemplateID = 2

	SELECT @body = 
		N'<table cellpadding="0" cellspacing="0"  style="background: #fff">
                                        <tr>
                                            <td align="right"   dir="rtl"  style="border-left:2px solid #9a9a9a ">
                                                <div dir="rtl" style="float:right;">
                                                   ' 
		+ @body + 
		'
                                                </div>
                                            </td>
                                            <td  align="left"   dir="ltr">
                                                <div dir="ltr" style="float:left;">
                                                    ' 
		+ @bodyEN + 
		'
                                                </div>
                                            </td>
                                        </tr>
                                    </table>'

	

	EXEC SendEmail @emp_id = @emp_id
		, @subject = @subject
		, @title = @title
		, @body = @body
		, @senderID = @senderID
		, @TemplateID = @TemplateID
END















GO
CREATE PROCEDURE [dbo].[SendNoficationForLate] @emp_id INT
	,@m_date int,@mlate nvarchar(10)
AS
BEGIN
	DECLARE
		 @subject NVARCHAR(500)
		,@title NVARCHAR(500)
		,@body NVARCHAR(4000)
		, @bodyEN NVARCHAR(4000)
		,@senderID INT
		,@TemplateID INT
		,@Emp_no NVARCHAR(50)
		,@emp_name NVARCHAR(250)
		, @emp_nameEn NVARCHAR(250)
		,@DayName  NVARCHAR(50)
		, @DayNameEN NVARCHAR(50)
		SELECT @DayName = dbo.GetDayOfFullName(@m_date)
		, @DayNameEN = dbo.GetDayOfFullNameEN(@m_date)
	SELECT @Emp_no = emp_no
		,@emp_name = emp_name, @emp_nameEn = isnull(emp_nameEN, emp_name)
	FROM tb_employee
	WHERE emp_id = @emp_id
	SELECT @body =N'<B>' + N'عزيزي الموظف ' + @emp_name + N'</B><br/>' + N' نود الإفادة بأنه تم تسجيل ملاحظة على تقرير الحضور والانصراف الخاص بكم حسب التالي: '  + 
	N'<br/><br/><table   border="1"  width="100%" ><tr><td><b>التاريــــخ</b></td><td><b>مجموع ساعات التأخير</b></td></tr><tr><td>'+ @DayName + N' ' + dbo.GetDateAsString(@m_date) + N'</td><td>'+ @mlate +N'</td></tr></table><br/><b>للتكرم بالإطلاع وسرعة التبرير أن وجد قبل تطبيق الجزاء بحقكم حسب لائحة الشركة .</b> '
		 ,@bodyEN =N'<B>' + N'Dear ' + @emp_nameEn + N'</B><br/>' + N' We would like to inform you that it has been recorded on your attendance report the following observations : '  + 
	N'<br/><br/><table  border="1" width="100%" ><tr><td><b>Date</b></td><td><b>Total late hours</b></td></tr><tr><td>'+ @DayNameEN + N' ' + dbo.GetDateAsString(@m_date) + N'</td><td>'+ @mlate +N'</td></tr></table><br/><b>Please clarify with the proper reason if exist before applying the penalty according to the company policy.</b> '
		,@subject = N'نظام الحضور والإنصراف | Attendance System'
		,@title = N'رسالة تنبيه بتأخير الموظف | Late alert'
		,@senderID = 1
		,@TemplateID = 2

		SELECT @body = 
		N'<table cellpadding="0" cellspacing="0"  style="background: #fff">
                                        <tr>
                                            <td align="right" dir="rtl"  style="border-left:2px solid #9a9a9a" >
                                                <div dir="rtl" style="float:right;">
                                                   ' 
		+ @body + 
		'
                                                </div>
                                            </td>
                                            <td align="left"   dir="ltr" >
                                                <div dir="ltr" style="float:left;">
                                                    ' 
		+ @bodyEN + 
		'
                                                </div>
                                            </td>
                                        </tr>
                                    </table>'


	EXEC SendEmail @emp_id = @emp_id
		,@subject = @subject
		,@title = @title
		,@body = @body
		,@senderID = @senderID
		,@TemplateID = @TemplateID
END















GO
CREATE PROCEDURE SendViolationsEmailToEmployees
AS
BEGIN
	DECLARE @c_date INT
		, @currentdate INT
		, @st INT

	SELECT @c_date = value
		, @currentdate = dbo.getnofromdate(getdate())
		, @st = 1
	FROM [dbo].[tb_setting]
	WHERE SettingID = 4

	WHILE @c_date < @currentdate
		AND @st = 1 
	BEGIN
		EXEC @st = [SendEmailForAbsentAndIncomplate] @c_date

		SET @st = isnull(@st, 0)

		IF @st = 1
		BEGIN
			SET @c_date = @c_date + 1
		END
	END

	UPDATE [dbo].[tb_setting]
	SET value = @c_date
	WHERE SettingID = 4

	return @c_date
END
















GO
CREATE PROCEDURE [dbo].[spChangePassword] @user_id INT
	,@user_pass NVARCHAR(50)
AS
BEGIN
	UPDATE [tb_users]
	SET [user_pass] = @user_pass
	,[user_mustchangepassword] =0
	WHERE [user_id] = @user_id

	RETURN @@rowcount
END
















GO
CREATE PROCEDURE [dbo].[spcheckallemplyeeshavetrans]
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @c_date INT,
		@lastUpdateDate INT,
		@sid INT,
		@TransID BIGINT
	SELECT @c_date = dbo.getnofromdate(getdate()),
		@lastUpdateDate = ISNULL((
				SELECT value
				FROM tb_setting(NOLOCK)
				WHERE settingID = 1
				), 0)
	IF @lastUpdateDate < @c_date
	BEGIN
		IF @lastUpdateDate = 0
			SET @lastUpdateDate = @c_date
		ELSE
			SET @lastUpdateDate = @lastUpdateDate + 1
		SELECT emp_card m_id,
			emp_id
		INTO #temp
		FROM tb_employee
		WHERE (emp_deleted = 0 AND emp_violatedException = 0 AND emp_jointype <> 'EJT08')
		--BEGIN TRAN TAaddallemplyee
		WHILE @lastUpdateDate <= @c_date
		BEGIN
			DECLARE @m_id BIGINT,
				@emp_id BIGINT
			DECLARE db_cursor CURSOR
			FOR
			SELECT m_id,
				emp_id
			FROM #temp
			OPEN db_cursor
			FETCH NEXT
			FROM db_cursor
			INTO @m_id,
				@emp_id
			WHILE @@FETCH_STATUS = 0
			BEGIN
				SELECT @TransID = NULL
				EXEC @TransID = spinsertTotransSummey @m_id = @m_id,
					@m_date = @lastUpdateDate,
					@emp_id = @emp_id,
					@sid = @sid,
					@ftime = NULL,
					@ttime = NULL
				IF @TransID > 0
					EXEC spUpdateIncomplete @m_id,
						@lastUpdateDate --,@sid spUpdateIncomplete_twoshifts
				FETCH NEXT
				FROM db_cursor
				INTO @m_id,
					@emp_id
			END
			CLOSE db_cursor
			DEALLOCATE db_cursor
			PRINT 'All employees transactions updated on ' + dbo.getdateasstring(@lastUpdateDate)
			SET @lastUpdateDate = @lastUpdateDate + 1
		END
		DROP TABLE #temp
		UPDATE tb_setting
		SET value = @c_date
		WHERE settingID = 1
		--	COMMIT TRAN TAaddallemplyee
		PRINT 'All employees transactions updated on ' + dbo.getdateasstring(@c_date)
	END
END















GO
CREATE PROCEDURE [dbo].[spCheckEmpExists] @emp_no NVARCHAR(50)
	,@emp_card BIGINT
	,@empID INT = NULL
AS
BEGIN
	DECLARE @c_empno INT
		,@c_empcard INT

	IF @empID IS NULL
	BEGIN
		SELECT @c_empno = count(emp_id)
		FROM tb_employee
		WHERE emp_no = @emp_no

		IF @c_empno > 0 --رقم الموظف موجود بالفعل
			RETURN - 2

		SELECT @c_empcard = count(emp_id)
		FROM tb_employee
		WHERE emp_card = @emp_card

		IF @c_empcard > 0
		BEGIN
			SELECT @c_empcard = count(emp_id)
			FROM tb_employee
			WHERE emp_card = @emp_card
				AND emp_deleted = 1

			IF @c_empcard > 0
			BEGIN
				SELECT @c_empno = emp_id
				FROM tb_employee
				WHERE emp_card = @emp_card

				--رقم البطاقة محجوز لموظف تم حذفه من النظام <br /> هل ترغب بحذف جميع البيانات المرتبطة بالبطاقة واستعمال البطاقة لموظف آخر؟ 
				RETURN @c_empno
			END

			--رقم البطاقة موجود بالفعل
			RETURN - 3
		END

		RETURN 0
	END
	ELSE
	BEGIN
		SELECT @c_empno = count(emp_id)
		FROM tb_employee
		WHERE emp_no = @emp_no
			AND emp_id <> @empID

		IF @c_empno > 0 --رقم الموظف موجود بالفعل
			RETURN - 2

		SELECT @c_empcard = count(emp_id)
		FROM tb_employee
		WHERE emp_card = @emp_card
			AND emp_id <> @empID

		IF @c_empcard > 0
			--رقم البطاقة موجود بالفعل
			RETURN - 3

		RETURN 0
	END
END

















GO

CREATE PROCEDURE [dbo].[spdeleteemployee] @emp_id INT
	,@UserName NVARCHAR(250)
	,@deleteOldData BIT = 0
AS
BEGIN
	DECLARE @currentdate INT
		,@emp_name NVARCHAR(500)
		,@emp_card INT

	SELECT @emp_name = emp_name
		,@emp_card = emp_card
	FROM [tb_employee]
	WHERE emp_id = @emp_id

	IF @deleteOldData = 1
	BEGIN
		DELETE
		FROM tb_empschedual
		WHERE emp_id = @emp_id

		DELETE
		FROM tb_execuse
		WHERE exc_empid = @emp_id

		DELETE
		FROM tb_trans
		WHERE m_id = @emp_card

		DELETE
		FROM tb_transSummey
		WHERE m_id = @emp_card

		DELETE
		FROM tb_vacation
		WHERE vac_empid = @emp_id

		DELETE
		FROM [dbo].[tb_employee]
		WHERE emp_id = @emp_id
		return 1
	END

	UPDATE [dbo].[tb_employee]
	SET [emp_deleted] = 1
	WHERE emp_id = @emp_id

	SET @currentdate = dbo.getnofromdate(getdate())

	IF @UserName <> ''
		EXEC spsaveuserlog 5
			,@emp_id
			,1
			,@UserName
			,1
			,@emp_name
			,@currentdate

	RETURN 1
END

















GO
CREATE PROCEDURE [dbo].[spdeleteexecuse] @exc_id INT
	,@UserName NVARCHAR(250)
AS
BEGIN
	BEGIN TRAN TAdeleteexecuse
	UPDATE tb_execuse
	SET exc_deleted = 1,exc_status=0
	WHERE [exc_id] = @exc_id
	Update tb_transSummey set m_exc_id =0 where m_exc_id =@exc_id
	DECLARE @m_id BIGINT
		,@m_date INT
		,@emp_id BIGINT
		,@empname NVARCHAR(200)
	SELECT @emp_id = exc_empid
		,@m_date = exc_date
	FROM tb_execuse
	WHERE exc_id = @exc_id
	SELECT @m_id = emp_card
		,@empname = emp_name
	FROM tb_employee
	WHERE emp_id = @emp_id
	 IF @m_id IS NOT NULL 
	   BEGIN
	        IF ISNULL((SELECT cast(value as int) from  tb_setting where SettingID=6),1)> 1
	   	      EXEC sprecalculatetranssummery_twoshifts @m_id,@m_date
	       ELSE
	          EXEC sprecalculatetranssummery @m_id,@m_date 
	   END
	COMMIT TRAN TAdeleteexecuse
	EXEC spsaveuserlog 1
		,@exc_id
		,1
		,@UserName
		,1
		,@empname
		,@m_date
END














GO

-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-04-03>
-- Description:	<Vacation Type Delete Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spdeleteexecuseReason] @execuseReason_id INT
	,@UserName NVARCHAR(250)
AS
BEGIN
	DECLARE @arabicdesc NVARCHAR(max)
		,@englishdesc NVARCHAR(max)
		,@RowEffect INT

	IF (
			SELECT count(1)
			FROM dbo.tb_execuse
			WHERE execuseReason_id = @execuseReason_id
			) > 0
		RETURN 0
	ELSE
		DECLARE @execuseReason_name NVARCHAR(200)

	SET @execuseReason_name = (
			SELECT execuseReason_name
			FROM tb_execuseReason
			WHERE execuseReason_id = @execuseReason_id
			)

	DELETE
	FROM [dbo].[tb_execuseReason]
	WHERE execuseReason_id = @execuseReason_id

	SET @RowEffect = @@ROWCOUNT
	SET @arabicdesc = (N'تم حذف سبب الاستئذان ' + @execuseReason_name + N' من قبل الموظف ' + @username + N' بتاريخ' + cast(getdate() AS VARCHAR(20)))
	SET @englishdesc = (N'delete excuse Reason  ' + @execuseReason_name + N' by ' + @username + N'  at ' + cast(getdate() AS VARCHAR(20)))

	EXEC spsaveuserlog 1
		,@execuseReason_id
		,1
		,@UserName
		,0
		,NULL
		,NULL
		,@arabicdesc
		,@englishdesc

	RETURN @RowEffect
END

















GO
CREATE PROCEDURE [dbo].[spdeleteRegions] @reg_id BIGINT
AS
BEGIN
	IF EXISTS (
			SELECT 1
			FROM tb_employee
			WHERE emp_region = @reg_id
			)
		RETURN 0
	ELSE
	BEGIN
		DELETE
		FROM [dbo].[tb_Regions]
		WHERE reg_id = @reg_id
		RETURN 1
	END
END
















GO
CREATE PROCEDURE [dbo].[spdeletesection] @sec_id INT
	,@UserName NVARCHAR(250)
AS
BEGIN
	DECLARE @currentdate INT
		,@sec_Name NVARCHAR(100)
		,@isRoot BIT

	SELECT @sec_Name = sec_name
		,@isRoot = IsRoot
	FROM tb_section
	WHERE sec_ID = @sec_id

	IF @sec_Name IS NULL
		RETURN - 1

	IF @isRoot = 1
		RETURN - 2

	IF EXISTS (
			SELECT TOP (1) sec_id
			FROM tb_section
			WHERE sec_Parent = @sec_id
			)
		RETURN - 3

	IF EXISTS (
			SELECT TOP (1) emp.emp_id
			FROM dbo.GetAllEmployeeByMainSec(@sec_id) emp
			WHERE emp.emp_deleted = 0
			)
		RETURN - 4

	DELETE
	FROM tb_section
	WHERE sec_ID = @sec_id

	SET @currentdate = dbo.getnofromdate(getdate())

	EXEC spsaveuserlog 4
		,@sec_id
		,1
		,@UserName
		,0
		,@sec_Name
		,@currentdate

	RETURN 1
END

















GO
CREATE PROCEDURE [dbo].[spdeletetrans] @trans_id BIGINT,
	@m_deleted BIT = NULL,
	@UserName NVARCHAR(250)
AS
BEGIN
	BEGIN TRANSACTION TA
	UPDATE [dbo].[tb_trans]
	SET m_deleted = CASE 
			WHEN m_deleted = 1
				THEN 0
			ELSE 1
			END,
		m_manual = 1
	WHERE trans_id = @trans_id
	DECLARE @MDate BIGINT,
		@MEmpCard BIGINT
	SELECT @MDate = m_date,
		@MEmpCard = m_id
	FROM [tb_trans]
	WHERE trans_id = @trans_id
	EXEC spregeneratetranssummery @MEmpCard,
		@MDate,
		1
	COMMIT TRANSACTION TA
	DECLARE @empname NVARCHAR(100)
	SET @empname = (
			SELECT emp_name
			FROM tb_employee
			WHERE emp_card = @MEmpCard
			)
	EXEC spsaveuserlog 8,
		@trans_id,
		1,
		@UserName,
		1,
		@empname,
		@MDate
END















GO
-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-01-26>
-- Description:	<Employee update Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spdeletetrans_twoshifts] 
      @trans_id BIGINT
	 ,@m_deleted BIT
	 ,@UserName NVARCHAR(250)
AS
BEGIN
	BEGIN TRAN TA
	DECLARE @m_id INT,@m_date BIGINT,@CV_CODE int,@m_time VARCHAR(12)
		SELECT @m_id = m_id
			  ,@m_date = m_date
			  ,@m_time=m_time
	  		  ,@CV_CODE=CV_CODE
		FROM tb_trans
		WHERE trans_id = @trans_id
		UPDATE [dbo].[tb_trans]
		SET m_deleted = @m_deleted
			,m_manual = 1
		WHERE trans_id = @trans_id
	    IF @m_deleted=1
	    BEGIN   
	         SET @m_time='--:--'        
		 END	
		ELSE IF @m_deleted=0
	     BEGIN
	        UPDATE [dbo].[tb_trans] SET  m_deleted=1 WHERE   m_id = @m_id and m_date = @m_date and CV_CODE = @CV_CODE and m_deleted=0 and  trans_id <> @trans_id
	     END  
		 exec spsavetranssummery_twoshifts @m_id,@m_time,@m_date,@CV_CODE,1	    			 
	COMMIT TRAN TA
	DECLARE @empname NVARCHAR(100)
	SET @empname = (
			SELECT emp_name
			FROM tb_employee
			WHERE emp_card = @m_id
			)
	EXEC spsaveuserlog 8
		,@trans_id
		,1
		,@UserName
		,1
		,@empname
		,@m_date
END
	/****** Object:  StoredProcedure [dbo].[spGetTimeSheetByEmp]    Script Date: 05/29/2009 13:21:07 ******/
	-- SET ANSI_NULLS ON


















GO

CREATE PROCEDURE [dbo].[spdeleteuptTransReason] @uptTransReason_id INT,
	@UserName NVARCHAR(150) = NULL
AS
BEGIN
	IF (
			SELECT count(1)
			FROM dbo.tb_translog
			WHERE TransReasonID = @uptTransReason_id
			) > 0
		RETURN 0
	ELSE
	BEGIN
		DECLARE @Name NVARCHAR(200),
			@currentdate INT

		IF @UserName IS NOT NULL
			SELECT @currentdate = dbo.getnofromdate(getdate()),
				@Name = uptTransReason_name
			FROM tb_uptTransReason
			WHERE uptTransReason_id = @uptTransReason_id

		DELETE
		FROM [dbo].[tb_uptTransReason]
		WHERE uptTransReason_id = @uptTransReason_id

		IF @UserName IS NOT NULL
			EXEC spsaveuserlog 13,
				@uptTransReason_id,
				1,
				@UserName,
				0,
				@Name,
				@currentdate

		RETURN 1
	END
END















GO

CREATE PROCEDURE [dbo].[spdeletevacation] @vac_id INT
	,@UserName NVARCHAR(250)
AS
BEGIN
	DECLARE @emp_id BIGINT
		,@fdate INT
		,@tdate INT
		,@RowEffect INT

	BEGIN TRAN TA

	UPDATE [dbo].[tb_vacation]
	SET [vac_deleted] = 1
	WHERE vac_id = @vac_id

	SELECT @RowEffect = @@ROWCOUNT

	SELECT @emp_id = vac_empid
		,@fdate = vac_fdate
		,@tdate = vac_tdate
	FROM tb_vacation
	WHERE vac_id = @vac_id

	EXEC sprecalculatetranssummery_Period @emp_id
		,@fdate
		,@tdate

	COMMIT TRAN TA

	DECLARE @empname NVARCHAR(100) = (
			SELECT emp_name
			FROM tb_employee
			WHERE emp_id = @emp_id
			)

	EXEC spsaveuserlog 2
		,@vac_id
		,1
		,@UserName
		,1
		,@empname
		,@fdate

	RETURN @RowEffect
END


















GO

-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-04-03>
-- Description:	<Vacation Type Delete Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spdeletevacationtype] @vtype_id INT
	,@UserName NVARCHAR(250)
AS
BEGIN
	DECLARE @RowEffect INT

	IF (
			SELECT count(vac_id)
			FROM dbo.tb_vacation
			WHERE vac_type = @vtype_id
			) > 0
		RETURN 0
	ELSE
		DECLARE @vtype_name NVARCHAR(200)

	SET @vtype_name = (
			SELECT vtype_name
			FROM tb_vacationtype
			WHERE vtype_id = @vtype_id
			)

	DELETE
	FROM [dbo].[tb_vacationtype]
	WHERE vtype_id = @vtype_id

	SELECT @RowEffect = @@ROWCOUNT

	DECLARE @arabicdesc NVARCHAR(max)

	SET @arabicdesc = (N'تم حذف نوع الإجازة ' + @vtype_name + N' بواسطة ' + @username + N' في تاريخ ' + cast(getdate() AS VARCHAR(20)))

	DECLARE @englishdesc NVARCHAR(max)

	SET @englishdesc = (N'delete vacation type  ' + @vtype_name + N' by ' + @username + N'  at ' + cast(getdate() AS VARCHAR(20)))

	EXEC spsaveuserlog 3
		,@vtype_id
		,1
		,@UserName
		,0
		,NULL
		,NULL
		,@arabicdesc
		,@englishdesc

	RETURN @RowEffect
END
	/****** Object:  StoredProcedure [dbo].[spinserttotb_empschedual]    Script Date: 05/29/2009 13:21:12 ******/
	-- SET ANSI_NULLS ON

















GO

CREATE PROCEDURE [dbo].[spdologin] @user_name NVARCHAR(150)
	,@user_pass NVARCHAR(50)
AS
RETURN isnull((
			SELECT user_id
			FROM tb_users
			WHERE user_name = @user_name
				AND user_pass = @user_pass
				AND user_active = 1
			), 0)
	/****** Object:  StoredProcedure [dbo].[spinsertshift]    Script Date: 05/29/2009 13:21:11 ******/
	-- SET ANSI_NULLS ON

















GO
CREATE PROCEDURE [dbo].[spdologin_Ext] @user_name NVARCHAR(150),
	@user_pass NVARCHAR(50)
AS
SELECT U.*,
	isnull(E.emp_name, U.user_name) EmpName,
	isnull(E.emp_no, '0') EmpNO
FROM tb_users U
LEFT JOIN tb_employee E
	ON U.user_empid = E.emp_id
WHERE U.user_name = @user_name AND U.user_pass = @user_pass AND U.user_active = 1















GO
CREATE PROCEDURE [dbo].[spdoWindlogin_Ext] @user_name NVARCHAR(150)
	
AS
SELECT U.*,
	isnull(E.emp_name, U.user_name) EmpName,
	isnull(E.emp_no, '0') EmpNO
FROM tb_users U
LEFT JOIN tb_employee E
	ON U.user_empid = E.emp_id
WHERE U.user_name = @user_name AND U.user_active = 1















GO
CREATE PROCEDURE [dbo].[spGetAllRegions] @username NVARCHAR(100) = NULL
AS
BEGIN
	DECLARE @Regions TABLE (reg_id INT)
	DECLARE @permtype SMALLINT,
		@userid INT
	IF @username IS NOT NULL
	BEGIN
		SELECT @userid = [user_id],
			@permtype = user_per
		FROM tb_users
		WHERE [user_name] = @username
		IF @userid IS NOT NULL
			AND @permtype IS NOT NULL
			INSERT INTO @Regions (reg_id)
			SELECT tb_Regions.reg_id
			FROM tb_Regions
			WHERE @permtype = 1
				OR tb_Regions.reg_id IN (
					SELECT reg_id
					FROM tb_UsersRegions
					WHERE user_id = @userid
					)
	END
	ELSE
		INSERT INTO @Regions (reg_id)
		SELECT reg_id
		FROM [tb_Regions]
	SELECT tb_Regions.reg_id,
		cast(tb_Regions.reg_id AS NVARCHAR) reg_no,
		reg_name
	FROM tb_Regions
	INNER JOIN @Regions empreg
		ON tb_Regions.reg_id = empreg.reg_id
END
















GO
CREATE PROCEDURE [dbo].[spGetContinuousAbsenceRpt] 
    @fm_date INT
	,@tm_date INT
	,@femp INT
	,@secid INT
	,@DaysNo Int
AS
BEGIN
WITH R AS (
SELECT
    m_id, m_date,tb_employee.emp_name,
	tb_section.sec_Name ,sec_id,tb_section.sec_path ,
    DATEADD([day], -1 * ROW_NUMBER() OVER(PARTITION BY m_id ORDER BY m_date), dbo.getdatefromno(m_date)) AS grp
FROM
    tb_transSummey join tb_employee
    on tb_transSummey.m_id =tb_employee.emp_card
	join tb_section on tb_employee.emp_section =tb_section.sec_ID 
WHERE
    (m_timefin='--:--' and m_timefout='--:--' and ISNULL(dbo.HasVacation(tb_employee.emp_id, tb_transSummey.m_date), 0)=0) --and m_actualtime <>'00:00'
    and (m_date between @fm_date and @tm_date )
    and (tb_employee.emp_section in (select sec_id from dbo.GetSecUnderSec(@secid)) or  @secid=-1)
    and (tb_employee.emp_id=@femp or @femp=-1)
)
SELECT m_id,emp_name, dbo.getdatefromno(MIN(m_date)) AS fdt, dbo.getdatefromno(MAX( m_date)) AS tdt, COUNT(*) AS no_of_days
,sec_Name,sec_id,sec_path
FROM R
GROUP BY m_id, grp,emp_name
,sec_Name,sec_id,sec_path
HAVING COUNT(*) >= @DaysNo
order by sec_path,m_id
END


















GO

CREATE PROCEDURE [dbo].[spGetDailyTimeSheetForManager] @fm_date INT
	,@tm_date INT
	,@empid INT
	,@secid INT
	,@username NVARCHAR(250)
AS
BEGIN
	DECLARE @tbl TABLE (
		sec_ID INT
		,sec_Name NVARCHAR(500)
		)

	INSERT INTO @tbl
	SELECT sec_ID
		,sec_Name
	FROM dbo.GetSectionUnderManager(NULL, @secid)

	DECLARE @manageremp_id INT

	SELECT @manageremp_id = emp_id
	FROM tb_employee
	INNER JOIN tb_users ON tb_employee.emp_id = user_empid
	WHERE [user_name] = @username

	DECLARE @Manager_EmpID INT
		,@SecondManager_EmpID INT

	SELECT @Manager_EmpID = sec_manager
		,@SecondManager_EmpID = isnull(sec_secondmanager, 0)
	FROM tb_section
	WHERE sec_ID = @secID

	DECLARE @ManagerUsername NVARCHAR(150)
		,@secondManagerUsername NVARCHAR(150)

	SET @ManagerUsername = (
			SELECT TOP 1 user_name
			FROM tb_users
			WHERE user_empid = @Manager_EmpID
				AND user_active = 1
			)
	SET @secondManagerUsername = (
			SELECT TOP 1 user_name
			FROM tb_users
			WHERE user_empid = @SecondManager_EmpID
				AND user_active = 1
			)

	IF @Manager_EmpID = @manageremp_id
	BEGIN
		SET @SecondManager_EmpID = 0
	END

	IF @ManagerUsername IS NOT NULL
		IF (@ManagerUsername NOT LIKE @username)
			AND (@ManagerUsername NOT LIKE isnull(@secondManagerUsername, ''))
		BEGIN
			SET @Manager_EmpID = 0
		END

	SELECT tb_employee.emp_id
		,tb_employee.emp_card
		,tb_employee.emp_no
		,tb_employee.emp_name
		,tb_section.sec_name
		,tb_employee.emp_section
		,tb_transSummey.m_date dateno
		,dbo.GetDayOfName(tb_transSummey.m_date) + ' ' + dbo.GetDateAsString(tb_transSummey.m_date) AS m_date
		,dbo.GetDayOfName(tb_transSummey.m_date) AS NameOfDay
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefin), N'--:--') AS timefin
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefout), N'--:--') AS timefout
		,ISNULL(tb_transSummey.m_timetotal, N'--:--') AS timeTotal
		,ISNULL(tb_transSummey.m_actualtime, N'--:--') AS ActualTime
		,ISNULL(tb_transSummey.m_latein, N'--:--') AS LateIn
		,ISNULL(tb_transSummey.m_overtime, N'--:--') AS OverTime
		,ISNULL(tb_transSummey.m_totallate, N'--:--') AS TotalLate
		,ISNULL(tb_transSummey.m_earlyout, N'--:--') AS Earlyout
		,0 f_trans --,ISNULL(t1.statues,0) AS f_trans
		--, ISNULL(dbo.HasExecuse(tb_employee.emp_id, tb_transSummey.m_date), 0) AS exc_id
		,ISNULL(tb_execuse.exc_id, 0) exc_id
		,ISNULL(dbo.HasVacation(tb_employee.emp_id, tb_transSummey.m_date), 0) AS vac_id
		,m_manual
		,CASE 
			WHEN tb_execuse.exc_id IS NOT NULL
				THEN exc_hours
			ELSE '--:--'
			END ExcuseTime
		,execuseReason_name
	FROM tb_transSummey
	INNER JOIN tb_employee ON tb_transSummey.m_id = tb_employee.emp_card
	INNER JOIN tb_section ON tb_employee.emp_section = tb_section.sec_ID
	LEFT JOIN tb_execuse ON tb_employee.emp_id = exc_empid
		AND tb_transSummey.m_date = exc_date
		AND exc_status = 1
		AND exc_deleted = 0
		AND ApprovalByManager = 'EAS02'
	LEFT JOIN tb_execuseReason ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
	WHERE (
			tb_transSummey.m_date BETWEEN @fm_date
				AND @tm_date
			)
		AND EXISTS (
			SELECT 1
			FROM @tbl t
			WHERE t.sec_ID = emp_section
			)
		AND (
			tb_employee.emp_id = @empid
			OR @empid = - 1
			)
		AND emp_id NOT IN (
			@Manager_EmpID
			,@SecondManager_EmpID
			)
	ORDER BY tb_transSummey.m_date
		,tb_transSummey.m_id
END















GO
CREATE PROCEDURE [dbo].[spGetEmployee] @emp_no INT
	,@emp_name NVARCHAR(500)
	,@emp_secID INT
AS
BEGIN
	SELECT tb_employee.*
	FROM [tb_employee]
	JOIN tb_section ON tb_employee.emp_section = tb_section.sec_ID
	WHERE emp_deleted = 0
		AND (
			emp_no = @emp_no
			OR @emp_no = - 1
			)
		AND (
			emp_name LIKE N'%' + @emp_name + '%'
			OR isnull(@emp_name, '') = ''
			)
		AND (
			EXISTS (
				SELECT 1
				FROM dbo.GetSectionUnderManager('',@emp_secID)
				WHERE sec_ID = tb_section.sec_ID
				)
			OR @emp_secID=-1
			)
	ORDER BY emp_id
END


















GO
CREATE PROCEDURE [dbo].[spGetEmployeeByEmpNO] @emp_no NVARCHAR(15)
AS
BEGIN
	SELECT TOP (1) tb_employee.*,
		cast(tb_employee.[emp_card] AS NVARCHAR(10)) emp_cardNvc,
		sec_id,
		sec_Name,
		user_name,
		reg_id,
		reg_name,
		sch_name
	FROM tb_employee
	INNER JOIN tb_section
		ON emp_section = sec_ID
	LEFT JOIN tb_users
		ON tb_employee.emp_id = user_empid
	LEFT JOIN tb_Regions
		ON tb_employee.emp_region = tb_Regions.reg_id
	INNER JOIN tb_schedule
		ON emp_sch = sch_id
	WHERE (emp_no = @emp_no)
END















GO
CREATE PROCEDURE [dbo].[spGetEmployeeByID] @emp_ID INT
AS
BEGIN
	DECLARE @SchGroupName NVARCHAR(150)

	SELECT @SchGroupName = tb_schGroup.schGroup_name
	FROM tb_schGroup
	WHERE schGroup_id = (
			SELECT TOP (1) tb_schGroupEmployees.schGroup_id
			FROM tb_schGroupEmployees
			INNER JOIN tb_schGroup
				ON tb_schGroup.schGroup_id = tb_schGroupEmployees.schGroup_id
			WHERE emp_id = @emp_id AND tb_schGroup.schGroup_deleted = 0 AND (
					tb_schGroup.sch_startdate IS NULL OR dbo.getnofromdate(getdate()) BETWEEN tb_schGroup.sch_startdate
						AND tb_schGroup.sch_enddate
					)
			)

	SELECT tb_employee.*,
		cast(tb_employee.[emp_card] AS NVARCHAR(10)) emp_cardNvc,
		sec_id,
		sec_Name,
		user_name,
		reg_id,
		reg_name,
		sch_name,
		@SchGroupName GroupName
	FROM tb_employee
	INNER JOIN tb_section
		ON emp_section = sec_ID
	LEFT JOIN tb_users
		ON tb_employee.emp_id = user_empid
	LEFT JOIN tb_Regions
		ON tb_employee.emp_region = tb_Regions.reg_id
	INNER JOIN tb_schedule
		ON emp_sch = sch_id
	WHERE (emp_id = @emp_ID)
END















GO
CREATE PROCEDURE [dbo].[spGetEmployeeBySec] @sec_id INT = 0,
	@username NVARCHAR(100) = NULL,
	@reg_id INT = NULL,
	@RowFilter NVARCHAR(max) = NULL,
	@DisplayLength AS INT = NULL,
	@DisplayStart AS INT = NULL,
	@OrderBy AS NVARCHAR(50) = NULL,
	@OrderDir AS NVARCHAR(10) = NULL
AS
BEGIN
SELECT tb_schGroup.schGroup_name
	,emp_id group_empID
	,sch_name group_schname
INTO #GroupTemp
FROM tb_schGroupEmployees
INNER JOIN tb_schGroup
	ON tb_schGroupEmployees.schGroup_id = tb_schGroup.schGroup_id
INNER JOIN tb_schedule
	ON tb_schGroup.sch_id = tb_schedule.sch_id
WHERE tb_schGroup.schGroup_deleted = 0 AND (
		tb_schGroup.sch_startdate IS NULL OR dbo.getnofromdate(getdate()) BETWEEN tb_schGroup.sch_startdate
			AND tb_schGroup.sch_enddate
		)


	IF @DisplayLength IS NULL
	BEGIN
		IF @sec_id <= 0
			SELECT emp.*,
				cast(emp.[emp_card] AS NVARCHAR(10)) emp_cardNvc,
				Sec.sec_Name,
				Reg.reg_name,
				isnull(N'*' + GT.group_schname,Sch.sch_name)sch_name
			FROM [tb_employee] emp
			INNER JOIN dbo.GetEmployeeByUserRegion(@username) empreg
				ON emp.emp_id = empreg.emp_id
			INNER JOIN tb_section Sec
				ON emp.emp_section = Sec.sec_ID
			INNER JOIN tb_Regions Reg
				ON emp.emp_region = Reg.reg_id
			INNER JOIN tb_schedule Sch
				ON emp.emp_sch = sch_id
			left join #GroupTemp GT on GT.group_empID=emp.emp_id
			WHERE emp_deleted = 0 AND (@reg_id IS NULL OR emp_region = @reg_id)
			ORDER BY emp_no,
				emp_name
		ELSE
			SELECT emp.*,
				cast(emp.[emp_card] AS NVARCHAR(10)) emp_cardNvc,
				Sec.sec_Name,
				Reg.reg_name,
				isnull(N'*' + GT.group_schname,Sch.sch_name)sch_name
			FROM dbo.GetAllEmployeeByMainSec(@sec_id) emp
			INNER JOIN dbo.GetEmployeeByUserRegion(@username) empreg
				ON emp.emp_id = empreg.emp_id
			INNER JOIN tb_section Sec
				ON emp.emp_section = Sec.sec_ID
			INNER JOIN tb_Regions Reg
				ON emp.emp_region = Reg.reg_id
			INNER JOIN tb_schedule Sch
				ON emp.emp_sch = sch_id
			left join #GroupTemp GT on GT.group_empID=emp.emp_id
			WHERE emp.emp_deleted = 0 AND (@reg_id IS NULL OR emp_region = @reg_id)
			ORDER BY emp.emp_no,
				emp.emp_name
	END
	ELSE
	BEGIN
		DECLARE @sql NVARCHAR(max),
			@Filter NVARCHAR(max),
			@Order NVARCHAR(max),
			@User NVARCHAR(150)
		DECLARE @FirstRecord NVARCHAR(500),
			@LastRecord NVARCHAR(500),
			@RegFilter NVARCHAR(500)

		SELECT @FirstRecord = cast(@DisplayStart AS VARCHAR),
			@LastRecord = cast((@DisplayStart + @DisplayLength) AS VARCHAR),
			@Filter = CASE 
				WHEN @RowFilter IS NULL
					THEN ''
				ELSE 'And (emp_no like N''%' + @RowFilter + '%'' or emp_name like N''%' + @RowFilter + '%'' or sec_Name like N''%' + @RowFilter + '%'' or reg_name like N''%' + @RowFilter + '%'')'
				END,
			@Order = CASE 
				WHEN @OrderBy IS NULL
					THEN 'emp_no'
				ELSE @OrderBy + ' ' + @OrderDir
				END,
			@User = @username,
			@RegFilter = CASE 
				WHEN @reg_id IS NULL
					THEN ''
				ELSE 'AND (' + cast(@reg_id AS NVARCHAR(50)) + ')'
				END

		IF @sec_id <= 0
			SELECT @sql = 'With CTE_EMPLOYEES as (
		SELECT emp.*, ROW_NUMBER() OVER ( ORDER BY ' + @Order + ' ) AS RowNum,Count(*) over() as TotalRecord,
			cast(emp.[emp_card] AS NVARCHAR(10)) emp_cardNvc,
			Sec.sec_Name,
			Reg.reg_name,
			Sch.sch_name
		FROM [tb_employee] emp
		INNER JOIN dbo.GetEmployeeByUserRegion(''' + @User + ''') empreg
			ON emp.emp_id = empreg.emp_id
		INNER JOIN tb_section Sec
			ON emp.emp_section = Sec.sec_ID
		INNER JOIN tb_Regions Reg
			ON emp.emp_region = Reg.reg_id
		INNER JOIN tb_schedule Sch
			ON emp.emp_sch = sch_id
		WHERE (emp_deleted = 0)' + @RegFilter + ' ' + @Filter + ')
		select * from CTE_EMPLOYEES
		Where RowNum >' + @FirstRecord + ' and RowNum <= ' + @LastRecord
		ELSE
			SELECT @sql = 'With CTE_EMPLOYEES as (
		SELECT emp.*, ROW_NUMBER() OVER ( ORDER BY ' + @Order + ' ) AS RowNum,Count(*) over() as TotalRecord,
			cast(emp.[emp_card] AS NVARCHAR(10)) emp_cardNvc,
			Sec.sec_Name,
			Reg.reg_name,
			Sch.sch_name
		FROM dbo.GetAllEmployeeByMainSec(' + cast(@sec_id AS NVARCHAR(10)) + ') emp
		INNER JOIN dbo.GetEmployeeByUserRegion(''' + @User + ''') empreg
			ON emp.emp_id = empreg.emp_id
		INNER JOIN tb_section Sec
			ON emp.emp_section = Sec.sec_ID
		INNER JOIN tb_Regions Reg
			ON emp.emp_region = Reg.reg_id
		INNER JOIN tb_schedule Sch
			ON emp.emp_sch = sch_id
			WHERE (emp_deleted = 0)' + @RegFilter + ' ' + @Filter + ')select * from CTE_EMPLOYEES
		Where RowNum >' + @FirstRecord + ' and RowNum <= ' + @LastRecord

		PRINT @sql

		EXEC (@sql)
	END
	drop table #GroupTemp
END



GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spGetEmployeesummary] @emp_id INT
AS
BEGIN
	SELECT *
	FROM dbo.view_employee
	WHERE emp_id = @emp_id
	DECLARE @mdate INT
	SET @mdate = dbo.getnofromdate(getdate())
	EXEC dbo.spGetTimeSheetByEmp @mdate
		,@mdate
		,@emp_id
		,@emp_id
	--late in week
	SELECT ISNULL(CASE 
				WHEN abs(DATEDIFF(day, GETDATE(), dbo.getdatefromno(timesheet.m_date))) > 0
					AND timesheet.timefout IS NULL
					THEN ISNULL(dbo.GetActualTime(GetDateTable.emp_id, dbo.GeatSchedualID(GetDateTable.emp_id, GetDateTable.m_date), GetDateTable.m_date), N'--:--')
				ELSE dbo.GetSumTimeTotal(dbo.GeatLateIn(GetDateTable.emp_id, dbo.GeatSchedualID(GetDateTable.emp_id, GetDateTable.m_date), GetDateTable.m_date, timesheet.timefin), dbo.GeatEarlyOut(GetDateTable.emp_id, dbo.GeatSchedualID(GetDateTable.emp_id, GetDateTable.m_date), GetDateTable.m_date, timesheet.timefin,timesheet.timefout ))
				END, N'--:--') AS TotalLate
	FROM dbo.GetTimeSheetTable(dbo.getnofromdate(dbo.getfirstweekdate()), dbo.getnofromdate(dbo.getlastweekdate())) AS timesheet
	RIGHT OUTER JOIN dbo.GetTimeSheetdatetable(dbo.getnofromdate(dbo.getfirstweekdate()), dbo.getnofromdate(dbo.getlastweekdate())) AS GetDateTable ON timesheet.emp_id = GetDateTable.emp_id
		AND timesheet.m_date = GetDateTable.m_date
	WHERE GetDateTable.emp_id = @emp_id
	ORDER BY GetDateTable.m_date
	--late in month
	SELECT ISNULL(CASE 
				WHEN abs(DATEDIFF(day, GETDATE(), dbo.getdatefromno(timesheet.m_date))) > 0
					AND timesheet.timefout IS NULL
					THEN ISNULL(dbo.GetActualTime(GetDateTable.emp_id, dbo.GeatSchedualID(GetDateTable.emp_id, GetDateTable.m_date), GetDateTable.m_date), N'--:--')
				ELSE dbo.GetSumTimeTotal(dbo.GeatLateIn(GetDateTable.emp_id, dbo.GeatSchedualID(GetDateTable.emp_id, GetDateTable.m_date), GetDateTable.m_date, timesheet.timefin), dbo.GeatEarlyOut(GetDateTable.emp_id, dbo.GeatSchedualID(GetDateTable.emp_id, GetDateTable.m_date), GetDateTable.m_date,timesheet.timefin , timesheet.timefout))
				END, N'--:--') AS TotalLate
	FROM dbo.GetTimeSheetTable(dbo.getnofromdate(dbo.GetFirstDateOfMonth()), dbo.getnofromdate(dbo.GetLastDateOfMonth())) AS timesheet
	RIGHT OUTER JOIN dbo.GetTimeSheetdatetable(dbo.getnofromdate(dbo.GetFirstDateOfMonth()), dbo.getnofromdate(dbo.GetLastDateOfMonth())) AS GetDateTable ON timesheet.emp_id = GetDateTable.emp_id
		AND timesheet.m_date = GetDateTable.m_date
	WHERE GetDateTable.emp_id = @emp_id
	ORDER BY GetDateTable.m_date
END


















GO

CREATE PROCEDURE [dbo].[spGetExecusesEmployee] @User_name NVARCHAR(500)
AS
BEGIN
	SELECT tb_execuse.exc_id
		,CONVERT(VARCHAR(10), dbo.getdatefromno(tb_execuse.exc_date), 111) AS exc_date
		,exc_ftime
		,exc_ttime
		,exc_hours
		,constant.ConstantArabicName exc_status
		,CASE 
			WHEN ApprovalByManager <> 'EAS02'
				THEN 1
			ELSE 0
			END canDelete
		,exc_type
		,CASE 
			WHEN exc_type = 1
				THEN N'عادي'
			WHEN exc_type = 2
				THEN N'مهمة عمل'
			END exc_typeName
	FROM tb_execuse
	INNER JOIN constant ON tb_execuse.ApprovalByManager = constant.constantcode
	INNER JOIN tb_users ON exc_empid = user_empid
	WHERE [user_name] LIKE @User_name
		AND tb_execuse.exc_deleted = 0
	ORDER BY tb_execuse.exc_date DESC
END















GO

CREATE PROCEDURE [dbo].[spGetExecusesForManager] @username NVARCHAR(250)
	,@ApprovalType CHAR(5)
	,@selected_secID INT = NULL
AS
BEGIN
	DECLARE @manageremp_id INT
		,@sectionManagerID INT

	--  select @manageremp_id=emp_id,@sectionManagerID=emp_section  from tb_employee join tb_users  on tb_employee.emp_id=user_empid where    [user_name]=@username
	SELECT @manageremp_id = sec_manager
		,@sectionManagerID = CASE 
			WHEN @selected_secID IS NULL
				THEN sec_ID
			ELSE @selected_secID
			END
	FROM tb_section
	WHERE sec_manager = (
			SELECT emp_id
			FROM tb_employee
			INNER JOIN tb_users ON tb_employee.emp_id = user_empid
			WHERE [user_name] = @username
			)

	DECLARE @tbl TABLE (
		sec_ID INT
		,sec_manager INT
		)

	INSERT INTO @tbl
	SELECT tb_section.sec_ID
		,sec_manager
	FROM tb_section
	INNER JOIN dbo.GetSectionUnderManager(@username, - 1) t ON tb_section.sec_ID = t.sec_ID

	DECLARE @Manager_EmpID INT
		,@SecondManager_EmpID INT
		,@secID INT

	SELECT @Manager_EmpID = sec_manager
		,@SecondManager_EmpID = isnull(sec_secondmanager, 0)
	FROM tb_section
	WHERE sec_ID = @sectionManagerID

	IF @Manager_EmpID = @manageremp_id
	BEGIN
		SET @SecondManager_EmpID = 0
	END

	SELECT tb_execuse.exc_id
		,CONVERT(VARCHAR(10), dbo.getdatefromno(tb_execuse.exc_date), 111) AS exc_date
		,exc_ftime
		,exc_ttime
		,exc_hours
		,emp_id
		,emp_no
		,emp_name
		,execuseReason_name
		,exc_reason
		,tb_execuse.ApprovalByManager ApprovalType
		,exc_reason
		,constant.ConstantArabicName exc_status
		,ISNULL(dbo.tb_execuseReason.execuseReason_id, - 1) AS execuseReason_id
		,dbo.tb_execuseReason.execuseReason_name
		,tb_execuse.exc_type
		,CASE 
			WHEN tb_execuse.exc_type = 1
				THEN N'عادي'
			WHEN tb_execuse.exc_type = 2
				THEN N'مهمة عمل'
			END exc_typeName
		,emp_section
	FROM tb_execuse
	INNER JOIN constant ON tb_execuse.ApprovalByManager = constant.constantcode
	INNER JOIN tb_employee ON exc_empid = emp_id
	LEFT JOIN dbo.tb_execuseReason ON dbo.tb_execuse.execuseReason_ID = dbo.tb_execuseReason.execuseReason_id
	WHERE (
			(emp_section = @sectionManagerID)
			OR (
				emp_id IN (
					SELECT sec_manager
					FROM @tbl
					)
				)
			)
		AND (tb_execuse.ApprovalByManager = @ApprovalType)
		AND emp_id NOT IN (
			@Manager_EmpID
			,@SecondManager_EmpID
			)
		AND exc_deleted = 0
	ORDER BY tb_execuse.exc_date DESC
END















GO
CREATE PROCEDURE [dbo].[spGetOrganization] 
AS
BEGIN
	select top(1)
	name
	,logo
	,(select Value from tb_setting where settingid=6) ShiftsNo
	,isnull(CalType,'G')CalType
	 from tb_organization 
END


















GO
CREATE PROCEDURE [dbo].[spGetpenalty] @fm_date INT
	,@tm_date INT
	,@emp_jointype NVARCHAR(500) = NULL
	,@pid INT = NULL
AS
IF @pid IS NULL
BEGIN
	SELECT emp_no [رقم الموظف]
		,emp_name [اسم الموظف]
		,absentday [عدد أيام الغياب]
		,LeateHours [عدد ساعات التأخير]
		,AbsentLateHours [عدد أيام الغياب حسب ساعات التأخير ]
	FROM (
		SELECT emp_no
			,emp_name
			,sum(CASE 
					WHEN violatedtype = 1
						THEN absentday
					ELSE 0
					END) absentday
			,replace(CONVERT(NUMERIC(18, 2), sum(CASE 
							WHEN violatedtype = 2
								THEN absentday
							ELSE 0
							END) / 60 + (
						sum(CASE 
								WHEN violatedtype = 2
									THEN absentday
								ELSE 0
								END) % 60
						) / 100.0), '.', ':') LeateHours
			,convert(INT, CONVERT(NUMERIC(18, 2), sum(CASE 
							WHEN violatedtype = 2
								THEN absentday
							ELSE 0
							END) / 60 + (
						sum(CASE 
								WHEN violatedtype = 2
									THEN absentday
								ELSE 0
								END) % 60
						) / 100.0) / 7) AbsentLateHours
		FROM (
			SELECT emp_card emp_no
				,emp_name
				,1 absentday
				,1 violatedtype
			FROM tb_transSummey
			INNER JOIN tb_employee ON tb_employee.emp_card = m_id
			WHERE (emp_violatedException = 0)
				AND (m_timefin = '--:--')
				AND (m_timefout = '--:--')
				AND (m_actualtime <> '00:00')
				AND (
					m_date BETWEEN @fm_date
						AND @tm_date
					)
				AND (
					emp_jointype IN (
						SELECT data
						FROM dbo.Split(@emp_jointype, ',')
						)
					OR @emp_jointype IS NULL
					)
			UNION ALL
			SELECT emp_card emp_no
				,emp_name
				,abs(DATEDIFF(MINUTE, m_totallate, '00:00')) absentday
				,2 violatedtype
			FROM tb_transSummey
			INNER JOIN tb_employee ON tb_employee.emp_card = m_id
			WHERE (m_totallate <> '--:--')
				AND (m_totallate <> '00:00')
				AND (emp_violatedException = 0)
				AND (
					m_date BETWEEN @fm_date
						AND @tm_date
					)
				AND (
					emp_jointype IN (
						SELECT data
						FROM dbo.Split(@emp_jointype, ',')
						)
					OR @emp_jointype IS NULL
					)
			) X
		GROUP BY emp_no
			,emp_name
		) Y
	WHERE absentday > 0
		OR AbsentLateHours > 0
	ORDER BY emp_no
END
ELSE
BEGIN
	SELECT emp_no [رقم الموظف]
		,emp_name [اسم الموظف]
		,absentday [عدد أيام الغياب]
		,LeateHours [عدد ساعات التأخير]
		,AbsentLateHours [عدد أيام الغياب حسب ساعات التأخير ]
	FROM (
		SELECT emp_card emp_no
			,emp_name
			,sum(CASE 
					WHEN tb_penaltydet.ptype = 1
						THEN tb_penaltydet.penalty
					ELSE 0
					END) absentday
			,replace(CONVERT(NUMERIC(18, 2), sum(CASE 
							WHEN tb_penaltydet.ptype = 0
								THEN tb_penaltydet.penalty
							ELSE 0
							END) / 60 + (
						sum(CASE 
								WHEN tb_penaltydet.ptype = 0
									THEN tb_penaltydet.penalty
								ELSE 0
								END) % 60
						) / 100.0), '.', ':') LeateHours
			,convert(INT, CONVERT(NUMERIC(18, 2), sum(CASE 
							WHEN tb_penaltydet.ptype = 0
								THEN tb_penaltydet.penalty
							ELSE 0
							END) / 60 + (
						sum(CASE 
								WHEN tb_penaltydet.ptype = 0
									THEN tb_penaltydet.penalty
								ELSE 0
								END) % 60
						) / 100.0) / 7) AbsentLateHours
		FROM tb_penaltydet
		JOIN tb_employee ON tb_penaltydet.pemp_id = tb_employee.emp_id
		where pid=@pid 
		GROUP BY emp_card
			,emp_name
		) X
		ORDER BY emp_no
END


















GO
CREATE PROCEDURE [dbo].[spGetSection] 
     @sec_No INT
	,@sec_Name NVARCHAR(500)
AS
BEGIN
	SELECT sec_ID
	       ,sec_No
	       ,[dbo].[GetFullSectionNamePath](sec_path) sec_Name
	       ,sec_level
	FROM [tb_Section]
	   where (sec_No=@sec_No or @sec_No=-1)
	     and (sec_Name LIKE N'%' + @sec_Name + '%'
			OR isnull(@sec_Name, '') = '')
	ORDER BY sec_ID
END


















GO
Create PROCEDURE [dbo].[spGetSectionSearch] 
     @TextSearch NVARCHAR(500)
	
AS
BEGIN
	SELECT sec_ID
	       ,sec_No
	       ,[dbo].[GetFullSectionNamePath](sec_path) sec_Name
	       ,sec_level
	FROM [tb_Section]
	   where (sec_No=@TextSearch or sec_Name LIKE N'%' + @TextSearch + '%' 	OR isnull(@TextSearch, '') = '')
	ORDER BY sec_ID
END


















GO
CREATE PROCEDURE [dbo].[spGetSetting] @settingid int
AS
BEGIN
select settingid
       ,Name
       ,Value
	   from tb_setting where settingid=@settingid or @settingid=-1
END


















GO

CREATE PROCEDURE [dbo].[spGetTimeSheet] @fm_date INT
	,@tm_date INT
	,@rowsPerPage AS BIGINT = NULL
	,@pageNum AS BIGINT = NULL
	,@RowFilter NVARCHAR(4000) = NULL
AS
BEGIN
	--------			
	--EXEC spcheckallemplyeeshavetrans;
	--------	
	IF (@rowsPerPage IS NULL)
		SELECT tb_employee.emp_id
			,tb_employee.emp_card
			,tb_employee.emp_no
			,tb_employee.emp_name
			,tb_section.sec_name
			,tb_employee.emp_section
			,tb_transSummey.m_date m_dateno
			,dbo.getdatefromno(tb_transSummey.m_date) AS m_date
			,dbo.GetDayOfName(tb_transSummey.m_date) AS NameOfDay
			,tb_transSummey.m_timefin
			,ISNULL(tb_transSummey.m_timefin, N'--:--') AS timefin
			,ISNULL(tb_transSummey.m_timefout, N'--:--') AS timefout
			,ISNULL(tb_transSummey.m_flatein, N'--:--') AS fLateIn
			,ISNULL(tb_transSummey.m_fearlyout, N'--:--') AS fEarlyout
			,ISNULL(tb_transSummey.m_timesin, N'--:--') AS timesin
			,ISNULL(tb_transSummey.m_timesout, N'--:--') AS timesout
			,ISNULL(tb_transSummey.m_slatein, N'--:--') AS sLateIn
			,ISNULL(tb_transSummey.m_searlyout, N'--:--') AS sEarlyout
			,ISNULL(tb_transSummey.m_timetotal, N'--:--') AS timeTotal
			,ISNULL(tb_transSummey.m_actualtime, N'--:--') AS ActualTime
			,ISNULL(tb_transSummey.m_latein, N'--:--') AS LateIn
			,ISNULL(tb_transSummey.m_overtime, N'--:--') AS OverTime
			,ISNULL(tb_transSummey.m_totallate, N'--:--') AS TotalLate
			,ISNULL(tb_transSummey.m_earlyout, N'--:--') AS Earlyout
			,0 f_trans
			--,ISNULL(dbo.HasVacation(tb_employee.emp_id, tb_transSummey.m_date), 0) AS vac_id
			,m_vac_id AS vac_id
			,m_manual
			,ISNULL(replace(replace(tb_transSummey.m_timefout, ':', ''), '-', '0'), N'0000') AS timefoutNo
			,0 ContAbsent
			,Isnull(exc_id, 0) exc_id
			,CASE 
				WHEN exc_id IS NOT NULL
					THEN exc_hours
				ELSE '--:--'
				END ExecuseTime
			,execuseReason_name
		FROM tb_transSummey(NOLOCK)
		LEFT JOIN tb_employee(NOLOCK) ON tb_transSummey.m_id = tb_employee.emp_card
		LEFT JOIN tb_section(NOLOCK) ON tb_employee.emp_section = tb_section.sec_ID
		LEFT JOIN tb_execuse(NOLOCK) ON tb_employee.emp_id = tb_execuse.exc_empid
			AND tb_transSummey.m_date = tb_execuse.exc_date
			AND exc_status = 1
			AND exc_deleted = 0
		LEFT JOIN tb_execuseReason(NOLOCK) ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
		WHERE (
				tb_transSummey.m_date BETWEEN @fm_date
					AND @tm_date
				)
		ORDER BY tb_transSummey.m_date
			,tb_transSummey.m_id
	ELSE
	BEGIN
		DECLARE @sql NVARCHAR(4000)

		SET @sql = 
			'SELECT *
		FROM (
			SELECT ROW_NUMBER() OVER (
					ORDER BY m_Date,m_id
					) AS NUMBER
				,tb_transSummey.m_id
				,tb_transSummey.ID
				,tb_employee.emp_id
				,tb_employee.emp_card
				,tb_employee.emp_no
				,tb_employee.emp_name
				,tb_section.sec_name
				,tb_employee.emp_section
				,tb_transSummey.m_date m_dateno
				,dbo.getdatefromno(tb_transSummey.m_date) AS m_date
				,dbo.GetDayOfName(tb_transSummey.m_date) AS NameOfDay
				,tb_transSummey.m_timefin
				,ISNULL(tb_transSummey.m_timefin, N''--:--'') AS timefin
				,ISNULL(tb_transSummey.m_timefout, N''--:--'') AS timefout
				,ISNULL(tb_transSummey.m_flatein, N''--:--'') AS fLateIn
				,ISNULL(tb_transSummey.m_fearlyout, N''--:--'') AS fEarlyout
				,ISNULL(tb_transSummey.m_timesin, N''--:--'') AS timesin
				,ISNULL(tb_transSummey.m_timesout, N''--:--'') AS timesout
				,ISNULL(tb_transSummey.m_slatein, N''--:--'') AS sLateIn
				,ISNULL(tb_transSummey.m_searlyout, N''--:--'') AS sEarlyout
				,ISNULL(tb_transSummey.m_timetotal, N''--:--'') AS timeTotal
				,ISNULL(tb_transSummey.m_actualtime, N''--:--'') AS ActualTime
				,ISNULL(tb_transSummey.m_latein, N''--:--'') AS LateIn
				,ISNULL(tb_transSummey.m_overtime, N''--:--'') AS OverTime
				,ISNULL(tb_transSummey.m_totallate, N''--:--'') AS TotalLate
				,ISNULL(tb_transSummey.m_earlyout, N''--:--'') AS Earlyout
				,0 f_trans
				--,ISNULL(dbo.HasVacation(tb_employee.emp_id, tb_transSummey.m_date), 0) AS vac_id
				,m_vac_id AS vac_id
				,m_manual
				,ISNULL(replace(replace(tb_transSummey.m_timefout, '':'', ''''), ''-'', ''0''), N''0000'') AS timefoutNo
				,0 ContAbsent
				,Isnull(exc_id, 0) exc_id
				,CASE 
					WHEN exc_id IS NOT NULL
						THEN exc_hours
					ELSE ''--:--''
					END ExecuseTime
				,execuseReason_name
			FROM tb_transSummey(NOLOCK)
			LEFT JOIN tb_employee(NOLOCK) ON tb_transSummey.m_id = tb_employee.emp_card
			LEFT JOIN tb_section(NOLOCK) ON tb_employee.emp_section = tb_section.sec_ID
			LEFT JOIN tb_execuse(NOLOCK) ON tb_employee.emp_id = tb_execuse.exc_empid
				AND tb_transSummey.m_date = tb_execuse.exc_date
				AND exc_status = 1
				AND exc_deleted = 0
			LEFT JOIN tb_execuseReason(NOLOCK) ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
			WHERE tb_transSummey.m_date BETWEEN ' 
			+ cast(@fm_date AS VARCHAR) + ' 
					AND ' + cast(@tm_date AS VARCHAR) + ' and ' + isnull(@RowFilter, '1=1') + '
			) AS TBL
		WHERE NUMBER BETWEEN (' + cast(((@pageNum - 1) * @rowsPerPage + 1) AS VARCHAR) + ')
				AND (' + cast((@pageNum * @rowsPerPage) AS VARCHAR) + ')
		--ORDER BY TBL.m_dateno
		--	,TBL.m_id'

		PRINT @sql

		EXEC (@sql)
	END
END















GO

CREATE PROCEDURE [dbo].[spGetTimeSheetByEmp] @fm_date INT
	,@tm_date INT
	,@femp INT
	,@temp INT = 0
	,@rowsPerPage AS BIGINT = NULL
	,@pageNum AS BIGINT = NULL
	,@RowFilter NVARCHAR(4000) = NULL
AS
BEGIN
	--------			
	--	EXEC spcheckallemplyeeshavetrans;
	--------
	IF (@rowsPerPage IS NULL)
		SELECT tb_employee.emp_id
			,tb_employee.emp_card
			,tb_employee.emp_no
			,tb_employee.emp_name
			,tb_section.sec_name
			,tb_employee.emp_section
			,tb_transSummey.m_date m_dateno
			,dbo.getdatefromno(tb_transSummey.m_date) AS m_date
			,dbo.GetDayOfName(tb_transSummey.m_date) AS NameOfDay
			,tb_transSummey.m_timefin
			,ISNULL(tb_transSummey.m_timefin, N'--:--') AS timefin
			,ISNULL(tb_transSummey.m_timefout, N'--:--') AS timefout
			,ISNULL(tb_transSummey.m_flatein, N'--:--') AS fLateIn
			,ISNULL(tb_transSummey.m_fearlyout, N'--:--') AS fEarlyout
			,ISNULL(tb_transSummey.m_timesin, N'--:--') AS timesin
			,ISNULL(tb_transSummey.m_timesout, N'--:--') AS timesout
			,ISNULL(tb_transSummey.m_slatein, N'--:--') AS sLateIn
			,ISNULL(tb_transSummey.m_searlyout, N'--:--') AS sEarlyout
			,ISNULL(tb_transSummey.m_timetotal, N'--:--') AS timeTotal
			,ISNULL(tb_transSummey.m_actualtime, N'--:--') AS ActualTime
			,ISNULL(tb_transSummey.m_latein, N'--:--') AS LateIn
			,ISNULL(tb_transSummey.m_overtime, N'--:--') AS OverTime
			,ISNULL(tb_transSummey.m_totallate, N'--:--') AS TotalLate
			,ISNULL(tb_transSummey.m_earlyout, N'--:--') AS Earlyout
			,0 f_trans
			--,ISNULL(dbo.HasVacation(tb_employee.emp_id, tb_transSummey.m_date), 0) AS vac_id
			,m_vac_id AS vac_id
			,m_manual
			,ISNULL(replace(replace(tb_transSummey.m_timefout, ':', ''), '-', '0'), N'0000') AS timefoutNo
			,0 ContAbsent
			,Isnull(exc_id, 0) exc_id
			,CASE 
				WHEN exc_id IS NOT NULL
					THEN exc_hours
				ELSE '--:--'
				END ExecuseTime
			,execuseReason_name
		FROM tb_transSummey(NOLOCK)
		LEFT JOIN tb_employee(NOLOCK) ON tb_transSummey.m_id = tb_employee.emp_card
		LEFT JOIN tb_section(NOLOCK) ON tb_employee.emp_section = tb_section.sec_ID
		LEFT JOIN tb_execuse(NOLOCK) ON tb_employee.emp_id = tb_execuse.exc_empid
			AND tb_transSummey.m_date = tb_execuse.exc_date
			AND exc_status = 1
			AND exc_deleted = 0
		LEFT JOIN tb_execuseReason(NOLOCK) ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
		WHERE emp_id = @femp
			AND (
				tb_transSummey.m_date BETWEEN @fm_date
					AND @tm_date
				)
		ORDER BY tb_transSummey.m_date
			,tb_transSummey.m_id
	ELSE
	BEGIN
		DECLARE @sql NVARCHAR(4000)

		SET @sql = 
			'SELECT *
		FROM (
			SELECT ROW_NUMBER() OVER (
					ORDER BY m_Date,m_id
					) AS NUMBER
				,tb_transSummey.m_id
				,tb_transSummey.ID
				,tb_employee.emp_id
				,tb_employee.emp_card
				,tb_employee.emp_no
				,tb_employee.emp_name
				,tb_section.sec_name
				,tb_employee.emp_section
				,tb_transSummey.m_date m_dateno
				,dbo.getdatefromno(tb_transSummey.m_date) AS m_date
				,dbo.GetDayOfName(tb_transSummey.m_date) AS NameOfDay
				,tb_transSummey.m_timefin
				,ISNULL(tb_transSummey.m_timefin, N''--:--'') AS timefin
				,ISNULL(tb_transSummey.m_timefout, N''--:--'') AS timefout
				,ISNULL(tb_transSummey.m_flatein, N''--:--'') AS fLateIn
				,ISNULL(tb_transSummey.m_fearlyout, N''--:--'') AS fEarlyout
				,ISNULL(tb_transSummey.m_timesin, N''--:--'') AS timesin
				,ISNULL(tb_transSummey.m_timesout, N''--:--'') AS timesout
				,ISNULL(tb_transSummey.m_slatein, N''--:--'') AS sLateIn
				,ISNULL(tb_transSummey.m_searlyout, N''--:--'') AS sEarlyout
				,ISNULL(tb_transSummey.m_timetotal, N''--:--'') AS timeTotal
				,ISNULL(tb_transSummey.m_actualtime, N''--:--'') AS ActualTime
				,ISNULL(tb_transSummey.m_latein, N''--:--'') AS LateIn
				,ISNULL(tb_transSummey.m_overtime, N''--:--'') AS OverTime
				,ISNULL(tb_transSummey.m_totallate, N''--:--'') AS TotalLate
				,ISNULL(tb_transSummey.m_earlyout, N''--:--'') AS Earlyout
				,0 f_trans
				--,ISNULL(dbo.HasVacation(tb_employee.emp_id, tb_transSummey.m_date), 0) AS vac_id
				,m_vac_id AS vac_id
				,m_manual
				,ISNULL(replace(replace(tb_transSummey.m_timefout, '':'', ''''), ''-'', ''0''), N''0000'') AS timefoutNo
				,0 ContAbsent
				,Isnull(exc_id, 0) exc_id
				,CASE 
					WHEN exc_id IS NOT NULL
						THEN exc_hours
						ELSE ''--:--''
					END ExecuseTime
				,execuseReason_name
			FROM tb_transSummey(NOLOCK)
			LEFT JOIN tb_employee(NOLOCK) ON tb_transSummey.m_id = tb_employee.emp_card
			LEFT JOIN tb_section(NOLOCK) ON tb_employee.emp_section = tb_section.sec_ID
			LEFT JOIN tb_execuse(NOLOCK) ON tb_employee.emp_id = tb_execuse.exc_empid
				AND tb_transSummey.m_date = tb_execuse.exc_date
				AND exc_status = 1
				AND exc_deleted = 0
			LEFT JOIN tb_execuseReason(NOLOCK) ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
			WHERE emp_id =' 
			+ cast(@femp AS NVARCHAR) + '
				AND (
					tb_transSummey.m_date BETWEEN ' + cast(@fm_date AS VARCHAR) + ' 
					AND ' + cast(@tm_date AS VARCHAR) + ') and ' + isnull(@RowFilter, '1=1') + '
			) AS TBL
		WHERE NUMBER BETWEEN (' + cast(((@pageNum - 1) * @rowsPerPage + 1) AS VARCHAR) + ')
				AND (' + cast((@pageNum * @rowsPerPage) AS VARCHAR) + ')'

		PRINT @sql

		EXEC (@sql)
	END
END















GO

CREATE PROCEDURE [dbo].[spGetTimeSheetByEmpAndSection] @fm_date INT
	,@tm_date INT
	,@femp INT
	,@secid INT
	,@rowsPerPage AS BIGINT = NULL
	,@pageNum AS BIGINT = NULL
	,@RowFilter NVARCHAR(4000) = NULL
AS
BEGIN
	--------			
	--	EXEC spcheckallemplyeeshavetrans;
	--------
	DECLARE @tbl TABLE (
		sec_ID INT
		,sec_Name NVARCHAR(500)
		)

	INSERT INTO @tbl
	SELECT sec_ID
		,sec_Name
	FROM dbo.GetSectionUnderManager(NULL, @secid)

	IF (@rowsPerPage IS NULL)
		SELECT tb_employee.emp_id
			,tb_employee.emp_card
			,tb_employee.emp_no
			,tb_employee.emp_name
			,tb_section.sec_name
			,tb_employee.emp_section
			,tb_transSummey.m_date m_dateno
			,dbo.getdatefromno(tb_transSummey.m_date) AS m_date
			,dbo.GetDayOfName(tb_transSummey.m_date) AS NameOfDay
			,ISNULL(tb_transSummey.m_timefin, N'--:--') AS timefin
			,ISNULL(tb_transSummey.m_timefout, N'--:--') AS timefout
			,ISNULL(tb_transSummey.m_flatein, N'--:--') AS fLateIn
			,ISNULL(tb_transSummey.m_fearlyout, N'--:--') AS fEarlyout
			,ISNULL(tb_transSummey.m_timesin, N'--:--') AS timesin
			,ISNULL(tb_transSummey.m_timesout, N'--:--') AS timesout
			,ISNULL(tb_transSummey.m_slatein, N'--:--') AS sLateIn
			,ISNULL(tb_transSummey.m_searlyout, N'--:--') AS sEarlyout
			,ISNULL(tb_transSummey.m_timetotal, N'--:--') AS timeTotal
			,ISNULL(tb_transSummey.m_actualtime, N'--:--') AS ActualTime
			,ISNULL(tb_transSummey.m_latein, N'--:--') AS LateIn
			,ISNULL(tb_transSummey.m_overtime, N'--:--') AS OverTime
			,ISNULL(tb_transSummey.m_totallate, N'--:--') AS TotalLate
			,ISNULL(tb_transSummey.m_earlyout, N'--:--') AS Earlyout
			--,ISNULL(dbo.Hasfailtrans(tb_employee.emp_card, tb_transSummey.m_date), 0) AS f_trans
			,0 f_trans --		,ISNULL(t1.statues,0) AS f_trans
			--,ISNULL(dbo.HasExecuse(tb_employee.emp_id, tb_transSummey.m_date), 0) AS exc_id
			--,ISNULL(dbo.HasVacation(tb_employee.emp_id, tb_transSummey.m_date), 0) AS vac_id
			,m_vac_id AS vac_id
			,m_manual
			,ISNULL(replace(replace(tb_transSummey.m_timefout, ':', ''), '-', '0'), N'0000') AS timefoutNo
			,0 ContAbsent
			,Isnull(exc_id, 0) exc_id
			,CASE 
				WHEN exc_id IS NOT NULL
					THEN exc_hours
				ELSE '--:--'
				END ExecuseTime
			,execuseReason_name
		FROM tb_transSummey(NOLOCK)
		INNER JOIN tb_employee(NOLOCK) ON tb_transSummey.m_id = tb_employee.emp_card
		INNER JOIN tb_section(NOLOCK) ON tb_employee.emp_section = tb_section.sec_ID
		LEFT JOIN tb_execuse(NOLOCK) ON tb_employee.emp_id = tb_execuse.exc_empid
			AND tb_transSummey.m_date = tb_execuse.exc_date
			AND exc_status = 1
		LEFT JOIN tb_execuseReason(NOLOCK) ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
		WHERE (emp_id = @femp)
			AND EXISTS (
				SELECT 1
				FROM @tbl t
				WHERE t.sec_ID = emp_section
				)
			AND (
				tb_transSummey.m_date BETWEEN @fm_date
					AND @tm_date
				)
		ORDER BY m_date
	ELSE
	BEGIN
		DECLARE @sql NVARCHAR(4000)

		SET @sql = 
			'SELECT *
		FROM (
			SELECT ROW_NUMBER() OVER (
					ORDER BY m_Date,m_id
					) AS NUMBER
				,tb_transSummey.m_id
				,tb_transSummey.ID
				,tb_employee.emp_id
				,tb_employee.emp_card
				,tb_employee.emp_no
				,tb_employee.emp_name
				,tb_section.sec_name
				,tb_employee.emp_section
				,tb_transSummey.m_date m_dateno
				,dbo.getdatefromno(tb_transSummey.m_date) AS m_date
				,dbo.GetDayOfName(tb_transSummey.m_date) AS NameOfDay
				,ISNULL(tb_transSummey.m_timefin, N''--:--'') AS timefin
				,ISNULL(tb_transSummey.m_timefout, N''--:--'') AS timefout
				,ISNULL(tb_transSummey.m_flatein, N''--:--'') AS fLateIn
				,ISNULL(tb_transSummey.m_fearlyout, N''--:--'') AS fEarlyout
				,ISNULL(tb_transSummey.m_timesin, N''--:--'') AS timesin
				,ISNULL(tb_transSummey.m_timesout, N''--:--'') AS timesout
				,ISNULL(tb_transSummey.m_slatein, N''--:--'') AS sLateIn
				,ISNULL(tb_transSummey.m_searlyout, N''--:--'') AS sEarlyout
				,ISNULL(tb_transSummey.m_timetotal, N''--:--'') AS timeTotal
				,ISNULL(tb_transSummey.m_actualtime, N''--:--'') AS ActualTime
				,ISNULL(tb_transSummey.m_latein, N''--:--'') AS LateIn
				,ISNULL(tb_transSummey.m_overtime, N''--:--'') AS OverTime
				,ISNULL(tb_transSummey.m_totallate, N''--:--'') AS TotalLate
				,ISNULL(tb_transSummey.m_earlyout, N''--:--'') AS Earlyout
				,0 f_trans
				--,ISNULL(dbo.HasVacation(tb_employee.emp_id, tb_transSummey.m_date), 0) AS vac_id
				,m_vac_id AS vac_id
				,m_manual
				,ISNULL(replace(replace(tb_transSummey.m_timefout, '':'', ''''), ''-'', ''0''), N''0000'') AS timefoutNo
				,0 ContAbsent
				,Isnull(exc_id, 0) exc_id
				,CASE 
					WHEN exc_id IS NOT NULL
						THEN exc_hours
						ELSE ''--:--''
					END ExecuseTime
				,execuseReason_name
			FROM tb_transSummey(NOLOCK)
			INNER JOIN tb_employee(NOLOCK) ON tb_transSummey.m_id = tb_employee.emp_card
			INNER JOIN tb_section(NOLOCK) ON tb_employee.emp_section = tb_section.sec_ID
			LEFT JOIN tb_execuse(NOLOCK) ON tb_employee.emp_id = tb_execuse.exc_empid
				AND tb_transSummey.m_date = tb_execuse.exc_date
				AND exc_status = 1
			LEFT JOIN tb_execuseReason(NOLOCK) ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
			WHERE (emp_id = ' 
			+ cast(@femp AS NVARCHAR) + ')
				AND EXISTS (
					SELECT 1
					FROM (SELECT sec_ID
		,sec_Name
	FROM dbo.GetSectionUnderManager(NULL,' + cast(@secid AS NVARCHAR) + ')) t
					WHERE t.sec_ID = emp_section
					)
				AND (
					tb_transSummey.m_date BETWEEN ' + cast(@fm_date AS VARCHAR) + ' 
					AND ' + cast(@tm_date AS VARCHAR) + ') and ' + isnull(@RowFilter, '1=1') + '
			) AS TBL
		WHERE NUMBER BETWEEN(' + cast(((@pageNum - 1) * @rowsPerPage + 1) AS VARCHAR) + ')
				AND (' + cast((@pageNum * @rowsPerPage) AS VARCHAR) + ')'

		PRINT @sql

		EXEC (@sql)
	END
END















GO

CREATE PROCEDURE [dbo].[spGetTimeSheetByGroup] @fm_date INT
	,@tm_date INT
	,@groupid INT
	,@rowsPerPage AS BIGINT = NULL
	,@pageNum AS BIGINT = NULL
	,@RowFilter NVARCHAR(4000) = NULL
AS
BEGIN
	----------------		
	--EXEC spcheckallemplyeeshavetrans;
	---------------
	IF (@rowsPerPage IS NULL)
		SELECT tb_employee.emp_id
			,tb_employee.emp_card
			,tb_employee.emp_no
			,tb_employee.emp_name
			,tb_section.sec_name
			,tb_employee.emp_section
			,tb_transSummey.m_date m_dateno
			,dbo.getdatefromno(tb_transSummey.m_date) AS m_date
			,dbo.GetDayOfName(tb_transSummey.m_date) AS NameOfDay
			,ISNULL(tb_transSummey.m_timefin, N'--:--') AS timefin
			,ISNULL(tb_transSummey.m_timefout, N'--:--') AS timefout
			,ISNULL(tb_transSummey.m_timetotal, N'--:--') AS timeTotal
			,ISNULL(tb_transSummey.m_actualtime, N'--:--') AS ActualTime
			,ISNULL(tb_transSummey.m_latein, N'--:--') AS LateIn
			,ISNULL(tb_transSummey.m_overtime, N'--:--') AS OverTime
			,ISNULL(tb_transSummey.m_totallate, N'--:--') AS TotalLate
			,ISNULL(tb_transSummey.m_earlyout, N'--:--') AS Earlyout
			,0 f_trans --,ISNULL(t1.statues,0) AS f_trans
			--,ISNULL(dbo.HasVacation(tb_employee.emp_id, tb_transSummey.m_date), 0) AS vac_id
			,m_vac_id AS vac_id
			,m_manual
			,ISNULL(replace(replace(tb_transSummey.m_timefout, ':', ''), '-', '0'), N'0000') AS timefoutNo
			,0 ContAbsent
			,Isnull(exc_id, 0) exc_id
			,CASE 
				WHEN exc_id IS NOT NULL
					THEN exc_hours
				ELSE '--:--'
				END ExecuseTime
			,execuseReason_name
		FROM tb_transSummey(NOLOCK)
		LEFT JOIN tb_employee(NOLOCK) ON tb_transSummey.m_id = tb_employee.emp_card
		LEFT JOIN tb_section(NOLOCK) ON tb_employee.emp_section = tb_section.sec_ID
		LEFT JOIN tb_schGroupEmployees(NOLOCK) ON tb_employee.emp_id = tb_schGroupEmployees.emp_id
		LEFT JOIN tb_execuse(NOLOCK) ON tb_employee.emp_id = tb_execuse.exc_empid
			AND tb_transSummey.m_date = tb_execuse.exc_date
			AND exc_status = 1
		LEFT JOIN tb_execuseReason(NOLOCK) ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
		WHERE (
				tb_transSummey.m_date BETWEEN @fm_date
					AND @tm_date
				)
			AND (tb_schGroupEmployees.schGroup_id = @groupid)
		ORDER BY tb_transSummey.m_date
			,tb_transSummey.m_id
	ELSE
	BEGIN
		DECLARE @sql NVARCHAR(4000)

		SET @sql = 
			'SELECT *
		FROM (
			SELECT ROW_NUMBER() OVER (
					ORDER BY m_Date,m_id
					) AS NUMBER
				,tb_transSummey.m_id
				,tb_transSummey.ID
				,tb_employee.emp_id
				,tb_employee.emp_card
				,tb_employee.emp_no
				,tb_employee.emp_name
				,tb_section.sec_name
				,tb_employee.emp_section
				,tb_transSummey.m_date m_dateno
				,dbo.getdatefromno(tb_transSummey.m_date) AS m_date
				,dbo.GetDayOfName(tb_transSummey.m_date) AS NameOfDay
				,ISNULL(tb_transSummey.m_timefin, N''--:--'') AS timefin
				,ISNULL(tb_transSummey.m_timefout, N''--:--'') AS timefout
				,ISNULL(tb_transSummey.m_flatein, N''--:--'') AS fLateIn
				,ISNULL(tb_transSummey.m_fearlyout, N''--:--'') AS fEarlyout
				,ISNULL(tb_transSummey.m_timesin, N''--:--'') AS timesin
				,ISNULL(tb_transSummey.m_timesout, N''--:--'') AS timesout
				,ISNULL(tb_transSummey.m_slatein, N''--:--'') AS sLateIn
				,ISNULL(tb_transSummey.m_searlyout, N''--:--'') AS sEarlyout
				,ISNULL(tb_transSummey.m_timetotal, N''--:--'') AS timeTotal
				,ISNULL(tb_transSummey.m_actualtime, N''--:--'') AS ActualTime
				,ISNULL(tb_transSummey.m_latein, N''--:--'') AS LateIn
				,ISNULL(tb_transSummey.m_overtime, N''--:--'') AS OverTime
				,ISNULL(tb_transSummey.m_totallate, N''--:--'') AS TotalLate
				,ISNULL(tb_transSummey.m_earlyout, N''--:--'') AS Earlyout
				,0 f_trans --,ISNULL(t1.statues,0) AS f_trans
				--,ISNULL(dbo.HasVacation(tb_employee.emp_id, tb_transSummey.m_date), 0) AS vac_id
				,m_vac_id AS vac_id
				,m_manual
				,ISNULL(replace(replace(tb_transSummey.m_timefout, '':'', ''''), ''-'', ''0''), N''0000'') AS timefoutNo
				,0 ContAbsent
				,Isnull(exc_id, 0) exc_id
				,CASE 
					WHEN exc_id IS NOT NULL
						THEN exc_hours
						ELSE ''--:--''
					END ExecuseTime
				,execuseReason_name
			FROM tb_transSummey(NOLOCK)
			LEFT JOIN tb_employee(NOLOCK) ON tb_transSummey.m_id = tb_employee.emp_card
			LEFT JOIN tb_section(NOLOCK) ON tb_employee.emp_section = tb_section.sec_ID
			LEFT JOIN tb_schGroupEmployees(NOLOCK) ON tb_employee.emp_id = tb_schGroupEmployees.emp_id
			LEFT JOIN tb_execuse(NOLOCK) ON tb_employee.emp_id = tb_execuse.exc_empid
				AND tb_transSummey.m_date = tb_execuse.exc_date
				AND exc_status = 1
			LEFT JOIN tb_execuseReason(NOLOCK) ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
			WHERE (
					tb_transSummey.m_date BETWEEN ' 
			+ cast(@fm_date AS VARCHAR) + ' 
					AND ' + cast(@tm_date AS VARCHAR) + '
					)
				AND (tb_schGroupEmployees.schGroup_id = @groupid) and ' + isnull(@RowFilter, '1=1') + '
			) AS TBL
		WHERE NUMBER BETWEEN(' + cast(((@pageNum - 1) * @rowsPerPage + 1) AS VARCHAR) + ')
				AND (' + cast((@pageNum * @rowsPerPage) AS VARCHAR) + ')'

		PRINT @sql

		EXEC (@sql)
	END
END















GO

CREATE PROCEDURE [dbo].[spGetTimeSheetBySection] @fm_date INT
	,@tm_date INT
	,@secid INT
	,@rowsPerPage AS BIGINT = NULL
	,@pageNum AS BIGINT = NULL
	,@RowFilter NVARCHAR(4000) = NULL
AS
BEGIN
	----------------		
	--	EXEC spcheckallemplyeeshavetrans;
	---------------
	DECLARE @tbl TABLE (
		sec_ID INT
		,sec_Name NVARCHAR(500)
		)

	INSERT INTO @tbl
	SELECT sec_ID
		,sec_Name
	FROM dbo.GetSectionUnderManager(NULL, @secid)

	--------
	IF (@rowsPerPage IS NULL)
		SELECT tb_employee.emp_id
			,tb_employee.emp_card
			,tb_employee.emp_no
			,tb_employee.emp_name
			,tb_section.sec_name
			,tb_employee.emp_section
			,tb_transSummey.m_date m_dateno
			,dbo.getdatefromno(tb_transSummey.m_date) AS m_date
			,dbo.GetDayOfName(tb_transSummey.m_date) AS NameOfDay
			,tb_transSummey.m_timefin
			,ISNULL(tb_transSummey.m_timefin, N'--:--') AS timefin
			,ISNULL(tb_transSummey.m_timefout, N'--:--') AS timefout
			,ISNULL(tb_transSummey.m_flatein, N'--:--') AS fLateIn
			,ISNULL(tb_transSummey.m_fearlyout, N'--:--') AS fEarlyout
			,ISNULL(tb_transSummey.m_timesin, N'--:--') AS timesin
			,ISNULL(tb_transSummey.m_timesout, N'--:--') AS timesout
			,ISNULL(tb_transSummey.m_slatein, N'--:--') AS sLateIn
			,ISNULL(tb_transSummey.m_searlyout, N'--:--') AS sEarlyout
			,ISNULL(tb_transSummey.m_timetotal, N'--:--') AS timeTotal
			,ISNULL(tb_transSummey.m_actualtime, N'--:--') AS ActualTime
			,ISNULL(tb_transSummey.m_latein, N'--:--') AS LateIn
			,ISNULL(tb_transSummey.m_overtime, N'--:--') AS OverTime
			,ISNULL(tb_transSummey.m_totallate, N'--:--') AS TotalLate
			,ISNULL(tb_transSummey.m_earlyout, N'--:--') AS Earlyout
			,0 f_trans
			--,ISNULL(dbo.HasVacation(tb_employee.emp_id, tb_transSummey.m_date), 0) AS vac_id
			,m_vac_id AS vac_id
			,m_manual
			,ISNULL(replace(replace(tb_transSummey.m_timefout, ':', ''), '-', '0'), N'0000') AS timefoutNo
			,0 ContAbsent
			,Isnull(exc_id, 0) exc_id
			,CASE 
				WHEN exc_id IS NOT NULL
					THEN exc_hours
				ELSE '--:--'
				END ExecuseTime
			,execuseReason_name
		FROM tb_transSummey(NOLOCK)
		LEFT JOIN tb_employee(NOLOCK) ON tb_transSummey.m_id = tb_employee.emp_card
		LEFT JOIN tb_section(NOLOCK) ON tb_employee.emp_section = tb_section.sec_ID
		LEFT JOIN tb_execuse(NOLOCK) ON tb_employee.emp_id = tb_execuse.exc_empid
			AND tb_transSummey.m_date = tb_execuse.exc_date
			AND exc_status = 1
			AND exc_deleted = 0
		LEFT JOIN tb_execuseReason(NOLOCK) ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
		WHERE (
				EXISTS (
					SELECT 1
					FROM @tbl t
					WHERE t.sec_ID = emp_section
					)
				)
			AND (
				tb_transSummey.m_date BETWEEN @fm_date
					AND @tm_date
				)
		ORDER BY tb_transSummey.m_date
			,tb_transSummey.m_id
	ELSE
	BEGIN
		DECLARE @sql NVARCHAR(4000)

		SET @sql = 
			'SELECT *
		FROM (
			SELECT ROW_NUMBER() OVER (
					ORDER BY m_Date,m_id
					) AS NUMBER
				,tb_transSummey.m_id
				,tb_transSummey.ID
				,tb_employee.emp_id
				,tb_employee.emp_card
				,tb_employee.emp_no
				,tb_employee.emp_name
				,tb_section.sec_name
				,tb_employee.emp_section
				,tb_transSummey.m_date m_dateno
				,dbo.getdatefromno(tb_transSummey.m_date) AS m_date
				,dbo.GetDayOfName(tb_transSummey.m_date) AS NameOfDay
				,tb_transSummey.m_timefin
					,ISNULL(tb_transSummey.m_timefin, N''--:--'') AS timefin
				,ISNULL(tb_transSummey.m_timefout, N''--:--'') AS timefout
				,ISNULL(tb_transSummey.m_flatein, N''--:--'') AS fLateIn
				,ISNULL(tb_transSummey.m_fearlyout, N''--:--'') AS fEarlyout
				,ISNULL(tb_transSummey.m_timesin, N''--:--'') AS timesin
				,ISNULL(tb_transSummey.m_timesout, N''--:--'') AS timesout
				,ISNULL(tb_transSummey.m_slatein, N''--:--'') AS sLateIn
				,ISNULL(tb_transSummey.m_searlyout, N''--:--'') AS sEarlyout
				,ISNULL(tb_transSummey.m_timetotal, N''--:--'') AS timeTotal
				,ISNULL(tb_transSummey.m_actualtime, N''--:--'') AS ActualTime
				,ISNULL(tb_transSummey.m_latein, N''--:--'') AS LateIn
				,ISNULL(tb_transSummey.m_overtime, N''--:--'') AS OverTime
				,ISNULL(tb_transSummey.m_totallate, N''--:--'') AS TotalLate
				,ISNULL(tb_transSummey.m_earlyout, N''--:--'') AS Earlyout
				,0 f_trans --,ISNULL(t1.statues,0) AS f_trans
				--,ISNULL(dbo.HasVacation(tb_employee.emp_id, tb_transSummey.m_date), 0) AS vac_id
				,m_vac_id AS vac_id
				,m_manual
				,ISNULL(replace(replace(tb_transSummey.m_timefout, '':'', ''''), ''-'', ''0''), N''0000'') AS timefoutNo
				,0 ContAbsent
				,Isnull(exc_id, 0) exc_id
				,CASE 
					WHEN exc_id IS NOT NULL
						THEN exc_hours
						ELSE ''--:--''
					END ExecuseTime
				,execuseReason_name
			FROM tb_transSummey(NOLOCK)
			LEFT JOIN tb_employee(NOLOCK) ON tb_transSummey.m_id = tb_employee.emp_card
			LEFT JOIN tb_section(NOLOCK) ON tb_employee.emp_section = tb_section.sec_ID
			LEFT JOIN tb_execuse(NOLOCK) ON tb_employee.emp_id = tb_execuse.exc_empid
				AND tb_transSummey.m_date = tb_execuse.exc_date
				AND exc_status = 1
				AND exc_deleted = 0
			LEFT JOIN tb_execuseReason(NOLOCK) ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
			WHERE (
					EXISTS (
					SELECT 1
					FROM (SELECT sec_ID
		,sec_Name
	FROM dbo.GetSectionUnderManager(NULL,' 
			+ cast(@secid AS NVARCHAR) + ')) t
					WHERE t.sec_ID = emp_section
					))
				AND (
					tb_transSummey.m_date BETWEEN ' + cast(@fm_date AS VARCHAR) + ' 
					AND ' + cast(@tm_date AS VARCHAR) + ') and ' + isnull(@RowFilter, '1=1') + '
			) AS TBL
	WHERE NUMBER BETWEEN(' + cast(((@pageNum - 1) * @rowsPerPage + 1) AS VARCHAR) + ')
				AND (' + cast((@pageNum * @rowsPerPage) AS VARCHAR) + ')'

		PRINT @sql

		EXEC (@sql)
	END
END















GO

CREATE PROCEDURE [dbo].[spGetTimeSheetForEmployee] @fm_date INT
	,@tm_date INT
	,@emp_username NVARCHAR(250)
AS
BEGIN
	DECLARE @emp_id INT

	SELECT @emp_id = emp_id
	FROM tb_employee
	INNER JOIN tb_users ON tb_employee.emp_id = user_empid
	WHERE [user_name] = @emp_username

	SELECT tb_employee.emp_id
		,dbo.GetDateAsString(tb_transSummey.m_date) AS m_date
		,dbo.GetDayOfName(tb_transSummey.m_date) AS NameOfDay
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefin), N'--:--') AS timefin
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefout), N'--:--') AS timefout
		,ISNULL(tb_transSummey.m_timetotal, N'--:--') AS timeTotal
		,ISNULL(tb_transSummey.m_actualtime, N'--:--') AS ActualTime
		,ISNULL(tb_transSummey.m_latein, N'--:--') AS LateIn
		,ISNULL(tb_transSummey.m_overtime, N'--:--') AS OverTime
		,ISNULL(tb_transSummey.m_totallate, N'--:--') AS TotalLate
		,ISNULL(tb_transSummey.m_earlyout, N'--:--') AS Earlyout
		--,ISNULL(dbo.Hasfailtrans(tb_employee.emp_card, tb_transSummey.m_date), 0) AS f_trans
		,0 f_trans --,ISNULL(t1.statues,0) AS f_trans
		,ISNULL(tb_execuse.exc_id, 0) exc_id
		--,ISNULL(dbo.HasVacation(tb_employee.emp_id, tb_transSummey.m_date), 0) AS vac_id
		,m_vac_id AS vac_id
		,m_manual
		,CASE 
			WHEN tb_execuse.exc_id IS NOT NULL
				THEN exc_hours
			ELSE '--:--'
			END ExecuseTime
		,isnull(execuseReason_name, '') + ' - ' + isnull(exc_reason, '') execuseReason_name
	FROM tb_transSummey
	INNER JOIN tb_employee ON tb_transSummey.m_id = tb_employee.emp_card
	INNER JOIN tb_section ON tb_employee.emp_section = tb_section.sec_ID
	LEFT JOIN tb_execuse ON tb_employee.emp_id = exc_empid
		AND tb_transSummey.m_date = exc_date
		AND exc_status = 1
	LEFT JOIN tb_execuseReason ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
	WHERE (
			tb_transSummey.m_date BETWEEN @fm_date
				AND @tm_date
			)
		AND (tb_employee.emp_id = @emp_id)
	ORDER BY tb_transSummey.m_date
		,tb_transSummey.m_id
END















GO

CREATE PROCEDURE [dbo].[spGetTimeSheetForManager] @fm_date INT
	,@tm_date INT
	,@secID INT
	,@emp_ID INT
	,@username NVARCHAR(250)
AS
BEGIN
	DECLARE @manageremp_id INT

	SELECT @manageremp_id = emp_id
	FROM tb_employee
	INNER JOIN tb_users ON tb_employee.emp_id = user_empid
	WHERE [user_name] = @username

	DECLARE @tbl TABLE (
		sec_ID INT
		,sec_Name NVARCHAR(250)
		)

	INSERT @tbl
	SELECT *
	FROM dbo.GetSectionUnderManager(@username, @secID)

	DECLARE @Manager_EmpID INT
		,@SecondManager_EmpID INT

	SELECT @Manager_EmpID = sec_manager
		,@SecondManager_EmpID = isnull(sec_secondmanager, 0)
	FROM tb_section
	WHERE sec_ID = @secID

	IF @Manager_EmpID = @manageremp_id
	BEGIN
		SET @SecondManager_EmpID = 0
	END

	SELECT tb_employee.emp_id
		,tb_employee.emp_card
		,tb_employee.emp_no
		,tb_employee.emp_name
		,tb_section.sec_name
		,tb_employee.emp_section
		,dbo.GetDateAsString(tb_transSummey.m_date) AS m_date
		,dbo.GetDayOfName(tb_transSummey.m_date) AS NameOfDay
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefin), N'--:--') AS timefin
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefout), N'--:--') AS timefout
		,ISNULL(tb_transSummey.m_timetotal, N'--:--') AS timeTotal
		,ISNULL(tb_transSummey.m_actualtime, N'--:--') AS ActualTime
		,ISNULL(tb_transSummey.m_latein, N'--:--') AS LateIn
		,ISNULL(tb_transSummey.m_overtime, N'--:--') AS OverTime
		,ISNULL(tb_transSummey.m_totallate, N'--:--') AS TotalLate
		,ISNULL(tb_transSummey.m_earlyout, N'--:--') AS Earlyout
		--, ISNULL(dbo.Hasfailtrans(tb_employee.emp_card, tb_transSummey.m_date), 0) AS f_trans
		,0 f_trans --,ISNULL(t1.statues,0) AS f_trans
		--, ISNULL(dbo.HasExecuse(tb_employee.emp_id, tb_transSummey.m_date), 0) AS exc_id
		,ISNULL(tb_execuse.exc_id, 0) exc_id
		--,ISNULL(dbo.HasVacation(tb_employee.emp_id, tb_transSummey.m_date), 0) AS vac_id
		,m_vac_id AS vac_id
		,m_manual
		,CASE 
			WHEN tb_execuse.exc_id IS NOT NULL
				THEN exc_hours
			ELSE '--:--'
			END ExcuseTime
	FROM tb_transSummey
	INNER JOIN tb_employee ON tb_transSummey.m_id = tb_employee.emp_card
	INNER JOIN tb_section ON tb_employee.emp_section = tb_section.sec_ID
	LEFT JOIN tb_execuse ON tb_employee.emp_id = exc_empid
		AND tb_transSummey.m_date = exc_date
		AND exc_status = 1
	WHERE tb_transSummey.m_date BETWEEN @fm_date
			AND @tm_date
		AND (
			tb_employee.emp_id = @emp_ID
			OR @emp_ID = - 1
			)
		AND EXISTS (
			SELECT 1
			FROM @tbl t
			WHERE t.sec_ID = tb_section.sec_ID
			)
		AND emp_id NOT IN (
			@Manager_EmpID
			,@SecondManager_EmpID
			)
	ORDER BY tb_transSummey.m_date
		,tb_transSummey.m_id
END















GO
CREATE PROCEDURE [dbo].[spGetTransSummery] 
AS
BEGIN
declare @today int= dbo.getnofromdate(getdate())
select dbo.getdatefromno(@today) AS todayDate
	,dbo.GetDayOfFullName(@today) AS NameOfDay
	,(select count(1) from tb_employee where emp_deleted=0) empCount
	,isnull(sum(case when m_timefin='--:--' then 0 else 1 end),0) TransInCount
	,isnull(sum(case when m_timefout='--:--' then 0 else 1 end),0) TransOutCount
	,isnull(sum(case when m_latein='--:--' then 0 else 1 end),0) TransLateInCount
	,(select count(1) from tb_execuse where exc_date=@today and exc_status=1)  ExecuseCount
	,(select count(1) from (select distinct vac_empid  from tb_vacation 
	join tb_employee on vac_empid =emp_id 
	 where  (@today between vac_fdate and vac_tdate)  and (vac_status=1) and (vac_deleted=0) and (emp_deleted=0))X)  vacationCount
	 from tb_transSummey
	 where m_date=@today
END


















GO
CREATE  PROCEDURE [dbo].[spGetUsers]
     @user_name nvarchar(150)
    ,@emp_name NVARCHAR(500)
AS
BEGIN
    SELECT *
    FROM [tb_users]
    left join tb_employee ON tb_employee.emp_id = tb_users.user_empid
    --WHERE     tb_users.user_active=1
        where (
            [user_name] LIKE N'%' + @user_name + '%'
            OR isnull(@user_name, '') = ''
            )
            AND (
            emp_name LIKE N'%' + @emp_name + '%'
            OR isnull(@emp_name, '') = ''
            )
    ORDER BY user_id
END


















GO
CREATE PROCEDURE [dbo].[spGetUsersRegion] @UserID INT
AS
BEGIN
	DECLARE @tb TABLE (
		reg_id BIGINT,
		reg_name NVARCHAR(100),
		regselect BIT
		)
	INSERT INTO @tb (
		reg_id ,
		reg_name,
		regselect
		)
	SELECT reg_id,
		reg_name,
		cast(0 AS BIT) regselect
	FROM tb_Regions
	UPDATE tb
	SET regselect = 1
	FROM @tb tb
	INNER JOIN tb_UsersRegions
		ON tb.reg_id = tb_UsersRegions.reg_id and user_id=@UserID 
		
	SELECT *
	FROM @tb
END
















GO
CREATE PROCEDURE [dbo].[spGetUserTimeSheetByEmp] @username NVARCHAR(100)
	,@fm_date INT = NULL
	,@tm_date INT = NULL
AS
BEGIN
	--------			
	--EXEC spcheckallemplyeeshavetrans;
	--------
	DECLARE @empid INT
	IF @fm_date IS NULL
	BEGIN
		SELECT @fm_date = dbo.GetFirstDateOfMonth()
		SELECT @tm_date = dbo.GetLastDateOfMonth()
	END
	IF @tm_date IS NULL
		SET @tm_date = @fm_date
	SELECT @empid = user_empid
	FROM dbo.tb_users
	WHERE [user_name] = @username;
	EXEC spGetTimeSheetByEmp @fm_date = @fm_date
		,@tm_date = @tm_date
		,@femp = @empid
		,@temp = @empid
END


















GO

CREATE PROCEDURE [dbo].[spGetVacationByID] @vac_id INT
	
AS
BEGIN
	SELECT [emp_name]
		,[vac_id]
		,vacType.vtype_name vtype_name
		,[vac_empid]
		,dbo.GetDateAsString([vac_fdate]) vac_fdate
		,dbo.GetDateAsString([vac_tdate]) vac_tdate
		,[vac_status]
		,[emp_no]
		,[vac_type]
		,emp.emp_section sec_ID
		,'' vac_fdate_h
		,'' vac_tdate_h
		,vac_fdate fdate
		,vac_tdate tdate
		,'' sec_Name
		,vac_DaysNo
	FROM [tb_vacation] vac
	INNER JOIN tb_employee Emp
		ON Emp.emp_id = vac_empid
	INNER JOIN tb_vacationtype vacType
		ON vacType.vtype_id = vac.vac_type
	
	WHERE (
			vac_id =@vac_id)
	
END















GO

CREATE PROCEDURE [dbo].[spinsertemployee] @emp_no NVARCHAR(50)
	,@emp_card NVARCHAR(10)
	,@emp_section INT
	,@emp_name NVARCHAR(max)
	,@emp_sch INT
	,@emp_PersonalID NVARCHAR(250)
	,@emp_JobTitle NVARCHAR(250)
	,@emp_JobID NVARCHAR(250)
	,@emp_Grade NVARCHAR(250)
	,@emp_HiringDate date
	,@emp_UserName NVARCHAR(250)
	,@emp_deleted BIT
	,@emp_jointype CHAR(5)
	,@emp_violatedException BIT
	,@UserName NVARCHAR(250)
	,@emp_sendnotif BIT = NULL
	,@emp_region bigint =null
AS
BEGIN
	DECLARE @currentdate INT,@newID int

	SET @currentdate = dbo.getnofromdate(getdate())

	INSERT INTO [dbo].[tb_employee] (
		[emp_no]
		,[emp_card]
		,[emp_section]
		,[emp_name]
		,[emp_sch]
		,[emp_PersonalID]
		,[emp_JobTitle]
		,[emp_JobID]
		,[emp_Grade]
		,[emp_HiringDate]
		,[emp_deleted]
		,[emp_jointype]
		,[emp_violatedException]
		,[emp_createddate]
		,[emp_sendnotif]
		,[emp_region]
		)
	VALUES (
		CASE 
			WHEN @emp_no = ''
				THEN NULL
			ELSE @emp_no
			END
		,CASE 
			WHEN @emp_card = ''
				THEN NULL
			ELSE case when  @emp_card is null then cast(@emp_no as bigint) else @emp_card end
			END
		,@emp_section
		,@emp_name
		,@emp_sch
		,@emp_PersonalID
		,@emp_JobTitle
		,@emp_JobID
		,@emp_Grade
		,@emp_HiringDate
		,@emp_deleted
		,@emp_jointype
		,@emp_violatedException
		,@currentdate
		,@emp_sendnotif
		,@emp_region 
		)
		set @newID=@@IDENTITY 
	IF isnull(@emp_UserName, '') <> ''
	BEGIN
		INSERT INTO [dbo].[tb_users] (
			[user_name]
			,user_per
			,user_empid
			,user_active
			)
		SELECT @emp_UserName
			,0
			,@@identity
			,1
	END

	EXEC spsaveuserlog 5
		,@@identity
		,3
		,@UserName
		,1
		,@emp_name
		,@currentdate

	RETURN @newID
END

















GO
CREATE PROCEDURE [dbo].[spinsertexecuse] @exc_empid INT,
	@exc_date INT,
	@exc_ftime NVARCHAR(5),
	@exc_ttime NVARCHAR(5),
	@exc_reason NVARCHAR(MAX),
	@exc_deleted BIT,
	@exc_status BIT,
	@UserName NVARCHAR(250),
	@execuseReason_ID INT,
	@exc_type INT,
	@Approval VARCHAR(5) = NULL
AS
BEGIN
	SET @exc_type = Isnull(@exc_type, 1)
	DECLARE @sid INT,
		@fin NVARCHAR(12),
		@fout NVARCHAR(12),
		@ID INT,
		@ISFH BIT,
		@exc_hours NVARCHAR(5),
		@TransID BIGINT
	SET @sid = dbo.GeatSchedualID(@exc_empid, @exc_date)
	SELECT @fin = shift_fin,
		@fout = shift_fout,
		@ISFH = isnull(IsFH, 0)
	FROM tb_shift
	WHERE shift_id = @sid
	SELECT @exc_hours = dbo.GetTimeTotal(@exc_ftime, @exc_ttime)
	IF (
			SELECT DATEDIFF(minute, @exc_hours, dbo.GetTimeTotal(@fin, @fout))
			) < 0
		SELECT @exc_hours = dbo.GetTimeTotal(@fin, @fout)
	IF (
			SELECT count(exc_empid)
			FROM tb_execuse
			WHERE exc_empid = @exc_empid AND exc_date = @exc_date AND exc_deleted = 0
			) = 0
	BEGIN
		INSERT INTO tb_execuse (
			[exc_empid],
			[exc_date],
			[exc_ftime],
			[exc_ttime],
			[exc_reason],
			[exc_deleted],
			[exc_status],
			[execuseReason_ID],
			[ApprovalByManager],
			[exc_type],
			[exc_hours],
			[exc_minuts],
			[Created],
			[Updated]
			)
		VALUES (
			@exc_empid,
			@exc_date,
			@exc_ftime,
			@exc_ttime,
			@exc_reason,
			@exc_deleted,
			@exc_status,
			@execuseReason_ID,
			CASE 
				WHEN @Approval IS NULL
					THEN (
							CASE 
								WHEN @exc_status = 1
									THEN 'EAS02'
								ELSE 'EAS03'
								END
							)
				ELSE @Approval
				END,
			@exc_type,
			@exc_hours,
			dbo.GetTotalMinutsFromTime(@exc_hours),
			getdate(),
			getdate()
			)
		SET @ID = @@IDENTITY
		DECLARE @m_id BIGINT,
			@empname NVARCHAR(100)
		SELECT @m_id = emp_card,
			@empname = emp_name
		FROM tb_employee
		WHERE emp_id = @exc_empid
		IF @m_id IS NOT NULL
		BEGIN
			IF @exc_type = 2 AND @exc_status = 1 AND @Approval IS NULL
			BEGIN
				DECLARE @m_timefin VARCHAR(12),
					@m_timefout VARCHAR(12)
				SELECT @m_timefout = dbo.GetSumTimeTotal(@fin, @exc_hours)
				EXEC @TransID = spinsertTotransSummey @m_id = @m_id,
					@m_date = @exc_date,
					@emp_id = @exc_empid,
					@sid = @sid,
					@ftime = @fin,
					@ttime = null
				IF @TransID > 0
				BEGIN
					SELECT @m_timefin = NULL,
						@m_timefout = NULL
					SELECT @m_timefin = m_timefin,
						@m_timefout = m_timefout
					FROM tb_transSummey
					WHERE ID = @TransID
					IF @m_timefin IS NULL OR @m_timefin = '--:--'
					BEGIN
						UPDATE tb_transSummey
						SET m_timefin = @fin
							--,m_timefout = dbo.GetSumTimeTotal(@fin, @exc_hours)
						WHERE ID=@TransID
					END -- if @m_timefin is null or @m_timefin='--:--'
					--ELSE IF @m_timefout IS NULL OR @m_timefout = '--:--'
					--BEGIN
					--	UPDATE tb_transSummey
					--	SET m_timefout = dbo.GetSumTimeTotal(@fin, @exc_hours)
					--	WHERE ID=@TransID
					--END --  if @m_timefout is null or @m_timefout='--:--'
				END
			END
			EXEC sprecalculatetranssummery @m_id,
				@exc_date,
				NULL,
				NULL,
				0
		END
		EXEC spsaveuserlog 1,
			@ID,
			3,
			@UserName,
			1,
			@empname,
			@exc_date
		RETURN @ID
	END
	ELSE
		RETURN 0
END















GO
CREATE PROCEDURE [dbo].[spinsertexecuse_twoshifts] 
						 @exc_empid INT
						,@exc_date INT
						,@exc_ftime NVARCHAR(5)
						,@exc_ttime NVARCHAR(5)
						,@exc_reason NVARCHAR(MAX)
						,@exc_deleted BIT
						,@exc_status BIT
						,@UserName NVARCHAR(250)
						,@execuseReason_ID INT
						,@exc_type INT=1
AS
BEGIN
	DECLARE @sid INT,@fin nvarchar(12),@fout nvarchar(12),
	        @twoshifts bit,@sin nvarchar(12),@sout nvarchar(12)
	SET @sid = dbo.GeatSchedualID(@exc_empid, @exc_date)
	if (@sid is not null)
	begin
		 select @fin=shift_fin,
				@fout=shift_fout,
				@twoshifts=shift_twoshifts,
				@sin=shift_sin,
				@sout=shift_sout
		 from tb_shift 
		 where shift_id=@sid
        IF  not ( @twoshifts =0 and ((DATEDIFF(minute, @fin,@exc_ftime) >= 0) AND  (DATEDIFF(minute, @exc_ttime,@fout)>= 0))
					 OR 
					 (@twoshifts =1  AND  (((DATEDIFF(minute, @fin,@exc_ftime) >= 0) AND  (DATEDIFF(minute, @exc_ttime,@fout)>= 0))
					                    OR ((DATEDIFF(minute, @sin,@exc_ftime) >= 0) AND  (DATEDIFF(minute, @exc_ttime,@sout)>= 0)))))
            begin
             return -2
           end
    end 
	IF (SELECT count(exc_empid)
			FROM tb_execuse
			WHERE exc_empid = @exc_empid
			  AND exc_date = @exc_date
			  AND exc_deleted = 0) = 0
	BEGIN
		INSERT INTO tb_execuse (
			[exc_empid]
			,[exc_date]
			,[exc_ftime]
			,[exc_ttime]
			,[exc_reason]
			,[exc_deleted]
			,[exc_status]
			,[execuseReason_ID]
			,exc_type
			)
		VALUES (
			 @exc_empid
			,@exc_date
			,@exc_ftime 
			,@exc_ttime 
			,@exc_reason
			,@exc_deleted
			,@exc_status
			,@execuseReason_ID
			,1
			)
			DECLARE @m_id BIGINT
				,@empname NVARCHAR(100)
			SELECT @m_id = emp_card
				,@empname = emp_name
			FROM tb_employee
			WHERE emp_id = @exc_empid
		    IF @m_id IS NOT NULL 
        	EXEC sprecalculatetranssummery_twoshifts @m_id,@exc_date
		EXEC spsaveuserlog 1
			,@@identity
			,3
			,@UserName
			,1
			,@empname
			,@exc_date
		RETURN @@identity
	END
	ELSE
		RETURN 0
END
	/****** Object:  StoredProcedure [dbo].[spupdateexecuse]    Script Date: 05/29/2009 13:21:16 ******/
	-- SET ANSI_NULLS ON


















GO

CREATE PROCEDURE [dbo].[spinsertexecuseFromEmployee] @exc_empid INT
	, @exc_date INT
	, @exc_ftime NVARCHAR(5)
	, @exc_ttime NVARCHAR(5)
	, @exc_reason NVARCHAR(MAX)
	, @UserName NVARCHAR(250)
	, @execuseReason_ID INT
	, @exc_type INT
AS
BEGIN
	SET @exc_type = Isnull(@exc_type, 1)

	DECLARE @sid INT
		, @fin NVARCHAR(12)
		, @fout NVARCHAR(12)

	SET @sid = dbo.GeatSchedualID(@exc_empid, @exc_date)

	IF (@sid IS NULL)
		RETURN -1;

	SELECT @fin = shift_fin
		, @fout = shift_fout
	FROM tb_shift
	WHERE shift_id = @sid

	IF (
			@exc_type = 1
			AND (
				(DATEDIFF(minute, @fin, @exc_ftime) < 0)
				OR (DATEDIFF(minute, @exc_ttime, @fout) < 0)
				)
			)
	BEGIN
		RETURN - 2
	END

	IF NOT EXISTS (
			SELECT 1
			FROM tb_execuse
			WHERE exc_empid = @exc_empid
				AND exc_date = @exc_date
				AND exc_deleted = 0
			)
	BEGIN
		INSERT INTO tb_execuse (
			[exc_empid]
			, [exc_date]
			, [exc_ftime]
			, [exc_ttime]
			, [exc_reason]
			, [exc_deleted]
			, [exc_status]
			, [execuseReason_ID]
			, exc_type
			)
		VALUES (
			@exc_empid
			, @exc_date
			, CASE 
				WHEN @exc_type = 2
					THEN isnull(@fin, @exc_ftime)
				ELSE @exc_ftime
				END
			, CASE 
				WHEN @exc_type = 2
					THEN isnull(@fout, @exc_ttime)
				ELSE @exc_ttime
				END
			, @exc_reason
			, 0
			, 0
			, @execuseReason_ID
			, Isnull(@exc_type, 1)
			)

		DECLARE @ExecuseMsg NVARCHAR(max)
			, @execRes NVARCHAR(250)

		SELECT @execRes = tb_execuseReason.execuseReason_name
		FROM tb_execuseReason
		WHERE tb_execuseReason.execuseReason_id = @execuseReason_ID

		SET @ExecuseMsg = N'<table border=1><tr><td>التاريخ</td><td>الوقت من</td><td>الوقت إلى</td><td>السبب</td></tr><tr><td>' + (dbo.GetDateAsString(@exc_date)
				) + N'</td><td>' + @exc_ftime + N'</td><td>' + @exc_ttime + N'</td><td>' + isnull(@execRes, '') + ' - ' + @exc_reason + N' </td></tr></table>'

		--EXEC SendNoficationForExecuseAdd @exc_empid
		--	, @ExecuseMsg

		DECLARE @empname NVARCHAR(100)

		SELECT @empname = emp_name
		FROM tb_employee
		WHERE emp_id = @exc_empid

		EXEC spsaveuserlog 1
			, @@identity
			, 3
			, @UserName
			, 1
			, @empname
			, @exc_date

		RETURN @@identity
	END
	ELSE
		RETURN -3
END















GO
-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-04-03>
-- Description:	<Vacation Insert Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spinsertexecuseReason] @execuseReason_name NVARCHAR(250)
	,@UserName NVARCHAR(250)
	,@exc_type int
AS
DECLARE @arabicdesc NVARCHAR(max),@englishdesc NVARCHAR(max),@ID int
BEGIN
	INSERT INTO [dbo].[tb_execuseReason] ([execuseReason_name],exc_type)
	VALUES (@execuseReason_name,@exc_type)
	set @ID=@@IDENTITY 
END

SET @arabicdesc = (N'تم إضافة سبب إستئذان ' + @execuseReason_name + N' من قبل الموظف ' + @username + N' بتاريخ' + cast(getdate() AS VARCHAR(20)))

SET @englishdesc = (N'add Excuse Reason  ' + @execuseReason_name + N' by ' + @username + N'  at ' + cast(getdate() AS VARCHAR(20)))
EXEC spsaveuserlog 1
	,@ID
	,3
	,@UserName
	,0
	,NULL
	,NULL
	,@arabicdesc
	,@englishdesc
RETURN @ID
	/****** Object:  StoredProcedure [dbo].[spupdateexecuseReason]    Script Date: 05/29/2009 13:21:20 ******/
	-- SET ANSI_NULLS ON


















GO
-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-01-26>
-- Description:	<Pull Configuration Insert Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spinsertpullconfig] @pull_auto BIT
	,@pull_option CHAR(1)
	,@pull_attime NVARCHAR(10)
	,@pull_atmint SMALLINT
	,@pull_try SMALLINT
	,@dbconnstr NVARCHAR(max)
	,@dblinkdata NVARCHAR(max)
	,@pull_type CHAR(1)
	,@dbtype SMALLINT
AS
BEGIN
	IF (
			SELECT count(*)
			FROM tb_pullconfig
			) = 0
	BEGIN
		INSERT INTO [dbo].[tb_pullconfig] (
			[pull_auto]
			,[pull_option]
			,[pull_attime]
			,[pull_atmint]
			,[pull_try]
			,[dbconnstr]
			,[dblinkdata]
			,[pull_type]
			,[ispull]
			,[dbtype]
			)
		VALUES (
			@pull_auto
			,@pull_option
			,@pull_attime
			,@pull_atmint
			,@pull_try
			,@dbconnstr
			,@dblinkdata
			,@pull_type
			,0
			,@dbtype
			)
	END
	ELSE
	BEGIN
		UPDATE [dbo].[tb_pullconfig]
		SET [pull_auto] = @pull_auto
			,[pull_option] = @pull_option
			,[pull_attime] = @pull_attime
			,[pull_atmint] = @pull_atmint
			,[pull_try] = @pull_try
			,[dbconnstr] = @dbconnstr
			,[dblinkdata] = @dblinkdata
			,[pull_type] = @pull_type
			,[dbtype] = @dbtype
	END
END
	/****** Object:  StoredProcedure [dbo].[spinsertvacationtype]    Script Date: 05/29/2009 13:21:14 ******/
	-- SET ANSI_NULLS ON


















GO

CREATE PROCEDURE [dbo].[spinsertRegions] @reg_id BIGINT,
	@reg_name NVARCHAR(150),
	@UserName NVARCHAR(150)
AS
BEGIN
	DECLARE @RowsEffect INT,
		@userid INT,
		@permtype SMALLINT

	IF EXISTS (
			SELECT 1
			FROM tb_Regions
			WHERE reg_id = @reg_id
			)
		RETURN - 2
	ELSE
	BEGIN
		INSERT INTO tb_Regions (
			reg_id,
			reg_name
			)
		VALUES (
			@reg_id,
			@reg_name
			)

		SELECT @RowsEffect = @@rowcount

		SELECT @userid = [user_id],
			@permtype = user_per
		FROM tb_users
		WHERE [user_name] = @UserName

		IF @permtype IS NOT NULL
			INSERT INTO tb_UsersRegions (
				[user_id],
				[reg_id]
				)
			SELECT @userid,
				@reg_id
			WHERE @permtype <> 1

		DECLARE @currentdate INT

		SELECT @currentdate = dbo.getnofromdate(getdate())

		EXEC spsaveuserlog 12,
			@reg_id,
			3,
			@UserName,
			0,
			@reg_name,
			@currentdate

		RETURN @RowsEffect
	END
END















GO

CREATE PROCEDURE [dbo].[spinsertschedule] @sch_name NVARCHAR(250),
	@sch_oneshift BIT,
	@sch_desc NVARCHAR(max),
	@sch_1 INT,
	@sch_2 INT,
	@sch_3 INT,
	@sch_4 INT,
	@sch_5 INT,
	@sch_6 INT,
	@sch_7 INT,
	@sch_delete BIT,
	@UserName NVARCHAR(250)
AS
BEGIN
	DECLARE @isnight BIT,
		@id INT

	INSERT INTO [dbo].[tb_schedule] (
		[sch_name],
		[sch_oneshift],
		[sch_desc],
		[sch_1],
		[sch_2],
		[sch_3],
		[sch_4],
		[sch_5],
		[sch_6],
		[sch_7],
		[sch_delete]
		)
	VALUES (
		@sch_name,
		@sch_oneshift,
		@sch_desc,
		@sch_1,
		@sch_2,
		@sch_3,
		@sch_4,
		@sch_5,
		@sch_6,
		@sch_7,
		@sch_delete
		)

	SELECT @id = @@IDENTITY

	SET @isnight = 0

	SELECT @isnight = CASE 
			WHEN EXISTS (
					SELECT 1
					FROM tb_shift
					WHERE shift_id = @sch_1 AND shift_fin > shift_fout
					)
				THEN 1
			WHEN EXISTS (
					SELECT 1
					FROM tb_shift
					WHERE shift_id = @sch_2 AND shift_fin > shift_fout
					)
				THEN 1
			WHEN EXISTS (
					SELECT 1
					FROM tb_shift
					WHERE shift_id = @sch_3 AND shift_fin > shift_fout
					)
				THEN 1
			WHEN EXISTS (
					SELECT 1
					FROM tb_shift
					WHERE shift_id = @sch_4 AND shift_fin > shift_fout
					)
				THEN 1
			WHEN EXISTS (
					SELECT 1
					FROM tb_shift
					WHERE shift_id = @sch_5 AND shift_fin > shift_fout
					)
				THEN 1
			WHEN EXISTS (
					SELECT 1
					FROM tb_shift
					WHERE shift_id = @sch_6 AND shift_fin > shift_fout
					)
				THEN 1
			WHEN EXISTS (
					SELECT 1
					FROM tb_shift
					WHERE shift_id = @sch_7 AND shift_fin > shift_fout
					)
				THEN 1
			ELSE 0
			END

	UPDATE tb_schedule
	SET sch_isnight = @isnight
	WHERE sch_id = @id

	DECLARE @currentdate INT

	SET @currentdate = dbo.getnofromdate(getdate())

	EXEC spsaveuserlog 6,
		@id,
		3,
		@UserName,
		0,
		@sch_name,
		@currentdate

	RETURN @id
END















GO

CREATE PROCEDURE [dbo].[spinsertschGroup] @schGroup_name NVARCHAR(250)
	,@sch_id INT
	,@schEmployees NVARCHAR(max)
	,@UserName NVARCHAR(250)
	,@schGroup_deleted BIT
	,@sch_startdate INT = NULL
	,@sch_enddate INT = NULL
AS
BEGIN
	INSERT INTO [dbo].[tb_schGroup] (
		[schGroup_name]
		,sch_id
		,sch_startdate
		,sch_enddate
		)
	VALUES (
		@schGroup_name
		,@sch_id
		,@sch_startdate
		,@sch_enddate
		)

	DECLARE @newschGroupID INT = @@identity

	IF len(ltrim(rtrim(@schEmployees))) > 0
	BEGIN
		DECLARE @text NVARCHAR(max)
			,@employees NVARCHAR(max)

		SET @text = 'select emp_id from tb_employee where emp_id in (' + @schEmployees + ')'

		CREATE TABLE #tbl (
			id INT identity(1, 1)
			,emp_id NVARCHAR(250)
			)

		DECLARE @textInsert NVARCHAR(max)

		SET @textInsert = 'Insert into #tbl(emp_id)  ' + @text

		EXEC (@textInsert)

		INSERT INTO tb_schGroupEmployees
		SELECT @newschGroupID
			,emp_id
		FROM #tbl

		--UPDATE tb_employee
		--SET emp_sch = @sch_id
		--FROM tb_employee
		--JOIN #tbl t ON tb_employee.emp_id = t.emp_id

		DROP TABLE #tbl
	END

	RETURN @newschGroupID
END
















GO
-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-01-26>
-- Description:	<Section Insert Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spinsertsection] @sec_No NVARCHAR(50)
	,@sec_Name NVARCHAR(250)
	,@sec_Parent INT
	,@sec_Location NVARCHAR(250)
	,@sec_manager INT
	,@sec_sch INT
	,@sec_secondmanager INT
	,@UserName NVARCHAR(250)
	,@sec_sendnotif bit
AS
DECLARE @level INT
DECLARE @Parent_sec_path NVARCHAR(20)
BEGIN
Declare @NewID int
	SET @level = (
			SELECT isnull(max(sec_level), 0)
			FROM tb_section
			WHERE sec_ID = @sec_Parent
			)
	INSERT INTO [dbo].[tb_section] (
		[sec_No]
		,[sec_Name]
		,[sec_Parent]
		,[sec_Location]
		,[sec_Level]
		,[sec_manager]
		,sec_secondmanager
		,sec_sch
		,sec_sendnotif
		)
	VALUES (
		@sec_No
		,@sec_Name
		,@sec_Parent
		,@sec_Location
		,@level + 1
		,@sec_manager
		,@sec_secondmanager
		,@sec_sch
		,@sec_sendnotif
		)
		select @NewID=@@identity
	SELECT @Parent_sec_path = sec_path
	FROM tb_section
	WHERE sec_ID = @sec_Parent
	IF @Parent_sec_path IS NULL
	BEGIN
		UPDATE tb_section
		SET sec_path = sec_ID
		WHERE sec_ID = @NewID
	END
	ELSE
	BEGIN
		UPDATE tb_section
		SET sec_path = cast(@Parent_sec_path AS NVARCHAR(20)) + '/' + cast(@NewID AS NVARCHAR(20))
		WHERE sec_ID = @NewID
	END
	DECLARE @currentdate INT
	SET @currentdate = dbo.getnofromdate(getdate())
	EXEC spsaveuserlog 4
		,@NewID
		,3
		,@UserName
		,0
		,@sec_Name
		,@currentdate
	RETURN @NewID
END


















GO

CREATE PROCEDURE [dbo].[spinsertshift] @shift_name NVARCHAR(250),
	@shift_fin NVARCHAR(50),
	@shift_fout NVARCHAR(50),
	@shift_sin NVARCHAR(50) = '--:--',
	@shift_sout NVARCHAR(50) = '--:--',
	@shift_off BIT,
	@shift_deleted BIT,
	@shift_allow SMALLINT,
	@shift_allow_out SMALLINT,
	@shift_withbreak BIT = NULL,
	@shift_fbreak NVARCHAR(12) = NULL,
	@shift_tbreak NVARCHAR(12) = NULL,
	@shift_withovertime BIT = NULL,
	@shift_fovertime NVARCHAR(12) = NULL,
	@shift_tovertime NVARCHAR(12) = NULL,
	@shift_OverTimeMinutes INT = NULL,
	@shift_twoshifts BIT = NULL,
	@shift_isnight BIT,
	@IsFH BIT = NULL,
	@shift_FH_from NVARCHAR(12) = NULL,
	@shift_FH_to NVARCHAR(12) = NULL,
	@UserName NVARCHAR(250),
	@IsOpenHours BIT = NULL
AS
BEGIN
	INSERT INTO [dbo].[tb_shift] (
		[shift_name],
		[shift_fin],
		[shift_fout],
		[shift_sin],
		[shift_sout],
		[shift_off],
		[shift_deleted],
		[shift_allow],
		[shift_allow_out],
		shift_withbreak,
		shift_fbreak,
		shift_tbreak,
		shift_withovertime,
		shift_fovertime,
		shift_tovertime,
		shift_OverTimeMinutes,
		shift_twoshifts,
		shift_isnight,
		IsFH,
		shift_FH_from,
		shift_FH_to,
		IsOpenHours
		)
	VALUES (
		@shift_name,
		@shift_fin,
		@shift_fout,
		@shift_sin,
		@shift_sout,
		@shift_off,
		@shift_deleted,
		@shift_allow,
		@shift_allow_out,
		@shift_withbreak,
		CASE 
			WHEN @shift_withbreak = 1
				THEN @shift_fbreak
			ELSE NULL
			END,
		CASE 
			WHEN @shift_withbreak = 1
				THEN @shift_tbreak
			ELSE NULL
			END,
		@shift_withovertime,
		CASE 
			WHEN @shift_withovertime = 1
				THEN @shift_fovertime
			ELSE NULL
			END,
		CASE 
			WHEN @shift_withovertime = 1
				THEN @shift_tovertime
			ELSE NULL
			END,
		CASE 
			WHEN @shift_withovertime = 1
				THEN @shift_OverTimeMinutes
			ELSE NULL
			END,
		@shift_twoshifts,
		@shift_isnight,
		@IsFH,
		@shift_FH_from,
		@shift_FH_to,
		@IsOpenHours
		)

	DECLARE @currentdate INT,
		@NewID INT

	SELECT @currentdate = dbo.getnofromdate(getdate()),
		@NewID = @@identity

	EXEC spsaveuserlog 7,
		@NewID,
		3,
		@UserName,
		0,
		@shift_name,
		@currentdate

	RETURN @NewID
END















GO
-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-01-26>
-- Description:	<Shift insert Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spinserttotb_empschedual] @m_id INT
	,@emp_schdate INT
AS
BEGIN
	DECLARE @emp_id INT
	DECLARE @emp_sch INT
	SELECT @emp_id = emp_id
		,@emp_sch = emp_sch
	FROM tb_employee
	WHERE emp_card = @m_id
	IF (
			SELECT count(emp_id)
			FROM tb_empschedual
			WHERE emp_id = @emp_id
				AND emp_schdate = @emp_schdate
			) = 0
	BEGIN
		DECLARE @shiftno INT
		SET @shiftno = dbo.GetShiftidbyscheduale(@emp_sch, @emp_schdate)
		INSERT INTO [dbo].[tb_empschedual] (
			[emp_id]
			,[emp_shiftid]
			,[emp_schdate]
			)
		VALUES (
			@emp_id
			,@shiftno
			,@emp_schdate
			)
		RETURN @@identity
	END
END
	/****** Object:  StoredProcedure [dbo].[spGetTimeSheet]    Script Date: 05/29/2009 13:21:07 ******/
	-- SET ANSI_NULLS ON


















GO
CREATE PROCEDURE spinsertTotransSummey @m_id BIGINT,
	@m_date INT,
	@emp_id INT = NULL,
	@sid INT = NULL,
	@ftime NVARCHAR(10) = NULL,
	@ttime NVARCHAR(10) = NULL,
	@m_manual bit =null
AS
BEGIN
	DECLARE @TransID BIGINT
	SELECT @TransID = tb_transSummey.ID
	FROM tb_transSummey
	WHERE m_id = @m_id AND m_date = @m_date
	IF (@TransID IS NOT NULL)
		RETURN @TransID;
	SELECT @emp_id = emp_id
	FROM tb_employee
	WHERE emp_Card = @m_id AND (@emp_id IS NULL OR emp_id = @emp_id)
	IF (@emp_id IS NULL)
		RETURN 0;
	IF @sid IS NULL
		SELECT @sid = dbo.GeatSchedualID(@emp_id, @m_date)
	INSERT INTO tb_transSummey (
		[m_id],
		[m_date],
		[m_timefin],
		[m_timefout],
		[m_timetotal],
		[m_actualtime],
		[m_latein],
		[m_overtime],
		[m_totallate],
		[m_earlyout],
		[m_deleted],
		[m_manual],
		[m_overtimein],
		[m_overtimeOut],
		[m_shiftid],
		[m_timesin],
		[m_timesout],
		[m_flatein],
		[m_slatein],
		[m_fearlyout],
		[m_searlyout],
		[m_lastcvcode],
		[m_vac_id],
		[m_exc_id]
		)
	SELECT @m_id,
		@m_date,
		isnull(@ftime, N'--:--'),
		isnull(@ttime, N'--:--'),
		N'--:--',
		ISNULL(dbo.GetActualTime(@emp_id, @sid, @m_date), N'00:00'),
		N'--:--',
		N'--:--',
		N'--:--',
		N'--:--',
		0,
		isnull(@m_manual,0),
		N'--:--',
		N'--:--',
		@sid,
		N'--:--',
		N'--:--',
		N'--:--',
		N'--:--',
		N'--:--',
		N'--:--',
		1,
		dbo.HasVacation(@emp_id, @m_date),
		dbo.HasExecuse(@emp_id, @m_date)
	SELECT @TransID = @@IDENTITY
	RETURN @TransID;
END














GO
CREATE PROCEDURE [dbo].[spinserttrans] @emp_id INT,
	@m_date INT,
	@m_time AS NVARCHAR(12),
	@m_unit INT = NULL,
	@m_mode SMALLINT,
	@m_transtype INT,
	@ModifiedReasonID INT,
	@UserName NVARCHAR(250) = NULL,
	@CV_Code INT = NULL,
	@Acc_Date INT = NULL
AS
BEGIN TRANSACTION;

BEGIN TRY
	DECLARE @m_id BIGINT,
		@empname NVARCHAR(200),
		@manule BIT

	SET @manule = 1 --cast(@m_mode AS BIT)

	SELECT @m_id = emp_card,
		@empname = emp_name
	FROM tb_employee
	WHERE emp_id = @emp_id

	IF @m_id IS NULL
		RETURN

	SELECT @m_mode = max(m_mode)
	FROM tb_trans
	WHERE m_id = @m_id AND m_date = @m_date

	SET @m_mode = ISNULL(@m_mode, 0) + 1

	DECLARE @new_transid BIGINT

	INSERT INTO tb_trans (
		m_id,
		m_date,
		m_time,
		m_status,
		m_unitid,
		m_typ,
		m_deleted,
		m_mode,
		m_manual,
		m_transtype,
		CV_Code,
		acc_date
		)
	VALUES (
		@m_id,
		@m_date,
		@m_time,
		1,
		@m_unit,
		1,
		0,
		@m_mode,
		@manule,
		@m_transtype,
		@CV_Code,
		@Acc_Date
		)

	SET @new_transid = @@identity

	INSERT INTO tb_translog (
		[trans_id],
		[m_timeModified],
		[ModifiedReason],
		[ModifiedBy],
		[ModifiedDate],
		[transtype],
		[m_timeNew],
		[TransReasonID]
		)
	SELECT @new_transid,
		@m_time,
		NULL,
		@UserName,
		@m_date,
		1,
		@m_time,
		@ModifiedReasonID

	EXEC spregeneratetranssummery @m_id,
		@m_date,1
	EXEC spsaveuserlog 8,
		@new_transid,
		3,
		@UserName,
		1,
		@empname,
		@m_date

	IF @@TRANCOUNT > 0
		COMMIT TRANSACTION;

	RETURN @new_transid
END TRY

BEGIN CATCH
	SELECT ERROR_NUMBER() AS ErrorNumber,
		ERROR_SEVERITY() AS ErrorSeverity,
		ERROR_STATE() AS ErrorState,
		ERROR_PROCEDURE() AS ErrorProcedure,
		ERROR_LINE() AS ErrorLine,
		ERROR_MESSAGE() AS ErrorMessage;

	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION;
END CATCH;















GO

CREATE PROCEDURE [dbo].[spinserttrans_BioAuto] @emp_id BIGINT
	,@m_date datetime
	,@m_time NVARCHAR(12)
	,@m_unit bigINT
	,@m_mode SMALLINT = 1
	,@st BIT = NULL
	,@unit_name NVARCHAR(500)
	,@code NVARCHAR(100) = NULL
	,@CV_CODE INT = NULL
AS
--if (isnull(@CV_CODE,0)=0)
--return 0

DECLARE @c_date INT
	,@Night_Date INT

select @c_date = dbo.getnofromdate( @m_date)

DECLARE @transID BIGINT
DECLARE @m_id BIGINT

SET @m_id = @emp_id

SELECT @emp_id = emp_id
FROM tb_employee
WHERE emp_card = @m_id

SELECT @m_mode = MAX(m_mode)
FROM tb_trans
WHERE m_date = @c_date
	AND m_id = @m_id

SET @m_mode = ISNULL(@m_mode, 0) + 1
SET @Night_Date = @c_date

BEGIN TRY
	SELECT @Night_Date = isnull(dbo.CheckNighty(@c_date, @m_time, @emp_id), @c_date)
END TRY

BEGIN CATCH
	SET @Night_Date = @c_date
END CATCH

INSERT INTO tb_trans (
	m_id
	,m_date
	,m_time
	,m_status
	,m_unitid
	,m_typ
	,m_deleted
	,m_mode
	,m_manual
	,m_unitname
	,CV_CODE
	,Code
	,acc_date
	)
VALUES (
	@m_id
	,@Night_Date
	,@m_time
	,@st
	,cast(@m_unit as bigint)
	,1
	,0
	,@m_mode
	,0
	,@unit_name
	,@CV_CODE
	,@code
	,@c_date
	)

SET @transID = @@identity

IF isnull(@m_id, 0) > 0
	AND @st = 1
	--IF ISNULL((
	--			SELECT value
	--			FROM tb_setting
	--			WHERE SettingID = 6
	--			), 1) = 1
	--BEGIN
		EXEC dbo.spsavetranssummery  @m_id
			,@m_time
			,@Night_Date
			,@emp_id
	--END
	--ELSE
	--BEGIN
	--	EXEC dbo.spsavetranssummery_twoshifts @m_id
	--		,@m_time
	--		,@Night_Date
	--		,@CV_CODE
	--		,0
	--		,@emp_id
	--		,@transID
	--END

RETURN @transID
	/****** Object:  StoredProcedure [dbo].[spupdateemployee]    Script Date: 05/29/2009 13:21:15 ******/
	-- SET ANSI_NULLS ON

















GO
CREATE PROCEDURE [dbo].[spinserttrans_progeny] @emp_id INT
	,@m_date DATETIME
	,@m_time NVARCHAR(12)
	,@m_unit INT
	,@m_mode SMALLINT = 1
	,@st INT = NULL
	,@unit_name NVARCHAR
	,@code NVARCHAR(100) = NULL
	,@CV_CODE INT = NULL
AS
DECLARE @c_date INT
SET @c_date = dbo.getnofromdate(@m_date)
DECLARE @transID BIGINT
DECLARE @m_id BIGINT
SET @m_id = @emp_id
SELECT @emp_id = emp_id
FROM tb_employee
WHERE emp_card = @m_id
SELECT @m_mode = MAX(m_mode)
FROM tb_trans
WHERE m_date = @c_date
	AND m_id = @m_id
SET @m_mode = ISNULL(@m_mode, 0) + 1
INSERT INTO tb_trans (
	m_id
	,m_date
	,m_time
	,m_status
	,m_unitid
	,m_typ
	,m_deleted
	,m_mode
	,m_manual
	,m_unitname
	)
VALUES (
	@m_id
	,@c_date
	,@m_time
	,1
	,@m_unit
	,1
	,0
	,@m_mode
	,0
	,@unit_name
	)
SET @transID = @@identity
EXEC dbo.spsavetranssummery @m_id
	,@m_time
	,@c_date
	,@emp_id
RETURN @transID
	/****** Object:  StoredProcedure [dbo].[spupdateemployee]    Script Date: 05/29/2009 13:21:15 ******/
	-- SET ANSI_NULLS ON


















GO

CREATE PROCEDURE [dbo].[spinsertuptTransReason] @uptTransReason_name NVARCHAR(250),
	@uptTransReason_Type INT = 1,
	@UserName NVARCHAR(150) = NULL
AS
BEGIN
	DECLARE @ID INT,
		@currentdate INT

	INSERT INTO [dbo].[tb_uptTransReason] (
		uptTransReason_name,
		uptTransReason_Type
		)
	VALUES (
		@uptTransReason_name,
		@uptTransReason_Type
		)

	SELECT @ID = @@IDENTITY

	IF @UserName IS NOT NULL
	BEGIN
		SELECT @currentdate = dbo.getnofromdate(getdate())

		EXEC spsaveuserlog 13,
			@ID,
			3,
			@UserName,
			0,
			@uptTransReason_name,
			@currentdate
	END

	RETURN @ID
END















GO
CREATE PROCEDURE [dbo].[spinsertuser] @user_name NVARCHAR(150)
	,@user_pass NVARCHAR(50)
	,@user_per SMALLINT
	,@user_empid INT
	,@user_active BIT
	,@UserName NVARCHAR(250)
	,@useremail nvarchar(250) =null
AS
DECLARE @empname NVARCHAR(100), @currentdate INT,@ID int
IF (
		SELECT count(user_id)
		FROM tb_users
		WHERE user_name = @user_name
		) = 0
BEGIN
	INSERT INTO [dbo].[tb_users] (
		[user_name]
		,[user_pass]
		,[user_per]
		,[user_empid]
		,[user_active]
		,[user_email] 
		,[user_mustchangepassword] 
		)
	VALUES (
		@user_name
		,@user_pass
		,@user_per
		,@user_empid
		,@user_active
		,@useremail 
		,1
		)
	select @ID=@@IDENTITY 
	SET @empname = (
			SELECT emp_name
			FROM tb_employee
			WHERE emp_id = @user_empid
			)
	
	SET @currentdate = dbo.getnofromdate(getdate())
	EXEC spsaveuserlog 9
		,@ID
		,3
		,@UserName
		,1
		,@empname
		,@currentdate
	RETURN @ID
END
ELSE
	RETURN - 1
		/****** Object:  StoredProcedure [dbo].[spUserCanDo]    Script Date: 05/29/2009 13:21:20 ******/
		-- SET ANSI_NULLS ON


















GO
CREATE PROCEDURE [dbo].[spInsertUsersRegion] @UserID INT,
	@regionIDS NVARCHAR(max) = NULL
AS
BEGIN
	DELETE
	FROM tb_UsersRegions
	WHERE user_id = @UserID
	IF (@regionIDS IS NOT NULL)
	BEGIN
		INSERT INTO tb_UsersRegions (
			user_id,
			reg_id
			)
		SELECT @UserID,
			cast(Data AS BIGINT)
		FROM dbo.Split(@regionIDS, ',')
		RETURN @@rowcount
	END
END
















GO
-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-04-03>
-- Description:	<Vacation Insert Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spinsertvacation] @vac_type INT
	,@vac_empid INT
	,@vac_fdate INT
	,@vac_tdate INT
	,@vac_status BIT
	,@vac_deleted BIT
	,@UserName NVARCHAR(250)
AS
BEGIN
Declare @ID int
set @ID=0
	IF (SELECT count(vac_id)
		FROM [tb_vacation]
		WHERE vac_empid = @vac_empid
		  AND vac_fdate = @vac_fdate
		  AND vac_deleted = 0) = 0
	BEGIN
		INSERT INTO [dbo].[tb_vacation] (
							 [vac_type]
							,[vac_empid]
							,[vac_fdate]
							,[vac_tdate]
							,[vac_status]
							,[vac_deleted]
			)
		VALUES (
			@vac_type
			,@vac_empid
			,@vac_fdate
			,@vac_tdate
			,@vac_status
			,@vac_deleted
			)
			set @ID=@@IDENTITY 
	END
	ELSE
		RETURN 0
END
EXEC sprecalculatetranssummery_Period @vac_empid
								  	 ,@vac_fdate
									 ,@vac_tdate
DECLARE @empname NVARCHAR(200) = (SELECT emp_name FROM tb_employee WHERE emp_id = @vac_empid)
EXEC spsaveuserlog 2
	,@ID
	,3
	,@UserName
	,1
	,@empname
	,@vac_fdate
RETURN @ID


















GO

-- Author:		<Mohammed Handoumeh>
-- Create date: <2014-04-03>
-- Description:	<Vacation Insert By Section Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spinsertvacationBySection] @vac_type INT
	,@secid INT
	,@vac_fdate INT
	,@vac_tdate INT
	,@vac_status BIT
	,@vac_deleted BIT
	,@UserName NVARCHAR(250)
AS
BEGIN
	IF CURSOR_STATUS('global', 'seccursor') = 1
	BEGIN
		CLOSE seccursor

		DEALLOCATE seccursor
	END

	IF CURSOR_STATUS('global', 'empcursor') = 1
	BEGIN
		CLOSE empcursor

		DEALLOCATE empcursor
	END

	DECLARE @ID INT
		,@vac_empid INT
		,@subsecid INT

	DECLARE seccursor CURSOR FAST_FORWARD
	FOR
	SELECT sec_id
	FROM dbo.GetSecUnderSec(@secid)

	OPEN seccursor

	FETCH NEXT
	FROM seccursor
	INTO @subsecid

	BEGIN TRY
		BEGIN TRAN VacUpdate

		WHILE @@FETCH_STATUS = 0
		BEGIN
			DECLARE empcursor CURSOR FAST_FORWARD
			FOR
			SELECT emp_id
			FROM tb_employee
			WHERE emp_section = @subsecid
				AND emp_deleted = 0

			OPEN empcursor

			FETCH NEXT
			FROM empcursor
			INTO @vac_empid

			WHILE @@FETCH_STATUS = 0
			BEGIN
				EXEC spinsertvacation @vac_type
					,@vac_empid
					,@vac_fdate
					,@vac_tdate
					,@vac_status
					,@vac_deleted
					,@UserName

				FETCH NEXT
				FROM empcursor
				INTO @vac_empid
			END

			CLOSE empcursor

			DEALLOCATE empcursor

			FETCH NEXT
			FROM seccursor
			INTO @subsecid
		END

		CLOSE seccursor

		DEALLOCATE seccursor

		COMMIT TRAN VacUpdate

		RETURN 1
	END TRY

	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRAN VacUpdate

		RETURN - 2
	END CATCH
END

















GO
-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-04-03>
-- Description:	<Vacation Insert Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spinsertvacationtype] @vtype_name NVARCHAR(250)
	,@UserName NVARCHAR(250)
AS
BEGIN
DECLARE @arabicdesc NVARCHAR(max),@englishdesc NVARCHAR(max),@NewID int
	INSERT INTO [dbo].[tb_vacationtype] ([vtype_name])
	VALUES (@vtype_name)
	select @NewID=@@IDENTITY 


SET @arabicdesc = (N'تم إضافة نوع إجازة ' + @vtype_name + N' بواسطة ' + @username + N' في تاريخ' + cast(getdate() AS VARCHAR(20)))
SET @englishdesc = (N'add vacation type  ' + @vtype_name + N' by ' + @username + N'  at ' + cast(getdate() AS VARCHAR(20)))
EXEC spsaveuserlog 3
	,@NewID
	,1
	,@UserName
	,0
	,NULL
	,NULL
	,@arabicdesc
	,@englishdesc
RETURN @NewID
	/****** Object:  StoredProcedure [dbo].[spupdatevacationtype]    Script Date: 05/29/2009 13:21:20 ******/
	-- SET ANSI_NULLS ON

END
















GO
CREATE PROCEDURE [dbo].[spManagerApprovedExecuse] @exc_id INT
	,@ApprovalType CHAR(5)
	,@UserName NVARCHAR(250)
AS
BEGIN
	BEGIN TRAN TAupdateexecuse
	UPDATE tb_execuse
	SET [ApprovalByManager] = @ApprovalType
		,exc_status = CASE 
			WHEN @ApprovalType = 'EAS02'
				THEN 1
			ELSE 0
			END
	WHERE [exc_id] = @exc_id
	DECLARE @m_id BIGINT
		,@m_date INT
		,@emp_id BIGINT
		,@empname NVARCHAR(200)
	SELECT @emp_id = exc_empid
		,@m_date = exc_date
	FROM tb_execuse
	WHERE exc_id = @exc_id
	SELECT @m_id = emp_card
		,@empname = emp_name
	FROM tb_employee
	WHERE emp_id = @emp_id
	---------------------  في حالة كان الاستئذان يوم كامل
	if @ApprovalType = 'EAS02'
	begin
	declare @exc_type int
	select @exc_type= exc_type from tb_execuse WHERE [exc_id] = @exc_id
	  DECLARE @sid INT
		,@fin NVARCHAR(12)
		,@fout NVARCHAR(12)
	SET @sid = dbo.GeatSchedualID(@emp_id, @m_id)
	IF (@sid IS NOT NULL)
	BEGIN
		SELECT @fin = shift_fin
			,@fout = shift_fout
		FROM tb_shift
		WHERE shift_id = @sid
	  if @exc_type=2
	  begin
      DECLARE @m_timefin VARCHAR(12), @m_timefout VARCHAR(12)
      IF NOT EXISTS (
						SELECT 1
						FROM tb_transSummey
						WHERE m_id = @m_id
							AND m_date = @m_date 
						)
						BEGIN
					INSERT INTO tb_transSummey
					([m_id]
           ,[m_date]
           ,[m_timefin]
           ,[m_timefout]
           ,[m_timetotal]
           ,[m_actualtime]
           ,[m_latein]
           ,[m_overtime]
           ,[m_totallate]
           ,[m_earlyout]
           ,[m_deleted]
           ,[m_manual]
           ,[m_overtimein]
           ,[m_overtimeOut]
           ,[m_shiftid]
           ,[m_timesin]
           ,[m_timesout]
           ,[m_flatein]
           ,[m_slatein]
           ,[m_fearlyout]
           ,[m_searlyout]
           ,[m_lastcvcode]
           ,[m_vac_id]
           ,[m_exc_id])
					SELECT @m_id
						,@m_date
						,@fin
						,@fin
						,N'--:--'
						,ISNULL(dbo.GetActualTime(@emp_id, @sid, @m_date), N'00:00')
						,N'--:--'
						,N'--:--'
						,N'--:--'
						,N'--:--'
						,0
						,0
						,N'--:--'
						,N'--:--'
						,@sid
						,N'--:--'
						,N'--:--'
						,N'--:--'
						,N'--:--'
						,N'--:--'
						,N'--:--'
						,1
						,dbo.HasVacation(@emp_id,@m_date)
						,dbo.HasExecuse(@emp_id,@m_date)
				END
				else
				begin
				   select @m_timefin=m_timefin ,@m_timefout=m_timefout from  tb_transSummey where m_date=@m_date and m_id=@m_id 
	     if @m_timefin is null or @m_timefin='--:--'
	     begin
	     update tb_transSummey set m_timefin=@fin,m_timefout=@fin  where  m_date=@m_date and m_id=@m_id 
	     end  -- if @m_timefin is null or @m_timefin='--:--'
	     else if @m_timefout is null or @m_timefout='--:--'
	      begin
	        update tb_transSummey set m_timefout=@m_timefin  where  m_date=@m_date and m_id=@m_id 
	     end  --  if @m_timefout is null or @m_timefout='--:--'
				end
	  end --if @exc_type=2
	end  -- if (@sid IS NOT NULL)
	end --if @ApprovalType = 'EAS02'
	---------------------
	IF @m_id IS NOT NULL
		EXEC sprecalculatetranssummery @m_id
			,@m_date
			,NULL
			,NULL
			,0
	COMMIT TRAN TAupdateexecuse
	EXEC SendNoficationForExecuseApprove @exc_id
		,@emp_id
		,@empname
		,@ApprovalType
	EXEC spsaveuserlog 1
		,@exc_id
		,2
		,@UserName
		,1
		,@empname
		,NULL
END


















GO
-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-01-26>
-- Description:	<Employee update Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spmoveemployeesection] @employees VARCHAR(max)
	,@emp_sectionID INT
	,@username NVARCHAR(200)
AS
BEGIN
	DECLARE @text NVARCHAR(max)
	DECLARE @sec_schID INT
	SELECT @sec_schID = sec_sch
	FROM tb_section emp_section
	WHERE sec_ID = @emp_sectionID
	SET @text = 'update tb_employee set emp_section= ' + cast(@emp_sectionID AS VARCHAR(10)) + ',emp_sch = ' + cast(@sec_schID AS VARCHAR(10)) + ' where emp_id in (' + @employees + ')'
	EXEC (@text)
	SET @text = 'select emp_name from tb_employee where emp_id in (' + @employees + ')'
	CREATE TABLE #tbl (
		id INT identity(1, 1)
		,emp_name NVARCHAR(250)
		)
	DECLARE @textInsert NVARCHAR(max)
	SET @textInsert = 'Insert into #tbl(emp_name)  ' + @text
	EXEC (@textInsert)
	DECLARE @index INT
		,@count INT
		,@emp_names NVARCHAR(max)
	SET @index = 1
	SET @count = (
			SELECT COUNT(1)
			FROM #tbl
			)
	SET @emp_names = ''
	--SELECT @index
	--	,@count
	WHILE @index <= @count
	BEGIN
		SET @emp_names = @emp_names + (
				SELECT emp_name
				FROM #tbl
				WHERE id = @index
				) + ' , '
		SET @index = @index + 1
	END
	DECLARE @sectionName NVARCHAR(200)
	SET @sectionName = (
			SELECT TOP 1 sec_Name
			FROM tb_section
			WHERE sec_ID = @emp_sectionID
			)
	DECLARE @arabicdesc NVARCHAR(max)
	SET @arabicdesc = (N'تم نقل الموظفين   ' + @emp_names + N' الى قسم ' + isnull(@sectionName, '') + N' من قبل الموظف ' + @username)
	DECLARE @englishdesc NVARCHAR(max)
	SET @englishdesc = (N'employees     ' + @emp_names + N' moved to ' + isnull(@sectionName, '') + N' by ' + @username)
	EXEC spsaveuserlog 10
		,@emp_sectionID
		,4
		,@UserName
		,0
		,NULL
		,NULL
		,@arabicdesc
		,@englishdesc
	DROP TABLE #tbl
END
	/****** Object:  StoredProcedure [dbo].[spinsertuser]    Script Date: 05/29/2009 13:21:13 ******/
	-- SET ANSI_NULLS ON


















GO
CREATE PROCEDURE [dbo].[spmovesection]
		 @sec_id int
        ,@sec_Parent int
        ,@sec_Name  nvarchar(250)
		,@UserName	nvarchar(250)
AS
declare @level int
BEGIN
UPDATE [dbo].[tb_section]
   SET [sec_Parent] = @sec_Parent
 WHERE sec_id=@sec_id
 update [dbo].[tb_section] 
    set  sec_path = dbo.ufn_GetParentPath(tb_section.sec_ID)
        ,sec_Level =dbo.ufn_GetParentLevel(tb_section.sec_ID)
        where sec_id >= 1
 declare @currentdate int
set @currentdate=dbo.getnofromdate(getdate())						
exec spsaveuserlog 4,@sec_id,2,@UserName,0,@sec_Name,@currentdate 
END



















GO
CREATE PROCEDURE [dbo].[sprecalculatetranssummery] (
	@m_id BIGINT,
	@m_date BIGINT,
	@m_timefin VARCHAR(10) = NULL,
	@m_timefout VARCHAR(10) = NULL,
	@m_manual BIT = 0
	)
AS
BEGIN
	DECLARE @sid INT,
		@m_actualtime NVARCHAR(5),
		@m_empid BIGINT,
		@isManual BIT
	SELECT @m_empid = emp_id
	FROM tb_employee
	WHERE emp_card = @m_id
	SELECT @sid = dbo.GeatSchedualID(@m_empid, @m_date)
	SET @m_actualtime = dbo.GetActualTime(@m_empid, @sid, @m_date)
	IF @m_timefin IS NULL OR @m_timefout IS NULL
		SELECT @m_timefin = m_timefin,
			@m_timefout = m_timefout,
			@isManual = m_manual
		FROM tb_transSummey
		WHERE m_date = @m_date AND m_id = @m_id
	ELSE
		SELECT @isManual = m_manual
		FROM tb_transSummey
		WHERE m_date = @m_date AND m_id = @m_id
	IF @isManual = 1
		SET @m_manual = 1
	UPDATE tb_transSummey
	SET m_vac_id = dbo.HasVacation(@m_empid, @m_date),
		m_exc_id = dbo.HasExecuse(@m_empid, @m_date)
	WHERE m_date = @m_date AND m_id = @m_id
	IF @m_timefin IS NULL AND @m_timefout IS NULL
		RETURN
	DECLARE @shift_withbreak BIT,
		@shift_fbreak VARCHAR(5),
		@shift_tbreak VARCHAR(5)
	SELECT @shift_withbreak = shift_withbreak,
		@shift_fbreak = shift_fbreak,
		@shift_tbreak = shift_tbreak
	FROM tb_shift
	WHERE shift_id = @sid
	DECLARE @TimeTotal VARCHAR(5)
	IF isnull(@shift_withbreak,0) = 0
		SET @TimeTotal = CASE 
				WHEN left(@m_timefin, 5) = N'--:--' OR left(@m_timefout, 5) = N'--:--'
					THEN N'00:00'
				ELSE ISNULL(dbo.GetTimeTotal(@m_timefin, @m_timefout), N'00:00')
				END
	ELSE
		SET @TimeTotal = CASE 
				WHEN left(@m_timefin, 5) = N'--:--' OR left(@m_timefout, 5) = N'--:--'
					THEN N'00:00'
				ELSE ISNULL(dbo.GetTimeTotalWithBreak(@m_timefin, @m_timefout, @shift_fbreak, @shift_tbreak), N'00:00')
				END
	--select @TimeTotal,@sid,@m_actualtime
	DECLARE @tTimeTotal AS VARCHAR(5)
	IF @m_timefin = '--:--' OR @m_timefout = '--:--'
		SET @tTimeTotal = NULL
	ELSE
		SET @tTimeTotal = dbo.GetTimeTotal(@m_timefin, @m_timefout)
	IF @tTimeTotal IS NULL
	BEGIN
		UPDATE tb_transSummey
		SET m_timetotal = N'00:00',
			m_overtime = N'00:00',
			m_totallate = N'--:--',
			m_earlyout = N'--:--',
			m_latein = CASE 
				WHEN left(@m_timefin, 5) = N'--:--'
					THEN N'--:--'
				ELSE ISNULL(dbo.GeatLateIn(@m_empid, @sid, @m_date, @m_timefin), N'--:--')
				END,
			m_actualtime = @m_actualtime,
			m_manual = @m_manual
		--m_vac_id = dbo.HasVacation(@m_empid, @m_date),
		--m_exc_id=dbo.HasExecuse(@m_empid, @m_date)
		WHERE m_date = @m_date AND m_id = @m_id
	END
	ELSE
	BEGIN
		DECLARE @LateIn NVARCHAR(12),
			@EarlyOut NVARCHAR(12),
			@TotalLate NVARCHAR(12)
		SET @EarlyOut = ISNULL(dbo.GeatEarlyOut(@m_empid, @sid, @m_date, @m_timefin, @m_timefout), N'--:--')
		SET @LateIn = ISNULL(dbo.GeatLateIn(@m_empid, @sid, @m_date, @m_timefin), N'--:--')
		SET @TotalLate = dbo.GetSumTimeTotal(@LateIn, @EarlyOut)
		------------------
		IF @TotalLate IS NOT NULL AND @TotalLate <> '--:--'
		BEGIN
			IF DATEDIFF(minute, @TotalLate, @m_actualtime) < 0
			BEGIN
				SET @TotalLate = @m_actualtime
			END
		END
		-------------------
		-----------Violation مخالفة ----------
		--SET @TimeTotal = dbo.GetTimeSubtractViolation(@TimeTotal, @m_id, @m_date)
		----------------------------------------
		UPDATE tb_transSummey
		SET m_timetotal = @TimeTotal,
			m_overtime = CASE 
				WHEN left(@m_timefout, 5) = N'--:--'
					THEN N'--:--'
				ELSE ISNULL(dbo.GetTimeOver(@m_id, @sid, @m_date, @m_timefin, @m_timefout, @m_actualtime, @TimeTotal), N'--:--')
				END,
			m_totallate = dbo.ApplayExecuseHours(@m_empid, @m_date, @sid, @TotalLate, @TimeTotal),
			m_earlyout = CASE 
				WHEN left(@m_timefout, 5) = N'--:--'
					THEN N'--:--'
				ELSE @EarlyOut
				END,
			m_latein = @LateIn,
			m_actualtime = @m_actualtime,
			m_manual = @m_manual
		--m_vac_id = dbo.HasVacation(@m_empid, @m_date),
		--m_exc_id=dbo.HasExecuse(@m_empid, @m_date)
		WHERE m_date = @m_date AND m_id = @m_id
	END
	IF @m_date < dbo.getnofromdate(getdate())
	BEGIN
		SET @m_date = @m_date + 1
		EXEC spUpdateIncomplete @m_id,
			@m_date
	END
END












GO
CREATE PROCEDURE [dbo].[sprecalculatetranssummery_Period] (
    @m_empid BIGINT
    ,@f_date BIGINT
    ,@T_date BIGINT
    )
AS
BEGIN
    DECLARE @sid INT
           ,@m_actualtime NVARCHAR(5)
           ,@m_date BIGINT
           ,@m_timefin VARCHAR(12)
           ,@m_timefout VARCHAR(12)
           ,@m_id INT
    IF @m_empid IS NULL
        RETURN
    SELECT @m_id = emp_card
    FROM tb_employee
    WHERE emp_id = @m_empid
    SET @m_date = @f_date
    IF ISNULL((SELECT cast(value as int) from  tb_setting where SettingID=6),1) > 1
    BEGIN
		WHILE @m_date <= (@T_date + 1)
		BEGIN
		exec sprecalculatetranssummery_twoshifts   @m_id,@m_date
			SET @m_date = @m_date + 1
		END
	END
	ELSE
	 BEGIN
		WHILE @m_date <= (@T_date + 1)
		BEGIN
		exec sprecalculatetranssummery   @m_id,@m_date
			SET @m_date = @m_date + 1
		END
	END
END


















GO
CREATE PROCEDURE [dbo].[sprecalculatetranssummery_twoshifts] (
	 @m_id BIGINT
	,@m_date BIGINT
	,@m_manual BIT = 0
	,@m_empid BIGINT=NULL
	,@shiftID INT=NULL
	,@m_actualtime varchar(5)=NULL
	,@twoshifts bit = null )
AS
BEGIN
  DECLARE @m_flatein  varchar(12),@m_slatein  varchar(12)
	     ,@m_fearlyout  varchar(12),@m_searlyout  varchar(12)
	     ,@m_fOverTime   varchar(12), @m_sOverTime   varchar(12)  
		 ,@m_timefin VARCHAR(10),@m_timefout VARCHAR(10)
		 ,@m_timesin VARCHAR(10),@m_timesout VARCHAR(10)
	if @m_empid is null
	begin
		SELECT @m_empid = emp_id
		FROM tb_employee
		WHERE emp_card = @m_id
	end
	if @shiftID is null
	begin
		SELECT @shiftID = dbo.GeatSchedualID(@m_empid, @m_date)
	end
	if @m_actualtime is null
	begin
		SET @m_actualtime = dbo.GetActualTime(@m_empid, @shiftID, @m_date)
	end
            SELECT   @m_timefin  = m_timefin
					,@m_timefout = m_timefout
					,@m_timesin  = m_timesin
					,@m_timesout = m_timesout
			FROM tb_transSummey
			WHERE m_date = @m_date
				AND m_id = @m_id
	IF @m_timefin IS NULL
		AND @m_timefout IS NULL
		   AND @m_timesin IS NULL
		     AND @m_timesout IS NULL
		RETURN
		if @twoshifts is null
		begin
		  select @twoshifts=shift_twoshifts  from tb_shift  where shift_id=@shiftID
		end
     	DECLARE @TimeTotal VARCHAR(5)
	IF @twoshifts = 0
		SET @TimeTotal = CASE 
				WHEN left(@m_timefin, 5) = N'--:--'
					OR left(@m_timefout, 5) = N'--:--'
					THEN N'00:00'
				ELSE ISNULL(dbo.GetTimeTotal(@m_timefin, @m_timefout), N'00:00')
			   END	   
	ELSE
		SET @TimeTotal = CASE 
				WHEN (left(@m_timefin, 5) = N'--:--' OR left(@m_timefout, 5) = N'--:--') and  ( left(@m_timesin, 5)='--:--' or  left(@m_timesout, 5) ='--:--')
					THEN N'00:00'
		   ELSE ISNULL(dbo.GetTimeTotalTowShifts(@m_timefin, @m_timefout, @m_timesin, @m_timesout), N'00:00')
	END
        declare @tTimeTotal as VARCHAR(5)
		 if ((@m_timefin='--:--' or @m_timefout ='--:--') and @twoshifts = 0)  
		 OR (( (@m_timefin='--:--' or @m_timefout ='--:--') and  (@m_timesin='--:--' or @m_timesout ='--:--')) and @twoshifts = 1)
		  begin
		  set @tTimeTotal = null
		  end
		 else 
		   begin
		     IF @twoshifts = 0
		     set @tTimeTotal =dbo.GetTimeTotal(@m_timefin, @m_timefout)
		     else
		     set @tTimeTotal =dbo.GetTimeTotalTowShifts(@m_timefin, @m_timefout, @m_timesin, @m_timesout)
	       end
	IF @tTimeTotal  is  null 
	BEGIN
	     SET @m_flatein =case when left(@m_timefin, 5) = N'--:--' then  N'--:--' else  ISNULL(dbo.GeatLateInTwoShifts(@m_empid, @shiftID, @m_date, @m_timefin,1,@m_id), N'--:--') end    
	     SET @m_slatein =case when left(@m_timesin, 5) = N'--:--' or @twoshifts =0 then  N'--:--' else  ISNULL(dbo.GeatLateInTwoShifts(@m_empid, @shiftID, @m_date, @m_timesin,3,@m_id), N'--:--') end    
		UPDATE tb_transSummey
		SET  m_timetotal = N'00:00'
			,m_overtime =  N'00:00'
			,m_totallate = N'--:--'
			,m_flatein = @m_flatein
			,m_slatein = @m_slatein
            ,m_latein =  dbo.GetSumTimeTotal(@m_flatein,@m_slatein)
			,m_fearlyout = N'--:--'
			,m_searlyout = N'--:--'
			,m_earlyout = N'--:--'
			,m_actualtime = @m_actualtime
			,m_manual = @m_manual
			,m_vac_id=dbo.HasVacation(@m_empid,@m_date)
		WHERE m_date = @m_date
			AND m_id = @m_id
	END
	ELSE
	BEGIN	
	    Declare @LateIn nvarchar(12),@EarlyOut nvarchar(12),@TotalLate nvarchar(12),@OverTime nvarchar(12)
		 SET @m_flatein =case when left(@m_timefin, 5) = N'--:--' then  N'--:--' else  ISNULL(dbo.GeatLateInTwoShifts(@m_empid, @shiftID, @m_date, @m_timefin,1,@m_id), N'--:--') end    
	     SET @m_slatein =case when left(@m_timesin, 5)  = N'--:--'  or @twoshifts =0 then  N'--:--' else  ISNULL(dbo.GeatLateInTwoShifts(@m_empid, @shiftID, @m_date, @m_timesin,3,@m_id), N'--:--') end    		
		 SET @LateIn =dbo.GetSumTimeTotal(@m_flatein,@m_slatein)
		 SET @m_fearlyout =case when left(@m_timefout, 5) = N'--:--' then  N'--:--' else ISNULL(dbo.GeatEarlyOutTwoShifts(@m_empid, @shiftID, @m_date, @m_timefout,1), N'--:--') end
	     SET @m_searlyout =case when left(@m_timesout, 5)  = N'--:--' or @twoshifts =0 then  N'--:--' else ISNULL(dbo.GeatEarlyOutTwoShifts(@m_empid, @shiftID, @m_date, @m_timesout,3), N'--:--') end
		 SET @EarlyOut =dbo.GetSumTimeTotal(@m_fearlyout,@m_searlyout)	
	     set @TotalLate= dbo.GetSumTimeTotal(@LateIn,@EarlyOut)
	     set @m_fOverTime = case when left(@m_timefout, 5) = N'--:--' then  N'--:--' else ISNULL(dbo.GetTimeOverTwoShifts(@m_id, @shiftID, @m_date,@m_timefin,@m_timefout, @TimeTotal,2), N'--:--') end
	     set @m_sOverTime = case when left(@m_timesout, 5) = N'--:--'  or @twoshifts =0 then  N'--:--' else ISNULL(dbo.GetTimeOverTwoShifts(@m_id, @shiftID, @m_date,@m_timesin,@m_timesout, @TimeTotal,4), N'--:--') end
         SET @OverTime= dbo.GetSumTimeTotal(@m_fOverTime,@m_sOverTime)
	  if @TotalLate is not null and @TotalLate <> '--:--'
	  begin
	     if DATEDIFF(minute, @TotalLate, @m_actualtime) < 0
	     begin
	       set @TotalLate=@m_actualtime
	     end
	  end
		UPDATE tb_transSummey
		SET m_timetotal = @TimeTotal
			,m_overtime = @OverTime
			,m_totallate = dbo.ApplayExecuseTowShifts(@m_empid,@m_date,@shiftID, @TotalLate) 
			,m_fearlyout = @m_fearlyout 
			,m_searlyout = @m_searlyout
			,m_earlyout  = @EarlyOut
			,m_flatein = @m_flatein
			,m_slatein = @m_slatein
			,m_latein = @LateIn
			,m_actualtime = @m_actualtime
			,m_manual = @m_manual
			,m_vac_id=dbo.HasVacation(@m_empid,@m_date)
		WHERE m_date = @m_date
			AND m_id = @m_id
	END
	if @m_date <dbo.getnofromdate (getdate())
	begin
	set @m_date= @m_date +1
	exec spUpdateIncomplete_twoshifts @m_id,@m_date,@shiftID
	end
END


















GO
CREATE PROCEDURE [dbo].[spregeneratetranssummery] (
	@m_id BIGINT
	,@m_date BIGINT
	,@manual bit=0
	)
AS
BEGIN
	DECLARE @Mintrans_id BIGINT
		,@Maxtrans_id BIGINT
		,@Min_Time VARCHAR(8)
		,@Max_Time VARCHAR(8)
	DECLARE @Count INT
	SET @Count = (
			SELECT COUNT(1)
			FROM [tb_trans]
			WHERE m_date = @m_date
				AND m_id = @m_id
				AND m_deleted = 0
			)
	IF @Count = 0
	BEGIN
		UPDATE tb_transSummey
		SET m_timefin = N'--:--'
			,m_timefout = N'--:--'
			,m_manual=case when m_manual=0 then @manual else 1 end
		WHERE m_date = @m_date
			AND m_id = @m_id
	END
	ELSE
		IF @Count = 1
		BEGIN
			SELECT @Min_Time = m_time
			FROM [tb_trans]
			WHERE m_date = @m_date
				AND m_id = @m_id
				AND m_deleted = 0
			UPDATE tb_transSummey
			SET m_timefin = @Min_Time
				,m_timefout = N'--:--'
				,m_manual=case when m_manual=0 then @manual else 1 end
			WHERE m_date = @m_date
				AND m_id = @m_id
		END
		ELSE
		BEGIN
			SELECT @Min_Time = cast(min(DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(isnull(acc_date, m_date))), cast(m_time AS DATETIME))) AS TIME),
			@Max_Time =cast(max(DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(isnull(acc_date, m_date))), cast(m_time AS DATETIME))) AS TIME)
			FROM [tb_trans]
			WHERE m_date = @m_date
				AND m_id = @m_id
				AND m_deleted = 0 and m_status=1
			if @Min_Time=@Max_Time
			set @Max_Time='--:--'
			UPDATE tb_transSummey
			SET m_timefin = @Min_Time
				,m_timefout = @Max_Time
				,m_manual=case when m_manual=0 then @manual else 1 end
			WHERE m_date = @m_date
				AND m_id = @m_id
		END
	EXEC dbo.sprecalculatetranssummery @m_id
		,@m_date
		,NULL
		,NULL
		,@manual
END















GO

-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-01-26>
-- Description:	<Section Insert Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spsaveorganization] @org_name NVARCHAR(250)
	,@org_logo IMAGE = NULL
	,@org_Shifts INT = 1
	,@CalType CHAR(1) = 'G'
AS
BEGIN
	IF NOT EXISTS (
			SELECT 1
			FROM tb_organization
			)
	BEGIN
		BEGIN
			INSERT INTO tb_organization (
				NAME
				,logo
				,CalType
				)
			SELECT @org_name
				,@org_logo
				,@CalType
		END
	END
	ELSE
	BEGIN
		IF (@org_logo IS NULL)
			UPDATE tb_organization
			SET NAME = @org_name
				,CalType = @CalType
		ELSE
			UPDATE tb_organization
			SET NAME = @org_name
				,CalType = @CalType
				,logo = @org_logo
	END

	UPDATE tb_setting
	SET Value = @org_Shifts
	WHERE SettingID = 6

	RETURN 1
END













GO
CREATE PROCEDURE [dbo].[spsavetranssummery] (
	@m_id BIGINT,
	@m_time AS NVARCHAR(12),
	@m_date BIGINT,
	@m_empid BIGINT = NULL,
	@m_manual BIT = 0
	)
AS
BEGIN
	DECLARE @m_timefin VARCHAR(12),
		@sid INT,
		@TransID BIGINT
	EXEC @TransID = spinsertTotransSummey @m_id = @m_id,
		@m_date = @m_date,
		@emp_id = @m_empid,
		@sid = NULL,
		@ftime = @m_time,
		@ttime = NULL,
		@m_manual = @m_manual
	IF @TransID > 0
		EXEC spregeneratetranssummery @m_id,
			@m_date,
			@m_manual
END














GO
CREATE PROCEDURE [dbo].[spsavetranssummery_twoshifts] 
						(@m_id BIGINT
						,@m_time AS NVARCHAR(12)
						,@m_date BIGINT
						,@m_cvcode INT
						,@m_manual BIT = 0
						,@m_empid BIGINT = NULL
						,@trans_id BIGINT = NULL)
AS
BEGIN
		Declare @LateIn nvarchar(12),
		        @EarlyOut nvarchar(12),
		        @TotalLate nvarchar(12),
		        @OverTime nvarchar(12),
		        @m_timein  nvarchar(12),
		        @m_savedtime  nvarchar(12),
		        @twoshifts bit,
		        @dorecalculate bit =0
	    IF @m_empid IS NULL
		SELECT @m_empid = emp_id
		FROM tb_employee
		WHERE emp_card = @m_id
    	DECLARE @shiftID INT
		SET @shiftID = dbo.GeatSchedualID(@m_empid, @m_date)
        IF @m_cvcode in(3,4)
         BEGIN
          select @twoshifts=shift_twoshifts from tb_shift where shift_id=@shiftID
         END
----------Generate Row IF NOT EXISTS------------				
	IF NOT EXISTS (SELECT 1
				   FROM tb_transSummey
				   WHERE m_date = @m_date
				   AND m_id = @m_id)
	BEGIN
		INSERT INTO tb_transSummey
		 ([m_id]
           ,[m_date]
           ,[m_timefin]
           ,[m_timefout]
           ,[m_timetotal]
           ,[m_actualtime]
           ,[m_latein]
           ,[m_overtime]
           ,[m_totallate]
           ,[m_earlyout]
           ,[m_deleted]
           ,[m_manual]
           ,[m_overtimein]
           ,[m_overtimeOut]
           ,[m_shiftid]
           ,[m_timesin]
           ,[m_timesout]
           ,[m_flatein]
           ,[m_slatein]
           ,[m_fearlyout]
           ,[m_searlyout]
           ,[m_lastcvcode]
           ,[m_vac_id]
           ,[m_exc_id])
		SELECT @m_id
			  ,@m_date
			  ,N'--:--'
			  ,N'--:--'
			  ,N'--:--'
			  ,ISNULL(dbo.GetActualTime(@m_empid, @shiftID, @m_date), N'00:00')
			  ,N'--:--'
			  ,N'--:--'
			  ,N'--:--'
			  ,N'--:--'
			  ,0
			  ,0
			  ,N'--:--'
			  ,N'--:--'
			  ,@shiftID
			  ,N'--:--'
			  ,N'--:--'
			  ,N'--:--'
			  ,N'--:--'
			  ,N'--:--'
			  ,N'--:--'
			  ,1
			  ,dbo.HasVacation(@m_empid,@m_date)
			  ,dbo.HasExecuse (@m_empid,@m_date)
	END
      ----------------------------------------------------	
      ---- IF @trans_id IS NOT NULL   mean get from insert 
	IF @m_cvcode=1
	  BEGIN  
	     SELECT @m_savedtime=m_timefin FROM tb_transSummey  WHERE m_date=@m_date and m_id=@m_id
	      IF @m_savedtime IS NULL OR @m_savedtime ='--:--'  OR @m_manual = 1    
			 BEGIN  
			   	 SET  @dorecalculate = 1
				 update tb_transSummey 
   				 set m_timefin=@m_time 
					,m_lastcvcode=@m_cvcode
   				 where m_date=@m_date and m_id=@m_id
   				  IF @trans_id IS NOT NULL
				   BEGIN  
   					 Update tb_trans 
   					 set  m_deleted=1 
   					 where m_id=@m_id 
   					   and m_date=@m_date 
   					   and CV_CODE=@m_cvcode 
   					   and m_deleted=0 
   					   and trans_id <> @trans_id 
   				   END
   			 END
          ELSE
   			 BEGIN
   		 		IF @trans_id IS NOT NULL  Update tb_trans set  m_deleted=1 where  trans_id = @trans_id
   		  	 END
	   END
	 ELSE  IF @m_cvcode=2
	 BEGIN
	      SET  @dorecalculate = 1
	     update tb_transSummey 
   	     set m_timefout=@m_time
   	        ,m_lastcvcode=@m_cvcode 
   	     where m_date=@m_date and m_id=@m_id  
		 IF @trans_id IS NOT NULL
			BEGIN  
   				Update tb_trans 
   				 set  m_deleted=1 
   				 where m_id=@m_id 
   				   and m_date=@m_date 
   				   and CV_CODE=@m_cvcode 
   				   and m_deleted=0 
   				   and trans_id <> @trans_id 
   		    END	 
   	END
	 ELSE  IF @m_cvcode=3 AND @twoshifts=1
	 BEGIN
	    SELECT @m_savedtime=m_timesin FROM tb_transSummey  WHERE m_date=@m_date and m_id=@m_id
       IF @m_savedtime IS NULL OR @m_savedtime ='--:--'  OR @m_manual = 1    
	       BEGIN-----1-------
				   SET  @dorecalculate = 1
				   update tb_transSummey 
   					 set  m_timesin=@m_time 
						 ,m_lastcvcode=@m_cvcode
   					where m_date=@m_date and m_id=@m_id 
   					IF @trans_id IS NOT NULL
					 BEGIN-----2-------
   						 Update tb_trans 
   						 set  m_deleted=1 
   						 where m_id=@m_id 
   							 and m_date=@m_date 
   							 and CV_CODE=@m_cvcode 
   							 and m_deleted=0 
   							 and trans_id <> @trans_id 
   					  END-----2-------
   	 	     END-----1-------
   		  ELSE
   			  BEGIN
   		  		 IF @trans_id IS NOT NULL  Update tb_trans set  m_deleted=1 where  trans_id = @trans_id
   			  END
	 END
	 ELSE  IF @m_cvcode=4 AND @twoshifts=1
	 BEGIN
	      SET  @dorecalculate = 1
		  update tb_transSummey 
   			 set m_timesout=@m_time 
   				,m_lastcvcode=@m_cvcode
   		   where m_date=@m_date and m_id=@m_id 
   		    IF @trans_id IS NOT NULL
			   BEGIN
   				 Update tb_trans 
   				 set  m_deleted=1 
   				 where m_id=@m_id 
   				 and m_date=@m_date 
   				 and CV_CODE=@m_cvcode 
   				 and m_deleted=0 
   				 and trans_id <> @trans_id 
   			  END 
	 END
	  IF @dorecalculate=1 exec dbo.sprecalculatetranssummery_twoshifts  @m_id,@m_date,@m_manual,@m_empid,@shiftID
END -- en sp


















GO
CREATE PROCEDURE [dbo].[spsaveuserlog] (
	@logtype INT
	,@operationid INT
	,@operationtype INT
	,@username NVARCHAR(100)
	,@foremp BIT
	,@name NVARCHAR(100)
	,@operationDate INT = NULL
	,@arabicdescription NVARCHAR(max) = NULL
	,@englishdescription NVARCHAR(max) = NULL
	,@oldvalue NVARCHAR(max) = NULL
	,@newvalue NVARCHAR(max) = NULL
	)
AS
BEGIN
if isnull(@username,'')='' or @username=N'SystemDB'
return;

	IF @arabicdescription IS NULL
	BEGIN
		DECLARE @operationtypeArabicDesc NVARCHAR(50)
		SET @operationtypeArabicDesc = (
				CASE 
					WHEN @operationtype = 1
						THEN N'حذف '
					WHEN @operationtype = 2
						THEN N'تحديث '
					WHEN @operationtype = 3
						THEN N'إضافة '
					WHEN @operationtype = 4
						THEN N'نقل '
					END
				)
		DECLARE @logtypeArabicDesc NVARCHAR(200)
		SET @logtypeArabicDesc = (
				SELECT AType
				FROM tb_logType
				WHERE id = @logtype
				)
		DECLARE @empNameADesc NVARCHAR(100)
		SET @empNameADesc = CASE 
				WHEN @name IS NOT NULL
					THEN CASE 
							WHEN @foremp = 1
								THEN N' للموظف ' + @name
							ELSE @Name
							END
				END
		DECLARE @operationDateADesc NVARCHAR(100)
		SET @operationDateADesc = CASE 
				WHEN @operationDate IS NOT NULL
					THEN N'للتاريخ ' + dbo.GetDateAsString(@operationDate)
				END
		DECLARE @ChangeA NVARCHAR(250)
		SET @ChangeA = CASE 
				WHEN @oldvalue IS NOT NULL
					AND @newvalue IS NOT NULL
					THEN N' التحديث على  ' + @oldvalue + N' إلى ' + @newvalue
				ELSE ''
				END
		DECLARE @usernameAdesc NVARCHAR(100)
		SET @usernameAdesc = CASE 
				WHEN @username IS NOT NULL
					THEN N' بواسطة ' + @username
				END
									 
		SET @arabicdescription = ISNULL(@operationtypeArabicDesc, N'') + N' ' + ISNULL(@logtypeArabicDesc, N'') + N' ' + ISNULL(@empNameADesc, N'') + N' ' + ISNULL(@operationDateADesc, N'') + N' ' + ISNULL(@ChangeA, N'') + ISNULL(@usernameAdesc, N'') + N' '
			
	END
	IF @englishdescription IS NULL
	BEGIN
		DECLARE @operationtypeEnglishDesc NVARCHAR(50)
		SET @operationtypeEnglishDesc = (
				CASE 
					WHEN @operationtype = 1
						THEN N'delete'
					WHEN @operationtype = 2
						THEN N'update'
					WHEN @operationtype = 3
						THEN N'add'
					WHEN @operationtype = 4
						THEN N'move'
					END
				)
		DECLARE @logtypeEnglishDesc NVARCHAR(50)
		SET @logtypeEnglishDesc = (
				SELECT EType
				FROM tb_logType
				WHERE id = @logtype
				)
		DECLARE @empNameEDesc NVARCHAR(100)
		SET @empNameEDesc = CASE 
				WHEN @name IS NOT NULL
					THEN CASE 
							WHEN @foremp = 1
								THEN N'for employee ' + @name
							ELSE @Name
							END
				END
		DECLARE @operationDateEDesc NVARCHAR(100)
		SET @operationDateEDesc = CASE 
				WHEN @operationDate IS NOT NULL
					THEN N'have date ' + dbo.GetDateAsString(@operationDate)
				END
		DECLARE @ChangeE NVARCHAR(250)
		SET @ChangeE = CASE 
				WHEN @oldvalue IS NOT NULL
					AND @newvalue IS NOT NULL
					THEN N' update is ' + @oldvalue + N' to ' + @newvalue
				ELSE ''
				END
		DECLARE @usernameEdesc NVARCHAR(100)
		SET @usernameEdesc = CASE 
				WHEN @username IS NOT NULL
					THEN N' by ' + @username
				END
		---Declare @CreatedDateEDesc 	nvarchar(100) = N'at ' + convert(varchar(10),getdate(),103 )									 
		SET @englishdescription = ISNULL(@operationtypeEnglishDesc, '') + ' ' + ISNULL(@logtypeEnglishDesc, '') + ' ' + ISNULL(@empNameEDesc, '') + ' ' + ISNULL(@operationDateEDesc, '') + ' ' + ISNULL(@ChangeE, '') + ' ' + ISNULL(@usernameEdesc, '') + ' '
			-- ISNULL(@CreatedDateEDesc,'')
	END
	INSERT INTO tb_userlog (
		logtype
		,operationid
		,operationtype
		,username
		,arabicdescription
		,englishdescription
		)
	SELECT @logtype
		,@operationid
		,@operationtype
		,@username
		,@arabicdescription
		,@englishdescription
END


















GO
CREATE PROCEDURE [dbo].[spscheduledelete] @sch_id INT
	,@UserName NVARCHAR(250)
AS
BEGIN
	IF (
			SELECT count(emp_sch)
			FROM tb_employee
			WHERE emp_sch = @sch_id
			) > 0
		RETURN - 2 --هناك موظفين على الجدول المراد حذفه

	IF (
			SELECT count(1)
			FROM tb_section
			WHERE sec_sch = @sch_id
			) > 0
		RETURN - 3 -- هناك أقسام مرتبطة بالجدول المراد حذفه

	IF (
			SELECT count(1)
			FROM tb_schGroup
			WHERE sch_id = @sch_id and schGroup_deleted =0
			) > 0
		RETURN - 4 --هناك مجموعات مرتبطة بالجدول المراد حذفه

	DECLARE @sch_name NVARCHAR(250)
		,@sch_oneshift BIT
		,@sch_desc NVARCHAR(max)
		,@sch_1 INT
		,@sch_2 INT
		,@sch_3 INT
		,@sch_4 INT
		,@sch_5 INT
		,@sch_6 INT
		,@sch_7 INT
		,@sch_delete BIT

	SELECT @sch_name = sch_name
		,@sch_oneshift = sch_oneshift
		,@sch_desc = sch_desc
		,@sch_1 = sch_1
		,@sch_2 = sch_2
		,@sch_3 = sch_3
		,@sch_4 = sch_4
		,@sch_5 = sch_5
		,@sch_6 = sch_6
		,@sch_7 = sch_7
		,@sch_delete = 1
	FROM tb_schedule
	WHERE sch_id = @sch_id

	EXEC spupdateschedule @sch_id
		,@sch_name
		,@sch_oneshift
		,@sch_desc
		,@sch_1
		,@sch_2
		,@sch_3
		,@sch_4
		,@sch_5
		,@sch_6
		,@sch_7
		,@sch_delete
		,@UserName

	RETURN 1
END

















GO

CREATE PROCEDURE [dbo].[spsearchExecuse] @exc_fdate INT
	,@exc_tdate INT
	,@exc_type INT = NULL
	,@exc_empid INT = NULL
	,@exc_secid INT = NULL
	,@exc_RegID BIGINT = NULL
	,@username NVARCHAR(100) = NULL
AS
BEGIN
	SELECT Emp.emp_no ,Emp.emp_name
		,execuse.exc_id
		,dbo.GetDateAsString(execuse.exc_date) AS exc_date
		,execuse.exc_date AS exc_dateNo
		,execuse.exc_ftime
		,execuse.exc_ttime
		,execuse.exc_reason
		,execuse.exc_deleted
		,execuse.exc_status
		--,execuse.exc_type 
		,tb_execuseReason.exc_type
		,dbo.GetDateAsString(execuse.exc_date) AS exc_date_h
		,dbo.tb_execuseReason.execuseReason_id
		,dbo.tb_execuseReason.execuseReason_name
		,execuse.exc_hours
		,execuse.exc_minuts
		,execuse.Created
		,execuse.Updated
		,execuse.ApprovalByManager
		,execuse.exc_empid 
		,x.Section_Name  sec_Name
		,x.SortKey 
		,X.sec_ID
		,reg_id
		,reg_name
	FROM dbo.tb_execuse execuse
	INNER JOIN dbo.tb_employee Emp
		ON Emp.emp_id = execuse.exc_empid
		INNER JOIN dbo.GetSectionHierarchy() X
		ON X.sec_ID = emp.emp_section
	INNER JOIN [dbo].[GetEmployeeByUserRegion](@username) empreg
		ON execuse.exc_empid = empreg.emp_id
	Inner JOIN dbo.tb_execuseReason
		ON execuse.execuseReason_ID = dbo.tb_execuseReason.execuseReason_id
	Inner join tb_Regions on emp_region=tb_Regions.reg_id 
	WHERE (
			execuse.exc_date BETWEEN @exc_fdate
				AND @exc_tdate
			) AND (tb_execuseReason.execuseReason_id = @exc_type OR @exc_type IS NULL) 
			 AND (@exc_empid IS NULL OR exc_empid = @exc_empid) AND (
			@exc_secid IS NULL OR X.sec_ID IN (
				SELECT sec_id
				FROM dbo.GetSectionUnderManager('', @exc_secid)
				)
			) AND (@exc_RegID IS NULL OR Emp.emp_region = @exc_RegID)
			AND (execuse.exc_deleted = 0) AND (Emp.emp_deleted = 0)
			ORDER BY exc_dateNo
	--	,X.SortKey
		,emp_no
END















GO

CREATE PROCEDURE [dbo].[spsearchVacations] @vac_fdate INT
	,@vac_tdate INT
	,@vac_type INT = NULL
	,@vac_empid INT = NULL
	,@vac_secid INT = NULL
	,@vac_RegID BIGINT = NULL
	,@username NVARCHAR(100) = NULL
AS
BEGIN
	SELECT [emp_name]
		,[vac_id]
		,ISNULL(vac.vac_HRTransName, vacType.vtype_name) vtype_name
		,[vac_empid]
		,dbo.GetDateAsString([vac_fdate]) vac_fdate
		,dbo.GetDateAsString([vac_tdate]) vac_tdate
		,[vac_status]
		,[emp_no]
		,[vac_type]
		,emp.emp_section sec_ID
		,'' vac_fdate_h
		,'' vac_tdate_h
		,vac_fdate fdate
		,vac_tdate tdate
		,x.Section_Name  sec_Name
		,x.SortKey 
		,vac_DaysNo
		,reg_id
		,reg_name
	FROM [tb_vacation] vac
	INNER JOIN tb_employee Emp
		ON Emp.emp_id = vac_empid
	INNER JOIN [dbo].[GetEmployeeByUserRegion](@username) empreg
		ON vac.vac_empid = empreg.emp_id
	INNER JOIN tb_vacationtype vacType
		ON vacType.vtype_id = vac.vac_type
	INNER JOIN dbo.GetSectionHierarchy() X
		ON X.sec_ID = emp.emp_section
	Inner join tb_Regions on emp_region=tb_Regions.reg_id 
	WHERE (
			vac_fdate BETWEEN @vac_fdate
				AND @vac_tdate
			) AND (@vac_type IS NULL OR vac_type = @vac_type) AND (@vac_empid IS NULL OR vac_empid = @vac_empid) AND (
			@vac_secid IS NULL OR X.sec_ID IN (
				SELECT sec_id
				FROM dbo.GetSectionUnderManager('', @vac_secid)
				)
			) AND (@vac_RegID IS NULL OR Emp.emp_region = @vac_RegID)
			AND (vac.vac_deleted = 0) AND (Emp.emp_deleted = 0)
	ORDER BY fdate
		--,X.SortKey
		,emp_no
END















GO

CREATE PROCEDURE [dbo].[spshiftdelete] @shift_id INT
	, @UserName NVARCHAR(250)
AS
BEGIN
	IF (
			SELECT count(sch_id)
			FROM tb_schedule
			WHERE (
					sch_1 = @shift_id
					OR sch_2 = @shift_id
					OR sch_3 = @shift_id
					OR sch_4 = @shift_id
					OR sch_5 = @shift_id
					OR sch_6 = @shift_id
					OR sch_7 = @shift_id
					)
				AND sch_delete = 0
			) > 0
		RETURN - 2

	DECLARE @shift_name NVARCHAR(250)
		, @shift_fin NVARCHAR(50)
		, @shift_fout NVARCHAR(50)
		, @shift_sin NVARCHAR(50)
		, @shift_sout NVARCHAR(50)
		, @shift_off BIT
		, @shift_deleted BIT
		, @shift_allow SMALLINT
		, @shift_allow_out SMALLINT
		, @shift_withbreak BIT
		, @shift_fbreak NVARCHAR(12)
		, @shift_tbreak NVARCHAR(12)
		, @shift_withovertime BIT
		, @shift_fovertime NVARCHAR(12)
		, @shift_tovertime NVARCHAR(12)
		, @shift_OverTimeMinutes INT
		, @shift_twoshifts BIT
		, @shift_isnight BIT
		, @IsFH BIT
		, @shift_FH_from NVARCHAR(12)
		, @shift_FH_to NVARCHAR(12)
		, @IsOpenHours Bit

	SELECT @shift_name = shift_name
		, @shift_fin = shift_fin
		, @shift_fout = shift_fout
		, @shift_sin = shift_sin
		, @shift_sout = shift_sout
		, @shift_off = shift_off
		, @shift_deleted = 1
		, @shift_allow = shift_allow
		, @shift_allow_out = shift_allow_out
		, @shift_withbreak = shift_withbreak
		, @shift_fbreak = shift_fbreak
		, @shift_tbreak = shift_tbreak
		, @shift_withovertime = shift_withovertime
		, @shift_fovertime = shift_fovertime
		, @shift_tovertime = shift_tovertime
		, @shift_OverTimeMinutes = shift_OverTimeMinutes
		, @shift_twoshifts = shift_twoshifts
		, @shift_isnight = shift_isnight
		, @IsFH = IsFH
		, @shift_FH_from = shift_FH_from
		, @shift_FH_to = shift_FH_to
		, @IsOpenHours =IsOpenHours 
	FROM tb_shift
	WHERE shift_id = @shift_id

	EXEC spupdateshift @shift_id
		, @shift_name
		, @shift_fin
		, @shift_fout
		, @shift_sin
		, @shift_sout
		, @shift_off
		, @shift_deleted
		, @shift_allow
		, @shift_allow_out
		, @shift_withbreak
		, @shift_fbreak
		, @shift_tbreak
		, @shift_withovertime
		, @shift_fovertime
		, @shift_tovertime
		, @shift_OverTimeMinutes
		, @shift_twoshifts
		, @shift_isnight
		, @IsFH
		, @shift_FH_from
		, @shift_FH_to
		, @IsOpenHours 
		, @UserName

	RETURN 1
END















GO
CREATE PROCEDURE [dbo].[spsynchronizedb] @m_id BIGINT
	,@m_date INT
	,@m_time AS NVARCHAR(12)
	,@m_unit INT
	,@m_mode SMALLINT
	,@status BIT
AS
IF (
		SELECT count(trans_id)
		FROM tb_trans
		WHERE m_id = @m_id
			AND m_date = @m_date
			AND m_time = @m_time
		) = 0
	INSERT INTO tb_trans (
		m_id
		,m_date
		,m_time
		,m_status
		,m_unitid
		,m_typ
		,m_deleted
		,m_mode
		,m_manual
		)
	VALUES (
		@m_id
		,@m_date
		,@m_time
		,@status
		,@m_unit
		,1
		,0
		,@m_mode
		,@m_mode
		)
RETURN @@identity
	/****** Object:  StoredProcedure [dbo].[spinsertpullconfig]    Script Date: 05/29/2009 13:21:09 ******/
	-- SET ANSI_NULLS ON


















GO

-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-01-26>
-- Description:	<Shift Update Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spupdate_empschedual] @emp_id INT
	,@m_date INT
	,@newshiftid INT
	,@UserName NVARCHAR(250)
AS
BEGIN
	DECLARE @emp_card BIGINT
		,@empName NVARCHAR(200)
		,@oldShiftName NVARCHAR(200)
		,@NewShiftName NVARCHAR(200)

	SELECT @oldShiftName = shift_name
		,@emp_card = emp_card
		,@empName = emp_name
	FROM dbo.tb_transSummey
	JOIN tb_shift ON tb_transSummey.m_shiftid = tb_shift.shift_id
	JOIN tb_employee ON tb_transSummey.m_id = tb_employee.emp_card
	WHERE emp_id = @emp_id
		AND m_date = @m_date

	SET @NewShiftName = (
			SELECT TOP 1 shift_name
			FROM [dbo].[tb_shift]
			WHERE shift_id = @newshiftid
			)

	UPDATE tb_transSummey
	SET m_shiftid = @newshiftid
	,m_manual =1
	WHERE m_date = @m_date
		AND m_id = @emp_card

	EXEC sprecalculatetranssummery @emp_card
		,@m_date
		,NULL
		,NULL
		,0

	DECLARE @arabicdesc NVARCHAR(max)

	SET @arabicdesc = (N'تم تعديل وردية الدوام  ' + @empName + N' من ' + @oldShiftName + N' إلى ' + @NewShiftName + N' بواسطة' + @username)

	DECLARE @englishdesc NVARCHAR(max)

	SET @englishdesc = (N'update shift of   ' + @empName + N' From ' + @oldShiftName + N' To ' + @NewShiftName + N' by ' + @username)

	EXEC spsaveuserlog 7
		,@newshiftid
		,2
		,@UserName
		,0
		,NULL
		,NULL
		,@arabicdesc
		,@englishdesc
END
	/****** Object:  StoredProcedure [dbo].[spinserttrans]    Script Date: 05/29/2009 13:21:12 ******/
	-- SET ANSI_NULLS ON

















GO
-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-01-26>
-- Description:	<Employee update Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spupdateemployee] @emp_id INT
	,@emp_no NVARCHAR(50)
	,@emp_card NVARCHAR(10)
	,@emp_section INT
	,@emp_name NVARCHAR(max)
	,@emp_sch INT
	,@emp_PersonalID NVARCHAR(250)
	,@emp_JobTitle NVARCHAR(250)
	,@emp_JobID NVARCHAR(250)
	,@emp_Grade NVARCHAR(250)
	,@emp_HiringDate NVARCHAR(250)
	,@emp_UserName NVARCHAR(250)
	,@emp_deleted BIT
	,@emp_jointype  CHAR(5)
	,@emp_violatedException bit
	,@UserName NVARCHAR(250)
	,@emp_sendnotif bit=null
AS
BEGIN
declare @oldempcard bigint
	IF @emp_deleted = 0
	BEGIN
	select @oldempcard=emp_card from tb_employee where emp_id=@emp_id 
		--declare @IsScheduleChange bit=0
		DECLARE @currentdate INT
		SET @currentdate = dbo.getnofromdate(getdate())
		UPDATE [dbo].[tb_employee]
		SET [emp_no] = CASE 
				WHEN @emp_no = ''
					THEN NULL
				ELSE @emp_no
				END
			,[emp_card] = CASE 
				WHEN @emp_card = ''
					THEN NULL
				ELSE @emp_card
				END
			--,[emp_section] = @emp_section
			,[emp_name] = @emp_name
			,[emp_sch] = @emp_sch
			,emp_PersonalID = @emp_PersonalID
			,emp_JobTitle = @emp_JobTitle
			,emp_JobID = @emp_JobID
			,emp_Grade = @emp_Grade
			,emp_HiringDate = @emp_HiringDate
			,[emp_deleted] = @emp_deleted
			,emp_jointype=@emp_jointype
			,emp_violatedException=@emp_violatedException
			,emp_sendnotif=@emp_sendnotif
		WHERE emp_id = @emp_id
		IF EXISTS (
				SELECT 1
				FROM tb_users
				WHERE user_empid = @emp_id
				)
		BEGIN
			UPDATE tb_users
			SET [user_name] = @emp_UserName
			WHERE user_empid = @emp_id
		END
		ELSE
		BEGIN
			IF isnull(@emp_UserName, '') <> ''
			BEGIN
				INSERT INTO [dbo].[tb_users] (
					[user_name]
					,user_per
					,user_empid
					,user_active
					)
				SELECT @emp_UserName
					,0
					,@emp_id
					,1
			END
		END
		if @oldempcard <>@emp_card 
		begin
		update tb_trans set m_id=@emp_card where m_id=@oldempcard 
		update tb_transSummey set m_id=@emp_card where m_id=@oldempcard 
		end
		EXEC spsaveuserlog 5
			,@emp_id
			,2
			,@UserName
			,1
			,@emp_name
			,@currentdate
	END
	ELSE
		IF @emp_deleted = 1
		BEGIN
			UPDATE [dbo].[tb_employee]
			SET [emp_deleted] = @emp_deleted
			WHERE emp_id = @emp_id
			EXEC spsaveuserlog 5
				,@emp_id
				,2
				,@UserName
				,1
				,@emp_name
				,@currentdate
		END
END


















GO
-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-01-26>
-- Description:	<Employee update Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spupdateemployeeW] @emp_id INT
	,@emp_no NVARCHAR(50)
	,@emp_card NVARCHAR(10)
	,@emp_section INT
	,@emp_name NVARCHAR(max)
	,@emp_sch INT
	,@emp_PersonalID NVARCHAR(250)
	,@emp_JobTitle NVARCHAR(250)
	,@emp_JobID NVARCHAR(250)
	,@emp_Grade NVARCHAR(250)
	,@emp_HiringDate NVARCHAR(250)
	,@emp_UserName NVARCHAR(250)
	,@emp_deleted BIT
	,@emp_jointype  CHAR(5)
	,@emp_violatedException bit
	,@UserName NVARCHAR(250)
	,@emp_sendnotif bit=null
	,@emp_region bigint =null
AS
BEGIN
declare @oldempcard bigint
	IF @emp_deleted = 0
	BEGIN
	select @oldempcard=emp_card from tb_employee where emp_id=@emp_id 
		--declare @IsScheduleChange bit=0
		DECLARE @currentdate INT
		SET @currentdate = dbo.getnofromdate(getdate())
		UPDATE [dbo].[tb_employee]
		SET [emp_no] = CASE 
				WHEN @emp_no = ''
					THEN NULL
				ELSE @emp_no
				END
			,[emp_card] = CASE 
				WHEN @emp_card = '' 
					THEN NULL
				ELSE case when  @emp_card is null then cast(@emp_no as bigint) else @emp_card end
				END
			,[emp_section] = @emp_section
			,[emp_name] = @emp_name
			,[emp_sch] = @emp_sch
			,emp_PersonalID = @emp_PersonalID
			,emp_JobTitle = @emp_JobTitle
			,emp_JobID = @emp_JobID
			,emp_Grade = @emp_Grade
			--,emp_HiringDate = @emp_HiringDate
			,[emp_deleted] = @emp_deleted
			,emp_jointype=@emp_jointype
			,emp_violatedException=@emp_violatedException
			,emp_sendnotif=@emp_sendnotif
			,emp_region=@emp_region
		WHERE emp_id = @emp_id
		--IF EXISTS (
		--		SELECT 1
		--		FROM tb_users
		--		WHERE user_empid = @emp_id
		--		)
		--BEGIN
		--	UPDATE tb_users
		--	SET [user_name] = @emp_UserName
		--	WHERE user_empid = @emp_id
		--END
		--ELSE
		--BEGIN
		--	IF isnull(@emp_UserName, '') <> ''
		--	BEGIN
		--		INSERT INTO [dbo].[tb_users] (
		--			[user_name]
		--			,user_per
		--			,user_empid
		--			,user_active
		--			)
		--		SELECT @emp_UserName
		--			,0
		--			,@emp_id
		--			,1
		--	END
		--END
		if @oldempcard <>@emp_card 
		begin
		update tb_trans set m_id=@emp_card where m_id=@oldempcard 
		update tb_transSummey set m_id=@emp_card where m_id=@oldempcard 
		end
		EXEC spsaveuserlog 5
			,@emp_id
			,2
			,@UserName
			,1
			,@emp_name
			,@currentdate
	END
	ELSE
		IF @emp_deleted = 1
		BEGIN
			UPDATE [dbo].[tb_employee]
			SET [emp_deleted] = @emp_deleted
			WHERE emp_id = @emp_id
			EXEC spsaveuserlog 5
				,@emp_id
				,1
				,@UserName
				,1
				,@emp_name
				,@currentdate
		END
END


















GO
CREATE PROCEDURE [dbo].[spupdateexecuse] @exc_id INT,
	@exc_date INT,
	@exc_ftime NVARCHAR(5),
	@exc_ttime NVARCHAR(5),
	@exc_reason NVARCHAR(MAX),
	@exc_status BIT,
	@UserName NVARCHAR(250),
	@execuseReason_ID INT,
	@exc_type int=null,
	@Approval VARCHAR(5) = NULL
AS
BEGIN
	DECLARE @sid INT,
		@fin NVARCHAR(12),
		@fout NVARCHAR(12),
		@ID INT,
		@ISFH BIT,
		@exc_hours NVARCHAR(5),
		@exc_empid INT,
		@m_date INT,
		@TransID BIGINT
		, @m_id BIGINT,
		@empname NVARCHAR(100)
	
	SELECT @exc_empid = exc_empid,
		@exc_type = case when @exc_type is null then exc_type else @exc_type end,
		@m_date = exc_date, @m_id = emp_card,
		@empname = emp_name
	FROM tb_execuse
	inner join  tb_employee on tb_employee.emp_id=tb_execuse.exc_empid
	WHERE exc_id = @exc_id
	IF (
			SELECT count(exc_empid)
			FROM tb_execuse
			WHERE exc_empid = @exc_empid AND exc_date = @exc_date AND exc_deleted = 0 AND exc_id <> @exc_id
			) > 0
		RETURN - 2
	SET @sid = dbo.GeatSchedualID(@exc_empid, @exc_date)
	SELECT @fin = shift_fin,
		@fout = shift_fout,
		@ISFH = isnull(IsFH, 0)
	FROM tb_shift
	WHERE shift_id = @sid
	SELECT @exc_hours = dbo.GetTimeTotal(@exc_ftime, @exc_ttime)
	IF (
			SELECT DATEDIFF(minute, @exc_hours, dbo.GetTimeTotal(@fin, @fout))
			) < 0
		SELECT @exc_hours = dbo.GetTimeTotal(@fin, @fout)


		--reset 
		update tb_execuse set exc_deleted=1 WHERE [exc_id] = @exc_id

		 	EXEC sprecalculatetranssummery @m_id,
			@m_date,
			NULL,
			NULL,
			0
		--
	UPDATE tb_execuse
	SET [exc_date] = @exc_date,
		[exc_ftime] = @exc_ftime,
		[exc_ttime] = @exc_ttime,
		[exc_reason] = @exc_reason,
		[exc_status] = @exc_status,
		[exc_hours]=@exc_hours,
		[exc_minuts]=dbo.GetTotalMinutsFromTime(@exc_hours),
		exc_type=@exc_type ,
		execuseReason_ID = @execuseReason_ID,
		ApprovalByManager = CASE 
			WHEN @Approval IS NULL
				THEN (
						CASE 
							WHEN @exc_status = 1
								THEN 'EAS02'
							ELSE 'EAS03'
							END
						)
			ELSE @Approval
			END,
		Updated = getdate(),
		exc_deleted=0

	WHERE [exc_id] = @exc_id
	
	IF @m_id IS NOT NULL
	BEGIN
		IF @exc_type = 2 AND @exc_status = 1 AND @Approval IS NULL
		BEGIN
			DECLARE @m_timefin VARCHAR(12),
				@m_timefout VARCHAR(12)
			SELECT @m_timefout = dbo.GetSumTimeTotal(@fin, @exc_hours)
			EXEC @TransID = spinsertTotransSummey @m_id = @m_id,
				@m_date = @exc_date,
				@emp_id = @exc_empid,
				@sid = @sid,
				@ftime = @fin,
				@ttime = null
			IF @TransID > 0
			BEGIN
				SELECT @m_timefin = NULL,
					@m_timefout = NULL
				SELECT @m_timefin = m_timefin,
					@m_timefout = m_timefout
				FROM tb_transSummey
				WHERE ID = @TransID
				IF @m_timefin IS NULL OR @m_timefin = '--:--'
				BEGIN
					UPDATE tb_transSummey
					SET m_timefin = @fin
						--,m_timefout = dbo.GetSumTimeTotal(@fin, @exc_hours)
					WHERE ID = @TransID
				END -- if @m_timefin is null or @m_timefin='--:--'
				--ELSE IF @m_timefout IS NULL OR @m_timefout = '--:--'
				--BEGIN
				--	UPDATE tb_transSummey
				--	SET m_timefout = dbo.GetSumTimeTotal(@fin, @exc_hours)
				--	WHERE ID = @TransID
				--END --  if @m_timefout is null or @m_timefout='--:--'
			END
		END
		EXEC sprecalculatetranssummery @m_id,
			@exc_date,
			NULL,
			NULL,
			0
	END
	EXEC spsaveuserlog 1,
		@exc_id,
		2,
		@UserName,
		1,
		@empname,
		@exc_date
	RETURN 1
END















GO
CREATE PROCEDURE [dbo].[spupdateexecuse_twoshifts] 
     @exc_id INT
	,@exc_date INT
	,@exc_ftime NVARCHAR(5)
	,@exc_ttime NVARCHAR(5)
	,@exc_reason NVARCHAR(MAX)
	,@exc_status BIT
	,@UserName NVARCHAR(250)
	,@execuseReason_ID INT
AS
BEGIN
  DECLARE @sid INT,@fin nvarchar(12),@fout nvarchar(12),@exc_empid int 
	        ,@twoshifts bit,@sin nvarchar(12),@sout nvarchar(12)
  select @exc_empid=exc_empid from tb_execuse where exc_id= @exc_id
	SET @sid = dbo.GeatSchedualID(@exc_empid, @exc_date)
	if (@sid is not null)
	begin
	 select @fin=shift_fin,
				@fout=shift_fout,
				@twoshifts=shift_twoshifts,
				@sin=shift_sin,
				@sout=shift_sout
		 from tb_shift 
		 where shift_id=@sid
      IF  not ( @twoshifts =0 and ((DATEDIFF(minute, @fin,@exc_ftime) >= 0) AND  (DATEDIFF(minute, @exc_ttime,@fout)>= 0))
					 OR 
					 (@twoshifts =1  AND  (((DATEDIFF(minute, @fin,@exc_ftime) >= 0) AND  (DATEDIFF(minute, @exc_ttime,@fout)>= 0))
					                    OR ((DATEDIFF(minute, @sin,@exc_ftime) >= 0) AND  (DATEDIFF(minute, @exc_ttime,@sout)>= 0)))))
            begin
             return -2
           end
    end 
	BEGIN TRAN TAupdateexecuse
	UPDATE tb_execuse
	SET [exc_date] = @exc_date
		,[exc_ftime] = @exc_ftime
		,[exc_ttime] = @exc_ttime
		,[exc_reason] = @exc_reason
		,[exc_status] = @exc_status
		,execuseReason_ID = @execuseReason_ID
	WHERE [exc_id] = @exc_id
	DECLARE @m_id BIGINT
		,@m_date INT
		,@emp_id BIGINT
		,@empname NVARCHAR(200)
	SELECT @emp_id = exc_empid
		,@m_date = exc_date
	FROM tb_execuse
	WHERE exc_id = @exc_id
	SELECT @m_id = emp_card
		,@empname = emp_name
	FROM tb_employee
	WHERE emp_id = @emp_id
	 IF @m_id IS NOT NULL 
        	EXEC sprecalculatetranssummery_twoshifts @m_id,@exc_date
	COMMIT TRAN TAupdateexecuse
	EXEC spsaveuserlog 1
		,@exc_id
		,2
		,@UserName
		,1
		,@empname
		,@exc_date
	   return 1	
END
	/****** Object:  StoredProcedure [dbo].[spupdatevacation]    Script Date: 05/29/2009 13:21:19 ******/
	-- SET ANSI_NULLS ON


















GO

-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-04-03>
-- Description:	<Vacation Type Update Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spupdateexecuseReason] @execuseReason_id INT
	,@execuseReason_name NVARCHAR(250)
	,@UserName NVARCHAR(250)
	,@exc_typeName NVARCHAR(250)=''
	,@exc_type smallint=null
AS
BEGIN
	DECLARE @arabicdesc NVARCHAR(max)
		,@englishdesc NVARCHAR(max)
		,@RowEffect INT

	UPDATE [dbo].[tb_execuseReason]
	SET [execuseReason_name] = @execuseReason_name
	,exc_type=isnull(@exc_type,exc_type)
	WHERE execuseReason_id = @execuseReason_id

	SELECT @execuseReason_name = execuseReason_name
	FROM tb_execuseReason
	WHERE execuseReason_id = @execuseReason_id

	SET @RowEffect = @@ROWCOUNT
	SET @arabicdesc = (N'تم تعديل سبب الإستئذان ' + @execuseReason_name + N' من قبل الموظف ' + @username + N' بتاريخ' + cast(getdate() AS VARCHAR(20)))
	SET @englishdesc = (N'update Excuse Reason  ' + @execuseReason_name + N' by ' + @username + N'  at ' + cast(getdate() AS VARCHAR(20)))

	EXEC spsaveuserlog 1
		,@execuseReason_id
		,2
		,@UserName
		,0
		,NULL
		,NULL
		,@arabicdesc
		,@englishdesc

	RETURN @RowEffect
END
	/****** Object:  StoredProcedure [dbo].[spdeleteexecuseReason]    Script Date: 05/29/2009 13:21:06 ******/
	-- SET ANSI_NULLS ON

















GO

CREATE PROCEDURE [dbo].[spUpdateIncomplete] @m_id BIGINT
	,@m_date INT
AS
BEGIN
	DECLARE @m_actualtime NVARCHAR(5)
		,@sid INT
		,@m_empid INT
		,@m_timefin VARCHAR(10) = NULL
		,@m_timefout VARCHAR(10) = NULL
		,@TimeTotal NVARCHAR(12)

	SELECT @m_timefin = isnull(m_timefin, N'--:--')
		,@m_timefout = isnull(m_timefout, N'--:--')
		,@m_actualtime = isnull(m_actualtime, N'00:00')
		,@TimeTotal = m_timetotal
	FROM tb_transSummey
	WHERE m_id = @m_id
		AND m_date = @m_date - 1

	IF (
			@m_timefin <> N'--:--'
			AND @m_timefout = N'--:--'
			AND @m_actualtime <> N'00:00'
			)
	BEGIN
		SELECT @m_empid = emp_id
		FROM tb_employee
		WHERE emp_card = @m_id

		SELECT @sid = dbo.GeatSchedualID(@m_empid, @m_date - 1)

		UPDATE tb_transSummey
		SET m_totallate = dbo.ApplayExecuseHours(@m_empid, @m_date - 1, @sid, @m_actualtime, @TimeTotal)
		WHERE m_id = @m_id
			AND m_date = @m_date - 1
	END
END















GO
CREATE PROCEDURE [dbo].[spUpdateIncomplete_twoshifts] 
				 @m_id BIGINT
				,@m_date  INT
				,@shiftID  INT
AS
BEGIN
	DECLARE @m_actualtime NVARCHAR(5)
		    ,@m_timefin  VARCHAR(10) = NULL
		    ,@m_timefout VARCHAR(10) = NULL
		    ,@m_timesin  VARCHAR(10) = NULL
		    ,@m_timesout VARCHAR(10) = NULL
		    ,@m_fearlyout VARCHAR(10) = NULL
			,@m_searlyout VARCHAR(10) = NULL
			,@m_flatein VARCHAR(10) = NULL
			,@m_slatein VARCHAR(10) = NULL
			,@m_latein VARCHAR(10) = NULL
		    ,@m_earlyout VARCHAR(10) = NULL
	 DECLARE @shiftfout DATETIME
	        ,@shiftfin DATETIME
	        ,@shiftsin DATETIME
		    ,@shiftsout DATETIME
		    ,@doIncomplete bit=0
	SELECT @m_timefin = isnull(m_timefin, N'--:--')
		  ,@m_timefout = isnull(m_timefout, N'--:--')
		  ,@m_actualtime = isnull(m_actualtime, N'00:00')
		  ,@m_timesin  = isnull(m_timesin, N'--:--')
		  ,@m_timesout = isnull(m_timesout, N'--:--')
		  ,@m_fearlyout = isnull(m_fearlyout, N'00:00')
		  ,@m_searlyout = isnull(m_searlyout, N'00:00')
		  ,@m_flatein = isnull(m_flatein,  N'00:00')
		  ,@m_slatein = isnull(m_slatein,  N'00:00')
		  ,@m_earlyout = isnull(m_earlyout, N'00:00')
          ,@m_latein = isnull(m_latein,  N'00:00')
	FROM tb_transSummey
	WHERE m_id = @m_id
		 AND m_date = @m_date - 1
	 SELECT  @shiftfout = shift_fout
			,@shiftfin = shift_fin
			,@shiftsin  = case when  shift_sin is null or shift_sin='--:--' then '00:00' else shift_sin end
			,@shiftsout = case when  shift_sout is null or shift_sout='--:--' then '00:00' else shift_sout end
	 FROM dbo.tb_shift
	 WHERE shift_id = @shiftid
	IF (@m_timefin <> N'--:--'
		AND @m_timefout = N'--:--'
		AND @m_actualtime <> N'00:00')
	BEGIN
	  set @m_fearlyout= dbo.getTimeTotal(@shiftfin,@shiftfout)
	   if @m_flatein ='--:--' set @m_flatein='00:00'
	  set @m_fearlyout= dbo.GetSubtractTimeTotal(@m_fearlyout,@m_flatein)
		UPDATE tb_transSummey
		SET m_fearlyout = @m_fearlyout,
		    @doIncomplete=1	
		WHERE m_id = @m_id
			AND m_date = @m_date - 1
	END
	ELSE IF (@m_timefin = N'--:--'
		AND @m_timefout = N'--:--'
		AND @m_actualtime <> N'00:00'
		AND (@m_timesin <> N'--:--'
		OR @m_timesout <> N'--:--'))
	BEGIN
	  SET @m_fearlyout= dbo.getTimeTotal(@shiftfin,@shiftfout)
		UPDATE tb_transSummey
		SET m_fearlyout = @m_fearlyout,
		    @doIncomplete=1	
		WHERE m_id = @m_id
		  AND m_date = @m_date - 1
	END
	IF  (@m_timesin <> N'--:--'
	 AND @m_timesout = N'--:--'
	 AND @m_actualtime <> N'00:00')
	BEGIN
	  set @m_searlyout= dbo.getTimeTotal(@shiftsin,@shiftsout)
	   if @m_slatein ='--:--' set @m_slatein='00:00'
	  set @m_searlyout= dbo.GetSubtractTimeTotal(@m_searlyout,@m_slatein)
		UPDATE tb_transSummey
		SET m_searlyout = @m_searlyout,
		    @doIncomplete=1	
		WHERE m_id = @m_id
		  AND m_date = @m_date - 1  
	END
	 ELSE IF (@m_timesin = N'--:--'
		AND @m_timesout = N'--:--'
		AND @m_actualtime <> N'00:00'
		AND @doIncomplete=1)
	BEGIN
	  set @m_searlyout= dbo.getTimeTotal(@shiftsin,@shiftsout)
		UPDATE tb_transSummey
		SET m_searlyout = @m_searlyout
		WHERE m_id = @m_id
		  AND m_date = @m_date - 1  
	END
	 if @doIncomplete=1
	 BEGIN
	   set @m_earlyout=dbo.GetSumTimeTotal(@m_fearlyout,@m_searlyout)
	   UPDATE tb_transSummey
		SET m_earlyout = @m_earlyout,
		    m_totallate=dbo.GetSumTimeTotal(@m_earlyout,@m_latein)  
		WHERE m_id = @m_id
		  AND m_date = @m_date - 1
	 END
END


















GO
-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-01-26>
-- Description:	<Pull Configuration update Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spupdatepullconfig] @pull_auto BIT
	,@pull_option CHAR(1)
	,@pull_attime NVARCHAR(10)
	,@pull_atmint SMALLINT
	,@pull_try SMALLINT
	,@dbconnstr NVARCHAR(max)
	,@dblinkdata NVARCHAR(max)
	,@pull_type CHAR(1)
AS
BEGIN
	UPDATE [dbo].[tb_pullconfig]
	SET [pull_auto] = @pull_auto
		,[pull_option] = @pull_option
		,[pull_attime] = @pull_attime
		,[pull_atmint] = @pull_atmint
		,[pull_try] = @pull_try
		,[dbconnstr] = @dbconnstr
		,[dblinkdata] = @dblinkdata
		,[pull_type] = @pull_type
END
	/****** Object:  StoredProcedure [dbo].[spdeletevacation]    Script Date: 05/29/2009 13:21:06 ******/
	-- SET ANSI_NULLS ON


















GO

CREATE PROCEDURE [dbo].[spupdateRegions] @currentid BIGINT,
	@reg_id BIGINT,
	@reg_name NVARCHAR(150),
	@UserName NVARCHAR(150)
AS
BEGIN
	DECLARE @RowsEffect INT,
		@currentdate INT

	IF EXISTS (
			SELECT 1
			FROM tb_Regions
			WHERE reg_id = @reg_id AND @currentid <> reg_id
			)
		RETURN - 2
	ELSE
	BEGIN
		UPDATE tb_Regions
		SET reg_id = @reg_id,
			reg_name = @reg_name
		WHERE reg_id = @currentid

		SELECT @RowsEffect = @@rowcount,
			@currentdate = dbo.getnofromdate(getdate())

		IF @currentid <> @reg_id
		BEGIN
			UPDATE tb_employee
			SET emp_region = @reg_id
			WHERE emp_region = @currentid

			UPDATE [tb_UsersRegions]
			SET reg_id = @reg_id
			WHERE reg_id = @currentid
		END

		EXEC spsaveuserlog 12,
			@currentid,
			2,
			@UserName,
			0,
			@reg_name,
			@currentdate

		RETURN @RowsEffect
	END
END
















GO
CREATE PROCEDURE [dbo].[spupdateschedule] @sch_id INT
	,@sch_name NVARCHAR(250)
	,@sch_oneshift BIT
	,@sch_desc NVARCHAR(max)
	,@sch_1 INT
	,@sch_2 INT
	,@sch_3 INT
	,@sch_4 INT
	,@sch_5 INT
	,@sch_6 INT
	,@sch_7 INT
	,@sch_delete BIT
	,@UserName NVARCHAR(250)
AS
BEGIN
	DECLARE @currentdate INT, @isnight bit
	SET @currentdate = dbo.getnofromdate(getdate())
	IF @sch_delete = 0
	BEGIN
		UPDATE [dbo].[tb_schedule]
		SET [sch_name] = @sch_name
			,[sch_oneshift] = @sch_oneshift
			,[sch_desc] = @sch_desc
			,[sch_delete] = @sch_delete
			,[sch_1] = @sch_1
			,[sch_2] = @sch_2
			,[sch_3] = @sch_3
			,[sch_4] = @sch_4
			,[sch_5] = @sch_5
			,[sch_6] = @sch_6
			,[sch_7] = @sch_7
		WHERE sch_id = @sch_id
		set @isnight=0
		select @isnight=case 
		 when Exists (select 1 from tb_shift where shift_id= @sch_1 and shift_fin > shift_fout ) then 1
		 when Exists (select 1 from tb_shift where shift_id= @sch_2 and shift_fin > shift_fout ) then 1
		 when Exists (select 1 from tb_shift where shift_id= @sch_3 and shift_fin > shift_fout ) then 1
		 when Exists (select 1 from tb_shift where shift_id= @sch_4 and shift_fin > shift_fout ) then 1
		 when Exists (select 1 from tb_shift where shift_id= @sch_5 and shift_fin > shift_fout ) then 1
		 when Exists (select 1 from tb_shift where shift_id= @sch_6 and shift_fin > shift_fout ) then 1
		 when Exists (select 1 from tb_shift where shift_id= @sch_7 and shift_fin > shift_fout ) then 1
		 else
		 0
		 END
		 update tb_schedule set sch_isnight =@isnight where sch_id=@sch_id 
		EXEC spsaveuserlog 6
			,@sch_id
			,2
			,@UserName
			,0
			,@sch_name
			,@currentdate
	END
END
IF @sch_delete = 1
BEGIN
	UPDATE [dbo].[tb_schedule]
	SET [sch_delete] = @sch_delete
	WHERE sch_id = @sch_id
	SELECT @sch_name = sch_name
	FROM [dbo].[tb_schedule]
	WHERE sch_id = @sch_id
	EXEC spsaveuserlog 6
		,@sch_id
		,1
		,@UserName
		,0
		,@sch_name
		,@currentdate
END


















GO

-- =============================================
CREATE PROCEDURE [dbo].[spupdateschGroup] @schGroup_id INT
	,@sch_id INT
	,@schGroup_name NVARCHAR(250)
	,@schEmployees NVARCHAR(max)
	,@schGroup_deleted BIT
	,@UserName NVARCHAR(250)
	,@sch_startdate INT = NULL
	,@sch_enddate INT = NULL
AS
BEGIN
	IF @schGroup_deleted = 0
	BEGIN
		UPDATE [dbo].[tb_schGroup]
		SET [schGroup_name] = @schGroup_name
			,sch_id = @sch_id
			,[sch_startdate] = @sch_startdate
			,[sch_enddate] = @sch_enddate

		WHERE schGroup_id = @schGroup_id

		IF len(ltrim(rtrim(@schEmployees))) > 0
		BEGIN
			DECLARE @text NVARCHAR(max)
				,@employees NVARCHAR(max)

			SET @text = 'select emp_id from tb_employee where emp_id in (' + @schEmployees + ')'

			CREATE TABLE #tbl (
				id INT identity(1, 1)
				,emp_id NVARCHAR(250)
				)

			DECLARE @textInsert NVARCHAR(max)

			SET @textInsert = 'Insert into #tbl(emp_id)  ' + @text

			EXEC (@textInsert)

			--CREATE TABLE #Removedtbl (
			--	id INT identity(1, 1)
			--	,emp_id NVARCHAR(250)
			--	)

			--INSERT INTO #Removedtbl
			--SELECT emp_id
			--FROM tb_schGroupEmployees
			--WHERE NOT EXISTS (
			--		SELECT 1
			--		FROM #tbl t
			--		WHERE t.emp_id = tb_schGroupEmployees.emp_id
			--		)
			--	AND tb_schGroupEmployees.schGroup_id = @schGroup_id

			DELETE tb_schGroupEmployees
			WHERE tb_schGroupEmployees.schGroup_id = @schGroup_id

			--UPDATE tb_employee
			--SET emp_sch = sec_sch
			--FROM tb_employee
			--JOIN tb_section ON tb_employee.emp_section = tb_section.sec_ID
			--JOIN #Removedtbl t ON tb_employee.emp_id = t.emp_id

			INSERT INTO tb_schGroupEmployees
			SELECT @schGroup_id
				,emp_id
			FROM #tbl

			--UPDATE tb_employee
			--SET emp_sch = @sch_id
			--FROM tb_employee
			--JOIN #tbl t ON tb_employee.emp_id = t.emp_id

			DROP TABLE #tbl
		END
	END
	ELSE
	BEGIN
		UPDATE [dbo].[tb_schGroup]
		SET schGroup_deleted = @schGroup_deleted
		WHERE schGroup_id = @schGroup_id
		return @@rowcount
		--UPDATE tb_employee
		--SET emp_sch = sec_sch
		--FROM tb_employee
		--JOIN tb_section ON tb_employee.emp_section = tb_section.sec_ID
		--JOIN tb_schGroupEmployees ON tb_employee.emp_id = tb_schGroupEmployees.emp_id
		--WHERE tb_schGroupEmployees.schGroup_id = @schGroup_id
	END
END
















GO
-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-01-26>
-- Description:	<Section Update Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spupdatesection] @sec_id INT,
	@sec_No NVARCHAR(50),
	@sec_Name NVARCHAR(250),
	@sec_Parent INT,
	@sec_Location NVARCHAR(250),
	@sec_manager INT,
	@sec_secondmanager INT,
	@sec_sch INT,
	@UserName NVARCHAR(250),
	@sec_sendnotif BIT
AS
DECLARE @level INT
BEGIN
	UPDATE [dbo].[tb_section]
	SET [sec_No] = @sec_No,
		[sec_Name] = @sec_Name,
		[sec_Parent] = @sec_Parent,
		[sec_Location] = @sec_Location,
		[sec_manager] = @sec_manager,
		sec_secondmanager = @sec_secondmanager,
		sec_sch = @sec_sch,
		sec_sendnotif = @sec_sendnotif
	WHERE sec_id = @sec_id
	--if @sec_sch>0
	--  begin
	--       update tb_employee 
	--	set emp_sch =@sec_sch 
	--	where  exists (select 1 from dbo.GetSectionUnderManager(null,@sec_id) t where t.sec_ID= emp_section )
	--	 update tb_section 	set sec_sch =@sec_sch 
	--	 where  exists (select 1 from dbo.GetSectionUnderManager(null,@sec_id) t where t.sec_ID= sec_sch )
	--  end
	DECLARE @Parent_sec_path NVARCHAR(20)
	SELECT @Parent_sec_path = sec_path
	FROM tb_section
	WHERE sec_ID = @sec_Parent
	IF @Parent_sec_path IS NULL
	BEGIN
		UPDATE tb_section
		SET sec_path = sec_ID
		WHERE sec_ID = @sec_id
	END
	ELSE
	BEGIN
		UPDATE tb_section
		SET sec_path = cast(@Parent_sec_path AS NVARCHAR(20)) + '/' + cast(@sec_id AS NVARCHAR(20))
		WHERE sec_ID = @sec_id
	END
	DECLARE @currentdate INT
	SET @currentdate = dbo.getnofromdate(getdate())
	EXEC spsaveuserlog 4,
		@sec_id,
		2,
		@UserName,
		0,
		@sec_Name,
		@currentdate
END
















GO

CREATE PROCEDURE [dbo].[spupdateshift] @shift_id INT,
	@shift_name NVARCHAR(250),
	@shift_fin NVARCHAR(50),
	@shift_fout NVARCHAR(50),
	@shift_sin NVARCHAR(50) = '--:--',
	@shift_sout NVARCHAR(50) = '--:--',
	@shift_off BIT,
	@shift_deleted BIT,
	@shift_allow SMALLINT,
	@shift_allow_out SMALLINT,
	@shift_withbreak BIT = NULL,
	@shift_fbreak NVARCHAR(12) = NULL,
	@shift_tbreak NVARCHAR(12) = NULL,
	@shift_withovertime BIT = NULL,
	@shift_fovertime NVARCHAR(12) = NULL,
	@shift_tovertime NVARCHAR(12) = NULL,
	@shift_OverTimeMinutes INT = NULL,
	@shift_twoshifts BIT = NULL,
	@shift_isnight BIT,
	@IsFH BIT = NULL,
	@shift_FH_from NVARCHAR(12) = NULL,
	@shift_FH_to NVARCHAR(12) = NULL,
	@IsOpenHours BIT = NULL,
	@UserName NVARCHAR(250)
AS
BEGIN
	DECLARE @currentdate INT

	SET @currentdate = dbo.getnofromdate(getdate())

	IF @shift_deleted = 0
	BEGIN
		UPDATE [dbo].[tb_shift]
		SET [shift_name] = @shift_name,
			[shift_fin] = @shift_fin,
			[shift_fout] = @shift_fout,
			[shift_sin] = @shift_sin,
			[shift_sout] = @shift_sout,
			[shift_off] = @shift_off,
			[shift_deleted] = @shift_deleted,
			[shift_allow] = @shift_allow,
			[shift_allow_out] = @shift_allow_out,
			shift_withbreak = @shift_withbreak,
			IsFH = CASE 
				WHEN @IsFH IS NULL
					THEN IsFH
				ELSE @IsFH
				END,
			shift_FH_from = CASE 
				WHEN @shift_FH_from IS NULL
					THEN shift_FH_from
				ELSE @shift_FH_from
				END,
			shift_FH_to = CASE 
				WHEN @shift_FH_to IS NULL
					THEN shift_FH_to
				ELSE @shift_FH_to
				END,
			IsOpenHours = CASE 
				WHEN @IsOpenHours IS NULL
					THEN IsOpenHours
				ELSE @IsOpenHours
				END,
			shift_fbreak = CASE 
				WHEN @shift_withbreak = 1
					THEN @shift_fbreak
				ELSE NULL
				END,
			shift_tbreak = CASE 
				WHEN @shift_withbreak = 1
					THEN @shift_tbreak
				ELSE NULL
				END,
			shift_withovertime = @shift_withovertime,
			shift_fovertime = CASE 
				WHEN @shift_withovertime = 1
					THEN @shift_fovertime
				ELSE NULL
				END,
			shift_tovertime = CASE 
				WHEN @shift_withovertime = 1
					THEN @shift_tovertime
				ELSE NULL
				END,
			shift_OverTimeMinutes = CASE 
				WHEN @shift_withovertime = 1
					THEN @shift_OverTimeMinutes
				ELSE NULL
				END,
			shift_twoshifts = @shift_twoshifts,
			shift_isnight = @shift_isnight
		WHERE shift_id = @shift_id

		EXEC spsaveuserlog 7,
			@shift_id,
			2,
			@UserName,
			0,
			@shift_name,
			@currentdate
	END
END

IF @shift_deleted = 1
BEGIN
	UPDATE [dbo].[tb_shift]
	SET [shift_deleted] = @shift_deleted
	WHERE shift_id = @shift_id

	EXEC spsaveuserlog 7,
		@shift_id,
		1,
		@UserName,
		0,
		@shift_name,
		@currentdate
END















GO
CREATE PROCEDURE [dbo].[spupdatetrans] @trans_id BIGINT,
	@m_time NVARCHAR(12),
	@m_transtype INT,
	@ModifiedReasonID INT,
	@CV_CODE INT = NULL,
	@UserName NVARCHAR(250) = NULL,
	@Acc_Date INT = NULL
AS
BEGIN
	DECLARE @m_id INT,
		@m_date BIGINT,
		@old_m_time VARCHAR(12),
		@old_m_transtype INT

	SELECT @m_id = m_id,
		@m_date = m_date,
		@old_m_transtype = m_transtype,
		@old_m_time = m_time
	FROM tb_trans
	WHERE trans_id = @trans_id

	UPDATE [dbo].[tb_trans]
	SET m_time = @m_time,
		m_manual = 1,
		m_transtype = @m_transtype,
		acc_date = @Acc_Date
	WHERE trans_id = @trans_id

	INSERT INTO tb_translog (
		[trans_id],
		[m_timeModified],
		[ModifiedReason],
		[ModifiedBy],
		[ModifiedDate],
		[transtype],
		[m_timeNew],
		[TransReasonID]
		)
	SELECT @trans_id,
		@old_m_time,
		NULL,
		@UserName,
		@m_date,
		2,
		@m_time,
		@ModifiedReasonID

	EXEC spregeneratetranssummery @m_id,
		@m_date,1

	DECLARE @empname NVARCHAR(200)

	SET @empname = (
			SELECT emp_name
			FROM tb_employee
			WHERE emp_card = @m_id
			)

	EXEC spsaveuserlog 8,
		@trans_id,
		2,
		@UserName,
		1,
		@empname,
		@m_date,
		NULL,
		NULL,
		@old_m_time,
		@m_time
END 















GO
-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-01-26>
-- Description:	<Employee update Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spupdatetrans_twoshifts] 
      @trans_id BIGINT
	,@m_time NVARCHAR(12)
	,@m_transtype int
	,@ModifiedReasonID int
	,@CV_CODE int
	,@UserName NVARCHAR(250) = NULL
AS
BEGIN
	DECLARE @m_id INT
			,@m_date BIGINT
			,@old_m_time VARCHAR(12) 
			,@old_m_transtype int
			,@OCV_CODE int
			,@IsDeleted bit
	 SELECT @m_id = m_id
		   ,@m_date = m_date
		   ,@old_m_transtype=m_transtype
		   ,@old_m_time=m_time
		   ,@OCV_CODE=CV_CODE
		   ,@IsDeleted=m_deleted
	 FROM tb_trans
	 WHERE trans_id = @trans_id
	UPDATE [dbo].[tb_trans]
	SET  m_time = @m_time
		,m_manual = 1
		,CV_CODE = @CV_CODE
		,m_transtype=@m_transtype
	WHERE trans_id = @trans_id
	INSERT INTO tb_translog select @trans_id,@old_m_time,null,@UserName,dbo.getnofromdate(getdate()),2,@m_time,@ModifiedReasonID
	IF @IsDeleted=0
	BEGIN
	     IF @OCV_CODE <> @CV_CODE
			 BEGIN
			   UPDATE [dbo].[tb_trans] SET  m_deleted=1 WHERE   m_id = @m_id and m_date = @m_date and CV_CODE = @CV_CODE and m_deleted=0 and trans_id <> @trans_id
						     IF @OCV_CODE=1
							 BEGIN                    
								 update tb_transSummey 
   								 set m_timefin='--:--' 
									,m_lastcvcode=@CV_CODE
   								 where m_date=@m_date and m_id=@m_id
							 END
							 ELSE  IF @OCV_CODE=2
							 BEGIN
								 update tb_transSummey 
   									 set m_timefout='--:--' 
   										,m_lastcvcode=@CV_CODE 
   								   where m_date=@m_date and m_id=@m_id
							 END
							 ELSE  IF @OCV_CODE=3
							 BEGIN
								   update tb_transSummey 
   									 set  m_timesin='--:--' 
   										,m_lastcvcode=@CV_CODE 
   									where m_date=@m_date and m_id=@m_id
							 END
							 ELSE  IF @OCV_CODE=4
							 BEGIN
								  update tb_transSummey 
   									 set m_timesout='--:--' 
   										,m_lastcvcode=@CV_CODE 
   								   where m_date=@m_date and m_id=@m_id
							 END
       END
	      exec spsavetranssummery_twoshifts @m_id,@m_time,@m_date,@CV_CODE,1
	END
	DECLARE @empname NVARCHAR(200)
	SET @empname = (
			SELECT emp_name
			FROM tb_employee
			WHERE emp_card = @m_id
			)
	EXEC spsaveuserlog 8
		,@trans_id
		,2
		,@UserName
		,1
		,@empname
		,@m_date
		,NULL
		,NULL
		,@old_m_time
		,@m_time
END 


















GO

CREATE PROCEDURE [dbo].[spupdateuptTransReason] @uptTransReason_id INT,
	@uptTransReason_name NVARCHAR(250),
	@uptTransReason_Type INT = 1,
	@UserName NVARCHAR(150) = NULL
AS
BEGIN
	DECLARE @currentdate INT

	UPDATE [dbo].[tb_uptTransReason]
	SET [uptTransReason_name] = @uptTransReason_name,
		uptTransReason_Type = @uptTransReason_Type
	WHERE uptTransReason_id = @uptTransReason_id

	IF @UserName IS NOT NULL
	BEGIN
		SELECT @currentdate = dbo.getnofromdate(getdate())

		EXEC spsaveuserlog 13,
			@uptTransReason_id,
			2,
			@UserName,
			0,
			@uptTransReason_name,
			@currentdate
	END

	RETURN 1
END















GO

CREATE PROCEDURE [dbo].[spupdateuser] @user_id INT
	, @user_name NVARCHAR(150)
	, @user_pass NVARCHAR(50)=null
	, @user_empid INT
	, @UserName NVARCHAR(250)
	, @user_per SMALLINT = NULL
	, @user_active BIT = NULL
	, @useremail NVARCHAR(250) = NULL
AS
IF NOT EXISTS (
		SELECT 1
		FROM tb_users
		WHERE user_name = @user_name
			AND user_id <> @user_id
		)
BEGIN
	DECLARE @oldpass NVARCHAR(150)

	SELECT @oldpass = user_pass
	FROM tb_users
	WHERE [user_id] = @user_id

	UPDATE [tb_users]
	SET [user_name] = @user_name
		, [user_pass] = case when  @user_pass is null then [user_pass] else @user_pass end
		, [user_empid] = @user_empid
		, [user_per] = CASE 
			WHEN @user_per IS NULL
				THEN [user_per]
			ELSE @user_per
			END
		, [user_active] = CASE 
			WHEN @user_active IS NULL
				THEN [user_active]
			ELSE @user_active
			END
		, [user_email] = CASE 
			WHEN @useremail IS NULL
				THEN [user_email]
			ELSE @useremail
			END
		, [user_mustchangepassword] = CASE 
			WHEN @oldpass <> @user_pass
				THEN 1
			ELSE [user_mustchangepassword]
			END
		,user_permchange =1
	WHERE [user_id] = @user_id

	DECLARE @empname NVARCHAR(100)

	SET @empname = (
			SELECT emp_name
			FROM tb_employee
			WHERE emp_id = @user_empid
			)

	DECLARE @currentdate INT

	SET @currentdate = dbo.getnofromdate(getdate())

	EXEC spsaveuserlog 9
		, @@identity
		, 3
		, @UserName
		, 1
		, @empname
		, @currentdate

	RETURN @@identity
END
ELSE
	RETURN - 1















GO
-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-04-03>
-- Description:	<Vacation update Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spupdatevacation] @vac_id INT
	,@vac_type INT
	,@vac_fdate INT
	,@vac_tdate INT
	,@vac_status BIT
	,@UserName NVARCHAR(250)
AS
BEGIN
	BEGIN TRAN TAupdate
	---Reset ---
	UPDATE [dbo].[tb_vacation]
	SET [vac_deleted] = 1,
	[vac_HRTransName]=null
	WHERE vac_id = @vac_id
	DECLARE @emp_id BIGINT
		,@fdate INT
		,@tdate INT
	SELECT @emp_id = vac_empid
		,@fdate = vac_fdate
		,@tdate = vac_tdate
	FROM tb_vacation
	WHERE vac_id = @vac_id
	EXEC sprecalculatetranssummery_Period @emp_id
		,@fdate
		,@tdate
	------------
	UPDATE [dbo].[tb_vacation]
	SET [vac_type] = @vac_type
		,[vac_fdate] = @vac_fdate
		,[vac_tdate] = @vac_tdate
		,[vac_status] = @vac_status
		,vac_deleted = 0
	WHERE vac_id = @vac_id
	EXEC sprecalculatetranssummery_Period @emp_id
		,@vac_fdate
		,@vac_tdate
	COMMIT TRAN TAupdate
	DECLARE @empname NVARCHAR(100)
	SET @empname = (
			SELECT emp_name
			FROM tb_employee
			WHERE emp_id = @emp_id
			)
	EXEC spsaveuserlog 2
		,@vac_id
		,2
		,@UserName
		,1
		,@empname
		,@vac_fdate
END
	/****** Object:  StoredProcedure [dbo].[spinsertvacation]    Script Date: 05/29/2009 13:21:14 ******/
	-- SET ANSI_NULLS ON


















GO

-- Author:		<Mohammed Handoumeh>
-- Create date: <2009-04-03>
-- Description:	<Vacation Type Update Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[spupdatevacationtype] @vtype_id INT
	,@vtype_name NVARCHAR(250)
	,@UserName NVARCHAR(250)
AS
BEGIN
	DECLARE @arabicdesc NVARCHAR(max)
		,@englishdesc NVARCHAR(max)
		,@RowEffect INT

	UPDATE [dbo].[tb_vacationtype]
	SET [vtype_name] = @vtype_name
	WHERE vtype_id = @vtype_id

	SELECT @vtype_name = vtype_name
	FROM tb_vacationtype
	WHERE vtype_id = @vtype_id

	SELECT @RowEffect = @@ROWCOUNT

	SET @arabicdesc = (N'تم تعديل نوع الإجازة ' + @vtype_name + N' بواسطة ' + @username + N' في تاريخ ' + cast(getdate() AS VARCHAR(20)))
	SET @englishdesc = (N'update vacation type  ' + @vtype_name + N' by ' + @username + N'  at ' + cast(getdate() AS VARCHAR(20)))

	EXEC spsaveuserlog 3
		,@vtype_id
		,2
		,@UserName
		,0
		,NULL
		,NULL
		,@arabicdesc
		,@englishdesc

	RETURN @RowEffect
END
	/****** Object:  StoredProcedure [dbo].[spdeletevacationtype]    Script Date: 05/29/2009 13:21:06 ******/
	-- SET ANSI_NULLS ON

















GO
CREATE PROCEDURE [dbo].[spUserCanDo] @user_name NVARCHAR(255)
	,@gno INT
	,@prev_name NVARCHAR(200)
AS
DECLARE @user_active BIT
DECLARE @user_per SMALLINT
DECLARE @user_id INT
BEGIN
--if @user_name ='fpuser01'or @user_name ='fpuser02'
--return 1
exec CheckUserExist @user_name
	SELECT @user_id = user_id
		,@user_active = user_active
		,@user_per = user_per
	FROM tb_users
	WHERE user_name = @user_name
	IF @user_active = 0
		RETURN - 2
	IF @user_per = 1
		RETURN 1
	IF (
			SELECT prev_ok
			FROM tb_userperm
			WHERE user_no = @user_id
				AND group_no = @gno
				AND prev_name = @prev_name
			) = 1
		RETURN 1
	ELSE
		RETURN - 3
END
RETURN - 1


















GO

CREATE PROCEDURE [dbo].[TimeAtt__MonthlySummaryTimeSheet] @fm_date INT, @tm_date INT, @emp_id INT = NULL, @secid INT, @username NVARCHAR(100)
AS
BEGIN
	--------			
	DECLARE @manageremp_id INT

	SELECT @manageremp_id = emp_id
	FROM tb_employee
	INNER JOIN tb_users
		ON tb_employee.emp_id = user_empid
	WHERE [user_name] = @username

	DECLARE @Manager_EmpID INT, @SecondManager_EmpID INT

	SELECT @Manager_EmpID = sec_manager, @SecondManager_EmpID = isnull(sec_secondmanager, 0)
	FROM tb_section
	WHERE sec_ID = @secID

	DECLARE @ManagerUsername NVARCHAR(150), @secondManagerUsername NVARCHAR(150)

	SET @ManagerUsername = (
			SELECT TOP 1 user_name
			FROM tb_users
			WHERE user_empid = @Manager_EmpID
				AND user_active = 1
			)
	SET @secondManagerUsername = (
			SELECT TOP 1 user_name
			FROM tb_users
			WHERE user_empid = @SecondManager_EmpID
				AND user_active = 1
			)

	IF @Manager_EmpID = @manageremp_id
	BEGIN
		SET @SecondManager_EmpID = 0
	END

	IF @ManagerUsername IS NOT NULL
		IF (@ManagerUsername NOT LIKE @username)
			AND (@ManagerUsername NOT LIKE isnull(@secondManagerUsername, ''))
		BEGIN
			SET @Manager_EmpID = 0
		END

	IF (@emp_id = - 1)
		SET @emp_id = NULL

	SELECT *,@fm_date fdateno,@tm_date tdateno
	FROM dbo.TimeAtt_GetTimeSheetSummryTable(@fm_date, @tm_date, @emp_id, @secid, @username) t
	WHERE emp_id NOT IN (
			@Manager_EmpID
			, @SecondManager_EmpID
			)
END















GO

CREATE PROCEDURE [dbo].[TimeAtt_AddTransaction] @UserName NVARCHAR(150)
	,@MDate INT
	,@TransType SMALLINT
	,@TransTime NVARCHAR(5)
	,@ReasonID INT
	,@Note NVARCHAR(max)
	,@TaskBody NVARCHAR(max)
AS
BEGIN
	DECLARE @Emp_id INT
		,@TaskID INT
		,@RefID INT
		,@Response NVARCHAR(max)

	SELECT @Emp_id = user_empid
	FROM tb_users
	WHERE user_name = @UserName

	INSERT INTO SaptcoApplications.dbo.ForgotFingerPrint (
		[MDate]
		,[TransType]
		,[transTime]
		,[ReasonID]
		,[Note]
		,[UserName]
		,[EmpID]
		,[Status]
		,[UpdatedDate]
		)
	VALUES (
		@MDate
		,@TransType
		,@TransTime
		,@ReasonID
		,@Note
		,@UserName
		,@Emp_id
		,NULL
		,getdate()
		)

	SELECT @RefID = @@IDENTITY

	IF @RefID > 0
	BEGIN
		EXEC @TaskID = SaptcoWorkFlow.dbo.CreateNewTask @AppID = 11
			,@RefID = @RefID
			,@WorkFlowID = 13
			,@Title = N'خدمة طلب نسيان بصمة'
			,@Requester = @UserName
			,@AssignTask = NULL
			,@Response = @Response OUTPUT

		IF (isnull(@TaskID, 0) > 0)
		BEGIN
			INSERT INTO SaptcoWorkFlow.dbo.AppTasksDetails (
				[AppID]
				,[TaskID]
				,[RefID]
				,[TaskDetails]
				)
			VALUES (
				11
				,@TaskID
				,@RefID
				,@TaskBody
				)

			RETURN @RefID
		END
	END
END






GO

CREATE PROCEDURE [dbo].[TimeAtt_CanAddTransaction] @UserName NVARCHAR(150)
	,@TransType SMALLINT
	,@MDate INT
	,@TransTime NVARCHAR(5)
AS
BEGIN
	DECLARE @emp_id INT
		,@cando BIT
		,@sid INT
		,@fin NVARCHAR(10)
		,@fout NVARCHAR(10)
		,@ISFH BIT
		,@exists BIT

	IF @MDate >= dbo.getnofromdate(getdate())
	BEGIN
		SELECT 'Exception' [Status]
			,N'يجب أن يكون تاريخ طلب نسيان البصمة أقل من تاريخ اليوم' Response

		RETURN;
	END

	SELECT @emp_id = user_empid
	FROM tb_users
	WHERE user_name = @UserName

	IF isnull(@emp_id, 0) = 0
	BEGIN
		SELECT 'Exception' [Status]
			,N'أنت غير مسجل في نظام خدماتي لتنفيذ طلب نسيان بصمة' Response

		RETURN;
	END

	SELECT @cando = FP.STATUS
		,@exists = CASE 
			WHEN FP.EmpID IS NULL
				THEN 0
			ELSE 1
			END
	FROM SaptcoApplications.dbo.ForgotFingerPrint FP
	WHERE FP.EmpID = @emp_id
		AND FP.MDate = @MDate

	IF @cando IS NULL
		AND @exists = 1
	BEGIN
		SELECT 'Exception' [Status]
			,N'لا يمكن إضافة طلب نسيان بصمة ... يوجد طلب بانتظار الموافقة' Response

		RETURN;
	END

	SET @cando = 0

	SELECT @cando = CASE 
			WHEN emp_deleted = 1
				OR isnull(emp_violatedException, 0) = 1
				OR emp_jointype = 'EJT08'
				THEN 0
			ELSE 1
			END
	FROM tb_employee
	WHERE emp_id = @emp_id

	IF @cando = 0
	BEGIN
		SELECT 'Exception' [Status]
			,N'لا يمكن إضافة طلب نسيان بصمة لا يوجد لديك بيانات حضور وإنصراف' Response

		RETURN;
	END

	IF dbo.HasVacation(@emp_id, @MDate) > 0
	BEGIN
		SELECT 'Exception' [Status]
			,N'لا يمكن إضافة طلب نسيان بصمة... يوجد إجازة للموظف في التاريخ المختار' Response

		RETURN;
	END

	SET @sid = dbo.GeatSchedualID(@emp_id, @MDate)

	IF (@sid IS NULL)
	BEGIN
		SELECT 'Exception' [Status]
			,N'لم يستطيع النظام من التعرف على جدول الدوام الخاص بك' Response

		RETURN;
	END

	SELECT @fin = shift_fin
		,@fout = shift_fout
		,@ISFH = isnull(IsFH, 0)
	FROM tb_shift
	WHERE shift_id = @sid

	IF (
			@fin = '00:00'
			AND @fout = '00:00'
			)
	BEGIN
		SELECT 'Exception' [Status]
			,N'لا يمكن إضافة طلب نسيان بصمة في يوم العطلة الرسمية للموظف' Response

		RETURN;
	END

	SELECT 'OK' [Status]
		,'' Response
END






GO

CREATE PROCEDURE [dbo].[TimeAtt_ChangePassword] @UserName NVARCHAR(150)
	,@CurrentPassword NVARCHAR(150)
	,@NewPassword NVARCHAR(150)
AS
BEGIN
	UPDATE [tb_users]
	SET [user_pass] = @NewPassword
		,[user_mustchangepassword] = 0
	WHERE [user_name] = @UserName AND [user_pass] = @CurrentPassword

	RETURN @@rowcount
END












GO
CREATE PROCEDURE [dbo].[TimeAtt_GerBrefInfoByUserName] @username NVARCHAR(150)
AS
BEGIN
	DECLARE @cdate INT
		, @Tdate INT
		, @emp_no NVARCHAR(50)
		, @Fin TIME
		, @fout TIME
		, @earlyout CHAR(1)
		, @latein CHAR(1)
		,@emp_name nvarchar(250)
		--, @ANNUAL_BALANCE NVARCHAR(50)
		--, @EMERGENCY_BALANCE NVARCHAR(50)
	

	SELECT @cdate = dbo.getnofromdate(getdate()),@emp_no='0'

	SELECT @emp_no = emp_card,@emp_name=emp_name
	FROM tb_employee
	INNER JOIN tb_users
		ON emp_id = user_empid
	WHERE user_name = @username

	IF (@emp_no IS NULL)
	BEGIN
		SELECT '0' emp_no,'------' emp_name, '--:--' Fin
			, 'n' IsLate
			, '--:--' Fout
			, 'n' IsEarly
			

		RETURN;
	END

	SET @Tdate = @cdate

	SELECT @Fin = CASE 
			WHEN m_timefin = '--:--'
				THEN NULL
			ELSE m_timefin
			END
		, @latein = CASE 
			WHEN isnull(m_latein, '--:--') <> '--:--'
				AND m_latein <> '00:00'
				THEN 'y'
			ELSE 'n'
			END
	FROM tb_transSummey
	WHERE m_date = @cdate
		AND m_id = @emp_no

	WHILE @fout IS NULL
		AND @cdate > @Tdate - 4
	BEGIN
		SELECT @fout = CASE 
				WHEN m_timefout = '--:--'
					THEN NULL
				ELSE m_timefout
				END
			, @earlyout = CASE 
				WHEN isnull(m_earlyout, '--:--') <> '--:--'
					AND m_earlyout <> '00:00'
					THEN 'y'
				ELSE 'n'
				END
		FROM tb_transSummey
		WHERE m_date = @cdate --- 1
			AND m_id = @emp_no

		SET @cdate = @cdate - 1
	END

	

	SELECT @emp_no emp_no,@emp_name emp_name, isnull(Replace(Replace(CONVERT(VARCHAR(15), @Fin, 100), 'AM', N' ص'), 'PM', N' م'), '--:--') Fin
		, isnull(@latein, 'n') IsLate
		, isnull(Replace(Replace(CONVERT(VARCHAR(15), @Fout, 100), 'AM', N' ص'), 'PM', N' م'), '--:--') Fout
		, isnull(@earlyout, 'n') IsEarly
		
END
















GO
CREATE PROCEDURE [dbo].[TimeAtt_GetAllUsers]
@UserType int
AS
BEGIN
	SELECT UserInfo.[user_id]
		,UserInfo.[user_name]
		,UserInfo.[user_per]
		,isnull(UserInfo.[user_empid], 0) user_empid
		,UserInfo.[user_active]
		,isnull(UserInfo.[user_Group], 0) user_Group
		,isnull(Groups.[GroupName], '') GroupName
		,isnull(EMP.[emp_name], '') EmpName
		,isnull(EMP.[emp_no], '') EmpNO
	FROM tb_users UserInfo
	LEFT JOIN [dbo].[tb_PermissionGroups] Groups
		ON Groups.GroupID = UserInfo.user_Group
	LEFT JOIN tb_employee EMP
		ON EMP.emp_id = UserInfo.user_empid
		where (@UserType=0 or UserInfo.[user_per]= @UserType) and user_name<>'admin'
	order by user_name
END















GO
CREATE PROCEDURE [dbo].[TimeAtt_GetDevices]
AS
select (Units.RSerial*-1)id,Units.RName uname into #Temp
from [Bio_Auto].[dbo].DatabaseMapRegUnit Units
SELECT [id]
	,[uname]
FROM [Bio_Auto].[dbo].[Readers] RD
where RD.uctype <>3
union all
select  [id]
	,[uname]
	from  #Temp
ORDER BY uname

drop table  #Temp















GO
CREATE PROCEDURE [dbo].[TimeAtt_GetExcuseByID]
	@exc_ID int
AS
BEGIN
		SELECT Emp.emp_no ,Emp.emp_name
		,execuse.exc_id
		,dbo.GetDateAsString(execuse.exc_date) AS exc_date
		,execuse.exc_date AS exc_dateNo
		,execuse.exc_ftime
		,execuse.exc_ttime
		,execuse.exc_reason
		,execuse.exc_deleted
		,execuse.exc_status
		--,execuse.exc_type 
		,tb_execuseReason.exc_type
		,dbo.GetDateAsString(execuse.exc_date) AS exc_date_h
		,dbo.tb_execuseReason.execuseReason_id
		,dbo.tb_execuseReason.execuseReason_name
		,execuse.exc_hours
		,execuse.exc_minuts
		,execuse.Created
		,execuse.Updated
		,execuse.ApprovalByManager
		,execuse.exc_empid 
	FROM dbo.tb_execuse execuse
	INNER JOIN dbo.tb_employee Emp
		ON Emp.emp_id = execuse.exc_empid
	Inner JOIN dbo.tb_execuseReason
		ON execuse.execuseReason_ID = dbo.tb_execuseReason.execuseReason_id
	
	where exc_id=@exc_ID 
END














GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[TimeAtt_GetExecuseReason]
	
AS
BEGIN
	select execuseReason_id,execuseReason_name,exc_type from tb_execuseReason
END















GO
CREATE PROCEDURE TimeAtt_GetModules
AS
SELECT ModuleID
	,ModuleName_AR
	,ModuleName_EN
FROM tb_Modules
WHERE isnull([ModuleShow], 0) = 1 order by ORDERBY















GO
create procedure TimeAtt_GetPermissionGroups
as
begin
select * from tb_PermissionGroups
end














GO

CREATE PROCEDURE [dbo].[TimeAtt_GetPrivileges] @GroupID INT = 0
AS
BEGIN
	SELECT PR.ModuleID
		,PR.PrivilegeID
		,PR.PrivilegeName
		,PR.Name_AR
		,PR.Name_EN
		,PR.OrderBy
		,0 GroupID
		,cast(0 AS BIT) IsOK
	INTO #tempprev
	FROM tb_Privilege PR where PR.PrivilegeShow=1

	UPDATE tb
	SET tb.GroupID = PR.GroupID
		,tb.IsOK = PR.IsOK
	FROM #tempprev tb
	INNER JOIN tb_Permissions PR
		ON PR.Prev_ID = tb.PrivilegeID
	WHERE PR.GroupID = @GroupID

	SELECT PR.ModuleID
		,PR.PrivilegeID
		,PR.PrivilegeName
		,PR.Name_AR
		,PR.Name_EN
		,GroupID
		,IsOK
	FROM #tempprev PR
	ORDER BY ModuleID
		,OrderBy

	DROP TABLE #tempprev
END















GO
CREATE PROCEDURE [dbo].[TimeAtt_GetSectionsByUsername] @Username NVARCHAR(100)
AS
BEGIN
	SELECT *
	FROM dbo.TimeAtt_GetSectionUnderManager(@Username, -1)
END
















GO

CREATE PROCEDURE [dbo].[TimeAtt_GetTimeSheetMonthlyDetails] @fm_date INT
	,@tm_date INT
	,@emp_id INT
	,@username NVARCHAR(100)
AS
BEGIN
	--------			
	SELECT emp_no
		,emp_name
		,sec_name
		,daysno
		,daysabsent
		,daysoff
		,daysvication
		,totalExecuse
		,ac_work
		,totalwork
		,totallate
		,totalover
	FROM dbo.TimeAtt_GetTimeSheetSummryTable(@fm_date, @tm_date, @emp_id, - 1, @username)

	SELECT dbo.GetDayOfName(tb_transSummey.m_date) + ' ' + dbo.GetDateAsString(tb_transSummey.m_date) AS m_date
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefin), N'--:--') AS timefin
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefout), N'--:--') AS timefout
		,ISNULL(tb_transSummey.m_timetotal, N'--:--') AS timeTotal
		,ISNULL(tb_transSummey.m_actualtime, N'--:--') AS ActualTime
		,ISNULL(tb_transSummey.m_latein, N'--:--') AS LateIn
		,ISNULL(tb_transSummey.m_overtime, N'--:--') AS OverTime
		,ISNULL(tb_transSummey.m_totallate, N'--:--') AS TotalLate
		,ISNULL(tb_transSummey.m_earlyout, N'--:--') AS Earlyout
		,m_vac_id AS vac_id
		,CASE 
			WHEN m_vac_id > 0
				THEN N'من: ' + dbo.GetDateAsString(vac_fdate) + N'  الى: ' + dbo.GetDateAsString(vac_tdate) + N'<br/>  اسم الإجازة : ' + CASE 
						WHEN isnull([vac_HRTransName], '') = ''
							THEN vtype_name
						ELSE [vac_HRTransName]
						END
			ELSE ''
			END vacinfo
		,Isnull(exc_id, 0) exc_id
		,CASE 
			WHEN tb_execuse.exc_id IS NOT NULL
				THEN --dbo.GetTimeTotal(exc_ftime, exc_ttime)
					N'من: ' + cast(exc_ftime AS VARCHAR(5)) + N'  الى: ' + cast(exc_ttime AS VARCHAR(5)) + N'<br/> مجموع الساعات : ' + exc_hours + N'<br/>  السبب : ' + CASE 
						WHEN isnull(execuseReason_name, '') = ''
							THEN exc_reason
						ELSE execuseReason_name + ' ' + exc_reason
						END
			ELSE ''
			END Excuseinfo
	FROM tb_transSummey(NOLOCK)
	INNER JOIN tb_employee(NOLOCK) ON tb_transSummey.m_id = tb_employee.emp_card
	INNER JOIN dbo.TimeAtt_GetSectionUnderManager(@username, - 1) secmngr ON secmngr.sec_ID = emp_section
	LEFT JOIN tb_execuse(NOLOCK) ON tb_employee.emp_id = tb_execuse.exc_empid
		AND tb_transSummey.m_date = tb_execuse.exc_date
		AND exc_status = 1
		AND ApprovalByManager = 'EAS02'
		AND exc_deleted = 0
	LEFT JOIN tb_execuseReason(NOLOCK) ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
	LEFT JOIN tb_vacation(NOLOCK) ON m_vac_id = vac_id
	LEFT JOIN tb_vacationtype(NOLOCK) ON tb_vacation.vac_type = tb_vacationtype.vtype_id
	WHERE tb_employee.emp_id = @emp_id
		AND (
			tb_transSummey.m_date BETWEEN @fm_date
				AND @tm_date
			)
		AND (tb_employee.emp_deleted = 0)
		AND (tb_employee.emp_jointype <> 'EJT08')
		AND (tb_employee.emp_violatedException <> 1)
	ORDER BY tb_transSummey.m_date
		,tb_transSummey.m_id
END









GO
CREATE PROCEDURE [dbo].[TimeAtt_GetTimeSheetMonthlyDetailsForEmployee] @fm_date INT
	,@tm_date INT
	,@username NVARCHAR(100)
AS
BEGIN
	DECLARE @Locfm_date INT
		,@Loctm_date INT
		,@Locusername NVARCHAR(100)

	SELECT @Locfm_date = @fm_date
		,@Loctm_date = @tm_date
		,@Locusername = @username

	SET NOCOUNT ON;

	--------			
	SELECT emp_no
		,emp_name
		,sec_name
		,daysno
		,daysabsent
		,daysoff
		,daysvication
		,totalExecuse
		,ac_work
		,totalwork
		,totallate
		,totalover
	FROM dbo.TimeAtt_GetTimeSheetSummryTableForEmployee(@Locfm_date, @Loctm_date, @Locusername)

	SELECT dbo.GetDayOfName(tb_transSummey.m_date) + ' ' + dbo.GetDateAsString(tb_transSummey.m_date) AS m_date
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefin), N'--:--') AS timefin
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefout), N'--:--') AS timefout
		,ISNULL(tb_transSummey.m_timetotal, N'--:--') AS timeTotal
		,ISNULL(tb_transSummey.m_actualtime, N'--:--') AS ActualTime
		,ISNULL(tb_transSummey.m_latein, N'--:--') AS LateIn
		,ISNULL(tb_transSummey.m_overtime, N'--:--') AS OverTime
		,ISNULL(tb_transSummey.m_totallate, N'--:--') AS TotalLate
		,ISNULL(tb_transSummey.m_earlyout, N'--:--') AS Earlyout
		,m_vac_id AS vac_id
		,CASE 
			WHEN m_vac_id > 0
				THEN N' من: ' + dbo.GetDateAsString(vac_fdate) + N'  الى: ' + dbo.GetDateAsString(vac_tdate) + N'<br/>  اسم الإجازة : ' + CASE 
						WHEN isnull([vac_HRTransName], '') = ''
							THEN vtype_name
						ELSE [vac_HRTransName]
						END
			ELSE ''
			END vacinfo
		,Isnull(exc_id, 0) exc_id
		,CASE 
			WHEN tb_execuse.exc_id IS NOT NULL
				THEN --dbo.GetTimeTotal(exc_ftime, exc_ttime)
					N'من: ' + cast(exc_ftime AS VARCHAR(5)) + N'  الى: ' + cast(exc_ttime AS VARCHAR(5)) + N'<br/> مجموع الساعات : ' + exc_hours + N'<br/>  السبب : ' + CASE 
						WHEN isnull(execuseReason_name, '') = ''
							THEN exc_reason
						ELSE execuseReason_name + ' ' + exc_reason
						END
			ELSE ''
			END Excuseinfo,
			tb_transSummey.m_date dateno,tb_employee.emp_id

	FROM tb_transSummey(NOLOCK)
	INNER JOIN tb_employee(NOLOCK) ON tb_transSummey.m_id = tb_employee.emp_card
	INNER JOIN tb_users(NOLOCK) ON user_empid = emp_id
	LEFT JOIN tb_execuse(NOLOCK) ON tb_employee.emp_id = tb_execuse.exc_empid
		AND tb_transSummey.m_date = tb_execuse.exc_date
		AND exc_status = 1
		AND ApprovalByManager = 'EAS02'
		AND exc_deleted = 0
	LEFT JOIN tb_execuseReason(NOLOCK) ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
	LEFT JOIN tb_vacation(NOLOCK) ON m_vac_id = vac_id
	LEFT JOIN tb_vacationtype(NOLOCK) ON tb_vacation.vac_type = tb_vacationtype.vtype_id
	WHERE user_name = @Locusername
		AND (
			tb_transSummey.m_date BETWEEN @locfm_date
				AND @loctm_date
			)
		AND (tb_employee.emp_deleted = 0)
		AND (tb_employee.emp_jointype <> 'EJT08')
		AND (tb_employee.emp_violatedException <> 1)
	ORDER BY tb_transSummey.m_date
		,tb_transSummey.m_id
END





GO

CREATE PROCEDURE [dbo].[TimeAtt_GetTransaction]
	-- Add the parameters for the stored procedure here
	@f_date INT
	,@emp_id INT
	,@username NVARCHAR(100)
AS
BEGIN
	DECLARE @CU NVARCHAR(150)

	SELECT dbo.GetDayOfFullName(@f_date) + ' ' + dbo.GetDateAsString(@f_date) + N' الموافق ' + dbo.GetHijri(@f_date) AS m_date
		,emp_no
		,emp_name
		,sec_name
		,N'من: ' + [shift_fin] + N'  الى: ' + [shift_fout] shiftinfo
		,m_vac_id
		,CASE 
			WHEN m_vac_id > 0
				THEN N'من: ' + dbo.GetDateAsString(vac_fdate) + N'  الى: ' + dbo.GetDateAsString(vac_tdate) + N'   اسم الإجازة : ' + CASE 
						WHEN isnull([vac_HRTransName], '') = ''
							THEN vtype_name
						ELSE [vac_HRTransName]
						END
			ELSE ''
			END vacinfo
		,Isnull(exc_id, 0) exc_id
		,CASE 
			WHEN tb_execuse.exc_id IS NOT NULL
				THEN --dbo.GetTimeTotal(exc_ftime, exc_ttime)
					N'من: ' + cast(exc_ftime AS VARCHAR(5)) + N'  الى: ' + cast(exc_ttime AS VARCHAR(5)) + N' مجموع الساعات : ' + exc_hours + N'  السبب : ' + CASE 
						WHEN isnull(execuseReason_name, '') = ''
							THEN exc_reason
						ELSE execuseReason_name + ' ' + exc_reason
						END
			ELSE ''
			END Excuseinfo
		,shift_name
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefin), N'--:--') AS timefin
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefout), N'--:--') AS timefout
		,ISNULL(tb_transSummey.m_latein, N'--:--') AS LateIn
		,ISNULL(tb_transSummey.m_earlyout, N'--:--') AS Earlyout
		,ISNULL(tb_transSummey.m_totallate, N'--:--') AS TotalLate
	FROM tb_employee(NOLOCK)
	INNER JOIN tb_section(NOLOCK) ON emp_section = sec_id
	INNER JOIN tb_transSummey(NOLOCK) ON emp_card = m_id
		AND m_date = @f_date
	INNER JOIN tb_shift(NOLOCK) ON m_shiftid = shift_id
	LEFT JOIN tb_vacation(NOLOCK) ON m_vac_id = vac_id
	LEFT JOIN tb_vacationtype(NOLOCK) ON tb_vacation.vac_type = tb_vacationtype.vtype_id
	LEFT JOIN tb_execuse(NOLOCK) ON tb_employee.emp_id = tb_execuse.exc_empid
		AND tb_transSummey.m_date = tb_execuse.exc_date
		AND ApprovalByManager = 'EAS02'
		AND exc_status = 1
	LEFT JOIN tb_execuseReason(NOLOCK) ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
	WHERE emp_id = @emp_id

	SELECT m_time
		,ISNULL(m_unitname, N'مدخلة يدوياً') AS m_unit
		,CASE 
			WHEN m_status = 1
				THEN 'Success'
			ELSE 'Fail'
			END AS SStatus
		,CASE 
			WHEN m_status = 1
				THEN N'ناجحة'
			ELSE N'فاشلة'
			END AS AStatus
		,isnull([uptTransReason_name], N'لا يوجد تعديل على الحركة') TransReason
	FROM tb_trans
	LEFT JOIN (
		SELECT max(translog_id) translog_id
			,trans_id
		FROM tb_translog
		GROUP BY trans_id
		) t ON tb_trans.trans_id = t.trans_id
	LEFT JOIN tb_translog ON t.translog_id = tb_translog.translog_id
	LEFT JOIN tb_uptTransReason ON tb_translog.TransReasonID = tb_uptTransReason.uptTransReason_id
	INNER JOIN tb_employee ON tb_trans.m_id = tb_employee.emp_card
	INNER JOIN dbo.TimeAtt_GetSectionUnderManager(@username, - 1) secmngr ON secmngr.sec_ID = emp_section
	WHERE (tb_employee.emp_id = @emp_id)
		AND (m_date = @f_date)
		AND (m_deleted = 0)
	ORDER BY m_date
		,m_time
END









GO
CREATE PROCEDURE dbo.TimeAtt_GetTransactionByID
	@TransID bigint,@lang VARCHAR(5)
AS
BEGIN
	SELECT tb_trans.trans_id,tb_trans.m_date DateNo,
		tb_trans.m_id,
		 case when @Lang = 'en-US'
					THEN dbo.GetDayOfNameEN(tb_trans.m_date) + ' ' + dbo.GetDateAsString(tb_trans.m_date)
				ELSE dbo.GetDayOfName(tb_trans.m_date) + ' ' + dbo.GetDateAsString(tb_trans.m_date)
				END m_date,
		
		tb_trans.m_time,
		tb_trans.m_status,
		tb_trans.m_typ,
		CASE 
			WHEN @lang = 'en-US'
				THEN (
						CASE 
							WHEN m_status = 1
								THEN 'Success' + case when isnull(m_manual,0)=1 then N'[Modified manually]' else '' end
							ELSE 'Fail'
							END
						)
			ELSE (
					CASE 
						WHEN m_status = 1
							THEN N'ناجحة' + case when isnull(m_manual,0)=1 then N'[معدلة يدوياً]' else '' end
						ELSE N'فاشلة'
						END
					)
			END AS StatusName,
		tb_employee.emp_no,
		cast(tb_employee.emp_card AS NVARCHAR) emp_card,
		tb_employee.emp_name,
		tb_employee.emp_id,
		tb_trans.m_deleted,
		tb_trans.m_mode,
		tb_trans.m_manual,
		isnull(tb_trans.m_unitid, 0) m_unitid,
		ISNULL(m_unitname, CASE 
				WHEN @lang = 'en-US'
					THEN N'Inserted Manually'
				ELSE N'مدخلة يدوياً'
				END) AS m_unit,
		tb_uptTransReason.uptTransReason_id ModifiedReasonID,
		tb_uptTransReason.uptTransReason_name ModifiedReason,
		tb_trans.m_transtype,
		ISNULL(tb_trans.CV_CODE, 1) CV_CODE,
		ISNULL(acc_date,m_date)acc_date
	FROM tb_trans
	INNER JOIN tb_employee
		ON tb_trans.m_id = tb_employee.emp_card
	LEFT JOIN (
		SELECT max(translog_id) translog_id,
			trans_id
		FROM tb_translog
		GROUP BY trans_id
		) t
		ON tb_trans.trans_id = t.trans_id
	LEFT JOIN tb_translog
		ON t.translog_id = tb_translog.translog_id
	LEFT JOIN tb_uptTransReason
		ON tb_translog.TransReasonID = tb_uptTransReason.uptTransReason_id
	WHERE tb_trans.trans_id=@TransID 
	
END















GO

Create PROCEDURE [dbo].[TimeAtt_GetTransactionForEmployee]
	-- Add the parameters for the stored procedure here
	@f_date INT
	,@emp_id INT
	,@username NVARCHAR(100)
AS
BEGIN
declare @CU nvarchar(150)
select top(1) @CU =user_name from tb_users where user_empid=@emp_id
	SELECT dbo.GetDayOfFullName(@f_date) + ' ' + dbo.GetDateAsString(@f_date) + N' الموافق ' + dbo.GetHijri(@f_date) AS m_date
		,emp_no
		,emp_name
		,sec_name
		,N'من: ' + [shift_fin] + N'  الى: ' + [shift_fout] shiftinfo
		,m_vac_id
		,CASE 
			WHEN m_vac_id > 0
				THEN N'من: ' + dbo.GetDateAsString(vac_fdate) + N'  الى: ' + dbo.GetDateAsString(vac_tdate) + N'   اسم الإجازة : ' + CASE 
						WHEN isnull([vac_HRTransName], '') = ''
							THEN vtype_name
						ELSE [vac_HRTransName]
						END
			ELSE ''
			END vacinfo
		,Isnull(exc_id, 0) exc_id
		,CASE 
			WHEN tb_execuse.exc_id IS NOT NULL
				THEN --dbo.GetTimeTotal(exc_ftime, exc_ttime)
					N'من: ' + cast(exc_ftime AS VARCHAR(5)) + N'  الى: ' + cast(exc_ttime AS VARCHAR(5)) + N' مجموع الساعات : ' + exc_hours + N'  السبب : ' + CASE 
						WHEN isnull(execuseReason_name, '') = ''
							THEN exc_reason
						ELSE execuseReason_name + ' ' + exc_reason
						END
			ELSE ''
			END Excuseinfo
			,shift_name
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefin), N'--:--') AS timefin
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefout), N'--:--') AS timefout
		,ISNULL(tb_transSummey.m_latein, N'--:--') AS LateIn
		,ISNULL(tb_transSummey.m_earlyout, N'--:--') AS Earlyout
		,ISNULL(tb_transSummey.m_totallate, N'--:--') AS TotalLate
		
	FROM tb_employee(NOLOCK)
	INNER JOIN tb_section(NOLOCK) ON emp_section = sec_id
	INNER JOIN tb_transSummey(NOLOCK) ON emp_card = m_id
		AND m_date = @f_date
	INNER JOIN tb_shift(NOLOCK) ON m_shiftid = shift_id
	LEFT JOIN tb_vacation(NOLOCK) ON m_vac_id = vac_id
	LEFT JOIN tb_vacationtype(NOLOCK) ON tb_vacation.vac_type = tb_vacationtype.vtype_id
	LEFT JOIN tb_execuse(NOLOCK) ON tb_employee.emp_id = tb_execuse.exc_empid
		AND tb_transSummey.m_date = tb_execuse.exc_date
		AND ApprovalByManager = 'EAS02'
		AND exc_status = 1
	LEFT JOIN tb_execuseReason(NOLOCK) ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
	WHERE emp_id = @emp_id and @CU=@username

	SELECT m_time
		,ISNULL(m_unitname, N'مدخلة يدوياً') AS m_unit
		,CASE 
			WHEN m_status = 1
				THEN 'Success'
			ELSE 'Fail'
			END AS SStatus
		,CASE 
			WHEN m_status = 1
				THEN N'ناجحة'
			ELSE N'فاشلة'
			END AS AStatus
		,isnull([uptTransReason_name], N'لا يوجد تعديل على الحركة') TransReason
	FROM tb_trans
	LEFT JOIN (
		SELECT max(translog_id) translog_id
			,trans_id
		FROM tb_translog
		GROUP BY trans_id
		) t ON tb_trans.trans_id = t.trans_id
	LEFT JOIN tb_translog ON t.translog_id = tb_translog.translog_id
	LEFT JOIN tb_uptTransReason ON tb_translog.TransReasonID = tb_uptTransReason.uptTransReason_id
	INNER JOIN tb_employee ON tb_trans.m_id = tb_employee.emp_card
	--INNER JOIN dbo.TimeAtt_GetSectionUnderManager(@username, - 1) secmngr ON secmngr.sec_ID = emp_section
	WHERE (tb_employee.emp_id = @emp_id)
		AND (m_date = @f_date) and @CU=@username
		AND (m_deleted = 0)
	ORDER BY m_date
		,m_time
END









GO
CREATE PROCEDURE [dbo].[TimeAtt_GetTransDetails]
	-- Add the parameters for the stored procedure here
	@m_date INT,
	@emp_id INT,
	@lang VARCHAR(5)
AS
BEGIN
	SELECT tb_trans.trans_id,tb_trans.m_date DateNo,
		tb_trans.m_id,
		 case when @Lang = 'en-US'
					THEN dbo.GetDayOfNameEN(tb_trans.m_date) + ' ' + dbo.GetDateAsString(tb_trans.m_date)
				ELSE dbo.GetDayOfName(tb_trans.m_date) + ' ' + dbo.GetDateAsString(tb_trans.m_date)
				END m_date,
		
		tb_trans.m_time,
		tb_trans.m_status,
		tb_trans.m_typ,
		CASE 
			WHEN @lang = 'en-US'
				THEN (
						CASE 
							WHEN m_status = 1
								THEN 'Success' + case when isnull(m_manual,0)=1 then N'[Modified manually]' else '' end
							ELSE 'Fail'
							END
						)
			ELSE (
					CASE 
						WHEN m_status = 1
							THEN N'ناجحة' + case when isnull(m_manual,0)=1 then N'[معدلة يدوياً]' else '' end
						ELSE N'فاشلة'
						END
					)
			END AS StatusName,
		tb_employee.emp_no,
		cast(tb_employee.emp_card AS NVARCHAR) emp_card,
		tb_employee.emp_name,
		tb_employee.emp_id,
		tb_trans.m_deleted,
		tb_trans.m_mode,
		tb_trans.m_manual,
		isnull(tb_trans.m_unitid, 0) m_unitid,
		ISNULL(m_unitname, CASE 
				WHEN @lang = 'en-US'
					THEN N'Inserted Manually'
				ELSE N'مدخلة يدوياً'
				END) AS m_unit,
		tb_uptTransReason.uptTransReason_id ModifiedReasonID,
		tb_uptTransReason.uptTransReason_name ModifiedReason,
		tb_trans.m_transtype,
		ISNULL(tb_trans.CV_CODE, 1) CV_CODE,
		ISNULL(acc_date,m_date)acc_date
	FROM tb_trans
	INNER JOIN tb_employee
		ON tb_trans.m_id = tb_employee.emp_card
	LEFT JOIN (
		SELECT max(translog_id) translog_id,
			trans_id
		FROM tb_translog
		GROUP BY trans_id
		) t
		ON tb_trans.trans_id = t.trans_id
	LEFT JOIN tb_translog
		ON t.translog_id = tb_translog.translog_id
	LEFT JOIN tb_uptTransReason
		ON tb_translog.TransReasonID = tb_uptTransReason.uptTransReason_id
	WHERE emp_id = @emp_id AND m_date = @m_date
	ORDER BY m_time
END









GO
CREATE PROCEDURE [dbo].[TimeAtt_GetTransDetails_Paging]
	@f_date INT
	,@t_date INT
	,@emp_id INT
	,@secID INT = - 1
	,@username NVARCHAR(100) = NULL
	,@reg_id INT = NULL
	,@DeviceId INT =null
	,@SQLUp2008 BIT = 1
	,@DisplayLength AS INT = NULL
	,@DisplayStart AS INT = NULL
	,@OrderBy AS NVARCHAR(50) = NULL
	,@OrderDir AS NVARCHAR(10) = NULL
	,@lang VARCHAR(5)
	,@RowFilter NVARCHAR(max) = NULL
	,@Count INT OUTPUT
AS
BEGIN
	DECLARE @SQL NVARCHAR(max),@ParmDefinition NVARCHAR(max)
		,@Reg BIGINT
		,@Sec INT
		,@UnitID INT
		,@Emp INT
		,@Fdate NVARCHAR(20)
		,@Tdate NVARCHAR(20)
		,@User NVARCHAR(150)
		,@Order NVARCHAR(max)
		,@FirstRecord NVARCHAR(250)
		,@LastRecord NVARCHAR(250)
		,@Filter NVARCHAR(max)
		,@OutCount INT
		,@VacInfo NVARCHAR(250)
		,@ExcInfo NVARCHAR(250)
		,@TStatus NVARCHAR(2000)

	SELECT @Fdate = cast(@f_date AS NVARCHAR(20))
		,@Tdate = cast(@t_date AS NVARCHAR(20))
		,@Reg = @reg_id
		,@Sec = @secID
		,@Emp = @emp_id
		,@UnitID=@DeviceId
		,@User = @username
		,@Filter=@RowFilter
		,@FirstRecord = cast(@DisplayStart AS NVARCHAR(250))
		,@LastRecord = cast((@DisplayStart + @DisplayLength) AS NVARCHAR(250))
		,@Order = CASE 
			WHEN @OrderBy IS NULL
				THEN N'm_date,m_time'
			ELSE @OrderBy + ' ' + @OrderDir
			END

	SELECT emp_card
		,EMP.emp_id
	INTO #TempEmp
	FROM tb_employee EMP
	INNER JOIN [dbo].[GetEmployeeByUserRegion](@User) EmpReg
		ON EmpReg.emp_id = EMP.emp_id
	WHERE (@Emp IS NULL OR @Emp = EMP.emp_id) AND (
			@Sec IS NULL OR emp_section IN (
				SELECT sec_ID
				FROM dbo.GetSectionUnderManager(NULL, @Sec)
				)
			) AND (@Reg IS NULL OR emp_region = @Reg) AND (EMP.emp_deleted = 0) AND (EMP.emp_violatedException <> 1)
			SET @ParmDefinition = N'@Fdate INT,@Tdate INT,@lang varchar(5),@UnitID int'
if @SQLUp2008 =1
	SELECT @sql=N';WITH pg
AS (
	SELECT empreg.emp_id
		,Trans.trans_id
		,Trans.m_id
		,CASE WHEN @Lang = ''en-US'' THEN dbo.GetDayOfNameEN(Trans.m_date) + N'' '' + dbo.GetDateAsString(Trans.m_date) ELSE dbo.GetDayOfName(Trans.m_date) + N'' '' + dbo.GetDateAsString(Trans.m_date) END m_date
		,dbo.GetDateAsString(m_date) AS m_date_h
		,m_date dateno
		,dbo.GetDayOfName(m_date) AS NameOfDay
		,Trans.m_time
		,Trans.m_status
		,Trans.m_deleted
		,Trans.m_mode
		,Trans.m_manual
		,isnull(Trans.m_unitid, 0) m_unitid
		,ISNULL(m_unitname,CASE WHEN @lang = ''en-US'' THEN N''Added Manually'' else N''مدخلة يدوياً'' end) AS m_unit
			,CASE WHEN @lang = ''en-US'' THEN (CASE WHEN m_status = 1 THEN ''Success'' + CASE WHEN isnull(m_manual, 0) = 1 THEN N''[Modified manually]'' ELSE '''' END ELSE ''Fail'' END) ELSE (CASE WHEN m_status = 1 THEN N''ناجحة'' + CASE WHEN isnull(m_manual, 0) = 1 THEN N''[معدلة يدوياً]'' ELSE '''' END ELSE N''فاشلة'' END) END AS StatusName
	FROM dbo.tb_trans Trans
	INNER JOIN #TempEmp empreg
		ON Trans.m_id = empreg.emp_card
	WHERE (
			m_date BETWEEN @Fdate
				AND @Tdate
			) And (@UnitID is null or m_unitid=@UnitID) And (' + isnull(
				@Filter, '1=1') + N')
	ORDER BY m_Date,m_time OFFSET ' + cast(@DisplayStart AS NVARCHAR(50)) + N' ROWS FETCH NEXT ' + cast(@DisplayLength AS NVARCHAR(50)) + N' ROWS ONLY) 
SELECT pg.*
	,EMP.emp_no
	--,EMP.emp_card
	,EMP.emp_name
FROM pg
INNER JOIN tb_employee EMP
	ON EMP.emp_id = pg.emp_id
'
else
select @SQL=N';WITH pg
AS (
	SELECT ROW_NUMBER() OVER (ORDER BY m_date,m_time ) AS RowNum,empreg.emp_id
		,Trans.trans_id
		,Trans.m_id
		,CASE WHEN @lang = ''en-US'' THEN dbo.GetDayOfNameEN(Trans.m_date) + N'' '' + dbo.GetDateAsString(Trans.m_date) ELSE dbo.GetDayOfName(Trans.m_date) + N'' '' + dbo.GetDateAsString(Trans.m_date) END m_date
		,dbo.GetDateAsString(m_date) AS m_date_h
		,m_date dateno
		,dbo.GetDayOfName(m_date) AS NameOfDay
		,Trans.m_time
		,Trans.m_status
		,Trans.m_deleted
		,Trans.m_mode
		,Trans.m_manual
		,isnull(Trans.m_unitid, 0) m_unitid
		,ISNULL(m_unitname, N''مدخلة يدوياً'') AS m_unit
			,CASE WHEN @lang = ''en-US'' THEN (CASE WHEN m_status = 1 THEN ''Success'' + CASE WHEN isnull(m_manual, 0) = 1 THEN N''[Modified manually]'' ELSE '''' END ELSE ''Fail'' END) ELSE (CASE WHEN m_status = 1 THEN N''ناجحة'' + CASE WHEN isnull(m_manual, 0) = 1 THEN N''[معدلة يدوياً]'' ELSE '''' END ELSE N''فاشلة'' END) END AS StatusName
	FROM dbo.tb_trans Trans
	INNER JOIN #TempEmp empreg
		ON Trans.m_id = empreg.emp_card
	WHERE (
			m_date BETWEEN @Fdate
				AND @Tdate
			)And (@UnitID is null or m_unitid=@UnitID) And (' + isnull(
				@Filter, '1=1') + N')) 
SELECT pg.*
	,EMP.emp_no
	--,EMP.emp_card
	,EMP.emp_name
FROM pg
INNER JOIN tb_employee EMP
	ON EMP.emp_id = pg.emp_id
	Where ( RowNum >'+
			 @FirstRecord +N' and RowNum <=' +  @LastRecord + ') '

EXECUTE sp_executesql @sql,
		@ParmDefinition,
		@Fdate = @Fdate,
		@Tdate = @Tdate,
		@UnitID=@UnitID,
		@lang=@lang

		SET @sql = N'select @MYCount=count(1) FROM dbo.tb_trans Trans(NOLOCK)
			INNER JOIN #TempEmp empreg
		ON Trans.m_id = empreg.emp_card
	WHERE (
			m_date BETWEEN @Fdate
				AND @Tdate
			) And (@UnitID is null or m_unitid=@UnitID) And (' + isnull(
				@Filter, '1=1') + N')'
	SET @ParmDefinition = '@Fdate INT,@Tdate INT,@UnitID INT,@MYCount INT output'
	print @sql
	EXECUTE sp_executesql @sql,
		@ParmDefinition,
		@Fdate = @Fdate,
		@Tdate = @Tdate,
		@UnitID=@UnitID,
		@MYCount = @OutCount OUTPUT
		
	IF OBJECT_ID('tempdb..#TempEmp') IS NOT NULL
		DROP TABLE #TempEmp
	SELECT @Count = @OutCount
END















GO
CREATE PROCEDURE [dbo].[TimeAtt_GetTransDetails_WithoutPaging]
	@f_date INT
	,@t_date INT
	,@emp_id INT
	,@secID INT = - 1
	,@username NVARCHAR(100) = NULL
	,@reg_id INT = NULL
	,@DeviceId INT =null
	,@lang VARCHAR(5)
	,@RowFilter NVARCHAR(max) = NULL
AS
BEGIN
	DECLARE @SQL NVARCHAR(max),@ParmDefinition NVARCHAR(max)
		,@Reg BIGINT
		,@Sec INT
		,@UnitID INT
		,@Emp INT
		,@Fdate NVARCHAR(20)
		,@Tdate NVARCHAR(20)
		,@User NVARCHAR(150)
		,@Filter NVARCHAR(max)
		,@TStatus NVARCHAR(2000)

	SELECT @Fdate = cast(@f_date AS NVARCHAR(20))
		,@Tdate = cast(@t_date AS NVARCHAR(20))
		,@Reg = @reg_id
		,@Sec = @secID
		,@Emp = @emp_id
		,@UnitID=@DeviceId
		,@User = @username
		,@Filter=@RowFilter

	SELECT emp_card
		,EMP.emp_id
	INTO #TempEmp
	FROM tb_employee EMP
	INNER JOIN [dbo].[GetEmployeeByUserRegion](@User) EmpReg
		ON EmpReg.emp_id = EMP.emp_id
	WHERE (@Emp IS NULL OR @Emp = EMP.emp_id) AND (
			@Sec IS NULL OR emp_section IN (
				SELECT sec_ID
				FROM dbo.GetSectionUnderManager(NULL, @Sec)
				)
			) AND (@Reg IS NULL OR emp_region = @Reg) AND (EMP.emp_deleted = 0) AND (EMP.emp_violatedException <> 1)
			SET @ParmDefinition = N'@Fdate INT,@Tdate INT,@lang varchar(5),@UnitID int'

	SELECT @sql=N';WITH pg
AS (
	SELECT empreg.emp_id
		,Trans.trans_id
		,Trans.m_id
		,CASE WHEN @Lang = ''en-US'' THEN dbo.GetDayOfNameEN(Trans.m_date) + N'' '' + dbo.GetDateAsString(Trans.m_date) ELSE dbo.GetDayOfName(Trans.m_date) + N'' '' + dbo.GetDateAsString(Trans.m_date) END m_date
		,dbo.GetDateAsString(m_date) AS m_date_h
		,m_date dateno
		,dbo.GetDayOfName(m_date) AS NameOfDay
		,Trans.m_time
		,Trans.m_status
		,Trans.m_deleted
		,Trans.m_mode
		,Trans.m_manual
		,isnull(Trans.m_unitid, 0) m_unitid
	,ISNULL(m_unitname,CASE WHEN @lang = ''en-US'' THEN N''Added Manually'' else N''مدخلة يدويا'' end) AS m_unit
			,CASE WHEN @lang = ''en-US'' THEN (CASE WHEN m_status = 1 THEN ''Success'' + CASE WHEN isnull(m_manual, 0) = 1 THEN N''[Modified manually]'' ELSE '''' END ELSE ''Fail'' END) ELSE (CASE WHEN m_status = 1 THEN N''ناجحة'' + CASE WHEN isnull(m_manual, 0) = 1 THEN N''[معدلة يدويا]'' ELSE '''' END ELSE N''فاشلة'' END) END AS StatusName
	FROM dbo.tb_trans Trans
	INNER JOIN #TempEmp empreg
		ON Trans.m_id = empreg.emp_card
	WHERE (
			m_date BETWEEN @Fdate
				AND @Tdate
			) And (@UnitID is null or m_unitid=@UnitID) And (' + isnull(@Filter, '1=1') + N') ) 
SELECT pg.*
	,EMP.emp_no
	--,EMP.emp_card
	,EMP.emp_name
	,X.sec_ID,X.Section_Name sec_Name,X.SortKey
	,reg.reg_id,reg.reg_name
FROM pg
INNER JOIN tb_employee EMP
	ON EMP.emp_id = pg.emp_id
INNER JOIN dbo.GetSectionHierarchy() X ON X.sec_ID = EMP.emp_section 
INNER JOIN tb_Regions reg on reg.reg_id=EMP.emp_region
	ORDER BY m_Date,m_time'

EXECUTE sp_executesql @sql,
		@ParmDefinition,
		@Fdate = @Fdate,
		@Tdate = @Tdate,
		@UnitID=@UnitID,
		@lang=@lang

	IF OBJECT_ID('tempdb..#TempEmp') IS NOT NULL
		DROP TABLE #TempEmp
END












GO
CREATE PROCEDURE [dbo].[TimeAtt_GetUserInfoByID] @user_id int
AS
BEGIN

DECLARE @UsersRegions  VARCHAR(max) 
SELECT @UsersRegions = COALESCE(@UsersRegions + ',', '') +cast([reg_id] as varchar(10)) 
FROM tb_UsersRegions where [user_id]=@user_id

--exec CheckUserExist @username
	SELECT tb_users.[user_name]
		,tb_users.[user_id]
		,tb_users.user_per
		,tb_users.user_active
		,tb_users.user_email
		,tb_users.user_pass 
		,isnull(tb_users.user_empid,0)user_empid
		,tb_users.user_mustchangepassword 
		,isnull(tb_employee.emp_no,'')EmpNO
		,isnull(tb_employee.emp_name,'')EmpName
		,isnull(tb_users.user_Group,0)user_Group
		,isnull(tb_PermissionGroups.GroupName ,'')GroupName
		,isnull(@UsersRegions,'')UserBranches
	FROM tb_users
	LEFT JOIN tb_employee ON tb_employee.emp_id = tb_users.user_empid
	left join tb_PermissionGroups on tb_users.user_Group=tb_PermissionGroups.GroupID
	WHERE user_id = @user_id
END















GO

CREATE PROCEDURE [dbo].[TimeAtt_PermissionGroupsDelete] @GroupID INT
	,@UserName NVARCHAR(250)
AS
BEGIN
	IF EXISTS (
			SELECT 1
			FROM tb_users
			WHERE user_Group = @GroupID
			)
		RETURN - 2

	DECLARE @rowcount INT
		,@GroupName NVARCHAR(250)

	SELECT @GroupName = GroupName
	FROM tb_PermissionGroups
	WHERE GroupID = @GroupID

	DELETE
	FROM tb_Permissions
	WHERE GroupID = @GroupID

	DELETE
	FROM tb_PermissionGroups
	WHERE GroupID = @GroupID

	SELECT @rowcount = @@rowcount

	DECLARE @currentdate INT

	SELECT @currentdate = dbo.getnofromdate(getdate())

	EXEC spsaveuserlog 14
		,@GroupID
		,1
		,@UserName
		,0
		,@GroupName
		,@currentdate

	RETURN @rowcount
END















GO
create procedure TimeAtt_PermissionGroupsGetByID
@GroupID int
as
begin
select * from tb_PermissionGroups where GroupID=@GroupID
end














GO
CREATE PROCEDURE [dbo].[TimeAtt_PermissionGroupsInsert] @GroupName NVARCHAR(250)
	,@Per NVARCHAR(max),@UserName nvarchar(250)
AS
BEGIN
	DECLARE @GroupID INT

	INSERT INTO [dbo].[tb_PermissionGroups] (GroupName)
	VALUES (@GroupName)

	SELECT @GroupID = @@IDENTITY

	IF isnull(@Per, '')<>''
		INSERT INTO [dbo].[tb_Permissions] (
			GroupID
			,Prev_ID
			,IsOK
			)
		SELECT @GroupID
			,data
			,1
		FROM dbo.Split(@Per, ',')
		DECLARE @currentdate INT

		SELECT @currentdate = dbo.getnofromdate(getdate())

		EXEC spsaveuserlog 14,
			@GroupID,
			3,
			@UserName,
			0,
			@GroupName,
			@currentdate

	RETURN @GroupID
END















GO
CREATE PROCEDURE [dbo].[TimeAtt_PermissionGroupsUpdate] @GroupID int, @GroupName NVARCHAR(250)
	,@Per NVARCHAR(max),@UserName nvarchar(250)
AS
BEGIN
	

	update  [dbo].[tb_PermissionGroups] set GroupName=@GroupName where GroupID=@GroupID

	delete from tb_Permissions where GroupID=@GroupID

	IF isnull(@Per, '') <>''
		INSERT INTO [dbo].[tb_Permissions] (
			GroupID
			,Prev_ID
			,IsOK
			)
		SELECT @GroupID
			,data
			,1
		FROM dbo.Split(@Per, ',')
		DECLARE @currentdate INT

		SELECT @currentdate = dbo.getnofromdate(getdate())
		EXEC spsaveuserlog 14,
			@GroupID,
			2,
			@UserName,
			0,
			@GroupName,
			@currentdate
	RETURN @GroupID
END















GO
CREATE PROCEDURE [dbo].[TimeAtt_spCanEmployeeAddExecuse] @exc_date INT,
	@exc_ftime NVARCHAR(5),
	@exc_ttime NVARCHAR(5),
	@UserName NVARCHAR(250),
	@exc_type INT
AS
BEGIN
	DECLARE @emp_id INT,
		@sid INT,
		@fin NVARCHAR(12),
		@fout NVARCHAR(12),
		@canexecuse BIT,
		@ISFH BIT,
		@exc_minutes INT,
		@Shift_TotalMinutes INT,
		@Execuse_TotalMinutesInMonthApp INT,
		@Execuse_TotalMinutesInMonthPendding INT,
		@PolicyValue NVARCHAR(200),
		@Exc_Month INT,@Exc_Year int
		select @exc_minutes=dbo.GetTotalMinutsFromTime(dbo.GetTimeTotal(@exc_ftime, @exc_ttime))
		if isnull(@exc_minutes,0) <=0
		begin
			SELECT 'Exception' [Status],
			N'يجب أن تكون مجموع ساعات الاستئذان أكبر من صفر' Response
		RETURN;
		end
	SET @exc_type = Isnull(@exc_type, 1)
	SELECT @emp_id = user_empid
	FROM tb_users
	WHERE user_name = @UserName
	IF isnull(@emp_id, 0) = 0
	BEGIN
		SELECT 'Exception' [Status],
			N'أنت غير مسجل في نظام خدماتي لتنفيذ طلب الاستئذان' Response
		RETURN;
	END
	SELECT @canexecuse = CASE 
			WHEN emp_deleted = 1
				OR isnull(emp_violatedException, 0) = 1
				OR emp_jointype = 'EJT08'
				THEN 0
			ELSE 1
			END
	FROM tb_employee
	WHERE emp_id = @emp_id
	IF @canexecuse = 0
	BEGIN
		SELECT 'Exception' [Status],
			N'لا يمكن إضافة استئذان لا يوجد لديك بيانات حضور وإنصراف' Response
		RETURN;
	END
	IF dbo.HasVacation(@emp_id, @exc_date) > 0
	BEGIN
		SELECT 'Exception' [Status],
			N'لا يمكن إضافة استئذان يوجد إجازة للموظف في التاريخ المختار' Response
		RETURN;
	END
	SET @sid = dbo.GeatSchedualID(@emp_id, @exc_date)
	IF (@sid IS NULL)
	BEGIN
		SELECT 'Exception' [Status],
			N'لم يستطيع النظام من التعرف على جدول الدوام الخاص بك' Response
		RETURN;
	END
	SELECT @fin = shift_fin,
		@fout = shift_fout,
		@ISFH = isnull(IsFH, 0)
	FROM tb_shift
	WHERE shift_id = @sid
	IF (
			@fin = '00:00'
			AND @fout = '00:00'
			)
	BEGIN
		SELECT 'Exception' [Status],
			N'لا يمكن إضافة استئذان في يوم العطلة الرسمية للموظف' Response
		RETURN;
	END
	SELECT @Shift_TotalMinutes = dbo.GetTotalMinutsFromTime(dbo.GetTimeTotal(@fin, @fout))
	IF @exc_minutes > @Shift_TotalMinutes
	BEGIN
		SELECT 'Exception' [Status],
			N'مجموع ساعات الإستئذان يجب أن لا تتجاوز مجموع ساعات الوردية الخاصة بك وهي ' + N'[' + dbo.GetTimeFromTotalMinuts(@Shift_TotalMinutes) + N']' Response
		RETURN;
	END
	IF dbo.HasExecuse(@emp_id, @exc_date) > 0
	BEGIN
		SELECT 'Exception' [Status],
			N'لا يمكن تقديم الاستئذان في التاريخ المختار لوجود استئذان تمت الموافقة عليه في نفس التاريخ' Response
		RETURN;
	END
	IF EXISTS (
			SELECT 1
			FROM tb_execuse
			WHERE exc_empid = @emp_id
				AND exc_date = @exc_date
				AND exc_deleted = 0
				AND ApprovalByManager = 'EAS01'
			)
	BEGIN
		SELECT 'Exception' [Status],
			N'لا يمكن تقديم الاستئذان في التاريخ المختار لوجود استئذان بانتظار الموافقة عليه في نفس التاريخ' Response
		RETURN;
	END
	IF @exc_type = 1
	BEGIN
		SELECT @PolicyValue = dbo.GetPloicyValue(1, @emp_id)
		IF (@PolicyValue IS NOT NULL)
		BEGIN
			IF dbo.GetTotalMinutsFromTime(@PolicyValue) < @exc_minutes
			BEGIN
				SELECT 'Exception' [Status],
					N' حسب سياسة الشركة لا يمكن تقديم ساعات استئذان أكثر من ' + N'[' + @PolicyValue + '] ' + N' في اليوم الواحد ' + N' مجموع ساعات الاستئذان المطلوبة  [' + dbo.GetTimeFromTotalMinuts(@exc_minutes) + N']' Response
				RETURN;
			END
		END
		SELECT @PolicyValue = NULL
		SELECT @PolicyValue = dbo.GetPloicyValue(2, @emp_id)
		IF (@PolicyValue IS NOT NULL)
		BEGIN
			SELECT @Exc_Month = Month(dbo.getdatefromno(@exc_date)),@Exc_Year= year(dbo.getdatefromno(@exc_date))
			SELECT @Execuse_TotalMinutesInMonthApp = sum(CASE 
						WHEN exc_type = 1
							AND exc_deleted = 0
							AND exc_status = 1
							AND ApprovalByManager = 'EAS02'
							THEN exc_minuts
						ELSE 0
						END),
				@Execuse_TotalMinutesInMonthPendding = sum(CASE 
						WHEN exc_type = 1
							AND exc_deleted = 0
							AND exc_status = 0
							AND ApprovalByManager = 'EAS01'
							THEN exc_minuts
						ELSE 0
						END)
			FROM tb_execuse
			WHERE exc_empid = @emp_id
				AND Month(dbo.getdatefromno(exc_date)) = @Exc_Month and Year(dbo.getdatefromno(exc_date))=@Exc_Year
			IF dbo.GetTotalMinutsFromTime(@PolicyValue) < @exc_minutes + isnull(@Execuse_TotalMinutesInMonthApp, 0) + isnull(@Execuse_TotalMinutesInMonthPendding, 0)
			BEGIN
				SELECT 'Exception' [Status],
					N' حسب سياسة الشركة لا يمكن تقديم ساعات استئذان أكثر من ' + N'[' + @PolicyValue + N'] ' 
					+ N' في شهر [' + cast(@Exc_Month AS NVARCHAR(50)) + N'/' + cast(@Exc_Year AS NVARCHAR(50)) + N'] ' + N' مجموع ساعات الاستئذان التي تمت الموافقة عليها  [' + dbo.GetTimeFromTotalMinuts(@Execuse_TotalMinutesInMonthApp) + N']' + CASE 
						WHEN isnull(@Execuse_TotalMinutesInMonthPendding, 0) > 0
							THEN N' مجموع ساعات الاستئذان التي بانتظار الموافقة  [' + dbo.GetTimeFromTotalMinuts(@Execuse_TotalMinutesInMonthPendding) + N']'
						ELSE N''
						END + N' مجموع ساعات الاستئذان المطلوبة  [' + dbo.GetTimeFromTotalMinuts(@exc_minutes) + N']'
						Response
				RETURN;
			END
		END
	END
	SELECT 'OK' [Status],
		'' Response
END














GO
CREATE PROCEDURE [dbo].[TimeAtt_spCanManagerAddExecuse] @emp_id INT,
	@exc_date INT,
	@exc_ftime NVARCHAR(5),
	@exc_ttime NVARCHAR(5),
	@UserName NVARCHAR(250),
	@exc_type INT
AS
BEGIN
	DECLARE @sid INT,
		@fin NVARCHAR(12),
		@fout NVARCHAR(12),
		@canexecuse BIT,
		@ISFH BIT,
		@exc_minutes INT,
		@Shift_TotalMinutes INT,
		@Execuse_TotalMinutesInMonthApp INT,
		@Execuse_TotalMinutesInMonthPendding INT,
		@PolicyValue NVARCHAR(200),
		@Exc_Month INT
	SELECT @exc_minutes = dbo.GetTotalMinutsFromTime(dbo.GetTimeTotal(@exc_ftime, @exc_ttime))
	IF isnull(@exc_minutes, 0) <= 0
	BEGIN
		SELECT 'Exception' [Status],
			N'يجب أن تكون مجموع ساعات الاستئذان أكبر من صفر' Response
		RETURN;
	END
	SET @exc_type = Isnull(@exc_type, 1)
	IF NOT EXISTS (
			SELECT 1
			FROM tb_employee
			WHERE emp_id = @emp_id
				AND emp_section IN (
					SELECT sec_ID
					FROM dbo.TimeAtt_GetSectionUnderManager(@UserName, '-1')
					)
			)
	BEGIN
		SELECT 'Exception' [Status],
			N'ليس لديك صلاحية لإضافة الاستئذان للموظف' Response
		RETURN;
	END
	SELECT @canexecuse = CASE 
			WHEN emp_deleted = 1
				OR isnull(emp_violatedException, 0) = 1
				OR emp_jointype = 'EJT08'
				THEN 0
			ELSE 1
			END
	FROM tb_employee
	WHERE emp_id = @emp_id
	IF @canexecuse = 0
	BEGIN
		SELECT 'Exception' [Status],
			N'لا يمكن إضافة استئذان لا يوجد للموظف بيانات حضور وإنصراف' Response
		RETURN;
	END
	IF dbo.HasVacation(@emp_id, @exc_date) > 0
	BEGIN
		SELECT 'Exception' [Status],
			N'لا يمكن إضافة استئذان يوجد إجازة للموظف في التاريخ المختار' Response
		RETURN;
	END
	SET @sid = dbo.GeatSchedualID(@emp_id, @exc_date)
	IF (@sid IS NULL)
	BEGIN
		SELECT 'Exception' [Status],
			N'لم يستطيع النظام من التعرف على جدول الدوام الخاص بالموظف' Response
		RETURN;
	END
	SELECT @fin = shift_fin,
		@fout = shift_fout,
		@ISFH = isnull(IsFH, 0)
	FROM tb_shift
	WHERE shift_id = @sid
	IF (
			@fin = '00:00'
			AND @fout = '00:00'
			)
	BEGIN
		SELECT 'Exception' [Status],
			N'لا يمكن إضافة استئذان في يوم العطلة الرسمية للموظف' Response
		RETURN;
	END
	SELECT @Shift_TotalMinutes = dbo.GetTotalMinutsFromTime(dbo.GetTimeTotal(@fin, @fout))
	IF @exc_minutes > @Shift_TotalMinutes
	BEGIN
		SELECT 'Exception' [Status],
			N'مجموع ساعات الإستئذان يجب أن لا تتجاوز مجموع ساعات الوردية الخاصة بالموظف وهي ' + N'[' + dbo.GetTimeFromTotalMinuts(@Shift_TotalMinutes) + N']' Response
		RETURN;
	END
	IF dbo.HasExecuse(@emp_id, @exc_date) > 0
	BEGIN
		SELECT 'Exception' [Status],
			N'لا يمكن تقديم الاستئذان في التاريخ المختار لوجود استئذان تمت الموافقة عليه في نفس التاريخ' Response
		RETURN;
	END
	IF EXISTS (
			SELECT 1
			FROM tb_execuse
			WHERE exc_empid = @emp_id
				AND exc_date = @exc_date
				AND exc_deleted = 0
				AND ApprovalByManager = 'EAS01'
			)
	BEGIN
		SELECT 'Exception' [Status],
			N'لا يمكن تقديم الاستئذان في التاريخ المختار لوجود استئذان بانتظار الموافقة عليه في نفس التاريخ' Response
		RETURN;
	END
	IF @exc_type = 1
	BEGIN
		SELECT @PolicyValue = dbo.GetPloicyValue(1, @emp_id)
		IF (@PolicyValue IS NOT NULL)
		BEGIN
			IF dbo.GetTotalMinutsFromTime(@PolicyValue) < @exc_minutes
			BEGIN
				SELECT 'Exception' [Status],
					N' حسب سياسة الشركة لا يمكن تقديم ساعات استئذان أكثر من ' + N'[' + @PolicyValue + '] ' + N' في اليوم الواحد ' + N' مجموع ساعات الاستئذان المطلوبة  [' + dbo.GetTimeFromTotalMinuts(@exc_minutes) + N']' Response
				RETURN;
			END
		END
		SELECT @PolicyValue = NULL
		SELECT @PolicyValue = dbo.GetPloicyValue(2, @emp_id)
		IF (@PolicyValue IS NOT NULL)
		BEGIN
			SELECT @Exc_Month = Month(dbo.getdatefromno(@exc_date))
			SELECT @Execuse_TotalMinutesInMonthApp = sum(CASE 
						WHEN exc_type = 1
							AND exc_deleted = 0
							AND exc_status = 1
							AND ApprovalByManager = 'EAS02'
							THEN exc_minuts
						ELSE 0
						END),
				@Execuse_TotalMinutesInMonthPendding = sum(CASE 
						WHEN exc_type = 1
							AND exc_deleted = 0
							AND exc_status = 0
							AND ApprovalByManager = 'EAS01'
							THEN exc_minuts
						ELSE 0
						END)
			FROM tb_execuse
			WHERE exc_empid = @emp_id
				AND Month(dbo.getdatefromno(exc_date)) = @Exc_Month
			IF dbo.GetTotalMinutsFromTime(@PolicyValue) < @exc_minutes + isnull(@Execuse_TotalMinutesInMonthApp, 0) + isnull(@Execuse_TotalMinutesInMonthPendding, 0)
			BEGIN
				SELECT 'Exception' [Status],
					N' حسب سياسة الشركة لا يمكن تقديم ساعات استئذان أكثر من ' + N'[' + @PolicyValue + N'] ' + N' في شهر [' + cast(@Exc_Month AS NVARCHAR(50)) + N'/' + cast(Year(dbo.getdatefromno(@exc_date)) AS NVARCHAR(50)) + N'] ' + N' مجموع ساعات الاستئذان التي تمت الموافقة عليها  [' + dbo.GetTimeFromTotalMinuts(@Execuse_TotalMinutesInMonthApp) + N']' + CASE 
						WHEN isnull(@Execuse_TotalMinutesInMonthPendding, 0) > 0
							THEN N' مجموع ساعات الاستئذان التي بانتظار الموافقة  [' + dbo.GetTimeFromTotalMinuts(@Execuse_TotalMinutesInMonthPendding) + N']'
						ELSE N''
						END + N' مجموع ساعات الاستئذان المطلوبة  [' + dbo.GetTimeFromTotalMinuts(@exc_minutes) + N']' Response
				RETURN;
			END
		END
	END
	SELECT 'OK' [Status],
		'' Response
END















GO
Create PROCEDURE [dbo].[TimeAtt_spDeleteFaieldexecuse] @exc_id INT
	
AS
BEGIN
	delete from tb_execuse where exc_id=@exc_id 
END
	


















GO

CREATE PROCEDURE [dbo].[TimeAtt_spGetDailyTimeSheetForManager] @fm_date INT
	,@tm_date INT
	,@empid INT
	,@secid INT
	,@username NVARCHAR(250)
AS
BEGIN
	DECLARE @tbl TABLE (
		sec_ID INT
		,sec_Name NVARCHAR(500)
		)

	INSERT INTO @tbl
	SELECT sec_ID
		,sec_Name
	FROM dbo.TimeAtt_GetSectionUnderManager(@username, @secid)

	DECLARE @manageremp_id INT

	SELECT @manageremp_id = emp_id
	FROM tb_employee
	INNER JOIN tb_users ON tb_employee.emp_id = user_empid
	WHERE [user_name] = @username

	DECLARE @Manager_EmpID INT
		,@SecondManager_EmpID INT

	SELECT @Manager_EmpID = sec_manager
		,@SecondManager_EmpID = isnull(sec_secondmanager, 0)
	FROM tb_section
	WHERE sec_ID = @secID

	DECLARE @ManagerUsername NVARCHAR(150)
		,@secondManagerUsername NVARCHAR(150)

	SET @ManagerUsername = (
			SELECT TOP 1 user_name
			FROM tb_users
			WHERE user_empid = @Manager_EmpID
				AND user_active = 1
			)
	SET @secondManagerUsername = (
			SELECT TOP 1 user_name
			FROM tb_users
			WHERE user_empid = @SecondManager_EmpID
				AND user_active = 1
			)

	IF @Manager_EmpID = @manageremp_id
	BEGIN
		SET @SecondManager_EmpID = 0
	END

	IF @ManagerUsername IS NOT NULL
		IF (@ManagerUsername NOT LIKE @username)
			AND (@ManagerUsername NOT LIKE isnull(@secondManagerUsername, ''))
		BEGIN
			SET @Manager_EmpID = 0
		END

	SELECT ROW_NUMBER() OVER (
			ORDER BY tb_transSummey.m_date
				,tb_transSummey.m_id
			) AS Rowno
		,emp_section
		,tb_employee.emp_id
		,tb_employee.emp_no
		,tb_employee.emp_name
		,tb_transSummey.m_date dateno
		,dbo.GetDayOfName(tb_transSummey.m_date) + ' ' + dbo.GetDateAsString(tb_transSummey.m_date) AS m_date
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefin), N'--:--') AS timefin
		,ISNULL(convert(NVARCHAR(5), tb_transSummey.m_timefout), N'--:--') AS timefout
		,ISNULL(tb_transSummey.m_timetotal, N'--:--') AS timeTotal
		,ISNULL(tb_transSummey.m_actualtime, N'--:--') AS ActualTime
		,ISNULL(tb_transSummey.m_latein, N'--:--') AS LateIn
		,ISNULL(tb_transSummey.m_overtime, N'--:--') AS OverTime
		,ISNULL(tb_transSummey.m_totallate, N'--:--') AS TotalLate
		,ISNULL(tb_transSummey.m_earlyout, N'--:--') AS Earlyout
		,ISNULL(tb_execuse.exc_id, 0) exc_id
		,ISNULL(dbo.HasVacation(tb_employee.emp_id, tb_transSummey.m_date), 0) AS vac_id
		,m_manual
		,CASE 
			WHEN tb_execuse.exc_id IS NOT NULL
				THEN --dbo.GetTimeTotal(exc_ftime, exc_ttime)
					N'من: ' + cast(exc_ftime AS VARCHAR(5)) + N'  الى: ' + cast(exc_ttime AS VARCHAR(5)) + N'<br/> مجموع الساعات : ' + exc_hours + N'<br/>  السبب : ' + CASE 
						WHEN isnull(execuseReason_name, '') = ''
							THEN exc_reason
						ELSE execuseReason_name + ' ' + exc_reason
						END
			ELSE '--:--'
			END ExcuseTime
		,execuseReason_name
	FROM tb_transSummey
	INNER JOIN tb_employee ON tb_transSummey.m_id = tb_employee.emp_card
	--INNER JOIN tb_section ON tb_employee.emp_section = tb_section.sec_ID
	LEFT JOIN tb_execuse ON tb_employee.emp_id = exc_empid
		AND tb_transSummey.m_date = exc_date
		AND exc_status = 1
		AND exc_deleted = 0
		AND ApprovalByManager = 'EAS02'
	LEFT JOIN tb_execuseReason ON tb_execuse.execuseReason_ID = tb_execuseReason.execuseReason_id
	INNER JOIN @tbl tbl ON emp_section = tbl.sec_ID
	WHERE (
			tb_transSummey.m_date BETWEEN @fm_date
				AND @tm_date
			)
		--AND EXISTS (
		--		SELECT 1
		--		FROM @tbl t
		--		WHERE t.sec_ID = emp_section 
		--		)
		AND (
			tb_employee.emp_id = @empid
			OR @empid = - 1
			)
		AND emp_id NOT IN (
			@Manager_EmpID
			,@SecondManager_EmpID
			)
	ORDER BY tb_transSummey.m_date
		,tb_transSummey.m_id
END















GO
CREATE PROCEDURE [dbo].[TimeAtt_spGetEmployee] @emp NVARCHAR(500),
	@secID INT,
	@user NVARCHAR(100)
AS
BEGIN
	SELECT emp_id,
		emp_no,
		emp_name,
		sec_Name
	FROM [tb_employee]
	INNER JOIN tb_section ON tb_employee.emp_section = tb_section.sec_ID
	WHERE emp_deleted = 0 
	AND (emp_name LIKE N'%' + @emp + '%' OR emp_no LIKE N'%' + @emp + '%' OR isnull(@emp, '') = '')
	 AND emp_section IN (
			SELECT sec_id
			FROM dbo.TimeAtt_GetSectionUnderManager(@user, @secID)
			)
	--			--WHERE sec_ID = tb_section.sec_ID
	--	) 
	ORDER BY emp_id
END
















GO
CREATE PROCEDURE [dbo].[TimeAtt_spGetShiftInfoByEmpAndDate] @emp_id int,
@date int
AS
BEGIN
declare @SHID int
	select @SHID=dbo.GeatSchedualID(@emp_id,@date)
	SELECT * FROM [tb_shift] WHERE shift_id=@SHID
END



GO

CREATE PROCEDURE [dbo].[TimeAtt_spinsertexecuseFromEmployee] @exc_date INT
	,@exc_ftime NVARCHAR(5)
	,@exc_ttime NVARCHAR(5)
	,@exc_reason NVARCHAR(MAX)
	,@UserName NVARCHAR(250)
	,@execuseReason_ID INT
	,@exc_type INT
AS
BEGIN
	DECLARE @exc_empid INT
		,@Exc_ID INT

	SELECT @exc_empid = user_empid
	FROM tb_users
	WHERE user_name = @UserName

	IF isnull(@exc_empid, 0) = 0
		RETURN - 1

	SELECT @exc_type = isnull(@exc_type, 1)

	IF dbo.HasExecuse(@exc_empid, @exc_date) <= 0
	BEGIN
		EXEC @Exc_ID = spinsertexecuse @exc_empid
			,@exc_date
			,@exc_ftime
			,@exc_ttime
			,@exc_reason
			,0
			,0
			,@userName
			,@execuseReason_ID
			,@exc_type
			,'EAS01'

		RETURN CASE 
				WHEN @Exc_ID = 0
					THEN - 3
				ELSE @Exc_ID
				END
	END
	ELSE
		RETURN - 3
END















GO
CREATE PROCEDURE [dbo].[TimeAtt_spinsertexecuseFromManager] @exc_empid INT,
	@exc_date INT,
	@exc_ftime NVARCHAR(5),
	@exc_ttime NVARCHAR(5),
	@exc_reason NVARCHAR(MAX),
	@UserName NVARCHAR(250),
	@execuseReason_ID INT,
	@exc_type INT
AS
BEGIN
	SET @exc_type = Isnull(@exc_type, 1)
	DECLARE @sid INT,
		@fin NVARCHAR(12),
		@fout NVARCHAR(12),
		@ID INT,
		@ISFH BIT,
		@exc_hours NVARCHAR(5),
		@TransID BIGINT
	SET @sid = dbo.GeatSchedualID(@exc_empid, @exc_date)
	SELECT @fin = shift_fin,
		@fout = shift_fout,
		@ISFH = isnull(IsFH, 0)
	FROM tb_shift
	WHERE shift_id = @sid
	SELECT @exc_hours = dbo.GetTimeTotal(@exc_ftime, @exc_ttime)
	IF (
			SELECT DATEDIFF(minute, @exc_hours, dbo.GetTimeTotal(@fin, @fout))
			) < 0
		SELECT @exc_hours = dbo.GetTimeTotal(@fin, @fout)
	IF (
			SELECT count(exc_empid)
			FROM tb_execuse
			WHERE exc_empid = @exc_empid AND exc_date = @exc_date AND exc_deleted = 0
			) = 0
	BEGIN
		INSERT INTO tb_execuse (
			[exc_empid],
			[exc_date],
			[exc_ftime],
			[exc_ttime],
			[exc_reason],
			[exc_deleted],
			[exc_status],
			[execuseReason_ID],
			[ApprovalByManager],
			[exc_type],
			[exc_hours],
			[exc_minuts],
			[Created],
			[Updated]
			)
		VALUES (
			@exc_empid,
			@exc_date,
			@exc_ftime,
			@exc_ttime,
			@exc_reason,
			0,
			1,
			@execuseReason_ID,
			'EAS02',
			@exc_type,
			@exc_hours,
			dbo.GetTotalMinutsFromTime(@exc_hours),
			getdate(),
			getdate()
			)
		SET @ID = @@IDENTITY
		DECLARE @m_id BIGINT,
			@empname NVARCHAR(100)
		SELECT @m_id = emp_card,
			@empname = emp_name
		FROM tb_employee
		WHERE emp_id = @exc_empid
		IF @m_id IS NOT NULL
		BEGIN
			IF @exc_type = 2
			BEGIN
				DECLARE @m_timefin VARCHAR(12),
					@m_timefout VARCHAR(12)
				SELECT @m_timefout = dbo.GetSumTimeTotal(@fin, @exc_hours)
				EXEC @TransID = spinsertTotransSummey @m_id = @m_id,
					@m_date = @exc_date,
					@emp_id = @exc_empid,
					@sid = @sid,
					@ftime = @fin,
					@ttime = @m_timefout
				IF @TransID > 0
				BEGIN
					SELECT @m_timefin = NULL,
						@m_timefout = NULL
					SELECT @m_timefin = m_timefin,
						@m_timefout = m_timefout
					FROM tb_transSummey
					WHERE ID = @TransID
					IF @m_timefin IS NULL OR @m_timefin = '--:--'
					BEGIN
						UPDATE tb_transSummey
						SET m_timefin = @fin,
							m_timefout = dbo.GetSumTimeTotal(@fin, @exc_hours)
						WHERE ID = @TransID
					END -- if @m_timefin is null or @m_timefin='--:--'
					ELSE IF @m_timefout IS NULL OR @m_timefout = '--:--'
					BEGIN
						UPDATE tb_transSummey
						SET m_timefout = dbo.GetSumTimeTotal(@fin, @exc_hours)
						WHERE ID = @TransID
					END --  if @m_timefout is null or @m_timefout='--:--'
				END
			END
			EXEC sprecalculatetranssummery @m_id,
				@exc_date,
				NULL,
				NULL,
				0
		END
		SELECT @empname = @empname + N' By his manager '
		EXEC spsaveuserlog 1,
			@ID,
			3,
			@UserName,
			1,
			@empname,
			@exc_date
		RETURN @ID
	END
	ELSE
		RETURN 0
END















GO

-- Author:		<Mohammed Handoumeh>
-- Create date: <2014-04-03>
-- Description:	<Vacation Insert By Section Stored Procedure>
-- =============================================
CREATE PROCEDURE [dbo].[TimeAtt_spinsertvacation] @vac_type INT
	,@secid INT = NULL
	,@regid BIGINT = NULL
	,@empid INT = NULL
	,@vac_fdate INT
	,@vac_tdate INT
	,@vac_status BIT
	,@vac_deleted BIT
	,@UserName NVARCHAR(250)
AS
BEGIN
	DECLARE @ID INT
		,@vac_empid INT

	CREATE TABLE #EmpTable (emp_id INT)

	BEGIN TRY
		IF CURSOR_STATUS('global', 'empcursor') = 1
		BEGIN
			CLOSE empcursor

			DEALLOCATE empcursor
		END

		INSERT INTO #EmpTable (emp_id)
		SELECT EMP.emp_id
		FROM tb_employee EMP
		inner join dbo.GetEmployeeByUserRegion(@UserName) EMPREG on EMPREG.emp_id=EMP.emp_id 
		WHERE (@empid IS NULL OR EMP.emp_id = @empid) AND (@regid IS NULL OR emp_region = @regid) AND emp_deleted = 0 AND (
				@secid IS NULL OR emp_section IN (
					SELECT sec_ID
					FROM dbo.GetSecUnderSec(@secid)
					)
				)

		DECLARE empcursor CURSOR FAST_FORWARD
		FOR
		SELECT emp_id
		FROM #EmpTable

		BEGIN TRAN VacUpdate

		OPEN empcursor

		FETCH NEXT
		FROM empcursor
		INTO @vac_empid

		WHILE @@FETCH_STATUS = 0
		BEGIN
			EXEC @ID=spinsertvacation @vac_type
				,@vac_empid
				,@vac_fdate
				,@vac_tdate
				,@vac_status
				,@vac_deleted
				,@UserName

			FETCH NEXT
			FROM empcursor
			INTO @vac_empid
		END

		CLOSE empcursor

		DEALLOCATE empcursor

		COMMIT TRAN VacUpdate

		DROP TABLE #EmpTable

		RETURN @ID
	END TRY

	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRAN VacUpdate

		DROP TABLE #EmpTable

		RETURN - 2
	END CATCH
END















GO
CREATE PROCEDURE [dbo].[TimeAtt_UpdateEmpExecuseFromWorkFlow] @exc_id INT,
	@WFStatus SMALLINT,
	@UserName NVARCHAR(250),
	@Response NVARCHAR(500) OUTPUT
AS
BEGIN
	DECLARE @exc_empid INT,
		@Approval CHAR(5),
		@exc_date INT,
		@m_id BIGINT,
		@exc_type INT,
		@exc_hours NVARCHAR(5),
		@sid INT,
		@fin NVARCHAR(10),
		@fout NVARCHAR(10),
		@TransID BIGINT
	SELECT @exc_empid = exc_empid,
		@Approval = ApprovalByManager,
		@m_id = emp_card,
		@exc_date = exc_date,
		@exc_type = exc_type,
		@exc_hours = exc_hours
	FROM tb_execuse
	INNER JOIN tb_employee
		ON tb_execuse.exc_empid = tb_employee.emp_id
	WHERE exc_id = @exc_id AND exc_deleted = 0
	IF @exc_empid IS NULL
	BEGIN
		SELECT @Response = N'No Execuse found for RefID=' + cast(@exc_id AS NVARCHAR(50))
		RETURN - 1
	END
	IF @Approval <> 'EAS01'
	BEGIN
		SELECT @Response = N'Already Action Taked for Execuse RefID=' + cast(@exc_id AS NVARCHAR(50))
		RETURN - 2
	END
	IF @WFStatus IN (3, 10)
		UPDATE tb_execuse
		SET exc_deleted = 1,
			ApprovalByManager = 'EAS03',
			exc_status = 0,
			Updated = GETDATE()
		WHERE exc_id = @exc_id
	ELSE
	BEGIN
		UPDATE tb_execuse
		SET ApprovalByManager = 'EAS02',
			exc_status = 1,
			Updated = GETDATE()
		WHERE exc_id = @exc_id
		IF @m_id IS NOT NULL
		BEGIN
			IF @exc_type = 2
			BEGIN
				SET @sid = dbo.GeatSchedualID(@exc_empid, @exc_date)
				SELECT @fin = shift_fin,
					@fout = shift_fout
				FROM tb_shift
				WHERE shift_id = @sid
				DECLARE @m_timefin VARCHAR(12),
					@m_timefout VARCHAR(12)
				SELECT @m_timefout = dbo.GetSumTimeTotal(@fin, @exc_hours)
				EXEC @TransID = spinsertTotransSummey @m_id = @m_id,
					@m_date = @exc_date,
					@emp_id = @exc_empid,
					@sid = @sid,
					@ftime = @fin,
					@ttime = @m_timefout
				IF @TransID > 0
				BEGIN
					SELECT @m_timefin = NULL,
						@m_timefout = NULL
					SELECT @m_timefin = m_timefin,
						@m_timefout = m_timefout
					FROM tb_transSummey
					WHERE ID = @TransID
					IF @m_timefin IS NULL OR @m_timefin = '--:--'
					BEGIN
						UPDATE tb_transSummey
						SET m_timefin = @fin,
							m_timefout = dbo.GetSumTimeTotal(@fin, @exc_hours)
						WHERE ID = @TransID
					END -- if @m_timefin is null or @m_timefin='--:--'
					ELSE IF @m_timefout IS NULL OR @m_timefout = '--:--'
					BEGIN
						UPDATE tb_transSummey
						SET m_timefout = dbo.GetSumTimeTotal(@fin, @exc_hours)
						WHERE ID = @TransID
					END --  if @m_timefout is null or @m_timefout='--:--'
				END
			END
			EXEC sprecalculatetranssummery @m_id,
				@exc_date,
				NULL,
				NULL,
				0
		END
	END
	DECLARE @empname NVARCHAR(250)
	SELECT @empname = emp_name
	FROM tb_employee
	WHERE emp_id = @exc_empid
	EXEC spsaveuserlog 1,
		@Exc_ID,
		3,
		@UserName,
		1,
		@empname,
		@exc_date
	SELECT @Response = N'Execuse RefID:' + cast(@exc_id AS NVARCHAR(50)) + N' has been ' + CASE 
			WHEN @WFStatus = 3
				THEN N'Rejected'
			WHEN @WFStatus = 10
				THEN N'Canceled'
			ELSE N'Approved'
			END
	RETURN @exc_id
END















GO

CREATE PROCEDURE [dbo].[TimeAtt_UpdateTransactionFromWorkFlow] @RefID BIGINT
	,@WFStatus SMALLINT
	,@UserName NVARCHAR(250)
	,@Response NVARCHAR(500) OUTPUT
AS
BEGIN
	DECLARE @TransID BIGINT
		,@Emp_id INT
		,@MDate INT
		,@TransType BIGINT
		,@ReasonID SMALLINT
		,@TransTime NVARCHAR(5)
		,@Status BIT

	SELECT @Emp_id = EmpID
		,@Status = STATUS
		,@ReasonID = ReasonID
		,@MDate = MDate
		,@TransType = TransType
		,@TransTime = transTime
	FROM SaptcoApplications.dbo.ForgotFingerPrint FP
	WHERE ID = @RefID

	IF @Emp_id IS NULL
	BEGIN
		SELECT @Response = N'No Data found for RefID=' + cast(@RefID AS NVARCHAR(50))

		RETURN - 1
	END

	IF @Status IS NOT NULL
	BEGIN
		SELECT @Response = N'Already Action Taked for RefID=' + cast(@RefID AS NVARCHAR(50))

		RETURN - 2
	END

	IF @WFStatus IN (
			3
			,10
			)
	BEGIN
		UPDATE SaptcoApplications.dbo.ForgotFingerPrint
		SET STATUS = 0
			,UpdatedDate = GETDATE()
		WHERE ID = @RefID

		SELECT @TransID = 1
	END
	ELSE
	BEGIN
		EXEC @TransID = [dbo].[spinserttrans] @emp_id = @Emp_id
			,@m_date = @MDate
			,@m_time = @TransTime
			,@m_unit = NULL
			,@m_mode = 1
			,@m_transtype = 5
			,@ModifiedReasonID = @ReasonID
			,@UserName = @UserName
			,@CV_Code = 1
			,@Acc_Date = @MDate

		UPDATE SaptcoApplications.dbo.ForgotFingerPrint
		SET STATUS = 1
			,UpdatedDate = GETDATE()
		WHERE ID = @RefID
	END

	SELECT @Response = N'Request RefID:' + cast(@RefID AS NVARCHAR(50)) + N' has been ' + CASE 
			WHEN @WFStatus = 3
				THEN N'Rejected'
			WHEN @WFStatus = 10
				THEN N'Canceled'
			ELSE N'Approved'
			END

	RETURN @TransID
END



GO

CREATE PROCEDURE [dbo].[TimeAtt_UsersInsert] @user_name NVARCHAR(150)
	,@user_pass NVARCHAR(50)
	,@user_per SMALLINT
	,@user_empid INT
	,@user_active BIT
	,@UserName NVARCHAR(250)
	,@user_Group INT = NULL
	,@user_email NVARCHAR(250) = NULL
	,@UserBranches NVARCHAR(max) = NULL
AS
DECLARE @empname NVARCHAR(100)
	,@currentdate INT
	,@ID INT

IF EXISTS (
		SELECT 1
		FROM tb_users
		WHERE isnull(@user_empid, 0) <> 0 AND user_empid = @user_empid
		)
	RETURN - 2

IF (
		SELECT count(user_id)
		FROM tb_users
		WHERE user_name = @user_name
		) = 0
BEGIN
	INSERT INTO [dbo].[tb_users] (
		[user_name]
		,[user_pass]
		,[user_per]
		,[user_empid]
		,[user_active]
		,[user_email]
		,[user_mustchangepassword]
		,[user_Group]
		)
	VALUES (
		@user_name
		,@user_pass
		,@user_per
		,@user_empid
		,@user_active
		,@user_email
		,1
		,@user_Group
		)

	SELECT @ID = @@IDENTITY

	IF @user_per = 2 AND @UserBranches IS NOT NULL
	BEGIN
		EXEC spInsertUsersRegion @ID
			,@UserBranches
	END

	SET @empname = (
			SELECT emp_name
			FROM tb_employee
			WHERE emp_id = @user_empid
			)
	SET @currentdate = dbo.getnofromdate(getdate())

	EXEC spsaveuserlog 9
		,@ID
		,2
		,@UserName
		,1
		,@empname
		,@currentdate

	RETURN @ID
END
ELSE
	RETURN - 3
		/****** Object:  StoredProcedure [dbo].[spUserCanDo]    Script Date: 05/29/2009 13:21:20 ******/
		-- SET ANSI_NULLS ON















GO

CREATE PROCEDURE [dbo].[TimeAtt_UsersUpdate] @user_id INT
	,@user_name NVARCHAR(150)
	,@user_pass NVARCHAR(50) = NULL
	,@user_empid INT
	,@UserName NVARCHAR(250)
	,@user_per SMALLINT = NULL
	,@user_active BIT = NULL
	,@user_email NVARCHAR(250) = NULL
	,@user_Group int=null
	,@UserBranches NVARCHAR(max) = NULL
AS
IF EXISTS (
		SELECT 1
		FROM tb_users
		WHERE isnull(@user_empid, 0) <> 0 AND user_empid = @user_empid and [user_name]<>@user_name
		)
	RETURN - 2
IF NOT EXISTS (
		SELECT 1
		FROM tb_users
		WHERE user_name = @user_name AND user_id <> @user_id
		)
BEGIN
	DECLARE @oldpass NVARCHAR(150)

	SELECT @oldpass = user_pass
	FROM tb_users
	WHERE [user_id] = @user_id

	UPDATE [tb_users]
	SET [user_name] = @user_name
		,[user_pass] = CASE WHEN @user_pass IS NULL THEN [user_pass] ELSE @user_pass END
		,[user_empid] = @user_empid
		,[user_per] = CASE WHEN @user_per IS NULL THEN [user_per] ELSE @user_per END
		,[user_active] = CASE WHEN @user_active IS NULL THEN [user_active] ELSE @user_active END
		,[user_email] = CASE WHEN @user_email IS NULL THEN [user_email] ELSE @user_email END
		,[user_mustchangepassword] = CASE WHEN @oldpass <> @user_pass THEN 1 ELSE [user_mustchangepassword] END
		,user_permchange = 1
		,[user_Group]=@user_Group
	WHERE [user_id] = @user_id

	DECLARE @empname NVARCHAR(100)

	SET @empname = (
			SELECT emp_name
			FROM tb_employee
			WHERE emp_id = @user_empid
			)

	IF @user_per = 2
	BEGIN
		EXEC spInsertUsersRegion @user_id
			,@UserBranches
	END

	DECLARE @currentdate INT

	SET @currentdate = dbo.getnofromdate(getdate())

	EXEC spsaveuserlog 9
		,@user_id
		,3
		,@UserName
		,1
		,@empname
		,@currentdate

	RETURN @user_id
END
ELSE
	RETURN - 3















GO
CREATE PROCEDURE [dbo].[TransGetByGroupReadrs]
@f_date int,@t_date int,@grp_id int,@rd_id int=null
AS
BEGIN
if @rd_id is null
select m_id emp_card,emp_no,tb_employee.emp_name emp_name ,dbo.getdatefromno( tb_trans.m_date)m_date,tb_trans.m_time,m_status
,Rd.uname m_unit,m_manual,m_unitid,dbo.GetDayOfName(m_date) AS NameOfDay
from tb_trans
join tb_employee on tb_trans.m_id=tb_employee.emp_card 
join Bio_Auto_MCI.dbo.Readers Rd on tb_trans.m_unitid =Rd.id 
join Bio_Auto_MCI.dbo.Groups Grp on Rd.groupid =Grp.id 
	where Grp.id =@grp_id  and tb_trans.m_date between @f_date and @t_date 
	order by m_date,emp_card 
else
select m_id emp_card,emp_no,tb_employee.emp_name emp_name ,dbo.getdatefromno( tb_trans.m_date)m_date,tb_trans.m_time,m_status
,Rd.uname m_unit,m_manual,m_unitid,dbo.GetDayOfName(m_date) AS NameOfDay
from tb_trans
join tb_employee on tb_trans.m_id=tb_employee.emp_card 
join Bio_Auto_MCI.dbo.Readers Rd on tb_trans.m_unitid =Rd.id 
--join Bio_Auto_MCI.dbo.Groups Grp on Rd.groupid =Grp.id 
	where Rd.id =@rd_id and tb_trans.m_date between @f_date and @t_date 
	order by m_date,emp_card 
END


















GO
CREATE PROCEDURE [dbo].[UpdateHREmployeeIntegrationSettings]
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE [SaptcoTimeAtt].[dbo].tb_setting
	SET Value = dbo.getnofromdate(getdate())
	WHERE SettingID = 2
	PRINT 'UpdateHREmployeeIntegrationSettings [Setting] has been updated successfully '
END















GO
Create PROCEDURE [dbo].[UpdateHRVacationsIntegrationSettings]
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE [SaptcoTimeAtt].[dbo].tb_setting
	SET Value = dbo.getnofromdate(getdate())
	WHERE SettingID = 3
	PRINT 'UpdateHRVacationsIntegrationSettings [Setting] has been updated successfully '
END















GO

/****** Script for SelectTopNRows command from SSMS  ******/
CREATE PROCEDURE [dbo].[uptTransReason_GetAll]
AS
SELECT [uptTransReason_id]
	,[uptTransReason_name]
	,[uptTransReason_Type]
FROM [tb_uptTransReason]






GO
CREATE PROCEDURE [dbo].[usp_GetErrorInfo]
AS
SELECT
    ERROR_NUMBER() AS ErrorNumber
    ,ERROR_SEVERITY() AS ErrorSeverity
    ,ERROR_STATE() AS ErrorState
    ,ERROR_PROCEDURE() AS ErrorProcedure
    ,ERROR_LINE() AS ErrorLine
    ,ERROR_MESSAGE() AS ErrorMessage;
















GO
