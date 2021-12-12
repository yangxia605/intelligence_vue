<template>
  <div class="dashboard-container">
      <el-col :span="7" >
        <div class="grid-content topic_window" >
          <div class="question-intr mt2 mb2">
            <div class="subject-item-wrap" align="left">
              <div style="margin-top: 40px;color: white">Python示例：<el-tag>Memoized Fibonacci</el-tag></div>
              <div id='exa' style="white-space: pre-wrap;background-color: white;color: #2d3a4b;margin-top: 40px;margin-right: 20px;font-family: Georgia;font-size: small" >{{topicData.content}}</div>
              <el-button type="primary" icon="el-icon-document-copy" style="padding: 10px; margin-top: 20px; margin-left: 150px"   @click="copyExample">复制</el-button>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="17" align="left" >
        <div class="grid-content topic_window" >
          <div class="question-intr mt2 mb2">
            <div class="subject-item-wrap" align="left">
              <div id="iframe-container" >
                <iframe :src="this.$route.meta.link"  scrolling="auto" frameborder="0" id="iframe" style="width:1000px;height:650px;margin-top: 60px"></iframe>
              </div>
            </div>
          </div>
        </div>
      </el-col>

  </div>
</template>

<script>
import { getfavoritetopics } from '@/api/table'
import axios from "axios";

export default {
  name: "LinkHome",

  data() {
    return {
      showExa:true,
      topicData: {
        content:
        '# use memoization to make the recursive Fibonacci\n' +
          '# implementation only take O(n) time and space\n' +
          '\n' +
          'MemoTable = {}\n' +
          '\n' +
          'def MemoizedFib(n):\n' +
          '    if n <= 2:\n' +
          '        return 1\n' +
          '\n' +
          '    if n in MemoTable:\n' +
          '        return MemoTable[n]\n' +
          '\n' +
          '    MemoTable[n] = MemoizedFib(n-1) + MemoizedFib(n-2)\n' +
          '    return MemoTable[n]\n' +
          '\n' +
          '\n' +
          'res = MemoizedFib(10)'
      }
    }
  },
  methods: {
    copyExample(){
      this.showExa=false;
      this.$copyText(this.topicData.content).then( e => {
        alert('复制成功')
        console.log(e)
      }, function (e) {
        alert('复制失败')
        console.log(e)
      })

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
    editTableData(row) {
    }
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
