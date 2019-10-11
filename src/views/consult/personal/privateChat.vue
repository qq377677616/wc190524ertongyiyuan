<template>
    <div style="height: 100%">
        <section class="bulletin">
<!--          <span >问诊中</span>-->
<!--         <span style="text-decoration:line-through" @click="scull">剩余:23小时59分39秒 剩余回答次数:6次</span>-->
        </section>
        <section class="content">
            <dl class="wrap" ref="chatBox">
                <dd v-for="(item, index) in thingList"
                    :key="index"
                    :class="[item.type === 1 ? 'my' : '']">
                    <div class="avatar"
                         :style="item.type === 1
                         ? `background-image:url(${myImg})`
                         : `background-image:url(${toImg})`"/>
                    <div class="message"
                         :class="{'my-message':item.type === 1}">
                        <span @click="imageClick(item)" v-html="item.con"/>
                    </div>
                </dd>
            </dl>
        </section>
        <article class="my-input" v-if="isChat">
            <label>
                <input @blur="blur"
                       @focus="focus"
                       type="search"
                       v-model="value"
                       @onkeydown="onTextareaKeyDown()">
            </label>
            <span @click="handMsgSend" @keydown.enter="handMsgSend">发送</span>
            <van-uploader :after-read="uploadImage">
                <i :class="iconName"></i>
            </van-uploader>
        </article>
        <div class="showImg" v-show="activeImg.url !== ''">
            <i class="el-icon-close" @click="showClose"/>
            <img :src="activeImg.url" alt="">
        </div>
    </div>
</template>

