<template>
    <div style="height: calc(100% - 2rem)">
        <section class="form-info">
            <p><span>就诊医院：</span>{{doctorInfo.hospital_name}}</p>
            <p><span>预约医生：</span>{{doctorInfo.real_name}}</p>
            <p style="color: #4d8fec"><span>门诊时间：</span>{{doctorInfo.pb_list?doctorInfo.pb_list[dateIndex].cbrq:''}}</p>
            <p><span>门诊类型：</span>{{doctorInfo.class_name}} {{doctorInfo.level ==
                1?'专家':doctorInfo.level==2?'知名专家':'骨干'}}门诊</p>
            <p><span>挂号费：</span>{{doctorInfo.pb_list?doctorInfo.pb_list[dateIndex].price / 100:''}}元</p>
        </section>
        <section>
            <div class="form-sub" @click="isShow('patientDialog')">
                <span>就诊人</span>
                <p>{{userInfo.name.name}} <i class="el-icon-arrow-right"></i></p>
            </div>
            <div class="form-sub" @click="isShow('periodDialog')">
                <span>预约时间段</span>
                <p>{{userInfo.timer.sjd}} <i class="el-icon-arrow-right"></i></p>
            </div>
            <div class="form-sub">
                <span>预约挂号</span>
                <div>
                    <input type="radio" value="0" id="female" name="sex" v-model="userInfo.radio"/>
                    <label for="female" style="margin-right: .2rem">初诊患者</label>
                    <input type="radio" value="1" id="female1" name="sex" v-model="userInfo.radio"/>
                    <label for="female1">复诊患者</label>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="form-sub" @click="isShow('diseaseDialog')">
                <span>病例信息</span>
                <p>{{userInfo.diseased.length>10?`${userInfo.diseased.substr(1,
                    10)}...`:userInfo.diseased}} <i class="el-icon-arrow-right"></i></p>
            </div>
        </section>
        <transition name="fade-up">
            <section class="popup-show" v-show="show">
                <div>
                    <div :identifier="$route.query.ghid" @subInfo="addInfo" :is="showComp"></div>
                </div>
            </section>
        </transition>
        <section class="bottom-btn">
            <span @click="goTo">下一步</span>
        </section>
        <span class="sss" v-show="show" @click="show = false"></span>
    </div>
</template>

<script>
    import patientDialog from './popups/patientDialog'
    import periodDialog from './popups/periodDialog'
    import diseaseDialog from './popups/diseaseDialog'

    export default {
        props: ['doctorInfo'],
        components: {
            patientDialog,
            periodDialog,
            diseaseDialog
        },
        name: "outpatient",
        data() {
            return {
                dateIndex: this.$route.query.index,
                showComp: '',
                show: false,
                activeText: {
                    text: '',
                    btn: '',
                },
                userInfo: {
                    name: {name: '请选择'},
                    timer: {sjd:'请选择'},
                    diseased: '请填写疾病信息',
                    radio:0
                }
            }
        },
        created(){
          if (sessionStorage.getItem('userInfo') !== null){
              this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
              sessionStorage.removeItem('userInfo')
          }
        },
        methods: {
            addInfo(item) {
                console.log(item.obj)
                console.log(item.std)
                switch (item.std) {
                    case 1:
                        this.userInfo.name = item.obj;
                        break;
                    case 2:
                        this.userInfo.timer = item.obj;
                        break;
                    case 3:
                        this.userInfo.diseased = item.obj;
                        break
                }
                this.show = false
            },
            goTo() {
                const {doctorInfo, dateIndex, userInfo} = this

                if (userInfo.name.name === '请选择') {
                    this.$toast.fail({duration:500,message:'请选择就诊人'})
                    return
                }
                if (userInfo.timer === '请选择') {
                    this.$toast.fail({duration:500,message:'请选择时间'})
                    return
                }
                if (userInfo.diseased === '请填写疾病信息') {
                    this.$toast.fail({duration:500,message:'请填写疾病信息'})
                    return
                }

                let obj = {
                    hospital: doctorInfo.hospital_name,
                    doctorName: doctorInfo.real_name,
                    date: doctorInfo.pb_list[dateIndex].cbrq,
                    types: `${doctorInfo.class_name} ${doctorInfo.level == 1 ? '专家' : doctorInfo.level == 2 ? '知名专家' : '骨干'}门诊`,
                    cost: doctorInfo.pb_list[dateIndex].price,
                    name: userInfo.name.name,
                    phone: userInfo.name.mobile,
                    card: userInfo.name.custody_identity
                }
                console.log("userInfo", userInfo)
                sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
                this.$router.push({
                    path: '/consult/queue/payForm', query: {
                        hospital: doctorInfo.hospital_name,
                        doctorName: doctorInfo.real_name,
                        date: doctorInfo.pb_list[dateIndex].cbrq,
                        types: `${doctorInfo.class_name} ${doctorInfo.level == 1 ? '专家' : doctorInfo.level == 2 ? '知名专家' : '骨干'}门诊`,
                        cost: doctorInfo.pb_list[dateIndex].price,
                        name: userInfo.name.name,
                        phone: userInfo.name.mobile,
                        card: userInfo.name.custody_identity,
                        timer: JSON.stringify(userInfo.timer),
                        diseased:userInfo.diseased,
                        radio:userInfo.radio,
                        id:this.$route.query.id,
                        nid:this.$route.query.nid,
                        ghid:this.$route.query.ghid,
                        record_id:userInfo.name.id,
                        register_time:userInfo.timer.sjc,
                        cfzbz:userInfo.radio,
                        is_vip: userInfo.name.is_vip
                    }
                })
            },
            isShow(item) {
                switch (item) {
                    case 'diseaseDialog': //疾病信息
                        this.activeText = {text: '填写疾病信息', btn: '确认'};
                        break;
                    case 'patientDialog': //患者信息
                        this.activeText = {text: '选择就诊人', btn: '确认'};
                        break;
                    case 'periodDialog': //时间段
                        this.activeText = {text: '预约时间段', btn: '确认'};
                        break;
                }
                this.showComp = item;
                this.show = true;
            }
        }
    }
