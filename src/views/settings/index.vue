<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Mode">
        <el-select v-model="form.mode">
          <el-option label="score" value="score" />
          <el-option label="shuffle" value="shuffle" />
        </el-select>
      </el-form-item>
      <el-form-item label="Pool Size">
        <el-select v-model="form.pool_size">
          <el-option label="50" value="50" />
          <el-option label="100" value="100" />
          <el-option label="200" value="200" />
          <el-option label="500" value="500" />
        </el-select>
      </el-form-item>
      <el-form-item label="Concurrent">
        <el-select v-model="form.concurrent">
          <el-option label="1" value="1" />
          <el-option label="3" value="3" />
          <el-option label="5" value="5" />
          <el-option label="10" value="10" />
        </el-select>
      </el-form-item>
      <el-form-item label="Timeout">
        <el-input-number v-model="form.timeout" placeholder="10" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateData">Update</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateConfig, getConfig } from '@/api/config'

export default {
  data() {
    return {
      form: {
        mode: '',
        pool_size: 0,
        concurrent: 0,
        timeout: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getConfig().then(response => {
        this.form.mode = response.data.mode
        this.form.pool_size = response.data.pool_size
        this.form.concurrent = response.data.concurrent
        this.form.timeout = response.data.timeout
        Object.assign(this.$refs['form'].$data, this.form)
      })
    },
    updateData() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.pool_size = Number(this.form.pool_size)
          const formData = Object.assign({}, this.form)
          updateConfig(formData).then(() => {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
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
