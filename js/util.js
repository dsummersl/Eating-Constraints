// configuration options {{{

// description of the clusters
clusterDefinitions = {
	cluster0: 'Very Fatty',
	cluster1: 'Salty',
	cluster2: 'Extremely Salty',
	cluster3: 'Fibrous & No Fat',
	cluster4: 'Very Salty',
	cluster5: 'Fibrous & Salty',
	cluster6: 'Sugary',
	cluster7: 'Fatty & Salty',
}

// filter functions
buttonOptions = [
	{ cat: 'Serving', name : 'Calories/Serving', id     : 'mapCaloriesPerServing', calc : function(f) { return checkBadNum(parseInt(f.Calories))}},
	{ cat: 'Serving', name : 'Carbs(g)/Serving', id     : 'mapCarbsPerServing', calc    : function(f) { return checkBadNum(parseInt(f['Total Carbohydrate - Grams']))}},
	{ cat: 'Serving', name : 'Sugar(g)/Serving', id     : 'mapSugarPerServing', calc    : function(f) { return checkBadNum(parseInt(f['Sugars  - Grams']))}},
	{ cat: 'Serving', name : 'Fiber(g)/Serving', id     : 'mapFiberPerServing', calc    : function(f) { return checkBadNum(parseInt(f['Dietary Fiber  - Grams']))}},
	{ cat: 'Serving', name : 'Total Fat(g)/Serving', id : 'mapFatPerServing', calc      : function(f) { return checkBadNum(parseInt(f['Total Fat - Grams']))}},
	{ cat: 'Serving', name : 'Sat Fat(g)/Serving', id   : 'mapSatFatPerServing', calc      : function(f) { return checkBadNum(parseInt(f['Saturated Fat  - Grams']))}},
	{ cat: 'Serving', name : 'Salt(mg)/Serving', id     : 'mapSaltPerServing', calc     : function(f) { return checkBadNum(parseInt(f['Sodium - Milligrams']))}},
	{ cat: 'Serving', name : 'Cholesterol(mg)/Serving', id     : 'mapChPerServing', calc     : function(f) { return checkBadNum(parseInt(f['Cholesterol - Milligrams']))}},

	{ cat: 'Package', name : 'Calories/Package', id     : 'mapCaloriesPerPackage', calc : function(f) { return checkBadNum(parseInt(f['Servings Per Container'])*f.Calories)}},
	{ cat: 'Package', name : 'Carbs(g)/Package', id     : 'mapCarbsPerPackage', calc    : function(f) { return checkBadNum(parseInt(f['Total Carbohydrate - Grams']*f['Servings Per Container']))}},
	{ cat: 'Package', name : 'Sugar(g)/Package', id     : 'mapSugarPerPackage', calc    : function(f) { return checkBadNum(parseInt(f['Sugars  - Grams']*f['Servings Per Container']))}},
	{ cat: 'Package', name : 'Fiber(g)/Package', id     : 'mapFiberPerPackage', calc    : function(f) { return checkBadNum(parseInt(f['Dietary Fiber  - Grams']*f['Servings Per Container']))}},
	{ cat: 'Package', name : 'Total Fat(g)/Package', id : 'mapFatPerPackage', calc      : function(f) { return checkBadNum(parseInt(f['Total Fat - Grams']*f['Servings Per Container']))}},
	{ cat: 'Package', name : 'Sat Fat(g)/Package', id   : 'mapSatFatPerPackage', calc      : function(f) { return checkBadNum(parseInt(f['Saturated Fat  - Grams']*f['Servings Per Container']))}},
	{ cat: 'Package', name : 'Salt(mg)/Package', id     : 'mapSaltPerPackage', calc     : function(f) { return checkBadNum(parseInt(f['Sodium - Milligrams']*f['Servings Per Container']))}},
	{ cat: 'Package', name : 'Servings/Package', id     : 'mapServings', calc           : function(f) { return checkBadNum(parseInt(f['Servings Per Container']))}},
	{ cat: 'Package', name : 'Cholesterol(mg)/Package', id     : 'mapChPerPackage', calc     : function(f) { return checkBadNum(parseInt(f['Cholesterol - Milligrams']*f['Servings Per Container']))}},

	{ cat: 'Calorie', name : 'Carbs(g)/Calorie', id     : 'mapCarbsPerCalorie', calc    : function(f) { return checkBadNum(parseInt(f['Total Carbohydrate - Grams'])/f.Calories)}},
	{ cat: 'Calorie', name : 'Sugar(g)/Calorie', id     : 'mapSugarPerCalorie', calc    : function(f) { return checkBadNum(parseInt(f['Sugars  - Grams'])/f.Calories)}},
	{ cat: 'Calorie', name : 'Fiber(g)/Calorie', id     : 'mapFiberPerCalorie', calc    : function(f) { return checkBadNum(parseInt(f['Dietary Fiber  - Grams'])/f.Calories)}},
	{ cat: 'Calorie', name : 'Total Fat(g)/Calorie', id : 'mapFatPerCalorie', calc      : function(f) { return checkBadNum(parseInt(f['Total Fat - Grams'])/f.Calories)}},
	{ cat: 'Calorie', name : 'Sat Fat(g)/Calorie', id   : 'mapSatFatPerCalorie', calc      : function(f) { return checkBadNum(parseInt(f['Saturated Fat  - Grams'])/f.Calories)}},
	{ cat: 'Calorie', name : 'Salt(mg)/Calorie', id     : 'mapSaltPerCalorie', calc     : function(f) { return checkBadNum(parseInt(f['Sodium - Milligrams'])/f.Calories)}},
	{ cat: 'Calorie', name : 'Cholesterol(mg)/Calorie', id     : 'mapChPerCalorie', calc     : function(f) { return checkBadNum(parseInt(f['Cholesterol - Milligrams'])/f.Calories)}},
	// TODO gotta cleanup the ounces before I can do this:
	//{ name: 'Ounces/Package', id:'mapServings', calc: function(f) { return parseInt(f['Servings Per Container'])}},
];

