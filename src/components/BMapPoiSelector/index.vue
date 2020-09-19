<template>
    <el-dialog
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :fullscreen="true"
    >
        <div class="container" style="width:100%;height:calc(100vh - 90px);">
            <div ref="map" class="map" v-loading="loading" id="bmap_p_selector" ></div>
            <div class="search">
                <ul class="list">
                    <li v-for="item of pois" :key="item.cusId" class="item">
                        <el-radio v-model.trim="currentPoiCusId" :label="item.cusId" style="width:100%">
                            <h3 class="text-wrap content" style="margin-bottom:4px">{{item.title}}</h3>
                            <p class="text-wrap content" >{{item.address}}</p>
                        </el-radio>
                    </li>
                    <li class="item">
                        <el-radio v-model.trim="currentPoiCusId" :disabled="!customMarker" label="custom" style="width:100%">
                            <h3 class="text-wrap content" style="margin-bottom:4px">自定义点位</h3>
                            <div style="margin-top:4px;">{{cusPoi | poi}}</div>
                        </el-radio>
                    </li>
                </ul>
                <div class="buttons">
                    <el-button @click="confirmButton" :loading="confirmLoading" type="primary">确定</el-button>
                </div>
            </div>
        </div>
        
    </el-dialog>
</template>
<script>
    let increment = 1
    import viewModalMixins from '@/mixins/viewModal'
    export default {
        filters: {
            poi(poi) {
                if (!poi) return ''
                else return `纬度:${poi.lat},经度:${poi.lng}`
            }
        },
        mixins:[viewModalMixins],
        data() {
            return {
                keyWord:'气站',
                inputDom:null,
                confirmLoading:false,
                loading:false,
                map:null,
                local:null,
                geolocation:null,
                pois:[],
                currentPoiCusId:'',
                cusPoi:null,
                customMarker:null,
                customWindow:null,
            }
        },
        methods: {
            reset(){
                this.currentPoiCusId=''
                this.pois = []
            },
            beforeSearch(){
                if(this.pois.length>0 && this.map){
                    this.pois.forEach(item => {
                        this.map.removeOverlay(item.mk)
                    })
                } 
            },
            handleInput(e){
                this.keyWord = e.target.value
            },
            handleBlur(){
                this.beforeSearch()
                this.local.search(this.keyWord);
            },
            confirmButton(){
                if(this.currentPoiCusId){
                    if(this.currentPoiCusId === 'custom'){
                        this.confirmLoading = true
                        this.getLocation(this.cusPoi).then(addr => {
                            this.confirmLoading = false
                            this.$emit('select',{ ...addr,point:this.cusPoi,address:'自定义位置'})
                        })
                    }else{
                        this.confirmLoading = true
                        let poi = this.pois.find(item => item.cusId === this.currentPoiCusId)
                        this.getLocation(poi.point).then(addr => {
                            this.confirmLoading = false
                            this.$emit('select',{ ...poi,...addr }) 
                        })
                    }
                }else{
                    this.$message.error('请选择一个位置！')
                }
            },
            init(){
                let that = this
                that.loading = true
                that.initLocalSearch()
                that.initControl()
                that.map.onclick = function(){
                    if(that.inputDom && document.activeElement === that.inputDom){
                        that.inputDom.blur()
                    }
                    that.currentPoiCusId = null
                }
                that.map.ondragend = function(){
                    that.beforeSearch()
                    that.local.search(that.keyWord);
                }
                that.map.onrightclick = function({point}){
                    that.map.removeOverlay(that.customMarker);
                    var mk = new BMap.Marker(point);
                    let infoWindow = new BMap.InfoWindow(
                        that.crtBmapInfoWindow({
                            title:'自定义位置',
                            address:'自定义位置',
                            point,
                        })
                    );
                    infoWindow.onclose = function(){
                        if(that.currentPoiCusId === 'custom'){
                            that.currentPoiCusId = null
                        }
                    }
                    mk.addEventListener('click',function(e){
                        e.domEvent.stopPropagation();
                        this.openInfoWindow(infoWindow)
                    })
                    that.customMarker = mk
                    that.customWindow = infoWindow
                    that.map.addOverlay(mk);
                    mk.openInfoWindow(infoWindow)
                    that.currentPoiCusId = 'custom'
                    that.cusPoi = point
                }
            },
            initBase(poi) {
                this.map = new BMap.Map("bmap_p_selector",{ enableMapClick: false});
                let point = new BMap.Point(poi.lng,poi.lat);
                this.map.centerAndZoom(point,12);
                this.map.enableScrollWheelZoom();
                this.map.enableInertialDragging();
                this.map.enableContinuousZoom();
                this.map.clearOverlays()
            },
            initLocalSearch(){
                let that = this
                this.local = new BMap.LocalSearch(that.map, {
                    renderOptions:{map: that.map,autoViewport:false},
                });
                this.local.setMarkersSetCallback(function(pois){ 
                    pois.forEach((_,index,arr)=>{
                        arr[index].cusId = increment++
                        that.map && that.map.removeOverlay(arr[index].marker)
                        let myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                            offset: new BMap.Size(10, 25),
                            imageOffset: new BMap.Size(0, 0 - index * 25)
                        });
                        let mk = new BMap.Marker(arr[index].point,{ icon:myIcon });
                        let infoWindow = new BMap.InfoWindow(that.crtBmapInfoWindow(arr[index]));
                        mk.addEventListener('click',function(e){
                            e.domEvent.stopPropagation();
                            that.currentPoiCusId = arr[index].cusId
                            mk.openInfoWindow(infoWindow)
                        })
                        arr[index].mk = mk
                        arr[index].infoWindow = infoWindow
                        that.map.addOverlay(mk);
                    })
                    that.pois = pois
                })
            },
            initialGeolocation(){
                let that = this
                this.geolocation = new BMap.Geolocation();
                this.geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        that.initBase(r.point)
                        that.init()
                        that.beforeSearch()
                        that.local.search(that.keyWord);
                        that.loading = false;
                    }
                    else {
                        that.$message.error('failed'+this.getStatus())
                    }        
                },{enableHighAccuracy: true})
            },
            initControl(){
                let that = this
                let size = new BMap.Size(10, 20);
                this.map.addControl(new BMap.CityListControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    offset: size,
                    onChangeAfter:function(){
                        that.beforeSearch()
                        that.local.search(that.keyWord);
                    }
                }));
                let searchInput = that.crtSearchInput()
                that.crtControl(searchInput,{x:100,y:20})
            },
            getLocation(point){
                let that = this
                let geoc = new BMap.Geocoder()
                return new Promise((resolve,reject)=>{
                    geoc.getLocation(point,res => {
                        let addComp = res.addressComponents
                        resolve(addComp)
                    })
                })
            },
            afterCotrolMounted(dom){
                let that = this
                that.inputDom = dom
                window.onkeyup = function(e){
                    if(dom && document.activeElement === dom && e.key.toLowerCase()==='enter'){
                        that.beforeSearch()
                        that.local.search(that.keyWord)
                    }            
                }
            },
            crtSearchInput(){
                let that = this
                let input = document.createElement('input')
                input.type = "text"
                input.value = that.keyWord
                input.oninput = that.handleInput.bind(that)
                input.onblur = that.handleBlur.bind(that)
                input.style.width = '200px'
                input.placeholder = '请输入关键词搜索'
                return input
            },
            crtControl(dom,position){
                let that = this;
                // 定义一个控件类,即function
                function Control(){
                  // 默认停靠位置和偏移量
                  this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
                  this.defaultOffset = new BMap.Size(position.x, position.y);
                }
                // 通过JavaScript的prototype属性继承于BMap.Control
                Control.prototype = new BMap.Control();

                // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
                // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
                Control.prototype.initialize = function(map){
                // 创建一个DOM元素
                    map.getContainer().appendChild(dom)
                    that.afterCotrolMounted(dom)
                    return dom
                }
                // 创建控件
                var myCtrl = new Control();
                // // 添加到地图当中
                that.map.addControl(myCtrl);
            }, 
            crtBmapInfoWindow(info){
                let that = this
                let container = document.createElement('div')
                container.style.width = "300px"
                
                let header = document.createElement('h2')
                header.textContent = info.title
                header.style.marginBottom = '12px'

                let body = document.createElement('p')
                body.style.minHeight = '50px'
                body.style.fontSize = '14px' 
                body.textContent = info.address

                let body2 = document.createElement('p')
                body2.style.fontSize = '14px' 
                body2.textContent = `纬度:${info.point.lat} , 经度:${info.point.lng}`

                let button = document.createElement('button')
                button.textContent = '设为该位置'
                button.onclick = function(){
                    button.disabled = true
                    that.getLocation(info.point).then(addr => {
                        button.disabled = false
                        that.$emit('select',{ ...info,...addr })
                    })
                }

                let footer = document.createElement('div')
                footer.style.display = 'flex'
                footer.style.justifyContent = 'flex-end'

                if(info.title) container.appendChild(header)
                if(info.address) container.appendChild(body)
                container.appendChild(body2)
                footer.appendChild(button)
                container.appendChild(footer)
                
                return container
            },
            afterOpen(){
                this.initialGeolocation()
            },
        },
        watch: {
            // dialogVisible(val){
            //     let that = this
            //     if(val!==that.visible){
            //         that.$emit('update:visible',val)
            //     }
            //     if(val){
            //         that.initialGeolocation()
            //     }
            // },
            currentPoiCusId(val){
                let cusId = this.currentPoiCusId
                if(val==='custom') this.customMarker.openInfoWindow(this.customWindow)
                else if(val){
                    let poi = this.pois.find(item => item.cusId == cusId)
                    poi && poi.mk.openInfoWindow(poi.infoWindow)
                }
            },
        },
        beforeDestroy(){
            window.onkeyup = null
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        display:flex;
        align-items: stretch;
        .map{
            width:calc(100% - 320px);
            height:100%;
        }
        .search{
            margin-left:20px;
            width:300px;
            height:100%;
            display:flex;
            flex-flow:column nowrap;
            justify-content: space-between;
            align-items:stretch;
            .list{
                flex-grow:1;
                overflow-y:auto;
                .item{
                    display:flex;
                    flex-flow:row nowrap;
                    justify-content: space-between;
                    align-items:center;
                    padding:12px 0;
                    .el-radio{
                        display:flex;
                        flex-flow:row nowrap;
                        align-items:center;
                        .el-radio__label{
                            flex-grow:1
                        }
                    }
                }
            }
            .buttons{
                display:flex;
                flex-flow:row nowrap;
                justify-content: flex-end;
                align-items:center;
            }
        }
    }
</style>