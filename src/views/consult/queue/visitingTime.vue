<template>
    <div style="height: 100%">
        <section class="doctor-info" @click="goTo(doctorInfo.id)">
            <div id="left">
                <div class="avatar" :style="`background-image:url(${doctorInfo.avatar})`"></div>
                <div class="info">
                    <p>
                        <span>{{doctorInfo.real_name}}</span>
                        <span> {{doctorInfo.position}}</span>
                    </p>
                    <p>已挂号：{{doctorInfo.ghs}}</p>
                </div>
            </div>
            <i id="right" class="el-icon-arrow-right"></i>
        </section>
        <transition name="fade" mode="out-in">
        <router-view :doctorInfo="doctorInfo"></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "visitingTime",
        data(){
            return{
                doctorInfo:{}
            }
        },
        created() {

            this.getDoctorGh()
        },
        methods:{
            goTo(id){
                this.$router.push({path:'/consult/registered/knowndoctor',query:{id:id}})
            },
            getDoctorGh(){
                this.$axios.get('Consulting/getDoctorGh',{doctor_id:this.$route.query.nid,}).then(res=>{
                    console.log(res.data.data)
                    this.doctorInfo = res.data.data
                })
            }
        }
    }
</script>

<style scoped lang="scss">
.doctor-info{
    height: 1.6rem;
    // background: url("../../../assets/consult/BG.png") no-repeat;
    background: url("../../../assets/reservation/newTopBg.png") no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .2rem .3rem;
    #right{
        font-size: .4rem;
        color: white;
    }

    #left{
        display: flex;
        align-items: center;
        .avatar{
            background-size: cover;
            background-position:center;
            background-color: white;
            border-radius: 50%;
            height: 1.4rem;
            width: 1.4rem;
            margin-right: .2rem;
        }
        .info{
            p{
                font-size: .25rem;
                color:white;
                font-weight:200;
                :nth-child(1){
                    font-weight: 400;
                    font-size: .35rem;
                }
            }
        }
    }
}
</style>