<template>
    <div style="" class="consult">
        <!--        <div style="position: fixed;width: 100%;height: 2rem;background-color: #4d8fec;top: 0"></div>-->
        <section>

        </section>
        <section class="swiper-box">
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
        <section>
            <article class="consult-select">
                <div>
                    <span class="c-icon">
                        <img src="../../assets/index/zixun.png" alt="">
                    </span>
                    <span class="text">
                        <span>咨询</span><br>
                        <span>专业服务</span>
                    </span>
                </div>
                <span></span>
                <div @click="goToService">
                    <span class="c-icon">
                    <img src="../../assets/index/tese.png" alt="">
                    </span>
                    <span class="text">
                        <span>特色服务</span><br>
                        <span>快捷 省时</span>
                    </span>
                </div>
            </article>
        </section>
        <section style="     padding-bottom: 2.6rem;">
            <article class="consult-studio">
                <div v-for="(item,key) of items" :key="key" @click="goToRegistered(item.id)">
                    <span class="studio-bg">
                        <span>
                            <!-- <img :src="item.img_url" alt="icon"> -->
                            <img :src="newImage[key]" alt="icon">
                        </span>
                        {{item.name}}
                    </span>
                </div>
            </article>
        </section>
        <transition enter-active-class="animated fadeInUpBig" appear>
            <div class="btn" @click="dgShow = true">
                <span >导诊</span>
            </div>
        </transition>
        <transition name="fade">
        <div class="dg" v-show="dgShow">
            <i class="el-icon-back" @click="dgShow = false"></i>
            <img src="" alt="">
        </div>
        </transition>
    </div>
</template>

<script>

    export default {
        name: "index",
        components: {},
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        data() {
            return {
                dgShow:false,
                items: [],
                //activeView 抽屉页弹窗显示依据 activeViewName 组件名称
                activeView: false,
                activeViewName: '',
                swiperOption: {
                    loop:true
                    // swiper参数配置
                    // ...
                },
                newImage:[
                    'bloodSpecialty','cardiology','respiratory','digestive',
                    'healthSection','dermatological','neurology','stomatology',
                    'otolaryngology','internalMedicine','surgery','ophthalmic',
                    'chineseMedicine','pediatrics','infectiousPatients','emergencyDepartment'
                ]
            }
        },
        created() {
            this.getStudio();
            this.newImage=this.newImage.map(function(item){
                return require(`../../assets/newDepartmentsIcon/${item}.png`);
            })
        },
        methods: {
            goToService(){
              this.$router.push({path:'/consult/featured',})

            },
            // customerService() {
            //     this.$toast.fail('暂未开发')
            // },

            getStudio() {
                this.$axios.get('Patient/departmentClass',{user_id:sessionStorage.user_id}).then(res => {
                    console.log(res.data.department_class);
                    this.items = res.data.department_class
                })
            },
            goToRegistered(el) {
                this.$router.push({path: '/consult/registered', query: {id: el}})

            },
            callback() {

            }
        }
    }
</script>

<style scoped lang="scss">
    .dg{
        i{
            position: absolute;
            left: .3rem;
            top: .25rem;
            font-size: .7rem;
            color: #96999e;
        }
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: white;
        z-index: 3000;
    }
    .consult{
        min-height: 100vh;
        background-image: url("../../assets/reservation/newTopBg.png");
        background-repeat: no-repeat;
        background-size: 100% 4rem;
        background-position: top;
    }
    .swiper-box {
        padding: .3rem .3rem 0 .3rem;
        border-radius: .1rem
    }

    .btn {
        position: fixed;
        line-height: 1rem;
        background: #4d8fec;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        color: white
    }

    .swiper-container {
        border-radius: .1rem;
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

    .consult-select {
        display: flex;
        align-items: center;
        height: 2rem;
        margin: .3rem;
        border-radius: .1rem;
        background: url("../../assets/reservation/newTopBg.png");
        background-size: cover;

        > span {
            border-right: 1px white solid;
            height: 55%;
            /*margin: .2rem 0;*/
            /*border-left:1px #a7a8a8 solid;*/
        }

        div {
            width: 100%;
            height: 2rem;
            /*position: relative;*/
            display: flex;
            align-items: center;
            justify-content: center;

            .c-icon {
                margin-right: .2rem;
                display: block;

                /*position: absolute;*/
                border-radius: 50%;
                /*left: 15%;*/
                /*top: calc(50% - 0.4rem);*/
                background-color: rgb(255, 255, 255);
                width: 0.8rem;
                height: 0.8rem;
                box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.4);
                text-align: center;

                img {
                    width: 0.4rem;
                    height: 0.4rem;
                    margin-top: calc(50% - 0.2rem);
                }
            }

            .text {
                color: white;

                span:nth-child(1) {
                    font-size: .3rem;
                }

                span:nth-child(3) {
                    font-size: .2rem;
                }
            }
        }
    }

    .consult-studio {
        margin: .15rem;

        div {
            display: inline-block;
            text-align: center;
            min-width: calc(100% / 3);
            height: 1.8rem;
            position: relative;

            .studio-bg {
                display: block;
                position: absolute;
                border-radius: .1rem;
                background-color: rgb(245, 245, 245);
                color: #858585;
                font-size: 0.3rem;
                left: .15rem;
                right: .15rem;
                top: 0;
                bottom: .15rem;

                span {
                    border-radius: 50%;
                    display: block;
                    background-color: rgba(255, 255, 255, 0.4);
                    height: 0.8rem;
                    width: 0.8rem;
                    margin-left: calc(50% - 0.4rem);
                    margin-top: 10%;
                    margin-bottom: .08rem;
                    
                    img {
                        width: 0.8rem;
                    }
                }
            }
        }
    }

    .fade-public-enter-active, .fade-public-leave-active {
        transition: all .4s ease;
    }

    .fade-public-enter {
        /*//进入时的动画*/
        transform: translateX(100%);
        /*opacity:0;*/
    }

    .fade-public-leave-active {
        /*//离开时的动画*/
        transform: translateX(100%);
        /*opacity:0;*/
    }
</style>