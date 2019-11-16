import api from '@/services/api'
const auth = {
    headers: {Authorization:'JWT ' + localStorage.getItem('token')} 
}
export default {
  getUsuarios (params = '') {
    return api().get('usuario/')
  }
}