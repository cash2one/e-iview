<template>
    <div>
        <Button type="ghost" shape="circle" icon="plus" @click="modal3 = true">新增</Button>
        <!--<Button type="ghost" shape="circle" icon="edit">修改</Button>-->
        <!--<Button type="ghost" shape="circle" icon="trash-b">删除</Button>-->
        <Table
                border
                :columns="columns7"
                :data="data6"
                @on-row-dblclick="rowDblClick"
                style="margin-top: 15px"
        ></Table>
        <Modal
                v-model="modal3"
                title="新增"
                :loading="loading"
                @on-ok="ok('formValidate')"
                @on-cancel="cancel('formValidate')">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="姓名" prop="name">
                    <Input v-model="formValidate.name"></Input>
                </FormItem>
                <FormItem label="电话" prop="tel">
                    <Input v-model="formValidate.tel"></Input>
                </FormItem>
                <FormItem label="QQ" prop="qq">
                    <Input v-model="formValidate.qq"></Input>
                </FormItem>
                <FormItem label="微信" prop="wechat">
                    <Input v-model="formValidate.wechat"></Input>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                    <Input v-model="formValidate.email"></Input>
                </FormItem>
                <FormItem label="职位" prop="jobplace">
                    <Input v-model="formValidate.jobplace"></Input>
                </FormItem>
                <FormItem label="发送信息" prop="sendmsgflag">
                    <Select v-model="formValidate.sendmsgflag">
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                    </Select>
                </FormItem>
                <FormItem label="备注" prop="memo">
                    <Input v-model="formValidate.memo" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="modal4"
                title="修改"
                :loading="loading"
                @on-ok="editRelationPerson('formValidate2')"
                @on-cancel="cancel('formValidate2')">
            <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate" :label-width="80">
                <FormItem label="姓名" prop="name">
                    <Input v-model="formValidate2.name"></Input>
                </FormItem>
                <FormItem label="电话" prop="tel">
                    <Input v-model="formValidate2.tel"></Input>
                </FormItem>
                <FormItem label="QQ" prop="qq">
                    <Input v-model="formValidate2.qq"></Input>
                </FormItem>
                <FormItem label="微信" prop="wechat">
                    <Input v-model="formValidate2.wechat"></Input>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                    <Input v-model="formValidate2.email"></Input>
                </FormItem>
                <FormItem label="职位" prop="jobplace">
                    <Input v-model="formValidate2.jobplace"></Input>
                </FormItem>
                <FormItem label="发送信息" prop="sendmsgflag">
                    <Select v-model="formValidate2.sendmsgflag">
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                    </Select>
                </FormItem>
                <FormItem label="备注" prop="memo">
                    <Input v-model="formValidate2.memo" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>

    export default {
        props: ['customerid'],
        data() {
            return {
                loading: true,
                modal3: false,
                modal4: false,
                formValidate: {
                    name: '',
                    tel: '',
                    qq: '',
                    wechat: '',
                    email: '',
                    jobplace: '',
                    sendmsgflag: '',
                    memo: '',
                    customerid: this.customerid
                },
                formValidate2: {
                    name: '',
                    tel: '',
                    qq: '',
                    wechat: '',
                    email: '',
                    jobplace: '',
                    sendmsgflag: '',
                    memo: '',
                    id: ''
                },
                ruleValidate: {
                    name: [
                        {required: true, message: 'The name cannot be empty', trigger: 'blur'}
                    ],
                },
                data6: [],
                columns7: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '电话',
                        key: 'tel'
                    },
                    {
                        title: 'QQ',
                        key: 'qq'
                    },
                    {
                        title: '微信',
                        key: 'wechat'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '职位',
                        key: 'jobplace'
                    },
                    {
                        title: '发送信息',
                        key: 'sendmsgflag'
                    },
                    {
                        title: '备注',
                        key: 'memo'
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
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, [
                                    h('Poptip', {
                                        props: {
                                            confirm: true,
                                            title: '您确定要删除此关系人吗！',
                                        },
                                        on: {
                                            'on-ok': () => {
                                                this.remove(params)
                                            },
                                            'on-cancel': function () {
                                            }
                                        }
                                    }, '删除')
                                ])
                            ]);
                        }
                    }
                ],
                formDynamic: {
                    items: []
                },
                ruleInline: {
                    user: [
                        {required: true, message: 'Please fill in the user name', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: 'Please fill in the password.', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 6,
                            message: 'The password length cannot be less than 6 bits',
                            trigger: 'blur'
                        }
                    ]
                },
            }
        },
        methods: {

            /*************************初始化客户关系人********************************/
            getCustomerRelation() {
                var _self = this
                _self.data6 = []
                this.$http.get('/api/customer/findCustomerRelationById/' + _self.customerid)
                    .then(function (response) {
                        var _customerRelation = response.data.data
                        for (var i = 0; i < _customerRelation.length; i++) {
                            var responseObj = {}
                            responseObj.email = _customerRelation[i].email
                            responseObj.id = _customerRelation[i].id
                            responseObj.jobplace = _customerRelation[i].jobplace
                            responseObj.memo = _customerRelation[i].memo
                            responseObj.name = _customerRelation[i].name
                            responseObj.qq = _customerRelation[i].qq
                            if (_customerRelation[i].sendmsgflag == 1) {
                                responseObj.sendmsgflag = '是'
                            } else {
                                responseObj.sendmsgflag = '否'
                            }
                            responseObj.tel = _customerRelation[i].tel
                            responseObj.wechat = _customerRelation[i].wechat
                            _self.data6.push(responseObj)
                        }
                    })
            },

            /*************************提交录入表单********************************/
            ok(name) {
                var _self = this
                //
                setTimeout(() => {
                    this.loading = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            if (_self.formValidate.tel == '' && _self.formValidate.qq == '' && _self.formValidate.wechat == '') {
                                this.$nextTick(() => {
                                    this.loading = true;
                                });
                                this.$Message.error('电话、QQ、微信必须填写一个');
                            } else {
                                this.$http({
                                    method: 'post',
                                    url: '/api/customer/addCustomerRelation',
                                    data: _self.formValidate,
                                    headers: {'Content-Type': 'application/json'},
                                })
                                    .then(function (response) {
                                        if (response.data.msgCode == '40000') {
                                            _self.$Message.success('新增成功!')
                                            _self.modal3 = false
                                            _self.$refs[name].resetFields();
                                            _self.getCustomerRelation()
                                        } else {
                                            _self.$Message.success('新增失败!')
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
                }, 2000);
            },

            /*************************删除客户关系人********************************/
            remove(e) {
                var _self = this
                this.$http.get('/api/customer/delCustomerRelation/' + e.row.id)
                    .then(function (response) {
                        if (response.data.msgCode == '40000') {
                            _self.getCustomerRelation()
                        }
                    })
            },
            edit(e) {
                var _self = this
                _self.modal4 = true
                if (e.row.sendmsgflag == '否') {
                    _self.formValidate2.sendmsgflag = '0'
                } else {
                    _self.formValidate2.sendmsgflag = '1'
                }
                _self.formValidate2.email = e.row.email
                _self.formValidate2.jobplace = e.row.jobplace
                _self.formValidate2.memo = e.row.memo
                _self.formValidate2.name = e.row.name
                _self.formValidate2.qq = e.row.qq
                _self.formValidate2.tel = e.row.tel
                _self.formValidate2.wechat = e.row.wechat
                _self.formValidate2.id = e.row.id
            },
            editRelationPerson(name) {
                var _self = this

                setTimeout(() => {
                    this.loading = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            if (_self.formValidate2.tel == '' && _self.formValidate2.qq == '' && _self.formValidate2.wechat == '') {
                                this.$nextTick(() => {
                                    this.loading = true;
                                });
                                this.$Message.error('电话、QQ、微信必须填写一个');
                            } else {
                                this.$http({
                                    method: 'post',
                                    url: '/api/customer/updateCustomerRelation',
                                    data: _self.formValidate2,
                                    headers: {'Content-Type': 'application/json'},
                                })
                                    .then(function (response) {
                                        if (response.data.msgCode == '40000') {
                                            _self.$Message.success('修改成功!')
                                            _self.modal4 = false
                                            _self.getCustomerRelation()
                                        } else {
                                            _self.$Message.success('修改失败!')
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
                }, 2000);
            },
            cancel(name) {
                this.$refs[name].resetFields();
            }
        },
        mounted() {
            this.getCustomerRelation()
        }
    }
</script>