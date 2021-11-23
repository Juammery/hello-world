import { getFormFill } from "@/api/getForm";
import common from "../../components/common/common";

/**
 * 因为api/cbs/standard_item/getFormFill?themeId=168接口太慢
 * 所以开放js，在其他地方也可以调用
 */
export default {
    getSession: common.getSession,
    filterIndex(origin, list) {
        if (list.length > 0) {
            list.forEach(e => {
                if (e.children.length > 0) {
                    this.filterIndex(origin, e.children);
                }
                if (e.data || e.dataArray.length > 0) {
                    origin.push(e);
                }
            });
        }
    },
    data: null,
    themeId: '',
    // 将children 拆开
    filterChildren(jsonList) {
        let list =
            jsonList == undefined ? [] : JSON.parse(JSON.stringify(jsonList));
        if (Array.isArray(list) && list.length > 0) {
            list.forEach(e => {
                this.filterIndex(list, e.children);
            });
        }
        if (!list) {
            list = [];
        }

        return list;
    },
    getData() {
        return null;
        if (this.getSession('themeId') != this.themeId) {
            this.data = null;
            return null;
        }
        if (!this.data) {
            return null;
        } else {
            return JSON.parse(JSON.stringify(this.data));
        }
    },
    /**
     * 仅调用接口，不记录数据
     */
    async http() {
        this.themeId = this.getSession("themeId");
        // 調取接口需要父子判斷
        let subjectList = this.getSession("subject")
            ? this.filterChildren(this.getSession("subject"))
            : [];
        let businessList = !this.getSession("business")
            ? []
            : this.filterChildren(this.getSession("business"));
        let data = subjectList.concat(businessList);
        if (businessList == undefined) {
            data = subjectList;
        }
        // 获取数据元
        const res = await getFormFill(this.themeId, data)
        return res;
    },
    /**
     * 调用接口后，记录数据，并返回数据
     */
    async preHttp() {
        const res = await this.http();
        this.data = res;
        console.warn('[FillForm/data.js] 预加载完成');
        return res;
    }
}