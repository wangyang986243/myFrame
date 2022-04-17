// import Mqi from '@/config/api/mqi';
import Mqi from '@/config/api/mqi';

export default {
  projectName: '',
  projectTitle: '',
  baseUrl: '',
  header: [
    // { key: 'sourceCode', value: 'agent' },
    // { key: 'appId', value: '5e0f1ae4dc9211eaa98d000c2928f766' }
  ] ,
  tokenKey: 'JHDesignToken',
  timeout: 1000 * 60 * 60, // 1个小时
  defaultTimeout: 1000 * 60 * 5, // 5分钟
  axiosBaseUrl: process.env.NODE_ENV === 'production' ? 'c-api/' : 'c-api/', //
  // imageServerUrl: 'https://meishutest-1256675553.cos.ap-chengdu.myqcloud.com/',
  apiUrl: {
    ...Mqi,
  }
}