// }}}
// table functions {{{
// data that would show up in the table page

function positionPopoversNextOver(anchorElement,popoverElement) { // NOTE: has to be VISIBLE to get this info correctly
	/*
	 * compute the popover's location relative to anchorElement and the direction class hint (.left, .right, .above, .below).
	 */
	$anchorA = $(anchorElement);
	$twipsyA = $(popoverElement);
	twipsyType = 'right';
	$.each(['left','right','above','below'],function(i,v) {
		if ($twipsyA.hasClass(v)) {
			twipsyType = v;
		}
	});
	twipsy = { width: $twipsyA.width() + 10 , height: $twipsyA.height() + 10 };
	anchor = { position: $anchorA.position() , width: $anchorA.width() , height: $anchorA.height() };
	offset = {
		above: {
			top: anchor.position.top - twipsy.height
			, left: anchor.position.left + (anchor.width/2) - (twipsy.width/2)
		}
		, below: {
			top: anchor.position.top + anchor.height
			, left: anchor.position.left + (anchor.width/2) - (twipsy.width/2)
		}
		, left: {
			top: anchor.position.top + (anchor.height/2) - (twipsy.height/2)
			, left: anchor.position.left - twipsy.width - 5
		}
		, right: {
			top: anchor.position.top + (anchor.height/2) - (twipsy.height/2)
			, left: anchor.position.left + anchor.width + 5
		}
	};
	//console.log('anchor = '+ JSON.stringify(anchor));
	$twipsyA.css(offset[twipsyType])
}

function makeRanksPopup(food,anchorElement) {
	var aFood = findFoodFromFoodName(food,$('#'+anchorElement).text());
	var toAppend = "";
	toAppend += $.sprintf('<div id="%sPopover" class="popover right" style="display: none;"><div class="arrow"></div><div class="inner">',anchorElement);
	toAppend += $.sprintf('<h3 class="title">%s</h3><div class="content">',aFood.Description);
	toAppend += '<table><thead><tr>';
	toAppend += $.sprintf('<th class="header">%s</th>','Ingredient');
	toAppend += $.sprintf('<th class="header">%s</th>','Contains');
	toAppend += "</tr></thead><tbody>";
	$.each(aFood.Ranks,function(i,v) {
		toAppend += '<tr>';
		//toAppend += $.sprintf('<td>%s</td><td>%s</td>',v.Ingredient,v.IngredientCategory.replace('|',','));
		toAppend += $.sprintf('<td>%s</td><td>%s</td>',v.Ingredient,v.IngredientCategory);
		toAppend += '</tr>';
	});
	toAppend += "</tbody></table></div></div></td>";

	$('#'+anchorElement).parent().find('.popover').remove();
	$('#'+anchorElement).parent().append(toAppend);
	positionPopoversNextOver('#'+anchorElement,'#'+anchorElement+"Popover");
}

