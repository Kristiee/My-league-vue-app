<template>
  <div class="modal is-active" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{club.name}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <span class="float-left"> Code: {{club_details.code}}</span>
            <span class="float-right"> country: {{club_details.country}}</span>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Save changes</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

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
    mounted(){
      debugger
      this.getClub()
    },
    methods: {
      getClub(){
        var club_name = this.club.name
        axios.get (`https://raw.githubusercontent.com/openfootball/football.json/master/${this.season}/en.1.clubs.json`)
       .then (res => {
          res.data.clubs.filter(club => {
            if(club.name === club_name) {
              this.club_details = club
            }
          })
        })

      },
    }
}
</script>