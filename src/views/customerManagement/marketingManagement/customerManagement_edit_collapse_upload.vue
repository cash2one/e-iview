<template>
    <div>
        <Table border :columns="columns1" :data="data1" style="margin-top: 15px"></Table>
    </div>
</template>

<script>

    export default {
        props: ['customerid'],
        data () {
            return {
                columns1: [
                    {
                        title: '上传时间',
                        key: 'createdate'
                    },
                    {
                        title: '附件名称',
                        key: 'attachmenttitle'
                    },
                    {
                        title: '附件格式',
                        key: 'extend'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        render: (h, params) => {
                            return h('div', [
                                    h('Poptip', {
                                    props: {
                                        placement: 'left',
                                        type: 'ghost',
                                    },
                                },[
                                    h('Button',{
                                        props: {
                                            type: 'text',
                                            size: 'small',
                                            placement: 'left',
                                        }
                                    }, '预览'), [
                                    h('div',{
                                        slot: 'content'
                                    },[
                                        h('img',{
                                            domProps: {
                                                height: 100,
                                                src: '/api/assets/'+params.row.realpath,
                                            },
                                        })
                                    ])
                                        ]
                                    ]),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click:  () => {
                                            this.fileDownload(params)
                                        }
                                    }
                                }, '下载'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                },[
                                    h('Poptip', {
                                        props: {
                                            confirm: true,
                                            title: '您确定要删除此附件吗！',
                                        },
                                        on: {
                                            'on-ok': ()=>{
                                                this.filesDelete(params)
                                            },
                                            'on-cancel': function(){
                                            }
                                            /*click: () => {
                                                this.filesDelete(params)
                                            }*/
                                        }
                                    }, '删除')
                                ])
                            ]);
                        }
                    }
                ],
                data1: []
            }
        },
        methods: {
            getFileList () {
                var _self = this
                _self.data1 = []
                this.$http.get('/api/customer/findCustomerFilesById/' + _self.customerid)
                    .then(function (response) {
                        var _filesRes = response.data.data
                        for (var i = 0; i < _filesRes.length; i++) {
                            var _filesArray = {}
                            _filesArray.attachmenttitle = _filesRes[i].attachmenttitle
                            _filesArray.createdate = _filesRes[i].createdate
                            _filesArray.extend = _filesRes[i].extend
                            _filesArray.id = _filesRes[i].id
                            _filesArray.realpath = _filesRes[i].realpath
                            _self.data1.push(_filesArray)
                        }
                    })
            },
            filesDelete (e) {
                var _self = this
                this.$http.get('/api/customer/customerFileRemove/' + e.row.id)
                    .then(function (response) {
                        if (response.data.msgCode == '40000') {
                            _self.getFileList()
                        }
                    })
            },
            fileDownload (e) {
//                this.getFileList()
               this.$http({
                   method: 'get',
                   async: false,
                   responseType: 'arraybuffer',
                   url: '/api/customer/fileDownload/' + e.row.id,
               })
                   .then(function (response) {
                        let blob = new Blob([response.data], {type: "application/vnd.ms-excel"});

                        let objectUrl = URL.createObjectURL(blob);

                        window.location.href = objectUrl;
                   })
            },
            viewFiles () {

            }
        },
        mounted () {
            this.getFileList()
        }
    }
</script>