<template>
    <div style="height: 100%;overflow: hidden;position: relative">
        <section class="title-bg">
            <span>设置状态</span>
        </section>
        <section class="content">
            <!--                    v-show="activeIndex !== key"-->
            <div
                    class="studio-bg"
                    v-for="(item,key) of activeItem"
                    :key="key"
                    :class="confirm !==null?'active-bg':{'active-bg':activeIndex === key}"
                    @click="activeIndex = key">
                <span>
                    <img :src="item.icon" alt="icon">
                </span>
                <p>{{item.title}}</p>
            </div>
            <p v-show="confirm === null">选择状态后，获取更多精准内容</p>

        </section>
        <section class="btn">
            <article v-show="confirm === null">
                <span @click="confirm = activeIndex">下一步</span>
            </article>
            <article v-show="confirm !== null">
                <span @click="confirm = null">取消</span>
            </article>
            <article v-show="confirm !== null">
                <span v-show="confirm === 1" @click="">确定</span>
                <span v-show="confirm === 0" @click="">{{showY?'计算预产期':'确认'}}</span>
            </article>
        </section>

        <!--宝宝已经出生-->
        <section class="baby-info" v-show="confirm===1">
            <article>
                <span>宝宝生日</span>
                <span>2019年12月17号 <i class="el-icon-arrow-right"></i></span>
            </article>
            <article>
                <span>宝宝性别</span>
                <div>
                    <input type="radio" value="1" id="female" name="babyGender"/>
                    <label for="female">男宝宝</label>
                    <input type="radio" value="2" id="female1" name="babyGender"/>
                    <label for="female1">女宝宝</label>
                </div>
            </article>
            <article>
                <span>出生孕周</span>
                <span>未选择 <i class="el-icon-arrow-right"></i></span>
            </article>
        </section>

        <!--        怀孕中-->
        <section class="baby-info" v-show="confirm===0">
            <article @click="customize=true">
                <span>预产期</span>
                <span>{{customizeTime}} <i class="el-icon-arrow-right"></i></span>
            </article>
            <span @click="showY = !showY">计算预产期</span>
            <div v-show="showY">
                <article @click="dateSelect = true">
                    <span>首次月经开始日期</span>
                    <span>{{menstruation.firstTime}}<i class="el-icon-arrow-right"></i></span>
                </article>
                <article @click="cycle = true">
                    <span>月经周期</span>
                    <span>{{menstruation.cycle}} <i class="el-icon-arrow-right"></i></span>
                </article>
            </div>
        </section>
        <div v-show="dateSelect || cycle || customize" class="mmm"></div>
        <transition-group name="fade-f">
            <section class="picker-sl" v-show="dateSelect" :key="1">
                <van-datetime-picker
                        @cancel="dateSelect =false"
                        @confirm="getDateTime"
                        v-model="currentDate"
                        type="date"
                        :min-date="minDate"
                        title="选择日期"
                ></van-datetime-picker>
            </section>
            <section class="picker-sl" v-show="customize" :key="3">
                <van-datetime-picker
                        @cancel="customize =false"
                        @confirm="setCustomizeTime"
                        v-model="currentDate"
                        type="date"
                        :min-date="minDate"
                        title="选择日期"
                ></van-datetime-picker>
            </section>
            <section class="picker-sl" :key="2" v-show="cycle">
                <van-picker
                        show-toolbar
                        @cancel="cycle=false"
                        title="选择周期"
                        :columns="columns"
                        @confirm="getCycle"/>
            </section>
        </transition-group>
    </div>
</template>

