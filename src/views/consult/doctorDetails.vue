<template>
    <div style="height: 100%">
        <section class="doctors-info">
            <div>
                <span style="float: right;margin-right: .3rem;background:rgba(255,255,255,0.3);color: white;font-size: .3rem;padding: 0 .3rem;border-radius: .1rem;"
                      @click="mySelectDialog = true"><i style="transform: rotate(90deg);font-weight: 800"
                                                        class="el-icon-sort"></i></span>
                <article class="avatar-info">
                    <img :src="studioInfo.avatar" alt="头像">
                    <div>
                        <span>{{studioInfo.name}} <span id="zj"></span></span><br>
                        <article class="tag">
                            <span v-for="label of studioInfo.label">{{label}}</span>
                        </article>
                    </div>
                </article>
                <article class="dynamic-btn">
                    <div class="tally">
                        <span>关注数: {{studioInfo.follow_num}} 人</span>
                    </div>
                    <div>
                        <span @click="attention" :class="{'isFollow':studioInfo.is_follow === 1}"><i
                                class="el-icon-user"></i> {{this.studioInfo.is_follow ===1?'已订阅':'订阅'}}</span>
                    </div>
                </article>
                <span class="js">工作室介绍</span>
            </div>
        </section>
        <section class="listDate">
            <article class="listDate-title">
                <span v-for="(item, index) in ['咨询','动态','科普']" :key="item" @click="selectPj(index)">
                    <span :class="{'active-title':index===activeIndex}">{{item}}</span>
                </span>
            </article>
        </section>
        <!--        :class="item.name===activeBox?':''"-->
        <section style="padding-bottom: 1.3rem">
            <transition-group enter-active-class="animated fadeIn">
                <article v-show="activeIndex===0" :key="0">
                    <div class="advisory-select">
                        <div @click="selectIndex(item.name)" class="box active-box" v-for="item in items"
                             :key="item.name">
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
<!--                <article class="pjt" v-show="activeIndex===3" :key="3">-->
<!--                    <span>暂无数据</span>-->
<!--                </article>-->
            </transition-group>
        </section>

        <!--        :studio=""-->

        <my-select @replace="getRegistered" :show.sync="mySelectDialog" :studio="studioId"></my-select>
        <p class="pjt">{{isDataList}}</p>
    </div>
</template>

<script>
    import advisorySelect from './advisorySelect'

    import mySelect from './select'

    export default {
        components: {
            advisorySelect,
            mySelect
        },
        name: "doctorDetails",
        data() {
            return {
                activeBox: '知名专家',
                items: [
                    {name: '知名专家', icon: require('../../assets/advisorySelect/zhiming.png')},
                    {name: '专家', icon: require('../../assets/advisorySelect/zhuanjia.png')},
                    {name: '骨干医生', icon: require('../../assets/advisorySelect/tuandui.png')},
                ],
                activeIndex: 0,
                mySelectDialog: false,
                studioId: this.$route.query.id,
                studioInfo: {},
                dynamicList: [],
                articleList: [],
            }
        },
        created() {
            this.getRegistered()
        },
        methods: {
            chat() {
                this.$toast.fail('暂未开发');
            },
            attention() {
                //    关注
                this.$axios.post('Patient/follow', this.$Qs.stringify({
                    user_id: sessionStorage.user_id,
                    to_id: this.studioInfo.id,
                    to_type: 4,
                    status: this.studioInfo.is_follow === 1 ? 2 : 1,
                })).then(res => {
                    console.log(res.data.msg)
                    if (res.data.msg === 'ok') {
                        this.studioInfo.is_follow = this.studioInfo.is_follow === 1 ? 0 : 1
                    }
                })
            },
            goToArticleDetails(id) {
                console.log(id)
                this.$router.push({path: '/consult/registered/articledetails', query: {id: id}})
            },
            getArticleList(department_id = '', doctor_id = '') {
                this.$axios.post('Patient/articleList', this.$Qs.stringify({
                    department_id: department_id,
                    doctor_id: doctor_id,
                    user_id: sessionStorage.user_id
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
                    department_id: department_id,
                    doctor_id: doctor_id,
                    user_id: sessionStorage.user_id
                })).then(res => {
                    console.log(res)
                    this.dynamicList = res.data.dynamic_list
                    // console.log(this.dynamicList)
                })
            },
            selectIndex(item) {
                this.activeBox = item
                switch (item) {
                    case '知名专家':
                        this.$router.push({
                            path: '/consult/registered/doctors',
                            query: {id: '2', studio: this.studioId}
                        });
                        break;
                    case '专家':
                        this.$router.push({
                            path: '/consult/registered/doctors',
                            query: {id: '1', studio: this.studioId}
                        });
                        break;
                    case '骨干医生':
                        this.$router.push({
                            path: '/consult/registered/doctors',
                            query: {studio: this.studioId, id: '3'}
                        });
                        break;
                }
            },
            getRegistered(index) {
                let id = this.$route.query.id;
                if (index !== undefined) {
                    id = index;
                }
                this.$axios.get('Patient/depaDetails', {id: id, user_id: sessionStorage.user_id}).then(res => {
                    console.log(res)
                    this.studioInfo = res.data.data;
                    this.getDynamic(this.studioInfo.id)
                    this.getArticleList(this.studioInfo.id)
                })

            },
            selectPj(index) {
                this.activeIndex = index
            },
        },
        computed:{
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
            }
        }
    }
