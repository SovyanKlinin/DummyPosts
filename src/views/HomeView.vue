<template>
  <Header />
  <Main />
  <Footer />
</template>

<script>
import Main from '../components/Main.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  path: '/',
  name: 'HomeView',
  components: {
    Header,
    Main,
    Footer
  },
}
</script>