<template>
    <div class="studioId">
        <!--        <p>工作室介绍</p>-->
        <section>
            <p class="title">{{studioInfo.title}}</p>
            <p>{{studioInfo.content}}</p>
            <div>
                <img v-for="item of studioInfo.img_path_arr" :src="item" alt="">
                <!--                <img :src="studioInfo.img_path_arr[1]" alt="">-->
            </div>
        </section>
        <span @click="edit">编 辑</span>

        <div v-show="isShow">
            <p>
                <i class="el-icon-arrow-left" @click="isShow = false"></i>
                <span>确认</span>
            </p>
            <label>
                <span>标题</span>
                <input type="text" v-model="title">
            </label>
            <label>
                <span>简介</span>
                <textarea v-model="textContent"></textarea>
            </label>
            <div>
                <p>上传图片(最多两张)</p>
                <div>
                    <div v-for="item of fileList" :style="`background-image:url(${item})`">
                        <i class="el-icon-circle-close"></i>
                    </div>
                </div>
                <van-uploader :after-read="afterRead" v-show="!fileListLenght">
                    <span class="uploader">
                        <i class="el-icon-plus"></i>
                    </span>
                </van-uploader>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "studioId",
        data() {
            return {
                isShow: false,
                title: '',
                textContent: '',
                studioInfo: [],
                fileList: []
            }
        },
        computed: {
            fileListLenght() {
                return this.fileList.length >= 2
            }
        },
        created() {
            this.getStudioInfo();
        },
        methods: {
            edit() {
                const {title, content,img_path_arr} = this.studioInfo
                this.fileList = img_path_arr
                this.title = title
                this.textContent = content
                this.isShow = true
            },
            afterRead(file) {
                // console.log(file)
                this.fileList.push(file.content)
            },
            getStudioInfo() {
                this.$axios.post('Doctor/clinicDetails', this.$Qs.stringify({
                    doctor_id: 1,
                    type: 1
                })).then(res => {
                    console.log(res)
                    this.studioInfo = res.data.data
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .uploader {
        display: block;
        width: 1.8rem;
        height: 1.8rem;
        border-radius: .1rem;
        border: 1px #afafaf dashed;
        position: relative;
        text-align: center;
        line-height: 1.8rem;
        box-sizing: border-box;

        i {
            color: #afafaf;
            font-size: .5rem;
        }
    }

    .studioId {
        height: 100%;
        position: relative;

        > span {
            background: linear-gradient(321deg, rgb(2, 189, 185) 0%, rgb(74, 226, 223) 100%);
            color: white;
            font-size: .4rem;
            border-radius: .1rem;
            display: block;
            width: 2.5rem;
            text-align: center;
            line-height: .7rem;
            position: fixed;
            left: calc(50% - 1.25rem);
            bottom: 2rem;
        }

        > div {
            padding: .3rem;
            box-sizing: border-box;
            position: fixed;
            top: 0;
            bottom: 0;
            width: 100%;
            background: white;
            z-index: 2001;

            div {

                >div {
                    i{
                        position: absolute;
                        right: -.2rem;
                    }
                    div{
                        background-repeat: no-repeat;
                        background-size: cover;
                        position: relative;
                        width: 1.8rem;
                        height: 1.8rem;
                        display: inline-block;
                        margin-right: .2rem;
                    }

                }

                p {
                    font-size: .3rem;
                    padding-bottom: .2rem;
                }
            }

            > label {
                display: block;
                padding-bottom: .3rem;

                span {
                    font-size: .3rem;
                    display: block;
                    width: 1rem;
                    padding-bottom: .2rem;
                }

                textarea {
                    height: 2.5rem;
                    width: 100%;
                    box-sizing: border-box;
                    padding: .2rem;
                    font-size: .3rem;
                    border-radius: .1rem;
                    border: 1px #f4f4f4 solid;
                    resize: none;
                }

                input {
                    box-sizing: border-box;
                    width: 100%;
                    padding: .1rem .2rem;
                    border: 1px #f4f4f4 solid;
                    border-radius: .1rem;
                    line-height: .5rem;
                    font-size: .3rem;
                }
            }

            > p {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: .2rem;

                i {
                    font-size: .5rem;
                }

                span {
                    background: linear-gradient(321deg, rgb(2, 189, 185) 0%, rgb(74, 226, 223) 100%);
                    padding: .05rem .3rem;
                    border-radius: .1rem;
                    color: white;
                }
            }
        }

        section {
            /*padding: .3rem;*/
            padding: .15rem;

            .title {
                font-size: .35rem;
                color: #4c4c4c;
            }

            p {
                padding: 0 .15rem .2rem .15rem;
                font-size: .28rem;
            }

            div {
                display: flex;

                img {
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
