<template>
  <div class="register-row register-login-row">
      <div class="register-container p-4">
        <div class="register-header">
            <img class="header-icon mr-3" src="../assets/svg/login-icon.svg" alt="Register Icon">
            <h3 class="header-title mb-0">Log in to your account</h3>
        </div>
        <hr class="register-line mb-4"> 
        <form class="register-form mr-auto ml-auto d-flex flex-column align-items-center">
            <div class="input-box d-flex flex-column mb-2">
                <label class="label" for="login">Login: </label>
                <input class="input" type="text" id="login" v-model="login">
            </div>
            <div class="input-box d-flex flex-column mb-4">
                <label class="label" for="password">Password: </label>
                <input class="input" type="password" id="password" v-model="password">
            </div>
            <button @click.prevent="onLoginClick" class="btn register-btn create-btn mb-3">
                <span class="iconify" data-inline="false" data-icon="line-md:confirm" style="color: #ebebeb;"></span>
                <span class="btn-text">Log in</span> 
            </button>
        </form>
        <div class="register-footer">
            <p class="footer-text mb-1">Don't have an account?</p>
            <router-link to="/register" class="btn login-btn">Create</router-link>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserLogin, ConfirmModalInterface } from '../store/modules/interfaces'

@Component
export default class Login extends Vue {
    login = '';
    password = '';

    onLoginClick(): void {
        if(this.login && this.password) {
            const user: UserLogin = {
                login: this.login,
                password: this.password
            }

            this.$store.dispatch('checkIfUserExist', user).then((response: boolean) => {
                if(response) {
                    this.$store.dispatch('loginUser', user); 

                    const modalInfos: ConfirmModalInterface = {
                        title: "Successful log in",
                        content: "You have been successfully loged in. You will be automatically redirected to the app page.",
                        redirectTo: "App Page",
                        redirectLink: "/"
                    }

                    this.$store.dispatch('displayConfirmModal', modalInfos);
                } else {
                    const message = {
                        title: "Incorrect informations!",
                        content: "Incorrect login or password. Check and try again.",
                        type: "warning"
                    }

                    this.$store.dispatch('addMessage', message);
                }
            })
        } else {
            const message = {
                title: "Fill all fields!",
                content: "All fields must be filled. It is necessary to log in.",
                type: "warning"
            }

            this.$store.dispatch('addMessage', message);
        }
    }
}
</script>

<style lang="scss" scoped>
.register-login-row { max-width: 500px; }

.register-container {
    max-width: 500px;

    .register-form {
        width: 55%;

        .input-box { width: 100%; }

        .create-btn:hover { width: 100%; }
    }
}
</style>