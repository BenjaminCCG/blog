<template>
  <div>
    <span v-if="date">{{city}} {{date}} {{weather}}</span>
    <i class="el-icon-loading" v-else></i>
  </div>
</template>

<script>
import BMap from 'BMap';
import { getWeather } from "@/api/index"
export default {
  data() {
    return {
      city: '',
      date: '',
      weather: ''
    }
  },
  methods: {
    getCity() {
      let that = this;
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(async function getInfo(position) {
        that.city = position.address.city;
        let res = await getWeather(that.city);
        that.date = res.data.forecast[0].date;
        that.weather = res.data.forecast[0].fengxiang + ' ' + res.data.forecast[0].type
      })
    }
  },
  created() {
    this.getCity()
  }
}
</script>

<style scoped>
div {
  color: #fff;
  font-size: 14px;
}
</style>