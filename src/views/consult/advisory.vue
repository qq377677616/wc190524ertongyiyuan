<template>
<!--    咨询-->
    <div class="advisory">
        <section v-for="item of doctors" @click="goTo(item)">
            <div class="avatar" :style="`background-image:url(${item.avatar})`"></div>
            <div class="content">
                <p>
                    {{item.real_name}}
                    <span>| {{item.level === '1'?'专家':'知名专家'}}</span>
                </p>
                <div>
                    <span v-for="ret of item.label">{{ret}}</span>
                </div>
                <span>
                    擅长:口腔疾病
                </span>
            </div>
        </section>
        <p class="toast" v-show="doctors === undefined || doctors.length === 0">暂无医生</p>
    </div>
</template>

<script>
    export default {
        name: "advisory",
        data(){
            return{
                doctors:[]
            }
        },
        created(){
            this.consultDoctorList()
        },
        methods:{
            goTo(ret){
              this.$router.push({path:'/consult/registered/knowndoctor',query:{id:ret.doctor_id}})
            },
            consultDoctorList(){
                this.$axios.get('Patient/consultDoctorList',{
                    user_id:sessionStorage.user_id,
                    openid:sessionStorage.openid,
                    status:2
                }).then(res=>{
                    console.log(res.data.data)
                    this.doctors = res.data.data
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .advisory{
        /*margin-top: 2rem;*/
        color: #96999e;
        font-size: .6rem;
        text-align: center;
    }
section{
    padding: .3rem;
    display: flex;
    align-items: center;
    border-bottom:.1rem #f4f4f4 solid;
    .avatar{
        width: 1.5rem;
        height: 1.5rem;
        background-color: #f4f4f4;
        border-radius: .1rem;
        background-size: cover;
    }
    .content{
        line-height: .5rem;
        padding-left: .2rem;
        >p{
            font-size: .3rem;
            span{
                font-size: .25rem;
                color: #96999e;
            }
        }
        div{
            span{
                background-color: #dbf1f0;
                color: #0FC4C0;
                padding: 0 .2rem;
                font-size: .25rem;
                border-radius: .3rem;
                margin-right: .1rem;
            }
        }
        >span{
            font-size: .25rem;
            color: #96999e;
        }
    }
}
</style>