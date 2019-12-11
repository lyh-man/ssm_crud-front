import Axios from 'axios'

/**
 * ��ȡemps����,��ҳ��ѯ
 * @param {Object} params ��ҳ����(pageNum��ǰҳ��, pageSizeÿҳ��������) 
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
 * ��ȡĳ��Ա��������
 * @param {Object} params ����ΪԱ���� id
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
 * ɾ��ĳ��Ա��������
 * @param {Object} params ����ΪԱ���� id
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
 * ����ĳ��Ա��������
 * @param {Object} params ����ΪԱ���� id,�Լ�Ա������
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
 * ����ĳ��Ա��
 * @param {Object} params ����ΪԱ���� id,�Լ�Ա������
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
 * ��ȡ������Ϣ
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
