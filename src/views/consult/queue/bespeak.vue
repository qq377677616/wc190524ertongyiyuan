<template>
    <div>
        <section class="bespeak-title">
            <span @click="activeMenuSwitch(key)"
                  :class="{'active-menu':key === activeMenu}"
                  v-for="(item, key) of ['按专家预约','按日期预约']"
                  :key="key">{{item}}</span>
        </section>
        <section class="bespeak-date"
                 v-show="activeMenu === 1">
            <article>
                <div v-for="(item, key) of timeDate" :key="key"
                     @click="timeDataDoctors(item.time,key)"
                     :class="{'active-dateTime':activeDateTime === key}">
                    <div>
                        <p>{{item.cTimeName}}</p>
                        <p>{{item.time.substr(5)}}</p>
                    </div>
                    <p ></p>
                </div>
            </article>
        </section>
        <section class="bespeak-content"
                 :style="`top:${activeMenu===0?'.9rem':'2.1rem'}`">
            <article class="registered-title"
                     v-for="(item,key) of scheduling"
                     :key="key"
                     @click="goTo(item)">
                <div class="doctors-info">
                    <div class="title-n1" :style="`background-image:url(${item.doctor_avatar})`">
<!--                        <img :src="item.doctor_avatar" alt="">-->
                    </div>
                    <div class="title-n2">
                        <div>
                            <span>{{item.doctor_name}}</span>
                            <span> | {{item.level === '2'?'知名专家':'专家'}}</span>
                            <p>
                                <span class="tag" v-for="label of item.doctor_label">{{label}}</span>
                            </p>
                            <!--                            <p class="title-n2-jx">擅长：{{item.doctor_describe}}</p>-->
                        </div>
                    </div>
                </div>
                <div class="other">
                    <span class="star">
                        <span>评星:</span>
                        <i class="el-icon-star-on"></i>
                        <i class="el-icon-star-on"></i>
                        <i class="el-icon-star-on"></i>
                        <i class="el-icon-star-on"></i>
                        <i class="el-icon-star-on"></i>
                        {{item.doctor_star_rating}}
                    </span>
                    <span class="btn" >挂号</span>
                </div>
            </article>
        </section>

    </div>
</template>

