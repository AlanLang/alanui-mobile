const MENUS = [{
    name: 'Overview',
    icon: 'subject',
    path: '/components/overview',
},{
    name: 'Grid',
    text :'布局',
    icon: 'apps',
    path: '/components/grid',
    docs: '/docs/grid',
},{
    name: 'Paper',
    text :'阴影面板',
    icon: 'layers',
    path: '/components/paper',
    docs: '/docs/paper',
}, {
    name: 'Ripple',
    text :'水波纹',
    icon: 'star',
    path: '/components/ripple',
    docs: '/docs/ripple',
},{
    name: 'Icon',
    text:'图标',
    icon: 'subject',
    path: '/components/icon"',
    docs: '/docs/icon',
},{
    name: 'Button',
    text: '按钮',
    icon: 'mouse',
    path: '/components/button',
    docs: '/docs/button',
}, {
    name: 'FabButton',
    text: '固定按钮',
    icon: 'stop',
    path: '/components/fab',
    docs: '/docs/fab',
},{
    name: 'Alert',
    text: '警告提示',
    icon: 'call_to_action',
    path: '/components/alert',
    docs: '/docs/alert',
}, {
    name: 'ActionSheet',
    text: '动作面板',
    icon: 'call_to_action',
    path: '/components/actionSheet',
    docs: '/docs/actionSheet',
}, {
    name: 'Accordion',
    text: '折叠面板',
    icon: 'clear_all',
    path: '/components/accordion',
    docs: '/docs/accordion',
}, {
    name: 'Autocomplete',
    text: '自动完成',
    icon: 'power_input',
    path: '/components/autocomplete',
    docs: '/docs/autocomplete',
}, {
    name: 'Avatar',
    text: '头像',
    icon: 'account_circle',
    path: '/components/avatar',
    docs: '/docs/avatar',
}, {
    name: 'BackTop',
    text: '返回顶部',
    icon: 'vertical_align_top',
    path: '/components/backTop',
    docs: '/docs/backTop',
}, {
    name: 'Badge',
    text: '徽标数',
    icon: 'looks_one',
    path: '/components/badge',
    docs: '/docs/badge',
}, {
    name: 'Breadcrumb',
    text: '面包屑',
    icon: 'linear_scale',
    path: '/components/breadcrumb',
    docs: '/docs/breadcrumb',
}, {
    name: 'ButtonNavigation',
    text: '底部导航',
    icon: 'dns',
    path: '/components/buttonNavigation',
    docs: '/docs/buttonNavigation',
}, {
    name: 'Card',
    text: '卡片',
    icon: 'panorama_wide_angle',
    path: '/components/card',
    docs: '/docs/card',
}, {
    name: 'CellSwipe',
    text: '滑动列表',
    icon: 'panorama_wide_angle',
    path: '/components/cellSwipe',
    docs: '/docs/cellSwipe',
}, {
    name: 'Calendar',
    text: '日历选择',
    icon: 'date_range',
    path: '/components/calendar',
    docs: '/docs/calendar',
}, {
    name: 'Checkbox',
    text: '复选框',
    icon: 'check_box',
    path: '/components/checkbox',
    docs: '/docs/checkbox',
}, {
    name: 'Chip',
    text: '标签碎片',
    icon: 'power_input',
    path: '/components/chip',
    docs: '/docs/chip',
}, {
    name: 'DatetimePicker',
    text: '日期选择',
    icon: 'alarm',
    path: '/components/datetimePicker',
    docs: '/docs/datetimePicker',
}, {
    name: 'Dropdown',
    text: '下拉菜单',
    icon: 'alarm',
    path: '/components/dropdown',
    docs: '/docs/dropdown',
},{
    name: 'HighlightCode',
    text: '代码高亮',
    icon: 'inbox',
    path: '/components/highlightCode'
},{
    name: 'ImageView',
    text: '图片浏览器',
    icon: 'wallpaper',
    path: '/components/imageView',
    docs: '/docs/imageView',
}, {
    name: 'IndexList',
    text: '列表索引',
    icon: 'chrome_reader_mode',
    path: '/components/indexList',
    docs: '/docs/indexList',
}, {
    name: 'Indicator',
    text: '活动指示器',
    icon: 'rotate_left',
    path: '/components/indicator',
    docs: '/docs/indicator',
}, {
    name: 'InfiniteScroll',
    text: '无限滚动',
    icon: 'play_for_work',
    path: '/components/infiniteScroll',
    docs: '/docs/infiniteScroll',
}, {
    name: 'InputText',
    text: '输入框',
    icon: 'border_color',
    path: '/components/inputtext',
    docs: '/docs/inputtext',
}, {
    name: 'InputNumber',
    text: '数字输入框',
    icon: 'iso',
    path: '/components/inputNumber',
    docs: '/docs/inputNumber',
}, {
    name: 'KeyBoard',
    text: '密码键盘',
    icon: 'dialpad',
    path: '/components/keyboard',
    docs: '/docs/keyboard',
}, {
    name: 'Knob',
    text: '环形进度条',
    icon: 'data_usage',
    path: '/components/knob',
    docs: '/docs/knob',
}, {
    name: 'LazyLoad',
    text: '懒加载',
    icon: 'get_app',
    path: '/components/lazyload',
    docs: '/docs/lazyload',
}, {
    name: 'List',
    text: '列表',
    icon: 'list',
    path: '/components/list',
    docs: '/docs/list',
}, {
    name: 'Locker',
    text: '手势密码',
    icon: 'locker',
    path: '/components/locker',
    docs: '/docs/locker',
}, {
    name: 'MessageBox',
    text: '弹窗',
    icon: 'chat',
    path: '/components/messageBox',
    docs: '/docs/messageBox',
}, {
    name: 'Modal',
    text: '模态框',
    icon: 'flip_to_front',
    path: '/components/modal',
    docs: '/docs/modal',
}, {
    name: 'Notification',
    text: '消息提醒',
    icon: 'video_label',
    path: '/components/notification',
    docs: '/docs/notification',
}, {
    name: 'NavBar',
    text: '导航栏',
    icon: 'featured_play_list',
    path: '/components/navBar',
    docs: '/docs/navBar',
}, {
    name: 'Pagination',
    text: '分页',
    icon: 'hdr_strong',
    path: '/components/pagination',
    docs: '/docs/pagination',
}, {
    name: 'Picker',
    text: '选择器',
    icon: 'dns',
    path: '/components/picker',
    docs: '/docs/picker',
}, {
    name: 'Popover',
    text: '下拉选择',
    icon: 'picture_in_picture',
    path: '/components/popover',
    docs: '/docs/popover',
}, {
    name: 'Popup',
    text: '弹出选择',
    icon: 'filter_none',
    path: '/components/popup',
    docs: '/docs/popup',
}, {
    name: 'Progress',
    text: '进度条',
    icon: 'brightness_medium',
    path: '/components/progress',
    docs: '/docs/progress',
}, {
    name: 'PullToRefresh',
    text: '下拉刷新',
    icon: 'play_for_work',
    path: '/components/loadmore',
    docs: '/docs/loadmore',
}, {
    name: 'Radio',
    text: '单选框',
    icon: 'radio_button_checked',
    path: '/components/radio',
    docs: '/docs/radio',
}, {
    name: 'Rate',
    text: '评分',
    icon: 'star',
    path: '/components/rate',
    docs: '/docs/rate',
}, {
    name: 'SearchBar',
    text: '搜索栏',
    icon: 'search',
    path: '/components/searchBar',
    docs: '/docs/searchBar',
}, {
    name: 'Segment',
    text: '分段器',
    icon: 'view_column',
    path: '/components/segment',
    docs: '/docs/segment',
}, {
    name: 'Slider',
    text: '滑动输入条',
    icon: 'linear_scale',
    path: '/components/slider',
    docs: '/docs/slider',
}, {
    name: 'Spin',
    text: '加载中',
    icon: 'autorenew',
    path: '/components/spin',
    docs: '/docs/spin',
}, {
    name: 'Switch',
    text: '滑动开关',
    icon: 'do_not_disturb_on',
    path: '/components/switch',
    docs: '/docs/switch',
}, {
    name: 'Swiper',
    text: '轮播图',
    icon: 'view_carousel',
    path: '/components/swiper',
    docs: '/docs/swiper',
}, {
    name: 'Tabs',
    text: '标签页',
    icon: 'tab',
    path: '/components/tabs',
    docs: '/docs/tabs',
}, {
    name: 'Textarea',
    text: '多行输入',
    icon: 'border_color',
    path: '/components/textarea',
    docs: '/docs/textarea',
}, {
    name: 'Timeline',
    text: '时间线',
    icon: 'timer',
    path: '/components/timeline',
    docs: '/docs/timeline',
}, {
    name: 'Toast',
    text: '消息提示',
    icon: 'featured_play_list',
    path: '/components/toast',
    docs: '/docs/toast',
}, {
    name: 'Tooltip',
    text: '文字提示',
    icon: 'picture_in_picture_alt',
    path: '/components/tooltip',
    docs: '/docs/tooltip',
},
];

export {MENUS};