function populateTable(food,arrangeBy,element) {
	var alreadyExists = false;
	if ($(element +' table').size() > 0) {
		// /html/body/div[2]/div[3]/div/table/tbody/tr/td[5]
		//console.log("looking!");
		//$(element +' td:nth-child(5)').map(function(index) {
		$(element +' tr').map(function(index) {
			if (!alreadyExists) { // first row, ignore
				$(this).find(':nth-child(5)').text(arrangeBy.name);
				alreadyExists = true;
				return;
			}
			//console.log("1st = '"+ $(this).find(':nth-child(1)').text() +"'");
			var aFood = $(this).find(':first-child a').attr('id');
			//console.log("found '"+ aFood +"'");
			var newVal = arrangeBy.calc(food.ingredients[aFood.split('-')[1]]);
			//console.log("new val = "+ newVal);
			var child = $(this).find(':nth-child(5)').text($.sprintf("%1.2f",newVal));
			//return $('<td>ahem</td>').get(0);
		});
		$(element +" table").trigger('update');
		return;
	}
	// TODO sorting of the Package Size column isn't correct. Need to fix.
	var toAppend = ""
	toAppend += '<table class="zebra-striped"><thead><tr>';
	toAppend += $.sprintf('<th class="header">%s</th>','Product');
	toAppend += $.sprintf('<th class="header">%s</th>','Package Size');
	toAppend += $.sprintf('<th class="header">%s</th>','Servings');
	toAppend += $.sprintf('<th class="header">%s</th>','Calories');
	toAppend += $.sprintf('<th class="header">%s</th>',arrangeBy.name);
	toAppend += $.sprintf('<th class="header">%s</th>','Category');
	toAppend += $.sprintf('<th class="header">%s</th>','Contains');
	toAppend += '</tr></thead><tbody>';

	var idoffset = 0;
	$.each(food.ingredients,function(i,aFood) {
		toAppend += '<tr>';
		$.each(['Description','PackageWeight','Servings Per Container','Calories','arrangeby','cluster','Categories'],function(i,v) {
			// TODO for the header link to its URL
			if (v == 'cluster') {
				toAppend += $.sprintf('<td><a class="btn %s">%s</a></td>',aFood[v],clusterDefinitions[aFood[v]]);
			}
			else if (v == 'Categories') {
				var categories = "";
				$.each(aFood[v].sort(),function(i,c) {
					categories += c;
					if (i < aFood[v].length-1) { categories += ", "; }
				});
				toAppend += $.sprintf('<td>%s</td>',categories);
			}
			else if (v == 'PackageWeight') {
				toAppend += $.sprintf('<td>%s %s</td>',aFood[v],aFood['PackageWeightUnits']);
			}
			else if (v == 'Description') {
				toAppend += $.sprintf('<td><a href="#" id="tableDescId-%s" class="popoverswell tableDetails">%s</a></td>',idoffset++,aFood[v]);
			}
			else if (v == 'arrangeby') {
				toAppend += $.sprintf('<td>%s</td>',$.sprintf("%1.2f",arrangeBy.calc(aFood)));
			}
			else {
				toAppend += $.sprintf('<td>%s</td>',aFood[v]);
			}
		});
		toAppend += '</tr>';
	});
	toAppend += '</tbody></table>';
	$(element).empty();
	$(element).append(toAppend);
	var ts = $(element +" table").tablesorter({sortList: [[0,0]]});
	//console.log("I appended this table to "+ element +": "+ toAppend)
}

// }}}
// graph functions//{{{
//

function checkBadNum(result) {
	if (isNaN(result)) {
		//console.log(printStackTrace().join('\n'));
		return 0;
	}
	if (result == Infinity) { return 100000; }
	if (result == -Infinity) { return -100000; }
	return result;
}

