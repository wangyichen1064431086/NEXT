<?php
require '../vendor/autoload.php';

$smarty = new Smarty;
$smarty->setCaching(Smarty::CACHING_OFF);
/*
$smarty->left_delimiter = "<%";
$smarty->right_delimiter = "%>";*/

$editions = array(
	array('url'=>'', 'name'=>'繁体版'),
	array('url'=>'', 'name'=>'英文版')
);

$smarty->assign('editions', $editions);

var_dump($editions);

$smarty->assign('toolsItems', array(
		array('url'=>'', 'name'=>'myFT'),
		array('url'=>'', 'name'=>'退出'),
		array('url'=>'', 'name'=>'账户设置')
	));

$smarty->assign('navs', array(
	array(
		'selected'=>false, 
		'channel'=>'home', 
		'name'=>'首页', 
		'url'=>'/',
		'subNavs' => array(
			array(
				'mobile'=>true,
				'url'=>'', 
				'name'=>'FT中文网首页'
				),
			array(
				'popup'=>true, 
				'url'=>'', 
				'name'=>'专题报道', 
				'subSubNavs' => array(
					array(
						'url'=>'',
						'name'=>'数据新闻'
						),
					array(
						'url'=>'',
						'name'=>'2015达沃斯'
						),
					array(
						'url'=>'',
						'name'=>'与FT共进午餐'
						)
					)
				),
			array(
				'popup'=>true, 
				'url'=>'', 
				'name'=>'热门文章',
				'subSubNavs' => array(
					array(
						'url'=>'',
						'name'=>'一周'
						),
					array(
						'url'=>'',
						'name'=>'一月'
						),
					array(
						'url'=>'',
						'name'=>'季度'
						),
					array(
						'url'=>'',
						'name'=>'一年'
						)
					)
				),
			array(
				'popup'=>true, 
				'url'=>'', 
				'name'=>'会议活动',
				'subSubNavs' => array(
					array(
						'url'=>'',
						'name'=>'近期活动'
						),
					array(
						'url'=>'',
						'name'=>'往期活动'
						),
					array(
						'url'=>'',
						'name'=>'赞助活动'
						),
					array(
						'url'=>'',
						'name'=>'关于我们'
						)
					)
				),
			array('url'=>'', 'name'=>'与FT共进午餐'),
			array('url'=>'', 'name'=>'FT研究院'),
			array('url'=>'', 'name'=>'FT商学院')
			)
		),
	array(
		'selected'=>'true', 
		'channel'=>'china', 
		'name'=>'中国', 
		'url'=>'',
		'subNavs' => array(
			array('mobile'=>true,'url'=>'', 'name'=>'频道首页'),
			array('url'=>'', 'name'=>'政经'),
			array('url'=>'', 'name'=>'商业', 'selected'=>'true'),
			array('url'=>'', 'name'=>'金融市场'),
			array('url'=>'', 'name'=>'股市'),
			array('url'=>'', 'name'=>'房地产'),
			array('url'=>'', 'name'=>'社会与文化'),
			array('url'=>'', 'name'=>'观点')
			)
		),
	array(
		'selected'=>false, 
		'channel'=>'global', 
		'name'=>'全球', 
		'url'=>'',
		'subNavs' => array(
			array('mobile'=>true,'url'=>'', 'name'=>'频道首页'),
			array('url'=>'', 'name'=>'全球经济'),
			array('url'=>'', 'name'=>'美国'),
			array('url'=>'', 'name'=>'亚太'),
			array('url'=>'', 'name'=>'欧洲'),
			array('url'=>'', 'name'=>'美洲'),
			array('url'=>'', 'name'=>'非洲'),
			array('url'=>'', 'name'=>'中东北非'),
			array('url'=>'', 'name'=>'新兴市场'),
			array('url'=>'', 'name'=>'科技和环境')
			)
		),
	array(
		'selected'=>false, 
		'channel'=>'economy', 
		'name'=>'经济', 
		'url'=>'',
		'subNavs' => array(
			array('mobile'=>true,'url'=>'', 'name'=>'频道首页'),
			array('url'=>'', 'name'=>'全球经济'),
			array('url'=>'', 'name'=>'中国经济'),
			array('url'=>'', 'name'=>'贸易'),
			array('url'=>'', 'name'=>'环境'),
			array('url'=>'', 'name'=>'经济评论')
			)
		),
	array(
		'selected'=>false, 
		'channel'=>'markets', 
		'name'=>'金融市场', 
		'url'=>'',
		'subNavs' => array(
			array('mobile'=>true,'url'=>'', 'name'=>'频道首页'),
			array('url'=>'', 'name'=>'股市'),
			array('url'=>'', 'name'=>'外汇'),
			array('url'=>'', 'name'=>'债市'),
			array('url'=>'', 'name'=>'大宗商品'),
			array('url'=>'', 'name'=>'金融市场')
			)
		),
	array(
		'selected'=>false, 
		'channel'=>'companies', 
		'name'=>'商业', 
		'url'=>'',
		'subNavs' => array(
			array('mobile'=>true,'url'=>'', 'name'=>'频道首页'),
			array('url'=>'', 'name'=>'金融'),
			array('url'=>'', 'name'=>'科技'),
			array('url'=>'', 'name'=>'汽车'),
			array('url'=>'', 'name'=>'房地产'),
			array('url'=>'', 'name'=>'农林'),
			array('url'=>'', 'name'=>'能源'),
			array('url'=>'', 'name'=>'工业和采矿'),
			array('url'=>'', 'name'=>'航空和运输'),
			array('url'=>'', 'name'=>'医药'),
			array('url'=>'', 'name'=>'娱乐'),
			array('url'=>'', 'name'=>'零售和消费品'),
			array('url'=>'', 'name'=>'传媒和文化')
			)
		),
	array(
		'selected'=>false, 
		'channel'=>'opinion', 
		'name'=>'观点', 
		'url'=>'',
		'subNavs' => array(
			array('mobile'=>true,'url'=>'', 'name'=>'频道首页'),
			array('url'=>'', 'name'=>'Lex专栏'),
			array('url'=>'', 'name'=>'A-list'),
			array('url'=>'', 'name'=>'专栏'),
			array('url'=>'', 'name'=>'分析'),
			array('url'=>'', 'name'=>'评论'),
			array('url'=>'', 'name'=>'社评'),
			array('url'=>'', 'name'=>'书评'),
			array('url'=>'', 'name'=>'读者有话说')
			)
		),
	array(
		'selected'=>false, 
		'channel'=>'management', 
		'name'=>'管理', 
		'url'=>'',
		'subNavs' => array(
			array('mobile'=>true,'url'=>'', 'name'=>'频道首页'),
			array('url'=>'', 'name'=>'FT商学院'),
			array('url'=>'', 'name'=>'职场'),
			array('url'=>'', 'name'=>'领导力'),
			array('url'=>'', 'name'=>'财富管理'),
			array('url'=>'', 'name'=>'商务互联'),
			array('url'=>'', 'name'=>'人物')
			)
		),
	array(
		'selected'=>false, 
		'channel'=>'lifestyle', 
		'name'=>'生活时尚', 
		'url'=>'',
		'subNavs' => array(
			array('mobile'=>true,'url'=>'', 'name'=>'频道首页'),
			array('url'=>'', 'name'=>'乐尚街'),
			array('url'=>'', 'name'=>'品味'),
			array('url'=>'', 'name'=>'旅行'),
			array('url'=>'', 'name'=>'生活话题'),
			array('url'=>'', 'name'=>'艺术与娱乐'),
			array('url'=>'', 'name'=>'消费经'),
			array('url'=>'', 'name'=>'理财')
			)
		),
	array(
		'selected'=>false, 
		'channel'=>'stream', 
		'name'=>'视频', 
		'url'=>'',
		'subNavs' => array(
			array('mobile'=>true,'url'=>'', 'name'=>'频道首页'),
			array('url'=>'', 'name'=>'政经'),
			array('url'=>'', 'name'=>'产经'),
			array('url'=>'', 'name'=>'金融'),
			array('url'=>'', 'name'=>'文化'),
			array('url'=>'', 'name'=>'有色眼镜'),
			array('url'=>'', 'name'=>'秒懂'),
			array('url'=>'', 'name'=>'高端视点')
			)
		)
	));

$smarty->display('../views/home.tpl');