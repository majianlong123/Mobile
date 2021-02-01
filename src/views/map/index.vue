<template>
  <div class="wrap">
    <pubHeader :name="$route.query.name" leftType></pubHeader>

    <div id="container" 
      style="width:500px; height:300px"></div>
    <!-- <button class="btn" id="fitblue" style="margin-right:1rem;">自适应蓝色标记</button> -->
  </div>
</template>
 
<script>
import pubHeader from '@/components/header'
import { setTimeout } from 'timers';

    // import { AMap } from 'vue-amap';
export default {
  components:{
    pubHeader
  },
  data(){
    return {
      position: [],
      detailInfo: []
    }
  },
  created(){
    this.position = this.$route.query.position;
    this.detailInfo = this.$route.params.detail;
    console.log(this.$route.params);
  },
  mounted(){
    this.getLocation();
  },
  methods:{
    getLocation(){
      var map = new AMap.Map('container',{
        zoom: 18,  //设置地图显示的缩放级别
        center: this.position,//设置地图中心点坐标
        lang:'zh_cn',  //设置地图语言类型
      });
      // console.log(this.position);
      map.setZoomAndCenter(16, this.position);

      var m3 = new AMap.Marker({
        position: this.position,
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png"
      });
      map.add(m3);

      // 创建 infoWindow 实例	
      var infoWindow = new AMap.InfoWindow({
        content: this.detailInfo.join("<br>")  //传入 dom 对象，或者 html 字符串
      });

      var onMarkerClick  =  function(e) {
          infoWindow.open(map, e.target.getPosition());//打开信息窗体
          //e.target就是被点击的Marker
      } 
      var marker = new AMap.Marker({
          position: this.position
      })
      map.add(marker);
      marker.on('click',onMarkerClick);//绑定click事件

        map.on('complete', function(){
          console.log(111);
        });
      }
  }
};</script>

<style lang="scss" scoped>
#container {
  width: 100vw !important;
  height: 100vh !important;
}
</style>