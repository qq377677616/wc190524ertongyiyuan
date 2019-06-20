<template>
    <div style="height: 100%">
        <section class="title">
            <p>预约信息 (2019-06-17 星期一 上午)</p>
        </section>
        <section class="form-info">
            <p><span>就诊医院：</span>京都儿童医院</p>
            <p><span>预约医生：</span>张讲过</p>
            <p ><span>门诊时间：</span>2019-06-17 星期一</p>
            <p><span>门诊类型：</span>口腔科专家门诊</p>
            <p style="color: #00b5bd"><span>挂号费：</span>100元</p>
        </section>
        <section>
            <div class="form-sub">
                <span>患者姓名：</span>
                <p>张建东 </p>
            </div>
            <div class="form-sub">
                <span>手机号码：</span>
                <p>14:30-15:30 </p>
            </div>
            <div class="form-sub">
                <span>身份证号：</span>
            </div>
            <div class="form-sub">
                <span>就诊类型：</span>
                <p>请填写疾病信息 </p>
            </div>
        </section>
        <section class="pay-btn">
            <span @click="hello">确认支付</span>
        </section>
    </div>
</template>

<script>

    export default {
        name: "payForm",
        data(){
            return{
                items:[]
            }
        },
        created(){

        },
        methods:{
            hello(){
                callpay();
            }
        }
    }
</script>

<style scoped lang="scss">
    .pay-btn{
        position: fixed;
        bottom: 1rem;
        width: 100%;
        text-align: center;
        span{
            padding: .2rem .7rem;
            background: linear-gradient(to bottom right, #4ae2df, #02bdb9);
            border-radius: .1rem;
            color: white;
            font-size: .3rem;
        }
    }
    .title{
        padding: .3rem;
        background: #c7fef5;
        color: #02bdb9;
        p{
            border-left:.07rem #45cac6 solid;
            padding-left: .2rem;
            font-size: .32rem;

        }
    }
    .form-info{

        font-size: .3rem;
        color: #4c4c4c;
        border-bottom:.1rem #f5f5f5 solid;
        span{
            color: #a1a7a8;
            display: block;
            width: 1.7rem;
        }
        p{
            border-bottom:1px #eff1ef solid;
            display: flex;
            padding:.3rem;
        }
    }
.form-sub{
    padding: .3rem;
    display: flex;
    /*justify-content: space-between;*/
    border-bottom:1px #eff1ef solid;
    font-size: .32rem;
    span{
        color: #7b7b7b;
    }
    p{
        color: #4c4c4c;
    }
    label{
        color: #4c4c4c;
    }
}
</style>