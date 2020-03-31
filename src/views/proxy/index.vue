<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.pattern" placeholder="choose pattern" clearable style="width: 300px" class="filter-item">
        <el-option v-for="item in patternList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Query
      </el-button>
      <el-button class="filter-item" style="margin-bottom: 10px;" type="primary" icon="el-icon-delete" @click="handleClean">
        Clean
      </el-button>
    </div>
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
      <el-table-column align="center" label="paid" width="150">
        <template slot-scope="scope">
          {{ scope.row.paid }}
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
import { getList, cleanAll } from '@/api/proxy'
import { getPatternList } from '@/api/pattern'
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
      listLoading: true,
      patternList: null,
      listQuery: {
        pattern: undefined
      }
    }
  },
  created() {
    this.fetchData()
    this.loadPattern()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    loadPattern() {
      getPatternList().then(response => {
        this.patternList = response.data.items.map(current => current.pattern)
      })
    },
    handleClean() {
      cleanAll(this.listQuery).then(response => {
        this.fetchData()
      })
    },
    handleFilter() {
      this.fetchData()
    }
  }
}
</script>
