<template>
    <div style="height: 100%">
        <section class="index-doctors">
            <article class="doctors-info">
<!--                @click="editing"-->
                <img  :src="doctorInfo.avatar" alt="">
                <div>
                    <h4>{{doctorInfo.real_name}}</h4>
                    <span>知名专家</span>
                </div>
            </article>
            <article class="btn">
                <p id="btn">
                    <span @click="goToMyStdio">设置我的诊室</span>
                    <span @click="message">消息</span>
                </p>
                <p id="swt">
                    <zySwitch @updateBol="setValue" style="width: 40%" :bol="value" :std="doctorInfo"></zySwitch>
                    <span>开启我的诊室</span>
                </p>
            </article>
        </section>

        <section class="my-clinic">
            <span>我的诊室</span>
            <article class="my-clinic-box">
                <div v-for="(item,key) in inquiryAll" :key="key" @click="goToAdvisory(key)">
                    <span class="icon"><img :src="item.icon" alt=""></span>
                    <p>{{item.name}}</p>
                    <span class="mark" v-show="item.unread !== 0">{{item.unread}}</span>
                </div>
            </article>
            <article class="my-clinic-select">
                <ul>
                    <li @click="goToLi(item.url)" v-for="item in userSelect" :key="item.title">
                        <img :src="item.icon" alt="icon">
                        <span>{{item.title}}</span>
                    </li>
                </ul>
            </article>
        </section>
        <footer>
            <div @click="goTo(index)"
                 v-for="(item,index) in tabBar"
                 :key="item.name">
                <img :src="activeTabBar===index?item.activeIcon:item.icon" alt="">
                <p>{{item.name}}</p>
            </div>
        </footer>
    </div>
</template>

