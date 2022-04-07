import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/register',"/home",'/404','/library','/search', '/build', '/detail', '/ipneedpub',]// no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else if (to.path === '/404') {
      next()
      NProgress.done()
    } else {     
          try {
            // get user info
            await store.dispatch('user/getInfo')
            const menuPermission = store.getters['menuPermission']
            if (whiteList.indexOf(to.path) === -1 && menuPermission && menuPermission.length > 0) {
              const authority = menuPermission.some(menu => to.meta.permission.includes(menu))
              if (authority) {
                next()
              } else {
                next(`/404`)
              }
            }else{
              next()
            }
          } catch (error) {
            console.log(error)
            // remove token and go to login page to re-login
            await store.dispatch('user/resetToken')
            Message.error(error || 'Has Error')
            next({ path: '/home' })
            NProgress.done()
          }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next({ path: '/home' })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
