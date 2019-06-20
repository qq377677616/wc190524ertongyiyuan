<template>
    <div>
        <section class="doctors-info">
            <article class="avatar-info">
                <img :src="doctorInfo.avatar" alt="头像">
                <div class="title">
                    <span>{{doctorInfo.real_name}}</span><br>
                    <p>{{doctorInfo.level === 1?'专家':'知名专家'}}</p>
                    <article class="tag">
                        <span>{{doctorInfo.hnane}}</span>
                        <span>{{doctorInfo.lname}}</span>
                    </article>
                </div>
                <div class="introduction">
                    <span class="al">主治:</span>
                    <span>{{doctorInfo.describe.slice(3)}}</span>
                </div>
            </article>
        </section>
        <section class="listDate">
            <article class="listDate-title">
                <span :class="item==='执业经历'?'active-title':''" v-for="item in ['执业经历','医生寄语','任职医院',]">{{item}}</span>
            </article>
            <div v-for="item of doctorInfo.experience">
                <p>{{item.year}}</p>
                <span>{{item.experience}}</span>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "introduction",
        data(){
            return{
                doctorInfo:{}
            }
        },
        created() {
            this.getDoctorInfo();
        },
        mounted(){

        },
        methods:{
          getDoctorInfo(){
              this.$axios.get('Patient/userDoctor',{doctor_id:1}).then((res)=>{
                  // console.log(res.data.doctor)
                  this.doctorInfo = res.data.doctor
              })
          }
        }
    }
</script>

<style scoped lang="scss">
    .active-title {
        border-bottom: 2px #01bdb8 solid;
        color: #01bdb8;
    }
    .doctors-info {

        /*width: 100%;*/
        height: 5rem;
        background: url("../../assets/phoneserve/BG.png");
        background-size: cover;

        .avatar-info {
            line-height: 0.4rem;
            padding: .3rem;

            img {
                margin-right: 0.2rem;
                float: left;
                width: 1.45rem;
                height: 1.45rem;
                background: #9b9c9d;
                background-size: cover;
                border-radius: 50%;
            }

            .title {
                font-size: 0.4rem;
                font-weight: 600;
                padding-top: 0.25rem;
                color: white;

                p {
                    font-size: .3rem;
                    font-weight: 200;
                    margin-top: .1rem;
                }

                #zj {
                    font-weight: 200;
                }

                .ic {
                    font-size: 0.25rem;
                    font-weight: 300;
                }
            }
        }

        .tag {
            margin-top: 0.5rem;

            span {
                color: white;
                font-size: 0.2rem;
                background: rgba(255, 255, 255, 0.2);
                padding: 3px 10px;
                border-radius: 20px;
                font-weight: 300;
                margin-right: 0.3rem;
            }
        }

        .introduction {
            margin-top: .6rem;
            display: flex;
            color: white;

            span {
                display: block;
                font-weight: 200;
                font-size: .3rem;
                line-height: .45rem;
            }

            .al {
                width: 28%;
                font-weight: 400;
            }
        }

    }
    .listDate {
        background: white;
        margin-top: -0.45rem;
        border-radius: 20px 20px 0 0;
        width: 100%;
        /*position: absolute;*/
        height: auto;

        .listDate-title {
            line-height: 1rem;
            font-size: 0.35rem;
            display: flex;
            text-align: center;
            border-bottom: 1px #f0f0f0 solid;

            span {
                width: 100%;
            }
        }

    }
    /*}*/
</style>