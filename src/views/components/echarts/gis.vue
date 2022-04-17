<template>
	<div class="w-100 h-100">
		<iframe id="gisMap" src="./map.html" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
	</div>
</template>

<script>
export default {
    name: "gisMap",
    data() {
		return {
			vueid: "mykrpano"
		}
	},
	created: function () {
        const that = this;
        var frame = document.getElementById('gisMap');
        //iframe页面
        iframe: window.addEventListener('message', function (event) {
            if("object" != typeof(event.data)){
                that.changeNodeMsg(event.data);
            }else if("vr" === event.data.type){
				that.changeIframeUrl(event.data.areaId);
			}

        })
	},
	methods: {
        changeNodeMsg(params) {
            this.krpanoMsg = params;
            this.dialogVisible = true;
		},
		changeIframeUrl(areaId){
			var frame = document.getElementById('gisMap');
			frame.src = 'http://192.168.1.37:8282/krpano/hzkrpano.html?areaId='+areaId;
		},
        handleClose() {
            this.dialogVisible = false;
        }
    }
}
</script>

<style>
</style>
