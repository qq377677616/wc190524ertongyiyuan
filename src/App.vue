<template>
    <div id="app">
<!--        <header>-->
<!--            <i v-show="!isBack" class="el-icon-arrow-left" @click="gobackTo"></i>-->
<!--            <span>{{title}}</span>-->
<!--        </header>-->
        <main :class="isBack?'':'btm'">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </main>
        <transition name="fade-footer" mode="out-in">
            <footer v-show="isBack" >
                <div @click="goTo(index)"
                     v-for="(item,index) in tabBar"
                     :key="item.name">
                    <img :src="activeTabBar===index?item.activeIcon:item.icon" alt="">
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
                        activeIcon: require('./assets/footer/ashouye.png')
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
                        activeIcon: require('./assets/footer/ageren.png')
                    },
                ]
                // beforeUrl:''
            }
        },
        created() {


            // document.addEventListener('WeixinJSBridgeReady', function onBridgeReady(e) {
            //     console.log(e);
            //     WeixinJSBridge.call('hideToolbar');
            // });

            // homeUrl.includes(this.$route.path);
            this.isBack = homeUrl.includes(this.$route.path);
            // console.log(homeUrl.includes(this.$route.path));
            // console.log(this.$route.path)
            this.title = this.$route.name;
            // this.getArea();
            // if (window.location.href.indexOf('doctors') != -1) {
            //   this.isShowTab = false
            // }
        },
        methods: {
            getArea(){
              this.$axios.get('Consulting/getProvince').then((res)=>{
                  // console.log(res)
              });
                this.$axios.get('Consulting/getCity').then((res)=>{
                    // console.log(res)
                });
                this.$axios.get('Consulting/getDistrict',{city_id:"110100"}).then((res)=>{
                    // console.log(res)
                });

            },
            goTo(index) {
                this.activeTabBar = index
                switch (index) {
                    case 0:this.$router.push({path:'/index'});break;
                    case 1:this.$router.push({path:''});break;
                    case 2:this.$router.push({path:''});break;
                    case 3:this.$router.push({path:'/consult/personal/personal'});break;
                }

            },
            gobackTo() {
                this.$router.go(-1)
            }
        },
        watch: {
            $route(aUrl, bUrl) {
                //获取之前的url，和判断当前url 是否需要footer
                // this.beforeUrl = bUrl.path;

                console.log(this.isBack)
                this.title = this.$route.name;
                this.isBack = aUrl.path !== '/'?homeUrl.includes(aUrl.path):true
            }
        }
    }
</script>
<style lang="scss" >
    .van-picker__cancel, .van-picker__confirm{
        color: white !important;
        font-size: .3rem !important;
    }
    .van-picker-column{
        background-color: #eff1ef;
    }
    .van-picker__title{
        font-size: .32rem !important;
        font-weight: 400 !important;
        color: white !important;
    }
    .van-picker-column__item{
        font-size: .3rem !important;
        color: #4c4c4c !important;
    }
    .van-picker__toolbar{
        background-color: #45cac6;
    }
    .btm {
        bottom: 0 !important;
    }

    .el-input__inner {
        border-radius: 30px !important;

    }

    .el-progress__text {
        color: #93dddc !important;
    }

    .el-progress-bar__inner {
        background-color: #01bdb8 !important;
    }

     main,header, footer {
        position: fixed;
        width: 100%;
         z-index: 2000;
    }

    header {
        position: fixed;
        text-align: center;
        height: 1rem;
        background: #02bdb9;
        top: 0;
        color: white;

        i {
            left: .2rem;
            position: absolute;
            font-size: .45rem;
            top: calc(50% - .225rem);
            /*margin-left: .3rem;*/
            color: white;
        }

        span {
            display: block;
            position: absolute;
            font-size: .35rem;
            width: 70%;
            height: .5rem;
            top: calc(50% - .22rem);
            left: calc(50% - 35%);
        }
    }

    main {
        /*padding-top: 1rem;*/
        top: 0;
        bottom: 1.3rem;
        /*background: #f3f4f5;*/
        /*overflow: auto;*/
        overflow-x: hidden;
        /*overflow-y: auto;*/
        /*-webkit-overflow-scrolling:touch;*/

    }

    footer {
        box-shadow: 0 0 8px 1px rgba(1,189,187,0.1);
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
