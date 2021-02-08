<template>
  <div class="bottom p-2">
    <div class="bottom-bg">
        <img class="image cloud-left" src="../assets/svg/cloud-left.svg" alt="Cloud">
        <img class="image cloud-middle" src="../assets/svg/cloud-middle.svg" alt="Cloud">
        <img class="image cloud-right" src="../assets/svg/cloud-right.svg" alt="Cloud">
        <img class="image city" src="../assets/Bottom-bg.png" alt="Background image">
    </div>
    <div v-if="!currentWeather.weather" class="empty-weather">
        <h1 class="empty-text">Click on city card to see the weather informations.</h1>
    </div>
    <div v-else class="weather-content">
        <div class="left-box" :class="{'open': graphsOpened}">
            <div class="left-box-wrapper" :class="{'open': graphsOpened}">
            <div class="header mb-4">
                <h1 class="header-title">{{ currentCity.name }}</h1>
                <p class="header-date">{{ getTodaysDate() }}</p>
            </div>
            <div class="content">
                <div class="infos-box">
                    <div class="main-info mb-3 pt-2">
                        <p class="temperature">{{ Math.floor(currentWeather.temp) }}<span class="temp-deg">&deg;C</span></p>
                        <div class="weather-description">
                            <img v-if="currentWeather.weather" class="weather-icon ml-4" :src="`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`" alt="Weather icon">
                            <p class="weather-condition ml-4">{{ currentWeather.weather[0].main }}</p>
                        </div>
                    </div>
                    <div class="more-infos">
                        <div class="info-box humidity">
                        <p class="info-text">Humidity</p>
                        <span class="info-text">
                            <span><img src="../assets/svg/humidity-icon.svg" alt="Humidity Icon"></span>
                            {{ currentWeather.humidity }}%
                        </span>
                        </div>
                        <div class="info-box feels-like">
                        <p class="info-text">Feels like</p>
                        <span class="info-text">
                            <span><img src="../assets/svg/temp-icon.svg" alt="Temperature Icon"></span>
                            {{ Math.floor(currentWeather.feels_like) }}&deg;C 
                        </span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div class="right-box" :class="{'open': graphsOpened}">
            <button @click="openGraphs" class="btn open-btn" :class="{'open': graphsOpened}">
            <span class="iconify" data-inline="false" data-icon="bx:bxs-left-arrow" style="color: #ebebeb;"></span>
            </button>
            <div class="graphs" :class="{'closed': !graphsOpened}">
                <GraphComponent 
                graphTitle="Temperature" 
                :graphBars="$store.state.weather.hourlyTemp"
                :graphYAxis="tempYAxis"
                />
                <GraphComponent 
                graphTitle="Humidity %" 
                :graphBars="$store.state.weather.hourlyHumidity"
                :graphYAxis="humidYAxis"
                />
            </div>
        </div>    
    </div>  
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import GraphComponent from './GraphComponent';

@Component({
    components: {
        GraphComponent
    }
})
export default class WeatherInfos extends Vue {
    graphsOpened = false;
    currentWeather = {};
    hourlyWeather = {};
    currentCity = {};
    todayDate = new Date();
    tempYAxis = [50, 40, 30, 20, 10, 0, -10, -20, -30, -40];
    humidYAxis = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];

    @Watch('$store.state.weather.currentWeather')
    onChange() {
        this.currentWeather = this.$store.state.weather.currentWeather;
        this.hourlyWeather = this.$store.state.weather.hourlyWeather;
        this.currentCity = this.$store.state.weather.currentCity;
    }

    openGraphs() {
        this.graphsOpened = !this.graphsOpened;
    }

    getTodaysDate() {
        let day: string;
        const month = this.todayDate.toString().split(' ').splice(1, 1).join('');
        const date = this.todayDate.getDate();
            
        switch (this.todayDate.getDay()) {
            case 1:
                day = 'Monday';
                break;
            case 2:
                day = 'Tuesday'
                break;
            case 3:
                day = 'Wednesday'
                break;
            case 4:
                day = 'Thursday'
                break;
            case 5:
                day = 'Friday'
                break;
            case 6:
                day = 'Saturday'
                break;
            case 7:
                day = 'Sunday'
                break;
        }

        const fullDate = `${day}, ${date} ${month}`

        return fullDate;        
    }
}
</script>

<style>

</style>