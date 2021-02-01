<template>
  <div class="shadow">
    <div class="wrapper" v-for="(item, index) in orderList" :key="index">
      <div class="basic">
        <img :src="item.goods_info.picurl" />
        <div class="content">
          <div class="content_header">{{ item.goods_info.name }}</div>
          <div class="content_specs">
            <span>{{ item.spec_info.spec_name }}</span>
            <span>×{{ item.buy_num }}</span>
          </div>
          <div class="content_number">
            <span class="red">&yen; {{ item.spec_info.price }}</span>
          </div>
        </div>
      </div>
      <div class="details">
        <div>
          <span>小计：</span>
          <span class="red">&yen; {{ item.goods_fee }}</span>
        </div>
      </div>
    </div>
    <div class="wrapper details">
      <!-- <div>
        <span>商品合计：</span>
        <span class="red">{{ info.goods_fee }}</span>
      </div> -->
      <div>
        <span>邮费：</span>
        <span>{{ info.ship_fee }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    orderList: {
      type: Array,
      default: () => []
    },
    info: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss" scoped>
.shadow {
  margin: 0 0.2rem;
  border-radius: 0.2rem;
  background: white;
  // box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.1);

}
.wrapper {
  padding: 0.4rem 0.27rem;
  background: white;
  border-radius: 0.2rem;
  border-bottom: 1px solid #f5f5f5;
  .basic {
    display: flex;
    img {
      width: 2.2rem;
      height: 2.2rem;
      margin-right: 0.4rem;
      border-radius: 0.1rem;
    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      &_header {
        line-height: 0.37rem * 1.2;
        font-size: 0.37rem;
      }
      &_specs {
        font-size: $size-small;
        color: $color-cc;
        display: flex;
        align-items: center;
        span {
          //   margin-left: 1rem;
        }
        justify-content: space-between;
      }
      &_number {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .red {
          font-size: $size-large;
          color: $color-money;
        }
        span {
          font-size: $size-medium;
          color: $color-pl;
        }
      }
    }
  }
}
.details {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  > div {
    //   padding: 0.2rem 0.53rem;
    margin-left: 0.53rem;
    font-size: $size-small;
    color: $color-deep;
    .red {
      font-size: $size-medium;
      font-weight: 600;
      color: $color-money;
    }
  }
}
</style>
