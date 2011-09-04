// configuration options {{{

// description of the clusters
clusterDefinitions = {
	cluster3: 'Carbs',
	cluster4: 'Salt',
	cluster5: 'Carbs & Salt',
	cluster6: 'Sugary',
	cluster7: 'Fatty',
	cluster2: 'No Cal',
};

clusterDescriptions = {
	cluster3: 'Not much, but what there is are carb/salt.',
	cluster4: 'Significant saltiness: dips, sauces and beans.',
	cluster5: 'Weighty food: heavy on salt, carbs, and fat.',
	cluster6: 'Hi in sugar, high in carbs.',
	cluster7: 'Saturated fats and salt: Dairy and meat.',
	cluster2: 'Some things just do not have any calories at all.',
};

// filter functions
buttonOptions = [
	{ forUser: true, cat: 'Serving', name : 'Calories/Serving', id     : 'mapCaloriesPerServing', calc : function(f) { return checkBadNum(f.Calories)}},
	{ forUser: true, cat: 'Serving', name : 'Carbs(%)/Serving', id     : 'mapCarbsPerPercent', calc    : function(f) { return checkBadNum(f['Total Carbohydrate - Percent'])}},
	{ forUser: true, cat: 'Serving', name : 'Carbs(g)/Serving', id     : 'mapCarbsPerServing', calc    : function(f) { return checkBadNum(f['Total Carbohydrate - Grams'])}},
	{ forUser: true, cat: 'Serving', name : 'Cholesterol(%)/Serving', id     : 'mapChPerPercent', calc     : function(f) { return checkBadNum(f['Cholesterol - Percent'])}},
	{ forUser: true, cat: 'Serving', name : 'Cholesterol(mg)/Serving', id     : 'mapChPerServing', calc     : function(f) { return checkBadNum(f['Cholesterol - Milligrams'])}},
	{ forUser: true, cat: 'Serving', name : 'Fiber(%)/Serving', id     : 'mapFiberPerPercent', calc    : function(f) { 
                 //                                                                                           console.log($.sprintf('ttl cars = %s (%s) - %s',checkBadNum(f['Dietary Fiber  - Percent']),f['Dietary Fiber  - Percent'],f['Description']));
                                                                                                     return checkBadNum(f['Dietary Fiber  - Percent'])}},
	{ forUser: true, cat: 'Serving', name : 'Fiber(g)/Serving', id     : 'mapFiberPerServing', calc    : function(f) { return checkBadNum(f['Dietary Fiber  - Grams'])}},
	{ forUser: true, cat: 'Serving', name : 'Protein(g)/Serving', id     : 'mapProteinPerServing', calc     : function(f) { return checkBadNum(f['Protein - Grams'])}},
	{ forUser: true, cat: 'Serving', name : 'Salt(%)/Serving', id     : 'mapSaltPerPercent', calc     : function(f) { return checkBadNum(f['Sodium - Percent'])}},
	{ forUser: true, cat: 'Serving', name : 'Salt(mg)/Serving', id     : 'mapSaltPerServing', calc     : function(f) { return checkBadNum(f['Sodium - Milligrams'])}},
	{ forUser: true, cat: 'Serving', name : 'Sat Fat(%)/Serving', id   : 'mapSatFatPerPercent', calc      : function(f) { return checkBadNum(f['Saturated Fat  - Percent'])}},
	{ forUser: true, cat: 'Serving', name : 'Sat Fat(g)/Serving', id   : 'mapSatFatPerServing', calc      : function(f) { return checkBadNum(f['Saturated Fat  - Grams'])}},
	{ forUser: true, cat: 'Serving', name : 'Sugar(g)/Serving', id     : 'mapSugarPerServing', calc    : function(f) { return checkBadNum(f['Sugars  - Grams'])}},
	{ forUser: true, cat: 'Serving', name : 'Total Fat(%)/Serving', id : 'mapFatPerPercent', calc      : function(f) { return checkBadNum(f['Total Fat - Percent'])}},
	{ forUser: true, cat: 'Serving', name : 'Total Fat(g)/Serving', id : 'mapFatPerServing', calc      : function(f) { return checkBadNum(f['Total Fat - Grams'])}},

	{ forUser: true, cat: 'Package', name : 'Calories/Package', id     : 'mapCaloriesPerPackage', calc : function(f) { return checkBadNum(f['Servings Per Container'])*checkBadNum(f.Calories)}},
	{ forUser: true, cat: 'Package', name : 'Carbs(g)/Package', id     : 'mapCarbsPerPackage', calc    : function(f) { return checkBadNum(f['Total Carbohydrate - Grams'])*checkBadNum(f['Servings Per Container'])}},
	{ forUser: true, cat: 'Package', name : 'Cholesterol(mg)/Package', id     : 'mapChPerPackage', calc     : function(f) { return checkBadNum(f['Cholesterol - Milligrams'])*checkBadNum(f['Servings Per Container'])}},
	{ forUser: true, cat: 'Package', name : 'Fiber(g)/Package', id     : 'mapFiberPerPackage', calc    : function(f) { return checkBadNum(f['Dietary Fiber  - Grams'])*checkBadNum(f['Servings Per Container'])}},
	{ forUser: true, unit: 'g', type: 'Protein', cat: 'Package', name : 'Protein(g)/Package', id     : 'mapProteinPerPackage', calc     : function(f) { return checkBadNum(f['Protein - Grams'])*checkBadNum(f['Servings Per Container'])}},
	{ forUser: true, unit: 'mg', type: 'Salt', cat: 'Package', name : 'Salt(mg)/Package', id     : 'mapSaltPerPackage', calc     : function(f) { return checkBadNum(f['Sodium - Milligrams'])*checkBadNum(f['Servings Per Container'])}},
	{ forUser: true, cat: 'Package', name : 'Sat Fat(g)/Package', id   : 'mapSatFatPerPackage', calc      : function(f) { return checkBadNum(f['Saturated Fat  - Grams'])*checkBadNum(f['Servings Per Container'])}},
	{ forUser: true, cat: 'Package', name : 'Servings/Package', id     : 'mapServings', calc           : function(f) { return checkBadNum(f['Servings Per Container'])}},
	{ forUser: true, unit: 'g', type:'Sugar', cat: 'Package', name : 'Sugar(g)/Package', id     : 'mapSugarPerPackage', calc    : function(f) { return checkBadNum(f['Sugars  - Grams'])*checkBadNum(f['Servings Per Container'])}},
	{ forUser: true, cat: 'Package', name : 'Total Fat(g)/Package', id : 'mapFatPerPackage', calc      : function(f) { return checkBadNum(f['Total Fat - Grams'])*checkBadNum(f['Servings Per Container'])}},

	{ forUser: true, cat: 'Calorie', name : 'Carbs(g)/Calorie', id     : 'mapCarbsPerCalorie', calc    : function(f) { return checkBadNum(f['Total Carbohydrate - Grams'])/checkBadNum(f.Calories)}},
	{ forUser: true, cat: 'Calorie', name : 'Cholesterol(mg)/Calorie', id     : 'mapChPerCalorie', calc     : function(f) { return checkBadNum(f['Cholesterol - Milligrams'])/checkBadNum(f.Calories)}},
	{ forUser: true, cat: 'Calorie', name : 'Fiber(g)/Calorie', id     : 'mapFiberPerCalorie', calc    : function(f) { return checkBadNum(f['Dietary Fiber  - Grams'])/checkBadNum(f.Calories)}},
	{ forUser: true, cat: 'Calorie', name : 'Protein(g)/Calorie', id     : 'mapProteinPerCalorie', calc     : function(f) { return checkBadNum(f['Protein - Grams'])/checkBadNum(f.Calories)}},
	{ forUser: true, cat: 'Calorie', name : 'Salt(mg)/Calorie', id     : 'mapSaltPerCalorie', calc     : function(f) { return checkBadNum(f['Sodium - Milligrams'])/checkBadNum(f.Calories)}},
	{ forUser: true, cat: 'Calorie', name : 'Sat Fat(g)/Calorie', id   : 'mapSatFatPerCalorie', calc      : function(f) { return checkBadNum(f['Saturated Fat  - Grams'])/checkBadNum(f.Calories)}},
	{ forUser: true, cat: 'Calorie', name : 'Sugar(g)/Calorie', id     : 'mapSugarPerCalorie', calc    : function(f) { return checkBadNum(f['Sugars  - Grams'])/checkBadNum(f.Calories)}},
	{ forUser: true, cat: 'Calorie', name : 'Total Fat(g)/Calorie', id : 'mapFatPerCalorie', calc      : function(f) { return checkBadNum(f['Total Fat - Grams'])/checkBadNum(f.Calories)}},

	{ forUser: false, cat: 'Package', type: 'Carbs', name : 'Carbs(%)/Package', id     : 'mapCarbsPerPercentPackage', calc    : function(f) { 
                                                                                                            //console.log($.sprintf('ttl cars = %s (%s) for servings %s - %s',checkBadNum(f['Total Carbohydrate - Percent']),f['Total Carbohydrate - Percent'],checkBadNum(f['Servings Per Container']),f['Description']));
                                                                                                            return checkBadNum(f['Total Carbohydrate - Percent'])*checkBadNum(f['Servings Per Container'])}},
	{ forUser: false, cat: 'Package', type: 'Cholest.', name : 'Cholesterol(%)/Package', id     : 'mapChPerPercentPackage', calc     : function(f) { return checkBadNum(f['Cholesterol - Percent'])*checkBadNum(f['Servings Per Container'])}},
	{ forUser: false, cat: 'Package', type: 'Fiber', name : 'Fiber(%)/Package', id     : 'mapFiberPerPercentPackage', calc    : function(f) { return checkBadNum(f['Dietary Fiber  - Percent'])*checkBadNum(f['Servings Per Container'])}},
	{ forUser: false, cat: 'Package', type: 'Salt', name : 'Salt(%)/Package', id     : 'mapSaltPerPercentPackage', calc     : function(f) { return checkBadNum(f['Sodium - Percent'])*checkBadNum(f['Servings Per Container'])}},
	{ forUser: false, cat: 'Package', type: 'Sat Fat', name : 'Sat Fat(%)/Package', id   : 'mapSatFatPerPercentPackage', calc      : function(f) { return checkBadNum(f['Saturated Fat  - Percent'])*checkBadNum(f['Servings Per Container'])}},
	{ forUser: false, cat: 'Package', type: 'Total Fat', name : 'Total Fat(%)/Package', id : 'mapFatPerPercentPackage', calc      : function(f) { return checkBadNum(f['Total Fat - Percent'])*checkBadNum(f['Servings Per Container'])}},

	// TODO gotta cleanup the ounces before I can do this:
	//{ name: 'Ounces/Package', id:'mapServings', calc: function(f) { return parseInt(f['Servings Per Container'])}},
];

