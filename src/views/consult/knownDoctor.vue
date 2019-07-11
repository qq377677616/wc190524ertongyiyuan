<template>
    <div>
        <section class="doctors-info">
            <div>
                <article class="avatar-info">
                    <span :style="`background-image:url(${doctorInfo.avatar})`" ></span>
                    <div>
                        <span>{{doctorInfo.real_name}} <span id="zj">| 知名专家</span></span><br>
                        <article class="tag">
                            <span v-for="item of doctorInfo.label">{{item}}</span>
                        </article>
                    </div>
                </article>

                <!--                <article class="text">-->
                <!--                    <p style="display: flex;align-items: center;">推荐热度 (综合) ：5.0 <i class="el-icon-star-on"></i>-->
                <!--                        (近两年患者推荐)-->
                <!--                    </p>-->
                <!--                    <span>在线服务满意度：100% </span>-->
                <!--                    <span>一般等待时长：快</span>-->
                <!--                    <p>近两周回复数: 99+</p>-->

                <!--                </article>-->
                <article class="dynamic-btn">
                    <article class="tally">

                        <span>关注数: {{doctorInfo.follow_num}} 人</span>
                        <!--                    <span class="studio">工作室介绍</span>-->
                    </article>
                    <div>
                        <span @click="attention" :class="{'isFollow':doctorInfo.is_follow === 1}"><i
                                class="el-icon-user"></i> {{doctorInfo.is_follow ===1?'已关注':'关注'}}</span>
                    </div>
                    <!--                    <div>-->
                    <!--&lt;!&ndash;                        <span @click="chat"><i class="el-icon-chat-line-round"></i> 私信</span>&ndash;&gt;-->
                    <!--                    </div>-->

                </article>

                <!--                <article class="tally">-->
                <!--                    <span>关注数:29385</span>-->
                <!--                </article>-->
            </div>

        </section>
        <section class="listDate">
            <article class="listDate-title">
                <span v-for="(item, index) in ['咨询','动态','科普',]" :key="item" @click="selectPj(index)">
                    <span :class="{'active-title':index===activeIndex}">{{item}}</span>
                </span>
            </article>
        </section>
        <!--        :class="item.name===activeBox?'active-box':''"-->
        <section>
            <transition-group enter-active-class="animated fadeIn">
                <article v-show="activeIndex===0" :key="0">
                    <p class="toast" v-if="doctorInfo.zx_status == 2">暂时关闭</p>
                    <div class="advisory-select" v-if="doctorInfo.zx_status != 2">
                        <div @click="selectIndex(item.name)" class="box " v-for="item in items" :key="item.name">
                            <span class="icon"><img :src="item.icon" alt=""></span>
                            <p>{{item.name}}</p>
                        </div>
                    </div>
                </article>
                <article v-show="activeIndex===1" :key="1">
                    <div class="dynamic" v-for="item of dynamicList">
                        <div class="title">
                            <img :src="item.doctor_avatar" alt="">
                            <span>{{item.real_name}}</span>
                        </div>
                        <div>
                            <p>{{item.content}}</p>
                        </div>
                        <!--                        <div style="text-align: right;padding-right: .15rem;font-size: .3rem">-->
                        <!--                            <span style="color: #09aba7">全文</span>-->
                        <!--                        </div>-->
                        <div class="photos">
                            <img v-for="img of item.photo" :src="img" alt="">
                        </div>
                    </div>

                </article>
                <article v-show="activeIndex===2" :key="2">
                    <div v-for="item of articleList" class="article" @click="goToArticleDetails(item.id)">
                        <p>{{item.title}}</p>
                        <div>
                            <span v-for="label of item.label">{{label}}</span>
                        </div>
                        <div class="user-info">
                            <img :src="item.doctor_avatar" alt="">
                            <p><span>{{item.real_name}} </span>{{item.level==='2'?'知名专家':'专家'}} {{item.hospital_name}}
                            </p>
                        </div>
                        <p class="content">
                            {{item.content}}
                        </p>
                        <p>{{item.comment}}条评价·{{item.hits}}人已读·{{item.utile}}人觉得有用</p>
                    </div>
                </article>
            </transition-group>
            <p class="pjt" >{{isDataList}}</p>
        </section>
    </div>
</template>

