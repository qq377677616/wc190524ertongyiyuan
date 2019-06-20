<template>
    <div style="position: absolute;top: 2rem;bottom: 0;width: 100%">
        <section class="form-info">
            <p><span>就诊医院：</span>京都儿童医院</p>
            <p><span>预约医生：</span>张讲过</p>
            <p style="color: #00b5bd"><span>门诊时间：</span>2019-06-17 星期一</p>
            <p><span>门诊类型：</span>口腔科专家门诊</p>
            <p><span>挂号费：</span>100元</p>
        </section>
        <section>
            <div class="form-sub" @click="isShow('patientDialog')">
                <span>就诊人</span>
                <p>{{userInfo.name.name}} <i class="el-icon-arrow-right"></i></p>
            </div>
            <div class="form-sub" @click="isShow('periodDialog')">
                <span>预约时间段</span>
                <p>{{userInfo.timer}} <i class="el-icon-arrow-right"></i></p>
            </div>
            <div class="form-sub">
                <span>初/复诊</span>
                <div>
                    <input type="radio" value="1" id="female" name="sex"/>
                    <label for="female" style="margin-right: .2rem">出诊</label>
                    <input type="radio" value="2" id="female1" name="sex"/>
                    <label for="female1">复诊</label>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="form-sub" @click="isShow('diseaseDialog')">
                <span>病例信息</span>
                <p>请填写疾病信息 <i class="el-icon-arrow-right"></i></p>
            </div>
        </section>
        <transition name="fade-up">
            <section class="popup-show" v-show="show">
                <div>
                    <div @subInfo="addInfo" :is="showComp"></div>
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
        components: {
            patientDialog,
            periodDialog,
            diseaseDialog
        },
        name: "outpatient",
        data() {
            return {
                showComp: '',
                show: false,
                activeText: {
                    text: '',
                    btn: '',
                },
                userInfo: {
                    name: {name: '请选择'},
                    timer: '请选择',
                }
            }
        },
        methods: {
            addInfo(item) {
                switch (item.std) {
                    case 1:
                        this.userInfo.name = item.obj;
                        break;
                    case 2:
                        this.userInfo.timer = item.obj;
                        break;
                    case 3:
                        break
                }
                this.show = false
            },
            goTo() {
                this.$router.push({path: '/consult/queue/payForm'})
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

    .fade-up-enter-active, .fade-up-leave-active {
        transition: all .4s ease;
    }

    .fade-up-enter {
        /*//进入时的动画*/
        transform: translateY(100%);

    }

    .fade-up-leave-active {
        /*//离开时的动画*/
        transform: translateY(100%);
    }

    .bottom-btn {
        position: fixed;
        bottom: 1rem;
        width: 100%;
        text-align: center;

        span {
            background: linear-gradient(to bottom right, #4ae2df, #02bdb9);
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

            /*> div {*/
            /*    top: .9rem;*/
            /*    width: 100%;*/
            /*    position: absolute;*/
            /*    bottom: 0;*/
            /*    !*overflow: auto;*!*/
            /*}*/

            .title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                line-height: .9rem;
                padding: 0 .3rem;
                background: #4ae2df;
                color: white;
                text-align: center;
                font-size: .3rem;

                :nth-child(2) {
                    line-height: .6rem;
                    background: linear-gradient(to bottom right, #4ae2df, #02bdb9);
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
            color: #4c4c4c;
        }

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
        border: #01bdb8 solid .02rem;
    }

    input[type='radio']:checked + label::after {
        width: .18rem;
        height: .18rem;
        background-color: #01bdb8;
        background-clip: content-box;
        padding: .06rem;
    }
</style>