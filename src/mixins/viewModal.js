export default {
    props:{
        visible:{
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
            params:{},
        }
    },
    methods: {
        reset(){
            this.params = {};
        },
        handleClose(){
            this.dialogVisible = false
            this.reset()
        },
        afterOpen(params){},
    },
    watch:{
        dialogVisible(val){
            if(val){
                this.$nextTick(()=>{
                    this.params = this.dataSource
                    this.afterOpen({...this.params})
                    console.log(this.params)
                })
            }
            if(val!==this.visible){
                this.$emit('update:visible',val)
            }
        },
        visible(val){
            if(val!==this.dialogVisible){
                this.dialogVisible = val
            }
        },
        dataSource(val){
            if(val) this.params = val
        }, 
        params(val){
            if(val !== this.dataSource){
                this.$emit('update:dataSource',val)
            }
        },
    },
}