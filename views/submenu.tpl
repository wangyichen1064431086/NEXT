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
                
                <li class="nav-item{if (isset($subNav.mobile))} mobile{/if}"{if (isset($subNav.selected))} aria-selected="{$subNav.selected}"{/if}{if (isset($subNav.popup))}  aria-popup="true"{/if}>
                  <a class="nav-link" href="{$subNav.url}">{$subNav.name}</a>

                  <ol class="nav-sub-items">

                  {if (isset($subNav.popup))}
                    {foreach $subNav.subSubNavs as $subSubNav}
                    <li><a href="{$subSubNav.url}">{$subSubNav.name}</a></li>
                    {/foreach}
                  {/if}

                  </ol>

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