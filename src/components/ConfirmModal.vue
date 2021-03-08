<template>
  <div class="confirm-bg">
      <div class="alert-box confirm-box p-4 m-2">
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
@mixin display-flex($justify, $align, $direction) {
  display: flex;
  justify-content: $justify;
  align-items: $align;
  flex-direction: $direction;
}

.confirm-bg {
  position: fixed;
  @include display-flex(center, center, row);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.378);
  z-index: 100;
}

.confirm-box { background: $dark-grey;}

.loader {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 20px;
  border: 2px solid $light-grey;
}
</style>