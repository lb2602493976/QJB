export default  (blob,fileName) => {
    if(window.navigator.msSaveBlob){
        window.navigator.msSaveBlob(blob,fileName)
    }else{
        let url = URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.target = '_blank'
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }
}