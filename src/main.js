import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from '@/libs/util';
import axios from 'axios'

Vue.use(VueI18n);
Vue.use(iView);

//  axios继承给VUE，当做一个实例，可以使用vue-axios，可以使用vue.use
Vue.prototype.$http = axios

Vue.prototype.searchTypegroup = function (code){
    let _typegroupArray = JSON.parse(localStorage.getItem('AllTSTypeGroups'))
    let _typegroupid
    let url

    for (let i = 0; i < _typegroupArray.length; i++) {
        if (_typegroupArray[i].typegroupcode == code) {
            _typegroupid = _typegroupArray[i].typegroupid
        }
    }

    url = (code == 'customerType') ? ('/api/dataCenter/system/queryForSubTSTypeByGroupId/' + _typegroupid) : ('/api/dataCenter/system/queryForTSTypeByGroupId/' + _typegroupid)

    this.$http.get(url)
        .then(function (response) {
            let str = JSON.stringify(response.data)
            localStorage.setItem(code,str)
        })

}

//  获取数据GetData方法
Vue.prototype.GetData = function (url, doSuccess, otherConditions){

    let _self = this

    this.$http.get('/api' + url)
        .then(function (response) {
            if (response.data.msgCode == '40000') {
                doSuccess(response)
            } else if (response.data.msgCode == '50003') {
                _self.$Message.error('抱歉，您还未登录，即将前往登录页面');
                setTimeout(() => {
                    _self.$router.push({
                        name: 'login'
                    });
                }, 2000);
            } else if (response.data.msgCode == '60000') {
                _self.$Message.error('抱歉，您没有权限');
            } else {
                otherConditions(response)
            }
        })
}

Vue.prototype.PostData = function (url, data, doSuccess, otherConditions){

    let _self = this

    this.$http({
        method: 'post',
        url: '/api' + url,
        data: data,
        headers: {'Content-Type': 'application/json'},
    })
        .then(function (response) {
            if (response.data.msgCode == '40000') {
                doSuccess(response)
            } else if (response.data.msgCode == '50003') {
                _self.$Message.error('抱歉，您还未登录，即将前往登录页面');
                setTimeout(() => {
                    _self.$router.push({
                        name: 'login'
                    });
                }, 2000);
            } else if (response.data.msgCode == '60000') {
                _self.$Message.error('抱歉，您没有权限');
            } else {
                otherConditions(response)
            }
        })
}

Vue.prototype.DownloadExcel = function (url, objdata) {
    let _url = url + '?isExportExcel=Y&filedKeyValues=' + encodeURIComponent(objdata)

    window.location.href = '/api' + _url

/*    this.$http({
        method: 'get',
        async: false,
        responseType: 'arraybuffer',
        url: '/api' + _url,
    })
        .then(function (response) {
            let blob = new Blob([response.data], {type: "application/vnd.ms-excel"});

            let objectUrl = URL.createObjectURL(blob);

            window.location.href = objectUrl;
        })*/
}

Vue.prototype.PostFiles = function (url, data, doSuccess, otherConditions){

    let _self = this

    this.$http({
        method: 'post',
        url: '/api' + url,
        data: data,
        dataType: 'json',
        processData: false,
        contentType: false,
    })
        .then(function (response) {
            if (response.data.msgCode == '40000') {
                doSuccess(response)
            } else if (response.data.msgCode == '50003') {
                _self.$Message.error('抱歉，您还未登录，即将前往登录页面');
                setTimeout(() => {
                    _self.$router.push({
                        name: 'login'
                    });
                }, 2000);
            } else if (response.data.msgCode == '60000') {
                _self.$Message.error('抱歉，您没有权限');
            } else {
                otherConditions(response)
            }
        })
}

Vue.prototype.matchingFields = function (a){

    let _self = this

    _self.searchTypegroup('customerType')

    let _customerTypeArr = JSON.parse(localStorage.getItem('customerType'))

    // 级联下拉框-客户状态
    let mapdata = new Map()  //用作临时转换
    let subIdToParentMap = new Map()
    let sourceData = _customerTypeArr  //结果集
    let finalArrayData = new Array()   //vue要求的数据格式

    for (let i = 0; i < sourceData.length; i++) {
        let _sub = new Object()

        _sub.value = sourceData[i].subid.toString()
        _sub.label = sourceData[i].subtypename

        subIdToParentMap.set(_sub.value, sourceData[i].id)

        let _value = mapdata.get(sourceData[i].id)

        if (_value) {
            let _valueArray = _value.children

            _valueArray.push(_sub)

            let _valueObject = new Object()

            _valueObject.value = _value.value.toString()
            _valueObject.label = _value.label
            _valueObject.children = _valueArray

            mapdata.set(sourceData[i].id, _valueObject)
        } else {
            let _child = new Array()

            _child.push(_sub)

            let _main = new Object()

            _main.value = sourceData[i].id.toString()
            _main.label = sourceData[i].typename
            _main.children = _child

            mapdata.set(sourceData[i].id, _main)
        }
    }

    mapdata.forEach((value, key) => {
        finalArrayData.push(value)
    });

    for (let i = 0; i < finalArrayData.length; i++) {

        for (let j = 0; j < finalArrayData[i].children.length; j++) {

            if ((finalArrayData[i].children[j].value) == (a)) {

            }
        }
    }
}

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        // util.checkUpdate(this); // util中未配置
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
