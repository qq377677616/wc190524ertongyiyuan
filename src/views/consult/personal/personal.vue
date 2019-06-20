<template>
    <div>
        <section class="personal">
            <article class="user-info">
                <img :src="userInfo.avatar" alt="头像">
                <div class="title">
                    <span>{{userInfo.nickname}}</span>
                    <article class="tag">
                        <span>会员等级lv1</span>
                    </article>
                </div>
            </article>
            <article class="user-content">
                <div>
                    <p>{{userInfo.money}}元</p>
                    <span>余额</span>
                </div>
                <div>
                    <p>{{userInfo.score}}</p>
                    <span>积分</span>
                </div>
                <div>
                    <p>{{userInfo.discount_num}}张</p>
                    <span>优惠券</span>
                </div>
            </article>
        </section>
        <section class="my">
            <p>我的订单</p>
            <div class="check">
                <p><span id="A"></span>代付款</p>
                <p><span id="B"></span>代发货</p>
                <p><span id="C"></span>代收货</p>
            </div>
            <div class="user-select">
                <ul>
                    <li v-for="item in userSelect" :key="item.title" @click="goTo(item.url)">
                        <img :src="item.icon" alt="icon">
                        <span>{{item.title}}</span>
                    </li>
                </ul>
            </div>
            <div class="user-select">
                <ul>
                    <li v-for="item in inFoSelect" :key="item.title" @click="goTo(item.url)">
                        <img :src="item.icon" alt="icon">
                        <span>{{item.title}}</span>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "personal",
        data(){
            return{
                userInfo:{
                    avatar:require('../../../assets/graphic/tuwen.png'),
                    nickname:'张天',
                    money:1009,
                    score:'1000',
                    discount_num:4,
                },
                userSelect:[
                    {title:'我咨询的医生',icon:require('../../../assets/personal/yuyue.png'),url:'/consult/personal/doctors'},
                    {title:'个人信息管理',icon:require('../../../assets/personal/gerenxinxi.png'),url:'/consult/personal/patientmanagement'},
                    {title:'我的病例',icon:require('../../../assets/personal/binli.png')},
                    {title:'我的挂号',icon:require('../../../assets/personal/guahao.png')},
                    {title:'我关注的医生',icon:require('../../../assets/personal/myguanzhu.png'),url:'/consult/personal/attention'},
                ],
                inFoSelect:[
                    {title:'我发布过的帖子',icon:require('../../../assets/personal/yuyue.png'),url:''},
                ]
            }
        },
        created(){
            // console.log();
          this.getUserInfo();
        },
        methods:{
            goTo(url){
                console.log(url);
                this.$router.push({path:url})
            },
            getUserInfo(){
                this.$axios.get('Patient/userHome').then((res)=>{
                    console.log(res)
                    // this.userInfo = res.data.result;
                    // console.log(this.userInfo)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .user-select{
        border-bottom:4px #f1f2f3 solid;
        /*padding: .3rem;*/
        ul li{
            display: flex;
            align-items: center;
            padding-left: .45rem;
            list-style: none;
            line-height: .8rem;
            border-bottom:1px #f1f2f3 solid;
            span{
                padding-left: .3rem;
                font-size: .3rem;
                color: #666768;
            }
            img{
                width: .3rem;
                height: .3rem;
            }
        }
    }
    .personal{
        padding-top: .3rem;
        height: 3.5rem;
        background: url("../../../assets/phoneserve/BG.png");
        background-size: cover;
        position: relative;
        .user-content{
            position: absolute;
            bottom: .6rem;
            width: 100%;
            display: flex;
            div{
                p{
                    font-size: .4rem;
                }
                span{
                    font-weight: 200;
                }
                font-size: .3rem;
                color: white;
                text-align: center;
                width: 100%;
            }
        }
        .user-info {
            /*line-height: 0.4rem;*/
            padding:0 .3rem;
            .title{
                padding-top: .2rem;
                >span{
                    font-size: .4rem;
                    color: white;
                }
            }

            .tag {
                /*margin-top: 0.1rem;*/

                span {
                    color: white;
                    font-size: 0.2rem;
                    background: rgba(255, 255, 255, 0.2);
                    padding: .03rem .2rem;
                    border-radius: 20px;
                    font-weight: 300;
                    margin-right: 0.3rem;
                }
            }

            img {
                margin-right: 0.2rem;
                float: left;
                width: 1.45rem;
                height: 1.45rem;
                background: #9b9c9d;
                background-size: cover;
                border-radius: 50%;
            }

        }
    }

    .my{
        position: relative;
        border-radius: 20px 20px 0 0;
        z-index: 1;
        background: white;
        height: 2rem;
        margin-top: -.4rem;
        /*article{*/
        /*    position: absolute;*/
        /*    left: 0;*/
        /*    right: 0;*/
        /*}*/
        >p{
            text-align: center;
            line-height: .8rem;
            color: #666768;
            border-bottom:1px #f1f2f3 solid;
        }
        .check{
            color: #666768;
            display: flex;
            border-bottom:5px #f1f2f3 solid;
            padding-bottom: .1rem;
            p{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                line-height: 1.5rem;
                span{
                    margin-right: .1rem;
                    display: block;
                    width: .7rem;
                    height: .7rem;
                    background-color: #e0f4f4;
                    border-radius: 50%;
                    background-size: .4rem;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                #A{
                    background-image: url("../../../assets/personal/mn.png");
                }
                #B{
                    background-image: url("../../../assets/personal/fahuo.png");
                }
                #C{
                    background-image: url("../../../assets/personal/shouhuo.png");
                }

            }
        }
    }
</style>