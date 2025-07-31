if object_id('dbo.AllowSendNotifcation') is not null
DROP Function dbo.AllowSendNotifcation
GO
if object_id('dbo.ApplayExecuse') is not null
DROP Function dbo.ApplayExecuse
GO
if object_id('dbo.ApplayExecuseHours') is not null
DROP Function dbo.ApplayExecuseHours
GO
if object_id('dbo.ApplayExecuseTowShifts') is not null
DROP Function dbo.ApplayExecuseTowShifts
GO
if object_id('dbo.Check24Hour') is not null
DROP Function dbo.Check24Hour
GO
if object_id('dbo.CheckNighty') is not null
DROP Function dbo.CheckNighty
GO
if object_id('dbo.GeatEarlyIn') is not null
DROP Function dbo.GeatEarlyIn
GO
if object_id('dbo.GeatEarlyOut') is not null
DROP Function dbo.GeatEarlyOut
GO
if object_id('dbo.GeatEarlyOutTwoShifts') is not null
DROP Function dbo.GeatEarlyOutTwoShifts
GO
if object_id('dbo.GeatLateIn') is not null
DROP Function dbo.GeatLateIn
GO
if object_id('dbo.GeatLateInTwoShifts') is not null
DROP Function dbo.GeatLateInTwoShifts
GO
if object_id('dbo.GeatLateOut') is not null
DROP Function dbo.GeatLateOut
GO
if object_id('dbo.GeatSchedualID') is not null
DROP Function dbo.GeatSchedualID
GO
if object_id('dbo.GetActualTime') is not null
DROP Function dbo.GetActualTime
GO
if object_id('dbo.GetAllEmployeeByMainSec') is not null
DROP Function dbo.GetAllEmployeeByMainSec
GO
if object_id('dbo.GetAllEmployeeByManager') is not null
DROP Function dbo.GetAllEmployeeByManager
GO
if object_id('dbo.GetDateAsString') is not null
DROP Function dbo.GetDateAsString
GO
if object_id('dbo.GetDateAsStringSqlFormat') is not null
DROP Function dbo.GetDateAsStringSqlFormat
GO
if object_id('dbo.getdatefromno') is not null
DROP Function dbo.getdatefromno
GO
if object_id('dbo.GetDayOfFullName') is not null
DROP Function dbo.GetDayOfFullName
GO
if object_id('dbo.GetDayOfFullNameEN') is not null
DROP Function dbo.GetDayOfFullNameEN
GO
if object_id('dbo.GetDayOfName') is not null
DROP Function dbo.GetDayOfName
GO
if object_id('dbo.GetDayOfNameEN') is not null
DROP Function dbo.GetDayOfNameEN
GO
if object_id('dbo.GetEmpIDFromUserName') is not null
DROP Function dbo.GetEmpIDFromUserName
GO
if object_id('dbo.GetEmployeeByUserRegion') is not null
DROP Function dbo.GetEmployeeByUserRegion
GO
if object_id('dbo.GetEmpSchedualID') is not null
DROP Function dbo.GetEmpSchedualID
GO
if object_id('dbo.GetFirstDateOfMonth') is not null
DROP Function dbo.GetFirstDateOfMonth
GO
if object_id('dbo.getfirstweekdate') is not null
DROP Function dbo.getfirstweekdate
GO
if object_id('dbo.GetFullSectionNamePath') is not null
DROP Function dbo.GetFullSectionNamePath
GO
if object_id('dbo.GetHijri') is not null
DROP Function dbo.GetHijri
GO
if object_id('dbo.GetHRDirectManagerEmpID') is not null
DROP Function dbo.GetHRDirectManagerEmpID
GO
if object_id('dbo.GetHRDirectManagerTable') is not null
DROP Function dbo.GetHRDirectManagerTable
GO
if object_id('dbo.GetLastDateOfMonth') is not null
DROP Function dbo.GetLastDateOfMonth
GO
if object_id('dbo.getlastweekdate') is not null
DROP Function dbo.getlastweekdate
GO
if object_id('dbo.Getmanager') is not null
DROP Function dbo.Getmanager
GO
if object_id('dbo.GetManagerbyEmpID') is not null
DROP Function dbo.GetManagerbyEmpID
GO
if object_id('dbo.getnofromdate') is not null
DROP Function dbo.getnofromdate
GO
if object_id('dbo.GetPloicyValue') is not null
DROP Function dbo.GetPloicyValue
GO
if object_id('dbo.GetSecIDByEmpID') is not null
DROP Function dbo.GetSecIDByEmpID
GO
if object_id('dbo.GetSecondManagerbyEmpID') is not null
DROP Function dbo.GetSecondManagerbyEmpID
GO
if object_id('dbo.GetSectionHierarchy') is not null
DROP Function dbo.GetSectionHierarchy
GO
if object_id('dbo.GetSectionsUnderSection') is not null
DROP Function dbo.GetSectionsUnderSection
GO
if object_id('dbo.GetSectionUnderManager') is not null
DROP Function dbo.GetSectionUnderManager
GO
if object_id('dbo.GetSectionUnderManagerByLevel') is not null
DROP Function dbo.GetSectionUnderManagerByLevel
GO
if object_id('dbo.GetSecUnderSec') is not null
DROP Function dbo.GetSecUnderSec
GO
if object_id('dbo.GetShiftidbyscheduale') is not null
DROP Function dbo.GetShiftidbyscheduale
GO
if object_id('dbo.GetShiftOutWithFlexibleHours') is not null
DROP Function dbo.GetShiftOutWithFlexibleHours
GO
if object_id('dbo.GetSubtractTimeTotal') is not null
DROP Function dbo.GetSubtractTimeTotal
GO
if object_id('dbo.GetSumTimeTotal') is not null
DROP Function dbo.GetSumTimeTotal
GO
if object_id('dbo.GetSumTimeTotalDatetime') is not null
DROP Function dbo.GetSumTimeTotalDatetime
GO
if object_id('dbo.GetTimeFin') is not null
DROP Function dbo.GetTimeFin
GO
if object_id('dbo.GetTimeFout') is not null
DROP Function dbo.GetTimeFout
GO
if object_id('dbo.GetTimeFromTotalMinuts') is not null
DROP Function dbo.GetTimeFromTotalMinuts
GO
if object_id('dbo.GetTimeLate') is not null
DROP Function dbo.GetTimeLate
GO
if object_id('dbo.GetTimeOver') is not null
DROP Function dbo.GetTimeOver
GO
if object_id('dbo.GetTimeOverTwoShifts') is not null
DROP Function dbo.GetTimeOverTwoShifts
GO
if object_id('dbo.GetTimeSheetdatetable') is not null
DROP Function dbo.GetTimeSheetdatetable
GO
if object_id('dbo.GetTimeSheetSummryTable') is not null
DROP Function dbo.GetTimeSheetSummryTable
GO
if object_id('dbo.GetTimeSheetTable') is not null
DROP Function dbo.GetTimeSheetTable
GO
if object_id('dbo.GetTimeSubtractViolation') is not null
DROP Function dbo.GetTimeSubtractViolation
GO
if object_id('dbo.GetTimeTotal') is not null
DROP Function dbo.GetTimeTotal
GO
if object_id('dbo.GetTimeTotalTowShifts') is not null
DROP Function dbo.GetTimeTotalTowShifts
GO
if object_id('dbo.GetTimeTotalWithAllowMint') is not null
DROP Function dbo.GetTimeTotalWithAllowMint
GO
if object_id('dbo.GetTimeTotalWithAllowMintForOut') is not null
DROP Function dbo.GetTimeTotalWithAllowMintForOut
GO
if object_id('dbo.GetTimeTotalWithBreak') is not null
DROP Function dbo.GetTimeTotalWithBreak
GO
if object_id('dbo.GetTotalMinutsFromTime') is not null
DROP Function dbo.GetTotalMinutsFromTime
GO
if object_id('dbo.GetTreeNodeLevelOFDep') is not null
DROP Function dbo.GetTreeNodeLevelOFDep
GO
if object_id('dbo.HasExecuse') is not null
DROP Function dbo.HasExecuse
GO
if object_id('dbo.Hasfailtrans') is not null
DROP Function dbo.Hasfailtrans
GO
if object_id('dbo.HasVacation') is not null
DROP Function dbo.HasVacation
GO
if object_id('dbo.IsManager') is not null
DROP Function dbo.IsManager
GO
if object_id('dbo.Split') is not null
DROP Function dbo.Split
GO
if object_id('dbo.TimeAtt_GetSectionUnderManager') is not null
DROP Function dbo.TimeAtt_GetSectionUnderManager
GO
if object_id('dbo.TimeAtt_GetTimeSheetSummryTable') is not null
DROP Function dbo.TimeAtt_GetTimeSheetSummryTable
GO
if object_id('dbo.TimeAtt_GetTimeSheetSummryTableForEmployee') is not null
DROP Function dbo.TimeAtt_GetTimeSheetSummryTableForEmployee
GO
if object_id('dbo.ufn_GetParentLevel') is not null
DROP Function dbo.ufn_GetParentLevel
GO
if object_id('dbo.ufn_GetParentPath') is not null
DROP Function dbo.ufn_GetParentPath
GO
CREATE FUNCTION [dbo].[AllowSendNotifcation] (@emp_id INT)
RETURNS BIT
AS
BEGIN
	-- Declare the return variable here
	DECLARE @ResultVar BIT
		,@sec_id INT
		,@emp_sendnotif BIT
	SET @ResultVar = 0
	SELECT @emp_sendnotif = emp_sendnotif
		,@sec_id = emp_section
	FROM tb_employee
	WHERE emp_id = @emp_id
	IF @emp_sendnotif IS NOT NULL
		SET @ResultVar = @emp_sendnotif
	ELSE
		IF @sec_id IS NOT NULL
		BEGIN
			SELECT @ResultVar = isnull(sec_sendnotif, 0)
			FROM tb_section
			WHERE sec_id = @sec_id
		END
	RETURN @ResultVar
END


GO

CREATE FUNCTION [dbo].[ApplayExecuse] (@emp_id INT, @m_date INT, @shiftid INT, @TotalLate NVARCHAR(12), @TotalTime NVARCHAR(12))
RETURNS VARCHAR(10)
AS
BEGIN
	DECLARE @exc_ftime VARCHAR(50), @exc_ttime VARCHAR(50), @exec_ID INT, @shiftin NVARCHAR(12), @shiftout NVARCHAR(12), @exc_total NVARCHAR(5
		), @IsOpenHours BIT, @ISFH BIT, @AccTime NVARCHAR(12)

	SELECT @shiftin = tb_shift.shift_fin, @shiftout = tb_shift.shift_fout, @IsOpenHours = isnull(IsOpenHours, 0),@ISFH = isnull(IsFH, 0)
	FROM tb_shift
	WHERE tb_shift.shift_id = @shiftid

	IF @IsOpenHours = 1
	BEGIN
		SELECT @AccTime = m_actualtime
		FROM tb_transSummey
		INNER JOIN tb_employee
			ON m_id = emp_card
		WHERE emp_id = @emp_id
			AND m_date = @m_date

		IF @TotalTime <> '--:--'
			AND @TotalTime <> '00:00'
		BEGIN
			IF datediff(minute, @AccTime, @TotalTime) >= 0
				SET @TotalLate = '--:--'
			ELSE
				SET @TotalLate = CONVERT(NVARCHAR(5), dateadd(mi, Datediff(minute, @TotalTime, @AccTime), 0), 108)
		END
	END

	SELECT @exec_ID = dbo.hasexecuse(@emp_id, @m_date)

	IF @exec_ID > 0
		AND @TotalLate <> '00:00'
		AND @TotalLate <> '--:--'
	BEGIN
		SELECT @exc_ftime = exc_ftime, @exc_ttime = exc_ttime
		FROM dbo.tb_execuse
		WHERE exc_id = @exec_ID

		SET @exc_ftime = isnull(@exc_ftime, '00:00')
		SET @exc_ttime = isnull(@exc_ttime, '00:00')

		IF @ISFH = 1
			SELECT @shiftout = dbo.GetShiftOutWithFlexibleHours(@emp_id, @m_date, @shiftid)

		IF @exc_ftime <> '00:00'
		BEGIN
			IF @exc_ftime <= @shiftin
				SET @exc_ftime = @shiftin

			IF @exc_ttime >= @shiftout
				SET @exc_ttime = @shiftout
			SET @exc_total = CONVERT(NVARCHAR(5), dateadd(mi, Datediff(minute, @exc_ftime, @exc_ttime), 0), 108)

			--set @Timetotal=@Timetotal +@exc_total 
			IF DATEDIFF(minute, @exc_total, @TotalLate) <= 0
				RETURN '--:--'
			ELSE
			BEGIN
				SET @TotalLate = CONVERT(NVARCHAR(5), dateadd(mi, Datediff(minute, @exc_total, @TotalLate), 0), 108)

				RETURN @TotalLate
			END
		END
	END
	ELSE
		RETURN @TotalLate

	RETURN @TotalLate
END

GO

CREATE FUNCTION [dbo].[ApplayExecuseHours] (
	@emp_id INT
	,@m_date INT
	,@shiftid INT
	,@TotalLate NVARCHAR(12)
	,@TotalTime NVARCHAR(12)
	)
