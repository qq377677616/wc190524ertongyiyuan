<template>
    <label><input
            class="mui-switch mui-switch-animbg"
            type="checkbox"
            v-model="kfc"
            @click="updateBol"></label>

</template>

<script>
    export default {
        props:['bol','std'],
        name: "zySwitch",
        data(){
            return{
                // value:this.kfc
            }
        },
        methods:{
            updateBol(){
                // console.log(this.std.zx_status)
                this.$axios.post('doctor/zs_by_status',this.$Qs.stringify({
                    doctor_id:this.std.id,
                    status:this.std.zx_status == 2?1:2
                })).then(res=>{
                    
                    // console.log(res)
                })
            }
        },
        computed:{
            kfc:{
                get(){
                    return this.bol
                },
                set(){
                    this.$emit('updateBol',this.std.zx_status !== '2')
                },
          }
        }
    }
</script>

<style scoped>
    .mui-switch {
        width: .8rem;
        height: .44rem;
        position: relative;
        border: 1px solid #dfdfdf;
        background-color: #ecedee;
        box-shadow: #dfdfdf 0 0 0 0 inset;
        border-radius: 20px;
        background-clip: content-box;
        display: inline-block;
        -webkit-appearance: none;
        user-select: none;
        outline: none;
    }

    .mui-switch:before {
        content: '';
        width: .4rem;
        height: .4rem;
        position: absolute;
        top: 0px;
        left: 0;
        border-radius: 20px;
        background-color: #fff;
        border-color: #c7fef5;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    .mui-switch:checked {
        border-color: #c7fef5;
        box-shadow: #64bd63 0 0 0 16px inset;
        background-color: #64bd63;
        /*color: #c7fef5;*/
    }

    .mui-switch:checked:before {
        left: .36rem;
    }

    .mui-switch.mui-switch-animbg {
        transition: background-color ease 0.4s;
    }

    .mui-switch.mui-switch-animbg:before {
        transition: left 0.3s;
    }

    .mui-switch.mui-switch-animbg:checked {
        box-shadow: #dfdfdf 0 0 0 0 inset;
        background-color: #c7fef5;
        transition: border-color 0.4s, background-color ease 0.4s;
    }

    .mui-switch.mui-switch-animbg:checked:before {
        transition: left 0.3s;
    }

    .mui-switch.mui-switch-anim {
        transition: border cubic-bezier(0, 0, 0, 1) 0.4s, box-shadow cubic-bezier(0, 0, 0, 1) 0.4s;
    }

    .mui-switch.mui-switch-anim:before {
        transition: left 0.3s;
    }

    .mui-switch.mui-switch-anim:checked {
        box-shadow: #64bd63 0 0 0 16px inset;
        background-color: #64bd63;
        transition: border ease 0.4s, box-shadow ease 0.4s, background-color ease 1.2s;
    }

    .mui-switch.mui-switch-anim:checked:before {
        transition: left 0.3s;
    }
</style>
