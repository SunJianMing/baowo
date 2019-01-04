<template lang="">
  <div class='assessorList'>
       <div class="app-container">
            <el-form
                label-position='top'
                size="small"
                :inline="true"
                label-width="80px"
            >
                <el-form-item label="评价问卷名称：">
                    <el-input
                        v-model="form.formData.userName"
                        placeholder=""
                    ></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker
                        v-model="form.formData.updateTimeRange"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        class='block'
                    ></el-date-picker>
                </el-form-item>
            </el-form>
            <el-form
                size="small"
                class="wt-form-btns"
                :inline="true"
                label-width="120px"
            >
                <el-form-item class="search-form-btns">

                    <el-button >搜索</el-button>
                    <el-button >重置</el-button>

                </el-form-item>
            </el-form>
        </div>
         <div class="app-container">
            <div class='add'>
                <el-button
                    type="primary"
                    icon="el-icon-plus"
                    size="small"
                    @click='toAdd'
                >新建评价问卷</el-button>
            </div>
            <el-table  header-row-class-name='table-header' style='width:100%' :data='result.list'>
              <el-table-column
                label='评价问卷名称'
                prop='name'
                align='center'
              ></el-table-column>
            </el-table>
          </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                //  表单数据

                formData: {
                    userName: "",
                    updateTimeRange: [],
                    createTime: ""
                },
                pageData: {
                    currentPage: 0,
                    pageSize: 20,
                    sortName: "",
                    sortOrder: ""
                }
            },
            // 时间数据
            pickerOptions: {
                shortcuts: [
                    {
                        text: "一天内",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24);
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "一周内",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "一月内",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "一年内",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 365
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            result:{
              list:[
                {
                  name:'人机工程主观评价表',
                  createTime:'2016-09-21',
                  type:'车'
                  }
              ]
            }
        }
    },
    methods:{
      toAdd(){}
    }
};
</script>
<style lang="css">
  .el-table tr.table-header {
    background-color: #eee;
 }
</style>
