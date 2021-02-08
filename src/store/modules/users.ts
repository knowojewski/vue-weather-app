import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { UserInterface, UserSubmit, UserLogin, CityInterface } from './interfaces';

@Module
export default class User extends VuexModule {
    users: UserInterface[] = [];
    user: UserInterface = {
        token: '',
        login: '',
        email: '',
        password: '',
        cities: []
    };

    @Action
    registerUser(user: UserSubmit) {
        const newUser: UserInterface = {
            token: Math.random().toString(36).substr(2),
            login: user.login,
            email: user.email,
            password: user.password,
            cities: []
        }
        
        this.context.commit('saveUser', newUser);
        this.context.dispatch('saveUsersToLocal');
    }

    @Action
    loginUser(user: UserLogin) {
        const loggedUser: UserInterface = this.users.find( item => item.login === user.login)!;
        this.context.commit('setUser', loggedUser);
        this.context.dispatch('saveToken', loggedUser.token);
    }

    @Action
    checkIfUserExist(user: UserLogin) {
        const ifExist = this.users.find( item => item.login === user.login);

        if(ifExist) {
            if(ifExist.password === user.password) {
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }
    }

    @Action
    loadUser(token: string) {
        const loadedUser = this.users.find(item => item.token === token);

        this.context.commit('setUser', loadedUser);
    }

    @Action
    logOutUser() {
        this.context.commit('removeUser');

        localStorage.removeItem('token');
    }

    @Action
    observeCities(citiesToObserve: CityInterface[]): void {
        this.context.commit('addToObservedCities', citiesToObserve);

        const userToUpdate = this.users.find(item => item.token === this.user.token);

        userToUpdate!.cities = [...this.user.cities];
        this.context.dispatch('saveUsersToLocal');
    }

    @Action
    deleteCity(id: number) {
        const index = this.user.cities.findIndex( city => city.id === id );
        this.user.cities.splice(index, 1);

        const userToUpdate = this.users.find(item => item.token === this.user.token);

        userToUpdate!.cities = [...this.user.cities];
        this.context.dispatch('saveUsersToLocal');
    }

    @Mutation
    saveUser(user: UserInterface) {
        this.users.push(user);
    }

    @Mutation
    setUsers(users: UserInterface[]): void {
        this.users = [...users];
    }

    @Mutation
    setUser(user: UserInterface): void {
        this.user = {...user};
    }

    @Mutation
    removeUser() {
        this.user = {
            token: '',
            login: '',
            email: '',
            password: '',
            cities: []
        }
    }

    @Mutation
    addToObservedCities(citiesToObserve: CityInterface[]): void {
        citiesToObserve.forEach( city => this.user.cities.push(city) );
    }
}
