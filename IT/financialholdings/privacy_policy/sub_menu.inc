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
				<li data-channel="privacy">
					<h6>
						<a href="/financialholdings/privacy_policy/privacy.html" class="b-middle">
							<em>隱私權聲明</em>
						</a>
					</h6>
				</li>
				<li data-channel="web_privacy">
					<h6>
						<a href="/financialholdings/privacy_policy/web_privacy.html" class="b-middle">
							<em>網站隱私權聲明</em>
						</a>
					</h6>
				</li>
			</ul>
		</main>
	</aside>
</div>
<!-- ==================== l-side end =================== -->