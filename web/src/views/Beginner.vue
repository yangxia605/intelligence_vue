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
              v-model="search"
            />
            <button @click>搜索</button>
          </div>
        </el-menu>
      </el-col>
    </el-row>

    <span height="2px" style="color:#000"></span>
    <div class="problem-container">
      <div class="module-head clearfix">
        <h1>全部编程题目</h1>
      </div>
      <div class="module-body">
        <div class="coding-search" style="height:auto"></div>
        <div class="coding-table-box">
          <el-table :data="tableData" stripe="true" style="width:100%">
            <el-table-column prop="pid" label="题号"></el-table-column>
            <el-table-column prop="pname" label="题目"></el-table-column>
            <el-table-column prop="tname" label="知识点"></el-table-column>
            <el-table-column prop="level" label="难度"></el-table-column>
            <el-table-column prop="prate" label="通过率"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
export default {
  data() {
      return {
        tableData:[
          {
          pid: 'OR176',
          pname: '连续子数组最大和',
          tname: '动态规划',
          level: '简单',
          prate: '24.53%'
        },
        {
          pid: 'OR176',
          pname: '连续子数组最大和',
          tname: '动态规划',
          level: '简单',
          prate: '24.53%'
        },
        {
          pid: 'OR176',
          pname: '连续子数组最大和',
          tname: '动态规划',
          level: '简单',
          prate: '24.53%'
        },
        {
          pid: 'OR176',
          pname: '连续子数组最大和',
          tname: '动态规划',
          level: '简单',
          prate: '24.53%'
        },
        {
          pid: 'OR176',
          pname: '连续子数组最大和',
          tname: '动态规划',
          level: '简单',
          prate: '24.53%'
        }
        ]
      }
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
  created() {
    this.getBreadcrumb()
  },
  methods: {
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
    }
  }
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

<script>
export default {};
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
</style>

<style>
.module-head {
  padding: 15px 20px 0;
  line-height: normal;
  position: relative;
}
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
  &:last-child {
    margin-bottom: 0;
  }
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
</style>