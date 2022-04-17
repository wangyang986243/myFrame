import {
    _post,
    _get
} from "@/axios/func";
import Config from "@/config";
import Utils from "@/utils";
import getMenuList from '@/utils/menu';

const user = {
    state: {
        token: Utils.getToken(),
        userInfo: '',
        name: '',
        cnname:'',
        avatar: '',
        menus: [],
        btns: {},
        roles: [],
        userId:'',
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USERID:(state,userId) => {
            state.userId = userId
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_CNNAME: (state, cnname) => {
            state.cnname = cnname
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_MENUS: (state, menus) => {
            state.menus = menus
        },
        SET_BTNS: (state, btns) => {
            state.btns = btns
        },
    },

    actions: {
        // 登录
        LoginByUserName({ commit }, userInfo) {
            return new Promise(async (resolve, reject) => {
                try {
                    let arg = {
                        url: Config.apiUrl.authlogin,
                        params: {
                            userName: userInfo.username.trim(),
                            pwd: userInfo.password,
                            randstr: userInfo.randstr,
                            ticket: userInfo.ticket,
                        },
                        loadingMessage: '正在登录...'
                    };
                    const { result } = await _post(arg)
                    if (result.code === 0) {
                        const data = result.data;
                        console.log('用户登入信息1',data);
                        commit('SET_TOKEN', data.token);
                        commit('SET_USERID', data.userId);
                        localStorage.setItem('userId',data.userId)
                        Utils.setToken(data.token, 1);
                    }
                    resolve(result)
                } catch (err) {
                    reject(err);
                }
            });
        },

        // 获取用户信息
        GetUserInfo({ commit }) {
            return new Promise(async (resolve, reject) => {
                try {
                    let arg = {
                        url: Config.apiUrl.getUserMenu
                    };
                    const { result } = await _post(arg)
                    if (result.code === 0) {
                        const data = result.data.data;
                        console.log('用户登入信息(菜单/用户信息/角色信息)',data);
                        commit('SET_USERINFO', data);
                        const menuData = getMenuList(data.menuList);
                        console.log('菜单信息==>menuData',menuData);
                        commit('SET_MENUS', menuData.menuList)
                        commit('SET_BTNS', menuData.btnData)
                        commit('SET_NAME', data.userName);
                        commit('SET_CNNAME',data.userNameChn);
                        if (data.avatarUrl) {
                            commit('SET_AVATAR', data.avatarUrl);
                        }
                        const roles = data.roleList.map(item => item.roleCode);
                        if (roles && roles.length > 0) {
                            // 验证返回的roles是否是一个非空数组
                            commit('SET_ROLES', roles)
                        } else {
                            reject('getInfo: roles must be a non-null array !')
                        }
                    }
                    resolve(result)
                } catch (err) {
                    reject(err)
                }
            })
        },
        // 前端 登出
        FedLogOut({
            commit
        }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                Utils.removeToken();
                resolve()
            })
        }
    }
};

export default user