<template>
    <!--    资料填写-->
    <div style="min-height: 100vh;padding-bottom: .6rem">
        <section class="prompt">
            <p><span>提示：</span>急重症患者不适合网上诊疗/咨询请即刻前往当地医院急诊</p>

        </section>
        <section class="fillout">
            <p>儿童信息</p>
            <article class="patient-form">
                <label for="name">
                    <span>儿童姓名</span>
                    <input type="text" name="name" v-model="userInfo.name" id="name" placeholder="请输入姓名">
                </label>
                <div style="display: flex;font-size: 0.32rem">
                    <span style="width: 25%;color:#a9aaab;">儿童选择</span>
                    <input type="radio" :value="1" v-model="userInfo.sex" id="female" name="gender"/>
                    <label for="female" style="margin-left: 0.2rem">男</label>
                    <input type="radio" :value="2" v-model="userInfo.sex" id="female1" name="gender"/>
                    <label for="female1" style="margin-left: 1rem">女</label>
                </div>

                <label>
                    <span>出生日期</span>
                    <span @click="showAll=1">{{userInfo.date_of_birth}}</span>
                </label>
<!--                <label>-->
<!--                    <span>所在城市</span>-->
<!--                    <span  @click="showAll=2">{{userInfo.area[0].name}} {{userInfo.area[1].name}} {{userInfo.area[2].name}}</span>-->
<!--                </label>-->
<!--                <label>-->
<!--                    <span>患者关系</span>-->
<!--                    <span @click="showAll=3">{{userInfo.relationship.text}}</span>-->
<!--                </label>-->

                <label for="description">
                    <span>病情描述</span>
                    <textarea @blur="blur" @focus="focus"  maxlength="200" v-model="userInfo.describe" placeholder="简单的介绍病情,限200字,选填" type="text" name="description"
                              id="description"></textarea>
                </label>
            </article>
            <p>监护人</p>
            <article class="patient-form">
                <label for="custody_name">
                    <span>监护人姓名</span>
                    <input @blur="blur" @focus="focus"   v-model="userInfo.custody_name" placeholder="" type="text" name="custody_name" id="custody_name">
                </label>
                <label for="mobile">
                    <span>监护人电话</span>
                    <input  @blur="blur" @focus="focus"  @input="input(userInfo.mobile)"  v-model="userInfo.mobile" placeholder="便于获取医生回复通知" type="number" name="mobile" id="mobile">
                </label>
                <label for="custody_identity">
                    <span>身份证</span>
                    <input maxlength="18" @focus="focus"  @blur="blur"  v-model="userInfo.custody_identity" placeholder="" type="number" name="custody_identity" id="custody_identity">
                </label>
                <div style="display: flex;font-size: 0.32rem" v-show="userInfo.name && userInfo.mobile && userInfo.custody_identity">
                    <span style="width: 25%;color:#a9aaab;">会员绑定</span>
                    <input type="radio" :value="1" v-model="userInfo.vip" id="female2" name="vip"/>
                    <label for="female2" style="margin-left: 0.2rem" @click="showAll=false">非会员</label>
                    <input type="radio" :value="2" v-model="userInfo.vip" id="female3" name="vip"/>
                    <label for="female3" style="margin-left: 1rem" @click="selectVip">会员</label>
                </div>
            </article>
            <article class="spanBtn">
                <p>了解您的性别年龄居住区域等基本信息，能帮助医生更好的给您诊断建议，同时信息也将严格对外保密
                    <span>（注：信息提交后无法修改或删除）</span></p>
                <span @click="addFillout">{{queryId !== undefined?'修 改':'提交'}}</span>
            </article>
        </section>
        <!--        <van-picker :columns="columns" @change="onChange"></van-picker>-->
        <transition-group name="fade-f">
        <div v-show="showAll === 1" style="position: fixed;bottom: 0;width: 100%" :key="1">
            <van-datetime-picker
                    @cancel="showAll=false"
                    @confirm="getTime"
                    v-model="currentDate"
                    type="date"
                    :min-date="minDate"
            ></van-datetime-picker>
        </div>
        <div v-show="showAll === 2" style="position: fixed;bottom: 0;width: 100%" :key="2">
          <van-area @cancel="showAll=false" :area-list="areaList" @confirm="getArea" />
        </div>
        <div v-show="showAll === 3" style="position: fixed;bottom: 0;width: 100%" :key="3">
            <van-picker
                    show-toolbar
                    title="选择关系"
                    :columns="relations"
                    @cancel="showAll = false"
                    @confirm="getRelations"

            />
        </div>
        <div v-show="showAll === 4" style="position: fixed;bottom: 0;width: 100%" :key="4">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showAll = false"
            @confirm="onConfirm"
          />
        </div>
        </transition-group>
        <!-- <div v-show="showAll === 4"  :key="3">
          <van-picker @cancel="showAll=false" @confirm="getTime" :columns="columns" @change="onChange" />
        </div> -->

    </div>
