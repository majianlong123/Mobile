const getters = {
  navList: (state) => state.navList,
  address: (state) => state.address,
  token: (state) => state.user.token,
  coordinate: (state) => state.user.coordinate,
  loginType: (state) => state.user.loginType,
  openId: (state) => state.user.openId,
  successPayOrderId: (state) => state.user.successPayOrderId
}
export default getters
