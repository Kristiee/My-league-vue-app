<template>
  <div class="home">
   <div class="row">
      <div class="col-md-6" v-for="(match, ind) in matches" :key="ind">
        <div class="card w-50">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary">Button</a>
          </div>
        </div>
       </div>
       <div class="col-md-6"></div>
   </div>
  </div>
</template>

<script>
// import axios from "axios";


export default {
  name: "Home",
  data(){
    return {
      matches: []
    }
  },
  methods:{
    getMatches(){

    }
  }
};
</script>
