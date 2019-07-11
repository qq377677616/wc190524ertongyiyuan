<template>
    <div style="min-height: 100vh">
        <section class="bulletin">
            <span >问诊中</span>
            <span style="text-decoration:line-through" @click="scull">剩余:23小时59分39秒 剩余回答次数:6次</span>
        </section>
        <section class="content">
            <dl class="wrap" ref="chatBox">
                <dd v-for="(item, index) in thingList" :key="index" :class="[item.type === 1 ? 'my' : '']">
                    <div class="avatar"
                         :style="item.type === 1?`background-image:url(${myImg})`:`background-image:url(${toImg})`"></div>
                    <div class="message" :class="{'my-message':item.type === 1}">{{item.con}}</div>
                </dd>
            </dl>

        </section>
        <article class="my-input">
            <!--                <img src="../../../assets/privateChat/yuyin.png" alt="语音按钮">-->
            <label>
                <input @blur="blur" @focus="focus" type="search" v-model="value" @onkeydown="onTextareaKeyDown()">
            </label>
            <span @click="handMsgSend" @keydown.enter="handMsgSend">发送</span>
            <!--                <img src="../../../assets/privateChat/gengduo.png" alt="更多按钮" @click="hello">-->
        </article>
    </div>
</template>

<script>

    import {lock, unlock} from 'tua-body-scroll-lock';
    import {getToid, msgSend, getLastC2CHistoryMsgs,scull} from "../../../util/imchat"
    import {mapState} from 'vuex'

    const targetElement = document.querySelector('body');
    // const targetElement1 = document.querySelector('main');
    const targetElementS = document.querySelector('dl');
    // console.log(targetElement);
    // lock(targetElement);
    lock(targetElement);
    unlock(targetElement);


    export default {
        name: "privateChat",
        data() {
            return {
                thingList:[],
                value:'',
                toImg:this.$route.query.avatar,
                myImg:sessionStorage.headimgurl
            }
        },
        computed:{
            ...mapState({
                historical:'historical',
                loginStd:'loginStd',
                newMessage:'newMessage'
            })
        },
        watch:{
            newMessage(e){
                this.thingList.push(e)
            },
            historical(e){
                for (let item of e) {
                    if (item.isSend) {
                        this.thingList.push({type: 1, con: item.getElems()[0].content.text})
                    } else {
                        this.thingList.push({type: 0, con: item.getElems()[0].content.text})
                    }
                    this.$toast.clear();
                }
                if (e.length === 0) {
                    this.$toast.clear()
                    console.log("没有历史消息了:data=" + JSON.stringify(options));
                }
            },
            loginStd() {
                this.initMethods()
            }
        },
        created() {
            if (this.loginStd){
                this.initMethods()
            }
            //登录过度
            // this.getToId()
            // this.$toast.loading({
            //     mask: true,
            //     message: '加载中...',
            //     duration: 0
            // });
        },
        mounted() {
            // this.thingList.push({type: 0, con: '请问您需要咨询什么内容？'})

        },
        methods: {
            async initMethods(){
                await this.getToId()
                await getLastC2CHistoryMsgs()
            },
            handMsgSend(){
                let std = msgSend(this.value);
                if (std){ //判断是否成功,成功则更新数据
                    this.thingList.push({type: 1,con: this.value})
                    this.value = ''
                    document.body.scrollTop = 10000000
                }
            },
            onTextareaKeyDown(){

            },
            getToId(){

                getToid(this.$route.query.id) //传入toId
            },
            scull() {
                scull(this.thingList)
            },
            blur() {
                // document.documentElement.scrollTop = 100000000;
                // document.body.scrollTop = 100000000;
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;

                setTimeout(() => {
                    document.documentElement.scrollTop = 100000000;
                    document.body.scrollTop = 100000000;
                }, 1000)
            },
            focus() {
                setTimeout(() => {
                    document.body.scrollTop = 10000000
                },400)
            },
        }
    }
</script>

<style scoped lang="scss">
    .my-input {
        /*border-radius: 20px 20px 0 0;*/
        padding: 0 .3rem;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 1.3rem;
        background-color: #00b5bd;
        display: flex;
        align-items: center;

        label {
            width: 78%;
        }

        input {
            box-sizing: border-box;
            width: 100%;
            background-color: white;
            border: none;
            padding: .2rem .2rem;
            border-radius: 5px;
        }

        span {
            text-align: center;
            display: block;
            width: 15%;
            flex-shrink: 0;
            background-color: white;
            padding: .1rem .3rem;
            border-radius: .1rem;
            color: #09aba7;
            margin-left: .2rem;
        }
    }

    .bulletin {
        z-index: 2000;
        padding: 0 .3rem;
        box-sizing: border-box;
        position: fixed;
        top: 0;
        line-height: .8rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        color: #01bdbb;
        font-size: .3rem;
        background-color:white;

        :nth-child(1) {
            width: 20%;
            font-weight: 200;
        }
    }

    .content {
        padding-top: 1rem;
        padding-bottom: 1.3rem;
    }

    .wrap {
        width: 100%;
    }

    .my-message {
        background-color: rgba(1, 189, 187, 0.5) !important;
    }

    .content dd {
        margin-bottom: .2rem;
        position: relative;
        display: flex;
        padding-left: .3rem
    }

    .content dd .avatar {
        width: .75rem;
        height: .75rem;
        border-radius: 50%;
        background: url(../../../assets/privateChat/WechatIMG146.png) no-repeat center;
        background-size: cover;
    }

    .content dd.my .avatar {
        background: url(../../../assets/privateChat/WechatIMG147.jpeg);
        background-size: cover;
    }

    .content dd .message {
        max-width: 60%;
        background-color: #ecedee;
        border-radius: .1rem;
        padding: .26rem .45rem;
        font-size: .24rem;
        line-height: .4rem;
        color: #303133;
        margin: 0 .2rem;
        position: relative;
        word-break: break-all;
        font-weight: bold;
    }

    .content dd .message::after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border: .13rem solid transparent;
        border-right-color: #ecedee;
        position: absolute;
        right: 100%;
        top: .23rem;
    }

    .content dd.my {
        flex-direction: row-reverse;
        padding-right: .3rem
    }

    .content dd.my .message::after {
        border-right-color: transparent;
        border-left-color: rgba(1, 189, 187, 0.5);
        left: 100%;
        right: auto;
    }
</style>