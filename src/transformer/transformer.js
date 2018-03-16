module.exports = ast => {
	var rapport = [] ;
	var expressions = ast.body;
	
	//add rapport note of expressions;
	while (expressions.length > 0) {
		var note = 5;
		var etat = "ok";
		var current_expression = expressions.shift();
		switch(current_expression.type){
			case 'VariableIntExpression':
				if(current_expression.value.substr(0,1).toUpperCase()===current_expression.value.substr(0,1)){
					note = note - 1;
					etat = "VariableIntExpression " + current_expression.value + " débute avec une majuscule";
				}else if(current_expression.value.substr(0,current_expression.value.length).toUpperCase()===current_expression.value.substr(0,current_expression.value.length)){
					note = note - 1;
					etat = "VariableIntExpression " + current_expression.value + " contient une majuscule une majuscule";
				}
				


				break;
			case 'VariableDeclarationExpression':
				//check if variable name is well formed
				//check if variable is used;
				
				break;
			case 'VariableAssignationExpression':
				//check if variable is declared;
				break;
				
			case 'ConsoleUseMethodeExpression':
				//check if methode exist
				//check arguments 
				break;
		}
		rapport.push({ 'type' : current_expression.type,
					   'note' : note,
					   'etat' : etat
					});
	}
	return rapport;
}