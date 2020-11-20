import Vue from 'vue'
import { Button, Header, Main, Aside, Container, Menu, MenuItem, MenuItemGroup, Breadcrumb, BreadcrumbItem, Table, TableColumn, MessageBox, Input, Form, FormItem, Col, Message, Radio, RadioGroup, Submenu, Option, Select, Row, Pagination, Calendar, Tooltip, Divider } from 'element-ui'

Vue.use(Button)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Container)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
// $msgbox(options)
// $alert(message, title, options) 或 $alert(message, options)
// $confirm(message, title, options) 或 $confirm(message, options)
// $prompt(message, title, options) 或 $prompt(message, options)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Col)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Submenu)
Vue.use(Option)
Vue.use(Select)
Vue.use(Row)
Vue.use(Pagination)
Vue.use(Calendar)
Vue.use(Tooltip)
Vue.use(Divider)


