<template>
    <div style="height: 100%">
        <section class="index-doctors">
            <article class="doctors-info">
                <img @click="editing" :src="doctorInfo.avatar" alt="">
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
                    <zySwitch style="width: 40%" :bol.sync="value"></zySwitch>
                    <span>开启我的诊室</span>
                </p>
            </article>
        </section>

        <section class="my-clinic">
            <span>我的诊室</span>
            <article class="my-clinic-box">
                <div v-for="(item,key) in inquiryAll" :key="key" @click="goToAdvisory(key)">
                    <span><img :src="item.icon" alt=""></span>
                    <p>{{item.name}}</p>
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
                        activeIcon: require('../../assets/footer/ageren.png')
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
                    {title:'专家文章',icon:require('../../assets/personal/binli.png'),url:'/consult/registered/articlelist'},
                    {title:'创建文章',icon:require('../../assets/personal/fabuguo.png'),url:'/doctors/upload'},
                    {title:'发布动态',icon:require('../../assets/personal/guahao.png'),url:'/doctors/release'},
                ],
                inquiryAll:[
                    {type:'1',name: '图文咨询', icon: require('../../assets/knownDoctor/tuweny.png')},
                    {type:'2',name: '电话咨询', icon: require('../../assets/knownDoctor/dianhua.png')},
                    {type:'3',name: '视频咨询', icon: require('../../assets/knownDoctor/shiping.png')},
                    {name: '团队咨询', icon: require('../../assets/knownDoctor/temainfo.png')},
                ]

            }
        },
        created(){
          this.getDoctorInfo()
        },
        methods:{
            goToMyStdio(){
              this.$router.push({path:'/doctors/studioid'})
            },
            message(){
              this.$toast.fail('暂未开放')
            },
            getDoctorInfo(){
              this.$axios.get('personinfo/myinfo',{openid:sessionStorage.openid}).then(res=>{
                  console.log(res.data.data[0]);
                  this.doctorInfo = res.data.data[0];
              })
            },
            goToLi(url){
                console.log(this.doctorInfo)
              this.$router.push({path:url,query:{id:this.doctorInfo.id}})
            },
            goTo(index){
                this.activeTabBar = index
                this.$router.push({path:this.tabBar[index].url,query:{id:this.doctorInfo.id}})
            },
            editing(){
              this.$router.push({path:'/doctors/editing',query:{}})
            },
            goToAdvisory(key){
                this.inquiryAll[key].id = this.doctorInfo.id
                this.$router.push({path:'/doctors/graphic',query:this.inquiryAll[key]})
            }
        }
    }
</script>

<style scoped lang="scss">
    .index-doctors {
        padding: .3rem;
        height: 3rem;
        background: url("../../assets/phoneserve/BG.png") no-repeat;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .doctors-info {

            display: flex;
            align-items: center;
            color: white;
            font-size: .35rem;
            h4{
                font-weight: 400;
            }
            span{
                font-weight: 200;
            }
            img {
                display: block;
                width: 1.5rem;
                height: 1.5rem;
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
            /*flex-wrap: wrap;*/
            box-sizing: border-box;

            div {
                background: #f4f5f6;
                margin: .1rem .15rem;
                width: calc(50% - .6rem);
                height: 1.5rem;
                border-radius: 5px;
                text-align: center;
                font-size: .25rem;
                span {
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
            }
        }
        .my-clinic-select{
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

    }
    footer{display: flex;justify-content: space-around;}
    footer div {width: auto;}
</style>