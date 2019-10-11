const uuid = require('uuid');
import flatten from './flat';
import encode from './encode3986';
const hmacsha1 = require('hmacsha1');
const utf8 = require('utf8');
const pipe = require('promised-pipe');
const axios = require('axios');

function percentEncode(str) {
  return str ? encode(str) : ''
}
function stringToSign(str) {
  const tmp =  `GET&${percentEncode('/')}&${percentEncode(str)}`;
  return tmp;
}

function hhmac(secret) {
  const wrapperedSecret = `${secret}&`;
  return (last) => hmacsha1(wrapperedSecret, last)
};

export function constructSignatureStr(config) {
  const flattenConfig = flatten(config);
  const flattenConfigKeys = Object.keys(flattenConfig);
  const str = flattenConfigKeys
  .sort()
  .reduce((p, v, i) => {
    return `${p}${v}=${flattenConfig[v]}${i < flattenConfigKeys.length - 1 ? '&' : ''}`
  }, '');
  return str;
};

class Request {
  private commonConfig;
  constructor(commonConfig) {
    this.commonConfig = {
      endpoint: commonConfig.endpoint,
      AccessKeyId: commonConfig.AccessKeyId,
      AccessKeySecret: commonConfig.AccessKeySecret,
      Format: commonConfig.Format || 'json',
      SignatureMethod: 'HMAC-SHA1',
      SignatureVersion: '1.0',
      Timestamp: new Date().toISOString(),
      RegionId: commonConfig.RegionId,
      Action: commonConfig.Action,
      Version: commonConfig.Version
    }
  }
  invoke(Action, config, cmd?) {
    const length = arguments.length;
    const _action = length > 1 ? Action : undefined;
    const _config = length > 1 ? config : Action;
    const newConfig = Object.assign({}, this.commonConfig, _config, {
      SignatureNonce: uuid.v1(),
      Action: _action
    });
    return this.request(newConfig, cmd);
  }

  getSignature(str) {
    return pipe(stringToSign, utf8.encode, hhmac(this.commonConfig.AccessKeySecret), encode)(str);
  }

  async request(config, cmd?) {
    const flattenConfig = flatten(config);
    const flattenConfigKeys = Object.keys(flattenConfig);
    const str = flattenConfigKeys
    .sort()
    .reduce((p, v, i) => {
      return `${p}${v}=${flattenConfig[v]}${i < flattenConfigKeys.length - 1 ? '&' : ''}`
    }, '');
    
    const Signature = await this.getSignature(str);
    const finalQuery = `${str}&Signature=${Signature}`;
    if (cmd === 'getQuery') {
      return finalQuery;
    }
    return axios.get(this.commonConfig.endpoint + '?' + finalQuery);
  }
}

export default Request;