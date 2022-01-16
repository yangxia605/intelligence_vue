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
                      ref="cmEditor_qb"
                      :cmTheme="cmTheme"
                      :cmMode="cmMode"
                      :editorValue="curCode"
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
            <el-button type="text" style="color: dimgray" @click="jumpDiscussionArea(0)"><i class="el-icon-s-comment"></i>讨论</el-button>
          </div>
          <div class="tool_item">
            <a href="#" target="_blank"><i class="el-icon-edit"></i>笔记</a>
          </div>
          <div class="tool_item">
            <a v-if="topicData.favorite" @click="cancelFav"><i class="el-icon-star-on"></i>取消收藏</a>
            <a v-else  @click="addFav"><i class="el-icon-star-off"></i>添加收藏</a>
          </div>
          <div class="tool_item">
            <router-link target="_blank" :to="{path:'/codereader'}">
              <i class="el-icon-s-opportunity"></i>代码阅读
            </router-link>
          </div>
        </el-col>
        <el-col :span="12" class="code_tool_bar" align="left">
          <el-button type="primary" style="padding: 10px;"   @click="createSubBox">保存并提交代码</el-button>
          <el-button type="success" v-if='subStatus' style="padding: 10px; " @click="getAnswerStatus">查看提交结果</el-button>
<!--          <el-button id="switch" type="success"   style="padding: 10px;margin-left: 100px"@click="gotoPage()">单步执行可视化</el-button>-->
        </el-col>
      </el-row>


      <!--讨论区界面-->
      <div class="discussion_area" style="text-align: left;width: 80%">
        <!--讨论区标题-->
        <div class="discussion_head">
          <div class="head_text" style="font-size: 28px;font-weight: bold;">
          <span>
            <i class="el-icon-chat-line-round"></i>
            讨论区
          </span>
            <!--显示查询到的讨论条数-->
            <span v-show=this.discussionStatus style="font-size: 16px;padding-left: 20px;color: gray;font-weight: normal">
            共有 {{this.discussionData.length}} 条讨论
          </span>
            <!--锚点定位到下方编辑框-->
            <el-tooltip class="item" effect="dark" content="添加新讨论" placement="bottom-start">
              <el-button
                type="success"
                size="middle"
                icon="el-icon-edit"
                circle
                style="margin-left: 10px;"
                @click="jumpDiscussionEditor(0)"
              >
              </el-button>
            </el-tooltip>
          </div>
          <el-divider></el-divider>
        </div>
        <!--讨论区内容-->
        <div class="discussion_content">
          <!--未查询到讨论记录-->
          <div v-if=!this.discussionStatus style="font-size: 26px;text-align: center;margin:80px;color: lightgray">
            <i class="el-icon-chat-round"></i>
            还没有人讨论，快来发布第一条吧~
          </div>
          <!--查询到多条讨论记录-->
          <div v-else style="font-size: 16px;font-weight: normal;padding-bottom: 20px">
            <!--显示主楼-->
            <div v-for="item in this.discussionData" class="main-discussion" style="padding: 0px;">
              <el-card class="box-card" shadow="never" style="min-height: 100px;min-width: 600px">
                <div style="padding: 14px;">
                  <!--用户头像设置-->
                  <!--<el-avatar :size="50" :src="circleUrl"></el-avatar>-->
                  <i class="el-icon-user-solid" style="font-size: 20px"></i>
                  <!--用户名-->
                  <span style="font-size: 20px;font-weight: bold;padding-left: 10px">{{item.discussionResponse.userId}}</span>
                </div>
                <!--内容-->
                <div class="bottom clearfix" style="font-size: 16px;padding-left: 40px;margin: 10px">
                  {{item.discussionResponse.content}}
                </div>
                <div style="float: right">
                  <!--提交时间-->
                  <span class="time" style="font-size: 12px;padding-right: 8px;color: gray">{{ item.discussionResponse.submitTime}}</span>
                  <!--点赞数，包括点赞事件-->
                  <el-button
                    type="text"
                    class="button"
                    style="padding-right: 8px;"
                    v-on:click="thumbUp(item,-1)"
                  >
                    <i class="el-icon-thumb"></i>
                    ({{item.discussionResponse.likeNum}})
                  </el-button>
                  <!--回复条数，包括添加回复-->
                  <el-popover
                    placement="bottom-end"
                    title="我的回复"
                    width="480"
                    trigger="click"
                    v-on:hide="reply_text = ''"
                  >
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 6}"
                      placeholder="写下你的回复…"
                      v-model="reply_text"
                    >
                    </el-input>
                    <span style="float: right;padding-top: 4px">
                    <el-button
                      type="success"
                      :disabled="reply_text===''"
                      @click="addNewReply(item.discussionResponse.id)"
                      size="small"
                      round
                    >
                      发表
                    </el-button>
                  </span>
                    <el-button type="text" class="button" style="color: gray" slot="reference">
                      回复
                    </el-button>
                  </el-popover>
                </div>
                <div style="clear: both"></div>
                <!--如果有回复，显示子楼-->
                <div v-show="item.reply!==null" style="padding-left: 50px">
                  <div v-for="i in item.reply" class="sub-reply" style="padding: 0px;">
                    <el-card class="box-card" shadow="never" style="background-color: #f6f6f6;width: 100%;margin-bottom: 6px;">
                      <div style="padding: 2px;">
                        <!--<el-avatar :size="50" :src="circleUrl"></el-avatar>-->
                        <i class="el-icon-user" style="font-size: 20px"></i>
                        <span style="font-size: 20px;font-weight: bold;padding-left: 10px">{{i.userId}}</span>
                      </div>
                      <div class="bottom clearfix" style="font-size: 16px;padding-left: 30px;margin: 10px">
                        {{i.content}}
                      </div>
                      <div style="float: right">
                        <span class="time" style="font-size: 12px;padding-right: 8px;color: gray">{{ i.submitTime }}</span>
                        <el-button type="text" class="button" v-on:click="thumbUp(i,1)">
                          <i class="el-icon-thumb"></i>
                          ({{i.likeNum}})
                        </el-button>
                      </div>
                    </el-card>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
        <!--添加新讨论-->
        <div class="discussion_edit">
          <!--<el-divider></el-divider>-->
          <div class="discussion_input">
            <el-divider></el-divider>
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8}"
              placeholder="写下你的思考…"
              v-model="discussion_text"
            >
            </el-input>
            <span style="float: right;padding-top: 10px;padding-bottom: 60px">
            <el-button
              type="primary"
              :disabled="discussion_text===''"
              @click="addNewDiscussion()"
              plain
            >
              发布讨论
            </el-button>
          </span>
          </div>
        </div>
      </div>

    </div>



  </div>
