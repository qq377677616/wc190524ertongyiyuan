<template>
    <div>
        <section class="menu">
            <div>
                <span @click="activeMenu = 1" :class="{'active-menu':activeMenu === 1}">关注的医生</span>
            </div>
            <div>
                <span @click="activeMenu = 2" :class="{'active-menu':activeMenu === 2}">关注的工作室</span>
            </div>
        </section>
        <section v-show="activeMenu === 1" class="attention" v-for="(item, key) of atDoctors" :key="key"
                 @click="goToDoctor(item.id)">
            <article class="doctors-list">
                <img :src="item.avatar" alt="">
                <p>{{item.real_name}} <span>| {{item.level === '2'?'知名专家':'专家'}}</span></p>
                <!--                <p>{{item.describe}}</p>-->
                <span class="hh" @click.stop="attention(item.id,key)">取消关注</span>
            </article>
        </section>
        <section v-show="activeMenu === 2" class="attention" v-for="(item, key) of atStd" :key="item.real_name"
                 @click="goToStu(item.id,item.department_class_id)">
            <article class="doctors-list">
                <img :src="item.avatar" alt="">
                <p>{{item.name}} <span>| {{item.content}}</span></p>
                <!--                <p>{{item.describe}}</p>-->
                <span class="hh" @click.stop="attentionStd(item.id,key)">取消关注</span>
            </article>
        </section>
        <p class="toast" v-show="isShowToast">暂无关注</p>
    </div>
</template>

<script>
    export default {
        name: "attention",
        data() {
            return {
                atDoctors: [],
                atStd: [],
                activeMenu: 1,
            }
        },
        computed:{
          isShowToast(){
              const {activeMenu,atDoctors,atStd} = this
              switch (activeMenu) {
                  case 1:return atDoctors.length === 0
                  case 2:return atStd.length === 0
              }
          }
        },
        created() {
            this.getAtDoctors()
        },
        methods: {
            goToStu(id, classId) {
                this.$router.push({
                    path: '/consult/registered/doctordetails',
                    query: {id: id, department_class_id: classId}
                })
            },
            goToDoctor(id) {
                this.$router.push({path: '/consult/registered/knowndoctor', query: {id: id}})
            },
            getAtDoctors() {
                this.$axios.get('Patient/myFollow', {user_id: sessionStorage.user_id}).then((res) => {
                    console.log(res.data.data)
                    this.atDoctors = res.data.data.doctor;
                    let item=[]
                    for (let i in res.data.data.doctor){
                        item.push(res.data.data.doctor[i])
                    }
                    this.atDoctors =item
                    let std = [];
                    for (let i in res.data.data.department) {
                        std.push(res.data.data.department[i])
                    }
                    // console.log(std);
                    this.atStd = std;
                })
            },
            attention(id, key) {
                // console.log(this.atDoctors.splice(key,1))
                // console.log(this.atDoctors.splice())
                this.$axios.post('Patient/follow', this.$Qs.stringify({
                    user_id: sessionStorage.user_id,
                    to_id: id,
                    to_type: 2,
                    status: 2
                })).then(res => {
                    if (res.data.msg === 'ok') {
                        this.$toast.success('取消成功');
                        this.atDoctors.splice(key, 1);
                    }
                })
            },
            attentionStd(id, key) {
                this.$axios.post('Patient/follow', this.$Qs.stringify({
                    user_id: sessionStorage.user_id,
                    to_id: id,
                    to_type: 4,
                    status: 2
                })).then(res => {
                    console.log(res)
                    if (res.data.msg === 'ok') {
                        this.$toast.success('取消成功');
                        this.atStd.splice(key, 1);
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .menu {
        line-height: 1rem;
        display: flex;
        border-bottom: 1px #f5f5f5 solid;

        div {
            width: 50%;
            text-align: center;

            span {
                margin: 0 auto;
                display: block;
                width: 55%;
            }
        }
    }

    .active-menu {
        border-bottom: 3px #4d8fec solid;
    }

    .attention {

        position: relative;
        padding-bottom: .6rem;
        border-bottom: 5px #eff1ef solid;

        .doctors-list + p {
            margin-left: .3rem;
            font-size: .4rem;
            font-weight: 200;
            color: #858585;

            i {
                color: #4d8fec;
                font-size: .45rem
            }
        }

        /*padding: .3rem;*/
        .doctors-list {
            margin-top: .2rem;
            padding: 0 .3rem;
            height: 2.1rem;
            line-height: .6rem;

            img + p {
                line-height: 1.8rem;
                font-size: .35rem;
                color: #5b5b5b;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                span {
                    font-size: .3rem;
                    color: #a9aaab;
                }
            }

            img {
                border-radius: 5px;
                margin-right: 0.2rem;
                float: left;
                width: 1.8rem;
                height: 1.8rem;
                background: #9b9c9d;
                background-size: cover;
            }

            .hh {
                background: white;
                font-size: .3rem;
                color: #4d8fec;
                padding: 0 .4rem;
                box-shadow: 0 0 3px 3px rgba(77, 143, 236, 0.3);
                border-radius: .1rem;
                float: right;
            }

        }
    }
</style>