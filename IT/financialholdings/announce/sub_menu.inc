<!-- ==================== l-side begin =================== -->
<div class="l-side">
  <aside class="m-aside m-aside-accordion is-disabled ng-aside-accordion" ng-class="{'is-selected' : Common.Aside.Selected}">
    <header class="m-aside-hd b-clearfix">
      <button class="ng-cloak ng-aside-select">
        {{ Common.Aside.Toggle.Text || '重要公告' }}
        <span class="m-icon-stack m-icon-toggle">
          <i class="m-icon m-icon-arrow-angle-down"></i>
          <i class="m-icon m-icon-arrow-angle-up"></i>
        </span>
      </button>
    </header>
    <main class="m-aside-bd">
      <ul id="aside-item" class="ng-aside-accordion-item">
        <li data-channel="announce">
          <h6>
            <a href="/financialholdings/announce/list.html" class="b-middle">
              <em>重要公告</em>
            </a>
          </h6>
        </li>
      </ul>
    </main>
  </aside>
</div>
<!-- ==================== l-side end =================== -->