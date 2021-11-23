<template>
  <div>
    <div ref="affix" class="affix">
      <div class="affix-body" ref="bodyF">
        <slot></slot>
      </div>
    </div>
    <div v-if="fixde" :style="{width:width}" class="affix affix-fixed">
      <div class="affix-body" ref="body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
  },
  data() {
    return {
      event: null,
      scrollTop: 0,
      selfScrollTop: 0,
      fixde: false,
      width: 'auto',
      height: 'auto',
    }
  },
  computed: {
  },
  watch: {
    scrollTop(v) {

      if (this.$refs.affix.getBoundingClientRect().top <= 0) {
        this.fixde = true;
        this.$refs.affix.style.opacity = "0";
      } else {
        this.fixde = false;
        this.$refs.affix.style.opacity = "1";
      }

    }
  },
  async mounted() {
    let $app = document.getElementById('app');
    await this.$nextTick();
    this.width = this.$refs.affix.offsetWidth + 'px';
    this.height = this.$refs.affix.offsetHeight + 'px';

    setTimeout(() => {
      $app.addEventListener('scroll', this.scroll);
    }, 10);
  },
  beforeDestroy() {
    let $app = document.getElementById('app')
    $app.removeEventListener('scroll', this.scroll);
  },

  methods: {
    scroll(e) {
      this.scrollTop = e.target.scrollTop;
      if (this.$refs.bodyF.innerText == '酒类商品零售许可证申请表：') {
      }
    },
  }
}
</script>
<style lang="scss" >
.affix {
  &.affix-fixed {
    position: fixed;
    top: 0;
    z-index: 1024;
  }
}
</style>