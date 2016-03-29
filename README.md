# FTChinese Next Project

## NPM install

Use taobao's npm mirror:
```
npm install --registry=https://registry.npm.taobao.org
```

## Machine Setup

### Install `homebrew`

Before testing this branch, make sure you have read and followed the steps as specified here: [Dev Guide](http://ft-interactive.github.io/setup/mac/).

Please install [Homebrew](http://brew.sh/) on Mac and change the owner of `usr/local` to youself. Mac OS does not provide this directory by default. It is you who created this directory and you, not the computer, must have full control over it.

```
sudo chown your-account-name:admin /usr/local
```

After installed `homebrew`, you should install whatever software with `brew install`. DO NOT install software using their official binary installer unless it is not included in brew repository. Check [Brawmeister](http://braumeister.org/) to see whether the software you need is available.

### Use `homebrew`
`brew update` to update `homebrew` itself.

`brew upgrade` to upgrade softwares installed by brew if there's a newer version.

`brew cleanup` to delete downloaded cache to the latest version.

### Install latest node.

If you have `homebrew` installed, run `brew install node`. Otherwise go to [Node.js](https://nodejs.org/en/) to download the binary installer. The latest version as of this writing is 5.9.1.

### Show path and hidden files in Finder

- Show path at the top of Finder:

```
sudo defaults write com.apple.finder _FXShowPosixPathInTitle -bool YES
```

- Show hidden files:

```
sudo defaults write com.apple.finder AppleShowAllFiles YES
```

### Show full path in terminal, git branches and commit status

- Install `git-aware`:

```
mkdir ~/.bash
cd ~/.bash
git clone git://github.com/jimeh/git-aware-prompt.git
```

- Copy the following to the `.bash_profile` file under you home directory:

```
export GITAWAREPROMPT=~/.bash/git-aware-prompt
source "${GITAWAREPROMPT}/main.sh"
export PS1="<\u@\h \w>\[$txtcyn\]\$git_branch\[$txtred\]\$git_dirty\[$txtrst\]\$ "
```

### Configure `tab` equal to 2 spaces in your text editor.

See [Node Style Guide](https://github.com/felixge/node-style-guide#2-spaces-for-indentation).

### Additional tools you might need to insall.

Some npm pakcages tries to install native node module and requries compiling of C++ code. NPM uses `node-gyp` for that. Install `node-gyp`:

```
npm install -g node-gyp
```

For `node-gyp` to run, you also need to install:

- Mac
 - Python v2.7.0 (OS X ships with it).
 - XCode and its `Command Line Tools`.

- Windows
 - Python v2.7.0. Make sure that you have a PYTHON environment variable, and it is set to `drive:\path\to\python.exe` not to a folder

 - Windows XP/Vista/7:
  - Microsoft Visual Studio C++ 2013 (Express version works well)
  - If the install fails, try uninstalling any C++ 2010 x64&x86 Redistributable that you have installed first
  - If you get errors that the 64-bit compilers are not installed you may also need the compiler update for the [Windows SDK 7.1](https://www.microsoft.com/en-us/download/details.aspx?id=4422).

 - Windows 7/8: Microsoft Visual Studio C++ 2013 for Windows Desktop (Express version works well)

 - Windows 10:
  - Install the latest version of npm
  - Install Python 2.7 from https://www.python.org/download/releases/2.7/ and make sure its on the System Path
  - Install Visual Studio Community 2015 Edition. (Custom Install, Select Visual C++ during the installation)
  - Set the environment variable GYP_MSVS_VERSION=2015
  - Run the command prompt as Administrator
  - $ npm install (--msvs_version=2015) <-- Shouldn't be needed if you have set GYP_MSVS_VERSION env
  - If the above steps have not worked or you are unsure please visit http://www.serverpals.com/blog/building-using-node-gyp-with-visual-studio-express-2015-on-windows-10-pro-x64 for a full walkthrough

 - All Windows Versions
  - For 64-bit builds of node and native modules you will also need the [Windows 7 64-bit SDK](https://www.microsoft.com/en-us/download/details.aspx?id=8279)
  - You may need to run one of the following commands if your build complains about WindowsSDKDir not being set, and you are sure you have already installed the SDK:

```
call "C:\Program Files\Microsoft SDKs\Windows\v7.1\bin\Setenv.cmd" /Release /x86
call "C:\Program Files\Microsoft SDKs\Windows\v7.1\bin\Setenv.cmd" /Release /x64
```

If you have multiple Python versions installed, you can identify which Python version node-gyp uses by setting the '--python' variable:

```
 node-gyp --python /path/to/python2.7
```

If node-gyp is called by way of npm and you have multiple versions of Python installed, then you can set npm's 'python' config key to the appropriate value:

```
npm config set python /path/to/executable/python2.7
```

## Install gulp 4.0

- Global gulp:
```
npm uninstall -g gulp // You may also need to go to the installation directory to delelte the gulp folder in case it fails to remove all files.
npm install -g "gulpjs/gulp-cli#4.0"
```
- Local gulp:
```
npm uninstall gulp --save-dev 
npm install "gulpjs/gulp#4.0" --save-dev
```

You can refer to this article: [Migrating to gulp 4 by example](https://blog.wearewizards.io/migrating-to-gulp-4-by-example).

Globally installed gulp 4.0 is compatible with locally installed gulp 3.

## How to require gulp plugins in gulpfile

We use `gulp-load-plugins` to load gulp plugins, which means you do not need to explicitly write `rename = require('gulp-rename)` in you gulp file. 

After you set `const $ = require('gulp-load-plugins')();`, which has already been included in the gulpfile, all modules under `node-modules` directory beginning with `gulp-` will be aumotmatically attached to the `$` object.

Say, you want to use `gulp-rename`, just write `$.rename()`. If you want to use `gulp-html-min`, write `$.htmlMin`, with hyphen replaced by `camelCase`.

## Require node modules in gulpfile.

1. Put all `require` statement at the beginning of the file.

2. Use `const` as much as possible to enforce stricter type check.

## Tasks

**NOTE**: If you do not want to install `gulp 4` globally on you machine, you can run the following commands with `npm run gulp task-name`. This will use the locally installed `gulp 4` in the terminal.

- `gulp mustach` Build static html file from mustache template `view/index.mustache`. The template's json data is under `model`.

- `gulp htmllint` Validate html markup.

- `gulp styles` Build css from scss with `node-sass`. `client/main.scss` should be the single entry point. All other scss files should be imported into this file.

- `gulp scripts` Build CommonJS style for frontend. `client/main.js` should be the single entry point. All other js files should be `require`d into this file. For js files not written in CommonJS way, simpy `require('./file-path')` without `var mymodule=` part.

- `gulp js` For production build only.

- `gulp lint` Lint js with `eslint`.

- `gulp serve` Run a server and watch file changes.

- `gulp clean` Delete `dist` and `.tmp` directries.

- `gulp html` `useref` build html, css and js into `dist` directory.

- `gulp requestdata` Get latest page from serve, remove `#roadblock`, `.header-container`, `.nav-place-holder`, `.footer-container` and `.app-download-container` element, and put it under `views/frontpage/` as `latest.mustache` for `views/index.mustache` to include. Run this task manually only when you want to update the body content.

- `gulp home` is the previous task rewritten.

- `gulp build` to build assets and copy into `dist`.

- `gulp datastamp` generates `timestamp.html` file.

- `gulp copy` copies files to server directory.

## JS utitlies

- An `ajax` module was included in `o-header` component. We migth split it into a separate component if necessary. This module exports an `ajax` object with `getData(url, callback)` attached to it. `post` method will be added later.

```
const ajax = require('./ajax');
ajax.getData(url, callback(responseText))
```
The `responseText` is parsed if server responded with proper headers, eg, `xml` or `json`. Otherwise it's plain text. You need to parse it yourself.

- A `util` module was provided in `client/js/util.js`. It is used to calculate the geometry of `window` and `HTMLElement`.

```
const util = require('./js/util');

const windowOffset = util.getPageOffset()
// => `windwoOffset.x` is how far the window has scrolled in x-axis. `windowOffset.y` is how far the window has scrolled in y-axis.

const elementOffset = util.getElementOffset(el);
// => `elementOffset.x` and `elementOffset.y` are the position of the top-left cornor of an element in the document's coordinates.

const elementSize = util.getElementSize(el);
// => `elementSize.width` and `elementSize.height` are the dimension of an element.
```
NOTE: `getElementSize()` returns **floating-point** number. If you need **integer** value (for example, ft's image service only accept integers), simply call `el.offsetWidth` and `el.offsetHeight`.

## Goals
### Design
Redesign the www.ftchinese.com for best content display on all devices. 

### Performance
Upgrade the performance of the web site, especially mission-critical pages, to the highest standard. 

### Efficiency
Streamline editorial workflow so that our editors can update content and page as fast as possible. All pages, not just home, should be managed in CMS without any tech knowledge. 

### Advertising
Embrace HTML 5 in our advertisements to delivery high-quality ad display and maximize ad performance. 

### Monetization
Kickstart our own growth and monetizing efforts, especially subscription business. 

## Milestones

| Date             | Event                                                    |
|------------------|----------------------------------------------------------|
| Dec 15, 2015     | Infractures and development environment (Done)           |
| Feb 01, 2016     | Story page complete (Working)                            |
| Mar 01, 2016     | Home page and stream pages complete (Working)            |
| Apr 15, 2016     | All pages and features on current site available on Next |
| **May 04, 2016** | **Launch**                                               |
| Jul 01, 2016     | Server-side converted to NodeJS                          |
| Sep 01, 2016     | MyFT                                                     |
| **Dec 01, 2016** | **Corporate subscription complete**                      |

## Roles

### Designers
* Visual Design: Layout, Color, Icon, Font, Styles, Components
* UI Design: Function, User Interaction, Login, Register, Comments, Sharing

### Developers
The development team will focus on achieving the highest possible performance, both on the front and back end. Special focus should be on two mission-critical pages: story and stream. Home page is a stream page. 

When we launch the Next FTC, our front end code will be a total revamp. The server side will continue to use PHP, mysql and smarty until we can have a London developer to help us convert to NodeJS. After converting to NodeJS, we'll be able to use server side code developed by the London team, which makes it possible for the FTChinese to launch new features in sync with London. 

#### PHP Developers
* API 
* Data
* Logic
* Security
* Performance

#### Frontend Developers
* HTML, CSS and JavaScipt
* Components

#### Java Developer
Focus on android app, database and video. 

### Network Engineers
* Set up and maintain server
* Development and Deploy environment
* Switch the site to Next on the launch day
* Monitor performance
* Testing
* Handle traffic and database related issues

## **Support**
The FTChinese current team will be able to launch the new Next site on its own, using existing technology. However, in order to upgrade beyond the launch, we need these developers from London to help us with the following tasks: 

* Switch to NodeJS on the server side, so that our site can support more active users per day, with the same resources. 
* Develop MyFT and Subscription. 
* Streamline our development tools and workflows. 
* Integrate with London's developement team, code base and APIs. 
* Train our developers. 

As the FT London will finish the Next FT in summer of 2016, their technology and experience will be suitable for the FTChinese when we upgrade our server side technology. Since we have very high standard both in terms of performance and code quality, outsourcing is not an option. 

## Cost
* New Servers: we will be needing 10 new servers for the new site, replacing our current servers. 
* Software License: we need to pay software license to tools that we'll using in the design and development of the Next FTC, including Github Private Account (Coordination), Sublime (Developer), Get Sentry (Bug Capturing), Testing Services, Schetch (Designer), Invision (Designer), etc...
* Bandwidth: we'll be needing 5M more bandwidth for the new site. 
* Developers: wages and accomodation for developers from FT London. 

## Performance
The home page, story page and channel page contributes more than 90% of the site traffic. These pages will be developed from scratch and their performance will be evaluated every week by the following list. Code should be reviewed at least every month. 

### Performance Checklist

* Get 100 points in Google's [Page Speed Insights](https://developers.google.com/speed/pagespeed/insights/). 
* Core experience, as defined in [General Best Practice](http://origami.ft.com/docs/developer-guide/general-best-practices/) is available in the first request, without any external CSS and JS. 
* First response is smaller than 14k after GZIP. 
* Use serviceworker, when supported, to cache assets and save time. 
* Don't load custom Chinese web font for web page. 
* Ad codes don't block critical content. 
* Load as less as possible CSS and images on mobile (especially data which are paid by traffic) by serving different mobile CSS and full CSS. 
* Use skeleton screens, placeholders, relative divs and Responsive Image Service to load images and avoid reflow. 
* Lazy-load images that are not in the first view. 
* Check if CSS and JS is loaded successfully and fall back when CDN fails. 
* Use Preconnect and Prefetch to speed up asset loading. 
    `<link href="http://static.ftchinese.com/" rel="preconnect" crossorigin>`
* Core static pages (home, story and channel) should render regardless of database condition. 

None of the big web sites that we know of (Google, Baidu, FT, Guardian, etc...) has been able to achieve item 3. It requires us to be very clear of the priority order of every element on the page. But with our server in HK and main audience in mainland China, making sure critical content are rendered even on very unreliable internet connection is worth the extra effort. 

### References
* [Origami Example](http://origami.ft.com/docs/developer-guide/using-modules/)
* [General Best Practice](http://origami.ft.com/docs/developer-guide/general-best-practices/)
* [Under Standing Critical CSS](http://www.smashingmagazine.com/2015/08/understanding-critical-css/)
* [CSS and Critical Path](https://speakerdeck.com/patrickhamann/css-and-the-critical-path)
* [Google Web Fundamentals](https://developers.google.com/web/fundamentals/)
* [Embracing the Network](https://speakerdeck.com/patrickhamann/embracing-the-network-smashing-conf)

## Projects
The projects are prioritized based on importance and dependency. 

### Infrastructure
Server-side set up of next.ftchinese.com, including database, API, cache, template engine(Smarty 3), etc... 

The next.ftchinese.com site will be the equivalent of next.ft.com, allowing stake holders to see what we have built any time. On the launch day of FTC Next, www.ftchinese.com and m.ftchinese.com will display the same thing as next.ftchinese.com. 

We should use Git for version control in NEXT. 

Our current cache system is problematic. Cache should be smart. When editors make a change, the change should be immediately on our site and app. When developers push a change on site, the change should also be immediately on. 

### CMS
Before June, we will focus on three most important upgrades with our CMS. 

#### Home Page
We need to change the way pages, especially home page, are created. The editors should not be burdened with design or layout. They just manage stories and lists. Programs do the rest. 

The list and story system should: 

1. Generate a API, which can be output into JSON, for developer to layout the pages. 
2. Be easy for editor to add, edit, and delete both lists and items (story, video, interactive features, text, url etc...) without any technical knowledge. 
3. Delegate control to the right person/team. For example, the marketing/event block should fall under their control, rather than bothering editorial team. 
4. Leave the robotic work to robots. 

#### Story Edit
Stories should be upgraded in several ways. First, it should have a way to link to the English version by Unique ID. The way we treat images in the story should be streamlined. For example, there should be no need to upload several sizes of the same images. And it should be easy to insert all kinds of inline media, including video, image, caption, aside box, quotes, social codes, subtitle etc...

#### Stream Pages
Channel, tag, marketing, events, special reports pages should all be generalized as Stream Page, meaning a page that mainly contains links to content. The stream page should be fully configurable in the CMS. For example, when we need to create a special report called "Lunch", the editors can just do it without any developers or designers. In fact, home page should be just a specific stream page. 

After June, we'll review our current CMS system as a whole and decide whether to replace it with a new one. 

### Story Page
Over 40% of our traffic comes from story page. So it's at least as important as the home page. When users share our content on mobile, they share story page. So it's important to design and develop both for mobile and PC. Since the page is mostly static content, we must make sure it loads instantly by strictly following our performance principles. Special attention should be paid when users open the story page in an app, rather than a browser. 

The core content of the story page includes story title, story body, page header, page navigation (without the part that displays only when hovered). Enhanced content includes ads, related content, hovered navigation, footer, inline media (picture, slide show, captions, quotes, recommendations, video, etc...), and sharing. The HTML file should render core content even if all other requests fail and be under 14k. 

It is possible to display landscape or portrait (for example, Lunch with the FT) main image for the story page. All devices should consider this possibility. 

The story page is mostly likely to be opened in an app's webview. So it's important to test how it renders in-app, for example, in WeChat.  

The story should also support these inline media types: 
* Photo Slides
* Images (it would be better to have the width and height data in the image; it should support captions)
* Promotion Box (Related Topics, Reports, Urls, Downloads, etc...)
* Videos
* Charts (either in SVG or JavaScript, but needs to be dynamic)
* Polling
* Quotes
* Social box (icons, links, QR codes, etc...)
* Seamless iFrames (interactive features, etc...)

For stories translated from FT.com, there's an API that provides: 
* FT.com unique ID. 
* Media sets including images, video and links. 
* Meta tags. 

### Stream Pages
Stream pages are pages that aggregate content. Home page is a stream page. The Stream Page Management feature should be developed just once and assigned to seperate teams for operation. 


#### Home Page
We need to design both the home page and the editorial tools for updating the home page. The home page should be designed to be responsive. Editors should be able to focus on the content itself, rather than tinkering with the layout and style. It should load instantly even on slow and unreliable internet connection. It also needs to deliver more ad inventories without being noisy and cluttered. 

It is important to seperate content with style. Content should be considered data, which comes in the form of an object (json or PHP array). Style is controled by front end templates. 

Requirements from Feng: Desktop and Mobile app should have different story lists on home page. 

Designer: focus on designing the fluid layout so that editors don't have to preview to be sure the page is good. 

Back end Developer: focus on the CMS interface where editor 1) management lists (blocks) by creating, moving and deleting; 2) management content items (stories, vidoes, interactives, photo slides and manually created items like image, links, etc...) in the page; 3) enable lists and content items to be easily dragged and dropped; 4) create and update the final data object (JSON and PHP Object). 

Front end Developer: Front end developer should not write any logic. He just focuses on performance, display and browser-side features. 

#### Channel
We need to design both the navigation content and the channel pages. Channel pages should have varying layout and content policy, which is configurable in CMS. 
1. Channel pages can be taken off from the navigation, but the url should still be valid with updated content, as search engines have stored these pages. 
2. Channel pages should continue to be paginated. 

#### Tag, Topic and Special Report
Tag and Special Report pages should be configurable in the CMS so that we can instantly create new pages to bring in traffic and revenue. 
1. All the pages should be managed in CMS. 
2. An email page can be created for every web page, using the same content data. 

#### Column
Although traffic to these pages are quite low, columnists are very important to our site. The invidual columnist page is already configurable in CMS. We need to come up with a better design and better features. For example, some columnists might want to maintain their own column pages by syncing their social networks. However, the collection of all columnists page needs a totally new design. 

#### Marketing
Pages that are controled by marketing team, including the FT Intelligence. We use a hack which combined PHP with Smarty to create so call "universal template". This should be upgraded to stream page. 

#### Events
The events site used a lot of "hacks" when built, under the assumption that this part of the site will not need to be upgraded. It has a seperate design and style sheets, which makes upgrading it more tedious. There are two options for the event site: migrate to Next Stream Page system or stay put. 

#### Information
Contacts, advertisements, and other links in the footer. The information in these pages usually don't change frequently. But it should be delegated to marketing team in the CMS system so that it can change any time. 

<div style="width:100%;height:90px;background-color:#92288f;text-align:center;line-height:90px;font-size:25px;color:white;">
	Reponsive Banner
</div>

### Advertising
#### Regular
Ad units should be simple and backward compatible. I suggest that we should have two types of basic ad units: MPU and Banner. Then clients can pay extra money for enhanced display, like full page and expandable. The advertisement should be responsive, adapting to any environment. In order to show the clients how HTML 5 works, we should use our own house ad to showcase what's possible. We will also implement stricter security requirements to advertisements. 

<div class="mpu" style="width:300px;height:250px;background-color:#cc0033;text-align:center;line-height:250px;font-size:32px;color:white;margin:5px 0 14px 14px;float:right;">
	MPU
</div>
1. If a user pays to disable ad, all ads should be hidden. So we need to come up with a way to switch off ads on all platforms. 
2. On the Dolphin system, if the client provide third party code, we need to control how and when to send third party impression track. And we'll monitor call back using GA, FA and our own trackign system. If we let client make the decision, the gap between Dolphin and client impression data will be huge. 
3. The Dolphin system makes no distinction between ad channel and ad position. This will spiral into an unmanageable mess in two years. We need to discuss this when we develop advertising for Next. 
4. In the new design, we should avoid expanding MPU into halfpage, as it might break the layout and lowers viewability. Instead, the reponsive banners can be expanded vertically if clients want to buy high-impact ads. 
5. All the ad positions should be delivered through friendly iframes or ajax. The "document.write" way should be avoided as it is blocking not only to content, but also other advertisement. In our current web site, if IBM loads its top banner ad assets in one minute, Accenture have to wait for one minute before its MPU unit is rendered. So making ads non-blocking is beneficial to both readers and advertisers. It is also easy to do creative advertisement such as expandable on friendly iframe. 


#### Sponsorship
For sponsored special reports, we should have a block on home page. The block should have title, ad unite banner, headline and lead. This way, we will have enough inventory for each campaign. 


### Partials
Partials are short snippets of HTML templates that are included in pages or other partials. They should all be placed in a new folder called partials. All the partials should switch from using models to APIs. 


### iOS and Android App
The iOS and Android app need to change into Next style, probably by removing the bottom bar and adding a fixed header bar. The home page layout will use data created in the upgraded CMS, rather than from the current API. Other than that, iOS and Android will be developed, upgraded and distributed seperately from the Next project. 

We will also enable iOS to receive both remote notification. Notification will be used along with customization, retention, awakening and segmentation. 

### APIs

### Analytics
1. Pages
2. Events
3. Custom Reports
4. Experiments (A/B Tests)

### Registration Page

### Video

### Interactive

### Search

### Photo Slides

### User Profile

### 404 Page
Use FT.com's new 404 page, which is both fun and useful. 

### User Comments
After discussing with Feng Wang, we decided that user comments should use Sina Weibo API rather than our own. This way we don't have to spend time censoring user comments and users can see their post immediately after submiting. 

### Job Site

### Find Password

### MyFT
The user should be able to follow topics, tags, authors, columns, etc... They are already able to save an article. We also need to have a feature of "articles that I read". Users should be able to receive notification for topics that they followed, both on their mobile phones and chrome. 

### Subscription
Allow users or organizations to pay for: 
1. Access premium content for a certain period. 
2. Access unlimited number of articles for a certain period. 
3. Unlock features. For example, a user can pay 100RMB to hide all ads for a month. 
4. Buy items. For example, a user can buy a special report and read on his phone and Kindle. 

## FAQ
### How important is it to keep the first request (the HTML file) under 14k? 
- It is to make sure the page renders as soon as the first request is back
- Core CSS and JS should be embeded to make this meaningful
- If the file is over 14k, consider seperate HTML into Critical and Enhanced
- Critical includes anything until the second content block (in our design)
- Enhanced includes content blocks under critical (usually the second screen)
- If we load enhanced content async, search engines won't grab these links. It would affect the weight of the links. 

### Why not use Markdown in the Next project? 
- Need to learn. No editor has heard of it. Editors hate learning new language. 
- May not do all the tricks needed (videos, slide shows, aside, quotes etc...). 
- Rely on third-party interpreter, which means less control from our own developers. 
- Our past stories are in HTML format. 
- Not really open standard like HTML. 
- Editors will rely on visual interface anyway. 

### What are new requirements for subscription business? 
- Accessibility: once users pay for a service, they become very picky in terms of service. For example, if an article is blocked by the government, we need to find a way to deliver it to the end user. 
- Customer Service: when there's a problem, users will need to get a solution immediately. Sometimes this means speaking to a person. 

### How should we manage our user comments? 