<script>
    import zySwitch from '../../components/zySwitch'

    export default {
        name: "index",
        components: {
            zySwitch
        },
        data() {
            return {
                doctorInfo:{},
                activeTabBar:0,
                tabBar: [
                    {
                        name: '首页',
                        icon: require('../../assets/footer/shouye.png'),
                        activeIcon: require('../../assets/footer/ashouye.png')
                    },
                    {
                        name: '患者',
                        icon: require('../../assets/footer/geren.png'),
                        activeIcon: require('../../assets/footer/ageren.png'),
                        url:'/doctors/doctormsg'
                    },
                    {
                        name: '专家团队',
                        icon: require('../../assets/footer/shequ.png'),
                        activeIcon: require('../../assets/footer/ashequ.png'),
                        url:'/doctors/teamlist',
                    },
                    {
                        name: '社区',
                        icon: require('../../assets/footer/shancheng.png'),
                        activeIcon: require('../../assets/footer/ashangcheng.png')
                    },
                    {
                        name: '个人',
                        icon: require('../../assets/footer/geren.png'),
                        activeIcon: require('../../assets/footer/ageren.png'),
                        url:'/doctors/doctorpersonal'
                    }
                ],
                value: true,
                userSelect:[
                    // {title:'专家文章',icon:require('../../assets/personal/binli.png'),url:'/consult/registered/articlelist'},
                    {title:'创建文章',icon:require('../../assets/personal/fabuguo.png'),url:'/doctors/upload'},
                    {title:'发布动态',icon:require('../../assets/personal/guahao.png'),url:'/doctors/release'},
                    {title:'专家文章、动态',icon:require('../../assets/personal/icon_zhuanjiadongtai.png'),url:'/consult/registered/doctorexpert'},
                ],
                inquiryAll:[
                    {type:'1',name: '图文咨询', icon: require('../../assets/knownDoctor/tuweny.png'),unread:0},
                    {type:'3',name: '电话咨询', icon: require('../../assets/knownDoctor/dianhua.png'),unread:0},
                    {type:'2',name: '视频咨询', icon: require('../../assets/knownDoctor/shiping.png'),unread:0},
                    {name: '挂号订单', icon: require('../../assets/knownDoctor/icon_guahao.png'),unread:0},
                    {name: '团队订单', icon: require('../../assets/knownDoctor/temainfo.png'),unread:0},
                ],
                websocket:null,
                timerObj:null
            }
        },
        computed:{

        },
        created(){
          this.getDoctorInfo()
            this.getUnread()
            console.log("sessionStorage.doctor_id", sessionStorage.doctor_id)
            this.$axios.get('doctor/get_redis_unread',{
                doctor_id:sessionStorage.doctor_id
            }).then(res=>{
                let item = res.data.data
                console.log("item", res)
                this.inquiryAll[0].unread = item.msg_num;
                this.inquiryAll[1].unread = item.phone_num;
                this.inquiryAll[2].unread = item.video_num;
                this.inquiryAll[3].unread = item.gh_num;
                this.inquiryAll[4].unread = item.team_num;
            })
        },
        destroyed(){
            window.clearInterval(this.timerObj)
        },
        methods:{
            getUnread(){
                this.timerObj = setInterval(()=>{
                    this.$axios.get('doctor/get_redis_unread',{
                        doctor_id:sessionStorage.doctor_id
                    }).then(res=>{
                        let item = res.data.data
                        // console.log(res.data)
                        this.inquiryAll[0].unread = item.msg_num;
                        this.inquiryAll[1].unread = item.phone_num;
                        this.inquiryAll[2].unread = item.video_num;
                        this.inquiryAll[3].unread = item.gh_num;
                        this.inquiryAll[4].unread = item.team_num;
                        // for (let in res.data.data){
                        //     console.log(i)
                        // }
                    })
                },4000)
            },
            setValue(e){
                this.value = e
                this.doctorInfo.zx_status = this.doctorInfo.zx_status == 1?2:1
            },
            goToMyStdio(){
                this.$toast.fail({duration:500,message:'暂未开放'})
              // this.$router.push({path:'/doctors/studioid'})
            },
            message(){
              // this.$toast.fail('暂未开放')
                this.$router.push({path:'/doctors/doctormsg'})
            },
            getDoctorInfo(){
              this.$axios.get('personinfo/myinfo',{openid:sessionStorage.openid}).then(res=>{
                  console.log("是否医生", res.data);
                  res.data.data.zx_status=~~res.data.data.zx_status;
                  this.doctorInfo = res.data.data;
                  this.value = this.doctorInfo.zx_status != 2
                  // console.log(this.value)
              })
            },
            goToLi(url){
                // console.log(this.doctorInfo)
              this.$router.push({path:url,query:{std:'dc'}})
            },
            goTo(index){
                if (this.tabBar[index].url === undefined && index !== 0){
                    this.$toast.fail({duration:500,message:'暂未开放'})
                    return
                }
                this.activeTabBar = index
                this.$router.push({path:this.tabBar[index].url,query:{id:this.doctorInfo.id}})
            },
            editing(){
              this.$router.push({path:'/doctors/editing',query:{}})
            },
            goToAdvisory(key){
                console.log(key)
                if (key === 3){
                    this.$router.push({path:'/doctors/register'})
                } else {
                    if (key ===4) {
                        this.$router.push({path:'/doctors/studiographic',query:{id:this.doctorInfo.department_id}})
                    }else {
                        if (key === 2 || key === 1) {
                            this.$toast.fail('暂未开放')
                            return
                        }
                        this.inquiryAll[key].id = this.doctorInfo.id
                        this.$router.push({path:'/doctors/graphic',query:this.inquiryAll[key]})
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .index-doctors {
        padding:0 .3rem .3rem .3rem;
        height: 2.5rem;
        background: url("../../assets/phoneserve/BG.png") no-repeat;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;

        .doctors-info {
            display: flex;
            align-items: center;
            color: white;
            font-size: .35rem;
            h4{
                font-weight: 400;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                width: 1.8rem;
            }
            span{
                font-weight: 200;
            }
            img {
                display: block;
                width: 1.2rem;
                height: 1.2rem;
                background: #9b9c9d;
                border-radius: 50%;
                margin-right: .2rem;
            }
        }

        .btn {

            #swt {
                display: flex;
                /*align-items: center;*/
                text-align: right;
                margin-top: .3rem;

                span {
                    color: white;
                    width: 90%;
                    font-size: .32rem;
                }
            }

            #btn {
                font-size: .3rem;
                text-align: right;

                span {
                    background: #4ed1ce;
                    color: white;
                    padding: .1rem .2rem;
                    border-radius: 5px;
                    margin-left: .2rem;
                }
            }
        }
    }

    .my-clinic {
        margin-top: -.35rem;
        background: white;
        border-radius: 20px 20px 0 0;

        > span {
            display: block;
            width: 100%;
            text-align: center;
            border-bottom: 1px #ecedee solid;
            line-height: .8rem;
            font-size: .3rem;
        }

        .my-clinic-box {
            width: 100%;
            padding: .2rem .15rem;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;

            div {
                position: relative;
                background: #f4f5f6;
                margin: .15rem .15rem;
                width: calc(50% - .3rem);
                height: 1.5rem;
                border-radius: 5px;
                text-align: center;
                font-size: .25rem;
                .icon {
                    width: .7rem;
                    height: .7rem;
                    border-radius: 50%;
                    background-color: white;
                    display: block;
                    margin: .15rem auto;

                    img{
                        width: 60%;
                        height: 60%;
                        margin-top: calc(50% - 30%);
                    }
                }
                .mark{
                    width: .3rem;
                    height: .3rem;
                    line-height: .3rem;
                    color: white;
                    background-color: #f8486e;
                    border-radius: 50%;
                    text-align: center;
                    position: absolute;
                    right: .1rem;
                    top: .1rem;

                }
            }
        }
        .my-clinic-select{
            /*padding: .3rem;*/
            padding-bottom: 1.7rem;
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

    }
    footer{display: flex;justify-content: space-around;}
    footer div {width: auto;}
</style>
