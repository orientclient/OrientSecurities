<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/common/utils'

// const animationDuration = 3000

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
    methods: {
        initChart() {
            this.chart = echarts.init(this.$el, 'macarons')

            this.chart.setOption({
                color: ['#1890FF', '#FF984F', '#FA6137', '#FFD31C'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    itemWidth: 10, // 设置图例图形宽度
                    itemHeight: 10, // 设置高度
                    data: [{
                        name: '股票'
                        // icon: 'diamond' // 标志图形类型，可以单独给某个图例设置，默认自动选择（8种类型循环使用，不显示标志图形可设为'none'），默认循环选择类型有：'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond'另外，还支持五种更特别的标志图形'heart'（心形）、'droplet'（水滴）、'pin'（标注）、'arrow'（箭头）和'star'（五角星），这并不出现在常规的8类图形中，但无论是在系列级还是数据级上你都可以指定使用，同时，'star' + n（n>=3)可变化出N角星，如指定为'star6'则可以显示6角星
                        // textStyle: { fontWeight: 'bold', color: 'green' }
                    }, '基金', '债券', '衍生品'],
                    orient: 'vertical', // 垂直显示
                    left: '86%',
                    y: 'top', // 延Y轴居顶
                    tooltip: {
                        show: true
                    }
                },
                grid: {
                    top: 20,
                    left: '2%',
                    right: '15%',
                    bottom: '13%',
                    containLabel: true
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    x: 'right',
                    y: 'center'
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: ['集中交易系统', '融资融券交易系统'],
                        axisLabel: {
                            show: true,
                            interval: 0, // 设置全部显示横坐标
                            textStyle: {
                                color: '#000000', // 更改坐标轴文字颜色
                                fontSize: 12 // 更改坐标轴文字大小
                            }
                        }

                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '股票',
                        type: 'bar',
                        // barGap: 1,
                        barWidth: 30,
                        barCategoryGap: '100%',
                        data: [320, 150]
                    },
                    {
                        name: '基金',
                        type: 'bar',
                        barWidth: 30,
                        data: [140, 182]
                    },
                    {
                        name: '债券',
                        barWidth: 30,
                        type: 'bar',
                        data: [150, 232]
                    },
                    {
                        name: '衍生品',
                        barWidth: 30,
                        type: 'bar',
                        data: [150, 232]
                    }
                ]
            })
        }
    }
}
</script>
