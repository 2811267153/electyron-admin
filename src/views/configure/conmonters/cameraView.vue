<template>
  <div id="warp">
    <my-el-header/>
    <div class="container">
      <div class="form-nav">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="序列号">
            <el-input
              v-model="form.serialNumber"
              placeholder="审批人"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input v-model="form.deviceName" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="设备状态">
            <el-select v-model="form.stauts" placeholder="请选择">
              <el-option
                v-for="item in stautsData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="厂商">
            <el-select v-model="form.company" placeholder="请选择">
              <el-option
                v-for="item in equipmentManufacturerData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备类型">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option
                v-for="item in typeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="showAddForm(null, '新增设备')"
            >新增设备</el-button
          >
          <el-button type="primary">删除设备</el-button>
          <el-button type="primary">二维码打印</el-button>
        </div>
      </div>
      <el-dialog :title="title" :visible.sync="dialogTableVisible">
        <el-form :rules="rules" ref="ruleForm" :model="addForm">
          <div class="width">
            <el-form-item
              label="设备名称"
              :label-width="formLabelWidth"
              prop="name"
            >
              <el-input
                v-model="addForm.name"
                autocomplete="off"
                :readonly="isReadOnly"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="SIP号"
              :label-width="formLabelWidth"
              prop="serialNumber"
            >
              <el-input
                v-model="addForm.serialNumber"
                autocomplete="off"
                :readonly="isReadOnly"
              ></el-input>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item
              label="设备厂商"
              :label-width="formLabelWidth"
              prop="company"
            >
              <el-select
                v-model="addForm.company"
                placeholder="请选择"
                :disabled="isReadOnly"
              >
                <el-option
                  v-for="item in equipmentManufacturerData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="设备类型"
              :label-width="formLabelWidth"
              prop="type"
            >
              <el-select
                v-model="addForm.type"
                placeholder="请选择"
                :disabled="isReadOnly"
              >
                <el-option
                  v-for="item in typeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item label="设备IP" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.ip"
                autocomplete="off"
                :readonly="isReadOnly"
              ></el-input>
            </el-form-item>
            <el-form-item label="端口" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.host"
                autocomplete="off"
                :readonly="isReadOnly"
              ></el-input>
            </el-form-item>
          </div>

          <div class="width">
            <el-form-item label="账户" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.account"
                autocomplete="off"
                :readonly="isReadOnly"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.password"
                autocomplete="off"
                :readonly="isReadOnly"
              ></el-input>
            </el-form-item>
          </div>

          <div class="width">
            <el-form-item
              label="所属区域"
              :label-width="formLabelWidth"
              prop="area"
            >
              <el-cascader
                :disabled="isReadOnly"
                v-model="addForm.area"
                :options="area"
                :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
              <el-input v-model="createTime" :disabled="true"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="设备位置" :label-width="formLabelWidth">
            <div v-if="addForm.address.x != ''">
              {{ this.addForm.address.province }}
              {{ this.addForm.address.city }}
              {{ this.addForm.address.district }}
              {{ this.addForm.address.street }}
            </div>
            <div v-else>请在下图中选择坐标</div>
            <baiduMap
              id="baidu-map"
              ak="qF2OlD0Gin1GwwqYTHR3cQ8dqfcfZhtZ"
              center="北京"
            >
              <bm-view style="width: 100%; height: 400px; flex: 1"></bm-view>
              <Geolocation
                :autoLocation="true"
                @locationSuccess="locationSuccess"
              ></Geolocation>
            </baiduMap>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="date" label="序号" >
          <template scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="设备名称">
        </el-table-column>
        <el-table-column prop="serialNumber" label="SIP号">
        </el-table-column>
        <el-table-column prop="company" label="设备厂商" >
        </el-table-column>
        <el-table-column prop="ip" label="设备IP">
        </el-table-column>
        <el-table-column prop="area" label="所属区域">
        </el-table-column>
        <el-table-column prop="createTime" label="安装时间" >
        </el-table-column>
        <el-table-column prop="address" label="设备位置">
          <template scope="scope">
            <div>
              {{ scope.row.address.province }}{{ scope.row.address.city
              }}{{ scope.row.address.district }}{{ scope.row.address.street }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="stauts" label="设备状态">
          <template scope="scope">
            <div v-if="scope.row.stauts">已连通</div>
            <div v-else>未连通</div>
          </template>
        </el-table-column>
        <el-table-column prop="stauts" label="设备状态">
          <template scope="scope">
            <el-link
              class="a-link"
              type="info"
              @click="showAddForm(scope.row, '编辑')"
              >编辑</el-link
            >
            <el-link class="a-link" type="info" @click="removeIt(scope.row)"
              >删除</el-link
            >
            <el-link
              class="a-link"
              type="info"
              @click="showAddForm(scope.row, '查看')"
              >查看</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import eTree from '../../../components/eTree.vue'
import baiduMap from 'vue-baidu-map/components/map/Map'
import Geolocation from 'vue-baidu-map/components/controls/Geolocation.vue'
import bmView from 'vue-baidu-map/components/map/MapView.vue'
import { getNowFormatDate } from '@/uti'
import myElHeader from "@/components/myElHeader";
export default {
  name: 'cameraView',
  components: {
    eTree,
    baiduMap,
    Geolocation,
    bmView,
    myElHeader
  },
  data() {
    return {
      title: '新增设备',
      isReadOnly: false,
      dialogTableVisible: false,
      formLabelWidth: '120px',
      disabled: false,
      form: {
        serialNumber: '', //序列号
        deviceName: '', //设备名称
        company: '', //厂商
        ip: '', //设备名称
        equipmentManufacturer: '',
        type: '',
        stauts: ''
      },
      addForm: {
        name: '',
        serialNumber: '',
        company: '',
        type: '',
        ip: '',
        host: '',
        account: '', //账户
        password: '',
        area: '',
        createTime: '',
        address: {
          x: '',
          y: ''
        },
        location: '',
        stauts: true
      },
      list: [],
      stautsData: [
        { label: '已开通', value: '已开通' },
        { label: '未开通', value: '未开通' }
      ],
      equipmentManufacturerData: [
        { label: '华康', value: '华康' },
        { label: '大华', value: '大华' }
      ],
      typeData: [
        { label: '红外测温', value: '红外测温' },
        { label: '视频监控', value: '视频监控' },
        { label: '人脸卡口', value: '人脸卡口' },
        { label: '车辆卡口', value: '车辆卡口' },
        { label: '视频门禁', value: '视频门禁' }
      ],
      area: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局'
                },
                {
                  value: 'color',
                  label: 'Color 色彩'
                },
                {
                  value: 'typography',
                  label: 'Typography 字体'
                },
                {
                  value: 'icon',
                  label: 'Icon 图标'
                },
                {
                  value: 'button',
                  label: 'Button 按钮'
                }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio 单选框'
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox 多选框'
                },
                {
                  value: 'input',
                  label: 'Input 输入框'
                },
                {
                  value: 'input-number',
                  label: 'InputNumber 计数器'
                },
                {
                  value: 'select',
                  label: 'Select 选择器'
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器'
                },
                {
                  value: 'switch',
                  label: 'Switch 开关'
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块'
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器'
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器'
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器'
                },
                {
                  value: 'upload',
                  label: 'Upload 上传'
                },
                {
                  value: 'rate',
                  label: 'Rate 评分'
                },
                {
                  value: 'form',
                  label: 'Form 表单'
                }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table 表格'
                },
                {
                  value: 'tag',
                  label: 'Tag 标签'
                },
                {
                  value: 'progress',
                  label: 'Progress 进度条'
                },
                {
                  value: 'tree',
                  label: 'Tree 树形控件'
                },
                {
                  value: 'pagination',
                  label: 'Pagination 分页'
                },
                {
                  value: 'badge',
                  label: 'Badge 标记'
                }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告'
                },
                {
                  value: 'loading',
                  label: 'Loading 加载'
                },
                {
                  value: 'message',
                  label: 'Message 消息提示'
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                },
                {
                  value: 'notification',
                  label: 'Notification 通知'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单'
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页'
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑'
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框'
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示'
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框'
                },
                {
                  value: 'card',
                  label: 'Card 卡片'
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
      rules: {
        name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
        serialNumber: [
          { required: true, message: '请输入序列号', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入设备厂商', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请输入设备类型', trigger: 'blur' }],
        area: [{ required: true, message: '请输入区域位置', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.list.push(this.addForm)
          this.dialogTableVisible = false
          window.localStorage.setItem('camera', JSON.stringify(this.list))
          this.$message({
            message: '提交完成',
            type: 'success'
          })
        } else {
          this.$message({
            message: '提交失败， 请重试',
            type: 'error'
          })
          return false
        }
      })
    },
    showAddForm(row, title) {
      this.dialogTableVisible = true
      this.title = title
      if (title === '编辑') {
        this.addForm = row
      } else if (title === '查看') {
        this.addForm = row
        this.isReadOnly = true
      } else {
        this.resetForm()
      }
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
    },

    removeIt(row) {
      this.list.map((item, i) => {
        if (row === item) {
          this.list.splice(i, 1)
        }
      })
    },
    locationSuccess(e) {
      this.addForm.address.x = e.marker.map.SC.lat
      this.addForm.address.y = e.marker.map.SC.lng
      console.log(e)
      this.addForm.address = e['addressComponent']
      console.log(this.addForm)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  created() {
    this.list = JSON.parse(window.localStorage.getItem('camera')) || []
  },
  computed: {
    createTime(value) {
      return (this.addForm.createTime = getNowFormatDate(value))
    }
  }
}
</script>

<style scoped>
.width {
  display: flex;
}

.width > * {
  width: 45%;
  margin-right: 20px;
}
#baidu-map {
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
}
.a-link {
  margin-right: 20px;
}
</style>
