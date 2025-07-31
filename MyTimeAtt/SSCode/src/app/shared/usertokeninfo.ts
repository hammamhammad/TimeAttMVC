export class UserTokenInfo {

    UserId: number;
    UserName: string;
    UserPer?: number;
    UserEmpID?: number;
    IsActive?: boolean;
    Email?: string;
    PasswordHash?: string;
    EmployeeName?: string;
    EmployeeNumber?: string;
    Created?: string;
    AuthType?: string;
    MustChangePassword?: boolean;

    constructor(data: any) {
        this.UserId = data.UserId;
        this.UserName = data.UserName;
        this.UserPer = data.UserPer;
        this.UserEmpID = data.UserEmpID;
        this.IsActive = data.IsActive;
        this.Email = data.Email;
        this.PasswordHash = data.PasswordHash;
        this.EmployeeName = data.EmployeeName;
        this.EmployeeNumber = data.EmployeeNumber;
        this.Created = data.Created;
        this.AuthType = data.AuthType;
        this.MustChangePassword = data.MustChangePassword;
    }
}
export class User {
    Username: string;
    Password: string;
    RememberMe: boolean;


    constructor(username: string,
        password: string) {
        this.Username = username;
        this.Password = password;
        this.RememberMe = false;
    }
}

