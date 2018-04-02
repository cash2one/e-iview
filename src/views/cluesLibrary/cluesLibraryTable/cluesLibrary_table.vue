<style lang="less">
    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
        }
    }
</style>
<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="ios-color-wand-outline" @click="AddClues">新增线索</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="EditClues">编辑</Button>
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
                v-model="modal2"
                title="新增线索"
                class-name="vertical-center-modal"
                ok-text="保存"
                :styles="{top: '10%'}"
                :loading="loading"
                @on-ok="ok22('formValidate')"
                @on-cancel="cancel('formValidate')">
            <Form ref="formValidate" :model="formValidate"  :rules="ruleValidate" :label-width="70">
                <FormItem label="公司名" prop="companyname">
                    <Input v-model="formValidate.companyname" @on-focus="getCompany"></Input>
                </FormItem>
                <FormItem label="线索类型" prop="cluestype">
                    <Select v-model="formValidate.cluestype" filterable>
                        <Option v-for="item in cluesTypeValue" :value="item.value" :key="item.value">{{ item.label
                            }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="线索标签" prop="labels">
                    <Tag v-for="item in customerlabelGroup" :key="item" :name="item" :id="item.id" closable
                         @on-close="handleClose2">
                        {{ item.labelName }}
                    </Tag>
                    <Button icon="ios-plus-empty" type="dashed" size="small" @click="getLabelData();addTag = true">添加</Button>
                </FormItem>
                <FormItem label="线索说明" prop="cluescontent">
                    <Input v-model="formValidate.cluescontent" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="modal3"
                title="编辑线索"
                class-name="vertical-center-modal"
                ok-text="保存"
                :styles="{top: '10%'}"
                :loading="loading2"
                @on-ok="ok('formValidate2')"
                @on-cancel="cancel('formValidate2')">
            <Form ref="formValidate2" :model="formValidate2" :label-width="70">
                <FormItem label="公司名称" prop="companyname">
                    <Input v-model="formValidate2.companyname" disabled></Input>
                </FormItem>
                <FormItem label="客户名称" prop="customername">
                    <Input v-model="formValidate2.customername" disabled></Input>
                </FormItem>
                <FormItem label="客户电话" prop="tel">
                    <Input v-model="formValidate2.tel" disabled></Input>
                </FormItem>
                <FormItem label="线索状态" prop="cluesstatus">
                    <Input v-model="formValidate2.cluesstatus" disabled></Input>
                </FormItem>
                <FormItem label="线索类型" prop="cluestype">
                    <Input v-model="formValidate2.cluestype" disabled></Input>
                </FormItem>
                <FormItem label="创建人" prop="createby">
                    <Input v-model="formValidate2.createby" disabled></Input>
                </FormItem>
                <FormItem label="创建时间" prop="createdate">
                    <Input v-model="formValidate2.createdate" disabled></Input>
                </FormItem>
                <FormItem label="线索标签" prop="labelName">
                    <Tag v-for="item in customerlabelGroup" :key="item" :name="item" :id="item.id" closable
                         @on-close="handleClose2">
                        {{ item.labelName }}
                    </Tag>
                    <Button icon="ios-plus-empty" type="dashed" size="small" @click="getLabelData();addTag = true">添加</Button>
                </FormItem>
                <FormItem label="线索说明" prop="cluescontent">
                    <Input v-model="formValidate2.cluescontent" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"></Input>
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
                    :data="data"
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
        <Modal
                v-model="selectCompany"
                title="选择公司"
                width="50%"
                @on-ok="ok3"
                @on-cancel="cancel3">
            <Row  :gutter="16">
                <Col span="8">
                <Input v-model="searchCompany" placeholder="输入公司名称搜索" @on-keydown="keyDown">
                <Button slot="append" icon="ios-search" @click="searchCompanyData"></Button>
                </Input>
                </Col>
            </Row>
            <Table
                    style="margin-top: 10px"
                    border
                    highlight-row
                    size="small"
                    ref="selection"
                    :columns="columns44"
                    :data="data4"
                    @on-row-click="rowSelect"></Table>
            <Page
                    size="small"
                    :total="pageTotal3"
                    :current.sync="currentPage"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChange3"
                    @on-page-size-change="pageSizeChange3"
                    style="margin-top: 10px"></Page>
        </Modal>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                addTag: false,
                isEidt: false,
                modal1: false,
                modal2: false,
                modal3: false,
                selectCompany: false,
                loading: true,
                loading2: true,
                ruleValidate: {
                    companyname: [
                        { required: true, message: '请选择公司'}
                    ],
                    cluestype: [
                        { required: true, message: '请选择线索类型', trigger: 'change' }
                    ],
                    cluescontent: [
                        { required: true, message: '请填写线索说明', trigger: 'blur' },
                    ]
                },
                formValidate: {
                    lables: '',
                    companyid: '',
                    cluestype: '',
                    cluescontent: '',
                    companyname: '',
                },
                formValidate2: {
                    cluescontent: '',
                    cluestype: '',
                    cluesstatus: '',
                    companyid: '',
                    companyname: '',
                    createby: '',
                    customername: '',
                    id: '',
                    label: '',
                    receiveby: '',
                    tel: '',
                    createdate: ''
                },
                columns: [
                    {
                        title: '公司名称',
                        key: 'companyname',
                        width: 280,
                    },
                    {
                        title: '客户信息',
                        key: 'people',
                        render: (h, params) => {
                            return h('Poptip', {
                                props: {
                                    trigger: 'hover',
                                    title: '客户信息',
                                    placement: 'bottom'
                                }
                            }, [
                                h('span', this.data2[params.index].customername + '    '),
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
                                        }, '客户名称：' + item.customername),
                                        h('li', {
                                            style: {
                                                padding: '4px'
                                            }
                                        }, '客户电话：' + item.tel),
                                    ]))
                                ])
                            ]);
                        },
                        width: 100,
                    },
                    {
                        title: '线索状态',
                        key: 'cluesstatus',
                        width: 100,
                    },
                    {
                        title: '线索创建时间',
                        key: 'createdate',
                        width: 160,
                    },
                    {
                        title: '创建人',
                        key: 'createby',
                        width: 100,
                    },
                    {
                        title: '领取人',
                        key: 'receiveby',
                        width: 100,
                    },
                    {
                        title: '线索标签',
                        key: 'labelName',
                        ellipsis: true
                    },
                    {
                        title: '线索类型',
                        key: 'cluestype',
                        width: 100,
                    },
          /*          {
                        title: '线索详情',
                        key: 'cluescontent'
                    },*/
                ],
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
                columns44: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '公司名称',
                        key: 'CompanyName'
                    },
                ],
                data: [],
                data1: [],
                data2: [],
                data4: [],
                customerlabelGroup: [],
                cluesTypeValue: [],
                companyDetail: [],
                cluesid: '',
                pageTotal: '',
                pageTotal2: '',
                pageTotal3: '',
                searchCompany: '',
                currentPage: 1,
                pageSize: 10,
                customerid: '',
                isSearch: false
            }
        },
        methods: {
            // 表格数据请求
            getTableData() {
                let _self = this
                let url = '/cluesLibrary/findAllByPages/1/10'

                _self.data2 = []

                function doSuccess(response) {
                    _self.pageTotal = response.data.data.total

                    for (let i = 0; i < response.data.data.rows.length; i++) {
                        _self.data2.push({
                            id: response.data.data.rows[i].id,
                            cluestype: response.data.data.rows[i].cluestype,
                            cluesstatus: response.data.data.rows[i].cluesstatus,
                            companyname: response.data.data.rows[i].companyname,
                            people: [
                                {
                                    tel: response.data.data.rows[i].tel,
                                    customername: response.data.data.rows[i].customername,
                                }
                            ],
                            customername: response.data.data.rows[i].customername,
                            createby: response.data.data.rows[i].createby,
                            labelName: response.data.data.rows[i].labelName,
                            receiveby: response.data.data.rows[i].receiveby,
                            createdate: response.data.data.rows[i].createdate,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 改变页码
            pageChange(a) {
                let _self = this
                let url = '/cluesLibrary/findAllByPages/' + a + '/' + _self.pageSize

                _self.data2 = []

                function doSuccess(response) {
                    _self.pageTotal = response.data.data.total

                    for (let i = 0; i < response.data.data.rows.length; i++) {
                        _self.data2.push({
                            id: response.data.data.rows[i].id,
//                            cluescontent: response.data.data.rows[i].cluescontent,
                            cluesstatus: response.data.data.rows[i].cluesstatus,
                            companyname: response.data.data.rows[i].companyname,
                            people: [
                                {
                                    tel: response.data.data.rows[i].tel,
                                    customername: response.data.data.rows[i].customername,
                                }
                            ],
                            createby: response.data.data.rows[i].createby,
                            createdate: response.data.data.rows[i].createdate,
                            customername: response.data.data.rows[i].customername,
                            labelName: response.data.data.rows[i].labelName,
                            receiveby: response.data.data.rows[i].receiveby,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 改变每页显示的数据条数
            pageSizeChange(a) {
                let _self = this
                let url = '/cluesLibrary/findAllByPages/1/' + a
                _self.pageSize = a
                _self.data2 = []

                function doSuccess(response) {
                    _self.pageTotal = response.data.data.total

                    for (let i = 0; i < response.data.data.rows.length; i++) {
                        _self.data2.push({
                            id: response.data.data.rows[i].id,
//                            cluescontent: response.data.data.rows[i].cluescontent,
                            cluesstatus: response.data.data.rows[i].cluesstatus,
                            companyname: response.data.data.rows[i].companyname,
                            people: [
                                {
                                    tel: response.data.data.rows[i].tel,
                                    customername: response.data.data.rows[i].customername,
                                }
                            ],
                            createdate: response.data.data.rows[i].createdate,
                            createby: response.data.data.rows[i].createby,
                            customername: response.data.data.rows[i].customername,
                            labelName: response.data.data.rows[i].labelName,
                            receiveby: response.data.data.rows[i].receiveby,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 表格行选中事件
            selectRow(a) {
                var _self = this
                _self.cluesid = a.id
            },

            detail(e) {
                let _self = this
                let url = '/order/queryListByCustomer?customerId=' + e.row.oacustomerid + '&page=1&pageSize=10000'

                _self.modal2 = true
                _self.formValidate.companyname = e.row.companyname
                _self.formValidate.name = e.row.name
                _self.formValidate.tel = e.row.tel
                _self.formValidate.updatedate = e.row.updatedate
                _self.formValidate.createby = e.row.createby
                _self.formValidate.realnumber = e.row.realnumber

                function doSuccess(response) {
                    let _rowsData = response.data.data.rows
                    for (let i = 0; i < _rowsData.length; i++) {
                        let url2 = '/order/detail/' + _rowsData[i].id

                        function doSuccess2(response) {
                            let _data = response.data.data.items

                            for (let i = 0; i < _data.length; i++) {
                                _self.data1.push({
                                    product: _data[i].product,
                                    propertys: _data[i].propertys,
                                    productnumber: _data[i].productnumber,
                                    paynumber: _data[i].paynumber,
                                })
                            }
                        }

                        _self.GetData(url2, doSuccess2)
                    }
                }

                this.GetData(url, doSuccess)
            },

            EditClues() {
                let _self = this
                let url = '/cluesLibrary/findCluesLibraryById/' + _self.cluesid
                _self.modal3 = true
                let a = []

                function doSuccess(response) {
                    let _res = response.data.data
                    _self.customerlabelGroup = []
                    _self.formValidate2.cluescontent = _res.cluescontent
                    _self.formValidate2.cluestype = _res.cluestype
                    _self.formValidate2.id = _res.id
                    _self.formValidate2.cluesstatus = _res.cluesstatus
                    _self.formValidate2.companyid = _res.companyid
                    _self.formValidate2.companyname = _res.companyname
                    _self.formValidate2.createby = _res.createby
                    _self.formValidate2.customername = _res.customername
                    _self.formValidate2.labelName = _res.labelName
                    _self.formValidate2.tel = _res.TEL
                    _self.formValidate2.createdate = _res.createdate
//                    _self.customerlabelGroup = _res.labelName.split(",");

                    if(_res.labelName != null) {
                        a = _res.labelName.split(",")
                        for (let i = 0; i < a.length; i++) {
                            let b = {}
                            b.labelName = a[i]
                            _self.customerlabelGroup.push(b)
                        }
                        _self.getLabelData()
                    } else {
                        _self.customerlabelGroup = []
                    }
                }

                this.GetData(url, doSuccess)
            },

            getLabelData() {
                var _self = this
                _self.data = []
                this.$http.get('/api/label/findAllLabelByPages/1/10')
                    .then(function (data) {
                        var response = data.data.data
                        _self.pageTotal2 = response.total
                        let _customerlabelGroup = []
                        for (var i = 0; i < response.rows.length; i++) {
                            var reponseObj = {}
                            reponseObj.labelName = response.rows[i].labelName
                            reponseObj.id = response.rows[i].id
                            for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                                if (reponseObj.labelName == _self.customerlabelGroup[i].labelName) {
                                    reponseObj._checked = true
                                    _customerlabelGroup.push(reponseObj)
                                }
                            }
                            _self.data.push(reponseObj)
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
            },

            /*************************移除标签********************************/
            handleClose2(event, name) {
                let _self = this
                for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                    if (_self.customerlabelGroup[i].labelName == name.labelName) {
                        let index = _self.customerlabelGroup.indexOf(name);
                        if (index > -1) {
                            _self.customerlabelGroup.splice(index, 1);
                        }
                    }
                }
            },

            /*************************录入提交验证********************************/
            ok(name) {
                let _self = this
                console.log(_self.formValidate2)
                setTimeout(() => {
                        this.loading2 = false;
                        this.$refs[name].validate((valid) => {
                            if (valid) {
                                if (_self.customerlabelGroup != undefined) {
                                    let labelIds = []
                                    for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                                        labelIds.push(_self.customerlabelGroup[i].id)
                                    }
                                    _self.formValidate2.labels = labelIds.toString()
                                }

                                let url = '/cluesLibrary/updateCluesLibrary'
                                let _data = {}
                                _data.cluescontent = _self.formValidate2.cluescontent
                                _data.companyid = _self.formValidate2.companyid
                                _data.lables = _self.formValidate2.labels
                                _data.id = _self.formValidate2.id

                                function doSuccess(response) {
                                    _self.$Message.success('更新成功!')
                                    _self.modal3 = false
                                    _self.getTableData()
                                }
                                function otherConditions() {
                                    _self.$nextTick(() => {
                                        _self.loading2 = true;
                                    });
                                    _self.$Message.error('更新失败!');
                                }

                                this.PostData(url, _data, doSuccess, otherConditions)
                            } else {
                                this.$nextTick(() => {
                                    this.loading2 = true;
                                });
                                this.$Message.error('更新失败!');
                            }
                        })

                }, 2000);
            },

            AddClues() {
                let _self = this
                _self.modal2 = true
                _self.cluesTypeValue = []

                this.$http.get('/api/cluesLibrary/loadCluesType')
                    .then(function (response) {
                        let _res = response.data.data

                        for (let i = 0; i < _res.length; i++) {

                            let issendObj = {}

                            issendObj.label = _res[i].typename
                            issendObj.value = _res[i].typeid.toString()
                            _self.cluesTypeValue.push(issendObj)
                        }
                    })
            },

            /*************************录入提交验证********************************/
            ok22(name) {
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
                                    _self.formValidate.lables = labelIds.toString()
                                }

                                let url = '/cluesLibrary/saveCluesLibrary'

                                function doSuccess(response) {
                                    _self.modal2 = false
                                    _self.$Message.success('新增成功!')
                                    _self.cancel('formValidate')
                                    _self.getTableData()
                                }
                                function otherConditions() {
                                    _self.$nextTick(() => {
                                        _self.loading = true;
                                    });
                                    _self.$Message.error('新增失败!');
                                }

                                this.PostData(url, _self.formValidate, doSuccess, otherConditions)
                            } else {
                                this.$nextTick(() => {
                                    this.loading = true;
                                });
                                this.$Message.error('新增失败!');
                            }
                        })
                }, 2000);
            },

            getCompany() {
                let _self = this
                let url = ''
                _self.currentPage = 1

                if (_self.isSearch == false) {
                    url = '/cluesLibrary/loadCompany/1/10/1'
                } else {
                    url = '/cluesLibrary/loadCompany/1/10/' + _self.searchCompany
                }

                _self.selectCompany = true

                function doSuccess(response) {
                    let _res = response.data.data

                    _self.data4 = []
                    _self.pageTotal3 = _res.total
                    for (let i = 0; i < _res.rows.length; i++) {
                        _self.data4.push({
                            CompanyName: _res.rows[i].CompanyName,
                            cpid: _res.rows[i].cpid,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            rowSelect(a) {
                let _self = this
                _self.companyDetail = a
            },

            ok3() {
                let _self = this
                _self.formValidate.companyname =  _self.companyDetail.CompanyName
                _self.formValidate.companyid =  _self.companyDetail.cpid
            },

            pageChange3(a) {
                let _self = this
                let url = ''
                if (_self.isSearch == false) {
                    url = '/cluesLibrary/loadCompany/' + a + '/' + _self.pageSize + '/1'
                } else {
                    url = '/cluesLibrary/loadCompany/' + a + '/' + _self.pageSize + '/' + _self.searchCompany
                }

                function doSuccess(response) {
                    let _res = response.data.data

                    _self.data4 = []
                    _self.pageTotal3 = _res.total
                    for (let i = 0; i < _res.rows.length; i++) {
                        _self.data4.push({
                            CompanyName: _res.rows[i].CompanyName,
                            cpid: _res.rows[i].cpid,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 改变每页显示的数据条数
            pageSizeChange3(a) {
                let _self = this
                let url = ''
                _self.pageSize = a

                if (_self.isSearch == false) {
                    url = '/cluesLibrary/loadCompany/1/' + _self.pageSize + '/1'
                } else {
                    url = '/cluesLibrary/loadCompany/1/' + _self.pageSize + '/' + _self.searchCompany
                }

                function doSuccess(response) {
                    let _res = response.data.data

                    _self.data4 = []
                    _self.pageTotal3 = _res.total
                    for (let i = 0; i < _res.rows.length; i++) {
                        _self.data4.push({
                            CompanyName: _res.rows[i].CompanyName,
                            cpid: _res.rows[i].cpid,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            cancel(name) {
                this.$refs[name].resetFields();
            },

            searchCompanyData() {
                let _self = this

                if (_self.searchCompany != '') {
                    _self.isSearch = true
                    _self.getCompany()
                } else {
                    _self.isSearch = false
                    _self.getCompany()
                }
            },

            cancel(name) {
                this.$refs[name].resetFields();
            },

            keyDown(e) {
                let _self = this

                if (e.code == 'Enter') {
                    _self.searchCompanyData()
                }
            }
        },
        mounted() {
            this.getTableData()
        }
    }
</script>