<style>
    /*@import '../../../libs/easyUI/demo.css';*/
    @import '../../libs/easyUI/easyui.css';
    @import '../../libs/easyUI/icon.css';
    @import './css/productDetail.min.css';
</style>
<style lang="less">
    @import '../my-components/area-linkage/area-linkage.less';
    @import '../../styles/common.less';
</style>
<template>
    <div>
        <Modal
                v-model="orderAdd"
                title="录入"
                :width="1300"
                :loading="loading"
                @on-ok="ok4('formValidate')"
                @on-cancel="cancel('formValidate')">
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="90">
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="归属公司" prop="CompanyName">
                        <Input size="small" v-model="formValidate.CompanyName" @on-focus="getCompany" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="归属客户" prop="NAME">
                        <Input size="small" v-model="formValidate.NAME" @on-focus="getCompany" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费时间" prop="customername">
                        <DatePicker format="yyyy-MM-dd HH:mm:ss" type="datetime" style="width: 200px"
                                    v-model="formValidate.date"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="订单总价" prop="zongjia">
                        <Input size="small" v-model="formValidate.zongjia" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="已付款" prop="orderPayNumber">
                        <Input size="small" v-model="formValidate.orderPayNumber"/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费渠道" prop="payDir">
                        <Select v-model="formValidate.payDir">
                            <Option value="gszfb">公司支付宝</Option>
                            <Option value="gh">工行</Option>
                            <Option value="zh">招行</Option>
                            <Option value="wx">微信公众号</Option>
                            <Option value="gw">官网</Option>
                            <Option value="other">其他</Option>
                            <Option value="cash">现金</Option>
                            <Option value="jhang">建行</Option>
                            <Option value="nsh">农商行</Option>
                            <Option value="tb">淘宝</Option>
                            <Option value="zht">中衡通</Option>
                            <Option value="jt">锦涛</Option>
                            <Option value="wjw">魏建伟</Option>
                            <Option value="zgrzh">转个人账户</Option>
                            <Option value="dgzfb">东莞支付宝</Option>
                            <Option value="szgh">深圳工行</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="不计提成总额" prop="customername">
                        <Input size="small" v-model="formValidate.customername"/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="业绩" prop="customername">
                        <Input size="small" v-model="formValidate.customername"/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="附加流水账" prop="customername">
                        <Input size="small" v-model="formValidate.customername"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="服务开始月份" prop="serviceBeginDate">
                        <DatePicker format="yyyy-MM-dd" type="date" style="width: 200px"
                                    v-model="formValidate.serviceBeginDate"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="国地税报道" prop="GDSreport">
                        <Select v-model="formValidate.GDSreport" :disabled="iscycle">
                            <Option value="ybd">已报道</Option>
                            <Option value="wbd">未报道</Option>
                            <Option value="bybd">不用报道</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <FormItem label="选择产品">
                        <Button type="primary" icon="plus" @click="orderAddProducts()">新增</Button>
                        <Button type="primary" icon="plus" @click="removeRows()">删除</Button>
                        <Button type="primary" icon="plus" @click="kuaiji()" v-if="kjdj">查看会计到家服务项</Button>
                    </FormItem>
                </Row>
                <table width="100%" id="orderItemList"></table>
                <!--                <table id="dg" class="easyui-datagrid" title="Row Editing in DataGrid"
                                       style="width:700px;height:auto"></table>-->
            </Form>
        </Modal>
        <Modal
                v-model="orderAddProduct"
                title="产品名称"
                :width="1300">
            <Row>
                <Col span="12">
                <Card>
                    <p slot="title">产品列表</p>
                    <Table
                            highlight-row
                            @on-row-click="selectRow2"
                            :columns="productColumns"
                            :data="productData">
                    </Table>
                    <Page
                            size="small"
                            :total="pageTotal2"
                            show-total
                            show-sizer
                            show-elevator
                            @on-change="pageChange2"
                            @on-page-size-change="pageSizeChange2"
                            style="margin-top: 10px"></Page>
                </Card>
                </Col>
                <Col span="11" offset="1">
                <Card dis-hover v-if="isProductDetail">
                    <p slot="title">产品详情</p>
                    <div class="productDetail-title">
                        <p id="product_name"></p>
                        <p class="productDetail-title-price">
                            <span>￥<strong id="product_price">加载中</strong></span>
                        </p>
                        <div class="productDetail-title-content">
                        </div>
                    </div>
                    <div class="productDetail-option" id="productDetail-option-id" @click="areaChange()">
                        <div class="_propertys_class_" v-for="(item, index) in basePropertys">
                            <p :id="item.propertyId">{{ item.name }}</p>
                            <div class="productDetail-option-buttonList" :name="index==0?'firstProperty':''">
                                <button
                                        type="button"
                                        v-for="(item2, index2) in item.children"
                                        :class="index2==0?'active':''"
                                        :id="item2.pvId"
                                        @click="chooseThisProperty(item2.pvId)">
                                    {{ item2.propertyValue }}
                                </button>
                            </div>
                        </div>
                        <p id="areaId">地区</p>
                        <Row :gutter="16">
                            <Col span="10">
                            <al-cascader v-model="res1" data-type="code" level="2" @on-change="areaChange()"/>
                            </Col>
                        </Row>
                        <Button icon="bag" size="large" style="margin-top: 20px" @click="addProduct">立即购买</Button>
                    </div>
                </Card>
                </Col>
            </Row>
        </Modal>
        <Modal
                v-model="deleteOrder"
                title="请填写作废原因"
                @on-ok="ok"
                @on-cancel="cancel">
            <Input v-model="value6" type="textarea" :rows="4" placeholder="Enter something..."></Input>
        </Modal>
        <Modal
                v-model="detailCustomer"
                title="查看"
                :width="1300"
                @on-ok="ok"
                @on-cancel="cancel">
            <Form ref="formValidateDetail" :model="formValidateDetail" :label-width="90">
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="归属公司" prop="CompanyName">
                        <Input size="small" v-model="formValidateDetail.CompanyName"/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="归属客户" prop="name">
                        <Input size="small" v-model="formValidateDetail.name"/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费时间" prop="payTime">
                        <DatePicker type="datetime" style="width: 200px"
                                    v-model="formValidateDetail.payTime"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="订单总价" prop="paynumber">
                        <Input size="small" v-model="formValidateDetail.paynumber"/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="已付款" prop="paynumber">
                        <Input size="small" v-model="formValidateDetail.paynumber"/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费渠道" prop="customername">
                        <Select v-model="formValidateDetail.customername" placeholder="Select your city">
                            <Option value="beijing">New York</Option>
                            <Option value="shanghai">London</Option>
                            <Option value="shenzhen">Sydney</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="不计提成总额" prop="nodeducttotalmoney">
                        <Input size="small" v-model="formValidateDetail.nodeducttotalmoney"/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="业绩" prop="performanceMoney">
                        <Input size="small" v-model="formValidateDetail.performanceMoney"/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="附加流水账" prop="customername">
                        <Input size="small" v-model="formValidateDetail.customername"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="服务开始月份" prop="serviceStartDate">
                        <DatePicker type="date" style="width: 200px"
                                    :value="formValidateDetail.serviceStartDate"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="国地税报道" prop="gdsreport">
                        <Select v-model="formValidateDetail.gdsreport">
                            <Option value="formValidateDetail">New York</Option>
                            <Option value="shanghai">London</Option>
                            <Option value="shenzhen">Sydney</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
        <Modal
                v-model="flowChart2"
                title="查看流程图"
                width="70%">
            <center>
                <img :src='flowChartImg'/>
            </center>
        </Modal>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="plus" @click="orderAdd2()">录入</Button>
                    <Button type="primary" icon="edit" @click="isEditChange">编辑</Button>
                    <Button type="primary" icon="ios-crop" @click="detailCustomers()">查看</Button>
                    <Button type="primary" icon="ios-crop" @click="flowChart()">查看流程图</Button>
                    <Button type="primary" icon="ios-crop" @click="toDoWorkFlow()">办理审批</Button>
                    <Button type="primary" icon="ios-crop" @click="reApplyProcess()">重新提交</Button>
                    <Button type="primary" icon="ios-color-filter-outline">修改</Button>
                    <Button type="primary" icon="ios-color-filter-outline">企划(修改)</Button>
                    <Button type="primary" icon="ios-color-filter-outline" @click="deleteOrder = true">订单作废</Button>
                    <Button type="primary" icon="ios-color-filter-outline">导出Excel</Button>
                </ButtonGroup>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        highlight-row
                        size="small"
                        @on-row-click="selectRow"
                        :columns="columns2"
                        :data="data3"></Table>
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
                v-model="selectCompany"
                title="选择公司"
                width="50%"
                @on-ok="ok3"
                @on-cancel="cancel3">
            <Row :gutter="16">
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
                    @on-row-dblclick="rowSelect"></Table>
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
        <Modal
                v-model="shenpi"
                title="办理审批"
                @on-ok="blsp">
            <Form ref="banlishenpi" :model="banlishenpi" :label-width="90">
                <FormItem label="审批备注" prop="desc">
                    <Input v-model="banlishenpi.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="是否同意审批" prop="agree">
                    <RadioGroup v-model="banlishenpi.agree">
                        <Radio label="1">同意</Radio>
                        <Radio label="0">驳回</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="cxtj"
                title="重新提交"
                @on-ok="tijiao">
            <Form ref="cxtijiao" :model="cxtijiao" :label-width="90">
                <FormItem label="是否同意审批" prop="agree">
                    <RadioGroup v-model="cxtijiao.agree">
                        <Radio label="1">提交</Radio>
                        <Radio label="0">拒绝</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="fuwux"
                title="服务项"
                width="50%"
                @on-ok="fwxtj">
            <div id="tt"></div>
        </Modal>
    </div>
