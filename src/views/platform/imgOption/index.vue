<template>
    <div class="app-container">
        <div class="header">
            <div>
                <el-input type="text" v-model.trim="bannerName" style="width:200px" placeholder="请输入文件名"></el-input>
                <el-button :loading="loading" type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
            </div>
            <el-button  @click="$refs['fileInput'].click()" type="primary">上传图片</el-button>
        </div>
        <ul v-loading="loading" class="img-list">
            <li class="img-item" v-for="(item,index) of imgList" :key="index">
                <ImgContainer 
                    class="img"
                    :name="item.bannerName"
                    :src="item.bannerUrl"
                    :src-list="imgList.map(item=>item.bannerUrl)"
                >
                    <template slot="mask">
                        <el-button @click="handlePreview(index)" class="button" type="text" ghost icon="el-icon-view" ></el-button>
                        <el-button @click="handleDelete(item,index)" class="button" type="text" ghost icon="el-icon-delete"></el-button>
                    </template>
                </ImgContainer>
                <div class="mask"></div>
            </li>
        </ul>
        <el-image-viewer 
            v-if="showViewer"
            :on-close="closeViewer"
            :url-list="viewerList"
        />
        <input 
            @change="handleCreate"
            ref="fileInput"
            style="display:none"
            type="file"
            accept="'.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF'"
        >
    </div>
</template>

<script>
    import { uploadFile } from '@/api/upload'
    import { searchApi,deleteApi,createApi } from '@/api/banner'
    import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
    import ImgContainer from './components/ImgContainer'
    import { mapGetters } from 'vuex'
    export default {
        components:{
            ImgContainer,
            ElImageViewer,
        },
        data() {
            return {
                bannerName:'',
                loading:false,
                showViewer:false,
                imgList:[],
                viewerList:[],
            }
        },
        computed:{
            ...mapGetters(['tenantId']),
        },
        mounted(){
            this.handleSearch()
        },
        methods: {
            //查询
            handleSearch(){
                this.loading = true
                console.log(this.tenantId)
                let query = new URLSearchParams()
                query.append('bannerName',this.bannerName)
                query.append('tenantId',this.tenantId)
                searchApi(query).then(response => {
                    this.imgList = response.data.data.records
                }).finally(()=>{
                    this.loading = false
                })
            },
            //创建
            async handleCreate(e){
                let bannerName = e.target.files[0].name
                let uploadResponse = await uploadFile(e.target.files[0]).then(({data})=>data).finally(() => e.target.value='')
                createApi({
                    bannerName,
                    bannerUrl:uploadResponse.url,
                    tenantId:this.tenantId,
                }).then(response => {
                    if(response.data.data){
                        this.$message.success('上传成功')
                        this.handleSearch()
                    }else{
                        this.$message.success('上传失败')
                    }
                })
            },
            //预览按钮
            handlePreview(index) {
                if(index == 0){
                    this.viewerList = this.imgList.map(item=>item.bannerUrl)
                }else{
                    let sliceP = this.imgList.slice(0,index)
                    let sliceN = this.imgList.slice(index)
                    this.viewerList = [ ...sliceN,...sliceP ].map(item=>item.bannerUrl)
                }
                this.showViewer = true
            },
            //删除
            handleDelete(item){
                this.$confirm('确认删除该图片吗？','提示',{
                    type:'warning',
                }).then(()=>{
                    deleteApi(item.id).then(response => {
                        if(response.data.data){
                            this.$message.success('删除成功')
                            this.handleSearch()
                        }else{
                            this.$message.success('删除失败')
                        }
                    })
                })
            },
            closeViewer(){
                this.showViewer = false
            },
        },
    }
</script>

<style lang="scss" scoped>
    .app-container{
        padding:24px 0;
    }
    .header{
        display:flex;
        justify-content: flex-start;
        align-items: center;
        padding:0 24px;
        &>*:not(first-child){
            margin-left:8px;
        }   
    }
    .img-list{
        display:flex;
        flex-flow:row wrap;
        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        .img-item{
            display:flex;
            flex-flow:column nowrap;
            justify-content: center;
            align-items: stretch;
            position:relative;
        }
        .img{
            height:100%;
            margin-top:24px;
            margin-left:24px;
        }
        .button{
            color:#FFF;
            font-size:20px;
            &:hover{
                color:rgb(32, 160, 255);
            }
            &:not(:first-child){
                margin-left:24px;
            }
        }
    }
</style>