function drawFoodOverviewLitmus(eater,element,bo) { //{{{
	/*
	 Draws a litmus bar showing categories that the eater can eat, and what they can't
	*/
	var height = 50
	var litmusWidth = computeCount(eater.eaten,bo.calc);
	litmusWidth += computeCount(eater.toEat,bo.calc);
	litmusWidth += computeCount(eater.denied,bo.calc);
	var elementWidth = $(element).width();

	var widths = d3.scale.linear().domain([0,litmusWidth]).range([0,elementWidth]);
	var heights = d3.scale.linear().domain([0,1]).range([0,50]);

	var vis = d3.select(element)
		.append("svg:svg")
		.attr("width", elementWidth)
		.attr("height", height)
	;
	var xOffset=0;
	$.each(eater.eatingSessions,function (i,v) {
		v.boxWidth = computeCount(v);
		v.xOffset = xOffset;
		xOffset += v.boxWidth;
	})
	xOffset=0;
	edible = {}
	inedible = {}
	index = 0
	$.each(['eaten','toEat','denied'], function(i,foodCat) {
		var bucket = edible;
		var theCat = 'eaten'
		if (foodCat == 'denied') { 
			bucket = inedible; 
			theCat = 'denied';
		}

		$.each(eater[foodCat],function (i,v) { // setup a bucket for each cluster with the foods that are in it.
			if (!bucket[v.cluster]) { bucket[v.cluster] = { foodCat: theCat, cluster: v.cluster, foods: [], index: index++ } }
			bucket[v.cluster].foods.push(v)
		});
	});
	$.each([edible,inedible],function(i,v) {
		theType = 'eaten';
		if (i == 1) { theType = 'denied' }
		vis.selectAll(element +" ."+ theType)
			.data(d3.values(v))
			.enter()
			.append("svg:rect")
			.attr('class',function(d) { return d.foodCat +" "+ d.cluster})
			.attr('x', function(d) { 
						if (element == '#OmnivoreLitmus') {
							console.log('cluster = '+ d.cluster)
							console.log('x = '+ computeXOffset([edible,inedible],d,bo.calc));
							console.log('d = '+ d.index);
							console.log("inedible = "+ d3.keys(inedible).length);
					//		console.log('xn = '+ widths(computeXOffset([edible,inedible],d,bo.calc)));
						}
				return widths(computeXOffset([edible,inedible],d,bo.calc)) 
			})
			.attr('y', heights(.05))
			.attr('width',function(d) {return widths(computeFoodClusterWidth(d,bo.calc))})
			.attr('height',heights(.5))
		;
	});
	return vis;
}//}}}

function computeFoodClusterWidth(cluster,calc) {
	var width = 0;
	$.each(cluster.foods,function(i,v) {
		width += calc(v);
	});
	return width;
}
function computeXOffset(parts,cluster,calc) {
	var xOffset = 0;
	$.each(parts,function(i,v) {
		$.map(v,function (v) {
			if (v.index < cluster.index) {
				xOffset += computeFoodClusterWidth(v,calc);
			}
		});
	});
	return checkBadNum(xOffset);
}

function drawLitmusForEater(eater,element) {//{{{
	/*
	 Draws a litmus bar showing what the customer 'would' eat and then what they can't eat, 
	 and what they have eaten.
	*/
	var height = 50
	var litmusWidth = computeCount(eater.eaten);
	litmusWidth += computeCount(eater.toEat);
	litmusWidth += computeCount(eater.denied);

	// dunno why I can't do [100,window.innerWidth-100]
	var widths = d3.scale.linear().domain([0,litmusWidth]).range([0,$(element).width()]);
	var heights = d3.scale.linear().domain([0,1]).range([0,50]);

	var vis = d3.select(element)
		.append("svg:svg")
		.attr("width", $(element).width())
		.attr("height", height)
	;
	/*
	vis.append("svg:rect")
		.attr('x',widths(0)+100)
		.attr('y',0.5)
		.attr('width',$(element).width())
		.attr('height',50)
		.attr('fill','white')
		.attr('stroke','gray')
	;
	vis.append("svg:text")
		.attr('text-anchor','middle')
		.attr('dy','2em')
		.attr('dx','5em')
		.text(eater.description)
	;
	*/
	var xOffset=0;
	$.each(eater.eatingSessions,function (i,v) {
		v.boxWidth = computeCount(v);
		v.xOffset = xOffset;
		xOffset += v.boxWidth;
	})
	vis.selectAll("rect")
		.data(eater.eatingSessions)
		.enter()
		.append("svg:rect")
		.attr('class','border')
		.attr("x", function(d) { return widths(d.xOffset) })
		.attr("y", heights(.1))
		.attr("rx", 5)
		.attr("ry", 5)
		.attr("width", function(d) { return widths(d.boxWidth) })
		.attr("height", heights(.9))
	;
	xOffset=0;
	$.each(['eaten','toEat','denied'], function(i,foodCat) {
		$.each(eater[foodCat],function (i,v) {
			v.boxWidth = v['Servings Per Container'] * v.Calories;
			v.xOffset = xOffset;
			xOffset += v.boxWidth;
		})
		vis.selectAll(element +" ."+ foodCat)
			.data(eater[foodCat])
			.enter()
			.append("svg:rect")
			.attr('class',function(d) {return foodCat +" "+ d.cluster})
			.attr('x', function(d) { return widths(d.xOffset) })
			.attr('y', heights(.05))
			.attr('width',function(d) {return widths(d.boxWidth)})
			.attr('height',heights(.5))
			.on('mouseover',function(d) {return d.Description})
		;
	});
	return vis;
}//}}}

