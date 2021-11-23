// 返回卓凡的
import Vue from 'vue'
let vm = new Vue()
export function backZf(){
    // let lowWindow = vm.getSession('ReceiveUrl').terminalCode.toLowerCase()
    let lowWindow = vm.getSession('terminalCode').toLowerCase()
    // if(lowWindow == 'c09' || lowWindow == 'c13'){
    // if(lowWindow == 'c09' || lowWindow == 'c13' || lowWindow == 'c05' || lowWindow == 'c06' || lowWindow == 'C06' || lowWindow == 'C05' || lowWindow == 'C13' || lowWindow == 'C09'){
    if(lowWindow == 'c09' || lowWindow == 'c13' || lowWindow == 'C13' || lowWindow == 'C09'){
        // window.location.replace("http://31.0.178.171:8096/front/index.do")  //演示服务器地址
        window.location.replace("http://31.0.178.171:8096/front/index.do")
    }else if(lowWindow == 'c99'){
        window.location.replace("http://31.0.161.2:8089/front/index.do")
    }else{
        window.location.replace("http://31.0.178.171:8091/front/index.do")
    }
}