<template>
    <div style="height: calc(100vh - .8rem)">
        <section>
            <article class="comment">
                <p>为本次看病过程打分</p>
                <div class="comment-rate">
                    <p>治疗效果:</p>
                    <el-rate
                            :colors="['#219e9d','#219e9d','#219e9d']"
                            void-color="#e1e2e3"
                            style="height: auto !important;"
                            v-model="cure_evaluate"></el-rate>
                </div>
                <div class="comment-rate">
                    <p>服务态度:</p>
                    <el-rate
                            :colors="['#219e9d','#219e9d','#219e9d']"
                            void-color="#e1e2e3"
                            style="height: auto !important;"
                            v-model="service_evaluate"></el-rate>
                </div>
            </article>
            <article class="comment-text">
                <p>就诊分享（至少10个字）</p>
                <label>
                    <textarea v-model="textArea"></textarea>
                </label>
            </article>
            <button class="btn" type="button" @click="doctorComment">提 交</button>
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
                cure_evaluate: null,
                service_evaluate:null,
                textArea:""
            }
        },
        methods:{
            doctorComment(){
                const {doctor_id,order_number,type} = this.$route.query
                const {cure_evaluate, service_evaluate, textArea} = this
                this.$axios.post('Patient/consultDoctorComment',this.$Qs.stringify({
                    order_number:order_number, //订单号
                    doctor_id:doctor_id, //医生id
                    cure_evaluate:cure_evaluate, //
                    service_evaluate:service_evaluate,
                    star_rating:(cure_evaluate + service_evaluate) / 2,
                    content:textArea,
                    user_id:sessionStorage.user_id,
                    type:type
                })).then(res=>{
                    console.log(res)
                    if (res.data.code == 200){
                        this.$router.go(-1)
                        this.$toast.success('评论成功')
                    } else {
                        this.$toast.fail(res.data.msg)
                    }
                })
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
        background:linear-gradient(to bottom right,#93dddc, #4d8fec);
        padding: .2rem 0;
        width: 3rem;
        border-radius: 5px;
        border: none;
        color: white;
        font-size: .4rem;
        left: calc(50% - 1.5rem);
    }

</style>
