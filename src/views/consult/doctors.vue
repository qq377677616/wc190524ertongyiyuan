<template>
    <div class="public-view">
        <section>

            <article @click="goTo(item.doctor_id)" class="registered-title" v-for="(item,key) of doctorList" :key="key">
                <div class="title-n1">
                    <img :src="item.doctor_avatar" alt="">
                </div>
                <div class="title-n2">
                    <div style="">
                        <span>{{item.real_name}}</span>
                        <span style="color:#b9babb "> | {{item.level==='1'?'专家':'知名专家'}}</span>
                        <p>
                            <span v-for="(tag,key) of item.label" :key="key" class="tag">{{tag}}</span>
                        </p>
                    </div>
                </div>
            </article>
<!--            </transition>-->
            <article>

            </article>
        </section>
        <p v-show="doctorList === undefined">暂无医生</p>
    </div>
</template>

<script>
    // /consult/registered/introduction
    export default {
        props: ['activeViewName'],
        name: "publicView",
        components: {},
        data(){
            return{
                doctorList:[],
            }
        },
        created(){
            this.getDoctors();
        },
        methods: {
            getDoctors(){
              this.$axios.get('Patient/doctorList',{type:this.$route.query.id,department_id:this.$route.query.nid}).then(res=>{
                  // console.log(res.data.msg)
                  this.doctorList = res.data.msg
                  // console.log(this.doctorList)
              })
            },
            goTo(nid){
              this.$router.push({path:'/consult/registered/knowndoctor',query:{id:nid}})
            },
            goBack() {
                this.$emit('goBack')
            }
        },
        computed:{

        }
    }
</script>

<style scoped lang="scss">
    .public-view{
        >p{
            font-size: .5rem;
            color: #a1a7a8;
            text-align: center;
            margin-top: 30%;
        }
    }
    .registered-title {
        position: relative;
        display: flex;
        padding: .3rem;
        background: white;
        border-bottom: .1rem #f4f5f6 solid;
        .title-n1 {
            width: 1.8rem;
            height: 1.8rem;
            background: bisque;
            img{
                width: 100%;
                height: 100%;
                border-radius: .1rem;
            }

        }

        .title-n2 {
            height: 1.8rem;
            line-height: 0.6rem;
            div{
                height: 80%;
                margin-top: calc(50% - 45%);
                margin-left: .2rem;
                >span:nth-child(1){
                    font-size: .35rem;
                }
                >span:nth-child(2){
                    font-size: .3rem;
                }
            }

            p {
                margin-top: 5px;
                color: #b9babb;
            }
            .tag{
                font-size: .25rem;
                background: rgba(171,220,219,0.4);
                padding: .05rem .2rem;
                border-radius: .3rem;
                margin-right: .2rem;
                color: #01bdb8;
            }
        }

    }


</style>