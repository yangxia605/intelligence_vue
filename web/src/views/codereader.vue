<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container" style="">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '#' }">代码阅读</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 20px;line-height:0.5;">程序流程图</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row  style="padding-bottom:0">
        <div class="question-intr mt2 mb2">
          <div class="subject-item-wrap" align="left">
            <h3>函数调用：自动生成函数调用图</h3>
            <h3>代码结构：自动生成基于AST的代码结构流程图</h3>
            <h3>程序流程图：自动生成基于注释的程序流程图</h3>
            <li>代码注释：自动生成代码注释</li>
            <li>代码摘要：基于深度学习的代码摘要生成</li>
          </div>
        </div>
      </el-row>
      <el-tabs type="border-card" v-model="graphcards" @tab-click="handleClick">
        <el-tab-pane label="函数调用" name="callgraph">
          <h3 class="subject-item-title" align="left">函数调用</h3>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content topic_window" >
                <div align="left">
                  <img :src="callGraph_img" class="image">
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
                          ref="cmEditor_callGraph"
                          :cmTheme="cmTheme"
                          :cmMode="cmMode"
                          :editorValue="callgraph_code">
                  </my_cm>
                </div>
                <el-button type="primary" style="padding: 10px;"   @click="submitCode('callGraph')">提交代码生成函数调用图</el-button>
              </div>
            </el-col>

          </el-row>
        </el-tab-pane>
        <el-tab-pane label="代码结构" name="AST" @click="handleClick">
          <h3 class="subject-item-title" align="left">代码结构</h3>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content topic_window" >
                <div align="left">
                  <div id="AST_graph" class="svg"></div>
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
                          ref="cmEditor_AST"
                          :cmTheme="cmTheme"
                          :cmMode="cmMode"
                          :editorValue="AST_code">
                  </my_cm>
                </div>
                <el-button type="primary" style="padding: 10px;"   @click="submitCode('AST')">提交代码生成代码结构图</el-button>
              </div>
            </el-col>

          </el-row>
        </el-tab-pane>
        <el-tab-pane label="程序流程图" name="flowchart">
          <h3 class="subject-item-title" align="left">程序流程图</h3>
          <el-steps :active="active" finish-status="success"  align-center>
            <el-step title="代码注释生成"></el-step>
            <el-step title="程序流程图"></el-step>
          </el-steps>
          <div v-if="active > 0">
              <el-table
                v-model="sum_table"
                :data="sum_table"
                height="150"
                border
                :default-sort = "{prop: 'func_line'}"
                style="width: 100%">
                <el-table-column
                  prop="func_line"
                  label="行号"
                  sortable
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="func_name"
                  label="Func Name"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="sum"
                  label="摘要">
                </el-table-column>
              </el-table>
          </div>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content topic_window" >
                <div align="left">
                  <textarea v-if="active < 2" v-model="com_code" ref="com_code_textarea" class="textarea"><p>{{ com_code }}</p></textarea>
                  <el-button v-if="active < 2" type="primary" style="padding: 10px;"   @click="copyToClipboard('com_code_textarea')">复制</el-button>
                  <img :src="FC_img" class="image" v-if="active > 2">
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
                          ref="cmEditor_COM"
                          :cmTheme="cmTheme"
                          :cmMode="cmMode"
                          :editorValue="com_code_hit"
                          v-if="active < 2">
                  </my_cm>
                  <my_cm  class="code-edit"
                          ref="cmEditor_FC"
                          :cmTheme="cmTheme"
                          :cmMode="cmMode"
                          :editorValue="sum_code_hit"
                          v-if="active > 1">
                  </my_cm>
                </div>
                <el-button type="primary" style="padding: 10px;"   @click="submitCode('sum_code')" v-if="active < 2">提交代码生成代码注释</el-button>
                <el-button type="primary" style="padding: 10px;"   @click="submitCode('FC')" v-if="active > 1">提交注释代码生成流程图</el-button>
                <!--                <el-button style="margin-top: 12px;" @click="next" v-if="active == 0">下一步</el-button>-->
              </div>
            </el-col>
          </el-row>
          <el-button style="margin-top: 12px;" @click="forward" v-if="active > 0">上一步</el-button>
          <el-button style="margin-top: 12px;" @click="next" v-if="active < 3">下一步</el-button>
        </el-tab-pane>
      </el-tabs>



    </div>



  </div>