<script>

    export default {
        components: {},
        name: "knownDoctor",
        data() {
            return {
                kfc: false,
                radio: false,
                dataList: [
                    {title: '电话咨询', content: '提交手机号码，医生会联系您',},
                    {title: '视频咨询', content: '提交手机号码，医生会联系您',},
                    {title: '图文咨询', content: '医生问诊不限交流次数',},
                ],
                activeMoney: {},
                doctorInfo: {},
                activeIndex: 0,
                activeBox: '图文咨询',
                items: [
                    {name: '图文咨询', icon: require('../../assets/knownDoctor/tuweny.png')},
                    {name: '电话咨询', icon: require('../../assets/knownDoctor/dianhua.png')},
                    {name: '视频咨询', icon: require('../../assets/knownDoctor/shiping.png')},
                ],
                studioInfo: {},
                dynamicList: [],
                articleList: [],
            }
        },
        created() {
            this.$axios.get('Patient/doctorDetails', {
                doctor_id: this.$route.query.id,
                user_id: sessionStorage.user_id
            }).then(res => {
                console.log(res.data)
                this.doctorInfo = res.data.data
                this.getDynamic('', this.doctorInfo.id);
                this.getArticleList('', this.doctorInfo.id);
            })
        },
        methods: {
            goToArticleDetails(id){
                this.$router.push({path: '/consult/registered/articledetails', query: {id: id}})
            },
            chat() {
                this.$toast.fail('暂未开放')
            },
            getArticleList(department_id = '', doctor_id = '') {
                this.$axios.post('Patient/articleList', this.$Qs.stringify({
                    user_id: sessionStorage.user_id,
                    department_id: department_id,
                    doctor_id: doctor_id
                })).then(res => {
                    console.log(res)
                    this.articleList = res.data.articl_list;
                    // this.dynamicList = res.data.dynamic_list
                    // console.log(this.dynamicList)
                });
            },
            getDynamic(department_id = '', doctor_id = '') {
                // this.$axios
                this.$axios.post('Patient/dynamicList', this.$Qs.stringify({
                    user_id: sessionStorage.user_id,
                    department_id: department_id,
                    doctor_id: doctor_id
                })).then(res => {
                    console.log(res)
                    this.dynamicList = res.data.dynamic_list
                })
            },
            attention() {
                //    关注
                this.$axios.post('Patient/follow', this.$Qs.stringify({
                    user_id: sessionStorage.user_id,
                    to_id: this.doctorInfo.id,
                    to_type: 2,
                    status: this.doctorInfo.is_follow === 1 ? 2 : 1,
                })).then(res => {
                    console.log(res.data.msg)
                    if (res.data.msg === 'ok') {
                        this.doctorInfo.is_follow = this.doctorInfo.is_follow === 1 ? 0 : 1
                    }
                })
            },
            selectIndex(item) {
                this.activeBox = item;
                this.$router.push({
                    path: '/consult/registered/doctorservice',
                    query: {title: item, id: this.doctorInfo.id, user_id: this.doctorInfo.identifier}
                });
            },
            selectPj(index) {
                this.activeIndex = index
            }
        },
        computed: {
            isDataList(){
                const {activeIndex, dynamicList, articleList} = this
                switch (activeIndex) {
                    case 1:
                        if (dynamicList === undefined) return '暂无动态'
                        break;
                    case 2:
                        if (articleList === undefined) return '暂无文章'
                        break;
                }
            },
            dtl() {
                let item = this.$route.query.title;
                for (let i of this.dataList) {
                    if (i.title === item) {
                        return i
                    }
                }
            },
            getMoney() {
                let i;
                switch (this.$route.query.title) {
                    case '图文咨询':
                        i = this.activeMoney.msg_money;
                        break;
                    case '视频咨询':
                        i = this.activeMoney.video_money;
                        break;
                    case '电话咨询':
                        i = i = this.activeMoney.phone_money;
                        break;
                }
                return i / 100
            }
        }
    }
</script>

