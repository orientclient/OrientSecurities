import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../app/views/layout/Layout.vue'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
    { path: '/login', component: () => import('@/app/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/app/views/errorPage/404'), hidden: true },
    { path: '/401', component: () => import('@/app/views/errorPage/401'), hidden: true },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        children: [{
            path: 'dashboard',
            component: () => import('@/app/views/dashboard/index')
        }]
    }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

export const asyncRouterMap = [

    // // 用户权限--组织管理
    // // {
    // //   path: '/organization_managing',
    // //   component: Layout,
    // //   redirect: '/organization_managing/section_config',
    // //   name: 'organizationManaging',
    // //   module: 'userPrivilege',
    // //   meta: {
    // //     title: '组织管理',
    // //     icon: 'organization',
    // //     roles: ['admin']
    // //   },
    // //   children: [
    // //     {
    // //       path: 'section_config',
    // //       name: 'section_config',
    // //       module: 'userPrivilege',
    // //       component: () => import('@/views/organizeConfig/sectionConfig/index'),
    // //       meta: {
    // //         title: '公司部门',
    // //         icon: 'section',
    // //         roles: ['admin']
    // //       }
    // //     },
    // //     {
    // //       path: 'post_config',
    // //       name: 'post_config',
    // //       module: 'userPrivilege',
    // //       component: () => import('@/views/organizeConfig/postConfig/index'),
    // //       meta: {
    // //         title: '公司岗位',
    // //         icon: 'post',
    // //         roles: ['admin']
    // //       }
    // //     },
    // // {
    // //   path: 'sector_jobs',
    // //   name: 'sector_jobs',
    // //   module: 'userPrivilege',
    // //   component: () => import('@/views/organizeConfig/sectorJobs/index'),
    // //   meta: {
    // //     title: '部门岗位',
    // //     icon: 'sectionPer',
    // //     roles: ['admin']
    // //   }
    // // },
    // //     {
    // //       path: 'people_manage',
    // //       name: 'people_manage',
    // //       module: 'userPrivilege',
    // //       component: () => import('@/views/organizeConfig/peopleManage/index'),
    // //       meta: {
    // //         title: '用户管理',
    // //         icon: 'userMana',
    // //         roles: ['admin']
    // //       }
    // //     }
    // //   ]
    // // },

    // {
    //   path: '/organization_managing',
    //   component: Layout,
    //   name: 'organizationManaging',
    //   module: 'userPrivilege',
    //   meta: {
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'people_manage',
    //       name: 'people_manage',
    //       module: 'userPrivilege',
    //       component: () => import('@/views/organizeConfig/peopleManage/index'),
    //       meta: {
    //         title: '用户管理',
    //         icon: 'userMana',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // // 用户权限--密码修改
    // {
    //   path: '/password_modify',
    //   component: Layout,
    //   name: 'passwordModify',
    //   module: 'userPrivilege',
    //   meta: {
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'password',
    //       name: 'password',
    //       module: 'userPrivilege',
    //       component: () => import('@/views/passwordModify/index'),
    //       meta: {
    //         title: '修改密码',
    //         icon: 'unlock',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // // 用户权限--服务菜单
    // // {
    // //   path: '/service_config',
    // //   component: Layout,
    // //   redirect: '/service_config/menu_list',
    // //   name: 'serviceConfig',
    // //   module: 'userPrivilege',
    // //   meta: {
    // //     title: '服务菜单',
    // //     icon: 'service',
    // //     roles: ['admin']
    // //   },
    // //   children: [
    // // {
    // //   path: 'service_manager',
    // //   name: 'service_manager',
    // //   module: 'userPrivilege',
    // //   component: () => import('@/views/serviceConfig/serManager/index'),
    // //   meta: {
    // //     title: '服务管理',
    // //     icon: 'serviceIn',
    // //     roles: ['admin']
    // //   }
    // // },
    // //     {
    // //       path: 'menu_list',
    // //       name: 'menu_list',
    // //       module: 'userPrivilege',
    // //       component: () => import('@/views/serviceConfig/menuList/index'),
    // //       meta: {
    // //         title: '菜单列表',
    // //         icon: 'menu',
    // //         roles: ['admin']
    // //       }
    // //     }
    // //   ]
    // // },

    // // 系统设置--数据字典
    // {
    //   path: '/dic_config',
    //   component: Layout,
    //   name: 'sysConfig',
    //   module: 'systemSetting',
    //   meta: {
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'index',
    //       name: 'dicConfig',
    //       module: 'systemSetting',
    //       component: () => import('@/views/dicConfig/index'),
    //       meta: {
    //         title: '数据字典',
    //         icon: 'dictionary',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // // 系统设置--系统参数
    // {
    //   path: '/sys_param',
    //   component: Layout,
    //   name: 'sysParam',
    //   module: 'systemSetting',
    //   meta: {
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'system',
    //       name: 'system',
    //       module: 'systemSetting',
    //       component: () => import('@/views/sysParam/index'),
    //       meta: {
    //         title: '系统参数',
    //         icon: 'param',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // // 系统设置--操作日志
    // {
    //   path: '/operation_log',
    //   component: Layout,
    //   name: 'operationLog',
    //   module: 'systemSetting',
    //   meta: {
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'log',
    //       name: 'log',
    //       module: 'systemSetting',
    //       component: () => import('@/views/operationLog/index'),
    //       meta: {
    //         title: '操作日志',
    //         icon: 'log',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // // 系统设置--登录查询
    // {
    //   path: '/login_query',
    //   component: Layout,
    //   name: 'loginQuery',
    //   module: 'systemSetting',
    //   meta: {
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'login',
    //       name: 'login',
    //       module: 'systemSetting',
    //       component: () => import('@/views/loginQuery/index'),
    //       meta: {
    //         title: '登录查询',
    //         icon: 'login',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // // 系统设置--demo页面
    // // {
    // //   path: '/demo_test',
    // //   component: Layout,
    // //   name: 'demoTest',
    // //   module: 'systemSetting',
    // //   meta: {
    // //     roles: ['admin']
    // //   },
    // //   children: [
    // //     {
    // //       path: 'demo',
    // //       name: 'demo',
    // //       module: 'systemSetting',
    // //       component: () => import('@/views/demo/index'),
    // //       meta: {
    // //         title: '测试页面',
    // //         icon: 'location',
    // //         roles: ['admin']
    // //       }
    // //     }
    // //   ]
    // // },

    // // 监控报表--交易系统报表
    // {
    //   path: '/report_monitor',
    //   component: Layout,
    //   name: 'reportMonitor',
    //   module: 'monitorReport',
    //   meta: {
    //     title: '交易系统报表',
    //     icon: 'organization',
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'report_query',
    //       name: 'reportQuery',
    //       module: 'monitorReport',
    //       component: () => import('@/views/reportMonitor/reportQuery/index'),
    //       meta: {
    //         title: '系统容量',
    //         icon: 'capacity',
    //         roles: ['admin']
    //       }
    //     },
    //     {
    //       path: 'take_position',
    //       name: 'takePosition ',
    //       module: 'monitorReport',
    //       component: () => import('@/views/reportMonitor/takePosition/index'),
    //       meta: {
    //         title: '成交/持仓/结算',
    //         icon: 'take',
    //         roles: ['admin']
    //       }
    //     },
    //     {
    //       path: 'cancellations',
    //       name: 'cancellations',
    //       module: 'monitorReport',
    //       component: () => import('@/views/reportMonitor/cancellations/index'),
    //       meta: {
    //         title: '撤单/废单',
    //         icon: 'cancellations',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // // 监控报表--指标范围报表
    // // {
    // //   path: '/indication_range',
    // //   component: Layout,
    // //   name: 'indicationRange',
    // //   module: 'monitorReport',
    // //   meta: {
    // //     roles: ['admin']
    // //   },
    // //   children: [
    // //     {
    // //       path: 'report',
    // //       name: 'indicationRangeReport',
    // //       module: 'monitorReport',
    // //       component: () => import('@/views/indicationRange/index'),
    // //       meta: {
    // //         title: '服务器指标报表',
    // //         icon: 'log',
    // //         roles: ['admin']
    // //       }
    // //     }
    // //   ]
    // // },

    // // 监控设置--监控指标设置
    // {
    //   path: '/index_setting',
    //   component: Layout,
    //   name: 'indexSetting',
    //   module: 'monitorSetting',
    //   redirect: '/index_setting/monitor_index',
    //   meta: {
    //     title: '监控指标设置',
    //     icon: 'monitorIndex',
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'monitor_index',
    //       name: 'monitorIndex',
    //       module: 'monitorSetting',
    //       component: () => import('@/views/indexMonitor/serverIndex/index'),
    //       meta: {
    //         title: '服务器指标',
    //         icon: 'server',
    //         roles: ['admin']
    //       }
    //     },
    //     {
    //       path: 'apply_index',
    //       name: 'applyIndex',
    //       module: 'monitorSetting',
    //       component: () => import('@/views/indexMonitor/applicationIndex/index'),
    //       meta: {
    //         title: '应用指标',
    //         icon: 'application',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // // 监控设置--监控模板设置
    // {
    //   path: '/template_setting',
    //   component: Layout,
    //   name: 'templateSetting',
    //   module: 'monitorSetting',
    //   meta: {
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'template',
    //       name: 'template',
    //       module: 'monitorSetting',
    //       component: () => import('@/views/templateSetting/index'),
    //       meta: {
    //         title: '监控模板设置',
    //         icon: 'temSetting',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // // 监控设置--告警事件设置
    // {
    //   path: '/warning_setting',
    //   component: Layout,
    //   name: 'warningSetting',
    //   module: 'monitorSetting',
    //   meta: {
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'warning',
    //       name: 'warning',
    //       module: 'monitorSetting',
    //       component: () => import('@/views/warningEvent/index'),
    //       meta: {
    //         title: '告警事件设置',
    //         icon: 'warn',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // // 监控设置--采集对象设置
    // {
    //   path: '/collect_setting',
    //   component: Layout,
    //   name: 'collectSetting',
    //   module: 'monitorSetting',
    //   meta: {
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'collect',
    //       name: 'collect',
    //       module: 'monitorSetting',
    //       component: () => import('@/views/acquisitionObject/index'),
    //       meta: {
    //         title: '采集对象设置',
    //         icon: 'collect',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // // 监控设置--系统树设置
    // {
    //   path: '/sys_tree_management',
    //   component: Layout,
    //   name: 'sysTreeManagement',
    //   module: 'monitorSetting',
    //   meta: {
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'index',
    //       name: 'sysTree',
    //       module: 'monitorSetting',
    //       component: () => import('@/views/sysTree/index'),
    //       meta: {
    //         title: '系统树设置',
    //         icon: 'sysTree',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // {
    //   path: '/config_management',
    //   component: Layout,
    //   name: 'configManagement',
    //   module: 'monitorSetting',
    //   meta: {
    //     title: '配置项管理',
    //     icon: 'config',
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'configItem',
    //       name: 'configItem',
    //       module: 'monitorSetting',
    //       component: () => import('@/views/configItem/index'),
    //       meta: {
    //         title: '配置项管理',
    //         icon: 'configItem',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    {
        path: '/seo_search',
        component: Layout,
        name: 'seoCustomer',
        module: 'monitorOverview',
        redirect: '/seo_search/single_customer',
        meta: {
            title: '查询',
            icon: 'search',
            roles: ['admin']
        },
        children: [
            {
                path: 'single_Customer',
                name: 'singleCustomer',
                module: 'monitorOverview',
                component: () => import('@/app/views/search/singleCustomer/singleCustomer'),
                meta: {
                    title: '单客户查询',
                    icon: '',
                    roles: ['admin']
                }
            },
            {
                path: 'customer_message',
                name: 'customerMsg',
                module: 'monitorOverview',
                component: () => import('@/app/views/search/customerMsg/customerMsg'),
                meta: {
                    title: '客户信息',
                    icon: '',
                    roles: ['admin']
                }
            }
        ]
    },
    {
        path: '/multi_customer',
        component: Layout,
        name: 'multiCustomer',
        module: 'monitorOverview',
        redirect: '/multi_customer/multiCustomer_search',
        meta: {
            title: '多客户查询',
            icon: 'search',
            roles: ['admin']
        },
        children: [
            {
                path: 'multiCustomer_search',
                name: 'multiSearch',
                module: 'monitorOverview',
                component: () => import('@/app/views/multiCustomer/multiCustomer/multiCustomer'),
                meta: {
                    title: '综合信息',
                    icon: '',
                    roles: ['admin']
                }
            },
            {
                path: 'fund_query',
                name: 'fundMessage',
                module: 'monitorOverview',
                component: () => import('@/app/views/multiCustomer/fundQuery/fundQuery'),
                meta: {
                    title: '资金信息',
                    icon: '',
                    roles: ['admin']
                }
            }
            // {
            //   path: 'history_query',
            //   name: 'historyQuery',
            //   module: 'monitorOverview',
            //   component: () => import('@/views/eventMonitor/historyQuery/index'),
            //   meta: {
            //     title: '历史查询',
            //     icon: '',
            //     roles: ['admin']
            //   }
            // }
        ]
    }

    // {
    //   path: '/event_monitor',
    //   component: Layout,
    //   name: 'eventMonitor',
    //   module: 'monitorOverview',
    //   redirect: '/log_monitor/real_time',
    //   meta: {
    //     title: '事件监控',
    //     icon: 'logmonitor',
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'real_time',
    //       name: 'realTime',
    //       module: 'monitorOverview',
    //       component: () => import('@/views/eventMonitor/realTime/index'),
    //       meta: {
    //         title: '实时监控',
    //         icon: 'errlog',
    //         roles: ['admin']
    //       }
    //     },
    //     {
    //       path: 'history_query',
    //       name: 'historyQuery',
    //       module: 'monitorOverview',
    //       component: () => import('@/views/eventMonitor/historyQuery/index'),
    //       meta: {
    //         title: '历史查询',
    //         icon: 'historylog',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // }

    // {
    //   path: '/indicators_monitor',
    //   component: Layout,
    //   name: 'indicatorsMonitor',
    //   module: 'monitorOverview',
    //   redirect: '/indicators_monitor/service_indicators',
    //   meta: {
    //     title: '指标监控',
    //     icon: 'indicator',
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'service_indicators',
    //       name: 'serviceIndicators',
    //       module: 'monitorOverview',
    //       component: () => import('@/views/indicatorsMonitor/index'),
    //       meta: {
    //         title: '指标监控',
    //         icon: 'server',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // {
    //   path: '/screen_monitor',
    //   component: Layout,
    //   name: 'screenModule',
    //   module: 'monitorOverview',
    //   redirect: '/screen_monitor/screen_monitor',
    //   meta: {
    //     title: '大屏监控',
    //     icon: 'bigScreen',
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'screen_monitor',
    //       name: 'screenMonitor',
    //       module: 'monitorOverview',
    //       component: () => import('@/views/screenModule/screenMonitor/index'),
    //       meta: {
    //         title: '大屏监控',
    //         icon: 'bigScreen',
    //         roles: ['admin']
    //       }
    //     },
    // {
    //   path: '/screen_monitor',
    //   component: Layout,
    //   name: 'screenModule',
    //   module: 'monitorOverview',
    //   redirect: '/screen_monitor/screen_monitor',
    //   meta: {
    //     title: '大屏监控',
    //     icon: 'bigScreen',
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'screen_monitor',
    //       name: 'screenMonitor',
    //       module: 'monitorOverview',
    //       component: () => import('@/views/screenModule/screenMonitor/index'),
    //       meta: {
    //         title: '大屏监控',
    //         icon: 'bigScreen',
    //         roles: ['admin']
    //       }
    //     },
    //     {
    //       path: 'seat_area',
    //       name: 'seatArea',
    //       module: 'monitorOverview',
    //       component: () => import('@/views/screenModule/seatArea/index'),
    //       meta: {
    //         title: '席位区域设置',
    //         icon: 'seat',
    //         roles: ['admin']
    //       }
    //     },
    //     {
    //       path: 'segment_setting',
    //       name: 'segmentSetting',
    //       module: 'monitorOverview',
    //       component: () => import('@/views/screenModule/segmentSetting/index'),
    //       meta: {
    //         title: '接入点网段设置',
    //         icon: 'connect',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // {
    //   path: '/communicate_monitor',
    //   component: Layout,
    //   name: 'communicateMonitor',
    //   module: 'monitorOverview',
    //   redirect: '/communicate_monitor/communicate',
    //   meta: {
    //     title: '通信监控',
    //     icon: 'comMonitor',
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'communicate',
    //       name: 'communicate',
    //       module: 'monitorOverview',
    //       component: () => import('@/views/communicateMonitor/commMonitor/index'),
    //       meta: {
    //         title: '通信监控',
    //         icon: 'communicate',
    //         roles: ['admin']
    //       }
    //     },
    //     {
    //       path: 'computer_setting',
    //       name: 'computerSetting',
    //       module: 'monitorOverview',
    //       component: () => import('@/views/communicateMonitor/computerSetting/index'),
    //       meta: {
    //         title: '监控机器设置',
    //         icon: 'camera',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // // {
    // //   path: '/log_monitor',
    // //   component: Layout,
    // //   name: 'monitorOverview',
    // //   module: 'monitorOverview',
    // //   // redirect: '/log_monitor/errLog',
    // //   meta: {
    // //     // title: '日志监控',
    // //     // icon: 'logmonitor',
    // //     roles: ['admin']
    // //   },
    // //   children: [
    // //     {
    // //       path: 'historyLog',
    // //       name: 'historyLog',
    // //       module: 'monitorOverview',
    // //       component: () => import('@/views/logMonitor/historyLog/index'),
    // //       meta: {
    // //         title: '日志监控',
    // //         icon: 'log',
    // //         roles: ['admin']
    // //       }
    // //     }
    // //   ]
    // // },

    // {
    //   path: '/seat_number',
    //   component: Layout,
    //   name: 'seatNumber',
    //   module: 'monitorOverview',
    //   // redirect: '/log_monitor/errLog',
    //   meta: {
    //     // title: '日志监控',
    //     // icon: 'logmonitor',
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'ranking',
    //       name: 'seatNumberRanking',
    //       module: 'monitorOverview',
    //       component: () => import('@/views/seatNumber/index'),
    //       meta: {
    //         title: '席位排名监控',
    //         icon: 'ranking',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // // 配置升级--交易系统自动升级
    // {
    //   path: '/auto_update',
    //   component: Layout,
    //   name: 'autoUpdate',
    //   module: 'configUpgrade',
    //   meta: {
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'update',
    //       name: 'update',
    //       module: 'monitorSetting',
    //       component: () => import('@/views/autoUpdate/index'),
    //       meta: {
    //         title: '系统自动升级',
    //         icon: 'upgradeArrow',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // // 配置升级--配置文件管理
    // {
    //   path: '/profile_management',
    //   component: Layout,
    //   name: 'profileManagement',
    //   module: 'configUpgrade',
    //   redirect: '/profile_management/profile',
    //   meta: {
    //     icon: 'profile',
    //     roles: ['admin'],
    //     title: '配置文件管理'
    //   },
    //   children: [
    //     {
    //       path: 'profile',
    //       name: 'profile',
    //       module: 'configUpgrade',
    //       component: () => import('@/views/configManage/configFile/index'),
    //       meta: {
    //         title: '配置文件管理',
    //         icon: 'profileFile',
    //         roles: ['admin']
    //       }
    //     },
    //     {
    //       path: 'global',
    //       name: 'global',
    //       module: 'configUpgrade',
    //       component: () => import('@/views/configManage/globalConfigItem/index'),
    //       meta: {
    //         title: '全局配置项',
    //         icon: 'global',
    //         roles: ['admin']
    //       }
    //     },
    //     {
    //       path: 'template',
    //       name: 'commandTemplate',
    //       module: 'configUpgrade',
    //       component: () => import('@/views/configManage/commandTemplate/index'),
    //       meta: {
    //         title: '配置命令模板',
    //         icon: 'command',
    //         roles: ['admin']
    //       }
    //     },
    //     {
    //       path: 'query',
    //       name: 'query',
    //       module: 'configUpgrade',
    //       component: () => import('@/views/configManage/enquiry/index'),
    //       meta: {
    //         title: '下发查询',
    //         icon: 'issued',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // // 配置升级--采集代理管理
    // {
    //   path: '/agency_manager',
    //   component: Layout,
    //   name: 'agencyManager',
    //   module: 'configUpgrade',
    //   meta: {
    //     roles: ['admin']
    //   },
    //   children: [
    //     {
    //       path: 'agency',
    //       name: 'agency',
    //       module: 'monitorSetting',
    //       component: () => import('@/views/collectionAgent/index'),
    //       meta: {
    //         title: '采集代理管理',
    //         icon: 'collectAgent',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // { path: '*', redirect: '/404', hidden: true }
]

