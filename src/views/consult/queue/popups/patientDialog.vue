<template>
    <div>
        <section class="title">

<!--            <span>选择就诊人</span>-->
<!--            选择就诊人-->
            <span @click="goTo">添加患者</span>
            <span @click="subInfo">确定</span>

<!--            <span>确认</span>-->
        </section>
<!--        <div>添加就诊人</div>-->
        <ul>
            <li :class="{'active-patient-info':activeUserInfo === item}"
                v-for="(item,key) of userInfoList"
                :key="key"
                @click="activeUserInfo = item">
                <div>
                    <span class="icon active-user"></span>
                </div>
                <div style="vertical-align: top;width: 100%;">
                    <div>
                        <span class="name">{{item.name}}</span>
                        <span class="gender">{{item.sex === '1'?'男':'女'}}</span>
                        <span>{{item.age}}岁</span>
                        <i class="el-icon-edit"></i>
                    </div>
                    <p>电话: {{item.mobile}}</p>
                    <p>身份证: {{item.custody_identity}}</p>
                </div>

            </li>
        </ul>
<!--        <p v-show="userInfoList === undefined?false:userInfoList.length === 0" @click="goTo()">添加患者</p>-->
    </div>
</template>

<script>
    export default {
        name: "patientDialog",
        data() {
            return {
                userInfoList: [],
                activeUserInfo:{},
            }
        },
        created() {
            this.getUserInfoList();
        },
        methods: {
            subInfo(){
                // console.log(111)
                if (this.activeUserInfo.name === undefined){
                    this.$toast.fail({duration:500,message:'请选择'})
                    return
                }
              this.$emit('subInfo',{std:1,obj:this.activeUserInfo})
            },
            getUserInfoList() {
                this.$axios.get('Consulting/getPatientList', {user_id: sessionStorage.user_id}).then(res => {
                    console.log( res.data.data);
                    this.userInfoList = res.data.data
                })
            },
            goTo(){
                this.$router.push({path:'/consult/registered/fillout'})
            }
        }
    }
</script>

<style scoped lang="scss">
    .active-patient-info{
        background: white !important;
        box-shadow: 0 0 5px 2px rgba(77, 143, 236,0.3);
        .active-user{
            background-color: rgba(77, 143, 236,0.1) !important;
            background-image: url("../../../../assets/existingData/userac.png") !important;
        }
        i{
            color: #4d8fec !important;
        }
    }
    .title + div{
        text-align: center;background: #4d8fec;color: white;line-height: .7rem;
        position: absolute;
        bottom: 0;
        width: 100%;
        z-index: 100;
    }
    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1rem;
        padding: 0 .3rem;
        background: #4d8fec;
        color: white;
        text-align: center;
        font-size: .3rem;
        :nth-child(1){
            line-height: .5rem;
            background-color: rgba(255,255,255,0.3);
            color: white;
            padding: 0 .2rem;
            border-radius: .1rem;
            /*box-shadow: ;*/
        }
        :nth-child(2){
            line-height: .6rem;
            background: linear-gradient(to bottom right, #4d8fec, #4d8fec);
            padding: 0 .2rem;
            border-radius: .1rem;
            box-shadow: 0 0 5px 2px rgba(75, 75, 75, 0.1);
        }
    }

    ul {
        padding: 0 .3rem .3rem .3rem;
        overflow: auto;
        position: absolute;
        top: .9rem;
        bottom: .7rem;
        left: 0;
        right: 0;
        li {
            padding: .2rem;
            margin-top: .35rem;
            display: flex;
            background-color: #f1f2f3;
            border-radius: 5px;

            :nth-child(2) {
                div {
                    padding-bottom: .1rem;
                    font-size: .3rem;

                    i {
                        float: right;
                        color: #4c4c4c;
                    }
                }

                p {
                    font-size: .25rem;
                    color: #a1a7a8;
                }
            }

            .icon {
                display: block;
                width: .4rem;
                height: .4rem;
                background-color: white;
                border-radius: 50%;
                text-align: center;
                background-image: url("../../../../assets/existingData/userbai.png");
                background-repeat: no-repeat;
                background-size: .2rem;
                background-position: center;
                margin-right: .2rem;
            }

            .name, .gender {
                padding-right: .5rem;
            }

            .gender, .gender + span {
                color: #7b7b7b;
            }
        }
    }
</style>