const getters = {
  sidebar: state => state.app.sidebar,
  dynamicRoutes: state => state.auth.dynamicRoutes,
  permissionCodes: state => state.auth.permissionCodes,
  token: state => state.auth.token,
  avatar: state => state.auth.avatar,
  name: state => state.auth.name,
  roles: state => state.auth.roles,
  language: state => 'zh'
}
export default getters
