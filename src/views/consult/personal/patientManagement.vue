<template>
    <!--    患者管理-->
    <div class="patient-management">
        <section v-for="(item, key) of userInfoAll" :key="key">
            <el-row class="userInfo">
                <el-col :span="4">
                    <span class="ac">
                        <span>{{item.name.charAt(0)}}</span>
                    </span>
                </el-col>
                <el-col :span="15" class="info">
                    <span>{{item.name}} <span class="label" v-if="item.vip">明珠卡</span><span>{{item.sex === '1'?'男':'女'}}</span>
                        <span> {{item.age}}岁</span>
                    </span>
                    <p>{{item.mobile}}</p>
                    <p>{{item.custody_identity}}</p>
                </el-col>
                <el-col :span="5">
                    <span class="bj">
                        <span @click="gotoFillout(item.id)">编辑
                            <i class="el-icon-arrow-right"></i> </span>
                        <span @click="delUserInfo(item.id, key)"
                              style="color: red">删除</span>
                    </span>
                </el-col>
            </el-row>
        </section>
        <button
                @click="goTo"
                type="button"
                class="btn">
            <i class="el-icon-plus"></i>
            创建患者信息
        </button>
    </div>
</template>

<script>
    export default {
        name: "patientManagement",
        data() {
            return {
                userInfoAll: [],
                editIndex: null
            }
        },
        created() {
            this.getUserInfoAll();
        },
        methods: {
            gotoFillout(id) {
                this.$router.push({path: '/consult/registered/fillout', query: {id: id}})
            },
            delUserInfo(userId, key) {
                this.$dialog.confirm({
                    title: '确认删除',
                    message: '删除以后将不能恢复'
                }).then(() => {
                    this.$axios.post('Consulting/delPatient',
                        this.$Qs.stringify({id: userId})).then((res) => {
                        if (res.data.msg === 'ok') {
                            this.userInfoAll.splice(key, 1)
                        } else {
                            this.$toast.fail(res.data.msg);
                        }
                    })
                })
            },
            getUserInfoAll() {
                this.$axios.get('Consulting/getPatientList',
                    {user_id: sessionStorage.user_id}).then(res => {
                    this.userInfoAll = res.data.data
                })
            },
            goTo() {
                this.$router.push({path: '/consult/registered/fillout'})
            }
        }
    }
</script>

<style scoped lang="scss">

    .edit {
        display: flex;
        margin-right: .3rem;
        margin-left: .3rem;
        background-color: darkcyan;
        line-height: .8rem;
        margin-top: -0.4rem;
        border-radius: 0 0 .1rem .1rem;
        overflow: hidden;

        span {
            text-align: center;
            display: block;
            width: 100%;
        }
    }

    .patient-management {
        background: #f0f0f0;
        /*padding-top: .3rem;*/
        height: 100%;

        section {
            padding:.3rem .3rem 0 .3rem;
        }
    }

    .btn {
        position: fixed;
        width: 3.5rem;
        height: 0.8rem;
        background: white;
        box-shadow: 0 0 10px 5px rgba(75, 75, 75, 0.1);
        border-radius: 5px;
        border: 1px #4d8fec solid;
        color: #4d8fec;
        bottom: 1rem;
        left: calc(50% - 1.75rem);

        i {
            font-weight: 800;
        }
    }

    .userInfo {
        /*margin:0 .3rem .3rem .3rem;*/
        border-radius: .1rem;
        height: 1.9rem;
        background: white;
        display: flex;
        align-items: center;
        box-shadow: 0 0 10px 3px rgba(75, 75, 75, 0.1);

        .ac {
            display: block;
            width: 0.8rem;
            height: 0.8rem;
            background: #e2fffd;
            border-radius: 50%;
            text-align: center;
            margin-left: 0.3rem;

            span {
                color: #4d8fec;
                font-size: 0.3rem;
                line-height: 0.8rem;
            }
        }

        .info {
            margin-left: 0.3rem;
            font-size: 0.2rem;

            p {
                margin-top: 0.06rem;
                color: #858585;
                font-size:.3rem;
            }

            span {
                font-size: 0.34rem;
                font-weight:bold;

                span {
                    color: #b9babb;
                    font-weight:normal;
                }
                .label{
                    padding:0 .1rem 0 .34rem;
                    height:.34rem;
                    border-radius:.05rem;
                    margin:0 .25rem 0 .15rem;
                    font-size:.2rem;
                    color:#fff;
                    background:#2BBFBB url('../../../assets/icon_01.png') no-repeat .1rem center;
                    background-size:.16rem;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }

        .bj {
            display: block;
            line-height: .8rem;
            color: #858585;
            margin-right: 0.3rem;
            font-size: 0.3rem;
            float: right;
        }
    }
</style>
