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
        <section class="bespeak-content" :style="`top:${activeMenu===0?'.9rem':'2.1rem'}`">
            <article class="registered-title"
                     v-for="(item,key) of scheduling"
                     :key="key"
                     @click="goTO2(item)">
                <div class="doctors-info">
                    <div class="title-n1" :style="`background-image:url(${item.doctor_avatar})`"></div>
                    <div class="title-n2">
                        <div>
                            <span>{{item.doctor_name}}</span>
                            <span> | {{item.level === '2'?'知名专家':'专家'}}</span>
                            <p>
                                <span class="tag" v-for="label of item.doctor_label">{{label}}</span>
                            </p>
                            <span class="good-at">擅长:{{item.doctor_describe}}</span>
                        </div>
                    </div>
                </div>
                <div class="doctor-introduction">
                    <p>简介:{{item.doctor_synopsis}}</p>
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
        <p class="toast" v-show="scheduling.length === 0">暂无医生</p>
        <div class="mask" v-show="isShowMask">
          <div class="box fadeShow">
            <h3>预约须知</h3>
            <dl>
              <dd>
                <h4>一、温馨提示：</h4>
                <p>
                  1. 目前我院线上服务预约挂号的患者，挂号费及诊疗费均为自费方式。如有医保患者请拨打电话预约010-69787777，到院就诊时诊疗费用可使用医保卡请知悉！<br/>
                  2. 预约截至时间：就诊前一日22:00停挂次日号。<br/>
                  3. 预约服务流程：预约挂号缴费成功后，凭订单于就诊当日到前台领取就诊卡进行取号。    
                </p>
              </dd>    
              <dd>
                <h4>二、取消已约号：</h4>
                <p>
                  1. 每日22:00之前登录【个人中心】可取消次日号源，取消成功后于24小时之内退款到账。或者于周一至周五8:00-11:30;13:00-17:00,可拨打我院人工电话010—6978 7702进行人工取消。<br/>
                  2.若超出当日预约就诊时间后，不进行退号手续办理。可在24小时内到我院前台（或周一至周五8:00-11:30,13:00-17:00,可拨打我院人工电话010—6978 7702）进行就诊时间改约。<br/>
                  3.若就诊当日不能在预约时间进行就诊，也可在预约时间之前到我院前台办理取消预约退号手续。    
                </p>
              </dd> 
            </dl>
            <h5 @click="isAgree = !isAgree">如您了解并同意《预约须知》全部内容，请点击“继续使用”开始使用我们的产品和服务。<span :class="{on: isAgree}">√</span></h5>
            <div class="btns">
              <div @click="isShowMask = false">放弃并返回</div>    
              <div @click="goTo">继续使用</div>    
            </div>
          </div>    
        </div>
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
                activeDate:null,
                doctorsList: [],
                timeDate: timeDateList(),
                isShowMask: false,
                isAgree: false
            }
        },
        created() {
            this.getScheduling();
            if (sessionStorage.getItem('activeMenu')){
                this.activeMenu = Number(sessionStorage.getItem('activeMenu'))
                this.activeDateTime = Number(sessionStorage.getItem('activeDateTime'))
                this.activeDate = sessionStorage.getItem('activeDate')
                if (this.activeMenu == 1){
                    this.timeDataDoctors(this.activeDate,this.activeDateTime)
                }
                sessionStorage.removeItem('activeMenu')
                sessionStorage.removeItem('activeDate')
                sessionStorage.removeItem('activeDateTime')
            }
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
                this.activeDate = date
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
                    this.scheduling = res.data.data
                })
            },
            goTO2(item) {
                this.isShowMask = true
                this.selectDoctor = item
            },
            goTo() {
                if (!this.isAgree) {
                    this.$toast.fail({duration:1500,message:'请先阅读《预约须知》并同意后再继续使用此功能'})
                    return
                }
                this.$router.push({path: '/consult/queue/visitingtime/',query:{id:this.$route.query.id,nid: this.selectDoctor.doctor_id}})
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
        },
        beforeRouteLeave (to, from , next) {
            if (to.name === '预约医生详情'){
                sessionStorage.setItem('activeMenu',this.activeMenu)
                sessionStorage.setItem('activeDateTime',this.activeDateTime)
                sessionStorage.setItem('activeDate',this.activeDate)
            }
            next()
        },
    }
</script>

