<template>
    <div>
        <section class="bespeak-title">
            <span @click="activeMenu = key"
                  :class="{'active-menu':key === activeMenu}"
                  v-for="(item, key) of ['按专家预约','按日期预约']"
                  :key="key">{{item}}</span>
        </section>
        <section class="bespeak-date"
                 v-show="activeMenu === 1">
            <article>
                <div v-for="(item, key) of 9" :key="key" @click="activeDateTime = key">
                    <div>
                        <p>周六</p>
                        <p>05.18</p>
                    </div>
                    <p :class="{'active-dateTime':activeDateTime === key}"></p>
                </div>
            </article>
        </section>
        <section class="bespeak-content"
                 :style="`top:${activeMenu===0?'.9rem':'2.1rem'}`">
            <article class="registered-title"
                     v-for="(item,key) of doctorsList"
                     :key="key"
                     @click="goTo(item)">
                <div class="doctors-info">
                    <div class="title-n1">
                        <img :src="item.avatar" alt="">
                    </div>
                    <div class="title-n2">
                        <div>
                            <span>{{item.real_name}}</span>
                            <span> | {{item.level === '2'?'知名专家':'专家'}}</span>
                            <p>
                                <span class="tag" v-for="label of item.label">{{label}}</span>
                            </p>
                            <p>擅长：{{item.create_time}}</p>
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
                    </span>
                    <span class="btn" @click="goTo">挂号</span>
                </div>
            </article>
        </section>

    </div>
</template>

<script>
    export default {
        name: "bespeak",
        data() {
            return {
                activeMenu: 0,
                activeDateTime:0,
                doctorsList: [
                    {
                        real_name: '天才的',
                        label: ['认证', '负责'],
                        level: 1,
                        create_time: '递四方速递',

                    }, 2, 3]
            }
        },
        methods:{
            goTo(){
                this.$router.push({path:'/consult/queue/visitingtime'})
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
        border-bottom: 2px #00b5bd solid;
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

            img {
                width: 100%;
                height: 100%;
                border-radius: .1rem;
            }

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