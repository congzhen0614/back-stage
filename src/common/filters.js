/**
 * Created by abc on 2018/7/13.
 */
// 日期格式
let dateFormat = value => {
  let date = new Date(value)
  let year = date.getFullYear()
  let month = doubleNumber(date.getMonth() + 1)
  let day = doubleNumber(date.getDate())
  return year + '-' + month + '-' + day
}

let doubleNumber = value => {
  if (value.toString().length < 2) {
    return '0' + value
  } else {
    return value
  }
}

let accountStatus = value => {
  if (value === '正常') {
    return '禁用'
  } else {
    return '启用'
  }
}

let checkType = value => {
  if (value === 0) {
    return '草稿'
  } else if (value === 1) {
    return '待审核状态'
  } else if (value === 2) {
    return '审核通过'
  } else if (value === 3) {
    return '审核不通过'
  }
}

let subType = value => {
  if (value === 0) {
    return '开始征订'
  } else if (value === 1) {
    return '停止征订'
  }
}

export {
  dateFormat,
  doubleNumber,
  accountStatus,
  checkType,
  subType
}
