<template>
    <div v-show="dataSource" :style="customStyle" class="map" id="bmap_p_display" ></div>
</template>
<script>
    export default {
        props:{
            dataSource:{
                type:Object,
                default(){
                    return null
                }
            },
            customStyle:{
                type:Object,
                default(){
                    return {}
                }
            },
        },
        data() {
            return {
                loading:false,
                map:null,
                local:null,
            }
        },
        mounted(){
            if(this.dataSource){
                this.init(this.dataSource)
            }
        },
        methods: {
            init(poi) {
                this.loading = true
                this.map = new BMap.Map("bmap_p_display",{ enableMapClick: false});
                let point = new BMap.Point(poi.lng,poi.lat);
                this.map.centerAndZoom(point,12);
                this.map.enableScrollWheelZoom();
                this.map.enableInertialDragging();
                this.map.enableContinuousZoom();
                this.setMarker(poi);
                this.loading = false
            },
            setMarker(poi){
                let mk = new BMap.Marker(poi);
                this.map.addOverlay(mk);
            },
            resetMap(poi){
                this.init(poi);
            },
        },
        watch: {
            dataSource:{
                deep:true,
                handler(poi){
                    this.init(poi);
                },
            }
        },
    }
</script>

<style lang="scss" scoped>
    .map{
        margin:0 24px;
    }
    
</style>