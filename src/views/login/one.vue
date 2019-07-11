<template>
    <div style="height: 100vh">
        <section class="title-bg">
            <span>登录</span>
        </section>
        <section class="form">
            <article class="one">
                <label>
                    <span>手机号码</span>
                    <input type="text" v-model="userPhone" placeholder="请输入手机号码" maxlength="11">
                </label>
                <label class="code-input">
                    <span>验证码</span>
                    <input class="code" type="text" v-model="code" maxlength="6">
                    <span class="phoneCode" v-show="std" @click.prevent="requestPhoneCode">获取验证码</span>
                    <span class="phoneCode" v-show="!std">{{count}}秒后重试</span>
                </label>
            </article>
            <span class="btn" @click="login">提交</span>
        </section>
    </div>
</template>

<script>

    function isPoneAvailable(phone) {
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        return reg.test(phone);
    }

    export default {
        name: "one",
        data() {
            return {
                userPhone: null, //电话号码
                std: true, //验证码发送状态
                code:null, //验证码
                count: 60, //倒计时秒数

            }
        },
        methods: {
            login(){
              this.$axios.post('consulting/login_auth',this.$Qs.stringify({
                  user_id:sessionStorage.user_id,
                  openid:sessionStorage.openid,
                  mobile:this.userPhone,
                  code:this.code
              })).then(res=>{
                  if (res.data.errcode == 0){
                      this.$router.push({path:'/doctors/index'})
                  }else {
                      this.$toast.fail(res.data.msg)
                  }
              })
            },
            requestPhoneCode() {
                if (!isPoneAvailable(this.userPhone)) { //手机号码验证
                    this.$toast.fail('请填写正确的手机号')
                    return
                }
                this.$axios.get('consulting/request_phone_code', {mobile: this.userPhone}).then(res => { //验证码发送
                    if (res.data.errcode === 0) {
                        this.countdown()
                        this.$toast.success('发送成功')
                    }
                })
            },
            countdown() { //倒计时
                this.std = false
                let tr = setInterval(() => {
                    this.count -= 1
                    if (this.count === 0) {
                        this.std = true
                        this.count = 60
                        clearInterval(tr);
                    }
                }, 1000)
            }
        },
    }
</script>

<style scoped lang="scss">
    .form {
        padding-top: .3rem;
    }

    .one {
        padding: .3rem;
        line-height: 1.2rem;

        .code-input {
            display: flex !important;
            align-items: center;
        }

        label {
            display: block;
            font-size: 0.32rem;
            color: #4c4c4c;

            span {
                display: inline-block;
                width: 20%;
                margin-right: .2rem;
            }

            input {
                width: calc(80% - 0.4rem);
                border: none;
                border-radius: 5px;
                background: #eff1ef;
                line-height: 0.85rem;
                padding: 0 0 0 0.2rem;
            }

            .code {
                width: 40%;
            }

            .phoneCode {
                text-align: center;
                flex: 1;
                line-height: .85rem;
                border-radius: 5px;
                margin-left: .2rem;
                margin-right: 0;
                background-color: #eff1ef;
            }
        }
    }

    .title-bg {
        line-height: 1.2rem;
        background-image: url("../../assets/reservation/BG.png");
        background-size: 100% 100%;
        text-align: center;
        color: white;
        font-size: .35rem;
    }

    .btn{
        position: fixed;
        bottom: 10%;
        left: calc(50% - 1.25rem);
        display: block;
        color: white;
        padding: .15rem 0;
        width: 2.5rem;
        text-align: center;
        font-size: .3rem;
        border-radius: .1rem;
        background-image: linear-gradient(123deg, rgb(2, 189, 185) 0%, rgb(74, 226, 223) 100%);
        box-shadow: 0 8px 9px 0 rgba(2, 189, 185, 0.2);
    }
    /*.btn {*/
    /*    position: fixed;*/
    /*    display: flex;*/
    /*    !*align-items: center;*!*/
    /*    left: 0;*/
    /*    right: 0;*/
    /*    bottom: 5%;*/

    /*    div {*/
    /*        width: 100%;*/

    /*        .previous {*/
    /*            color: #00b5bd;*/
    /*            box-shadow: 0 0 5px 1px #4ed1ce;*/
    /*            background: white !important;*/
    /*        }*/

    /*        span {*/

    /*        }*/
    /*    }*/


    /*}*/


</style>