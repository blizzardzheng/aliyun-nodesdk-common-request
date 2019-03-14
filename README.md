# aliyun-sdk-node-request

用 nodeJS 实现了阿里云 [http接口协议](https://help.aliyun.com/document_detail/25492.html) 并对特殊配置做了封装，可以一些服务作为 aliyun-sdk-node 的通用request层

### 安装
npm install aliyun-sdk-node-request --save

### Examples
```js
import Request from 'aliyun-sdk-node-request';
describe('获取案例', async function () {
    it('用例1', async function () {
      const request = new Request({
        endpoint: `http://eci.aliyuncs.com`,
        AccessKeyId: 'testid',
        AccessKeySecret: 'testsecret'
      });
      const res = await request.invoke('createContainerGroup', {
        RegionId: 'xx',
        Container: [{Command: ['123' ]}]
      }, 'getQuery');
      console.log('res', res);
    })
})
```
### API
invoke:
第一个参数是 action 名，若只传object则自己在object里配置
第二个为其他丢进invoke的配置,可以覆盖实例配的通用配置
返回一个promose结果

