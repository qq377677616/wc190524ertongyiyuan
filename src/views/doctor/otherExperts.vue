<template>
<!--    其他专家详情-->
    <div>
        <section class="introduction">
            <article id="top">
                <div class="info">
                    <img src="" alt="">
                    <div>
                        <p>湘雅牙科团队</p>
                        <span>领衔专家:张建国</span>
                    </div>
                </div>
                <button @click="joinTeam" type="submit">加入团队</button>
            </article>
            <article id="bottom">
                <span>团队介绍:</span>
                <p>医生,一般称临床医生。收到货分手快乐健康福利是客服经理收快递放假了速度快解放了</p>
            </article>
        </section>
        <section class="team-detail">
            <article class="team-list">
                <p class="title">团队领衔专家</p>
                <div class="info">
                    <img src="" alt="">
                    <div>
                        <p class="username">张讲过 <span>| 知名专家</span></p>
                        <p class="tag">
                            <span>
                                长沙湘雅医院
                            </span>
                            <span>
                                长沙湘雅医院
                            </span>
                        </p>
                    </div>
                </div>
            </article>
            <article class="team-list">
                <p class="title">团队其他成员（3人）</p>
                <div class="info">
                    <img src="" alt="">
                    <div >
                        <p class="username">张讲过 <span>| 知名专家</span></p>
                        <p class="tag">
                            <span>
                                长沙湘雅医院
                            </span>
                            <span>
                                长沙湘雅医院
                            </span>
                        </p>
                    </div>
                </div>
            </article>
            <article class="team-advisory">
                <p>专家团队咨询 <span>（次数：50）</span></p>
                <span>查看全部 ></span>
            </article>
            <article class="team-advisory-list">
                <h4>标题标题标题标题标题标题标题标题标题标题</h4>
                <p>疾病：<span>深刻的解放路口设计的福利</span></p>
            </article>
        </section>
    </div>
</template>

<script>
    export default {
        name: "otherExperts",
        data(){
            return{

            }
        },
        created(){
          this.getTeamInfo()
        },
        methods:{
            joinTeam(){
                this.$axios.post('team/joinTeam',{team_building:'',doctor_id:''}).then(res=>{
                    console.log(res)
                })
            },
            getTeamInfo(){
                this.$axios.get('Team/myTeam',{team_building:'1'}).then(res=>{
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .introduction{
        padding: .3rem;
    }
    .introduction{
        color: white;
        height: 4rem;
        background-image: url("../../assets/phoneserve/BG.png");
        background-repeat: no-repeat;
        background-size: cover;
        #top, #bottom{
            display: flex;
        }
        #top{
            justify-content: space-between;
            align-items: center;
            margin-bottom: .4rem;
            .info{
                display: flex;
                align-items: center;
                div{
                    p{
                        font-size: .35rem;
                    }
                    span{
                        font-size: .25rem;
                        font-weight: 200;
                    }
                    margin-left: .2rem;
                }
            }
            button{
                color: white;
                border-radius: 5px;
                border: none;
                background: #4ed1ce;
                font-size: .25rem;
                padding: .1rem .3rem;
            }

        }
        #bottom{
            span{
                font-size: .3rem;
                display: block;
                width: 20%;
            }
            p{
                font-size: .3rem;
                flex: 1;
                font-weight: 200;
            }
        }
        img{
            display: block;
            height: 1.5rem;
            width: 1.5rem;
            background: #9b9c9d;
            border-radius: 5px;
        }
    }
    .team-detail{
        background-color: white;
        border-radius: 20px 20px 0 0;
        margin-top: -.7rem;

        .title{
            color: #2accb4;
            line-height: .8rem;
        }
        .team-list{
            padding:0 .3rem .3rem .3rem;
            border-bottom:3px #ecedee solid;
            img{
                height: 1.6rem;
                width: 1.6rem;
                display: block;
                background: #9b9c9d;
                border-radius: 5px;
            }

            .info{
                display: flex;
                /*align-items: center;*/
                div{
                    flex: 1;
                    margin-left: .2rem;
                    .username{
                        font-size: .35rem;
                        color: #4c4c4c;
                        span{
                            font-size: .28rem;
                            font-weight: 200;
                            color: #a7a8a8;
                        }
                    }
                }
                .tag{
                    line-height: .8rem;
                    span{
                        background: #e5f8f8;
                        font-weight: 200;
                        font-size: .25rem;
                        color: #219e9d;
                        padding: .05rem .2rem;
                        border-radius: 20px;
                        margin-right: .3rem;
                    }
                }
            }
        }
        .team-advisory{
            line-height: .8rem;
            padding: 0 .3rem;
            border-bottom:3px #ecedee solid;
            display: flex;
            justify-content: space-between;
            p{
                font-size: .3rem;
                span{
                    font-weight: 200;
                }
            }
            >span{
                color: #219e9d;
                font-size: .25rem;
            }
        }
        .team-advisory-list{
            padding: .3rem;
            h4{
                font-weight: 400;
                font-size: .3rem;
            }
            p{
                font-weight: 200;
                font-size: .25rem;
            }
        }
    }
</style>