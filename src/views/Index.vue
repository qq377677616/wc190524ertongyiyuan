<template>
    <div class="index" id="index">
        <transition name="fade-search">
        <global-search v-show="isShowSearch" @goBack="isShowSearch = false"></global-search>
        </transition>
        <section class="search">
            <!-- 搜索框 -->
            <label @click.stop="isShowSearch = true">
                <input type="text" placeholder="请输入医生" readonly="readonly">
            </label>
            <i class="el-icon-chat-dot-round" @click="$router.push({path:'/messages'})"></i>
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
                <span v-for="(item, key) in itemList">
                    <span @click="getIndexArticle(isShow = key+1)" :class="{'active-t':key+1 == isShow}">{{item}}</span>
                </span>
            </article>
<!--            <transition-group name="fade"  mode="out-in">-->

            <article class="recommend" v-show="isShow=='1'" :key="1" >
                <div v-for="item of dataList.one" @click="goToRecommend(item.id)">
                    <div class="bg" :style="`background-image:url(${item.picture})`"></div>
                    <p>{{item.title}}</p>
                </div>
            </article>
            <article class="detailed" v-show="isShow=='2'" :key="2" >
                <div v-for="item of dataList.two" @click="goToRecommend(item.id)">
                    <div class="detailed-avatar" :style="`background-image:url(${item.picture})`"></div>
                    <div class="detailed-content">
                        <p class="detailed-title">{{item.title}}</p>
                        <p>{{item.summary}}</p>
                        <div class="detailed-user-info">
                            <div :style="`background-image:url(${item.avatar})`"></div>
                            <span>{{item.real_name}}</span>
                        </div>
                        <div class="detailed-tag">
<!--                            <span>1200</span>-->
                            <span>{{item.hits}}</span>
                        </div>
                    </div>
                </div>
            </article>
            <article class="video" v-show="isShow=='3'" :key="3" >
                <div v-for="item of dataList.three">
                    <div :style="`background-image:url(${item.picture})`"><video  :src="item.video_link" controls="controls"></video></div>
                    <p>{{item.title}}</p>
                </div>
            </article>
<!--            <p v-show="isShowList" class="toast">暂无数据</p>-->
<!--            </transition-group>-->
            <article class="detailed" v-show="isShow=='5'" :key="5" >
                <div v-for="item of dataList.fives" @click="goToRecommend(item.id)">
                    <div class="detailed-avatar" :style="`background-image:url(${item.picture})`"></div>
                    <div class="detailed-content">
                        <p class="detailed-title">{{item.title}}</p>
                        <p>{{item.summary}}</p>
                        <div class="detailed-user-info">
                            <div :style="`background-image:url(${item.avatar})`"></div>
                            <span>{{item.real_name}}</span>
                        </div>
                        <div class="detailed-tag">
<!--                            <span>1200</span>-->
                            <span>{{item.hits}}</span>
                        </div>
                    </div>
                </div>
            </article>
        </section>
        <!--        <div style="position: fixed;width: 100%;height: 2.5rem;background-color: #02bdb9;top: 0"></div>-->

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
                isShow:'1',
                isShowSearch:false,
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
                }
            }
        },
        mounted() {
            // current swiper instance
            // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
            // this.swiper.slideTo(3, 1000, false)
            this.getIndexArticle(1)
        },
        methods: {
            goToRecommend(id){
                this.$router.push({path:'/consult/registered/articledetails',query:{id:id}})
            },
            getIndexArticle(status){
              this.$axios.get('Patient/indexArticle',{status:status,user_id:sessionStorage.user_id}).then(res=>{
                  console.log(res.data)
                  switch (Number(status)) {
                      case 1:
                          this.dataList.one = res.data.data
                          break;
                      case 2:
                          this.dataList.two = res.data.data
                          break;
                      case 3:
                          this.dataList.three = res.data.data
                          break;
                      case 4:
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
                    case 2:
                        //工具
                        this.$toast.fail({duration:500,message:"暂未开放"})
                        break;
                    case 3:
                        this.$toast.fail({duration:500,message:"暂未开放"})
                        //活动
                        break;
                }
            },
            callback() {

            }
        },
        computed:{
            swiper() {
                return this.$refs.mySwiper.swiper
            },
          isShowList(){
              const {isShow,dataList} = this
              switch (isShow) {
                  case 1:
                      return dataList.one.length === 0
                      break;
                  case 2:
                      return dataList.two.length === 0
                      break;
                  case 3:
                      return dataList.three.length === 0
                      break;
                  case 4:
                      return dataList.four.length === 0
                      break;
                  case 5:
                      return dataList.fives.length === 0
                      break
              }
          }
        },
        watch:{
            isShowSearch(e){
                if (e) {
                    document.body.classList.add('modal-open')
                    console.log(1)
                }else {
                    document.body.classList.remove('modal-open')
                    console.log(2)
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    .detailed{
        padding: .3rem;

        >div{
            margin-bottom: .3rem;
            display: flex;
            align-items: center;
            .detailed-avatar{
                flex-shrink: 0;
                width: 2rem;
                height: 2rem;
                border-radius: .1rem;
                background-color: #f4f4f4;
                background-size: cover;
            }
            .detailed-content{
                overflow: hidden;
                .detailed-title{
                    font-size: .3rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                .detailed-title + p{
                    font-size: .25rem;
                    color: #afafaf;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                line-height: .5rem;
                padding-left: .3rem;
                .detailed-user-info{
                    display: flex;
                    align-items: center;
                    >div{
                        width: .4rem;
                        height: .4rem;
                        background-color: #f4f4f4;
                        border-radius: 50%;
                        background-size: cover;
                    }
                    span{
                        padding-left: .2rem;
                        font-size: .25rem;
                    }
                }
            }
            .detailed-tag{
                font-size:.3rem;
                :nth-child(1){
                    margin-right: .4rem;
                    padding-left: .5rem;
                    background-image: url("../assets/kan.png");
                    background-size: .4rem;
                    background-position: left;
                    background-repeat: no-repeat;
                }
                :nth-child(2){
                    padding-left: .4rem;
                    background-image: url("../assets/godd.png");
                    background-size: .3rem;
                    background-position: left;
                    background-repeat: no-repeat;
                }
            }
        }

    }
    .fade-search-leave-active,.fade-search-enter-active {
        transition: all .3s ease;
    }
    .fade-search-enter, .fade-search-leave-to {
        opacity: 0;
    }
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
            line-height: .6rem;
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

        i {
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
        padding-bottom: 1.3rem;
        .title {
            background: #f5f5f5;
            color: #909399;
            font-size: .25rem;
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
        .video{
            padding:.3rem;

            >div {
                background-color: #f4f4f4;
                margin-bottom: .3rem;
                border-radius: .2rem;
                /*height: 3.4rem;*/
                /*width: 100%;*/
                /*background: url("../assets/ac.png") no-repeat;*/
                /*background-size: cover;*/
                p{
                    font-size: .3rem;
                    padding: .2rem .3rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                div{
                    video{
                        width: 100%;
                        height: 2.57rem;
                    }
                }

            }
        }
        .recommend {
            >div{
                margin-bottom: .3rem;
                background-color: #f4f4f4;
                border-radius: .2rem;
                overflow: hidden;
                p{
                    font-size: .3rem;
                    padding: .2rem .3rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
            padding:.3rem;

            .bg{
                /*border-radius: .1rem;*/

                width: 100%;
                height: 2.5rem;
                background-size: 100%;
                background-repeat: no-repeat;
            }
        }
    }

</style>