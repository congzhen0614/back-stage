/**
 * Created by abc on 2018/7/4.
 * Author congzhen
 */
let phone = (rule, value, callback) => {
  let phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
  let tel = /([0-9]{3,4}-)?[0-9]{7,8}/
  if (!phone.test(value) && !tel.test(value)) {
    callback(new Error('请输入正确联系方式'))
  } else {
    callback()
  }
}

let letterNumber = (rule, value, callback) => {
  let username = /[a-zA-Z0-9]/
  if (!username.test(value)) {
    callback(new Error('用户名只能是字母和数字!'))
  } else {
    callback()
  }
}

// 杂志
let magazineRules = {
  name: [{required: true, message: '请输入组织名称', trigger: 'blur'}],
  issn: [{required: true, message: '请输入组织名称', trigger: 'blur'}],
  typeId: [{required: true, message: '请输入组织名称', trigger: 'blur'}],
  ageId: [{required: true, message: '请输入组织名称', trigger: 'blur'}],
  fee: [{required: true, message: '请输入组织名称', trigger: 'blur'}],
  content: [{required: true, message: '请输入组织名称', trigger: 'blur'}]
}

// 年龄
let ageRules = {
  name: [{required: true, message: '请输入组织名称', trigger: 'blur'}]
}

// 组织
let organizeRules = {
  name: [{required: true, message: '请输入组织名称', trigger: 'blur'}],
  contractTime: [{required: true, message: '请选择合同时间', trigger: 'blur'}],
  signer: [{required: true, message: '请输入合同签署', trigger: 'blur'}],
  linkman: [{required: true, message: '请输入联系人', trigger: 'blur'}],
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
  realname: [{required: true, message: '请输入真实姓名', trigger: 'blur'}],
  phone: [
    {required: true, message: '请输入联系电话', trigger: 'blur'},
    {validator: phone, trigger: 'blur'}
  ],
  groupId: [{required: true, message: '请选择所属组织', trigger: 'blur'}]
}

export default {
  organizeRules,
  magazineRules,
  ageRules,
  accountRules
}