<template>
  <div class="confirm-bg d-flex align-items-center justify-content-center">
      <div class="alert-box confirm-box p-4">
        <h4 class="alert-title">{{ modalInfos.title }}</h4>
        <hr class="alert-line">
        <p class="alert-content">{{ modalInfos.content }}</p>
        <div class="redirect d-flex align-items-center justify-content-center">
          <b-spinner class="mr-2" label="Loading..."></b-spinner>
          <p class="alert-content mb-0">Redirecting to {{ modalInfos.redirectTo }}...</p>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ConfirmModal extends Vue {
  modalInfos = this.$store.state.ui.confirmModal;
}
</script>

<style lang="scss">
$dark-grey: #3f3f3f;
$light-grey: #ebebeb;
$blue-color: #8DAFE2;

.confirm-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.378);
  z-index: 100;
}

.confirm-box {
  background: $dark-grey;
  top: 50%;
  transform: translate(-50%, -50%);
}

.loader {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 20px;
  border: 2px solid $light-grey;
}

@keyframes loader-anim {
  0% {
    transform: rotateZ(0);
  }

  70% {
    transform: rotateZ(0);
  }

  100% {

  }
}
</style>