function drawTreeMap(food,element) {//{{{
/*

TreeMap:

Show a treemap with a cluster by food type (the clusters I made).
Each cluster can be sized in the following ways:
 - number of foods
 - contents = show counts for each type (nut, meat, etc)
 - nutrient type = show counts for each type by its nutrient type (fat, cholesteral, etc)

 Return list of button IDs we need
 */
	foodMap = { name:'top', children: [] }
	for (k in food.clusters) {
		el = {};
		el.cluster = food.clusters[k].cluster;
		el.name = el.cluster;
		el.children = [];
		$.each(food.clusters[k].children,function(i,v) {
			ch = {
				cluster: el.cluster,
				name: v.productName,
			};
			$.each(buttonOptions,function(i,bo) {
				ch[bo.id] = 0;
				var f = findFoodFromFoodName(food,v.productName);
				ch[bo.id] += bo.calc(f);
				//console.log($.sprintf("%s: %s = %s",ch.name,bo.id,ch[bo.id]));
			});
			el.children.push(ch);
		});
		foodMap.children.push(el);
	}

	var w = 600;
	var h = 500;

	var treemap = d3.layout.treemap()
		.size([w, h])
		.sticky(true)
		.value(function(d) { return d[buttonOptions[0].id]; })
	;

	var div = d3.select(element).append("div")
		.style("position", "relative")
		.style("width", w + "px")
		.style("height", h + "px");

	div.data([foodMap]).selectAll("div")
		.data(treemap.nodes)
		.enter().append("div")
		.attr("class", function(d) { return "cell "+ d.cluster})
		.call(cell)
		.text(function(d) { return d.children ? null : d.name; })
	;

	$.each(buttonOptions,function(i,bo) {
		$('#'+ bo.id).click(function() {
			div.selectAll("div")
				.data(treemap.value(function(d) { return d[bo.id]; }))
				.transition()
				.duration(1000)
				.call(cell)
				.text(function(d) { return d.children ? null : d.name; })
			;

			return false;
		});
	});
}//}}}

function cell() {
  this
      .style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return d.dx - 1 + "px"; })
      .style("height", function(d) { return d.dy - 1 + "px"; });
}

//}}}
// Data Mangling Functions//{{{

// TODO delete?
function processEaterForm() { //<!--{{{-->
	try {
		//var eater = new Eater($('#eatername').val(),$('#alergies').val(),$('#favorites').val())
		var eater = new Eater($('#eatername').val(),['Sugar'],$('#favorites').val());
		eater.setupFoodStore(food.ingredients);
		console.log($.sprintf("denied food = %d (%d)",eater.calsDenied(),eater.denied.length));
		console.log($.sprintf("left   food = %d (%d)",eater.calsToEat(),eater.toEat.length));
		console.log($.sprintf("ate    food = %d (%d)",eater.calsAte(),eater.eaten.length));
		$('#eatingFood').fadeIn();
		var eatCount = 0;
	//	while (eater.toEat.length > 0) {
			var whatIAte = eater.eat();
			//$('#results').empty();
			$('#results').append("<ul>");
			$.each(whatIAte,function(i,v) {
				$('#results').append($.sprintf('<li>%s</li>',v.Description));
			})
			$('#results').append($.sprintf('<li><div id="eat-%d"></div></li>',eatCount));
			$('#results').append("</ul>");
			console.log($.sprintf("denied food = %d (%d)",eater.calsDenied(),eater.denied.length));
			console.log($.sprintf("left   food = %d (%d)",eater.calsToEat(),eater.toEat.length));
			console.log($.sprintf("ate    food = %d (%d)",eater.calsAte(),eater.eaten.length));
			drawLitmusForEater(eater,$.sprintf('eat-%d',eatCount));
			eatCount++;
	//	}
		$('#eatingFood').fadeOut()
	} catch(e) {
		console.log(printStackTrace({e:e}).join('\n'));
		console.trace();
		alert(e)
	}
	return false
}//<!--}}}-->