function findOption(option) {
  var index = -1;
  $.each(buttonOptions,function(i,v) {
    if (v.id == option) {
      index = i;
    }
  });
  return index;
}

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
  var idx = anchorElement.split('-')[1];
  console.log("idx = "+ idx);
  var aFood = food.filter(function (v) { return idx == v.idx })[0];
  console.log("aFood = "+ aFood);
	var toAppend = "";
	toAppend += $.sprintf('<div id="%sPopover" class="popover below" style="display: none;"><div class="arrow"></div><div class="inner">',anchorElement);
	toAppend += $.sprintf('<h3 class="title">%s</h3><div class="content">',aFood.Description);
	toAppend += '<table class="zebra-striped"><thead><tr>';
	toAppend += $.sprintf('<th class="header">%s</th>','Nutrient');
	toAppend += $.sprintf('<th class="header">%s</th>','Value');
	toAppend += "</tr></thead><tbody>";
  toAppend += $.sprintf('<tr><td>%s</td><td>%s</td></tr>','Servings',checkBadNum(aFood['Servings Per Container']));
  toAppend += $.sprintf('<tr><td>%s</td><td>%s</td></tr>','Calories',checkBadNum(aFood['Calories']));
  toAppend += $.sprintf('<tr><td>%s</td><td>%s g (%s%%)</td></tr>','Carbohydrates',checkBadNum(aFood['Total Carbohydrate - Grams']),checkBadNum(aFood['Total Carbohydrate - Percent']));
  toAppend += $.sprintf('<tr><td>%s</td><td>%s g (%s%%)</td></tr>','Fiber',checkBadNum(aFood['Dietary Fiber  - Grams']),checkBadNum(aFood['Dietary Fiber  - Percent']));
  toAppend += $.sprintf('<tr><td>%s</td><td>%s g (%s%%)</td></tr>','Fat',checkBadNum(aFood['Total Fat - Grams']),checkBadNum(aFood['Total Fat - Percent']));
  toAppend += $.sprintf('<tr><td>%s</td><td>%s g (%s%%)</td></tr>','Saturated Fat',checkBadNum(aFood['Saturated Fat  - Grams']),checkBadNum(aFood['Saturated Fat  - Percent']));
  toAppend += $.sprintf('<tr><td>%s</td><td>%s %s</td></tr>','Sugar',checkBadNum(aFood['Sugars  - Grams']),'g');
  toAppend += $.sprintf('<tr><td>%s</td><td>%s %s</td></tr>','Protein',checkBadNum(aFood['Protein - Grams']),'g');
  toAppend += $.sprintf('<tr><td>%s</td><td>%s %s (%s%%)</td></tr>','Salt',checkBadNum(aFood['Sodium - Milligrams']),'mg',checkBadNum(aFood['Sodium - Percent']));
  toAppend += $.sprintf('<tr><td>%s</td><td>%s %s (%s%%)</td></tr>','Cholesterol',checkBadNum(aFood['Cholesterol - Milligrams']),'mg',checkBadNum(aFood['Cholesterol - Percent']));
	toAppend += "</tbody></table>";
  toAppend += '<p class="ingredientItem"><b>Ingredients:</b>';
  $.each(aFood.Ranks,function(i,v) {
    toAppend += v.Ingredient;
    if (v.IngredientCategory.length > 0) {
        toAppend += $.sprintf('<font class="ingredientCategory">[%s]</font>',v.IngredientCategory.join(','));
    }
    if (i < aFood.Ranks.length-1) {
      toAppend += ", ";
    }
  });
  toAppend += "</p>";
  toAppend += "</div></div>";

	$('#'+anchorElement).parent().find('.popover').remove();
	$('#'+anchorElement).parent().append(toAppend);
	positionPopoversNextOver('#'+anchorElement,'#'+anchorElement+"Popover");
}

