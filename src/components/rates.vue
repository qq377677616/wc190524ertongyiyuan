<template>
    <div>
        <div>
            <i :style="rateStyle"
               v-for="item of rateNum"
               :class="['el-icon-star-on',item <=activeNum?'active':'star-off']">
            </i>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            size: String,
            //默认显示几个星
            listNum:{
              type:Number,
              default: 5
            },
            //默认选中几颗星
            num: {
                type: Number,
                default: 3
            }
        },
        name: "rates",
        data() {
            return {
                //选中几个
                activeNum: this.num,
                //一共几颗星
                rateNum:this.listNum,
                //设置大小
                rateStyle:{
                    'font-size':this.size
                }
            }
        }
    }
</script>

<style scoped>
    i {
        font-size: .4rem;
        transform: scale(1.25);

    }
    .star-off{
        color: #e1e2e3;
    }
    .active {
        color: #4d8fec;
        /*transform: scale(1.25);*/
    }
</style>