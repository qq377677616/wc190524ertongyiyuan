<template>
    <div>
        <section class="title">
            预约时间段
            <span @click="subInfo">确认</span>
        </section>
    <div class="period-dataTime">
        <p
                @click="activeTimer = item"
                :class="{'active-timer':activeTimer === item}"
                v-for="item of timer">{{item.sjd}}
<!--            <span>-</span> 15:52-->
        </p>
    </div>
    </div>
</template>

<script>
    export default {
        props:['identifier'],
        name: "periodDialog",
        data(){
            return{
                activeTimer:null,
                timer:[]
            }
        },
        created(){
          this.getPbTime();
        },
        methods:{
            subInfo(){
                this.$emit('subInfo',{std:2,obj:this.activeTimer})
            },
            getPbTime(){
                this.$axios.get('Consulting/getPbTime',{plan_id:this.identifier}).then(res=>{
                    console.log(res)
                    this.timer = res.data.data
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .active-timer{
        background: white !important;
        box-shadow: 0 0 5px 2px rgba(77, 143, 236,0.3);
    }
    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: .9rem;
        padding: 0 .3rem;
        background: #4d8fec;
        color: white;
        text-align: center;
        font-size: .3rem;

        :nth-child(2),:nth-child(1) {
            line-height: .6rem;
            background: linear-gradient(to bottom right, #4d8fec, #4d8fec);
            padding: 0 .2rem;
            border-radius: .1rem;
            box-shadow: 0 0 5px 2px rgba(75, 75, 75, 0.1);
        }
    }
.period-dataTime{
    position: absolute;
    top: .9rem;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: .3rem;
    text-align: center;
    overflow: auto;
    p{
        color: #4c4c4c;
        padding: .2rem 0;
        background-color: #eff1ef;
        border-radius: .1rem;
        margin-bottom: .3rem;
        span{
            padding: 0 .3rem;
        }
    }
}
</style>