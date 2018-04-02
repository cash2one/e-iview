<style>
    @import '../../../styles/component.css';
</style>
<template>
    <div>
        <edit-table @isEdit="isEditChange" @isAdd="isAddChange"></edit-table>
        <!-- 编辑弹出框 -->
        <Modal
                v-model="edi"
                width="100%"
                :styles="{height: '100%', top: '0px'}"
                title="编辑"
                @on-ok="ok"
                @on-cancel="cancel2">
            <Row>
                <Col span="5">
                <edit-from v-if="isEdit" :customerid='customerid'></edit-from>
                </Col>
                <Col span="19">
                <Card>
                    <Collapse @on-change="collapseChange" accordion>
                        <Panel name="Company">
                            企业信息
                            <P slot="content">
                                <edit-collapse-company
                                        v-if="isEdit"
                                        :customerid='customerid'
                                        :customertypeText="customertypeText"
                                        :tel="tel"
                                        :customersource="customersource"
                                ></edit-collapse-company>
                            </P>
                        </Panel>
                        <Panel name="CustomerContent">
                            客户跟进记录
                            <P slot="content">
                                <edit-collapse-follow-up v-if="isEdit"
                                                         :customerid='customerid'></edit-collapse-follow-up>
                            </P>
                        </Panel>
                        <Panel name="Order">
                            订单详情
                            <P slot="content">
                                <!--<Button type="ghost" shape="circle" icon="plus" @click="modal1Open">新增</Button>
                                <Button type="ghost" shape="circle" icon="edit">修改</Button>
                                <Button type="ghost" shape="circle" icon="trash-b">作废</Button>-->
                                <edit-collapse-order-list v-if="isEdit"
                                                          :customerid='customerid'></edit-collapse-order-list>
                            </P>
                        </Panel>
                        <Panel name="CustomerRelation">
                            客户关系人
                            <P slot="content">
                                <edit-collapse-relation-person v-if="isEdit"
                                                               :customerid='customerid'></edit-collapse-relation-person>
                            </P>
                        </Panel>
                        <Panel name="CustomerWorkOrder">
                            服务动态
                            <P slot="content">
                                <edit-collapse-service-dynamic v-if="isEdit"
                                                               :customerid='customerid'></edit-collapse-service-dynamic>
                            </P>
                        </Panel>
                        <Panel name="FilesUpload">
                            附件
                            <P slot="content">
                                <Button type="primary" shape="circle" icon="plus" @click="modal3 = true">上传附件</Button>
                                <edit-collapse-upload ref="c1" v-if="isEdit" :customerid='customerid'
                                                      :modal3="modal3"></edit-collapse-upload>
                            </P>
                        </Panel>
                    </Collapse>
                </Card>
                </Col>
            </Row>
        </Modal>
        <!-- 编辑弹出框end -->
        <Modal
                v-model="modal3"
                title="上传附件"
                @on-ok="upload"
                @on-cancel="cancel">
            <Upload
                    ref="upload"
                    multiple
                    :before-upload="handleUpload"
                    action="//jsonplaceholder.typicode.com/posts/">
                <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
            </Upload>
            <div v-for="item in file">{{ item.name }}
                <Button type="text" @click="fileRemove(item)">移除</Button>
            </div>
            <Input v-model="value6" type="textarea" :rows="7" placeholder="请填写备注"></Input>
        </Modal>
        <edit-collapse-order :customerid='customerid' :modal1="modal1" @hidePanel="hidePanel"></edit-collapse-order>
        <add-from v-if="modal5" :modal5="modal5" @hideAddPanel="hideAddPanel"></add-from>
    </div>
</template>
<script>
    import addFrom from './customerManagement_add.vue'
    import editFrom from './customerManagement_edit_from.vue'
    import editCollapseCompany from './customerManagement_edit_collapse_company.vue'
    import editCollapseFollowUp from './customerManagement_edit_collapse_followUp.vue'
    import editTable from './customerManagement_table.vue'
    import editCollapseOrder from './customerManagement_edit_collapse_order.vue'
    import editCollapseOrderList from './customerManagement_edit_collapse_orderList.vue'
    import editCollapseRelationPerson from './customerManagement_edit_collapse_relationPerson.vue'
    import editCollapseServiceDynamic from './customerManagement_edit_collapse_serviceDynamic.vue'
    import editCollapseAccessory from './customerManagement_edit_collapse_accessory.vue'
    import editCollapseUpload from './customerManagement_edit_collapse_upload.vue'

    export default {
        components: {
            addFrom,
            editFrom,
            editCollapseCompany,
            editCollapseFollowUp,
            editTable,
            editCollapseOrder,
            editCollapseOrderList,
            editCollapseRelationPerson,
            editCollapseServiceDynamic,
            editCollapseAccessory,
            editCollapseUpload
        },
        data() {
            return {
                file: [],
                loadingStatus: false,
                value6: '',
                modal1: false,
                modal3: false,
                modal5: false,
                data: [],
                isAdd: false,
                isEdit: false,
                pinglun: '',
                edi: false,
                customerid: '',
                customertypeText: '',
                tel: '',
                customersource: ''
            }
        },
        methods: {

            /*************************关闭【编辑】弹窗********************************/
            cancel2() {
                var _self = this
                _self.customerid = ''
                _self.isEdit = false
            },

            /*************************打开【编辑】弹窗********************************/
            isEditChange(data) {
                var _self = this
                _self.customerid = data.customerid
                _self.customertypeText = data.customertypeText
                _self.tel = data.tel
                _self.customersource = data.customersource
                _self.edi = true
                _self.isEdit = true
            },

            /*************************打开【录入】弹窗********************************/
            isAddChange() {
                var _self = this
                _self.modal5 = true
            },

            /*************************打开【订单-录入】弹窗********************************/
            modal1Open() {
                var _self = this
                _self.modal1 = true
            },

            /*************************关闭【订单-录入】弹窗********************************/
            hidePanel() {
                var _self = this
                _self.modal1 = false;
            },

            /*************************关闭【录入】弹窗********************************/
            hideAddPanel() {
                var _self = this
                _self.modal5 = false;
            },

            /*************************打开相对应的DIV********************************/
            handleUpload(file) {
                this.file.push(file)
                return false;
            },

            /*************************上传附件********************************/
            upload() {
                var _self = this
                var formdata = new FormData()
                var url = '/zuul/customer/customerFilesUploadById/' + this.customerid

                for (var i = 0; i < this.file.length; i++) {
                    formdata.append('files', this.file[i])
                }
                formdata.append('customerId', this.customerid)

                function doSuccess(response) {
                    setTimeout(() => {
                        _self.file = [];
                        _self.$Message.success('上传成功！')
                        _self.$refs.c1.getFileList();
                    }, 1500);
                }

                this.PostFiles(url, formdata, doSuccess)
            },

            /*************************附件上传移除********************************/
            fileRemove(e) {
                this.file.splice(this.file.indexOf(e), 1);
            },
        },
        mounted() {
        }
    }
</script>
<style scoped="">
    .time {
        font-size: 14px;
        font-weight: bold;
    }

    .content {
        padding-left: 5px;
    }
</style>