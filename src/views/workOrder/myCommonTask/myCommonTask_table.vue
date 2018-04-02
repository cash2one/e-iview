<template>
    <div>
        <Tabs value="name1">
            <TabPane label="服务中" name="name1">
                <Card>
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">查询详情</Button>
                            <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">流转</Button>
                            <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
                            <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">产品异常</Button>
                            <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">批量已读</Button>
                            <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">批量未读</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="columns"
                                :data="data"></Table>
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
            </TabPane>
            <TabPane label="未开始" name="name2"></TabPane>
            <TabPane label="已开始" name="name3"></TabPane>
            <TabPane label="全部" name="name4"></TabPane>
        </Tabs>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                columns: [
                    {
                        title: '工单状态',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '归属公司',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '归属客户',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '部门名称',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '订单',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '产品全称',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '旧产品名称',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '目前进度',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '下个进度',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '服务开始时间',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '该项预计完成时间',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '实际完成时间',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '服务人员',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '创建人',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '跟进人',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '提示',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 330,
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
                                            this.detailModal = true
                                        }
                                    }
                                }, '[查看公司]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.detailModal = true
                                        }
                                    }
                                }, '[流程图]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.detailModal = true
                                        }
                                    }
                                }, '[暂停/解锁]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.detailModal = true
                                        }
                                    }
                                }, '[退款终止]'),
                            ]);
                        }
                    }
                ],
                data: [
                    {
                        baseorderid: 1
                    }
                ]
            }
        }
    }
</script>