import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vue from 'vue';
import { CityInterface } from './interfaces';

Vue.use(VueAxios, axios);

@Module 
export default class Cities extends VuexModule {
    cities: CityInterface[] = [];
    filteredCities: CityInterface[] = [];
    citiesToAdd: CityInterface[] = [];
    
    @Action
    async fetchCities() {
        await Vue.axios.get('http://localhost:8080/cities.json').then((result) => {
            this.context.commit('createCitiesArray', result.data);
        }).catch((err) => { 
            console.log(err)
        });
    }

    @Action
    filterCities(value: string) {
        const filteredCities = this.cities.filter(city => city.name.toUpperCase() === value.toUpperCase());

        this.context.commit('createFilteredCities', filteredCities);
    }

    @Mutation
    createCitiesArray(payload: CityInterface[]): void {
        this.cities = [...payload];
    }

    @Mutation 
    createFilteredCities(payload: CityInterface[]): void {
        this.filteredCities = [...payload];
    }

    @Mutation
    citiesToAddUnshift(city: CityInterface): void {
        this.citiesToAdd.unshift(city);
    }

    @Mutation
    clearCitiesToAdd(): void {
        this.citiesToAdd = [];
    }

    @Mutation
    removeFromCitiesToAdd(id: number) {
        const index: number = this.citiesToAdd.findIndex( city => city.id === id);
        this.citiesToAdd.splice(index, 1);
    }
}