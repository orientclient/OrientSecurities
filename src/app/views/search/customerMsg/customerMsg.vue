<template>
  <div class="main-out" v-loading.body="listLoading" element-loading-text="加载中......" border fit highlight-current-row>
    <el-form class="u-form" :rules="addRules" :model="formData" ref="formData">
      <div class="top_div" style="height:60px">
        <div style="line-height:60px">
          <el-button
          style="width: 70px;
                 padding-left: 0px;
                 padding-right: 0px;
                 padding-top: 5px;
                 padding-bottom: 5px;
                 font-size: 13px;"
                 v-waves
                class="primary-btn-blue" @click="">
                查询条件
          </el-button>
          <el-button
          style="width: 70px;
                 padding-left: 0px;
                 padding-right: 0px;
                 padding-top: 5px;
                 padding-bottom: 5px;
                 font-size: 13px;"
                 v-waves
                class="primary-btn-blue" @click="">
                排序/过滤
          </el-button>
          <el-button
          style="width: 70px;
                 padding-left: 0px;
                 padding-right: 0px;
                 padding-top: 5px;
                 padding-bottom: 5px;
                 font-size: 13px;"
                 v-waves
                class="primary-btn-blue" @click="">
                合计
          </el-button>
          <div class="btn-block" style="height: 60px; width: 25%; float: right;">
            <el-button
            style="width: 70px;
                  padding-left: 0px;
                  padding-right: 0px;
                  padding-top: 5px;
                  padding-bottom: 5px;
                  font-size: 13px;
                  border-color: #1890FF;
                  color: #1890FF;"
                  v-waves
                  class="" @click="">
                  <svg-icon class="icon-space" icon-class="editIcon"/>
                  修改
            </el-button>
            <el-button
            style="width: 70px;
                  padding-left: 0px;
                  padding-right: 0px;
                  padding-top: 5px;
                  padding-bottom: 5px;
                  font-size: 13px;
                  border-color: #1890FF;
                  color: #1890FF;"
                  v-waves
                  class="" @click="">
                  <svg-icon class="icon-space" icon-class="plusIcon"/>
                  增加
            </el-button>
            <el-button
            style="width: 70px;
                  padding-left: 0px;
                  padding-right: 0px;
                  padding-top: 5px;
                  padding-bottom: 5px;
                  font-size: 13px;
                  border-color: #1890FF;
                  color: #1890FF;"
                  v-waves
                  class="" @click="">
                  <svg-icon class="icon-space" icon-class="deleteIcon"/>
                  删除
            </el-button>
            <el-button
            style="width: 70px;
                  padding-left: 0px;
                  padding-right: 0px;
                  padding-top: 5px;
                  padding-bottom: 5px;
                  font-size: 13px;
                  border-color: #1890FF;
                  color: #1890FF;"
                  v-waves
                  class="" @click="">
                  <svg-icon class="icon-space" icon-class="exportIcon"/>
                  导出
            </el-button>
          </div>
        </div>
      </div>
      <el-table
        class="table-norm"
        stripe
        header-cell-style="background-color:#cccccc;color:black"
        :data="tableData"
        style="width: 100%; border: 1px ">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="客户号"
          width="80px"
          >
        </el-table-column>
        <el-table-column
          prop="id"
          label="客户姓名"
          width="80px"
          >
        </el-table-column>
         <el-table-column
          prop="explainMsg"
          label="客户类别"
        width="100px">
         </el-table-column>
          <el-table-column
          prop="explainMsg"
          label="客户状态"
        width="100px">
         </el-table-column>
          <el-table-column
          prop="explainMsg"
          label="提款方式"
        width="100px">
         </el-table-column>
          <el-table-column
          prop="explainMsg"
          label="开户日期"
        width="120px">
         </el-table-column>
        <el-table-column
          prop="businessType"
          label="证件类别"
          width="100px"
          >
        </el-table-column>
        <el-table-column
          prop="functionName"
          label="证件号码"
          width="250px"
        >;
        </el-table-column>
        <el-table-column
          prop="explainMsg"
          label="联系电话"
        width="250px">
        </el-table-column>
        <el-table-column
           fixed="right"
           label="操作"
           width="100">
           <template slot-scope="scope">
           <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
        </el-table-column>
      </el-table>
      <paging :flipParam="getFlipParams" ref="pagingData" @refreshUserList="refreshUserList" @loadingList="loadingLoginOperationList" style="text-align: right;"></paging>
    </el-form>
  </div>
</template>

<script>
  import paging from '@/common/components/Paging'
  // import { showMessage, formatJson } from '@/utils/index'
  // import { chooseUserName, flipParam, queryTable } from '@/api/operationLog/index'
  export default {
      name: 'realTime',
      components: {
          paging
      },
      created() {
      },
      computed: {
      },
      data() {
          return {

          }
      },
      methods: {

      },
      mounted() {

      }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
.u-form{
  margin-top: 10px;
  padding-left: 10px;
}
.btn-block{
  .icon-space{
    width:13px;
    height:13px;
    color:#1890FF
  }
}
</style>
