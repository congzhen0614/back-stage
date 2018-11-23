/**
 * Created by abc on 2018/7/4.
 * Author congzhen
 */
let phone = (rule, value, callback) => {
  let tel = /^[0-9]{10,11}$/
  if (!tel.test(value)) {
    callback(new Error('请输入正确联系方式'))
  } else {
    callback()
  }
}

let mPhone = (rule, value, callback) => {
  let phone = /^((13[0-9])|(14[5-9])|(15[0-3,5-9])|(16[6])|(17[0-8])|(18[0-9])|(19[8,9]))\\d{8}$/
  if (!phone.test(value)) {
    callback(new Error('请输入正确手机号'))
  } else {
    callback()
  }
}

let letterNumber = (rule, value, callback) => {
  let username = /^[0-9a-zA-Z_]{1,}$/
  if (!username.test(value)) {
    callback(new Error('用户名只能是字母、数字和下划线!'))
  } else {
    callback()
  }
}

let ISSN = (rule, value, callback) => {
  let username = /^[0-9a-zA-Z_-]{1,}$/
  if (!username.test(value)) {
    callback(new Error('请输入正确刊号'))
  } else {
    callback()
  }
}

let isNull = (rule, value, callback) => {
  let isNull = /^[ ]+$/
  if (isNull.test(value)) {
    callback(new Error('必填项不能全部为空格'))
  } else {
    callback()
  }
}

// 杂志
let magazineRules = {
  name: [
    {required: true, message: '请输入杂志名称', trigger: 'blur'},
    {validator: isNull, trigger: 'blur'}
  ],
  issn: [
    {required: true, message: '请输入杂志刊号', trigger: 'blur'},
    {validator: ISSN, trigger: 'blur'}
  ],
  typeId: [{required: true, message: '请输入选择产品类别', trigger: 'blur'}],
  ageId: [{required: true, message: '请输入选择适读年龄', trigger: 'blur'}],
  fee: [
    {required: true, message: '请输入杂志价格', trigger: 'blur'},
    {validator: isNull, trigger: 'blur'}
  ],
  feeUnitNum: [
    {required: true, message: '请输入杂志价格单位', trigger: 'blur'},
    {validator: isNull, trigger: 'blur'}
  ],
  content: [
    {required: true, message: '请输入杂志介绍', trigger: 'blur'},
    {validator: isNull, trigger: 'blur'}
  ]
}

// 年龄
let ageRules = {
  name: [
    {required: true, message: '请输入组织名称', trigger: 'blur'},
    {max: 6, message: '名称超过最大长度'},
    {validator: isNull, trigger: 'blur'}
  ]
}

// 组织
let organizeRules = {
  name: [
    {required: true, message: '请输入组织名称', trigger: 'blur'},
    {validator: isNull, trigger: 'blur'}
  ],
  contractTime: [
    {required: true, message: '请选择合同时间', trigger: 'blur'}
  ],
  signer: [
    {required: true, message: '请输入合同签署', trigger: 'blur'},
    {validator: isNull, trigger: 'blur'}
  ],
  linkman: [
    {required: true, message: '请输入联系人', trigger: 'blur'},
    {validator: isNull, trigger: 'blur'}
  ],
  phone: [
    {required: true, message: '请输入联系方式', trigger: 'blur'},
    {validator: phone, trigger: 'blur'}
  ]
}

// 账号
let accountRules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {validator: letterNumber, trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {validator: letterNumber, trigger: 'blur'}
  ],
  realname: [
    {required: true, message: '请输入真实姓名', trigger: 'blur'},
    {validator: isNull, trigger: 'blur'}
  ],
  phone: [
    {required: true, message: '请输入联系电话', trigger: 'blur'},
    {validator: mPhone, trigger: 'blur'}
  ],
  roleId: [
    {required: true, message: '请选择角色', trigger: 'blur'}
  ],
  userId: [
    {required: true, message: '请选择高级用户', trigger: 'blur'}
  ],
  groupId: [
    {required: true, message: '请选择所属组织', trigger: 'blur'}
  ]
}

let ManageCatalogue = {
  title: [
    {required: true, message: '请输入目录名称', trigger: 'blur'},
    {validator: isNull, trigger: 'blur'}
  ],
  schoolLevel: [
    {required: true, message: '请选择学校类型', trigger: 'blur'},
    {validator: isNull, trigger: 'blur'}
  ],
  linkman: [
    {required: true, message: '请输入联系人', trigger: 'blur'},
    {validator: isNull, trigger: 'blur'}
  ],
  linkmobile: [
    {required: true, message: '请输入联系电话', trigger: 'blur'},
    {validator: phone, trigger: 'blur'}
  ],
  tip: [
    {required: true, message: '请输入提示语', trigger: 'blur'},
    {max: 60, message: '提示语最大长度为60'},
    {validator: isNull, trigger: 'blur'}
  ],
  remark: [
    {required: true, message: '请输入备注', trigger: 'blur'},
    {validator: isNull, trigger: 'blur'}
  ]
}

export default {
  organizeRules,
  magazineRules,
  ageRules,
  accountRules,
  ManageCatalogue
}
