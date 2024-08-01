<template>
  <div class="device-add" :class="{ 'is-error': isError }">
    <div class="top-line">
      <div class="title">故障设备</div>
      <div class="actions" v-if="!disabled">
        <el-button :disabled="disabled" @click.native="addCostomHandler">添加自定义设备</el-button>
      </div>
    </div>
    <el-table :data="listData" style="width: 100%" height="400">
      <template slot="empty">
        暂无数据
      </template>
      <el-table-column width="55" type="index" label="序号" align="left"></el-table-column>
      <el-table-column prop="deviceCode" label="设备编号">
        <template slot-scope="{row}">
          {{ row.deviceCode || '--' }}
        </template>
      </el-table-column>
      <el-table-column prop="deviceName" label="设备名称"></el-table-column>
      <el-table-column prop="locationName" label="设备地点"></el-table-column>
      <el-table-column prop="deviceCode" label="类型">
        <template slot-scope="{row}">
          {{ row.deviceCode }}
        </template>
      </el-table-column>
      <el-table-column min-width="100" prop="action" label="操作" align="center">
        <template slot-scope="{row, $index}">
          <el-button v-if="!disabled" size="mini" @click.native="removeHandler(row, $index)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="isError" class="el-form-item__error">故障设备不能为空，至少添加一个设备</div>
  </div>
</template>

<script>
export default {
  name: 'ts-list',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    },
    conf: {
      type: Object,
      default: {
        __config__: {}
      }
    }
  },
  data() {
    // console.log('---------------- 添加故障设备 ---------------------')
    // console.log('this.$attrs', this.$attrs)
    // console.log("this.conf", this.conf);
    return {
      listData: (this.conf.__config__.defaultValue || []),
      // listData: [
      //   {
      //     deviceName: '设备名称设备名称设备名称设备名称',
      //     location: '莲印站-04车道',
      //     no: '2321329103904'
      //   },
      //   {
      //     deviceName: '设备名称设备名称设备名称设备名称',
      //     location: '莲印站-04车道',
      //     no: ''
      //   },
      //   {
      //     deviceName: '设备名称设备名称设备名称设备名称',
      //     location: '莲印站-04车道',
      //     no: '2321329103904'
      //   }
      // ],
      isError: false
    }
  },
  computed: {
    inputDisabled() {
      return this.disabled || (this.elForm || {}).disabled
    }
  },
  methods: {
    validate() {
      return new Promise((resolve, reject) => {
        // TODO:兼容问题，暂且屏蔽校验
        // return resolve();
        if (this.inputDisabled) {
          return resolve()
        }
        if (this.listData?.length) {
          this.isError = false
          resolve()
        } else {
          this.isError = true
          reject(new Error('故障设备不能为空'))
        }
        return true
      })
    },
    addCostomHandler() {
      this.addListHandler([{ deviceName: '111', locationName: '222' }])
    },
    removeHandler(item, index) {
      this.listData = this.listData.filter((i, id) => id !== index)
      this.changeEmit(this.listData)
    },
    addListHandler(list) {
      this.listData = this.listData.concat(list)
      this.changeEmit(this.listData)
    },
    changeEmit(val) {
      if (val?.length) {
        this.isError = false
      }
      this.$emit('input:value', val)
      this.$emit('update:value', val)
      this.elFormItem.$emit('el.form.change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.device-add {
  padding: 0;
}

.device-add.is-mobile {
  background-color: #F2F3F5;
}

.is-error {
  border-radius: 4px;
  border: 1px solid #F56C6C;
}

.top-line {
  height: 46px;
  border-bottom: 1px solid #EBECED;
  margin-bottom: 12px;

  .title {
    font-weight: 700;
    font-size: 18px;
    color: #0E0E0F;
    line-height: 26px;
    display: inline-block;
  }

  .actions {
    display: inline-block;
    position: absolute;
    right: 20px;
  }
}

</style>
