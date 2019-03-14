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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0IsaUNBQTZCO0FBQzdCLDZDQUFrQztBQUNsQyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDckMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUNyQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUUzQyxTQUFTLGFBQWEsQ0FBQyxHQUFHO0lBQ3hCLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxvQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7QUFDL0IsQ0FBQztBQUNELFNBQVMsWUFBWSxDQUFDLEdBQUc7SUFDdkIsTUFBTSxHQUFHLEdBQUksT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDL0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQsU0FBUyxLQUFLLENBQUMsTUFBTTtJQUNuQixNQUFNLGVBQWUsR0FBRyxHQUFHLE1BQU0sR0FBRyxDQUFDO0lBQ3JDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDbEQsQ0FBQztBQUFBLENBQUM7QUFFRixNQUFNLE9BQU87SUFFWCxZQUFZLFlBQVk7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRztZQUNsQixRQUFRLEVBQUUsWUFBWSxDQUFDLFFBQVE7WUFDL0IsV0FBVyxFQUFFLFlBQVksQ0FBQyxXQUFXO1lBQ3JDLGVBQWUsRUFB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