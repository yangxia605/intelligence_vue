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

<script>

  import { getAllTopics } from '@/api/table'

  export default {
        name: "questionBank",
      data() {
        return {
          listLoading: true,
          // 收藏题目table格式
          columns: [
            {prop: 'topic_name', label: '题目名', width: '400', align: 'center'},
            {prop: 'time_limit', label: '时间限制', width: '200', align: 'center'},
            {prop: 'space_limit', label: '空间限制', width: '200', align: 'center'},
            {prop: 'kps', label: '知识点', align: 'center'}
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
      mounted: {
      },
      methods: {
        fetchData(){
          this.listLoading = true
          // todo:getKPTopic
          // todo:getKP
          // 获取题目信息
          getAllTopics().then(response => {
            this.topicsData = [
              {topic_name: 'A+B', time_limit: '1000', space_limit: '23102', kps:"排序"},
              {topic_name: '最大和', time_limit: '1020', space_limit: '21102', kps:"贪心"}
            ];
            /*
            // todo: 获取topic部分信息（id name timelimit spacelimit）
            // todo: 获取每一topic的KP
            // this.topicsData = response.data.items
            */
            this.page.total = this.topicsData.length;
            this.listLoading = false
          }).catch(() => {
            this.topicsData = [
              {topic_name: 'A+B', time_limit: '1000', space_limit: '23102', kps:"排序"},
              {topic_name: '最大和', time_limit: '1020', space_limit: '21102', kps:"贪心"},
              {topic_name: '最短路径', time_limit: '2310', space_limit: '15202', kps:"贪心"},
              {topic_name: '字符串查找', time_limit: '3210', space_limit: '23432', kps:"字符串 查找"},
              {topic_name: '替换空格', time_limit: '1023', space_limit: '17602', kps:"字符串"},
              {topic_name: '切割绳索', time_limit: '1960', space_limit: '32112', kps:"数组"}
            ];
            this.page.total = this.topicsData.length;
            this.listLoading = false
          })


        },
        // 重新渲染name列
        formatter(row, column, cellValue) {
          return 'hello ' + row.name;
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

