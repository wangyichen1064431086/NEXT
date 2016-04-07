<link rel="stylesheet" type="text/css" href="styles/o-header.css">
<header class="o-header" data-o-component="o-header">
  <div class="o-header__primary">
    <div class="o-header__container">

      <div class="o-header__top">

        <div class="o-header__edition">
          <button class="switch-button">中国版</button>
          <ul class="editions">
            <li><a href="" class="edition-link">繁体版</a>
            </li>
            <li><a href="" class="edition-link">英文版</a>
            </li>
          </ul>
        </div>

        <div class="o-header__masthead">
          <a href="/" title="前往FT中文网首页"><%include file="./frontpage/logo-masthead.tpl"%><span>FT中文网</span>
          </a>
        </div> 

        <nav class="o-header__tools" role="navigation">
          <ul class="tools-items">
              <li class="tools-item">
                <a class="tools-link" href="">myFT</a>
              </li>
              <li class="tools-item">
                <a class="tools-link" href="">退出</a>
              </li>
              <li class="tools-item">
                <a class="tools-link" href="">账户设置</a>
              </li>
          </ul>
        </nav>
      </div><!--  o-header__top --> 
    </div><!--  o-header__container -->     
  </div><!--  o-header__primary  -->

  <div class="o-header__secondary">
    <div class="o-header__container">
      <div class="o-header__bottom">

        <form action="/search" id="search-form" class="o-header__search-form" role="search">
          <button class="search-button" tabindex="1"><span>搜索</span></button> 
          <input id="search-term" type="search" name="q" class="search-input" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="搜索FT中文网" />
        </form>

        <div class="o-header__masthead-mobile">
            <a href="/" title="前往FT中文网首页"><%include file="./frontpage/logo-masthead.tpl"%><span>FT中文网</span></a>
        </div>

        <nav class="o-header__nav-container" role="navigation">
          
          <button class="nav-toggle" data-o-header-togglable data-o-header-togglable-nav><span>Menu</span></button>

          <ol class="o-header__nav">

            <li class="nav-section mobile">
              <button class="nav-section-head mobile" data-o-header-selectable aria-selected="true">切换版本</button>
                                        
              <ol class="nav-items">
                <li class="nav-item">
                  <a class="nav-link" href="">繁体版</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="">英文版</a>
                </li>
              </ol>
            </li>

            <%foreach $datass1 as $nav%>
            <li class="nav-section" aria-selected="" data-section="<%$nav.code%>">

              <button class="nav-section-head mobile" data-o-header-selectable><%$nav.name%></button>

              <a class="nav-section-head desktop" href="<%$nav.link%>"><%$nav.name%></a>

              <ol class="nav-items">

                <li class="nav-item mobile">
                  <a class="nav-link" href="<%$nav.link%>"><%if $nav.link == '/'%>FT中文网首页<%else%>频道首页<%/if%></a>
                </li>

                <%foreach $nav.children as $children%>
                
                <li class="nav-item" aria-selected=""<%if ($children.haschildren)%> aria-popup="true"<%/if%>>
                  <a class="nav-link" href="<%$children.link%>"><%$children.name%></a>

                  <ol class="nav-sub-items">

                  <%if ($children.haschildren)%>
                    <%foreach $children.children as $grandchildren%>
                    <li><a href="<%$grandchildren.link%>"><%$grandchildren.name%></a></li>
                    <%/foreach%>
                  <%/if%>

                  </ol>

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
        </nav>

        <ul class="o-header__extra-tools nav-items">
          <li class="nav-item" aria-popup="true">
            
            <a class="nav-link" href="http://www.ftchinese.com/m/corp/follow.html">关注我们</a>

            <ol class="nav-sub-items follow-us">
              <li><a href="" class="follow-sina-weibo">新浪微博</a></li>
              <li><a href="" class="follow-tencent-weibo">腾讯微博</a></li>
              <li><a href="" class="follow-netease-weibo">网易微博</a></li>
              <li><a href="" class="follow-sohu-weibo">搜狐微博</a></li>
              <li><a href="" class="follow-qzone">QQ空间</a></li>
              <li><a href="" class="follow-sina-blog">新浪博客</a></li>
              <li><a href="" class="follow-sohu-blog">搜狐博客</a></li>
              <li><a href="" class="follow-netease-lofter">网易博客</a></li>
              <li><a href="" class="follow-renren">人人网</a></li>
              <li><a href="" class="follow-facebook">FaceBook</a></li>
              <li><a href="" class="follow-twitter">Twitter</a></li>
              <li><a href="" class="follow-google-plus">Google+</a></li>
            </ol>
          </li>
          <li class="nav-item" aria-popup="true">
            <span class="nav-link">工具</span>
            <ol class="nav-sub-items">
              <li><a href="">移动应用大全</a></li>
              <li><a href="">基本设置</a></li>
              <li><a href="">修改头像</a></li>
              <li><a href="">邮件订阅</a></li>
              <li><a href="">同步微博</a></li>
              <li><a href="">我的评论</a></li>
              <li><a href="">管理收藏</a></li>
            </ol>
          </li>
          <li class="nav-item">
            <a class="nav-link follow__rss" href="http://www.ftchinese.com/channel/rss.html"><span>RSS</span></a>
          </li>
        </ul>
      </div><!-- * o-header__bottom -->
    </div><!-- o-header__container -->    
  </div><!-- o-header-secondary -->

</header>

<script src="scripts/dom-delegate.js"></script>
<script src="scripts/o-header.js"></script>