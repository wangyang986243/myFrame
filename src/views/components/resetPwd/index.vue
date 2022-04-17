<template>
    <el-dialog title="修改密码" :visible.sync="visible" width="30%" >
        <el-form :model="dataForm" ref="dataForm" :rules="dataRules" label-width="80px">
            <el-form-item label="旧密码" prop="oldPasswd">
                <el-input v-model="dataForm.oldPasswd" type="password" placeholder="请输入旧密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="passwd">
                <el-input v-model="dataForm.passwd" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePasswd">
                <el-input v-model="dataForm.rePasswd" type="password" placeholder="请确认密码"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
const dataForm = {
    oldPasswd: "",
    passwd: "",
    rePasswd: ""
}
export default {
    data() {
        let validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.dataForm.passwd) {
                callback(new Error("两次输入密码不一致"));
            } else {
                callback();
            }
        };
        return {
            visible: false,
            dataForm: {
                ...dataForm
            },
            dataRules: {
                oldPasswd: [{
                        required: true,
                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)(?![,./?!@#$%^&*_+-;'|]+$)[0-9A-Za-z,./?!@#$%^&*_+-;'|]{6,20}$/,
                        message: "密码为 6~20 位数字和字符的组合",
                        trigger: "blur"
                    },
                    {
                        pattern: /\d+/,
                        message: "密码必须包含数字",
                        trigger: "blur"
                    }
                ],
                passwd: [{
                        required: true,
                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)(?![,./?!@#$%^&*_+-;'|]+$)[0-9A-Za-z,./?!@#$%^&*_+-;'|]{6,20}$/,
                        message: "密码为 6~20 位数字和字符的组合",
                        trigger: "blur"
                    },
                    {
                        pattern: /\d+/,
                        message: "密码必须包含数字",
                        trigger: "blur"
                    }
                ],
                rePasswd: [
                    { required: true, message: "请再次输入密码", trigger: "blur" },
                    { validator: validatePass, trigger: "blur" }
                ],
            }
        }
    },
    methods: {
        init() {
            this.dataForm = { ...dataForm };
            this.visible = true;
            this.$refs['dataForm'] && this.$refs['dataForm'].clearValidate()
        },
        dialogClose() {
            this.visible = false;
        },
        async submitForm() {
            this.$refs["dataForm"].validate(async valid => {
                if (valid) {
                    const arg = {
                        url: this.$Config.apiUrl.tsysuser + `/updatePwd`,
                        params: this.dataForm
                    }
                    const { result } = await this.$Axios._put(arg)
                    if (this.$root.handleRes(result, true, '密码重置成功, 请重新登录')) {
                        this.visible = false;
                        this.$store.dispatch("FedLogOut").then(() => {
                            setTimeout(() => {
                                window.location.reload(); // 为了重新实例化vue-router对象 避免bug
                            }, 1000)
                        });
                    }
                } else {
					this.$root.validWarning();
                }
            })

        }
    }
}
</script>
<style lang="scss">
.el-dialog{
	background-color: #1B1D29;
}
.el-dialog__title{
	color: #D9DAE0;
}
.el-form-item__label{
	color: #919CAE;
}
.el-dialog__body{
	color: #D9DAE0;
}
</style>