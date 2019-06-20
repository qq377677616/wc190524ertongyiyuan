<template>
<div>
    <div class="mySelect" v-show="show">
    </div>
    <transition name="fade-select">
        <section v-show="show"  class="consult-studio-box">
            <article class="consult-studio" :key="1">
                <section  class="registered-box"  v-for="(item,key) of registeredList" :key="key" @click="goTo(item.id)">
                    <article class="registered-title" :class="{'active-std':jumpId === item.id}">
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
                    </article>
                </section>
            </article>
            <article  class="btn" :key="2">
                <span @click="isShow" class="btn-off">取消</span>
                <span @click="jump" class="btn-on" >确认</span>
            </article>
        </section>


    </transition>


</div>
</template>

<script>
    import myPersonal from '../../components/progress'
    import myRate from '../../components/rates'
    export default {
        components:{
            myPersonal,
            myRate
        },
        props:['show','studio'],
        name: "mySelect",
        data() {
            return {
                jumpId:null,
                kfc:false,
                registeredList: [
                    // {name: '口腔', icon: require('../../assets/consult/kouqiang.png')},
                    // {name: '儿保', icon: require('../../assets/consult/erbao.png')},
                    // {name: '耳鼻喉', icon: require('../../assets/consult/erbihou.png')},
                    // {name: '眼科', icon: require('../../assets/consult/yanke.png')},
                    // {name: '儿内科', icon: require('../../assets/consult/erneike.png')},
                    // {name: '过敏', icon: require('../../assets/consult/guomin.png')}
                ],
            }
        },
        created(){
            this.getRegistered()
        },
        methods:{
            jump(){
            //    切换
                if (this.jumpId === null){
                    return
                }
                this.$emit('replace',this.jumpId);
                this.$emit('update:show',false);
            },
            goTo(index){
                console.log(index);
                this.jumpId = index
            },
            isShow(){
                this.$emit('update:show',false);
            },

            getRegistered(){
                this.$axios.get('Patient/departmentList',{department_class_id:this.studio}).then(res=>{
                    console.log(res.data.data);
                    this.registeredList = res.data.data
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .fade-select-enter-active, .fade-select-leave-active {
        transition: all .4s ease;
    }

    .fade-select-enter,.fade-select-leave-active  {

        transform: translateY(-100%);
    }

    .active-std{
        border-right:.1rem #00b5bd solid;
    }
    .registered-box {
        padding: .3rem .3rem .3rem .3rem;
        /*margin-bottom: 10px;*/
        background: white;
        border-bottom: .1rem #f4f5f6 solid;
        overflow: auto;

    }

    .registered-title {
        position: relative;
        display: flex;
        align-items: center;

        .title-n1 {
            display: block;
            width: 1.7rem;
            height: 1.7rem;
            background: bisque;

            img{
                border-radius: .1rem;
                width: 100%;
                height: 100%;
            }
        }

        .title-n2 {
            line-height: .5rem;

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
/*.box-tran{*/

/*    */
/*}*/
    .btn {
        /*border-top: 1px rgba(1,189,186,.5) solid;*/
        box-shadow:0 -2px 9px 1px rgba(1,189,186,.2);
        background-color: white;
        height: 1.2rem;
        align-items: center;
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;

        span {
            height: .8rem;
            line-height: .8rem;
            text-align: center;
            margin:0 .5rem;
            display: block;
            width: 50%;
            border-radius: 5px;
            font-size: 0.35rem;
            /*box-shadow: 0 5px 5px rgba(1, 189, 184, 0.2);*/
        }
        .btn-off {
            border: 1px #00b5bd solid;
            background: white;
            color: #00b5bd;

        }

        .btn-on {
            border: none;
            color: white;
            background: linear-gradient(to bottom right, #93dddc, #00b5bd);
        }
    }
    .active-st{
        background-color: white !important;
        border:1px #4ed1ce solid;
    }
    .consult-studio-box{
        position: absolute;
        background: white;
        top: 0;
        width: 100%;
        padding-top: .2rem;
        height: 50vh;

    }
    .consult-studio {
        overflow: auto;
        position: absolute;
        top: 0;
        bottom: 1.2rem;
        width: 100%;
        /*padding-top: .2rem;*/
        div {
            display: inline-block;
            /*text-align: center;*/
            /*min-width: calc(100% / 3);*/
            height: 1.7rem;
            position: relative;

            .studio-bg {
                display: block;
                position: absolute;
                border-radius: .1rem;
                background-color: rgb(245, 245, 245);
                color: #858585;
                font-size: 0.3rem;
                left: .15rem;
                right: .15rem;
                top: .1rem;
                bottom: .15rem;

                span {
                    border-radius: 50%;
                    display: block;
                    background-color: rgba(255, 255, 255, 0.4);
                    height: 0.6rem;
                    width: 0.6rem;
                    margin-left: calc(50% - 0.3rem);
                    margin-top: 8%;

                    img {
                        width: 0.4rem;
                        height: 0.4rem;
                        margin-top: calc(50% - 0.2rem);
                    }
                }
            }
        }
    }

    .mySelect {
        position: fixed;
        top: 0;
        width: 100%;
        bottom: 0;
        background: rgba(1, 1, 1, 0.5);
    }

</style>