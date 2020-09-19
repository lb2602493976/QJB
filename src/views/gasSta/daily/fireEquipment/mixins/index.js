export default {
  filters: {
    status(val) {
      if (val === 0) return '正常'
      if (val === 9) return '冻结'
    }
  }
}
