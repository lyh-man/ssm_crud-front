<template>
	<div style="width: 1200px; margin: 0 auto;" class="layout">
		<Layout>
			<header>
				<row>
					<Divider orientation="left">
						<h1>员工列表</h1>
					</Divider>
				</row>
				<row justify="end" type="flex">
					<i-col style="margin-right: 5px"><Button type="primary" icon="md-add" @click="create">添加</Button></i-col>
					<i-col style="margin-right: 5px"><Button type="success" icon="md-settings" @click="setUp = true">设置</Button></i-col>
				</row>
			</header>
			<Content>
				<Table :data="data2" :columns="tableColumns1" :stripe="showStripe" :border="showBorder" :showHeader="showHeader" :size="tableSize" :height="fixedHeader ? 250 : ''">
					<template slot-scope="{ row }" slot="name">
						<strong>{{ row.name }}</strong>
					</template>
					<template slot-scope="{ row, index }" slot="action">
						<Button type="primary" size="small" style="margin-right: 5px" @click="show(index)" icon="ios-create-outline">编辑</Button>
						<Button type="error" size="small" @click="remove(row, index)" icon="ios-trash">删除</Button>
					</template>
				</Table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<!-- current 设置当前选中页,pageSize 设置每页显示数据的条数-->
						<Page :total="total" :pageSize="pageSize" :current="currentPage" @on-change="changePage" show-sizer show-elevator show-total @on-page-size-change="changePageSize"></Page>
					</div>
				</div>
			</Content>
		</Layout>

		<Drawer title="Set up" :closable="true" :mask="false" v-model="setUp">
			<div style="margin: 10px">
				Table Setting<br>
				<i-switch v-model="showBorder" style="margin-right: 5px"></i-switch>Display border<br>
				<i-switch v-model="showStripe" style="margin-right: 5px"></i-switch>Display stripe<br>
				<i-switch v-model="showIndex" style="margin-right: 5px"></i-switch>Display index<br>
				<i-switch v-model="showCheckbox" style="margin-right: 5px"></i-switch>Display multi choice<br>
				<i-switch v-model="showHeader" style="margin-right: 5px"></i-switch>Display header<br>
				<i-switch v-model="fixedHeader" style="margin-right: 5px"></i-switch>Table scrolling<br>
				<br><br>

				Table size
				<Select v-model="tableSize" style="width:200px">
					<Option value="large">large</Option>
					<Option value="default">medium(default)</Option>
					<Option value="small">small</Option>
				</Select>
			</div>
		</Drawer>

		<Modal v-model="empModal" title="Emp Info" @on-ok="okEditor" @on-cancel="cancelEditor">
			<Form :label-width="80">
				<FormItem label="Name:">
					<Input v-model="empInfo.name" placeholder="Name..." style="width: 300px;" />
				</FormItem>
				<FormItem label="Salary:">
					<Input v-model="empInfo.salary" placeholder="Salary..." style="width: 300px;" />
				</FormItem>
				<FormItem label="Age:">
					<Input v-model="empInfo.age" placeholder="Age..." style="width: 300px;" />
				</FormItem>
				<FormItem label="Email:">
					<Input v-model="empInfo.email" placeholder="Email..." style="width: 300px;" />
				</FormItem>
				<FormItem label="DeptName:">
					<Select v-model="empInfo.deptid">
						<Option v-for="(item, index) in dept" :key="index" :value="item.deptid"> {{item.deptname}} </Option>
					</Select>
				</FormItem>
			</Form>
		</Modal>
	</div>