function populateTable(food,arrangeBy,element) {
  /*
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
			if (aFood) { // TODO don't know why I need to make sure aFood exists
        var idx = aFood.split('-')[1];
        var newVal = food.filter(function (v) { return idx == v.idx })[0];
				//console.log("new val = "+ newVal);
				var child = $(this).find(':nth-child(5)').text($.sprintf("%1.2f",newVal));
				//return $('<td>ahem</td>').get(0);
			}
		});
		$(element +" table").trigger('update');
		return;
	}
  */
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

	$.each(food,function(i,aFood) {
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
				toAppend += $.sprintf('<td><a href="#" id="tableDescId-%s" class="popoverswell tableDetails">%s</a></td>',aFood.idx,aFood[v]);
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
  $('.tableDetails').click(function () {
    $('.popover').fadeOut();
    if (lastPopup == $(this).attr('id')) {
      lastPopup = '';
      return false;
    }
    makeRanksPopup(food,$(this).attr('id'));
    $(this).parent().find('.popover').fadeIn();
    lastPopup = $(this).attr('id');
    return false;
  });
}

// }}}
// graph functions//{{{
//

function addFoodStats(eater,element,bo) {//{{{
  // total protein
  // total sugar
  //
  // total fat
  // saturated fat
  // carbs
  // salt
  // fiber
  // cholesteral
  // edible vs inedible foods
  // edible vs inedible calorie/types?? or is this already taken care of?
  var toAppend = '';
  //toAppend = '<ul class="unstyled">';
  var bopt = findOption('mapCaloriesPerPackage');
  var denied = computeCount(eater.denied,bopt);
  var edible = computeCount(eater.eaten,bopt) + computeCount(eater.toEat,bopt);
  var total = denied + edible;
  var days = edible/2000;
  //$.each(eater.toEat,function(i,v) {
    //toAppend += $.sprintf("<li>Edible: %s</li>",v.Description);
  //});
  //toAppend += $.sprintf("<li>Inedible: %2.2f%%</li>",100*(denied/total));
  //toAppend += $.sprintf("<li>%2.1f days</li>",days,edible);
  //toAppend += "</ul>";
  toAppend += $.sprintf('<br/><p class="ingredientItem">On 2kCal/day you could eat for <font class="ingredientCategory">%2.1f days</font> with average daily nutrion:<p>',days);
  var toShow = ['mapCarbsPerPercentPackage','mapFiberPerPercentPackage','mapSaltPerPercentPackage','mapSatFatPerPercentPackage','mapFatPerPercentPackage','mapChPerPercentPackage'];
  //var toShow = ['mapFiberPerPercentPackage','mapFatPerPercentPackage'];
  $.each(toShow,function(i,boname) {
    toAppend += $.sprintf('<div style="width: 50; float: right;" id="%s"></div>',boname);
  });
  toAppend += $.sprintf('<div style="width: 50; float: right;" id="%s"></div>','mapProteinPerPackage');
  toAppend += $.sprintf('<div style="width: 50; float: right;" id="%s"></div>','mapSugarPerPackage');
	$(element).append(toAppend);
  //toAppend = "<ul>";
  $.each(toShow,function(i,boname) {
    bopt = findOption(boname);
    var usable = computeCount(eater.eaten,bopt) + computeCount(eater.toEat,bopt);
    //toAppend += $.sprintf("<li>%s: days %s usable %s result %2.2f</li>",boname,days,usable,usable/days);
    paintPercentage(buttonOptions[bopt].type,parseInt(usable/days),element +" #"+ boname);
  });
  bopt = findOption('mapProteinPerPackage');
  var amount = parseInt((computeCount(eater.eaten,bopt) + computeCount(eater.toEat,bopt))/days);
  paintHistogram(buttonOptions[bopt].type,buttonOptions[bopt].unit, amount,element +" #mapProteinPerPackage",0);
  bopt = findOption('mapSugarPerPackage');
  amount = parseInt((computeCount(eater.eaten,bopt) + computeCount(eater.toEat,bopt))/days);
  paintHistogram(buttonOptions[bopt].type,buttonOptions[bopt].unit, amount,element +" #mapSugarPerPackage",.2);
  //toAppend += "</ul>";
	//$(element).append(toAppend);
}//}}}

function drawFoodOverviewLitmus(eater,element,bo) { //{{{
	/*
	 Draws a litmus bar showing categories that the eater can eat, and what they can't
	*/
	var height = 20;
  var boi = findOption(bo.id);
  bo = buttonOptions[boi];
	var litmusWidth = computeCount(eater.eaten,boi);
	litmusWidth += computeCount(eater.toEat,boi);
	litmusWidth += computeCount(eater.denied,boi);
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
		v.boxWidth = computeCount(v,findOption('mapCaloriesPerPackage'));
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
		vis.selectAll(element +"."+ theType)
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
			.attr('height',heights(1))
		;
	});
	return vis;
}//}}}

