<template>
  <div class="body">
    <pubHeader leftType name="确认订单"></pubHeader>
    <div class="padding-bot">
      <type-card :address="address.address"></type-card>
      <details-card :orderList="orderList" :info="info"></details-card>
      <pay-card @switchPay="switchPay"></pay-card>
    </div>
    <div class="bottom">
      <span>合计：</span>
      <span class="moeny">
        &yen;
        <span>{{ info.orderfee }}</span>
      </span>
      <div class="button" @click="onSubmit">提交订单</div>
    </div>
  </div>
</template>

<script>
import pubHeader from '@/components/header'
import typeCard from './components/typeCard'
import detailsCard from './components/detailsCard'
import payCard from './components/payCard'
// import { confirmS, submitS } from '@/api/shopCart'
// import { confirmG, submitG } from '@/api/goods'
import payClass from '@/utils/pay'
export default {
  components: {
    pubHeader,
    typeCard,
    detailsCard,
    payCard
  },
  data() {
    return {
      info: {},
      payment: 'wx',
      address: this.$store.state.address,
      orderList: [],
      type: '', // 判断是购物车还是商品
      spec_id: '',
      buy_num: 0
    }
  },
  created() {
    // this.getData()
  },
  activated() {
    this.type = this.$route.query.type
    this.spec_id = this.$route.query.spec_id || ''
    this.buy_num = this.$route.query.num || 0
    this.getActivated()
  },
  methods: {
    getActivated() {
      if (this.type === 'shopCart') {
        confirmS().then((res) => {
          this.info = res.data
          this.orderList = res.data.list.goods_list
        })
      } else {
        console.log(1)
        confirmG({ spec_id: this.spec_id, buy_num: this.buy_num }).then((res) => {
          this.info = res.data
          this.orderList = res.data.list.goods_list
        })
      }
    },
    getData() {
      if (this.type === 'shopCart') {
        confirmS().then((res) => {
          this.info = res.data
          this.$store.dispatch('address/setAddress', res.data.address)
          this.orderList = res.data.list.goods_list
        })
      } else {
        confirmG({ spec_id: this.spec_id, buy_num: this.buy_num }).then((res) => {
          this.info = res.data
          this.$store.dispatch('address/setAddress', res.data.address)
          this.orderList = res.data.list.goods_list
        })
      }
    },
    // 选择支付方式
    switchPay(val) {
      this.payment = val
    },
    onSubmit() {
      const id = this.address.address ? this.address.address.id : ''
      if (id) {
        if (this.type === 'shopCart') {
          submitS({ adr_id: id }).then((res) => {
            if (res.code === 1) {
              payClass.switchPay(res.data.order_arr, this.payment).then((res) => {
                console.log(res)
              })
            } else {
              this.$toast.fail(res.msg)
            }
          })
        } else {
          submitG({ adr_id: id, spec_id: this.orderList[0].spec_id, buy_num: this.orderList[0].buy_num }).then((res) => {
            if (res.code === 1) {
              payClass.switchPay(res.data.order_id, this.payment).then((res) => {})
            } else {
              this.$toast.fail(res.msg)
            }
          })
        }
      } else {
        this.$toast.fail('请选择收货地址')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  min-height: 100vh;
  background: $bg-bar;
  overflow: hidden;
  .padding-bot {
    padding-bottom: 1.33rem;
  }
  .bottom {
    position: fixed;
    bottom: 0;
    display: flex;
    height: 1.33rem;
    line-height: 1.33rem;
    align-items: center;
    justify-content: flex-end;
    background: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    width: 100%;
    font-size: $size-medium;

    .moeny {
      display: flex;
      align-items: baseline;
      margin-right: 0.4rem;
      color: $color-money;
      font-size: $size-medium;
      span {
        margin-left: 0.1rem;
        font-weight: 600;
        font-size: $size-king;
      }
    }

    .button {
      margin-right: 0.4rem;
      font-size: $size-small;
      color: white;
      height: 0.8rem;
      display: flex;
      align-items: center;
      padding: 0 0.6rem;
      background: linear-gradient(-45deg, #f95913 0%, #f9b218 100%), linear-gradient(#ffffff, #ffffff);
      border-radius: 0.5rem;
    }
    // .pl {
    //   background: white;
    //   border: 1px solid #ccc;
    //   color: #999;
    // }
  }
}
</style>
