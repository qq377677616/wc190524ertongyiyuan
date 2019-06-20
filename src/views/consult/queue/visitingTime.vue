<template>
    <div style="height: 100%">
        <section class="doctor-info">
            <div id="left">
                <div class="avatar"></div>
                <div class="info">
                    <p>
                        <span>张讲过</span>
                        <span> 主任医师</span>
                    </p>
                    <p>已挂号：200</p>
                </div>
            </div>
            <i id="right" class="el-icon-arrow-right"></i>
        </section>
        <transition name="fade" mode="out-in">
        <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "visitingTime"
    }
</script>

<style scoped lang="scss">
.doctor-info{
    height: 1.6rem;
    background: url("../../../assets/consult/BG.png") no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .2rem .3rem;
    #right{
        font-size: .4rem;
        color: white;
    }

    #left{
        display: flex;
        align-items: center;
        .avatar{
            background-color: white;
            border-radius: 50%;
            height: 1.4rem;
            width: 1.4rem;
            margin-right: .2rem;
        }
        .info{
            p{
                font-size: .25rem;
                color:white;
                font-weight:200;
                :nth-child(1){
                    font-weight: 400;
                    font-size: .35rem;
                }
            }
        }
    }
}
</style>