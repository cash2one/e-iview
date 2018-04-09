<template>
    <div>
        <Card>
            <Form ref="formValidate" :model="formValidate" :label-width="80">
                <FormItem label="姓名" prop="name">
                    <Input disabled size="small" v-model="formValidate.name"/>
                </FormItem>
                <FormItem label="电话" prop="tel">
                    <Input disabled size="small" v-model="formValidate.tel"/>
                </FormItem>
                <FormItem label="固话" prop="fixedphone">
                    <Input disabled size="small" v-model="formValidate.fixedphone"/>
                </FormItem>
                <FormItem label="QQ" prop="qq">
                    <Input disabled size="small" v-model="formValidate.qq"/>
                </FormItem>
                <FormItem label="微信" prop="weixin">
                    <Input disabled size="small" v-model="formValidate.weixin"/>
                </FormItem>
                <FormItem label="服务地址" prop="address">
                    <Input disabled size="small" v-model="formValidate.address"/>
                </FormItem>
                <FormItem label="客户状态" prop="customertype">
                    <Cascader disabled trigger="hover" :data="customertypeValue" v-model="formValidate.customertype"></Cascader>
                </FormItem>
                <FormItem label="客户来源" prop="customersource">
                    <Select v-model="formValidate.customersource" size="small" disabled>
                        <Option v-for="item in customersourceValue" :value="item.value" :key="item.value">
                            {{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="客户等级" prop="importlevel">
                    <Select v-model="formValidate.importlevel" size="small" disabled>
                        <Option v-for="item in importlevelValue" :value="item.value" :key="item.value">
                            {{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="区域" prop="area">
                    <Select v-model="formValidate.area" size="small" disabled>
                        <Option v-for="item in areaValue" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="标签" prop="customerlabel">
                    <Tag v-for="item in customerlabel" :key="item.id" :name="item.id">
                        {{ item.labelname }}
                    </Tag>
                </FormItem>
                <FormItem label="创建时间" prop="createdate">
                    <Input disabled size="small" v-model="formValidate.createdate"/>
                </FormItem>
                <FormItem label="更新时间" prop="updatedate">
                    <Input disabled size="small" v-model="formValidate.updatedate"/>
                </FormItem>
                </FormItem>
                <FormItem label="服务梯队" prop="backup">
                    <Input size="small" type="textarea" v-model="formValidate.backup" disabled/>
                </FormItem>
                <FormItem label="备注信息" prop="notes">
                    <Input size="small" type="textarea" v-model="formValidate.notes" disabled/>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>

    export default {
        props: ['customerid'],
        data() {
            return {
                data1: [],
                customerlabelGroup: [],
                importlevelValue: [],
                areaValue: [],
                customertypeValue: [],
                customersourceValue: [],
                formValidate: {
                    id: '',
                    name: '',
                    tel: '',
                    fixedphone: '',
                    qq: '',
                    weixin: '',
                    address: '',
                    customertype: [],
                    customersource: '',
                    importlevel: '',
                    area: '',
                    issend: '',
                    customerlabel: [],
                    createdate: '',
                    updatedate: '',
                    gxr: '',
                    backup: '',
                    sourcesubdivision: '',
                    isbound: '',
                    email: '',
                    channelsource: '',
                    notes:''
                },
                customertype: '',
                customerlabel: []
            }
        },
        methods: {
            getData() {
                console.log(this.customerid)
                var _self = this
                this.searchTypegroup('cluesource')
                this.searchTypegroup('custImport')
                this.searchTypegroup('customerType')
                this.searchTypegroup('area')

                let _cluesourceArr = JSON.parse(localStorage.getItem('cluesource'))
                let _custImportArr = JSON.parse(localStorage.getItem('custImport'))
                let _customerTypeArr = JSON.parse(localStorage.getItem('customerType'))
                let _areaArr = JSON.parse(localStorage.getItem('area'))

                // 下拉框-客户来源
                for (var i = 0; i < _cluesourceArr.length; i++) {

                    var customersourceObj = {}

                    customersourceObj.label = _cluesourceArr[i].typename
                    customersourceObj.value = _cluesourceArr[i].typecode
                    _self.customersourceValue.push(customersourceObj)
                }

                // 下拉框-客户等级
                for (var i = 0; i < _custImportArr.length; i++) {

                    var importlevelObj = {}

                    importlevelObj.label = _custImportArr[i].typename
                    importlevelObj.value = _custImportArr[i].typecode
                    _self.importlevelValue.push(importlevelObj)
                }

                // 级联下拉框-客户状态
                var mapdata = new Map()  //用作临时转换
                var subIdToParentMap = new Map()
                var sourceData = _customerTypeArr //结果集
                var finalArrayData = new Array()   //级联下拉框要求的数据格式

                for (var i = 0; i < sourceData.length; i++) {

                    var _sub = new Object()
                    _sub.value = sourceData[i].subid.toString()
                    _sub.label = sourceData[i].subtypename

                    subIdToParentMap.set(_sub.value, sourceData[i].id)

                    var _value = mapdata.get(sourceData[i].id)

                    if (_value) {
                        var _valueArray = _value.children
                        _valueArray.push(_sub)
                        var _valueObject = new Object()
                        _valueObject.value = _value.value.toString()
                        _valueObject.label = _value.label
                        _valueObject.children = _valueArray
                        mapdata.set(sourceData[i].id, _valueObject)
                    } else {
                        var _child = new Array()
                        _child.push(_sub)
                        var _main = new Object()
                        _main.value = sourceData[i].id.toString()
                        _main.label = sourceData[i].typename
                        _main.children = _child
                        mapdata.set(sourceData[i].id, _main)
                    }
                }

                mapdata.forEach((value, key) => {
                    finalArrayData.push(value)
                });

                for (var i = 0; i < finalArrayData.length; i++) {
                    for (var j = 0; j < finalArrayData[i].children.length; j++) {
                        if ((finalArrayData[i].children[j].value) == (_self.customertype)) {
                            _self.formValidate.customertype[0] = finalArrayData[i].value
                            _self.formValidate.customertype[1] = _self.customertype
                        }
                    }
                }

                _self.customertypeValue = finalArrayData

                // 下拉框-区域
                for (var i = 0; i < _areaArr.length; i++) {

                    var areaObj = {}

                    areaObj.label = _areaArr[i].typename
                    areaObj.value = _areaArr[i].typecode
                    _self.areaValue.push(areaObj)
                }

                this.$http.all([
                    this.$http.get('/api/customer/findCustomer/' + _self.customerid),
                    this.$http.get('/api/customer/findAllCustomerLabelsByCustomerId/' + _self.customerid),
                ])
                    .then(this.$http.spread(function (customerdetailResp, LabelsRes) {

                        // 客户详情数据
                        var data = customerdetailResp.data.data

                        _self.formValidate.id = data.id
                        _self.formValidate.channelsource = data.channelsource
                        _self.formValidate.email = data.email
                        _self.formValidate.sourcesubdivision = data.sourcesubdivision
                        _self.formValidate.isbound = data.isbound
                        _self.formValidate.name = data.name
                        _self.formValidate.tel = data.tel
                        _self.formValidate.fixedphone = data.fixedphone
                        _self.formValidate.qq = data.qq
                        _self.formValidate.weixin = data.weixin
                        _self.formValidate.address = data.address
                        _self.customertype = data.customertype
                        _self.formValidate.customersource = data.customersource
                        _self.formValidate.importlevel = data.importlevel.toString()
                        _self.formValidate.area = data.area
                        _self.formValidate.issend = data.issend
                        _self.formValidate.createdate = data.createdate
                        _self.formValidate.updatedate = data.updatedate
                        _self.formValidate.backup = data.backup

                        // 通过客户ID查找客户标签
                        for (var i = 0; i < LabelsRes.data.data.length; i++) {
                            _self.formValidate.customerlabel.push(LabelsRes.data.data[i].id)
                            var a = {}
                            a.id = LabelsRes.data.data[i].id
                            a.labelname = LabelsRes.data.data[i].labelName
                            _self.customerlabel.push(a)
                        }
                    }))
            },
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style>
    .ivu-form-item {
        margin-bottom: 2px
    }
</style>