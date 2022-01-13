<template>

  <codemirror
    ref="myCm"
    :value="editorValue"
    :options="cmOptions"
    @changes="onCmCodeChanges"
    @blur="onCmBlur"
    @keydown.native="onKeyDown"
    @mousedown.native="onMouseDown"
    @paste.native="OnPaste"
  ></codemirror>
</template>

<script type="text/ecmascript-6">
  import { codemirror } from 'vue-codemirror'

  // 核心样式
  import 'codemirror/lib/codemirror.css'
  // 引入主题后还需要在 options 中指定主题才会生效
  import 'codemirror/theme/cobalt.css'
  // import theme style
  import 'codemirror/theme/base16-dark.css'

  // 需要引入具体的语法高亮库才会有对应的语法高亮效果
  // codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
  // 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
  import 'codemirror/mode/javascript/javascript.js'
  import 'codemirror/mode/css/css.js'
  import 'codemirror/mode/xml/xml.js'
  import 'codemirror/mode/clike/clike.js'
  import 'codemirror/mode/markdown/markdown.js'
  import 'codemirror/mode/python/python.js'
  import 'codemirror/mode/r/r.js'
  import 'codemirror/mode/shell/shell.js'
  import 'codemirror/mode/sql/sql.js'
  import 'codemirror/mode/swift/swift.js'
  import 'codemirror/mode/vue/vue.js'

  require("codemirror/mode/python/python.js")
  require('codemirror/addon/fold/foldcode.js')
  require('codemirror/addon/fold/foldgutter.js')
  require('codemirror/addon/fold/brace-fold.js')
  require('codemirror/addon/fold/xml-fold.js')
  require('codemirror/addon/fold/indent-fold.js')
  require('codemirror/addon/fold/markdown-fold.js')
  require('codemirror/addon/fold/comment-fold.js')

  import "codemirror/theme/blackboard.css";
  import "codemirror/mode/javascript/javascript.js";
  import "codemirror/mode/xml/xml.js";
  import "codemirror/mode/htmlmixed/htmlmixed.js";
  import "codemirror/mode/css/css.js";
  import "codemirror/mode/yaml/yaml.js";
  import "codemirror/mode/sql/sql.js";
  import "codemirror/mode/python/python.js";
  import "codemirror/mode/markdown/markdown.js";
  import "codemirror/addon/hint/show-hint.css";
  import "codemirror/addon/hint/show-hint.js";
  import "codemirror/addon/hint/javascript-hint.js";
  import "codemirror/addon/hint/xml-hint.js";
  import "codemirror/addon/hint/css-hint.js";
  import "codemirror/addon/hint/html-hint.js";
  import "codemirror/addon/hint/sql-hint.js";
  import "codemirror/addon/hint/anyword-hint.js";
  import "codemirror/addon/lint/lint.css";
  import "codemirror/addon/lint/lint.js";
  import "codemirror/addon/lint/json-lint";
  // import "codemirror/addon/lint/html-lint.js";
  // import "codemirror/addon/lint/css-lint.js";
  import "codemirror/addon/lint/javascript-lint.js";
  import "codemirror/addon/fold/foldcode.js";
  import "codemirror/addon/fold/foldgutter.js";
  import "codemirror/addon/fold/foldgutter.css";
  import "codemirror/addon/fold/brace-fold.js";
  import "codemirror/addon/fold/xml-fold.js";
  import "codemirror/addon/fold/comment-fold.js";
  import "codemirror/addon/fold/markdown-fold.js";
  import "codemirror/addon/fold/indent-fold.js";
  import "codemirror/addon/edit/closebrackets.js";
  import "codemirror/addon/edit/closetag.js";
  import "codemirror/addon/edit/matchtags.js";
  import "codemirror/addon/edit/matchbrackets.js";
  import "codemirror/addon/selection/active-line.js";
  import "codemirror/addon/search/jump-to-line.js";
  import "codemirror/addon/dialog/dialog.js";
  import "codemirror/addon/dialog/dialog.css";
  import "codemirror/addon/search/searchcursor.js";
  import "codemirror/addon/search/search.js";
  import "codemirror/addon/display/autorefresh.js";
  import "codemirror/addon/selection/mark-selection.js";
  import "codemirror/addon/search/match-highlighter.js";

  export default {
    name: 'my_cm',
    components: {
      codemirror
    },
    props: ["cmTheme", "cmMode", "autoFormatJson", "jsonIndentation", "editorValue"],
    data() {
      return {
        editorValue:  //初始代码
          'public class Main{\n' +
          '\tpublic static int main(){\n' +
          '\t\t// code here\n' +
          '\t\treturn answer;\n' +
          '\t}\n' +
          '}',
        cmOptions: {
          theme:
            !this.cmTheme || this.cmTheme == "default"
              ? "blackboard"
              : this.cmTheme,
          //<!--//默认java高亮显示-->
          mode:
            !this.cmMode || this.cmMode == "default"
              ? "text/x-java"
              : this.cmMode,
          //<!--//代码折叠-->
          lineWrapping: true,
          gutters: [
            "CodeMirror-lint-markers",
            "CodeMirror-linenumbers",
            "CodeMirror-foldgutter"
          ],
          foldGutter: true,
          //<!--//显示行号-->
          lineNumbers: true,
          smartIndent: true,  //自动缩进
          autocorrect: true,
          spellcheck: true,
          lint: true,
          indentUnit: 4, // 智能缩进单位为4个空格长度
          indentWithTabs: true, // 使用制表符进行智能缩进
          autofocus: true, // 自动聚焦
          autoCloseBrackets: true, // 自动闭合符号
          styleActiveLine: true, // 显示选中行的样式
          //<!--//括号匹配-->
          matchBrackets:true,
          autoCloseTags: true,
          matchTags: { bothTags: true },
          autoRefresh: true,
          highlightSelectionMatches: {
            minChars: 2,
            style: "matchhighlight",
            showToken: true
          },
          styleSelectedText: true,
          showCursorWhenSelecting:true,
        },
      };
    },
    watch: {
      cmTheme: function(newValue, oldValue) {
        try {
          let theme =
            this.cmTheme == "default" ? "blackboard" : this.cmTheme;
          require("codemirror/theme/" + theme + ".css");
          this.cmOptions.theme = theme;
          this.resetLint();
        } catch (e) {
          this.$message.error("切换编辑器主题出错：" + e.toString());
        }
      },
      cmMode: function(newValue, oldValue) {
        this.$set(this.cmOptions, "mode", this.cmMode);
        this.resetLint();
        this.resetFoldGutter();
      }
    },
    methods: {
      resetLint() {
        if (!this.$refs.myCm.codemirror.getValue()) {
          this.$nextTick(() => {
            this.$refs.myCm.codemirror.setOption("lint", false);
          });
          return;
        }
        this.$refs.myCm.codemirror.setOption("lint", false);
        this.$nextTick(() => {
          this.$refs.myCm.codemirror.setOption("lint", true);
        });
      },
      resetFoldGutter() {
        this.$refs.myCm.codemirror.setOption("foldGutter", false);
        this.$nextTick(() => {
          this.$refs.myCm.codemirror.setOption("foldGutter", true);
        });
      },
// 修改编辑框样式
      setStyle(style) {
        try {
          this.$nextTick(() => {
            let cm = this.refs.myCm.el.querySelector(".CodeMirror");
            if (cm) {
              cm.style.cssText = style;
            } else {
              this.$message.error(
                "未找到编辑器元素，修改编辑器样式失败"
              );
            }
          });
        } catch (e) {
          this.$message.error("修改编辑器样式失败：" + e.toString());
        }
      },
      // 获取值
      getValue() {
        try {
          return this.$refs.myCm.codemirror.getValue();
        } catch (e) {
          let errorInfo = e.toString();
          this.$message.error("获取编辑框内容失败：" + errorInfo);
          return errorInfo;
        }
      },
      // 修改值
      setValue(value) {
        try {
          if (typeof value != typeof "") {
            this.$message.error(
              "修改编辑框内容失败：编辑宽内容只能为字符串"
            );
            return;
          }
          if (this.cmOptions.mode == "application/json") {
            this.editorValue = this.formatStrInJson(value);
          } else {
            this.editorValue = value;
          }
        } catch (e) {
          this.$message.error("修改编辑框内容失败：" + e.toString());
        }
      },
      // 黏贴事件处理函数
      OnPaste(event) {
        if (this.cmOptions.mode == "application/json") {
          try {
            this.editorValue = this.formatStrInJson(this.editorValue);
          } catch (e) {
            // 啥都不做
          }
        }
      },
      // 失去焦点时处理函数
      onCmBlur(cm, event) {
        try {
          let editorValue = cm.getValue();
          if (this.cmOptions.mode == "application/json" && editorValue) {
            if (!this.enableAutoFormatJson) {
              return;
            }
            this.editorValue = this.formatStrInJson(editorValue);
          }
        } catch (e) {
        // 啥也不做
        }
      },
// 按下键盘事件处理函数
      onKeyDown(event) {
        const keyCode = event.keyCode || event.which || event.charCode;
        const keyCombination =
          event.ctrlKey || event.altKey || event.metaKey;
        if (!keyCombination && keyCode > 64 && keyCode < 123) {
          this.$refs.myCm.codemirror.showHint({ completeSingle: false });
        }
      },
// 按下鼠标时事件处理函数
      onMouseDown(event) {
        this.$refs.myCm.codemirror.closeHint();
      },
      onCmCodeChanges(cm, changes) {
        this.editorValue = cm.getValue();
        this.resetLint();
      },
// 格式化字符串为json格式字符串
      formatStrInJson(strValue) {
        return JSON.stringify(
          JSON.parse(strValue),
          null,
          this.defaultJsonIndentation
        );
      }
    },
    created() {
      try {
        if (!this.editorValue) {
          this.cmOptions.lint = false;
          return;
        }
        if (this.cmOptions.mode == "application/json") {
          if (!this.enableAutoFormatJson) {
            return;
          }
          this.editorValue = this.formatStrInJson(this.editorValue);
        }
      } catch (e) {
        console.log("初始化codemirror出错：" + e);
        // this.$message.error("初始化codemirror出错：" + e);
      }
    }
  }
</script>

<style>

</style>

