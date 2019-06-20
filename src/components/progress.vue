<template>
    <section class="progress-wrapper" :style="wrapStyle">
        <div class="progress" :style="pBarStyle">
            <div class="left" :style="leftStyle"></div>
        </div>
        <span style="font-size: .25rem;color: #45cac6;padding-left: 5px">{{leftStyle.width}}</span>
    </section>
</template>

<script>
    export default {
        name: "myprogress",
        props:{
            leftBg: String,
            bgc: String,
            ballBgc: String,
            height: String,
            width: String,
            percent: {
                type: Number,
                default: 10,
            }
        },
        data(){
            return{
                wrapStyle: {
                    'width': this.width,
                },
                pBarStyle: {
                    'backgroundColor': this.bgc,
                    'height': this.height,
                    'width':this.width
                },
                leftStyle: {
                    'width': this.percent + '%',
                    'background': this.leftBg,
                    'height': this.height,
                },
                // ballStyle: {
                //     'backgroundColor': this.ballBgc,
                //     'height': this.height,
                //     'width': this.width,
                //     'borderRadius': parseInt(this.height) / 2 + 'px',
                //     'right': - parseInt(this.height) / 2 + 'px',
                // },
                // // 标记是否按下鼠标
                // isMouseDownOnBall: false,
                // // 鼠标进body时是否是mousedown
                // isMouseDownOnBody: false,
                // // 鼠标离开进度条时的clientX
                // outProgressClientX: 0,
                // 主要用于防止一个页面内有多个本组件，MouseMove时互相影响而设置的字段
                isCurrentProgress: false,
            }
        }
    }
</script>

<style scoped>
    .progress-wrapper{
        flex: 1;
        /*width:100%;*/
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .progress{

        width:100%;
        height:20px;
        border-radius: 10px;
        background-color: #e1e2e3;
        overflow: hidden;
        cursor: pointer;
    }
    .left{
        height:100%;
        width: 30%;
        border-radius: 10px;
        background-color: greenyellow;
        /*position: relative;*/
    }
    .ball{
        height:100%;
        width:20px;
        -webkit-border-radius:10px;
        -moz-border-radius:10px;
        border-radius:10px;
        background-color: red;
        position: absolute;
        right: -10px;
    }
</style>