RETURNS VARCHAR(10)
AS
BEGIN
	DECLARE @exc_hours VARCHAR(5)
		,@exc_minuts INT
		,@exec_ID INT
		,@shiftin NVARCHAR(12)
		,@shiftout NVARCHAR(12)
		,@IsOpenHours BIT
		,@ISFH BIT
		,@AccTime NVARCHAR(12)

	SELECT @shiftin = tb_shift.shift_fin
		,@shiftout = tb_shift.shift_fout
		,@IsOpenHours = isnull(IsOpenHours, 0)
		,@ISFH = isnull(IsFH, 0)
	FROM tb_shift
	WHERE tb_shift.shift_id = @shiftid

	IF @IsOpenHours = 1
	BEGIN
		SELECT @AccTime = m_actualtime
		FROM tb_transSummey
		INNER JOIN tb_employee ON m_id = emp_card
		WHERE emp_id = @emp_id
			AND m_date = @m_date

		IF @TotalTime <> '--:--'
			AND @TotalTime <> '00:00'
		BEGIN
			IF datediff(minute, @AccTime, @TotalTime) >= 0
				SET @TotalLate = '--:--'
			ELSE
				SET @TotalLate = CONVERT(NVARCHAR(5), dateadd(mi, Datediff(minute, @TotalTime, @AccTime), 0), 108)
		END
	END

	SELECT @exec_ID = dbo.hasexecuse(@emp_id, @m_date)

	IF @exec_ID > 0
		AND @TotalLate <> '00:00'
		AND @TotalLate <> '--:--'
	BEGIN
		SELECT @exc_hours = exc_hours
			,@exc_minuts = exc_minuts
		FROM dbo.tb_execuse
		WHERE exc_id = @exec_ID

		IF @exc_hours <> '00:00'
		BEGIN
			IF DATEDIFF(minute, @exc_hours, @TotalLate) <= 0
				RETURN '--:--'
			ELSE
			BEGIN
				SET @TotalLate = CONVERT(NVARCHAR(5), dateadd(mi, Datediff(minute, @exc_hours, @TotalLate), 0), 108)

				RETURN @TotalLate
			END
		END
	END
	ELSE
		RETURN @TotalLate

	RETURN @TotalLate
END

GO
create FUNCTION [dbo].[ApplayExecuseTowShifts]
(
	 @emp_id int
	,@m_date int
	,@shiftid int
	,@TotalLate NVARCHAR(12)
)
RETURNS VARCHAR(10)
AS
BEGIN
	DECLARE @exc_ftime VARCHAR(50),@exc_ttime VARCHAR(50),@exec_ID int,@fshiftin nvarchar(12),@fshiftout nvarchar(12),@twoshifts bit ,@sshiftin nvarchar(12),@sshiftout nvarchar(12),@exc_total nvarchar(5)
	select @exec_ID=dbo.hasexecuse(@emp_id, @m_date)
	if @exec_ID>0 and @TotalLate<>'00:00' and @TotalLate<>'--:--'
	begin
	select @fshiftin=shift_fin
	      ,@fshiftout=shift_fout
	      ,@twoshifts=shift_twoshifts
	      ,@sshiftin=shift_sin
	      ,@sshiftout=shift_sout
	from tb_shift where shift_id=@shiftid
	SELECT @exc_ftime = exc_ftime
			,@exc_ttime = exc_ttime
		FROM dbo.tb_execuse
		WHERE exc_id = @exec_ID
		SET @exc_ftime = isnull(@exc_ftime, '00:00')
		SET @exc_ttime = isnull(@exc_ttime, '00:00')
		IF @exc_ftime <> '00:00'
		BEGIN
			SET @exc_total =CONVERT(nvarchar(5), dateadd(mi, Datediff(minute, @exc_ftime, @exc_ttime), 0),108)
			--set @Timetotal=@Timetotal +@exc_total 
			if DATEDIFF(minute, @exc_total, @TotalLate) <= 0
			return '--:--' 
			else
			begin
		    set @TotalLate =CONVERT(nvarchar(5), dateadd(mi, Datediff(minute, @exc_total, @TotalLate), 0),108)
		    return @TotalLate 
		    end
		END
	end
	else
	return @TotalLate  
	RETURN @TotalLate  
END


GO
CREATE FUNCTION [dbo].[Check24Hour] (
	@f_time DATETIME
	,@t_time DATETIME
	,@isnighty BIT
	)
RETURNS INT
AS
BEGIN
	DECLARE @ResultVar INT
	IF @isnighty = 0
		RETURN 0
	SET @ResultVar = 0
	IF @f_time > '12:00:00'
		AND @t_time < '12:00:00'
		SET @ResultVar = 1440
	RETURN @ResultVar
END


GO
CREATE FUNCTION [dbo].[CheckNighty] (
	@m_Date INT
	,@m_Time NVARCHAR(50)
	,@emp_id BIGINT
	)
RETURNS INT
AS
BEGIN
	DECLARE @IsNightyShift BIT,@ShiftID int,@sch_ID int
		    ,@IsOffShift BIT
	--Check If Schedule flaged as nighty
	select @sch_ID=dbo.GetEmpSchedualID(@emp_id ,@m_Date)
	IF isnull((SELECT sch_isnight 
				FROM tb_schedule  
				WHERE sch_id = @sch_ID
				), 0) = 0
		--if not nighty return the same date
		RETURN @m_date
	IF (
			SELECT CASE 
					WHEN [dbo].GetSumTimeTotal(@m_time, '12:00') < '12:00'
						THEN 0
					ELSE 1
					END
			) = 1
	BEGIN
	select @IsNightyShift=case when EXISTS (
				--check if current date of transaction has nighty shift 
				SELECT 1
				FROM tb_shift
				WHERE shift_id = dbo.GeatSchedualID(@emp_id, @m_date -1)
					AND shift_isnight=1
				) then 1 else 0 end
				--select @IsOffShift=case when EXISTS(
				----check if Prev. date of transaction has nighty shift 
				--SELECT 1
				--FROM tb_shift
				--WHERE shift_id = dbo.GeatSchedualID(@emp_id, @m_date - 1)
				--	AND shift_off = 1
				--) then 1 else 0 end
		--IF NOT EXISTS (
		--		--check if current date of transaction has nighty shift 
		--		SELECT 1
		--		FROM tb_shift
		--		WHERE shift_id = dbo.GeatSchedualID(@emp_id, @m_date)
		--			AND shift_fin > shift_fout
		--		)
		--	AND EXISTS (
		--		--check if Prev. date of transaction has nighty shift 
		--		SELECT 1
		--		FROM tb_shift
		--		WHERE shift_id = dbo.GeatSchedualID(@emp_id, @m_date - 1)
		--			AND shift_off = 1
		--		)
		if @IsNightyShift =0  
			RETURN @m_date
		ELSE
			--process nighty and shift date -1
			RETURN @m_date - 1
	END
	--return the same date of transaction date
	RETURN @m_date
END


GO
CREATE FUNCTION [dbo].[GeatEarlyIn] (
	@emp_id AS INT
	,@shiftid AS INT
	,@m_date AS INT
	,@timefin AS DATETIME
	)
RETURNS VARCHAR(5)
AS
BEGIN
	IF dbo.HasVacation(@emp_id, @m_date) > 0
		RETURN '--:--'
	ELSE
		DECLARE @shiftout DATETIME
	DECLARE @shiftin DATETIME,@isnighty bit
	set @isnighty=0
	SELECT @shiftout = shift_fout
		,@shiftin = shift_fin,@isnighty=case when shift_fin >shift_fout then 1 else 0 end
	FROM dbo.tb_shift
	WHERE shift_id = @shiftid
	IF @shiftout = '00:00'
		AND @shiftin = '00:00'
		RETURN '--:--'
    if @isnighty=0
	begin
	IF @timefin < @shiftin
		RETURN dbo.GetTimeTotal(@timefin, @shiftin)
	end
	else
	begin
	IF @timefin < @shiftin and @timefin<'12:00:00'
	RETURN dbo.GetTimeTotal(@shiftin,Dateadd(day,1, @timefin))
	else IF @timefin > @shiftin and @timefin>'12:00:00'
	RETURN dbo.GetTimeTotal(@timefin, @shiftin)
	end
	RETURN '--:--'
END


GO

CREATE FUNCTION [dbo].[GeatEarlyOut] (
	@emp_id AS INT
	,@shiftid AS INT
	,@m_date AS INT
	,@timefin AS DATETIME
	,@timefout AS DATETIME
	)
RETURNS VARCHAR(5)
AS
BEGIN
	IF dbo.HasVacation(@emp_id, @m_date) > 0
		RETURN '--:--'

	DECLARE @shiftout DATETIME
		,@shiftin DATETIME
		,@isnighty BIT
		,@acc_time DATETIME
		,@res DATETIME
		,@IsFH BIT
		,@shift_FH_from DATETIME
		,@shift_FH_to DATETIME
		,@diffmint INT
		,@FH_TotalMinuts INT
		,@AccTimeOut DATETIME

	SELECT @isnighty = 0
		,@diffmint = 0

	SELECT @AccTimeOut = max(DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(isnull(acc_date, m_date))), cast(m_time AS DATETIME)))
	FROM [tb_trans]
	INNER JOIN tb_employee ON emp_card = m_id
	WHERE m_date = @m_date
		AND emp_id = @emp_id
		AND m_deleted = 0
		AND m_status = 1

	SELECT @shiftout = shift_fout
		,@shiftin = shift_fin
		,@isnighty = ISNULL(shift_isnight, 0)
		,@IsFH = ISNULL(IsFH, 0)
		,@shift_FH_from = shift_FH_from
		,@shift_FH_to = shift_FH_to
	FROM dbo.tb_shift
	WHERE shift_id = @shiftid

	IF @shiftout = '00:00'
		AND @shiftin = '00:00'
		RETURN '--:--'

	IF @isnighty = 0
		AND @shiftin < @shiftout
	BEGIN
	if @AccTimeOut is null
	set @AccTimeOut=DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(@m_date)), cast(@timefout AS DATETIME))
		SELECT @shiftout = DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(@m_date)), cast(@shiftout AS DATETIME))
			,@shiftin = DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(@m_date)), cast(@shiftin AS DATETIME))
			,@timefin = DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(@m_date)), cast(@timefin AS DATETIME))
			,@timefout = DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(@m_date)), cast(@timefout AS DATETIME))

		---Check If Is Flexible Hour Or Not
		IF @IsFH = 0
		BEGIN
			IF @AccTimeOut < @shiftout
				RETURN dbo.GetTimeTotalWithAllowMintForOut(@shiftid, @AccTimeOut, @shiftout)
					--RETURN dbo.GetTimeTotalWithAllowMintForOut(@shiftid, @timefout, @shiftout)
		END
		ELSE
		BEGIN
			SELECT @diffmint = DATEDIFF(MINUTE, @shiftin, @timefin)
				,@FH_TotalMinuts = DATEDIFF(MINUTE, @shift_FH_from, @shift_FH_to)

			IF (@diffmint) > 0
			BEGIN
				IF @diffmint - @FH_TotalMinuts > 0
					SELECT @shiftout = DATEADD(MINUTE, @FH_TotalMinuts, @shiftout)
				ELSE
					SELECT @shiftout = DATEADD(MINUTE, @diffmint, @shiftout)
			END

			IF Datediff(MINUTE, @shiftout, @AccTimeOut) < 0
				RETURN dbo.GetTimeTotal(@AccTimeOut, @shiftout)
			ELSE
				RETURN '--:--'
					--SELECT @diffmint = DATEDIFF(MINUTE, @shiftin, @timefin)
					--	, @FH_TotalMinuts = DATEDIFF(MINUTE, @shift_FH_from, @shift_FH_to)
					--IF (@diffmint > @FH_TotalMinuts)
					--BEGIN
					--	IF Datediff(MINUTE, @shiftout, @timefout) < 0
					--	RETURN dbo.GetTimeTotal(@timefout, @shiftout)
					--ELSE
					--	RETURN '--:--'
					--END
					--IF (@diffmint) > 0
					--BEGIN
					--	IF @diffmint - @FH_TotalMinuts > 0
					--		SELECT @shiftout = DATEADD(MINUTE, @FH_TotalMinuts, @shiftout)
					--	ELSE
					--		SELECT @shiftout = DATEADD(MINUTE, @diffmint, @shiftout)
					--END
					--IF Datediff(MINUTE, @shiftout, @timefout) < 0
					--	RETURN dbo.GetTimeTotal(@timefout, @shiftout)
					--ELSE
					--	RETURN '--:--'
		END
	END

	BEGIN
		SET @acc_time = dbo.GetTimeTotal(@shiftin, @shiftout)

		IF @timefout > @shiftout
			AND @timefout < '12:00:00'
			RETURN '--:--'
		ELSE IF @timefout > @shiftout
			AND @shiftout < '12:00:00'
			SET @res = dbo.GetTimeTotal(@timefout, Dateadd(day, 1, @shiftout))
		ELSE IF @shiftout > @timefout
			AND @timefout < '12:00:00'
			SET @res = dbo.GetTimeTotal(@timefout, @shiftout)

		IF @res > @acc_time
			RETURN convert(VARCHAR, @acc_time, 8)
		ELSE
			RETURN isnull(convert(VARCHAR, @res, 8), '--:--')
	END

	RETURN '--:--'
END

GO
CREATE FUNCTION [dbo].[GeatEarlyOutTwoShifts] (
	 @emp_id AS INT
	,@shiftid AS INT
	,@m_date AS INT
	,@timefout AS DATETIME
	,@m_cvcode as int=2
	)
