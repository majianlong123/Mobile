const state = {
  list: [
    {
      title: '首页',
      index: '/',
      name: 'Home',
      icon: require('@/assets/image/bottom/index.png'),
      iconS: require('@/assets/image/bottom/index-fill.png')
    },
    {
      title: '分类',
      index: '/category',
      name: 'Category',
      icon: require('@/assets/image/bottom/activity.png'),
      iconS: require('@/assets/image/bottom/activity-fill.png')
    },
    // {
    //   title: '购物车',
    //   index: '/shopCart',
    //   name: 'ShopCart',
    //   icon: require('@/assets/image/bottom/activity.png'),
    //   iconS: require('@/assets/image/bottom/activity-fill.png')
    // },
    // { 
    //   title: '订单',
    //   index: '/order ',
    //   name: 'Order',
    //   icon: require('@/assets/image/bottom/settleIn.png'),
    //   iconS: require('@/assets/image/bottom/settleIn-fill.png')
    // },

    {
      title: '个人中心',
      index: '/my',
      name: 'My',
      icon: require('@/assets/image/bottom/my.png'),
      iconS: require('@/assets/image/bottom/my-fill.png')
    }
  ]
}

const mutations = {}

export default {
  namespaced: true,
  state,
  mutations
}
