<template>
  <div class="home">
   <div class="row" v-for="(matches, ind) in league_matches" :key="ind">
      <div class="col-md-12 col-lg-12">
        <div class="row"> 
          <h3> {{matches.name}}</h3>
        </div>
        <div class="row">
          <div class="col-md-4"  v-for="(match, index) in matches.matches" :key="index" >
            <div class="card my-4">
              <div class="card-body">
                <h4 class="card-text text-right">Date: {{match.date}}</h4>
                <h5 class="card-title">Team 1: {{match.team1}}</h5>
                <h5 class="card-title">Team 2: {{match.team2}}</h5>
                <h5 class="card-text" v-if="match.score">Score: {{match.score.ft}}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
   </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Home",
  data(){
    return {
      league_matches: [],
      league_title: '',
      season: '2014-15',

    }
  },
  mounted(){
    this.getMatches()
  },
  methods:{
    getMatches(){
      axios.get (`https://raw.githubusercontent.com/openfootball/football.json/master/${this.season}/en.1.json`)
      .then (res => {
        this.league_title = res.data.name
        this.league_matches = res.data.rounds;
      })
    }
  }
};
</script>
