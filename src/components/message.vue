<template>
    <div class="message">
        <div class="loading-bg">
            <i class="el-icon-loading loading"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "message"
    }
</script>

<style scoped>
    .message{
        position: absolute;
        z-index: 2000;
        top: 0;
        bottom: 0;
        width: 100%;

    }

    /*loading样式*/
    .loading-bg{
        width: 1.5rem;
        height: 1.5rem;
        background-color: rgba(1,189,187,0.2);
        border-radius: .4rem;
        position: absolute;
        top: calc(50% - .75rem);
        left: calc(50% - .75rem);
        text-align: center;
    }
    .loading{
        font-size: .7rem;
        margin-top: calc(50% - .35rem);
        color: #45cac6;
    }

    /*成功样式*/
    .success-bg{

    }
    .success{

    }

    /*出错样式*/
    .error-bg{

    }
    .error{

    }
</style>