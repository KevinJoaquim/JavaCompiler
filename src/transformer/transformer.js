module.exports = ast => {
	var rapport = [] ;
	var expressions = ast.body;
	
	//add rapport note of expressions;
	while (expressions.length > 0) {
		var note = 5;
		var etat = "ok";
		var current_expression = expressions.shift();
		switch(current_expression.type){
			case 'variableDeclatationExpression':
				if(current_expression.value.substr(0,1).toUpperCase()===current_expression.value.substr(0,1)){
					note = note - 1;
					etat = "VariableIntExpression " + current_expression.value + " débute avec une majuscule";
				}else if(current_expression.value.substr(0,current_expression.value.length).toUpperCase()===current_expression.value.substr(0,current_expression.value.length)){
					note = note - 1;
					etat = "VariableIntExpression " + current_expression.value + " contient une majuscule";
				}
				break;

			case 'VariableAssignationExpression':
				if(current_expression.value === ""){
					etat = "il n'y a pas de valeur après l'equal ";
					note = note - 1;
				}
				break;

			case 'PackageExpression':
				if(current_expression.value.substr(0,current_expression.value.length).toUpperCase()===current_expression.value.substr(0,current_expression.value.length)){
					note = note - 1;
					etat = "packageExpression " + current_expression.value + " contient une majuscule";
				}
				break;

			case 'ImportExpression':
				if(current_expression.value.substr(0,current_expression.value.length).toUpperCase()===current_expression.value.substr(0,current_expression.value.length)){
					note = note - 1;
					etat = "ImportExpression " + current_expression.value + " contient une majuscule";
				}
				break;

			case 'publicClassExpression':
				if(current_expression.value.substr(0,1).toUpperCase()!==current_expression.value.substr(0,1)){
					note = note - 1;
					etat = "publicClassExpression " + current_expression.value + " la premiere lettre de la class ne contient pas de majuscule";
				}
				break;

			case 'publicStaticVoidExpression':
				if(current_expression.value.substr(0,1).toUpperCase()===current_expression.value.substr(0,1)){
					note = note - 1;
					etat = "publicStaticVoidExpression " + current_expression.value + " la premiere lettre de la class contient un majuscule";
				}
				break;

		}
		rapport.push({ 'type' : current_expression.type,
					   'value' : current_expression.value,
					   'note' : note,
					   'etat' : etat
					});
	}
	return rapport;
}