<template>
    <div
        class="dialog-container wt-dialog-container"
        v-loading="isEvaluateTypeDetailLoading"
    >
        <div class="form-box">
            <el-form
                ref="form"
                :model="evaluateTypeDetailData"
                :rules="rules"
                label-width="120px"
                size="small"
                class="wt-detail-form"
            >
                <el-form-item
                    label="评价类型名称："
                    prop="userName"
                >
                    <el-input
                        v-model="evaluateTypeDetailData.userName"
                        placeholder="请输入评价类型名称"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="评价类型图片："
                    prop="typeImage"
                    v-model='evaluateTypeDetailData.picUrl'
                >
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                    >
                        <img
                            v-if="imageUrl"
                            :src="imageUrl"
                            class="avatar"
                        >
                        <i
                            v-else
                            class="el-icon-plus avatar-uploader-icon"
                        ></i>
                    </el-upload>
                </el-form-item>
                <el-form-item
                    label='添加参数：'
                    prop="params"
                >
                    <el-input v-model='paramsValue' class='paramsValue'></el-input>
                    <el-button size='small' @click='toParams'>增加</el-button>
                    <el-button size='small' @click='resetParams'>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="params-table">
            <el-table
                style='width:100%'
                height='200'
               :data='tableData'
            >
                <el-table-column
                    prop="paramsname"
                    label='参数信息'
                    align="center"
                    max-width="280"
                ></el-table-column>
                <el-table-column></el-table-column>
                <el-table-column
                    align="center"
                    label='操作'
                    max-width="280"
                >
                  <template slot-scope='scope'>
                    <el-button type='text' size="small">编辑</el-button>
                    <el-button type='text' size="small">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="wt-detail-btns">
            <wt-auth
                class="search-form-btn"
                hasAnyPremission="MODULES_ASSESSOR:ADD"
            >
                <el-button
                    size="small"
                    type="primary"
                    :loading="isSubmitLoading"
                    @click="onAdd"
                    v-if="viewType === 'add'"
                >立即创建</el-button>
            </wt-auth>
            <wt-auth
                class="search-form-btn"
                hasAnyPremission="MODULES_ASSESSOR:EDIT"
            >
                <el-button
                    size="small"
                    type="primary"
                    :loading="isSubmitLoading"
                    @click="onSave"
                    v-if="viewType === 'edit'"
                >保存</el-button>
            </wt-auth>
            <el-button
                size="small"
                @click="onWtDialogClose"
            >关闭</el-button>
        </div>


    </div>
</template>

<script>
import request from "@/utils/request";
import WtAuth from "@/components/WtAuth";
import addParams from './addParams'
import { mapState } from "vuex";

export default {
    name: "AssessorEdit",
    props: ["viewType"],
    components: {
        WtAuth,
        addParams
    },
    data() {
        return {
            form: {
                formUpdateUrl: "/modules/assessor/assessorUpdate",
                formAddUrl: "/modules/evaluateType/evaluateTypeAdd"
            },
            isSubmitLoading: false,
            rules: {
                userName: [
                    { required: true, message: "评价类型名称：", trigger: "blur" },
                    {
                        validator: this.$wtValidator.ValidatorNotBlank,
                        message: "输入内容不能为空",
                        trigger: "blur"
                    }
                ]
            },
            imageUrl: "", //图片url,
            tableData:[],
            paramsValue:''

        };
    },
    methods: {
        setup(data) {
            this.$refs["form"].resetFields();
        },
        /*  ------------------------- 交互按钮  -------------------------  */
        toParams(){
          if(!this.paramsValue) return;
          this.tableData.push({id:Math.random(),paramsname:this.paramsValue});
          this.paramsValue = ''
        },
        resetParams(){
          this.paramsValue = ''
        },
        onAdd() {
            const that = this;
            this.$refs["form"].validate(valid => {
                if (valid) {
                    this.$confirm("是否添加?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "info"
                    })
                        .then(() => {
                            that.requestAddAssessorDetail();
                        })
                        .catch(() => {
                            that.isSubmitLoading = false;
                        });
                } else {
                    return false;
                }
            });
        },
        onSave() {
            const that = this;
            this.$confirm("是否保存?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "info"
            })
                .then(() => {
                    that.requestUpdateAssessorDetail();
                })
                .catch(() => {
                    that.isSubmitLoading = false;
                });
        },
        /*  ------------------------- 网络请求  -------------------------  */
        requestUpdateAssessorDetail() {
            const that = this;
            that.isSubmitLoading = true;
            request({
                url: this.form.formUpdateUrl,
                method: "post",
                data: this.evaluateTypeDetailData
            })
                .then(response => {
                    this.$message({ message: "保存成功", type: "success" });
                    that.isSubmitLoading = false;
                    that.onWtDialogRefresh();
                })
                .catch(error => {
                    console.log("error", error);
                    that.isSubmitLoading = false;
                });
        },
        requestAddAssessorDetail() {
            const that = this;
            that.isSubmitLoading = true;
            request({
                url: this.form.formAddUrl,
                method: "post",
                data: this.evaluateTypeDetailData
            })
                .then(response => {
                    this.$message({ message: "保存成功", type: "success" });
                    that.isSubmitLoading = false;
                    that.onWtDialogRefresh();
                })
                .catch(error => {
                    console.log("error", error);
                    that.isSubmitLoading = false;
                });
        },
        /*  ------------------------- 通用按钮  -------------------------  */
        onWtDialogClose() {
            this.$emit("wt-dialog-close");
        },
        onWtDialogRefresh() {
            this.$emit("wt-dialog-refresh");
        },
        /* --------------------------图片上传----------------------------- */
        handleAvatarSuccess(res, file) {
            console.log("上传");
            // this.imageUrl = URL.createObjectURL(file.raw);
        }
    },
    computed: {
        ...mapState({
            isEvaluateTypeDetailLoading: state =>
                state.evaluateType.isEvaluateTypeDetailLoading,
            evaluateTypeDetailData: state =>
                state.evaluateType.evaluateTypeDetailData
        })
    }
};
</script>

<style scoped>
.form-box {
    width: 400px;
}
.avatar-uploader {
    width: 60px;
    height: 60px;
    line-height: 60px;
    font-size: 32px;
    text-align: center;
    border: 1px dashed #999;
    background-color: #eee;
}
.params-table {
    margin-left: 120px;
}
.wt-detail-btns {
    margin-top: 20px;
}
.paramsValue{
  width: 150px;
}
</style>
