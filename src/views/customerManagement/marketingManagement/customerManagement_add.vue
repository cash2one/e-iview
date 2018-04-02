<template>
    <div>
        <Modal
                v-bind:value="modal5"
                title="录入"
                ok-text="保存"
                :styles="{top: '10%'}"
                :loading="loading"
                @on-ok="ok('formValidate')"
                @on-cancel="cancel('formValidate')">
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="80">
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="姓名" prop="name">
                        <Input size="small" v-model="formValidate.name"/>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="电话" prop="tel">
                        <Input size="small" v-model="formValidate.tel"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="固话" prop="fixedphone">
                        <Input size="small" v-model="formValidate.fixedphone"/>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="QQ" prop="qq">
                        <Input size="small" v-model="formValidate.qq"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="微信" prop="weixin">
                        <Input size="small" v-model="formValidate.weixin"/>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="服务地址" prop="address">
                        <Input size="small" v-model="formValidate.address"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="客户状态" prop="customertype">
                        <Cascader trigger="hover" :data="customertypeValue"
                                  v-model="formValidate.customertype"></Cascader>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="客户来源" prop="customersource">
                        <Select v-model="formValidate.customersource" size="small">
                            <Option v-for="item in customersourceValue" :value="item.value" :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="客户等级" prop="importlevel">
                        <Select v-model="formValidate.importlevel" size="small">
                            <Option v-for="item in importlevelValue" :value="item.value" :key="item.value">{{ item.label
                                }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="区域" prop="area">
                        <Select v-model="formValidate.area" size="small">
                            <Option v-for="item in areaValue" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="发送短信" prop="issend">
                        <Select v-model="formValidate.issend" size="small">
                            <Option v-for="item in issendValue" :value="item.value" :key="item.value">{{ item.label
                                }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="标签" prop="customerlabel">
                        <Tag v-for="item in customerlabelGroup" :key="item" :name="item" :id="item.id" closable
                             @on-close="handleClose2">
                            {{ item.labelName }}
                        </Tag>
                        <Button icon="ios-plus-empty" type="dashed" size="small" @click="getLabelData();addTag = true">添加</Button>
                    </FormItem>
                    </Col>
                </Row>
                <FormItem label="备注" prop="backup">
                    <Input size="small" type="textarea" v-model="formValidate.backup"/>
                </FormItem>
                <!--  <FormItem>
                      <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                      <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                  </FormItem>-->
            </Form>
        </Modal>
        <Modal
                v-model="addTag"
                title="添加标签"
                @on-ok="ok2"
                @on-cancel="cancel2">
            <Table
                    border
                    ref="selection"
                    :columns="columns4"
                    :data="data3"
                    @on-selection-change="selectionChange"></Table>
            <Page
                    size="small"
                    :total="pageTotal2"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChange2"
                    @on-page-size-change="pageSizeChange2"
                    style="margin-top: 10px"></Page>
        </Modal>
    </div>
</template>

<script>

    export default {
        props: ['modal5'],
        data() {
            const validateCascader = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('请选择客户状态'));
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
                        callback(new Error('电话格式不正确'));
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
                        callback(new Error('固话格式不正确'));
                    }
                }
            };
            return {
                loading: true,
                customerlabelGroup: [],
                importlevelValue: [],
                issendValue: [],
                areaValue: [],
                customertypeValue: [],
                customersourceValue: [],
                data3: [],
                pageTotal2: '',
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
                ruleValidate: {
                    name: [
                        {required: true, trigger: 'blur', message: '姓名不能为空'}
                    ],
                    customertype: [
                        {required: true, validator: validateCascader, trigger: 'change'}
                    ],
                    customersource: [
                        {required: true, trigger: 'change', message: '请选择客户来源'}
                    ],
                    tel: [
                        {validator: validateTel, trigger: 'blur'}
                    ],
                    fixedphone: [
                        {validator: validateFixedphone, trigger: 'blur'}
                    ],
                    importlevel: [
                        {required: true, trigger: 'change', message: '请选择客户等级'}
                    ],
                    area: [
                        {required: true, trigger: 'change', message: '请选择区域'}
                    ],
                },
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '标签',
                        key: 'labelName'
                    },
                ],
            }
        },
        methods: {

            /*************************录入提交验证********************************/
            ok(name) {
                let _self = this
                setTimeout(() => {
                    this.loading = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            if (_self.customerlabelGroup != undefined) {
                                let labelIds = []
                                for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                                    labelIds.push(_self.customerlabelGroup[i].id)
                                }
                                _self.formValidate.labels = labelIds.toString()
                            }
                            let _customertypeStr = _self.formValidate.customertype[1]
                            _self.formValidate.customertype = _customertypeStr

                            if (_self.formValidate.tel == '' && _self.formValidate.fixedphone == '' && _self.formValidate.qq == '' && _self.formValidate.weixin == '') {
                                this.$nextTick(() => {
                                    this.loading = true;
                                });
                                this.$Message.error('电话、固话、QQ、微信必须填写一个');
                            } else {
                                let url = '/customer/saveCustomer'

                                function doSuccess(response) {
                                    _self.$Message.success('更新成功!')
                                    _self.getData()
                                    _self.$emit('hideAddPanel', 'false');
                                }

                                this.PostData(url, _self.formValidate, doSuccess)
                            }
                        } else {
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                            this.$Message.error('更新失败!');
                        }
                    })
                }, 2000);
            },

            /*************************取消录入，重置表单********************************/
            cancel() {
                let _self = this
                this.$emit('hideAddPanel', 'false');
            },

            /*************************移除标签********************************/
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

            /*************************初始化下拉框********************************/
            getData() {
                let _self = this

                this.searchTypegroup('customerType')
                this.searchTypegroup('cluesource')
                this.searchTypegroup('custImport')
                this.searchTypegroup('area')
                this.searchTypegroup('sf_yn')

                let _customerTypeArr = JSON.parse(localStorage.getItem('customerType'))
                let _cluesourceArr = JSON.parse(localStorage.getItem('cluesource'))
                let _custImportArr = JSON.parse(localStorage.getItem('custImport'))
                let _areaArr = JSON.parse(localStorage.getItem('area'))
                let _sf_ynArr = JSON.parse(localStorage.getItem('sf_yn'))

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
                        if ((finalArrayData[i].children[j].value) == (_self.customertype)) {
                            _self.formValidate.customertype[0] = finalArrayData[i].value
                            _self.formValidate.customertype[1] = _self.customertype
                        }
                    }
                }

                _self.customertypeValue = finalArrayData

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
                    /* this.$http.all([
                    this.$http.get('/api/dataCenter/system/queryForTSTypeByGroupId/' + this.searchTypegroupid('sf_yn')),
                    this.$http.get('/api/customer/findAllCustomerLabelsByPages/1/10000'),
                ])
                    .then(this.$http.spread(function (customertyperesp, customersourceResp, importlevelResp, areaResp, issendResp, LabelsAllRes) {
                    })) */
            },

            /*************************标签选择改变********************************/
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

            getLabelData() {
                var _self = this
                _self.data3 = []
                this.$http.get('/api/label/findAllLabelByPages/1/10')
                    .then(function (data) {
                        var response = data.data.data
                        _self.pageTotal2 = response.length
                        let _customerlabelGroup = []
                        for (var i = 0; i < response.length; i++) {
                            var reponseObj = {}
                            reponseObj.labelName = response[i].labelName
                            reponseObj.id = response[i].id
                            for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                                if (reponseObj.labelName == _self.customerlabelGroup[i].labelName) {
                                    reponseObj._checked = true
                                    _customerlabelGroup.push(reponseObj)
                                }
                            }
                            _self.data3.push(reponseObj)
                        }
//                        _self.customerlabelGroup = _customerlabelGroup
                    })
            },

            selectionChange(e) {
                let _self = this
                _self.customerlabelGroup = []

                for (let i = 0; i < e.length; i++) {
                    let _labels = {}
                    _labels.id = e[i].id
                    _labels.labelName = e[i].labelName
                    _self.customerlabelGroup.push(_labels)
                }
                console.log(_self.customerlabelGroup)
            },
        },
        mounted() {
            this.getData()
        }
    }
</script>