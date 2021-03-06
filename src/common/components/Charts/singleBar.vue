<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'

  const animationDuration = 3000

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
      watch: {
          chartData: {
              deep: true,
              handler(val) {
                  this.setOptions(val)
              }
          }
      },
      methods: {
          initChart() {
              this.chart = echarts.init(this.$el, 'macarons')
              this.setOptions(this.chartData)
          },
          setOptions({ count, nodeId } = {}) {
              this.chart.setOption({
                  tooltip: {
                      trigger: 'axis',
                      axisPointer: { // 坐标轴指示器，坐标轴触发有效
                          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                      }
                  },
                  grid: {
                      top: 10,
                      left: '2%',
                      right: '2%',
                      bottom: '3%',
                      containLabel: true
                  },
                  xAxis: [{
                      type: 'category',
                      splitLine: {
                          show: false
                      },
                      data: nodeId,
                      axisTick: {
                          alignWithLabel: true
                      }
                  }],
                  yAxis: [{
                      type: 'value',
                      splitLine: {
                          show: false
                      },
                      axisTick: {
                          show: false
                      }
                  }],
                  series: [{
                      name: '前置机席位数',
                      type: 'bar',
                      stack: 'vistors',
                      barWidth: '20%',
                      data: count,
                      animationDuration
                  }]
              })
          }
      }
  }
</script>