RETURNS VARCHAR(5)
AS
BEGIN
	IF dbo.HasVacation(@emp_id, @m_date) > 0
		RETURN '--:--'
	ELSE
		 DECLARE @shiftfout DATETIME
	     DECLARE @shiftfin DATETIME
	     DECLARE @shiftsin DATETIME
		 DECLARE @shiftsout DATETIME
		,@isnighty BIT
		,@acc_time DATETIME
		,@res DATETIME
	SET @isnighty = 0
	SELECT @shiftfout = shift_fout
		,@shiftfin = shift_fin
	    ,@shiftsin  = case when  shift_sin is null or shift_sin='--:--' then '00:00' else shift_sin end
		,@shiftsout = case when  shift_sout is null or shift_sout='--:--' then '00:00' else shift_sout end
		,@isnighty = ISNULL(shift_isnight,0)
	FROM dbo.tb_shift
	WHERE shift_id = @shiftid
	IF (@m_cvcode =2 and @shiftfout = '00:00' AND @shiftfin = '00:00') 
	 OR(@m_cvcode =4 and @shiftsout = '00:00' AND @shiftsin = '00:00')  
		RETURN '--:--'
	IF @isnighty = 0
	BEGIN
	    if (@m_cvcode=2)
	    BEGIN
		IF @timefout < @shiftfout RETURN dbo.GetTimeTotal(@timefout, @shiftfout)
		END
		else if (@m_cvcode=4)
		BEGIN
		IF @timefout < @shiftsout RETURN dbo.GetTimeTotal(@timefout, @shiftsout)
		END	
	END
	BEGIN
		SET @acc_time = dbo.GetTimeTotal(@shiftfin, @shiftfout)
		IF @timefout > @shiftfout
			AND @timefout < '12:00:00'
			RETURN '--:--'
		ELSE
			IF @timefout > @shiftfout
				AND @shiftfout < '12:00:00'
				SET @res = dbo.GetTimeTotal(@timefout, Dateadd(day, 1, @shiftfout))
			ELSE
				IF @shiftfout > @timefout
					AND @timefout < '12:00:00'
					SET @res = dbo.GetTimeTotal(@timefout, @shiftfout)
		IF @res > @acc_time
			RETURN convert(VARCHAR, @acc_time, 8)
		ELSE
			RETURN isnull(convert(VARCHAR, @res, 8),'--:--')
	END
	RETURN '--:--'
END


GO
CREATE FUNCTION [dbo].[GeatLateIn] (@emp_id AS INT, @shiftid AS INT, @m_date AS INT, @timefin AS DateTIME)
RETURNS VARCHAR(5)
AS
BEGIN
	IF dbo.HasVacation(@emp_id, @m_date) > 0
		RETURN '--:--'
	
	DECLARE  @shiftin DateTIME, @shiftout DateTIME, @isnighty BIT, @IsFH BIT, @shift_FH_from DateTIME, @shift_FH_to DateTIME
	SET @isnighty = 0
	SELECT @shiftin = shift_fin, @shiftout = shift_fout, @isnighty = ISNULL(shift_isnight, 0), @IsFH = ISNULL(IsFH, 0), @shift_FH_from = shift_FH_from, @shift_FH_to = shift_FH_to
	FROM dbo.tb_shift
	WHERE shift_id = @shiftid
	IF @shiftin = '00:00'
		AND @shiftout = '00:00'
		RETURN '--:--'
	IF @isnighty = 0 and @shiftin < @shiftout 
	BEGIN
		---Check If Is Flexible Hour Or Not
		IF @IsFH = 0
		BEGIN
			IF @timefin > @shiftin
				RETURN dbo.GetTimeTotalWithAllowMint(@shiftid, @shiftin, @timefin)
		END
		ELSE
		BEGIN
			IF @timefin > @shift_FH_to 
			return dbo.GetTimeTotal(@shift_FH_to,@timefin)
			--return dbo.GetTimeTotal(@shiftin,@timefin)
		END
	END
	ELSE
	BEGIN
		IF @timefin < @shiftin
			AND @timefin < '12:00:00'
			RETURN dbo.GetTimeTotal(@shiftin, Dateadd(day, 1, @timefin))
		ELSE IF @timefin > @shiftin
			AND @timefin > '12:00:00'
			RETURN dbo.GetTimeTotal(@shiftin, @timefin)
	END
	RETURN '--:--'
END


GO
CREATE FUNCTION [dbo].[GeatLateInTwoShifts] (
	 @emp_id AS INT
	,@shiftid AS INT
	,@m_date AS INT
	,@timein AS DATETIME
	,@m_cvcode as int=1
	,@m_id BIGINT =null)
RETURNS VARCHAR(5)
AS
BEGIN
	IF dbo.HasVacation(@emp_id, @m_date) > 0
		RETURN '--:--'
	ELSE
	DECLARE @shiftfin DATETIME
	DECLARE @shiftfout DATETIME
	DECLARE @twoshift BIT
	DECLARE @shiftsin DATETIME
	DECLARE @shiftsout DATETIME
	DECLARE @isnighty BIT
	SET @isnighty = 0
	SELECT @shiftfin= shift_fin
		,@shiftfout = shift_fout
		,@twoshift = shift_twoshifts
		,@shiftsin  = case when  shift_sin is null or shift_sin='--:--' then '00:00' else shift_sin end
		,@shiftsout = case when  shift_sout is null or shift_sout='--:--' then '00:00' else shift_sout end
		,@isnighty = ISNULL(shift_isnight,0)
	FROM dbo.tb_shift
	WHERE shift_id = @shiftid
	IF @shiftfin = '00:00' AND @shiftfout = '00:00' RETURN '--:--'
	IF @isnighty = 0
	BEGIN
	      if @m_cvcode =1
			   BEGIN
	    		IF @timein > @shiftfin
				 RETURN dbo.GetTimeTotalWithAllowMint(@shiftid, @shiftfin, @timein)
			   END	
		   ELSE IF @m_cvcode =3
			   BEGIN
			   IF @twoshift=1
				   BEGIN
					 IF @timein > @shiftsin
					   BEGIN
						 RETURN dbo.GetTimeTotalWithAllowMint(@shiftid, @shiftsin, @timein)
					   END
					 END
				   END
			   ELSE
				   BEGIN
					  RETURN '--:--'
				   END
			  END
	else
	begin
	IF @timein < @shiftfin and @timein<'12:00:00'
	RETURN dbo.GetTimeTotal(@shiftfin,Dateadd(day,1, @timein))
	else IF @timein > @shiftfin and @timein>'12:00:00'
	RETURN dbo.GetTimeTotal(@shiftfin, @timein)
	end
	RETURN '--:--'
END


GO
CREATE FUNCTION [dbo].[GeatLateOut] (
	@emp_id AS INT
	,@shiftid AS INT
	,@m_date AS INT
	,@timefout AS DATETIME
	)
RETURNS VARCHAR(5)
AS
BEGIN
	IF dbo.HasVacation(@emp_id, @m_date) > 0
		RETURN '--:--'
	ELSE
		DECLARE @shiftout DATETIME
	DECLARE @shiftin DATETIME
	SELECT @shiftout = shift_fout
		,@shiftin = shift_fin
	FROM dbo.tb_shift
	WHERE shift_id = @shiftid
	IF @shiftout = '00:00'
		AND @shiftin = '00:00'
		RETURN '--:--'
	IF @shiftout < @timefout
		RETURN dbo.GetTimeTotal(@shiftout, @timefout)
	RETURN '--:--'
END


GO

CREATE FUNCTION [dbo].[GeatSchedualID] (
	@emp_id AS INT
	,@m_date AS INT
	)
RETURNS INT
AS
BEGIN
	DECLARE @sid INT
		,@emp_card BIGINT

	SELECT @emp_card = emp_card
	FROM tb_employee
	WHERE emp_id = @emp_id

	SELECT @sid = m_shiftid
	FROM dbo.tb_transSummey
	WHERE m_id = @emp_card
		AND m_date = @m_date 

	IF @sid IS NULL
	BEGIN
		SELECT @sid = sch_id
		FROM tb_schGroup
		WHERE schGroup_id = (
				SELECT TOP (1) tb_schGroupEmployees.schGroup_id
				FROM tb_schGroupEmployees
				INNER JOIN tb_schGroup ON tb_schGroup.schGroup_id = tb_schGroupEmployees.schGroup_id
				WHERE emp_id = @emp_id
					AND tb_schGroup.schGroup_deleted = 0
					AND (
						tb_schGroup.sch_startdate IS NULL
						OR dbo.getnofromdate(getdate()) BETWEEN tb_schGroup.sch_startdate
							AND tb_schGroup.sch_enddate
						)
				)

		IF @sid IS NOT NULL
			RETURN dbo.GetShiftidbyscheduale(@sid, @m_date)

		SELECT @sid = emp_sch
		FROM dbo.tb_employee
		WHERE emp_id = @emp_id

		RETURN dbo.GetShiftidbyscheduale(@sid, @m_date)
	END

	RETURN @sid
END


GO
CREATE FUNCTION [dbo].[GetActualTime] (
	@emp_id AS INT
	,@shiftid AS INT
	,@m_date AS INT
	)
RETURNS VARCHAR(5)
AS
BEGIN
	DECLARE @acctime VARCHAR(50);
	IF dbo.HasVacation(@emp_id, @m_date) > 0
		RETURN '00:00'
	ELSE
	BEGIN
	DECLARE @shift_fin AS VARCHAR(5)
	DECLARE @shift_fout AS VARCHAR(5)
	DECLARE @shift_twoshifts AS BIT
	DECLARE @shift_sin AS VARCHAR(5)
	DECLARE @shift_sout AS VARCHAR(5)
	SELECT @shift_fin = shift_fin
		,@shift_fout = shift_fout
		,@shift_twoshifts = shift_twoshifts
		,@shift_sin = shift_sin
		,@shift_sout = shift_sout
	FROM dbo.tb_shift
	WHERE shift_id = @shiftid
	IF isnull(@shift_twoshifts,0) = 0
	BEGIN
		SELECT @acctime = dbo.GetTimeTotal(@shift_fin, @shift_fout);
	END
	ELSE
	BEGIN
		SELECT @acctime = dbo.GetTimeTotalTowShifts(@shift_fin, @shift_fout,@shift_sin,@shift_sout);
	 END
	END
	RETURN @acctime;
------------------ old Version ------------------
/*
DECLARE @acctime VARCHAR(50);
	IF dbo.HasVacation(@emp_id, @m_date) > 0
		RETURN '00:00'
	ELSE
	DECLARE @shift_fin AS VARCHAR(5)
	DECLARE @shift_fout AS VARCHAR(5)
	DECLARE @shift_withbreak AS BIT
	DECLARE @shift_fbreak AS VARCHAR(5)
	DECLARE @shift_tbreak AS VARCHAR(5)
	DECLARE @shift_totalbreak AS VARCHAR(5)
	SELECT @shift_fin = shift_fin
		,@shift_fout = shift_fout
		,@shift_withbreak = shift_withbreak
		,@shift_fbreak = shift_fbreak
		,@shift_tbreak = shift_tbreak
	FROM dbo.tb_shift
	WHERE shift_id = @shiftid
	IF @shift_withbreak = 0
	BEGIN
		SELECT @acctime = dbo.GetTimeTotal(@shift_fin, @shift_fout);
	END
	ELSE
	BEGIN
		SELECT @acctime = dbo.GetTimeTotal(@shift_fin, @shift_fout);
		SELECT @shift_totalbreak = dbo.GetTimeTotal(@shift_fbreak, @shift_tbreak);
		SELECT @acctime = dbo.GetTimeTotal(@shift_totalbreak, @acctime);
	END
	RETURN @acctime;
	*/
--------------------------------------------------	
END;

GO
CREATE FUNCTION [dbo].[GetAllEmployeeByMainSec] (@sec_id INT)
RETURNS TABLE
AS
RETURN (
		WITH DepHierarchy AS (
				SELECT sec_id
				FROM tb_section
				WHERE sec_id = @sec_id
				
				UNION ALL
				
				SELECT Sec.sec_ID
				FROM tb_section Sec
				INNER JOIN DepHierarchy dep
					ON Sec.sec_Parent = dep.sec_ID
				)
		SELECT e.*
		FROM DepHierarchy DH
		INNER JOIN tb_employee e
			ON DH.sec_ID = e.emp_section
		)

GO
CREATE FUNCTION [dbo].[GetAllEmployeeByManager] (@emp_no bigINT)
RETURNS TABLE
AS
RETURN (
		WITH EmpHierarchy AS (
				SELECT emp_card
				FROM tb_employee 
				WHERE emp_card= @emp_no
				UNION ALL
				SELECT Employee.emp_card
				FROM tb_employee Employee
				INNER JOIN EmpHierarchy EMP ON cast(Employee.Mngr_No as bigint)  = EMP.emp_card
				)
		SELECT e.*
		FROM EmpHierarchy WH
		INNER JOIN tb_employee e ON WH.emp_card = e.emp_card
		where emp_jointype<>'EJT08' and emp_deleted =0 and emp_violatedException=0 and e.emp_card<> @emp_no 
		)

GO

Create FUNCTION [dbo].[GetDateAsString] (@date INT)
RETURNS NVARCHAR(10)
AS
BEGIN
	DECLARE @datestring NVARCHAR(10)

	SELECT @datestring = CONVERT(NVARCHAR(10), dbo.getdatefromno(@date), 103)

	RETURN @datestring
END

GO
CREATE FUNCTION [dbo].[GetDateAsStringSqlFormat] (@date INT)
RETURNS NVARCHAR(10)
AS
BEGIN
	DECLARE @datestring NVARCHAR(10)

	SELECT @datestring = CONVERT(NVARCHAR(10), dbo.getdatefromno(@date), 120)

	RETURN @datestring
END


GO

CREATE FUNCTION [dbo].[getdatefromno] (@d INT)
RETURNS DATE
AS
BEGIN
	IF (@d < 36526)
		SET @d = 36526

	RETURN DATEADD(day, @d, '1899-12-30')
END

GO
Create function [dbo].[GetDayOfFullName](@mdate int)
RETURNS nvarchar(50)
as
Begin
declare @d smalldatetime,@DayOfName nvarchar(50)
set @d=dbo.getdatefromno(@mdate)
select @DayOfName= DATENAME(dw,@d)
select @DayOfName=case @DayOfName
when N'Saturday' then N'السبت'
when N'Sunday' then N'الأحد'
when N'Monday' then N'الاثنين'
when N'Tuesday' then N'الثلاثاء'
when N'Wednesday' then N'الاربعاء'
when N'Thursday' then N'الخميس'
when N'Friday' then N'الجمعة'
end
return @DayOfName
END


