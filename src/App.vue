<template>
  <div id="app">
    <navbar></navbar>
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container">
          <router-view/>
        </div>
      </div>
      <div class="hero-foot">
        <div class="container has-text-centered">
          <p><strong>Rispar 2020</strong></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  export default {
    components: {
      Navbar
    }
  }
</script>

<style lang="scss">
.hero-foot .container {
  padding-bottom: 1rem;
}
</style>