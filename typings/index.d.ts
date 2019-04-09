export declare function constructSignatureStr(config: any): string;
declare class Request {
    private commonConfig;
    constructor(commonConfig: any);
    invoke(Action: any, config: any, cmd?: any): Promise<any>;
    getSignature(str: any): any;
    request(config: any, cmd?: any): Promise<any>;
}
export default Request;