</script>

<style scoped lang="scss">

    .pjt {
            margin-top: 1rem;
            display: block;
            font-size: .6rem;
            text-align: center;
            color: #a1a7a8;
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

    .isFollow {
        background: white !important;
        color: #00b5bd !important;
        box-shadow: 0 0 3px 2px rgba(1, 189, 187, 0.3);
    }

    .dynamic-btn {
        width: 100%;
        display: flex;
        align-items: center;
        padding: .3rem;
        box-sizing: border-box;

        .tally {
            width: 100%;
            text-align: left;

            span {
                padding-left: .35rem;
                font-size: .3rem;
                color: white;
                background: url("../../assets/doctorDetails/guanzhu.png") no-repeat;
                background-position-y: center;
                background-size: .3rem;
            }
        }

        div {
            text-align: right;
            width: 100%;

            span {
                font-size: .3rem;
                padding: .1rem .3rem;
                border-radius: .1rem;
                color: white;
                background: linear-gradient(to bottom right, #4ae2df, #02bdb9);
            }
        }
    }

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
            width: 90%;
            padding: .25rem 0;
            background: #f5f5f5;
            text-align: center;
            border-radius: 5px;
            color: #5b5b5b;
            /*margin-bottom: .6rem;*/
            .icon {
                margin-left: calc(50% - .325rem);
                margin-bottom: .1rem;
                display: block;
                width: .8rem;
                height: .8rem;
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

    .active-title {
        border-bottom: 2px #01bdb8 solid;
        color: #01bdb8;
    }

    .registered-star {
        line-height: 0.8rem;
    }

    .doctors-info {
        width: 100%;
        height: 3.8rem;
        background: url("../../assets/phoneserve/BG.png");
        background-size: cover;
        padding-top: .3rem;

        div {
            .js {
                margin-left: .3rem;
                color: white;
                padding: .1rem .3rem;
                background-color: #40d6cc;
                border-radius: .1rem;
                font-size: .3rem;
            }

            height: 100%;

            .avatar-info {
                line-height: 0.4rem;
                margin-left: 0.3rem;

                img {
                    margin-right: 0.3rem;
                    float: left;
                    width: 1.45rem;
                    height: 1.45rem;
                    background: #9b9c9d;
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
                /*line-height: .4rem;*/
                height: .5rem;
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
                /*position: absolute;*/
                /*bottom: 1rem;*/
                margin-top: 0.4rem;

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
        background: white;
        margin-top: -.5rem;
        border-radius: 20px 20px 0 0;
        width: 100%;

        /*position: absolute;*/
        height: auto;

        .listDate-title {
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
</style>