function paintPercentage(description,percent,element) {//{{{
  // paint a percentage pie thing - it uses the following classes:
  // arc =
  // bordered
  // nopaint
  // percentdesc = svg text stylings
  // percenttext = svg text stylings
  var width = 40;
  var height = 55;
  var x = d3.scale.linear().domain([0,1]).range([0,width]);
  var y = d3.scale.linear().domain([0,1]).range([height,0]);

  var chart = d3.selectAll(element)
    .append('svg:svg')
    .attr('width',width+10)
    .attr('height',height)
    .attr('class','arcbody')
    ;

  var vis = chart.append('svg:g')
    .attr('transform','translate(5,0)')
    ;

  // the data will be a number of circle datas:
  var remainingPercent = percent;
  var data = [];
  while (remainingPercent > 0) {
    if (remainingPercent > 100) {
      data.push(1); // a whole circle
      remainingPercent -= 100;
    }
    else {
      data.push(remainingPercent/100); // the partial
      remainingPercent = 0;
    }
    $.each(data,function (i,v) { data[i] = reDomain(v) });
  }
  if (data.length == 0) {
    data.push(0);
  }

  var r = 0.3;
  var separation = (.55 - r)/data.length;
  var donut = d3.layout.pie().sort(d3.descending);
  var arc = d3.svg.arc().innerRadius(0).outerRadius(x(r));

  arcSpot = vis.selectAll('.arc')
      .data([0])
      .enter()
      .append('svg:g')
      .data([data])
      .attr('class','arc')
      ;

  $.each(data,function(i,v) {
    classes = ['bordered'];
    if (v < 1) {
      v = [v,1-reDomain(v)];
      classes = ['bordered','nopaint'];
    }
    else {
      v = [v];
    }
    arcSpot.data([v]);
    arcSpot.selectAll("arc")
      .data(donut)
      .enter()
      .append("svg:path")
      .attr("transform", "translate(" + x(.5) + "," + y(.55 + i*separation) + ")") // center on X and place the circles ever higher
      .attr('class',function(d,i) { return classes[i]; })
      .attr("d", arc)
      ;

    arcSpot.data([0]).append("svg:text")
      .attr("transform", "translate(" + x(.5) + "," + y(.17) + ")")
      .attr("text-anchor", "middle")
      .attr("class","percentdesc")
      .text(description)
      ;
    arcSpot.data([0]).append("svg:text")
      .attr("transform", "translate(" + x(.5) + "," + y(0) + ")")
      .attr("text-anchor", "middle")
      .attr("class","percenttext")
      .text($.sprintf('%2.0f%%',percent))
      ;
  });
}//}}}

