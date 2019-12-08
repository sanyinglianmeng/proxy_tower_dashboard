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
      <el-table-column align="center" label="tag" width="200">
        <template slot-scope="scope">
          {{ scope.row.tag }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="ip" width="200">
        <template slot-scope="scope">
          {{ scope.row.ip }}
        </template>
      </el-table-column>
      <el-table-column label="port" width="70" align="center">
        <template slot-scope="scope">
          {{ scope.row.port }}
        </template>
      </el-table-column>
      <el-table-column label="used" width="70" align="center">
        <template slot-scope="scope">
          {{ scope.row.used }}
        </template>
      </el-table-column>
      <el-table-column label="valid time" width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.valid_time }}
        </template>
      </el-table-column>
      <el-table-column label="insert time" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.insert_time | formatDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="support https" width="130">
        <template slot-scope="scope">
          {{ scope.row.support_https }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="score" width="90">
        <template slot-scope="scope">
          {{ scope.row.score }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/proxy'
import { formatDate } from '@/utils/date'

export default {
  filters: {
    formatDate(time) {
      const date = new Date(time * 1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
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
