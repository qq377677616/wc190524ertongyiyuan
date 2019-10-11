<template>
<!--    添加患者-->
    <div class="add" >
        <section class="patient-form">
            <label for="name">
                <span>患者姓名:</span>
                <input type="text" name="sex" id="name" v-model="addUserInfo.name" placeholder="请输入姓名">
            </label>

            <div style="display: flex;font-size: 0.32rem">
                <span style="width: 25%;color:#a9aaab;">性别选择</span>
                <input type="radio" value="1" id="female" name="sex" v-model="addUserInfo.sex"/>
                <label for="female" style="margin-left: 0.2rem">男</label>
                <input type="radio" value="2" id="female1" v-model="addUserInfo.gender" name="sex"/>
                <label for="female1" style="margin-left: 1rem">女</label>
            </div>

            <label for="ID-card">
                <span>身份证:</span>
                <input placeholder="请输入身份证" type="text" name="sex" v-model="addUserInfo.passport" id="ID-card">
            </label>
            <label for="age">
                <span> 年纪:</span>
                <input placeholder="请输入年龄" type="text" name="sex" v-model="addUserInfo.age" id="age">
            </label>
            <label for="phone">
                <span>手机号码:</span>
                <input placeholder="便于获取医生回复通知" type="text" name="sex" v-model="addUserInfo.mobile" id="phone">
            </label>
        </section>
        <section class="btn">
        <button type="button" class="btn-on" @click="hkd">保 存</button>
        <button type="button" class="btn-off" @click="$router.go(-1)">取 消</button>
        </section>
    </div>
</template>

<script>
    export default {
        name: "addPatient",
        data(){
            return{
                addUserInfo:{
                    name:'',
                    sex:null,
                    passport:'',
                    age:null,
                    mobile:null,
                }
            }
        },
        methods:{
            hkd(){
                console.log(this.addUserInfo);
                let userInfo = this.addUserInfo;
                this.$axios.post('Consulting/addPatient',{
                    name:userInfo.name,
                    sex:userInfo.sex,
                    passport:userInfo.passport,
                    age:userInfo.age,
                    mobile:userInfo.mobile
                }).then((res)=>{
                    console.log(res)
                    // if (res.data.code === 200){
                    //     this.$router.go(-1);
                    //     alert('保存成功')
                    // } else {
                    //     alert(res.data.msg)
                    // }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .add{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
    }
    ::-webkit-input-placeholder {color: #afb2b0;font-weight: 200}
    .btn{
        position: fixed;
        bottom: .6rem;
        margin-left: calc(50% - 1.4rem);
        .btn-on, .btn-off{
            margin-top: .4rem;
            display: block;
            width: 2.8rem;
            height: 0.85rem;
            border-radius: 5px;
            border: none;
            font-size: 0.35rem;
            box-shadow: 0 2px 5px 2px rgba(77, 143, 236, 0.3);
        }
        .btn-on{
            color: white;
            background:linear-gradient(to bottom right, #4d8fec, #4d8fec);
        }
        .btn-off{
            background: white;
            color: #4d8fec;

        }
    }
    .patient-form{

        line-height: 1.2rem;
        padding: 0.8rem 0.3rem 0.3rem;
    }
    label {

        display: block;
        font-size: 0.32rem;
        color: #a9aaab;
        span{
            display: inline-block;
            width: 25%;
        }
    }

    input[type='text'] {
        width: calc(75% - 0.2rem);
        border: none;
        border-radius: 5px;
        background: #eff1ef;
        height: 0.85rem;
        line-height: .85rem;
        padding: 0 0 0 0.2rem;
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
        border: #4d8fec solid .02rem;
    }

    input[type='radio']:checked + label::after {
        width: .18rem;
        height: .18rem;
        background-color: #4d8fec;
        background-clip: content-box;
        padding: .06rem;
    }
</style>