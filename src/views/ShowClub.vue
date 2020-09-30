<template>
  <div class="container">
    <div class="modal show" style="display: block" id="myModal">
<a class="twitter-timeline" href="https://twitter.com/premierleague?ref_src=twsrc%5Etfw">Tweets by premierleague</a>

      <div class="modal-dialog"    style="height: 600px!important;  width: 1200px!important; overflow-y:scroll;">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title">{{ club.name }}</h1>
            <button type="button" class="close" @click="closeModal">×</button>
          </div>
          <div class="modal-body" style="height: 500px!important;  width: 1200px!important;">
            <h5 > Code: {{ club_details.code }}</h5>
            <h5 > Country: {{ club_details.country }}</h5>

            <blockquote class="twitter-tweet">
              <a class="twitter-timeline" href="https://twitter.com/premierleague?ref_src=twsrc%5Etfw">Tweets by premierleague</a>
            </blockquote> 
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="closeModal">Close</button>
          </div>
          
        </div>
      </div>
    </div>
    
  </div>


 
</template>
<script src="https://platform.twitter.com/widgets.js" async></script>

<script>
import axios from "axios";

export default {
  name: "Club",
  props: ["club", "season"],

  data() {
    return {
      club_details: {}
    }
  },
  computed: {
    clubid: function(){
      return this.club.name.replace(/\s+/g,'')
    }
  },
  mounted(){

    this.getClub()
  },
  methods: {
    closeModal(){
      this.$emit('closeModal')
    },
    getClub() {
      var club_name = this.club.name;
      axios
      .get (
        `https://raw.githubusercontent.com/openfootball/football.json/master/${this.season}/en.1.clubs.json`)
      .then(res => {
        res.data.clubs.filter(club => {
          if (club.name === club_name) {
            this.club_details = club
          };
        });
      });
    },
  }
};
</script>
<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(30, 28, 63, 0.7);    /* To change the opacity background*/
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width:  1000px!important;
    height: 800px!important; 
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    overflow-y: scroll;
  }
  .modal-header{
    display: block!important;
  }
  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  
</style>