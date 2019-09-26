module.exports = {
	base: '/',
	title: 'Linux',
	description: '快应用UI组件库，简洁，易用，高效',
	head: [
		['link', { rel: 'icon', href: 'favicon.ico' }]
	],
	themeConfig: {
		displayAllHeaders: true,
		sidebarDepth: 0,
    nav: [
      { text: '首页', link: '/' },
      { text: 'GitHub', link: 'https://' },
		],
		sidebar: [
			{


        title: '介绍',
        collapsable: false,
			},
			{
				title: '基础',
        children: [
					'/guide/progress',
					'/guide/steps',
					'/guide/button',
					'/guide/checkbox',
					'/guide/radio',
					'/guide/switch',
					'/guide/input',
					'/guide/rate',
					'/guide/slider'
        ]
			},
			{
				title: '功能组件',
        children: [
					'/guide/counter',
					'/guide/loading',
					'/guide/swiper',
					'/guide/indexlist',
					'/guide/picker',
					'/guide/tabs'
        ]
			},
			{
				title: '提示反馈',
        children: [
					'/guide/drawer',
					'/guide/toast',
					'/guide/dialog'
        ]
			},
			{
				title: 'Changelog',
        children: [
					'/guide/CHANGELOG'
        ]
			}
    ]
  }
}
