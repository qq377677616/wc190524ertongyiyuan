<template>
<!--    电话服务-->
    <div class="phone-service">
<!--        <section class="doctors-info">-->
<!--            <div>-->
<!--                <article class="avatar-info">-->
<!--                    <img src="../../assets/search.png" alt="头像">-->
<!--                    <div>-->
<!--                        <span>张讲过</span><br>-->
<!--                        <span class="ic">主任医师 副教授</span>-->
<!--                    </div>-->
<!--                </article>-->
<!--                <article class="tag">-->
<!--                    <span>京都儿童医院</span>-->
<!--                    <span>儿童牙医科室</span>-->
<!--                </article>-->
<!--                <article class="text">-->
<!--                    <p>推荐热度 (综合) ：5.0 (近两年患者推荐)</p>-->
<!--                    <p>在线服务满意度：100%</p>-->
<!--                    <p>一般等待时长：快</p>-->
<!--                </article>-->
<!--            </div>-->
<!--        </section>-->
        <section class="doctors-info">
            <article class="avatar-info">
                <img :src="depaInfo.avatar" alt="头像">
                <div class="title">
                    <div>
                        <span>{{depaInfo.name}}</span><br>
                        <div class="info-li">
                            <span>帮助患者数：32266位</span>
                            <span id="li-ii">一般等待时长：快</span>
                        </div>
                    </div>
                    <article class="tag">
                        <span id="tag-li">团队介绍:</span>
                        <span>医生，一般称灵床考虑到时间看到法拉盛快阿萨斯大所多递费</span>
                    </article>
                </div>
            </article>
        </section>
        <div class="introduction">
            <span class="al">团队擅长:</span>
            <span>医生,可怜的减肥路上的咖啡机 </span>
        </div>
        <section class="detailed">
            <article class="icon">
                <span style="justify-content: center;width: 75%"><img src="../../assets/phoneserve/zs.png" alt="">医生真实</span>
                <span><img src="../../assets/phoneserve/wei.png" alt="">未使用随时可退</span>
                <span><img src="../../assets/phoneserve/bu.png" alt="">不满意可申诉</span>
            </article>

            <article class="detailed-text">
                <div style="display: flex;align-items: center">
                    <input
                            :value="1"
                            v-model="radio"
                            type="radio"
                            id="female"
                            name="sex"/>
                    <label
                            for="female"
                            style="font-size: 0.32rem">{{dtl.title}} {{getMoney.money / 100}}元</label><br>
                <span>6575人好评 · 256选择</span>
                </div>
                <ul>
                    <li><span>{{dtl.content}}</span></li>
                    <li><span>医生给出明确建议后问诊结束</span></li>
                    <li><span>医生接诊后问诊最长开启48小时，逾期自动结束</span></li>
                </ul>
            </article>

        </section>
        <section class="btn">
            <button @click="goTo" type="button">立即申请</button>
        </section>

    </div>
</template>

<script>

    export default {
        name: "phoneservice",
        data() {
            return {
                radio: 1,
                // consulting:JSON.parse(),
                dataList:[
                    {title:'电话咨询',content:'提交手机号码、补充完善信息 ( 医生会在下单后30分钟内主动与您联系确认 )',},
                    {title:'视频咨询',content:'提交手机号码、补充完善信息 ( 医生会在下单后30分钟内主动与您联系确认 )',},
                    {title:'图文咨询',content:'医生问诊不限交流次数',},
                    ],
                activeMoney:{},
                depaInfo:{}
            }
        },
        mounted() {
            this.getPrice();
          console.log(this.$route.query)
        },
        methods:{
            getPrice(){
              // this.$axios.get('Consulting/getConsulting',{team_id:this.$route.query.studio,user_id:sessionStorage.user_id}).then(res=>{
              //     // console.log(res.data.data)
              //     console.log(res)
              //     this.activeMoney =res.data.data
              // });
                this.$axios.get('Patient/depaDetails',{id:this.$route.query.studio,user_id:sessionStorage.user_id}).then(res=>{
                    console.log(res)
                    this.depaInfo = res.data.data
                })
            },
            goTo(){
                console.log(this.doctorInfo)
                let title = this.$route.query.title;
                this.$router.push({path:'/consult/registered/existingdata',query:{
                        department_id:this.$route.query.studio,
                        // doctor_id:this.doctorInfo.id,
                        type:this.getMoney.id,
                        money:this.getMoney.money,
                        avatar:this.depaInfo.avatar,
                        title:title,
                    }});
                // this.$router.push({path:'/consult/registered/fillout',query:{title:title}})
            }
        },
        computed:{
            dtl(){
                let item = this.$route.query.title;
                for (let i of this.dataList){
                    if (i.title === item){
                        return i
                    }
                }
            },
            getMoney(){
                let i={};
                let consulting = JSON.parse(this.$route.query.consulting)
                switch (this.$route.query.title) {
                    case '图文咨询':
                        i.money = consulting.msg_money;
                        i.id = 1;
                        break;
                    case '视频咨询':
                        i.money = consulting.video_money;
                        i.id = 2;
                        break;
                    case '电话咨询':
                        i.money = consulting.phone_money;
                        i.id = 3;
                        break;
                }
                return i
            }
        }
    }
