<template>
    <div>
        <div class="app-container">
            <el-form label-position='top' size="small" :inline="true" label-width="80px">
                <el-form-item label="姓名：">
                    <el-input v-model="name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker
                        v-model="value"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        class='block'></el-date-picker>
                </el-form-item>
            </el-form>
            <el-form size="small" class="wt-form-btns" :inline="true" label-width="120px">
                <el-form-item class="search-form-btns">

                        <el-button type="primary" @click="toAdd">搜索</el-button>


                        <el-button type="danger" @click="reset">重置</el-button>


                </el-form-item>
            </el-form>
        </div>
        <div class="app-container"></div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      value: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '一天内',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', [start, end]);
            }
          }, {
              text: '一周内',
              onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
              }
          }, {
              text: '一月内',
              onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
              }
          }, {
              text: '一年内',
              onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                  picker.$emit('pick', [start, end]);
              }
          }
        ]
      }
    }
  },
  methods: {
    reset() {

    },
    toAdd (){

    }
  }
}
</script>
<style lang="css" scoped></style>