function paintHistogram(description,unit,value,element,roundedness) {//{{{
  var width = 200;
  var height = 20;
  var x = d3.scale.linear().domain([0,500]).range([0,width]);
  var y = d3.scale.linear().domain([0,1]).range([0,height]);

  var graphH = d3.scale.linear().domain([0,500]).range([0,width]);
  var graphY = d3.scale.linear().domain([0,500]).range([0,width]);

  var chart = d3.selectAll(element)
    .append('svg:svg')
    .attr('width',width+100)
    .attr('height',height+20)
    .attr('class','arcbody')
    ;

  var roundVal = roundedness;
  chart.selectAll('rect')
    .data([value])
    .enter()
    .append('svg:rect')
    .attr('transform','translate(-'+ y(roundVal) +',10)')
    .attr('class','rect bordered')
    .attr('x',x(0))
    .attr('y',y(0))
    .attr('rx',y(roundVal))
    .attr('ry',y(roundVal))
    .attr('width',graphH(value+roundVal))
    .attr('height',y(1))
    ;

  width = 100;
  x = d3.scale.linear().domain([0,1]).range([0,width]);
  chart.append("svg:text")
    .attr("transform", "translate(" + graphH(50+value) + "," + (10+y(.45)) + ")")
    .attr("text-anchor", "middle")
    .attr("class","percentdesc")
    .text(description)
    ;
  chart.append("svg:text")
    .attr("transform", "translate(" + graphH(50+value) + "," + (10+y(.95)) + ")")
    .attr("text-anchor", "middle")
    .attr("class","percenttext")
    .text(value +" "+ unit)
    ;
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

function drawTreeMap(foods,element,bo) {//{{{
/*

TreeMap:

Show a treemap with a cluster by food type (the clusters I made).
Each cluster can be sized in the following ways:
 - number of foods
 - contents = show counts for each type (nut, meat, etc)
 - nutrient type = show counts for each type by its nutrient type (fat, cholesteral, etc)

 Return list of button IDs we need
 */
	//var w = $(element).width();
	var w = 600;
  // TODO make dependent on screen size
	var h = 600;

  foodMap = makeFoodMap(foods);

	var treemap = d3.layout.treemap()
		.size([w, h])
    .sticky(true)
		.value(function(d) { return d[bo.id]; })
	;

  /*
  if ($(element +' div').length > 0) {
    console.log("already drew treemap");
    var update = d3.select(element).select('div')
      .data([foodMap]).selectAll('div')
      .data(treemap.nodes,function(d) { d.idx})
			.data(treemap.value(function(d) { return d[buttonOptions[1].id]; }))
    
    // TODO durations don't work.
    update.transition()
      .duration(1000)
      .call(cell)
      .text(function(d) { return d.children ? null : d.name; })
    ;

    update.exit()
      .transition()
      .duration(1000)
      .attr('x',0)
      .remove()
    ;

    update.enter()
      .append("div")
      .attr("class", function(d) { return "cell "+ d.cluster})
      .call(cell)
      .text(function(d) { return d.children ? null : d.name; })
      .transition()
      .duration(1000)
      .attr('x',300)
    ;

    return
  }
  */
  //console.log("BEFORE: "+ $(element).children().size());
  $(element).empty();
  //console.log("AFTER: "+ $(element).children().size());

	var div = d3.select(element).append("div")
		.style("position", "relative")
		.style("width", w + "px")
		.style("height", h + "px");

	div.data([foodMap]).selectAll("div")
    //.data(treemap.nodes,function(d) { d.idx})
    .data(treemap.nodes)
		.enter().append("div")
		.attr("class", function(d) { return "cell "+ d.cluster})
		.call(cell)
    .attr('id',function(d) { return 'treeMapPane-'+d.idx; })
		.html(function(d) { return d.children ? null : $.sprintf('<a id="treeMapLink-%s" class="treeMapLink" href="#">%s</a>',d.idx,d.name); })
	;
  $('.treeMapLink').click(function () {
    var idx=$(this).attr('id').split('-')[1];
    var parentId = 'treeMapPane-'+idx;
    $('.popover').fadeOut();
    if (lastPopup == parentId) {
      lastPopup = '';
      return false;
    }
    makeRanksPopup(foods,parentId);
    $('#'+parentId+'Popover').fadeIn();
    lastPopup = parentId;
    return false;
  });

  /*
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
  */
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
	var newfood = [];
  var idx = 0;
	for (k in food.ingredients) {
    food.ingredients[k].idx = idx++;
		newfood.push(food.ingredients[k])
	}
	food.ingredients = newfood;
	// same with the food detials, make it an array
	newfood = [];
	for (k in food.ingredientRanks) {
    if (!(food.ingredientRanks[k].IngredientCategory instanceof Array)) {
      if (food.ingredientRanks[k].IngredientCategory == '') {
        food.ingredientRanks[k].IngredientCategory = [];
      }
      else {
        food.ingredientRanks[k].IngredientCategory = [food.ingredientRanks[k].IngredientCategory];
      }
    }
		newfood.push(food.ingredientRanks[k]);
	}
	food.ingredientRanks = newfood;
	newfood = {};
	uniqueClusters = $.map(food.clusters, function(v) { return v.cluster }).unique();
	$.each(uniqueClusters, function(i,v) { newfood[v] = { cluster: v, children: [] } });
	for (k in food.clusters) { // look back over the old clusters, and match by their name.
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
		$.each(food.clusters,function(i,cluster) {
			//console.log("children = "+ JSON.stringify(cluster.children));
			$.each(cluster.children,function(i,child) {
				//console.log("c = "+ JSON.stringify(child) +" looking for "+ k.Description);
				if (k.Description == child.productName) {
					k.cluster = cluster.cluster;
				}
			});
		});
    k.buttonOptions = {}
    // TODO delete this
    /*
    $.each(buttonOptions,function(i,bo) {
      k.buttonOptions[bo.id] = 0;
      k.buttonOptions[bo.id] += bo.calc(k);
    });
    */
	});
	delete food.ingredientRanks;
	return food;
}//}}}

