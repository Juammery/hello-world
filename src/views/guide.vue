<template>
    <div id="guide">
        <!-- viewWidth-width -->
        <img
            :style="{top:`${270+(270*scale)}px`,left:`${70+(70*scale)}px`,width:`${164+(164*scale)}px`}"
            class="top-img img-button"
            src="/img/guide/top.png"
            alt
            ref="topImg"
            @click="go()"
        />
        <!-- ${155+(155*scale)} -->

        <img
            v-if="top<-10"
            :style="{width:`${173+(173*scale)}px`}"
            class="bottom-img img-button"
            src="/img/guide/bottom.png"
            alt
            @click="go()"
        />
        <div class="img-list">
            <img class="img-item" v-for="(item,i) in list" :key="i" :src="item" alt />
        </div>
        <WebFooter class="margin20" />
    </div>
</template>
<script>
import WebFooter from "../components/webfooter";

export default {
    components: {
        WebFooter
    },
    data() {
        return {
            list: [],
            width: 1349,
            viewWidth: 0,
            top: 0,
        }
    },
    computed: {
        scale() {
            return (this.viewWidth - this.width) / this.width;
        },
    },
    mounted() {
        this.viewWidth = window.innerWidth;
        window.addEventListener('resize', this.resize);
        this.update();
        this.top = this.$refs.topImg.getBoundingClientRect().top;
        document.getElementById('app').addEventListener('scroll', this.scroll);

    },
    methods: {
        scroll(e) {
            this.top = this.$refs.topImg.getBoundingClientRect().top;
        },
        async update() {
            try {
                const { data: res } = await this.$http.post(`/cbs/theme/getThemeUnscrambleContentById/${this.$route.query.id}`);
                try {
                    this.list = JSON.parse(res.data.themeUnscrambleContent);
                } catch (e) {
                    this.list = [];
                }
            } catch (e) {
                console.error(e);
            }
        },
        resize() {
            this.viewWidth = window.innerWidth;
        },
        go() {
            this.$router.push("/subject");
        }
    },
    beforeDestroy() {
        document.getElementById('app').removeEventListener('scroll', this.scroll);
        window.removeEventListener('resize', this.resize);
    }

}
</script>
<style lang="scss" scoped>
#guide {
    position: relative;
    .img-list {
        max-width: 100vw;
        width: 100vw;
        overflow: hidden;
        position: relative;
        z-index: 1;
        .img-item {
            display: block;
            width: 100%;
        }
    }
    .img-button {
        position: absolute;
        display: block;
        cursor: pointer;
        z-index: 99;
        &.top-img {
        }
        &.bottom-img {
            position: fixed;
            bottom: 150px;
            right: 100px;
        }
    }
}
</style>