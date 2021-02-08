<template>
  <div class="graph">
      <p v-if="graphTitle === 'Temperature'" class="graph-title">{{ graphTitle }} &deg;C</p>
      <p v-else class="graph-title">{{ graphTitle }}</p>
      <div class="graph-box">
        <div class="y-axis">
            <div v-for="item in graphYAxis" :key="item" class="number-line">
                <span class="span-number">{{ item }}</span>
                <span class="span-line"></span>
            </div>
        </div>
        <div class="x-axis">
            <div v-for="item in xAxis" :key="item" class="number-line">
                <span class="span-line"></span>
                <span class="span-number">{{ item }}</span>
            </div>
        </div>
        <div class="results">
            <div v-for="(item, index) in graphBars" :key="index" class="result">
                <span v-if="graphTitle === 'Temperature'" class="result-bar" :style="`height: ${item + 50}%;`">
                    <span class="result-number">{{ item }}&deg;C</span>
                </span>
                <span v-else class="result-bar" :style="`height: ${item}%;`">
                    <span class="result-number">{{ item }}%</span>
                </span>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class GraphComponent extends Vue {
    @Prop() graphTitle: string;
    @Prop() graphBars: number[];
    @Prop() graphYAxis: number[];

    xAxis: string[] = [...this.$store.state.weather.hourlyWeather];

    @Watch('$store.state.weather.hourlyWeather')
    onChange() {
        this.xAxis = [...this.$store.state.weather.hourlyWeather];
    }
}
</script>

<style lang="scss">
$dark-grey: #3f3f3f;
$light-grey: #ebebeb;
$blue-color: #8DAFE2;
$red-warning:  #dd5656;
@mixin drop-shadow { box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25); }
@mixin display-flex($justify, $align, $direction) {
  display: flex;
  justify-content: $justify;
  align-items: $align;
  flex-direction: $direction;
}

.graphs {
    flex: 1;
}

.graph {
    width: 360px;
    height: 200px;
    margin: 10px 10px 10px 10px;
    padding-left: 30px;
    overflow-x: scroll;
}

.graph::-webkit-scrollbar {
    background: #fff;
    height: 8px;
}

.graph::-webkit-scrollbar-thumb {
    background: $dark-grey;
}

.graph-title {
    font-size: 15px;
    font-weight: 500;
    margin: 0;
    padding-left: 30px;
}

.graph-box {
    position: relative;
    height: 150px;
    width: 1000px;
    border-bottom: 2px solid $light-grey;
    border-left: 2px solid $light-grey;

    .y-axis {
        height: 100%;
        position: absolute;
        top: 0;
        left: -6px;

        .number-line {
            position: relative;
            display: flex;
            align-items: center;
        }

        .span-line {
            display: block;
            width: 10px;
            height: 1px;
            background: #ffffff;
            margin-bottom: 14px;
        }

        .span-number {
            position: absolute;
            font-size: 8px;
            top: -35%;
            left: -15px;
        }
    }

    .results {
        height: 100%;
        width: 100%;
        @include display-flex(space-evenly, flex-end, row);

        .result {
            height: 100%;
            width: 50px;
            @include display-flex(flex-end, center, column);

            .result-number {
                position: absolute;
                top: -13px;
                left: -50%;
                margin: 0;
                font-size: 10px;
            }

            .result-bar {
                position: relative;
                width: 10px;
                height: 60%;
                background: #FF9696;
            }
        }
    }

    .x-axis {
        position: absolute;
        width: 100%;
        height: 10px;
        bottom: -13px;
        left: 0;
        @include display-flex(space-evenly, center, row);

        .number-line {
            width: 40px;
            position: relative;
            @include display-flex(center, center, column)
        }

        .span-line {
            display: block;
            width: 1px;
            height: 10px;
            background: #ffffff;
        }

        .span-number {
            // position: absolute;
            font-size: 10px;
            // top: -35%;
            // left: -15px;
        }
    }
}
</style>