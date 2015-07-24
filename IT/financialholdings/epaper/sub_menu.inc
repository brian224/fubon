<!-- ==================== l-side begin =================== -->
<div class="l-side">
	<aside class="m-aside m-aside-accordion is-disabled ng-aside-accordion" ng-class="{'is-selected' : Common.Aside.Selected}">
		<header class="m-aside-hd">
			<button class="ng-cloak ng-aside-select">
				{{ Common.Aside.Toggle.Text || '富邦理財電子報' }}
				<span class="m-icon-stack m-icon-toggle">
					<i class="m-icon m-icon-arrow-angle-down"></i>
					<i class="m-icon m-icon-arrow-angle-up"></i>
				</span>
			</button>
		</header>
		<main class="m-aside-bd">
			<ul id="aside-item" class="ng-aside-accordion-item">
				<li data-channel="epaper">
					<h6>
						<a href="/financialholdings/epaper/List.html" class="b-middle">
							<em>各期文章總覽</em>
						</a>
					</h6>
				</li>
			</ul>
		</main>
	</aside>
</div>
<!-- ==================== l-side end =================== -->