export default {
    filters:{
        status(val){
            if(val == 0) return '正常'
            if(val == 9) return '冻结'
        },
        auditStatus(val){
            return [ '等待审核','审核通过','审核拒绝' ][val]
        },
    }
}