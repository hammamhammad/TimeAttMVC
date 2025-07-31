USE [SaptcoTimeAtt]
GO
ALTER TABLE [dbo].[tb_transSummey] ADD m_exc_id INT NULL
GO
DELETE trans
FROM tb_transSummey trans
LEFT JOIN tb_employee
	ON emp_card = m_id
WHERE emp_id IS NULL
GO
UPDATE trans
SET m_exc_id =isnull(exc.exc_id,0)
 FROM [dbo].[tb_transSummey] trans
INNER JOIN tb_employee emp
	ON emp_card = m_id
LEFT JOIN tb_execuse exc
	ON exc.exc_empid = emp.emp_id AND exc.exc_date = trans.m_date AND ApprovalByManager = 'EAS02' AND exc_status = 1 AND exc_deleted = 0
GO
INSERT INTO [tb_logtype] (
	[id],
	[EType],
	[AType]
	)
SELECT 11,
	N'Change Schedule',
	N'تغيير جدول الدوام'
WHERE NOT EXISTS (
		SELECT 1
		FROM [tb_logtype]
		WHERE id = 11
		)
INSERT INTO [tb_logtype] (
	[id],
	[EType],
	[AType]
	)
SELECT 12,
	N'Region',
	N'فرع'
WHERE NOT EXISTS (
		SELECT id
		FROM [tb_logtype]
		WHERE id = 12
		)
INSERT INTO [tb_logtype] (
	[id],
	[EType],
	[AType]
	)
SELECT 13,
	N'Trasaction Reasons',
	N'أسباب تعديل الحركات'
WHERE NOT EXISTS (
		SELECT id
		FROM [tb_logtype]
		WHERE id = 13
		)
INSERT INTO [tb_logtype] (
	[id],
	[EType],
	[AType]
	)
SELECT 14,
	N'Users Groups',
	N'مجموعات المستخدمين'
WHERE NOT EXISTS (
		SELECT id
		FROM [tb_logtype]
		WHERE id = 14
		)

