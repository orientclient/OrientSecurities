<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  import { debounce } from '@/common/utils'

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
              default: '350px'
          },
          autoResize: {
              type: Boolean,
              default: true
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
          if (this.autoResize) {
              this.__resizeHanlder = debounce(() => {
                  if (this.chart) {
                      this.chart.resize()
                  }
              }, 100)
              window.addEventListener('resize', this.__resizeHanlder)
          }

          // 监听侧边栏的变化
          const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
          sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
      },
      beforeDestroy() {
          if (!this.chart) {
              return
          }
          if (this.autoResize) {
              window.removeEventListener('resize', this.__resizeHanlder)
          }

          const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
          sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

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
      // setOptions({ expectedData, actualData, collectTime, legendData } = {}) {
      //   // debugger
      // },
          initChart() {
              this.chart = echarts.init(this.$el, 'macarons')
              // if (this.chartData.expectedData === null) {
              //   this.chartData.expectedData = []
              // }
              // if (this.changeData &&
              //   this.chartData.expectedData &&
              //   this.chartData.legendData &&
              //   this.chartData.legendData.legendData[0] &&
              //   this.chartData.legendData.legendData[1]) {
              //   this.setOptions(this.chartData)
              // }
              this.chart.setOption({
                  xAxis: {
                      type: 'category',
                      boundaryGap: false,
                      data: ['0701', '0702', '0703', '0704', '0705', '0706', '0707', '0708', '0709', '0710'],
                      splitLine: {
                          show: false
                      },
                      axisTick: {
                          show: false
                      }
                  },
                  grid: {
                      left: 10,
                      right: 10,
                      bottom: 20,
                      top: 30,
                      containLabel: true
                  },
                  tooltip: {
                      trigger: 'axis',
                      axisPointer: {
                          type: 'cross'
                      },
                      padding: [5, 10]
                  },
                  yAxis: {
                      type: 'value',
                      splitLine: {
                          show: false
                      },
                      axisTick: {
                          show: false
                      }
                  },
                  // legend: {
                  //   data: legendData
                  // },
                  series: [{
                      data: [820, 932, 901, 934, 1290, 1330, 1320, 956, 841, 653],
                      type: 'line',
                      smooth: false,
                      areaStyle: {
                          color: '#1890FF'
                      }
                  }]
              })
          }
      }
  }
</script>
