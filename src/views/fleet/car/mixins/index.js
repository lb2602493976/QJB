export default {
    filters:{
        status(val){
            return ['正常','停用'][val]
        },
    }
}