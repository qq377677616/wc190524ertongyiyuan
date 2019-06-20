<template>
    <div>
        <section class="doctors-info">
            <article class="avatar-info">
                <img src="../../assets/search.png" alt="头像">
                <div class="title">
                    <div>
                        <span>湘雅牙科团队</span><br>
                        <div class="info-li">
                            <span>帮助患者数：32266位</span>
                            <span id="li-ii">一般等待时长：快</span>
                        </div>
                    </div>
                    <article class="tag">
                        <span id="tag-li">团队介绍:</span>
                        <span>医生，一般称灵床考虑到时间看到法拉盛快阿萨斯大所多递费</span>
                    </article>
                </div>

            </article>
        </section>
        <div class="introduction">
            <span class="al">团队擅长:</span>
            <span>医生,可怜的减肥路上的咖啡机 </span>
        </div>
        <section class="listDate">
            <article class="listDate-title">
                <span>团队领衔专家</span>
            </article>
            <article class="doctors-expert">
                <img src="" alt="">

                    <p>张建国 <span>| 知名专家</span></p>
                    <p class="star">推荐热度(综合)：<i v-for="item in [1,2,3,4]" class="el-icon-star-on"></i></p>
                    <span>长沙湘雅医院</span>
            </article>
            <p class="title-ii">团队其他成员 (3人)</p>
            <article class="doctors-list" v-for="item in [1,2,3]" :key="item">
                <img src="" alt="">
                <p>张建国 <span>| 知名专家</span></p>
                <div class="tag"><span>长沙湘雅医院</span> <span>长沙湘雅医院</span></div>
            </article>
        </section>
    </div>
</template>

<script>
    export default {
        name: "teamIntroduction"
    }
</script>

<style scoped lang="scss">

    .doctors-info {
        /*width: 100%;*/
        height: 3rem;
        background: url("../../assets/phoneserve/BG.png");
        background-size: cover;
        /*padding-bottom: .3rem;*/
        border-bottom: 1px white solid;

        .avatar-info {
            line-height: 0.4rem;
            padding: .3rem;

            img {
                margin-right: 0.2rem;
                float: left;
                width: 1.45rem;
                height: 1.45rem;
                background: #9b9c9d;
                background-size: cover;
            }

            .title {
                font-size: 0.4rem;
                font-weight: 600;
                padding-top: 0.25rem;
                color: white;

                .info-li {
                    font-size: .28rem;
                    font-weight: 200;
                    margin-top: .1rem;
                    #li-ii{
                        float: right;
                    }
                }

                #zj {
                    font-weight: 200;
                }

                .ic {
                    font-size: 0.25rem;
                    font-weight: 300;
                }
            }
        }

        .tag {
            margin-top: 0.5rem;
            display: flex;

            #tag-li{
                font-weight: 400;
                width: 28%;
            }
            span {
                color: white;
                font-size: 0.3rem;
                border-radius: 20px;
                font-weight: 300;
                margin-right: 0.1rem;
            }
        }
    }
    .introduction{
        padding: .3rem;
        height: 1rem;
        background: #2accb4;
        .al{
            font-weight: 400;
        }
        span{
            font-weight: 200;
            color: white;
        }
    }
    .listDate {
        background: white;
        margin-top: -0.45rem;
        border-radius: 20px 20px 0 0;
        width: 100%;
        height: auto;

        .listDate-title {
            margin-left: .3rem;
            color: #00b5bd;
            line-height: 1rem;
            font-size: 0.4rem;
            width: 100%;
        }
        .doctors-expert{
            padding:0 .3rem;
            height: 2.1rem;
            border-bottom:5px #eff1ef solid;
            img{
                border-radius: 5px;
                margin-right: 0.2rem;
                float: left;
                width: 1.8rem;
                height: 1.8rem;
                background: #9b9c9d;
                background-size: cover;
            }
            img+p{
                font-size: .4rem;
                color: #5b5b5b;
                span{
                    font-size: .3rem;
                    color: #a9aaab;
                }

            }
            .star{
                color: #01bdbb;
                font-size: .3rem;
                font-weight: 200;
                display: flex;
                align-items: center;
                margin-top: .05rem;
                margin-bottom: .15rem;
                i{
                    font-size: .5rem;
                }
            }
            .star+span{
                font-size: .3rem;
                margin-top: .2rem;
                padding:.1rem .25rem;
                background: #e3f9fa;
                border-radius: 20px;
                width:4rem;
                color: #37a19d;
                font-weight: 200;
            }
        }
        .title-ii{
            margin-top: .2rem;
            padding:0 .3rem;
            color: #02bdb9;
            font-size: .4rem;
        }
        .doctors-list{
            margin-top: .2rem;
            padding:0 .3rem;
            height: 2.1rem;
            line-height: .8rem;
            border-bottom:5px #eff1ef solid;
            p{
                font-size: .4rem;
                color: #5b5b5b;
                span{
                    font-size: .3rem;
                    color: #a9aaab;
                }
            }
                img{
                    border-radius: 5px;
                    margin-right: 0.2rem;
                    float: left;
                    width: 1.8rem;
                    height: 1.8rem;
                    background: #9b9c9d;
                    background-size: cover;
                }
                .tag span{
                    margin-right: .2rem;
                    font-size: .3rem;
                    margin-top: .2rem;
                    padding:.1rem .25rem;
                    background: #e3f9fa;
                    border-radius: 20px;
                    width:4rem;
                    color: #37a19d;
                    font-weight: 200;
                }

        }
    }
</style>