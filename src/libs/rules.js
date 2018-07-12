/**
 * Created by abc on 2018/7/4.
 * Author congzhen
 */
export default {
  QQ: [{ required: true, message: '请输入QQ', trigger: 'blur' }],
  name: [{required: true, message: '请输入名称', trigger: 'blur'}],
  type: [{required: true, message: '请输入类型', trigger: 'blur'}],
  username: [{required: true, message: '请输入账号', trigger: 'blur'}, {min: 1, max: 24, message: '长度在 1 到 24 个字符', trigger: 'blur'}],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}, {min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur'}]
}
