<template>
    <!--    图文患者-->
    <div>
        <section class="graphic-title">
            <article>
                <span><img :src="inquiryClass.icon" alt=""></span>
                <div>
                    <h4>{{inquiryClass.name}}</h4>
                    <p>此开关使用图文问诊的都快急死了地方</p>
                </div>
            </article>
        </section>
        <section class="patient-list">
            <article class="choice-menus">
                <p>
                    <span
                            @click="activeMens=1"
                            :class="{'active-mens':activeMens === 1}">解答中</span></p>
                <p>
                    <span
                            @click="activeMens=2"
                            :class="{'active-mens':activeMens === 2}">已完成</span></p>
            </article>
            <div @click="goToChat(item)" v-for="(item, key) of getUserInfoListClass" :key="key">
                <article class="user-info">
                    <div>
                        <img :src="item.avatar" alt="">
                        <span>{{item.name}}</span>
                        <p><span>年龄：</span>{{item.age}}</p>
                        <span>{{item.sex === '1'?'男':'女'}}</span>
                    </div>
                    <p><span>￥</span>{{item.money/100}}</p>
                </article>
                <article class="user-introduction">
                    <div>
                        <p>病情描述：<span>{{item.user_describe}}</span></p>
                        <p v-show="item.diagnose_describe">诊断：<span>{{item.diagnose_describe}}</span></p>
                    </div>
                    <button @click.stop="accept(
                    key,
                    item.team_id,
                    item.doctor_id,
                    item.order_number,
                    item.status
                    )" type="button"
                            v-show="item.status!=='2'"
                            :class="{'acceptOn':item.status === '1'}">
                        {{item.status === '1'?'结束问诊':'接受问诊'}}
                    </button>
                </article>
                <article class="user-timer">
                    <p>{{item.last_login_time}}</p>
                </article>
            </div>
        </section>
        <p class="toast" v-show="getUserInfoListClass.length === 0">暂无数据</p>
    </div>
</template>

<script>



    export default {
        name: "graphic",
        data() {
            return {
                inquiryClass: this.$route.query,
                activeMens: 1,
                isGraphic: true,
                userInfoOnList: [],
                userInfoOffList: [],
            }
        },
        created() {

            console.log(this.$route.query)
            this.getOrderForm();
        },
        methods: {
            goToChat(item) {
                //已完成的订单不进行跳转
                console.log(item.pay_type);
                if (item.status !== '2' && item.pay_type != 0 && item.status != 0) {
                    console.log(item)
                    this.$router.push({path: '/consult/personal/privatechat',query:{id:item.identifier}})
                }
            },

            accept(index, team_id, doctor_id, order_number, order_status) {
                // 订单处理
                this.$axios.post('Chatorder/editOrder', this.$Qs.stringify({
                    team_id,
                    doctor_id,
                    order_number,
                    order_status: order_status === '0' ? '1' : order_status === '1' ? '2' : '0',
                })).then(res => {
                    console.log(res.data);
                    if (res.data.msg === 'ok') {
                        //更新状态
                        if (this.userInfoOnList[index].status === '1') {
                            this.userInfoOnList[index].status = '2';
                            this.userInfoOffList.push(this.userInfoOnList[index]);
                            this.userInfoOnList.splice(index, 1);
                        } else {
                            this.userInfoOnList[index].status = '1'
                        }
                    }
                })
            },
            getOrderForm() {
                //获取订单列表
                //userInfoOnList 未接受、进行中订单
                //userInfoOffList 已完成的订单
                console.log(this.inquiryClass.id)
                this.$axios.get('Chatorder/doctorOrderList', {type: 2, doctor_id: this.inquiryClass.id}).then(res=>{
                    console.log(res)
                })
                this.$axios.all([
                    this.$axios.get('Chatorder/doctorOrderList', {status: 1, type: this.inquiryClass.type, doctor_id: this.inquiryClass.id}),
                    this.$axios.get('Chatorder/doctorOrderList', {status: 2, type: this.inquiryClass.type, doctor_id: this.inquiryClass.id})
                ]).then(this.$axios.spread((on_data, off_data) => {
                    console.log(on_data, off_data);
                    this.userInfoOnList = on_data.data.data;
                    this.userInfoOffList = off_data.data.data;
                }));
            }
        },
        computed: {
            setUserInfoList() {
                //根据状态进行分类列表的展示
                let list = [];
                switch (this.activeMens) {
                    case 1:
                        list = this.userInfoOnList;
                        break;
                    case 2:
                        list = this.userInfoOffList;
                        break;
                }
                if (list === undefined) list = []
                return list
            },
            getUserInfoListClass(){
                let list = [];
                if (this.inquiryClass.type !== undefined){
                    for (let item of this.setUserInfoList){
                        if (item.type === this.inquiryClass.type) {
                            list.push(item)
                        }
                    } 
                }else {
                    return this.setUserInfoList
                }
                return list
            }
        }
    }
