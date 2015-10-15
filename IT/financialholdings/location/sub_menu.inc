<!-- ==================== l-side begin =================== -->
<div class="l-side">
	<aside class="m-aside m-aside-accordion ng-aside-accordion" ng-class="{'is-selected' : Common.Aside.Selected}">
		<header class="m-aside-hd">
			<button class="ng-cloak ng-aside-select">
				{{ Common.Aside.Toggle.Text || '台灣地區服務據點' }}
				<span class="m-icon-stack m-icon-toggle">
					<i class="m-icon m-icon-arrow-angle-down"></i>
					<i class="m-icon m-icon-arrow-angle-up"></i>
				</span>
			</button>
		</header>
		<main class="m-aside-bd">
			<ul id="aside-item" class="ng-aside-accordion-item">
				<li data-channel="location_tw">
					<h6>
						<a href="/financialholdings/location/location_tw.html" class="b-middle">
							<em>台灣地區服務據點</em>
						</a>
					</h6>
				</li>
				<li data-channel="location_oversea">
					<h6>
						<a href="/financialholdings/location/location_oversea.html" class="b-middle">
							<em>海外地區服務據點</em>
						</a>
					</h6>
				</li>
			</ul>
		</main>
	</aside>
</div>
<!-- ==================== l-side end =================== -->