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
            <div class="title-n1" :style="`background-image: url(${item.avatar})`">
<!--                <img :src="item.avatar" alt="">-->
            </div>
            <div class="title-n2">
                <div>
                    <span>{{item.real_name}}</span>
                    <span> | {{item.level === '2'?'知名专家':'专家'}}</span>
                    <p>
                        <span class="tag" v-for="item of item.label">{{item}}</span>
                    </p>
                    <p>订单金额：<span class="ml">￥{{item.money / 100}}</span> </p>
                    <span class="pl" v-show="activeMenu === 2 " @click="comment(item)">{{item.is_comment == 0?'评论':'已评论'}}</span>
                </div>
            </div>
<!--            /consult/personal/refund-->
            <span v-show="activeMenu == 0 && item.status == 0 && item.status != 4" @click="refundCompleted(item.order_number)">申请退款</span>
            <span v-show="activeMenu == 0 && item.status == 3">申请退款中</span>
            <span class="refund-completed" v-show="activeMenu == 0 && item.status == 4">退款完成</span>
        </article>
        <p v-show="isShow" class="toast">暂无医生</p>
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
                isShow: false,
                activeMenu: 0,
                offStd: [],
                onStd: [],
                carryOut: [],

            }
        },
        created() {
            if (sessionStorage.getItem('activeMenu')){
                this.activeMenu = Number(sessionStorage.getItem('activeMenu'))
                sessionStorage.removeItem('activeMenu')
            }
            this.getDoctorsAll(0)
        },
        methods: {
            comment(item){
                if (item.is_comment == 1) {
                    this.$toast.fail({duration:700,message:'已评论过'})
                    return
                }
                this.$router.push({path: '/consult/registered/comment',query:{order_number:item.order_number,doctor_id:item.doctor_id,type:'1'}})
            },
            refundCompleted(order_number){
              this.$router.push({path:'/consult/personal/refund',query:{order_number:order_number}})
            },
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
                console.log(item)
                if (this.activeMenu === 1) {
                    if (item.type == 1){
                        this.$router.push({
                            path: '/consult/personal/privatechat',
                            query: {id: item.identifier, avatar: item.avatar}
                        })
                    }else {
                        this.$toast.fail({duration:1000,message:'请耐心等待医生联系您'})
                    }
                }
            }
        },
        beforeDestroy(){

        },
        beforeRouteLeave (to, from , next) {
            if (to.name === '对话'){
                sessionStorage.setItem('activeMenu',this.activeMenu)
            }
            next()
        },
        computed: {
            doctorsList() {
                let list = [];
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
                    list = list.reverse()
                } else {
                    list = []
                }
                this.isShow = list.length <= 0;
                return list
            }
        },
    }
</script>

<style scoped lang="scss">
    .pl{
        position: absolute;
        right: .3rem;
        bottom: .3rem;
        background: linear-gradient( 321deg, rgb(2,189,185) 0%, #4d8fec 100%);
        color: white !important;
        font-size: .3rem !important;
        padding: 0 .4rem;
        border-radius: .1rem;
    }
    .refund-completed{
        background: white !important;
        color: #4d8fec !important;
    }
    .active-sel {
        border-bottom: .03rem #4d8fec solid;
    }

    .select-dg {
        display: flex;
        border-bottom: 1px #ecedee solid;
        font-size: .3rem;
        /*background: #4d8fec;*/

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
        >span{
            position: absolute;
            bottom: .3rem;
            right: .3rem;
            background:linear-gradient( 321deg, rgb(2,189,185) 0%, #4d8fec 100%);
            color: white;
            padding: .1rem .2rem;
            border-radius: .1rem;
            font-size: .25rem;
        }
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
            background-size: cover;
            border-radius: .1rem;
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
                font-size: .27rem;
                color: #b9babb;
                .ml{
                    color: #4d8fec;
                    font-size: .35rem;
                }
            }

            .tag {
                background: rgba(171, 220, 219, 0.4);
                padding: 2px .2rem;
                border-radius: 15px;
                margin-right: 10px;
                color: #4d8fec;
            }
        }

    }


</style>