</script>

<style scoped lang="scss">
    .sss {
        /*z-index: 2000;*/
        display: block;
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: rgba(75, 75, 75, .6);
    }



    .bottom-btn {
        /*position: absolute;*/
        /*bottom: 1rem;*/
        padding: 1rem 0;
        width: 100%;
        text-align: center;

        span {
            background: linear-gradient(to bottom right, #4d8fec, #4d8fec);
            border-radius: .1rem;
            padding: .15rem .7rem;
            color: white;
            font-size: .3rem;
        }
    }

    .popup-show {
        z-index: 1111;
        position: fixed;
        top: 50%;
        bottom: 0;
        width: 100%;


        > div {
            box-shadow: 0 -3px 4px 2px rgba(1, 189, 186, 0.2);
            position: absolute;
            bottom: 0;
            top: 0;
            background: white;
            width: 100%;


            .title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                line-height: .9rem;
                padding: 0 .3rem;
                background: #4d8fec;
                color: white;
                text-align: center;
                font-size: .3rem;

                :nth-child(2) {
                    line-height: .6rem;
                    background: linear-gradient(to bottom right, #4d8fec, #4d8fec);
                    padding: 0 .2rem;
                    border-radius: .1rem;
                    box-shadow: 0 0 5px 2px rgba(75, 75, 75, 0.1);
                }
            }
        }
    }

    .form-info {
        padding: .2rem 0;
        font-size: .3rem;
        color: #4c4c4c;
        border-bottom: .1rem #f5f5f5 solid;

        span {
            color: #a1a7a8;
            display: block;
            width: 1.7rem;
        }

        p {
            display: flex;
            padding: .1rem .3rem;
        }
    }

    .form-sub {

        padding: .3rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px #eff1ef solid;
        font-size: .32rem;

        span {
            color: #7b7b7b;
        }

        p {

            /*width: 2rem;*/
            color: #4c4c4c;
        }

        /*.diseased{*/
        /*    overflow: hidden;*/
        /*    text-overflow:ellipsis;*/
        /*    white-space: nowrap;*/
        /*    width: 2rem;*/
        /*}*/

        label {
            color: #4c4c4c;
        }
    }

    input[type='radio'] {
        position: absolute;
        clip: rect(0, 0, 0, 0);
    }

    input[type='radio'] + label::after {
        /*background: #f6dfa7;*/
        content: " "; /*不换行空格*/
        display: inline-block;
        vertical-align: middle;
        width: 0.3rem;
        height: 0.3rem;
        margin-bottom: 0.07rem;
        margin-left: .1rem;
        border-radius: 50%;
        border: #4d8fec solid .02rem;
    }

    input[type='radio']:checked + label::after {
        width: .18rem;
        height: .18rem;
        background-color: #4d8fec;
        background-clip: content-box;
        padding: .06rem;
    }
</style>
