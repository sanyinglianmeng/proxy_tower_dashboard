<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="pattern" width="300">
        <template slot-scope="scope">
          {{ scope.row.pattern }}
        </template>
      </el-table-column>
      <el-table-column label="rule" width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.rule }}
        </template>
      </el-table-column>
      <el-table-column label="value" width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.value }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/pattern'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
