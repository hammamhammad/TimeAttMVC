export class ResponseResult {
    Status: boolean;
    Msg: string;
    Result: any;
    AdditionalInformation:string;
    constructor() {
    }
    public mapResult(res: any)
    {
        this.Status = (res.Status === '1');
        this.Msg = res.Msg;
        this.Result = res.Result;
        this.AdditionalInformation=res.AdditionalInformation;

    }
}
