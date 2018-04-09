<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    亿账柜信息管理平台
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="用户名" @on-keydown="keyDown"/>
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="密码" @on-keydown="keyDown"/>
                            <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                        </FormItem>
                        <FormItem prop="code" style="display: none" id="code">
                            <Input v-model="form.code" placeholder="验证码" style="width: 60%" @on-keydown="keyDown"/>
                            <Img id="randCodeImage" src="/api/user/createImg" style="float: right;height: 32px"/>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">© 亿账柜版权所有woa2.0</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';

    export default {
        data() {
            return {
                form: {
                    userName: '',
                    password: '',
                    code: '',
                    count: ''
                },
                rules: {
                    userName: [
                        {required: true, message: '账号不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            handleSubmit() {
                let _self = this
                let _submit = {}
                _submit.username = _self.form.userName
                _submit.password = _self.form.password
                if (_self.count > 2) {
                    _submit.randomCode = _self.form.code
                }

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        let url = '/user/login/'
                        // Cookies.set('user', _self.form.userName);
                        // Cookies.set('password', _self.form.password);
                        function doSccess(response) {
                            Cookies.set('user', _self.form.userName);
                            Cookies.set('password', _self.form.password);
                            localStorage.setItem('realname', response.data.data.user.realname)
                            _self.getAllTSTypeGroups()
                        }
                        function otherConditions(response) {
                            _self.count = response.data.errCount
                            if (_self.count > 2) {
                                _self.$Message.error(response.data.msg);
                                _self.getImg()
                                $('#code').show()
                            } else if (_self.count < 3) {
                                _self.$Message.error(response.data.msg);
                                $('#code').hide()
                                _self.getImg()
                            } else {
                                _self.$Message.error(response.data.msg);
                                _self.getImg()
                            }
                        }
                        this.PostData(url, _submit, doSccess, otherConditions)
                    }
                });
            },
            getAllTSTypeGroups () {
                let _self = this
                this.$http.get('/api/dataCenter/system/queryAllTSTypeGroups/')
                    .then(function (response) {
                        console.log(response)
                        let str = JSON.stringify(response.data)
                        localStorage.setItem('AllTSTypeGroups', str)
                        _self.$router.push({
                               name: 'home_index'
                           });
                    })
            },
            getImg() {
                let date = new Date();
                let img = document.getElementById("randCodeImage");
                img.src = '/api/user/createImg?a=' + date.getTime();
            },

            keyDown(e) {
                let _self = this

                if (e.code == 'Enter') {
                    _self.handleSubmit()
                }
            }
        },
        mounted() {
            $('#randCodeImage').click(function () {
                let date = new Date();
                let img = document.getElementById("randCodeImage");
                img.src = '/api/user/createImg?a=' + date.getTime();
            });
        }
    };
</script>

<style>

</style>
