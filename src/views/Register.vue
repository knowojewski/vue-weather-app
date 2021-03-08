<template>
  <div class="register-row">
      <div class="register-container p-4">
        <div class="register-header">
            <img class="header-icon mr-3" src="../assets/svg/register-icon.svg" alt="Register Icon">
            <h3 class="header-title mb-0">Create an account </h3>
        </div>
        <hr class="register-line mb-4"> 
        <form class="register-form mr-auto ml-auto">
            <div class="input-box d-flex flex-column mb-2">
                <label class="label" for="email">E-mail: </label>
                <input class="input" type="text" id="email" v-model="email">
                <p v-if="emailTaken" class="warning-text">This e-mail address is already in use.</p>
                <p v-if="validEmail === false" class="warning-text">Invalid e-mail address...</p>
            </div>
            <div class="input-box d-flex flex-column mb-2">
                <label class="label" for="login">Login: </label>
                <input class="input" type="text" id="login" v-model="login">
                <p v-if="loginTaken" class="warning-text">This login is already in use.</p>
                <p v-if="validLogin === false" class="warning-text">Login must have at least 3 characters.</p>
            </div>
            <div class="inputs-container d-flex justify-content-between">
                <div class="input-box d-flex flex-column">
                    <label class="label" for="password">Password: </label>
                    <input class="input" type="password" id="password" v-model="password">
                </div>
                <div class="input-box d-flex flex-column">
                    <label class="label" for="password-confirm">Password confirm: </label>
                    <input class="input" type="password" id="password-confirm" v-model="passwordConfirm">
                </div>
            </div>
            <p v-if="wrongPassword" class="warning-text">Passwords are not the same.</p>
            <p v-if="validPassword === false" class="warning-text">Password must contain at least one capital letter, number and be 8 characters long.</p>
            <div class="btns-box d-flex justify-content-between mb-3 mt-4">
                <button class="btn register-btn cancel-btn" @click.prevent="$router.push('/login')">
                    <span class="iconify" data-inline="false" data-icon="carbon:close" style="color: #ebebeb;"></span>
                    <span class="btn-text">Cancel</span> 
                </button>
                <button class="btn register-btn create-btn" @click.prevent="onRegisterClick">
                    <span class="iconify" data-inline="false" data-icon="line-md:confirm" style="color: #ebebeb;"></span>
                    <span class="btn-text">Create</span> 
                </button>
            </div>
        </form>
        <div class="register-footer">
            <p class="footer-text mb-1">Already have an account?</p>
            <router-link to="/login" class="btn login-btn">Log in</router-link>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserSubmit, ConfirmModalInterface } from '../store/modules/interfaces';

@Component
export default class Register extends Vue {

    email = '';
    login = '';
    password = '';
    passwordConfirm = '';

    emailTaken = false;
    validEmail = null;
    loginTaken = false;
    validLogin = null;
    wrongPassword = false;
    validPassword = null;

    onRegisterClick(): void {
        if(this.email && this.login && this.password) {
            const user = {
                login: this.login,
                email: this.email,
                password: this.password
            }

            this.checkUser(user);
            this.validateLogin(user.login);
            this.validateEmail(user.email);
            this.validatePassword(user.password);

            if(!this.emailTaken && !this.loginTaken && !this.wrongPassword && this.validLogin && this.validEmail && this.validPassword) {
                this.$store.dispatch('registerUser', user);

                const modalInfos: ConfirmModalInterface = {
                    title: "Successful registration",
                    content: "Your account has been successfully registered in our site. You will be automatically redirected to Login page.",
                    redirectTo: "Login Page",
                    redirectLink: "/login"
                }

                this.$store.dispatch('displayConfirmModal', modalInfos);
            }
    
        } else {
            const message = {
                title: "Fill all fields!",
                content: "All fields must be filled. It is necessary to create an acount.",
                type: "warning"
            }

            this.$store.dispatch('addMessage', message);
        }
    }

    checkUser(userToCheck: UserSubmit): void {
        const users = this.$store.state.users.users;

        for(const user of users) {
            userToCheck.email === user.email ? this.emailTaken = true : this.emailTaken = false;
            break;
        }

        for(const user of users) {
            userToCheck.login === user.login ? this.loginTaken = true : this.loginTaken = false;
            break;
        }

        userToCheck.password !== this.passwordConfirm ? this.wrongPassword = true : this.wrongPassword = false;

        setTimeout(() => {
           this.emailTaken = false; 
           this.wrongPassword = false; 
           this.loginTaken = false;
           this.validEmail = null;
           this.validLogin = null;
           this.validPassword = null;

        }, 3000);
    }

    validateLogin(login: string): void {
        login.length >= 3 ? this.validLogin = true : this.validLogin = false;
    }

    validateEmail(email: string): void {
        const emailPattern = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        email.match(emailPattern) ? this.validEmail = true : this.validEmail = false;
    }

    validatePassword(password: string): void {
        const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;

        password.match(passwordPattern) ? this.validPassword = true : this.validPassword = false;
    }
}
</script>

<style src="../styles/css/RegisterStyle.css">

</style>