<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="pattern">
        <el-input v-model="form.pattern" />
      </el-form-item>
      <el-form-item label="rule">
        <el-select v-model="form.rule" placeholder="please select rule's type">
          <el-option label="whitelist" value="whitelist" />
          <el-option label="xpath" value="xpath" />
        </el-select>
      </el-form-item>
      <el-form-item label="value">
        <el-input v-model="form.value" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        pattern: '',
        rule: '',
        value: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

