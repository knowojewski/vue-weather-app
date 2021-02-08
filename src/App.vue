<template>
  <div id="app">
    <div class="app-container">
      <AlertModal v-for="message in messages" :key="message.id" :message="message"/>
      <ConfirmModal v-if="$store.state.ui.showConfirm"/>
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AlertModal from '@/components/AlertModal';
import ConfirmModal from '@/components/ConfirmModal';

@Component({
  components: {
    AlertModal,
    ConfirmModal
  }
})
export default class App extends Vue {
  messages: [] = this.$store.state.ui.messages;

  created() {
    this.$store.dispatch('loadUsers');
    this.$store.dispatch('loadToken');
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
$light-grey: #ebebeb;

html, * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  background: #59606C;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // min-height: 100vh;
}

.app-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  padding: 0;
  margin: 0;
  color: $light-grey;
  border: 2px solid $light-grey;
  border-radius: 25px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  transition: width .5s, background .5s, height .5s, top .5s;
  z-index: 1;
}


.btn:hover {
  color: $light-grey;
}
</style>
