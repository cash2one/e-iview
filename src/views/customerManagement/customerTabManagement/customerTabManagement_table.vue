<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="plus" @click="modal1 = true">录入</Button>
                </ButtonGroup>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        highlight-row
                        size="small"
                        :columns="columns"
                        :data="data"
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
                v-model="modal1"
                title="录入"
                :loading="loading"
                @on-ok="addTag('formValidate')"
                @on-cancel="cancel('formValidate')">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="标签名" prop="labelname">
                    <Input v-model="formValidate.labelname"></Input>
                </FormItem>
                <FormItem label="编码" prop="labelcode">
                    <Input v-model="formValidate.labelcode"></Input>
                </FormItem>
                <FormItem label="是否为渠道商标签" prop="channelflag">
                    <Select v-model="formValidate.channelflag">
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                    </Select>
                </FormItem>
                <FormItem label="说明" prop="labelmemo">
                    <Input v-model="formValidate.labelmemo" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="modal2"
                title="编辑"
                @on-ok="editTag"
                @on-cancel="cancel">
            <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate" :label-width="120">
                <FormItem label="标签名" prop="labelname">
                    <Input v-model="formValidate2.labelname"></Input>
                </FormItem>
                <FormItem label="编码" prop="labelcode">
                    <Input v-model="formValidate2.labelcode"></Input>
                </FormItem>
                <FormItem label="是否为渠道商标签" prop="channelflag">
                    <Select v-model="formValidate2.channelflag">
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                    </Select>
                </FormItem>
                <FormItem label="说明" prop="labelmemo">
                    <Input v-model="formValidate2.labelmemo" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                title: '录入',
                isEidt: false,
                modal1: false,
                loading: true,
                issendValue: [],
                formValidate: {
                    id: '',
                    labelname: '',
                    labelcode: '',
                    channelflag: '',
                    labelmemo: ''
                },
                formValidate2: {
                    id: '',
                    labelname: '',
                    labelcode: '',
                    channelflag: '',
                    labelmemo: ''
                },
                ruleValidate: {
                    labelname: [
                        {required: true, message: '请填写标签名', trigger: 'blur'}
                    ],
                    labelcode: [
                        {required: true, message: '请填写标签编码', trigger: 'blur'},
                    ],
                    channelflag: [
                        {required: true, message: '请选择是否为渠道商标签', trigger: 'change'}
                    ],
                },
                columns: [{
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                    {
                        title: '标签名称',
                        key: 'labelname',
                        width: 120
                    },
                    {
                        title: '编码',
                        key: 'labelcode',
                    },
                    {
                        title: '是否为渠道商标签',
                        key: 'channelflag',
                        width: 150
                    },
                    {
                        title: '说明',
                        key: 'labelmemo',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: [],
                pageTotal: '',
                pageSize: 10,
                customerid: ''
            }
        },
        methods: {
            // 表格数据请求
            getTableData() {
                var _self = this
                _self.data = []
                this.$http.get('/api/customer/findAllCustomerLabelCount')
                    .then(function (response) {
                        _self.pageTotal = response.data.data
                    })
                this.$http.get('/api/customer/findAllCustomerLabelsByPages/1/10')
                    .then(function (data) {
                        var response = data.data.data
                        for (var i = 0; i < response.length; i++) {
                            var reponseObj = {}
                            reponseObj.labelname = response[i].labelname
                            reponseObj.labelcode = response[i].labelcode
                            reponseObj.labelmemo = response[i].labelmemo
                            reponseObj.id = response[i].id
                            if (response[i].channelflag == 0) {
                                reponseObj.channelflag = '否'
                            } else {
                                reponseObj.channelflag = '是'
                            }
                            _self.data.push(reponseObj)
                        }
                    })
            },
            // 表格行选中事件
            selectRow(a) {
                var _self = this
                _self.customerid = a.customerId
            },
            // 改变页码
            pageChange(a) {
                var _self = this
                var url = '/api/customer/findAllCustomerLabelsByPages/' + a + '/' + _self.pageSize
                this.$http.get(url)
                    .then(function (data) {
                        _self.data = []
                        var response = data.data.data
                        for (var i = 0; i < response.length; i++) {
                            var reponseObj = {}
                            reponseObj.labelname = response[i].labelname
                            reponseObj.labelcode = response[i].labelcode
                            reponseObj.labelmemo = response[i].labelmemo
                            reponseObj.id = response[i].id
                            if (response[i].channelflag == 0) {
                                reponseObj.channelflag = '否'
                            } else {
                                reponseObj.channelflag = '是'
                            }
                            _self.data.push(reponseObj)
                        }
                    })

            },
            // 改变每页显示的数据条数
            pageSizeChange(a) {
                var _self = this
                _self.pageSize = a
                _self.data = []
                this.$http.get('/api/customer/findAllCustomerLabelsByPages/1/' + a)
                    .then(function (data) {
                        var response = data.data.data
                        for (var i = 0; i < response.length; i++) {
                            var reponseObj = {}
                            reponseObj.labelname = response[i].labelname
                            reponseObj.labelcode = response[i].labelcode
                            reponseObj.labelmemo = response[i].labelmemo
                            reponseObj.id = response[i].id
                            if (response[i].channelflag == 0) {
                                reponseObj.channelflag = '否'
                            } else {
                                reponseObj.channelflag = '是'
                            }
                            _self.data.push(reponseObj)
                        }
                    })
            },
            addTag(name) {
                let _self = this

                setTimeout(() => {
                    this.loading = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            this.$http({
                                method: 'post',
                                url: '/api/customer/addCustomerLabel',
                                data: _self.formValidate,
                                headers: {'Content-Type': 'application/json'},
                            })
                                .then(function (response) {
                                    if (response.data.msgCode == 40000) {
                                        _self.$Message.success('录入成功!')
                                        _self.getTableData()
                                    }
                                })
                        } else {
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                            this.$Message.error('录入失败!');
                        }
                    })
                }, 2000)
            },
            edit(e) {
                var _self = this
                _self.modal2 = true
                if (e.row.channelflag == '否') {
                    _self.formValidate2.channelflag = '0'
                } else {
                    _self.formValidate2.channelflag = '1'
                }
                _self.formValidate2.labelname = e.row.labelname
                _self.formValidate2.labelcode = e.row.labelcode
                _self.formValidate2.labelmemo = e.row.labelmemo
                _self.formValidate2.id = e.row.id
            },
            editTag() {
                var _self = this
                this.$http({
                    method: 'post',
                    url: '/api/customer/updateCustomerLabel',
                    data: _self.formValidate2,
                    headers: {'Content-Type': 'application/json'},
                })
                    .then(function (response) {
                        if (response.data.msgCode == '40000') {
                            _self.getTableData()
                        }
                    })
            },
            remove(e) {
                var _self = this
                this.$http.get('/api/customer/delCustomerLabel/' + e.row.id)
                    .then(function (response) {
                        if (response.data.msgCode == '40000') {
                            _self.getTableData()
                        }
                    })
            },
            cancel(name) {
                this.$refs[name].resetFields();
            }
        },
        mounted() {
            this.getTableData()
        }
    }
</script>