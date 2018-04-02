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
                    <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
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
                v-model="modal2"
                title="详情"
                width="700"
                class-name="vertical-center-modal">
            <Form ref="formValidate" :model="formValidate" :label-width="70">
                <Row>
                    <Col span="12">
                    <FormItem label="公司名" prop="companyname">
                        <Input v-model="formValidate.companyname" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="客户名" prop="name">
                        <Input v-model="formValidate.name" disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="订单价格" prop="realnumber">
                        <Input v-model="formValidate.realnumber" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="电话" prop="tel">
                        <Input v-model="formValidate.tel" disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="创建时间" prop="updatedate">
                        <Input v-model="formValidate.updatedate" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="创建人" prop="createby">
                        <Input v-model="formValidate.createby" disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            <Table height="300" size="small" :columns="columns1" :data="data1"></Table>
        </Modal>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                isEidt: false,
                modal1: false,
                modal2: false,
                issendValue: [],
                formValidate: {
                    companyname: '',
                    name: '',
                    realnumber: '',
                    tel: '',
                    updatedate: '',
                    createby: ''
                },
                columns: [{
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                    {
                        title: '订单号码',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '公司名称',
                        key: 'companyname',
                        width: 250
                    },
                    {
                        title: '客户名称',
                        key: 'name',
                        width: 100
                    },
                    {
                        title: '客户电话',
                        key: 'tel',
                        width: 120
                    },
                    {
                        title: '订单价格',
                        key: 'realnumber',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'updatedate',
                        width: 150
                    },
                    {
                        title: '创建人',
                        key: 'createby',
                        width: 120
                    },
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
                                            this.detail(params)
                                        }
                                    }
                                }, '详情')
                            ]);
                        }
                    }
                ],
                columns1: [
                    {
                        title: '产品名称',
                        key: 'product'
                    },
                    {
                        title: '产品属性',
                        key: 'propertys'
                    },
                    {
                        title: '产品数量',
                        key: 'productnumber'
                    },
                    {
                        title: '销售价格',
                        key: 'paynumber'
                    }
                ],
                data: [],
                data1: [],
                pageTotal: '',
                pageSize: 10,
                customerid: ''
            }
        },
        methods: {
            // 表格数据请求
            getTableData() {
                let _self = this
                let url = '/order/queryListByChannel?page=1&pageSize=10'

                _self.data = []

                function doSuccess(response) {
                    _self.pageTotal = response.data.data.total

                    for (let i = 0; i < response.data.data.rows.length; i++) {
                        _self.data.push({
                            baseorderid: response.data.data.rows[i].baseorderid,
                            companyname: response.data.data.rows[i].companyname,
                            name: response.data.data.rows[i].name,
                            tel: response.data.data.rows[i].tel,
                            updatedate: response.data.data.rows[i].updatedate,
                            createby: response.data.data.rows[i].createby,
                            realnumber: response.data.data.rows[i].realnumber,
                            oacustomerid: response.data.data.rows[i].oacustomerid,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },
            // 改变页码
            pageChange(a) {
                let _self = this
                let url = '/order/queryListByChannel?page=' + a + '&pageSize=' + _self.pageSize

                _self.data = []

                function doSuccess(response) {
                    _self.pageTotal = response.data.data.total

                    for (let i = 0; i < response.data.data.rows.length; i++) {
                        _self.data.push({
                            baseorderid: response.data.data.rows[i].baseorderid,
                            companyname: response.data.data.rows[i].companyname,
                            name: response.data.data.rows[i].name,
                            tel: response.data.data.rows[i].tel,
                            updatedate: response.data.data.rows[i].updatedate,
                            createby: response.data.data.rows[i].createby,
                            realnumber: response.data.data.rows[i].realnumber,
                            oacustomerid: response.data.data.rows[i].oacustomerid,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 改变每页显示的数据条数
            pageSizeChange(a) {
                let _self = this
                let url = '/order/queryListByChannel?page=1&pageSize=' + a
                _self.pageSize = a
                _self.data = []

                function doSuccess(response) {
                    _self.pageTotal = response.data.data.total

                    for (let i = 0; i < response.data.data.rows.length; i++) {
                        _self.data.push({
                            baseorderid: response.data.data.rows[i].baseorderid,
                            companyname: response.data.data.rows[i].companyname,
                            name: response.data.data.rows[i].name,
                            tel: response.data.data.rows[i].tel,
                            updatedate: response.data.data.rows[i].updatedate,
                            createby: response.data.data.rows[i].createby,
                            realnumber: response.data.data.rows[i].realnumber,
                            oacustomerid: response.data.data.rows[i].oacustomerid,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            detail(e) {
                console.log(e)
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

            downloadExcel() {
                let url = '/channel/customer/channel/1/9999999/list'
                let arrdata = [
                    {
                        field: 'baseorderid',title: '订单号码'
                    },
                    {
                        field: 'companyname',title: '公司名称'
                    },
                    {
                        field: 'name',title: '客户名称'
                    },
                    {
                        field: 'realnumber',title: '订单价格'
                    },
                    {
                        field: 'updatedate',title: '创建时间'
                    },
                    {
                        field: 'createby',title: '创建人'
                    },
                ]

                this.DownloadExcel(url, JSON.stringify(arrdata))
            },
        },
        mounted() {
            this.getTableData()
        }
    }
</script>