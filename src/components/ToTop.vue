<template>
  <div class="to-top" v-show="isShow" @click="to()">
    <i class="icon el-icon-download"></i>
  </div>
</template>
<script>
export default {
  name: 'ToTop',
  data() {
    return {
      $app: null,
      isShow: false,
    }
  },
  mounted() {
    this.$app = document.getElementById('app');
    this.$app.addEventListener('scroll', this.scroll);
  },
  beforeDestroy() {
    this.$app.removeEventListener('scroll', this.scroll);
  },
  methods: {
    to() {
      this.$app.scrollTop = 0;
    },
    scroll(e) {
      if (e.target.scrollTop > 700) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.to-top {
  position: fixed;
  right: 15px;
  bottom: 100px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  background-color: #CBB486;
  color: #fff;
  width: 57px;
  height: 57px;
  cursor: pointer;
  user-select: none;
  .icon {
    font-size: 30px;
    transform: rotateZ(180deg);
  }
}
</style>