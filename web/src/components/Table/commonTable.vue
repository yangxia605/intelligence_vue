<template>
  <div id="commonTable">
    <el-table :data="data" :max-height="maxHeight" border stripe tooltip-effect="light"
              @selection-change="handleSelectionChange">
      <slot name="table_oper"/>
      <template v-for="(item, index) in columns">
        <el-table-column
          v-if="(item.show != false) && (item.url != false)"
          sortable
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :align="item.align?item.align:'center'"
          :width="item.width"
          :formatter="item.formatter?item.formatter : formatterValue"
        >
          <!--题目名：url=true 带跳转 /questionBank/Topicid -->
          <template slot-scope="scope">
            <el-link type="primary" :href="'/questionBank/'+ scope.row.id">{{scope.row.topic_name}}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          v-if="(item.show != false) && (item.url != true)"
          sortable
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :align="item.align?item.align:'center'"
          :width="item.width"
          :formatter="item.formatter?item.formatter : formatterValue"
        >
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="text-align: center;margin:20px 0;"
      :current-page="pager.pageNo"
      :page-size="pager.pageSize"
      :page-sizes="pager.sizes"
      :total="pager.total"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'commonTable',
    props: {
      columns: Array,
      data: Array,
      pager: Object,
      maxHeight: {
        type: Number,
        default: 2000
      }
    },
    //todo:分页实现、搜索
    methods: {
      handleSelectionChange(val) {
        this.$emit('handleSelectionChange', val);
      },
      handleSizeChange(val) {
        this.$emit('handleSizeChange', val);
      },
      handleCurrentChange(val) {
        this.$emit('handleCurrentChange', val);
      },
      formatterValue(row, column, cellValue) {
        return cellValue;
      }
    }
  }
</script>



