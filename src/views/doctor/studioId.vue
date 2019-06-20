<template>
    <div class="studioId">
        <p>工作室介绍</p>
        <section>
            <p class="title">{{studioInfo.title}}</p>
            <p>{{studioInfo.content}}</p>
            <div>
                <img v-for="item of studioInfo.img_path_arr" :src="item" alt="">
<!--                <img :src="studioInfo.img_path_arr[1]" alt="">-->
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "studioId",
        data(){
            return{
                studioInfo:[],
            }
        },
        created(){
          this.getStudioInfo();
        },
        methods:{
            getStudioInfo(){
                this.$axios.post('Doctor/clinicDetails',this.$Qs.stringify({
                    doctor_id:'1',
                    type:1
                })).then(res=>{
                    console.log(res)
                    this.studioInfo = res.data.data
                })
            }
        }
    }
</script>

<style scoped lang="scss">
.studioId{
    >p{
        line-height: 1rem;
        text-align: center;
        background: linear-gradient(to bottom right, #4ae2df, #02bdb9);
        color: white;

    }
    section{
        /*padding: .3rem;*/
        padding: .15rem;

        .title{
            font-size: .35rem;
            color: #4c4c4c;
        }
        p{
            padding: 0 .15rem .2rem .15rem;
            font-size: .28rem;
        }
        div{
            display: flex;
            img{
                /*box-sizing:border-box;*/
                display: block;
                width: calc((100% - .6rem) / 2);
                background: #00b5bd;
                height: 3rem;
                margin: 0 .15rem;

                border-radius: .1rem;
            }
        }
    }
}
</style>