GO
Create function [dbo].[GetDayOfFullNameEN](@mdate int)
RETURNS nvarchar(50)
as
Begin
declare @d smalldatetime,@DayOfName nvarchar(50)
set @d=dbo.getdatefromno(@mdate)
select @DayOfName= DATENAME(dw,@d)
return @DayOfName
END


GO
CREATE function [dbo].[GetDayOfName](@mdate int)
RETURNS nvarchar(50)
as
Begin
declare @d smalldatetime,@DayOfName nvarchar(50)
set @d=dbo.getdatefromno(@mdate)
select @DayOfName= DATENAME(dw,@d)
select @DayOfName=case @DayOfName
when N'Saturday' then N'س'
when N'Sunday' then N'أح'
when N'Monday' then N'إث'
when N'Tuesday' then N'ث'
when N'Wednesday' then N'أر'
when N'Thursday' then N'خ'
when N'Friday' then N'ج'
end
return @DayOfName
END


GO
CREATE FUNCTION [dbo].[GetDayOfNameEN] (@mdate INT)
RETURNS NVARCHAR(50)
AS
BEGIN
	DECLARE @d SMALLDATETIME,
		@DayOfName NVARCHAR(50)

	SET @d = dbo.getdatefromno(@mdate)

	SELECT @DayOfName = DATENAME(dw, @d)

	SELECT @DayOfName = CASE @DayOfName
			WHEN N'Saturday'
				THEN N'Sat'
			WHEN N'Sunday'
				THEN N'Sun'
			WHEN N'Monday'
				THEN N'Mon'
			WHEN N'Tuesday'
				THEN N'Tue'
			WHEN N'Wednesday'
				THEN N'Wed'
			WHEN N'Thursday'
				THEN N'Thu'
			WHEN N'Friday'
				THEN N'Fri'
			END

	RETURN @DayOfName
END

GO
Create function [dbo].[GetEmpIDFromUserName](@username nvarchar(50))
RETURNS int
as
Begin
DECLARE @emp_id INT
 SELECT @emp_id = emp_id
 FROM tb_employee
 JOIN tb_users ON tb_employee.emp_id = user_empid
 WHERE [user_name] = @username
return @emp_id
END


GO
CREATE FUNCTION [dbo].[GetEmployeeByUserRegion] (@username NVARCHAR(100))
RETURNS @empByRegion TABLE (emp_id INT)
AS
BEGIN
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
		BEGIN
			INSERT INTO @empByRegion (emp_id)
			SELECT emp_id
			FROM [tb_employee]
			WHERE @permtype = 1
				OR emp_region IN (
					SELECT tb_UsersRegions.reg_id
					FROM tb_UsersRegions
					WHERE tb_UsersRegions.user_id = @userid
					)
		END
	END
	ELSE
		INSERT INTO @empByRegion (emp_id)
		SELECT emp_id
		FROM [tb_employee]
	RETURN
END


GO

CREATE FUNCTION [dbo].[GetEmpSchedualID] (
	@emp_id AS INT
	,@m_date AS INT
	)
RETURNS INT
AS
BEGIN
	DECLARE @sch_id INT

	SELECT @sch_id = sch_id
	FROM tb_schGroup
	WHERE schGroup_id = (
			SELECT TOP (1) tb_schGroupEmployees.schGroup_id
			FROM tb_schGroupEmployees
			INNER JOIN tb_schGroup ON tb_schGroup.schGroup_id = tb_schGroupEmployees.schGroup_id
			WHERE emp_id = @emp_id
				AND tb_schGroup.schGroup_deleted = 0
				AND (
					tb_schGroup.sch_startdate IS NULL
					OR dbo.getnofromdate(getdate()) BETWEEN tb_schGroup.sch_startdate
						AND tb_schGroup.sch_enddate
					)
			)

	IF @sch_id IS NOT NULL
		RETURN @sch_id

	SELECT @sch_id = emp_sch
	FROM dbo.tb_employee
	WHERE emp_id = @emp_id

	IF @sch_id IS NOT NULL
		RETURN @sch_id

	SELECT @sch_id = sec_sch
	FROM tb_section
	INNER JOIN tb_employee ON emp_section = sec_id

	RETURN @sch_id
END

GO
CREATE FUNCTION [dbo].[GetFirstDateOfMonth] ()
RETURNS INT
BEGIN
	RETURN dbo.getnofromdate(CAST(CAST(YEAR(getdate()) AS VARCHAR(4)) + '/' + CAST(MONTH(getdate()) AS VARCHAR(2)) + '/01' AS DATETIME))
END


GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[getfirstweekdate] ()
RETURNS DATETIME
AS
BEGIN
	DECLARE @ResultVar DATETIME
	SELECT @ResultVar = DATEADD(ww, DATEDIFF(ww, 6, dateadd(day, 0, GETDATE())), 5)
	RETURN @ResultVar
END


GO
CREATE FUNCTION [dbo].[GetFullSectionNamePath] (
	@sec_path AS VARCHAR(50)
	)
RETURNS NVARCHAR(max)
AS
BEGIN
      Declare  @FullSectionNamePath  NVARCHAR(max)=''
	  declare @tbl table(id int identity ,secID int)
	  insert into  @tbl
	  select Data from dbo.split(@sec_path,'/' )
	  declare @counter int=1
	   declare @length int=(select count(1) from @tbl)
	   while @counter<=@length
	   begin
	      set @FullSectionNamePath = @FullSectionNamePath + case when @counter > 1 then '<br/>' else '' end  + 
	                  case when @counter= @length then '<span style="color:red">' +(select sec_name from tb_section 
				  where sec_id in (select secid from @tbl where id=@counter))  + '</span>' 
				  else (select sec_name from tb_section 
				  where sec_id in (select secid from @tbl where id=@counter)) end 
			set @counter=@counter+1
	   end
	return @FullSectionNamePath   
END


GO
CREATE FUNCTION [dbo].[GetHijri](@date [smalldatetime])
RETURNS [nvarchar](4000) WITH EXECUTE AS CALLER
AS 
EXTERNAL NAME [UmAlquraSql].[UmAlquraSql.UserDefinedFunctions].[GetHijri]
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION GetHRDirectManagerEmpID
(
	@emp_id int
)
RETURNS int
AS
BEGIN
	-- Declare the return variable here
	DECLARE @ResultVar int,@MngrNo nvarchar(50)
	select @MngrNo=Mngr_No from tb_employee where emp_id=@emp_id

	select @ResultVar=emp_id from tb_employee where emp_no=@MngrNo 

	return isnull(@ResultVar,0)

END

GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION GetHRDirectManagerTable
(
	@emp_id int
)
RETURNS 
@Table TABLE 
(
	EMPID int,EMPNO nvarchar(50),EMPNAME nvarchar(250),EMAIL nvarchar(250)
)
AS
BEGIN
	DECLARE @MngrNo nvarchar(50)
	select @MngrNo=Mngr_No from tb_employee where emp_id=@emp_id
	insert into @Table(EMPID,EMPNO,EMPNAME,EMAIL)
	select emp_id,emp_no,emp_name ,emp_email  from tb_employee where emp_no=@MngrNo 
	RETURN 
END

GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[GetLastDateOfMonth] ()
RETURNS INT
AS
BEGIN
	DECLARE @ResultVar DATETIME
	SELECT @ResultVar = DATEADD(dd, 0, DATEDIFF(dd, 0, DATEADD(dd, - (DAY(DATEADD(mm, 1, GETDATE()))), DATEADD(mm, 1, GETDATE()))))
	RETURN dbo.getnofromdate(DATEADD(dd, 0, DATEDIFF(dd, 0, @ResultVar)))
END


GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[getlastweekdate] ()
RETURNS DATETIME
AS
BEGIN
	DECLARE @ResultVar DATETIME
	SELECT @ResultVar = DATEADD(ww, DATEDIFF(ww, 5, dateadd(day, 0, GETDATE())), 4)
	RETURN @ResultVar
END


GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[Getmanager] (@emp_id INT)
RETURNS INT
AS
BEGIN
	-- Declare the return variable here
	DECLARE @ResultVar INT
	DECLARE @sec_manager INT
	DECLARE @sec_parent INT
	SELECT @sec_manager = sec_manager
		,@sec_parent = sec_Parent
	FROM dbo.tb_section
	INNER JOIN dbo.tb_employee ON emp_section = sec_id
	WHERE emp_id = @emp_id
	WHILE @sec_manager = @emp_id
	BEGIN
		SELECT @sec_manager = sec_manager
			,@sec_parent = sec_Parent
		FROM dbo.tb_section
		WHERE sec_id = @sec_parent
		IF @sec_parent = 0
			AND @sec_manager = @emp_id
			RETURN 0
		IF @sec_parent = 0
			AND @sec_manager <> @emp_id
			RETURN @sec_manager
	END
	SET @ResultVar = @sec_manager
	RETURN @ResultVar
END


GO
CREATE FUNCTION [dbo].[GetManagerbyEmpID] (@emp_id INT)
RETURNS INT
AS
BEGIN
	DECLARE @mangerID INT
	SELECT @mangerID = sec_manager
	FROM tb_section
	WHERE sec_ID = (
			SELECT emp_section
			FROM tb_employee
			WHERE emp_id = @emp_id
			)
	RETURN @mangerID
END


GO
CREATE FUNCTION [dbo].[getnofromdate] (@d DATETIME)
RETURNS INT
AS
BEGIN
	RETURN DATEDIFF(day, '1899-12-30', @d)
END


GO

CREATE FUNCTION dbo.GetPloicyValue (
	@PolicyID INT
	,@Emp_ID INT
	)
RETURNS NVARCHAR(200)
AS
BEGIN
	DECLARE @PolicyValue NVARCHAR(200) = NULL
		,@grp_id INT

	SELECT @PolicyValue = PolicyValue
	FROM tb_Policies
	WHERE IsEnabled = 1
		AND cast(getdate() AS DATE) >= StartDate
		AND isnull(EndDate, dateadd(day, 1, cast(getdate() AS DATE))) >= cast(getdate() AS DATE)
		AND PolicyID = @PolicyID

	IF @PolicyValue IS NOT NULL
	BEGIN
		SELECT @grp_id = max(PE.grp_id)
		FROM tb_EmployeesGroup EmpGroup
		INNER JOIN [tb_PolicyExceptions] PE ON PE.grp_ID = EmpGroup.grp_ID
		WHERE Emp_ID = @Emp_ID
			AND PolicyID = @PolicyID

		IF @grp_id IS NOT NULL
			SELECT @PolicyValue = PolicyValue
			FROM [tb_PolicyExceptions]
			WHERE PolicyID = @PolicyID
				AND grp_id = @grp_id
	END

	RETURN @PolicyValue
END

GO
Create function [dbo].[GetSecIDByEmpID](@empID int)
RETURNS int
as
Begin
DECLARE @sec_id INT
	SELECT @sec_id = emp_section 
	FROM tb_employee
	WHERE [emp_id] = @empID
return @sec_id
END


GO
CREATE FUNCTION [dbo].[GetSecondManagerbyEmpID] (@emp_id INT)
RETURNS INT
AS
BEGIN
	DECLARE @SecondManager INT
	SELECT @SecondManager = sec_secondmanager 
	FROM tb_section
	WHERE sec_ID = (
			SELECT emp_section
			FROM tb_employee
			WHERE emp_id = @emp_id
			) and isnull(sec_secondmanageractive,0)=1
	RETURN @SecondManager
END


GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[GetSectionHierarchy]
(	
	
)
RETURNS TABLE 
AS
RETURN 
(
	WITH DirectReports
	AS (
		-- Anchor member definition
		SELECT e.sec_ID,e.sec_Name 
			,CAST(e.sec_Name AS VARBINARY(900)) SortKey
		FROM tb_section AS e
		WHERE e.sec_Parent = 0
		
		UNION ALL
		
		-- Recursive member definition
		SELECT e.sec_ID,e.sec_Name 
			,CAST(d.SortKey + CAST(e.sec_ID AS BINARY (4)) AS VARBINARY(900)) SortKey
		FROM dbo.tb_section AS e
		INNER JOIN DirectReports AS d ON e.sec_Parent = d.sec_ID
		)
		select sec_id,sec_name Section_Name, SortKey from DirectReports
)

GO
CREATE FUNCTION [dbo].[GetSectionsUnderSection] (@Sec_name NVARCHAR(500))
RETURNS @rtnTable TABLE (
	sec_ID INT
	,sec_Name NVARCHAR(500)
	)
AS
BEGIN
	DECLARE @tbl TABLE (
		id INT identity
		,secID INT
		)
	DECLARE @tbl_sub TABLE (
		id INT identity
		,secID INT
		)
	INSERT INTO @tbl
	SELECT sec_ID
	FROM tb_section
	WHERE sec_Name LIKE N'%' + @Sec_name + '%'
		OR isnull(@Sec_name, '') = ''
	DECLARE @tblcount INT = 1
	DECLARE @tbllength INT = (
			SELECT count(1)
			FROM @tbl
			)
	DECLARE @mainsecid VARCHAR(5)
		,@secid VARCHAR(5)
	WHILE @tblcount <= @tbllength
	BEGIN
		SELECT @mainsecid = cast(secID AS VARCHAR(4))
		FROM @tbl
		WHERE id = @tblcount
		INSERT INTO @tbl_sub
		SELECT sec_ID
		FROM tb_section
		WHERE charindex(cast(@mainsecid AS VARCHAR(4)) + '/', sec_path) > 0
		SET @tblcount = @tblcount + 1
	END
	INSERT INTO @rtnTable
	SELECT DISTINCT tb_section.sec_ID
		,tb_section.sec_Name
	FROM tb_section
	JOIN (
		SELECT *
		FROM @tbl
		UNION
		SELECT *
		FROM @tbl_sub
		) t ON tb_section.sec_ID = t.secID
	ORDER BY sec_ID
	RETURN
