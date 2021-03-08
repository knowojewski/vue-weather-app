<template>
    <div class="weather-row">
      <AddCity v-if="$store.state.ui.addCityModalOpened"/>
      <div class="weather-container">
        <button @click="logOutHandler" class="btn logout-btn" title="Log out">
          <span class="iconify" data-inline="false" data-icon="fa-solid:sign-out-alt" style="color: #ebebeb;"></span>
        </button>
        <div class="top">
          <img class="bg-image" src="../assets/top-bg.png" alt="Top side background">
          <div class="header pb-2 mb-4">
            <h1 class="header-title">Weather Forecast</h1>
            <button @click="openAddModalHandler" class="btn add-btn" title="Add city">
              <span class="iconify" data-inline="false" data-icon="fluent:add-24-filled" style="color: #ebebeb;"></span>
            </button>
          </div>
          <div class="empty-cities" v-if="$store.state.users.user.cities.length === 0">
            <p class="empty-text m-0">You don't observe any city yet.</p>
          </div>
          <div v-else class="cities-slider">
            <Slick ref="slick" :options="settings">
              <CityCard 
              v-for="city in $store.state.users.user.cities" 
              :key="city.id" 
              :cityProp="city"
              component='Weather'
              />
            </Slick>
          </div>
        </div>
        <WeatherInfos />
      </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import AddCity from '../components/AddCity';
import CityCard from '../components/CityCard';
import WeatherInfos from '../components/WeatherInfos';
import { ConfirmModalInterface } from '../store/modules/interfaces';
import Slick from 'vue-slick';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

@Component({
  components: {
    AddCity,
    CityCard,
    Slick,
    WeatherInfos
  }
})
export default class Weather extends Vue {
  settings = {
    "dots": false,
    "focusOnSelect": true,
    "infinite": true,
    "draggable": false,
    "centerMode": true,
    "centerPadding": '0px',
    "speed": 500,
    "slidesToShow": 5,
    "slidesToScroll": 1,
    "touchThreshold": 5,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
          "centerMode": true,
          "centerPadding": '50px',
        }
      }
    ]
  }

  user = this.$store.state.users.user;

  @Watch('user.cities')
  onChange() {
    if(this.user.cities.length !== 0)
    this.reInit();
  }

  openAddModalHandler() {
    this.$store.commit('addCityModalToggle');
  }

  logOutHandler() {
    this.$store.dispatch('logOutUser');

    const modalInfos: ConfirmModalInterface = {
        title: "Loging Out",
        content: "You have been successfully loged out. You will be automatically redirected to the Login page.",
        redirectTo: "Login Page",
        redirectLink: "/login"
    }

    this.$store.dispatch('displayConfirmModal', modalInfos);
  }

  reInit() {
    if(this.$refs.slick) {
      const currIndex = this.$refs.slick.currentSlide();

      this.$refs.slick.destroy();

      this.$nextTick(() => {
        this.$refs.slick.create();
        this.$refs.slick.goTo(currIndex, true);
      })
    }
  }

  created() {
    this.$store.dispatch('fetchCities');
  }
}

</script>

<style src="../styles/css/WeatherStyle.css"></style>
