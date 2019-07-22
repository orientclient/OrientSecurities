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
                color: ['#B6DDFF', '#63B4FF', '#1890FF'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    itemWidth: 10, // 设置图例图形宽度
                    itemHeight: 10, // 设置高度
                    data: ['可用', '可取', '冻结'],
                    orient: 'vertical', // 垂直显示
                    left: '85%',
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
                        data: ['集中交易系统'],
                        axisLabel: {
                            interval: 0, // 全部显示横坐标
                            show: true,
                            textStyle: {
                                color: '#000000', // 更改坐标轴文字颜色
                                fontSize: 14 // 更改坐标轴文字大小
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
                        name: '可用',
                        type: 'bar',
                        // barGap: '0%',
                        // barCategoryGap: '0%',
                        barWidth: 30,
                        // stack: '1', // 值相同的时候堆叠，不同的时候则单独成柱
                        data: [150, 232]
                    },
                    {
                        name: '可取',
                        type: 'bar',
                        barWidth: 30,
                        // stack: '1', // 值相同的时候堆叠，不同的时候则单独成柱
                        data: [200, 300]
                    },
                    {
                        name: '冻结',
                        type: 'bar',
                        barWidth: 30,
                        // stack: '2', // 值相同的时候堆叠，不同的时候则单独成柱
                        data: [120, 132]
                    }
                ]
            })
        }
    }
}
</script>
