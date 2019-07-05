<template>
    <!--    现有资料-->
    <div style="height: 100%">
        <section class="prompt">
            <p><span>提示：</span>急重症患者不适合网上诊疗/咨询请即刻前往当地医院急诊</p>
        </section>
        <section class="existing-data">
            <p>您想要为哪位患者咨询？</p>
            <span>错误的患者信息会误导医生，请慎重选择</span>
            <button type="button" @click="addUserInfo"><i class="el-icon-plus"></i>创建患者信息</button>
            <ul>
                <li :class="{'active-bg':activeUserInfo === item}" v-for="item of userInfoList" @click="activeUserInfo = item">
                    <span class="icon active-user"></span>
                    <span class="name">{{item.name}}</span>
                    <span class="gender">{{item.sex === '1'?'男':'女'}}</span>
                    <span>{{item.age}}岁</span>
                </li>
            </ul>
        </section>
        <button type="submit" @click="goTo">确 认</button>
    </div>
</template>

<script>
    const data = {
        "appId": "wx6158db73b114e2b2",
            "nonceStr": "QexQbt14lkHYnBt7oxNfP0EF3fwTdlHG",
            "package": "prepay_id=wx141339103885001390e53f6a1784429900",
            "signType": "MD5",
            "timeStamp": "1560490750",
            "paySign": "6880A920E0F8096AA1F67E031B250019"
    }

    function callPay(data)
    {
        if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
            }
        }else{
            return jsApiCall(data);
        }
    }

    function jsApiCall(item)
    {
        // let data = {item};
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', item,
            function(res){
                WeixinJSBridge.log(res.err_msg);
                //alert('err_code:'+res.err_code+'err_desc:'+res.err_desc+'err_msg:'+res.err_msg);
                //alert(res.err_code+res.err_desc+res.err_msg);
                // alert(res.err_msg);
                if(res.err_msg === "get_brand_wcpay_request:ok"){
                    alert("支付成功!");
                    return 200
                    //window.location.href="http://m.blog.csdn.net/article/details?id=72765676";
                }else if(res.err_msg === "get_brand_wcpay_request:cancel"){
                    alert("用户取消支付!");
                    return 300
                }else{
                    alert("支付失败!");
                    return 400
                }
            }
        );
    }


    export default {
        name: "existingData",
        data(){
            return{
                userInfoList:[],
                activeUserInfo:null,
                order:this.$route.query
            }
        },
        created() {
            this.getUserInfoList();
            console.log(this.$route.query)
        },
        methods:{
            getUserInfoList(){
                this.$axios.get('Consulting/getPatientList',{user_id:sessionStorage.user_id}).then(res=>{
                    console.log(sessionStorage.user_id);
                    console.log(res.data);
                    this.userInfoList = res.data.data
                })
            },
            goTo(){

                if (this.activeUserInfo !== null){
                    this.$axios.post('Chatorder/addOrder',this.$Qs.stringify({
                        openid:sessionStorage.openid,
                        department_id:this.order.department_id,
                        doctor_id:this.order.doctor_id,
                        record_id:this.activeUserInfo.id,
                        type:this.order.type,
                        money:this.order.money,
                        register_time:'1999-12-23'
                    })).then(res=>{

                        if (res.data.msg === 'ok') {
                            // callPay(res.data);
                            this.callPay(res.data.data);
                            // alert(std);

                        }else {
                            this.$toast.fail('请稍后重试');
                        }
                    });
                } else {
                    this.$toast.fail('请选择患者');
                }
            },
            addUserInfo(){
                this.$router.push({path:'/consult/registered/fillout'})
            },
            callPay(data)
            //    调起支付
            {
                if (typeof WeixinJSBridge == "undefined"){
                    if( document.addEventListener ){
                        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                    }else if (document.attachEvent){
                        document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                    }
                }else{
                    return this.jsApiCall(data);
                }
            },
            jsApiCall(item)
            {
                // let data = {item};
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', item,
                    (res)=>{
                        WeixinJSBridge.log(res.err_msg);
                        //alert('err_code:'+res.err_code+'err_desc:'+res.err_desc+'err_msg:'+res.err_msg);
                        //alert(res.err_code+res.err_desc+res.err_msg);
                        // alert(res.err_msg);
                        if(res.err_msg === "get_brand_wcpay_request:ok"){
                            // alert('hello');
                            // alert("支付成功!");

                                if (this.order.title !== '图文咨询') {
                                    this.$toast.success('申请成功');
                                    this.$router.go(-2);
                                    return
                                }
                                this.$router.push({path: '/consult/personal/privatechat', query: {id:this.order.user_id,avatar:this.order.avatar}})
                            //window.location.href="http://m.blog.csdn.net/article/details?id=72765676";
                        }else if(res.err_msg === "get_brand_wcpay_request:cancel"){
                            // alert('xxxx')
                            alert("用户取消支付!");

                        }else{
                            alert("支付失败!");
                        }
                    }
                );
            }
        }
    }
</script>

<style scoped lang="scss">
    button[type='submit']{
        position: fixed;
        bottom: 1rem;
        background: linear-gradient(to bottom right, #4ae2df, #02bdb9);
        border-radius: .1rem;
        border: none;
        width: 2.5rem;
        color: white;
        height: .8rem;
        left: calc(50% - 1.25rem);
    }
    ul li{
      list-style: none;
    }
    .prompt {
        background: url("../../assets/reservation/BG.png");
        background-size: cover;
        padding: .3rem;

        p {
            background: url("../../assets/fillout/gantan.png") no-repeat;
            background-size: .8rem;
            background-position: left;
            padding-left: 1rem;
            line-height: 0.4rem;
            color: white;
            font-size: .35rem;
            font-weight: 200;

            span {
                font-weight: 400;
            }
        }
    }

    .existing-data{
        padding:0 .3rem;
        p{

            margin-top: .3rem;
            font-size: .4rem;
        }
        p+span{
            color: #01bdbb;
            font-size: .3rem;
            font-weight: 200;
        }
        button{
            background: #daf8f7;
            padding: .2rem .6rem;
            border: none;
            border-radius: 5px;
            color: #01bdbb;
            font-size: .35rem;
            font-weight: 200;
            margin-top: .3rem;
            i{
                margin-right: .2rem;
                font-weight: 800;
            }
        }
        .active-user{
            background-image: url("../../assets/existingData/userac.png") !important;
            background-color: #e2fffe !important;
        }
        .active-bg{
            background-color: white;
            box-shadow: 0 0 5px 1px rgba(1,189,186,0.3);
        }
        ul {
            li{
                margin-top: .35rem;
                display: flex;
                align-items: center;
                background-color: #f1f2f3;
                line-height: .9rem;
                border-radius: 5px;
                padding-left: .55rem;
                .icon{
                    display: block;
                    width: .4rem;
                    height: .4rem;
                    background-color: white;
                    border-radius: 50%;
                    text-align: center;
                    background-image: url("../../assets/existingData/userbai.png");
                    background-repeat: no-repeat;
                    background-size: .2rem;
                    background-position: center;
                    margin-right: .2rem;
                }
                .name,.gender{
                    padding-right: .5rem;
                }
                .gender, .gender+span{
                    font-weight: 200;
                }
            }
        }
    }

</style>