function startupWithData(onstarted) { //<!--{{{-->
	$.getJSON('testdata/ingredients.json', function(d) {
		food['ingredients'] = d;
	})
	$.getJSON('testdata/ingredientRanks.json', function(d) {
		food['ingredientRanks'] = d;
	})
	$.getJSON('testdata/calorieclusters.json', function(d) {
		food['clusters'] = d;
	})
	checkData(function() {return [food['ingredientRanks'],food['ingredients'],food['clusters']]},500,function() { 
		food = combineIngredientsAndRanks(food);
		$.each(['#alergies','#favorites'],function(i,field) {
			$(field).empty()
			$(field).append($.sprintf('<option value="%s">%s</option>',"none","none"))
			$.each(food['uniqueRankCategories'],function(i,v) {
				$(field).append($.sprintf('<option value="%s">%s</option>',v,v))
			})
		})
		$('#startupLoading').fadeOut()
		onstarted();
	})

	$('#neweaterform').submit(processEaterForm)
} //<!--}}}-->

function combineIngredientsAndRanks(food) {//{{{
	food.uniqueRankCategories = $.map(food.ingredientRanks, function (v) { return v.IngredientCategory }).filter(function(v) { return v != ''}).unique().sort()
	// make all the food ingredients be an array, and each element of the array is a dictionary of the food details.
	var newfood = []
	for (k in food.ingredients) {
		newfood.push(food.ingredients[k])
	}
	food.ingredients = newfood;
	// same with the food detials, make it an array
	newfood = [];
	for (k in food.ingredientRanks) {
		newfood.push(food.ingredientRanks[k]);
	}
	food.ingredientRanks = newfood;
	newfood = {};
	uniqueClusters = $.map(food.clusters, function(v) { return v.cluster }).unique();
	$.each(uniqueClusters, function(i,v) { newfood[v] = { cluster: v, children: [] } });
	for (k in food.clusters) {
		newfood[food.clusters[k].cluster].children.push(food.clusters[k]);
	}
	food.clusters = newfood;
	//console.log("json = "+ JSON.stringify(newfood));
	$.each(food.ingredients,function(i,k) {
		//console.log("look in key = "+ k.Description);
		var matches = food.ingredientRanks.filter(function(v) { return v.Description == k.Description });
		var justRanks = $.map(matches, function(v) { return v.IngredientCategory }).filter(function(v) { return v != ''}).unique().sort()
		//console.log($.sprintf("%30s = %s",k.Description,JSON.stringify(matches)));
		k.Ranks = matches;
		k.Categories = justRanks;
		$.each(food.clusters,function(i,v) {
			//console.log("children = "+ JSON.stringify(v.children));
			$.each(v.children,function(i,c) {
				//console.log("c = "+ JSON.stringify(c) +" looking for "+ k.Description);
				if (k.Description == c.productName) {
					k.cluster = v.cluster;
				}
			});
		});
	});
	delete food.ingredientRanks;
	return food;
}//}}}

/*
 * Checks an array of data for existance called via function. when they all exist the
 * onExists function is called.
 */
function checkData(dataFunc,interval,onExists) {
	var anyNull = false
	var datum = dataFunc()
	//console.log("data = "+ datum)
	for (i=0; i<datum.length; i++) {
		if (datum[i] == null) {
			//console.log($.sprintf("dat %s does not exist",i))
			anyNull = true
			break
		}
	}
	if (anyNull) {
		setTimeout(function() { checkData(dataFunc,interval,onExists) },interval)
	}
	else {
		//console.log("calling exists, got all data")
		onExists()
	}
}

