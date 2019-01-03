<template>
    <div class='activeList'>
        <div class="app-container">
            <el-form label-position='top' size="small" :inline="true" label-width="80px">
                <el-form-item label="评价活动类型名称:">
                    <el-input v-model="name" placeholder=""></el-input>
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
          <el-row type="flex" justify="space-between">
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
          </el-row>
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
      // 列表数据
      tableData3: [{
        name: '王小虎',
        img: '男',
      },{
        name: '王小虎',
        img: '男',
      },{
        name: '王小虎',
        img: '男',
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
.activeList .add{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.activeList .el-table th, .el-table tr.table-header{
  background-color: #eee;
}
.activeList .assessList-page{
      width: 100%;
    margin: 16px 0;
    text-align: right;
}
.activeList .button-pink{
  color:orange;
}
.activeList .button-delete{
  color:#f56c6c;
}
</style>
