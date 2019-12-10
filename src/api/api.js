import Axios from 'axios'

export function getAllEmps() {
	return new Promise((resolve, reject) => {
		Axios.get('/emps/2').then(res => {
			resolve(res);
		}).catch(res => {
			reject(res)
		})
	})
}
