<template>
    <!--    资料编辑-->
    <div>
        <section class="doctors-info">
            <ul>
                <li>
                    <span>头像</span>
                    <div style="display: flex;align-items: center">
                        <img :src="userInfo.avatar" alt="">
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </li>
                <li>
                    <span>用户姓名</span>
                    <span>{{userInfo.real_name}} <i class="el-icon-arrow-right"></i></span>
                </li>
                <li>
                    <span>性别</span>
                    <span>{{userInfo.sex === '1'?'男':'女'}} <i class="el-icon-arrow-right"></i></span>
                </li>
                <li @click="show1 = true">
                    <span>出生日期</span>
                    <span>{{userInfo.date_of_birth}} <i class="el-icon-arrow-right"></i></span>
                </li>
            </ul>
        </section>
        <section class="certification">
            <ul>
                <li>
                    <span>执业地点:{{userInfo.work_unit}}</span>
                    <span>{{userInfo.dpartment_status === '1'?'已认证':'未认证'}}</span>
                </li>
                <li>
                    <span>{{userInfo.work_unit}}-{{userInfo.class_name}}</span>
                    <span>{{userInfo.class_status === '1'?'已认证':'未认证'}}</span>
                </li>
            </ul>
        </section>
        <transition name="fade">
            <div v-show="show1" style="position: fixed;bottom: 0;width: 100%" :key="1">
                <van-datetime-picker
                        @cancel="show1=false"
                        @confirm="hello"
                        v-model="currentDate"
                        type="date"
                        :min-date="minDate"
                        @change="Change"
                ></van-datetime-picker>
            </div>

        </transition>
    </div>
</template>

<script>
    export default {
        name: "editing",
        data() {
            return {
                userInfo:{},
                show1: false,
                minDate: new Date(1950, 1, 1),
                currentDate: new Date(2000, 0, 1),
            }
        },
        created(){
            this.getUserInfo();
        },
        methods: {
            getUserInfo(){
              this.$axios.get('personinfo/myinfo',{openid:'oSx-51JbMrtfk5394YIx8IQ8JlRI'}).then(res=>{
                  console.log(res)
                  this.userInfo = res.data.data[0]
              })
            },
            hello(res) {
                console.log(res)
            },
            Change() {
                console.log(this.currentDate);
                var date = this.currentDate;
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                this.currentdate =
                    date.getFullYear() +
                    seperator1 +
                    month +
                    seperator1 +
                    strDate +
                    " " +
                    "00" +
                    seperator2 +
                    "00" +
                    seperator2 +
                    "00";
            }
        }
    }
</script>

<style scoped lang="scss">
    .fade-enter-active, .fade-leave-active {
        transition: all .4s ease;
    }

    .fade-enter, .fade-leave-active {
        /*//进入离开的动画*/
        transform: translateY(100%);
    }

    .doctors-info {
        /*padding: .3rem;*/
        border-bottom: 4px #f6f7f8 solid;

        ul {
            li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                line-height: 1.3rem;
                color: #4c4c4c;
                padding: 0 .3rem;
                border-bottom: 1px #f6f7f8 solid;
                font-size: .3rem;

                :nth-child(2) {
                    color: #666768;
                }

                img {
                    display: block;
                    width: 1.5rem;
                    height: 1.5rem;
                    background: #9b9c9d;
                    border-radius: 50%;
                    margin: .3rem 0;
                }

                span {
                    /*display: block;*/
                    /*width: 100%;*/
                }
            }
        }

    }

    .certification {
        padding: 0 .3rem;
        font-size: .3rem;
        color: #4c4c4c;

        ul {
            li {
                line-height: 1rem;
                display: flex;
                justify-content: space-between;

                :nth-child(2) {
                    color: #666768;
                }
            }
        }
    }
</style>