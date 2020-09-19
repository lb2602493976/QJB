<template>
    <div ref="container" :style="{width:`${width}px`,height:`${height}px`}" class="container">
        <div ref="content" class="content">
            <div :style="{ width:`${width*dividePosition}px`,padding:`${r+10}px` }" class="left">
                <slot name="left"></slot>
            </div>
            <div :style="{ width:`${width*(1-dividePosition)}px`,padding:`${r+10}px` }" class="right">
                <slot name="right"></slot>
            </div>
        </div>
        <canvas ref="canvas_coupon" class="bg" :width="width" :height="height"></canvas>
    </div>
    
</template>

<script>
    export default {
        data() {
            return {
                ctx:null,
            }
        },
        props:{
            width:{
                type:[Number,String],
                default:300,
            },
            height:{
                type:[Number,String],
                default:120,
            },
            dividePosition:{
                type:Number,
                default:0.7,
            },
            r:{
                type:Number,
                default:10,
            },
            leftBg:{
                type:String,
                default:'#F2F2F2',
            },
            rightBg:{
                type:String,
                default:'#E6A23C',
            },
            divRectOpt:{
                type:Object,
                default(){
                    return {
                        width:8,
                        height:2,
                        space:4,
                    }
                },
            }
        },
        mounted(){
            this.init()
        },
        methods: {
            init() {
                const container=this.$refs['container']
                this.ctx = this.$refs['canvas_coupon'].getContext('2d') 
                this.updateLeft()
                this.updateRight()
                this.updataDivider()
            },
            updateLeft(){
                let ctx = this.ctx;
                const PI = Math.PI
                ctx.fillStyle=this.leftBg
                ctx.beginPath()
                ctx.moveTo(0,0)
                ctx.lineTo(this.width*this.dividePosition-this.r,0)
                ctx.quadraticCurveTo(this.width*this.dividePosition-this.r,this.r,this.width*this.dividePosition,this.r)
                ctx.lineTo(this.width*this.dividePosition,this.height-this.r)
                ctx.quadraticCurveTo(this.width*this.dividePosition-this.r,this.height-this.r,this.width*this.dividePosition-this.r,this.height)
                ctx.lineTo(0,this.height)
                ctx.closePath()
                ctx.fill()
            },
            updateRight(){
                let ctx = this.ctx;
                const PI = Math.PI
                ctx.fillStyle=this.rightBg
                ctx.beginPath()
                ctx.moveTo(this.width*this.dividePosition,this.r)
                ctx.quadraticCurveTo(this.width*this.dividePosition+this.r,this.r,this.width*this.dividePosition+this.r,0)
                ctx.lineTo(this.width,0)
                ctx.lineTo(this.width,this.height)
                ctx.lineTo(this.width*this.dividePosition+this.r,this.height)
                ctx.quadraticCurveTo(this.width*this.dividePosition+this.r,this.height-this.r,this.width*this.dividePosition,this.height-this.r)
                ctx.closePath()
                ctx.fill()
            },
            updataDivider(){
                let ctx = this.ctx;
                let rest = (this.height - 2 * this.r) % (this.divRectOpt.height+this.divRectOpt.space)
                let count = (this.height - 2 * this.r) / (this.divRectOpt.height+this.divRectOpt.space);
                let startY = this.r + (rest + this.divRectOpt.height + this.divRectOpt.space) / 2
                let positionList = Array.from({length:count}).reduce((prev,_,index)=>{
                    let startPoint = {
                        x:this.width * this.dividePosition - this.divRectOpt.width / 2,
                        y:startY + index * (this.divRectOpt.height+this.divRectOpt.space)  
                    }
                    return [...prev,startPoint]
                },[])
                ctx.fillStyle = this.leftBg
                positionList.forEach(p => {
                    ctx.fillRect(p.x,p.y,this.divRectOpt.width,this.divRectOpt.height)
                })
            },
            clearLeft(){
                crx.clearReact(0,0,this.width*this.dividePosition,this.height)
            },
            clearRight(){
                crx.clearReact(this.width*this.dividePosition,0,this.width*(1-this.dividePosition),this.height)
            },
            clear(){
                crx.clearReact(0,0,this.width,this.height)
            },
        },
    }
</script>

<style lang="scss" scoped>
    .container{
        position:relative;
        .bg{
            position:absolute;
            left:0;
            top:0;
            z-index:1000;
        }
        .content{
            height:100%;
            display:flex;
            justify-content: space-between;
            align-items: stretch;
            .left,.right{
                z-index:1001;
            }
        }
    }
</style>