END


GO

CREATE FUNCTION [dbo].[GetSectionUnderManager] (
	 @emp_username NVARCHAR(250)
	,@SelectSecID INT
	)
RETURNS @rtnTable TABLE (
	sec_ID INT
	,sec_Name NVARCHAR(500)
	)
AS
BEGIN
	DECLARE @emp_id INT
	SELECT @emp_id = emp_id
	FROM tb_employee
	JOIN tb_users ON tb_employee.emp_id = user_empid
	WHERE [user_name] = @emp_username
	DECLARE @tbl TABLE (
		id INT identity
		,secID INT
		)
		DECLARE @tblSections TABLE (
		id INT identity
		,secID INT
		)
	DECLARE @tblcount INT = 1
	DECLARE @tbllength INT =0 
	DECLARE @mainsecid int
	IF @SelectSecID = - 1
	BEGIN
	    INSERT INTO @tbl
		SELECT sec_ID
		FROM tb_section
		WHERE sec_manager = @emp_id
		    or ( sec_secondmanager= @emp_id and sec_secondmanageractive=1)
	   set @tbllength=	(SELECT count(1) FROM @tbl)
	      	WHILE @tblcount <= @tbllength
				BEGIN
				SELECT @mainsecid = cast(secID AS VARCHAR(4))
				FROM @tbl
				WHERE id = @tblcount
				INSERT INTO @tblSections
				 select sec_id from dbo.GetSecUnderSec(@mainsecid) t
				SET @tblcount = @tblcount + 1
	      END
	END
	ELSE
	 BEGIN  
	 INSERT INTO @tblSections
	  select sec_id from dbo.GetSecUnderSec(@SelectSecID) 
	 END
	INSERT INTO @rtnTable
	SELECT distinct tb_section.sec_ID
		,tb_section.sec_Name
	FROM tb_section
	JOIN @tblSections t 
	  ON tb_section.sec_ID = t.secID
	ORDER BY sec_ID
	RETURN
END


GO
CREATE FUNCTION [dbo].[GetSectionUnderManagerByLevel] (
	 @Level INT
	)
RETURNS @rtnTable TABLE (
	sec_ID INT
	,sec_Name NVARCHAR(500)
	)
AS
BEGIN
	DECLARE @tbl TABLE (
		id INT identity
		,secID INT
		)
		DECLARE @tblSections TABLE (
		id INT identity
		,secID INT
		)
	DECLARE @tblcount INT = 1
	DECLARE @tbllength INT =0 
	DECLARE @mainsecid int
Declare @secid int
 DECLARE db_cursor CURSOR FOR  
SELECT sec_id 
FROM tb_section
WHERE sec_Level=@Level
OPEN db_cursor   
FETCH NEXT FROM db_cursor INTO @secid   
WHILE @@FETCH_STATUS = 0  
BEGIN 
	 INSERT INTO @tblSections
	  select sec_id from dbo.GetSecUnderSec(@secid) 
  FETCH NEXT FROM db_cursor INTO @secid   
END   
CLOSE db_cursor   
DEALLOCATE db_cursor
	INSERT INTO @rtnTable
	SELECT tb_section.sec_ID
		,tb_section.sec_Name
	FROM tb_section
	JOIN @tblSections t 
	  ON tb_section.sec_ID = t.secID
	ORDER BY sec_ID
	RETURN
END


GO
Create FUNCTION [dbo].[GetSecUnderSec] (@sec_id INT)
RETURNS TABLE
AS
RETURN (
		WITH DepHierarchy AS (
				SELECT sec_id
				FROM tb_section
				WHERE sec_id = @sec_id
				UNION ALL
				SELECT Sec.sec_ID
				FROM tb_section Sec
				INNER JOIN DepHierarchy dep ON Sec.sec_Parent = dep.sec_ID
				)
		select *
		FROM DepHierarchy DH
		)


GO
CREATE FUNCTION [dbo].[GetShiftidbyscheduale] (
	@sch_id AS INT
	,@m_date AS INT
	)
RETURNS INT
AS
BEGIN
	DECLARE @shiftno INT
	SELECT @shiftno = CASE 
			WHEN datename(dw, dbo.getdatefromno(@m_date)) = 'Saturday'
				THEN sch_1
			WHEN datename(dw, dbo.getdatefromno(@m_date)) = 'Sunday'
				THEN sch_2
			WHEN datename(dw, dbo.getdatefromno(@m_date)) = 'Monday'
				THEN sch_3
			WHEN datename(dw, dbo.getdatefromno(@m_date)) = 'Tuesday'
				THEN sch_4
			WHEN datename(dw, dbo.getdatefromno(@m_date)) = 'Wednesday'
				THEN sch_5
			WHEN datename(dw, dbo.getdatefromno(@m_date)) = 'Thursday'
				THEN sch_6
			ELSE sch_7
			END
	FROM dbo.tb_schedule
	WHERE sch_id = @sch_id
	RETURN @shiftno
END


GO
-- Batch submitted through debugger: SQLQuery2.sql|25|0|C:\Users\SPS_AD~1\AppData\Local\Temp\2\~vs3D8E.sql
CREATE FUNCTION [dbo].[GetShiftOutWithFlexibleHours] (@empid INT, @m_date INT,@shiftid INT)
RETURNS NVARCHAR(5)
AS
BEGIN
	DECLARE  @timefin nvarchar(5), @shiftin varchar(8), @shiftout varchar(8), @timefout nvarchar(5), @diffmint INT, @FH_TotalMinuts INT, @IsFH BIT, 
		@shift_FH_from varchar(8), @shift_FH_to varchar(8),@RetTime Time

	

	SELECT @shiftin = shift_fin, @shiftout = shift_fout, @IsFH = IsFH, @shift_FH_from = shift_FH_from, @shift_FH_to = shift_FH_to
	FROM tb_shift
	WHERE shift_id = @shiftid

	SELECT @timefin = m_timefin, @timefout = m_timefout
	FROM tb_transSummey
	INNER JOIN tb_employee
		ON emp_card = m_id
	WHERE emp_id = @empid
		AND m_date = @m_date

		if ISNULL(@IsFH, 0)=0
		return @shiftout
		select @timefin=case when @timefin='--:--' then '00:00' else @timefin end
		select  @diffmint = DATEDIFF(MINUTE, @shiftin, @timefin),@FH_TotalMinuts=DATEDIFF(MINUTE, @shift_FH_from, @shift_FH_to)
			IF (@diffmint) > 0
			begin
			if @diffmint-@FH_TotalMinuts>0
				SELECT @RetTime = DATEADD(MINUTE, @FH_TotalMinuts, @shiftout)
			else
				SELECT @RetTime = DATEADD(MINUTE, @diffmint, @shiftout)
			end
			
			

	RETURN isnull(@RetTime,@shiftout)
END


GO
create FUNCTION [dbo].[GetSubtractTimeTotal] (
	@ftime AS VARCHAR(10)
	,@stime AS VARCHAR(10)
	)
RETURNS VARCHAR(5)
AS
BEGIN
DECLARE @f DATETIME
	   ,@s DATETIME
set @f= convert(DATETIME,  @ftime)
set @s= convert(DATETIME,  @stime)
if @f >=  @s
return convert(VARCHAR, @f - @s  , 8)
return '00:00'
END


GO
CREATE FUNCTION [dbo].[GetSumTimeTotal] (
	@timefin AS VARCHAR(10)
	,@timefout AS VARCHAR(10)
	)
RETURNS VARCHAR(5)
AS
BEGIN
	DECLARE @in DATETIME
		,@out DATETIME
	IF @timefin = N'--:--'
		OR @timefin IS NULL
		SET @in = convert(DATETIME, '00:00:00')
	ELSE
		SET @in = convert(DATETIME, @timefin)
	IF @timefout = N'--:--'
		OR @timefout IS NULL
		SET @out = convert(DATETIME, '00:00:00')
	ELSE
		SET @out = convert(DATETIME, @timefout)
	SET @timefin = isnull(convert(VARCHAR, @in + @out, 8), N'--:--')
	IF DATEPART(MINUTE, @timefin) + DATEPART(HOUR, @timefin) = 0
		RETURN N'--:--'
	RETURN @timefin
END


GO
CREATE FUNCTION [dbo].[GetSumTimeTotalDatetime] (
	@timefin AS VARCHAR(10)
	,@timefout AS VARCHAR(10)
	)
RETURNS DATETIME
AS
BEGIN
	DECLARE @in DATETIME
		,@out DATETIME
	IF @timefin = N'--:--'
		OR @timefin IS NULL
		SET @in = convert(DATETIME, '00:00:00')
	ELSE
		SET @in = convert(DATETIME, @timefin)
	IF @timefout = N'--:--'
		OR @timefout IS NULL
		SET @out = convert(DATETIME, '00:00:00')
	ELSE
		SET @out = convert(DATETIME, @timefout)
	SET @timefin = isnull(convert(VARCHAR, @in + @out, 8), N'--:--')
	IF DATEPART(MINUTE, @timefin) + DATEPART(HOUR, @timefin) = 0
		RETURN convert(DATETIME, '00:00:00')
	RETURN convert(DATETIME, @timefin)
END


GO
CREATE FUNCTION [dbo].[GetTimeFin] (
	@id AS INT
	,@m_date AS INT
	)
RETURNS VARCHAR(8)
AS
BEGIN
	DECLARE @timefin VARCHAR(101);
	SELECT @timefin = min(m_time)
	FROM tb_trans
	WHERE m_id = @id
		AND m_date = @m_date
		AND m_status = 1
		AND m_deleted = 0;
	RETURN @timefin;
END;


GO
CREATE FUNCTION [dbo].[GetTimeFout] (
	@id AS INT
	,@m_date AS INT
	)
RETURNS VARCHAR(8)
AS
BEGIN
	DECLARE @timefout VARCHAR(101);
	DECLARE @timefin VARCHAR(101);
	SELECT @timefout = max(m_time)
	FROM tb_trans
	WHERE m_id = @id
		AND m_date = @m_date
		AND m_status = 1
		AND m_deleted = 0;
	SELECT @timefin = min(m_time)
	FROM tb_trans
	WHERE m_id = @id
		AND m_date = @m_date
		AND m_status = 1
		AND m_deleted = 0;
	IF @timefin = @timefout
		RETURN NULL
	RETURN @timefout;
END;


GO
CREATE FUNCTION [dbo].[GetTimeFromTotalMinuts] (@minuts int)
RETURNS nvarchar(10)
AS
BEGIN
	DECLARE @ResultVar nvarchar(10),@minut smallint,@hours smallint
	select @hours=(@minuts/60)
	select @minut=abs((@hours*60)-@minuts)
	select @ResultVar=RIGHT('00'+ CONVERT(VARCHAR,@hours),case when len(@hours)<2 then 2 else len(@hours) end) + ':' + RIGHT('00'+ CONVERT(VARCHAR,@minut),case when len(@minut)<2 then 2 else len(@minut) end)
	RETURN @ResultVar
END


GO
CREATE FUNCTION [dbo].[GetTimeLate] (
	@emp_id AS INT
	,@shiftid AS INT
	,@m_date AS INT
	,@timefin AS DATETIME
	,@acctime AS DATETIME
	,@timetotal AS DATETIME
	)
RETURNS VARCHAR(5)
AS
BEGIN
	IF dbo.HasVacation(@emp_id, @m_date) > 0
		RETURN '--:--'
	ELSE
		DECLARE @exc_ftime DATETIME
	DECLARE @exc_ttime DATETIME
	DECLARE @exc_total DATETIME
	DECLARE @shiftin DATETIME
	DECLARE @shiftout DATETIME
	DECLARE @timefOut DATETIME
	DECLARE @allow INT
		,@isnighty BIT
	DECLARE @h INT
	DECLARE @m INT
	DECLARE @late VARCHAR(50)
	SET @isnighty = 0
	IF (@timetotal) IS NULL
		AND @timefin IS NULL
		RETURN NULL
	IF @timetotal IS NULL
		RETURN convert(VARCHAR, @acctime, 8)
	IF @acctime > @timetotal
	BEGIN
		SELECT @shiftin = shift_fin
			,@shiftout = shift_fout
			,@isnighty = CASE 
				WHEN shift_fin > shift_fout
					THEN 1
				ELSE 0
				END
		FROM dbo.tb_shift
		WHERE shift_id = @shiftid
		IF @shiftin = '00:00'
			AND @shiftout = '00:00'
			RETURN '--:--'
		SELECT @exc_ftime = exc_ftime
			,@exc_ttime = exc_ttime
		FROM dbo.tb_execuse
		WHERE exc_id = dbo.hasexecuse(@emp_id, @m_date)
		SET @exc_ftime = isnull(@exc_ftime, '00:00')
		SET @exc_ttime = isnull(@exc_ttime, '00:00')
		IF @exc_ftime <> '00:00'
		BEGIN
			IF @exc_ftime <= @shiftin
				SET @exc_ftime = @shiftin
			IF @exc_ttime >= @shiftout
				SET @exc_ttime = @shiftout
		END
		SET @exc_total = dateadd(mi, Datediff(minute, @exc_ftime, @exc_ttime), 0)
		SET @late = dbo.GetTimeTotalWithAllowMint(@shiftid, @shiftin, @timefin)
		IF @late = '--:--'
		BEGIN
			SET @allow = Datediff(minute, @shiftin, @timefin) + dbo.Check24Hour(@shiftin, @timefin, @isnighty)
			IF @allow < 0
				SET @allow = 0
			SET @h = CAST((@allow / 60) AS INT)
			SET @m = Abs((@h * 60) - @allow)
			SET @timetotal = dateadd(ss, (@h * 3600) + (@m * 60) + 0, 0) + @timetotal + @exc_total
			IF @acctime > @timetotal
				RETURN dbo.GetTimeTotal(@timetotal, @acctime)
			ELSE
				RETURN '--:--'
		END
		SET @timetotal = @timetotal + @exc_total
		RETURN dbo.GetTimeTotal(@timetotal, @acctime)
	END
	RETURN '--:--'
