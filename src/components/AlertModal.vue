<template>
  <div class="alert-box p-3" :class="{'warning': message.type === 'warning', 'success': message.type === 'success'}">
      <h4 class="alert-title">{{ message.title }}</h4>
      <hr class="alert-line">
      <p class="alert-content mb-0">{{ message.content }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class AlertModal extends Vue {
    @Prop() message: any;
}
</script>

<style lang="scss">
$dark-grey: #3f3f3f;
$light-grey: #ebebeb;
$blue-color: #8DAFE2;
$red-warning: #dd5656;
$green-success: rgb(78, 162, 74);
@mixin drop-shadow { box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25); }

.alert-box {
  position: fixed;
  top: 10%;
  left: 50%;
  width: 600px;
  max-width: 600px;
  color: $light-grey;
  text-align: center;
  @include drop-shadow();
  transform: translateX(-50%);
  border-radius: 15px;
  z-index: 100;

  .alert-title {
    font-size: 28px;
    font-weight: 500;
  }

  .alert-line {
    border-top: 0;
    border: 1px solid $light-grey;
  }
}

.alert-box.success { background: $green-success; }
.alert-box.warning { background: $red-warning; }
</style>