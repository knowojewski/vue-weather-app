<template>
  <div class="alert-container">
    <div class="alert-box p-3" :class="{'warning': message.type === 'warning', 'success': message.type === 'success'}">
      <h4 class="alert-title">{{ message.title }}</h4>
      <hr class="alert-line">
      <p class="alert-content mb-0">{{ message.content }}</p>
    </div>
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

.alert-container {
  position: fixed;
  padding: 0 5px;
  top: 10%;
  width: 100%;
  z-index: 100;
}

.alert-box {
  max-width: 600px;
  color: $light-grey;
  text-align: center;
  margin: 10px auto;
  @include drop-shadow();
  border-radius: 15px;

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