</template>

<script>
    import datagrid from '../../libs/easyUI/jquery.easyui.min'
    import combobox from '../../libs/easyUI/jquery.easyui.min'
    import Vue from 'vue';
    import iviewArea from 'iview-area';

    Vue.use(iviewArea);

    let editIndex = undefined;

    export default {
        data() {
            return {
                loading: true,
                orderAdd: false,
                deleteOrder: false,
                detailCustomer: false,
                orderAddProduct: false,
                isProductDetail: false,
                fuwux: false,
                iscycle: true,
                isfuwu: false,
                kjdj: false,
                selectCompany: false,
                flowChart2: false,
                shenpi: false,
                cxtj: false,
                flowChartImg: '',
                itemGrid: '',
                customerId: '',
                productId: '',
                pageTotal: '',
                pageTotal2: '',
                pageTotal3: '',
                pageSize: 10,
                data3: [],
                basePropertys: [],
                orderItemList: [],
                res1: ['440000', '440100', '440103'],
                productSKU: [],
                lastFirstPropertyValue: '',
                currentSKUId: '',
                price: '',
                SKU: '',
                lastObj: {},
                banlishenpi: {
                    desc: '',
                    agree: ''
                },
                cxtijiao: {
                    agree: ''
                },
                formValidate: {
                    zongjia: 0,
                    orderPayNumber: '',
                    CompanyName: '',
                    customername: '',
                    GDSreport: '',
                    payDir: '',
                    date: new Date(),
                    serviceBeginDate: ''
                },
                formValidateDetail: {},
                ruleValidate: {
                    CompanyName: [
                        { required: true, message: '请选择公司', trigger: 'change' }
                    ],
                    NAME: [
                        { required: true, message: '请选择客户', trigger: 'change' }
                    ],
                    payDir: [
                        { required: true, message: '请选择缴费渠道', trigger: 'change' }
                    ],
                    orderPayNumber: [
                        { required: true, message: '请填写已付款金额', trigger: 'blur' }
                    ],
                },
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
                    {
                        title: '归属客户',
                        key: 'NAME'
                    },
                    {
                        title: '客户电话',
                        key: 'TEL'
                    },
                    {
                        title: '钱包余额',
                        key: 'balance'
                    },
                    {
                        title: '是否国地税报道',
                        key: 'gdsreport'
                    },
                ],
                columns2: [
                    {
                        title: '订单号码',
                        key: 'id',
                        width: 120
                    },
                    {
                        title: '公司名称',
                        key: 'companyname',
                        width: 210
                    },
                    {
                        title: '客户名称',
                        key: 'name',
                        width: 120
                    },
                    {
                        title: '客户电话',
                        key: 'tel',
                        width: 120
                    },
                    {
                        title: '流程状态',
                        key: 'ProcessType',
                        width: 100
                    },
                    {
                        title: '缴费渠道',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: '订单价格',
                        key: 'paynumber',
                        width: 100
                    },
                    {
                        title: '已付款',
                        key: 'realnumber',
                        width: 100
                    },
                    {
                        title: '余款',
                        key: 'neednumber',
                        width: 100
                    },
                    {
                        title: '创建时间',
                        key: 'createdate',
                        width: 100
                    },
                    {
                        title: '创建人',
                        key: 'createby',
                        width: 100
                    },
                    {
                        title: '跟进人',
                        key: 'followby',
                        width: 100
                    },
                    /*{
                        title: 'Action',
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
                                }, '[]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, 'Edit')
                            ]);
                        }
                    }*/
                ],
                productColumns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '产品名称',
                        key: 'product'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '产品编码',
                        key: 'productCode'
                    },
                ],
                productData: [],
                data4: [],
                isSearch: false
            }
        },
        methods: {
            orderAdd2() {
                let _self = this
                _self.orderAdd = true
            },

            getTableData() {
                let _self = this
                let url = '/order/list?page=1&pageSize=10'

                function doSuccess(response) {
                    let _data = response.data.data
                    _self.pageTotal = _data.total
                    _self.data3 = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        _self.data3.push({
                            ProcessType: _data.rows[i].ProcessType,
                            companyname: _data.rows[i].companyname,
                            createby: _data.rows[i].createby,
                            createdate: _data.rows[i].createdate,
                            followby: _data.rows[i].followby,
                            name: _data.rows[i].name,
                            neednumber: _data.rows[i].neednumber,
                            paynumber: _data.rows[i].paynumber,
                            realnumber: _data.rows[i].realnumber,
                            tel: _data.rows[i].tel,
                            baseorderid: _data.rows[i].baseorderid,
                            id: _data.rows[i].id,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 改变页码
            pageChange(a) {
                let _self = this
                let url = '/api/order/list?page=' + a + '&pageSize=' + _self.pageSize
                this.$http.get(url)
                    .then(function (response) {
                        let _data = response.data.data
                        _self.pageTotal = _data.total
                        _self.data3 = []

                        for (let i = 0; i < _data.rows.length; i++) {
                            _self.data3.push({
                                ProcessType: _data.rows[i].ProcessType,
                                companyname: _data.rows[i].companyname,
                                createby: _data.rows[i].createby,
                                createdate: _data.rows[i].createdate,
                                followby: _data.rows[i].followby,
                                name: _data.rows[i].name,
                                neednumber: _data.rows[i].neednumber,
                                paynumber: _data.rows[i].paynumber,
                                realnumber: _data.rows[i].realnumber,
                                tel: _data.rows[i].tel,
                                baseorderid: _data.rows[i].baseorderid,
                                id: _data.rows[i].id,
                            })
                        }
                    })
            },

            // 改变每页显示的数据条数
            pageSizeChange(a) {
                let _self = this
                _self.pageSize = a
                _self.data3 = []
                this.$http.get('/api/order/list?page=1&pageSize=' + a)
                    .then(function (response) {
                        let _data = response.data.data
                        _self.pageTotal = _data.total

                        for (let i = 0; i < _data.rows.length; i++) {
                            _self.data3.push({
                                ProcessType: _data.rows[i].ProcessType,
                                companyname: _data.rows[i].companyname,
                                createby: _data.rows[i].createby,
                                createdate: _data.rows[i].createdate,
                                followby: _data.rows[i].followby,
                                name: _data.rows[i].name,
                                neednumber: _data.rows[i].neednumber,
                                paynumber: _data.rows[i].paynumber,
                                realnumber: _data.rows[i].realnumber,
                                tel: _data.rows[i].tel,
                                baseorderid: _data.rows[i].baseorderid,
                                id: _data.rows[i].id,
                            })
                        }
                    })
            },

            selectRow(a) {
                let _self = this
                _self.customerId = a.id
            },

            detailCustomers() {
                let _self = this
                let url = '/order/detail/' + _self.customerId
                _self.detailCustomer = true

                function doSuccess(response) {
                    let _data = response.data.data
                    _self.formValidateDetail.CompanyName = _data.CompanyName,
                        _self.formValidateDetail.name = _data.name,
                        _self.formValidateDetail.nodeducttotalmoney = _data.nodeducttotalmoney,
                        _self.formValidateDetail.payTime = _data.payTime,
                        _self.formValidateDetail.paynumber = _data.paynumber,
                        _self.formValidateDetail.performanceMoney = _data.performanceMoney,
                        _self.formValidateDetail.serviceStartDate = _data.serviceStartDate,
                        _self.formValidateDetail.gdsreport = _data.gdsreport
                }

                this.GetData(url, doSuccess)
            },

            orderAddProducts() {
                let _self = this
                let url = '/product/list?page=1&pageSize=10'
                _self.orderAddProduct = true

                function doSuccess(response) {
                    let _data = response.data.data
                    _self.pageTotal2 = _data.total
                    _self.productData = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        _self.productData.push({
                            id: _data.rows[i].id,
                            product: _data.rows[i].product,
                            productCode: _data.rows[i].productCode,
                            status: _data.rows[i].status,
                            baseproductId: _data.rows[i].baseproductId,
                            createDate: _data.rows[i].createDate,
                            createOperid: _data.rows[i].createOperid,
                            createby: _data.rows[i].createby,
                            defaultdepartalias: _data.rows[i].defaultdepartalias,
                            departalias: _data.rows[i].departalias,
                            iscycle: _data.rows[i].iscycle,
                            linkProductids: _data.rows[i].linkProductids,
                            ordernumber: _data.rows[i].ordernumber,
                            pId: _data.rows[i].pId,
                            pSortId: _data.rows[i].pSortId,
                            productLevel: _data.rows[i].productLevel,
                            productTypeID: _data.rows[i].productTypeID,
                            producttags: _data.rows[i].producttags,
                            rootorgcode: _data.rows[i].rootorgcode,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            pageChange2(a) {
                let _self = this
                let url = '/api/product/list?page=' + a + '&pageSize=' + _self.pageSize
                this.$http.get(url)
                    .then(function (response) {
                        let _data = response.data.data
                        _self.pageTotal2 = _data.total
                        _self.productData = []

                        for (let i = 0; i < _data.rows.length; i++) {
                            _self.productData.push({
                                id: _data.rows[i].id,
                                product: _data.rows[i].product,
                                productCode: _data.rows[i].productCode,
                                status: _data.rows[i].status,
                                baseproductId: _data.rows[i].baseproductId,
                                createDate: _data.rows[i].createDate,
                                createOperid: _data.rows[i].createOperid,
                                createby: _data.rows[i].createby,
                                defaultdepartalias: _data.rows[i].defaultdepartalias,
                                departalias: _data.rows[i].departalias,
                                iscycle: _data.rows[i].iscycle,
                                linkProductids: _data.rows[i].linkProductids,
                                ordernumber: _data.rows[i].ordernumber,
                                pId: _data.rows[i].pId,
                                pSortId: _data.rows[i].pSortId,
                                productLevel: _data.rows[i].productLevel,
                                productTypeID: _data.rows[i].productTypeID,
                                producttags: _data.rows[i].producttags,
                                rootorgcode: _data.rows[i].rootorgcode,
                            })
                        }
                    })
            },

            pageSizeChange2(a) {
                let _self = this
                _self.pageSize = a
                this.$http.get('/api/product/list?page=1&pageSize=' + a)
                    .then(function (response) {
                        let _data = response.data.data
                        _self.pageTotal2 = _data.total
                        _self.productData = []

                        for (let i = 0; i < _data.rows.length; i++) {
                            _self.productData.push({
                                id: _data.rows[i].id,
                                product: _data.rows[i].product,
                                productCode: _data.rows[i].productCode,
                                status: _data.rows[i].status,
                                baseproductId: _data.rows[i].baseproductId,
                                createDate: _data.rows[i].createDate,
                                createOperid: _data.rows[i].createOperid,
                                createby: _data.rows[i].createby,
                                defaultdepartalias: _data.rows[i].defaultdepartalias,
                                departalias: _data.rows[i].departalias,
                                iscycle: _data.rows[i].iscycle,
                                linkProductids: _data.rows[i].linkProductids,
                                ordernumber: _data.rows[i].ordernumber,
                                pId: _data.rows[i].pId,
                                pSortId: _data.rows[i].pSortId,
                                productLevel: _data.rows[i].productLevel,
                                productTypeID: _data.rows[i].productTypeID,
                                producttags: _data.rows[i].producttags,
                                rootorgcode: _data.rows[i].rootorgcode,
                            })
                        }
                    })
            },

            selectRow2(a) {
                let _self = this
                let url = '/product/queryPropertyByProductId?productId=' + a.id
                _self.productId = a.id
                _self.isProductDetail = true

                function doSuccess(response) {
                    _self.basePropertys = response.data.data
                    document.getElementById('product_name').textContent = _self.basePropertys[0].product
                    _self.doProductSKU()
                }

                this.GetData(url, doSuccess)
            },

            // 获取SKU
            doProductSKU() {
                let _self = this
                let url = '/product/getSKUListByProductId?productId=' + _self.productId

                function doSuccess(response) {
                    _self.productSKU = response.data.data
                    _self.resetProperty(_self.productSKU[0].linkPropertys, _self.productSKU[0].linkPropertyIds)
                    _self.setPrice(_self.productSKU[0].id);
                }

                this.GetData(url, doSuccess)
            },

            // 重置属性
            resetProperty(linkPropertyValueIds, linkPropertyIds) {
                let _self = this
                let propertyValueIds = linkPropertyValueIds.split(",")
                let propertyIds = linkPropertyIds.split(",")

                $('._propertys_class_').hide()

                for (let i = 0; i < propertyIds.length; i++) {
                    $('#' + propertyIds[i]).parent().show()

                    if ($('#' + propertyIds[i]).parent().attr("name") == 'firstProperty') {
                        _self.lastFirstPropertyValue = propertyValueIds[i]
                    }
                    _self.chooseThisProperty(propertyValueIds[i])
                }
                _self.lastObj = _self.getPropertyIdArray()		//设置缓存对象
            },

            // 点击属性
            chooseThisProperty(id) {
                $(document.getElementById(id)).parent().find("button").removeClass("active")
                $(document.getElementById(id)).addClass("active")
            },

            getPropertyIdArray() {
                let _self = this
                let obj = {}
                let areaId = _self.res1[2]
                let linkPropertyValueIds = []
                let linkPropertyIds = []
                $("._propertys_class_").each(function (i, obj) {
                    if ($(obj).css("display") != "none") {
                        let div = $(obj).find("div")
                        linkPropertyIds.push(div[0].id)
                        let button = $(obj).find("button[class='active']")
                        linkPropertyValueIds.push(button[0].id)
                    }
                });
                obj.linkPropertyValueIds = linkPropertyValueIds
                obj.linkPropertyIds = linkPropertyIds
                obj.areaId = areaId
                return obj
            },

            setPrice(skuId, areaId) {
                let _self = this
                if (!skuId) {
                    let linkPropertyArray = _self.lastObj.linkPropertyValueIds
                    let _sku_p_value, _sku_p, i, j, flag
                    if (_self.productSKU) {
                        for (i = 0, j = _self.productSKU.length; i < j; i++) {
                            _sku_p_value = _self.productSKU[i].linkPropertys   //属性值
                            //长度一致
                            if (linkPropertyArray.join(",").length == _sku_p_value.length) {
                                flag = _self.checkStrInArray(_sku_p_value, linkPropertyArray);
                                //内容都包含
                                if (flag) {
                                    skuId = _self.productSKU[i].id;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (!skuId) {
                    _self.currentSKUId = null;
                    _self.price = 0;
                    $("#product_price").html("未知")
                } else {
                    _self.SKU = skuId
                    _self.currentSKUId = skuId

                    let url = '/product/getPriceByAreaAndSKU?skuId=' + skuId + '&areaId=' + _self.res1[2]

                    function doSuccess(response) {
                        if (response.data.data) {
                            let baseprice = response.data.data[0].baseprice
                            let oaprice = response.data.data[0].oaprice
                            _self.price = oaprice
                            $("#product_price").html(oaprice)
                        } else {
                            $("#product_price").html("未知")
                        }
                    }

                    this.GetData(url, doSuccess)
                }
            },

            areaChange() {
                let _self = this
                let obj = _self.getPropertyIdArray()

                if (obj.areaId != _self.lastObj.areaId) {
                    _self.lastObj = obj
                    _self.setPrice(_self.SKU, _self.res1[2])
                    //属性值改变
                } else if (obj.linkPropertyValueIds.join(',') != _self.lastObj.linkPropertyValueIds.join(',')) {
                    _self.lastObj = obj
                    let button = $("div[name='firstProperty']").find("button[class='active']")
                    if (button[0].id != _self.lastFirstPropertyValue) {
                        _self.lastFirstPropertyValue = button[0].id
                        // 重置属性
                        let _sku_p_value, _sku_p, i, j
                        if (_self.productSKU) {
                            for (i = 0, j = _self.productSKU.length; i < j; i++) {
                                _sku_p_value = _self.productSKU[i].linkPropertys    //属性值
                                _sku_p = _self.productSKU[i].linkPropertyIds      //属性ID
                                if (_sku_p_value.indexOf(_self.lastFirstPropertyValue) >= 0) {
                                    _self.resetProperty(_sku_p_value, _sku_p)    //重置属性
                                    break
                                }
                            }
                        }
                    }
                    _self.setPrice()
                } else {
                    console.log('没有触发')
                }
            },

            checkStrInArray(_sku_p_value, linkPropertyArray) {
                let m, n
                if (linkPropertyArray.length > 0) {
                    for (m = 0, n = linkPropertyArray.length; m < n; m++) {
                        //不包含
                        if (_sku_p_value.indexOf(linkPropertyArray[m]) < 0) {
                            return false
                        }
                    }
                    return true
                }
                return false
            },

            addProduct() {
                let _self = this
                let url = '/order/queryItemDetail?productSkuIds=' + _self.SKU + '&areaId=' + _self.res1[2]

                function doSuccess(response) {
                    _self.$Message.success('添加成功')
                    _self.orderItemList.push(response.data.data[0])
                    let _department = JSON.parse(response.data.data[0].servicedeparts)
                    if (response.data.data[0].iscycle != 'N' && response.data.data[0].product != '会计到家') {
                        _self.iscycle = false
                    } else if (response.data.data[0].product == '会计到家') {
                        _self.isfuwu = true
                        _self.kjdj = true
                    }
                    for (let i = 0; i < _self.orderItemList.length; i++) {
                        _self.formValidate.zongjia += Number(_self.orderItemList[i].paynumber)
                    }

                    $('#orderItemList').datagrid({
                        idField: 'id',
                        title: '',
                        data: _self.orderItemList,
                        rownumbers: true,
                        singleSelect: true,
                        frozenColumns: [[]],
                        columns: [[
                            {field: 'skuid', title: '编号', hidden: true, sortable: true},
                            {field: 'iscycle', title: 'iscycle', hidden: true, sortable: true},
                            {field: 'productid', title: '产品名', hidden: true, sortable: true},
                            {field: 'product', title: '产品名', width: 150},
                            {field: 'propertys', title: '产品属性', width: 250},
                            {field: 'oaprice', title: '产品价格', width: 100},
                            {field: 'productnumber', title: '产品数量', width: 80, editor: 'numberbox'},
                            {
                                field: 'paynumber',
                                title: '销售价格',
                                width: 80,
                                editor: {type: 'numberbox', options: {precision: 2}}
                            },
                            {field: 'givethenumber', title: '赠送数量', width: 100, editor: {type: 'numberbox'}},
                            {
                                field: 'plusdeduct',
                                title: '是否不计提成',
                                width: 100,
                                editor: {
                                    type: 'combobox',
                                    options: {
                                        valueField: 'typecode',
                                        textField: 'typename',
                                        data: [{'typecode': 'Y', 'typename': '是'}, {'typecode': 'N', 'typename': '否'},],
                                        required: true
                                    }
                                },
                                formatter: function (value, row) {
                                    if (value == 'Y') {
                                        return '是';
                                    }
                                    if (value == 'N') {
                                        return '否';
                                    }
                                    return row.plusdeduct;
                                },
                                formatter: function (value, rec, index) {
                                    if (value == undefined) return '';
                                    let valArray = value.split(',');
                                    if (valArray.length > 1) {
                                        let checkboxValue = '';
                                        for (let k = 0; k < valArray.length; k++) {
                                            if (valArray[k] == 'Y') {
                                                checkboxValue = checkboxValue + '是' + ',';
                                            }
                                            if (valArray[k] == 'N') {
                                                checkboxValue = checkboxValue + '否' + ',';
                                            }
                                        }
                                        return checkboxValue.substring(0, checkboxValue.length - 1);
                                    } else {
                                        if (value == 'Y') {
                                            return '是';
                                        }
                                        if (value == 'N') {
                                            return '否';
                                        } else {
                                            return value;
                                        }
                                    }
                                }
                            }, {
                                field: 'departname',
                                title: '服务部门',
                                width: 140,
                                editor: 'text',
                                formatter: function (value, rec, index) {
                                    return _self.departnamef(value, rec, index);
                                }
/*                                formatter:function(value,row){
                                    return row.departname;
                                },
                                editor: {
                                    type: 'combobox',
                                    options: {
                                        valueField: 'type',
                                        textField: 'text',
                                        data: _department,
                                        required: true,
                                    }
                                }*/
                            }, {field: 'departid', title: '服务部门id', hidden: true}, {
                                field: 'servicedeparts',
                                title: '服务部门id',
                                hidden: true
                            }, {
                                field: 'unitprice',
                                title: '单价/月',
                                width: 140,
                                editor: {type: 'numberbox', options: {precision: 2}}
                            },
                            {field: 'memo', title: '备注 ', width: 220, editor: 'text'}
                        ]],
                        onBeforeEdit: function (index, row) {
                            row.editing = true;
                            _self.updateActions(index);
                        },
                        onAfterEdit: function (index, row) {
                            row.editing = false;
                            _self.updateActions(index);
                        },
                        onClickRow: function (index, row) {
                            _self.itemOnClick(index)
                            if (editIndex != index) {
                                if (_self.endEditing()) {
                                    $('#orderItemList').datagrid('selectRow', index).datagrid('beginEdit', index);
                                    editIndex = index;
                                    _self.formValidate.zongjia = 0
                                    for (let i = 0; i < _self.orderItemList.length; i++) {
                                        _self.formValidate.zongjia += Number(_self.orderItemList[i].paynumber)
                                    }
                                } else {
                                    $('#orderItemList').datagrid('selectRow', editIndex);
                                }
                            }
                        },
                    })
                }

                function otherConditions() {
                    this.$Message.error('添加失败');
                }

                this.GetData(url, doSuccess, otherConditions)
            },

            endEditing() {
                if (editIndex == undefined) {
                    return true
                }
                if ($('#orderItemList').datagrid('validateRow', editIndex)) {
                    $('#orderItemList').datagrid('endEdit', editIndex);
                    editIndex = undefined;
                    return true;
                } else {
                    return false;
                }
            },

            ok4(name) {
                let _self = this

                setTimeout(() => {
                    this.loading = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            if (_self.iscycle == false && _self.formValidate.GDSreport == '') {
                                _self.$nextTick(() => {
                                    _self.loading = true;
                                });
                                _self.$Message.error('您选择了代理记账产品，请选择是否国地税报道');
                            } else if (_self.iscycle == false && _self.formValidate.serviceBeginDate == '') {
                                _self.$nextTick(() => {
                                    _self.loading = true;
                                });
                                _self.$Message.error('您选择了代理记账产品，请选择服务开始时间');
                            } else if (_self.isfuwu == true && _self.formValidate.serviceBeginDate == '') {
                                _self.$nextTick(() => {
                                    _self.loading = true;
                                });
                                _self.$Message.error('您选择了会计到家产品，请选择服务开始时间');
                            } else if (_self.orderItemList.length == 0) {
                                _self.$nextTick(() => {
                                    _self.loading = true;
                                });
                                _self.$Message.error('请选择产品');
                            } else {
                                let url = '/order/create'
                                let _data = {}
                                _data.companyId = _self.formValidate.cpid,
                                    _data.payDir = _self.formValidate.payDir,
                                    _data.orderPayNumber = _self.formValidate.orderPayNumber,
                                    _data.serviceBeginDate = _self.formValidate.serviceBeginDate,
                                    _data.GDSreport = _self.formValidate.GDSreport,
                                    _data.orderitems = JSON.stringify(_self.orderItemList)

                                function doSuccess(response) {
                                    _self.$Message.success('新增成功!')
                                    _self.orderItemList = []
                                    _self.orderAdd = false
                                    _self.cancel('formValidate')
                                    _self.getTableData()
                                }
                                function otherConditions() {
                                    _self.$nextTick(() => {
                                        _self.loading = true;
                                    });
                                    _self.$Message.error('新增失败!');
                                }
                                this.PostData(url, _data, doSuccess, otherConditions)
                            }
                        } else {
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                            this.$Message.error('新增失败!');
                        }
                    })
                }, 2000)

              /*  */
            },

            updateActions(index) {
                $('#orderItemList').datagrid('updateRow', {
                    index: index,
                    row: {}
                });
            },

            // 流程图查询
            flowChart() {
                let _self = this
                if (_self.customerId == '') {
                    _self.$Message.warning('请选择订单项');
                } else {
                    _self.flowChart2 = true
                    _self.flowChartImg = '/api/dataCenter/activiti/getResourceInputStreamObj?bussinessKey=' + this.customerId
                }
            },

            cancel(name) {
                this.iscycle = false
                this.isfuwu = true
                this.orderItemList = []
                $('#orderItemList').datagrid('loadData', {total: 0, rows: []})
                this.$refs[name].resetFields();
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
                            TEL: _res.rows[i].TEL,
                            NAME: _res.rows[i].NAME,
                            cpid: _res.rows[i].cpid,
                            balance: _res.rows[i].balance,
                            gdsreport: _res.rows[i].gdsreport,
                        })
                    }
                }

                this.GetData(url, doSuccess)
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
                            TEL: _res.rows[i].TEL,
                            NAME: _res.rows[i].NAME,
                            cpid: _res.rows[i].cpid,
                            balance: _res.rows[i].balance,
                            gdsreport: _res.rows[i].gdsreport,
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
                            TEL: _res.rows[i].TEL,
                            NAME: _res.rows[i].NAME,
                            cpid: _res.rows[i].cpid,
                            balance: _res.rows[i].balance,
                            gdsreport: _res.rows[i].gdsreport,
                        })
                    }
                }

                this.GetData(url, doSuccess)
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

            keyDown(e) {
                let _self = this

                if (e.code == 'Enter') {
                    _self.searchCompanyData()
                }
            },

            rowSelect(a) {
                let _self = this

                _self.selectCompany = false
                _self.formValidate.cpid = a.cpid
                _self.formValidate.NAME = a.NAME
                _self.formValidate.CompanyName = a.CompanyName

                if(a.gdsreport == '未报道') {
                    _self.formValidate.GDSreport = 'wbd'
                } else if(a.gdsreport == '已报道') {
                    _self.formValidate.GDSreport = 'ybd'
                } else if(a.gdsreport == '不用报道') {
                    _self.formValidate.GDSreport = 'bybd'
                } else {
                    _self.formValidate.GDSreport = ''
                }
            },

            toDoWorkFlow() {
                let _self = this
                if (_self.customerId == '') {
                    _self.$Message.warning('请选择订单项');
                } else {
                    _self.shenpi = true
                }
            },

            blsp() {
                let _self = this
                let url = '/activiti/toDoWorkFlowByBid?bId=' + _self.customerId + '&bType=10&auditFlag=' + _self.banlishenpi.agree + '&auditMemo=' + _self.banlishenpi.desc

                function doSuccess() {

                }

                this.GetData(url, doSuccess)
            },

            reApplyProcess() {
                let _self = this
                if (_self.customerId == '') {
                    _self.$Message.warning('请选择订单项');
                } else {
                    _self.cxtj = true
                }
            },

            tijiao() {
                let _self = this
                let url = '/activiti/reApplyProcessByOrderId?orderId=' + _self.customerId + '&auditFlag=' + _self.banlishenpi.agree

                function doSuccess() {

                }

                this.GetData(url, doSuccess)
            },

            // 删除按钮被点击
            removeRows() {
                let _self = this
                let dd = $("#orderItemList").datagrid("getSelected");

                if (dd == null) {
                    _self.$Message.warning('请选择要移除的数据');
                }

                let index = $("#orderItemList").datagrid("getRowIndex", dd);
                $("#orderItemList").datagrid("deleteRow", index);
            },

            departnamef(value, row, index) {

                if (row.departid) {
                    return value;
                } else {
                    var servicedeparts = eval(row.servicedeparts) == null ? []
                        : eval(row.servicedeparts);

                    for (var i = 0; i < servicedeparts.length; i++) {

                        if (servicedeparts[i]["departId"]
                            && servicedeparts[i]["departId"] == value) {
                            return servicedeparts[i]["departName"];
                        }

                    }
                }


            },

            itemOnClick(index) {
                let _self = this
                let itemGrid = $("#orderItemList")
                itemGrid.datagrid('selectRow', index).datagrid("endEdit", index);
                itemGrid.datagrid('selectRow', index).datagrid("beginEdit", index);
                var editors = itemGrid.datagrid("getEditors", index);
                var targetObjs = {};
                var row = itemGrid.datagrid("getSelected");

                for (var i = 0; i < editors.length; i++) {

                    if ("departname" == editors[i].field) {

                        targetObjs.departname = editors[i].target;

                    }

                }

                var d = eval(row.servicedeparts) == null ? [] : eval(row.servicedeparts);
                targetObjs.departname.combobox({
                    data: d,
                    valueField: 'type',
                    textField: 'text',
                    onSelect: function (re) {

                        targetObjs.departname.combobox("destroy");
                        itemGrid.datagrid('updateRow', {
                            index: index,
                            row: {
                                departname: re.text,
                                departid: re.type
                            }
                        });
                        if (editIndex != null) {
                            _self.itemOnClick(editIndex);
                        }
                    }
                })
            },

            kuaiji() {
                let _self = this

                if (_self.formValidate.CompanyName == '') {
                    _self.$Message.warning('请先选择归属公司');
                } else {
                    let url = '/system/serviceContract/template/queryTreegridByCode?templateCode=kjdafwxy&objectId=' + _self.formValidate.cpid
                    _self.fuwux = true

                    function doSuccess(response) {
                        $('#tt').treegrid({
                            data: response.data.data.treeData,
                            idField : 'id',
                            treeField : 'typeName',
                            singleSelect: false,
                            checkOnSelect: true,
                            width : 600,
                            rownumbers:true,
                            toolbar : [],
                            lines : true,
//                            onLoadSuccess:loadSuccess,
                            columns : [ [
                                {
                                    field: "ck",
                                    checkbox: "true"
                                },
                                {
                                field : 'id',
                                title : '产品类型id',
                                align : 'right',
                                hidden : true
                            } ,{
                                field : 'p.id',
                                title : '父Id',
                                align : 'right',
                                hidden : true
                            }, {
                                field : 'typeName',
                                title : '类型名称',
                            },{
                                field : 'sort',
                                title : '排序'
                            } ] ]
                        });

                    }

                    this.GetData(url, doSuccess)
                }
            }
        },
        mounted() {
            this.getTableData()
        }
    }
</script>