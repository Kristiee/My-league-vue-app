<template>
  <div >
    <div class="row">
      <h2 class="col"> {{this.club_name}} </h2>
      <div class="col float-right" style="text-align: center!important; font-size:medium;">
        Season: 
        <Season @selectSeason="selectSeason"></Season>
      </div>
    </div>
    <div class="row pt-4" >
      <div class= "col-md-12 col-lg-12">
        <div class="row">
          <div class="col-md-4"  id="displayTweets" style="height:  calc((100vh)) !important; overflow-y: auto;">
            <Tweet :tweetid="clubid"></Tweet>
          </div>
          <div class="col-md-8">
            <h3 class="text-center pb-4"> List of clubs in season {{this.season}}</h3>
            <div class="row">
              <div class="col-md-6" v-for="(club, index) in clubs__list" :key="index">
                <div class="card box-shadow p-4 my-2" style="height: auto; cursor: pointer;">
                  <div class="row">
                    <div class="col-10 text-left pt-2 pr-0">
                      <span class="h3 text-left c-lg-p-4">
                        <router-link :to="`/club/${club.name}`" class="td-link px-3">{{club.name}}</router-link> 
                      </span>
                      <p class=" text-left c-lg-p-4"> Code: {{ club.code }}</p>
                      <p class=" text-left c-lg-p-4"> Country: {{ club.country }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<script>
import axios from "axios";
import Tweet from './Tweet'
import Season from './Seasons'


export default {
  name: "club",
  components: {
    Tweet,
    Season
  },
  data(){
    return {
      clubs__list: [],
      season: '2014-15',
    }
  },
  // watch: {
  //   '$route.params.id'(newId, oldId) {
  //     this.loadScript(newId)
        
  //   }
  // },
  computed: {
    clubid: function(){
      return this.$route.params.id.replace(/\s+/g,'')
    },
    club_name: function(){
      return this.$route.params.id
    }
  },
  mounted(){
    this.getClubs()
    this.loadScript()
  },
  methods:{
    loadScript(){
      var scriptTag = document.createElement("script");
      scriptTag.type = "text/javascript";
      scriptTag.async = true;
      scriptTag.src = "https://platform.twitter.com/widgets.js";

      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(scriptTag, s);
    },
    selectSeason(e){
      this.season = e
      this.getClubs()
    },
    getClubs(){
      axios.get (`https://raw.githubusercontent.com/openfootball/football.json/master/${this.season}/en.1.clubs.json`)
       .then (res => {
          this.clubs__list = res.data.clubs;
       })
    }
  }
};
</script>

<style scoped>
.td-link {
  display: block;
  padding: .5rem 1rem;
  color: black;
}
</style>