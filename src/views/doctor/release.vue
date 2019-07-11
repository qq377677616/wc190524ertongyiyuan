<template>
    <div style="height: 100%">
        <!--        <label style="line-height: .8rem;padding: .3rem;display: flex;border-bottom:1px #eff1ef solid">-->
        <!--            标题：-->
        <!--            <input type="text" style="flex: 1;border: none;border-bottom:1px #eff1ef solid">-->
        <!--        </label>-->
        <div style="padding:.3rem;height: 5rem;border-bottom:2px #eff1ef solid">
            <label>
                <textarea v-model="content" placeholder="分享美好的瞬间..."></textarea>
            </label>
            <div class="uploader-img">
                <div class="imageList" v-for="(item, key) of fileList" :style="`background-image:url(${item.content})`">
                    <!--&lt;!&ndash;                    {{item}}&ndash;&gt;{{item.content}}-->
                    <i @click="deimg(key)" class="el-icon-circle-close"
                       style="font-size: .4rem;font-weight: 200;color: red;position: absolute;top: -.2rem;right: -.2rem"></i>
                </div>
                <van-uploader
                        v-show="show"
                        v-model="fileList"
                        multiple
                        :max-count="9"
                        :after-read="afterRead">
                    <div class="uploader">
                        <i class="el-icon-plus"></i>
                    </div>
                </van-uploader>
            </div>

        </div>
        <span class="upBtn" @click="uploader" >上传</span>
    </div>
</template>

<script>
    export default {
        name: "release",
        data() {
            return {
                content: '',
                fileList: [],
                show: true,
            }
        },
        methods: {
            deimg(key) {
                this.fileList.splice(key, 1)
            },
            uploader() {
                let list = []
                for (let i of this.fileList) {
                    list.push(i.content)
                }
                if (list.length === 0) {
                    this.$toast.fail('请添加图片')
                    return
                }
                console.log(list)
                if (this.content.length < 10 || this.content.length > 255) {
                    this.$toast.fail('文字限制10-255个')
                    return
                }
                this.$toast.loading({
                    mask: true,
                    message: '上传中..',
                    duration: 0
                })
                this.$axios.post('doctor/createDynamic', this.$Qs.stringify({
                    content: this.content,
                    doctor_id: sessionStorage.doctor_id,
                    base64: list
                })).then(res => {
                    console.log(res.data.msg, res)
                    if (res.data.msg === 'success') {
                        this.$toast.clear()
                        this.$router.go(-1)
                        this.$toast.success('创建成功')
                    } else {

                    }
                })
            },
            afterRead(file) {
                // this.fileList.push(file)
                let imgList = file
                if (imgList.length >= 9) {
                    imgList = imgList.slice(0, 9)
                }
                console.log(imgList)
                if (this.fileList.length >= 9) {
                    this.show = false
                    return
                }
                this.fileList = this.fileList.concat(imgList)
                if (this.fileList.length === 9) {
                    this.show = false
                }
                // console.log(file)
            }
        }
    }
</script>

<style scoped lang="scss">
    .upBtn {
        position: absolute;
        bottom: 1rem;
        display: block;
        width: 80%;
        line-height: .7rem;
        background: #00b5bd;
        color: white;
        left: calc(50% - 40%);
        text-align: center;
        border-radius: .1rem
    }

    .uploader-img {
        display: flex;
        flex-wrap: wrap;
        padding-top: .4rem;
        align-items: center;

        .imageList {
            position: relative;
            margin: .1rem;
            height: 2rem;
            width: 2rem;
            background-repeat: no-repeat;
            background-size: cover;
            border: 1px #eff1ef solid;
            background-position: center;
        }
    }

    .uploader {
        margin: .1rem;
        box-sizing: border-box;
        font-size: .4rem;
        text-align: center;
        line-height: 2rem;
        width: 2rem;
        color: #a1a7a8;
        border: 1px #a1a7a8 dashed;
        color: #4c4c4c;
        box-sizing: border-box;
    }

    textarea {
        resize: none;
        border: none;
        /*padding: .3rem;*/
        width: 100%;
        height: 100%;
    }
</style>