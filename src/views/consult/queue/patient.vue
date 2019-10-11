<template>
    <!--预约-->
    <div class="reservation">
<!--        医生详情-->
        <section class="doctorInfo">

        </section>
        <section class="vote">
            <article>
                <span class="icon"><img src="../../../assets/reservation/icon.png" alt="全部图标"></span>
                <span class="lit">患者投票</span>
                <span class="lit-right">查看全部 <i class="el-icon-arrow-right"></i></span>
            </article>
        </section>
<!--        评论详情-->
        <section class="patient" v-for="item in [1,2,3,4,5,6]" :key="item">
            <div>
                <article class="title">
                    <span class="avatar"></span>
                    <span class="patient-name">
                    非洲人
                    <span>斜视</span>
                </span>
                    <span class="patient-time">2019-09-27 21:30</span>
                </article>
                <article class="estimate">
                <span>患者主观感受:
                    <span>很满意</span>
                </span>
                    <span>态度:
                        <span>很满意</span>
                    </span>
                </article>
            </div>
        </section>
        <section class="btn">
            <button type="button"><i class="el-icon-edit"></i> 评论 / 投票</button>
        </section>
    </div>
</template>

<script>
    export default {
        name: "reservation"
    }
</script>

<style scoped lang="scss">
    .patient {
        position: relative;
        height: 2rem;
        border-bottom: 1px #f5f5f5 solid;

        div {
            position: absolute;
            width: 100%;
            top: calc(50% - 0.6rem);

            .title {
                line-height: 0.6rem;

                .avatar {
                    float: left;
                    margin-left: 0.3rem;
                    display: block;
                    height: 0.6rem;
                    width: 0.6rem;
                    border-radius: 50%;
                    background: aquamarine;
                }

                .patient-name, .patient-time {
                    font-size: 0.25rem;
                    color: #909399;
                }

                .patient-name {
                    padding-left: 0.1rem;

                    span {
                        color: #303133;
                        padding-left: 0.2rem;
                    }
                }

                .patient-time {
                    padding-right: 0.3rem;
                    float: right;
                }
            }

            .estimate {
                line-height: 0.7rem;
                font-size: 0.3rem;
                color: #606266;

                > span {
                    margin-left: 0.3rem;

                    span {
                        color: #4d8fec;
                    }
                }

                span + span {
                    float: right;
                    margin-right: 0.3rem;
                }

            }
        }

    }

    .doctorInfo {
        height: 1.7rem;
        width: 100%;
        background: url("../../../assets/reservation/BG.png");
        background-size: cover;
    }

    .vote {
        height: 1.3rem;
        position: relative;
        border-bottom: 4px #f5f5f5 solid;

        article {
            line-height: 0.6rem;
            position: absolute;
            width: 100%;
            top: calc(50% - 0.3rem);

            .icon {
                margin-left: 0.3rem;
                float: left;
                display: block;
                height: 0.6rem;
                width: 0.6rem;
                background: linear-gradient(to bottom right, #93dddc, #4d8fec);
                border-radius: 50%;

                img {
                    width: 60%;
                    height: 60%;
                    margin-top: calc(50% - 30%);
                    margin-left: calc(50% - 30%);
                }
            }

            .lit {
                font-size: 0.3rem;
                padding-left: 10px;
                color: #606266;
            }

            .lit-right {
                font-size: 0.3rem;
                padding-right: 0.3rem;
                float: right;
                color: #4d8fec;
            }

        }
    }
    .btn{
        position: fixed;
        bottom: 0.35rem;
        width: 100%;
        text-align: center;
        button{
            height: 0.7rem;
            width: 3rem;
            border-radius: 5px;
            border: none;
            color: white;
            background:linear-gradient(to bottom right, #4d8fec, #4d8fec);
            font-size: 0.3rem;
            i{
                margin-right: 0.2rem;
            }
        }
    }
</style>