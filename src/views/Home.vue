<template>
  <div class="home">
    <div class="row vertical-align-middle py-4">
      <div class="col-md-4 ">
        <h4> {{title}}</h4>
      </div>
      <div class="col-md-4" style="text-align: center!important;">
        Season: 
        <select class="c-text-grey-main border-none bg-transparent" style="border-color: transparent;" @change="selectSeason($event)">
          <option class="c-text-grey-main" value="2019-20">2019-20</option>
          <option value="2018-19" >2018-19</option>
          <option value="2017-18" >2017-18</option>
          <option value="2016-17" >2016-17</option>
          <option value="2015-16" >2015-16</option>
          <option value="2014-15" >2014-15</option>
        </select>
      </div>
      <div class="col-md-4" style="text-align: right!important;">
        <input class="form-control" id="clubSearch" type="text" placeholder="Search.." v-model="search" @keyup="search_club">

      </div>
    </div>
    <div class="row">
      <table class="table">
        <thead class="bg-grey-main">
          <tr>
            <th scope="col" @click="sortByName = !sortByName">Clubs&nbsp;<i class=" fas fa-sort"></i></th>
            <th scope="col">MP</th>
            <th scope="col" @click="sortByWins = !sortByWins">W&nbsp;<i class="fas fa-sort"></i></th>
            <th scope="col">D</th>
            <th scope="col">L</th>
            <th scope="col">GF</th>
            <th scope="col">GA</th>
            <th scope="col">GD</th>
            <th scope="col" @click="sortByPoints = !sortByPoints">Points&nbsp;<i class="fas fa-sort"></i></th>
            <th scope="col">Last 5</th>
          </tr>
        </thead>
        <tbody  id="leagueDataTable">
          <tr v-for="(data, key) in processPremierLeagueJSON" :key="key" :style="{'background-color': data.background ? data.background : 'ghostwhite'}" >
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
      <a class="twitter-timeline" href="https://twitter.com/premierleague"> Tweets by @premeierLeague </a>
      <!-- <Tweet :tweetid="'premierleague'"></Tweet> -->
    </div>
    <ShowClub v-if="show_club_details" :club="club" :season="season"  @closeModal="closeModal"></ShowClub>
  </div>
</template>

<script>

// import Vue from 'vue';
import axios from "axios";
import ShowClub from './ShowClub'
// import Tweet from './Tweet'
// import Tweet from 'vue-tweet-embed/tweet'
// import Moment from 'vue-tweet-embed/moment'

export default {
  name: "Home",
  components: {
    ShowClub,
    // Tweet
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
      season: '2014-15',
      search: '',
      sortData: [],
      sortByName: false,
      sortByWins: false,
      sortByPoints: false
    }
  },
  mounted() {
    this.getleagueData ()

  },
  
  watch: {
    sortByName: function (val) {
			var self = this;
			self.processPremierLeagueJSON = self.sortBy(self.processPremierLeagueJSON, 'name', val);
		},
		sortByWins: function (val) {
			var self = this;
			self.processPremierLeagueJSON = self.sortBy(self.processPremierLeagueJSON, 'wins', val);
		},
		sortByPoints: function (val) {
			var self = this;
			self.processPremierLeagueJSON = self.sortBy(self.processPremierLeagueJSON, 'points', val);
		},
  },
  methods:{
    sortBy: function(array, param, reverse) {
			var filterA, filterB;
			return array.sort(function (a, b) {
				switch (param) {
					case 'id':
						filterA = a.id;
						filterB = b.id;
						break;
					case 'name':
						filterA = a.name;
						filterB = b.name;
						break;
					case 'old':
						filterA = a.old;
						filterB = b.old;
						break;
					case 'status':
						filterA = a.status;
						filterB = b.status;
						break;
				}
				if (reverse) {
					return (filterA > filterB) ? 1 : -1;
				} else {
					return (filterA < filterB) ? 1 : -1;
				}
			});
		},
    search_club(){
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("clubSearch");
      filter = input.value.toUpperCase();
      table = document.getElementById("leagueDataTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
  }
      
            
    },
    selectSeason(e){
      this.season = e.target.value
      this.getleagueData()
    },
    popup_club_details(data){
      this.club = data
      this.show_club_details = true
    },
    closeModal(){
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
      resultArray[0].background = 'honeydew' ;
      resultArray[1].background = 'honeydew' ;
      resultArray[2].background = 'honeydew' ;
      resultArray[3].background = 'honeydew' ;
      resultArray[17].background = 'lightpink' ;
      resultArray[18].background = 'lightpink' ;
      resultArray[19].background = "lightpink" ;
      return resultArray;
    }
  }
};
</script>
<style scoped>
table thead tr th {
    vertical-align: bottom;
    border-bottom: 2px solid #ddd;
    background: darkgray;
    font-size: 12px!important;
}
</style>