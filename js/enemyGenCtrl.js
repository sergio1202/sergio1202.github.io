function d6() {
	return Math.floor(Math.random() * 6) + 1;
}


function getSpecies(species) {
	var findSpecies = function (value) {
		//console.log(this);
		//console.log(value.Species);
		return value.Species == this;
	};
	var roll = Number(d6() + "" + d6() + "" + d6());
	// console.log(roll);
	//var bot = species.filter(findSpecies, 'Bot (sentient)');
	//console.log(bot[0]);
	if(roll <= 116 ) {
		return species.filter(findSpecies, 'Bot (sentient)');
	} else if (roll >= 121 && roll <= 126) {
		// blootian
		return species.filter(findSpecies, 'Blootian')[0];
	}
	else if (roll >= 131 && roll <= 156) {
		// canosian
		return species.filter(findSpecies, 'Canosian')[0];
	}
	else if (roll >= 131 && roll <= 156) {
		// diplid
		return species.filter(findSpecies, 'Diploid')[0];
	}
	else if (roll >= 211 && roll <= 226) {
		// fungaloid
		return species.filter(findSpecies, 'Fungaloid')[0];
	}
	else if (roll >= 231 && roll <= 326) {
		// human
		return species.filter(findSpecies, 'Human')[0];
	}
	else if (roll >= 331 && roll <= 336) {
		// kerbite
		return species.filter(findSpecies, 'Kerbite')[0];
	}else if (roll >= 341 && roll <= 346) {
		// silicoid
		return species.filter(findSpecies, 'Silicoid')[0];
	}
	else if (roll >= 411 && roll <= 436) {
		// tentac
		return species.filter(findSpecies, 'Tentac')[0];
	}
	else if (roll >= 441 && roll <= 456) {
		// trundlian
		return species.filter(findSpecies, 'Trundlian')[0];
	}
	else if (roll >= 461 && roll <= 516) {
		// vomeg
		return species.filter(findSpecies, 'Vomeg')[0];
	}
	else if (roll >= 521 && roll <= 536) {
		// whistler
		return species.filter(findSpecies, 'Whistler')[0];
	}
	else if (roll >= 541 && roll <= 556) {
		// xoloxian
		return species.filter(findSpecies, 'Xeloxian')[0];
	}else if (roll >= 611 && roll <= 636) {
		// zoallan
		return species.filter(findSpecies, 'Zoallan')[0];
	}
	else if (roll == 641) {
		// chronosian
		return species.filter(findSpecies, 'Chronosian (Advanced)')[0];
	}
	else if (roll == 642) {

		// minutian
		return species.filter(findSpecies, 'Minutian (Advanced)')[0];
	}
	else if (roll == 643) {
		// pyreltian
		return species.filter(findSpecies, 'Pyreltian (Advanced)')[0];
	}
	else if (roll >= 644 && roll <= 645) {
		// whaleoud
		return species.filter(findSpecies, 'Whaloid (Advanced)')[0];
	}
	else if (roll == 646) {
		// avionoid
		return species.filter(findSpecies, 'Avianoid')[0];
	}
	else if (roll == 651) {
		// cheetahoid
		return species.filter(findSpecies, 'Cheetahoid')[0];
	}
	else if (roll == 652) {
		// chroc
		return species.filter(findSpecies, 'Crocodilian')[0];
	}
	else if (roll == 653) {
		// ele
		return species.filter(findSpecies, 'Elephantoid')[0];
	}
	else if (roll >= 654 && roll <= 655) {
		// meek
		return species.filter(findSpecies, 'Felinoids aka Meeks')[0];
	}
	else if (roll == 656) {
		// gorilla
		return species.filter(findSpecies, 'Gorilloids')[0];
	}
	else if (roll == 661) {
		// lup
		return species.filter(findSpecies, 'Lupinoids, Caninoids')[0];
	}
	else if (roll == 662) {
		// lapo
		return species.filter(findSpecies, 'Lapinoid')[0];
	}
	else if (roll == 663) {
		// rhion
		return species.filter(findSpecies, 'Rhinoceroid')[0];
	}
	else if (roll == 664) {
		// snake
		return species.filter(findSpecies, 'Reptilianoid (Snakoid)')[0];
	}
	else if (roll == 665) {
		// turtle
		return species.filter(findSpecies, 'Testudinoid (Turtloid)')[0];
	}
	else if (roll == 666) {
		// ursanoid
		return species.filter(findSpecies, 'Ursinoid')[0];
 	}
	else  {
		console.log("ERROR: " + roll);
	}
	//		SPECIES = [];
	//		SPECIES[1] = [1:"Bot (sentient)", 2:"Bot (sentient)",3:"Bot (sentient)",4:"Bot (sentient)",5:"Bot (sentient)",6:"Bot (sentient)"]; 
	return species[Math.floor(Math.random() * species.length)];
}

