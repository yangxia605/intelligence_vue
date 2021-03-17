<template>
  <div class="dashboard-container">
  <div class="dashboard-editor-container">
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '#' }">我的信息</el-breadcrumb-item>
        <el-breadcrumb-item>基本资料</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-divider></el-divider>
    <el-row>
        <el-col :span="5">
          <el-card :body-style="{ padding: '0px' }">
            <img src="static\person.jpg" class="image">
            <div style="padding: 14px;">
              <span style="line-height: 1.7;font-size: 30px">{{userInfo.username}}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="5" offset="1">
          <el-card class="box-card"  :body-style="{ padding: '0px' }">
            <div class="text item"  align="left"><i class="el-icon-user">性别：{{userInfo.gender}}</i></div>
            <div class="text item"  align="left"><i class="el-icon-place">地区：{{userInfo.location}}</i></div>
            <div class="text item"  align="left"><i class="el-icon-message">邮件：{{userInfo.email}}</i></div>
            <div class="text item"  align="left"><i class="el-icon-suitcase">职业：{{userInfo.career}}</i></div>
          </el-card>
        </el-col>
        <el-col :span="10" offset="1">
          <el-card class="box-card"  :body-style="{ padding: '0px' }">
            <div slot="header" class="clearfix" align="left" style="font-size: 20px"><span>个人简介</span></div>
            <div class="text item"  align="left">{{userInfo.intro}}</div>
          </el-card>
        </el-col>
    </el-row>
    <el-divider></el-divider>

    <el-row>
      <div class="col-xs-12">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '#' }">我的信息</el-breadcrumb-item>
          <el-breadcrumb-item>收藏题目</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <div>
        <commonTable :columns="favoritecolumns" :data="favoriteData" :pager="favoritepage"
                     v-loading="listLoading"
                     @handleSizeChange="handleSizeChange"
                     @handleCurrentChange="handleCurrentChange">
        </commonTable>
      </div>
    </el-row>


    <el-row>
      <div class="col-xs-12">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '#' }">我的信息</el-breadcrumb-item>
          <el-breadcrumb-item>做题记录</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-row>
    <el-divider></el-divider>



  </div>
  </div>
</template>

<script>
import { getfavoritetopics } from '@/api/table'
import axios from "axios";

  export default {
      name: "aboutMe",

      data() {
        return {
          listLoading: true,
          // 收藏题目table格式
          favoritecolumns: [
            {prop: 'id', show: false},
            {prop: 'topic_name', label: '题目名', align: 'center', url: true},
            {prop: 'time_limit', label: '时间限制', width: '200', align: 'center', url: false},
            {prop: 'space_limit', label: '空间限制', width: '200', align: 'center', url: false}
          ],
          favoriteData: [],
          favoritepage: {
            pageNo: 1,
            pageSize: 5,
            sizes: [5, 10, 50, 100],
            total: 0
          },
          userInfo: {}
        }
      },
      created() {
        this.fetchData()
      },
      mounted(){},
      methods: {
        fetchData(){
          this.favoriteTopicData();
          this.userData();
        },
        userData(){
          axios.get("http://localhost:8080/userInfo").then(res => {
            this.userInfo = res.data;

            this.page.total = this.favoriteData.length;
          }).catch(() => {
          })
        },
        favoriteTopicData(){
          this.listLoading = true
          // todo:getKPTopic
          // todo:getKP
          // 获取题目信息
          axios.get("http://localhost:8080/favoritetopics").then(res => {
            this.favoriteData = res.data;
            /*
            // todo: 获取topic部分信息（id name timelimit spacelimit）
            // todo: 获取每一topic的KP
            // this.topicsData = response.data.items
            */
            this.page.total = this.favoriteData.length;
            this.listLoading = false
          }).catch(() => {
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
