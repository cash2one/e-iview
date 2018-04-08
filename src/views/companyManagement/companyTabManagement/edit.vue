<template>
    <div>
            <Modal
                :value = "create_company"
                title = "录入"
                ok-text="保存"
                :loading = "loading"
                @on-ok = "ok('formValidate')"
                @on-cancel = "cancel('formValidate')"
            >
                <Form :model="formItem" :label-width="80">
                    <FormItem label="Input">
                        <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem label="Select">
                        <Select v-model="formItem.select">
                            <Option value="beijing">New York</Option>
                            <Option value="shanghai">London</Option>
                            <Option value="shenzhen">Sydney</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="DatePicker">
                        <Row>
                            <Col span="11">
                                <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                                <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="Radio">
                        <RadioGroup v-model="formItem.radio">
                            <Radio label="male">Male</Radio>
                            <Radio label="female">Female</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="Checkbox">
                        <CheckboxGroup v-model="formItem.checkbox">
                            <Checkbox label="Eat"></Checkbox>
                            <Checkbox label="Sleep"></Checkbox>
                            <Checkbox label="Run"></Checkbox>
                            <Checkbox label="Movie"></Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="Switch">
                        <i-switch v-model="formItem.switch" size="large">
                            <span slot="open">On</span>
                            <span slot="close">Off</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="Slider">
                        <Slider v-model="formItem.slider" range></Slider>
                    </FormItem>
                    <FormItem label="Text">
                        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit">Submit</Button>
                        <Button type="ghost" style="margin-left: 8px">Cancel</Button>
                    </FormItem>
                </Form>
            </Modal>
    </div>
</template>

<script>
export default {
    props: ['create_company'],
    data () {
        return {
            formItem: {
                input: '',
                select: '',
                radio: 'male',
                checkbox: [],
                switch: true,
                date: '',
                time: '',
                slider: [20, 50],
                textarea: ''
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        }
    }
}
</script>