// Array functions //{{{
// obtain a unique list of elements in an array (depends on jquery)
Array.prototype.unique = function() {
	var vals = this;
	var unique = [];
	for (var i=vals.length;i--;) {
		var val = vals[i];
		if($.inArray(val,unique) == -1) {
			unique.unshift(val);
		}
	}
	return unique;
}

// From: http://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript
/* finds the intersection of 
 * two arrays in a simple fashion.  
 *
 * PARAMS
 *  a - first array, must already be sorted
 *  b - second array, must already be sorted
 *
 * NOTES
 *
 *  Should have O(n) operations, where n is 
 *    n = MIN(a.length(), b.length())
 */
function intersect_safe(a, b)
{
  var ai=0, bi=0;
  var result = new Array();

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
}//}}}

var eaterMethods = {
	'default': function(eater) {
		foods = eater.toEat;
		return foods.shift()
	}
}

// Eater class - holds the state and specific strategy of an eater
// Params:
//  description - name
//  alergies - an array of food categories this eater will not eat
//  favorites - an array of food categories that this eater prefers 
//  pickFood - a function used to pick the next food. Takes a list of foods. Returns the food hash. (defaults to eaterMethods.default )
function Eater(description,alergies,favorites,pickFood) {
	//  denyFood - a function used to pick all foods this won't eat. Returns a list of foods.
	this.description = description;
	this.alergies = alergies || [];
	this.favorites = favorites || [];
	this.pickFood = pickFood || eaterMethods.default;
	this.denyFood = function(foods,alergies) {
		alergies = alergies.sort();
		//console.log("alergies = "+ alergies);
		return foods.filter(function (value,index,array) {
			result = intersect_safe(alergies,value.Categories).length != 0;
			//console.log("The result = "+ result);
			return result
		});
	};
	// what I ate:
	this.eaten = [];
	// the eating sessions is the same as 'eaten' but it breaks it out per 'eating session' (call to eat)
	this.eatingSessions = [];
	// won't ever eat this:
	this.denied = [];
	// want to eat this:
	this.toEat = [];
}
// setup the internal state for a whole bunch of the foods.
// Parameters:
// foods = list of foods.
Eater.prototype.setupFoodStore = function(foods) {
	//console.log("this.alergies = "+ this.alergies);
	this.denied = this.denyFood(foods,this.alergies);
	//console.log("this.denied = "+ this.denied);
	var dd = this.denied
	//console.log("in denied? "+ dd.length);
	this.toEat = $.extend(foods,[]).filter(function (value,index,array) {
		//console.log("looking at "+ value.Description);
		result = $.inArray(value,dd) == -1;
		//console.log("The result = "+ result);
		return result;
	});
	//console.log("to eat? "+ this.toEat.length);
	//console.log($.sprintf("Eating %d and not eating %d",this.toEat.length,this.denied.length));
}
// eat some food the way we'd do it. specify the general goal or default to 2000.
// Return an array of the elements eaten, otherwise an empty array
Eater.prototype.eat = function(calories) {
	calories = calories || 2000;
	var calsAte = 0;
	var ate = [];
	while (calsAte < calories) {
		var f = this.pickFood(this);
		if (f) {
			this.eaten.push(f);
			ate.push(f);
			calsAte += f['Servings Per Container'] * f.Calories;
			//console.log($.sprintf("Ate up to %6d calories for %s",calsAte,f.Description));
		}
		else {
			break;
		}
	}
	this.eatingSessions.push(ate);
	return ate;
}

function findFoodFromFoodName(foods,foodName) {
	var food;
	$.each(foods.ingredients,function(i,v) { if (v.Description == foodName) { food = v; }});
	return food;
}

// given a list of foods, computer the calories * servings
function computeCount(foods,method) {
	method = method || function (v) { return v['Servings Per Container'] * v.Calories; }
	cals = 0;
	$.each(foods,function(i,v) { cals += method(v); });
	return cals;
}
Eater.prototype.calsAte = function() {
	return computeCount(this.eaten);
}
Eater.prototype.calsDenied = function() {
	return computeCount(this.denied);
}
Eater.prototype.calsToEat = function() {
	return computeCount(this.toEat);
}
//}}}
// vim: set fdm=marker ai:
