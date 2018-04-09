<template>
    <div>
        <Tabs value="name1">
            <TabPane label="订单审批" name="name1">
                <Card>
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="ios-crop" @click="detailCustomer">查看</Button>
                            <Button type="primary" icon="ios-color-filter-outline">导出Excel</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table border :columns="columns2" :data="data3"></Table>
                    </Row>
                </Card>
            </TabPane>
            <TabPane label="查看已审批" name="name2">
            </TabPane>
        </Tabs>
    </div>
</template>

<script>

    export default {
        data() {
            return{
                columns2: [
                    {
                        title: '订单号码',
                        key: 'age',
                        width: 120
                    },
                    {
                        title: '归属公司',
                        key: 'province',
                        width: 150
                    },
                    {
                        title: '客户名称',
                        key: 'city',
                        width: 120
                    },
                    {
                        title: '客户电话',
                        key: 'address',
                        width: 120
                    },
                    {
                        title: '创建人',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: '跟进人',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: '创建时间',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: '缴费时间',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: '缴费渠道',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: '订单价格',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: '已付款',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: '余款',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: '当前流程',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, '[查看审批记录]')
                            ]);
                        }
                    }
                ],
            }
        },
        methods: {
            getTableData() {
                let _self = this
                let url = '/order/list?page=1&pageSize=10&isAudit=N'

                function doSuccess(response) {
                    console.log(response.data.data)
                }

                this.GetData(url, doSuccess)
            }
        },
        mounted() {
            this.getTableData()
        }
    }
</script>