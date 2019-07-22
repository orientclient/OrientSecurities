<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  import { debounce } from '@/utils'

  require('echarts/theme/macarons') // echarts theme

  export default {
      props: {
          className: {
              type: String,
              default: 'chart'
          },
          width: {
              type: String,
              default: '100%'
          },
          height: {
              type: String,
              default: '300px'
          },
          chartData: {
              type: Object
          }
      },
      data() {
          return {
              chart: null
          }
      },
      watch: {
          chartData: {
              deep: true,
              handler(val) {
                  this.setOptions(val)
              }
          }
      },
      mounted() {
          this.initChart()
          this.__resizeHanlder = debounce(() => {
              if (this.chart) {
                  this.chart.resize()
              }
          }, 100)
          window.addEventListener('resize', this.__resizeHanlder)
      },
      beforeDestroy() {
          if (!this.chart) {
              return
          }
          window.removeEventListener('resize', this.__resizeHanlder)
          this.chart.dispose()
          this.chart = null
      },
      methods: {
          initChart() {
              this.chart = echarts.init(this.$el, 'macarons')
              if (this.chartData && this.chartData.segmentData) {
                  this.setOptions(this.chartData)
              }
          },
          setOptions({ segmentData } = {}) {
              // debugger
              this.chart.setOption({
                  tooltip: {
                      trigger: 'item',
                      formatter: '{d}%'
                  },
                  calculable: true,
                  series: [
                      {
                          name: 'WEEKLY WRITE ARTICLES',
                          type: 'pie',
                          radius: '55%',
                          center: ['50%', '50%'],
                          data: segmentData,
                          //   [
                          //   { value: 320, name: 'Industries' },
                          //   { value: 240, name: 'Technology' },
                          //   { value: 149, name: 'Forex' },
                          //   { value: 100, name: 'Gold' },
                          //   { value: 59, name: 'Forecasts' }
                          // ],
                          animationEasing: 'cubicInOut',
                          animationDuration: 2600
                      }
                  ]
              })
          }
      }
  }
</script>
