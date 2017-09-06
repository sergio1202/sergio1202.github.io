var app = angular.module("profApp", []);

app.filter('range', function() {
  return function(input, min, max) {
    min = parseInt(min); //Make string input int
    max = parseInt(max);
	//console.log("min: " + min);
    for (var i=min; i<=max; i++) {
      input.push(i);
	}
	//console.log(input);
    return input;
  };
});