import api from '@/services/api'

export default {
  refreshtoken (params = '') {
    console.log('pasa metr')
    return api().get('usuarios/refresh/:_id')
  },
  permisostoken (params = '') {
    return api().get('usuarios/permisos/:_id')
  }
}
