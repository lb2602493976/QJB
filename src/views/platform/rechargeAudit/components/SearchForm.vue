<template>
  <!-- 查询和其他操作 -->
  <div>
    <div class="filter-container">
      <div class="filters">
        <div class="filter">
          <el-date-picker
            v-model="params.value2"
            type="daterange"
            align="right"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
<!--          <el-date-picker-->
<!--            v-model.trim="params.startDate"-->
<!--            type="date"-->
<!--            value-format="yyyy-MM-dd"-->
<!--            placeholder="选择申请时间">-->
<!--          </el-date-picker>-->
          <el-select clearable placeholder="审核状态"  v-model="params.status" size="small" style="width: 230px;margin-left: 10px">
            <el-option label="待确认" value="0"/>
            <el-option label="审核通过" value="1"/>
            <el-option label="审核拒绝" value="2"/>
          </el-select>
        </div>
      </div>
      <div class="buttons">
        <el-button
          :loading="searchLoading"
          class="filter-item"
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="handleSearch"
        >
          查询
        </el-button>
        <el-button
          :loading="searchLoading"
          class="filter-item"
          type="primary"
          icon="el-icon-refresh"
          size="small"
          @click="handleReset"
        >
          重置
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import searchFormMixins from '@/mixins/searchForm'
export default {
  mixins: [searchFormMixins],
  data() {
    return {
      params: {
        value2: '',
        status: '',

      },
      pickerOptions: {
        shortcuts: [{
          text: '本日',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '本周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '本月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        },{
          text: '本年',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      show: false,
      // 用于重置参数为初始值
      options: [],
      orgId: '',
      enterpriseCode: '', // 企业代码
      code: '', // 车队编号
      recharge: '', // 账户余额
      tenantId: '',
      queryTypeOptions: [
        { key: '1', display_name: '等待审核' },
        { key: '2', display_name: '审核完成' },
      ],
    }
  },
  created() {
    // 初始化数据
  },
  methods: {
    getformatdParams(params) {
      return params
    },
    handleSearch() {
      this.$emit('beforeSearch',this.params)
      this.$emit('search')
    },
    handleReset(){
      this.params = { ...this.initParams }
      this.handleSearch()
    },
    editButton() {
      this.$parent.editButton()
    },
  }
}
</script>
<style lang="scss" scoped>
    .filter-container{
      margin:20px;
      margin-bottom:0;
      padding:24px 0;
      background:#FFF;
      display:flex;
      justify-content: space-between;
      align-items: stretch;
      .buttons{
        margin-right:24px;
      }
      .filter{
        margin-left:24px;
      }
    }
    .filter-container1{
      margin:0 20px 20px 20px;
      margin-bottom:0;
      padding:0 0 24px 0;
      background:#FFF;
      display:flex;
      align-items: stretch;
      .buttons{
        margin-right:24px;
      }
      .filter{
        margin-left:24px;
      }
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
</style>
