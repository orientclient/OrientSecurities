<template>
  <div ref="selectTable" class="select-table" @click="changIcon">
    <el-input
      class="select-input"
      :placeholder="selectTip"
      readonly="true"
      :suffix-icon="icon"
      v-model="selected">
    </el-input>
    <div class="table-area" v-show="showTable" :style="tablePosition" v-loading.body="loading" @click.stop>
      <el-table class="table-norm"
        :data="tableData"
        height="300"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="指标名称">
        </el-table-column>
        <el-table-column
          prop="type"
          label="数据类型">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="指标单位">
        </el-table-column>
      </el-table>
      <div style="width: 100%;background-color: #fff">
        <el-button  style="width: 80px;margin-top: 5px;margin-bottom: 5px;" v-waves class="primary-btn" @click="confimTable">
          确认
        </el-button>
        <el-button  style="width: 80px" v-waves plain class="plain-btn" @click="hideTable">
          取消
        </el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'selectTable',
    props: {
      tableData: {
        type: Array,
        default: []
      },
      loading: {
        type: Boolean,
        default: []
      },
      dataIndex: {
        type: Number,
        default: null
      }
    },
    computed: {

    },
    data() {
      return {
        icon: 'el-icon-arrow-down',
        selectTip: '请选择',
        selected: null,
        showTable: false,
        tablePosition: null,
        multipleSelection: []
      }
    },
    methods: {
      changIcon() {
        if (this.icon === 'el-icon-arrow-down') {
          this.calculatePosition()
          this.$emit('changeYScroll', true)
          this.icon = 'el-icon-arrow-up'
          this.$emit('queryTable')
          this.showTable = true
        } else {
          this.$emit('changeYScroll', false)
          this.icon = 'el-icon-arrow-down'
          this.showTable = false
        }
      },
      calculatePosition() {
        const x = this.$el.getBoundingClientRect().x
        let y = this.$el.getBoundingClientRect().y + this.$el.clientHeight
        if (window.innerHeight - y < 350) {
          y = this.$el.getBoundingClientRect().y - 360
        }
        this.tablePosition = 'left: ' + x + 'px;top: ' + y + 'px'
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      hideTable() {
        this.showTable = false
        this.selectTip = '请选择'
        this.icon = 'el-icon-arrow-down'
      },
      confimTable() {
        this.showTable = false
        this.icon = 'el-icon-arrow-down'
        this.selectTip = '已选择' + this.multipleSelection.length + '条'
        this.$emit('affirmSelect', this.multipleSelection, this.dataIndex)
      }
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
.select-table{
  .table-area{
    width: 500px;
    position: fixed;
    z-index: 999;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