<script>


    function doHandleMonth(month) {
        let m = month;
        if (month.toString().length === 1) {
            m = "0" + month;
        }
        return m;
    }

    function getDay(day) {
        let today = new Date();

        let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

        today.setTime(targetday_milliseconds); //注意，这行是关键代码

        let tYear = today.getFullYear();
        let tMonth = today.getMonth();
        let tDate = today.getDate();
        tMonth = doHandleMonth(tMonth + 1);
        tDate = doHandleMonth(tDate);
        return tYear + "-" + tMonth + "-" + tDate;
    }

    function timeDateList() {
        let timeDate = []
        for (let i = 0; i <= 7; i++) {
            timeDate[i] = {time: getDay(i)}
            switch (new Date(getDay(i)).getDay()) {
                case 0:
                    timeDate[i].cTimeName = '星期天'
                    break;
                case 1:
                    timeDate[i].cTimeName = '星期一'
                    break;
                case 2:
                    timeDate[i].cTimeName = '星期二'
                    break;
                case 3:
                    timeDate[i].cTimeName = '星期三'
                    break;
                case 4:
                    timeDate[i].cTimeName = '星期四'
                    break;
                case 5:
                    timeDate[i].cTimeName = '星期五'
                    break;
                case 6:
                    timeDate[i].cTimeName = '星期六'
                    break;
            }
        }
        return timeDate
    }

    export default {
        name: "bespeak",
        data() {
            return {
                scheduling: [],
                schedulingDate: {},
                activeMenu: 0,
                activeDateTime: 0,
                doctorsList: [],
                timeDate: timeDateList(),
            }
        },
        created() {
            this.getScheduling();
        },
        methods: {
            activeMenuSwitch(key){
                this.activeMenu = key
                switch (key) {
                    case 0:
                        this.getScheduling();
                        break;
                    case 1:
                        this.timeDataDoctors(getDay(0), 0)
                        break;
                }
            },
            timeDataDoctors(date, key){
                this.activeDateTime = key
                this.$axios.get('Consulting/getScheduling', {
                    department_class_id: this.$route.query.id,
                    Scheduling_time:date
                }).then(res => {
                    this.scheduling = res.data.data
                })
            },
            getScheduling() {
                this.$axios.get('Consulting/getScheduling', {
                    department_class_id: this.$route.query.id,
                }).then(res => {
                    console.log(res)
                    this.scheduling = res.data.data
                })
            },
            goTo(item) {
                // console.log(this.$route.query.id)
                this.$router.push({path: '/consult/queue/visitingtime/',query:{id:this.$route.query.id,nid:item.doctor_id}})
            }
        },
        computed: {
            dataList() {
                const {activeMenu} = this
                switch (activeMenu) {
                    case 0:
                        break;
                    case 1:
                        break;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .bespeak-content {
        position: absolute;
        top: 2.1rem;
        bottom: 0;
        width: 100%;
    }

    .active-dateTime {
        color: #00b5bd;
        >p{
            border-bottom: 2px #00b5bd solid;
        }
    }

    .bespeak-date::-webkit-scrollbar {
        display: none;
    }

    .bespeak-date {
        position: absolute;
        top: calc(.8rem + 2px);
        border: 1px #eff1ef solid;
        height: 1.2rem;
        overflow-y: hidden;
        overflow-x: auto;
        width: 100%;
        /*white-space:nowrap;*/
        article {
            display: flex;

            > div {
                flex-shrink: 0;
                text-align: center;
                width: 1.2rem;
                height: 1.2rem;
                position: relative;
                display: flex;
                align-items: center;
                /*float: left;*/

                div {
                    width: 100%;

                    :nth-child(1) {
                        font-size: .2rem;
                    }

                    :nth-child(2) {
                        font-size: .3rem;
                    }
                }

                > p {
                    position: absolute;
                    bottom: 0;
                    width: 30%;
                    left: calc(50% - 15%)
                }
            }

        }

    }

    .active-menu {
        color: #00b5bd;
        border-bottom: 2px #00b5bd solid;
    }

    .bespeak-title {
        position: absolute;
        top: 0;
        width: 100%;
        font-size: .26rem;
        background: #eff1ef;
        line-height: .8rem;
        text-align: center;
        display: flex;

        span {
            display: block;
            width: 50%;
        }
    }

    .registered-title {
        position: relative;
        padding: .3rem;
        background: white;
        border-bottom: .1rem #f4f5f6 solid;

        .doctors-info {
            display: flex;
        }

        .other {
            padding-top: .2rem;
            font-size: .3rem;
            display: flex;
            justify-content: space-between;

            .star {
                display: flex;
                align-items: center;
            }

            i {
                font-size: .4rem;
                color: #01bdbb;
            }

            .btn {
                color: white;
                border-radius: .1rem;
                padding: .05rem .3rem;
                background: linear-gradient(to bottom right, #4ae2df, #02bdb9);
            }
        }

        .title-n1 {
            width: 1.8rem;
            height: 1.8rem;
            background: bisque;
            border-radius: .1rem;
            background-size: cover;
            /*img {*/
            /*    width: 100%;*/
            /*    height: 100%;*/
            /*    !*border-radius: .1rem;*!*/
            /*}*/

        }

        .title-n2 {
            height: 1.8rem;
            line-height: 0.6rem;

            div {
                height: 80%;
                margin-left: .2rem;

                > span:nth-child(1) {
                    font-size: .35rem;
                }

                > span:nth-child(2) {
                    font-size: .3rem;
                }
            }

            p {
                margin-top: 5px;
                color: #b9babb;

            }

            /*}*/

            .tag {
                font-size: .25rem;
                background: rgba(171, 220, 219, 0.4);
                padding: .05rem .2rem;
                border-radius: .3rem;
                margin-right: .2rem;
                color: #01bdb8;
            }
        }

    }
</style>