</template>

<script>

import axios from "axios"

export default {
  name: "codereader",
  data() {
    return {
      active: 0,
      graphcards: 'callgraph',
      callGraph_img: "",
      AST_img_code: "",
      FC_img: "",
      com_code_hit:
        '# Python is Supported Now\n' +
        '# code here',
      sum_code_hit:
        '# Code Comment is generated automatically\n' +
        '# add more comments',
      sum_table:[],
      graphCodeData: {
        graphtype: '',
        content: '',
        languageID: 0,
        languageName: ''
      },
      editorValue:  // 默认代码模板
        '# Python is Supported Now\n' +
        '# code here',
      callgraph_code: this.editorValue,
      AST_code: this.editorValue,
      com_code: this.editorValue,
      cmTheme: "blackboard", // codeMirror主题
      cmEditorMode: "Python(3.6)", // 编辑模式
      // 编辑模式选项
      cmEditorModeOptions: [
        "Python(3.6)"
      ],
      cmMode: "python", //codeMirror模式
    };
  },
  created() {
  },
  destroyed(){
    clearInterval(this.myInterval)
  },
  methods: {
    copyToClipboard(elemRef){
      let target;
      let succeed = false;
      if(this.$refs[elemRef]){
        target = this.$refs[elemRef];
        // 选择内容
        let currentFocus = document.activeElement;
        target.focus();
        target.setSelectionRange(0, target.value.length);
        // 复制内容
        try {
          succeed = document.execCommand("copy");
          this.$message("内容复制成功");
        } catch (e) {
          succeed = false;
        }
        // 恢复焦点
        if (currentFocus && typeof currentFocus.focus === "function") {
          currentFocus.focus();
        }
      }
      return succeed;
    },
    forward() {
      if (this.active > 0) this.active--;
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 切换语言
    onEditorModeChange(value) {
      switch (value) {
        case "Python(3.6)":
          this.cmMode = "python";
          break;
        default:
          this.cmMode = "python";
      }
    },
    //获取内容
    getValue() {
      let content = this.$refs.cmEditor.getValue();
      return content
    },
    ASTcode2graph(astcode){
      var chart;
      $("#AST_graph").html("");
      chart = flowchart.parse(astcode);
      // this.$message(astcode)
      chart.drawSVG('AST_graph', {'maxWidth': 500,//ensures the flowcharts fits within a certian width
        'line-length': 50,
        'text-margin': 10,
        'font-size': 14,
        'font': 'normal',
        'font-family': 'Helvetica',
        'font-weight': 'normal',
        'font-color': 'black',
        'line-color': 'black',
        'element-color': 'black',
        'fill': 'white',
        'yes-text': 'yes',
        'no-text': 'no',
        'arrow-end': 'block',
        'scale': 1,
        'symbols': {
        'start': {
          'font-color': 'red',
            'element-color': 'green',
            'fill': 'yellow'
        },
        'end':{
          'class': 'end-element'
        }
      },
        'flowstate' : {
          'past' : { 'fill' : '#CCCCCC', 'font-size' : 12},
          'current' : {'fill' : 'yellow', 'font-color' : 'red', 'font-weight' : 'bold'},
          'future' : { 'fill' : '#FFFF99'},
          'invalid': {'fill' : '#444444'},
          'approved' : { 'fill' : '#58C4A3', 'font-size' : 12, 'yes-text' : 'APPROVED', 'no-text' : 'n/a' },
          'rejected' : { 'fill' : '#C45879', 'font-size' : 12, 'yes-text' : 'n/a', 'no-text' : 'REJECTED' }
        }
    });
    },
    getcontent(graphtype){
      let content = ""
      if (graphtype==="callGraph") {
        content = this.$refs.cmEditor_callGraph.getValue();
      }else if(graphtype==="AST"){
        content = this.$refs.cmEditor_AST.getValue();
      }else if(graphtype==="sum_code"){
        content = this.$refs.cmEditor_COM.getValue();
      }else if(graphtype==="FC"){
        content = this.$refs.cmEditor_FC.getValue();
      }
      return content
    },
    submitCode(graphtype){
      this.subStatus = false
      let content = this.getcontent(graphtype)
      if(content){
        this.graphCodeData.graphtype = graphtype
        this.graphCodeData.content = content
        let languageType = this.cmMode
        if(languageType === 'python'){
          this.graphCodeData.languageName = 'PYTHON'
          this.graphCodeData.languageId = 3
        }else {
          this.graphCodeData.languageName = 'Others'
          this.graphCodeData.languageId = 0
        }

        if (graphtype==="callGraph") {
          this.$axios({
            url:"http://192.168.1.134:7777/submitCodecallGraph",
            method: 'post',
            responseType: 'blob',
            data: {
              graphtype: this.graphCodeData.graphtype,
              content: this.graphCodeData.content,
              languageName: this.graphCodeData.languageName,
              languageId: this.graphCodeData.languageId,
            },
          }).then(res => {
            this.callgraph_code = this.graphCodeData.content
            this.callGraph_img = window.URL.createObjectURL(res.data)
          }).catch(() => {
            this.$message("fail request")
          })
        }
        else if(graphtype==="AST"){
          this.$axios({
            url:"http://192.168.1.134:7777/submitCodeASTGraph",
            method: 'post',
            data: {
              graphtype: this.graphCodeData.graphtype,
              content: this.graphCodeData.content,
              languageName: this.graphCodeData.languageName,
              languageId: this.graphCodeData.languageId,
            },
          }).then(res => {
            let success = res.data["success"]
            this.AST_code = this.graphCodeData.content
            if (!success){
              this.$alert(res.data["information"])
            }else {
              this.AST_img_code = res.data["ASTfc_code"]
              this.ASTcode2graph(this.AST_img_code)
            }
          }).catch(() => {
            this.$message("Bad request. Check the code.")
          })
        }
        else if(graphtype==="sum_code"){
          this.$axios({
            url:"http://192.168.1.134:7777/submitCodeComment",
            method: 'post',
            data: {
              graphtype: this.graphCodeData.graphtype,
              content: this.graphCodeData.content,
              languageName: this.graphCodeData.languageName,
              languageId: this.graphCodeData.languageId,
            },
          }).then(res => {
            let success = res.data["success"]
            if (success){
              this.com_code_hit = this.graphCodeData.content
              this.com_code = res.data["com_code"]
              // this.$message("注释已生成")
              this.sum_code_hit = res.data["com_code"]
              this.active=1
              let fun_sums = res.data["fun_sum"]
              let sum_lines = res.data["sum_line"]
              let fun_names = res.data["func_name"]
              this.sum_table = []
              for(var i =0;i<fun_sums.length;i++){
                let item = {
                  func_line: sum_lines[i],
                  func_name: fun_names[i],
                  sum: fun_sums[i]
                }
                this.sum_table[i] = item
              }
            }
          }).catch(() => {
            this.$message("Bad request. Check the code.")
          })
        }
        else if(graphtype==="FC"){
          this.$axios({
            url:"http://192.168.1.134:7777/submitCodeFC",
            method: 'post',
            responseType: 'blob',
            data: {
              graphtype: this.graphCodeData.graphtype,
              content: this.graphCodeData.content,
              languageName: this.graphCodeData.languageName,
              languageId: this.graphCodeData.languageId,
            },
          }).then(res => {
            this.sum_code_hit = this.graphCodeData.content
            this.FC_img = window.URL.createObjectURL(res.data)
            this.active=3
          }).catch(() => {
            this.$message("fail request")
          })
        }

      }else {
        this.$message.error("代码不能为空")
      }
    },
  }
}
</script>
<style>
.svg{

}
</style>
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
  padding-bottom: 20%;
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
  height: 50%;
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
  .code-edit{

  }
}

.image{
  width: auto;
  max-width: 100%;
}
.textarea{
  width: 100%;
  height: auto;
  min-height: 350px;
}


</style>
