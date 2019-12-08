<template>
  <div class="chart-container">
    <div :id="id" :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
import { getChartData } from '@/api/chart'

export default {
  name: 'LineChart',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      chart: null,
      series: [],
    }
  },
  mounted() {
    this.initChart()
    this.fetchData()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        backgroundColor: '#394056',
        title: {
          top: 20,
          text: 'Success Rate',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['Total'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        yAxis: [{
          type: 'value',
          name: '(%)',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: []
        }],
        series: []
      })
    },
    Serial(color) {
      return {
        name: '',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 1
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: color.rgba(0.3)
            }, {
              offset: 0.8,
              color: color.rgba(0.8)
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: color.rgb,
            borderColor: color.rgba(0.27),
            borderWidth: 12

          }
        },
        data: []
      }
    },
    randomRgb() {
      const R = Math.floor(Math.random() * 255)
      const G = Math.floor(Math.random() * 255)
      const B = Math.floor(Math.random() * 255)
      const color = {}
      color.rgb = 'rgb(' + R + ',' + G + ',' + B + ')'
      color.rgba = function(a) {
        return 'rgba(' + R + ',' + G + ',' + B + ',' + a + ')'
      }
      return color
    },
    fetchData() {
      const newOptions = this.chart.getOption()
      getChartData().then(response => {
        newOptions.xAxis[0].data = response.data.items.x
        for (const k in response.data.items) {
          const color = this.randomRgb()
          const itemLine = this.Serial(color)
          itemLine.name = response.data.items[k].pattern
          itemLine.data = response.data.items[k].serial
          this.series.push(itemLine)
        }
        newOptions.series = this.series
        this.chart.setOption(newOptions, true)
      })
    }
  }
}

</script>

<style scoped>
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
  }
</style>
