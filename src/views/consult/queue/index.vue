<template>
<!--    挂号科室选择-->
    <div>
        <section style="text-align: center">
            <label>
                <input placeholder="搜索科室" type="text">
            </label>
        </section>
        <section class="consult-studio">
            <div v-for="(item,key) of items" :key="key" @click="goTo(item.id)">
                    <span class="studio-bg">
                        <span>
                            <img :src="item.img_url" alt="icon">
                        </span>
                        {{item.name}}
                    </span>
            </div>
        </section>
    </div>
</template>

<script>

    export default {
        name: "index",
        data(){
            return{
                items:[], //科室列表
            }
        },
        created(){
          this.getStudio();
        },
        methods:{
            goTo(index){
                //跳转科室挂号页面
                this.$router.push({path:'/consult/queue/bespeak',query:{id:index}})
            },
            getStudio() {
                //获取科室
                this.$axios.get('Patient/departmentClass').then(res => {
                    if (res.data.code === 200){
                        this.items = res.data.department_class;
                    } else {
                        this.$toast.fail('服务器繁忙');
                    }

                })
            },
        }
    }
</script>

<style scoped lang="scss">
    input[type='text']{
        border-radius: .6rem;
        border:1px #eff1ef solid;
        width: 80%;
        line-height: .6rem;
        background-image: url("../../../assets/search.png");
        background-repeat: no-repeat;
        background-position: .2rem;
        padding-left: .7rem;
        margin-top: .3rem;
    }
    .consult-studio {
        margin: .15rem;
        div {
            display: inline-block;
            text-align: center;
            min-width: calc(100% / 3);
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
                top: .15rem;
                bottom: .15rem;

                span {
                    border-radius: 50%;
                    display: block;
                    background-color: rgba(255, 255, 255, 0.4);
                    height: 0.6rem;
                    width: 0.6rem;
                    margin-left: calc(50% - 0.3rem);
                    margin-top: 10%;

                    img {
                        width: 0.4rem;
                        height: 0.35rem;
                        margin-top: calc(50% - 0.175rem);
                    }
                }
            }
        }
    }
    .std-box{

    }
</style>