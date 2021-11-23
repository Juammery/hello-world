<template>
    <div :class="['switch-panel',{'switch-close':isClose}]">
        <div class="switch-panel-left" @click="isClose=!isClose">
            <i class="el-icon-caret-right" v-if="isClose"></i>
            <i class="el-icon-caret-bottom" v-if="!isClose"></i>
            <span>{{title}}</span>
        </div>
        <div class="switch-panel-body" @click="isClose=!isClose">
            <div class="content-list">
                <span class="content-item" v-for="(item,i) in list" :key="i">
                    <span class="content-title" style="color:##cbb486">{{item.name}}：</span>
                    <span class="content-text" style="color#666">{{item.data}}；</span>
                </span>
            </div>
        </div>
        <div class="switch-panel-right" v-if="!isClose">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: '',
        },
        list: {
            type: Array,
            default() {
                return [];
            },
        }
    },
    data() {
        return {
            isClose: true,
        }
    },
}
</script>
<style lang="scss" scoped>
.switch-panel {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    padding: 0 10px;
    &.switch-close {
        .content-list {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            .content-item {
            }
        }
    }
    .switch-panel-left {
        color: #8b614d;
        cursor: pointer;
    }
    .switch-panel-body {
        flex: 1;
        display: flex;
        cursor: pointer;
        overflow: hidden;
    }
    .switch-panel-right {
        align-self: center;
        i {
            color: #ab8f56;
            font-size: 30px;
        }
    }
    .content-list {
        width: 100%;
        max-width: 100%;
        .content-item {
            .content-title {
                color: #cbb486;
            }
            .content-text {
                color: #777;
            }
        }
    }
}
</style>