<style scoped lang="scss">
    @keyframes fadeShow {
    0%{-webkit-transform:scale(.1);-ms-transform:scale(.1);transform:scale(.1);opacity:0;}
    90%{-webkit-transform:scale(1.1);-ms-transform:scale(1.1);transform:scale(1.1);opacity:1;}
    100%{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);opacity:1;}
}
.fadeShow{-webkit-animation:fadeShow .4s forwards;animation:fadeShow .4s forwards;}
    .mask{
        position: fixed;
        width: 100%;
        height: 100%;
        left:0;
        top:0;
        z-index:200;
        background: rgba(0,0,0,.7);
        display:flex;
        justify-content: center;
        align-items: center;

        .box{
            width:85%;
            background: #fff;
            border-radius: .2rem;
            margin-top: .8rem;
            padding:0 .3rem;
            box-sizing: border-box;

            h3{
                font-size: .3rem;
                padding:.36rem 0 .22rem;
                text-align: center;
                color:#4d8fec;
                font-weight: bold;
            }

            dl{
                border-bottom: 1px solid #eee;
                
                dd{
                    h4{
                        font-size: .26rem;
                        color:#333;
                        padding-bottom: .2rem;
                    }
                    p{
                        font-size: .22rem;
                        line-height: .36rem;
                        color:#666;
                        word-break: break-all;
                    }
                    &:not(last-child){
                      margin-bottom: .28rem;
                    }
                }

            }
            h5{
               font-weight: normal;
               font-size: .24rem;
               line-height: .36rem;
               margin-top: .2rem;
               padding-left: .36rem;   
               color:#666; 
               position: relative;

               span{
                   display: block;
                   position: absolute;
                   width:.26rem;
                   height:.26rem;
                   line-height: .26rem;
                   text-align: center;
                   border:.02rem solid #4d8fec;
                   font-size: .26rem;
                   color:#fff;
                   left:0;
                   top:.06rem;
                   border-radius: .05rem;

                   &.on{
                     background: #4d8fec;
                   }
               }
            }
            .btns{
                margin-top: .34rem;
                padding-bottom: .4rem;
                display:flex;
                justify-content: space-between;

                div{
                    width: 2.6rem;
                    height: .63rem;
                    line-height: .63rem;
                    border:1px solid #4d8fec;
                    text-align: center;
                    color:#4d8fec;
                    border-radius: .1rem;

                    &:last-child{
                        background: linear-gradient(to bottom right, #4d8fec, #4d8fec);
                        color:#fff;
                        border-color: transparent;
                    }
                }
            }
        }
    }
    .bespeak-content {
        /*position: absolute;*/
        top: 2.1rem;
        bottom: 0;
        width: 100%;
    }

    .active-dateTime {
        color: #4d8fec;
        >p{
            border-bottom: 2px #4d8fec solid;
        }
    }

    .bespeak-date::-webkit-scrollbar {
        display: none;
        background: rgba(0,0,0,0);
    }

    .bespeak-date {
        /*position: absolute;*/
        /*top: calc(.8rem + 2px);*/
        border: 1px #eff1ef solid;
        height: 1.2rem;
        overflow-y: hidden;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
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
        color: #4d8fec;
        border-bottom: 2px #4d8fec solid;
    }

    .bespeak-title {
        /*position: absolute;*/
        /*top: 0;*/
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

        .doctor-introduction{
            font-size: .3rem;
            font-weight: 200;
            color: #434445;
            padding-top: .2rem;
        }
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
                color: #4d8fec;
            }

            .btn {
                color: white;
                border-radius: .1rem;
                padding: .05rem .3rem;
                background: linear-gradient(to bottom right, #4d8fec, #4d8fec);
            }
        }

        .title-n1 {
            width: 1.8rem;
            height: 1.8rem;
            background-color: #f4f4f4;
            border-radius: .1rem;
            background-size: cover;
            background-position:center;
            flex-shrink: 0;
            /*img {*/
            /*    width: 100%;*/
            /*    height: 100%;*/
            /*    !*border-radius: .1rem;*!*/
            /*}*/

        }

        .title-n2 {
            height: 1.8rem;
            line-height: 0.6rem;
            width: 100%;
            .good-at{
                display: block;
                width: 70%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                font-size: .3rem;
                font-weight: 200;
            }
            div {
                /*height: 80%;*/
                padding-left: .2rem;
                > span:nth-child(1) {
                    font-size: .35rem;
                }

                > span:nth-child(2) {
                    font-size: .3rem;
                }
            }

            p {
                color: #b9babb;
            }

            /*}*/

            .tag {
                font-size: .25rem;
                background: rgba(171, 220, 219, 0.4);
                padding: .05rem .2rem;
                border-radius: .3rem;
                margin-right: .2rem;
                color: #4d8fec;
            }
        }

    }
</style>
