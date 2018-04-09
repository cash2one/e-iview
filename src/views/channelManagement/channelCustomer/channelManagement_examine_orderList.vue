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
        <Row>
            <Col style="margin:10px">
                <div style="float:left">总计：</div>
                <div style="float:right">消费总额：{{total_paynumber}}&nbsp;&nbsp;&nbsp;&nbsp;已付款总额：{{total_realnumber}}&nbsp;&nbsp;&nbsp;&nbsp;欠款总额：{{total_neednumber}}</div>
            </Col>
        </Row>
    </div>
</template>

<script>

    export default {
        props: ['customerid'],
        data() {
            return {
                length:0,
                total_neednumber:0,
                total_paynumber:0,
                total_realnumber:0,
                data6: [],
                columns7: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '公司名称',
                        key: 'companyname'
                    },
                    {
                        title: '流程状态',
                        key: 'processtype'
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
                ],
            }
        },
        methods: {
            getCompanyData() {
                var _self = this
                var url = '/customer/findCustomerOrderById/' + _self.customerid
                function doSuccess(response) {
                    var _customerData = response.data.data
                    _self.length = _customerData.length
                    console.log(_customerData.length)
                    for (var i = 0; i < _customerData.length; i++) {
                        var _responseArray = {}
                        _responseArray.ordercode = _customerData[i].ordercode
                        _responseArray.companyname = _customerData[i].companyname
                        _responseArray.processtype = _customerData[i].processtype
                        _responseArray.neednumber = _customerData[i].neednumber
                        _responseArray.paynumber = _customerData[i].paynumber
                        _responseArray.realnumber = _customerData[i].realnumber
                        _responseArray.paydirText = _customerData[i].paydirText
                        _responseArray.createDate = _customerData[i].createDate
                        _responseArray.updatedate = _customerData[i].updatedate
                        _self.data6.push(_responseArray)
                        _self.total_neednumber += _customerData[i].neednumber
                        _self.total_paynumber += _customerData[i].paynumber
                        _self.total_realnumber += _customerData[i].realnumber
                        
                    }
                }

                this.GetData(url, doSuccess)
            },
            rowClassName(row, index) {
                if (row.neednumber != 0) {
                    return 'demo-table-error-row';
                }
            },
            // count(){
            //     var _that = this

            //     for(let i = 0;i<_that.length;i++){
            //         console.log(_that.data6[3].neednumber)
            //         console.log(_that.data6[3].paynumber)
            //         console.log(_that.data6[3].realnumber)
            //         _that.total_neednumber = _that.total_neednumber + _that.data[i].neednumber
            //         _that.total_paynumber = _that.total_paynumber + _that.data[i].paynumber
            //         _that.total_realnumber = _that.total_realnumber + _that.data[i].realnumber
            //     }
                
            // }
        },
        mounted() {
            this.getCompanyData()
            // this.count()
        }
    }
</script>