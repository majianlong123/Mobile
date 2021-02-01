<template>
  <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" 
    :center="center" :zoom="zoom" :plugin="plugin" 
    :events="events" class="amap-demo"/>
</template> 

<script>
import { AMapManager } from 'vue-amap';
// console.log(VueAMap);
// let amapManager = new VueAMap.AMapManager();
export default {
  data: function() {
    return {
      // amapManager,
      zoom: 12,
      center: [112.447524769,34.6573678177 ],
      events: {
        init: (o) => {
          console.log(o.getCenter())
          let coordinate = o.getCenter();
          // this.center[0]  = coordinate['O']
          // this.center[1]  = coordinate['P']
          console.log(this.$refs.map.$$getInstance())
          o.getCity(result => {
            console.log(result)
          })
        },
        'moveend': () => {
        },
        'zoomchange': () => {
        },
        'click': (e) => {
          alert('map clicked');
        }
      },
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init(o) {
            console.log(o);
          }
        }
      }]
    };
  },

  methods: {
    getMap() {
      console.log(amapManager._componentMap);
      console.log(amapManager._map);
    }
  }
};
</script>

<style>
  .amap-demo {
    height: 300px;
  }
</style>