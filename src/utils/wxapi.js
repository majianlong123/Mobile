import qs from 'qs'

// const wxBaseUrl = 'http://localhost:8080'
const wxApiUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize'
// const wxAppSecret = '0e71b8c395ff717c11815a5d6680b501'

export default class {
  // 换取微信code
  static wxCode() {
    const params = {
      appid: 'wxbd3376255a187f32',
      redirect_uri: 'https://myssl.fxcloud.net/personal/auth',
      response_type: 'code',
      scope: 'snsapi_userinfo',
      state: 'Shopping'
    }
    const gourl = wxApiUrl + '?' + qs.stringify(params) + '#wechat_redirect'
    // console.log(gourl)
    window.location.href = gourl
  }
}
