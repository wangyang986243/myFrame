import modulesNames from "@/router/components";
import Utils from '@/utils'

const getMenuList = (data) => {
    try {
        let menuData = [];
        let btnData = [];
        data = data.sort(Utils.compareObj('menuDispSort', 'asc'))
        data && data.forEach((item) => {
            if (item.menuType != 3) {
                menuData.push({
                    id: item.id,
                    parentId: item.parentId,
                    path: item.menuUrl.startsWith('/') ? item.menuUrl : '/' + item.menuUrl,
                    name: item.menuCode,
                    component: item.menuType == 1 ? modulesNames[item.renderPage] || modulesNames['Layout'] : modulesNames[item.renderPage],
                    hidden: item.isHide == '1',
                    alwaysShow: item.isAlwaysDisp == '1',
                    meta: {
                        requireAuth: true,
                        noCache: false,//item.isCache == '0',
                        breadcrumb: item.isBreadCrumbDisp == '1',
                        title: item.menuName,
                        icon: item.menuIconClas,
                        keepAlive: true
                    },
                    menuOrder: item.menuDispSort
                });
            } else {
                btnData.push(item.menuCode)
                console.log('btnData', btnData);
            }
        });
        sessionStorage.setItem("buttenpremissions", btnData)
        //查找children添加父级重定向
        return {
            menuList: Utils.findChildren(Utils.translateListToTree(menuData)),
            btnData
        }
    } catch (err) {
        console.log(err)
    }
};

export default getMenuList;