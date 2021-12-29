<template>
<div class="preloader-container" v-if="loading">
    <div class="load">
        <hr/>
        <hr/>
        <hr/>
        <hr/>
    </div>
</div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  mounted(){
    const _this = this;
	this.$http.interceptors.request.use(function (config) {
		// Do something before request is sent
		_this.loading = true;
		return config;
	}, function (error) {
		// Do something with request error
		return Promise.reject(error);
	});

	this.$http.interceptors.response.use(function (response) {
		_this.loading = false;
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	}, function (error) {
		_this.loading = false;
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	});
  }
}
</script>
<style>
.preloader-container {position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: #ffffffa3; z-index: 10001;}
.load{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:100px;height:100px;}
.load hr{border:0;margin:0;width:40%;height:40% !important;position:absolute;border-radius:50%;animation:spin 2s ease infinite}
.load :first-child{background:#19A68C;animation-delay:-1.5s}
.load :nth-child(2){background:#F63D3A;animation-delay:-1s}
.load :nth-child(3){background:#FDA543;animation-delay:-0.5s}
.load :last-child{background:#193B48}

@keyframes spin{
  0%,100%{transform:translate(0)}
  25%{transform:translate(160%)}
  50%{transform:translate(160%, 160%)}
  75%{transform:translate(0, 160%)}
}

</style>