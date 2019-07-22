<template>
  <div class="dashboard-container">
    <div class="dashboard-text hide">姓名:{{name}}</div>
    <div class="dashboard-text hide">角色:<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <div style="width: 100%;height: 100%;">
      <!-- 顶部 -->
      <dashcard>
         <div slot="context" class="dashcard-top">
            <el-form class="u-form" :rules="addRules" :model="formData" ref="formData">
              <div style="">
                <el-form-item
                class="page-form-item-dashCard" label="客户类型:" prop="userId"
                style="width: calc((100% - 420px)/3);padding-left: 10px;margin-bottom: 0px;line-height:70px">
                <el-select v-model="formData.userId" filterable placeholder="请选择客户类型" style="width:217%" clearable>
                 <el-option
                   v-for="item in names"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                 </el-option>
                </el-select>
                </el-form-item>
                <el-form-item
                class="page-form-item-dashCard" label="" prop="userName"
                style="width: calc((100% - 420px)/4);padding-left: 0px;margin-bottom: 0px;line-height:70px">
                <el-input v-model="formData.userName" placeholder="请输入信息" style="width:300%">
                </el-input>
                </el-form-item>
                <!-- <el-form-item
                class="page-form-item-dashCard" label="身份证号:" prop="idNumber"
                style="width: calc((100% - 420px)/3);padding-left: 0px;margin-bottom: 0px;line-height:70px">
                 <el-input v-model="formData.idNumber" placeholder="" style="width:217%">
                 </el-input>
                </el-form-item> -->
                <el-button  style="width: 80px" v-waves class="primary-btn-blue" @click="text()">
                   查询
                </el-button>
                <el-button  style="width: 80px" v-waves @click="text()">
                   重置
                </el-button>
              </div>
            </el-form>
         </div>
      </dashcard>
      <!-- 中间 -->
      <dashcard :contextHeight="'100%'" class="dashcard-bottom">
          <div slot="context" style="height: 100%;position:absulote">
            <el-form class="u-form" :model="userFormData" ref="userFormData">
            <div class="top-user">
              <svg-icon class="icon-space" icon-class="customer"/>
            <el-form-item class="page-form-item-userMsg" label="客户姓名:" prop="userId"
                style="width:100px;padding-left: 0px;margin-bottom: 0px;">
                <div style="width: 215px;height: 54px;border-bottom: 1px solid #cccccc">
                    <span style="font-weight: 400;font-size:17px;font-family: '微软雅黑'">{{userFormData.userName}}</span>
                </div>
            </el-form-item>
            <div style="padding-left: 40px">
              <el-form-item class="page-form-item-userMsg" label="身份证号:" prop="idCardNumber"
                style="width:100px;padding-left: 0px;margin-bottom: 0px;">
                <div style="width: 195px;height: 54px;">
                    <span style="font-weight: 400;font-size:17px;">{{userFormData.idCardNumber}}</span>
                </div>
            </el-form-item>
            </div>
           </div>
           </el-form>
         </div>
      </dashcard>
      <dashcard :contextHeight="'100%'" :bgcolor="'#EEEEEE'" style="background-color: #ECECEC" class="dashcard-right">
         <div slot="context" style="height: 100%;position:absulote">
            <!-- 系统块,单系统 -->
            <div v-if="sysData.length === 1" style="width:23%;height:156px;display:inline-block;float:left;">
              <div class="sysBtn-box" :key = index v-for="(data, index) in sysData">
                 <div class="sys-btn" style="border-style:solid;border-width:thin;margin-top: 56px;" :style="{'border-color':data.color}" @click="changeSys(data)">
                    <svg-icon v-if="data.sysName === '集中交易系统'" class="icon-space" icon-class="centralizedTrading"/>
                    <svg-icon v-if="data.sysName === '融资融券交易系统'" class="icon-space" icon-class="marginTrading"/>
                     <div style="display:inline-block;position:relative;top:-5px">
                       <span class="" :style="{'color':data.color}" style="font-size:16px;">{{data.sysName}}</span>
                       <span :style="{'color':data.color}" style="font-size:20px;font-weight:bold">{{data.card.length}}</span>
                     </div>
                 </div>
              </div>
            </div>
            <!-- 多系统展示下面这个 -->
            <div v-if="sysData.length > 1" style="width:23%;height:156px;display:inline-block;float:left;">
              <div class="sysBtn-box" :key = index v-for="(data, index) in sysData">
                 <div class="sys-btn" style="border-style:solid;border-width:thin" :style="{'border-color':data.color}" @click="changeSys(data)">
                    <svg-icon v-if="data.sysName === '集中交易系统'" class="icon-space" icon-class="centralizedTrading"/>
                    <svg-icon v-if="data.sysName === '融资融券交易系统'" class="icon-space" icon-class="marginTrading"/>
                     <div style="display:inline-block;position:relative;top:-5px">
                       <span class="" :style="{'color':data.color}" style="font-size:16px;">{{data.sysName}}</span>
                       <span :style="{'color':data.color}" style="font-size:20px;font-weight:bold">{{data.card.length}}</span>
                     </div>
                 </div>
              </div>
            </div>
            <!-- 走马灯块 -->
            <div style="width:calc(75% - 5px);height:156px;display:inline-block;float:left;">
              <!-- 左箭头 -->
              <div class="scrollArrow-left">
                 <svg-icon class="icon-space" icon-class="left"/>
              </div>
              <!-- 标签块 -->
              <div class="scroll-card">
                <!-- 使用swiper滑动 -->
                <swiper v-if="marginTrading" :options="option">
                <swiper-slide>
                <!-- 注意slice包前不包后，所以下标取到2 -->
                   <div class="acountMargin" :key=index v-for="(data, index) in marginTradingData.slice(0, 3)">
                      <div class="acountMargin-block">
                         <svg-icon class="icon-space" icon-class="rong"/>
                      </div>
                      <div style="height:45px">
                        <span class="marginSpan">客户号-1:</span><span style="font-size:13px">{{data.name}}</span>
                      </div>
                      <div style="height:45px">
                        <span class="marginSpan">所属营业部:</span><span style="font-size:13px">{{data.department}}</span>
                      </div>
                   </div>
                </swiper-slide>
                <swiper-slide v-if="marginTradingData.length > 3">
                <!-- 注意slice包前不包后，所以下标取到2 -->
                   <div class="acountMargin" :key=index v-for="(data, index) in marginTradingData.slice(3, 6)">
                      <div class="acountMargin-block">
                         <svg-icon class="icon-space" icon-class="rong"/>
                      </div>
                      <div style="height:45px">
                        <span class="marginSpan">客户号-1:</span><span style="font-size:13px">{{data.name}}</span>
                      </div>
                      <div style="height:45px">
                        <span class="marginSpan">所属营业部:</span><span style="font-size:13px">{{data.department}}</span>
                      </div>
                   </div>
                </swiper-slide>
                <swiper-slide v-if="marginTradingData.length > 6">
                <!-- 注意slice包前不包后，所以下标取到2 -->
                   <div class="acountMargin" :key=index v-for="(data, index) in marginTradingData.slice(6, 9)">
                      <div class="acountMargin-block">
                         <svg-icon class="icon-space" icon-class="rong"/>
                      </div>
                      <div style="height:45px">
                        <span class="marginSpan">客户号-1:</span><span style="font-size:13px">{{data.name}}</span>
                      </div>
                      <div style="height:45px">
                        <span class="marginSpan">所属营业部:</span><span style="font-size:13px">{{data.department}}</span>
                      </div>
                   </div>
                </swiper-slide>
                </swiper>
                <!-- 使用swiper滑动,不同的系统块。 -->
                <swiper v-if="centuralTrading" :options="option">
                <swiper-slide>
                   <div class="acountMargin" :key=index v-for="(data, index) in centuralTradingData.slice(0, 3)">
                      <div class="acountCentural-block">
                          <svg-icon class="icon-space" icon-class="ji"/>
                      </div>
                      <div style="height:45px">
                        <span class="marginSpan">客户号-1:</span><span style="font-size:13px">{{data.name}}</span>
                      </div>
                      <div style="height:45px">
                        <span class="marginSpan">所属营业部:</span><span style="font-size:13px">{{data.department}}</span>
                      </div>
                   </div>
                </swiper-slide>
                <swiper-slide v-if="centuralTradingData.length > 3">
                   <div class="acountMargin" :key=index v-for="(data, index) in centuralTradingData.slice(3, 6)">
                      <div class="acountCentural-block">
                          <svg-icon class="icon-space" icon-class="ji"/>
                      </div>
                      <div style="height:45px">
                        <span class="marginSpan">客户号-1:</span><span style="font-size:13px">{{data.name}}</span>
                      </div>
                      <div style="height:45px">
                        <span class="marginSpan">所属营业部:</span><span style="font-size:13px">{{data.department}}</span>
                      </div>
                   </div>
                </swiper-slide>
                <swiper-slide v-if="centuralTradingData.length > 6">
                   <div class="acountMargin" :key=index v-for="(data, index) in centuralTradingData.slice(6, 9)">
                      <div class="acountCentural-block">
                          <svg-icon class="icon-space" icon-class="ji"/>
                      </div>
                      <div style="height:45px">
                        <span class="marginSpan">客户号-1:</span><span style="font-size:13px">{{data.name}}</span>
                      </div>
                      <div style="height:45px">
                        <span class="marginSpan">所属营业部:</span><span style="font-size:13px">{{data.department}}</span>
                      </div>
                   </div>
                </swiper-slide>
                <!-- -->
                </swiper>
              </div>
               <!-- 右箭头 -->
              <div class="scrollArrow-right">
                 <svg-icon class="icon-space" icon-class="right"/>
              </div>
            </div>
         </div>
      </dashcard>
      <!-- 图表部分 -->
      <dashcard :contextHeight="'100%'" class="dashcard-bottom-left">
        <div slot="context" style="height: 100%">
          <div style="height: 30px;padding-left:10px">
              <div style="height: 30px;width:100px" class="chart-div" @click="text()">
                <svg-icon class="icon-space" style="line-height:30px" icon-class="fund"/>
                <span style="line-height:30px">资金</span><span style="line-height:30px;font-size: 9px;font-weight: 500">（万元）</span>
              </div>
          </div>
          <bar-Chart v-if="sysData.length > 1"  height='100%' id='keyboard'></bar-Chart>
          <single-Sys-Bar v-if="sysData.length === 1"  height='100%' id='keyboard'></single-Sys-Bar>
        </div>
      </dashcard>
      <dashcard :contextHeight="'100%'" class="dashcard-bottom-right">
         <div slot="context" style="height: 100%">
           <div style="height: 30px;padding-left:10px">
              <div style="height: 30px;width:100px" class="chart-div" @click="text()">
                <svg-icon class="icon-space" style="line-height:30px" icon-class="stock"/>
                <span style="line-height:30px;">市值</span><span style="line-height:30px;font-size: 9px;font-weight: 500">（万元）</span>
              </div>
          </div>
          <!-- 多个系统时用柱状图展示 -->
          <stock-Chart v-if="sysData.length > 1" height='100%' id='keyboard'></stock-Chart>
          <!-- 单系统用饼图展示四样数据 -->
           <single-Sys-Market-Val v-if="sysData.length === 1" height='90%' width='100%' id='keyboard'></single-Sys-Market-Val>
           <div v-if="sysData.length === 1" style="position: relative;top: -38px;width: 100%;height: 19px;">
              <div style="width: 100px;float: left;margin-left: 241px">
                <span>{{sysData[0].sysName}}</span>
              </div>
            </div>
          </div>
      </dashcard>
      <dashcard :contextHeight="'100%'" class="dashcard-bottom-left">
         <div slot="context" style="height: 100%;">
           <div style="height: 30px;padding-left:10px">
             <div style="height: 30px;width:100px" class="chart-div" @click="text()">
               <svg-icon class="icon-space" style="line-height:30px" icon-class="bail"/>
               <span style="line-height:30px">委托</span><span style="line-height:30px;font-size: 9px;font-weight: 500">（笔）</span>
             </div>
          </div>
            <bail-Pie height='90%' v-if="sysData.length > 1"  width='100%' id='keyboard'></bail-Pie>
            <single-Sys-Bail height='90%' v-if="sysData.length === 1"  width='100%' id='keyboard'></single-Sys-Bail>
            <div v-if="sysData.length === 1" style="position: relative;top: -38px;width: 100%;height: 19px;">
              <div style="width: 100px;float: left;margin-left: 241px">
                <span>{{sysData[0].sysName}}</span>
              </div>
            </div>
          </div>
      </dashcard>
      <dashcard :contextHeight="'100%'" class="dashcard-bottom-right">
         <div slot="context" style="height: 100%">
           <div style="height: 30px;padding-left:10px">
            <div style="height: 30px;width:80px" class="chart-div" @click="text()">
              <svg-icon class="icon-space" style="line-height:30px" icon-class="deal"/>
              <span style="line-height:30px">成交</span>
            </div>
          </div>
          <deal-Pie-Chart v-if="sysData.length > 1"  height='90%' width='100%' id='keyboard'></deal-Pie-Chart>
           <single-Sys-Deal v-if="sysData.length === 1"  height='90%' width='100%' id='keyboard'></single-Sys-Deal>
            <div v-if="sysData.length === 1" style="position: relative;top: -38px;width: 100%;height: 19px;">
              <div style="width: 100px;float: left;margin-left: 241px">
                <span>{{sysData[0].sysName}}</span>
              </div>
            </div>
          </div>
      </dashcard>

    </div>
  </div>
