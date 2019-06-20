<template>
    <!--    咨询选择-->
    <div class="advisory-select">
        <div @click="selectIndex(item.name)" class="box" v-for="(item,key) in items" :key="item.name"
             :class="item.name===activeBox?'active-box':''">
            <span class="icon"><img :src="item.icon" alt=""></span>
            <p>{{item.name}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "consultancy",
        data() {
            return {
                activeBox: '图文咨询',
                items: [
                    {name: '图文咨询', icon: require('../../assets/advisorySelect/zhiming.png')},
                    {name: '视频咨询', icon: require('../../assets/advisorySelect/zhuanjia.png')},
                    {name: '电话咨询', icon: require('../../assets/advisorySelect/tuandui.png')},
                ]
            }
        },
        methods: {
            selectIndex(item) {
                this.$router.push({path:'/consult/registered/phoneservice',query:{title:item,studio:this.$route.query.studio,id:this.$route.query.id}});
                this.activeBox = item
            }
        }
    }
</script>

<style scoped lang="scss">
    /*.active-box {*/
    /*    background:  !important;*/
    /*    box-shadow: 0 5px 5px rgba(1, 189, 184, 0.2);*/
    /*    !important;*/
    /*}*/

    .advisory-select {
        /*position: absolute;*/
        /*top: 0;*/
        width: 100%;
        /*margin-top: 2rem;*/
        /*bottom: 0;*/
        /*width: 100%;*/
        .box {
            margin: .6rem auto;
            width: 90%;
            padding: .25rem 0;
            background: linear-gradient(to bottom right, #4ae2df, #02bdb9);
            text-align: center;
            border-radius: 5px;
            color: white;
            box-shadow: 0 5px 5px rgba(1, 189, 184, 0.2);
                    /*margin-bottom: .6rem;*/
            .icon {
                margin-left: calc(50% - .325rem);
                margin-bottom: .1rem;
                display: block;
                width: .75rem;
                height: .75rem;
                background: #fbfbfb;
                border-radius: 50%;

                img {
                    width: 50%;
                    height: 40%;
                    margin-top: calc(50% - 20%);
                }
            }
        }
    }

</style>