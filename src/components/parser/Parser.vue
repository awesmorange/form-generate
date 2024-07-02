<script>
import { deepClone } from '@/utils/index'
import render from '@/components/render/render.js'

const ruleTrigger = {
  'el-input': 'blur',
  'el-input-number': 'blur',
  'el-select': 'change',
  'el-radio-group': 'change',
  'el-checkbox-group': 'change',
  'el-cascader': 'change',
  'el-time-picker': 'change',
  'el-date-picker': 'change',
  'el-rate': 'change'
}

const layouts = {
  colFormItem(h, scheme) {
    const config = scheme.__config__
    const listeners = buildListeners.call(this, scheme)

    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = '0'
    return (
      <el-col span={config.span}>
        <el-form-item label-width={labelWidth} prop={scheme.__vModel__}
          label={config.showLabel ? config.label : ''}>
          <render conf={scheme} on={listeners} />
        </el-form-item>
      </el-col>
    )
  },
  rowFormItem(h, scheme) {
    let child = renderChildren.apply(this, arguments)
    if (scheme.type === 'flex') {
      child = <el-row type={scheme.type} justify={scheme.justify} align={scheme.align}>
        {child}
      </el-row>
    }
    return (
      <el-col span={scheme.span}>
        <el-row gutter={scheme.gutter}>
          {child}
        </el-row>
      </el-col>
    )
  },
  tsCard(h, scheme) {
    const cardBody = renderChildren.apply(this, arguments)
    return (
      <el-col span={scheme.span}>
        <el-row gutter={scheme.gutter}>
          <el-card className="box-card">
            <div slot="header" className="clearfix">
              <span>{scheme.__config__.label}</span>
            </div>
            <div>{cardBody}</div>
          </el-card>
        </el-row>
      </el-col>)
  }
}

function renderFrom(h) {
  const { formConfCopy } = this

  return (
    <el-row gutter={formConfCopy.gutter}>
      <el-form
        size={formConfCopy.size}
        label-position={formConfCopy.labelPosition}
        disabled={formConfCopy.disabled}
        label-width={`${formConfCopy.labelWidth}px`}
        ref={formConfCopy.formRef}
        // model不能直接赋值 https://github.com/vuejs/jsx/issues/49#issuecomment-472013664
        props={{ model: this[formConfCopy.formModel] }}
        rules={this[formConfCopy.formRules]}
      >
        {renderFormItem.call(this, h, formConfCopy.fields)}
        {formConfCopy.formBtns && formBtns.call(this, h)}
      </el-form>
    </el-row>
  )
}

function formBtns(h) {
  return <el-col>
    <el-form-item size="large">
      <el-button type="primary" onClick={this.submitForm}>提交</el-button>
      <el-button onClick={this.resetForm}>重置</el-button>
    </el-form-item>
  </el-col>
}

function renderFormItem(h, elementList) {
  return elementList.map(scheme => {
    const config = scheme.__config__
    const layout = layouts[config.layout]

    if (layout) {
      return layout.call(this, h, scheme)
    }
    throw new Error(`没有与${config.layout}匹配的layout`)
  })
}

function renderChildren(h, scheme) {
  let children
  if (scheme.__config__.tag === 'el-card') {
    children = scheme.__config__.children.cardBody
  } else {
    const config = scheme.__config__
    children = config.children
  }
  if (!Array.isArray(children)) return null
  return renderFormItem.call(this, h, children)
}

function setValue(event, config, scheme) {
  this.$set(config, 'defaultValue', event)
  this.$set(this[this.formConf.formModel], scheme.__vModel__, event)
}

function buildListeners(scheme) {
  const config = scheme.__config__
  const methods = this.formConf.__methods__ || {}
  const listeners = {}

  // 给__methods__中的方法绑定this和event
  Object.keys(methods).forEach(key => {
    listeners[key] = event => methods[key].call(this, event)
  })
  // 响应 render.js 中的 vModel $emit('input', val)
  listeners.input = event => setValue.call(this, event, config, scheme)

  return listeners
}

export default {
  components: {
    render
  },
  props: {
    formConf: {
      type: Object,
      required: true
    }
  },
  data() {
    const data = {
      formConfCopy: deepClone(this.formConf),
      [this.formConf.formModel]: {},
      [this.formConf.formRules]: {}
    }
    this.initFormData(data.formConfCopy.fields, data[this.formConf.formModel])
    this.buildRules(data.formConfCopy.fields, data[this.formConf.formRules])
    return data
  },
  methods: {
    initFormData(componentList, formData) {
      if (Array.isArray(componentList)) {
        componentList.forEach(cur => {
          const config = cur.__config__
          if (cur.__vModel__) formData[cur.__vModel__] = config.defaultValue
          if (config.children) this.initFormData(config.children, formData)
        })
      } else {
        componentList.cardBody.forEach(cur => {
          const config = cur.__config__
          // 现在要梳理出，为什么下拉的配置没有加入formData当中，现在阅读语句，找添加的语句
          // 下面代码怀疑问题出在这里，我要在这里输出语句来判断是否问题就在这里
          // 通过输出发现下拉的__vModel__是undefined，问题就出现在这里
          // 现在继续去找问题，就是__vModel__为什么为undedefined
          // 我去看下这个配置是写死，还是动态生成的？
          // 发现配置是有的，可能在代码执行中被清除了，现在看__vModel__的赋值过程
          // 搜索了下，没发现赋值，都是在使用__vModel__，怀疑赋值是在其他文件当中，现在查看这个文件引入了哪些其他文件
          // 发现这个文件引入render，然后继续去读这个文件,读了，也没找到。。。。接下来从头来，看代码不行，那就debug
          if (cur.__vModel__) formData[cur.__vModel__] = config.defaultValue
          if (config.children) this.initFormData(config.children, formData)
        })
      }
    },
    buildRules(componentList, rules) {
      if (Array.isArray(componentList)) {
        componentList.forEach(cur => {
          const config = cur.__config__
          if (Array.isArray(config.regList)) {
            if (config.required) {
              const required = { required: config.required, message: cur.placeholder }
              if (Array.isArray(config.defaultValue)) {
                required.type = 'array'
                required.message = `请至少选择一个${config.label}`
              }
              required.message === undefined && (required.message = `${config.label}不能为空`)
              config.regList.push(required)
            }
            rules[cur.__vModel__] = config.regList.map(item => {
              item.pattern && (item.pattern = eval(item.pattern))
              item.trigger = ruleTrigger && ruleTrigger[config.tag]
              return item
            })
          }
          if (config.children) this.buildRules(config.children, rules)
        })
      }
    },
    resetForm() {
      this.formConfCopy = deepClone(this.formConf)
      this.$refs[this.formConf.formRef].resetFields()
    },
    submitForm() {
      this.$refs[this.formConf.formRef].validate(valid => {
        if (!valid) return false
        // 触发sumit事件
        this.$emit('submit', this[this.formConf.formModel])
        return true
      })
    }
  },
  render(h) {
    return renderFrom.call(this, h)
  }
}
</script>