GO
CREATE NONCLUSTERED INDEX [IX_tb_execuse] ON [dbo].[tb_execuse]
(
	[exc_date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
CREATE TABLE [dbo].[tb_PermissionGroups](
	[GroupID] [int] IDENTITY(1,1) NOT NULL,
	[GroupName] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_tb_PermissionGroups] PRIMARY KEY CLUSTERED 
(
	[GroupID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[tb_users] ADD user_Group INT NULL
GO
CREATE TABLE [dbo].[tb_Permissions](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[GroupID] [int] NOT NULL,
	[Prev_ID] [int] NOT NULL,
	[IsOK] [bit] NOT NULL,
 CONSTRAINT [PK_tb_Permissions] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
CREATE TABLE [dbo].[tb_Modules](
	[ModuleID] [int] NOT NULL,
	[ModuleName_AR] [nvarchar](150) NOT NULL,
	[ModuleName_EN] [nvarchar](150) NOT NULL,
	[ModuleShow] [BIT] NULL,
	[ORDERBY] [SMALLINT] NULL,
 CONSTRAINT [PK_tb_Modules] PRIMARY KEY CLUSTERED 
(
	[ModuleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
CREATE TABLE [dbo].[tb_Privilege](
	[PrivilegeID] [int] NOT NULL,
	[ModuleID] [int] NOT NULL,
	[PrivilegeName] [nvarchar](150) NOT NULL,
	[PrivilegeShow] [bit] NOT NULL,
	[OrderBy] [int] not null,
	[Name_AR] nvarchar(150) not null,
	[Name_EN] nvarchar(150) not null,
 CONSTRAINT [PK_tb_Privilege] PRIMARY KEY CLUSTERED 
(
	[PrivilegeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
INSERT [dbo].[tb_Modules] ([ModuleID], [ModuleName_AR], [ModuleName_EN],[ModuleShow],[ORDERBY]) VALUES (1, N'إدارة الأقسام', N'Sections Managment',1,1)
GO
INSERT [dbo].[tb_Modules] ([ModuleID], [ModuleName_AR], [ModuleName_EN],[ModuleShow],[ORDERBY]) VALUES (2, N'إدارة جداول الدوام', N'Schedules Managment',1,2)
GO
INSERT [dbo].[tb_Modules] ([ModuleID], [ModuleName_AR], [ModuleName_EN],[ModuleShow],[ORDERBY]) VALUES (3, N'إدارة الموظفين', N'Employees Managmen',1,4)
GO
INSERT [dbo].[tb_Modules] ([ModuleID], [ModuleName_AR], [ModuleName_EN],[ModuleShow],[ORDERBY]) VALUES (4, N'إدارة الحضور والانصراف', N'Attendance Managment',1,5)
GO
INSERT [dbo].[tb_Modules] ([ModuleID], [ModuleName_AR], [ModuleName_EN],[ModuleShow],[ORDERBY]) VALUES (5, N'إدارة الحركات', N'Transactions Managment',1,6)
GO
INSERT [dbo].[tb_Modules] ([ModuleID], [ModuleName_AR], [ModuleName_EN],[ModuleShow],[ORDERBY]) VALUES (6, N'إدارة الإجازات', N'Vacations Managment',1,7)
GO
INSERT [dbo].[tb_Modules] ([ModuleID], [ModuleName_AR], [ModuleName_EN],[ModuleShow],[ORDERBY]) VALUES (7, N'إدارة الأذونات', N'Excuses Managment',1,8)
GO
INSERT [dbo].[tb_Modules] ([ModuleID], [ModuleName_AR], [ModuleName_EN],[ModuleShow],[ORDERBY]) VALUES (8, N'تقارير النظام', N'System Reports',1,9)
GO
INSERT [dbo].[tb_Modules] ([ModuleID], [ModuleName_AR], [ModuleName_EN],[ModuleShow],[ORDERBY]) VALUES (9, N'تقارير أخرى', N'Other Reports',0,10)
GO
INSERT [dbo].[tb_Modules] ([ModuleID], [ModuleName_AR], [ModuleName_EN],[ModuleShow],[ORDERBY]) VALUES (20, N'إدارة الفروع', N'Branches Managment',1,3)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (1, 1, N'sec-add', 1, N'إضافة قسم', N'Add Section', 2)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (2, 1, N'sec-delete', 1, N'حذف قسم', N'Delete Section', 4)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (3, 1, N'sec-edit', 1, N'تعديل قسم', N'Edit Section', 3)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (4, 1, N'sec-move', 1, N'نقل قسم', N'Move Section', 5)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (5, 1, N'sec-view', 1, N'عرض المعلومات', N'View Info.', 1)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (6, 2, N'sch-add', 1, N'إضافة جدول', N'Add Schedule', 2)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (7, 2, N'sch-addschGroup', 1, N'إضافة مجموعة', N'Add Group', 9)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (8, 2, N'sch-addshift', 1, N'إضافة وردية', N'Add Shift', 6)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (9, 2, N'sch-delete', 1, N'حذف جدول', N'Delete Schedule', 4)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (10, 2, N'sch-deleteschGroup', 1, N'حذف مجموعة', N'Delete Group', 11)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (11, 2, N'sch-deleteshift', 1, N'حذف وردية', N'Delete Shift', 8)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (12, 2, N'sch-edit', 1, N'تعديل جدول', N'Edit Schedule', 3)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (13, 2, N'sch-editschGroup', 1, N'تعديل مجموعة', N'Edit Group', 10)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (14, 2, N'sch-editshift', 1, N'تعديل وردية', N'Edit Shift', 7)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (15, 2, N'sch-move', 1, N'نقل جدول', N'Move Schedule', 5)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (16, 2, N'sch-view', 1, N'عرض المعلومات', N'View Info.', 1)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (17, 3, N'emp-add', 1, N'إضافة موظف', N'Add Employee', 2)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (18, 3, N'emp-delete', 1, N'حذف موظف', N'Delete Employee', 4)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (19, 3, N'emp-edit', 1, N'تعديل موظف', N'Edit Employee', 3)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (20, 3, N'emp-move', 1, N'نقل موظف', N'Move Employee', 5)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (21, 3, N'emp-view', 1, N'عرض المعلومات', N'View Info', 1)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (22, 4, N'timesheet-daily', 1, N'مراقبة الحركات اليومية', N'Daily Attendance', 2)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (23, 4, N'timesheet-monthly', 1, N'مراقبة الحركات الشهرية', N'Monthly Attendance', 3)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (24, 4, N'timesheet-penalty', 1, N'الجزاءات', N'Pnalty', 6)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (25, 4, N'timesheet-transdet', 1, N'مراقبة الحركات التفصيلية', N'Details Transactions', 4)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (26, 4, N'timesheet-transreason', 1, N'أسباب تعديل الحركات', N'Reasons Of Edit Transactions', 5)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (27, 4, N'timesheet-view', 1, N'عرض المعلومات', N'View Info.', 1)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (28, 5, N'trans-add', 1, N'إضافة حركة', N'Add Transaction', 2)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (29, 5, N'trans-edit', 1, N'تعديل حركة', N'Edit Transaction', 3)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (30, 5, N'trans-include', 1, N'تضمين/استبعاد حركة', N'Include/Exclude Transaction', 4)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (31, 5, N'trans-view', 1, N'عرض المعلومات', N'View Info.', 1)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (32, 6, N'vac-addtype', 1, N'إضافة نوع إجازة', N'Add Vacation Type', 2)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (33, 6, N'vac-addvac', 1, N'إضافة إجازة', N'Add Vacation', 5)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (34, 6, N'vac-deletetype', 1, N'حذف نوع إجازة', N'Delete Vacation Type', 4)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (35, 6, N'vac-deletevac', 1, N'حذف إجازة', N'Delete Vacation', 7)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (36, 6, N'vac-edittype', 1, N'تعديل نوع الإجازة', N'Edit Vacation Type', 3)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (37, 6, N'vac-editvac', 1, N'تعديل الإجازة', N'Edit Vacation', 6)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (38, 6, N'vac-view', 1, N'عرض المعلومات', N'View Info.', 1)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (39, 7, N'exc-add', 1, N'إضافة إستئذان', N'Add Excuse', 5)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (40, 7, N'exc-addReason', 1, N'إضافة سبب الإستئذان', N'Add Excuse Reason', 2)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (41, 7, N'exc-delete', 1, N'حذف إستئذان', N'Delete Excuse', 7)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (42, 7, N'exc-deleteReason', 1, N'حذف نوع الإستئذان', N'Delete Excuse Reason', 4)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (43, 7, N'exc-edit', 1, N'تعديل الإستئذان', N'Edit Excuse', 6)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (44, 7, N'exc-editReason', 1, N'تعديل سبب الإستئذان', N'Edit Excuse Reason', 3)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (45, 7, N'exc-view', 1, N'عرض المعلومات', N'View Info.', 1)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (46, 8, N'rep-daly', 1, N'تقرير الحركات اليومية', N'Daily Report', 2)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (47, 8, N'rep-emp', 1, N'تقرير معلومات الموظفين', N'Employee Report', 3)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (48, 8, N'rep-exc', 1, N'تقرير الأذونات', N'Excuses Report', 4)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (49, 8, N'rep-monthly', 1, N'تقرير الحركات الشهرية', N'Monthly Report', 5)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (50, 8, N'rep-trans', 1, N'تقرير الحركات التفصيلية', N'Details Transactions Report', 6)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (51, 8, N'rep-vac', 1, N'تقرير الإجازات', N'Vacations Report', 7)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (52, 8, N'rep-view', 1, N'عرض التقارير', N'View Reports', 1)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (53, 9, N'repother-ContinuousAbsenceRpt', 0, N'تقرير الغياب المستمر', N'Continuous Absence Report', 2)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (54, 9, N'repother-GroupDailyTimeSheet', 0, N'تقرير مراقبة الحركات حسب مجموعة جدول الدوان', N'Daily by Schedule Group', 3)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (55, 9, N'repother-ManualTransactionEdit', 0, N'تقرير سجل تعديل الحركات', N'Log Report', 4)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (56, 9, N'repother-TransByReadersGroup', 0, N'تقرير الحرت حسب مجموعة الأجهزة', N'Transactions By Device Group', 5)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (57, 9, N'repother-view', 0, N'عرض التقارير الأخرى', N'View Other Reports', 1)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (58, 20, N'reg-view', 1, N'عرض المعلومات', N'View Info.', 1)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (59, 20, N'reg-add', 1, N'إضافة فرع', N'Add Branch', 2)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (60, 20, N'reg-edit', 1, N'تعديل فرع', N'Edit Branch', 3)
GO
INSERT [dbo].[tb_Privilege] ([PrivilegeID], [ModuleID], [PrivilegeName], [PrivilegeShow], [Name_AR], [Name_EN], [OrderBy]) VALUES (61, 20, N'reg-delete', 1, N'حذف فرع', N'Delete Branch', 4)
GO


ALTER FUNCTION [dbo].[GeatEarlyOut] (
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
		SELECT @shiftout = DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(@m_date)), cast(@shiftout AS DATETIME))
			,@shiftin = DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(@m_date)), cast(@shiftin AS DATETIME))
			,@timefin = DATEADD(day, DATEDIFF(day, 0, dbo.getdatefromno(@m_date)), cast(@timefin AS DATETIME))
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