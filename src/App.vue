<template>
    <div id="app">
        <div class="herder">
            <i v-show="isBackBtn" class="el-icon-arrow-left" @click="goBack"></i>
            {{$route.name}}
        </div>
        <main :class="isBack?'':'btm'">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </main>
        <transition name="fade-footer" mode="out-in">
            <footer v-show="isBack">
                <div @click="goTo(item,index)"
                     v-for="(item,index) in tabBar"
                     :key="item.name">
                    <!-- <img :src="activeTabBar==index?item.activeIcon:item.icon" alt=""> -->
                    <img :src="item.icon" alt="">
                    <p>{{item.name}}</p>
                </div>
            </footer>
        </transition>
    </div>
</template>
<script> 

    const homeUrl = [
        '/index',
        '/consult/personal/personal',
        // '/doctors/index'
        // '/consult',
    ];
    const backUrl = [
        '/index',
        '/consult/personal/personal',
        '/doctors/index'
    ]

    export default {
        name: "app",
        data() {
            return {
                isBackBtn:!backUrl.includes(this.$route.path),
                isShowTab: true,
                title: '',
                isBack: !this.$route.path.includes('registered'),
                activeTabBar: 0,
                // tabBar: [
                //     {
                //         name: '首页',
                //         icon: require('./assets/footer/shouye.png'),
                //         activeIcon: require('./assets/footer/ashouye.png'),
                //         path: '/index'
                //     },
                //     {
                //         name: '社区',
                //         icon: require('./assets/footer/shequ.png'),
                //         activeIcon: require('./assets/footer/ashequ.png')
                //     },
                //     {
                //         name: '商城',
                //         icon: require('./assets/footer/shancheng.png'),
                //         activeIcon: require('./assets/footer/ashangcheng.png')
                //     },
                //     {
                //         name: '个人',
                //         icon: require('./assets/footer/geren.png'),
                //         activeIcon: require('./assets/footer/ageren.png'),
                //         path: '/consult/personal/personal'
                //     },
                // ]
                tabBar: [
                    {
                        name: '医疗服务',
                        icon: require('./assets/footer/logo.png'),
                        path: '/index'
                    },
                    {
                        name: '商城',
                        icon: require('./assets/footer/mallsIcon.png'),
                    },
                    {
                        name: '消息',
                        icon: require('./assets/footer/newsIcon.png'),
                        path: '/messages'
                    },
                    {
                        name: '我的',
                        icon: require('./assets/footer/myIcon.png'),
                        path: '/consult/personal/personal'
                    },
                ]
            }
        },
        created() {
            //本地开发模式下固定数据 
            if (process.env.NODE_ENV == 'development') {
              sessionStorage.user_id = 12; //本地测试userID
              sessionStorage.openid = 'oSx-51JbMrtfk5394YIx8IQ8JlRI' //本地测试openId
              sessionStorage.doctor_id = '58' //doctor_id
            }
            this.isBack = homeUrl.includes(this.$route.path);

            this.title = this.$route.name;

            this.tabBarIndex()
        },
        methods: {
            goBack(){
              this.$router.go(-1)
            },
            goTo(i,index) {
                //tabBar路由跳转
                if (!i.path) {
                    this.$toast.fail({duration:500,message:"暂未开放"})
                    return
                }
                this.activeTabBar = index;
                this.$router.push({path: i.path});
            },
            tabBarIndex() {
                //保存tabBar状态
                for (let i = 0; i < this.tabBar.length; i++) {
                    if (this.tabBar[i].path === this.$route.path) {
                        this.activeTabBar = i
                    }
                }
            }
        },
        watch: {
            $route(aUrl, bUrl) {
                //获取之前的url，和判断当前url 是否需要footer
                for (let i = 0;i < this.tabBar.length; i++){
                    if (this.tabBar[i].path === aUrl.path) {
                        this.activeTabBar = i
                    }
                }
                this.title = this.$route.name;
                this.isBackBtn=!backUrl.includes(this.$route.path)
                this.isBack = aUrl.path !== '/' ? homeUrl.includes(aUrl.path) : true
            }
        }
    }
