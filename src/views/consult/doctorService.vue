<template>
    <!--    电话服务-->
    <div class="phone-service">
        <section class="doctors-info">
            <div>
                <article class="avatar-info">
                    <img :src="doctorInfo.avatar" alt="头像">
                    <div>
                        <span>{{doctorInfo.real_name}}</span><br>
                        <span class="ic">{{doctorInfo.level==='2'?'知名专家':'专家'}}</span>
                    </div>
                </article>
                <article class="tag">
                    <span v-for="item of doctorInfo.label">{{item}}</span>
                </article>
                <article class="text">
                    <p style="display: flex;align-items: center;">推荐热度 (综合) ：{{doctorInfo.star_rating}} <i
                            style=" color: #fdf178;font-size: 0.4rem;" class="el-icon-star-on"></i>(近两年患者推荐)</p>
                    <p>在线服务满意度：100%</p>
                    <p>一般等待时长：快</p>
                </article>
            </div>
        </section>
        <section class="detailed">
            <article class="icon">
                <span style="justify-content: center;width: 75%"><img src="../../assets/phoneserve/zs.png"
                                                                      alt="">医生真实</span>
                <span><img src="../../assets/phoneserve/wei.png" alt="">未使用随时可退</span>
                <span><img src="../../assets/phoneserve/bu.png" alt="">不满意可申诉</span>
            </article>
            <article class="time-select">
                <p @click="isShowTime = true">预约时间:
                    <span :class="{'active-select-time':acTime !== ''}">{{`${acTime.date.plan_time} ${acTime.time.sjd}`}}</span>
                </p>
            </article>
            <article class="detailed-text">
                <div style="display: flex;align-items: center">
                    <input
                            type="radio"
                            id="female"
                            v-model="radio"
                            :value="true"
                            name="service"/>
                    <label
                            for="female"
                            style="font-size: 0.32rem">{{dtl.title}} {{activeTimeMoney / 100 || ''}}元</label><br>
                    <span>6575人好评 · 256选择</span>
                </div>
                <ul>
                    <li><span>{{dtl.content}}</span></li>
                    <li><span>医生给出明确建议后问诊结束</span></li>
                    <li><span>医生接诊后问诊最长开启48小时，逾期自动结束</span></li>
                </ul>
            </article>
        </section>
        <section class="btn">
            <button @click="goTo" type="button">立即申请</button>
        </section>
        <transition name="fade-f">
            <timer-select v-show="isShowTime" :timer="activeMoney.pb_list" @select="selectTime"></timer-select>
        </transition>
    </div>
</template>
 