END;


GO
CREATE FUNCTION [dbo].[GetTimeOver] (
	@m_id AS INT
	,@sid AS INT
	,@m_date AS INT
	,@timefin AS NVARCHAR(12)
	,@timefout AS NVARCHAR(12)
	,@acctime AS NVARCHAR(12)
	,@timetotal AS NVARCHAR(12)
	)
RETURNS VARCHAR(101)
AS
BEGIN
	--IF (@timetotal) IS NULL
	--	AND @timefin IS NULL
	--	RETURN NULL
	--IF @timetotal IS NULL
	--	RETURN '--:--'
	--	DECLARE @OverTime nvarchar(12)= '--:--'
	--   	IF @timetotal > @acctime
	--   BEGIN
	--	set @OverTime= dbo.GetTimeTotal(@acctime, @timetotal)
	--   END
	DECLARE @OverTime NVARCHAR(12) = '--:--'
		,@StartTime DATETIME
		,@FTime DATETIME
		,@TTime DATETIME
		,@HasVac INT
		,@empID INT
		,@diffmint INT
		,@FH_TotalMinuts INT
	DECLARE @EndTime DATETIME
		,@IsFH BIT,@IsOpenHours BIT,@IsOff BIT
		,@shift_FH_from DATETIME
		,@shift_FH_to DATETIME

	SELECT @empID = emp_id
	FROM tb_employee
	WHERE emp_card = @m_id

	SELECT @HasVac = dbo.HasVacation(@empID, @m_date)

	IF @HasVac > 0
		RETURN @timetotal

	SELECT @FTime = min(DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(isnull(acc_date, m_date))), cast(m_time AS DATETIME)))
		,@TTime = max(DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(isnull(acc_date, m_date))), cast(m_time AS DATETIME)))
	FROM [tb_trans]
	WHERE m_date = @m_date
		AND m_id = @m_id
		AND m_deleted = 0
		AND m_status = 1

	SELECT @StartTime = DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(@m_date)), cast(shift_fin AS DATETIME))
		,@EndTime = DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(@m_date)), cast(shift_fout AS DATETIME))
		,@IsFH = ISNULL(IsFH, 0)
		,@shift_FH_from = DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(@m_date)), cast(shift_FH_from AS DATETIME))
		,@shift_FH_to = DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(@m_date)), cast(shift_FH_to AS DATETIME))
		,@IsOpenHours=IsOpenHours,@IsOff=shift_off
	FROM tb_shift
	WHERE shift_id = @sid
	if @IsOpenHours=1
	begin
	select @OverTime=dbo.GetTimeTotal(@StartTime, @EndTime)
	if @timetotal>@OverTime 
	return dbo.GetTimeTotal(@OverTime,@timetotal)
	return '--:--'
	end
	if @IsOff=1
	RETURN @timetotal
	IF @IsFH = 0
	BEGIN
		--IF (@EndTime = DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(@m_date)), cast('00:00' AS DATETIME)))
		--	SET @EndTime = convert(varchar(10),@TTime,103)--@FTime --@timefin

		IF @TTime > @EndTime
			SET @OverTime = dbo.GetTimeTotal(@EndTime, @TTime)
	END
	ELSE
	BEGIN
		SET @diffmint = 0

		SELECT @diffmint = DATEDIFF(MINUTE, @StartTime, @FTime) --@timefin)
			,@FH_TotalMinuts = DATEDIFF(MINUTE, @shift_FH_from, @shift_FH_to)

		IF @diffmint > 0
		BEGIN
			IF @diffmint - @FH_TotalMinuts > 0
				SELECT @EndTime = DATEADD(MINUTE, @FH_TotalMinuts, @EndTime)
			ELSE
				SELECT @EndTime = DATEADD(MINUTE, @diffmint, @EndTime)
		END

		IF @TTime > @EndTime
			SET @OverTime = dbo.GetTimeTotal(@EndTime, @TTime)
				--SET @diffmint = 0
				--SELECT @diffmint = DATEDIFF(MINUTE, @StartTime, @timefin)
				--	, @FH_TotalMinuts = DATEDIFF(MINUTE, @shift_FH_from, @shift_FH_to)
				--IF (@diffmint > @FH_TotalMinuts)
				--BEGIN
				--IF @timefout > @EndTime
				--	SET @OverTime = dbo.GetTimeTotal(@EndTime, @timefout)
				--	RETURN ISNULL(@OverTime, '--:--')
				--END
				--IF @diffmint > 0
				--BEGIN
				--	IF @diffmint - @FH_TotalMinuts > 0
				--		SELECT @EndTime = DATEADD(MINUTE, @FH_TotalMinuts, @EndTime)
				--	ELSE
				--		SELECT @EndTime = DATEADD(MINUTE, @diffmint, @EndTime)
				--END
				--IF @timefout > @EndTime
				--	SET @OverTime = dbo.GetTimeTotal(@EndTime, @timefout)
	END

	RETURN ISNULL(@OverTime, '--:--')
END

GO
CREATE FUNCTION [dbo].[GetTimeOverTwoShifts] (
	 @m_id AS INT
	,@sid AS INT
	,@m_date AS INT
	,@timein AS nvarchar(12)
	,@timeout AS nvarchar(12)
	,@timetotal AS nvarchar(12)
	,@m_cvcode as int=2
	)
RETURNS VARCHAR(101)
AS
BEGIN
	DECLARE @OverTime nvarchar(12)= '--:--'   
	DECLARE @EndTime  nvarchar(12)
     select   @EndTime=Case when @m_cvcode= 2 then shift_fout 
                          when @m_cvcode= 4 then shift_sout 
                       end from tb_shift where shift_id=@sid
         if (@EndTime='00:00')
           BEGIN
           set   @EndTime= @timein
           END
        IF @timeout > @EndTime
	   BEGIN
		set @OverTime= dbo.GetTimeTotal(@EndTime, @timeout)
	   END
	RETURN  ISNULL(@OverTime,'--:--')
END;


GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[GetTimeSheetdatetable] (
	@fdate AS INT
	,@tdate AS INT
	)
RETURNS @tb_timesheet TABLE (
	emp_id INT
	,m_date INT
	,emp_card INT
	,emp_no INT
	,emp_section INT
	,sec_name NVARCHAR(250)
	,emp_name NVARCHAR(250)
	,emp_sch INT
	)
AS
BEGIN
	DECLARE @currentdate INT
	DECLARE @todate INT
	DECLARE @fromdate INT
	DECLARE @managerid INT
	SELECT @fromdate = min(m_date)
	FROM tb_trans
	SELECT @todate = max(m_date)
	FROM tb_trans
	IF @tdate > @todate
		SET @tdate = @todate
	IF @fromdate > @fdate
		SET @fdate = @fromdate
	SET @currentdate = @fdate
	WHILE @currentdate <= @tdate
	BEGIN
		INSERT INTO @tb_timesheet (
			emp_id
			,m_date
			,emp_card
			,emp_no
			,emp_section
			,sec_name
			,emp_name
			,emp_sch
			)
		SELECT emp_id
			,@currentdate
			,emp_card
			,emp_no
			,emp_section
			,sec_name
			,emp_name
			,emp_sch
		FROM tb_employee AS emp
		INNER JOIN tb_section AS sec ON (emp_section = sec_ID)
		WHERE emp_deleted = 0
		SET @currentdate = @currentdate + 1
	END
	RETURN
END
GO
CREATE FUNCTION [dbo].[GetTotalMinutsFromTime] (@time NVARCHAR(10))
RETURNS INT
AS
BEGIN
	DECLARE @ResultVar INT
		,@minuts SMALLINT
		,@hours SMALLINT
		,@correctTime NVARCHAR(10)
		,@isdate INT
		,@hourIndex smallint
	IF @time = '--:--' or @time = '00:00' or @time = '' or @time is null
		RETURN 0

	select @hourIndex = CHARINDEX(':',@time,1)

	SELECT @correctTime = left(@time, @hourIndex+2)

	SELECT @hours = cast(left(@correctTime, @hourIndex-1) AS SMALLINT)

	SELECT @minuts = cast(RIGHT(@correctTime, 2) AS SMALLINT)

	SELECT @ResultVar = (@hours * 60) + @minuts

	RETURN @ResultVar
END


GO
CREATE FUNCTION [dbo].[GetTimeSheetSummryTable] (
	@fm_date INT
	,@tm_date INT
	,@emp_id INT = NULL
	,@secid INT = NULL
	,@username NVARCHAR(100) = NULL
	,@reg_id INT = NULL
	)
RETURNS TABLE
AS
RETURN

SELECT m_id
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
	,dbo.GetTimeFromTotalMinuts(totalExecuseM) totalexec
	,dbo.GetTimeFromTotalMinuts(ac_workM) ac_work
	,dbo.GetTimeFromTotalMinuts(totalworkM) totalwork
	,dbo.GetTimeFromTotalMinuts(totallateM) totallate
	,dbo.GetTimeFromTotalMinuts(totaloverM) totalover
	,totalExecuseM
	,ac_workM
	,totalworkM
	,totallateM
	,totaloverM
FROM (
	SELECT m_id
		,tb_employee.emp_id
		,emp_no
		,emp_name
		,emp_section
		,sum(CASE 
				WHEN (
						m_timefin <> '--:--'
						AND m_actualtime <> '00:00'
						)
					OR (isnull(tb_execuse.exc_type, 0) = 2)
					THEN 1
				ELSE 0
				END) daysno
		,sum(CASE 
				WHEN (
						m_timefin = '--:--'
						AND m_timefout = '--:--'
						AND m_actualtime <> '00:00'
						)
					AND (isnull(tb_execuse.exc_type, 0) <> 2)
					THEN 1
				ELSE 0
				END) daysabsent
		,sum(CASE 
				WHEN m_actualtime = '00:00'
					AND m_vac_id = 0
					THEN 1
				ELSE 0
				END) daysoff
		,sum(CASE 
				WHEN isnull(m_vac_id, 0) > 0
					THEN 1
				ELSE 0
				END) daysvication
		,sum(CASE 
				WHEN tb_execuse.exc_id IS NULL
					THEN 0
				ELSE exc_minuts
				END) totalExecuseM
		,sum(dbo.GetTotalMinutsFromTime(m_actualtime)) ac_workM
		,sum(CASE 
				WHEN m_timetotal = '--:--'
					THEN 0
				ELSE dbo.GetTotalMinutsFromTime(m_timetotal)
				END) totalworkM
		,sum(CASE 
				WHEN m_totallate = '--:--'
					THEN 0
				ELSE dbo.GetTotalMinutsFromTime(m_totallate)
				END) totallateM
		,sum(CASE 
				WHEN m_overtime = '--:--'
					THEN 0
				ELSE dbo.GetTotalMinutsFromTime(m_overtime)
				END) totaloverM
	FROM tb_transSummey(NOLOCK)
	INNER JOIN tb_employee(NOLOCK) ON m_id = emp_card
	INNER JOIN [dbo].[GetEmployeeByUserRegion](@username) empreg ON tb_employee.emp_id = empreg.emp_id
	LEFT JOIN dbo.tb_execuse(NOLOCK) ON dbo.tb_employee.emp_id = dbo.tb_execuse.exc_empid
		AND dbo.tb_transSummey.m_date = dbo.tb_execuse.exc_date
		AND dbo.tb_execuse.exc_status = 1
		AND dbo.tb_execuse.ApprovalByManager = 'EAS02'
		AND dbo.tb_execuse.exc_deleted = 0
	WHERE (
			m_date BETWEEN @fm_date
				AND @tm_date
			)
		AND (
			@emp_id IS NULL
			OR @emp_id = tb_employee.emp_id
			)
		AND (
			@secid IS NULL
			OR emp_section IN (
				SELECT sec_ID
				FROM dbo.GetSectionUnderManager(NULL, @secid)
				)
			)
		AND (
			@reg_id IS NULL
			OR emp_region = @reg_id
			)
		AND (tb_employee.emp_deleted = 0)
		AND (tb_employee.emp_violatedException <> 1)
	GROUP BY m_id
		,tb_employee.emp_id
		,emp_no
		,emp_name
		,emp_section
	) tb
INNER JOIN tb_section(NOLOCK) ON tb.emp_section = sec_ID

GO
-- =============================================
-- Author:		Author,,Name>
-- Create date: Create Date,
-- Description:	Description,
-- =============================================
CREATE FUNCTION [dbo].[GetTimeSheetTable] (
	@fdate AS INT
	,@tdate AS INT
	)
RETURNS @tb_timesheet TABLE (
	 timefin NVARCHAR(12)
	,timefout NVARCHAR(12)
	,timesin NVARCHAR(12)
	,timesout NVARCHAR(12)
	,flatein NVARCHAR(12)
	,slatein NVARCHAR(12)
	,fearlyout NVARCHAR(12)
	,searlyout NVARCHAR(12)
	,emp_id INT
	,sec_Name NVARCHAR(250)
	,emp_section INT
	,emp_name NVARCHAR(max)
	,emp_no NVARCHAR(50)
	,emp_card INT
	,m_date INT
	)