</template>

<script>
    import areaList from '../../util/area'
    import { Picker } from 'vant'
    function verification(obj){
        // console.log(obj.name)
        if (obj.name === undefined || obj.name.length < 0){
            return '请填写姓名'
        } else if(obj.sex === undefined){
            return '请选择性别'
        }else if(obj.date_of_birth === undefined){
            return '请选择出生日期'
        }
        //验证手机号码

        let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        // console.log(myreg.test(obj.mobile))
        let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

        if (!idcardReg.test(obj.custody_identity)){
            return '身份证不合法'
        }
        if (myreg.test(obj.mobile)) {
            return '1000'
        } else {
            return '请填写正确的手机号码'
        }
        // if (obj.name)
    }
    export default {
        name: "fillout",
        data() {

            return {
                scrollTop:0,
                queryId:this.$route.query.id,
                relations:[
                    {text:'本人',value:1},
                    {text:'父母',value:2},
                    {text:'子女',value:3},
                    {text:'其它',value:4},
                ],
                cativeList:[],
                areaList:areaList,
                showAll:false,
                minDate: new Date(1950, 1, 1),
                currentDate: new Date(2000, 0, 1),
                show: true,
                userInfo: {
                    vip: 1,
                    area:[
                        '',
                        '',
                        '',
                    ]
                },
                vipList: '',
                columns: [],
                selectVipIndex: ''
            }
        },
        created(){
            // window.document
            // window.addEventListener("scroll", this.handleScroll);
            if (this.$route.query.id !== undefined){
                this.edid()
            }

        },
        methods: {
            selectVip() {
                let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
                let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                if (!myreg.test(this.userInfo.mobile)){
                    this.$toast('请填写正确的手机号码')
                    setTimeout(() => {
                      this.userInfo.vip = 1
                    }, 50)
                    this.userInfo.mobile = ''
                    return
                }
                if (!idcardReg.test(this.userInfo.custody_identity)){
                    this.userInfo.custody_identity = ''
                    this.$toast('身份证不合法')
                    setTimeout(() => {
                      this.userInfo.vip = 1
                    }, 50)
                    return
                }
                let _data = {
                    name: this.userInfo.name,
                    mobile: this.userInfo.mobile,
                    custody_identity: this.userInfo.custody_identity
                }
                this.$axios.get('external_api/vip_info',_data).then(res=>{
                    console.log(res)
                    if (res.data.errcode == 0) {
                        this.vipList = res.data.data
                        this.columns = []
                        for (let i = 0; i < this.vipList.length; i++) {
                          this.columns.push(`${this.vipList[i].CustomerName}(${this.vipList[i].LevelName.split("（")[0]})`)
                        }
                        this.showAll = 4
                        console.log("this.columns", this.columns)
                    } else {
                        this.$toast(res.data.msg)
                        setTimeout(() => {
                          this.userInfo.vip = 1
                        }, 50)
                    }
                })
            },
            onConfirm(item, index) {
                console.log(item, index)
                this.selectVipIndex = index
                this.showAll = false
            },
            handleScroll(){
               this.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

            },
            input(e){
              if (e.length >= 11){
                  this.userInfo.mobile = e.substr(0, 11)
              }
            },
            focus(){
                this.handleScroll()
            },
            edid(){
                this.$axios.get('Consulting/getPatientInfo',{id:this.$route.query.id}).then(res=>{

                    let item = res.data.data
                    console.log(item)
                    this.$set(this.userInfo,'name',item.name)
                    this.$set(this.userInfo,'sex',item.sex)
                    this.$set(this.userInfo,'date_of_birth',item.date_of_birth)
                    this.$set(this.userInfo,'custody_name',item.custody_name)
                    this.$set(this.userInfo,'mobile',item.mobile)
                    this.$set(this.userInfo,'custody_identity',item.custody_identity)
                    this.$set(this.userInfo,'describe',item.describe)
                    if (item.card_name) this.userInfo.vip = 2
                    // this.userInfo.date_of_birth = item.date_of_birth
                    // for (let item of this.relations){
                    //     if (item.value == item.relations){
                    //         // this.userInfo.relationship = item
                    //         this.$set(this.userInfo,'relationship',item)
                    //     }
                    // }
                    // console.log(this.userInfo)

                })
            },
            blur(){
                console.log(this.scrollTop)
                document.documentElement.scrollTop = 0
                document.documentElement.scrollTop = this.scrollTop;
                window.pageYOffset = this.scrollTop;
                document.body.scrollTop = this.scrollTop;
            },
            getTime(date){
                this.showAll=false
                this.userInfo.date_of_birth = this.$moment(date).format('YYYY-MM-DD')

            },
            getArea(item){
                console.log(item)
                this.showAll=false
                this.userInfo.area = item
            },
            getRelations(item){
                this.showAll=false
                this.userInfo.relationship = item
            },
            onChange(picker, values) {
                picker.setColumnValues(1, citys[values[0]]);
            },
            addFillout() {
                //验证表单
                let verifi = verification(this.userInfo)
                if ( verifi !== '1000') {
                    this.$toast(verifi);
                    return
                }
                if (this.queryId !== undefined){
                    this.$axios.post('Consulting/editPatient',this.$Qs.stringify({
                        id:this.queryId,
                        name:this.userInfo.name,
                        date_of_birth:this.userInfo.date_of_birth,
                        // province_id:this.userInfo.area[0].code,
                        // city_id:this.userInfo.area[1].code,
                        // district_id:this.userInfo.area[2].code,
                        sex:this.userInfo.sex,
                        custody_name:this.userInfo.custody_name,
                        mobile:this.userInfo.mobile,
                        describe:this.userInfo.describe,
                        custody_identity:this.userInfo.custody_identity,
                        card_name: (this.userInfo.vip == 2 && this.vipList[this.selectVipIndex]).LevelName || '',
                        card_no: (this.userInfo.vip == 2 && this.vipList[this.selectVipIndex]).CardNo || '',
                        blh: (this.userInfo.vip == 2 && this.vipList[this.selectVipIndex]).BLH || ''
                    })).then(res=>{
                        console.log(res)
                        if (res.data.msg === 'ok'){
                            this.$toast.success('修改成功');
                            this.$router.go(-1);
                        }
                    })
                    return
                }

                this.$axios.post('Consulting/addPatient',this.$Qs.stringify({
                    user_id:sessionStorage.user_id,
                    name:this.userInfo.name,
                    date_of_birth:this.userInfo.date_of_birth,
                    // province_id:this.userInfo.area[0].code,
                    // city_id:this.userInfo.area[1].code,
                    // district_id:this.userInfo.area[2].code,
                    sex:this.userInfo.sex,
                    custody_name:this.userInfo.custody_name,
                    mobile:this.userInfo.mobile,
                    describe:this.userInfo.describe,
                    custody_identity:this.userInfo.custody_identity,
                    card_name: (this.userInfo.vip == 2 && this.vipList[this.selectVipIndex].LevelName) || '',
                    card_no: (this.userInfo.vip == 2 && this.vipList[this.selectVipIndex].CardNo) || '',
                    blh: (this.userInfo.vip == 2 && this.vipList[this.selectVipIndex].BLH) || ''
                })).then(res=>{
                    if (res.data.msg === 'ok'){
                        // if (this.$route.query.title ==='图文咨询'){
                        //     this.$router.push({path:'/consult/personal/privatechat',query:{id:this.$route.query.id,avatar:this.$route.query.avatar}})
                        // }else {
                            this.$toast.success('添加成功');
                            this.$router.go(-1);
                        // }

                    } else {
                        this.$toast.fail('信息消失了');
                    }

                })
                console.log(this.userInfo)
            }
        },
        watch:{

        }
    }
