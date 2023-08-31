import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import Vue from 'vue'
import 'vue2-datepicker/locale/id'

export default function ({ $config, app }) {
  Vue.use(DatePicker)
}
