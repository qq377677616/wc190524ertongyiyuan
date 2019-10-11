<template>
    <div class="index" id="index">
        <transition name="fade-search">
        <global-search v-show="isShowSearch" @goBack="isShowSearch = false"></global-search>
        </transition>
        <section class="search">
            <h1>京都线上服务平台</h1>
            <!-- 搜索框 -->
            <label @click.stop="isShowSearch = true">
                <input type="text" placeholder="请输入医生" readonly="readonly">
            </label>
            <!-- <i class="el-icon-chat-dot-round" @click="$router.push({path:'/messages'})"></i> -->
        </section>
        <section class="bannerBox">
            <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
                <!-- slides -->
                <swiper-slide  v-for="item of banner" :key="item.title"><img
                        @click="gotoBanner(item)"
                        :src="item.photo"
                        alt=""></swiper-slide>
            </swiper>
        </section>
        <section>
            <article style=" text-align: center;">
                <img style="width: 90%;" @click="onlineService" src="../assets/index/onlineService.png" />
            </article>
            <article class="consultList">
                <div>
                    <img src="../assets/index/doctorIcon.png" />
                    <div>
                        <p>在线咨询</p>
                        <button><img src="../assets/index/consultBut.png" @click="goto(0)" /></button>
                    </div>
                </div>
                <div>
                    <img src="../assets/index/yaopingIcon.png" />
                    <div>
                        <p>用药引导</p>
                        <button><img src="../assets/index/pharmacist.png" @click="medicationGuidance" /></button>
                    </div>
                </div>
            </article>
        </section>
        <section class="items">
            <template v-for="(item, index) in items">
                <div @click="goto(index+1)" class="option" :key="item.name">
                    <img :src="item.icon" alt="">
                    <p>{{item.name}}</p>
                </div>
            </template>
        </section>
        <section class="bg_fff">
            <header class="sectionTitle">
                <p><strong>专家团队</strong>便民就医 省时省力<span @click="moreExperts">更多</span></p>
            </header>
            <article class="expertTeam">
                <template v-for="item in expertTeam">
                    <div :key="item.name" @click="clickExperts">
                        <img :src="item.img" />
                        <p class="exceeded"><strong>{{item.name}}</strong></p>
                        <span>{{item.speciality}}</span>
                    </div>
                </template>
            </article>
        </section>
        <section class="bannerBox theSecondBannerBox">
            <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
                <!-- slides -->
                <swiper-slide  v-for="item of theSecondBanner" :key="item.photo"><img
                        @click="gotoBanner(item)"
                        :src="item.photo"
                        alt=""></swiper-slide>
            </swiper>
        </section>
        <section class="bg_fff">
            <header class="sectionTitle">
                <p><strong>优秀文章</strong><span @click="moreArticle">更多</span></p>
            </header>
            <article class="articleList">
                <template v-for="item in articleList">
                    <div :key="item.id" @click="goToRecommend(item.id)">
                        <img :src="item.picture" />
                        <div>
                            <p class="exceeded"><strong>{{item.title}}</strong></p>
                            <p>{{item.summary}}</p>
                            <!-- <span>2019-09-01</span> -->
                        </div>
                    </div>
                </template>
            </article>
        </section>
        <section class="bg_fff">
            <header class="sectionTitle">
                <p><strong>优秀视频</strong><span @click="moreVideo">更多</span></p>
            </header>
            <article class="videoList">
                <template v-for="item in videoList">
                    <div :key="item.id">
                        <video :poster="item.picture"
                               :src="item.video_link" :controls="item.controls" preload="meta"
                               @click="playVideo(item,$event)"></video>
                        <div>
                            <p class="exceeded"><strong>{{item.title}}</strong></p>
                            <!-- <span>2019-09-01</span> -->
                        </div>
                    </div>
                </template>
            </article>
        </section>
    </div>
</template>

