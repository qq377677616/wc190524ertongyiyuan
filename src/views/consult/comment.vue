<template>
    <div style="height: 100vh">
        <section>
            <article class="comment">
                <p>为本次看病过程打分</p>
                <div class="comment-rate">
                    <p>治疗效果:</p>
                    <el-rate
                            :colors="['#219e9d','#219e9d','#219e9d']"
                            void-color="#e1e2e3"
                            style="height: auto !important;"
                            v-model="value1"></el-rate>
                </div>
                <div class="comment-rate">
                    <p>服务态度:</p>
                    <el-rate
                            :colors="['#219e9d','#219e9d','#219e9d']"
                            void-color="#e1e2e3"
                            style="height: auto !important;"
                            v-model="value1"></el-rate>
                </div>
            </article>
            <article class="comment-text">
                <p>就诊分享（至少10个字）</p>
                <label>
                    <textarea></textarea>
                </label>
            </article>
            <button class="btn" type="button">提 交</button>
        </section>
    </div>
</template>

<script>
    // import myRate from '../../components/rate'
    export default {
        components: {
            // myRate
        },
        name: "comment",
        data() {
            return {
                value1: null
            }
        }
    }
</script>

<style scoped lang="scss">
    .comment {
        padding: .3rem .3rem 1rem .3rem;
        border-bottom: 1px #e1e2e3 solid;

        > p {
            margin-bottom: .2rem;
            color: #a7a8a8;
        }

        .comment-rate {
            color: #666768;
            padding-top: .2rem;
            display: flex;
            align-items: center;

            p {
                font-size: .4rem;
                padding-right: .25rem;
            }
        }

    }
    .comment-text{
        padding: .3rem;
        p{
            color: #a7a8a8;
            line-height: 1rem;
        }
        textarea{
            width: 100%;
            background-color: #eff1ef;
            border: none;
            border-radius: 8px;
            height: 4rem;
            resize:none;
            box-sizing: border-box;
            padding: .2rem;

            /*padding: .2rem;*/
        }
    }

    .btn{
        position: fixed;
        bottom: .8rem;
        background:linear-gradient(to bottom right,#93dddc, #00b5bd);
        padding: .2rem 0;
        width: 3rem;
        border-radius: 5px;
        border: none;
        color: white;
        font-size: .4rem;
        left: calc(50% - 1.5rem);
    }

</style>