function getEquipment($scope, ath) {

	var equip = [];
	// Roll for equipment (pg 160 - 161)
	// If enemy can wear armor, add it and reduce athletics by 1 (
	// for purposes of rolling on equip tables)
	if(ath > 1 && $scope.selectedSpecies.WearsArmor == 'Y') {
		equip.push("Armor");
		ath--;
	}
		
	// If enemy has more than 3 hands and 3 athletics 
	// add shield and reduce athletics by 1
	var hands = $scope.selectedSpecies.Hands;
	if ((hands == "∞" || hands > 2) && ath > 2) {
		ath--;
		equip.push("Shield");
	}
	// Silicoids are special apparently, they get this stuff.
	if ($scope.selectedSpecies.Species =="Silicoid") {
		equip.push("Gun Butt");
		equip.push("Jet Pack");
	}
	
	// Roll on the athletics tables tables (page 161)
	for(var i = 0; i < ath; i++) {
		var roll = d6() + d6();
		// console.log("roll: " + roll);
		var athTable = $scope.ATH[i+1];
		if(!athTable) {
			athTable = $scope.ATH[4];
		
		}
		for(var j = 0; j < athTable[roll].length; j++) {
			var item = athTable[roll][j];
				equip.push(item);
			
		}
	}

	return equip;
}
function getEnemy($scope, prof, stats, baseEquip) {
	
	var prim = stats[1];
	var sec = stats[2];
	var carry = stats[0] * 10;
	var ath = stats[0];
	
	// Profession Kits
	MARINE_KITS = ["Vibraknife","MedKit","JetPack","EVA","WristComp"]
	SCI_KITS = ["MedKit","JetPack","ToolKit","EVA","WristComp"]
	ENG_KITS = ["ToolKit","JetPack","MedKit","EVA","WristComp"]
	PILOT_KITS = ["JetPack",",ToolKit","MedKit","EVA","WristComp"]
	GRENADES = ["Frag Grenade", "Energy Grenade", "EMP Grenade", "Stun Grenade", "Fritzer Grenade"]
	switch(prof) {
			case("Marine"):
				chip = "Combat Skill Chip";
				kit = MARINE_KITS;
			break;
			case("Engineer"):
				chip =  "Engineering Skill Chip";
				kit = ENG_KITS;
			break;
			case("Pilot"):
				chip = "Piloting Skill Chip";
				kit = PILOT_KITS;
			break;
			case("Scientist"):
				chip = "Science Skill Chip";
				kit = SCI_KITS;
			break;
		}
		var kitCount = 0;
	var equip = [];
	// Roll on the athletics tables tables (page 161)
	for(var i = 0; i < baseEquip.length; i++) {
		var item = baseEquip[i];
		// Convert Pro Chips to profession chips
		if(item == "Pro Chip") {
			equip.push(chip);
		} else if(item == "Kit") {
			//console.log("kit: " + kitCount);
			if(kitCount < 3) {
				equip.push(kit[kitCount]);
			} else if(kitCount == 3) {
				equip.push(kit[3]);
				equip.push(kit[4]);
			} else {
				equip.push(GRENADES[Math.floor(Math.random() * GRENADES.length)]);
			}
			kitCount++;
		} else if(item == "g") {
			equip.push(GRENADES[Math.floor(Math.random() * GRENADES.length)]);
		} else if(item == "gg") {
			equip.push(GRENADES[Math.floor(Math.random() * GRENADES.length)]);
			equip.push(GRENADES[Math.floor(Math.random() * GRENADES.length)]);
		
		} else if(item == "ggg") {
			equip.push(GRENADES[Math.floor(Math.random() * GRENADES.length)]);
			equip.push(GRENADES[Math.floor(Math.random() * GRENADES.length)]);
			equip.push(GRENADES[Math.floor(Math.random() * GRENADES.length)]);
		
		} else if(item == "gggg") {
			equip.push(GRENADES[Math.floor(Math.random() * GRENADES.length)]);
			equip.push(GRENADES[Math.floor(Math.random() * GRENADES.length)]);
			equip.push(GRENADES[Math.floor(Math.random() * GRENADES.length)]);
			equip.push(GRENADES[Math.floor(Math.random() * GRENADES.length)]);
		}
		else {
			equip.push(item);
		}
	}

		// Convert Kits to profession items
/*
	

		// Niche case where no MedKit occurs (pg 161)
		if prof=="Scientist" and "MedKit" not in equip:
			equip.append("MedKit")
			if "Ion Bore" in equip:
				equip[equip.index("Ion Bore")]="Blaster"
			elif "Disintegrator" in equip:
				equip[equip.index("Disintegrator")]="Blaster"
			elif "Voltrex" in equip:
				equip[equip.index("Voltrex")]="Blaster"
			elif "Plasma Pistol" in equip:
				equip[equip.index("Plasma Pistol")]="Blaster"
			*/
				// console.log(equip);
	return {profession: prof, 
				athletics: stats[0],
				combat: (prof == "Marine" ? prim : sec),
				engineering:(prof == "Engineer" ? prim : sec),
				piloting:(prof == "Pilot" ? prim : sec),
				science:(prof == "Scientist" ? prim : sec),
				gear: equip
			};
}

