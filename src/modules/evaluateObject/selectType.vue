<template lang="">
  <div class='selectedType'>
    <el-table style='width:100%' size='small' :data='typeList' @selection-change="handleSelectionChange">
      <el-table-column
        width='60'
        type='selection'
      ></el-table-column>
      <el-table-column
        label='评价类型名称'
        width='180'
        prop='name'
      ></el-table-column>
      <el-table-column></el-table-column>
    </el-table>
    <div class="wt-detail-btns">
      <el-button size='small' type="primary"
        @click="onSave"
      >保存</el-button>
      <el-button
                size="small"
                @click="onWtDialogClose"
            >关闭</el-button>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            typeList: [
                {
                    id: 1,
                    name: "门"
                },
                {
                    id: 1,
                    name: "门"
                },
                {
                    id: 1,
                    name: "门"
                },
                {
                    id: 1,
                    name: "门"
                },
                {
                    id: 1,
                    name: "门"
                }
            ],
            multipleSelection:[]
        };
    },
    methods: {
      handleSelectionChange(val){
        this.multipleSelection = val

      },
        onSave() {
          this.onWtDialogRefresh()
        },
        /*  ------------------------- 通用按钮  -------------------------  */
        onWtDialogClose() {
            this.$emit("wt-dialog-close");
        },
        onWtDialogRefresh() {
            this.$emit("wt-dialog-refresh");
        }
    }
};
</script>
<style lang="css" scoped>
.wt-detail-btns {
    margin-top: 20px;
}
</style>