<script>
    const range = (s, e) => Array.from({length: e - s + 1}, (r, i) => i + s);
    export default {
        name: "index",
        data() {
            return {
                menstruation: {
                    firstTime: '2000-01-01',
                    cycle: 20
                },
                customizeTime: '2000-01-01',
                columns: range(1, 60),
                dateSelect: false,
                cycle: false,
                customize: false,
                currentDate: new Date(),
                minDate: new Date(1950, 1, 1),
                showY: false,
                activeIndex: 0,
                confirm: null,
                items: [
                    {title: '孕妇', icon: require('../../../assets/login/yunfu.png')},
                    {title: '宝宝已经出生', icon: require('../../../assets/login/baby.png')},
                ]
            }
        },
        methods: {
            getCycle(cycle) {
                // console.log(cycle)
                this.menstruation.cycle = cycle
                this.cycle = false
            },
            getDateTime(dateTime) {
                // let timer = this.$moment(dateTime);
                // let [y, m, d] = [timer.format('YYYY'), timer.format('M'), timer.format('D')];
                this.dateSelect = false
                this.menstruation.firstTime = timer.format('YYYY-MM-DD')
            },
            setCustomizeTime(dateTime) {
                this.customizeTime = this.$moment(dateTime).format('YYYY-MM-DD')
                this.customize = false
            },
            goTo() {

            }
        },
        computed: {
            calculationEdoc(){
            //    计算预产期

            },
            activeItem() {
                let list = [];
                switch (this.confirm) {
                    case null:
                        list = this.items;
                        break;
                    case 0:
                        list.push(this.items[0]);
                        break;
                    case 1:
                        list.push(this.items[1]);
                        break;
                }
                return list
            },
            confirmBg() {
                let ac = '';
                if (this.activeItem().length > 1) {
                    return 'active-bg'
                } else {

                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .mmm {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background-color: rgba(75, 75, 75, 0.3)
    }

    .picker-sl {
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    .baby-info {
        line-height: 1rem;

        > span {
            margin-left: .3rem;
            border: 1px #4ed1ce solid;
            border-radius: .1rem;
            padding: .05rem .2rem;
            font-size: .3rem;
            color: #666768;
            background-color: rgba(1, 189, 186, 0.1)
        }

        article {
            padding: 0 .3rem;
            display: flex;
            justify-content: space-between;
            color: #a7a8a8;
            font-size: .32rem;
            border-bottom: 1px #ecedee solid;

            span:nth-child(1) {
                color: #4c4c4c;
            }

            label {
                margin-left: .2rem;
            }
        }

    }

    .btn {
        display: flex;
        position: fixed;
        bottom: 5%;
        width: 100%;
        text-align: center;

        article {
            width: 100%;
        }

        span {
            margin: 0 auto;
            display: block;
            background-image: linear-gradient(321deg, rgb(2, 189, 185) 0%, rgb(74, 226, 223) 100%);
            border-radius: .1rem;
            line-height: .8rem;
            width: 80%;
            color: white;
            font-size: .32rem;
        }
    }

    .active-bg {
        background-image: linear-gradient(321deg, rgb(2, 189, 185) 0%, rgb(74, 226, 223) 100%) !important;
        color: white !important;
    }

    .content {
        > p {
            color: #a7a8a8;
            text-align: center;
        }

        .studio-bg {
            display: block;
            /*position: absolute;*/
            border-radius: .1rem;
            background-color: rgb(245, 245, 245);
            color: #858585;
            font-size: 0.3rem;
            width: 3rem;
            height: 2rem;
            text-align: center;
            margin: 1.5rem auto;
            position: relative;

            p {
                position: absolute;
                width: 100%;
                text-align: center;
                top: calc(50% + .3rem);
                font-size: .35rem;
            }

            span {
                position: absolute;
                top: calc(50% - .7rem);
                border-radius: 50%;
                display: block;
                background-color: #fafbfc;
                height: 1rem;
                width: 1rem;
                margin-left: calc(50% - 0.5rem);

                img {
                    width: 0.5rem;
                    height: 0.6rem;
                    margin-top: calc(50% - 0.3rem);
                }
            }
        }
    }

    .title-bg {
        line-height: 1.2rem;
        background-image: url("../../../assets/reservation/BG.png");
        background-size: 100% 100%;
        text-align: center;
        color: white;
        font-size: .35rem;
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
        margin-left: .2rem;
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