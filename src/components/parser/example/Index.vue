<template>
  <div class="test-form">
    <parser :form-conf="formConf" @submit="sumbitForm1" />
    <parser :key="key2" :form-conf="formConf" @submit="sumbitForm2" />
    <el-button @click="change">
      change
    </el-button>
  </div>
</template>

<script>
import Parser from '../Parser'

// 若parser是通过安装npm方式集成到项目中的，使用此行引入
// import Parser from 'form-gen-parser'

export default {
  components: {
    Parser
  },
  props: {},
  data() {
    return {
      key2: +new Date(),
      formConf: {
        fields: [
          /*
          {
            __config__: {
              label: '单行文本',
              labelWidth: null,
              showLabel: true,
              changeTag: true,
              tag: 'el-input',
              tagIcon: 'input',
              required: true,
              layout: 'colFormItem',
              span: 24,
              document: 'https://element.eleme.cn/#/zh-CN/component/input',
              regList: [
                {
                  pattern: '/^1(3|4|5|7|8|9)\\d{9}$/',
                  message: '手机号格式错误'
                }
              ]
            },
            __slot__: {
              prepend: '',
              append: ''
            },
            __vModel__: 'mobile',
            placeholder: '请输入手机号',
            style: {
              width: '100%'
            },
            clearable: true,
            'prefix-icon': 'el-icon-mobile',
            'suffix-icon': '',
            maxlength: 11,
            'show-word-limit': true,
            readonly: false,
            disabled: false
          },
          {
            __config__: {
              label: '日期范围',
              tag: 'el-date-picker',
              tagIcon: 'date-range',
              defaultValue: null,
              span: 24,
              showLabel: true,
              labelWidth: null,
              required: true,
              layout: 'colFormItem',
              regList: [],
              changeTag: true,
              document:
                'https://element.eleme.cn/#/zh-CN/component/date-picker',
              formId: 101,
              renderKey: 1585980082729
            },
            style: {
              width: '100%'
            },
            type: 'daterange',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
            disabled: false,
            clearable: true,
            format: 'yyyy-MM-dd',
            'value-format': 'yyyy-MM-dd',
            readonly: false,
            __vModel__: 'field101'
          },
          {
            __config__: {
              layout: 'rowFormItem',
              tagIcon: 'row',
              label: '行容器',
              layoutTree: true,
              children: [
                {
                  __config__: {
                    label: '评分',
                    tag: 'el-rate',
                    tagIcon: 'rate',
                    defaultValue: 0,
                    span: 24,
                    showLabel: true,
                    labelWidth: null,
                    layout: 'colFormItem',
                    required: true,
                    regList: [],
                    changeTag: true,
                    document: 'https://element.eleme.cn/#/zh-CN/component/rate',
                    formId: 102,
                    renderKey: 1586839671259
                  },
                  style: {},
                  max: 5,
                  'allow-half': false,
                  'show-text': false,
                  'show-score': false,
                  disabled: false,
                  __vModel__: 'field102'
                }
              ],
              document: 'https://element.eleme.cn/#/zh-CN/component/layout',
              formId: 101,
              span: 24,
              renderKey: 1586839668999,
              componentName: 'row101',
              gutter: 15
            },
            type: 'default',
            justify: 'start',
            align: 'top'
          },
          {
            __config__: {
              label: '按钮',
              showLabel: true,
              changeTag: true,
              labelWidth: null,
              tag: 'el-button',
              tagIcon: 'button',
              span: 24,
              layout: 'colFormItem',
              document: 'https://element.eleme.cn/#/zh-CN/component/button',
              renderKey: 1594288459289
            },
            __slot__: {
              default: '测试按钮1'
            },
            type: 'primary',
            icon: 'el-icon-search',
            round: false,
            size: 'medium',
            plain: false,
            circle: false,
            disabled: false,
            on: {
              click: 'clickTestButton1'
            }
          },
          {
            __config__: {
              label: '图片',
              labelWidth: null,
              labelHeight: null,
              showLabel: false,
              changeTag: true,
              tag: 'el-image',
              tagIcon: 'image',
              required: false,
              span: 24,
              layout: 'colFormItem',
              formId: 101,
              renderKey: '1011678241229605'
            },
            style: { width: '100px', height: '100px' },
            'preview-src-list': [
              'https://images.pexels.com/photos/7615255/pexels-photo-7615255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              'https://images.pexels.com/photos/12294406/pexels-photo-12294406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              'https://images.pexels.com/photos/14540599/pexels-photo-14540599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            ],//开启图片预览功能
            src: 'https://e.thsi.cn/img/4025199cade5c00d',
            fit: 'fill',//确定图片如何适应容器框,同原生 object-fFit
            placeholder: '图片加载中......',//图片未加载的占位内容
            error: '图片记载失败',//加载失败的内容
            __vModel__: 'field101'
          },
          */
          {
            __config__: {
              formId: 101,
              componentName: 'row105',
              label: '卡片名称',
              layout: 'tsCard',
              labelWidth: '120px',
              showLabel: false,
              changeTag: false,
              tag: 'el-card',
              tagIcon: 'input',
              required: false,
              span: 24,
              document: 'https://element.eleme.cn/#/zh-CN/compponent/card',
              children: {
                cardHeader: [],
                cardBody: [
                  {
                    __config__: {
                      label: '多行文本',
                      labelWidth: null,
                      showLabel: true,
                      tag: 'el-input',
                      tagIcon: 'textarea',
                      required: true,
                      layout: 'colFormItem',
                      span: 24,
                      regList: [],
                      changeTag: true,
                      document: 'https://element.eleme.cn/#/zh-CN/compponent/input',
                      formId: 110,
                      renderKey: '1101678697191047',
                      defaultValue: '默认值123',
                    },
                    type: 'textarea',
                    placeholder: '请输入多行文本',
                    autosize: {
                      minRows: 4,
                      maxRows: 4
                    },
                    style: {
                      width: '100%'
                    },
                    maxlength: null,
                    'show-word-limit': false,
                    readonly: false,
                    disabled: false,
                    __vModel__: 'field110'
                  },
                  {
                    __config__: {
                      label: '下拉选择',
                      showLabel: true,
                      labelWidth: null,
                      tag: 'el-select',
                      tagIcon: 'select',
                      layout: 'colFormItem',
                      span: 24,
                      required: true,
                      regList: [],
                      changeTag: true,
                      document: 'https://element.eleme.cn/#/zh-CN/component/select',
                      formId: 109,
                      renderKey: '1091678697186994',
                      defaultValue: 1,
                      placeholder: '请选择下拉选择',
                      style: {
                        width: '100%'
                      },
                      clearable: true,
                      disabled: false,
                      filterable: false,
                      multiple: false,
                    },
                    __slot__: {
                      options: [{
                        label: '选项一',
                        value: 1
                      }, {
                        label: '选项二',
                        value: 2
                      }]
                    },
                    __vModel__: 'field109',
                  },
                  {
                    __config__: {
                      label: '单行文本',
                      labelWidth: null,
                      showLabel: true,
                      changeTag: true,
                      tag: 'el-input',
                      tagIcon: 'input',
                      required: true,
                      layout: 'colFormItem',
                      span: 24,
                      document: 'https://element.eleme.cn/#/zh-CN/conmponent/input',
                      regList: [],
                      formId: 108,
                      renderKey: '1081678697185753'
                    },
                    __slot__: {
                      prepend: '',
                      append: ''
                    },
                    placeholder: '请输入单行文本',
                    style: {
                      width: '100%'
                    },
                    clearable: true,
                    'prefix-icon': '',
                    'suffix-icon': '',
                    maxlength: null,
                    'show-word-limit': false,
                    readonly: false,
                    disabled: false,
                    __vModel__: 'field108'
                  }]
              },
              renderKey: '1011678696260531'
            },
            shadow: 'hover '
          }
        ],
        __methods__: {
          clickTestButton1() {
            console.log(
              `%c【测试按钮1】点击事件里可以访问当前表单：
                1) formModel='formData', 所以this.formData可以拿到当前表单的model
                2) formRef='elForm', 所以this.$refs.elForm可以拿到当前表单的ref(vue组件)
              `,
              'color:#409EFF;font-size: 15px'
            )
            console.log('表单的Model：', this.formData)
            console.log('表单的ref：', this.$refs.elForm)
          }
        },
        formRef: 'elForm',
        formModel: 'formData',
        size: 'small',
        labelPosition: 'right',
        labelWidth: 100,
        formRules: 'rules',
        gutter: 15,
        disabled: false,
        span: 24,
        formBtns: true,
        unFocusedComponentBorder: false
      },
      formConf2: {
        fields: [
          {
            __config__: {
              label: '单行文本',
              labelWidth: null,
              showLabel: true,
              changeTag: true,
              tag: 'el-input',
              tagIcon: 'input',
              required: true,
              layout: 'colFormItem',
              span: 24,
              document: 'https://element.eleme.cn/#/zh-CN/component/input',
              regList: [
                {
                  pattern: '/^1(3|4|5|7|8|9)\\d{9}$/',
                  message: '手机号格式错误'
                }
              ]
            },
            __slot__: {
              prepend: '',
              append: ''
            },
            __vModel__: 'mobile',
            placeholder: '请输入手机号',
            style: {
              width: '100%'
            },
            clearable: true,
            'prefix-icon': 'el-icon-mobile',
            'suffix-icon': '',
            maxlength: 11,
            'show-word-limit': true,
            readonly: false,
            disabled: false
          },
          {
            __config__: {
              label: '日期范围',
              tag: 'el-date-picker',
              tagIcon: 'date-range',
              defaultValue: null,
              span: 24,
              showLabel: true,
              labelWidth: null,
              required: true,
              layout: 'colFormItem',
              regList: [],
              changeTag: true,
              document:
                'https://element.eleme.cn/#/zh-CN/component/date-picker',
              formId: 101,
              renderKey: 1585980082729
            },
            style: {
              width: '100%'
            },
            type: 'daterange',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
            disabled: false,
            clearable: true,
            format: 'yyyy-MM-dd',
            'value-format': 'yyyy-MM-dd',
            readonly: false,
            __vModel__: 'field101'
          }
        ],
        formRef: 'elForm',
        formModel: 'formData',
        size: 'small',
        labelPosition: 'right',
        labelWidth: 100,
        formRules: 'rules',
        gutter: 15,
        disabled: false,
        span: 24,
        formBtns: true,
        unFocusedComponentBorder: false
      }
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {
    // 表单数据回填，模拟异步请求场景
    setTimeout(() => {
      // 请求回来的表单数据
      const data = {
        mobile: '18836662555'
      }
      // 回填数据
      this.fillFormData(this.formConf, data)
      // 更新表单
      this.key2 = +new Date()
    }, 2000)
  },
  methods: {
    fillFormData(form, data) {
      form.fields.forEach(item => {
        const val = data[item.__vModel__]
        if (val) {
          item.__config__.defaultValue = val
        }
      })
    },
    change() {
      this.key2 = +new Date()
      const t = this.formConf
      this.formConf = this.formConf2
      this.formConf2 = t
    },
    sumbitForm1(data) {
      console.log('sumbitForm1提交数据：', data)
    },
    sumbitForm2(data) {
      console.log('sumbitForm2提交数据：', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.test-form {
  margin: 15px auto;
  width: 800px;
  padding: 15px;
}
</style>
