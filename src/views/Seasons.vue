<template>
   <select class="c-text-grey-main border-none bg-transparent" style="border-color: transparent;" @change="selectSeason($event)">
    <option class="c-text-grey-main" value="2019-20">2019-20</option>
    <option value="2018-19" >2018-19</option>
    <option value="2017-18" >2017-18</option>
    <option value="2016-17" >2016-17</option>
    <option value="2015-16" >2015-16</option>
    <option value="2014-15" >2014-15</option>
  </select>
</template>

<script>
export default {
  name: "Season",
  data(){
    return {
      season: '2014-15',
    }
  },
  
  methods:{
   selectSeason(e){
      this.season = e.target.value
      this.$emit('selectSeason', this.season)
    },
  }
};
</script>
