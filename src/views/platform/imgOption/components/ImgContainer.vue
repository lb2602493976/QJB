<template>
    <div @mouseenter="mVisible = true" @mouseleave="mVisible = false" :style="{ width:`${width}px` }" class="container">
       <el-image 
            class="image"
            :src="src" 
            :style="{height:`${height}px`}"
        ></el-image>
        <p class="name text-wrap">{{name}}</p>
        <div v-show="mVisible" class="mask">
            <slot name="mask"/>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            src:{
                type:String,
                default:'',
            },
            name:{
                type:String,
                default:'',
            },
            srcList:{
                type:Array,
                default(){
                    return []
                },
            },
            maskVisible:{
                type:Boolean,
                default:false,
            },
        },
        data() {
            return {
                mVisible:false,
                width:200,
            }
        },
        computed:{
            height(){
                return this.width*9/16
            }
        },
        created(){
            this.mVisible = this.maskVisible
        },
        watch:{
            maskVisible(val){
                this.$emit('update:maskVisible',val)
            },
        },
    }
</script>

<style lang="scss" scoped>
    .container{
        box-sizing:content-box;
        // width:168px;
        padding:12px;
        border:1px solid rgba(0,0,0,0.3);
        border-radius:20px;
        box-shadow:0 4px 5px rgba(50,0,0,0.2);
        transition:all 0.3s;
        position:relative;
        &:hover{
            transform:translateY(-10px);
            box-shadow:0 8px 16px 4px rgba(50,0,0,0.2);
        }
        .image{
            width:100%;
            border-radius:20px;
        }
        .name{
            margin-top:12px;
            width:100%;
            text-align:center;
        }
        .mask{
            border-radius:20px;
            width:100%;
            height:100%;
            position:absolute;
            top:0;
            left:0;
            background:rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>