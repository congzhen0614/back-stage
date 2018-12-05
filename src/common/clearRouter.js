/**
 * Created by abc on 2018/12/5.
 */
import accountPages from '@/store/pages/accountPages'
import agePages from '@/store/pages/agePages'
import cataloguePages from '@/store/pages/cataloguePages'
import childPages from '@/store/pages/childPages'
import classifyPages from '@/store/pages/classifyPages'
import managePages from '@/store/pages/managePages'
import orderPages from '@/store/pages/orderPages'
import organizaPages from '@/store/pages/organizaPages'
import qrPages from '@/store/pages/qrPages'
import schoolPages from '@/store/pages/schoolPages'
import userPages from '@/store/pages/userPages'

let clearRouter = value => {
  switch (value) {
    case '/journalManage':
      managePages.pages = {}
      break
    case '/setAge':
      agePages.pages = {}
      break
    case '/classify':
      classifyPages.pages = {}
      break
    case '/catalogue':
      cataloguePages.pages = {}
      break
    case '/QRlist':
      qrPages.pages = {}
      break
    case '/orderList':
      orderPages.pages = {}
      break
    case '/organiza':
      organizaPages.pages = {}
      break
    case '/account':
      accountPages.pages = {}
      break
    case '/userManage':
      userPages.pages = {}
      break
    case '/childManage':
      childPages.pages = {}
      break
    case '/schoolList':
      schoolPages.pages = {}
      break
  }
}

export {
  clearRouter
}
