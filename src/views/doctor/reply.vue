<template>
    <div>
        <section class="reply" v-for="item in [1,2,3,4]" :key="item">
            <article class="title">
                <div>
                    <img src="" alt="">
                    <div class="username">
                        <p>用户昵称</p>
                        <span>04-07 02:15</span>
                    </div>
                </div>
                <button type="button">回复</button>
            </article>
            <article class="reply-detailed">
                <p>了圣诞节疯狂时代减肥路上看到飞机数量的看法就是打开了房间数量多付款了圣了圣诞节疯狂时代减肥路上看到飞机数量的看法就是打开了房间数量多付款诞节疯狂时代减肥路上看到飞机数量的看法就是打开了房间数量多付款</p>
            </article>
            <article class="original">
                <img src="" alt="">
                <div>
                    <p>@张建国</p>
                    <span>深刻的法律上的看法就是考虑到飞机速度来开发建设的路口附近了深刻的法律上的看法就是考虑到飞机速度来开发建设的路口附近了</span>
                </div>
            </article>
        </section>
    </div>
</template>

<script>
    export default {
        name: "reply"
    }
</script>

<style scoped lang="scss">
    .reply{
        border-bottom:5px #eaebec solid;
        padding: .3rem;
        .title{
            margin-bottom: .2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            div{
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                width: 55%;
                img{
                    width: 1rem;
                    height: 1rem;
                    background: #c7c8c9;
                    border-radius: 50%;
                }
                .username{
                    margin-left: .2rem;
                    line-height: .4rem;
                    font-size: .35rem;
                    color: #666768;
                    span{
                        font-size: .25rem;
                        color: #a7a8a8;
                    }
                }

            }

            button{
                border-radius: 5px;
                font-size: .3rem;
                padding: .1rem .3rem;
                border: none;
                background: #dafdf8;
                color: #37a19d;
            }
        }
        .reply-detailed{
            font-size: .3rem;
            font-weight: 200;
            color: #666768;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            margin-bottom: .25rem;
        }
        .original{
            display: flex;
            align-items: center;
            /*flex-shrink: initial;*/
            img{

                width: 1.5rem;
                height: 1.5rem;
                background: #9b9c9d;
                display: block;
            }
            div{
                background: #f4f5f6;

                height: 1.5rem;
                /*line-height: 0.6rem;*/
                flex: 1;
                padding-left: .2rem;
                p{
                    margin-top: .15rem;
                    font-size: .3rem;
                    color: #666768;
                }
                span{
                    font-size: .25rem;
                    color: #666768;
                    font-weight: 200;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }
</style>