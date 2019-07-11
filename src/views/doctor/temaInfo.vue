<template>
    <div id="index">

        <div class="rowBox" v-for="(item,key) of notAduitdoc" :key="key">
            <div class="imgLeft" :style="`background-image:url(${item.avatar})`">
                <div></div>
<!--                {{item}}-->
<!--                <img src="../assets/logo.png"/>-->
            </div>
            <div class="infoRight">
                <div class="first_row">
                    <span class="useName">{{item.real_name}}</span>
                    <span class="zhiwei">{{item.level}}</span>
                    <button class="agree" @click="audit(key,item.id)">同意</button>
                </div>
                <div class="first_row tipBox">
                    <span class="tips">京都儿童医院</span>
                    <span class="tips">儿童牙科科室</span>
                </div>
                <div>
                    申请时间:{{item.create_time}}
                </div>
            </div>
        </div>
        <div v-show="isShow" style="text-align: center;margin-top: 30%;font-size: .8rem;color: #a1a7a8">
            暂无申请
        </div>
    </div>
</template>

<script>
    export default {
        name:'temaInfo',
        data(){
            return{
                notAduitdoc:[],
                isShow:false,
            }
        },
        created() {
            this.getNotAduitdoc()
        },
        methods:{
            audit(key,id){
                console.log(id)
                this.$axios.get('personinfo/audit',{team_building: this.$route.query.id,doctor_id:id}).then(res=>{
                    console.log(res)
                    if (res.data.msg === '审核通过'){
                        this.$toast.success('通过');
                        this.notAduitdoc.splice(key,1)
                    }
                })
            },
            getNotAduitdoc(){
                this.$axios.get('Doctor/applyDepartmentList',{doctor_id:sessionStorage.doctor_id}).then(res=>{
                    console.log(res.data.data)
                    // console.log(this.notAduitdoc.length)
                    if (res.data.data === undefined || res.data.data.length == 0){
                        this.isShow = true
                    }else {
                        console.log(1)
                        this.notAduitdoc = res.data.data;
                        console.log(this.notAduitdoc)
                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #index{
        /*background-color: #F4F4F4;*/
    }
    #index>.rowBox:not(:first-child){
        margin-top: 5px;
    }
    .rowBox{
        width: 100%;
        display: flex;
        align-items: center;
        padding:12px 15px;
        box-sizing: border-box;
        background-color: white;
        border-bottom:.1rem #eff1ef solid;
    }
    .rowBox .imgLeft{
        width: 1.6rem;
        height: 1.6rem;
        background: #00b5bd no-repeat;
        border-radius: .1rem;
        background-size: cover;
        /*background-color: salmon;*/
    }
    .rowBox .imgLeft img{
        width: 100%;
        height: 100%;
        border-radius:8px;
    }
    .infoRight{
        line-height: .5rem;
    }
    .rowBox .infoRight{
        flex: 1;
        padding-left: .2rem;
    }
    .useName{
        font-size: .3rem;
        border-right: 1px solid #dedede;
        padding-right: .2rem;
    }
    .zhiwei{
        font-size: .25rem;
        margin-left:.2rem;
        color: #999;
    }
    .agree{
        float: right;
        color: white;
        border:0;
        background-color: #40d6cc;
        width: 1.2rem;
        line-height: .5rem;
        border-radius: .1rem;
        outline: none;
        font-size: .3rem;
    }
    .tipBox{
        width: 100%;
    }
    .tipBox + div {
        font-size: .25rem;
    }
    .tipBox span{
        font-size: .2rem;
        background-color:#E5F8F8;
        color: #00928F;
        padding:2px .2rem;
        border-radius: .5rem;
    }
    .tipBox>span:not(:first-child){
        margin-left: .2rem;
    }
</style>