'use strict';

window.routes = [
	{
		path: '/',
		componentUrl: './app/main/index.html',
		tabs: [
			{
				path: '/',
				id: 'tab-home',
				componentUrl: './app/main/homepage.html',
			},
			{
				path: '/tab-order/',
				id: 'tab-order',
				// Fill this tab content with Ajax request:
				componentUrl: './app/main/orders.html',
				// component: {
				// 	template: `

				// 	`,
				// 	style: `

				// 	`,

				// }
			},
			{
				path: '/tab-transaction/',
				id: 'tab-transaction',
				componentUrl: './app/main/transactions.html',
			},
			{
				path: '/tab-inbox/',
				id: 'tab-inbox',
				componentUrl: './app/main/inbox.html',
			},
			{
				path: '/tab-more/',
				id: 'tab-more',
				//componentUrl: './app/main/more.html',
				componentUrl: './app/main/more.html'				
			},
		]
	},
	{
		path: '/signin',
		componentUrl: './app/user/signin.html'
	},
	{
		path: '/signup',
		componentUrl: './app/user/signup.html',
		routes: [
			{
				path: '/otp',
				componentUrl: './app/user/signup-otp.html',
			},
			{
				path: '/password',
				componentUrl: './app/user/signup-password.html',
			}
		]
	},
	{
		path: '/forgot-password',
		componentUrl: './app/user/forgot-password.html',
		routes: [
			{
				path: '/new',
				componentUrl: './app/user/forgot-password-new.html',
			},
			{
				path: '/otp',
				componentUrl: './app/user/forgot-password-otp.html',
			}
		]
	},
	{
		path: '/orders-options',
		componentUrl: './app/main/orders-options.html'
	},
	{
		path: '/orders-finish',
		componentUrl: './app/main/orders-finish.html'
	},
	{
		path: '/orders-cart',
		componentUrl: './app/main/orders-cart.html'
	},
	{
		path: '/details-only',
		componentUrl: './app/main/details-only.html'
	},
	{
		path: '/inbox-detail',
		componentUrl: './app/main/inbox-detail.html',
	},
	{
		path: '/transactions-detail/:id',
		componentUrl: './app/main/transactions-detail.html',
	},
	{
		path: '/survey',
		componentUrl: './app/main/survey.html',
	},
	{
		path: '/blank',
		componentUrl: './app/main/blank-page.html',
	},
	{
		path: '/more',
		componentUrl: './app/main/tab-more.html',
		routes: [
			{
				path: '/loyalty',
				componentUrl: './app/main/loyalty.html'
			},
			{
				path: '/account',
				componentUrl: './app/main/account.html'
			},
			{
				path: '/user-profile',
				componentUrl: './app/main/user-profile.html'
			},
			{
				path: '/change-password',
				componentUrl: './app/main/change-password.html'
			},
			{
				path: '/payment-method',
				componentUrl: './app/main/payment-method.html'
			},
			{
				path: '/payment-method-view',
				componentUrl: './app/main/payment-method-view.html'
			},
			{
				path: '/payment-method-new',
				componentUrl: './app/main/payment-method-new.html'
			},
			{
				path: '/setting',
				componentUrl: './app/main/setting.html'
			},
			
		]
	},
	{
		path: '(.*)',
		componentUrl: './app/404.html'
	},
]
