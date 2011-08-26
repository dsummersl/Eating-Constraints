
function drawLitmus(eater,element) {
	// TODO generate the data points and widths
	// draw a line underneath...so the entire area of the box equals the total serving size of the container
}

function combineIngredientsAndRanks(food) {
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
	$.each(food.ingredients,function(i,k) {
		//console.log("look in key = "+ k.Description);
		var matches = food.ingredientRanks.filter(function(v) { return v.Description == k.Description });
		var justRanks = $.map(matches, function(v) { return v.IngredientCategory }).filter(function(v) { return v != ''}).unique().sort()
		//console.log($.sprintf("%30s = %s",k.Description,JSON.stringify(matches)));
		k.Ranks = matches;
		k.Categories = justRanks;
	});
	delete food.ingredientRanks;
	return food;
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
}

var eaterMethods = {
	'default': function(foods) {
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
	this.eaten = [];
	this.denied = [];
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
		var f = this.pickFood(this.toEat);
		if (f) {
			this.eaten.push(f);
			ate.push(f);
			calsAte += f['Servings Per Container'] * f.Calories;
			console.log($.sprintf("Ate up to %6d calories for %s",calsAte,f.Description));
		}
		else {
			break;
		}
	}
	return ate;
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
