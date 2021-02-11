<template>
    <div class="city-box">
        <button class="btn delete-city-btn ml-auto" @click="closeBtnClickHandler(cityProp.id)">
            <span class="iconify" data-inline="false" data-icon="gg:close" style="color: #ebebeb;"></span>
        </button>
        <div class="city-content" @click="cardClickHandler">
            <h4 class="city-name pt-2">{{ cityProp.name }}</h4>
        </div>
        <img class="city-bg" :src="`/img/city-large${randomNumber}.png`" alt="Background image.">
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { CityInterface } from '../store/modules/interfaces';

@Component
export default class CityCard extends Vue {
    @Prop() cityProp: CityInterface;
    @Prop() component: string;

    randomNumber: number;

    cardClickHandler() {
        if(this.component === 'Weather') {
            clearInterval(this.$store.state.weather.interval);

            this.$store.dispatch('fetchWeather', this.cityProp);
            this.$store.state.weather.interval = setInterval(() => {
                this.$store.dispatch('fetchWeather', this.cityProp);
                console.log('card clicked');
            }, 60000)
        }
    }

    closeBtnClickHandler(id: number) {
        if(this.component === 'Weather') {
            this.$store.dispatch('deleteCity', id);
            const message = {
                title: "City removed.",
                content: "City has been successfully removed.",
                type: "success"
            }

            this.$store.dispatch('addMessage', message);

        } else if(this.component === 'AddCity') {
            this.$store.commit('removeFromCitiesToAdd', id);
        }
    }

    created() {
        this.randomNumber = Math.floor(Math.random()*6+1);
    }
}
</script>

<style lang="scss">
$dark-grey: #3f3f3f;
$light-grey: #ebebeb;
$blue-color: #8DAFE2;
$red-warning:  #dd5656;
@mixin drop-shadow { box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25); }

.city-box {
    position: relative;
    width: 165px;
    height: 150px;
    background: linear-gradient(180deg, #EBEBEB 0%, rgba(235, 235, 235, 0.37) 100%);
    @include drop-shadow();
    backdrop-filter: blur(10px);
    border-radius: 15px;
    cursor: pointer;
    transition: box-shadow .5s;

    .delete-city-btn {
        width: 22px;
        height: 22px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.535);
        background: rgba(0, 0, 0, 0.385);

        .iconify { transition: font-size .5s; }
    }

    .city-content {
        position: relative;
        height: 80%;
        z-index: 1;
        color: $dark-grey;

        .city-name {
            font-size: 18px;
            font-weight: 500;
            text-transform: uppercase;
            text-align: center;
        }
    }

    .city-bg {
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        opacity: .7;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        z-index: 0;
    }
}

.city-box:hover {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.507);

    .delete-city-btn {
        width: 100%;
        height: 20%;
        background: $red-warning;

        .iconify {
            font-size: 24px;
        }
    }
}

@media (max-width: 420px) {
  
}
</style>