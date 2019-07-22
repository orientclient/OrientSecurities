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
              // if (this.chartData && this.chartData.segmentData) {
              //   this.setOptions(this.chartData)
              // }
              // setOptions({ segmentData } = {}) {
              // debugger
              // const total = 40
              // const dataName = []
              this.chart.setOption({
                  color: ['#FCCF16', '#FF852F', '#1890FF', '#36CBCB'],
                  left: '30%',
                  tooltip: {
                      show: true, // 显示悬浮提示
                      trigger: 'item',
                      formatter: '{a} <br/>{b} : {d}%' // 提示格式
                  },
                  legend: {
                      orient: 'vertical', // 垂直展示图例
                      itemWidth: 10, // 设置图例图形宽度
                      itemHeight: 10, // 设置高度
                      left: '82%',
                      y: 'top',
                      // top: '-10',
                      data: ['股票', '基金', '债券', '衍生品']
                  },
                  calculable: true,
                  series: [
                      {
                          name: '市值部分:',
                          type: 'pie',
                          center: ['44%', '44%'], // 图位置定位，两边和上下
                          radius: ['30%', '70%'], // 内外环大小比例
                          avoidLabelOverlap: true,
                          label: {
                              // labelLine: 'outside',
                              normal: {
                                  show: true,
                                  formatter: '{d}%', // 要百分比加上d({d}%)
                                  position: 'outside' // 图表标签位置
                              },
                              emphasis: {
                                  show: true,
                                  textStyle: {
                                      fontSize: '15'
                                      // fontWeight: 'bold'
                                  }
                              }
                          },
                          itemStyle: {
                              normal: {
                                  borderWidth: 3, // 扇形块间距
                                  borderColor: '#F9F9F9' // 间距边框颜色
                              },
                              emphasis: { // 高亮状态下的样式
                                  borderWidth: 3, // 扇形块间距
                                  borderColor: '#F9F9F9' // 间距边框颜色
                              }
                          },
                          labelLine: {
                              normal: {
                                  show: true, // 标签线
                                  length: 12, // 第一段引导线长度
                                  length2: 10 // 第二段引导线长度
                              }
                          },
                          data: [
                              { value: 5, name: '股票' },
                              { value: 5, name: '基金' },
                              { value: 6, name: '债券' },
                              { value: 6, name: '衍生品' }
                              // { value: 9, name: '个股融券系统' },
                              // { value: 9, name: '个股融券废单' }
                          ]
                      }
                  ]
              })
              // }
          }
      }
  }
</script>
