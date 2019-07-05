<template>
    <div class="public-view">
        <section class="select-dg">
            <article @click="activeMenu = key" v-for="(item,key) of ['未开始','咨询中','已完成']" :key="key">
                <span :class="{'active-sel':activeMenu === key}">{{item}}</span>
            </article>
        </section>
        <!--        <transition name="fade">-->
        <!--        <section v-show="show">-->

        <article class="registered-title" v-for="(item,key) of doctorsList" :key="key" @click="goTo(item)">
            <div class="title-n1">
                <img :src="item.avatar" alt="">
            </div>
            <div class="title-n2">
                <div>
                    <span>{{item.real_name}}</span>
                    <span> | {{item.level === '2'?'知名专家':'专家'}}</span>
                    <p>
                        <span class="tag" v-for="item of item.label">{{item}}</span>
                    </p>
                    <p>创建时间：{{item.create_time}}</p>
                </div>
            </div>

        </article>


        <!--        </section>-->
        <!--        </transition>-->
    </div>
</template>

<script>
    // const sessMap = webim.MsgStore.sessMap();
    export default {
        props: ['activeViewName'],
        name: "publicView",
        components: {},
        data() {
            return {
                show: true,
                activeMenu: 0,
                offStd: [],
                onStd: [],
                carryOut: [],

            }
        },
        created() {
            // console.log(sessMap)
            // for (let item of sessMap) {
            //     console.log(item)
            //     // let sess = sessMap[i];
            //     // if (selToID != sess.id()) {//更新其他聊天对象的未读消息数，selToID 为全局变量，表示当前正在进行的聊天 ID，当聊天类型为私聊时，该值为好友帐号，否则为群号。
            //     //     updateSessDiv(sess.type(), sess.id(), sess.unread());
            //     // }
            // }
            this.getDoctorsAll(0)
        },
        methods: {
            getDoctorsAll(index) {
                this.$axios.all([
                    this.$axios.get('Patient/consultDoctorList', {
                        openid: sessionStorage.openid,
                        status: 0,
                        user_id: sessionStorage.user_id
                    }),
                    this.$axios.get('Patient/consultDoctorList', {
                        openid: sessionStorage.openid,
                        status: 1,
                        user_id: sessionStorage.user_id
                    }),
                    this.$axios.get('Patient/consultDoctorList', {
                        openid: sessionStorage.openid,
                        status: 2,
                        user_id: sessionStorage.user_id
                    }),
                ]).then(this.$axios.spread((resOff, resOn, carryOut) => {
                    console.log(resOff, resOn, carryOut);
                    this.offStd = resOff.data.data;
                    this.onStd = resOn.data.data;
                    this.carryOut = carryOut.data.data;
                }))
            },
            goBack() {
                this.$emit('goBack')
            },
            goTo(item) {
                if (this.activeMenu === 1) {
                    this.$router.push({
                        path: '/consult/personal/privatechat',
                        query: {id: item.to_id, avatar: item.avatar}
                    })
                }
            }
        },
        computed: {
            doctorsList() {
                let list = [];
                // console.log(this.show);
                // this.show= false;
                // setTimeout(res=>{
                //     this.show = true
                //
                // },500);
                switch (this.activeMenu) {
                    case 0:
                        list = this.offStd;
                        break;
                    case 1:
                        list = this.onStd;
                        break;
                    case 2:
                        list = this.carryOut;
                        break;
                }
                if (list !== undefined) {
                    return list.reverse()
                } else {
                    return []
                }

            }
        }
    }
</script>

<style scoped lang="scss">
    .active-sel {
        border-bottom: .03rem #01bdbb solid;
    }

    .select-dg {
        display: flex;
        border-bottom: 1px #ecedee solid;
        /*background: #02bdb9;*/

        :nth-child(1) {
            /*border-radius: 20px 0 0 0;*/
        }

        :nth-child(3) {
            /*border-radius: 0 20px 0 0;*/
        }

        article {
            background: white;
            width: 100%;
            line-height: .8rem;
            text-align: center;

            span {
                margin: 0 auto;
                display: block;
                width: 60%;
                color: #4c4c4c;
            }
        }
    }

    .registered-title {
        position: relative;
        display: flex;
        padding: 20px;
        margin-bottom: 5px;
        background: white;
        border-bottom: .1rem #f4f5f6 solid;

        .title-n1 {
            width: 2rem;
            height: 2rem;
            background: bisque;

            img {
                height: 100%;
                width: 100%;
                border-radius: .1rem;
            }
        }

        .title-n2 {
            height: 2rem;
            line-height: 0.6rem;

            div {
                height: 80%;
                /*margin-top: calc(50% - 45%);*/
                margin-left: .2rem;

                > span {
                    font-size: .35rem;
                    color: #4c4c4c;
                }

                > span:nth-child(2) {
                    font-size: .3rem;
                    color: #a7a8a8;

                }
            }

            p {
                margin-top: 5px;
                font-size: 14px;
                color: #b9babb;
            }

            .tag {
                background: rgba(171, 220, 219, 0.4);
                padding: 3px 8px;
                border-radius: 15px;
                margin-right: 10px;
                color: #01bdb8;
            }
        }

    }


</style>