</template>

<script>
import dashcard from '@/common/components/dashCard'
// import barchart from '@/components/Charts/BarChart'
import { mapGetters } from 'vuex'
import stockChart from './compoments/stockChart'
import dealPieChart from './compoments/dealPieChart'
import bailPie from './compoments/bailPie'
import barChart from './compoments/barChart'
import singleSysBar from './compoments/singleSysBar'
import singleSysMarketVal from './compoments/singleSysMarketVal'
import singleSysBail from './compoments/singleSysBail'
import singleSysDeal from './compoments/singleSysDeal'

export default {
    name: 'singleCustomer',
    inject: ['reload'],
    watch: {
    // sysName(val) {
    //   debugger
    //   if (this.sysData.length > 0 && this.sysData.sysName === '集中交易系统') {
    //     this.marginTradingData = this.sysData.card
    //   } else if (this.sysData.length > 0 && this.sysData.sysName === '融资融券交易系统') {
    //     this.centuralTradingData = this.sysData.card
    //   }
    // }
    },
    created() {

    },
    data() {
        return {
            option: {
                autoplay: false,
                direction: 'horizontal',
                autoheight: true,
                pagination: '.swiper-pagination',
                observeParents: true,
                // 下面是swiper设置点击滑动的，将需要用于点击的块或者按钮的class放上去即可，prevE1是点击左滑
                navigation: {
                    nextEl: '.scrollArrow-right',
                    prevEl: '.scrollArrow-left'
                }
            },
            marginTradingData: [],
            centuralTradingData: [],
            centuralTrading: true,
            marginTrading: false,
            onHandNum: 15,
            eventNum: '！未开启',
            serEventNum: 15,
            seriousNum: 2,
            importantNum: 2,
            warningNum: 10,
            classA: 'el-input__icon',
            icon: 'el-icon-arrow-down',
            showMoreSys: false,
            tipsNum: 1,
            formData: {
                userId: ''
            },
            addRules: {},
            sysFormData: {},
            userFormData: {
                userName: '海绵宝宝',
                userId: '9110190001',
                idCardNumber: '332226198506259856',
                userType: '个人',
                salesDepart: '自动化测试营业部',
                departCode: '911',
                acountType: '柜员开户'
            },
            sysData: [
                {
                    sysName: '集中交易系统',
                    color: '#1890FF',
                    card: [
                        { 'name': '9110694626', 'department': '自动化测试营业部' },
                        { 'name': '9110694626', 'department': '自动化测试营业部' },
                        { 'name': '9110694626', 'department': '自动化测试营业部' }]
                },
                {
                    sysName: '融资融券交易系统',
                    color: '#FF852F',
                    card: [
                        { 'name': '9110694626', 'department': '自动化测试营业部' },
                        { 'name': '9110694626', 'department': '自动化测试营业部' },
                        { 'name': '9110694626', 'department': '自动化测试营业部' },
                        { 'name': '9110694626', 'department': '自动化测试营业部' }]
                }
            ],
            cardData: [
                { 'index': 0 },
                { 'index': 1 },
                { 'index': 2 },
                { 'index': 3 }
            ],
            names: [{
                value: '选项1',
                label: '客户号'
            }, {
                value: '选项2',
                label: '身份证号'
            }, {
                value: '选项3',
                label: '客户姓名'
            }]
        }
    },
    components: {
        dashcard,
        barChart,
        stockChart,
        dealPieChart,
        bailPie,
        singleSysBar,
        singleSysMarketVal,
        singleSysBail,
        singleSysDeal
    },
    computed: {
        ...mapGetters([
            'name',
            'roles'
        ])
    },

    methods: {
    // toggleRight() {
    //   if ((this.textIndex + 1) === this.option.data.length) {
    //     this.textIndex = 0
    //   } else {
    //     this.textIndex++
    //   }
    // },
    // toggleLeft() {
    //   if ((this.textIndex - 1) < 0) {
    //     this.textIndex = this.option.data.length - 1
    //   } else {
    //     this.textIndex--
    //   }
    // },
        changeSys(data) {
            if (data.sysName === '集中交易系统') {
                this.centuralTradingData = data.card
                this.centuralTrading = true
                this.marginTrading = false
            } else if (data.sysName === '融资融券交易系统') {
                this.marginTradingData = data.card
                this.marginTrading = true
                this.centuralTrading = false
                // this.reload()
            }
        },
        text() {
            alert(1)
        },
        // 下拉图表展示逻辑
        changIcon() {
            if (this.icon === 'el-icon-arrow-down') {
                // this.calculatePosition()
                // this.$emit('changeTreeYScroll', true)
                this.icon = 'el-icon-arrow-up'
                this.showMoreSys = true
            } else {
                // this.$emit('changeTreeYScroll', false)
                this.icon = 'el-icon-arrow-down'
                this.showMoreSys = false
            }
        },
        jumpToRealTime() {
            this.$router.push({
                path: '/event_monitor/real_time',
                name: 'realTime',
                params: {
                    name: '测试传参一',
                    dataObj: '测试传参二'
                }
                // query: {
                //   name: '',
                //   dataObj: ''
                // }
                // 接收参数 var routerParams = this.$route.params.dataObj
            })
        }
    }
}
</script>