</script>

<style scoped lang="scss">


    .graphic-title {
        padding: .2rem .3rem .5rem .3rem;
        background: url("../../assets/reservation/BG.png") no-repeat;
        height: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        article {
            display: flex;
            align-items: center;
            color: white;
            padding-right: .3rem;

            h4 {
                font-size: .3rem;
                font-weight: 400;
            }

            p {
                font-weight: 200;
                font-size: .25rem;
            }
        }

        span {
            display: block;
            background: rgba(255, 255, 255, .9);
            height: .8rem;
            width: .8rem;
            border-radius: 50%;
            margin-right: .2rem;
            position: relative;

            img {
                height: .5rem;
                width: .5rem;
                position: absolute;
                left: calc(50% - .25rem);
                top: calc(50% - .25rem);
            }
        }


    }

    .active-mens {
        /*选中导航栏状态*/
        border-bottom: 1px #00b5bd solid;
    }

    .patient-list {

        margin-top: -.3rem;
        /*margin-bottom: 1.4rem;*/
        background-color: white;
        border-radius: 15px 15px 0 0;

        .choice-menus {
            display: flex;
            text-align: center;
            line-height: .8rem;
            border-bottom: 1px #f4f5f6 solid;

            p {
                width: 100%;

                span {
                    display: block;
                    width: 1.2rem;
                    margin: 0 auto;

                }
            }
        }

        .acceptOn {
            /*订单按钮样式切换*/
            background: white !important;
            color: #00b5bd !important;
        }

        > div {
            padding: .3rem;
            box-sizing: border-box;
            border-bottom: 3px #f4f5f6 solid;

            .user-info {

                font-size: .27rem;
                display: flex;
                align-items: center;
                justify-content: space-between;

                div {
                    display: flex;
                    align-items: center;
                    text-align: center;

                    img {
                        display: block;
                        width: .5rem;
                        height: .5rem;
                        border-radius: 50%;
                        background-color: #9b9c9d;
                    }

                    span, p {
                        /*padding-left: .4rem;*/
                        width: 1.4rem;
                        flex: 1;
                    }

                    p span {
                        font-weight: 200;
                    }

                    :nth-child(5) {
                        color: #01bdbb;
                    }

                }

                > p {
                    font-size: .35rem;
                    color: #01bdbb;

                    span {
                        font-size: .25rem;
                    }

                    /*width: 20%;*/
                }
            }

            .user-introduction {
                margin-top: .15rem;
                line-height: .4rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: .25rem;

                div {
                    p {
                        span {
                            font-weight: 200;
                        }
                    }
                }

                button {
                    line-height: .5rem;
                    color: white;
                    border: none;
                    padding: 0 .3rem;
                    background-image: linear-gradient(321deg, rgb(2, 189, 185) 0%, rgb(74, 226, 223) 100%);
                    border-radius: 5px;
                    box-shadow: 0 1px 3px 2px rgba(1, 189, 187, 0.3);
                }
            }

            .user-timer {
                margin-top: .2rem;
                font-size: .25rem;
                display: flex;
                justify-content: space-between;

                p {
                    color: #666768;
                }
            }
        }

    }


</style>