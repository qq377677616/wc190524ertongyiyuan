<template>
    <div>
        <section class="help-tag">
            <el-row :gutter="20" v-for="item in [1,2,3]" style="padding: 10px 20px" :key="item">
                <el-col :span="12"><span>简短易懂</span></el-col>
                <el-col :span="12"><span>简短易懂</span></el-col>
            </el-row>
        </section>
        <section style="margin-top: 0.5rem">
            <article>
                <p></p>
                <label for="male">
                    <span style="color: #b9babb;margin-left: 20px">您推荐的理由</span>
                    <textarea id="male" style="width: calc(90% - 20px);margin: 5px auto;display: block;height: 3.2rem;border-radius: 5px;border: none;resize:none;padding: 10px">

                    </textarea>
                </label>
            </article>
        </section>
    </div>
</template>

<script>
    export default {
        name: "help"
    }
</script>

<style scoped lang="scss">
    .help-tag{
        margin-top: 10px;
        span{
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            display: block;
            text-align: center;
            /*padding: 10px;*/
            border-radius: 5px;
            background: white;
        }
    }
</style>