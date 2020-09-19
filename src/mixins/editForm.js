let init = true
export default {
    props:{
        visible:{
            type:Boolean,
            default:false,
        },
        confirmLoading:{
            type:Boolean,
            default:false,
        },
        dataSource:{
            type:Object,
            default(){
                return null
            },
        },
    },
    data() {
        return {
            dialogVisible:false,
            confirmLd:false,
        }
    },
    computed:{
        isUpdate() {
            return !!(this.params && this.params.id)
        }
    },
    methods: {
        reset(){
            let form = this.$refs[this.formName]
            this.params = this.initParams;
            this.initParams = { }
            form && form.clearValidate()
        },
        handleClose(){
            init = true
            this.dialogVisible = false
            this.reset()
        },
        handleConfirm(){
            this.$refs[this.formName].validate((passed,val1,val2) => {
                if(passed){
                    this.$emit('ok',this.getFormattedParams(this.params),this.isUpdate)
                }
            })
        },
        getFormattedParams(params){
            return params
        },
        //赋值到内部的内容
        formatBeforeSet(params){
            return params
        },
        getParams(){
            return this.getFormattedParams(this.params)
        },
        afterOpen(params){

        }
    },
    watch:{
        dialogVisible(val){
            if(val){
                this.$nextTick(()=>{
                    let form = this.$refs[this.formName]
                    form && form.clearValidate()
                    this.params = this.formatBeforeSet(this.params)
                    this.afterOpen({...this.params})
                })
            }
            if(val !== this.visible){
                this.$emit('update:visible',val)
            }
        },
        visible(val){
            if(val!==this.dialogVisible){
                this.dialogVisible = val
            }
        },
        dataSource(val){
            if(val){
                this.params = val
            } 
        }, 
        params(val){
            if(val !== this.dataSource){
                this.$emit('update:dataSource',val)
            }
        },
        confirmLoading(val){
            if(val!==this.confirmLd){
                this.confirmLd = val
            }
        },
        confirmLd(val){
            if(val!==this.confirmLoading){
                this.$emit('update:confirmLoading',val)
            }
        }
    },
}