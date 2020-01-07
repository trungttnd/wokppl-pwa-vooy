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
				component: {
					template: `
					<div class="page">

		<div class="navbar">
			<div class="navbar-inner">
				<img class="theme-light-only" src="assets/custom/img/wokppllogo.png" height="36" alt="" />
				<div class="right">
                    
                </div>
			</div>
		</div>

		<div class="page-content" style="padding-top: 44px;">
			<div class="list">
				<ul>
					<li>
						<a href="/more/loyalty" class="item-link">
							<div class="item-content">
								<div class="item-media">
									<i class="fa-stack">
										<span class="fas fa-circle fa-stack-2x color-pink-5"></span>
										<span class="fas fa-gem fa-stack-1x fa-inverse"></span>
									</i>
								</div>
								<div class="item-inner">
									<div class="item-title">Loyalty Points</div>
								</div>
							</div>
						</a>
					</li>
					
					<li>
						<a href="/more/account" class="item-link">
							<div class="item-content">
								<div class="item-media">
									<i class="fa-stack">
										<span class="fas fa-circle fa-stack-2x color-green-5"></span>
										<span class="fas fa-user fa-stack-1x fa-inverse"></span>
									</i>
								</div>
								<div class="item-inner">
									<div class="item-title">Account Info</div>
								</div>
							</div>
						</a>
					</li>
					<li>
							<a href="/more/setting" class="item-link">
								<div class="item-content">
									<div class="item-media">
										<i class="fa-stack">
											<span class="fas fa-circle fa-stack-2x color-orange-5"></span>
											<span class="fas fa-cog fa-stack-1x fa-inverse"></span>
										</i>
									</div>
									<div class="item-inner">
										<div class="item-title">Setting</div>
									</div>
								</div>
							</a>
						</li>
					<li>
						<a @click="logout" class="item-link">
							<div class="item-content">
								<div class="item-media">
									<i class="fa-stack">
										<span class="fas fa-circle fa-stack-2x color-red-5"></span>
										<span class="fas fa-sign-out-alt fa-stack-1x fa-inverse"></span>
									</i>
								</div>
								<div class="item-inner">
									<div class="item-title">Logout</div>
								</div>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
					`,
					style: `
					`,
					data: function () {
						return {
							formValidator: null,
							_username: '',
							_name: '',
							_email: ''
						}
					},
					methods: {
						loadData: function () {
							var self = this;

							self.$setState({
								_username: localStorage.getItem('WOKPPL_username'),
								_name: localStorage.getItem('WOKPPL_name'),
								_email: localStorage.getItem('WOKPPL_email')
							});

						},

						refreshSearchbar: function () {
							var self = this;
							app.searchbar.clear('.searchbar');
						},
						removeCookie: function () {
							var self = this;
							localStorage.removeItem('WOKPPL_OldUser');
							localStorage.removeItem('WOKPPL_accessToken');
							localStorage.removeItem('WOKPPL_expireInSeconds');
							localStorage.removeItem('WOKPPL_expired');
							localStorage.removeItem('WOKPPL_refreshToken');
							localStorage.removeItem('WOKPPL_mobile');
							localStorage.removeItem('WOKPPL_name');
							localStorage.removeItem('WOKPPL_email');
							localStorage.removeItem('WOKPPL_username');
							localStorage.removeItem('WOKPPL_userId');
							localStorage.removeItem('WOKPPL_passcode');
							localStorage.removeItem('addProduct');
							localStorage.removeItem('cartItems');
							localStorage.removeItem('listOrderSession');
							localStorage.removeItem('listOrderDate');
							localStorage.removeItem('categories');
							localStorage.removeItem('editProduct');
							localStorage.removeItem('sessions');
							localStorage.removeItem('detTransactions');
							localStorage.removeItem('cartAvailable');
						  },
						logout: function () {
							var self = this;

							// app.request.get(window.config.url + 'api/TokenAuth/LogOut',
							// 	function (suc) {
							// 		console.log('Logout success')
							// 		console.log(suc);
							// 	},
							// 	function (err) {
							// 		console.log('Logout error')
							// 		console.log(err);
							// 	});
							//self.removeCookie();
							self.removeCookie();
							app.views.current.router.navigate('/signin');
						},
						exitApp: function () {
							navigator.app.exitApp();
						},

					},
					mounted() {
						var self = this;
						self.loadData();
					}
				}
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
		path: '/orders-checkout',
		componentUrl: './app/main/orders-checkout.html'
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
		path: '/inbox-detail/:id',
		componentUrl: './app/main/inbox-detail.html',
	},
	{
		path: '/transactions-detail',
		componentUrl: './app/main/transactions-detail.html',
	},
	{
		path: '/survey',
		componentUrl: './app/main/survey.html',
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
