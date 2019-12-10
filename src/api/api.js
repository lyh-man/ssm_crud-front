import Axios from 'axios'

export function getAllEmps(params) {
	return new Promise((resolve, reject) => {
		Axios.get('/emps/' + params.pageNum, {
			params
		}).then(res => {
			resolve(res);
		}).catch(res => {
			reject(res)
		})
	})
}
