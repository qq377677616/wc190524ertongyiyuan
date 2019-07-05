<template>
    <div style="height: 100%">
        <section class="bulletin">
            <span>问诊中</span>
            <span @click="scull">剩余:23小时59分39秒 剩余回答次数:6次</span>
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
            <span @click="hello" @keydown.enter="hello">发送</span>
            <!--                <img src="../../../assets/privateChat/gengduo.png" alt="更多按钮" @click="hello">-->
        </article>
    </div>
</template>

<script>
    // import webim from "../../../util/webim";
    import {lock, unlock} from 'tua-body-scroll-lock';

    const targetElement = document.querySelector('body');
    // const targetElement1 = document.querySelector('main');
    const targetElementS = document.querySelector('dl');
    // console.log(targetElement);
    // lock(targetElement);
    lock(targetElement);
    unlock(targetElement);
    // unlock(targetElementS);

    let selToID = null; // 当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
    let selSess = null; // 当前聊天会话对象
    // var getLastC2CHistoryMsgs = function (cbOk, cbError) {
    //     if (selType == webim.SESSION_TYPE.GROUP) {
    //         alert('当前的聊天类型为群聊天，不能进行拉取好友历史消息操作');
    //         return;
    //     }
    //     var lastMsgTime = 0;//第一次拉取好友历史消息时，必须传0
    //     var msgKey = '';
    //     var options = {
    //         'Peer_Account': selToID, //好友帐号，selToID 为全局变量，表示当前正在进行的聊天 ID，当聊天类型为私聊时，该值为好友帐号，否则为群号。
    //         'MaxCnt': 20, //拉取消息条数
    //         'LastMsgTime': lastMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
    //         'MsgKey': msgKey
    //     };
    export default {
        name: "privateChat",
        data() {
            return {
                getPrePageC2CHistroyMsgInfoMap: {}, //储存上次拉去历史消息记录
                myImg: sessionStorage.headimgurl, //当前用户头像链接
                toImg: this.$route.query.avatar, //选中聊天头像链接
                userID: {},
                thingList: [],
                value: '',
                nexText: [],
                im: {
                    selToID: '崔恪', //当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
                    selSess: null, //当前聊天会话对象
                    selType: webim.SESSION_TYPE.C2C, //当前聊天类型
                    options: {
                        'isAccessFormalEnv': true, //是否访问正式环境，默认访问正式，选填
                        'isLogOn': false //是否开启控制台打印日志,默认开启，选填
                    },

                    loginInfo: {
                        'sdkAppID': '1400214812',   //用户所属应用id,必填
                        'identifier': 11,           //当前用户ID,必须是否字符串类型，必填
                        'userSig': '11',            //当前用户身份凭证，必须是字符串类型，必填
                        'identifierNick': 'zaire',  //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
                        'headurl': 'img/me.jpg'     //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
                    },
                    listeners: {
                        "onConnNotify": this.onConnNotify   //监听连接状态回调变化事件,必填
                        ,
                        "jsonpCallback": null               //IE9(含)以下浏览器用到的jsonp回调函数，
                        ,
                        "onMsgNotify": this.onMsgNotify     //监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
                        // ,
                        // "onFriendSystemNotifys": onFriendSystemNotifys   //监听好友系统通知事件，选填
                        // ,
                        // "onProfileSystemNotifys": onProfileSystemNotifys //监听资料系统（自己或好友）通知事件，选填
                        // ,
                        // "onC2cEventNotifys": onC2cEventNotifys           //监听C2C系统消息通道
                        ,
                        "onLongPullingNotify": function (data) {
                            console.debug('onLongPullingNotify', data)
                        }
                    }
                },

            }
        },
        created() {
            //登录过度
            this.$toast.loading({
                mask: true,
                message: '加载中...',
                duration: 0
            });
            this.getUserSig();

            // console.log(this.$route.query)
        },
        mounted() {
            // console.log(this.im.selToID);
            this.thingList.push({type: 0, con: '请问您需要咨询什么内容？'})
        },
        methods: {
            onTextareaKeyDown() {
                alert('hello')
            },
            scull() {
                this.$toast.loading({
                    message: '加载中...',
                    duration: 0
                });
                let tempInfo = this.getPrePageC2CHistroyMsgInfoMap[selToID]; //获取下一次拉取的c2c消息时间和消息Key
                let lastMsgTime;
                let msgKey;
                if (tempInfo) {
                    lastMsgTime = tempInfo.LastMsgTime;
                    msgKey = tempInfo.MsgKey;
                } else {
                    alert('获取下一次拉取的c2c消息时间和消息Key为空');
                    return;
                }
                let options = {
                    'Peer_Account': this.im.selToID, //好友帐号
                    'MaxCnt': 10, //拉取消息条数
                    'LastMsgTime': lastMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
                    'MsgKey': msgKey
                };
                webim.getC2CHistoryMsgs(
                    options,
                    (resp) => {
                        console.log(resp);

                        let complete = resp.Complete; //是否还有历史消息可以拉取，1-表示没有，0-表示有
                        if (resp.MsgList.length === 0) {
                            webim.Log.warn("没有历史消息了:data=" + JSON.stringify(options));

                            return;
                        }
                        this.getPrePageC2CHistroyMsgInfoMap[selToID] = { //保留服务器返回的最近消息时间和消息Key,用于下次向前拉取历史消息
                            'LastMsgTime': resp.LastMsgTime,
                            'MsgKey': resp.MsgKey
                        };
                        for (let item of resp.MsgList) {
                            if (item.isSend) {
                                this.thingList.unshift({type: 1, con: item.getElems()[0].content.text})
                            } else {
                                this.thingList.unshift({type: 0, con: item.getElems()[0].content.text})
                            }
                        }
                        this.$toast.clear()
                    },
                    cbError => {
                        console.log(cbError)
                    }
                );
            },
            getUserSig() {
                this.$axios.get('Friend/getYunAccount', {
                    // user_id: sessionStorage.user_id,
                    user_id: 44,
                    to_id: 22
                }).then(res => {
                    console.log(res);
                    this.userID = res.data.data;
                    this.im.selToID = res.data.data.toName;
                    this.im.loginInfo.identifier = res.data.data.identifier;
                    this.im.loginInfo.userSig = res.data.data.usersig;

                    this.login();
                })
            },
            getLastC2CHistoryMsgs(cbOk, cbError) {
                if (this.im.selType === webim.SESSION_TYPE.GROUP) {
                    alert('当前的聊天类型为群聊天，不能进行拉取好友历史消息操作');
                    return;
                }
                let lastMsgTime = 0;//第一次拉取好友历史消息时，必须传0
                let msgKey = '';
                let options = {
                    'Peer_Account': this.im.selToID, //好友帐号，selToID 为全局变量，表示当前正在进行的聊天 ID，当聊天类型为私聊时，该值为好友帐号，否则为群号。
                    'MaxCnt': 10, //拉取消息条数
                    'LastMsgTime': lastMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
                    'MsgKey': msgKey
                };
                // console.log(webim.getC2CHistoryMsgs(options,res=>{
                //     console.log(res)
                // }))
                webim.getC2CHistoryMsgs(
                    options,
                    (resp) => {
                        console.log(resp)
                        let complete = resp.Complete;//是否还有历史消息可以拉取，1-表示没有，0-表示有
                        let retMsgCount = resp.MsgCount;//返回的消息条数，小于或等于请求的消息条数，小于的时候，说明没有历史消息可拉取了
                        for (let item of resp.MsgList) {
                            // console.log(item)
                            if (item.isSend) {
                                this.thingList.push({type: 1, con: item.getElems()[0].content.text})
                            } else {
                                this.thingList.push({type: 0, con: item.getElems()[0].content.text})
                            }
                            this.$toast.clear();
                        }
                        if (resp.MsgList.length === 0) {
                            this.$toast.clear()
                            console.log("没有历史消息了:data=" + JSON.stringify(options));
                            return;
                        }
                        this.getPrePageC2CHistroyMsgInfoMap[selToID] = {
                            //保留服务器返回的最近消息时间和消息 Key,用于下次向前拉取历史消息
                            'LastMsgTime': resp.LastMsgTime,
                            'MsgKey': resp.MsgKey
                        };
                        if (cbOk)
                            cbOk(resp.MsgList);
                    },
                    cbError => {
                        console.log(cbError)
                    }
                );
            },
            blur() {
                // document.documentElement.scrollTop = 0;
                // document.body.scrollTop = 0;
                setTimeout(() => {
                    document.documentElement.scrollTop = 100000000;
                    document.body.scrollTop = 100000000;
                }, 1000)
            },
            focus() {
                setTimeout(() => {
                    document.body.scrollTop = 100000000
                }, 400)
            },
            hello() {
                // this.blur();
                if (!this.im.selToID) {
                    alert("你还没有选中好友或者群组，暂不能聊天");
                    return;
                }
                //获取消息内容

                let msgContent = this.value;
                let msgLen = webim.Tool.getStrBytes(msgContent);

                if (msgContent.length < 1) {
                    console.log(this.value);
                    alert("发送的消息不能为空!");
                    return;
                }
                let maxLen, errInfo;
                if (this.im.selType === webim.SESSION_TYPE.C2C) {
                    maxLen = webim.MSG_MAX_LENGTH.C2C;
                    errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
                } else {
                    maxLen = webim.MSG_MAX_LENGTH.GROUP;
                    errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
                }
                if (msgLen > maxLen) {
                    alert(errInfo);
                    return
                }
                //发消息处理
                this.handleMsgSend(msgContent);
            },
            handleMsgSend(msgContent) {
                if (!this.im.selSess) {
                    var selSess = new webim.Session(
                        this.im.selType,
                        this.im.selToID,
                        this.im.selToID,
                        // friendHeadUrl,
                        Math.round(new Date().getTime() / 1000));
                }
                console.log(selSess)
                let isSend = true; //是否为自己发送
                let seq = -1; //消息序列，-1表示sdk自动生成，用于去重
                let random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
                let msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
                let subType; //消息子类型
                if (this.im.selType === webim.SESSION_TYPE.C2C) {
                    subType = webim.C2C_MSG_SUB_TYPE.COMMON;
                } else {
                    //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
                    //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
                    //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
                    //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
                    subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
                }
                var msg = new webim.Msg(selSess,
                    isSend,
                    seq,
                    random,
                    msgTime,
                    this.im.loginInfo.identifier,
                    subType,
                    this.im.loginInfo.identifierNick);

                let text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
                //解析文本和表情
                let expr = /\[[^[\]]{1,3}\]/mg;
                let emotions = msgContent.match(expr);
                if (!emotions || emotions.length < 1) {
                    text_obj = new webim.Msg.Elem.Text(msgContent);
                    msg.addText(text_obj);
                } else {
                    for (var i = 0; i < emotions.length; i++) {
                        tmsg = msgContent.substring(0, msgContent.indexOf(emotions[i]));
                        if (tmsg) {
                            text_obj = new webim.Msg.Elem.Text(tmsg);
                            msg.addText(text_obj);
                        }
                        emotionIndex = webim.EmotionDataIndexs[emotions[i]];
                        emotion = webim.Emotions[emotionIndex];

                        if (emotion) {
                            face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
                            msg.addFace(face_obj);
                        } else {
                            text_obj = new webim.Msg.Elem.Text(emotions[i]);
                            msg.addText(text_obj);
                        }
                        restMsgIndex = msgContent.indexOf(emotions[i]) + emotions[i].length;
                        msgContent = msgContent.substring(restMsgIndex);
                    }
                    if (msgContent) {
                        text_obj = new webim.Msg.Elem.Text(msgContent);
                        msg.addText(text_obj);
                    }
                }

                msg.PushInfo = {
                    "PushFlag": 0,
                    "Desc": '测试离线推送内容', //离线推送内容
                    "Ext": '测试离线推送透传内容', //离线推送透传内容
                    "AndroidInfo": {
                        "Sound": "android.mp3" //离线推送声音文件路径。
                    },
                    "ApnsInfo": {
                        "Sound": "apns.mp3", //离线推送声音文件路径。
                        "BadgeMode": 1
                    }
                };

                msg.PushInfoBoolean = true; //是否开启离线推送push同步
                msg.sending = 1;
                msg.originContent = msgContent;
                // addMsg(msg);
                // $("#send_msg_text").val('');
                // turnoffFaces_box();

                webim.sendMsg(msg, (resp) => {
                    console.log(resp)
                    //发送成功，把sending清理
                    // $("#id_" + msg.random).find(".spinner").remove();

                    console.log('发送成功')
                    this.thingList.push({type: 1, con: this.value});
                    this.value = '';
                    this.$nextTick(() => {
                        document.documentElement.scrollTop = 100000000;
                        document.body.scrollTop = 100000000;
                    })
                    webim.Tool.setCookie("tmpmsg_" + selToID, '', 0);

                }, function (err) {
                    console.log(err)
                    console.log('发送失败')
                    alert(err.ErrorInfo);
                    //提示重发
                    // showReSend(msg);
                });
            },
            onConnNotify(res) {
                let info;
                // console.log(res.ErrorCode)
                switch (res.ErrorCode) {
                    case webim.CONNECTION_STATUS.ON:
                        webim.Log.warn('建立连接成功: ' + res.ErrorInfo);
                        console.log('建立连接成功');
                        break;
                    case webim.CONNECTION_STATUS.OFF:
                        info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + res.ErrorInfo;
                        alert(info);
                        webim.Log.warn(info);
                        break;
                    case webim.CONNECTION_STATUS.RECONNECT:
                        info = '连接状态恢复正常: ' + res.ErrorInfo;
                        alert(info);
                        webim.Log.warn(info);
                        break;
                    default:
                        webim.Log.error('未知连接状态: =' + res.ErrorInfo);
                        break;
                }
            },
            onMsgNotify(newMsgList) {
                console.log(newMsgList)
                let sess, newMsg;
                //获取所有聊天会话
                let sessMap = webim.MsgStore.sessMap();
                console.log(sessMap)
                for (let obj of newMsgList) {//遍历新消息
                    let newMsg = obj;
                    if (newMsg.getSession().id() === this.im.selToID) {// 为当前聊天对象的消息，selToID 为全局变量，表示当前正在进行的聊天 ID，当聊天类型为私聊时，该值为好友帐号，否则为群号。
                        selSess = newMsg.getSession();
                        let a = newMsg.getElems()[0];
                        this.nexText = newMsg.getElems();
                        console.log(a.getContent().text);
                        this.thingList.push({type: 0, con: a.getContent().text})
                        //在聊天窗体中新增一条消息
                        //console.warn(newMsg);
                        console.log('新增消息');
                        this.$nextTick(() => {
                            document.documentElement.scrollTop = 100000000;
                            document.body.scrollTop = 100000000;
                        })
                        // addMsg(newMsg);
                    }
                }
                //消息已读上报，以及设置会话自动已读标记
                webim.setAutoRead(selSess, true, true);
                for (let i in sessMap) {
                    sess = sessMap[i];
                    if (this.im.selToID !== sess.id()) {//更新其他聊天对象的未读消息数
                        console.log('更新');
                        // updateSessDiv(sess.type(), sess.id(), sess.unread());
                    }
                }
            },
            login() {
                webim.login(this.im.loginInfo, this.im.listeners, this.im.options, (resp) => {
                    this.getLastC2CHistoryMsgs()
                },)
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


        /*img {*/
        /*    height: .5rem;*/
        /*    width: .5rem;*/
        /*}*/

        label {
            width: 78%;
            /*padding: 0 .3rem;*/
        }

        input {
            /*padding-left: .2rem;*/
            box-sizing: border-box;
            width: 100%;
            background-color: white;
            border: none;
            padding: .1rem .2rem;
            /*height: .7rem;*/
            border-radius: 5px;
        }

        span {
            text-align: center;
            display: block;
            width: 28%;
            background-color: white;
            padding: .1rem .3rem;
            border-radius: .1rem;
            color: #09aba7;
            margin-left: .2rem;
            flex: 1;
        }
    }

    .bulletin {
        padding: 0 .3rem;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        line-height: .8rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        color: #01bdbb;
        font-size: .3rem;

        :nth-child(1) {
            width: 20%;
            font-weight: 200;
        }
    }

    .content {


        dl {
            padding: .2rem 0;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            position: absolute;
            top: .8rem;
            bottom: 1.3rem;
        }

        /*position: fixed;*/
        /*padding-bottom: 1.3rem;*/
        /*top: 1.8rem;*/
        width: 100%;
        /*bottom: 0;*/

        /*background: #f0f0f1;*/


    }

    .wrap {
        /*position: absolute;*/
        /*top: 0;*/
        /*bottom: 1rem;*/
        width: 100%;
        /*background: #00b5bd;*/
        /*overflow: auto;*/
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