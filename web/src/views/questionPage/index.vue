<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container" style="padding-bottom: 60px; ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: './' }">题库</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 20px;line-height:0.5;">题目名</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content topic_window" >
            <div class="question-intr mt2 mb2">
              <div class="subject-item-wrap" align="left">
                <div>时间限制：1111 s</div>
                <div>空间限制：1111 M</div>
                <div>热度指数：1111</div>
                <div>知识点：<el-tag>知识点标签</el-tag></div>
              </div>
            </div>
            <h3 class="subject-item-title" align="left">题目描述</h3>
            <div align="left">
              题目描述题目描述题目描述题目描述题目描述题目描述
              题目描述题目描述题目描述题目描述题目描述题目描述
              题目描述题目描述题目描述题目描述题目描述题目描述
            </div>
            <h3 class="subject-item-title" align="left">输入描述</h3>
            <div class="intro" align="left">
              输入描述输入描述输入描述输入描述输入描述输入描述
              输入描述输入描述输入描述输入描述输入描述输入描述
              输入描述输入描述输入描述输入描述输入描述输入描述
            </div>
            <h3 class="subject-item-title" align="left">输出描述</h3>
            <div class="intro" align="left">
              输出描述输出描述输出描述输出描述输出描述输出描述
              输出描述输出描述输出描述输出描述输出描述输出描述
              输出描述输出描述输出描述输出描述输出描述输出描述
            </div>
            <h3 class="subject-item-title" align="left">示例</h3>
            <div class="intro" align="left">
              输入输入输入
              输入输入输入
              输出输出输出
              输出输出输出
            </div>
          </div>
        </el-col>
        <el-col :span="12" align="left">
          <div class="grid-content topic_window">
            <div class="code-mirror-div">
              <div class="tool-bar" style="">
                <span style="color: whitesmoke;font-size:14px">编程语言</span>
                <el-select
                  v-model="cmEditorMode"
                  size="mini"
                  style="width:100px"
                  @change="onEditorModeChange">
                  <el-option
                    v-for="item in cmEditorModeOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </div>
              <my_cm  class="code-edit"
                      ref="cmEditor"
                      :cmTheme="cmTheme"
                      :cmMode="cmMode"
                      :value="curCode">
              </my_cm>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" class="topic_tool_bar">
          <div class="tool_item">
            <a href="" target="_blank"><i class="el-icon-s-opportunity"></i>题解</a>
          </div>
          <div class="tool_item">
            <a href="" target="_blank"><i class="el-icon-s-comment"></i>讨论</a>
          </div>
          <div class="tool_item">
            <a href="" target="_blank"><i class="el-icon-edit"></i>笔记</a>
          </div>
        </el-col>
        <el-col :span="12" class="code_tool_bar" align="left">
          <el-button type="primary" style="padding: 10px;">保存并提交代码</el-button>
        </el-col>
      </el-row>
    </div>



  </div>
</template>

<script>

    export default {
        name: "index",
      data() {
        return {
          curCode: '# code here!',
          cmTheme: "blackboard", // codeMirror主题
          cmEditorMode: "Python(3.6)", // 编辑模式
          // 编辑模式选项
          cmEditorModeOptions: [
            "Python(3.6)",
            "Javac(1.8)",
            "C++11(clang++3.9)",
            "sql",
          ],
          cmMode: "python", //codeMirror模式
        };
      },
      methods: {
        // 切换语言
        onEditorModeChange(value) {
          switch (value) {
            case "Python(3.6)":
              this.cmMode = "python";
              break;
            case "Javac(1.8)":
              this.cmMode = 'text/x-java';
              break;
            case "C++11(clang++3.9)":
              this.cmMode = 'text/x-c++src';
              break;
            case "sql":
              this.cmMode = "sql";
              break;
            default:
              this.cmMode = "python";
          }
        },
        //获取内容
        getValue() {
          let content = this.$refs.cmEditor.getValue();
          console.log(content);
        },
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

  .question-intr {
    border-radius: 4px;
    border: 1px solid #ddd;
    background: #ebebeb;
    padding: 10px;
    line-height: 1.8;
    margin-bottom: 10px;
    font-size: 14px;
  }
  .mb2 {
    margin-bottom: 10px;
  }
  .mt2 {
    margin-top: 10px;
  }

  .intro {
    font-size: 14px;
    position: relative;
    border-left: 2px solid #1abc9c;
    padding: 10px 0 10px 10px;
    margin: .8em 0;
    background: #fafafa;
    word-break: break-word;
  }
  .topic_window{
    height: 450px;
    overflow-y: auto;
  }
  .topic_tool_bar{
    z-index:10;   //保持在上层
    position: fixed;
    left: 0;
    bottom: 0;
    height: 50px;
    width: 51%;
    margin-bottom: 0;
    background: #e6e6e6;
    box-sizing: border-box;
    padding: 12px 20px 12px 15px;
    color: #666666;
    font-size: 14px;
    box-shadow: none;
  }
  .code_tool_bar{
    z-index:10;   //保持在上层
    position: fixed;
    bottom: 0;
    right: 0;
    margin-left: 5px;
    margin-bottom: 0;
    background: #eeeeee;
    height: 50px;
    width: 49%;
    padding: 12px 20px 12px 15px;
    color: white;
    font-size: 14px;
  }
  .tool_item{
    margin-right: 10px;
    display: inline-block;
  }

  .code-mirror-div {
    background-color: black;
    .tool-bar {
      top: 20px;
      margin-left: 20px;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }




</style>
