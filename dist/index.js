"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require('uuid');
const flat_1 = require("./flat");
const encode3986_1 = require("./encode3986");
const hmacsha1 = require('hmacsha1');
const utf8 = require('utf8');
const pipe = require('promised-pipe');
const request = require('request-promise');
function percentEncode(str) {
    return str ? encode3986_1.default(str) : '';
}
function stringToSign(str) {
    const tmp = `GET&${percentEncode('/')}&${percentEncode(str)}`;
    return tmp;
}
function hhmac(secret) {
    const wrapperedSecret = `${secret}&`;
    return (last) => hmacsha1(wrapperedSecret, last);
}
;
function constructSignatureStr(config) {
    const flattenConfig = flat_1.default(config);
    const flattenConfigKeys = Object.keys(flattenConfig);
    const str = flattenConfigKeys
        .sort()
        .reduce((p, v, i) => {
        return `${p}${v}=${flattenConfig[v]}${i < flattenConfigKeys.length - 1 ? '&' : ''}`;
    }, '');
    return str;
}
exports.constructSignatureStr = constructSignatureStr;
;
class Request {
    constructor(commonConfig) {
        this.commonConfig = {
            endpoint: commonConfig.endpoint,
            AccessKeyId: commonConfig.AccessKeyId,
            AccessKeySecret: commonConfig.AccessKeySecret,
            Format: commonConfig.Format || 'json',
            SignatureMethod: 'HMAC-SHA1',
            SignatureVersion: '1.0',
            SignatureNonce: uuid.v1(),
            Timestamp: new Date().toISOString(),
            RegionId: commonConfig.RegionId,
            Action: commonConfig.Action,
            Version: commonConfig.Version
        };
    }
    invoke(Action, config, cmd) {
        const length = arguments.length;
        const _action = length > 1 ? Action : undefined;
        const _config = length > 1 ? config : Action;
        const newConfig = Object.assign({}, this.commonConfig, _config, {
            Action: _action
        });
        return this.request(newConfig, cmd);
    }
    getSignature(str) {
        return pipe(stringToSign, utf8.encode, hhmac(this.commonConfig.AccessKeySecret), encode3986_1.default)(str);
    }
    async request(config, cmd) {
        const flattenConfig = flat_1.default(config);
        const flattenConfigKeys = Object.keys(flattenConfig);
        const str = flattenConfigKeys
            .sort()
            .reduce((p, v, i) => {
            return `${p}${v}=${flattenConfig[v]}${i < flattenConfigKeys.length - 1 ? '&' : ''}`;
        }, '');
        const Signature = await this.getSignature(str);
        const finalQuery = `${str}&Signature=${Signature}`;
        if (cmd === 'getQuery') {
            return finalQuery;
        }
        return request.get(this.commonConfig.endpoint + '?' + finalQuery);
    }
}
exports.default = Request;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0IsaUNBQTZCO0FBQzdCLDZDQUFrQztBQUNsQyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDckMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUNyQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUUzQyxTQUFTLGFBQWEsQ0FBQyxHQUFHO0lBQ3hCLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxvQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7QUFDL0IsQ0FBQztBQUNELFNBQVMsWUFBWSxDQUFDLEdBQUc7SUFDdkIsTUFBTSxHQUFHLEdBQUksT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDL0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQsU0FBUyxLQUFLLENBQUMsTUFBTTtJQUNuQixNQUFNLGVBQWUsR0FBRyxHQUFHLE1BQU0sR0FBRyxDQUFDO0lBQ3JDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDbEQsQ0FBQztBQUFBLENBQUM7QUFFRixTQUFnQixxQkFBcUIsQ0FBQyxNQUFNO0lBQzFDLE1BQU0sYUFBYSxHQUFHLGNBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7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