const getters = {
    sidebar: state => state && state.app.sidebar,
    device: state => state && state.app.device,
    token: state => state && state.user.token,
    userId: state => state && state.user.userId,
    avatar: state => state && state.user.avatar,
    userInfo: state => state && state.user.userInfo,
    name: state => state && state.user.name,
    cnname:state=>state && state.user.cnname,
    roles: state => state && state.user.roles,
    menus: state => state && state.user.menus,
    btns: state => state && state.user.btns,
    visitedViews: state => state && state.tagsView.visitedViews,
    cachedViews: state => state && state.tagsView.cachedViews,
    lastView: state => state && state.tagsView.lastView,
    searchInput:state => state && state.user.searchInput,
    themeColor:state => state && state.themeColor.themeColor
};
export default getters
