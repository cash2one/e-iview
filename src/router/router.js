import Main from '@/views/Main.vue';
// test作为测试页面接口，不部署到生产阶段，路径test也只适用于开发阶段
import Test from '@/views/companyManagement/companyTabManagement/companyTable.vue'
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => {
        require(['@/views/login.vue'], resolve);
    }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => {
        require(['@/views/error-page/404.vue'], resolve);
    }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => {
        require(['@//views/error-page/403.vue'], resolve);
    }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => {
        require(['@/views/error-page/500.vue'], resolve);
    }
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: resolve => {
        require(['@/views/form/article-publish/preview.vue'], resolve);
    }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => {
        require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve);
    }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        {
            path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => {
            require(['@/views/home/home.vue'], resolve);
        }
        },
        {
            path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => {
            require(['@/views/own-space/own-space.vue'], resolve);
        }
        },
        {
            path: 'order/:order_id', title: '订单详情', name: 'order-info', component: resolve => {
            require(['@/views/advanced-router/component/order-info.vue'], resolve);
        }
        }, // 用于展示动态路由
        {
            path: 'shopping', title: '购物详情', name: 'shopping', component: resolve => {
            require(['@/views/advanced-router/component/shopping-info.vue'], resolve);
        }
        }, // 用于展示带参路由
        {
            path: 'message', title: '消息中心', name: 'message_index', component: resolve => {
            require(['@/views/message/message.vue'], resolve);
        }
        },
        // 产品价格管理
        {
            path: 'productPrice', title: '产品价格管理', name: 'productPrice', component: resolve => {
            require(['@/views/productManagement/productList/productPrice.vue'], resolve);
        }
        },
        // 查看产品属性
        {
            path: 'productAttribute', title: '查看产品属性', name: 'productAttribute', component: resolve => {
            require(['@/views/productManagement/productList/productAttribute.vue'], resolve);
        }
        },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    // {
    //     path: '/test',
    //     icon: 'social-windwows',
    //     name: 'companyManagement',
    //     component:Test
    // },
    {
        path: '/customerManagement',
        icon: 'social-windows',
        name: 'customerManagement',
        title: '客户管理',
        component: Main,
        children: [
            {
                path: 'marketingManagement',
                title: '营销管理',
                name: 'marketingManagement_index',
                component: resolve => {
                    require(['@/views/customerManagement/marketingManagement/customerManagement.vue'], resolve);
                }
            },
            {
                path: 'customerTabManagement',
                title: '客户标签管理',
                name: 'customerTabManagement_index',
                component: resolve => {
                    require(['@/views/customerManagement/customerTabManagement/customerTabManagement.vue'], resolve);
                }
            },
        ]
    },
    {
        path: '/channelManagement',
        icon: 'social-windows',
        name: 'channelManagement',
        title: '渠道管理',
        component: Main,
        children: [
            {
                path: 'channelCustomer',
                title: '渠道客户管理',
                name: 'channelCustomer_index',
                component: resolve => {
                    require(['@/views/channelManagement/channelCustomer/channelCustomer.vue'], resolve);
                }
            },
            {
                path: 'transactionRecord',
                title: '交易查询',
                name: 'transactionRecord_index',
                component: resolve => {
                    require(['@/views/channelManagement/transactionRecord/transactionRecord.vue'], resolve);
                }
            },
        ]
    },
    {
        path: '/cluesLibrary',
        icon: 'social-windows',
        name: 'cluesLibrary',
        title: '线索库',
        component: Main,
        children: [
            {
                path: 'cluesLibrary',
                title: '线索库管理',
                name: 'cluesLibrary_index',
                component: resolve => {
                    require(['@/views/cluesLibrary/cluesLibraryTable/cluesLibrary_table.vue'], resolve);
                }
            },
            {
                path: 'cluesLabels',
                title: '线索标签管理',
                name: 'cluesLabels_index',
                component: resolve => {
                    require(['@/views/cluesLibrary/cluesLabelManagement/cluesLabels.vue'], resolve);
                }
            },
        ]
    },
    {
        path: '/product',
        icon: 'social-windows',
        name: 'product',
        title: '产品管理',
        component: Main,
        children: [
            {
                path: 'productList',
                title: '产品列表',
                name: 'productList_index',
                component: resolve => {
                    require(['@/views/productManagement/productList/productList.vue'], resolve);
                }
            },
            {
                path: 'productType',
                title: '产品类型',
                name: 'productType_index',
                component: resolve => {
                    require(['@/views/productManagement/productType/productType.vue'], resolve);
                }
            },
            {
                path: 'productAttribute',
                title: '属性管理',
                name: 'productAttribute_index',
                component: resolve => {
                    require(['@/views/productManagement/productType/attributeManagement.vue'], resolve);
                }
            },
            {
                path: 'areaManagement',
                title: '地区管理',
                name: 'areaManagement_index',
                component: resolve => {
                    require(['@/views/productManagement/productType/areaManagement.vue'], resolve);
                }
            },
        ]
    },
    {
        path: '/orderManagement',
        icon: 'social-windows',
        name: 'orderManagement',
        title: '订单管理',
        component: Main,
        children: [
            {
                path: 'orderList',
                title: '订单列表',
                name: 'orderList_index',
                component: resolve => {
                    require(['@/views/order/orderList.vue'], resolve);
                }
            },
            {
                path: 'orderApprove',
                title: '订单审批',
                name: 'orderApprove_index',
                component: resolve => {
                    require(['@/views/order/orderApprove.vue'], resolve);
                }
            },
            {
                path: 'spareManagement',
                title: '余款管理',
                name: 'spareManagement_index',
                component: resolve => {
                    require(['@/views/order/spareManagement.vue'], resolve);
                }
            },
        ]
    },
    /*{
        path: '/workOrder',
        icon: 'social-windows',
        name: 'workOrder',
        title: '工单管理',
        component: Main,
        children: [
            {
                path: 'commonTask',
                title: '分配普通任务',
                name: 'commonTask_index',
                component: resolve => {
                    require(['@/views/workOrder/commonTask/commonTask_table.vue'], resolve);
                }
            },
            {
                path: 'accountantTask',
                title: '分配会计任务',
                name: 'accountantTask_index',
                component: resolve => {
                    require(['@/views/workOrder/accountantTask/accountantTask_table.vue'], resolve);
                }
            },
            {
                path: 'myCommonTask',
                title: '我的普通任务',
                name: 'myCommonTask_index',
                component: resolve => {
                    require(['@/views/workOrder/myCommonTask/myCommonTask_table.vue'], resolve);
                }
            },
            {
                path: 'spareManagement',
                title: '我的加急任务',
                name: 'spareManagement_index',
                component: resolve => {
                    require(['@/views/order/spareManagement.vue'], resolve);
                }
            },
            {
                path: 'spareManagement',
                title: '税务表',
                name: 'spareManagement_index',
                component: resolve => {
                    require(['@/views/order/spareManagement.vue'], resolve);
                }
            },
        ]
    },*/
    {
        path: '/publicPool',
        icon: 'social-windows',
        title: '公海池',
        name: 'publicPool',
        component: Main,
        children: [
            {
                path: 'index', title: '公海池', name: 'publicPool_index', component: resolve => {
                require(['@/views/publicPool/publicPool.vue'], resolve);
            }
            }
        ]
    },
    /*{
        path: '/access',
        icon: 'key',
        name: 'access',
        title: '权限管理',
        component: Main,
        children: [
            {
                path: 'index', title: '权限管理', name: 'access_index', component: resolve => {
                require(['@/views/access/access.vue'], resolve);
            }
            }
        ]
    },
    {
        path: '/access-test',
        icon: 'lock-combination',
        title: '权限测试页',
        name: 'accesstest',
        access: 0,
        component: Main,
        children: [
            {
                path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: resolve => {
                require(['@/views/access/access-test.vue'], resolve);
            }
            }
        ]
    },
    {
        path: '/international',
        icon: 'earth',
        title: {i18n: 'international'},
        name: 'international',
        component: Main,
        children: [
            {
                path: 'index', title: {i18n: 'international'}, name: 'international_index', component: resolve => {
                require(['@/views/international/international.vue'], resolve);
            }
            }
        ]
    },
    {
        path: '/component',
        icon: 'social-buffer',
        name: 'component',
        title: '组件',
        component: Main,
        children: [
            {
                path: 'text-editor',
                icon: 'compose',
                name: 'text-editor',
                title: '富文本编辑器',
                component: resolve => {
                    require(['@/views/my-components/text-editor/text-editor.vue'], resolve);
                }
            },
            {
                path: 'md-editor',
                icon: 'pound',
                name: 'md-editor',
                title: 'Markdown编辑器',
                component: resolve => {
                    require(['@/views/my-components/markdown-editor/markdown-editor.vue'], resolve);
                }
            },
            {
                path: 'image-editor',
                icon: 'crop',
                name: 'image-editor',
                title: '图片预览编辑',
                component: resolve => {
                    require(['@/views/my-components/image-editor/image-editor.vue'], resolve);
                }
            },
            {
                path: 'draggable-list',
                icon: 'arrow-move',
                name: 'draggable-list',
                title: '可拖拽列表',
                component: resolve => {
                    require(['@/views/my-components/draggable-list/draggable-list.vue'], resolve);
                }
            },
            {
                path: 'area-linkage',
                icon: 'ios-more',
                name: 'area-linkage',
                title: '城市级联',
                component: resolve => {
                    require(['@/views/my-components/area-linkage/area-linkage.vue'], resolve);
                }
            },
            {
                path: 'file-upload',
                icon: 'android-upload',
                name: 'file-upload',
                title: '文件上传',
                component: resolve => {
                    require(['@/views/my-components/file-upload/file-upload.vue'], resolve);
                }
            },
            {
                path: 'count-to',
                icon: 'arrow-graph-up-right',
                name: 'count-to',
                title: '数字渐变',
                component: resolve => {
                    require(['@/views/my-components/count-to/count-to.vue'], resolve);
                }
            }
            // {
            //     path: 'clipboard-page',
            //     icon: 'clipboard',
            //     name: 'clipboard-page',
            //     title: '一键复制',
            //     component: resolve => { require(['@/views/my-components/clipboard/clipboard.vue'], resolve); }
            // }
        ]
    },
    {
        path: '/form',
        icon: 'android-checkbox',
        name: 'form',
        title: '表单编辑',
        component: Main,
        children: [
            {
                path: 'artical-publish',
                title: '文章发布',
                name: 'artical-publish',
                icon: 'compose',
                component: resolve => {
                    require(['@/views/form/article-publish/article-publish.vue'], resolve);
                }
            },
            {
                path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: resolve => {
                require(['@/views/form/work-flow/work-flow.vue'], resolve);
            }
            }

        ]
    },*/
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

    //     ]
    // },
    /*{
        path: '/tables',
        icon: 'ios-grid-view',
        name: 'tables',
        title: '表格',
        component: Main,
        children: [
            {
                path: 'dragableTable',
                title: '可拖拽排序',
                name: 'dragable-table',
                icon: 'arrow-move',
                component: resolve => {
                    require(['@/views/tables/dragable-table.vue'], resolve);
                }
            },
            {
                path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: resolve => {
                require(['@/views/tables/editable-table.vue'], resolve);
            }
            },
            {
                path: 'searchableTable',
                title: '可搜索表格',
                name: 'searchable-table',
                icon: 'search',
                component: resolve => {
                    require(['@/views/tables/searchable-table.vue'], resolve);
                }
            },
            {
                path: 'exportableTable',
                title: '表格导出数据',
                name: 'exportable-table',
                icon: 'code-download',
                component: resolve => {
                    require(['@/views/tables/exportable-table.vue'], resolve);
                }
            },
            {
                path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: resolve => {
                require(['@/views/tables/table-to-image.vue'], resolve);
            }
            }
        ]
    },
    {
        path: '/advanced-router',
        icon: 'ios-infinite',
        name: 'advanced-router',
        title: '高级路由',
        component: Main,
        children: [
            {
                path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: resolve => {
                require(['@/views/advanced-router/mutative-router.vue'], resolve);
            }
            },
            {
                path: 'argument-page',
                title: '带参页面',
                name: 'argument-page',
                icon: 'android-send',
                component: resolve => {
                    require(['@/views/advanced-router/argument-page.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/error-page',
        icon: 'android-sad',
        title: '错误页面',
        name: 'errorpage',
        component: Main,
        children: [
            {
                path: 'index', title: '错误页面', name: 'errorpage_index', component: resolve => {
                require(['@/views/error-page/error-page.vue'], resolve);
            }
            }
        ]
    },
    {
        path: '/databaseManagement',
        icon: 'gear-b',
        title: '数据库管理',
        name: 'databaseManagement',
        component: Main,
        children: [
            {
                path: 'index', title: '数据库管理', name: 'databaseManagement_index', component: resolve => {
                require(['@/views/databaseManagement/databaseManagement.vue'], resolve);
            }
            }
        ]
    }*/
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
