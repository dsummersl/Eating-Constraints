describe 'Util.js - utils'
	before_each
        foods = {}
        foods.ingredients = {}
        foods.ingredients.row0 = { Description: 'Food with nuts' }
        foods.ingredients.row1 = { Description: 'Nuts' }
        foods.ingredients.row2 = { Description: 'Bolts' }
        foods.ingredientRanks = {}
        foods.ingredientRanks.row0 = {
            Description: 'Food with nuts',
            IngredientCategory: ['Eggs','Nuts']
        }
        foods.ingredientRanks.row1 = {
            Description: 'Nuts',
            IngredientCategory: 'Eggs'
        }
        foods.ingredientRanks.row2 = {
            Description: 'Nuts',
            IngredientCategory: ''
        }
        foods.ingredientRanks.row3 = {
            Description: 'Nuts',
            IngredientCategory: ''
        }
        foods.ingredientRanks.row4 = {
            Description: 'Nuttyness',
            IngredientCategory: ['Eggs','Nuts']
        }
        foods.clusters = {
            row0: {
                cluster: 'cluster0',
                productName: 'Food with nuts'
            },
            row1: {
                cluster: 'cluster0',
                productName: 'Nuts'
            },
            row2: {
                cluster: 'cluster1',
                productName: 'Bolts'
            },
            row3: {
                cluster: 'cluster1',
                productName: 'Nuttyness'
            }
        }
    end

    it 'combineIngredientsAndRanks function'
        result = combineIngredientsAndRanks(foods)
        result.ingredients.length.should.eql 3
        result.ingredients.filter(function (v,i,a) { return v.Description == 'Food with nuts' }).length.should.eql 1
        result.ingredients.filter(function (v,i,a) { return v.Description == 'Food with nuts' })[0].Categories.should.eql ['Eggs','Nuts']
        result.ingredients.filter(function (v,i,a) { return v.Description == 'Food with nuts' })[0].cluster.should.eql 'cluster0'
        result.ingredients.filter(function (v,i,a) { return v.Description == 'Food with nuts' })[0].idx.should.eql 0
        result.ingredients.filter(function (v,i,a) { return v.Description == 'Nuts' })[0].Ranks.length.should.eql 3
        result.ingredients.filter(function (v,i,a) { return v.Description == 'Nuts' })[0].Categories.should.eql ['Eggs']
        result.ingredients.filter(function (v,i,a) { return v.Description == 'Nuts' })[0].cluster.should.eql 'cluster0'
        result.ingredients.filter(function (v,i,a) { return v.Description == 'Nuts' })[0].idx.should.eql 1
        result.ingredients.filter(function (v,i,a) { return v.Description == 'Nuts' })[0].Ranks[0].IngredientCategory.should.eql ['Eggs']
        result.ingredients.filter(function (v,i,a) { return v.Description == 'Nuts' })[0].Ranks[1].IngredientCategory.should.eql []
        result.ingredients.filter(function (v,i,a) { return v.Description == 'Bolts' })[0].Ranks.length.should.eql 0
        result.ingredients.filter(function (v,i,a) { return v.Description == 'Bolts' })[0].cluster.should.eql 'cluster1'
        result.ingredients.filter(function (v,i,a) { return v.Description == 'Bolts' })[0].idx.should.eql 2
        result.ingredients.filter(function (v,i,a) { return v.Description == 'Food with nuts' })[0].Categories.should.eql ['Eggs','Nuts']
        result.ingredients.filter(function (v,i,a) { return v.Description == 'Food with nuts' })[0].Ranks[0].IngredientCategory.should.eql ['Eggs','Nuts']

        result.clusters.cluster0.children.length.should.eql 2
        result.clusters.cluster1.children.length.should.eql 2
    end

    it 'makeFoodMap function'
        result = combineIngredientsAndRanks(foods)
        foodMap = makeFoodMap(result.ingredients)
        foodMap.children.length.should.eql 2
        foodMap.children[0].name.should.eql 'cluster0'
        foodMap.children[1].name.should.eql 'cluster1'
    end

    it 'findOption function'
        findOption('mapCaloriesPerPackage').should.eql 15
    end
