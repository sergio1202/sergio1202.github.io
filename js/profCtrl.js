app.controller('profCtrl', function ($scope,	$http) {
	$scope.saved = JSON.parse(localStorage.getItem('char'));
	$scope.name;
	$scope.rank = 1;
    $scope.professions = ['Marine', 'Engineer', 'Pilot', 'Scientist'];
	
	$scope.baseHp = 0;
	$scope.hp = $scope.athletics + $scope.rank + $scope.baseHp;
	$scope.luck = $scope.rank + 5;
	$scope.carry = $scope.athletics * 10; 
	$scope.selectedSpecies = null;
	$scope.TotalMass = 0;
	
	$scope.rankChange = function() {
		if($scope.selectedSpecies) {
			$scope.baseHp = Number($scope.selectedSpecies.BaseHitPoints);
		}
		var athletics = ($scope.stats && $scope.stats[0]) ? $scope.stats[0]['Value'] : 0; // ATHLETICS should be first stat
		$scope.luck = $scope.rank + 5;
		$scope.carry = athletics * 10;
		$scope.hp = athletics + $scope.rank + $scope.baseHp;
	};
	$scope.rankChange();
	
	$scope.statNames = ['ATHLETICS', 'COMBAT', 'ENGINEERING', 'PILOTING', 'SCIENCE', '', ''];
	$scope.stats = [];
	$.each($scope.statNames, function( index, value ) {
        $scope.stats.push({
            Name: value,
            Value: (value == '' ? '' : 0), 
            Mod: '',
			Note: ''
        });
    });
	
	$scope.statChange = function () {
		$scope.rankChange();
	};
	
	$scope.itemInfo = '';
	$scope.itemEffect = '';
	$scope.itemChange = function() {
		var item =  $scope.selectedItem;
		if(!item || !item.Effect) {
			$scope.itemInfo = "";
			return false;
		}
		if(!item.Mass) item.Mass = 1;
		$scope.itemInfo = 'Cost: ' + item.Cost;
		if(item.Mass) $scope.itemInfo += ', Mass: ' + item.Mass; 
		if(item.Req) $scope.itemInfo += ', Rq#: ' + item.Req;
		if(item.Energized) $scope.itemInfo += ', Energized: ' + item.Energized;
		$scope.itemEffect = 'Effect: ' + item.Effect
		//console.log(item);
	};


    $scope.species = $http.get('http://sergio1202.github.io/js/species.json').success(function(data) {
		$scope.species = data;
    });

    $scope.equipment = $http.get('http://sergio1202.github.io/js/equipment.json').success(function(data) {
		$scope.equipment = data;
    });

    $scope.specialAbilities = $http.get('http://sergio1202.github.io/js/specialAbilities.json').success(function(data) {
		$scope.specialAbilities = data;
    });
	
	$scope.items = [];
    for (var i = 1; i < 17; i++) {
        $scope.items.push({
            name: '',
            mass: '', 
            notes: '',
			status: ''
        });
    }
	
	$scope.abilities = [];
    for (var i = 1; i < 18; i++) {
        $scope.abilities.push({
            name: '',
            notes: '', 
            pool: '',
			used: ''
        });
    }
	
	
	if($scope.saved != null) {
		$scope.names = Object.keys($scope.saved);
	}
	
	$scope.updateMass = function() {
		$scope.TotalMass = 0;
		$.each($scope.items, function(index, value) {
			$scope.TotalMass += value.mass;
		});
	};

	$scope.saveCharacter = function() {
		if(!$scope.name) {
			alert("missing name");
			return;
		}
		//console.log("name: " + $scope.name);
		console.log(".." + $scope.items.length);
		if($scope.items.length > 16) {
			$scope.items.splice(16, 1);
			console.log("--" + $scope.items.length);

		}
		var stats = {};
		stats["name"] = $scope.name;
		stats["rank"] = $scope.rank;
		stats["profession"] = $scope.selectedProfession;
		stats["athletics"] = $scope.athletics;
		stats["combat"] = $scope.combat;
		stats["engineering"] = $scope.engineering;
		stats["piloting"] = $scope.piloting;
		stats["science"] = $scope.science;
		stats["misc1"] = $scope.misc1;
		stats["misc2"] = $scope.misc2;
		stats['selectedSpecies'] = $scope.selectedSpecies;
		stats['notes'] = $scope.notes;
		stats['abilities'] = $scope.abilities;
		stats['items'] = $scope.items;
		stats['stats'] = $scope.stats;
		if(!$scope.saved) $scope.saved = {};
		$scope.saved[$scope.name] = stats;
		localStorage.setItem('char', JSON.stringify($scope.saved));
		console.log("saving");
		console.log($scope.saved);
		//$scope.saved = JSON.parse(localStorage.getItem('char'));

		$scope.names = Object.keys($scope.saved);
	};
	$scope.loadCharacter = function() {
		//console.log($scope.loadName);
		var name = $scope.loadName;
		if(name) {
			console.log("loading:");
			console.log($scope.saved);
			$scope.name = $scope.saved[name]['name'];
			$scope.selectedProfession = $scope.saved[name]['profession'];
			$scope.rank = $scope.saved[name]['rank'];
			$scope.selectedSpecies = $scope.saved[name]['selectedSpecies'];
			$scope.notes = $scope.saved[name]['notes'];
			$scope.stats = $scope.saved[name]['stats'];
			if($scope.saved[name]['abilities']) $scope.abilities = $scope.saved[name]['abilities'];
			if($scope.saved[name]['items']) $scope.items = $scope.saved[name]['items'];
			if(!$scope.stats) {
				// var statValues = ['ATHLETICS', 'COMBAT', 'ENGINEERING', 'PILOTING', '', ''];
				var statValues = [$scope.saved[name]['athletics'], $scope.saved[name]['combat'], $scope.saved[name]['engineering'], $scope.piloting = $scope.saved[name]['piloting'],
					$scope.saved[name]['science'], $scope.saved[name]['misc1'], $scope.saved[name]['misc2']];
				
				$scope.stats = [];
				$.each($scope.statNames, function( index, value ) {
					$scope.stats.push({
						Name: value,
						Value: (value == '' && statValues[index] == 0 ? '' : statValues[index]), 
						Mod: '',
						Note: ''
					});
				});
			}
			$scope.updateMass();
		}
	};
	
	$scope.addItem = function () {
		var added = false;
		$.each($scope.items, function( index, value ) {
			var item = $scope.selectedItem;
			if(!item) {
				alert("select an item");
				console.log("no item selected");
				return false;
			}
			//console.log($scope.selectedItem);
			if(!value.name && !added) {
				added = true;
				//console.log( "adding to " + index + ", " + value.Name );
				$scope.items[index].name = item.Name;
				$scope.items[index].mass = Number(item.Mass);
				
				//console.log($scope.items[index]);
				return false;
			}
		});
		$scope.updateMass();
	};
	
	$scope.addAbility = function () {
		var added = false;
		$.each($scope.abilities, function( index, value ) {
			var ability = $scope.selectedAbility;
			if(!ability) {
				alert("select an ability");
				console.log("no ability selected");
				return false;
			}
			//console.log($scope.selectedItem);
			if(!value.name && !added) {
				added = true;
				//console.log( "adding to " + index + ", " + value.Name );
				$scope.abilities[index].name = ability.Name;
				$scope.abilities[index].notes = ability.Pool;
				
				//console.log($scope.items[index]);
				return false;
			}
			console.log(  index );
		});
	};
	


});