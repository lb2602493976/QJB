<template>
    <div class="container">
        <div class="info">
            <div class="check-container">
                <i class="el-icon-check"></i>
            </div>
            <h2 style="margin-bottom:24px;">注册成功！请您保持手机畅通，等待平台审核结果</h2>
            <P>注册成功后，平台会收到您的注册申请并尽快审核您的信息</P>
            <P>2～3个工作日内我们将会发送审核结果至您的手机号码</P>
            
        </div>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
    }
</script>

<style lang="scss" scoped>
    .container{
        width:100vw;
        height:100vh;
        position:relative;
        .info{
            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            &>*{
                margin:8px auto;
                text-align:center;
            }
            .check-container{
                width:100px;
                height:100px;
                background:#52C41A;
                border-radius:50%;
                color:#FFF;
                display:flex;
                justify-content: center;
                align-items: center;
                font-size:50px;
                margin-bottom:48px;
            } 
        }  
    }
    
</style>