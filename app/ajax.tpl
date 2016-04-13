{ldelim}funcname{rdelim} is how functions look in Smarty!

<ol class="o-nav__level-1" id="ajax-nav">

  <li class="nav-section mobile">
    <button class="nav-section-head mobile" data-o-nav-selectable aria-selected="true">切换版本</button>
                              
    <ol class="nav-items">
      <li class="nav-item">
        <a class="nav-link" href="">繁体中文版</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="">英文版</a>
      </li>
    </ol>
  </li>

  <%foreach from=$datass1.odatalist item="level_1"%>
  <li class="nav-section"
  <%if $topnav==$level_1.code%>
  aria-selected="true"
  <%/if%>
  data-section="<%$level_1.code%>">

    <button class="nav-section-head mobile" data-o-nav-selectable><%$level_1.name%></button>

    <a class="nav-section-head desktop" href="<%$level_1.link%>"><%$level_1.name%></a>

    <ol class="nav-items level-2">

      <li class="nav-item mobile">
        <a class="nav-link" href="<%$level_1.link%>">
        <%if $level_1.code=='home'%>FT中文网首页
        <%else%>
        频道首页
        <%/if%></a>
      </li>

      <%foreach from=$level_1.children item="level_2"%>

      <li class="nav-item"
      <%if $subnav==$level_2.code%>
      aria-selected="true"
      <%/if%>
      <%if $level_2.haschildren%>
      aria-haspopup="true"
      <%/if%>
      data-channel="<%$level_2.code%>">
        <a class="nav-link" href="<%$level_2.link%>"><%$level_2.name %></a>
        
        <%if $level_2.haschildren%>
        <ol class="nav-sub-items level-3">
        
          <%foreach from=$level_2.children item="level_3"%>
          <li><a href="<%$level_3.link%>"><%$level_3.name%></a></li>
          <%/foreach%>

        </ol>
        <%/if%>

      </li>
      <%/foreach%>

    </ol>

  </li>
  <%/foreach%>

  <li class="nav-item mobile">
    <a class="nav-link" href="">myFT</a>
  </li>
  <li class="nav-item mobile">
    <a class="nav-link" href="">退出</a>
  </li>
  <li class="nav-item mobile">
    <a class="nav-link" href="">账户设置</a>
  </li>
</ol>