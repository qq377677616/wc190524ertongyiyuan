<template>
    <div>
        <section class="personal">
            <article class="user-info">
                <img @click="editing" :src="doctorInfo.avatar" alt="头像">
                <div class="title">
                    <span>{{doctorInfo.real_name}} <span>{{doctorInfo.class_name}}</span></span>
                </div>
            </article>
        </section>
        <section class="personal-box">
            <div @click="goTo(item)" v-for="item in items" :key="item.title">
                <span><img :src="item.icon" alt=""></span>
                <p>{{item.title}}</p>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "personal",
        data() {
            return {
                doctorInfo: {},
                items: [
                    {title: '我的余额', icon: require('../../assets/mydoctor/yue.png')},
                    {title: '回复我的', icon: require('../../assets/mydoctor/huifu.png'), url: '/doctors/reply'},
                    {title: '我的患者', icon: require('../../assets/mydoctor/huanzhe.png'), url: '/doctors/graphic'},
                    {title: '团队信息', icon: require('../../assets/mydoctor/temainfo.png'), url: '/doctors/temainfo'},
                ]
            }
        },
        created() {
            this.getDoctorInfo();
        },
        methods: {
            editing(){
                this.$router.push({path:'/doctors/editing',query:{}})
            },
            getDoctorInfo() {
                this.$axios.get('personinfo/myinfo', {openid: 'oSx-51JbMrtfk5394YIx8IQ8JlRI'}).then(res => {
                    console.log(res);
                    this.doctorInfo = res.data.data[0]
                })
            },
            goTo(obj) {
                if (obj.title === '我的患者') {
                    console.log(111)
                    this.$router.push({
                        path: obj.url, query: {
                            icon: obj.icon,
                            name: this.doctorInfo.real_name,
                            id:this.doctorInfo.id
                        }
                    })

                } else {
                    this.$router.push({path: obj.url,query:{id:this.doctorInfo.id}});
                }

            }
        }
    }
</script>

<style scoped lang="scss">
    .personal {
        /*z-index: 1;*/
        /*height: 4rem;*/
        line-height: 3rem;
        background: url("../../assets/phoneserve/BG.png");
        background-size: cover;
        position: relative;

        .user-info {
            position: relative;
            display: flex;
            align-items: center;
            padding: .3rem;

            .title {
                span {
                    font-size: .4rem;
                    color: white;

                    span {
                        font-size: .35rem;
                        font-weight: 200;
                    }
                }
            }

            img {
                margin-right: 0.2rem;
                float: left;
                width: 1.45rem;
                height: 1.45rem;
                background: #9b9c9d;
                background-size: cover;
                border-radius: 50%;
            }

        }
    }

    .personal-box {
        position: relative;
        margin-top: -.4rem;
        background: white;
        border-radius: 20px 20px 0 0;
        display: flex;
        flex-wrap: wrap;
        padding: .3rem;
        font-size: .3rem;

        div {
            background: #f5f5f5;
            margin: .3rem;
            width: calc(50% - .6rem);
            height: 1.5rem;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;

            span {
                width: .7rem;
                height: .7rem;
                border-radius: 50%;
                margin-right: .2rem;
                background-color: #f6f7f8;
                text-align: center;

                img {
                    width: 60%;
                    height: 50%;
                    margin-top: calc(50% - 25%);
                }
            }
        }
    }
</style>