<style scoped lang="scss">
    /*.shut-down{*/
    /*    background: #f4f4f4 !important;*/
    /*    color: #666666 !important;*/
    /*}*/
    .dynamic {
        padding: .15rem;
        border-bottom: .1rem #f4f5f6 solid;

        .photos {
            display: flex;
            flex-wrap: wrap;
            /*justify-content: space-around;*/
            img {

                margin: .15rem;
                display: block;
                width: calc(100% / 3 - .3rem);
                height: 2.2rem;
                background-color: #00b5bd;
                border-radius: .1rem;
            }
        }

        .title {
            padding: .15rem;
            display: flex;
            align-items: center;

            span {
                font-size: .35rem;
                color: #45cac6;
                padding-left: .2rem;
            }

            img {
                display: block;
                height: .8rem;
                width: .8rem;
                background-color: #00b5bd;
                border-radius: 50%;
            }
        }

        div {
            /*padding-bottom: .2rem;*/

            p {
                line-height: .5rem;
                padding: 0 .15rem;
                font-size: .3rem;
                /*display: -webkit-box;*/
                /*-webkit-box-orient: vertical;*/
                /*-webkit-line-clamp: 3;*/
                /*overflow: hidden;*/
            }
        }

    }

    .article {
        border-bottom: .1rem #ecedee solid;
        padding: .3rem;

        p {
            font-size: .35rem;
            color: #4c4c4c;
        }

        p + div {
            padding-top: .2rem;

            span {
                font-size: .25rem;
                margin-right: .2rem;
                color: #09aba7;
                padding: .05rem .2rem;
                background: #e4f8f8;
                border-radius: .3rem;
                font-weight: 200;
            }
        }

        .user-info {
            padding: .2rem 0;
            display: flex;
            align-items: center;

            img {
                display: block;
                width: .6rem;
                height: .6rem;
                background-color: #00b5bd;
                border-radius: 50%;
            }

            p {
                padding-left: .2rem;
                font-size: .3rem;
                color: #606266;
                font-weight: 200;

                span {
                    color: #4c4c4c;
                    font-weight: 400;
                }
            }
        }

        .content {
            font-weight: 200;
            color: #606266;
            font-size: .3rem;
        }

        .content + p {
            padding-top: .2rem;
            font-weight: 200;
            font-size: .25rem;
            color: #a1a7a8;
        }

    }

    .pjt {
        margin-top: 1rem;
        display: block;
        font-size: .6rem;
        text-align: center;
        color: #a1a7a8;
    }

    .isFollow {
        background: white !important;
        color: #00b5bd !important;
        box-shadow: 0 0 3px 2px rgba(1, 189, 187, 0.3);
    }

    .dynamic-btn {
        padding: 0 .3rem;
        position: absolute;
        bottom: 1.2rem;
        width: 100%;
        display: flex;
        box-sizing: border-box;
        align-content: center;

        div {
            /*text-align: center;*/
            text-align: right;
            width: 100%;
            margin-left: .2rem;

            span {
                font-size: .3rem;
                padding: .1rem .3rem;
                border-radius: .1rem;
                color: white;
                background: linear-gradient(to bottom right, #4ae2df, #02bdb9);
            }
        }
    }

    .active-title {
        border-bottom: 2px #01bdb8 solid;
        color: #01bdb8;
    }

    .registered-star {
        line-height: 0.8rem;
    }

    .doctors-info {
        padding-top: .3rem;
        width: 100%;
        height: 3.5rem;
        background: url("../../assets/phoneserve/BG.png");
        background-size: cover;

        .tally {
            width: 100%;

            span {
                padding-left: .35rem;
                font-size: .3rem;
                color: white;
                background: url("../../assets/doctorDetails/guanzhu.png") no-repeat;
                background-position-y: center;
                background-size: .3rem;
            }

            .studio {
                margin-left: .3rem;
                display: inline-block;
                background: rgba(255, 255, 255, .4);
                padding: .15rem .3rem;
                border-radius: .1rem;
            }
        }

        div {
            height: 100%;
            position: relative;

            .avatar-info {
                line-height: 0.4rem;
                margin-left: 0.3rem;

                >span {
                    display: block;
                    margin-right: 0.3rem;
                    float: left;
                    width: 1.45rem;
                    height: 1.45rem;
                    background-color: #f4f4f4;
                    background-size: cover;
                    border-radius: 50%;
                }

                div {
                    font-size: 0.4rem;
                    font-weight: 600;
                    padding-top: 0.25rem;
                    color: white;

                    #zj {
                        font-weight: 200;
                        font-size: .3rem;
                    }

                    .ic {
                        font-size: 0.25rem;
                        font-weight: 300;
                    }
                }
            }

            .tag {
                margin-top: 0.1rem;

                span {
                    color: white;
                    font-size: 0.25rem;
                    background: rgba(255, 255, 255, 0.2);
                    padding: .05rem .2rem;
                    border-radius: 20px;
                    font-weight: 300;
                    margin-right: 0.3rem;
                }
            }

            .text {
                height: 1.5rem;
                color: white;
                font-weight: 400;
                font-size: 0.28rem;
                line-height: 0.5rem;
                margin-left: 0.3rem;
                /*margin-top: 0.8rem;*/
                position: absolute;
                /*top: ;*/
                bottom: 35%;

                i {
                    color: #fdf178;
                    font-size: 0.4rem;
                }

                span {
                    margin-right: 0.4rem;
                }
            }


        }
    }

    .listDate {
        position: relative;
        background: white;
        margin-top: -0.8rem;
        border-radius: 20px 20px 0 0;
        width: 100%;

        /*position: absolute;*/
        height: auto;

        .listDate-title {
            position: relative;
            line-height: 1rem;
            color: #4c4c4c;
            font-size: 0.3rem;
            display: flex;
            text-align: center;
            border-bottom: 1px #f0f0f0 solid;

            span {
                display: block;
                width: calc(100% / 3);

                span {
                    width: 50%;
                    margin: 0 auto;
                }
            }
        }

    }

    .active-box {
        background: linear-gradient(to bottom right, #4ae2df, #02bdb9) !important;
        box-shadow: 0 5px 5px rgba(1, 189, 184, 0.2);
        color: white !important;
    }

    .advisory-select {
        /*position: absolute;*/
        /*top: 0;*/
        font-size: .3rem;
        width: 100%;
        /*margin-top: 2rem;*/
        /*bottom: 0;*/
        /*width: 100%;*/
        .box {
            margin: .6rem auto;
            width: calc(100% - .6rem);
            padding: .25rem 0;
            background: linear-gradient(to bottom right, #4ae2df, #02bdb9);
            text-align: center;
            border-radius: 5px;
            color: white;
            /*margin-bottom: .6rem;*/
            .icon {
                margin-left: calc(50% - .325rem);
                margin-bottom: .1rem;
                display: block;
                width: .75rem;
                height: .75rem;
                background: #fbfbfb;
                border-radius: 50%;

                img {
                    width: 50%;
                    height: 40%;
                    margin-top: calc(50% - 20%);
                }
            }
        }
    }


    .detailed {

        border-radius: 20px 20px 0 0;
        background: white;
        position: relative;

        .icon {
            height: 0.7rem;
            display: flex;
            padding: 0.1rem 0.3rem 0 0.3rem;
            border-bottom: 1px #ecedee solid;

            img {
                margin-top: 0.1rem;
                width: 0.5rem;
                height: 0.5rem;
            }

            span {
                width: 100%;
                font-size: 0.25rem;
                display: flex;
                align-items: center;

            }
        }

        .detailed-text {
            button {
                height: 0.7rem;
                width: 2.5rem;
                border-radius: 5px;
                border: none;
                color: white;
                background: linear-gradient(to bottom right, #4ae2df, #02bdb9);
                font-size: 0.3rem;
                position: absolute;
                bottom: 0;
                left: calc(50% - 1.25rem);
            }

            position: absolute;
            left: 0;
            right: 0;
            height: 3rem;
            padding: .3rem;


            div {
                margin-left: 0.25rem;
                font-size: 0.35rem;

                span {
                    margin-left: 0.2rem;
                    font-size: 0.2rem;
                    color: #01bdb8;
                }
            }

            ul {
                margin-left: 0.8rem;
                height: 0.4rem;
                line-height: 0.6rem;

                li {
                    color: #01bdb8;

                    span {
                        font-size: 0.3rem;
                        color: #606266;
                    }
                }
            }
        }
    }

    input[type='radio'] {
        position: absolute;
        clip: rect(0, 0, 0, 0);
    }

    input[type='radio'] + label::before {
        /*background: #f6dfa7;*/
        content: " "; /*不换行空格*/
        display: inline-block;
        vertical-align: middle;
        width: 0.3rem;
        height: 0.3rem;
        margin-bottom: 0.07rem;
        margin-right: .2rem;
        border-radius: 50%;
        border: #01bdb8 solid .02rem;
    }

    input[type='radio']:checked + label::before {
        width: .18rem;
        height: .18rem;
        background-color: #01bdb8;
        background-clip: content-box;
        padding: .06rem;
    }
</style>