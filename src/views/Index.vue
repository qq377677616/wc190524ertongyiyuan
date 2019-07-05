<template>
    <div class="index">
        <section class="search">
            <!-- 搜索框 -->
            <label>
                <input type="text" placeholder="请输入医生">
            </label>
            <i class="el-icon-chat-dot-round"></i>
        </section>
        <section style="width: 90%;margin: 0 auto;    border-radius: 10px">
            <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
                <!-- slides -->
                <swiper-slide><img
                        src="http://flynew.oss-cn-hangzhou.aliyuncs.com/hospital/feed87e430e7570602b1c698a67aaad.png"
                        alt=""></swiper-slide>
                <swiper-slide><img
                        src="http://flynew.oss-cn-hangzhou.aliyuncs.com/hospital/d1236a4e49ed482091bc36552190885.png"
                        alt=""></swiper-slide>
            </swiper>
        </section>

        <section class="items">
            <!-- 项目选择 -->
            <!--            style="display: block;width: 1rem;height: 1rem;border-radius: 50%;background: #00b5bd"-->
            <article @click="goto(index)" v-for="(item, index) in items" :key="item.name">
                <span class="option">
                    <img :src="item.icon" alt="">
                </span>
                {{item.name}}
            </article>
        </section>
        <section class="content">
            <article class="title">

                <span v-for="item in itemList">
                    <span :class="{'active-t':item === '推荐'}">{{item}}</span>

                </span>
            </article>
            <article class="detailed">
                <div>

                </div>

            </article>
        </section>
        <!--        <div style="position: fixed;width: 100%;height: 2.5rem;background-color: #02bdb9;top: 0"></div>-->
    </div>
</template>

<script>
    export default {
        name: "Index",
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        data() {
            return {
                input23: '',
                itemList: ['推荐', '图文', '视频', '音频', '我的订阅'],
                items: [
                    //4个大选项名称
                    //...
                    {name: '咨询', icon: require('../assets/index/zixun.png')},
                    {name: '挂号', icon: require('../assets/index/guahao.png')},
                    {name: '工具', icon: require('../assets/index/gongju.png')},
                    {name: '活动', icon: require('../assets/index/huodong.png')},
                ],
                swiperOption: {
                    // swiper参数配置
                    // ...
                }
            }
        },
        mounted() {
            // current swiper instance
            // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
            this.swiper.slideTo(3, 1000, false)
        },
        methods: {
            goto(index) {
                //根据index进行跳转
                switch (index) {
                    case 0:
                        //咨询
                        this.$router.replace({path: '/consult'});
                        break;
                    case 1:
                        //挂号
                        this.$router.replace({path: '/consult/queue'});
                        break;
                    case 2:
                        //工具
                        break;
                    case 3:
                        //活动
                        break;
                }
            },
            callback() {

            }
        }
    }
</script>

<style scoped lang="scss">
    .index {
        background-image: url("../assets/reservation/BG.png");
        background-size: 100% 1.7rem;
        background-repeat: no-repeat;
    }

    .swiper-container {
        border-radius: 10px;
        height: 3rem;
        margin-bottom: 15px;
    }

    .swiper-slide {
        height: 3rem;

        img {
            width: 100%;
            height: 100%;
        }
    }

    input::-webkit-input-placeholder {

        color: rgba(255, 255, 255, .8);
    }

    .search {
        line-height: 1.2rem;
        margin: 0 auto;
        width: 90%;
        display: flex;
        align-items: center;
        /*padding-bottom: .1rem;*/
        label {
            flex: 1;
        }

        input {
            padding-left: .6rem;
            width: calc(100% - .6rem);
            flex: 1;
            height: .6rem;
            border-radius: .4rem;
            border: none;
            background-color: rgba(255, 255, 255, 0.4);
            background-image: url("../assets/search-w.png");
            background-repeat: no-repeat;
            background-position: left .2rem center;
            background-size: .3rem;
            font-size: .3rem;
            color: white;
        }

        > i {
            color: white;
            font-size: .6rem;
            width: .6rem;
            /*color: #96999e;*/
            padding-left: .2rem;
        }
    }

    .items {
        color: #5b5b5b;
        font-size: 0.2rem;
        height: 1.5rem;
        display: flex;

        article {
            text-align: center;
            width: 100%;

            span {
                margin: 5px auto;

            }
        }

        .option {
            display: block;
            border-radius: 50%;
            background-image: -moz-linear-gradient(123deg, rgba(0, 209, 182, 0.1) 0%, rgba(141, 255, 240, 0.1) 100%);
            background-image: -webkit-linear-gradient(123deg, rgba(0, 209, 182, 0.1) 0%, rgba(141, 255, 240, 0.1) 100%);
            background: -ms-linear-gradient(123deg, rgba(0, 209, 182, 0.1) 0%, rgba(141, 255, 240, 0.1) 100%);
            /*opacity: 0.102;*/
            width: 0.9rem;
            height: 0.9rem;
            /*z-index: 146;*/
            img {
                width: 50%;
                height: 45%;
                margin-top: calc(50% - 22.5%);
            }
        }
    }

    .active-t {
        border-bottom: 2px #00b5bd solid;
    }

    .content {
        margin-top: 10px;

        .title {
            background: #f5f5f5;
            color: #909399;
            font-size: 0.25rem;
            display: flex;
            text-align: center;

            span {
                line-height: 0.6rem;
                width: 100%;

                span {
                    display: block;
                    width: 70%;
                    margin: 0 auto;

                }
            }
        }

        .detailed {
            padding: .3rem;

            div {
                margin-bottom: .2rem;
                border-radius: .1rem;
                height: 3.4rem;
                width: 100%;
                background: url("../assets/ac.png") no-repeat;
                background-size: cover;
            }
        }
    }

</style>