</template>

<script>

    import axios from "axios"
    import moment from 'moment'
    import format from '../../assets/js/datetimeFormat'
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



          curCode:  // 默认代码模板
            'class Main{\n' +
            '\tpublic int main(){\n' +
            '\t\t// code here\n' +
            '\t\treturn answer;\n' +
            '\t}\n' +
            '}',
          cmTheme: "blackboard", // codeMirror主题
          cmEditorMode: "Javac(1.8)", // 编辑模式
          // 编辑模式选项
          cmEditorModeOptions: [
            "Python(3.6)",
            "Javac(1.8)",
            "C++11(clang++3.9)",
            "sql",
          ],
          cmMode: "text/x-java", //codeMirror模式
          // showVis: false,
          // showCode:true

          msg: 'Welcome to Discussion Area',
          currentDate: new Date(),
          discussion_text: '',
          reply_text: '',
          discussionStatus: false,
          discussionData: [],
          testDataEmpty: {
            "success": false,
            "message": "false",
            "code": 500,
            "data": null
          },
          // testDataSuccess: {
          //   "success": true,
          //   "message": "success",
          //   "code": 200,
          //   "data": [
          //     {
          //       "discussionResponse": {
          //         "id": 2,
          //         "content": "1",
          //         "topicId": 1,
          //         "submitTime": 1637563160000,
          //         "userId": 1,
          //         "parentId": -1,
          //         "likeNum": 2
          //       },
          //       "reply": [
          //         {
          //           "id": 4,
          //           "content": "111",
          //           "topicId": 1,
          //           "submitTime": 1637639452954,
          //           "userId": 1,
          //           "parentId": 2,
          //           "likeNum": 0
          //         },
          //         {
          //           "id": 3,
          //           "content": "1",
          //           "topicId": 1,
          //           "submitTime": 1637639134627,
          //           "userId": 1,
          //           "parentId": 2,
          //           "likeNum": 2
          //         },
          //         {
          //           "id": 7,
          //           "content": "1111",
          //           "topicId": 1,
          //           "submitTime": 1637759332168,
          //           "userId": 1,
          //           "parentId": 2,
          //           "likeNum": 0
          //         },
          //         {
          //           "id": 8,
          //           "content": "1111",
          //           "topicId": 1,
          //           "submitTime": 1637849313000,
          //           "userId": 5,
          //           "parentId": 2,
          //           "likeNum": 0
          //         }
          //       ]
          //     },
          //     {
          //       "discussionResponse": {
          //         "id": 6,
          //         "content": "10101",
          //         "topicId": 1,
          //         "submitTime": 1637757986716,
          //         "userId": 1,
          //         "parentId": -1,
          //         "likeNum": 0
          //       },
          //       "reply": null
          //     }
          //   ]
          // },

          emptyData: {
            'success': true,
            'message': 'no data',
            'code': 0,
            'data': null,
            'total': 0
          },
          validData: {
            'success': true,
            'message': 'success',
            'code': 200,
            'data': [
              {
                'id': 1,
                'topic_id': 1,
                'user_id': 1,
                'user_name': 'user1',
                'parent_id': -1,
                'submit_time': '2021-11-11 07:07:07',
                'content': '我们在使用的很多评论系统中，目前比较流行的就是楼中楼的方式了，比如百度贴吧，wordpress等等。在这以前，一般都是按照时间顺序进行1楼、2楼、3楼的展示，如果要回复某个人，使用@符号标识出这个用户的名字，然后回复内容。可是这样存在一个很大的问题，讨论问题没有集中在一起，其他用户根本不知道你们在讨论什么，原作者在1楼发表评论，你进来回复这个用户的评论时，已经到10楼了，原作者再回复你又到20楼了。其他用户看到10楼时，早已经忘记原作者说了什么了。',
                'like_num': 0,
                'reply': [
                  {
                    'id': 3,
                    'topic_id': 1,
                    'user_id': 3,
                    'user_name': 'user3',
                    'parent_id': 1,
                    'submit_time': '2021-11-11 07:07:09',
                    'content': 'element自带的有icon，使用起来也很方便。但是美中不足的是，官方提供的图标库只是部分，在需要新的icon时，我就想到了引入第三方icon。对我来说，阿里的icon库就很方便，之前的项目也是用的这个库。\n' +
                      '\n' +
                      '先是查看了Element官方文档，没发现有提示如何引用第三方icon，就尝试Google一下教程。这里看到了方丈先生的文章Vue Element使用icon图标(第三方)，按照他的方法试着操作了一遍，成功引用了。\n',
                    'like_num': 3
                  },
                  {
                    'id': 4,
                    'topic_id': 1,
                    'user_id': 4,
                    'user_name': 'user4',
                    'parent_id': 1,
                    'submit_time': '2021-11-11 07:07:10',
                    'content': 'test4',
                    'like_num': 4
                  }
                ],
                'totalreply': 2
              },
              {
                'id': 2,
                'topic_id': 1,
                'user_id': 2,
                'user_name': 'user2',
                'parent_id': -1,
                'submit_time': '2021-11-11 07:07:08',
                'content': '几个朋友想做一个前后端分离的项目，接口文档的重要性那是不言而喻的。生成接口文档的方法真的太多了，Yapi、Swagger等等。但是想公网上访问接口文档并修改的话，还得购买服务器，部署上去。穷码农，哪有钱购买服务器。如果我不想购买服务器部署，又想让不在一块的前端和后台小伙伴能同时访问并修改接口文档该怎么办？postman团队背靠google，贼有钱，提供了域名和服务器，所有人都可以查看文档。并且可以创建团队，团队成员根据角色可对空间中的文档进行查看或编辑。',
                'like_num': 1,
                'reply': null,
                'totalreply': 0
              }],
            'total': 4
          }
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
          let content = this.$refs.cmEditor_qb.getValue();
          console.log(content);
          return content
        },
        fenchData() {
          this.getDiscussionData()
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
                this.curCode = content
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

        /* 通过题目Id获取讨论区数据 */
        getDiscussionData () {
          // this.discussionData = this.emptyData /* 假数据 */
          // this.discussionData = this.validData /* 假数据 */
          // let resData = this.testDataEmpty /* 测试数据为空 */
          // let resData = this.testDataSuccess /* 测试数据不为空 */
          // console.log(resData.message)
          // if(resData.success){
          //   this.discussionData = resData.data
          //   console.log(this.discussionData)
          //   this.discussionStatus = true
          // } else {
          //   this.discussionStatus = false
          // }
          /* 传递参数：topicId */
          let topicID = this.$route.params.topicId
          this.$store.dispatch('topics/getDiscussionByTopicId', {topicID: topicID}).then(data => {
            console.log("连接成功");
            console.log(data)
            if (data.code === 200) {
              this.discussionStatus = true
              this.msg = '讨论区有数据'
            } else {
              this.discussionStatus = false
              this.msg = '讨论区无数据'
            }
            console.log(this.msg)
            this.discussionData = data.data
            for (var i=0;i<this.discussionData.length;i++){
              this.discussionData[i].discussionResponse.submitTime = moment(this.discussionData[i].discussionResponse.submitTime).format("YYYY-MM-DD")
              if (this.discussionData[i].reply){
                for (var j=0;j<this.discussionData[i].reply.length;j++){
                  this.discussionData[i].reply[j].submitTime = moment(this.discussionData[i].reply[j].submitTime).format("YYYY-MM-DD")
                }
              }
            }
          })
        },
        /* 平滑定位到讨论讨论区 */
        jumpDiscussionArea (index) {
          let jump = document.querySelectorAll('.discussion_area')
          let total = jump[index].offsetTop - 80
          // // Chrome
          // document.body.scrollTop = total
          // // Firefox
          // document.documentElement.scrollTop = total
          // window.pageYOffset = total
          let distance = document.documentElement.scrollTop || document.body.scrollTop
          let step = total / 20
          if (total > distance) {
            smoothDown()
          } else {
            let newTotal = distance - total
            step = newTotal / 20
            smoothUp()
          }

          function smoothDown () {
            if (distance < total) {
              distance += step
              document.body.scrollTop = distance
              document.documentElement.scrollTop = distance
              setTimeout(smoothDown, 10)
            } else {
              document.body.scrollTop = total
              document.documentElement.scrollTop = total
            }
          }

          function smoothUp () {
            if (distance > total) {
              distance -= step
              document.body.scrollTop = distance
              document.documentElement.scrollTop = distance
              setTimeout(smoothUp, 10)
            } else {
              document.body.scrollTop = total
              document.documentElement.scrollTop = total
            }
          }
        },
        /* 平滑定位到讨论编辑框 后续改为面包屑组件 */
        jumpDiscussionEditor (index) {
          let jump = document.querySelectorAll('.discussion_edit')
          let total = jump[index].offsetTop - 80
          // // Chrome
          // document.body.scrollTop = total
          // // Firefox
          // document.documentElement.scrollTop = total
          // window.pageYOffset = total
          let distance = document.documentElement.scrollTop || document.body.scrollTop
          let step = total / 20
          if (total > distance) {
            smoothDown()
          } else {
            let newTotal = distance - total
            step = newTotal / 20
            smoothUp()
          }

          function smoothDown () {
            if (distance < total) {
              distance += step
              document.body.scrollTop = distance
              document.documentElement.scrollTop = distance
              setTimeout(smoothDown, 10)
            } else {
              document.body.scrollTop = total
              document.documentElement.scrollTop = total
            }
          }

          function smoothUp () {
            if (distance > total) {
              distance -= step
              document.body.scrollTop = distance
              document.documentElement.scrollTop = distance
              setTimeout(smoothUp, 10)
            } else {
              document.body.scrollTop = total
              document.documentElement.scrollTop = total
            }
          }
        },
        /* 点赞功能（待完善） */
        thumbUp (item, pos) {
          let discussionId = 0
          if(pos === -1){
            item.discussionResponse.likeNum += 1
            discussionId　= item.discussionResponse.id
          } else{
            item.likeNum += 1
            discussionId　= item.id
          }
          console.log(discussionId + ' thumb up')
          /* 传递参数：item.id */
          this.$store.dispatch('topics/giveOneLike', {discussionId: discussionId}).then(data => {
            console.log(data)
          }).catch(error => {
          })
        },
        /* 添加新讨论(待完善) */
        addNewDiscussion () {
          /* 传递参数：topicId=this.topicData.topicId, parent_id=-1, submitTime, content=this.discussion_text*/
          let topicId = this.$route.params.topicId
          let parentId = -1
          let content = this.discussion_text
          let now = new Date()
          let submit_time = format(now, 'YYYY-MM-DD HH:mm:ss')
          console.log(topicId, parentId, content, submit_time)
          this.discussion_text = ''
          this.$store.dispatch('topics/addNewDiscussion', {
            topicId: topicId,
            parentId: parentId,
            content: content,
            submit_time: submit_time
          }).then().catch(error => {
          })
          /* 强制刷新跳转 */
          // this.$router.go(0)
        },
        /* 添加新讨论(待完善) */
        addNewReply (discussionId) {
          /* 传递参数：topic_id, parent_id=discussionId, submitTime, content=this.discussion_text*/
          let topicId= this.$route.params.topicId
          let parentId = discussionId
          let content = this.reply_text
          let now = new Date()
          let submit_time = format(now, 'YYYY-MM-DD HH:mm:ss')
          console.log(topicId, parentId, content, submit_time)
          this.reply_text = ''
          this.$store.dispatch('topics/addNewDiscussion', {
            topicId: topicId,
            parentId: parentId,
            content: content,
            submit_time: submit_time
          }).then().catch(error => {
          })
          /* 强制刷新跳转 */
          // this.$router.go(0)
        },
        //时间格式化
        dateFormat(row, column) {
          var date = row[column.property];
          if (date == undefined) {
            return "";
          }
          return moment(date).format("YYYY-MM-DD HH:mm:ss");
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

  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin-top: 4px;
  }




</style>
