<template>
  <div id="demo1" class="wrapper-box">

    <div class="container-box">
      <div class="container-top">
        <div><span>团队名称:</span></div><div><span><input type="text" class=""></span></div>
      </div>

      <div class="container-bottom">
        <div class="container-bottom-bottom">
          <div class="container-bottom-title"><span>团队图片</span></div>
          <div>
            <div class="upload-box">
              <div class="upload-box-icon">+</div>
              <div class="upload-text">上传视频</div>
            </div>
            <div class="upload-descript"><span>只支持jpg格式</span></div>
          </div>
        </div>
      </div>
      <div class="container-center">
        <div class="container-center-title"><span>团队介绍</span></div>
        <div><textarea name="" id="" rows="10" class="container-center-textarea"></textarea></div>
      </div>
      <div class="btn-submit-box">
        <button class="btn-submit">提交</button>
      </div>
    </div>



  </div>
</template>

<script>

  export default {
    name: "demo1"
  }
</script>

<style scoped>
  html,body {
    height:100%;
  }

  * {
    padding:0;
    margin:0;
  }
  .wrapper-box {
    height:100%;
  }
  .header {
    display: flex;
    height:50px;
    line-height:50px;
    justify-content: center;
  }
  .btn-submit {
    display: block;
    width: 100% ;
    background-color:#ffffff;
    border: 1px solid #bbbbbb;
    outline:none;
    padding:10px 0px;
    color:#666;
    border-radius: 5px;
  }
  .container-box {
    padding:10px 30px;
    border:1px solid #ededed;
    margin-bottom:10px;
  }
  .container-top {
    align-items: center;
  }
  .container-box > div {
    display: flex;
    margin-bottom:10px;

  }
  .container-center {
    justify-content: space-between;
  }
  .container-top {
    margin:10px 0px;
  }
  .container-center-title {
    margin:0px 0px 20px;
  }
  .container-bottom,.container-center {
    margin:10px 0px;
    flex-direction: column;
  }
  .upload-box {
    width:100px;
    height:100px;
    background-color:#ededed;
    border:1px solid #dddddd;
    border-radius:5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .container-bottom-select {
    padding:5px 100px 5px 10px;
    border-radius:5px;
  }
  .container-bottom-top {
    margin-bottom:20px;
  }
  .container-top >div {
    font-size:16px;
    margin-right:10px;
  }
  .container-top input {
    padding:8px 5px;
  }
  .container-center-textarea {
    width:100%;
    outline: none;
  }
  input,textarea,select,option {
    outline: none;
  }
  .upload-box {
    width:100px;
    height:100px;
    position:relative;
  }
  .upload-box-icon {
    line-height:1.1;
    font-size:40px;
    color:#dddddd;
    position:absolute;
    top:15px;
  }
  .upload-text {
    margin-top:40px;
    font-size:14px;
  }
  .container-bottom-bottom {
    display: flex;
  }
  .container-bottom-title {
    margin-right:12px;
  }
  .upload-descript {
    font-size:14px;
    margin:10px 0px;
    color:#bbbbbb;
    text-align: center;
  }
</style>
