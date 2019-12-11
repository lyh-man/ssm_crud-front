import Axios from 'axios'

/**
 * 获取emps数据,分页查询
 * @param {Object} params 分页参数(pageNum当前页码, pageSize每页数据总数) 
 */
export function getAllEmps(params) {
	return new Promise((resolve, reject) => {
		Axios.get('/emps/' + params.pageNum, {
			params
		}).then(res => {
			resolve(res)
		}).catch(res => {
			reject(res)
		})
	})
}

/**
 * 获取某个员工的数据
 * @param {Object} params 参数为员工的 id
 */
export function getEmp(params) {
	return new Promise((resolve, reject) => {
		Axios.get('/emp/' + params.id).then(res => {
			resolve(res)
		}).catch(res => {
			reject(res)
		})
	})
}

/**
 * 删除某个员工的数据
 * @param {Object} params 参数为员工的 id
 */
export function deleteEmp(params) {
	return new Promise((resolve, reject) => {
		Axios.delete('/emp/' + params.id).then(res => {
			resolve(res)
		}).catch(res => {
			reject(res)
		})
	})
}

/**
 * 更新某个员工的数据
 * @param {Object} params 参数为员工的 id,以及员工数据
 */
export function updateEmp(params) {
	return new Promise((resolve, reject) => {
		Axios.put('/emp/' + params.id, params).then(res => {
			resolve(res)
		}).catch(res => {
			reject(res)
		})
	})
}

/**
 * 新增某个员工
 * @param {Object} params 参数为员工的 id,以及员工数据
 */
export function insertEmp(params) {
	return new Promise((resolve, reject) => {
		Axios.post('/emp', params).then(res => {
			resolve(res)
		}).catch(res => {
			reject(res)
		})
	})
}

/**
 * 获取部门信息
 * @param {Object} params 
 */
export function getDeptName(params) {
	return new Promise((resolve, reject) => {
		Axios.get('/depts').then(res => {
			resolve(res)
		}).catch(res => {
			reject(res)
		})
	})
}
