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
              const total = 20
              // const dataName = []
              this.chart.setOption({
                  color: ['#1890FF', '#FF984F', '#FA6137'],
                  left: '30%',
                  title: {
                      zlevel: 0,
                      text: [
                          '{value|' + total + '笔' + '}'
                          // '{name|总金额}'
                      ].join('\n'),
                      rich: {
                          value: {
                              color: '#303133',
                              fontSize: 20,
                              fontWeight: 'bold',
                              lineHeight: 40
                          },
                          name: {
                              color: '#909399',
                              lineHeight: 20
                          }
                      },
                      top: '36%',
                      left: '43%',
                      textAlign: 'center',
                      textStyle: {
                          rich: {
                              value: {
                                  color: '#303133',
                                  fontSize: 20,
                                  fontWeight: 'bold',
                                  lineHeight: 40
                              },
                              name: {
                                  color: '#909399',
                                  lineHeight: 20
                              }
                          }
                      }
                  },
                  tooltip: {
                      show: true, // 显示悬浮提示
                      trigger: 'item',
                      formatter: '{a} <br/>{b} : {c}笔 ({d}%)' // 提示格式
                  },
                  legend: {
                      orient: 'vertical', // 垂直展示图例
                      itemWidth: 10, // 设置图例图形宽度
                      itemHeight: 10, // 设置高度
                      left: '82%',
                      y: 'top',
                      // top: '-10',
                      data: ['成交']
                  },
                  calculable: true,
                  series: [
                      {
                          name: '',
                          type: 'pie',
                          center: ['44%', '44%'], // 图位置定位，两边和上下
                          radius: ['30%', '70%'], // 内外环大小比例
                          avoidLabelOverlap: true,
                          label: {
                              // labelLine: 'outside',
                              normal: {
                                  show: true,
                                  formatter: '{b} : {c} 笔', // 要百分比加上d({d}%)
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
                                  borderWidth: 0, // 扇形块间距
                                  borderColor: '#F9F9F9' // 间距边框颜色
                              },
                              emphasis: { // 高亮状态下的样式
                                  borderWidth: 0, // 扇形块间距
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
                              { value: 20, name: '成交' }
                              // { value: 6, name: '融资融券系统' }
                              // { value: 9, name: '个股融券系统' }
                          ]
                      }
                  ]
              })
              // }
          }
      }
  }
</script>
