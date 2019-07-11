<template>
    <div id="app">
        <main :class="isBack?'':'btm'">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </main>
        <transition name="fade-footer" mode="out-in">
            <footer v-show="isBack">
                <div @click="goTo(index)"
                     v-for="(item,index) in tabBar"
                     :key="item.name">
                    <img :src="activeTabBar==index?item.activeIcon:item.icon" alt="">
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
        '/consult',
    ];

    export default {
        name: "app",
        data() {
            return {
                isShowTab: true,
                title: '',
                isBack: !this.$route.path.includes('registered'),
                activeTabBar: 0,
                tabBar: [
                    {
                        name: '首页',
                        icon: require('./assets/footer/shouye.png'),
                        activeIcon: require('./assets/footer/ashouye.png'),
                        path: '/index'
                    },
                    {
                        name: '社区',
                        icon: require('./assets/footer/shequ.png'),
                        activeIcon: require('./assets/footer/ashequ.png')
                    },
                    {
                        name: '商城',
                        icon: require('./assets/footer/shancheng.png'),
                        activeIcon: require('./assets/footer/ashangcheng.png')
                    },
                    {
                        name: '个人',
                        icon: require('./assets/footer/geren.png'),
                        activeIcon: require('./assets/footer/ageren.png'),
                        path: '/consult/personal/personal'
                    },
                ]
            }
        },
        created() {
            // sessionStorage.user_id = 12; //本地测试userID
            // sessionStorage.openid='oSx-51JbMrtfk5394YIx8IQ8JlRI' //本地测试openId
            // sessionStorage.doctor_id='7' //doctor_id

            this.isBack = homeUrl.includes(this.$route.path);

            this.title = this.$route.name;

            this.tabBarIndex()
        },
        methods: {
            goTo(index) {
                //tabBar路由跳转
                if ([1,2].includes(index)) {
                    this.$toast.fail({duration:500,message:"暂未开放"})
                    return
                }
                this.activeTabBar = index;
                this.$router.push({path: this.tabBar[index].path});
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
                this.isBack = aUrl.path !== '/' ? homeUrl.includes(aUrl.path) : true
            }
        }
    }
</script>
<style lang="scss">
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
        background-color: #01bdb8 !important;
    }

    footer {
        position: fixed;
        width: 100%;
        z-index: 2000;
    }
    main {
        height: 100vh;
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
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .4s ease;
    }

    .fade-enter {
        /*//进入时的动画*/
        transform: translateX(80%);
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
