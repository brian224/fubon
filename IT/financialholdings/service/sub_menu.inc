<!-- ==================== l-side begin =================== -->
<div class="l-side">
	<aside class="m-aside m-aside-accordion ng-aside-accordion" ng-class="{'is-selected' : Common.Aside.Selected}">
		<header class="m-aside-hd">
			<button class="ng-cloak ng-aside-select">
				{{ Common.Aside.Toggle.Text }}
				<span class="m-icon-stack m-icon-toggle">
					<i class="m-icon m-icon-arrow-angle-down"></i>
					<i class="m-icon m-icon-arrow-angle-up"></i>
				</span>
			</button>
		</header>
		<main class="m-aside-bd">
			<ul id="aside-item" class="ng-aside-accordion-item">
				<li data-channel="contact">
					<h6>
						<a href="/financialholdings/service/contact.html" class="b-middle">
							<em>聯絡富邦金控</em>
						</a>
					</h6>
				</li>
				<li data-channel="sub_contact">
					<h6>
						<a href="/financialholdings/service/sub_contact.html" class="b-middle">
							<em>子公司地址與電話</em>
						</a>
					</h6>
				</li>
				<li data-channel="investors">
					<h6>
						<a href="/financialholdings/service/investors.html" class="b-middle">
							<em>投資人與媒體服務</em>
						</a>
					</h6>
				</li>
				<li data-channel="agency">
					<h6>
						<a href="/financialholdings/service/agency.html" class="b-middle">
							<em>股務代理</em>
						</a>
					</h6>
				</li>
				<li data-channel="service">
					<h6>
						<a href="javascript:;" class="b-middle">
							<em>會員專區</em>
							<span class="m-icon-stack m-icon-toggle">
								<i class="m-icon m-icon-plus"></i>
								<i class="m-icon m-icon-minus"></i>
							</span>
						</a>
					</h6>
					<div>
						<ul>
							<li>
								<a href="/financialholdings/home/login.html" class="ng-member">
									<i class="m-icon m-icon-arrow-angle-right"></i>
									<em>會員登入</em>
								</a>
							</li>
							<li>
								<a href="/financialholdings/home/password.html" class="ng-member">
									<i class="m-icon m-icon-arrow-angle-right"></i>
									<em>修改密碼</em>
								</a>
							</li>
							<li>
								<a href="/financialholdings/home/edit_profile.html" class="ng-member">
									<i class="m-icon m-icon-arrow-angle-right"></i>
									<em>修改個人資料</em>
								</a>
							</li>
							<li>
								<a href="javascript:;">
									<i class="m-icon m-icon-arrow-angle-right"></i>
									<em>會員登出</em>
								</a>
							</li>
							<li data-channel="faq">
								<a href="/financialholdings/service/faq.html">
									<i class="m-icon m-icon-arrow-angle-right"></i>
									<em>會員常見問題</em>
								</a>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</main>
	</aside>
</div>
<!-- ==================== l-side end =================== -->