end

describe 'Util.js - Eater'
	before_each
		//appendTo = $(fixture('appendable.html'))
        foods = [{
            Description: 'Food with nuts',
            'Servings Per Container': 3,
            Calories: 200,
            Ranks: [{
                    Description: 'Food with nuts',
                    IngredientCategory: ['Eggs','Nuts']
                }],
            Categories: ['Eggs','Nuts'],
            buttonOptions: {}
        }, {
            Description: 'Licorice',
            'Servings Per Container': 3,
            Calories: 400,
            Ranks: [{
                Description: 'Licorice',
                IngredientCategory: ['Salt','Spice','Sugar','Coloring']
                }],
            Categories: ['Salt','Spice','Sugar','Coloring'],
            buttonOptions: {}
        }]
	end

    it 'a blank make a constructor'
        eater = new Eater('Test Eater',[],[])
        nofoods = []
        eater.setupFoodStore(nofoods)
        eater.eaten.length.should.eql 0
        eater.toEat.length.should.eql 0
        eater.denied.length.should.eql 0
    end

    it 'a basic meal'
        eater = new Eater('Test Eater',[],[])
        eater.setupFoodStore(foods)
        eater.eaten.length.should.eql 0
        eater.denied.length.should.eql 0
        eater.toEat.length.should.eql 2
        meal = eater.eat()
        meal.length.should.eql 2
        meal.filter(function (v) { return v.Description == 'Food with nuts' }).length.should.eql 1
        eater.eaten.length.should.eql 2
        eater.toEat.length.should.eql 0
        meal = eater.eat()
        meal.length.should.eql 0
        computeCount(eater.eatingSessions[0],findOption('mapCaloriesPerPackage')).should.eql 1800
        computeCount(eater.eatingSessions[1],findOption('mapCaloriesPerPackage')).should.eql 0
        eater.calsAte().should.eql 1800
        eater.calsDenied().should.eql 0
        eater.calsToEat().should.eql 0
    end

    it 'no nuts please'
        eater = new Eater('Test Eater',['Nuts'],[])
        eater.setupFoodStore(foods)
        eater.eaten.length.should.eql 0
        eater.toEat.length.should.eql 1
        eater.denied.length.should.eql 1
        meal = eater.eat()
        meal.length.should.eql 1
        meal[0].should.have_property 'Description','Licorice'
        eater.eaten.length.should.eql 1
        eater.toEat.length.should.eql 0
        meal = eater.eat()
        meal.length.should.eql 0
        eater.calsAte().should.eql 1200
        eater.calsDenied().should.eql 600
        eater.calsToEat().should.eql 0
    end
end

/*
describe 'GUI Things: '
	before_each
		appendTo = $(fixture('appendable'))
		len = calendars.length;
	end

  describe 'the makeList function'
		it 'show all calendars when none are excluded'
			makeList(appendTo,'named');
			appendTo.should.have_tag 'ul'
			for (var i=0; i<len; i++) {
				appendTo.find('option[value='+ calendars[i] +']').should.have_tag "<option>"
			}
    end

		it 'show all but excluded calendars'
			makeList(appendTo,'named','julian');
			appendTo.should.have_tag 'ul'
			for (var i=0; i<len; i++) {
				if (calendars[i] != 'julian') {
					appendTo.find('option[value='+ calendars[i] +']').should.have_tag "<option>"
				}
				else {
					appendTo.find('option[value='+ calendars[i] +']').length.should.eql 0
				}
			}
		end
  end
end


describe 'Dates: '
	describe 'to human readable types'
		it 'check hebrew'
			implementations['hebrew'].toHTML({year:2010, month:10, day:24}).should.eql "<li>5771, Heshvan 16</li>"
			implementations['hebrew'].toHTML({year:-1238, month:2, day:6}).should.eql "<li>2522, Adar I 16</li>"
		end
	end
end
*/
