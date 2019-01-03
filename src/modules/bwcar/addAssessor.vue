<template lang="">
  <div class='app-container addAssessor-container'>
    <div class="addAssessor-form">
        <el-form :rules="rules" label-position='left' class='demo-ruleform'  label-width="100px" ref="ruleForm" :model="formLabelAlign">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="性别"  prop="sex">
            <el-select v-model="formLabelAlign.sex" placeholder="请选择性别">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身高" prop="height">
            <el-input v-model.number="formLabelAlign.height" type='height'></el-input>
          </el-form-item>
          <el-form-item label="体重" prop="weight">
            <el-input v-model.number="formLabelAlign.weight" type='weight'></el-input>
          </el-form-item>
          <el-form-item label="驾龄" prop="driving">
            <el-input v-model.number="formLabelAlign.driving" type='driving'></el-input>
          </el-form-item>
           <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
       </el-form>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      formLabelAlign : {
        name:'',
        sex:'',
        height:'',
        weight:'',
        driving:''
      },
      rules : {
        name:[
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          sex:[
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          height:[
            { required: true, message: '请输入身高', trigger: 'blur' },
            { type:'number' ,message: '请输入数字', trigger: 'blur'}
          ],
          weight:[
            { required: true, message: '请输入体重', trigger: 'blur' },
            { type:'number' ,message: '请输入数字', trigger: 'blur'}
          ],
          driving:[
            { required: true, message: '请输入驾龄', trigger: 'blur' },
            { type:'number' ,message: '请输入数字', trigger: 'blur'}
          ]
      }
    }
  },
   methods: {
      submitForm(formName) {

      },
      resetForm(formName) {
        console.log(formName,222);

        this.$refs[formName].resetFields();
      }

    }
}
</script>
<style lang="css" scoped>
  .addAssessor-form{
    width:400px;
  }
  .demo-ruleform{
    width: 400px;
  }
  .addAssessor-container{
    min-width: 480px;
  }
</style>
