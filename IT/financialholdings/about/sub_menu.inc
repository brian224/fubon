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
        <li data-channel="info">
          <h6>
            <a href="/financialholdings/about/info.html" class="b-middle">
              <em>富邦金控簡介</em>
            </a>
          </h6>
        </li>
        <li data-channel="business_philosophy">
          <h6>
            <a href="/financialholdings/about/business_philosophy.html" class="b-middle">
              <em>核心價值</em>
            </a>
          </h6>
        </li>
        <li data-channel="team">
          <h6>
            <a href="/financialholdings/about/team.html" class="b-middle">
              <em>經營團隊</em>
            </a>
          </h6>
        </li>
        <li data-channel="sub">
          <h6>
            <a href="/financialholdings/about/sub.html" class="b-middle">
              <em>金控子公司成員</em>
            </a>
          </h6>
        </li>
        <li data-channel="honor">
          <h6>
            <a href="/financialholdings/about/honor.html" class="b-middle">
              <em>專業殊榮</em>
            </a>
          </h6>
        </li>
        <li data-channel="milestone">
          <h6>
            <a href="/financialholdings/about/milestone.html" class="b-middle">
              <em>大事紀</em>
            </a>
          </h6>
        </li>
      </ul>
    </main>
  </aside>
  <aside class="m-aside">
    <header class="m-aside-hd b-clearfix">
      <h5>相關連結</h5>
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
              <em>oU3Vm1LkiHk</em>
              <p>富邦金控簡介</p>
            </li>
          </ul>
        </div>
        <div class="b-clearfix b-cloak owl-carousel" ng-class="{'b-cloak' : Common.Cloak}">
          <div class="ng-repeat-done ng-owl-carousel" ng-repeat="youtube in About.Youtube.Data" ng-class="{'b-cloak' : $index !== 0}">
            <div class="m-video">
              <div class="m-video-bd">
                <figure class="m-video-figure ng-video-image">
                  <img ng-src="http://img.youtube.com/vi/{{ youtube.ID }}/0.jpg" alt="{{ youtube.Name }}">
                </figure>
                <div class="m-video-frame ng-video-frame">
                  <iframe width="100%" height="100%" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true" allowtransparency="true" ng-src="{{ About.Youtube.GetYoutube(youtube.ID) }}" ng-if="About.Youtube.Index === $index"></iframe>
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