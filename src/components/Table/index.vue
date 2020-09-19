<template>
  <div class="container">
    <el-table  class="table" :default-sort="{prop:'date', order:'descending'}" :data="tableData" :height="height" border style="width: 100%" v-on="$listeners">
      <slot />
    </el-table>
    <!--分页-->
    <div v-if="hasPage" class="pagination">
      <el-pagination
        :current-page.sync="pageNum"
        :page-size.sync="pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="totalElements"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataSource: {
      type: Array,
      default() {
        return []
      }
    },
    page: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    hasPage: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      pageNum: this.page,
      pageSize: this.size,
      totalElements: this.total,
      tableData: []
    }
  },
  watch: {
    page(val) {
      this.pageNum = val
    },
    pageNum(val) {
      if (val !== this.page) {
        this.$emit('update:page', val)
      }
    },
    size(val) {
      this.pageSize = val
    },
    pageSize(val) {
      if (val !== this.size) {
        this.$emit('update:size', val)
      }
    },
    total(val) {
      this.totalElements = val
    },
    totalElements(val) {
      if (val !== this.total) {
        this.$emit('update:total', val)
      }
    },
    dataSource(val) {
      this.tableData = val
    },
    tableData(val) {
      if (val !== this.dataSource) {
        this.$emit('update:dataSource', val)
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNum = val
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    complete({ data, total }) {
      this.tableData = data
      this.totalElements = total
    }
  }
}
</script>
<style lang="scss" scoped>
    .container{
        flex-grow:1;
        &>.el-table{
            height:100%;
        }
    }
</style>
