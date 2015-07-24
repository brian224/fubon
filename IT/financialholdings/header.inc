<!-- ==================== l-header begin =================== -->
<div class="l-header">
	<header class="m-header b-clearfix">
		<div class="m-header-logo b-clearfix b-middle">
			<button class="m-button m-button-navicon ng-navicon"><i class="m-icon m-icon-navicon"></i></button>
			<a href="/financialholdings/home/index.html" class="m-icon-stack m-icon-fubon-group">
				<i class="m-icon m-icon-fubon-blue is-absolute"></i>
				<i class="m-icon m-icon-fubon-green"></i>
				<i class="m-icon m-icon-fubon-text"></i>
			</a>
			<div class="m-header-company">
				<h1>富邦金控</h1>
			</div>
		</div>
		<ul class="m-header-tools">
			<li class="b-middle"><a href="/financialholdings/eng/">EN</a></li>
			<li class="m-header-search b-middle" ng-class="{'is-open' : Common.Search.Click}">
				<a href="/financialholdings/home/search.html?k={{ Common.Search.Value }}" class="m-button m-button-search ng-search"><i class="m-icon m-icon-search"></i></a>
				<div class="m-form-group m-form-search">
					<input type="search" class="m-form m-form-control" ng-model="Common.Search.Value" />
				</div>
			</li>
		</ul>
	</header>
</div>
<!-- ==================== l-header end =================== -->