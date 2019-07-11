<template>
    <!--    团队列表-->
    <div>
        <section class="search">
            <!-- 搜索框 -->
            <label>
                <input type="text" class="search" placeholder="请输入团队名称" v-model="acTeam">
            </label>
        </section>
        <section class="team-box">
            <article class="team-menu">
                <span @click="teamMenu=key" v-for="(item, key) of ['工作室列表','我的工作室']" :key="key"
                      :class="{'active-team-menu':teamMenu===key}">{{item}}</span>
            </article>
            <article @click="goTo(item.id)" class="team-list" v-for="(item, key) of teamInfo" :key="key">
                <img :src="item.avatar" alt="">
                <div>
                    <span>{{item.name}}</span>
                    <p><span>参与人数</span>{{item.doctor_num}}人</p>
                    <p><span>领衔专家</span>{{item.real_name}}</p>
                </div>
            </article>
        </section>
        <!--        <button v-show="teamMenu === 1" type="submit">创建团队</button>-->
    </div>
</template>

<script>
    export default {
        name: "TeamList",
        data() {
            return {
                acTeam:'',
                myTeam: [],
                teamMenu: 0,
                teamList: []
            }
        },
        created() {
            this.getTeamAll()
        },
        methods: {
            getTeamAll() {
                this.$axios.all([
                    this.$axios.get('Doctor/departmentList', {doctor_id: sessionStorage.doctor_id}),
                    this.$axios.get('Doctor/myDepartment', {doctor_id: sessionStorage.doctor_id})
                ]).then(this.$axios.spread((teamList, myTeamRes) => {
                    // console.log(myTeamRes)
                    this.teamList = teamList.data.data;
                    this.myTeam = myTeamRes.data.data;
                }));
                // this.$axios.get('Team/teamInfo').then((res) => {
                //
                //     console.log(res.data)
                // })
            },
            goTo(id) {
                console.log('111')
                this.$router.push({path: '/doctors/otherexperts', query: {id: id}})
            }
        },
        computed: {
            teamInfo() {
                let list = [];
                if (this.teamMenu === 0) {
                    if (this.acTeam !== ''){
                        for (let i of this.teamList){
                            if (i.name.includes(this.acTeam)){
                                list.push(i)
                            }
                        }
                    }else {
                        list = this.teamList
                    }
                } else {
                    list = this.myTeam
                }
                return list
            }
        }
    }
</script>

<style scoped lang="scss">
    button[type='submit'] {
        position: fixed;
        bottom: 1rem;
        border-radius: .1rem;
        border: none;
        width: 3rem;
        color: white;
        height: .8rem;
        left: calc(50% - 1.5rem);
        background: linear-gradient(to bottom right, #4ae2df, #02bdb9);
    }

    .search {
        height: 1.4rem;
        position: relative;
        background-image: url("../../assets/reservation/BG.png");

        input::-webkit-input-placeholder {
            color: white;
            font-weight: 200;
        }

        input.search {
            color: white;
            /*display: block;*/
            border: none;
            position: absolute;
            left: calc(50% - (38% + 15px));
            top: calc(50% - .45rem);

            border-radius: 30px;
            background-color: rgba(233, 233, 233, 0.4);
            width: 76%;
            /*line-height: 0.6rem;*/
            height: 0.6rem;
            padding-left: 30px;
            background-image: url("../../assets/search-w.png");
            background-size: 0.2rem 0.2rem;
            background-repeat: no-repeat;
            background-position: center;
            background-position-x: 10px;
        }
    }

    .active-team-menu {
        border-bottom: 2px #01bdbb solid;
    }

    .team-box {
        background: white;
        margin-top: -.25rem;
        border-radius: 15px 15px 0 0;
        position: relative;

        .team-menu {
            width: 100%;
            display: flex;
            text-align: center;
            justify-content: center;
            border-bottom: 1px #f4f5f6 solid;

            span {
                font-size: .3rem;
                line-height: .7rem;
                width: 20%;
                margin: 0 15%;

            }
        }

        .team-list {
            border-bottom: 4px #f4f5f6 solid;
            padding: .3rem;
            display: flex;

            img {
                height: 2rem;
                width: 2rem;
                background: #9b9c9d;
                display: block;
                border-radius: 5px;
                margin-right: .3rem;
            }

            div {
                flex: 1;
                line-height: .6rem;

                > span {
                    margin-bottom: .1rem;
                    /*color: ;*/
                }

                p {
                    font-size: .3rem;

                    span {
                        background: #e5f8f8;
                        font-weight: 200;
                        font-size: .25rem;
                        color: #219e9d;

                        padding: .02rem .2rem;
                        border-radius: 20px;
                        margin-right: .2rem;
                    }
                }
            }
        }
    }
</style>