<script>
    import globalSearch from './consult/globalSearch'

    export default {
        name: "Index",
        components:{
            globalSearch
        },
        data() {
            return {
                isShowSearch:false,
                input23: '',
                itemList: ['推荐', '图文', '视频', '音频', '订阅'],
                items: [
                    {name: '预约挂号', icon: require('../assets/index/register.png')},
                    {name: '诊间交费', icon: require('../assets/index/zhenJIanPay.png')},
                    {name: '报告查询', icon: require('../assets/index/baoGaoQuery.png')},
                    {name: '发育自测', icon: require('../assets/index/auxeZiCe.png')},
                    {name: '宝宝血型', icon: require('../assets/index/BabyXieXing.png')},
                    {name: '检查解读', icon: require('../assets/index/inspectJieDu.png')},
                ],
                expertTeam: [
                    {   
                        name: "孙媛团队",
                        speciality: "血液肿瘤科",
                        img: require('../assets/index/expertTeamImg_1.jpg')
                    },
                    {
                        name: "徐樨巍团队",
                        speciality: "消化科",
                        img: require('../assets/index/expertTeamImg_2.jpg')
                        },
                    {
                        name: "孙绪丁团队",
                        speciality: "中医科",
                        img: require('../assets/index/expertTeamImg_3.jpg')
                    },
                ],
                swiperOption: {
                    loop:true
                    // swiper参数配置
                    // ...
                },
                dataList:{
                    one:[],
                    two:[],
                    three:[],
                    four:[],
                    fives:[]
                },
                articleList: [],
                videoList: [],
                banner:[],
                theSecondBanner: [
                    {
                        photo: require('../assets/index/theSecondBanner_img_1.png'),
                        synopsis_photo: "",
                        url: "",
                    }
                ],
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
            // current swiper instance
            // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
            // this.swiper.slideTo(3, 1000, false)
            //获取图文列表
            this.getIndexArticle(1);
            //获取视频列表
            this.getIndexArticle(3);
            this.getBanner();
        },
        methods: {
            gotoBanner(item){
                window.location.href = `${item.url}?photo=${item.synopsis_photo}`
            },
            goToRecommend(id){
                this.$router.push({path:'/consult/registered/articledetails',query:{id:id}})
            },
            getBanner(){
                this.$axios.get('Patient/showBanner',{user_id:sessionStorage.user_id,type:1}).then(res=>{
                    // console.log('轮播图',res)
                    this.banner = res.data.data
                })
            },
            getIndexArticle(status){
              this.$axios.get('Patient/indexArticle',{status:status,user_id:sessionStorage.user_id}).then(res=>{
                //   console.log("文章",res.data)
                  switch (Number(status)) {
                      case 1:
                        //   this.dataList.one = res.data.data
                        this.articleList=res.data.data.slice(0,3);
                          break;
                      case 2:
                          this.dataList.two = res.data.data
                          break;
                      case 3:
                        //   this.dataList.three = res.data.data
                        this.videoList=res.data.data.slice(0,4).map(function(i){
                            i.controls=false;
                            return i;
                        })
                          break;
                      case 4:
                          this.$toast.fail({duration:500,message:"暂未开放"})
                          break;
                      case 5:
                          this.dataList.fives = res.data.data
                          break;
                  }
              })
            },
            goto(index) {
                //根据index进行跳转
                switch (index) {
                    case 0:
                        //咨询
                        this.$router.push({path: '/consult'});
                        break;
                    case 1:
                        //挂号
                        this.$router.push({path: '/consult/queue'});
                        break;
                    default:
                        this._notYetOpen();
                    
                }
            },
            callback() {

            },
            onlineService(){
                this._notYetOpen();
            },
            medicationGuidance(){
                this._notYetOpen();
            },
            moreExperts(){
                this._notYetOpen();
            },
            clickExperts(){
                this._notYetOpen();
            },
            moreArticle(){
                this.$router.push({
                    path: '/consult/registered/articleAndVideoList',
                    query: {
                        type: 2,
                    }
                });
            },
            moreVideo(){
                this.$router.push({
                    path: '/consult/registered/articleAndVideoList',
                    query: {
                        type: 3,
                    }
                });
            },
            playVideo(item,e){
                item.controls=true;
                e.target.play();
            },
            _notYetOpen(){
                this.$toast.fail({duration:1000,message:"暂未开放"});
            },
        },

        computed:{
            swiper() {
                return this.$refs.mySwiper.swiper
            },
        },
        watch:{
            isShowSearch(e){
                if (e) {
                    document.body.classList.add('modal-open')
                }else {
                    document.body.classList.remove('modal-open')
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    video{
        /*width:100%;*/
        /*height:100%;*/
        object-fit:fill;
    }
    .fade-search-leave-active,.fade-search-enter-active {
        transition: all .3s ease;
    }
    .fade-search-enter, .fade-search-leave-to {
        opacity: 0;
    }
    .index {
        padding-bottom: 1.3rem;
        // background-image: url("../assets/reservation/BG.png");
        background: url("../assets/reservation/newTopBg.png") no-repeat center top/100% 8.5rem #e1e1e1;
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

    .search {
        margin: 0 auto 0.3rem;
        width: 90%;
        overflow: hidden;
        h1{
            margin: 0.6rem 0 0.3rem;
            text-align: center;
            font-size: 0.4rem;
            line-height: 1;
            color: #fff;
        }
        label {
            flex: 1;
        }

        input {
            box-sizing: border-box;
            padding-left: .6rem;
            width: 100%;
            // flex: 1;
            line-height: .6rem;
            border-radius: .4rem;
            border: none;
            background-color: rgba(255, 255, 255, 0.4);
            background-image: url("../assets/search-w.png");
            background-repeat: no-repeat;
            background-position: right .4rem center;
            background-size: .3rem;
            background-color: #d2d2d2;
            font-size: .3rem;
            color: #333;
        }
        input::-webkit-input-placeholder {
            color: #777;
        }
        i {
            color: white;
            font-size: .6rem;
            width: .6rem;
            /*color: #96999e;*/
            padding-left: .2rem;
        }
    }
    .bannerBox{
        width: 90%;
        margin: 0 auto;
        border-radius: 10px;
        box-shadow: 0 0 20px 0 rgba(0,0,0,0.4);
    }
    .consultList{
        margin: 10px auto 0;
        display: flex;
        justify-content: space-between;
        width: 90%;
        >div{
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 0.2rem 0 0.5rem;
            width: 47%;
            height: 1.6rem;
            background: url('../assets/index/consultBg.png') no-repeat center/100% 100%;
            >img{
                width: .8rem;
            }
            div{
                color: #fff;
                font-size: 0.32rem;
                button{
                    margin-top: 0.2rem;
                    width: 1.42rem;
                    height: 0.5rem;
                    font-size: 0;
                    background-color: transparent;
                    border: none;
                }
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .items {
        margin-top: 0.5rem;
        padding-top: 0.5rem;
        color: #5b5b5b;
        font-size: 0.25rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        background-color: #fff;
        .option {
            display: block;
            border-radius: 50%;
            margin-bottom: 0.7rem;
            img {
                margin-bottom: 0.1rem;
                width: 0.9rem;
                height: 0.9rem;
            }
        }
        .option:not(:nth-of-type(3n)){
            margin-right: 1.34rem;
        }
    }
    .sectionTitle{
        padding: 0 5%;
        line-height: 1rem;
        font-size: 0.2rem;
        p{
            position: relative;
        }
        strong{
            margin-right: 10px;
            font-size: 0.34rem;
            color: #393939;
        }
        span{
            padding-left: 0.4rem;
            position: absolute;
            right: 0;
            font-size: 0.26rem;
            color: #747474;
            background: url('../assets/index/moreIcon.png') no-repeat left center/0.3rem;
        }
    }
    .expertTeam{
        display: flex;
        justify-content: space-between;
        padding: 0 5%;
        div{
            margin: .4rem 0;
            width: 2rem;
            color: #393939;
            text-align: center;
        }
        img{
            width: 100%;
            height: 3.2rem;
            box-shadow: 0 0 20px 0 rgba(0,0,0,0.1);
            border-radius: .1rem;
            object-fit: cover;
        }
        strong{
            margin: .24rem 0 .17rem;
            font-size: 0.3rem;
        }
        span{
            text-indent: 2em;
            font-size: 0.24rem;
        }
    }
    .theSecondBannerBox{
        margin: .13rem auto 0;
        box-shadow: none;
        .swiper-container{
            margin: 0;
        }
    }
    .articleList{
        padding: 0 5%;
        >div{
            display: flex;
            padding: 10px 0;
            height: 2rem;
            font-size: 0.3rem;
            color: #393939;
            div{
                width: calc(100% - 2.26rem);
            }
        }
        >div:not(:last-of-type){
            border-bottom: 1px solid #bfbfbf;
        }
        img{
            margin-right: 0.26rem;
            width: 2rem;
            height: 2rem;
            object-fit: cover;
            border-radius: 0.1rem;
        }
        p:last-of-type{
            margin-top: .25rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
        }
    }
    .videoList{
        padding: 0 5%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        >div{
            margin-bottom: 0.5rem;
            width: 3.3rem;
            div{
                width: 100%;
                font-size: .28rem;
                color: #393939;
            }
            // p{
            //     display: inline-block;
            //     width: calc(100% - 1.7rem);
            //     vertical-align: bottom;
            // }
        }
        video{
            width: 100%;
            height: 1.7rem;
            border-radius: .1rem;
        }
    }
    .active-t {
        border-bottom: 2px #5ddcd3 solid;
        color: #5ddcd3;
    }
    .bg_fff{
        margin-top: .15rem;
        background-color: #fff;
    }
    .exceeded{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
</style>
