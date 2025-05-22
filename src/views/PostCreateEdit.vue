<template>
  <Header />
  <PostEditor />
  <Footer />
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import PostEditor from '../components/PostEditor.vue';

export default {
  path: '/',
  name: 'HomeView',
  components: {
    Header,
    PostEditor,
    Footer
  },
}
</script>