<style rel="stylesheet/scss"  type="text/scss" lang="scss" scoped>
.hide{
  display: none;
}

.dashboard {
  &-container {
    margin: 10px;
    height: calc(100% - 20px);
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.sys-span {
  color:#606266;
}
.sys-span:hover {
  cursor: pointer;
  color: #0040FE;
}
.scrollArrow-left{
  cursor: pointer;
  height: 30px;
    width: 10px;
    float: left;
    position: relative;
    top: 60px;
    .icon-space{
          width: 30px;
          height: 30px;
          margin-top: 5px;
          margin-left: 6px;
          color:#cccccc;
        }
}
.scrollArrow-right{
  cursor: pointer;
  height: 30px;
    width: 10px;
    float: right;
    position: relative;
    top: 60px;
    .icon-space{
          width: 30px;
          height: 30px;
          margin-top: 5px;
          margin-left: 6px;
          color:#cccccc;
        }
}
.scroll-card{
    width: 91%;
    height: 152px;
    position: relative;
    // background-color: red;
    left: 50px;
    float: left;
}
.chart-div{
  font-weight: 600;
}
.chart-div:hover{
  cursor: pointer;
  color: #0040FE;
}
.color-box{
        display:inline-block;
        line-height: 47px;
        height: 40px;
        width: 40px;
        border-radius: 5px;
        .icon-space{
          width: 30px;
          height: 30px;
          margin-top: 5px;
          margin-left: 6px;
          color: #fff;
        }
}
.marginSpan{
  font-family:'微软雅黑';
  font-size:13px;
  line-height:45px;
  margin-left:8px
}
.acountMargin{
  height: 155px;
  width: 31%;
  float: left;
  margin-right:10px;
  background-color: #fff;
  border-radius:7px;
}
.acountMargin-block{
  height: 50px;
  width: 100%;
  background-color: orange;
  border-top-left-radius:7px;
  border-top-right-radius:7px;
  .icon-space{
          width: 35px;
          height: 35px;
          margin-top: 7px;
          margin-left: 6px;
          color: #fff;
        }
}
.acountCentural-block{
  height: 50px;
  width: 100%;
  background-color: #1890FF;
  border-top-left-radius:7px;
  border-top-right-radius:7px;
  .icon-space{
          width: 35px;
          height: 35px;
          margin-top: 7px;
          margin-left: 6px;
          color: #fff;
        }
}
.sys-div {
  display:inline-block;
  width:clac(100%/4);
  line-height:78px;
  padding-left:20px;
  .icon-space {
    width: 35px;
    height: 35px;
    margin-top: 0px;
    margin-left: 6px;
    margin-right: 30px;
    top: 8px;
    position: relative;
    color: #000000;
  }
   .block{
      display: inline-block;
      width: 1px;
      height: 35px;
      background-color: #cccccc;
      top: 11px;
      margin-top: 10px;
      margin-left: 20px;
    }
}
.dashcard-top{
  height: 70px;
  .context-font{
    font-weight: 600;
    font-size: 15px;
  }
  .left-area{
    display: inline-block;
    width: 15%;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    margin-top: 15px;
    .hand-num{
      font-weight: 600;
      font-size: 25px;
      margin-top: 15px;
      cursor: pointer;
    }
  }
  .mid-area{
    display: inline-block;
    width: 1px;
    height: 70px;
    background: rgb(204, 204, 204);
    margin-top: 15px;
  }
  .right-area{
    display: inline-block;
    width: calc(85% - 10px);
    height: 100%;
    vertical-align: top;
    .grid-content{
      margin-top: 15px;
      position: relative;
      .color-box{
        display:inline-block;
        height: 70px;
        width: 70px;
        border-radius: 5px;
        .icon-space{
          width: 40px;
          height: 40px;
          margin-top: 13px;
          margin-left: 16px;
          color: #fff;
        }
      }
      .color-box-serious{
        background-color: #EF504D;
      }
      .color-box-import{
        background-color: #FFB54D;
      }
      .color-box-warning{
        background-color: #FDE84F;
      }
      .color-box-tip{
        background-color: #41B340;
      }
      .font-number{
        display: inline-block;
        position: absolute;
        padding-top: 5px;
        left: 90px;
        .context-number{
          font-size: 25px;
          font-weight: 600;
          left: 90px;
          margin-top: 15px;
          cursor: pointer;
        }
      }
    }
    .event-pic{
      margin-top: 25px;
      margin-left: 10px;
      .server{
        margin-top: 15px;
      }
    }
  }
}
.sys-btn{
   height:40px;
   width:200px;
   background-color:#fff;
   border-radius:3px;
   border:1px,solid,#FF852F;
   cursor: pointer;
   .icon-space {
    width: 27px;
    height: 34px;
    margin-top: 0px;
    margin-left: 6px;
    margin-right: 0px;
    top: 3px;
    position: relative;
    color: #000000;
  }
}
.sys-btn:hover{
   height:40px;
   width:200px;
   background-color:#fff;
   border-radius:3px;
   border:#FF852F;
   box-shadow: 0 2px 3px 2px rgba(24,144,255, 0.3);
   cursor: pointer;
   .icon-space {
    width: 27px;
    height: 34px;
    margin-top: 0px;
    margin-left: 6px;
    margin-right: 0px;
    top: 3px;
    position: relative;
    color: #000000;
  }
}
.sysBtn-box{
  margin-left:15px;
  margin-bottom: 25px;
  margin-right:20px;
  margin-top:25px
}
.top-user {
   position:relative;
   height: 50%;
   padding-left: 10px;
  .icon-space {
      width: 20px;
      height: 20px;
      top: -20px;
      position: relative;
      margin-top: 5px;
      margin-left: 6px;
     margin-right: 10px;
      color: #000000;
  }
}
.dashcard-bottom{
  float: left;
  width: calc(25% - 5px);
  height: calc(100% - 450px);
  margin-right: 10px;
  margin-top: 10px;
}

.dashcard-right{
  float: left;
  width: calc(75% - 5px);
  height: calc(100% - 450px);
  // margin-right: 10px;
  background-color: #ECECEC;
  margin-top: 10px;
}

.dashcard-hide{
  float: left;
  width: 100%;
  height: calc(100% - 530px);
  margin-right: 10px;
  margin-top: 0px;
}

.dashcard-bottom-left{
  float: left;
  width: calc(50% - 5px);
  height: calc(100% - 300px);
  margin-right: 10px;
  margin-top: 10px;
}

.dashcard-bottom-right{
  float: left;
  width: calc(50% - 5px);
  height: calc(100% - 300px);
  margin-top: 10px;
  .context{
    height: 100%;
    padding: 15px;
    .context-row{
      height: calc(33% - 10px);
      margin-bottom: 10px;
    }
    .right-card{
      height: 100%;
      .right-card-content{
        height: 100%;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: Center;
        font-size: 20px;
        color: #fff;
        .icon-space{
          margin-right: 20px;
        }
      }
      .purple-card{
        background-color: #B9A5E2;
      }
      .blue-card{
        background-color: #8D86E3;
      }
      .green-card{
        background-color: #31CACC;
      }
    }
  }
}

</style>
