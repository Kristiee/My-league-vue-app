<template>
  <div class="home">
    <div class="row vertical-align-middle py-4">
      <div class="col-md-6 ">
        <h4> {{title}}</h4>
      </div>
      <div class="col-md-6" style="text-align: right!important;">
        Season: 
        <select class="c-text-grey-main border-none w-50 bg-transparent" style="border-color: transparent;" @change="selectSeason($event)">
          <option class="c-text-grey-main" value="2019-20">2019-20</option>
          <option value="2018-19" >2018-19</option>
          <option value="2017-18" >2017-18</option>
          <option value="2016-17" >2016-17</option>
          <option value="2015-16" >2015-16</option>
          <option value="2014-15" >2014-15</option>
        </select>
      </div>
    </div>
    <div class="row">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Clubs</th>
            <th scope="col">MP</th>
            <th scope="col">W</th>
            <th scope="col">D</th>
            <th scope="col">L</th>
            <th scope="col">GF</th>
            <th scope="col">GA</th>
            <th scope="col">GD</th>
            <th scope="col">Points</th>
            <th scope="col">Last 5</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, key) in processPremierLeagueJSON" :key="key" :style="{'background-color': data.background ? data.background : '#eaefef'}" >
            <td scope="col" ><a href="#" class="text-dark"> <span  data-toggle="modal" data-target="#myModal" @click="popup_club_details(data)">{{data.name}}</span></a></td>
            <td scope="col" >{{data.mp}}</td>
            <td scope="col" >{{data.win}}</td>
            <td scope="col" >{{data.draw}}</td>
            <td scope="col" >{{data.lose}}</td>
            <td scope="col" >{{data.goalCon}}</td>
            <td scope="col" >{{data.goals}}</td>
            <td scope="col" >{{data.GoalDifference}}</td>
            <td scope="col" >{{data.points}}</td>
            <td scope="col">
              <span v-for="(pts, ind) in data.results" :key="ind" class="mr-1 pl-1">
                <i :class="(pts== 'W ') ? 'fas fa-check-circle' :  (pts== 'L ') ? 'fa fa-times-circle' : 'fas fa-minus-circle '" 
                               :style="{'color': (pts== 'W ') ? 'green' :  (pts== 'L ') ? 'red' : 'dimgrey'}"></i>
              </span>
            </td>
          </tr>
          
        </tbody>
      </table>  
    </div>
    <div class="row w-50">
      <!-- <a class="twitter-timeline" href="https://twitter.com/premierleague"> Tweets by @premeierLeague </a> -->
      <Tweet :tweetid="'premierleague'"></Tweet>
    </div>
    <ShowClub v-if="show_club_details" :club="club" :season="season"  @closeModal="closeModal"></ShowClub>
  </div>
</template>
<script src="https://platform.twitter.com/widgets.js" async></script>

<script>

// import Vue from 'vue';
import axios from "axios";
import ShowClub from './ShowClub'
import Tweet from './Tweet'
// import Tweet from 'vue-tweet-embed/tweet'
// import Moment from 'vue-tweet-embed/moment'

export default {
  name: "Home",
  components: {
    ShowClub,
    Tweet
  },
  data() {
    return {
      // seasons: ['2014-15','2015-16', '2016-17','2018-19', '2019-20'],
      league_data: [],
      processPremierLeagueJSON: [],
      title: '',
      table_data: '',
      show_club_details: false,
      club: '',
      season: '2014-15'
    }
  },
  mounted() {
    this.getleagueData ()
  },
  methods:{
    selectSeason(e){
      this.season = e.target.value
      this.getleagueData()
    },
    popup_club_details(data){
      this.club = data
      this.show_club_details = true
    },
    closeModal(){
      debugger
      this.show_club_details = false
    },
    getleagueData(){
        axios.get (`https://raw.githubusercontent.com/openfootball/football.json/master/${this.season}/en.1.json`)
       .then (res => {
          this.league_data = res.data;
          this.processPremierLeagueJSON  = this.processPremereLeague()
       })
    },
    processPremereLeague() {
      this.title = this.league_data.name;
      var rounds = this.league_data.rounds;
      var teamJSON = {};
      for (var i in rounds) {
        var matches = rounds[i].matches;
        for (var j in matches) {
          if (!teamJSON[matches[j]["team1"]]) {
            teamJSON[matches[j]["team1"]] = {"name":matches[j]["team1"],"mp":0,"win":0,"lose":0,"draw":0,"goals":0,"goalCon":0,"points":0,results:[]};
          };
          
          if (!teamJSON[matches[j]["team2"]]) {
            teamJSON[matches[j]["team2"]] = {"name":matches[j]["team2"],"mp":0,"win":0,"lose":0,"draw":0,"goals":0,"goalCon":0,"points":0,results:[]};
          };

          var match = matches[j];
          var score = match.score.ft;
          teamJSON[matches[j]["team1"]].mp += 1;
          teamJSON[matches[j]["team2"]].mp += 1;
          teamJSON[matches[j]["team1"]].goals += score[0];
          teamJSON[matches[j]["team1"]].goalCon += score[1];
          teamJSON[matches[j]["team2"]].goals += score[1];
          teamJSON[matches[j]["team2"]].goalCon += score[0];
          if (score[0] > score[1]) {
            teamJSON[matches[j]["team1"]].win += 1;
            teamJSON[matches[j]["team1"]].points += 3;
            teamJSON[matches[j]["team1"]].results.push("W ");
            teamJSON[matches[j]["team2"]].results.push("L ");
            teamJSON[matches[j]["team2"]].lose += 1;
          } else if (score[1] > score[0]) {
            teamJSON[matches[j]["team2"]].win += 1;
            teamJSON[matches[j]["team2"]].points += 3;
            teamJSON[matches[j]["team1"]].results.push("L ");
            teamJSON[matches[j]["team2"]].results.push("W ");
            teamJSON[matches[j]["team1"]].lose += 1;
          }else{
            teamJSON[matches[j]['team2']].points +=1;
            teamJSON[matches[j]['team1']].points +=1;
            teamJSON[matches[j]['team1']].draw +=1;
            teamJSON[matches[j]['team2']].draw +=1;
            teamJSON[matches[j]['team1']].results.push("D ");
            teamJSON[matches[j]['team2']].results.push("D ");
          }
        }
      }
      var keys = Object.keys(teamJSON);
      var resultArray = [];
      for (var k in keys) {
        var obj = teamJSON[keys[k]];
        obj.GoalDifference = obj.goals - obj.goalCon;
        obj.results.splice(0, 33);
        resultArray.push(teamJSON[keys[k]]);
      }

      resultArray.sort((a,b) => (a.points < b.points) ? 1 : ((b.points < a.points) ? -1 : (a.goals < b.goals)? 1:0));
      resultArray[0].background = '#ccf8c4';
      resultArray[1].background = '#ccf8c4';
      resultArray[2].background = '#ccf8c4'
      resultArray[3].background = '#ccf8c4';
      resultArray[17].background = '#e9d6d1' ;
      resultArray[18].background = '#e9d6d1' ;
      resultArray[19].background = "#e9d6d1" ;
      return resultArray;
    }
  }
};
</script>
