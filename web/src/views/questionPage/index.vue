<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container" style="padding-bottom: 60px; ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: './' }">题库</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 20px;line-height:0.5;">{{topicData.topicName}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>

      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content topic_window" >
            <div class="question-intr mt2 mb2">
              <div class="subject-item-wrap" align="left">
                <div>时间限制：{{topicData.timeLimit}} s</div>
                <div>空间限制：{{topicData.spaceLimit}} M</div>
                <div>热度指数：1111</div>
                <div>知识点：<el-tag>知识点标签</el-tag></div>
              </div>
            </div>
            <h3 class="subject-item-title" align="left">题目描述</h3>
            <div align="left">
              {{topicData.topicIntro}}
            </div>
            <h3 class="subject-item-title" align="left">输入描述</h3>
            <div class="intro" align="left">
              {{topicData.inputIntro}}
            </div>
            <h3 class="subject-item-title" align="left">输出描述</h3>
            <div class="intro" align="left">
              {{topicData.outputIntro}}
            </div>
            <h3 class="subject-item-title" align="left">示例</h3>
            <div class="intro" align="left">
              {{topicData.topicPs}}
            </div>
          </div>
        </el-col>
        <el-col :span="12" align="left" >
          <div class="grid-content topic_window"  >
            <div class="code-mirror-div" >
              <my_cm  class="code-edit"
                      ref="cmEditor"
                      :cmTheme="cmTheme"
                      :cmMode="cmMode"
                      :value="curCode"
                      >
              </my_cm>

            </div>


          </div>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" class="topic_tool_bar">
          <div class="tool_item">
            <a href="#" target="_blank"><i class="el-icon-s-opportunity"></i>题解</a>
          </div>
          <div class="tool_item">
            <a href="#" target="_blank"><i class="el-icon-s-comment"></i>讨论</a>
          </div>
          <div class="tool_item">
            <a href="#" target="_blank"><i class="el-icon-edit"></i>笔记</a>
          </div>
          <div class="tool_item">
            <a v-if="topicData.favorite" @click="cancelFav"><i class="el-icon-star-on"></i>取消收藏</a>
            <a v-else  @click="addFav"><i class="el-icon-star-off"></i>添加收藏</a>
          </div>
        </el-col>
        <el-col :span="12" class="code_tool_bar" align="left">
          <el-button type="primary" style="padding: 10px;"   @click="createSubBox">保存并提交代码</el-button>
          <el-button type="success" v-if='subStatus' style="padding: 10px; " @click="getAnswerStatus">查看提交结果</el-button>
<!--          <el-button id="switch" type="success"   style="padding: 10px;margin-left: 100px"@click="gotoPage()">单步执行可视化</el-button>-->
        </el-col>
      </el-row>
    </div>



  </div>
</template>

<script>

    import axios from "axios"

    export default {
        name: "index",
      data() {
        return {
          topicData: {
            id: 0,
            topicName: '题目名',
            timeLimit: '1111',
            spaceLimit: '1111',
            topicIntro: '获取题目描述...',
            inputIntro: '获取输入描述...',
            outputIntro: '获取输出描述...',
            topicPs: '获取示例...',
            favorite: false
          },

          subStatus: false,  //提交代码状态
          answerId: 0,
          getanswerStatus: false,   //获取反馈状态

          AnswerData: {
            topicID: '',
            content: '',
            languageID: 0,
            languageName: ''
          },

          answerStatusData: {
            answerStatus: '',
            answerStatusMsg:'',
            executeDetailMsg:'',
          },



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
          // showVis: false,
          // showCode:true
        };
      },
      created() {
          this.fenchData()
      },
      destroyed(){
        clearInterval(this.myInterval)
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
          return content
        },
        fenchData() {
          let topicID = this.$route.params.topicId
          this.$store.dispatch('topics/getTopicInfo', {topicID: topicID}).then(data => {
            this.topicData.id = data.id
            this.topicData.topicName = data.topicName
            this.topicData.timeLimit = data.timeLimit
            this.topicData.spaceLimit = data.spaceLimit
            this.topicData.topicIntro = data.topicIntro
            this.topicData.inputIntro = data.inputIntro
            this.topicData.outputIntro = data.outputIntro
            this.topicData.topicPs = data.topicPs
            this.topicData.favorite = data.favorite
          }).catch(error => {
          })
        },
        cancelFav() {
          let topicID = this.$route.params.topicId
          this.$store.dispatch('topics/cancelFav', {topicID: topicID}).then(data => {
            if (data.success) {
              this.topicData.favorite = false
            }
          }).catch(error => {
          })
        },
        addFav() {
          let topicID = this.$route.params.topicId
          this.$store.dispatch('topics/addFav', {topicID: topicID}).then(data => {
            if (data.success) {
              this.topicData.favorite = true
            }
          }).catch(error => {
          })
        },
        submitAnswer() {
          this.subStatus = false
          this.answerId = 0
          let formdata = new FormData()
          const content = this.getValue()
          if (content) {
            formdata.append('topicId', this.$route.params.topicId)
            formdata.append('content', content)
            this.AnswerData.topicID = this.$route.params.topicId
            this.AnswerData.content = content
            let languageType = this.cmMode
            if (languageType === 'python') {
              formdata.append('languageName', 'PYTHON')
              formdata.append('languageId', 3)
              this.AnswerData.languageName = 'PYTHON'
              this.AnswerData.languageId = 3
            } else if (languageType === 'text/x-java') {
              formdata.append('languageName', 'JAVA')
              formdata.append('languageId', 1)
              this.AnswerData.languageName = 'JAVA'
              this.AnswerData.languageId = 1
            } else if (languageType === 'text/x-c++src') {
              formdata.append('languageName', 'C++')
              formdata.append('languageId', 2)
              this.AnswerData.languageName = 'C++'
              this.AnswerData.languageId = 2
            } else {
              formdata.append('languageName', 'Others')
              formdata.append('languageId', 0)
              this.AnswerData.languageName = 'Others'
              this.AnswerData.languageId = 0
            }

            this.$store.dispatch('topics/submitAnswer', formdata).then(data => {
              if (data.success) {
                this.subStatus = true
                this.answerId = data.data["answerId"]
              }
            }).catch(error => {
            })
          } else {
          }
        },
        getAnswerStatus() {
          this.getanswerStatus = false
          let result = "<strong>代码正在执行，请稍后查看运行结果...</strong>"

          this.$store.dispatch('topics/getAnswerStatus', {answerId: this.answerId}).then(data => {
            if (data.success) {
              this.getanswerStatus = true
              this.answerStatusData.answerStatus = data.data['answerStatus']
              this.answerStatusData.answerStatusMsg = data.data['answerStatusMsg']
              this.answerStatusData.executeDetailMsg = data.data['executeDetailMsg']
              if (!data.data['answerStatus']) {
                result = '<strong>答题情况: </strong><strong style="color:red">Failed!</strong><br/>' +
                  '<strong>DetailInfo: </strong><strong style="color:orange">' + this.answerStatusData.executeDetailMsg + '</strong><br/>'
              } else {
                result = '<strong  style="color:green">Accpted!</strong><br/>'
              }
              this.createResultBox(result)
            }
          }).catch(error => {
            result = '<strong>获取失败</strong>'
            this.createResultBox(result)
          })

        },
        createSubBox() {
          const h = this.$createElement;
          this.$msgbox({
            title: '提交代码',
            message: "确认是否提交代码",
            showCancelButton: true,
            confirmButtonText: '确定提交',
            cancelButtonText: '取消',
            closeOnClickModal: false,
            closeOnPressEscape: false,
            closeOnHashChange: false,
            confirmButtonClass: false,
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.message = "提交代码中，请勿关闭弹窗..."
                instance.confirmButtonLoading = true;
                instance.showCancelButton = false
                instance.showClose = false
                instance.confirmButtonText = '执行中...';

                //提交代码
                this.submitAnswer()

                setTimeout(() => {

                  if (this.subStatus) {
                    setTimeout(() => {
                      instance.showCancelButton = true
                      instance.showClose = true
                      instance.showConfirmButton = false
                      instance.confirmButtonLoading = false;
                      instance.message = "提交成功，关闭弹窗查看答题情况"
                      instance.cancelButtonText = '查看答题情况'
                    }, 300);
                  } else {
                    setTimeout(() => {
                      instance.showCancelButton = true
                      instance.showClose = true
                      instance.confirmButtonLoading = false;
                      instance.message = "提交失败，是否再次尝试"
                      instance.confirmButtonText = '再次提交';
                    }, 300);
                  }
                }, 2000);
              } else {
                done();//关闭弹窗
              }
            },
          }).then(() => {

          }).catch(e => e);
        },
        createResultBox(result) {
          if (this.answerId !== 0 && this.subStatus) {
            this.$alert(
              result,
              '答题情况',
              {
                dangerouslyUseHTMLString: true
              }).catch(e => e);
          } else {
            this.$alert(
              '<strong>尚未提交代码，请重新提交代码</strong>',
              '答题情况',
              {
                dangerouslyUseHTMLString: true
              }).catch(e => e);
          }
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
