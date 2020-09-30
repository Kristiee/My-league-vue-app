<template>
  <div id="app" class="container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand w-25" href="#">
        <img src="https://d1v4btv2rwszby.cloudfront.net/public/images/PL-Right-image.png" class="w-25"/>
      </a>


      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active ">
            <router-link to="/" class="nav-link px-3">Standings</router-link> 
          </li>
          <li class="nav-item">
            <router-link to="/matches" class="nav-link px-3">Matches</router-link> 
          </li>
          <li class="nav-item">
            <router-link to="/teams" class="nav-link px-3"> Teams</router-link> 
          </li>
          <li class="nav-item">
            <router-link to="/players" class="nav-link px-3"> Playes</router-link> 
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