AS
BEGIN
	INSERT INTO @tb_timesheet (
		 [timefin]
		,[timefout]
		,[timesin]
		,[timesout]
		,[flatein] 
		,[slatein]
		,[fearlyout] 
		,[searlyout]
		,[emp_id]
		,[sec_Name]
		,[emp_section]
		,[emp_name]
		,[emp_no]
		,[emp_card]
		,[m_date]
		)
	SELECT MIN(dbo.tb_trans.m_time) AS timefin
		,timefout = CASE 
			WHEN MIN(dbo.tb_trans.m_time) = MAX(dbo.tb_trans.m_time)
				THEN NULL
			ELSE MAX(dbo.tb_trans.m_time)
			END
		,MIN(dbo.tb_trans.m_time) as timesin	
		,MAX(dbo.tb_trans.m_time) as timesout
		,MIN(dbo.tb_trans.m_time) as flatein	
		,MAX(dbo.tb_trans.m_time) as slatein
		,MIN(dbo.tb_trans.m_time) as fearlyout	
		,MAX(dbo.tb_trans.m_time) as searlyout
		,dbo.tb_employee.emp_id
		,dbo.tb_section.sec_Name
		,dbo.tb_employee.emp_section
		,dbo.tb_employee.emp_name
		,dbo.tb_employee.emp_no
		,dbo.tb_employee.emp_card
		,dbo.tb_trans.m_date
	FROM dbo.tb_employee
	INNER JOIN dbo.tb_trans ON dbo.tb_trans.m_id = dbo.tb_employee.emp_card
	INNER JOIN dbo.tb_section ON dbo.tb_employee.emp_section = dbo.tb_section.sec_ID
	WHERE (
			dbo.tb_trans.m_date BETWEEN @fdate
				AND @tdate
			)
		AND emp_deleted = 0
		AND dbo.tb_trans.m_status = 1
		AND m_deleted = 0
	GROUP BY dbo.tb_trans.m_id
		,dbo.tb_trans.m_date
		,dbo.tb_employee.emp_id
		,dbo.tb_section.sec_Name
		,dbo.tb_employee.emp_section
		,dbo.tb_employee.emp_name
		,dbo.tb_employee.emp_no
		,dbo.tb_employee.emp_card
		,dbo.tb_employee.emp_sch
	ORDER BY dbo.tb_trans.m_date
		,dbo.tb_employee.emp_id
	RETURN
END


GO
create FUNCTION [dbo].[GetTimeSubtractViolation] (
	 @TimeTotal AS nvarchar(5)
	,@m_id AS bigint
	,@m_date   bigint
	)
RETURNS VARCHAR(5)
AS
BEGIN
      if @TimeTotal='00:00' or @TimeTotal is null
      begin
         return @TimeTotal
      end 
	  if not exists(select 1 from tb_trans where m_id=@m_id and m_date=@m_date and m_deleted=0 and  m_transtype=2)
	  begin
         return @TimeTotal
      end 
      else 
       begin
        	IF (
				SELECT trans_id
				FROM tb_trans
				WHERE m_id = @m_id
					AND m_date = @m_date
					AND m_deleted = 0
					AND m_transtype=2
				) = (
				SELECT Max(trans_id)
				FROM tb_trans
				WHERE m_id = @m_id
					AND m_date = @m_date
					AND m_deleted = 0
				)
				 begin
				  return @TimeTotal
				end 
				else 
				 begin
				    declare @tbl Table(id int identity(1,1),trans_id bigint,m_transtype int )
				    insert into @tbl select  trans_id,m_transtype from tb_trans where m_id=@m_id and m_date=@m_date and m_deleted=0
				    declare @violation_id int,@violation_trans_id int ,@next_trans_id int
				    declare @TotalViolation nvarchar(12)
				    declare @violation_Time nvarchar(12), @next_Time nvarchar(12)
				    select @violation_id= id from @tbl t where m_transtype=2
				    select @violation_trans_id= trans_id from @tbl t where id=@violation_id
				    select @next_trans_id= trans_id from @tbl t where id=@violation_id+1
				    select @violation_Time=m_time from tb_trans where trans_id=@violation_trans_id
				    select @next_Time=m_time from tb_trans where trans_id=@next_trans_id
			    	 set @TotalViolation= dbo.GetTimeTotal(@violation_Time, @next_Time)
				     return  dbo.GetSubtractTimeTotal(@TimeTotal,@TotalViolation)
				end 		
      end 
      return  @TimeTotal
END;


GO
CREATE FUNCTION [dbo].[GetTimeTotal] (
	@timefin AS DATETIME
	,@timefout AS DATETIME
	)
RETURNS VARCHAR(5)
AS
BEGIN
	DECLARE @d INT
	DECLARE @h INT
	DECLARE @m INT
	DECLARE @newdate DATETIME
	SET @d = (
			SELECT DATEDIFF(minute, @timefin, @timefout)
			)
			if @d<0
			set @d=@d+1440
	SET @h = CAST((@d / 60) AS INT)
	SET @m = Abs((@h * 60) - @d)
	SET @newdate = dateadd(ss, (@h * 3600) + (@m * 60) + 0, 0)
	RETURN convert(VARCHAR, dateadd(ss, (@h * 3600) + (@m * 60) + 0, 0), 8);
END;


GO
CREATE FUNCTION [dbo].[GetTimeTotalTowShifts] (
	 @timefin AS VARCHAR(5)
	,@timefout AS VARCHAR(5)
	,@timesin AS VARCHAR(5)
	,@timesout AS VARCHAR(5)
	)
RETURNS VARCHAR(5)
AS
BEGIN
	DECLARE @fTotalTime VARCHAR(5)
	DECLARE @sTotalTime VARCHAR(5)
	if ISNULL(left(@timefin, 5),N'--:--') <> N'--:--' and ISNULL(left(@timefout, 5),N'--:--') <> N'--:--' 
	 begin
	   SET @fTotalTime=dbo.GetTimeTotal(@timefin, @timefout) 
	 end
	 ELSE 
	 begin
	   SET @fTotalTime='--:--' 
	 end
	 if ISNULL(left(@timesin, 5),N'--:--') <> N'--:--' and ISNULL(left(@timesout, 5),N'--:--') <> N'--:--' 
	 begin
	   SET @sTotalTime=dbo.GetTimeTotal(@timesin, @timesout) 
	 end
	 ELSE 
	 begin
	   SET @sTotalTime='--:--' 
	 end
   if @fTotalTime <> '--:--'  and @sTotalTime <>  '--:--' RETURN  dbo.GetSumTimeTotal(@fTotalTime, @sTotalTime)
   else  if @fTotalTime <> '--:--'  and @sTotalTime =  '--:--' RETURN  @fTotalTime
   else  if @fTotalTime = '--:--'  and @sTotalTime <> '--:--' RETURN  @sTotalTime
   else  if @fTotalTime = '--:--'  and @sTotalTime = '--:--' RETURN  '00:00'
   RETURN  '00:00'
END;


GO
CREATE FUNCTION [dbo].[GetTimeTotalWithAllowMint] (
	@shiftid AS INT
	,@timefin AS DATETIME
	,@timefout AS DATETIME
	
	)
RETURNS VARCHAR(5)
AS
BEGIN
	DECLARE @allowmint INT,@isnighty bit
	DECLARE @tempallow INT
	DECLARE @d INT
	DECLARE @h INT
	DECLARE @m INT
	set @isnighty=0
	SELECT @allowmint = shift_allow,@isnighty=ISNULL(shift_isnight,0)
	FROM dbo.tb_shift
	WHERE shift_id = @shiftid
	IF @allowmint = 0
	BEGIN
		SET @d = (
				SELECT DATEDIFF(minute, @timefin, @timefout) +  dbo.Check24Hour(@timefin, @timefout,@isnighty)
				)
		SET @h = CAST((@d / 60) AS INT)
		SET @m = Abs((@h * 60) - @d)
		RETURN convert(VARCHAR, dateadd(ss, (@h * 3600) + (@m * 60) + 0, 0), 8);
	END
	IF @allowmint > 0
	BEGIN
		SET @d = (
				SELECT DATEDIFF(minute, @timefin, @timefout) +  dbo.Check24Hour(@timefin, @timefout,@isnighty)
				)
		SET @tempallow = @allowmint + 1 - @d
		SET @h = CAST((@d / 60) AS INT)
		SET @m = Abs((@h * 60) - @d)
		IF @tempallow > 0
			RETURN '--:--'
	END
	RETURN convert(VARCHAR, dateadd(ss, (@h * 3600) + (@m * 60) + 0, 0), 8);
END;


GO
CREATE FUNCTION [dbo].[GetTimeTotalWithAllowMintForOut] (
	@shiftid AS INT
	,@timefin AS DATETIME
	,@timefout AS DATETIME
	
	)
RETURNS VARCHAR(5)
AS
BEGIN
	DECLARE @allowmint INT,@isnighty bit,@sh_fin nvarchar(5),@sh_fout nvarchar(5),@acctime nvarchar(5)
	DECLARE @tempallow INT
	DECLARE @d INT
	DECLARE @h INT
	DECLARE @m INT
	set @isnighty=0
	SELECT @allowmint = shift_allow_out ,@isnighty=ISNULL(shift_isnight,0),@sh_fin=shift_fin ,@sh_fout=shift_fout 
	FROM dbo.tb_shift
	WHERE shift_id = @shiftid
	
	if DATEDIFF(minute, @timefin, @sh_fin)>=0 and @isnighty=0
	RETURN dbo.GetTimeTotal(@sh_fin,@sh_fout)

	IF @allowmint = 0
	BEGIN
		SET @d = (
				SELECT DATEDIFF(minute, @timefin, @timefout) +  dbo.Check24Hour(@timefin, @timefout,@isnighty)
				)
		SET @h = CAST((@d / 60) AS INT)
		SET @m = Abs((@h * 60) - @d)
		RETURN convert(VARCHAR, dateadd(ss, (@h * 3600) + (@m * 60) + 0, 0), 8);
	END
	IF @allowmint > 0
	BEGIN
		SET @d = (
				SELECT DATEDIFF(minute, @timefin, @timefout) +  dbo.Check24Hour(@timefin, @timefout ,@isnighty)
				)
		SET @tempallow = @allowmint + 1 - @d
		SET @h = CAST((@d / 60) AS INT)
		SET @m = Abs((@h * 60) - @d)
		IF @tempallow > 0
			RETURN '--:--'
	END
	RETURN convert(VARCHAR, dateadd(ss, (@h * 3600) + (@m * 60) + 0, 0), 8);
END;


GO
CREATE FUNCTION [dbo].[GetTimeTotalWithBreak] (
	@timefin AS DATETIME
	,@timefout AS DATETIME
	,@fbreak AS DATETIME
	,@tbreak AS DATETIME
	)
RETURNS VARCHAR(5)
AS
BEGIN
	DECLARE @breakTime VARCHAR(5)
	DECLARE @TotalTime VARCHAR(5)
	IF (
			DATEDIFF(minute, @timefin, @fbreak) > 0
			AND DATEDIFF(minute, @timefout, @fbreak) >= 0
			)
		OR (
			DATEDIFF(minute, @timefin, @tbreak) <= 0
			AND DATEDIFF(minute, @timefout, @tbreak) < 0
			)
	BEGIN
		SET @breakTime = '00:00'
	END
	ELSE
		IF (
				(DATEDIFF(minute, @timefin, @fbreak) > 0)
				AND (
					DATEDIFF(minute, @timefout, @fbreak) < 0
					AND DATEDIFF(minute, @timefout, @tbreak) > 0
					)
				)
		BEGIN
			SET @timefout = @fbreak
			SET @breakTime = '00:00'
		END
		ELSE
			IF (DATEDIFF(minute, @timefin, @fbreak) > 0)
				AND (DATEDIFF(minute, @timefout, @tbreak) <= 0)
			BEGIN
				SET @breakTime = dbo.GetTimeTotal(@fbreak, @tbreak)
			END
			ELSE
				IF (
						(DATEDIFF(minute, @timefin, @fbreak) <= 0)
						AND (DATEDIFF(minute, @timefin, @tbreak) >= 0)
						)
					AND (
						(DATEDIFF(minute, @timefout, @fbreak) <= 0)
						AND (DATEDIFF(minute, @timefout, @tbreak) >= 0)
						)
				BEGIN
					RETURN '00:00'
				END
				ELSE
					IF (
							(DATEDIFF(minute, @timefin, @fbreak) <= 0)
							AND (DATEDIFF(minute, @timefin, @tbreak) >= 0)
							)
						AND (DATEDIFF(minute, @timefout, @tbreak) <= 0)
					BEGIN
						SET @timefin = @tbreak
						SET @breakTime = '00:00'
					END
	SET @TotalTime = dbo.GetTimeTotal(@timefin, @timefout)
	RETURN dbo.GetTimeTotal(@breakTime, @TotalTime)
END;


GO

GO
CREATE FUNCTION [dbo].[GetTreeNodeLevelOFDep] (@pCurrentNode INT)
RETURNS INT
AS
BEGIN
	DECLARE @vParentID INT
	IF @pCurrentNode = 0
		OR @pCurrentNode IS NULL
		RETURN 0
	SELECT @vParentID = ParentID
	FROM [dbo].[NewDepAllEmpExcel]
	WHERE depID = @pCurrentNode
	RETURN [dbo].[GetTreeNodeLevelOFDep](@vParentID) + 1
END


GO
CREATE FUNCTION [dbo].[HasExecuse] (
	@emp_id INT
	,@m_date INT
	)
RETURNS INT
AS
BEGIN
	DECLARE @exc_id INT
	SELECT @exc_id = exc_id
	FROM dbo.tb_execuse
	WHERE exc_empid = @emp_id
		AND exc_date = @m_date
		AND exc_deleted = 0
		and exc_status=1 and ApprovalByManager='EAS02'
	RETURN isnull(@exc_id, 0)
END


GO
CREATE FUNCTION [dbo].[Hasfailtrans] (
	@id AS INT
	,@m_date AS INT
	)
RETURNS INT
AS
BEGIN
	RETURN (
			SELECT count(m_id)
			FROM tb_trans
			WHERE m_status = 0
				AND m_id = @id
				AND m_date = @m_date
			)
END


GO
CREATE FUNCTION [dbo].[HasVacation] (
	@emp_id INT
	,@m_date INT
	)
