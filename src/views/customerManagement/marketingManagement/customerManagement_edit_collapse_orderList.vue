<style>
    .ivu-table .demo-table-error-row td {
        background-color: #ff6600;
        color: #fff;
    }
</style>
<template>
    <div>
        <Table
                border
                :row-class-name="rowClassName"
                :columns="columns7"
                :data="data6"
                style="margin-top: 15px"
        ></Table>
    </div>
</template>

<script>

    export default {
        props: ['customerid'],
        data() {
            return {
                data6: [],
                columns7: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '公司名称',
                        key: 'CompanyName'
                    },
                    {
                        title: '流程状态',
                        key: 'ProcessType'
                    },
                    {
                        title: '欠款',
                        key: 'neednumber'
                    },
                    {
                        title: '订单价格',
                        key: 'paynumber'
                    },
                    {
                        title: '已付款',
                        key: 'realnumber'
                    },
                    {
                        title: '缴费渠道',
                        key: 'paydirText'
                    },
                    /*{
                        title: '操作',
                        key: 'action',
                        width: 180,
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
                                            this.amend(params)
                                        }
                                    }
                                }, '修改'),
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
                                            this.edit(params)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                },[
                                    h('Poptip', {
                                        props: {
                                            confirm: true,
                                            title: '您确定要此企业信息吗！',
                                        },
                                        on: {
                                            'on-ok': ()=>{
                                                this.companyDelete(params)
                                            },
                                            'on-cancel': function(){}
                                        }
                                    }, '作废')
                                ])
                            ]);
                        }
                    }*/
                ],
            }
        },
        methods: {
            getCompanyData() {
                let _self = this
                let url = '/order/queryListByCustomer?customerId=' + _self.customerid + '&page=1&pageSize=10000'

                function doSuccess(response) {
                    let _rowsData = response.data.data.rows
                    for (let i = 0; i < _rowsData.length; i++) {
                        _self.data6.push({
                            CompanyName: _rowsData[i].companyname,
                            ProcessType: _rowsData[i].ProcessType,
                            neednumber: _rowsData[i].neednumber,
                            realnumber: _rowsData[i].realnumber,
                            paynumber: _rowsData[i].paynumber,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },
            rowClassName(row, index) {
                if (row.neednumber != 0) {
                    return 'demo-table-error-row';
                }
            }
        },
        mounted() {
            this.getCompanyData()
        }
    }
</script>