</script>
<style lang="scss">
    .herder{
        text-align: center;
        position: fixed;
        width: 100vw;
        line-height:.8rem;
        height: .8rem;
        color: white;
        font-size: .35rem;
        z-index: 2001;
        background-color: #4d8fec;
        /*background-image: url("./assets/reservation/BG.png");*/
        /*background-repeat: no-repeat;*/
        /*background-size: cover;*/
        i{
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            font-size: .5rem;
            padding-left: .2rem;
            color: white;
        }
    }
    .toast{
        margin-top: 1.5rem;
        font-size: .6rem;
        color: #96999e;
        text-align: center;
    }
    .fade-up-enter-active, .fade-up-leave-active {
        transition: all .4s ease;
    }

    .fade-up-enter {
        /*//进入时的动画*/
        transform: translateY(100%);

    }

    .fade-up-leave-active {
        /*//离开时的动画*/
        transform: translateY(100%);
    }

    .van-picker__cancel, .van-picker__confirm {
        color: white !important;
        font-size: .3rem !important;
    }

    .van-picker-column {
        background-color: #eff1ef;
    }

    .van-picker__title {
        font-size: .32rem !important;
        font-weight: 400 !important;
        color: white !important;
    }

    .van-picker-column__item {
        font-size: .3rem !important;
        color: #4c4c4c !important;
    }

    .van-picker__toolbar {
        background-color: #45cac6;
    }

    .btm {
        bottom: 0 !important;
    }


    .el-progress__text {
        color: #93dddc !important;
    }

    .el-progress-bar__inner {
        background-color: #4d8fec !important;
    }

    footer {
        position: fixed;
        width: 100%;
        z-index: 2000;
    }
    main {
        border-top: 1px solid #fff;
        padding-top: .8rem;
        position: relative;
        height: calc(100vh - .8rem);
        /*overflow-x: hidden;*/
        /*overflow-y: hidden;*/
        /*padding-bottom: 1.4rem;*/
    }

    footer {
        box-shadow: 0 0 8px 1px rgba(1, 189, 187, 0.1);
        bottom: 0;
        height: 1.3rem;
        background: #f5f5f5;
        text-align: center;

        div {
            margin-top: 0.2rem;
            display: inline-block;
            width: calc(100% / 4);

            p {
                font-size: .25rem;
                color: #666768;
            }

            img {
                width: 0.4rem;
                height: 0.37rem;
            }
        }
        >div:first-of-type{
            img{
                transform-origin: 50% bottom;
                transform: scale(1.8);
            }
            p{
                background-image: -webkit-linear-gradient(top,#1da0e3,#1c58bf); 
                background-clip: text; 
                -webkit-text-fill-color: transparent; 
            }
        }
    }
    .fades-enter-active, .fades-leave-active {
        transition: all .4s ease;
    }
    .fades-enter, .fades-leave-active {
        opacity: 0
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .4s ease;
    }

    .fade-enter {
        /*//进入时的动画*/
        transform: translateX(100%);
        opacity: 0;
    }
    .fade-leave-active {
        /*//离开时的动画*/
        transform: translateX(-30%);
        opacity: 0;
    }

    .fade-f-enter-active, .fade-f-leave-active {
        transition: all .4s ease;
    }

    .fade-f-enter, .fade-f-leave-active {
        transform: translateY(100%);
        opacity: 1
    }

    .fade-footer-enter-active, .fade-footer-leave-active {
        transition: all .4s ease;
    }

    .fade-footer-enter {
        /*//进入时的动画*/
        transform: translateY(100%);
    }

    .fade-footer-leave-active {
        /*//离开时的动画*/
        transform: translateY(100%);
    }
</style>
