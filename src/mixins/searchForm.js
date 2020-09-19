export default {
    props: {
        searchLoading: {
            type: Boolean,
            default:false, 
        },
    },
    methods: {
        handleSearch() {
            this.$emit('beforeSearch',this.params)
            this.$emit('search')
        },
        handleReset(){
            this.params = { ...this.initParams }
            this.handleSearch()
        },
        getParams(){
            return this.getformatdParams(this.params)
        },
        getInitParams(){
            return this.initParams
        },
    },
}