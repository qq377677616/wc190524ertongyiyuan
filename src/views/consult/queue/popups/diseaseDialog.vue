<template>
    <div>
        <section class="title">
            填写疾病信息
            <span @click="subInfo">确认</span>
        </section>
        <section style="text-align: center;padding: .3rem">
            <label>
                <textarea @blur="blur" @focus="focus" v-model="diseased" placeholder="请简要填写疾病信息"></textarea>
            </label>
        </section>
    </div>
</template>

<script>
    export default {
        name: "diseaseDialog",
        data(){
            return{
                scrollTop:0,
                diseased:''
            }
        },
        methods:{
            focus(){
                this.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            },
            blur(){
                document.documentElement.scrollTop = 0
                document.documentElement.scrollTop = this.scrollTop;
                window.pageYOffset = this.scrollTop;
                document.body.scrollTop = this.scrollTop;
            },
            subInfo(){
                this.$emit('subInfo',{std:3,obj:this.diseased})
            },
        }
    }
</script>

<style scoped lang="scss">
    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: .9rem;
        padding: 0 .3rem;
        background: #4ae2df;
        color: white;
        text-align: center;
        font-size: .3rem;

        :nth-child(2),:nth-child(1) {
            line-height: .6rem;
            background: linear-gradient(to bottom right, #4ae2df, #02bdb9);
            padding: 0 .2rem;
            border-radius: .1rem;
            box-shadow: 0 0 5px 2px rgba(75, 75, 75, 0.1);
        }
    }
    textarea{
        font-size: .28rem;
        border-radius: .1rem;
        border:1px #eff1ef solid;
        width: 100%;
        padding: .2rem;
        resize: none;
        height: 3.5rem;
        box-sizing: border-box;
        /*line-height: .6rem;*/
        /*background-image: url("../../../../assets/search.png");*/
        /*background-size: .3rem;*/
        /*background-repeat: no-repeat;*/
        /*background-position: .2rem;*/
        /*padding-left: .7rem;*/
        /*margin-top: .3rem;*/
    }
</style>