</template>
<script>
	import {
		getAllEmps,
		getEmp,
		deleteEmp,
		updateEmp,
		insertEmp,
		getDeptName
	} from './api/api.js'
	export default {
		data() {
			return {
				// 保存列表的总数据
				total: 0,
				// 添加与编辑复用 modal 框，false为添加，true为编辑
				createOrEditor: false,
				// 是否打开员工信息框
				empModal: false,
				// 用于保存一个员工的信息
				empInfo: {},
				// 是否打开设置
				setUp: false,
				// 当前页码
				currentPage: 1,
				// 每页数据的条数
				pageSize: 10,
				// 表格的列
				tableColumns1: [{
						// 分页时，若要出现自动索引，设置type = "index2"，并使用 render 来返回索引值
						type: 'index2',
						width: 80,
						align: 'center',
						render: (h, params) => {
							return h('span', params.index + (this.currentPage - 1) * this.pageSize + 1);
						}
					}, {
						title: 'Name',
						slot: 'name'
					}, {
						title: 'Salary',
						key: 'salary',
						sortable: true
					},
					{
						title: 'Age',
						key: 'age',
						sortable: true
					},
					{
						title: 'Email',
						key: 'email'
					}, {
						title: 'DeptName',
						key: 'deptName'
					},
					{
						title: 'Action',
						slot: 'action',
						width: 200,
						align: 'center'
					}
				],
				dept: [],
				// 表格每页的数据
				data2: [],
				// 表格边框是否显示
				showBorder: false,
				// 表格斑马纹是否显示
				showStripe: false,
				// 表格头是否显示
				showHeader: true,
				// 表格索引是否显示
				showIndex: true,
				// 表格多选框是否显示
				showCheckbox: false,
				// 表格滚动条是否开启
				fixedHeader: false,
				// 改变表格大小
				tableSize: 'default'
			}
		},
		methods: {
			changePage(index) {
				// 改变当前的页码，并获取当前页码所拥有的数据
				this.currentPage = index

				// 获取emps数据,分页查询
				getAllEmps({
					pageNum: this.currentPage,
					pageSize: this.pageSize
				}).then((res) => {
					if (res.data.success) {
						// 保存获取到的 emp 列表
						this.data2 = res.data.pageInfo.list
						// 保存获取数据的总数
						this.total = res.data.pageInfo.total
					}
					this.noticeType(res.data.level, res.data.messages)
				}).catch((res) => {
					this.noticeType()
				})
			},
			show(index) {
				// 弹出一个模态框，用于展示某条数据的信息
				this.empInfo = Object.assign(this.empInfo, this.data2[index])
				this.empModal = true
				this.createOrEditor = true
				this.empInfo = Object.assign(this.empInfo, {
					index: index
				})
			},
			create() {
				// 用于添加一条信息
				this.empInfo = []
				this.empModal = true
				this.createOrEditor = false
			},
			remove(row, index) {
				this.$Modal.confirm({
					title: '删除',
					content: '<p>是否删除当前数据</p>',
					onOk: () => {
						// 删除某个员工的数据
						deleteEmp({
							id: row.id
						}).then((res) => {
							if (res.data.success) {
								this.changePage(this.currentPage)
							}
							this.noticeType(res.data.level, res.data.messages)
						}).catch((res) => {
							this.noticeType()
						})
					},
					onCancel: () => {
						this.$Message.info('取消删除')
					},
					okText: 'OK',
					cancelText: 'Cancel'
				})
			},
			changePageSize(index) {
				// 改变每页显示的条数
				this.$Message.info({
					content: '当前页面显示条数修改为： ' + index + '条/页'
				})
				// 改变后，跳转到首页，并刷新列表(自动触发changePage)
				this.currentPage = 1
				this.pageSize = index
			},
			okEditor() {
				if (this.createOrEditor) {
					// 更新某个员工的数据
					const that = this
					updateEmp(this.empInfo).then((res) => {
						if (res.data.success) {
							this.changePage(this.currentPage)
						}
						this.noticeType(res.data.level, res.data.messages)
					}).catch((res) => {
						this.noticeType()
					})
				} else {
					// 新增某个员工
					this.empInfo = Object.assign({}, this.empInfo, {
						id: null
					})
					insertEmp(this.empInfo).then((res) => {
						if (res.data.success) {
							this.changePage(Math.ceil((this.total + 1) / this.pageSize))
						}
						this.noticeType(res.data.level, res.data.messages)
					}).catch((res) => {
						this.noticeType()
					})
				}
				this.empInfo = {}
			},
			cancelEditor() {
				// 取消编辑的操作
				this.$Message.info({
					content: '操作取消'
				})
			},
			noticeType(type, messages) {
				switch (type) {
					case 'info':
						this.$Notice.success({
							title: messages.join('\n'),
							duration: 2
						})
						break
					case 'error':
						this.$Notice.error({
							title: messages.join('\n'),
							duration: 2
						})
						break
					default:
						this.$Notice.error({
							title: '系统异常',
							duration: 2
						})
						break
				}
			}
		},
		watch: {
			showIndex(newVal) {
				if (newVal) {
					// 为true时，在首部增加一个索引列
					this.tableColumns1.unshift({
						// 分页时，若要出现自动索引，设置type = "index2"，并使用 render 来返回索引值
						type: 'index2',
						width: 80,
						align: 'center',
						render: (h, params) => {
							return h('span', params.index + (this.currentPage - 1) * this.pageSize + 1);
						}
					})
				} else {
					// 为false时，若首部存在索引列，则移除该列
					this.tableColumns1.forEach((item, index) => {
						if (item.type === 'index2') {
							this.tableColumns1.splice(index, 1)
						}
					})
				}
			},
			showCheckbox(newVal) {
				if (newVal) {
					// 为 true 时，在首部增加一多选框列，
					this.tableColumns1.unshift({
						type: 'selection',
						width: 60,
						align: 'center'
					})
				} else {
					// 为false时，若存在多选框列，则移除该列
					this.tableColumns1.forEach((item, index) => {
						if (item.type === 'selection') {
							this.tableColumns1.splice(index, 1)
						}
					})
				}
			},
			empModal(newVal) {
				// 如果打开模态框，则触发一次获取部门信息的操作
				if (newVal) {
					// 获取部门信息
					getDeptName().then((res) => {
						if (res.data.success) {
							// 使用 Object.assign 给对象赋值时，推荐使用如下方法，创建一个新的对象。
							// 若仍使用同一对象，比如this.dept = Object.assign(this.dept, res.data.departments)，vue可能监控不到它的变化。
							this.dept = Object.assign({}, this.dept, res.data.departments)
						}
					}).catch((res) => {
						this.noticeType()
					})
				}
			}
		},
		mounted() {
			// 页面加载时，触发第一次刷新列表的操作
			this.changePage(this.currentPage)
		}
	}
</script>
