// graph functions//{{{
//
buttonOptions = [
	{ name: 'Calories/Package', id:'mapCaloriesPerPackage', calc: function(f) { return f['Servings Per Container']*f.Calories}},
	{ name: 'Calories/Serving', id:'mapCaloriesPerServing', calc: function(f) { return f.Calories}},
	{ name: 'Servings/Container', id:'mapServings', calc: function(f) { return f['Servings Per Container']}},
];

function drawFoodOverviewLitmus(eater,element) { //{{{
	/*
	 Draws a litmus bar showing categories that the eater can eat, and what they can't
	*/
	var height = 50
	var litmusWidth = computeCalorieCount(eater.eaten);
	litmusWidth += computeCalorieCount(eater.toEat);
	litmusWidth += computeCalorieCount(eater.denied);

	var widths = d3.scale.linear().domain([0,litmusWidth]).range([0,$(element).width()]);
	var heights = d3.scale.linear().domain([0,1]).range([0,50]);

	var vis = d3.select(element)
		.append("svg:svg")
		.attr("width", $(element).width())
		.attr("height", height)
	;
	var xOffset=0;
	$.each(eater.eatingSessions,function (i,v) {
		v.boxWidth = computeCalorieCount(v);
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
		vis.selectAll(element +" ."+ v.cluster)
			.data(d3.values(v))
			.enter()
			.append("svg:rect")
			.attr('class',function(d) { return d.foodCat +" "+ d.cluster})
			.attr('x', function(d) { return widths(computeXOffset([edible,inedible],d)) })
			.attr('y', heights(.05))
			.attr('width',function(d) {return widths(computeFoodClusterWidth(d))})
			.attr('height',heights(.5))
		;
	});
	return vis;
}//}}}

function computeFoodClusterWidth(cluster) {
	var width = 0;
	$.each(cluster.foods,function(i,v) {
		width += v['Servings Per Container'] * v.Calories;
	});
	return width;
}
function computeXOffset(parts,cluster) {
	var xOffset = 0;
	$.each(parts,function(i,v) {
		$.map(v,function (v) {
			if (v.index < cluster.index) {
				xOffset += computeFoodClusterWidth(v);
			}
		});
	});
	return xOffset;
}

function drawLitmusForEater(eater,element) {//{{{
	/*
	 Draws a litmus bar showing what the customer 'would' eat and then what they can't eat, 
	 and what they have eaten.
	*/
	var height = 50
	var litmusWidth = computeCalorieCount(eater.eaten);
	litmusWidth += computeCalorieCount(eater.toEat);
	litmusWidth += computeCalorieCount(eater.denied);

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
		v.boxWidth = computeCalorieCount(v);
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
		/*
		$.each(buttonOptions,function(i,bo) {
			el[bo.id] = 0;
			$.each(food.clusters[k].children,function(i,v) {
				//console.log("looking for "+ v.productName)
				var f = findFoodFromFoodName(food,v.productName);
				el[bo.id] += bo.calc(f);
			});
		});
		*/
		foodMap.children.push(el);
	}

	var w = 600;
	var h = 400;

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
		d3.select("#"+ bo.id).on("click", function() {
			div.selectAll("div")
				.data(treemap.value(function(d) { return d[bo.id]; }))
				.transition()
				.duration(1000)
				.call(cell)
				.text(function(d) { return d.children ? null : d.name; })
			;

			$.each(buttonOptions,function(i,bo2) { // disable everybody but my id.
				d3.select("#"+ bo2.id).classed("active", bo2.id == bo.id);
			});
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
		$('#eatingFood').dialog();
		$('#eatingFood').dialog('open');
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
		$('#eatingFood').dialog('close')
	} catch(e) {
		console.log(printStackTrace({e:e}).join('\n'));
		console.trace();
		alert(e)
	}
	return false
}//<!--}}}-->

function startupWithData(onstarted) { //<!--{{{-->
	$('#startupLoading').dialog()
	$('#startupLoading').dialog('open')
	$.getJSON('testdata/ingredients.json', function(d) {
		food['ingredients'] = d
	})
	$.getJSON('testdata/ingredientRanks.json', function(d) {
		food['ingredientRanks'] = d
	})
	$.getJSON('testdata/calorieclusters.json', function(d) {
		food['clusters'] = d
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
		$('#startupLoading').dialog('close')
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
function computeCalorieCount(foods) {
	cals = 0;
	$.each(foods,function(i,v) { cals += v['Servings Per Container'] * v.Calories; });
	return cals;
}
Eater.prototype.calsAte = function() {
	return computeCalorieCount(this.eaten);
}
Eater.prototype.calsDenied = function() {
	return computeCalorieCount(this.denied);
}
Eater.prototype.calsToEat = function() {
	return computeCalorieCount(this.toEat);
}
//}}}
// vim: set fdm=marker ai:
