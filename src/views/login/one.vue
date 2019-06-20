<template>
    <div style="height: 100%">
        <section class="title-bg">
            <span>第{{schedule}}步</span>
        </section>
        <section class="form" >
            <article class="one" v-show="index === 1">
                <label>
                    <span>手机号码</span>
                    <input type="text">
                </label>
                <label class="code-input">
                    <span>验证码</span>
                    <input class="code" type="text">
                    <span>获取验证码</span>
                </label>
            </article>
            <!--            第二步-->
            <article class="patient-form" v-show="index === 2">
                <label for="phone">
                    <span>您的姓名</span>
                    <input placeholder="本人" type="text" name="sex" id="phone">
                </label>
                <label for="phone">
                    <span>您所在的医院</span>
                    <input placeholder="便于获取医生回复通知" type="text" name="sex" id="phone">
                </label>
                <label for="phone">
                    <span>您所在的科室</span>
                    <input placeholder="简单的介绍病情,限200字,选填" type="text" name="sex" id="phone">
                </label>
                <p>您所在的科室的电话</p>
                <div>
                    <label for="phone">
                        <!--                    <span>您所在的科室</span>-->
                        <input placeholder="" type="text" name="sex" id="phone">
                        <span>-</span>
                        <input placeholder="" type="text" name="sex" id="phone">
                    </label>
                </div>
            </article>
            <!--            第三步-->
            <article class="IDcard" v-show="index === 3">
                <p>您的身份证信息</p>
                <div class="upload">
                    <article>
                        <p>身份证正面</p>
                        <div>
                            <img src="../../assets/login/zhengmian.png" alt="">
                        </div>
                    </article>
                    <article>
                        <p>身份证反面</p>
                        <div>
                            <img src="../../assets/login/fanmian.png" alt="">
                        </div>
                    </article>
                </div>
                <div class="license">
                    <p>您的执照第二页</p>
                    <div>
                        <img src="../../assets/login/shangchuan.png" alt="">
                    </div>
                </div>
            </article>
            <article class="btn">
                <div v-show="index !== 1">
                    <span class="previous" @click="index-=1">上一步</span>
                </div>
                <div >
                    <span v-show="index <= 2" @click="index+=1">下一步</span>
                    <span v-show="index === 3">提交</span>
                </div>
            </article>
        </section>
    </div>
</template>

<script>
    export default {
        name: "one",
        data(){
            return{
                index:1
            }
        },
        computed:{
            schedule(){
                return this.index===1?'一':this.index===2?'二':'三'
            }
        }
    }
</script>

<style scoped lang="scss">
    .form{
        padding-top: .3rem;
    }
    .one{
        padding: .3rem;
        line-height: 1.2rem;
        .code-input{
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
                height: 0.85rem;
                padding: 0 0 0 0.2rem;
            }
            .code{
                width: 40%;
            }

            .code+span{
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
    .title-bg{
        line-height: 1.2rem;
        background-image: url("../../assets/reservation/BG.png");
        background-size: 100% 100%;
        text-align: center;
        color: white;
        font-size: .35rem;
    }

    .btn {
        position: fixed;
        display: flex;
        /*align-items: center;*/
        left: 0;
        right: 0;
        bottom: 5%;
        div{
            width: 100%;
            .previous {
                color: #00b5bd;
                box-shadow: 0 0 5px 1px #4ed1ce;
                background: white !important;
            }
            span {
                margin: 0 auto;
                display: block;
                color: white;
                padding: .15rem 0;
                width: 2.5rem;
                text-align: center;
                font-size: .3rem;
                border-radius: .1rem;
                background-image: linear-gradient(123deg, rgb(2, 189, 185) 0%, rgb(74, 226, 223) 100%);
                box-shadow: 0px 8px 9px 0px rgba(2, 189, 185, 0.2);
            }
        }


    }

    .IDcard {
        > p {
            margin-left: .3rem;
            font-size: .3rem;
            color: #4c4c4c;
            margin-bottom: .15rem;
        }

        .license {
            p {
                font-size: .3rem;
                color: #4c4c4c;
                padding-bottom: .15rem;
            }

            div {
                height: 3.5rem;
                background-color: #f0f0ee;
                border-radius: .1rem;
                position: relative;

                img {
                    position: absolute;
                    height: 2.5rem;
                    width: 2.5rem;
                    left: calc(50% - 1.25rem);
                    top: calc(50% - 1.25rem);
                }
            }

            padding: .3rem;

        }

        .upload {
            display: flex;
            padding: 0 .15rem;

            article {
                width: 50%;

                p {
                    margin-left: .15rem;
                    font-size: .25rem;
                    color: #a7a8a8;
                }

                div {
                    height: 2rem;
                    background-color: #f0f0ee;
                    border-radius: .1rem;
                    margin: .15rem;
                    position: relative;

                    img {
                        position: absolute;
                        width: 2rem;
                        height: 1.5rem;
                        left: calc(50% - 1rem);
                        top: calc(50% - .75rem);
                    }
                }

            }
        }
    }


    .patient-form {
        p {
            color: #4c4c4c;
            font-size: .32rem;
            /*color: #a9aaab;*/
        }

        line-height: 1.2rem;
        margin: 0.3rem;

        label {
            display: block;
            font-size: 0.32rem;
            color: #4c4c4c;

            span {
                display: inline-block;
                width: 28%;
                margin-right: .2rem;
            }

            input {
                width: calc(72% - 0.4rem);
                border: none;
                border-radius: 5px;
                background: #eff1ef;
                height: 0.85rem;
                padding: 0 0 0 0.2rem;
            }
        }

        div {
            label {
                height: .85rem;
                display: flex;
                align-items: center;
                width: 100%;

                input:nth-child(1) {
                    width: 30%;
                }

                span {
                    margin: 0;
                    text-align: center;
                    width: 5%;
                }
            }
        }
    }

</style>