<template>
    <div>
      <div class="dash-card">
        <!-- <div class="dash-header">
          <div class="block"></div>
          <label class="header-text">{{cardTitle}}</label>
        </div> -->
        <div class="dash-context" :style="{height:contextHeight}">
          <slot name="context"></slot>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'dashCard',
        props: {
            cardTitle: {
                type: String,
                default: ''
            },
            contextHeight: {
                type: String,
                default: '100%'
            },
            bgcolor: {
                type: String,
                default: '#fff'
            }
        },
        data() {
            return {
            }
        },
        computed: {
        },
        methods: {
        }
    }
</script>

<style rel="stylesheet/scss"  type="text/scss" lang="scss" scoped>
.dash-card{
  width: 100%;
  height: 100%;
  border: 1px solid #ECECEC;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  .dash-header{
    height: 45px;
    background-color:#fff;
    .block{
      display: inline-block;
      width: 5px;
      height: 25px;
      background-color: #29CBB0;
      margin-top: 10px;
      margin-left: 20px;
    }
    .header-text{
      display: inline-block;
      vertical-align: middle;
      margin-top: -13px;
      margin-left: 5px;
    }
  }
  .dash-context{
    background-color: bgcolor
  }
}
</style>
