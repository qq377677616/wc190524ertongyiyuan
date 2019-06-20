<template>
    <div class="registered">
        <section class="search">
            <!-- 搜索框 -->
            <label>
                <input v-model="searchValue" type="text" class="search ">
            </label>
        </section>
        <transition-group name="fade-std-list">
        <section  class="registered-box"  v-for="(item,key) of searchList" :key="key" @click="goTo(item.id)">
            <article class="registered-title">
                <div class="title-n1">
                    <img :src="item.avatar" alt="">
                </div>
                <div class="title-n2">
                    <div>
                        <h3>{{item.name}}</h3>
                        <p>一般等待时间：快</p>
                        <p>近两周回复数：99+</p>
                    </div>
                </div>
<!--                <span ">查看</span>-->
            </article>
            <article class="registered-star">
                <div class="personal-ws">
                    <div class="personal-ws-box">
                        <span class="left">疗效：</span>
                        <my-personal
                                :percent="87"
                                left-bg="#4ed1ce"
                                height="0.2rem"
                                width="100%"></my-personal>
                        <span class="right">满意</span>
                    </div>
                    <div style="width: .7rem"></div>
                    <div class="personal-ws-box">
                        <span class="left">态度：</span>
                        <my-personal
                                :percent="93"
                                left-bg="#4ed1ce"
                                height="0.2rem"
                                width="100%"></my-personal>
                        <span class="right">满意</span>
                    </div>
                </div>
            </article>
            <div class="my-rate" style="">
                <p>评星：</p>
                <my-rate size=".35rem"></my-rate>
            </div>
            <article class="comment">
                <p>评论：</p>
                <p>{{item.comment}}</p>
            </article>
        </section>
        </transition-group>

        <p v-show="searchList.length <=0">没有相关医生</p>
<!--        <div v-show="!mySelectDialog" class="switch" @click="mySelectDialog = true">切换</div>-->


<!--        <my-select @replace="getRegistered" :show.sync="mySelectDialog"></my-select>-->

    </div>
</template>

<script>
    import mySelect from './select'
    import myPersonal from '../../components/progress'
    import myRate from '../../components/rates'

    export default {
        name: "registered",
        components: {
            mySelect,
            myPersonal,
            myRate
        },
        data() {
            return {
                searchValue:'',
                value5: 3,
                mySelectDialog: false,
                registeredList:[]
            }
        },
        created(){
            console.log(this.$route.query.id);
            this.getRegistered(this.$route.query.id)
        },
        methods: {

            goTo(id) {
                this.$router.push({path: '/consult/registered/doctordetails',query:{id:id,department_class_id:this.$route.query.id}})
            },
            getRegistered(nid = null){
                console.log(nid)
                this.$axios.get('Patient/departmentList',{department_class_id:nid}).then(res=>{
                    console.log(res.data.data);
                    this.registeredList = res.data.data
                })
            }
        },
        watch:{
            // searchValue(){
            //     console.log(this.searchValue)
            // }
        },
        computed:{
            searchList(){
                let list = [];
                if (this.searchValue.length > 0){
                    for (let item of this.registeredList){
                        if (item.name.includes(this.searchValue)){
                            list.push(item)
                        }
                    }
                } else {
                    list = this.registeredList
                }
                return list
            }
        }
    }
</script>

<style scoped lang="scss">
    .fade-std-list-enter-active {
        transition: all .3s ease;
    }
    .fade-std-list-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .fade-std-list-enter, .fade-std-list-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateY(-10px);
        opacity: 0;
    }

    h3{
        font-weight: 400;
        color: #4c4c4c;
    }
    .comment{
        font-size: 0.3rem;
        color: #01bdbb;
        p:nth-child(2){
            padding-top: .05rem;
            color: #a7a8a8;
            font-size: .25rem;
        }
    }
    .my-rate {
        display: flex;
        align-items: center;
        font-size: 0.3rem;
        line-height: .8rem;
        color: #4c4c4c;
    }

    .personal-ws {
        padding-top: .2rem;
        display: flex;
        width: 100%;
        height: .5rem;

        .personal-ws-box {
            width: 100%;
            display: flex;
            align-items: center;
            color: #4c4c4c;

            .left {
                width: .95rem;
                font-size: .3rem
            }

            .right {
                text-align: right;
                width: .7rem;
                font-size: .3rem;
                color: #45cac6
            }
        }
    }

    input.search {
        display: block;
        border: none;
        margin: .3rem auto;
        border-radius: 30px;
        background-color: rgba(233, 233, 233, 0.7);
        width: 76%;
        line-height: 0.6rem;
        height: 0.6rem;
        padding-left: 30px;
        background-image: url("../../assets/search.png");
        background-size: 0.2rem 0.2rem;
        background-repeat: no-repeat;
        background-position: center;
        background-position-x: 10px;

    }

    .switch {
        z-index: 2000;
        font-size: .3rem;
        height: 1.3rem;
        width: 1.3rem;
        position: fixed;
        margin: 0 auto;
        background: linear-gradient(to bottom right, #93dddc, #00b5bd);
        box-shadow: 0 4px 8px rgba(106, 188, 186, 0.6);
        bottom: 0.5rem;
        border-radius: 50%;
        line-height: 1.3rem;
        text-align: center;
        color: white;
        left: calc(50% - 0.65rem)
    }

    .registered {
        >p{
            text-align: center;
            margin-top: 30%;
            font-size: .5rem;
            color: #a1a7a8;
        }
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        /*width: 100%;*/
        -webkit-overflow-scrolling: touch;
        overflow: auto;
        height: 100%;
        /*position: relative;*/
    }

    .registered-box {
        padding: .1rem .3rem .3rem .3rem;
        margin-bottom: 10px;
        background: white;
        border-bottom: .1rem #f4f5f6 solid
    }

    .registered-title {
        position: relative;
        display: flex;

        .title-n1 {
            /*display: block;*/
            width: 1.8rem;
            height: 1.8rem;
            background: bisque;

            img{
                border-radius: .1rem;
                width: 100%;
                height: 100%;
            }
        }

        .title-n2 {

            height: 1.8rem;

            h3 {
                font-size: .35rem;
            }

            div {
                height: 80%;
                /*margin-top: calc(50% - 40%);*/
                margin-left: .2rem
            }

            p {
                margin-top: 5px;
                font-size: .25rem;
                color: #b9babb;
            }
        }

        span {
            position: absolute;
            right: 0;
            top: .1rem;
            background: linear-gradient(to bottom right, #93dddc, #00b5bd);
            box-shadow: 0 5px 4px rgba(106, 188, 186, 0.2);
            padding: 0.1rem;
            width: 1.2rem;
            text-align: center;
            border-radius: 5px;
            color: white;
            font-size: .3rem;
        }
    }

    .registered-star {
        line-height: 0.8rem;

        .score {
            display: flex;
            align-items: center;
        }
    }
</style>