/* jshint devel:true */
(function(){
	'use strict';
	//var actionType = 'create';
	var actionType = 'edit';
	var domId = 'content-left-inner';
	var dataRules = {
		'lists': 'array',
		'items': 'item',
		'type': 'readonly',
		'theme': ['default', 'luxury'],
		//'type': ['block', 'banner', 'header', 'footer'],
		'side': ['none', 'marketsdata', 'videos']
	};
	var toolkits = {
		'section': {
			'block': ['title', 'name', 'side'],
			'header': [],
			'banner': ['position'],
			'footer': []
		},
		'list': ['name', 'title', 'style']
	};
	var devices = [
		{'name': 'PC or Mac', 'width': '', 'height': ''},
		{'name': 'iPhone 5', 'width': 320, 'height': 580},
		{'name': 'iPhone 6', 'width': 375, 'height': 627},
		{'name': 'iPhone 6 Plus', 'width': 414, 'height': 736},
		{'name': 'iPad LandScape', 'width': 1024, 'height': 748},
		{'name': 'iPad Portrait', 'width': 768, 'height': 1024},
		{'name': 'Huawei Mate 8', 'width': 540, 'height': 960},
		{'name': 'Google Nexus 7', 'width': 600, 'height': 960}
	];
	var thisday = new Date();
	var thenow = thisday.getHours() * 10000 + thisday.getMinutes() * 100 + thisday.getSeconds();
	var todaydate = thisday.getFullYear() + '-' + (thisday.getMonth() + 1) + '-' + thisday.getDate();
	var gApiUrls = {
		'home': 'api/page/home.json',
		'blank': 'api/page/blank.json',
		'stories': '/falcon.php/homepage/getstoryapi/' + todaydate + '?' + thenow
	};
	var gApiUrlsLocal = {
		'home': 'api/page/home.json',
		'blank': 'api/page/blank.json',
		'stories': 'api/page/stories.json'
	};
	if (window.location.hostname === 'localhost' || window.location.hostname.indexOf('192.168') === 0 || window.location.hostname.indexOf('10.113') === 0 || window.location.hostname.indexOf('127.0') === 0) {
		gApiUrls = gApiUrlsLocal;
	}
	//drag and drop
	var dragSrcEl = null;
	var dragIndex;
	var dragOverIndex;

	//将Unix时间戳转换为中文日期和星期
	function unixtochinese(thetime,datetype) {
	    var todaystamp,dayArray,dayChar,thehour,theminute,ampm, currentDate, currentDateStamp, itemDateStamp;
	    if (thetime === 'hide') {
	    	return '';
	    }
	    currentDate = new Date();
	    currentDateStamp = currentDate.getFullYear()*10000 + (currentDate.getMonth() + 1)*100 + currentDate.getDate();
	    thisday = new Date(thetime * 1000);
	    itemDateStamp = thisday.getFullYear()*10000 + (thisday.getMonth() + 1)*100 + thisday.getDate();
	    todaystamp = thisday.getFullYear() + '年' + (thisday.getMonth() + 1) + '月' + thisday.getDate() + '日 星期';
	    dayArray = '日一二三四五六';
	    dayChar = dayArray[thisday.getDay()];
	    todaystamp += dayChar;
    	thehour = thisday.getHours();
        thehour = ('0' + thehour).slice(-2);      
        theminute = thisday.getMinutes();
        theminute = ('0' + theminute).slice(-2);
        ampm = (thehour < 12) ? 'AM' : 'PM';
	    if (datetype === 1) {
	        todaystamp = ' ' + thehour + ':' + theminute + ' ' + ampm;
	    } else if (datetype === 2) {
	    	//console.log (currentDateStamp);
	    	//console.log (todaystamp);
	    	if (currentDateStamp === itemDateStamp) {
	    		todaystamp = thehour + ':' + theminute;
		    } else {
		    	todaystamp = (thisday.getMonth() + 1) + '/' + thisday.getDate() + ' ' + thehour + ':' + theminute;
		    }
	    } else if (datetype === 3) {
	    	if (/^[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}$/gi.test(thetime)) {
	    		//console.log (thetime);
	    		todaystamp = thetime.replace(/^[0-9]{4}\-([0-9]{1,2}\-[0-9]{1,2})$/g,'$1');
	    		todaystamp = todaystamp.replace(/^0/g, '').replace(/\-0/g, '/').replace('-', '/');
	    	} else {
	    		todaystamp = (thisday.getMonth() + 1) + '/' + thisday.getDate();
	    	}
	    }
	    return todaystamp;
	}

	function renderItem(data) {
		var id = data.id;
		var headline = data.headline;
		var longlead = data.longlead || '';
		var shortlead = data.shortlead || '';
		var image = data.image || '';
		var type = data.type || '';
		var timeStamp = data.timeStamp || '';
		var timeStampType = 2;
		if (type !== 'story') {
			timeStampType = 3; 
		}
		return renderAPI(id, headline, timeStamp, timeStampType, longlead, shortlead, image, type);
	}

	function renderAPI(id, headline, timeStamp, timeStampType, longlead, shortlead, image, type) {
		var editLink = '';
		var previewLink = '';
		var dataHTML = '';
		var oTimeStamp = timeStamp;
		if (type === 'story') {
			editLink = 'https://backyard.ftchinese.com/falcon.php/story/edit/' + id;
			previewLink = 'http://www7.ftchinese.com/story/' + id;
		} else if (type === 'interactive') {
			editLink = 'https://backyard.ftchinese.com/falcon.php/ia/edit/' + id;
			previewLink = 'http://www7.ftchinese.com/interactive/' + id;
		} else if (type === 'photo') {
			editLink = 'https://backyard.ftchinese.com/falcon.php/pics/edit_photonews/' + id;
			previewLink = 'http://www7.ftchinese.com/photonews/' + id;
		} else if (type === 'video') {
			editLink = 'https://backyard.ftchinese.com/create_videostory.php?id=' + id;
			previewLink = 'http://www7.ftchinese.com/video/' + id;
		}
		if (timeStamp !== '') {
			timeStamp = unixtochinese(timeStamp, timeStampType);
		} else {
			timeStamp = '<div class="new-item"></div>';
		}
		dataHTML = '<div draggable=true data-type="' + type + '" class="item ' + type + '" data-id="' + id + '"><div class="remove-item"></div><div class="timestamp">' + timeStamp + '</div><div class="item-title">' + headline + '</div><div class="item-info"><div class="item-links"><a href="http://www7.ftchinese.com/' + type + '/' + id + '" target=_blank>Preview</a><a href="' + editLink + '" target=_blank>Edit</a></div><div class="item-info-item"><input title="headline" name="headline" class="o-input-text" value="' + headline + '"></div><div class="item-info-item"><input title="image" name="image" class="o-input-text" value="' + image + '"></div><div class="item-info-item"><div class="item-info-title">longlead</div><textarea title="image" name="longlead" class="o-input-text">' + longlead + '</textarea></div><div class="item-info-item"><div class="item-info-title">shortlead</div><textarea title="image" name="shortlead" class="o-input-text">' + shortlead + '</textarea></div><div class="item-info-item"><input title="image" name="timeStamp" class="o-input-text" value="' + oTimeStamp + '" readonly><input title="image" name="type" class="o-input-text" value="' + type + '" readonly></div></div></div>';
		return dataHTML;
	}

	function renderMeta(data) {
		var metaHTML = '';
		var dataHTML = '';
		$.each(data, function(key, value){
			var arrayMeta = '';
			if (dataRules[key] === 'array' || dataRules[key] === 'item' ) {
				$.each(value, function(k, v){
					var title = v.title || v.name || v.type || 'List';
					if (dataRules[key] === 'array') {
						arrayMeta = renderMeta(v);
						dataHTML += '<div class="'+ key +'-item"><div class="remove-' + key + '"></div><div class="'+ key +'-header" draggable=true>' + title + '</div>' + arrayMeta + '</div>';
					} else {
						arrayMeta = renderItem(v);
						dataHTML += arrayMeta;
					}
				});
			} else if (dataRules[key] === 'readonly') {
				metaHTML += '<tr class="meta-item"><td class="first-row"><input type="text" class="o-input-text" value="' + key + '" readonly></td><td><input data-key="' + key + '" type="text" class="o-input-text" value="' + value + '" readonly></td></tr>';
			} else if (typeof dataRules[key] === 'string') {
				metaHTML += '<tr class="meta-item"><td class="first-row"><input type="text" class="o-input-text" value="' + key + '"></td><td><input data-key="' + key + '" type="text" class="o-input-text" value="' + value + '"></td></tr>';
			} else if (typeof dataRules[key] === 'object') {
				var options = '';
				$.each(dataRules[key], function(k1, v1){
					var selected = '';
					if (v1 === value) {
						selected = ' selected';
					}
					options += '<option value="' + v1 + '"' + selected + '>' + v1 + '</option>';
				});
				metaHTML += '<tr class="meta-item"><td class="first-row"><input class="o-input-text" value="' + key + '" type="text" readonly></td><td><select data-key="' + key + '" class="o-input-text">'+options+'</select></td></tr>';
			} else {
				metaHTML += '<tr class="meta-item"><td class="first-row"><input class="o-input-text" value="' + key + '" type="text" readonly></td><td><input type="text" data-key="' + key + '" class="o-input-text" value="' + value + '"></td></tr>';
			}
		});
		dataHTML = '<div class="lists-container">' + dataHTML + '</div>';
		metaHTML = '<table class="meta-table">' + metaHTML + '</table>';
		return metaHTML + dataHTML;
	}

	function renderJson(jsonData) {
		//render meta data into HTML Dom
		var metaHTML = '';
		metaHTML = renderMeta(jsonData.meta);

		//render sections into HTML Dom
		var sectionsHTML = '';
		$.each(jsonData.sections, function(key, value){
			var sectionMeta = renderMeta(value);
			var title = value.title || value.name || value.type || 'Section';
			var sectionType = value.type || '';
			sectionType = (sectionType !== '') ? 'type-' + sectionType: '';
			sectionsHTML += '<div class="section-container '+ sectionType + '"><div class="section-inner"><div class="remove-section"></div><div class="section-header" draggable=true>' + title + '</div>' + sectionMeta + '</div></div>';
		});
		sectionsHTML = '<div class="sections">' + sectionsHTML + '</div>';


		$('#'+domId).html(metaHTML + sectionsHTML);
	}

	function jsonToDom(jsonUrl) {
		$.ajax({ 
		    type: 'get', 
		    url: jsonUrl, 
		    dataType: 'json', 
		    success: function (data) { 
		        renderJson(data);
		        $('#source-json').val(JSON.stringify(data));
		    }, 
		    error: function (XMLHttpRequest, textStatus, errorThrown) { 
		            alert(errorThrown); 
		    } 
		});
	}

	function wrapItemHTML (htmlCode, groupTitle) {
		if (htmlCode !== '') {
		return '<div class="group-container"><div class="group-header" draggable=true>' + groupTitle + '</div><div class="group-inner">' + htmlCode + '</div></div>';
		}
		return ''; 
	}

	function loadStories() {
		$.ajax({ 
		    type: 'get', 
		    url: gApiUrls.stories, 
		    dataType: 'json', 
		    success: function (data) {
		    	var storiesInner = '';
		    	var photosInner = '';
		    	var interactivesInner = '';
		    	var videosInner = '';
				var coverHTML = '';
				var newsHTML = '';
				var commentsHTML = '';
				var otherHTML = '';
		        $.each(data, function (entryIndex, entry) {
		        	var timeStamp = '';
		        	var timeStampType = 2;
		        	var headline = '';
		        	var id = '';
		        	var longlead = '';
		        	var shortlead = '';
		        	var image = '';
		        	var type = '';
		        	var priority = 0;
		        	if (entry.id) {
		        		//console.log (entry.last_publish_time);
		        		timeStamp = entry.last_publish_time || '';
		        		if (entry.publish_status === 'draft') {
		        			timeStamp = '';
		        		}
		        		timeStampType = 2;
		        		id = entry.id;
		        		headline = entry.cheadline;
		        		longlead = entry.clongleadbody || '';
		        		shortlead = entry.cshortleadbody || '';
		        		//shortlead = JSON.stringify(entry);
		        		image = entry.story_pic.other || entry.story_pic.smallbutton || entry.story_pic.cover || entry.story_pic.bigbutton || '';
		        		type = 'story';
		        		priority = entry.priority;
						if (priority > 0 && priority <= 9) {
						    coverHTML += renderAPI(id, headline, timeStamp, timeStampType, longlead, shortlead, image, type);
						} else if (priority >= 20 && priority <= 49) {
						    newsHTML += renderAPI(id, headline, timeStamp, timeStampType, longlead, shortlead, image, type);
						} else if ((priority >= 49 && priority <= 69) || (priority >= 10 && priority <= 19)) {
						    commentsHTML += renderAPI(id, headline, timeStamp, timeStampType, longlead, shortlead, image, type);
						} else {
						    otherHTML += renderAPI(id, headline, timeStamp, timeStampType, longlead, shortlead, image, type);
						}
		        	} else if (entryIndex === 'photonews'){
		        		$.each(entry, function (photoIndex, photo) {
							id = photo.photonewsid;
							timeStamp = photo.add_times || '';
							timeStampType = 3; 
			        		headline = photo.cn_title;
			        		longlead = photo.leadbody || '';
			        		shortlead = photo.shortlead || '';
			        		//shortlead = JSON.stringify(photo);
			        		image = photo.illustration || photo.cover || photo.thumb_url || '';
			        		image = 'http://i.ftimg.net/' + image;
			        		type = 'photo';
			        		photosInner += renderAPI(id, headline, timeStamp, timeStampType, longlead, shortlead, image, type);
		        		});
		        	} else if (entryIndex === 'interactive'){
		        		$.each(entry, function (interactiveIndex, interactive) {
			        		id = interactive.id;
			        		timeStamp = interactive.pubdate || '';
			        		timeStampType = 3; 
			        		headline = interactive.cheadline;
			        		longlead = interactive.clongleadbody || '';
			        		shortlead = interactive.cshortleadbody || '';
			        		image = interactive.story_pic.other || interactive.story_pic.smallbutton || interactive.story_pic.cover || interactive.story_pic.bigbutton || '';
			        		type = 'interactive';
			        		interactivesInner += renderAPI(id, headline, timeStamp, timeStampType, longlead, shortlead, image, type);
		        		});
		        	} else if (entryIndex === 'video'){
		        		$.each(entry, function (videoIndex, video) {
			        		id = video.id;
			        		timeStamp = video.pubdate || '';
			        		timeStampType = 3;
			        		headline = video.cheadline;
			        		longlead = video.clongleadbody || '';
			        		shortlead = video.cshortleadbody || '';
			        		shortlead = JSON.stringify(video);
			        		image = video.story_pic.other || video.story_pic.smallbutton || video.story_pic.cover || video.story_pic.bigbutton || '';
			        		type = 'video';
			        		videosInner += renderAPI(id, headline, timeStamp, timeStampType, longlead, shortlead, image, type);
		        		});
		        	}
		        });
				coverHTML = wrapItemHTML(coverHTML, 'Cover');
				newsHTML = wrapItemHTML(newsHTML, 'News');
				commentsHTML = wrapItemHTML(commentsHTML, 'Comments');
				otherHTML = wrapItemHTML(otherHTML, 'Other Stories');
				videosInner = wrapItemHTML(videosInner, 'Videos');
				interactivesInner = wrapItemHTML(interactivesInner, 'Interactive Features');
				photosInner = wrapItemHTML(photosInner, 'Photo Slides');
				storiesInner = coverHTML + newsHTML + commentsHTML + otherHTML;
		        $('#stories-inner').html(storiesInner + videosInner + interactivesInner + photosInner);
		    },
		    error: function (XMLHttpRequest, textStatus, errorThrown) {
		        console.log(errorThrown); 
		    }
		});
	}

	function loadTools() {
		var sections = '';
		var lists = '';
		$.each(toolkits.section, function(key, value){ // jshint ignore:line
			sections += '<div class="toolkit toolkit-section toolkit-' + key + '" draggable=true>'+key+'</div>';
		});
		lists = '<div class="toolkit toolkit-list" draggable=true>list</div>';
		$('#tool-sec-inner').html(sections);
		$('#tool-list-inner').html(lists);
	}

	function renderHTML(ele) {
		var J = {
			'meta': {},
			'sections': []
		};
		var mainMeta = ele.find('>.meta-table .meta-item');
		var sections = ele.find('>.sections>.section-container');
		// render page meta data into JSON
		$.each(mainMeta, function() {
			var key = $(this).find('.o-input-text').eq(0).val();
			var value = $(this).find('.o-input-text').eq(1).val();
			J.meta[key] = value;
		});

		// render section data
		$.each(sections, function(sectionIndex) {
			var lists = $(this).find('>.section-inner>.lists-container>.lists-item');
			J.sections.push({});
			$.each($(this).find('.section-inner>.meta-table .meta-item'), function() {
				var key = $(this).find('.o-input-text').eq(0).val();
				var value = $(this).find('.o-input-text').eq(1).val();
				//console.log (index + ': ' + key + "/" + value);
				J.sections[sectionIndex][key] = value;
			});
			if (lists.length > 0 ) {
				J.sections[sectionIndex].lists = [];
				$.each(lists, function(listIndex){
					//console.log (sectionIndex + ': ' + listIndex);
					var items = $(this).find('.item');
					J.sections[sectionIndex].lists.push({});

					$.each($(this).find('>.meta-table .meta-item'), function() {
						
//						J.sections[sectionIndex].lists[listIndex].push({});
						var key = $(this).find('.o-input-text').eq(0).val();
						var value = $(this).find('.o-input-text').eq(1).val();
						J.sections[sectionIndex].lists[listIndex][key] = value;
					});

					
					if (items.length > 0) {
						//console.log (items.length);
						J.sections[sectionIndex].lists[listIndex].items = [];
						$.each(items, function(itemIndex){
							J.sections[sectionIndex].lists[listIndex].items.push({});
							$.each($(this).find('.o-input-text'), function() {

								var key = $(this).attr('name');
								var value = $(this).val();
								//console.log ($(this).html());
								J.sections[sectionIndex].lists[listIndex].items[itemIndex][key] = value;
							});
						
						});
					
					}

				});
			}
		});
		return JSON.stringify(J);
	}

/*

	function searchstory(thedate, ro) {
    var ro;
    $("#runningorder").attr("href", "http://www7.ftchinese.com/m/corp/runningorder.html?thedate=" + thedate);
    $("#stories div").empty();
    var thisday1 = new Date();
    var thenow1 = thisday1.getHours() * 10000 + thisday1.getMinutes() * 100 + thisday1.getSeconds();
    $.getJSON("/falcon.php/homepage/getstoryapi/" + thedate + "/" + thenow1, function (data) {
        $("#stories div").empty();
        var existingstories = "";
        $.each($("#thecodes textarea"), function () {
            if ($(this).attr("id") != "codeechostoryid") {
                existingstories += this.value;
            }
        });

        $.each(data, function (entryIndex, entry) {
            if (entry['id']) {
                eval("myStories[\"" + entry['id'] + "\"]=entry");
                var grey;

                if (existingstories.indexOf(entry['id']) > 0) {
                    grey = " style=\"color:#ccc\"";
                }
                var html = '<div class=hc>';
                html += '<a title=\"插入文章但不添加相关新闻\" class=hl priority=' + entry['priority'] + ' ' + grey + ' id=' + entry['id'] + ' onclick=\"insertstory(\'' + entry['id'] + '\')\"> ';
                html += entry['priority'] + '. '
            html += entry['cheadline'] + '</a>';
        html += '<span> <a target=_blank href=/falcon.php/story/edit/' + entry['id'] + '>edit</a>|<a target=_blank href=/create_story.php?id=' + entry['id'] + '>old</a>|<a target=_blank href=http://www7.ftchinese.com/story/' + entry['id'] + '?preview=1>view</a>';
        html += '| <a title=\"插入文章并添加一条相关新闻\" class=tail onclick=\"insertstory(\'' + entry['id'] + '\',1)\"> 1 </a> ';
        html += '<a title=\"插入文章并添加两条相关新闻\" class=tail onclick=\"insertstory(\'' + entry['id'] + '\',2)\"> 2 </a> ';
        html += '<a title=\"插入文章并添加三条相关新闻\" class=tail onclick=\"insertstory(\'' + entry['id'] + '\',3)\"> 3 </a> ';
        html += '<a title=\"插入文章并添加所有相关新闻\" class=tail onclick=\"insertstory(\'' + entry['id'] + '\',10)\"> N </a>';
        html += '</span></div>';

        if (entry['priority'] > 0 && entry['priority'] <= 9) {
            $('#thecover').append(html);
        } else if (entry['priority'] >= 10 && entry['priority'] <= 19) {
            $('#theskyline').append(html);
        } else if (entry['priority'] >= 20 && entry['priority'] <= 49) {
            $('#theleft').append(html);
        } else if (entry['priority'] >= 49 && entry['priority'] <= 69) {
            $('#theright').append(html);
        } else if (entry['genre'].toLowerCase().indexOf("news") >= 0 && entry['area'].toLowerCase().indexOf("china") >= 0) {
            $('#thechina_news').append(html);
        } else if (entry['genre'].toLowerCase().indexOf("news") >= 0) {
            $('#theworld_news').append(html);
        } else if (entry['cheadline'].toLowerCase().indexOf("lex") >= 0) {
            $('#thelex').append(html);
        } else if (entry['genre'].toLowerCase().indexOf("column") >= 0) {
            $('#thecolumn').append(html);
        } else if (entry['genre'].toLowerCase().indexOf("analysis") >= 0) {
            $('#theanalysis').append(html);
        } else if (entry['topic'].toLowerCase().indexOf("lifestyle") >= 0) {
            $('#thelifestyle').append(html);
        } else if (entry['genre'] == "feature") {
            $('#thefeature').append(html);
        } else if (entry['genre'] == "editorial") {
            $('#theeditorial').append(html);
        } else if (entry['genre'] == "comment") {
            $('#thecomment').append(html);
        } else if (entry['genre'] == "sod") {
            $('#thesod').append(html);
        } else {
            $('#theother').append(html);
        }
            } else if (entryIndex == "video") {
                $.each(entry, function (ek, ev) {
                    //alert (ev['id']);
                    eval("myStories[\"" + ev['id'] + "\"]=ev");
                    var grey;

                    if (existingstories.indexOf(ev['id']) > 0) {
                        grey = " style=\"color:#ccc\"";
                    }
                    var html = '<div class=hc>';
                    html += '<a ' + grey + ' id=' + ev['id'] + ' onclick=\"insertstory(\'' + ev['id'] + '\')\"> ';
                    html += ev['cheadline'] + '</a>';
                    html += '<span> <a target=_blank href=/create_videostory.php?id=' + ev['id'] + '>edit</a>|<a target=_blank href=http://www.ftchinese.com/video/' + ev['id'] + '>view</a>';
                    html += '</span></div>';


                    $('#thevideo').append(html);


                });


            } else if (entryIndex == "interactive") {
                $.each(entry, function (ik, iv) {
                    //alert (iv['id']);
                    eval("myStories[\"" + iv['id'] + "\"]=iv");
                    var grey = "";
                    if (existingstories.indexOf("interactive/"+iv['id']) > 0) {
                        grey = " style=\"color:#ccc\"";
                    }


                    var html = '<div class=hc>';
                    html += '<a ' + grey + ' id=' + iv['id'] + ' onclick=\"insertstory(\'' + iv['id'] + '\')\"> ';
                    html += iv['cheadline'] + '</a>';
                    html += '<span> <a target=_blank href=/falcon.php/ia/edit/' + iv['id'] + '>edit</a>|<a target=_blank href=http://www.ftchinese.com/interactive/' + iv['id'] + '>view</a>';
                    html += '<span></div>';


                    $('#theinteractive').append(html);


                });


            } else if (entryIndex == "photonews") {
                $.each(entry, function (ik, iv) {
                    //alert (iv['id']);
                    eval("myStories[\"" + iv['photonewsid'] + "\"]=iv");
                    var grey = "";
                    if (existingstories.indexOf("photonews/"+iv['en_title']) > 0) {
                        grey = " style=\"color:#ccc\"";
                    }


                    var html = '<div class=hc>';
                    html += '<a ' + grey + ' id=' + iv['photonewsid'] + ' onclick=\"insertphoto(\'' + iv['photonewsid'] + '\')\"> ';
                    html += iv['cn_title'] + '</a>';
                    html += ' <span><a target=_blank href=/falcon.php/pics/edit_photonews/' + iv['photonewsid'] + '>edit</a>|<a target=_blank href=http://www.ftchinese.com/photonews/' + iv['cn_title'] + '>view</a>';
                    html += '</span></div>';


                    $('#thephotonews').append(html);


                });


            }


        });

        $("#stories div[id^='the']").each(function () {
            $(this).prepend("<b>" + $(this).attr("id").replace(/the/, "").toUpperCase() + ":</b>");
        });


        if (ro == 1) {
            runthomas();
        }

        $(".hc span").hide();
        $(".hc").hover(
                function(){$(this).find("span").show();},
                function(){$(this).find("span").hide();}
                )

            //alert (myStories["001026878"].cheadline + myStories["001026878"].id);
    });
}

*/
	$('body').on('dragstart', '.item, .section-header, .lists-header, .toolkit, .group-header' ,function(e){
		try {
			e.originalEvent.dataTransfer.setData('text/plain', 'anything');
		} catch (ignore) {

		}
		if ($(this).is('.item, .toolkit')) {
			$(this).css('opacity','0.4');
		} else if ($(this).hasClass('group-header')) {
			$(this).parent().css('opacity','0.4');
		} else if ($(this).hasClass('section-header')) {
			$('.sections .section-container').each(function(index){
				$(this).attr('data-order', index);
			});
			$(this).parentsUntil($('.sections'), '.section-container').css('opacity', '0.4');
			dragIndex = $(this).parentsUntil($('.sections'), '.section-container').attr('data-order');
			dragIndex = parseInt(dragIndex, 10); 
		} else if ($(this).hasClass('lists-header')) {
			$('.lists-item').each(function(index){
				$(this).attr('data-order', index);
			});
			$(this).parent().css('opacity', '0.4');
			dragIndex = $(this).parent().attr('data-order');
			dragIndex = parseInt(dragIndex, 10);
		}
		dragSrcEl = $(this);
	});

	$('body').on('dragend', '.item, .section-header, .lists-header, .toolkit, .group-header' ,function(){
		if ($(this).is('.item, .toolkit')) {
			$('.item, .toolkit').css('opacity','1');
		} else if ($(this).hasClass('group-header')) {
			$(this).parent().css('opacity','1');
		} else if ($(this).hasClass('section-header')) {
			$(this).parentsUntil($('.sections'), '.section-container').css('opacity', '1');
		} else if ($(this).hasClass('lists-header')) {
			$(this).parent().css('opacity', '1');
		}
		// remove visual feedbacks
		$('.over').removeClass('over');
		$('.over-drag-down').removeClass('over-drag-down');
		$('.over-drag-up').removeClass('over-drag-up');
	});

	$('body').on('dragenter', '.item, .lists-item>.meta-table, .lists-item>.lists-header, .section-container, .lists-item, .section-inner>.meta-table, .section-header, .content-left-inner',function(){
		if (dragSrcEl.is('.item, .group-header') && $(this).is('.item, .lists-item>.meta-table, .lists-item>.lists-header')) {
			$(this).addClass('over');
		} else if (dragSrcEl.hasClass('section-header') && $(this).hasClass('section-container')) {
			dragOverIndex = $(this).attr('data-order');
			dragOverIndex = parseInt(dragOverIndex, 10);
			if (dragIndex < dragOverIndex) {
				$(this).addClass('over-drag-down');
			} else if (dragIndex > dragOverIndex) {
				$(this).addClass('over-drag-up');
			}
		} else if (dragSrcEl.hasClass('toolkit-section')) {
			if ($(this).hasClass('section-container')) {
				$(this).addClass('over-drag-down');
			} else if ($(this).hasClass('content-left-inner') && $('.section-container').length === 0) {
				$(this).addClass('over');
			}
		} else if (dragSrcEl.hasClass('lists-header') && $(this).is('.lists-item, .section-inner>.meta-table, .section-header')) {
			if ($(this).hasClass('lists-item')) {
				dragOverIndex = $(this).attr('data-order');
				dragOverIndex = parseInt(dragOverIndex, 10);
				if (dragIndex < dragOverIndex) {
					$(this).addClass('over-drag-down');
				} else if (dragIndex > dragOverIndex) {
					$(this).addClass('over-drag-up');
				}
			} else {
				$(this).addClass('over');
			}
		} else if (dragSrcEl.hasClass('toolkit-list') && $(this).is('.lists-item, .section-inner>.meta-table, .section-header')) {
			if ($(this).hasClass('lists-item')) {
				$(this).addClass('over-drag-down');
			} else {
				$(this).addClass('over');
			}
		}
	});

	$('body').on('dragover', '.item, .lists-item>.meta-table, .lists-item>.lists-header, .section-container, .lists-item, .section-inner>.meta-table, .section-header, .content-left-inner' ,function(e){
		if (e.preventDefault) {
			e.preventDefault(); // Necessary. Allows us to drop.
		}
		if (dragSrcEl.is('.item, .group-header') && $(this).is('.item, .lists-item>.meta-table, .lists-item>.lists-header')) {
			$(this).addClass('over');
		} else if (dragSrcEl.hasClass('section-header') && $(this).hasClass('section-container')) {
			dragOverIndex = $(this).attr('data-order');
			dragOverIndex = parseInt(dragOverIndex, 10);
			if (dragIndex < dragOverIndex) {
				$(this).addClass('over-drag-down');
			} else if (dragIndex > dragOverIndex) {
				$(this).addClass('over-drag-up');
			}
		} else if (dragSrcEl.hasClass('toolkit-section')) {
			if ($(this).hasClass('section-container')) {
				$(this).addClass('over-drag-down');
			} else if ($(this).hasClass('content-left-inner') && $('.section-container').length === 0) {
				$(this).addClass('over');
			}
		} else if (dragSrcEl.hasClass('lists-header') && $(this).is('.lists-item, .section-inner>.meta-table, .section-header')) {
			if ($(this).hasClass('lists-item')) {
				dragOverIndex = $(this).attr('data-order');
				dragOverIndex = parseInt(dragOverIndex, 10);
				if (dragIndex < dragOverIndex) {
					$(this).addClass('over-drag-down');
				} else if (dragIndex > dragOverIndex) {
					$(this).addClass('over-drag-up');
				}
			} else {
				$(this).addClass('over');
			}
		} else if (dragSrcEl.hasClass('toolkit-list') && $(this).is('.lists-item, .section-inner>.meta-table, .section-header')) {
			if ($(this).hasClass('lists-item')) {
				$(this).addClass('over-drag-down');
			} else {
				$(this).addClass('over');
			}
		}
	});

	$('body').on('dragleave', '.item, .lists-item>.meta-table, .lists-item>.lists-header, .section-container, .lists-item, .section-inner>.meta-table, .section-header, .content-left-inner' ,function(e){
		if (e.preventDefault) {
			e.preventDefault(); // Necessary. Allows us to drop.
		}
		$(this).removeClass('over').removeClass('over-drag-up').removeClass('over-drag-down');
	});

	$('body').on('drop', '.item, .lists-item>.meta-table, .lists-item>.lists-header, .section-container, .lists-item, .section-inner>.meta-table, .section-header, .content-left-inner' ,function(e){
		var newSection = '';
		var newList = '';
		var newSectionObject;
		var sectionType;
		var sectionJSON;
		var newListJSON;
		var newListObject;
		var groupItems;
		if (e.stopPropagation) {
			e.stopPropagation(); // stops the browser from redirecting.
		}
		if (e.preventDefault) {
			e.preventDefault(); // Necessary. Allows us to drop.
		}
		// Don't do anything if dropping the same column we're dragging.
		if (dragSrcEl.hasClass('item')) {		
			if ($(this).hasClass('item') === true && dragSrcEl !== this) {
				dragSrcEl.insertAfter($(this)).addClass('animated zoomIn');
			} else if ($(this).is('.lists-item>.meta-table, .lists-item>.lists-header')){
				$(this).parent().find('.lists-container').eq(0).prepend(dragSrcEl);
				dragSrcEl.addClass('animated zoomIn');
			} /*else if ($(this).is('.type-block .section-header, .type-block .section-inner>meta-table')) {
				listsContainer = $(this).parentsUntil($('.section-container'), '.section-inner').find('.lists-item .lists-container');
				if (listsContainer.length>0) {
					listsContainer.eq(0).prepend(dragSrcEl);
					dragSrcEl.addClass('animated zoomIn');
				} else {
					alert ('Trying to drop an item to a block without list? You need to create at least one list first. Just drag a list here. ');
				}
			} */else if ($(this).is('.section-header, .section-inner>meta-table')) {
				//console.log (this.classList);
			}
		} else if (dragSrcEl.hasClass('group-header')) {
			groupItems = dragSrcEl.parent().find('.item');	
			if ($(this).hasClass('item') === true) {
				groupItems.insertAfter($(this)).addClass('animated zoomIn');
			} else if ($(this).is('.lists-item>.meta-table, .lists-item>.lists-header')){
				$(this).parent().find('.lists-container').eq(0).prepend(groupItems);
				groupItems.addClass('animated zoomIn');
			} /*else if ($(this).is('.type-block .section-header, .type-block .section-inner>meta-table')) {
				listsContainer = $(this).parentsUntil($('.section-container'), '.section-inner').find('.lists-item .lists-container');
				if (listsContainer.length>0) {
					listsContainer.eq(0).prepend(dragSrcEl);
					dragSrcEl.addClass('animated zoomIn');
				} else {
					alert ('Trying to drop an item to a block without list? You need to create at least one list first. Just drag a list here. ');
				}
			} */else if ($(this).is('.section-header, .section-inner>meta-table')) {
				//console.log (this.classList);
			}
		} else if (dragSrcEl.hasClass('section-header')) {
			// drop a section. The drop point could be the container or its inner elements
			if ($(this).hasClass('section-container')) {
				dragOverIndex = $(this).attr('data-order');
				dragOverIndex = parseInt(dragOverIndex, 10);
				if (dragIndex < dragOverIndex) {
					$('.section-container').eq(dragIndex).insertAfter($(this)).addClass('animated zoomIn');
				} else if (dragIndex > dragOverIndex) {
					$('.section-container').eq(dragIndex).insertBefore($(this)).addClass('animated zoomIn');
				}
			} else if ($(this).is('.section-container .item, .lists-item>.meta-table, .lists-item>.lists-header, .section-header, .lists-item')) {
				dragOverIndex = $(this).parentsUntil($('.sections'), '.section-container').attr('data-order');
				dragOverIndex = parseInt(dragOverIndex, 10);
				if (dragIndex < dragOverIndex) {
					$('.section-container').eq(dragIndex).insertAfter($('.section-container').eq(dragOverIndex)).addClass('animated zoomIn');
				} else if (dragIndex > dragOverIndex) {
					$('.section-container').eq(dragIndex).insertBefore($('.section-container').eq(dragOverIndex)).addClass('animated zoomIn');
				}
			} else {
				console.log ('drag section header: other situation');
				console.log (this.classList);
			}
		} else if (dragSrcEl.hasClass('toolkit-section')) {
			sectionType = dragSrcEl.html();
			sectionJSON = {
		      'type': sectionType
		    };
		    if (sectionType === 'block') {
			    sectionJSON.lists = [
					{
	          		'name': 'New List',
	          		'title': '',
	          		'items': []
	        		}
		    	];
		    }
		    $.each(toolkits.section[sectionType], function(key, value){
				sectionJSON[value] = '';
			});
			newSection = '<div class="section-container type-' + sectionType + '"><div class="section-inner"><div class="remove-section"></div><div class="section-header" draggable="true">' + sectionType + '</div>' + renderMeta(sectionJSON) + '</div></div>';
			newSectionObject = $($.parseHTML(newSection));
			// drop a new section. The drop point could be the container or its inner elements
			if ($(this).hasClass('section-container')) {
				$(this).after(newSectionObject);
				newSectionObject.addClass('animated zoomIn');
			} else if ($(this).is('.section-container .item, .section-container .meta-table, .lists-item>.lists-header, .section-header, .lists-item')) {
				$(this).parentsUntil($('.sections'), '.section-container').after(newSectionObject);
				newSectionObject.addClass('animated zoomIn');
			} else if ($(this).hasClass('content-left-inner') && $('.section-container').length === 0) {
				$(this).find('.sections').append(newSectionObject);
				newSectionObject.addClass('animated zoomIn');
			} else {
				console.log ('create new section: other situation');
				console.log (this.classList);
			}
		} else if (dragSrcEl.hasClass('lists-header')) {
			// drop a list. The drop point could be a container or any inner elements
			if ($(this).is('.item')) {
				// drop to an item
				dragOverIndex = $(this).parentsUntil($('.sections'), '.lists-item').attr('data-order');
				dragOverIndex = parseInt(dragOverIndex, 10);
				if (dragIndex < dragOverIndex) {
					$('.lists-item').eq(dragIndex).insertAfter($('.lists-item').eq(dragOverIndex)).addClass('animated zoomIn');
				} else if (dragIndex > dragOverIndex) {
					$('.lists-item').eq(dragIndex).insertBefore($('.lists-item').eq(dragOverIndex)).addClass('animated zoomIn');
				}
			} else if ($(this).is('.lists-item>.meta-table, .lists-item>.lists-header')) {
				// drop to list header or list meta table
				dragOverIndex = $(this).parent().attr('data-order');
				dragOverIndex = parseInt(dragOverIndex, 10);
				if (dragIndex < dragOverIndex) {
					$('.lists-item').eq(dragIndex).insertAfter($('.lists-item').eq(dragOverIndex)).addClass('animated zoomIn');
				} else if (dragIndex > dragOverIndex) {
					$('.lists-item').eq(dragIndex).insertBefore($('.lists-item').eq(dragOverIndex)).addClass('animated zoomIn');
				}
			} else if ($(this).is('.section-inner>.meta-table, .section-inner>.section-header')) {
				// console.log (this.classList);
				if ($(this).parentsUntil($('.sections'), '.section-container').hasClass('type-block')) {
					$(this).parent().find('.lists-container').eq(0).prepend($('.lists-item').eq(dragIndex));
					$('.lists-item').eq(dragIndex).addClass('animated zoomIn');
				} else {
					alert ('A list can only be dropped to a block section! ');
				}
			} else {
				console.log ('drag list header: other situation...');
				console.log (this.classList);
			}
		} else if (dragSrcEl.hasClass('toolkit-list')) {
			// drop a list. The drop point could be a container or any inner elements
			newListJSON = {
	  			'name': 'New List',
	  			'title': '',
	  			'items': []
			};
			newList = '<div class="lists-item"><div class="remove-lists"></div><div class="lists-header" draggable="true">New List</div>' + renderMeta(newListJSON) + '</div>';
			newListObject = $($.parseHTML(newList));
			if ($(this).is('.item, .lists-item>.meta-table, .lists-item>.lists-header')) {
				// drop to an item
				$(this).parentsUntil($('.sections'), '.lists-item').after(newListObject);
				newListObject.addClass('animated zoomIn');
			} else if ($(this).is('.section-inner>.meta-table, .section-inner>.section-header')) {
				if ($(this).parentsUntil($('.sections'), '.section-container').hasClass('type-block')) {
					$(this).parent().find('.lists-container').eq(0).prepend(newListObject);
					newListObject.addClass('animated zoomIn');
				} else {
					alert ('A list can only be dropped to a block section! ');
				}
			} else {
				console.log ('drag list header: other situation...');
				console.log (this.classList);
			}
		}
		dragSrcEl = null;
		return false;
	});
	
	$('body').on('click', '.tab', function(){
		$('html').removeClass('show-all').removeClass('show-sections').removeClass('show-items').removeClass('show-json');
		if ($(this).hasClass('all')) {
			$('html').addClass('show-all');
		} else if ($(this).hasClass('sections')) {
			$('html').addClass('show-sections');
		} else if ($(this).hasClass('items')) {
			$('html').addClass('show-items');
		} else if ($(this).hasClass('json')) {
			$('#source-json').val(renderHTML($('#content-left-inner')));
			$('html').addClass('show-json');
		}
	});

	$('body').on('click', '#button-preview-main', function () {
			//console.log ('open');
			var devicesHTML='';
			$.each(devices, function(key, value){
				devicesHTML += '<div class="preview-on-device" data-width="' + value.width + '" data-height="' + value.height + '">' + value.name + '</div>';
			});
			var previewHTML = '<div id="preview-shadow" class="o-overlay-shadow animated fadeIn"></div><div id="preview-box" class="rightanswer show o-overlay__arrow-top animated fadeInRight"><div class="preview-header">Simulate on the following devices: </div><div class="explain-body"><div class="explain-answer">' + devicesHTML + '</div></div>';
			$('#preview-overlay').html(previewHTML);
	});

	$('body').on('click', '#preview-shadow', function () {
		$('#preview-overlay').empty();
	});

	$('body').on('click', '.preview-on-device', function(){
		var url = 'http://www7.ftchinese.com/';
		var w = $(this).attr('data-width') || $(window).width();
		var h = $(this).attr('data-height') || $(window).height();
		window.open (url,'newwindow','height=' + h + ',width='+ w +',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
	});

	$('body').on('click', '.item .item-title, .lists-header', function () {
		if ($(this).parent().hasClass('expanded')) {
			$(this).parent().removeClass('expanded');
		} else {
			$(this).parent().addClass('expanded');
		}
	});

	$('body').on('click', '.section-header', function () {
		var sectionContainer = $(this).parentsUntil($('.sections'), '.section-container');
		if (sectionContainer.hasClass('expanded')) {
			sectionContainer.removeClass('expanded');
		} else {
			sectionContainer.addClass('expanded');
		}
	});

	$('body').on('click', '.remove-item, .remove-lists', function () {
		$(this).parent().slideUp(500, function(){
			$(this).remove();
		});
	});

	$('body').on('click', '.remove-section', function () {
		$(this).parentsUntil($('.sections'), '.section-container').slideUp(500, function(){
			$(this).remove();
		});
	});

	// change section meta property
	$('body').on('change', '.section-inner>.meta-table .o-input-text', function () {
		var obj = $(this).parentsUntil($('.sections'), '.section-inner>.meta-table');
		//console.log (obj);
		var title = obj.find('[data-key=title]').val() || obj.find('[data-key=name]').val() || obj.find('[data-key=type]').val() || 'New List';
		//console.log (title);
		$(this).parentsUntil($('.sections'), '.section-container').find('.section-header').html(title);
	});

	// change list meta
	$('body').on('change', '.lists-item>.meta-table .o-input-text', function () {
		var obj = $(this).parentsUntil($('.lists-container'), '.lists-item>.meta-table');
		//console.log (obj);
		var title = obj.find('[data-key=title]').val() || obj.find('[data-key=name]').val() || obj.find('[data-key=type]').val() || 'New List';
		//console.log (title);
		$(this).parentsUntil($('.lists-container'), '.lists-item').find('.lists-header').html(title);
	});

	if (actionType === 'edit') {
		jsonToDom(gApiUrls.home);
	} else if (actionType==='create'){
		jsonToDom(gApiUrls.blank);
		$('.tab.all').click();
	}
	loadStories();
	loadTools();

})(); 