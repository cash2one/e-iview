<template>
    <div>
        <Card>
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="80">
                <FormItem label="姓名" prop="name">
                    <Input size="small" v-model="formValidate.name"/>
                </FormItem>
                <FormItem label="电话" prop="tel">
                    <Input size="small" v-model="formValidate.tel"/>
                </FormItem>
                <FormItem label="固话" prop="fixedphone">
                    <Input size="small" v-model="formValidate.fixedphone"/>
                </FormItem>
                <FormItem label="QQ" prop="qq">
                    <Input size="small" v-model="formValidate.qq"/>
                </FormItem>
                <FormItem label="微信" prop="weixin">
                    <Input size="small" v-model="formValidate.weixin"/>
                </FormItem>
                <FormItem label="服务地址" prop="address">
                    <Input size="small" v-model="formValidate.address"/>
                </FormItem>
                <FormItem label="客户状态" prop="customertype">
                    <Cascader trigger="hover" :data="customertypeValue" v-model="formValidate.customertype"></Cascader>
                </FormItem>
                <FormItem label="客户来源" prop="customersource">
                    <Select v-model="formValidate.customersource" size="small">
                        <Option v-for="item in customersourceValue" :value="item.value" :key="item.value">{{ item.label
                            }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="客户等级" prop="importlevel">
                    <Select v-model="formValidate.importlevel" size="small">
                        <Option v-for="item in importlevelValue" :value="item.value" :key="item.value">{{ item.label
                            }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="区域" prop="area">
                    <Select v-model="formValidate.area" size="small">
                        <Option v-for="item in areaValue" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="发送短信" prop="issend">
                    <Select v-model="formValidate.issend" size="small">
                        <Option v-for="item in issendValue" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="标签" prop="customerlabel">
                    <Tag v-for="item in customerlabel" :key="item.id" :name="item.id" closable @on-close="handleClose2">
                        {{ item.labelname }}
                    </Tag>
                    <Button icon="ios-plus-empty" type="dashed" size="small" @click="modal1 = true">添加</Button>
                    <!--<Poptip placement="right" width="400">
                        <Button icon="ios-plus-empty" type="dashed" size="small">添加</Button>
                        <div class="api" slot="content">
                            <CheckboxGroup v-model="formValidate.customerlabel" @on-change="checkboxChange">
                                <Checkbox v-for="item in customerlabelGroup" :label="item.label">{{ item.value }}
                                </Checkbox>
                            </CheckboxGroup>
                        </div>
                    </Poptip>-->
                </FormItem>
                <FormItem label="创建时间" prop="createdate">
                    <Input disabled size="small" v-model="formValidate.createdate"/>
                </FormItem>
                <FormItem label="更新时间" prop="updatedate">
                    <Input disabled size="small" v-model="formValidate.updatedate"/>
                </FormItem>
                <FormItem label="更新人" prop="gxr">
                    <Input disabled size="small" v-model="formValidate.gxr"/>
                </FormItem>
                <FormItem label="备注" prop="backup">
                    <Input size="small" type="textarea" v-model="formValidate.backup"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                    <Button type="ghost" @click="cancel('formValidate')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </Card>
        <Modal
                v-model="modal1"
                title="标签选择"
                @on-ok="ok"
                @on-cancel="cancel">
            <Table
                    height="300"
                    border ref="selection"
                    @on-selection-change="selectionChange"
                    :columns="columns4"
                    :data="data1"></Table>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../components/bus'

    export default {
        props: ['customerid'],
        data() {
            const validateCascader = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error(' '));
                } else {
                    callback();
                }
            };
            const validateTel = (rule, value, callback) => {
                let re = /^1\d{10}$/
                if (value == '' || value == null) {
                    callback();
                } else {
                    if (re.test(value)) {
                        callback();
                    } else {
                        callback(new Error(' '));
                    }
                }
            };
            const validateFixedphone = (rule, value, callback) => {
                let re = /\d{3}-\d{8}|\d{4}-\d{7}/
                if (value == '' || value == null) {
                    callback();
                } else {
                    if (re.test(value)) {
                        callback();
                    } else {
                        callback(new Error(' '));
                    }
                }
            };
            return {
                modal1: false,
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '标签名',
                        key: 'labelname'
                    },
                    {
                        title: '编码',
                        key: 'labelcode'
                    },
                    {
                        title: '是否为渠道商标签',
                        key: 'channelflag',
                        width: 150
                    },
                    {
                        title: '说明',
                        key: 'labelmemo'
                    }
                ],
                data1: [],
                customerlabelGroup: [],
                importlevelValue: [],
                issendValue: [],
                areaValue: [],
                customertypeValue: [],
                customersourceValue: [],
                ruleValidate: {
                    name: [
                        {required: true, trigger: 'blur'}
                    ],
                    customertype: [
                        {required: true, validator: validateCascader, trigger: 'change'}
                    ],
                    tel: [
                        {validator: validateTel, trigger: 'blur'}
                    ],
                    fixedphone: [
                        {validator: validateFixedphone, trigger: 'blur'}
                    ],
                    customersource: [
                        {required: true, trigger: 'change'}
                    ],
                    importlevel: [
                        {required: true, trigger: 'change'}
                    ],
                    area: [
                        {required: true, trigger: 'change'}
                    ],
                },
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
                    channelsource: ''
                },
                customertype: '',
                customerlabel: []
            }
        },
        methods: {
            getData() {
                let _self = this
                this.searchTypegroup('cluesource')
                this.searchTypegroup('custImport')
                this.searchTypegroup('customerType')
                this.searchTypegroup('area')
                this.searchTypegroup('sf_yn')

                let _cluesourceArr = JSON.parse(localStorage.getItem('cluesource'))
                let _custImportArr = JSON.parse(localStorage.getItem('custImport'))
                let _customerTypeArr = JSON.parse(localStorage.getItem('customerType'))
                let _areaArr = JSON.parse(localStorage.getItem('area'))
                let _sf_ynArr = JSON.parse(localStorage.getItem('sf_yn'))

                // 下拉框-客户来源
                for (let i = 0; i < _cluesourceArr.length; i++) {

                    let customersourceObj = {}

                    customersourceObj.label = _cluesourceArr[i].typename
                    customersourceObj.value = _cluesourceArr[i].typecode
                    _self.customersourceValue.push(customersourceObj)
                }

                // 下拉框-客户等级
                for (let i = 0; i < _custImportArr.length; i++) {

                    let importlevelObj = {}

                    importlevelObj.label = _custImportArr[i].typename
                    importlevelObj.value = _custImportArr[i].typecode
                    _self.importlevelValue.push(importlevelObj)
                }

                // 级联下拉框-客户状态
                let mapdata = new Map()  //用作临时转换
                let subIdToParentMap = new Map()
                let sourceData = _customerTypeArr //结果集
                let finalArrayData = new Array()   //级联下拉框要求的数据格式

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
                        if ((finalArrayData[i].children[j].value) == (_self.customertype)) {
                            _self.formValidate.customertype[0] = finalArrayData[i].value
                            _self.formValidate.customertype[1] = _self.customertype
                        }
                    }
                }

                _self.customertypeValue = finalArrayData

                // 下拉框-区域
                for (let i = 0; i < _areaArr.length; i++) {

                    let areaObj = {}

                    areaObj.label = _areaArr[i].typename
                    areaObj.value = _areaArr[i].typecode
                    _self.areaValue.push(areaObj)
                }

                // 下拉框-发送短信
                for (let i = 0; i < _sf_ynArr.length; i++) {

                    let issendObj = {}

                    issendObj.label = _sf_ynArr[i].typename
                    issendObj.value = _sf_ynArr[i].typecode
                    _self.issendValue.push(issendObj)
                }

                this.$http.all([
                    this.$http.get('/api/customer/findCustomer/' + _self.customerid),
                    this.$http.get('/api/customer/findAllCustomerLabelsByPages/1/10000'),
                    this.$http.get('/api/customer/findAllCustomerLabelsByCustomerId/' + _self.customerid),
                ])
                    .then(this.$http.spread(function (customerdetailResp, LabelsAllRes, LabelsRes) {

                        // 客户详情数据
                        let data = customerdetailResp.data.data

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
                        for (let i = 0; i < LabelsRes.data.data.length; i++) {
                            _self.formValidate.customerlabel.push(LabelsRes.data.data[i].id)
                            let a = {}
                            a.id = LabelsRes.data.data[i].id
                            a.labelname = LabelsRes.data.data[i].labelName
                            _self.customerlabel.push(a)
                        }

                        // 标签
                        for (let i = 0; i < LabelsAllRes.data.data.length; i++) {
                            let areaObj = {}

                            areaObj.id = LabelsAllRes.data.data[i].id
                            areaObj.labelname = LabelsAllRes.data.data[i].labelname
                            areaObj.labelcode = LabelsAllRes.data.data[i].labelcode
                            areaObj.labelmemo = LabelsAllRes.data.data[i].labelmemo
                            areaObj.channelflag = (LabelsAllRes.data.data[i].channelflag == '0' ? '否' : '是')

                          /*  for (let j = 0; j < _self.customerlabel.length; j++) {
                                if (areaObj.id == _self.customerlabel[j].id) {
                                    areaObj._checked = true
                                    break;
                                } else {
                                    continue;
                                }
                            }*/

                            _self.data1.push(areaObj)
                        }
                    }))
            },

            checkboxChange(e) {
                let _self = this
                _self.customerlabel = []
                for (let i = 0; i < e.length; i++) {
                    for (let j = 0; j < _self.customerlabelGroup.length; j++) {
                        if (e[i] == _self.customerlabelGroup[j].label) {
                            _self.customerlabel.push(_self.customerlabelGroup[j].value)
                        }
                    }
                }
                _self.formValidate.customerlabel.push(_Obj)
            },

            handleSubmit(name) {
                let _self = this
                this.$refs[name].validate((valid) => {
                    let labelIds = []
                    console.log(_self.customerlabel)
                    for (let i = 0; i < _self.customerlabel.length; i++) {
                        labelIds.push(_self.customerlabel[i].id)
                        /*for (let j = 0; j < _self.customerlabelGroup.length; j++) {
                            if (_self.customerlabel[i] == _self.customerlabelGroup[j].value) {
                                labelIds.push(_self.customerlabelGroup[j].label)
                            }
                        }*/
                    }
                    if (valid) {
                        let _customertypeStr = _self.formValidate.customertype[1]
                        _self.formValidate.customertype = _customertypeStr
                        _self.formValidate.labels = labelIds.toString()

                        if ((_self.formValidate.tel == '' || _self.formValidate.tel == null) && (_self.formValidate.fixedphone == '' || _self.formValidate.fixedphone == null) && (_self.formValidate.qq == '' || _self.formValidate.qq == null) && (_self.formValidate.weixin == '' || _self.formValidate.weixin == null)) {
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                            this.$Message.error('电话、固话、QQ、微信必须填写一个');
                        } else {
                            this.$http({
                                method: 'post',
                                url: '/api/customer/updateCustomer',
                                data: _self.formValidate,
                                headers: {'Content-Type': 'application/json'},
                            })
                                .then(function (response) {
                                    if (response.data.msgCode == '40000') {
                                        _self.$Message.success('更新成功!')
                                        Bus.$emit('msg', '')
                                        _self.getData()
                                    }
                                })
                        }
                    } else {
                        this.$Message.error('更新失败!');
                    }
                })
            },

            handleClose2(event, name) {
                let _self = this
                for (let i = 0; i < _self.customerlabel.length; i++) {
                    if (_self.customerlabel[i] == name) {
                        let index = _self.customerlabel.indexOf(name);
                        if (index > -1) {
                            _self.customerlabel.splice(index, 1);
                        }
                    }
                }
            },

            selectionChange (e) {
                console.log(e)
                let _self = this
                _self.customerlabel = []
                for (let i = 0; i < e.length; i++) {
                    let a = {}
                    a.id = e[i].id
                    a.labelname = e[i].labelname
                    _self.customerlabel.push(a)
                }
            },

            cancel(name) {
                this.$refs[name].resetFields();
            }
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