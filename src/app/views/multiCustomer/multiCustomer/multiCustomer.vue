<template>
  <div class="dashboard-container">
    <div class="dashboard-text hide">姓名:{{name}}</div>
    <div class="dashboard-text hide">角色:<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <div style="width: 100%;height: 100%;">
      <!-- 顶部 -->
      <dashcard>
         <div slot="context" class="dashcard-top">
             <div slot="context" style="height: 100%;position:absulote">
            <el-form class="u-form" :model="userFormData" ref="userFormData">
            <div class="top-user">
            <svg-icon class="icon-space" icon-class="customer"/>
            <el-form-item class="page-form-item-multiUser" label="营业部编号:" prop="userId"
                style="width:230px;padding-left: 0px;margin-bottom: 0px;">
                <div style="width: 215px;height: 54px;">
                    <span style="font-weight: 700;font-size:17px;font-family: '微软雅黑'">{{userFormData.userId}}</span>
                </div>
            </el-form-item>
            <div style="padding-left: 40px;display:inline-block;width:220px">
               <el-form-item class="page-form-item-multiUser" label="营业部名称:" prop="userName"
                style="width:200px;padding-left: 0px;margin-bottom: 0px;">
                <div style="width: 215px;height: 54px;">
                    <span style="font-weight: 700;font-size:17px;font-family: '微软雅黑'">{{userFormData.userName}}</span>
                </div>
            </el-form-item>
            </div>
            <div style="line-height: 40px;display: inline-block;">
              <el-button
              style="width:55px;
              font-size: 11px;
              line-height:0px;
              top:-1px;
              position: relative"
              v-waves
              class="primary-btn-miniBlue" @click="text()">
                  查看更多
              </el-button>
            </div>
           </div>
            </el-form>
         </div>
         </div>
      </dashcard>
      <!-- 图表部分 -->
      <dashcard :contextHeight="'100%'" class="dashcard-bottom">
          <div slot="context" style="height: 100%;position:absulote">
            <div style="height: 30px;padding-left:10px">
              <div style="height: 30px;width:100px" class="chart-div" @click="text()">
                <svg-icon class="icon-space" style="line-height:30px" icon-class="stock"/>
                <span style="line-height:30px;">客户数</span>
              </div>
            </div>
              <customer-Count height='100%' width='100%' id="keybord"></customer-Count>
          </div>
      </dashcard>
      <dashcard :contextHeight="'100%'" class="dashcard-right">
         <div slot="context" style="height: 100%;position:absulote">
            <div style="height: 30px;padding-left:10px">
              <div style="height: 30px;width:100px" class="chart-div" @click="text()">
                <svg-icon class="icon-space" style="line-height:30px" icon-class="stock"/>
                <span style="line-height:30px;">资产</span>
              </div>
            </div>
            <customer-Count height='100%' id="keybord"></customer-Count>
         </div>
      </dashcard>
      <dashcard :contextHeight="'100%'" class="dashcard-bottom-left">
        <div slot="context" style="height: 100%">
          <div style="height: 30px;padding-left:10px">
              <div style="height: 30px;width:160px" class="chart-div" @click="text()">
                <svg-icon class="icon-space" style="line-height:30px" icon-class="fund"/>
                <span style="line-height:30px">客户资产比例</span>
              </div>
          </div>
          <asset-Persent height='100%' id="keybord"></asset-Persent>
        </div>
      </dashcard>
      <dashcard :contextHeight="'100%'" class="dashcard-bottom-right">
         <div slot="context" style="height: 100%">
           <div style="height: 30px;padding-left:10px">
              <div style="height: 30px;width:100px" class="chart-div" @click="text()">
                <svg-icon class="icon-space" style="line-height:30px" icon-class="stock"/>
                <span style="line-height:30px;">市值</span>
              </div>
           </div>
          <asset-Persent height='100%' id="keybord"></asset-Persent>
          </div>
      </dashcard>
      <dashcard :contextHeight="'100%'" class="dashcard-bottom-left">
         <div slot="context" style="height: 100%;">
           <div style="height: 30px;padding-left:10px">
             <div style="height: 30px;width:100px" class="chart-div" @click="text()">
               <svg-icon class="icon-space" style="line-height:30px" icon-class="bail"/>
               <span style="line-height:30px">委托笔数</span>
             </div>
          </div>
            <line-Chart height='90%' width='95%' id="keybord"></line-Chart>
          </div>
      </dashcard>
      <dashcard :contextHeight="'100%'" class="dashcard-bottom-right">
         <div slot="context" style="height: 100%">
           <div style="height: 30px;padding-left:10px">
            <div style="height: 30px;width:100px" class="chart-div" @click="text()">
              <svg-icon class="icon-space" style="line-height:30px" icon-class="deal"/>
              <span style="line-height:30px">成交笔数</span>
            </div>
          </div>
          <!-- <deal-Pie-Chart v-if="sysData.length > 1"  height='90%' width='100%' id='keyboard'></deal-Pie-Chart>
           <single-Sys-Deal v-if="sysData.length === 1"  height='90%' width='100%' id='keyboard'></single-Sys-Deal>
            <div v-if="sysData.length === 1" style="position: relative;top: -38px;width: 100%;height: 19px;">
              <div style="width: 100px;float: left;margin-left: 241px">
                <span>{{sysData[0].sysName}}</span>
              </div>
            </div> -->
            <line-Chart height='90%' width='95%' id="keybord"></line-Chart>
          </div>
      </dashcard>

    </div>
  </div>
</template>

<script>
import dashcard from '@/common/components/dashCard'
// import barchart from '@/components/Charts/BarChart'
import { mapGetters } from 'vuex'
import customerCount from './compoments/customerCount'
import assetPersent from './compoments/assetPersent'
import lineChart from './compoments/lineChart'
// import barChart from './compoments/barChart'
// import singleSysBar from './compoments/singleSysBar'
// import singleSysMarketVal from './compoments/singleSysMarketVal'
// import singleSysBail from './compoments/singleSysBail'
// import singleSysDeal from './compoments/singleSysDeal'

export default {
    name: 'singleCustomer',
    inject: ['reload'],
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
                userName: '东方明珠',
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
                    card: [{ 'name': '111' }, { 'name': '111' }, { 'name': '111' }]
                }
                // {
                //   sysName: '融资融券交易系统',
                //   color: '#FF852F',
                //   card: [{ 'name': '111' }, { 'name': '111' }, { 'name': '111' }, { 'name': '111' }]
                // }
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
        customerCount,
        assetPersent,
        lineChart
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
                this.centuralTrading = true
                this.marginTrading = false
            } else if (data.sysName === '融资融券交易系统') {
                this.marginTrading = true
                this.centuralTrading = false
                this.reload()
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
  height: 50px;
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
      // top: -20px;
      position: relative;
      margin-top: 15px;
      // margin-left: 6px;
    //  margin-right: 10px;
      color: #000000;
  }
}
.dashcard-bottom{
  float: left;
  width: calc(50% - 5px);
  height: calc(100% - 300px);
  margin-right: 10px;
  margin-top: 10px;
}

.dashcard-right{
  float: left;
  width: calc(50% - 5px);
  height: calc(100% - 300px);
  // margin-right: 10px;
  // background-color: #ECECEC;
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
  height: calc(100% - 290px);
  margin-right: 10px;
  margin-top: 10px;
}

.dashcard-bottom-right{
  float: left;
  width: calc(50% - 5px);
  height: calc(100% - 290px);
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
