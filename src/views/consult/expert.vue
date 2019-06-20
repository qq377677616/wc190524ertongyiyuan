<template>
    <div>
        <section v-for="item in [1,2,3,4,5]" :key="item">
            <article class="registered-title" >
                <div class="title-n1">
                    <img src="" alt="">
                </div>
                <div class="title-n2">
                    <div style="height: 80%;margin-left: 10px">
                        <span style="font-size: 20px">湘雅医院牙科</span>
                        <p>
                            <span class="tag">团队人数</span> 4人 </p>
                        <p>   <span class="tag">领衔专家</span> 张建国 </p>
                        <span class="ck">查看</span>
                    </div>
                </div>
                <div>

                </div>
            </article>
            <article style="display: flex;margin-top: 10px;height: 1.4rem;">
                <span style="width: 4.5rem">团队擅长:</span>
                <span style="color: #b9babb;text-overflow: ellipsis;overflow:hidden;-webkit-line-clamp: 3; -webkit-box-orient: vertical;display: -webkit-box;">深刻的分解落实反馈及时离开对方就是看到了飞机上看到浪费时间快递费水电费沙发沙发斯蒂芬对方水电费水电费</span>
            </article>
        </section>
    </div>
</template>

<script>
    export default {
        name: "expert"
    }
</script>

<style scoped lang="scss">
    section{
        padding: 20px;
        margin-bottom: 5px;
        background: white;
    }

    .registered-title {
        position: relative;
        display: flex;

        .title-n1 {
            width: 3rem;
            height: 3rem;
            background: bisque;
            border-radius: 5px;

        }

        .title-n2 {
            height: 3rem;
            line-height: 0.75rem;

            p {
                /*margin-top: 5px;*/
                font-size: 14px;
                color: #b9babb;
            }
            .tag{
                background: rgba(171,220,219,0.4);
                padding: 3px 8px;
                border-radius: 15px;
                margin-right: 10px;
                color: #01bdb8;
                font-size: 0.2rem
            }
            .ck{
                background: linear-gradient(to bottom right,#93dddc, #00b5bd);
                box-shadow:0 5px 4px rgba(106,188,186,0.2);
                padding: 0.05rem 0.3rem;
                width: 1.2rem;
                text-align: center;
                border-radius: 5px;
                color: white;
            }
        }

    }

</style>