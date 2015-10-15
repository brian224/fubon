<!-- ==================== l-side begin =================== -->
<div class="l-side">
	<aside class="m-aside m-aside-accordion ng-aside-accordion" ng-class="{'is-selected' : Common.Aside.Selected}">
		<header class="m-aside-hd b-clearfix">
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
				<li data-channel="positive">
					<h6>
						<a href="/financialholdings/story/positive.html" class="b-middle">
							<em>正向的力量</em>
						</a>
					</h6>
				</li>
				<li data-channel="future">
					<h6>
						<a href="/financialholdings/story/future.html" class="b-middle">
							<em>品牌願景與承諾</em>
						</a>
					</h6>
				</li>
				<li data-channel="identity">
					<h6>
						<a href="/financialholdings/story/identity.html" class="b-middle">
							<em>富邦品牌標誌</em>
						</a>
					</h6>
				</li>
			</ul>
		</main>
	</aside>
	<aside class="m-aside">
		<header class="m-aside-hd b-clearfix">
			<h5>影音專區</h5>
			<div class="m-aside-tools">
				<a href="https://www.youtube.com/channel/UCgMjSf4JsGOJ1jQpf8uWURQ" target="_blank">MORE</a>
			</div>
		</header>
		<main class="m-aside-bd">
			<div class="m-tab m-tab-slide">
				<div class="m-tab-hd">
					<ul class="m-ajax ng-youtube-ajax" data-url="//www.youtube.com/embed/" data-setting="?autoplay=0&autohide=1&controls=0&rel=0&fs=1&wmode=transparent&showinfo=0&modestbranding=1&iv_load_policy=1&start=0&theme=dark&color=red&playsinline=false&enablejsapi=1">
						<li>
							<em>WdhzVssc-MI</em>
							<p>正向的力量 讓世界持續美好</p>
						</li>
						<li>
							<em>UTDNB3cLc40</em>
							<p>2015正向的力量幕後花絮</p>
						</li>
						<li>
							<em>v8r5x5N2AOY</em>
							<p>台東樹屋</p>
						</li>
						<li>
							<em>1VGdGMmYkXU</em>
							<p>我的開心農場 一起去滾球</p>
						</li>
						<li>
							<em>q1EJn6v_NQ8</em>
							<p>盲棒挑戰世界盃</p>
						</li>
					</ul>
				</div>
				<div class="b-clearfix b-cloak owl-carousel" ng-class="{'b-cloak' : Common.Cloak}">
					<div class="ng-repeat-done ng-owl-carousel" ng-repeat="youtube in Story.Youtube.Data" ng-class="{'b-cloak' : $index !== 0}">
						<div class="m-video">
							<div class="m-video-bd">
								<figure class="m-video-figure ng-video-image">
									<img ng-src="http://img.youtube.com/vi/{{ youtube.ID }}/0.jpg" alt="{{ youtube.Name }}">
								</figure>
								<div class="m-video-frame ng-video-frame">
									<iframe width="100%" height="100%" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true" allowtransparency="true" ng-src="{{ Story.Youtube.GetYoutube(youtube.ID) }}" ng-if="Story.Youtube.Index === $index"></iframe>
								</div>
							</div>
							<div class="m-video-ft">{{ youtube.Name }}</div>
						</div>
					</div>
				</div>
				<div class="m-tab-ft" ng-class="{'b-cloak' : ! Common.Cloak}">
					<div class="b-loading is-relative">
						<span class="m-icon-stack">
							<i class="m-icon m-icon-fubon-blue is-absolute"></i>
							<i class="m-icon m-icon-fubon-green"></i>
						</span>
					</div>
				</div>
			</div>
		</main>
	</aside>
</div>
<!-- ==================== l-side end =================== -->