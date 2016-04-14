app.controller('profCtrl', function ($scope,	$http) {
	$scope.saved = JSON.parse(localStorage.getItem('char'));
	$scope.name;
	$scope.rank = 1;
    $scope.professions = ['Marine', 'Engineer', 'Pilot', 'Scientist'];
	$scope.athletics = 1;
	$scope.combat = 0;
	$scope.engineering = 0;
	$scope.piloting = 0;
	$scope.science = 0;
	$scope.misc1 = 0;
	$scope.misc2 = 0;
	
	$scope.baseHp = 0;
	$scope.hp = $scope.athletics + $scope.rank + $scope.baseHp;
	$scope.luck = $scope.rank + 5;
	$scope.carry = $scope.athletics * 10; 
	$scope.selectedSpecies = null;
	
	$scope.rankChange = function() {
		if($scope.selectedSpecies) {
			$scope.baseHp = Number($scope.selectedSpecies.BaseHitPoints);
		}
		$scope.luck = $scope.rank + 5;
		$scope.carry = $scope.athletics * 10;
		$scope.hp = $scope.athletics + $scope.rank + $scope.baseHp;
	};
	$scope.rankChange();
	
	$scope.statChange = function () {
		$scope.rankChange();
	};
	


    $scope.species = 
	$http.get('http://sergio1202.github.io/js/species.json').success(function(data) {
		$scope.species = data;
    });
	//console.log(JSON.stringify($scope.species));
	
	if($scope.saved != null) {
		$scope.names = Object.keys($scope.saved);
	}

	$scope.saveCharacter = function() {
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
		if(!$scope.saved) $scope.saved = {};
		$scope.saved[$scope.name] = stats;
		localStorage.setItem('char', JSON.stringify($scope.saved));
		console.log($scope.saved);
		//$scope.saved = JSON.parse(localStorage.getItem('char'));

		$scope.names = Object.keys($scope.saved);
	};
	$scope.loadCharacter = function() {
		console.log($scope.loadName);
		var name = $scope.loadName;
		if(name) {
			$scope.name = $scope.saved[name]['name'];
			$scope.selectedProfession = $scope.saved[name]['profession'];
			$scope.rank = $scope.saved[name]['rank'];
			$scope.athletics = $scope.saved[name]['athletics'];
			$scope.combat = $scope.saved[name]['combat'];
			$scope.engineering = $scope.saved[name]['engineering'];
			$scope.piloting = $scope.saved[name]['piloting'];
			$scope.science = $scope.saved[name]['science'];
			$scope.misc1 = $scope.saved[name]['misc1'];
			$scope.misc2 = $scope.saved[name]['misc2'];
			$scope.selectedSpecies = $scope.saved[name]['selectedSpecies'];
			$scope.notes = $scope.saved[name]['notes'];
		}
	};
	


});