function makeFoodMap(foods) {
  uniqueClusters = [];
  $.each(foods,function(i,v) { uniqueClusters.push(v.cluster); });
  uniqueClusters = uniqueClusters.unique();
	foodMap = { name:'top', children: [] }
  $.each(uniqueClusters,function(i,k) {
		el = {};
		el.name = k;
		el.children = [];
		$.each(foods,function(i,food) {
      //console.log("looking "+ food.Description +" for "+ food.cluster +" ?= "+ k);
      if (food.cluster == k) {
        //console.log("f "+ food.Description +" = "+ k);
        ch = {
          idx: food.idx,
          cluster: k,
          name: food.Description,
        };
        $.each(buttonOptions,function(i,bo) {
          ch[bo.id] = countForFood(food,findOption(bo.id));
        });
        el.children.push(ch);
      }
		});
		foodMap.children.push(el);
	});
  return foodMap;
}

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

function reDomain(maxValue) {
  // fix any potential repeating rational numbers:
  var dy = Math.pow(10, Math.round(Math.log(maxValue) / Math.log(10)) - 1);
  return Math.ceil(maxValue / dy) * dy;
}

function checkBadNum(result) {
	if (isNaN(result) || result == '') {
		//console.log(printStackTrace().join('\n'));
		return 0;
	}
	if (result == Infinity) { return 100000; }
	if (result == -Infinity) { return -100000; }
	//return parseFloat(reDomain(result));
	return parseFloat(result);
}


