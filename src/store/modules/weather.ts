import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vue from 'vue';
import { CityInterface } from './interfaces';

Vue.use(VueAxios, axios);

@Module 
export default class Weather extends VuexModule {
    apiCode = 'de1b8541a2e96d2edf424da5d7eeb360';
    currentWeather = {};
    hourlyWeather = [];
    hourlyTemp: number[] = [];
    hourlyHumidity: number[] = [];
    currentCity = {};
    weatherTimezone = 0;

    interval: undefined;

    @Action
    async fetchWeather(city: CityInterface) {
        const lat = city.coord.lat; 
        const lon = city.coord.lon; 

        await Vue.axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily&units=metric&appid=${this.apiCode}`).then((result) => {
            this.context.commit('setCurrentCity', city);
            this.context.dispatch('getHourlyWeatherInfos', result);

            console.log(this.hourlyHumidity);
            console.log(this.hourlyTemp)
            console.log(this.hourlyWeather);
        }).catch((err) => {
            console.log(err);
        });
    }

    @Action
    getHourlyWeatherInfos(payload) {
        this.context.commit('setCurrentWeather', payload.data);
        this.context.commit('setHourlyTemperatureHumidity', payload.data.hourly);
        this.context.commit('setTimezone', payload.data.timezone_offset);
        this.context.dispatch('makeHoursArray', payload.data.hourly);
    }

    @Action
    makeHoursArray(weather) {
        this.context.commit('clearHourlyWeather');

        weather.forEach(item => {
            const dt = item.dt;
            const fullDate = new Date(dt*1000+(this.weatherTimezone*1000));
            const hour = fullDate.getHours().toString() + ':00';

            this.hourlyWeather.push(hour);
        });
    }

    @Mutation
    setCurrentWeather(weather) {
        this.currentWeather = {...weather.current};
    }

    @Mutation
    setCurrentCity(city: CityInterface) {
        this.currentCity = {...city};
    }

    @Mutation
    setHourlyTemperatureHumidity(weather) {
        this.hourlyTemp = [];
        this.hourlyHumidity = [];

        weather.splice(0, 24).forEach( item => { 
            this.hourlyTemp.push(Math.floor(item.temp));
            this.hourlyHumidity.push(item.humidity);
        });
    }
    
    @Mutation
    setTimezone(timezone: number) {
        this.weatherTimezone = timezone;
    }

    @Mutation
    clearHourlyWeather() {
        this.hourlyWeather = [];
    }
}