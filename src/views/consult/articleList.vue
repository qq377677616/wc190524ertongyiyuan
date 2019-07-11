<template>
    <!--    文章列表-->
    <div>
        <article @click="articleDetailed(item.id)" class="article" v-for="(item,key) of articleList">
            <p class="title">{{item.title}}</p>
            <span v-for="ret in item.label">{{ret}}</span>
            <div class="author">
                <img :src="item.avatar" alt="">
                <p>
                    {{item.real_name}}
                    <span>&nbsp{{item.class_name}}{{item.level === '1'?'专家':'知名专家'}} {{item.work_unit}}{{item.class_name}}</span>
                </p>
            </div>
            <p class="detailed">
                <span v-html="item.content"></span>
            </p>
            <p>{{item.comment}}条评论 · {{item.hits}}人已读 · {{item.utile}}人觉得有用</p>
        </article>
    </div>
</template>

<script>
    export default {
        name: "articleList",
        data() {
            return {
                articleList: [],
                doctorInfo: this.$route.params
            }
        },
        created() {
            console.log(this.doctorInfo);
            this.getArticleAll()
        },
        methods: {
            articleDetailed(index) {
                this.$router.push({path: '/consult/registered/articledetails', query: {id: index,std:this.$route.query.std}})
            },
            getArticleAll() {
                // data[
                //     {'key':'value'},
                //     {'key':'value'},
                //     {'key':'value'},
                //     {'key':'value'},
                //     {'key':'value'},
                //     ]
                this.$axios.get('Doctor/articleList', {doctor_id: sessionStorage.doctor_id}).then(res => {
                    console.log(res.data.data)
                    this.articleList = res.data.data;
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .article {
        /*width: 100%;*/
        padding: .3rem .3rem .5rem .3rem;
        border-bottom: 3px #eff1ef solid;

        .title {
            font-size: .4rem;
            margin-bottom: .1rem;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }

        > span {
            margin-right: .2rem;
            font-weight: 200;
            font-size: .25rem;
            background: #e3f9f8;
            color: #01bdb8;
            padding: .08rem .25rem;
            border-radius: 20px;
        }

        .author {
            p {
                font-size: .3rem;

                span {
                    color: #858585;
                    font-weight: 200;
                }
            }

            margin: .35rem 0 .2rem 0;
            display: flex;

            img {
                margin-right: .2rem;
                border-radius: 50%;
                display: block;
                background: #00b5bd;
                width: .4rem;
                height: .4rem;
                font-size: .3rem;
            }
        }

        .detailed {
            height: 1.3rem;
            font-size: .3rem;
            color: #858585;
            font-weight: 200;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }

        .detailed + p {
            margin-top: .2rem;
            font-size: .2rem;
            color: #afb2b0;
            font-weight: 200;
        }
    }
</style>