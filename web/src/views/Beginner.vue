<template>
  <div class="begin-container">
    <!-- <el-header style="text-align:left; color:#fff; font-size:32px;" direction="horizontal">
    <span>智慧编程</span>-->
    <!-- <el-dropdown>
        <template slot="title" style="color:#fff">题库</template>
        <el-dropdown-menu slot="1">
          <el-dropdown-item>在线编程</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>-->
    <div class="header">
      <el-row>
        <el-col :span="2">
          <div align="center">
            <img src="../assets/logo.png" title="智慧编程" height="25px" width="25px" />
            <span style="color:#fff">智慧编程</span>
          </div>
        </el-col>
        <el-col :span="22">
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#fff"
          >
            <el-menu-item index="1">首页</el-menu-item>
            <el-submenu index="2">
              <template slot="title">题库</template>
              <el-menu-item index="2-1">公司真题</el-menu-item>
              <el-menu-item index="2-2">专项训练</el-menu-item>
              <el-menu-item index="2-3">在线编程</el-menu-item>
              <el-menu-item index="2-4">模拟笔试</el-menu-item>
              <el-menu-item index="2-5">教材全解</el-menu-item>
              <el-menu-item index="2-6">考研真题</el-menu-item>
              <el-menu-item index="2-7">期末考题</el-menu-item>
              <el-menu-item index="2-8">精华专题</el-menu-item>
              <el-menu-item index="2-9">试题广场</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">面试</template>
              <el-menu-item index="3-1">AI模拟面试</el-menu-item>
              <el-menu-item index="3-2">面经汇总</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <a href target="_blank">学习</a>
              </template>
              <el-menu-item index="4-1">课程</el-menu-item>
              <el-menu-item index="4-2">专栏·文章</el-menu-item>
              <el-menu-item index="4-3">项目实战</el-menu-item>
              <el-menu-item index="4-4">图书馆</el-menu-item>
              <el-menu-item index="4-5">技术栈</el-menu-item>
            </el-submenu>
            <el-menu-item index="5">求职</el-menu-item>
            <el-submenu index="6">
              <template slot="title">讨论区</template>
              <el-menu-item index="6-1">讨论区</el-menu-item>
              <el-menu-item index="6-2">圈子</el-menu-item>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">发现</template>
              <el-menu-item index="7-1">竞赛</el-menu-item>
              <el-menu-item index="7-2">Offer神器</el-menu-item>
              <el-menu-item index="7-3">学生身份认证</el-menu-item>
              <el-menu-item index="7-4">牛人堂</el-menu-item>
              <el-menu-item index="7-5">牛币兑换中心</el-menu-item>
            </el-submenu>
            <div>
              <input
                type="text"
                name="search-bar"
                id
                placeholder="帖子、文章、试题"
                style="color:#000; text-color:ffd04b"
                align="right"
                v-model="search"
              />
              <button @click>搜索</button>
            </div>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="maintext">
      <div class="leading">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '#' }">题库</el-breadcrumb-item>
          <el-breadcrumb-item>全部题目</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="maincontent">
        <!-- 卡片视图 -->
        <el-card>
          <!--<el-row>
            <el-col>
              <el-button type="primary" >添加分类</el-button>
              <el-button type="primary" >添加分类</el-button>
            </el-col>
          </el-row>
          -->
          <!-- 表格 -->
          <div class="problem-container">
            <div class="module-head clearfix">
              <h1>全部编程题目</h1>
            </div>
            <div class="module-body">
              <div class="coding-search" style="height:auto"></div>
              <div class="coding-table-box">
                <el-button @click="resetPidFilter">清除题目过滤器</el-button>
                <el-button @click="resetLevelFilter">清除难度过滤器</el-button>
                <input
                  type="text"
                  name="search-bar"
                  id
                  placeholder="题目"
                  style="color:#000; text-color:ffd04b"
                  v-model="search"
                />
                <button @click>搜索</button>
                <el-table :data="tableData" stripe="true" style="width:100%"
                          :default-sort = "{prop: 'pid', order: 'descending'}">
                  <el-table-column prop="pid" label="题号" sortable>
                  </el-table-column>
                  <el-table-column prop="pname" label="题目"></el-table-column>
                  <el-table-column prop="tname" label="知识点"
                                   :filters="[{ text: '查找', value: '查找' }, { text: '排序', value: '排序' }, { text: '递归', value: '递归' }, { text: '贪心', value: '贪心' }, { text: '动态规划', value: '动态规划' }, { text: '分治', value: '分治' }, { text: '模拟', value: '模拟' }, { text: '穷举', value: '穷举' }, { text: '复杂度', value: '复杂度' }
                             ]"
                                   :filter-method="filterTag">
                  </el-table-column>
                  <el-table-column prop="level" label="难度"
                                   :filters="[{ text: '简单', value: '动态规划' }, { text: '动态规划', value: '动态规划' }]"
                                   :filter-method="filterTag">
                  </el-table-column>
                  <el-table-column prop="prate" label="通过率" sortable column-key='prate'></el-table-column>
                </el-table>
                <!--<el-pagination
                  background
                  layout="prev, pager, next"
                  :total="1000">
                </el-pagination>-->
                <!--<span class="demonstration">完整功能</span> -->
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage4"
                  :page-sizes="[100, 200, 300, 400]"
                  :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="400">
                </el-pagination>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="bar">
        <el-card>
          <section class="chart-container">
            <el-row>
              <el-col :span="12">
                <div id="chartPie" style="width:100%; height:400px;"></div>
              </el-col>
            </el-row>
          </section>
          <div class="staticmessage">
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  import pathToRegexp from 'path-to-regexp'
  import echarts from 'echarts'

  export default {
    data() {
      return {
        chartPie: null ,
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        tableData:[
          {
            pid: 'OR171',
            pname: '连续子数组最大和',
            tname: '动态规划',
            level: '简单',
            prate: '24.57%'
          },
          {
            pid: 'OR172',
            pname: '连续子数组最大和',
            tname: '动态规划',
            level: '简单',
            prate: '24.56%'
          },
          {
            pid: 'OR173',
            pname: '连续子数组最大和',
            tname: '动态规划',
            level: '简单',
            prate: '24.55%'
          },
          {
            pid: 'OR174',
            pname: '连续子数组最大和',
            tname: '动态规划',
            level: '简单',
            prate: '24.54%'
          },
          {
            pid: 'OR175',
            pname: '连续子数组最大和',
            tname: '动态规划',
            level: '简单',
            prate: '24.53%'
          }
        ]
      }
    },
    watch: {
      $route(route) {
        // if you go to the redirect page, do not update the breadcrumbs
        if (route.path.startsWith('/redirect/')) {
          return
        }
        this.getBreadcrumb()
      }
    },
    methods: {
      drawPieChart() {
        this.chartPie = echarts.init(document.getElementById('chartPie'));
        this.chartPie.setOption({
          title: {
            text: '',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['已通过', '未通过', '未提交']
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: 335, name: '已通过' },
                { value: 135, name: '未通过' },
                { value: 1548, name: '未提交' }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
      drawCharts() {
        this.drawPieChart()
      },
      getBreadcrumb() {
        // only show routes with meta.title
        let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
        const first = matched[0]
        if (!this.isDashboard(first)) {
          matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
        }
        this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      },
      isDashboard(route) {
        const name = route && route.name
        if (!name) {
          return false
        }
        return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
      },
      pathCompile(path) {
        // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
        const { params } = this.$route
        var toPath = pathToRegexp.compile(path)
        return toPath(params)
      },
      handleLink(item) {
        const { redirect, path } = item
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(this.pathCompile(path))
      },
      resetPidFilter() {
        this.$refs.filterTable.clearFilter('pid');
      },
      resetLevelFilter() {
        this.$refs.filterTable.clearFilter('level');
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    mounted: function () {
      this.drawCharts()
    },
  }

</script>

<style lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>

<style scoped>
  .header {
    background: #3d444c;
    width: 100%;
    z-index: 101;
    left: 0;
    margin-bottom: 30px;
  }
  .maincontent {
    width: 844px;
    margin-right: 16px;
    float: left;
    margin: 0 10px 0 0;
  }
  .bar {
    width: 340px;
    float: left;
  }
  .chart-container {
    height: 300px;
    user-select: none;
    position: relative;
    background: transparent none repeat scroll 0% 0%;
  }
  .el-col {
    padding: 30px 20px;
  }
  .list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
</style>

<style>
  .clearfix {
    display: block;
    zoom: 1;
    color: #fff;
  }
  .coding-search {
    padding: 0 16px;
    margin-bottom: 10px;
    height: 40px;
    font-size: 14px;
  }
  .coding-table-box {
    margin: 0 -16px;
  }
  .el-row {
    margin-bottom: 20px;
  }
  :last-child {
     margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
