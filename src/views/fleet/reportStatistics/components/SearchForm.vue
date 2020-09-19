<template>
  <!-- 查询和其他操作 -->
  <div class="filter-container">
    <div class="filters">
      <div class="filter">
        <label class="label">加气单位：</label>
        <el-select
          v-model.trim="params.gasCardnum"
          placeholder="请选择加气单位"
          clearable
          @change="val=>$emit('unitChange',options.find(item=>item.value===val))"
          @keyup.enter.native="handleSearch"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="filter">
        <label class="label">业务发生时间：</label>
        <el-date-picker
          ref="dateRange"
          v-model="params.timeRange"
          :picker-options="pickerOpts"
          type="datetimerange"
          clearable
          style="width: 400px;"
          size="small"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="date = null"
          @input="val=>$emit('timeChange',val)"
          @keyup.enter.native="handleSearch"
        />
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
      <el-button
        :loading="searchLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-upload"
        size="small"
        @click="handleReset"
      >
        导出
      </el-button>
    </div>
  </div>
</template>
<script>
import searchFormMixins from '@/mixins/searchForm'
import moment from 'moment'
export default {
  mixins: [searchFormMixins],
  data() {
    const _this = this
    return {
      date: null,
      // 参数控制
      params: {
        gasCardnum: '',
        timeRange: []
      },
      pickerOpts: {
        disabledDate(currentDate) {
          if (_this.date) return moment(currentDate) < moment(_this.date).subtract(1, 'months') || moment(currentDate) > moment(_this.date).add(1, 'months')
          return 0
        },
        onPick({ maxDate, minDate }) {
          if (minDate && !maxDate) _this.date = minDate
          _this.$refs['dateRange'].$forceUpdate()
        }
      },
      // 用于重置参数为初始值
      initParams: null,

      // 可清空单选数据
      options: [{
        value: '选项1',
        label: '巩义市金驹汽车运输公司'
      }, {
        value: '选项2',
        label: '济源市宇登运输有限公司'
      }],
      value: ''
    }
  },
  created() {
    // 初始化数据
    this.initParams = { ...this.params }
  },
  methods: {
    handleReset() {
      this.$parent.unit = ''
      this.$parent.startTime = ''
      this.handleSearch()
    },
    // 外部最终获取的内容 这里为定义  获取请使用 mixins中的 getParams方法获取
    getformatdParams(params) {
      return params
    }
  }

}
</script>
<style lang="scss" scoped>
    .filter-container{
      margin:20px;
      margin-bottom:0;
      padding:0 24px 24px 0;
      background:#FFF;
      display:flex;
      justify-content: space-between;
      align-items: flex-end;
      .buttons{
        display:flex;
        flex-flow:row nowrap;
        align-items: flex-end;
        margin:0 24px;
      }
      .filter{
        margin-left:24px;
      }
    }
</style>
