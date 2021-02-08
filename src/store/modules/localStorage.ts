import { Module, VuexModule, Action} from 'vuex-module-decorators'
import { UserInterface } from './interfaces';

@Module
export default class LocalStorage extends VuexModule {    
    @Action
    saveUsersToLocal() {
        try {
            const stringifiedUsers = JSON.stringify(this.context.rootState.users.users);
            localStorage.setItem('users', stringifiedUsers); 
        } catch(err) {
            console.log(err)
        }
    }

    @Action
    loadUsers() {
        if(localStorage.getItem('users')) {
            try {
                const parsedUsers = JSON.parse(localStorage.getItem('users')!);

                this.context.commit('setUsers', parsedUsers);
            } catch (err) {
                console.log(err);
            }

        } else {
            const users: UserInterface[] = [];

            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    @Action
    saveToken(token: string) {
        try {
            localStorage.setItem('token', token); 
        } catch(err) {
            console.log(err);
        }
    }

    @Action
    loadToken() {
        if(localStorage.getItem('token')) {
            try {
                const token: string = localStorage.getItem('token')!;

                this.context.dispatch('loadUser', token);
            } catch (err) {
                console.log(err);
            }

        } else {
            const token = '';

            localStorage.setItem('token', token);
        }
    }
}