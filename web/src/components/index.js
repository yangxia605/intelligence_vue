import commonTable from './Table/commonTable'
import my_cm from './codemirror/index'

export default {
  install(Vue) {
    Vue.component('commonTable', commonTable),
    Vue.component('my_cm', my_cm)
  }
}
