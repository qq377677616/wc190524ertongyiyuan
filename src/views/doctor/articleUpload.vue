<template>
    <div style="height: 100%">
        <label style="color: #4c4c4c;font-size:.3rem;line-height: .6rem;padding:.1rem .3rem;display: flex;border-bottom:1px #eff1ef solid;border-top:1px #eff1ef solid">
            标题：
            <input v-model="title" type="text" style="flex: 1;border: none">
        </label>
        <div style="padding:.3rem;border-bottom:2px #eff1ef solid">

            <div>
                <label>
                    <textarea v-model="content" placeholder="分享美好的瞬间..."></textarea>
                </label>
                <div class="uploader-img">
                    <div class="imageList" v-for="(item, key) of fileList"
                         :style="`background-image:url(${item.content})`">
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

        </div>
        <div style="padding:.2rem .3rem">
            <span :class="{'activeTag':tagList.includes(item)}" @click="seTag(item)" v-for="item of tagInfo"
                  class="tag">{{item.name}}</span>
        </div>
        <span @click="uploader"
              style="font-size: .3rem;position: fixed;bottom: 1rem;display: block;width: 80%;line-height: .7rem;background: #00b5bd;color: white;left: calc(50% - 40%);text-align: center;border-radius: .1rem">上传</span>
    </div>
</template>

<script>
    export default {
        name: "release",
        data() {
            return {
                title: '',
                content: '',
                fileList: [],
                show: true,
                tagList: [],
                tagInfo: []
            }
        },
        created() {
            this.getArtivleLabel()
        },
        methods: {
            deimg(key) {
                this.fileList.splice(key, 1)
            },
            createdArtivle() {

            },
            getArtivleLabel() {
                this.$axios.get('Doctor/getArticleLabel').then(res => {
                    console.log(res)
                    this.tagInfo = res.data.data
                })
            },
            seTag(item) {
                if (this.tagList.includes(item)) {
                    for (let i in this.tagList) {
                        if (this.tagList[i] === item) {
                            this.tagList.splice(i, 1)
                        }
                    }
                } else {
                    this.tagList.push(item)
                }

            },
            uploader() {
                let list = [];
                let tagIdList = [];
                for (let i of this.tagList){
                    tagIdList.push(i.id)
                }
                for (let i of this.fileList) {
                    list.push(i.content)
                }
                if (this.title === ''){
                    this.$toast.fail('请填写标题');
                    return
                }
                if (this.content.length <11){
                    this.$toast.fail('请多填写一些内容');
                    return;
                }
                if (tagIdList.length === 0){
                    this.$toast.fail('请选择标签');
                    return;
                }
                if (list.length === 0){
                    this.$toast.fail('请添加图片');
                    return;
                }
                console.log(list);
                this.$axios.post('Doctor/createArticle', this.$Qs.stringify({
                    content: this.content,
                    doctor_id: this.$route.query.id,
                    type: 2,
                    title: this.title,
                    base64: list,
                    label:tagIdList
                })).then(res => {
                    console.log(res)
                    if (res.data.msg === 'success'){
                        this.$toast.success('发表成功');
                        this.$router.go(-1)
                    }
                }).catch(res=>{
                    this.$toast.fail('服务器错误')
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
    .activeTag {
        /*color: #CFCFCF;*/
        /*border:2px #CFCFCF solid;*/
        /*background-color: #CFCFCF;*/
        border: 2px #09aba7 solid !important;
        color: #09aba7 !important;
        background: #F1FBFC !important;
    }

    .tag {
        margin-right: .3rem;
        color: #CFCFCF;
        border: 2px #CFCFCF solid;
        background-color: white;
        font-size: .2rem;
        padding: .05rem .15rem;

        border-radius: .3rem;

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
        /*color: #4c4c4c;*/
        /*box-sizing: border-box;*/
    }

    textarea {
        font-size: .3rem;
        resize: none;
        border: none;
        /*padding: .3rem;*/
        width: 100%;
        height: 2.6rem;
    }
</style>