<script>
    import timerSelect from './timerSelect'

    export default {
        components: {
            timerSelect
        },
        name: "phoneservice",
        data() {
            return {
                moneyList: [],
                acTime: {date:{plan_time:"请选择时间"},time:{sjd:''}},
                isShowTime: false,
                radio: true,
                dataList: [
                    {title: '电话咨询', content: '提交手机号码、补充完善信息 ( 医生会在下单后30分钟内主动与您联系确认 )',},
                    {title: '视频咨询', content: '提交手机号码、补充完善信息 ( 医生会在下单后30分钟内主动与您联系确认 )',},
                    {title: '图文咨询', content: '医生问诊不限交流次数',},
                ],
                activeMoney: {pb_list:[]},
                doctorInfo: {},
            }
        },
        mounted() {
            this.getPrice();

            // if (sessionStorage.getItem('acTime')) {
            //     this.acTime = JSON.parse(sessionStorage.getItem('acTime'))
            //     sessionStorage.removeItem('acTime')
            // }


        },
        methods: {
            selectTime(item) {
                console.log(item.data)
                item.std === 1 ? this.acTime = item.data:''

                this.isShowTime = false
            },
            getPrice() {
                this.$axios.get('Consulting/getConsulting', {doctor_id: this.$route.query.id}).then(res => {
                    console.log(res.data.data)
                    // this.activeMoney = res.data.data
                    let _activeMoney = res.data.data
                    console.log("_activeMoney", _activeMoney)
                    this.moneyList = {
                      msg_money: _activeMoney.msg_money,     
                      video_money: _activeMoney.video_money,    
                      phone_money: _activeMoney.phone_money     
                    }

                    let _pb_list = []
                    for (let i = 1; i <= 7; i++) {
                        console.log(this.getDay(i))
                        _pb_list.push({ plan_time: this.getDay(i) })
                    }
                    _activeMoney.pb_list = _pb_list
                    this.activeMoney = _activeMoney
                });
                this.$axios.get('Patient/doctorDetails', {
                    doctor_id: this.$route.query.id,
                    user_id: sessionStorage.user_id
                }).then(res => {
                    this.doctorInfo = res.data.data
                })
            },
            getDay(day){
              var today = new Date();
              var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
              today.setTime(targetday_milliseconds); //注意，这行是关键代码
              var tYear = today.getFullYear();
              var tMonth = today.getMonth();
              var tDate = today.getDate();
              tMonth = doHandleMonth(tMonth + 1);
              tDate = doHandleMonth(tDate);
              return tYear+"-"+tMonth+"-"+tDate;
              function doHandleMonth(month){
                  var m = month;
                  if(month.toString().length == 1){
                   m = "0" + month;
                  }
                  return m;
              }
            },
            goTo() {
                console.log(this.acTime)
                if (this.acTime.date.plan_time === '请选择时间') {
                    this.$toast.fail('请选择时间');
                    return
                }
                sessionStorage.setItem('acTime',JSON.stringify(this.acTime))
                this.$router.push({
                    path: '/consult/registered/existingdata', query: {
                        department_id: this.doctorInfo.department_id,
                        doctor_id: this.doctorInfo.id,
                        user_id: this.doctorInfo.identifier,
                        type: this.getMoney.id,
                        money: this.getMoney.money,
                        avatar: this.doctorInfo.avatar,
                        title: this.$route.query.title,
                        acTime:JSON.stringify(this.acTime)
                    }
                })
            }
        },
        computed: {
            dtl() {
                let item = this.$route.query.title;
                for (let i of this.dataList) {
                    if (i.title === item) {
                        return i
                    }
                }
            },
            getMoney() {
                let i = {};
                switch (this.$route.query.title) {
                    case '图文咨询':
                        i.money = this.moneyList.msg_money;
                        i.id = 1;
                        break;
                    case '视频咨询':
                        i.money = this.activeMoney.video_money;
                        i.id = 2;
                        break;
                    case '电话咨询':
                        i.money = this.activeMoney.phone_money;
                        i.id = 3;
                        break;
                }
                return i
            },
            activeTimeMoney(){
                switch (this.$route.query.title) {
                    case '图文咨询':
                        return this.moneyList.msg_money
                    case '视频咨询':
                        return this.moneyList.video_money
                    case '电话咨询':
                        return this.moneyList.phone_money
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .active-select-time {
        color: #686868 !important;
    }

    .time-select {

        padding: .3rem .3rem 0 .5rem;
        line-height: .7rem;

        p {
            border: 1px #ebe8e4 solid;
            border-radius: .1rem;
            padding-left: .2rem;
            font-size: .3rem;

            span {
                color: #a2a5ad;
            }
        }
    }
    .phone-service {

        height: 100%;
    }

    .btn {
        /*position: fixed;*/
        /*bottom: 1.3rem;*/
        padding: 1rem 0;
        width: 100%;
        text-align: center;

        button {
            height: 0.7rem;
            width: 2.5rem;
            border-radius: 5px;
            border: none;
            color: white;
            background: linear-gradient(to bottom right, #4d8fec, #4d8fec);
            font-size: 0.3rem;
        }
    }

    .doctors-info {
        padding-top: .1rem;
        width: 100%;
        height: 5rem;
        background: url("../../assets/phoneserve/BG.png");
        background-size: cover;

        div {
            height: 90%;

            .avatar-info {
                line-height: 0.5rem;
                margin-left: 0.3rem;

                img {
                    margin-right: 0.2rem;
                    float: left;
                    width: 1.45rem;
                    height: 1.45rem;
                    background: #9b9c9d;
                    background-size: cover;
                    border-radius: 50%;
                }

                div {
                    font-size: 0.3rem;
                    font-weight: 600;
                    padding-top: 0.25rem;
                    color: white;

                    .ic {
                        font-size: 0.25rem;
                        font-weight: 300;
                    }
                }
            }

            .tag {
                margin-top: 0.4rem;

                span {
                    color: white;
                    font-size: 0.25rem;
                    background: rgba(255, 255, 255, 0.2);
                    padding: 3px 10px;
                    border-radius: 20px;
                    font-weight: 300;
                    margin-left: 0.3rem;
                }
            }

            .text {
                height: 1.5rem;
                color: white;
                font-weight: 300;
                font-size: 0.26rem;
                line-height: 0.55rem;
                margin-left: 0.3rem;
                margin-top: 0.2rem;
            }
        }
    }

    .detailed {
        margin-top: -0.9rem;
        border-radius: 20px 20px 0 0;
        background: white;
        position: relative;

        .icon {
            height: 0.7rem;
            display: flex;
            padding: 0.1rem 0.3rem 0 0.3rem;
            border-bottom: 1px #ecedee solid;

            img {
                margin-top: 0.1rem;
                width: 0.5rem;
                height: 0.5rem;
            }

            span {
                width: 100%;
                font-size: 0.25rem;
                display: flex;
                align-items: center;

            }
        }

        .detailed-text {
            height: 3rem;
            padding: .3rem;

            div {
                margin-left: 0.25rem;
                font-size: 0.35rem;

                span {
                    margin-left: 0.2rem;
                    font-size: 0.2rem;
                    color: #4d8fec;
                }
            }

            ul {
                margin-left: 0.8rem;
                height: 0.4rem;
                line-height: 0.6rem;

                li {
                    color: #4d8fec;

                    span {
                        font-size: 0.3rem;
                        color: #606266;
                    }
                }
            }
        }
    }

    input[type='radio'] {
        position: absolute;
        clip: rect(0, 0, 0, 0);
    }

    input[type='radio'] + label::before {
        /*background: #f6dfa7;*/
        content: " "; /*不换行空格*/
        display: inline-block;
        vertical-align: middle;
        width: 0.3rem;
        height: 0.3rem;
        margin-bottom: 0.07rem;
        margin-right: .2rem;
        border-radius: 50%;
        border: #4d8fec solid .02rem;
    }

    input[type='radio']:checked + label::before {
        width: .18rem;
        height: .18rem;
        background-color: #4d8fec;
        background-clip: content-box;
        padding: .06rem;
    }
</style>
