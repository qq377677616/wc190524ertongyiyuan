<template>
    <!--    咨询选择-->
    <div class="advisory-select">
        <div @click="selectIndex(item.name)" class="box" v-for="item in items" :key="item.name"
             :class="item.name===activeBox?'active-box':''">
            <span class="icon"><img :src="item.icon" alt=""></span>
            <p>{{item.name}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "advisorySelect",
        props:['studio'],
        data() {
            return {
                activeBox: '知名专家',
                items: [
                    {name: '知名专家', icon: require('../../assets/advisorySelect/zhiming.png')},
                    {name: '专家', icon: require('../../assets/advisorySelect/zhuanjia.png')},
                    {name: '专家团队', icon: require('../../assets/advisorySelect/tuandui.png')},
                ]
            }
        },
        methods: {
            selectIndex(item) {
                console.log(this.studio)
                this.activeBox = item
                switch (item) {
                    case '知名专家':
                        this.$router.push({path:'/consult/registered/doctors'});
                        break;
                    case '专家':
                        break;
                    case '专家团队':
                        this.$router.push({path:'/consult/registered/consultancy',query:{studio:this.studio}});
                        break;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .active-box {
        background: linear-gradient(to bottom right, #4ae2df, #02bdb9) !important;
        box-shadow: 0 5px 5px rgba(1, 189, 184, 0.2);
        color: white !important;
    }

    .advisory-select {
        /*position: absolute;*/
        /*top: 0;*/
        font-size: .3rem;
        width: 100%;
        /*margin-top: 2rem;*/
        /*bottom: 0;*/
        /*width: 100%;*/
        .box {
            margin: .6rem auto;
            width: 90%;
            padding: .25rem 0;
            background: #f5f5f5;
            text-align: center;
            border-radius: 5px;
            color: #5b5b5b;
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