var eaterMethods = {
	'default': function(eater) {
		foods = eater.toEat;
		return foods.shift()
	}
}

// Eater class - holds the state and specific strategy of an eater//{{{
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
	$.each(foods,function(i,v) { if (v.Description == foodName) { food = v; }});
	return food;
}

// given a list of foods, computer the calories * servings
function computeCount(foods,methodIndex) {
	cals = 0;
  //console.log("eater to eat = "+ foods.length);
  //console.log("starting with = "+ JSON.stringify(methodIndex));
  //console.log("eater to bopt = "+ JSON.stringify(method));
	$.each(foods,function(i,v) { cals += countForFood(v,methodIndex); });
	return cals;
}
function countForFood(food,methodIndex) {
  var method = buttonOptions[methodIndex];
  if (!(method.id in food.buttonOptions)) {
    food.buttonOptions[method.id] = 0;
    //console.log("looking into "+ JSON.stringify(method));
    food.buttonOptions[method.id] = method.calc(food);
  }
  return food.buttonOptions[method.id]; 
}

Eater.prototype.calsAte = function() {
	return computeCount(this.eaten,findOption('mapCaloriesPerPackage'));
}
Eater.prototype.calsDenied = function() {
	return computeCount(this.denied,findOption('mapCaloriesPerPackage'));
}
Eater.prototype.calsToEat = function() {
	return computeCount(this.toEat,findOption('mapCaloriesPerPackage'));
}//}}}
//}}}
// vim: set fdm=marker ai:
