<template>
    <div class="modal-bg">
        <div class="add-city-modal">
            <div class="add-city-content p-4">
                <div class="add-bg">
                    <img class="bg-image" src="../assets/top-bg.png" alt="Background image">
                </div>
                <button @click="closeModalHandler" class="btn close-modal-btn">
                    <span class="iconify" data-inline="false" data-icon="gg:close" style="color: #ebebeb;"></span>
                </button>
                <div class="left-side p-3">
                    <div class="search-box mb-2">
                        <input v-model="searchValue" type="text" class="search-input" placeholder="Search city...">
                        <span class="iconify" data-inline="false" data-icon="fluent:search-28-filled"></span>
                    </div>
                    <div class="search-result pr-1">
                        <div v-for="city in $store.state.cities.filteredCities" :key="city.id" class="city-search">
                            <p class="city-name">{{ city.name }}, {{ city.country }}</p>
                            <button @click="addCityHandler(city)" class="btn add-city-btn">
                                <span class="iconify" data-inline="false" data-icon="fluent:add-24-filled" style="color: #ebebeb;"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="cities-to-add">
                        <CityCard 
                        v-for="city in $store.state.cities.citiesToAdd" 
                        :key="city.id" 
                        :cityProp="city"
                        component='AddCity'
                        />
                    </div>
                    <div class="btns-box">
                        <button @click="onClearHandler" class="btn cities-add-btn cancel-btn">
                            <span class="iconify" data-inline="false" data-icon="carbon:close" style="color: #ebebeb;"></span>
                            <span class="btn-text">Clear</span>
                        </button>
                        <button @click="confirmAddingHandler" class="btn cities-add-btn create-btn">
                            <span class="iconify" data-inline="false" data-icon="line-md:confirm" style="color: #ebebeb;"></span>
                            <span class="btn-text">Add Cities</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import CityCard from './CityCard';
import { CityInterface } from '../store/modules/interfaces';

@Component({
    components: {
        CityCard
    }
})
export default class AddCity extends Vue {
    searchValue = '';

    @Watch('searchValue')
    onSearch(val: string, oldVal: string): void {
        this.$store.dispatch('filterCities', val);
    }

    closeModalHandler(): void {
        this.$store.commit('addCityModalToggle');
    }

    addCityHandler(city: CityInterface): void {
        const isInToAdd: CityInterface = this.$store.state.cities.citiesToAdd.find((item: CityInterface) => item.id === city.id);
        const isInObserved: CityInterface = this.$store.state.users.user.cities.find((item: CityInterface) => item.id === city.id);
        
        if(isInToAdd || isInObserved) {
            const message = {
                title: "Already observed!",
                content: "This city is already observed by you.",
                type: "warning"
            }

            this.$store.dispatch('addMessage', message);
        } else {
            this.$store.commit('citiesToAddUnshift', city);
        }
    }

    onClearHandler(): void {
        this.$store.commit('clearCitiesToAdd');
    }

    confirmAddingHandler(): void {
        if(this.$store.state.cities.citiesToAdd.length !== 0) {
            this.$store.dispatch('observeCities', this.$store.state.cities.citiesToAdd);
            
            this.onClearHandler();
            this.closeModalHandler();
            const message = {
                title: "Added to observe.",
                content: "Cities you've chose were added to observe.",
                type: "success"
            }

            this.$store.dispatch('addMessage', message);

        } else {
            const message = {
                title: "No cities to add!",
                content: "You did not choose cities to observe.",
                type: "warning"
            }

            this.$store.dispatch('addMessage', message);
        }
    }

    
}

</script>

<style src="../styles/css/AddCityStyle.css" scoped>


</style>
