<template>
    <div class="">
        <div style="position:relative;" class="themeName-box">
                <div class="themeName" style="position:absolute;left:50%;top:10px;transform:translateX(-50%);">{{currentPage}}</div>
                <div style="position:absolute;right:10px;top:0;">
                <el-button type="text" @click="$router.push({ path: '/' });"><img src="../../assets/img/home-small.png" alt="">&nbsp;<b style="font-size:14px;color:#666;">返回首页</b></el-button>
                </div>
        </div>
    </div>
</template>

<script>

export default {
    components: {},
    props:{
        currentPage:{
             type:String,
             default:'',
             required:true,
        }
       
    },
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {},
    }
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.themeName-box .el-button{
    margin:15px 4px;
}

</style>