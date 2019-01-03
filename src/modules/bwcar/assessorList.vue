<template>
    <div class='assessorList'>
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

                        <el-button  @click="toAdd">搜索</el-button>
                        <el-button  @click="reset">重置</el-button>


                </el-form-item>
            </el-form>
        </div>
        <div class="app-container">
          <div class='add'>
            <el-button type="primary" icon="el-icon-plus" size="small" @click='addAssessor' >新建评价人员</el-button>
            <el-button size="small">导出</el-button>
          </div>
          <el-table
            :data="tableData3"
            height="auto"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            header-row-class-name='table-header'

          >
            <el-table-column
              type='selection'
              width='55'
            ></el-table-column>
             <el-table-column
              prop="name"
              label="评价人员姓名"
              min-width="120"
              max-width='180'
              align='center'
              >
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              min-width="80"
              max-width='180'
              align='center'>
            </el-table-column>
            <el-table-column
              prop="height"
              label="身高"
              min-width="80"
              max-width='180'
              align='center'
              >
            </el-table-column>
            <el-table-column
              prop="weight"
              label="体重"
             min-width="80"
              max-width='180'
                align='center'
              >
            </el-table-column>
            <el-table-column
              prop="beenDriving"
              label="驾龄"
              min-width="80"
              max-width='180'
              align='center'
              >
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              min-width="80"
              max-width='180'
                align='center'
              >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              sortable
              min-width="120"
              max-width='180'
                align='center'
              >
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="180"
              align='center'
              >
              <template slot-scope="scope">
                <el-button type='text' size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type='text' class='button-pink' size="small">禁用</el-button>
                <el-button type='text' class='button-delete' size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="assessList-page">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10,20,30,40]"
              layout="  prev, pager, next, sizes, jumper"
              :total="40">
            </el-pagination>
          </div>
        </div>

    </div>
</template>
<script>

export default {
  data() {
    return {
      //搜索条件
      name: '',
      value: '',
      // 时间数据
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
      },
      // 列表数据
      tableData3: [{
        name: '王小虎',
        sex: '男',
        height: '175cm',
        weight: '60k',
        beenDriving: '5年',
        status: '启用',
        createTime:'2016-08-21'
      },{
        name: '王小虎',
        sex: '男',
        height: '175cm',
        weight: '60k',
        beenDriving: '5年',
        status: '启用',
        createTime:'2016-08-20'
      }],
        currentPage: 2
    }
  },
  methods: {
    addAssessor(){
      this.$router.push('/assessor/addAssessor')
    },
    // 搜索按钮
    reset() {

    },
    toAdd (){

    },
    // page回调函数
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }

  }
}
</script>
<style lang="css">
.assessorList .add{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.assessorList .el-table th, .el-table tr.table-header{
  background-color: #eee;
}
.assessorList .assessList-page{
      width: 100%;
    margin: 16px 0;
    text-align: right;
}
.assessorList .button-pink{
  color:orange;
}
.assessorList .button-delete{
  color:#f56c6c;
}
</style>
