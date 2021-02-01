import { pay } from '@/api/public'
import { getToken } from '@/utils/cookies'
import store from '@/store'

console.log('这是store', store)
console.log('这是store2', store.getters.successPayOrderId)

// export default class myPay {
//   static switchPay(id, payment) {
//     return new Promise((resolve, reject) => {
//       pay({ order_id: id, payment: payment })
//         .then((res) => {
//           this.theBeecloud(res.data, id)
//           //   resolve(res)
//         })
//         .catch((e) => {
//           reject(e)
//         })
//     })
//   }

//   static theBeecloud(data, orderId) {
//     const self = this
//     if (getToken('openId')) {
//       data.openId = getToken('openId')
//     } else {
//       data.instant_channel = 'wxwap'
//       data.openId = ''
//     }
//     // eslint-disable-next-line no-undef
//     BC.click(
//       {
//         title: data.title,
//         out_trade_no: data.out_trade_no,
//         analysis: data.analysis,
//         return_url: 'https://myssl.fxcloud.net/order',
//         amount: data.amount,
//         instant_channel: data.instant_channel,
//         sign: data.sign,
//         openid: data.openId
//       },

//       {
//         dataError: function() {
//           self.$toast('支付失败')
//           self.failJump()
//         },
//         wxJsapiFail: function() {
//           self.$toast('支付失败')
//           self.failJump()
//         },
//         wxJsapiSuccess: function() {
//           self.$toast('支付成功')
//           store.commit('user/SET_ORDERID', orderId)
//           self.failJump()
//         }
//       }
//     )
//   }

//   static failJump() {
//     this.$router.push({
//       name: 'Order'
//     })
//   }
// }