</script>

<style scoped lang="scss">

    /*.fade-f-enter-active, .fade-f-leave-active {*/
    /*    transition: all .4s ease;*/
    /*}*/

    /*.fade-f-enter, .fade-f-leave-active {*/
    /*    transform: translateY(100%);*/
    /*    opacity: 1*/
    /*}*/
    input::-webkit-input-placeholder {
        font-size: .28rem;
        color: #a7a8a8;
    }
    textarea::-webkit-input-placeholder{
        color: #a7a8a8;
    }

    .prompt {
        background: url("../../assets/reservation/newTopBg.png");
        background-size: cover;
        padding: .3rem;

        p {
            background: url("../../assets/fillout/gantan.png") no-repeat;
            background-size: .8rem;
            background-position: left;
            padding-left: 1rem;
            line-height: 0.4rem;
            color: white;
            font-size: .35rem;
            font-weight: 200;

            span {
                font-weight: 400;
            }
        }
    }

    .fillout {
        .spanBtn {
            padding: 0 .3rem;

            p {
                color: #4d8fec;
                font-size: .3rem;
                font-weight: 200;

                span {
                    font-weight: 400;
                    color: #09aba7;
                }
            }

            > span {
                text-align: center;
                display: block;
                margin: .5rem auto;
                width: 2.5rem;
                line-height: .75rem;
                background: linear-gradient(321deg, #4d8fec 0%, #4d8fec 100%);
                color: white;
                border-radius: .1rem;
                box-shadow: 0 3px 5px rgba(1, 189, 186, 0.5);
            }
        }

        > p {
            padding-left: .3rem;
            margin-top: .3rem;
            font-size: .35rem;
        }

        .patient-form {
            /*line-height: 1.2rem;*/
            margin: 0.3rem;
        }

        label {
            margin-bottom: .4rem;
            display: flex;
            align-items: center;
            font-size: 0.32rem;
            color: #a9aaab;
            textarea{
                color: #4c4c4c;
                background-color: #eff1ef;
                border-radius: .1rem;
                border: none;
                width: calc(75% - .2rem);
                resize:none;
                height: 2rem;
                padding: .2rem;
                font-size: .28rem;
            }

            span {
                display: inline-block;
                width: 25%;
            }
            span+span{
                color: #4c4c4c;
                display: block;
                height: .45rem;
                line-height: .45rem;
                width: calc(75% - 0.2rem);
                background-color: #eff1ef;
                border-radius: .1rem;
                padding: .2rem
            }
        }

        input[type='text'],input[type='number'] {
            color: #4c4c4c;
            width: calc(75% - 0.2rem);
            border: none;
            border-radius: 5px;
            background: #eff1ef;
            height: 0.45rem;
            line-height: .45rem;
            padding: .2rem;
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
    }
</style>