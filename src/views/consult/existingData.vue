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
        <div class="btns">
            <button type="submit" @click="goTo(2)" v-if="activeUserInfo && (activeUserInfo.is_vip == 1)">会员支付</button>
            <button type="submit" @click="goTo(1)">微信支付</button> 
        </div>
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
                order:this.$route.query,
                notClick: true
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
                    console.log("userInfoList", this.userInfoList)
                })
            },
            goTo(pay_mode){
                if (!this.notClick) return
                this.notClick = false
                console.log("pay_mode", pay_mode)
                console.log(this.order.acTime)
                let acTime = {date:{plan_id:''},time:{sjc:'1562994000'}}
                if (this.order.acTime) {
                    acTime = JSON.parse(this.order.acTime)
                }

                if (this.activeUserInfo !== null){
                    this.$axios.post('Chatorder/addOrder',this.$Qs.stringify({
                        openid:sessionStorage.openid,
                        department_id:this.order.department_id,
                        doctor_id:this.order.doctor_id,
                        record_id:this.activeUserInfo.id,
                        type:this.order.type,
                        money:this.order.money,
                        plan_id:acTime.date.plan_id,
                        register_time:acTime.time.sjc,
                        pay_mode: pay_mode
                    })).then(res=>{
                        console.log(res)
                        if (res.data.errcode == 0) {
                            // callPay(res.data);
                            if (pay_mode == 1) {
                              this.callPay(res.data.data);    
                            } else {
                               this.$toast.success('申请成功\n请耐心等待\n医生接单回复');
                               setTimeout(() => {
                                 this.$router.push("/consult/personal/personal") 
                               }, 1000)
                            }
                            
                            // alert(std);
                        } else {
                            this.notClick = true
                            this.$toast.fail('请稍后重试');
                        }
                    });
                } else {
                    this.notClick = true
                    this.$toast.fail('请选择患者');
                }
            },
            addUserInfo(){
                this.$router.push({path:'/consult/registered/fillout'})
            },
            callPay(data)
            //    调起支付
            {
                // console.log(this.order.doctor_id)
                // this.$router.push({path: '/consult/personal/privatechat', query: {id:this.order.user_id,avatar:this.order.avatar}})
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
                            // if (this.order.doctor_id !== undefined){
                            //     if (this.order.title !== '图文咨询') {
                                    this.$router.replace('/consult/personal/personal');
                            this.$toast.success('申请成功\n请耐心等待\n医生接单回复');
                                    // return
                                // }
                                // this.$router.push({path: '/consult/personal/privatechat', query: {id:this.order.user_id,avatar:this.order.avatar}})
                            // } else {
                            //     this.$toast.success('申请成功');
                            //     this.$router.go(-2);
                            // }

                            //window.location.href="http://m.blog.csdn.net/article/details?id=72765676";
                        }else if(res.err_msg === "get_brand_wcpay_request:cancel"){
                            // alert('xxxx')
                            this.notClick = true
                            alert("用户取消支付!");

                        }else{
                            this.notClick = true
                            alert("支付失败!");
                        }
                    }
                );
            }
        }
    }
</script>

<style scoped lang="scss">
    .btns{
        position: fixed;
        bottom: 1rem;
        left: 0; 
        width:100%;
        display: flex;
        justify-content:center;

        button{
            background: linear-gradient(to bottom right, #4d8fec, #4d8fec);
            border-radius: .1rem;
            border: none;
            width: 2.5rem;
            color: white;
            height: .8rem;
            margin:0 .2rem;
        }
        button:first-child{
            background:none;
            border:1px solid #4d8fec;
            color:#4d8fec;
        }
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
            color: #4d8fec;
            font-size: .3rem;
            font-weight: 200;
        }
        button{
            background: #daf8f7;
            padding: .2rem .6rem;
            border: none;
            border-radius: 5px;
            color: #4d8fec;
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
            box-shadow: 0 0 5px 1px rgba(77, 143, 236,0.3);
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
