/**
 * Created by abc on 2018/7/4.
 * Author congzhen
 */
export default {
  QQ: [{ required: true, message: '请输入QQ', trigger: 'blur' }],
  name: [{required: true, message: '请输入名称', trigger: 'blur'}, {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}],
  username: [{required: true, message: '请输入账号', trigger: 'blur'}],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}]
}