RETURNS INT
AS
BEGIN
	DECLARE @vac_id INT
	SELECT top(1) @vac_id = vac_id
	FROM tb_vacation
	WHERE vac_empid = @emp_id
		AND @m_date BETWEEN vac_fdate
			AND vac_tdate
		AND vac_deleted = 0 and vac_status=1
		order by vac_id
	RETURN isnull(@vac_id, 0)
END


GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION IsManager (@Username NVARCHAR(150))
RETURNS BIT
AS
BEGIN
	DECLARE @IsManager BIT

	IF (
			SELECT count(1)
			FROM dbo.TimeAtt_GetSectionUnderManager(@Username, '-1')
			) > 0
		SELECT @IsManager = cast(1 AS BIT)
	ELSE
		SELECT @IsManager = cast(0 AS BIT)

	RETURN @IsManager
END

GO
CREATE FUNCTION [dbo].[Split]  
(  
 @RowData nvarchar(MAX),
 @SplitOn nvarchar(5)
)    
RETURNS @ReturnValue TABLE   
(Data NVARCHAR(MAX))   
AS
BEGIN
 Declare @Counter int
 Set @Counter = 1 
 While (Charindex(@SplitOn,@RowData)>0) 
 Begin  
  Insert Into @ReturnValue (data)  
  Select Data = 
      ltrim(rtrim(Substring(@RowData,1,Charindex(@SplitOn,@RowData)-1)))
  Set @RowData = 
      Substring(@RowData,Charindex(@SplitOn,@RowData)+1,len(@RowData)) 
  Set @Counter = @Counter + 1  
 End 
 Insert Into @ReturnValue (data)  
 Select Data = ltrim(rtrim(@RowData))  
 Return  
END


GO
CREATE FUNCTION [dbo].[TimeAtt_GetSectionUnderManager] (
	 @emp_username NVARCHAR(250)
	,@SelectSecID INT
	)
RETURNS @rtnTable TABLE (
	sec_ID INT
	,sec_Name NVARCHAR(500)
	)
AS
BEGIN
	DECLARE @emp_id INT
	SELECT @emp_id = emp_id
	FROM tb_employee
	JOIN tb_users ON tb_employee.emp_id = user_empid
	WHERE [user_name] = @emp_username
	DECLARE @tbl TABLE (
		id INT identity
		,secID INT
		)
		DECLARE @tblSections TABLE (
		id INT identity
		,secID INT
		)
		DECLARE @tblCurrent TABLE (
		id INT identity
		,secID INT
		)
	DECLARE @tblcount INT = 1
	DECLARE @tbllength INT =0 
	DECLARE @mainsecid int
	 INSERT INTO @tbl
		SELECT sec_ID
		FROM tb_section
		WHERE sec_manager = @emp_id
		    or ( sec_secondmanager= @emp_id and sec_secondmanageractive=1)
	
	   set @tbllength=	(SELECT count(1) FROM @tbl)
	      	WHILE @tblcount <= @tbllength
				BEGIN
				SELECT @mainsecid = cast(secID AS VARCHAR(4))
				FROM @tbl
				WHERE id = @tblcount
				INSERT INTO @tblSections
				 select sec_id from dbo.GetSecUnderSec(@mainsecid) t
				SET @tblcount = @tblcount + 1
				ENd
	
	
	if @SelectSecID =-1
	insert into  @tblCurrent(secID ) select secID  from @tblSections
	else
	insert into @tblCurrent (secID ) select sec_id from dbo.GetSecUnderSec(@SelectSecID) where exists (select 1 from   @tblSections where secID =@SelectSecID)

	INSERT INTO @rtnTable
	SELECT distinct tb_section.sec_ID
		,tb_section.sec_Name
	FROM tb_section
	JOIN @tblCurrent t 
	  ON tb_section.sec_ID = t.secID
	ORDER BY sec_ID
	RETURN
END


GO

CREATE FUNCTION [dbo].[TimeAtt_GetTimeSheetSummryTable] (
	@fm_date INT
	,@tm_date INT
	,@emp_id INT = NULL
	,@secid INT
	,@username NVARCHAR(100) = NULL
	)
RETURNS TABLE
AS
RETURN

SELECT m_id
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
	,dbo.GetTimeFromTotalMinuts(totalExecuseFullM) totalExecuseFull
	--,dbo.GetTimeFromTotalMinuts(totalExecuseM) totalexec
	,dbo.GetTimeFromTotalMinuts(ac_workM) ac_work
	,dbo.GetTimeFromTotalMinuts(totalworkM) totalwork
	,dbo.GetTimeFromTotalMinuts(totallateM) totallate
	,dbo.GetTimeFromTotalMinuts(totaloverM) totalover
	,totalExecuseM
	,ac_workM
	,totalworkM
	,totallateM
	,totaloverM
FROM (
	SELECT m_id
		,tb_employee.emp_id
		,emp_no
		,emp_name
		,emp_section
		,sum(CASE 
				WHEN (
						m_timefin <> '--:--'
						AND m_actualtime <> '00:00'
						)
					OR (isnull(tb_execuse.exc_type, 0) = 2)
					THEN 1
				ELSE 0
				END) daysno
		,sum(CASE 
				WHEN (
						m_timefin = '--:--'
						AND m_timefout = '--:--'
						AND m_actualtime <> '00:00'
						)
					AND (isnull(tb_execuse.exc_type, 0) <> 2)
					THEN 1
				ELSE 0
				END) daysabsent
		,sum(CASE 
				WHEN m_actualtime = '00:00'
					AND m_vac_id = 0
					THEN 1
				ELSE 0
				END) daysoff
		,sum(CASE 
				WHEN isnull(m_vac_id, 0) > 0
					THEN 1
				ELSE 0
				END) daysvication
		,sum(CASE 
				WHEN tb_execuse.exc_id IS NULL
					AND exc_type = 1
					THEN 0
				ELSE exc_minuts
				END) totalExecuseM
		,sum(CASE 
				WHEN tb_execuse.exc_id IS NULL
					AND exc_type = 2
					THEN 0
				ELSE exc_minuts
				END) totalExecuseFullM
		,sum(dbo.GetTotalMinutsFromTime(m_actualtime)) ac_workM
		,sum(CASE 
				WHEN m_timetotal = '--:--'
					THEN 0
				ELSE dbo.GetTotalMinutsFromTime(m_timetotal)
				END) totalworkM
		,sum(CASE 
				WHEN m_totallate = '--:--'
					THEN 0
				ELSE dbo.GetTotalMinutsFromTime(m_totallate)
				END) totallateM
		,sum(CASE 
				WHEN m_overtime = '--:--'
					THEN 0
				ELSE dbo.GetTotalMinutsFromTime(m_overtime)
				END) totaloverM
	FROM tb_transSummey(NOLOCK)
	INNER JOIN tb_employee(NOLOCK) ON m_id = emp_card
	INNER JOIN dbo.TimeAtt_GetSectionUnderManager(@username, @secid) SecMang ON emp_section = SecMang.sec_ID
	LEFT OUTER JOIN dbo.tb_execuse(NOLOCK) ON dbo.tb_employee.emp_id = dbo.tb_execuse.exc_empid
		AND dbo.tb_transSummey.m_date = dbo.tb_execuse.exc_date
		AND dbo.tb_execuse.exc_status = 1
		AND dbo.tb_execuse.ApprovalByManager = 'EAS02'
		AND dbo.tb_execuse.exc_deleted = 0
	WHERE (
			m_date BETWEEN @fm_date
				AND @tm_date
			)
		AND (
			@emp_id IS NULL
			OR @emp_id = tb_employee.emp_id
			)
		--AND (
		--	@secid IS NULL
		--	OR emp_section IN (
		--		SELECT sec_ID
		--		FROM TimeAtt_GetSectionUnderManager(@username, @secid)
		--		)
		--	)
		AND (tb_employee.emp_deleted = 0)
		AND (tb_employee.emp_jointype <> 'EJT08')
		AND (tb_employee.emp_violatedException <> 1)
	GROUP BY m_id
		,tb_employee.emp_id
		,emp_no
		,emp_name
		,emp_section
	) tb
INNER JOIN tb_section(NOLOCK) ON tb.emp_section = sec_ID

GO

CREATE FUNCTION [dbo].[TimeAtt_GetTimeSheetSummryTableForEmployee] (
	@fm_date INT
	,@tm_date INT
	,@username NVARCHAR(100)
	)
RETURNS TABLE
AS
RETURN

SELECT m_id
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
	,dbo.GetTimeFromTotalMinuts(totalExecuseFullM) totalExecuseFull
	--,dbo.GetTimeFromTotalMinuts(totalExecuseM) totalexec
	,dbo.GetTimeFromTotalMinuts(ac_workM) ac_work
	,dbo.GetTimeFromTotalMinuts(totalworkM) totalwork
	,dbo.GetTimeFromTotalMinuts(totallateM) totallate
	,dbo.GetTimeFromTotalMinuts(totaloverM) totalover
	,totalExecuseM
	,ac_workM
	,totalworkM
	,totallateM
	,totaloverM
FROM (
	SELECT m_id
		,tb_employee.emp_id
		,emp_no
		,emp_name
		,emp_section
		,sum(CASE 
				WHEN (
						m_timefin <> '--:--'
						AND m_actualtime <> '00:00'
						)
					OR (isnull(tb_execuse.exc_type, 0) = 2)
					THEN 1
				ELSE 0
				END) daysno
		,sum(CASE 
				WHEN (
						m_timefin = '--:--'
						AND m_timefout = '--:--'
						AND m_actualtime <> '00:00'
						)
					AND (isnull(tb_execuse.exc_type, 0) <> 2)
					THEN 1
				ELSE 0
				END) daysabsent
		,sum(CASE 
				WHEN m_actualtime = '00:00'
					AND m_vac_id = 0
					THEN 1
				ELSE 0
				END) daysoff
		,sum(CASE 
				WHEN isnull(m_vac_id, 0) > 0
					THEN 1
				ELSE 0
				END) daysvication
		,sum(CASE 
				WHEN tb_execuse.exc_id IS NULL
					AND exc_type = 1
					THEN 0
				ELSE exc_minuts
				END) totalExecuseM
		,sum(CASE 
				WHEN tb_execuse.exc_id IS NULL
					AND exc_type = 2
					THEN 0
				ELSE exc_minuts
				END) totalExecuseFullM
		,sum(dbo.GetTotalMinutsFromTime(m_actualtime)) ac_workM
		,sum(CASE 
				WHEN m_timetotal = '--:--'
					THEN 0
				ELSE dbo.GetTotalMinutsFromTime(m_timetotal)
				END) totalworkM
		,sum(CASE 
				WHEN m_totallate = '--:--'
					THEN 0
				ELSE dbo.GetTotalMinutsFromTime(m_totallate)
				END) totallateM
		,sum(CASE 
				WHEN m_overtime = '--:--'
					THEN 0
				ELSE dbo.GetTotalMinutsFromTime(m_overtime)
				END) totaloverM
	FROM tb_transSummey(NOLOCK)
	INNER JOIN tb_employee(NOLOCK) ON m_id = emp_card
	INNER JOIN tb_users ON user_empid = emp_id
	LEFT OUTER JOIN dbo.tb_execuse(NOLOCK) ON dbo.tb_employee.emp_id = dbo.tb_execuse.exc_empid
		AND dbo.tb_transSummey.m_date = dbo.tb_execuse.exc_date
		AND dbo.tb_execuse.exc_status = 1
		AND dbo.tb_execuse.ApprovalByManager = 'EAS02'
		AND dbo.tb_execuse.exc_deleted = 0
	WHERE (
			m_date BETWEEN @fm_date
				AND @tm_date
			)
		AND (@username = user_name)
		--AND (
		--	@secid IS NULL
		--	OR emp_section IN (
		--		SELECT sec_ID
		--		FROM TimeAtt_GetSectionUnderManager(@username, @secid)
		--		)
		--	)
		AND (tb_employee.emp_deleted = 0)
		AND (tb_employee.emp_jointype <> 'EJT08')
		AND (tb_employee.emp_violatedException <> 1)
	GROUP BY m_id
		,tb_employee.emp_id
		,emp_no
		,emp_name
		,emp_section
	) tb
INNER JOIN tb_section(NOLOCK) ON tb.emp_section = sec_ID

GO
CREATE FUNCTION [dbo].[ufn_GetParentLevel] (@pCurrentNodeID INT)
RETURNS int
AS
BEGIN
	DECLARE @vCurrentNodeLevel int
	DECLARE @vParentID INT
	DECLARE @vIsRoot bit
	IF @pCurrentNodeID IS NULL
		OR @pCurrentNodeID = 0
		RETURN NULL
	SELECT @vCurrentNodeLevel =sec_Level ,@vIsRoot=IsRoot--cast([sec_Level]  AS VARCHAR)
		,@vParentID = [sec_Parent]
	FROM [dbo].tb_section 
	WHERE [sec_id] = @pCurrentNodeID
	return case when @vIsRoot = 1 then 0 else  isnull(dbo.ufn_GetParentLevel(@vParentID),0) + 1 end
	--RETURN ISNULL([dbo].[ufn_GetParentPath](@vParentID) + '/', '') + @vCurrentNodeName
END


GO
CREATE FUNCTION [dbo].[ufn_GetParentPath] (@pCurrentNodeID INT)
RETURNS VARCHAR(1000)
AS
BEGIN
	DECLARE @vCurrentNodeName VARCHAR(50)
	DECLARE @vParentID INT
	IF @pCurrentNodeID IS NULL
		OR @pCurrentNodeID = 0
		RETURN NULL
	SELECT @vCurrentNodeName = cast([sec_id] AS VARCHAR)
		,@vParentID = [sec_Parent]
	FROM [dbo].tb_section 
	WHERE [sec_id] = @pCurrentNodeID
	RETURN ISNULL([dbo].[ufn_GetParentPath](@vParentID) + '/', '') + @vCurrentNodeName
END


GO
