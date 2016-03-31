<header class="o-header" data-o-component="o-header">
  <div class="o-header__primary">
    <div class="o-header__container">

      <div class="o-header__top">

        <div class="o-header__edition" data-o-component="o-switch">
          <ul class="editions">
            {foreach $editions as $edition}
            <li><a href="{$edition.url}" class="edition-link">{$edition.name}</a>
            </li>
            {/foreach}
          </ul>
        </div>

        <div class="o-header__masthead">
          <a href="/" title="前往FT中文网首页">{include file="./logo-masthead.tpl"}<span>FT中文网</span>
          </a>
        </div> 

        <nav class="o-header__tools" role="navigation">
          <ul class="tools-items">
            {foreach $toolsItems as $item}
              <li class="tools-item">
                <a class="tools-link" href="{$item.url}">{$item.name}</a>
              </li>
            {/foreach}
          </ul>
        </nav>
      </div>{* o-header__top *}
    </div>{* o-header__container *}    
  </div>{* o-header__primary *}

  <div class="o-header__secondary">
    <div class="o-header__container">
      <div class="o-header__bottom">

        <form action="/search" id="search-form" class="o-header__search-form" role="search">
          <button class="search-button" tabindex="1"><span>搜索</span></button> 
          <input id="search-term" type="search" name="q" class="search-input" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="搜索FT中文网" />
        </form>

        <div class="o-header__masthead-mobile">
            <a href="/" title="前往FT中文网首页">{include file="./logo-masthead.tpl"}<span>FT中文网</span></a>
        </div>

        <nav class="o-header__nav-container" role="navigation">
          
          <button class="nav-toggle" data-o-header-togglable data-o-header-togglable-nav><span>Menu</span></button>

          <ol class="o-header__nav">

            <li class="nav-section mobile">
              <button class="nav-section-head mobile" data-o-header-selectable aria-selected="true">切换版本</button>
                                        
              <ol class="nav-items">
                {foreach $editions as $edition}
                <li class="nav-item">
                  <a class="nav-link" href="{$edition.url}">{$edition.name}</a>
                </li>
                {/foreach}
              </ol>
            </li>

            {foreach $navs as $nav}
            <li class="nav-section" aria-selected="{$nav.selected}" data-section="{$nav.channel}">

              <button class="nav-section-head mobile" data-o-header-selectable>{$nav.name}</button>

              <a class="nav-section-head desktop" href="{$nav.url}">{$nav.name}</a>

              <ol class="nav-items">
                {foreach $nav.subNavs as $subNav}
                <li class="nav-item{if (isset($subNav.mobile))} mobile{/if}"{if (isset($subNav.selected))} aria-selected="{$subNav.selected}"{/if}>
                  <a class="nav-link" href="{$subNav.url}">{$subNav.name}</a>
                </li>
                {/foreach}
              </ol>

            </li>
            {/foreach}

            {foreach $toolsItems as $item}
            <li class="nav-item mobile">
              <a class="nav-link" href="{$item.url}">{$item.name}</a>
            </li>
            {/foreach}
          </ol>
        </nav>

      </div>{* o-header__bottom *}
    </div><!-- o-header__container -->    
  </div>{* o-header-secondary *}

</header>