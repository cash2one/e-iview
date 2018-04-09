<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="plus" @click="modal_add = true">录入</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
                </ButtonGroup>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        highlight-row
                        size="small"
                        :columns="columns"
                        :data="data2"
                        @on-current-change="selectRow"></Table>
                <Page
                        size="small"
                        :total="pageTotal"
                        show-total
                        show-sizer
                        show-elevator
                        @on-change="pageChange"
                        @on-page-size-change="pageSizeChange"
                        style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <Modal
                v-model="modal_add"
                title="录入"
                :loading="loading"
                @on-ok="handleSubmit('formValidate')"
                @on-cancel="cancel('formValidate')">
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="80">
                <Row :gutter="16" style="height:56px">
                    <Col span="12">
                    <FormItem label="客户名称" prop="customerName">
                        <Input v-model="formValidate.customerName" size="small"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="电话" prop="customerMobilePhone">
                        <Input v-model="formValidate.customerMobilePhone" size="small"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" style="height:56px">
                    <Col span="12">
                    <FormItem label="固话" prop="customerTel">
                        <Input v-model="formValidate.customerTel" size="small"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="QQ" prop="customerQQ">
                        <Input v-model="formValidate.customerQQ" size="small"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" style="height:56px">
                    <Col span="12">
                    <FormItem label="微信" prop="customerWechat">
                        <Input v-model="formValidate.customerWechat" size="small"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="邮箱" prop="customerEmail">
                        <Input v-model="formValidate.customerEmail" size="small"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="区域" prop="customerArea">
                        <Select v-model="formValidate.customerArea" size="small">
                            <Option v-for="item in areaValue" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="客户状态" prop="customerStatus">
                        <Cascader trigger="hover" :data="customertypeValue"
                                  v-model="formValidate.customerStatus"></Cascader>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" style="height:56px">
                    <Col span="12">
                    <FormItem label="客户等级" prop="customerLevel">
                        <Select v-model="formValidate.customerLevel" size="small">
                            <Option v-for="item in importlevelValue" :value="item.value" :key="item.value">{{ item.label
                                }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <FormItem label="标签" prop="customerTags" style="height:56px">
                    <Tag v-for="item in customerlabelGroup" :key="item" :name="item" :id="item.id" closable
                         @on-close="handleClose2">
                        {{ item.labelName }}
                    </Tag>
                    <Button icon="ios-plus-empty" type="dashed" size="small" @click="getLabelData();addTag = true">添加</Button>
                </FormItem>
                <FormItem label="备注" prop="customerMemo">
                    <Input size="small" type="textarea" v-model="formValidate.customerMemo"/>
                </FormItem>
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
        data() {
            const validateCascader = (rule, value, callback) => {
                if (value == '' || value == null) {
                    callback(new Error('请选择客户状态'));
                } else {
                    callback();
                }
            };
            const validateTel = (rule, value, callback) => {
                var re = /^1\d{10}$/
                if (value == '' || value == null) {
                    callback(new Error('电话不能为空'));
                } else {
                    if (re.test(value)) {
                        let url = '/channel/customer/channel/checkMobilephoneIsExist/0/' + value

                        function doSuccess(response) {
                            if (response.data.data == true) {
                                callback(new Error('抱歉，该号码已经存在'));
                            } else {
                                callback();
                            }
                        }

                        this.GetData(url, doSuccess)

                    } else {
                        callback(new Error('电话格式不正确'));
                    }
                }
            };
            const validateFixedphone = (rule, value, callback) => {
                var re = /\d{3}-\d{8}|\d{4}-\d{7}/
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
                modal_add: false,
                addTag: false,
                loading: true,
                pageTotal: '',
                pageTotal2: '',
                customerid: '',
                data2: [],
                data3: [],
                customerlabelGroup: [],
                areaValue: [],
                customertypeValue: [],
                importlevelValue: [],
                pageSize: '10',
                labelpagesize: '10',
                labelpage:'1',
                formValidate: {
                    customerName: '',
                    customerTel: '',
                    customerMobilePhone: '',
                    customerWechat: '',
                    customerEmail: '',
                    customerQQ: '',
                    customerArea: '',
                    customerLevel: '',
                    customerTags: '',
                    customerMemo: '',
                    customerStatus: []
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
                ruleValidate: {
                    customerTel: [
                        {validator: validateFixedphone, trigger: 'blur'}
                    ],
                    customerName: [
                        {required: true, trigger: 'blur', message: '客户名称不能为空'}
                    ],
                    customerArea: [
                        {required: true, trigger: 'change', message: '请选择区域'}
                    ],
                    customerStatus: [
                        {required: true, validator: validateCascader, trigger: 'change'}
                    ],
                    customerMobilePhone: [
                        {required: true, validator: validateTel, trigger: 'blur'}
                    ],
                },
                columns: [
                    {
                        title: '客户名称',
                        key: 'customer_name',
                        width: 100,
                    },
                    {
                        title: '联系方式',
                        key: 'people',
                        render: (h, params) => {
                            return h('Poptip', {
                                props: {
                                    trigger: 'hover',
                                    title: '联系方式',
                                    placement: 'bottom'
                                }
                            }, [
                                h('span', this.data2[params.index].customer_mobile_phone + '    '),
                                h('Icon', {
                                    props: {
                                        type: 'arrow-down-b',
                                    }
                                }),
                                h('div', {
                                    slot: 'content'
                                }, [
                                    h('ul', this.data2[params.index].people.map(item => [
                                        h('li', {
                                            style: {
                                                padding: '4px'
                                            }
                                        }, '手机：' + item.customer_mobile_phone),
                                        h('li', {
                                            style: {
                                                padding: '4px'
                                            }
                                        }, '固话：' + item.customer_tel),
                                        h('li', {
                                            style: {
                                                padding: '4px'
                                            }
                                        }, 'Q  Q：' + item.customerqq),
                                        h('li', {
                                            style: {
                                                padding: '4px'
                                            }
                                        }, '微信：' + item.customer_wechat)
                                    ]))
                                ])
                            ]);
                        },
                        width: 150,
                    },
                    {
                        title: '客户状态',
                        key: 'customer_status',
                        width: 100
                    },
                    {
                        title: '线索状态',
                        key: 'cluestatus',
                        width: 100
                    },
                    {
                        title: '地区',
                        key: 'customer_area',
                        width: 80
                    },
                    {
                        title: '销售',
                        key: 'followbyname',
                        width: 120
                    },
                    {
                        title: '创建人',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '更新时间',
                        key: 'updatedate',
                        width: 150
                    },
                    {
                        title: '创建时间',
                        key: 'createdate',
                        width: 150
                    },
/*                    {
                        title: '线索变化剩余时长',
                        key: 'isbound',
                        width: 140
                    },*/
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 70,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.examine(params)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }
                    }
                ],
            }
        },
        methods: {
            getData() {
                let _self = this
                let url = '/channel/customer/channel/1/10/list'
                _self.data2 = []

                function doSuccess(response) {
                    let _data = response.data.data
                    console.log(_data)

//                    _self.searchTypegroup('customerType')
                    _self.pageTotal = Number(_data.total)

                    for (let i = 0; i < _data.rows.length; i++) {
                        /*   let _customerTypeArr = JSON.parse(localStorage.getItem('customerType'))
                           for (let j = 0; j < _customerTypeArr.length; j++) {
                               if (_data.rows[i].customer_status == _customerTypeArr[j].) {

                               }
                           }*/
                        _self.data2.push({
                            cluestatus: _data.rows[i].cluestatus,
                            followbyname: _data.rows[i].followbyname,
                            customer_name: _data.rows[i].customer_name,
                            channel_name: _data.rows[i].channel_name,
                            createdate: (_data.rows[i].createdate).substr(0,10),
                            customer_area: _data.rows[i].customer_area,
                            customer_email: _data.rows[i].customer_email,
                            customer_level: _data.rows[i].customer_level,
                            customer_memo: _data.rows[i].customer_memo,
                            customer_status: _data.rows[i].customer_status,
                            customer_tags: _data.rows[i].customer_tags,
                            customer_id: _data.rows[i].customer_id,
                            updatedate:  (_data.rows[i].updatedate).substr(0,10),
                            createby: _data.rows[i].createby,
                            customer_mobile_phone: _data.rows[i].customer_mobile_phone,
                            people: [
                                {
                                    customer_mobile_phone: _data.rows[i].customer_mobile_phone,
                                    customer_tel: _data.rows[i].customer_tel,
                                    customer_wechat: _data.rows[i].customer_wechat,
                                    customerqq: _data.rows[i].customerqq,
                                }
                            ]
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 改变页码
            pageChange(a) {
                let _self = this
               
                let url = '/channel/customer/channel/' + a + '/' + _self.pageSize + '/list'

                _self.data2 = []

                function doSuccess(response) {
                    let _data = response.data.data
//                    _self.searchTypegroup('customerType')
                    _self.pageTotal = _data.total

                    for (let i = 0; i < _data.rows.length; i++) {
                        /*   let _customerTypeArr = JSON.parse(localStorage.getItem('customerType'))
                           for (let j = 0; j < _customerTypeArr.length; j++) {
                               if (_data.rows[i].customer_status == _customerTypeArr[j].) {

                               }
                           }*/
                        _self.data2.push({
                            cluestatus: _data.rows[i].cluestatus,
                            followbyname: _data.rows[i].followbyname,
                            customer_name: _data.rows[i].customer_name,
                            channel_name: _data.rows[i].channel_name,
                            createdate: _data.rows[i].createdate,
                            customer_area: _data.rows[i].customer_area,
                            customer_email: _data.rows[i].customer_email,
                            customer_level: _data.rows[i].customer_level,
                            customer_memo: _data.rows[i].customer_memo,
                            customer_status: _data.rows[i].customer_status,
                            customer_tags: _data.rows[i].customer_tags,
                            customer_id: _data.rows[i].customer_id,
                            updatedate: _data.rows[i].updatedate,
                            createby: _data.rows[i].createby,
                            customer_mobile_phone:_data.rows[i].customer_mobile_phone,
                            people: [
                                {
                                    customer_mobile_phone: _data.rows[i].customer_mobile_phone,
                                    customer_tel: _data.rows[i].customer_tel,
                                    customer_wechat: _data.rows[i].customer_wechat,
                                    customerqq: _data.rows[i].customerqq,
                                }
                            ]
                        })                       
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 改变每页显示的数据条数
            pageSizeChange(a) {
                let _self = this
                let url = '/channel/customer/channel/1/'+ a +'/list'
                _self.pageSize = a
                _self.data2 = []

                function doSuccess(response) {
                    let _data = response.data.data

//                    _self.searchTypegroup('customerType')
                    _self.pageTotal = _data.total

                    for (let i = 0; i < _data.rows.length; i++) {
                        /*   let _customerTypeArr = JSON.parse(localStorage.getItem('customerType'))
                           for (let j = 0; j < _customerTypeArr.length; j++) {
                               if (_data.rows[i].customer_status == _customerTypeArr[j].) {

                               }
                           }*/
                        _self.data2.push({
                            cluestatus: _data.rows[i].cluestatus,
                            followbyname: _data.rows[i].followbyname,
                            customer_name: _data.rows[i].customer_name,
                            channel_name: _data.rows[i].channel_name,
                            createdate: _data.rows[i].createdate,
                            customer_area: _data.rows[i].customer_area,
                            customer_email: _data.rows[i].customer_email,
                            customer_level: _data.rows[i].customer_level,
                            customer_memo: _data.rows[i].customer_memo,
                            customer_status: _data.rows[i].customer_status,
                            customer_tags: _data.rows[i].customer_tags,
                            customer_id: _data.rows[i].customer_id,
                            updatedate: _data.rows[i].updatedate,
                            createby: _data.rows[i].createby,
                            customer_mobile_phone:_data.rows[i].customer_mobile_phone,
                            people: [
                                {
                                    customer_mobile_phone: _data.rows[i].customer_mobile_phone,
                                    customer_tel: _data.rows[i].customer_tel,
                                    customer_wechat: _data.rows[i].customer_wechat,
                                    customerqq: _data.rows[i].customerqq,
                                }
                            ]
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            addCustomerChannel() {
                this.searchTypegroup('area')
                this.searchTypegroup('custImport')
                this.searchTypegroup('customerType')

                let _self = this
                let _areaArr = JSON.parse(localStorage.getItem('area'))
                let _custImportArr = JSON.parse(localStorage.getItem('custImport'))
                let _customerTypeArr = JSON.parse(localStorage.getItem('customerType'))

                for (let j = 0; j < _areaArr.length; j++) {
                    _self.areaValue.push({
                        label: _areaArr[j].typename,
                        value: _areaArr[j].typecode
                    })
                }

                for (let i = 0; i < _custImportArr.length; i++) {
                    _self.importlevelValue.push({
                        label: _custImportArr[i].typename,
                        value: _custImportArr[i].typecode
                    })
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
                            _self.formValidate.customerStatus[0] = finalArrayData[i].value
                            _self.formValidate.customerStatus[1] = _self.customertype
                        }
                    }
                }

                _self.customertypeValue = finalArrayData
            },
            examine(e) {
                this.$emit('isExamine', e.row.customer_id)
            },
            // 表格行选中事件
            selectRow(a) {
                var _self = this
                _self.customerid = a.customer_id
            },
            handleSubmit(name) {
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
                                _self.formValidate.customerTags = labelIds.toString()
                            }
                            let _customertypeStr = _self.formValidate.customerStatus[1]
                            _self.formValidate.customerStatus = _customertypeStr
                            if ((_self.formValidate.customerTel == '' || _self.formValidate.customerTel == null) && (_self.formValidate.customerMobilePhone == '' || _self.formValidate.customerMobilePhone == null) && (_self.formValidate.customerWechat == '' || _self.formValidate.customerWechat == null) && (_self.formValidate.customerQQ == '' || _self.formValidate.weixin == null)) {
                                this.$nextTick(() => {
                                    this.loading = true;
                                });
                                this.$Message.error('电话、固话、QQ、微信必须填写一个');
                            } else {
                                _self.loading = true
                                this.$http({
                                    method: 'post',
                                    url: 'api/channel/customer/channel/create',
                                    data: _self.formValidate,
                                })
                                    .then(function (response) {
                                        if (response.data.msgCode == '40000') {
                                            _self.$Message.success('新增成功!')
                                            _self.cancel('formValidate')
                                            _self.getData()
                                            _self.modal_add = false
                                        }
                                    })
                            }
                        } else {
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                            this.$Message.error('新增失败!');
                        }
                    })
                }, 2000)
            },
            cancel(name) {
                this.$refs[name].resetFields();
            },
            downloadExcel() {
                let url = '/channel/customer/channel/1/9999999/list'
                let _objdata = {}
                let _objdataType = {}
                let _response = JSON.parse(localStorage.getItem('area'))
                let _customerTypeArr = JSON.parse(localStorage.getItem('customerType'))

                this.searchTypegroup('area')

                for(let i = 0; i < _response.length; i++) {
                    _objdata[_response[i].typecode] = _response[i].typename
                }

                for(let j = 0; j < _customerTypeArr.length; j++) {
                    _objdataType[_customerTypeArr[j].subid] = _customerTypeArr[j].subtypename
                }

                let arrdata = [
                    {
                        field: 'customer_name',title: '客户名称'
                    },
                    {
                        field: 'customer_status',title: '客户状态',format: _objdataType
                    },
                    {
                        field: 'cluestatus',title: '线索状态'
                    },
                    {
                        field:'customer_area',title:'地区',format: _objdata
                    },
                    {
                        field: 'followbyname',title: '销售'
                    },
                    {
                        field: 'createby',title: '创建人'
                    },
                    {
                        field: 'updatedate',title: '更新时间'
                    },
                    {
                        field: 'createdate',title: '创建时间'
                    },
                    ]

                this.DownloadExcel(url, JSON.stringify(arrdata))
            },
            //  获取标签信息
            getLabelData() {
                var _self = this
                _self.data3 = []
                this.$http.get('/api/label/findAllLabelByPages/1/10')
                    .then(function (data) {
                        console.log(data)
                        var response = data.data.data
                        var length = response.rows.length
                        _self.pageTotal2 = response.total
                        let _customerlabelGroup = []
                        for (var i = 0; i < length; i++) {
                            var reponseObj = {}
                            reponseObj.labelName = response.rows[i].labelName
                            reponseObj.id = response.rows[i].id
                            for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                                if (reponseObj.labelName == _self.customerlabelGroup[i].labelName) {
                                    reponseObj._checked = true
                                    _customerlabelGroup.push(reponseObj)
                                }
                            }
                            _self.data3.push(reponseObj)
                        }
                    //    _self.customerlabelGroup = _customerlabelGroup
                    }).catch(function(e){
                        console.log(e)
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
            },
            ok2(){

            },
            cancel2(){

            },
            pageChange2(index){
                var _self = this
                _self.labelpage = index
                _self.data3 = []                
                var url = '/api/label/findAllLabelByPages/'+_self.labelpage +'/' + _self.labelpagesize
                this.$http.get(url)
                    .then(function (data) {
                        var response = data.data.data
                        var length = response.rows.length
                        _self.pageTotal2 = response.total
                        let _customerlabelGroup = []
                        for (var i = 0; i < length; i++) {
                            var reponseObj = {}
                            reponseObj.labelName = response.rows[i].labelName
                            reponseObj.id = response.rows[i].id
                            for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                                if (reponseObj.labelName == _self.customerlabelGroup[i].labelName) {
                                    reponseObj._checked = true
                                    _customerlabelGroup.push(reponseObj)
                                }
                            }
                            _self.data3.push(reponseObj)
                        }
                    //    _self.customerlabelGroup = _customerlabelGroup
                    })
            },
            pageSizeChange2(index){
                var _self = this
                _self.labelpagesize = index
                _self.data3 = []                
                var url = '/api/label/findAllLabelByPages/'+_self.labelpage +'/' + _self.labelpagesize
                this.$http.get(url)
                    .then(function (data) {
                        var response = data.data.data
                        var length = response.rows.length
                        _self.pageTotal2 = response.total
                        let _customerlabelGroup = []
                        for (var i = 0; i < length; i++) {
                            var reponseObj = {}
                            reponseObj.labelName = response.rows[i].labelName
                            reponseObj.id = response.rows[i].id
                            for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                                if (reponseObj.labelName == _self.customerlabelGroup[i].labelName) {
                                    reponseObj._checked = true
                                    _customerlabelGroup.push(reponseObj)
                                }
                            }
                            _self.data3.push(reponseObj)
                        }
                    //    _self.customerlabelGroup = _customerlabelGroup
                    })

            }

        },
        mounted() {
            this.getData()
            this.addCustomerChannel()
        }
    }
</script>