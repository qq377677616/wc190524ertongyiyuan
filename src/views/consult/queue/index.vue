<template>
<!--    挂号科室选择-->
    <div>
        <section style="text-align: center">
            <label>
                <input v-model="search" placeholder="搜索科室" type="text">
            </label>
        </section>
        <section class="consult-studio">
            <div v-for="(item,key) of getItems" :key="key" @click="goTo(item.id)">
                    <span class="studio-bg">
                        <!-- <img :src="item.img_url" alt="icon"> -->
                        <!-- <span>
                            <img :src="item.img_url" alt="icon">
                        </span> -->
                        <img :src="newImage[key]" alt="icon">
                        <p>{{item.name}}</p>
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
                search:'',
                items:[], //科室列表
                newImage:[
                    'bloodSpecialty','cardiology','respiratory','digestive',
                    'healthSection','dermatological','neurology','stomatology',
                    'otolaryngology','internalMedicine','surgery','ophthalmic',
                    'chineseMedicine','pediatrics','infectiousPatients','emergencyDepartment'
                ]
            }
        },
        created(){
          this.getStudio();
          this.newImage=this.newImage.map(function(item){
                return require(`../../../assets/newDepartmentsIcon/${item}.png`);
            })
        },
        methods:{
            goTo(id){
                //跳转科室挂号页面
                this.$router.push({path:'/consult/queue/bespeak',query:{id:id}})
            },
            getStudio() {
                //获取科室
                this.$axios.get('Patient/departmentClass',{user_id:12}).then(res => {
                    console.log(res);
                    if (res.data.code === 200){
                        this.items = res.data.department_class;
                    } else {
                        this.$toast.fail('服务器繁忙');
                    }

                })
            },
        },
        computed:{
            getItems(){
                const {search, items} = this
                let list = []
                if (search !== ''){
                    for (let item of items){
                        if (item.name.includes(search)) {
                            list.push(item)
                        }
                    }
                }else {
                    return items
                }
                return list
            }
        }
    }
</script>

<style scoped lang="scss">
    input[type='text']{
        border-radius: .6rem;
        border:1px #eff1ef solid;
        font-size: .32rem;
        width: 80%;
        line-height: .6rem;
        background-image: url("../../../assets/search.png");
        background-size: .3rem;
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
            height: 2rem;
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
                padding-top:.2rem;
                img {
                        width: .8rem;
                    }
            }
        }
    }
    .std-box{

    }
</style>