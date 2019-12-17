'use strict';

window.routes = [
	{
		path: '/',
		componentUrl: './app/main/index.html',
		tabs: [
			{
				path: '/',
				id: 'tab-home',
				component: {
					template: `
					<div class="page no-swipeback">
					<div class="navbar">
					<div class="navbar-inner">
						<img class="theme-light-only" src="assets/custom/img/konbini-logo.svg" height="24" alt="" />
					</div>
				</div>	
					<div class="page-content" style="padding-top: 44px;">

			<div class="slider-hero">
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<div class="imgBtn">
								<img src="./assets/custom/food/f1.jpg">
							</div>
							<div class="details">
								<h3>Product Name</h3>
								<span>$15.00</span>
							</div>
						</div>
						<div class="swiper-slide">
							<div class="imgBtn">
								<img src="./assets/custom/food/f2.jpg">
							</div>
							<div class="details">
								<h3>Product Name</h3>
								<span>$15.00</span>
							</div>
						</div>
						<div class="swiper-slide">
							<div class="imgBtn">
								<img src="./assets/custom/food/f3.jpg">
							</div>
							<div class="details">
								<h3>Product Name</h3>
								<span>$15.00</span>
							</div>
						</div>
						<div class="swiper-slide">
							<div class="imgBtn">
								<img src="./assets/custom/food/f4.jpg">
							</div>
							<div class="details">
								<h3>Product Name</h3>
								<span>$15.00</span>
							</div>
						</div>
						<div class="swiper-slide">
							<div class="imgBtn">
								<img src="./assets/custom/food/f5.jpg">
							</div>
							<div class="details">
								<h3>Product Name</h3>
								<span>$15.00</span>
							</div>
						</div>
					</div>
					<!-- Add Pagination -->
					<div class="swiper-pagination"></div>
				</div>
			</div>

			{{#if business}}
			<div class="card">
				<div class="card-header justify-content-space-between">
					<span>Promotions</span>
					<a href="#">View All</a>
				</div>
				<div class="card-content card-content-padding">
					<div class="photo-gallery">
						<div class="swiper-container">
							<div class="swiper-wrapper">
								{{#each business.photos}}
								<div class="swiper-slide">
									<div class="slide-media">
										<img class="img-responsive" src="{{this.url}}" alt="" />
									</div>
								</div>
								{{/each}}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="card-header justify-content-space-between">
					<span>Popular Products</span>
					<a href="#">View All</a>
				</div>
				<div class="card-content card-content-padding">
					<div class="photo-gallery">
						<div class="swiper-container">
							<div class="swiper-wrapper">
								{{#each business.photos}}
								<div class="swiper-slide">
									<div class="slide-media">
										<img class="img-responsive" src="{{this.url}}" alt="" />
									</div>
								</div>
								{{/each}}
							</div>
						</div>
					</div>
				</div>
			</div>

			{{/if}}

		</div>
			
				</div>
					`,
					style: `
					body {
						color: #000;
					}
				
					.slider-hero .swiper-container {
						/* height: 352px;
						height: 50vh; */
						width: 100%;
						padding-top: 20px;
						padding-bottom: 30px;
					}
				
					.slider-hero .swiper-slide {
						/* box-sizing: border-box;
						padding: 16px; */
						background-position: center;
						background-size: cover;
						width: 250px;
						height: 250px;
					}
				
					.swiper-slide .imgBtn {
						width: 100%;
						height: 200;
						overflow: hidden;
					}
				
					.swiper-slide .imgBtn img {
						width: 100%;
					}
				
					.swiper-slide .details {
						box-sizing: border-box;
						padding: 10px;
						margin-top: 0px;
					}
				
					.swiper-slide .details h3 {
						margin: 0;
						padding: 0;
						font-size: 20px;
						line-height: 20px;
					}
				
					.swiper-slide .details span {
						color: red;
					}
					`,
					data: function () {
						return {
							sliderHero: null,
							business: null,
						}
					},
					methods: {
						loadData: function () {
							var self = this;
							app.request.setup({
								headers: {
									'Authorization': 'bearer ' + localStorage.getItem('WOKPPL_accessToken'),
									'Content-Type': 'application/json'
								}
							});
							app.request.json(
								'assets/custom/dataset/business.json',
								function (data) {
									if (data) {
										self.$setState({
											business: data
										});
										self.initializePhotos();
									}
								}
							);
						},
						initializePhotos: function () {
							var self = this;
							app.swiper.create('.photo-gallery .swiper-container', {
								centeredSlides: true,
								grabCursor: true,
								initialSlide: 3,
								loop: true,
								slidesPerView: 2,
								spaceBetween: 16
							});
							self.$('.photo-gallery .slide-media img').on('click', function () {
								var currentSlide = self.$('.photo-gallery .slide-media img').parent().parent('.swiper-slide-active').data('swiper-slide-index');
								var photoBrowser = app.photoBrowser.create({
									photos: self.business.photos,
									swiper: {
										initialSlide: currentSlide
									},
									theme: app.utils.theme.getLayout()
								});
								photoBrowser.open();
							});
						},
						initializeSliderHero: function () {
							var self = this;
							self.sliderHero = app.swiper.create('.slider-hero .swiper-container', {
								autoplay: {
									delay: 3000,
									disableOnInteraction: false
								},
								centeredSlides: true,
								effect: 'coverflow',
								coverflowEffect: {
									rotate: 50,
									stretch: 0,
									depth: 100,
									modifier: 1,
									slideShadows: true
								},
								pagination: {
									el: '.swiper-container .swiper-pagination',
									type: 'bullets',
									clickable: true
								},
								grabCursor: true,
								loop: true,
								slidesPerView: 'auto'
							});
						},
						loadSession: function () {
							var self = this;

							app.request.get(window.config.url + 'api/services/app/Preorder/GetSessions',
								function (suc) {
									let response = JSON.parse(suc)
									console.log('get session success', response)
									// self.$setState({
									// 	session: response.result.items
									// })
									localStorage.setItem('sessions', JSON.stringify(response.result.items))
								},
								function (err) {
									console.log('get session error', err)
								})
						},
						loadCategory: function () {
							var self = this;
							app.request.get(window.config.url + 'api/services/app/Preorder/GetCategories',
								function (suc) {
									let response = JSON.parse(suc)
									console.log('get category success', response)
									// self.$setState({
									// 	categories: response.result.items
									// })
									localStorage.setItem('categories', JSON.stringify(response.result.items))
								},
								function (err) {
									console.log('get category error', err)
								})
						},
					},
					mounted() {
						var self = this;
						self.loadData();
						self.initializeSliderHero();
						self.loadSession();
						self.loadCategory();
					}
				},
				// componentUrl: './app/main/home.html',
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
				component: {
					template: `
					<div class="page">
					<div class="navbar">
			<div class="navbar-inner">
				<img class="theme-light-only" src="assets/custom/img/konbini-logo.svg" height="24" alt="" />
			</div>
		</div>
					<div class="page-content" style="padding-top: 44px;">
					<div class="block">
						<div class="row">
							<div class="col-25">
								<div class="item-inner">
									<div class="item-title item-label">From Date</div>
									<div class="item-input-wrap">
										<input type="date" name="fromDate" value="{{startDate}}" />
									</div>
								</div>
							</div>
							<div class="col-25">
								<div class="item-inner">
									<div class="item-title item-label">To Date</div>
									<div class="item-input-wrap">
										<input type="date" name="toDate" value="{{endDate}}" />
									</div>
								</div>
							</div>
							<div class="col-25">
								<div class="item-inner">
									<button type="button" @click=search()
										class="button button-small button-round button-fill">Search</button>
								</div>
							</div>
						</div>
					</div>
					<div class="list">
						<div class="list-group">
							<ul>
								<li class="list-group-title">11-2019</li>
								<li>
									<a href="/transactions-detail" @click="getId(1)" class="item-link">
										<div class="item-content">
											<div class="item-media">
												<i class="fa-stack">
													<span class="fas fa-circle fa-stack-2x text-color-red"></span>
													<span class="fas fa-shopping-cart fa-stack-1x fa-inverse"></span>
												</i>
											</div>
											<div class="item-inner">
												<div class="item-title">
													<span>Order Id</span>
													<div class="item-header">
														13/11/2019 09:21
													</div>
												</div>
												<div class="item-title">
													<div class="item-header text-color-red">
														SGD -1.00
													</div>
													<span class="badge color-green">Success</span>
												</div>
											</div>
										</div>
									</a>
								</li>
								<li>
									<a href="/transactions-detail" @click="getId(1)" class="item-link">
										<div class="item-content">
											<div class="item-media">
												<i class="fa-stack">
													<span class="fas fa-circle fa-stack-2x text-color-red"></span>
													<span class="fas fa-shopping-cart fa-stack-1x fa-inverse"></span>
												</i>
											</div>
											<div class="item-inner">
												<div class="item-title">
													<span>Order Id</span>
													<div class="item-header">
														13/11/2019 09:21
													</div>
												</div>
												<div class="item-title">
													<div class="item-header text-color-green">
														SGD +1.00
													</div>
													<span class="badge color-green">Success</span>
												</div>
											</div>
										</div>
									</a>
								</li>
								<li>
									<a href="/transactions-detail" @click="getId(1)" class="item-link">
										<div class="item-content">
											<div class="item-media">
												<i class="fa-stack">
													<span class="fas fa-circle fa-stack-2x text-color-red"></span>
													<span class="fas fa-shopping-cart fa-stack-1x fa-inverse"></span>
												</i>
											</div>
											<div class="item-inner">
												<div class="item-title">
													<span>Order Id</span>
													<div class="item-header">
														13/11/2019 09:21
													</div>
												</div>
												<div class="item-title">
													<div class="item-header text-color-red">
														SGD -1.00
													</div>
													<span class="badge color-green">Success</span>
												</div>
											</div>
										</div>
									</a>
								</li>
								<li class="list-group-title">10-2019</li>
								<li>
									<a href="/transactions-detail" @click="getId(1)" class="item-link">
										<div class="item-content">
											<div class="item-media">
												<i class="fa-stack">
													<span class="fas fa-circle fa-stack-2x text-color-red"></span>
													<span class="fas fa-shopping-cart fa-stack-1x fa-inverse"></span>
												</i>
											</div>
											<div class="item-inner">
												<div class="item-title">
													<span>Order Id</span>
													<div class="item-header">
														13/11/2019 09:21
													</div>
												</div>
												<div class="item-title">
													<div class="item-header text-color-red">
														SGD -1.00
													</div>
													<span class="badge color-green">Success</span>
												</div>
											</div>
										</div>
									</a>
								</li>
								<li>
									<a href="/transactions-detail" @click="getId(1)" class="item-link">
										<div class="item-content">
											<div class="item-media">
												<i class="fa-stack">
													<span class="fas fa-circle fa-stack-2x text-color-red"></span>
													<span class="fas fa-shopping-cart fa-stack-1x fa-inverse"></span>
												</i>
											</div>
											<div class="item-inner">
												<div class="item-title">
													<span>Order Id</span>
													<div class="item-header">
														13/11/2019 09:21
													</div>
												</div>
												<div class="item-title">
													<div class="item-header text-color-green">
														SGD +1.00
													</div>
													<span class="badge color-green">Success</span>
												</div>
											</div>
										</div>
									</a>
								</li>
								<li>
									<a href="/transactions-detail" @click="getId(1)" class="item-link">
										<div class="item-content">
											<div class="item-media">
												<i class="fa-stack">
													<span class="fas fa-circle fa-stack-2x text-color-red"></span>
													<span class="fas fa-shopping-cart fa-stack-1x fa-inverse"></span>
												</i>
											</div>
											<div class="item-inner">
												<div class="item-title">
													<span>Order Id</span>
													<div class="item-header">
														13/11/2019 09:21
													</div>
												</div>
												<div class="item-title">
													<div class="item-header text-color-red">
														SGD -1.00
													</div>
													<span class="badge color-green">Success</span>
												</div>
											</div>
										</div>
									</a>
								</li>
								<li>
									<a href="/transactions-detail" @click="getId(1)" class="item-link">
										<div class="item-content">
											<div class="item-media">
												<i class="fa-stack">
													<span class="fas fa-circle fa-stack-2x text-color-red"></span>
													<span class="fas fa-shopping-cart fa-stack-1x fa-inverse"></span>
												</i>
											</div>
											<div class="item-inner">
												<div class="item-title">
													<span>Order Id</span>
													<div class="item-header">
														13/11/2019 09:21
													</div>
												</div>
												<div class="item-title">
													<div class="item-header text-color-red">
														SGD -1.00
													</div>
													<span class="badge color-green">Success</span>
												</div>
											</div>
										</div>
									</a>
								</li>
								<li>
									<a href="/transactions-detail" @click="getId(1)" class="item-link">
										<div class="item-content">
											<div class="item-media">
												<i class="fa-stack">
													<span class="fas fa-circle fa-stack-2x text-color-red"></span>
													<span class="fas fa-shopping-cart fa-stack-1x fa-inverse"></span>
												</i>
											</div>
											<div class="item-inner">
												<div class="item-title">
													<span>Order Id</span>
													<div class="item-header">
														13/11/2019 09:21
													</div>
												</div>
												<div class="item-title">
													<div class="item-header text-color-green">
														SGD +1.00
													</div>
													<span class="badge color-green">Success</span>
												</div>
											</div>
										</div>
									</a>
								</li>
								<li>
									<a href="/transactions-detail" @click="getId(1)" class="item-link">
										<div class="item-content">
											<div class="item-media">
												<i class="fa-stack">
													<span class="fas fa-circle fa-stack-2x text-color-red"></span>
													<span class="fas fa-shopping-cart fa-stack-1x fa-inverse"></span>
												</i>
											</div>
											<div class="item-inner">
												<div class="item-title">
													<span>Order Id</span>
													<div class="item-header">
														13/11/2019 09:21
													</div>
												</div>
												<div class="item-title">
													<div class="item-header text-color-red">
														SGD -1.00
													</div>
													<span class="badge color-green">Success</span>
												</div>
											</div>
										</div>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
					</div>
					`,
					style: `
					.fa-stack {
						width: 2em;
					}
					`,
					data: function () {
						return {
							transactions: null,
							items: null,
							totalCount: 0,
							startDate: '2000-01-01',
							endDate: '2099-12-31',
						}
					},
					methods: {
						loadData: function (startDate, endDate) {
							var self = this;
							app.request.getJSON(window.config.url + 'api/services/app/Transaction/GetAllTransactions?StartDate=' + startDate + '&&EndDate=' + endDate,
								function (suc) {
									self.$setState({
										transactions: suc.result.items,
										totalCount: suc.result.totalCount,
										items: self.groupItems(suc.result.items)
									});
									console.log(self.items)
								},
								function (err) {
									console.log(err)
								})
						},
						groupItems: function (list) {
							list.forEach(element => {
								// get time offset from browser
								var currentDate = new Date();
								var offset = -(currentDate.getTimezoneOffset() / 60);
								// get provided date
								let givenDate = new Date(element.creationTime);
								// apply offset
								var hours = givenDate.getHours();
								hours += offset;
								givenDate.setHours(hours);
								// format the date
								element.creationTime = ("0" + givenDate.getDate()).slice(-2) + '/' + ("0" + (givenDate.getMonth() + 1)).slice(-2) + '/' + givenDate.getFullYear() + ' ' + ("0" + givenDate.getHours()).slice(-2) + ':' + ("0" + givenDate.getMinutes()).slice(-2);
								//convert amount: cent>>dollar
								element.amount = element.amount / 100;
							});

							result = list.reduce(function (r, a) {
								r[a.creationTime.substr(3, 7)] = r[a.creationTime.substr(3, 7)] || [];
								r[a.creationTime.substr(3, 7)].push(a);
								return r;
							}, Object.create(null));

							return result;
						},
						search: function () {
							var self = this;
							self.loadData(self.startDate, self.endDate)
						},
						getId: function (id) {
							var self = this;
							console.log(id)
						}
					},
					mounted() {
						var self = this;
						let dt = new Date();
						self.endDate = dt.toISOString().substr(0, 10);
						let dat = new Date();
						dat.setDate(1);
						self.startDate = dat.toISOString().substr(0, 10);
						// self.loadData(self.startDate, self.endDate);

						// self.$('input[name=fromDate]').change(function () {
						//     self.startDate = $(this).val()
						//     console.log($(this).val())
						// });
						// self.$('input[name=toDate]').change(function () {
						//     self.endDate = $(this).val()
						//     console.log($(this).val())
						// });
					}
				}
			},
			{
				path: '/tab-inbox/',
				id: 'tab-inbox',
				component: {
					template: `
					<div class="page">
		<div class="navbar">
			<div class="navbar-inner">
				<img class="theme-light-only" src="assets/custom/img/konbini-logo.svg" height="24" alt="" />
				<div class="right">
					<a href="#" class="link icon-only" title="Read All">
						<i class="fas fa-check-double"></i>
					</a>
				</div>
			</div>
		</div>

		<div class="page-content" style="padding-top: 44px;">
			<div class="block-title text-color-black">Inbox</div>
			<div class="list">
				<ul>
					<li class="swipeout" style="background: #9e9e9e40;">
						<a href="/inbox-detail" @click="getId(1)" class="item-link item-content swipeout-content">
							<div class="item-content">
								<div class="item-media text-color-red">
									<i class="fa-stack">
										<span class="far fa-bell fa-stack-1x"></span>
									</i>
								</div>
								<div class="item-inner">
									<div class="item-text text-color-black" style="-webkit-line-clamp: 1;">Transaction
										Id 100101:
										Description Description Description Description </div>
									<div class="item-after">13/11</div>
								</div>
							</div>
						</a>
						<div class="swipeout-actions swipeout-actions-left">
							<a href="#" @click="deleteNoti(1)"
								class="swipeout-action swipeout-close swipeout-delete color-red">
								<div class="swipeout-action-icon">
									<i class="icon far fa-trash-alt"></i>
								</div>
								<div class="swipeout-action-label">Delete</div>
							</a>
						</div>
					</li>
					<li class="swipeout">
						<a href="/inbox-detail" @click="getId(1)" class="item-link item-content swipeout-content">
							<div class="item-content">
								<div class="item-media text-color-red">
									<i class="fa-stack">
										<span class="fas fa-bell fa-stack-1x"></span>
									</i>
								</div>
								<div class="item-inner">
									<div class="item-text text-color-black" style="-webkit-line-clamp: 1;">Transaction
										Id 100101:
										Description Description Description Description </div>
									<div class="item-after">12/11</div>
								</div>
							</div>
						</a>
						<div class="swipeout-actions swipeout-actions-left">
							<a href="#" @click="deleteNoti(1)"
								class="swipeout-action swipeout-close swipeout-delete color-red">
								<div class="swipeout-action-icon">
									<i class="icon far fa-trash-alt"></i>
								</div>
								<div class="swipeout-action-label">Delete</div>
							</a>
						</div>
					</li>
					<li class="swipeout">
						<a href="/inbox-detail" @click="getId(1)" class="item-link item-content swipeout-content">
							<div class="item-content">
								<div class="item-media text-color-red">
									<i class="fa-stack">
										<span class="fas fa-envelope-open fa-stack-1x"></span>
									</i>
								</div>
								<div class="item-inner">
									<div class="item-text text-color-black" style="-webkit-line-clamp: 1;">Promotion
										notification:
										Description Description Description Description </div>
									<div class="item-after">11/11</div>
								</div>
							</div>
						</a>
						<div class="swipeout-actions swipeout-actions-left">
							<a href="#" @click="deleteNoti(1)"
								class="swipeout-action swipeout-close swipeout-delete color-red">
								<div class="swipeout-action-icon">
									<i class="icon far fa-trash-alt"></i>
								</div>
								<div class="swipeout-action-label">Delete</div>
							</a>
						</div>
					</li>
					<li class="swipeout">
						<a href="/inbox-detail" @click="getId(1)" class="item-link item-content swipeout-content">
							<div class="item-content">
								<div class="item-media text-color-red">
									<i class="fa-stack">
										<span class="fas fa-envelope-open fa-stack-1x"></span>
									</i>
								</div>
								<div class="item-inner">
									<div class="item-text text-color-black" style="-webkit-line-clamp: 1;">Promotion
										notification:
										Description Description Description Description</div>
									<div class="item-after">11/11</div>
								</div>
							</div>
						</a>
						<div class="swipeout-actions swipeout-actions-left">
							<a href="#" @click="deleteNoti(1)"
								class="swipeout-action swipeout-close swipeout-delete color-red">
								<div class="swipeout-action-icon">
									<i class="icon far fa-trash-alt"></i>
								</div>
								<div class="swipeout-action-label">Delete</div>
							</a>
						</div>
					</li>
					<li class="swipeout" style="background: #9e9e9e40;">
						<a href="/inbox-detail" @click="getId(1)" class="item-link item-content swipeout-content">
							<div class="item-content">
								<div class="item-media text-color-red">
									<i class="fa-stack">
										<span class="far fa-envelope fa-stack-1x"></span>
									</i>
								</div>
								<div class="item-inner">
									<div class="item-text text-color-black" style="-webkit-line-clamp: 1;">Promotion
										notification:
										Description Description Description Description</div>
									<div class="item-after">10/11</div>
								</div>
							</div>
						</a>
						<div class="swipeout-actions swipeout-actions-left">
							<a href="#" @click="deleteNoti(1)"
								class="swipeout-action swipeout-close swipeout-delete color-red">
								<div class="swipeout-action-icon">
									<i class="icon far fa-trash-alt"></i>
								</div>
								<div class="swipeout-action-label">Delete</div>
							</a>
						</div>
					</li>
					<li class="swipeout" class="read">
						<a href="/inbox-detail" @click="getId(1)" class="item-link item-content swipeout-content">
							<div class="item-content">
								<div class="item-media text-color-red">
									<i class="fa-stack">
										<span class="fas fa-bell fa-stack-1x"></span>
									</i>
								</div>
								<div class="item-inner">
									<div class="item-text text-color-black" style="-webkit-line-clamp: 1;">Transaction
										Id 100101:
										Description Description Description Description </div>
									<div class="item-after">09/11</div>
								</div>
							</div>
						</a>
						<div class="swipeout-actions swipeout-actions-left">
							<a href="#" @click="deleteNoti(1)"
								class="swipeout-action swipeout-close swipeout-delete color-red">
								<div class="swipeout-action-icon">
									<i class="icon far fa-trash-alt"></i>
								</div>
								<div class="swipeout-action-label">Delete</div>
							</a>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
					`,
					style: `
					.fa-stack {
						width: 2em;
					}
					`,
					data: function () {
						return {

						}
					},
					methods: {
						getId: function (id) {
							var self = this;
						},
						deleteNoti: function (id) {
							var self = this;
						}
					},

					mounted() {
						var self = this;
					}
				}
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
				<img class="theme-light-only" src="assets/custom/img/konbini-logo.svg" height="24" alt="" />
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
						<a href="/more/feedback" class="item-link">
							<div class="item-content">
								<div class="item-media">
									<i class="fa-stack">
										<span class="fas fa-circle fa-stack-2x color-violet-5"></span>
										<span class="fas fa-comment fa-stack-1x fa-inverse"></span>
									</i>
								</div>
								<div class="item-inner">
									<div class="item-title">Feedback</div>
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
							self.removeCookie();
							app.views.current.router.navigate('/signin');
						},
						exitApp: function () {
							navigator.app.exitApp();
						},
						removeCookie: function () {
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
						}
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
		path: '/inbox-detail',
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
			{
				path: '/feedback',
				componentUrl: './app/main/feedback.html'
			}
		]
	},
	{
		path: '(.*)',
		componentUrl: './app/404.html'
	}
]
