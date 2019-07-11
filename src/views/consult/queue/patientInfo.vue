<template>
    <div >
        <section class="visiting">
            <p>出诊地</p>
            <div>
                <p>{{doctorInfo.hospital_name}}</p>
                <p>{{doctorInfo.class_name}}</p>
            </div>
        </section>
        <section class="schedule-info" v-for="(item, key) of doctorInfo.pb_list" :key="key">
            <div>
                <p>{{item.cbrq}}</p>
                <span>{{item.type == 1?'普号':item.type == 2?'专家号':'特需号'}} 挂号费：{{item.price /100}}元</span>
            </div>
            <span @click="goTo(key)" :class="{'full':item.isFull}">{{item.isFull?'约满':'挂号'}}</span>
        </section>

    </div>
</template>

<script>
    export default {
        props:['doctorInfo'],
        name: "patientInfo",
        data() {
            return {
                // doctorInfo:{}
            }
        },
        created(){
          // this.getDoctorGh()
        },
        methods: {
            goTo(key) {
                this.$router.push({path: '/consult/queue/visitingtime/outpatient',query:{
                    index:key,
                        id:this.$route.query.id,
                        nid:this.$route.query.nid,
                        ghid:this.doctorInfo.pb_list[key].id
                }})
            },

        }
    }
</script>

<style scoped lang="scss">
    .full{
        background: #96999e !important;
        color: white;
    }
    .schedule-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .2rem .3rem;
        border-bottom: 1px #eff1ef solid;
        color: #4c4c4c;

        div {
            p {
                font-size: .35rem
            }

            span {
                font-size: .3rem
            }
        }

        > span {
            padding: .05rem .2rem;
            background: linear-gradient(to bottom right, #4ae2df, #02bdb9);
            color: white;
            border-radius: .1rem
        }
    }

    .visiting {
        display: flex;
        align-items: center;
        padding: .2rem .3rem;
        background-color: #eff1ef;

        > p {
            width: .4rem;
            margin-right: .2rem;
            color: #01bdbb;
            font-size: .3rem
        }

        div {
            :nth-child(1) {
                font-size: .35rem;
                font-weight: 600;
                color: #4c4c4c
            }

            :nth-child(2) {
                font-size: .3rem;
                color: #a1a7a8
            }
        }
    }
</style>