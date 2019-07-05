<template>
    <div style="height: 100%">
        <section class="title">
            <p>预约信息 ({{dateList.date}})</p>
        </section>
        <section class="form-info">
            <p><span>就诊医院：</span>{{dateList.hospital}}</p>
            <p><span>预约医生：</span>{{dateList.doctorName}}</p>
            <p ><span>门诊时间：</span>{{dateList.date}}</p>
            <p><span>门诊类型：</span>{{dateList.types}}</p>
            <p style="color: #00b5bd"><span>挂号费：</span>{{dateList.cost}}元</p>
        </section>
        <section>
            <div class="form-sub">
                <span>患者姓名：</span>
                <p>{{dateList.name}} </p>
            </div>
            <div class="form-sub">
                <span>手机号码：</span>
                <p>{{dateList.phone}} </p>
            </div>
            <div class="form-sub">
                <span>身份证号：{{dateList.card}}</span>
            </div>
            <div class="form-sub">
                <span>就诊类型：</span>
                <p class="diseased">{{dateList.diseased}} </p>
            </div>
        </section>
        <section class="pay-btn">
            <span @click="payRegister">确认支付</span>
        </section>
    </div>
</template>

<script>

    export default {
        name: "payForm",
        data(){
            return{
                dateList:this.$route.query,
                items:[],
                doctorInfo:{}
            }
        },
        created(){
            console.log(this.$route.query)
            // this.getDoctorGh()
        },
        methods:{
            payRegister(){
                this.$axios.post('Consulting/register',{
                    hospital_id:1,
                    department_class_id:'',
                    plan_id:'',
                    doctor_id:'',
                    record_id:'',
                    register_time:'',
                    jbxx:'',
                    cfzbz:'',

                })
            },
            // getDoctorGh(){
            //     this.$axios.get('Consulting/getDoctorGh',{doctor_id:1,}).then(res=>{
            //         console.log(res.data.data)
            //         this.doctorInfo = res.data.data
            //     })
            // }
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
    .diseased{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        width: 3rem;
    }
    label{
        color: #4c4c4c;
    }
}
</style>