<script>

    import {getToid, msgSend, getLastC2CHistoryMsgs,scull,uploadPic,convertImageMsgToHtml} from "../../../util/imchat"
    import {mapState} from 'vuex'

    import timg1 from '../../../assets/timg.gif'

    export default {
        name: "privateChat",
        data() {
            return {
                isChat:null,
                iconName:'el-icon-picture-outline',
                activeImg:{
                    url:'',
                    top:0,
                },
                thingList:[],
                value:'',
                toImg:this.$route.query.avatar,
                myImg:this.$store.state.myAvatar
            }
        },
        computed:{
            ...mapState({
                historical:'historical',
                loginStd:'loginStd',
                newMessage:'newMessage',
                images:'images'
            })
        },
        watch:{
            images(e){ //新图片类型消息
                this.thingList.push({type: 1, con: e.html,std:'img',bigImgUrl:e.bigImage})
                this.iconName = 'el-icon-picture-outline'
                let timer = setTimeout(() => {
                    document.documentElement.scrollTop = 100000000;
                    document.body.scrollTop = 10000000
                    clearTimeout(timer)
                },400)

            },
            newMessage(e){ //新消息
                this.thingList.push(e)
                document.documentElement.scrollTop = 100000000;
                document.body.scrollTop = 100000000;
            },
            historical(e){ //处理历史消息or消息
                // e: 聊天信息
                // console.log(e)
                this.chatTruncation() // 聊天前查询是否结束
                for (let item of e) {
                    if (item.getElems()[0].type === 'TIMImageElem') {
                        let imgObj = convertImageMsgToHtml(item.getElems()[0].content,false)
                        if (item.isSend) {
                            // console.log(item.getElems()[0])
                            this.thingList.push({type: 1, con: imgObj.html,std:'img',bigImgUrl:imgObj.bigImage})
                        } else {
                            this.thingList.push({type: 0, con: imgObj.html,std:'img',bigImgUrl:imgObj.bigImage})
                        }
                    }else {
                        if (item.isSend) {
                            // console.log(item.getElems()[0])
                            this.thingList.push({type: 1, con: item.getElems()[0].content.text,std:'text'})
                        } else {
                            this.thingList.push({type: 0, con: item.getElems()[0].content.text,std:'text'})
                        }
                    }
                    // this.$toast.clear();
                }
                this.showUser()
                let timer = setTimeout(()=>{
                    document.body.scrollTop = 10000000
                    document.documentElement.scrollTop = 100000000;
                    clearTimeout(timer)
                },300)
                if (e.length === 0) {
                    this.$toast.clear()
                    // console.log("没有历史消息了:data=" + JSON.stringify(options));
                }
            },
            loginStd() {
                this.initMethods()
            }
        },
        created() {
            console.log(this.$route.query)
            // let _user = this.$route.query.user
            this.curUser = this.$route.query.user
            if (this.loginStd){
                this.initMethods()
            }
            let timer = setTimeout(res=>{ //初始进入拉到最新的聊天消息
                document.body.scrollTop = 10000000
                document.documentElement.scrollTop = 100000000;
                clearTimeout(timer)
            },300)
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
        // beforeRouteEnter(to,form, next){
        //     console.log(to, form.path)
        //     next()
        // },
        methods: {
            //显示患者信息
            showUser() {
              this.thingList.push({type: 0, con: `姓名：${this.curUser.name}&nbsp;<br/>年龄：${this.curUser.age}&nbsp;<br/>病情描述：${this.curUser.user_describe}`,std: 'img', bigImgUrl: this.curUser.avatar})
            },
            chatTruncation(){ //检查是否聊天结束
                let userId, doctorId
                // console.log(this.$route.query.utd)
                if (this.$route.query.utd){
                    userId = this.$route.query.id
                    doctorId = this.$store.state.userIdentifier
                }else {
                    doctorId = this.$route.query.id
                    userId = this.$store.state.userIdentifier
                }
              this.$axios.get('consulting/chat_truncation',{
                  user_identifier:userId,
                  doctor_identifier:doctorId
              }).then(res=>{
                  console.log(res.data)
                  try {
                      this.isChat = res.data.data.is_chat
                  }catch (e) {
                      this.isChat = false
                  }
                  if (!this.isChat){
                      this.$toast.fail({duration:1500,message:'咨询已结束'})
                  }
              })
            },
            showClose(){ //发送图片换成loading icon
                if (this.iconName === 'el-icon-loading') return
                this.activeImg.url = ''
            },
            imageClick(item){ //点击图片显示大图
                if (item.std !== 'img') return
                // wx.previewImage({
                //     current: item.bigImgUrl, // 当前显示图片的http链接
                //     urls: [item.bigImgUrl,] // 需要预览的图片http链接列表
                // });
                this.activeImg.url = item.bigImgUrl
            },
            async uploadImage(file){
                console.log(file)
                await uploadPic(file.file)
                this.iconName = 'el-icon-loading'
                // this.thingList.push({type:1,con:`<img src="${timg1}" alt=""/>`,std:'img',})

            },
            async initMethods(){
                await this.getToId()
                await getLastC2CHistoryMsgs()
            },
            //发消息
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
            scull() { //拉去更多聊天记录
                scull(this.thingList)
            },
            blur() {  //输入框失去焦点以后把窗口拉到最下,给定时器因为移动端键盘收起需要一定的时间
                let timer = setTimeout(() => {
                    document.documentElement.scrollTop = 100000000;
                    document.body.scrollTop = 100000000;
                    clearTimeout(timer)
                }, 600)
            },
            focus() { //输入框获取焦点 同理 失去焦点
                // console.log(document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop)
                let timer = setTimeout(() => {
                    document.body.scrollTop = 10000000
                    clearTimeout(timer)
                },400)
            },
        },
        beforeDestroy() {

        }
    }
</script>
<style>
.message img{
    width: 100%;
    height: 100%;
    border-radius: .1rem;
}

</style>
<style scoped lang="scss">
    .showImg{
        width: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        background-color: black;
        z-index: 2001;
        img{
            position: absolute;
            width: 100vw;
            padding: 1rem 0;
            top: 50%;
            transform: translateY(-50%);
        }
        i{
            z-index: 1000;
            padding: .3rem;
            position: absolute;
            font-size: .7rem;
            color: white;
            right: 0;
        }
    }
    .my-input {
        /*border-radius: 20px 20px 0 0;*/
        padding: 0 .3rem;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 1.3rem;
        background-color: #4d8fec;
        display: flex;
        align-items: center;
        i{
            font-size: .6rem;
            color: white;
            margin-left: .2rem;
        }
        label {
            width: 78%;
        }

        input {
            box-sizing: border-box;
            width: 100%;
            background-color: white;
            border: none;
            padding: .1rem .2rem;
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
        position: absolute;
        top: 0;
        line-height: .8rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        color: #4d8fec;
        font-size: .3rem;
        background-color:white;

        :nth-child(1) {
            width: 20%;
            font-weight: 200;
        }
    }

    .content {
        /*padding-top: 1rem;*/
        padding-top: .3rem;
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
        background-color: #f4f4f4;
        width: .75rem;
        height: .75rem;
        border-radius: 50%;
        background-image: url(../../../assets/privateChat/WechatIMG146.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .content dd.my .avatar {
        background: url(../../../assets/privateChat/WechatIMG147.jpeg);
        background-size: cover;
    }

    .content dd .message {

        max-width: 50%;
        box-sizing: border-box;
        background-color: #ecedee;
        border-radius: .1rem;
        padding: .2rem .2rem;
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
