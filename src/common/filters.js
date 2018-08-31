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

// 时间格式
let timeFormat = value => {
  let date = new Date(value)
  let year = date.getFullYear()
  let month = doubleNumber(date.getMonth() + 1)
  let day = doubleNumber(date.getDate())
  let hour = date.getHours()
  let minu = date.getMinutes()
  let seco = date.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minu + ':' + seco
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
    return '待审核'
  } else if (value === 1) {
    return '审核中'
  } else if (value === 2) {
    return '已通过'
  } else if (value === 3) {
    return '未通过'
  }
}

let subType = value => {
  if (value === 0) {
    return '开启'
  } else if (value === 1) {
    return '关闭'
  }
}

let clsType = value => {
  if (value === '1') {
    return '杂志'
  } else if (value === '2') {
    return '图书'
  } else if (value === '54') {
    return '电子包'
  }
}

export {
  dateFormat,
  timeFormat,
  doubleNumber,
  accountStatus,
  checkType,
  subType,
  clsType
}
