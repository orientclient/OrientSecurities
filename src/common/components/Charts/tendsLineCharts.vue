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
          setOptions({ expectedData, actualData, collectTime, legendData } = {}) {
              this.chart.setOption({
                  xAxis: {
                      data: collectTime,
                      boundaryGap: false,
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
                      splitLine: {
                          show: false
                      },
                      axisTick: {
                          show: false
                      }
                  },
                  legend: {
                      data: legendData
                  },
                  series: expectedData
                  // {
                  // name: legendData[0],
                  // itemStyle: {
                  //   normal: {
                  //     color: '#FF005A',
                  //     lineStyle: {
                  //       color: '#FF005A',
                  //       width: 2
                  //     }
                  //   }
                  // },
                  // smooth: false,
                  // type: 'line',
                  // data: expectedData[0],
                  // animationDuration: 2800,
                  // animationEasing: 'cubicInOut'
                  // }
                  //   {
                  //   name: item[i],
                  //   smooth: false,
                  //   type: 'line',
                  //   itemStyle: {
                  //     normal: {
                  //       color: '#3888fa',
                  //       lineStyle: {
                  //         color: '#3888fa',
                  //         width: 2
                  //       }
                  //     }
                  //   },
                  //   data: actualData,
                  //   animationDuration: 2800,
                  //   animationEasing: 'quadraticOut'
                  // }
              })
          },
          initChart() {
              this.chart = echarts.init(this.$el, 'macarons')
              // if (this.chartData.expectedData === null) {
              //   this.chartData.expectedData = []
              // }
              if (this.chartData &&
          this.chartData.expectedData &&
          this.chartData.legendData &&
          this.chartData.legendData.length > 0 &&
          this.chartData.collectTime &&
          this.chartData.collectTime.length > 0) {
                  this.setOptions(this.chartData)
              }
          }
      }
  }
</script>
