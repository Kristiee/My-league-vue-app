<template>
  <div class="row">
    <div class="col-xl-3 col-md-4 mt-3" v-for="(club, key) in clubs" :key="key">
      <div class="card box-shadow p-4" style="height: 200px; cursor: pointer;">
        <div class="row">
          <div class="col-10 text-left pt-2 pr-0">
            <span class="h3 text-left c-lg-p-4">{{ club.name }}</span>
          </div>
          
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "teams",
  components: {},
  data() {
    return {
    }
  },
  mounted() {
    this.fetchTeams();
  },
  methods:{
    fetchTeams(){
      axios.get (`https://raw.githubusercontent.com/openfootball/football.json/master/${this.season}/en.1.clubs.json`)
      .then (res => {
        this.league_data = res.data;
        this.processPremierLeagueJSON  = this.processPremereLeague()
      })
    },
  }
};
</script>
