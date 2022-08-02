<template>
  <!-- <h2> Hello Welcome </h2>
  <button class="btn btn-success"> Click Me </button>
  <i class="fa fa-home fa-4x text-danger"> </i> -->
    <!-- <SpinnerVue /> -->
    <NavBarVue />
  <router-view />
</template>

<script>
import NavBarVue from './components/NavBar.vue'
// import SpinnerVue from './components/Spinner.vue'
export default 
{
  name : 'App',
  components :{
    NavBarVue
    // SpinnerVue
}
}
</script>

<style>

</style>
