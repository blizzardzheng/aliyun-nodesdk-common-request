import { default as Request } from '../lib'
import 'mocha';
describe('获取案例', async function () {
    it('用例1', async function () {
      const request = new Request({
        endpoint: `http://eci.aliyuncs.com`,
        AccessKeyId: 'testid',
        AccessKeySecret: 'testsecret'
      });
      const res = await request.invoke('createContainerGroup', {
        regionId: 'xx',
      }, 'getQuery');
      console.log('res', res);
    })
})