app.controller('enemyGenCtrl', function ($scope,	$http) {
	//Globals
	// Mission Difficulty Tables
	$scope.MD = {};
	$scope.MD[0] = {2:[1,2,0], 3:[1,2,0], 4:[1,2,0], 5:[1,2,0], 6:[1,2,0], 7:[1,2,0], 8:[1,2,0], 9:[1,2,0], 10:[1,2,0], 11:[1,2,0], 12:[1,2,0]};
	$scope.MD[1] = {2:[1,2,1], 3:[1,2,1], 4:[1,2,1], 5:[1,3,0], 6:[1,3,0], 7:[1,3,0], 8:[1,3,0], 9:[2,2,0], 10:[2,2,0],11:[2,2,0], 12:[2,2,0]};
	$scope.MD[2] = {2:[1,3,1], 3:[1,2,2], 4:[2,3,1], 5:[1,4,1], 6:[1,3,2], 7:[2,4,1], 8:[2,3,2], 9:[1,4,2], 10:[1,5,1],11:[3,4,1], 12:[2,4,2]};
	$scope.MD[3] = {2:[2,5,1], 3:[2,3,3], 4:[1,5,2], 5:[3,4,2], 6:[1,4,3], 7:[3,5,1], 8:[1,6,1], 9:[2,5,2], 10:[2,4,3],11:[2,6,1], 12:[3,5,2]};
	$scope.MD[4] = {2:[2,4,4], 3:[1,6,3], 4:[1,5,4], 5:[4,6,1], 6:[3,6,2], 7:[3,5,3], 8:[2,6,3], 9:[3,7,1], 10:[3,4,4],11:[2,7,2], 12:[4,6,2]};
	$scope.MD[5] = {2:[4,5,3], 3:[1,7,3], 4:[3,6,3], 5:[4,7,1], 6:[2,5,4], 7:[2,8,1], 8:[2,7,3], 9:[4,6,3], 10:[2,6,4],11:[4,7,2], 12:[2,8,2]};
	$scope.MD[6] = {2:[4,5,4], 3:[3,7,3], 4:[3,6,4], 5:[1,9,1], 6:[3,8,2], 7:[4,8,1], 8:[1,7,4], 9:[2,9,1], 10:[2,8,3],11:[2,7,4], 12:[4,6,4]};
	$scope.MD[7] = {2:[4,8,2], 3:[3,9,1], 4:[2,6,5], 5:[3,7,4], 6:[4,9,1], 7:[4,7,4], 8:[1,7,5], 9:[2,9,3], 10:[4,6,5],11:[3,8,4], 12:[3,7,5]};
	$scope.MD[8] = {2:[1,8,5], 3:[4,7,5], 4:[3,8,5], 5:[2,7,6], 6:[4,9,4], 7:[4,8,5], 8:[2,9,5], 9:[4,7,6], 10:[3,8,6],11:[1,9,6], 12:[3,9,6]};
	$scope.MD[9] = {2:[2,8,7], 3:[4,9,6], 4:[3,8,7], 5:[4,8,7], 6:[2,9,7], 7:[3,8,8], 8:[4,8,8], 9:[5,8,7], 10:[4,9,7],11:[5,8,8], 12:[2,9,8]};
	$scope.MD[10] = {2:[3,9,8], 3:[3,9,9], 4:[4,9,8], 5:[4,9,9], 6:[5,9,7], 7:[5,9,8], 8:[5,9,9], 9:[6,9,6], 10:[6,9,7],11:[6,9,8], 12:[6,9,9]};

	// Athletics Tables
	$scope.ATH = {};
	$scope.ATH[1] = {2:["Sonic Beam","Kit","g"],3:["Needler","Kit"],4:["Slug Gun","Kit"],5:["Ion Bore","g"],
	6:["Disintegrator","Scope"],7:["Blaster","Kit","g"],8:["Laser", "Kit"],
	9:["Nerve Disruptor","Kit"],10:["Particle Gun","Kit"],11:["Voltrex"],12:["Plasma Pistol","gggg"]}

	$scope.ATH[2] = {2:["Knife","Stun","Kit"],3:["Sword","ggg"],4:["Kit","Flyntlock","Flyntlock","EMP grenade"],
	5:["VibraKnife","Kit","g"],6:["Phase Pick"],7:["Gun Butt","Kit","g"],8:["Energy Blade","gg"],
	9:["Plasma Dagger","Kit"],10:["Arc Laser","ggg"],11:["EMP pistol"],12:["Lightning Rod","Kit"]}

	$scope.ATH[3] = {2:["MedJack","Aggro","Charme","Detox ","Dull","Equilout","FlyBoy","Numb ","Patches ","Roid","Stim","StunGone ","SupSci","TecKnow"],
	3:["Skeletal Enhancement","Slug Machine Gun"],4:["Cyberfoot","Pro Chip"],
	5:["Cybergyros"],6:["Cyberhand", "Pro Chip"],7:["Autonurse","Pro Chip","gg"],
	8:["Athletics Skill Chip", "Combat Skill Chip", "Science Skill Chip", "Engineering Skill Chip", "Piloting Skill Chip", "MagBoots"],
	9:["Cyberhook","Pro Chip"],10:["Kit","Pro Chip","Satchel Charge"],11:["Skeletal Enhancement","Plasma Projector"],12:["Gun Butt","Kit"]}

	$scope.ATH[4] = {2:["Kit","Kit"],3:["Kit","Kit"],4:["Kit","Kit"],5:["Kit","Kit"],6:["Kit","Kit"],7:["Kit","Kit"],
	8:["Kit","Kit"],9:["Kit","Kit"],10:["Kit","Kit"],11:["Kit","Kit"],12:["Kit","Kit"]}

	CORE_PROFESSIONS = ["Marine", "Scientist", "Engineer", "Pilot"]
	EXTRA_PROFESSIONS = ["Athlete", "Diplomat", "Psychic", "Psychiatrist"]

	
	// intialize variables

	$scope.md = 1; 
	$scope.playerCount = 4;
	$scope.enemies = null;
	$scope.hitPoints = null;
	
    $scope.species = $http.get('http://sergio1202.github.io/js/species.json').success(function(data) {
		$scope.species = data;
    });

    $scope.equipment = $http.get('http://sergio1202.github.io/js/equipment.json').success(function(data) {
		$scope.equipment = data;
    });

    $scope.specialAbilities = $http.get('http://sergio1202.github.io/js/specialAbilities.json').success(function(data) {
		$scope.specialAbilities = data;
    });

	// functions 
	
	$scope.generateEnemy= function ()  {
		var roll = d6() + d6();
		// console.log("roll: " + roll);
		var stats = $scope.MD[$scope.md][roll];
		// console.log(stats);
		var playerCount = $scope.playerCount;
		md = $scope.md;
		if($scope.selectedSpecies == null) {
			$scope.selectedSpecies = getSpecies($scope.species);
		}
		// console.log("generate enemy, md: " + md + " species: " + $scope.selectedSpecies.Species);
		// console.log($scope.selectedSpecies);
		var equip = getEquipment($scope, stats[0]);
		$scope.hitPoints = Number(stats[0]) + Number($scope.selectedSpecies.BaseHitPoints) + md;
		var profs = CORE_PROFESSIONS.slice(0);;
		var enemies = [];
		// console.log(profs);
		for(var i = 0; i < playerCount; i++) {
			if( profs.length == 0) {
				 profs = CORE_PROFESSIONS.slice(0);;
			}
			var index = Math.floor(Math.random() * profs.length);
			var prof = profs[index];
			enemies.push(getEnemy($scope, prof, stats, equip));
			profs.splice(index, 1);
		}
		$scope.enemies = enemies;
		
	};
	// end enemy gen

});