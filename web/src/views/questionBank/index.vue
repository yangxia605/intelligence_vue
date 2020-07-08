<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '#' }">题库</el-breadcrumb-item>
          <el-breadcrumb-item>全部题目</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <div>
          <commonTable :columns="columns" :data="topicsData" :pager="page"
                       v-loading="listLoading"
                       @handleSizeChange="handleSizeChange"
                       @handleCurrentChange="handleCurrentChange">
          </commonTable>
        </div>
      </el-row>

    </div>
  </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>

  import { getAllTopics } from '@/api/table'
  import axios from "axios";

  export default {
        name: "questionBank",
      data() {
        return {
          listLoading: true,
          // 收藏题目table格式
          columns: [
            {prop: 'id', show: false},
            {prop: 'topic_name', label: '题目名', align: 'center', url: true},
            {prop: 'time_limit', label: '时间限制', width: '200', align: 'center', url: false},
            {prop: 'space_limit', label: '空间限制', width: '200', align: 'center', url: false}
            //{prop: 'kps', label: '知识点', align: 'center'}
          ],
          topicsData: [],
          page: {
            pageNo: 1,
            pageSize: 5,
            sizes: [5, 10, 50, 100],
            total: 0
          }
        }
      },
      created() {
        this.fetchData()
      },
      mounted(){},
      methods: {
        fetchData(){
          this.listLoading = true
          // todo:getKPTopic
          // todo:getKP
          // 获取题目信息
          var that = this;
          axios.get("http://localhost:8080/alltopics").then(res => {
            this.topicsData = res.data;
            /*
            // todo: 获取topic部分信息（id name timelimit spacelimit）
            // todo: 获取每一topic的KP
            // this.topicsData = response.data.items
            */
            this.page.total = this.topicsData.length;
            this.listLoading = false
          }).catch(() => {
            this.listLoading = false
          })


        },
        // 重新渲染topic_name列
        formatter(row, column, cellValue) {
          return 'hello' + row.topic_name;
        },
        // 改变页面大小处理
        handleSizeChange(val) {
          this.pageNo = 1;
          this.pageSize = val;
        },
        // 翻页处理
        handleCurrentChange(val) {
          this.pageNo = val;
        },
        editTableData(row) {}
      }
    }
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }

  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  // el-card style
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .text {
    font-size: 15px;
  }
  .item {
    padding: 18px 0;
    margin-left: 20px;
  }

</style>