</script>

<style scoped lang="scss">
    .introduction{
        padding:.3rem;
        height: 1.2rem;
        background: #2accb4;
        .al{
            font-weight: 400;
        }
        span{
            font-weight: 200;
            color: white;
        }
    }
    .doctors-info {
        /*width: 100%;*/
        padding-top: .3rem;
        height: 2.8rem;
        background: url("../../assets/phoneserve/BG.png");
        background-size: cover;
        /*padding-bottom: .3rem;*/
        border-bottom: 1px white solid;

        .avatar-info {
            line-height: 0.4rem;
            padding:0 .3rem;

            img {
                border-radius: .1rem;
                margin-right: 0.2rem;
                float: left;
                width: 1.45rem;
                height: 1.45rem;
                background: #9b9c9d;
                background-size: cover;
            }

            .title {
                font-size: 0.4rem;
                font-weight: 600;
                padding-top: 0.25rem;
                color: white;

                .info-li {
                    font-size: .28rem;
                    font-weight: 200;
                    margin-top: .1rem;
                    #li-ii{
                        float: right;
                    }
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
            display: flex;

            #tag-li{
                font-weight: 400;
                width: 28%;
            }
            span {
                color: white;
                font-size: 0.3rem;
                border-radius: 20px;
                font-weight: 300;
                margin-right: 0.1rem;
            }
        }
    }




    .phone-service{
        height: 100%;
    }
    .btn{
        padding: 1rem 0;
        /*position: fixed;*/
        /*bottom: 1rem;*/
        width: 100%;
        text-align: center;
        button{
            height: 0.7rem;
            width: 2.5rem;
            border-radius: 5px;
            border: none;
            color: white;
            background:linear-gradient(to bottom right, #4d8fec, #4d8fec);
            font-size: 0.3rem;
        }
    }

    .detailed {
        margin-top: -0.7rem;
        border-radius: 20px 20px 0 0;
        background: white;
        position: relative;

        .icon {
            height: 0.7rem;
            display: flex;
            padding: 0.1rem 0.3rem 0 0.3rem;
            border-bottom:1px #ecedee solid;
            img {
                margin-top: 0.1rem;
                width: 0.5rem;
                height: 0.5rem;
            }

            span {
                width: 100%;
                font-size: 0.25rem;
                display: flex;
                align-items: center;

            }
        }

        .detailed-text {
            /*position: absolute;*/
            /*left: 0;*/
            /*right: 0;*/
            /*border-bottom:.1rem #f5f3ed solid;*/
            height: 3rem;
            padding: .3rem;
            div{
                margin-left: 0.25rem;
                font-size: 0.35rem;
                span{
                    margin-left: 0.2rem;
                    font-size: 0.2rem;
                    color: #4d8fec;
                }
            }

            ul {
                margin-left: 0.8rem;
                height: 0.4rem;
                line-height: 0.6rem;
                li {
                    color: #4d8fec;
                    span {
                        font-size: 0.3rem;
                        color: #606266;
                    }
                }
            }
        }
    }

    input[type='radio'] {
        position: absolute;
        clip: rect(0, 0, 0, 0);
    }

    input[type='radio'] + label::before {
        /*background: #f6dfa7;*/
        content: " "; /*不换行空格*/
        display: inline-block;
        vertical-align: middle;
        width: 0.3rem;
        height: 0.3rem;
        margin-bottom: 0.07rem;
        margin-right: .2rem;
        border-radius: 50%;
        border: #4d8fec solid .02rem;
    }

    input[type='radio']:checked + label::before {
        width: .18rem;
        height: .18rem;
        background-color: #4d8fec;
        background-clip: content-box;
        padding: .06rem;
    }
</style>
