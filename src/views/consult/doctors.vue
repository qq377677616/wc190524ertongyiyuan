<template>
    <div class="public-view">
        <section class="top" v-show="!isShow">
            <p>您的问诊将会在他们之中任意一人接受</p>
            <header>
                <div class="avatar" v-for="item of doctorLists">
                    <div :style="`background-image:url(${item.avatar})`"></div>
                    <span>{{item.real_name}}</span>
                </div>
            </header>
        </section>
        <section class="content" v-show="!isShow">
            <div class="advisory-select">
                <div @click="selectIndex(item.name)" class="box active-box" v-for="item in items"
                     :key="item.name">
                    <span class="icon"><img :src="item.icon" alt=""></span>
                    <p>{{item.name}}</p>
                </div>
            </div>
        </section>
        <p v-show="isShow">暂无医生</p>
    </div>
</template>

<script>
    // /consult/registered/introduction
    export default {
        name: "publicView",
        components: {},
        data() {
            return {
                isShow:false,
                items: [
                    {name: '图文咨询', icon: require('../../assets/knownDoctor/tuweny.png')},
                    {name: '电话咨询', icon: require('../../assets/knownDoctor/dianhua.png')},
                    {name: '视频咨询', icon: require('../../assets/knownDoctor/shiping.png')},
                ],
                doctorList: [],
            }
        },
        created() {
            this.getDoctors();
        },
        methods: {
            getDoctors() {
                this.$axios.get('Consulting/getStudioDoctor',{
                    // type:this.$route.query.id,
                    level:this.$route.query.id,
                    department_id:this.$route.query.studio,
                    user_id:sessionStorage.user_id
                }).then(res=>{
                    console.log(res.data.data)
                    this.doctorList = res.data.data
                    if (this.doctorList.doctor_list.length <= 0) {
                        this.isShow = true;
                    }
                })
            },
            selectIndex(item) {
                // this.activeBox = item;
                this.$router.push({path:'/consult/registered/phoneservice',query:{
                    title:item,
                        studio:this.$route.query.studio,
                        id:this.$route.query.id,
                        consulting:JSON.stringify(this.doctorList.consulting)
                }});
            },
        },
        computed: {
            doctorLists(){
                if (this.doctorList.doctor_list === undefined) return
                if (this.doctorList.doctor_list.length > 5) return this.doctorList.slice(0,5)
                return this.doctorList.doctor_list
            }
        }
    }
</script>

<style scoped lang="scss">
    .public-view{
        >p{
            text-align: center;
            padding-top: 2rem;
            color: #96999e;
            font-size: .6rem;
        }
        .top{
            height: 3.5rem;
            background-size: cover;
            background: url("../../assets/phoneserve/BG.png");
            >p{
                padding-top: .3rem;
                color: white;
                text-align: center;
            }
        }
        .content{
            background: white;
            margin-top: -.5rem;
            border-radius: .5rem;
            height: 100%;
            .advisory-select {
                padding-top: .1rem;
                font-size: .3rem;
                width: 100%;
                .box {
                    margin: .6rem auto;
                    width: 90%;
                    padding: .25rem 0;
                    background: linear-gradient(to bottom right, #4ae2df, #02bdb9);
                    text-align: center;
                    border-radius: 5px;
                    color: white;
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
        }
    }
    header{
        padding: .3rem;
        display: flex;
        box-sizing: border-box;
        /*padding-top: .3rem;*/
        .avatar{
            width: 100%;
            text-align: center;
            font-size: .25rem;
            color: white;
            div{
                height: 1.3rem;
                width: 1.3rem;
                background-color: #f4f4f4;
                border-radius: 50%;
                background-size: cover;
                margin: 0 auto;

            }
        }
    }
</style>