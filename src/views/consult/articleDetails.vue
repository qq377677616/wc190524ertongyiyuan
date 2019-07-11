<template>
<!--    文章详细-->
    <div style="height: 100%" >
        <section class="article-details">
            <p class="title">{{articleDetails.title}}</p>
            <div class="author">
                <div :style="`background-image:url(${articleDetails.doctor_avatar})`" ></div>
                <p>
                    {{articleDetails.real_name}}
                    <span>&nbsp{{articleDetails.level==='2'?'知名专家':'专家'}} {{articleDetails.hospital_name}}</span>
                </p>
            </div>
            <p>时间：{{articleDetails.create_time}} · {{articleDetails.hits}}人已读</p>
            <div id="con">
                <div v-html="articleDetails.content"></div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "articleDetails",
        data(){
            return{
                articleDetails:{}
            }
        },
        created() {
            console.log(this.$route);
            this.getArticleDetails();
        },
        updated(){
        //doctor
        },
        methods:{
            getArticleDetails(){
                if (this.$route.query.std === 'dc'){
                    this.$axios.get('doctor/articleDetails',{
                        article_id:this.$route.query.id,
                        doctor_id:sessionStorage.doctor_id
                    }).then(res=>{
                        console.log(res.data)
                        this.articleDetails = res.data.article_details
                    })
                } else {
                    this.$axios.get('Patient/articleDetails',{
                        article_id:this.$route.query.id,
                        user_id:sessionStorage.user_id
                    }).then(res=>{
                        console.log(res.data)
                        this.articleDetails = res.data.article_details
                    })
                }

            }
        }
    }
</script>

<style scoped>
    #con{
        padding-top: .2rem;
    }
    #con >>> img{
        width: 100%;
    }
</style>
<style scoped lang="scss">

    .article-details{
        padding: .3rem;
        .title{
            font-size: .4rem;
        }
        .author {
            p {
                font-size: .3rem;

                span {
                    color: #858585;
                    font-weight: 200;
                }
            }

            margin: .2rem 0 .2rem 0;
            display: flex;
            align-items: center;
            div {
                margin-right: .2rem;
                border-radius: 50%;
                background: #00b5bd;
                background-size: cover;
                width: .6rem;
                height: .6rem;
                font-size: .3rem;
            }
        }
        .author + p{
            font-size: .25rem;
            color: #c7c8c9;
        }

    }

    .ad-footer{
        position: fixed;
        height: 1.2rem;
        line-height: 1.2rem;
        bottom: 0;
        background: #eaebec;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;padding: 0 .3rem;

        span{
            font-size: .3rem;
            color: #4c4c4c;
        }
        button{
            /*position: absolute;*/
            display: block;
            right: .3rem;
            top: calc(50% - .3rem);
            line-height: .6rem;
            width: 1.7rem;
            /*margin-top: calc(50% - .25rem);*/
            /*height: 0.5rem;*/
            background: linear-gradient(to bottom right, #4ae2df, #02bdb9);
            color: white;
            border-radius: 5px;
            font-size: 0.3rem;
        }
        /*}*/
    }
</style>