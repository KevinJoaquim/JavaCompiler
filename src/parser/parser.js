module.exports = tokens => {
	var AST = { body: [] };
	var last_token = null;
	while (tokens.length > 0) {
		var current_token = tokens.shift();
		switch(current_token.type){
			
			case 'variable-int-call':
			var expression = {
				type: 'VariableIntExpression',
				value: ''
			}
			var next = tokens.shift();
			current_token= next;
			if(next.type==="identifier"){
				expression.value= next.value;
			}else{
				throw 'You have to define a identifier for a variable.';
			}
			AST.body.push(expression);
			break;

			case 'equal':
			var next = tokens.shift();
					current_token= next;
				if(last_token.type=="identifier" ){
					var expression = {
						type: 'VariableAssignationExpression',
						identifier: last_token.value,
						value: current_token
					}
					
					switch(next.type){
						case 'object-string':
						case 'number':
						case 'number-float':
							expression.value = next.value;
						break;
						case 'identifier':
						val1 = nextValueVariable(next.value);
						next = tokens.shift();
							current_token= next;
								if(next.type==="plus"){
									next = tokens.shift();
									current_token= next;
									if(next.type==="identifier"){
										val2 = nextValueVariable(next.value);
										val3 = parseInt(val1) + parseInt(val2);
										expression.value = val3;
									}
								}
								if(next.type==="time"){
									next = tokens.shift();
									current_token= next;
									if(next.type==="identifier"){
										val2 = nextValueVariable(next.value);
										val3 = parseInt(val1) * parseInt(val2);
										expression.value = val3;
									}
								}
								if(next.type==="less"){
									next = tokens.shift();
									current_token= next;
									if(next.type==="identifier"){
										val2 = nextValueVariable(next.value);
										val3 = parseInt(val1) - parseInt(val2);
										expression.value = val3;
									}
								}
								if(next.type==="division"){
									next = tokens.shift();
									current_token= next;
									if(next.type==="identifier"){
										val2 = nextValueVariable(next.value);
										val3 = parseInt(val1) / parseInt(val2);
										expression.value = val3;
									}
								}
									
								
						break;
						default:
							throw 'You have to assigne a know type to variable '+last_token.value;
					}
					
					AST.body.push(expression);
					
				}
				break;


			
			case 'console-object':
				var next = tokens.shift();
				current_token= next;
				if(next.type=="point"){
					var expression = {
						type: 'ConsoleUseMethodeExpression',
						methode: '',
						arguments: [],
					}
					next = tokens.shift();
					current_token= next;
					if(next.type==="identifier"){
						expression.methode= next.value;
						next = tokens.shift();
						current_token= next;
						if(next.type==="parenthesis-start"){
							var isEnding= false;
							do{
								next= tokens.shift();
								current_token= next;
								switch(next.type){
									case 'object-string':
									case 'number':
									case 'number-float':
									case 'identifier':
										expression.arguments.push(next);	
										break;
									case 'parenthesis-end':
										isEnding= true;
										break
									case 'virgule':
										break;
									default:
										throw 'Error of using arguments';
								}
							}while(next.type!="parenthesis-end" && tokens.length > 0);
							if(!isEnding){
								throw 'You have to close parenthesis whene you use method.';
							}else{
								AST.body.push(expression);
							}
						}else{
							throw 'You have to use parenthesis to use method.';
						}
						
					}else{
						throw 'You have to define a identifier for a variable.';
					}
				}
				break;
			case 'instruction-end':
			case 'line-break':
				break;
			
		}
		last_token= current_token;
	}
	return AST;


	function nextValueVariable(nextValue){
		for (let i = 0; i < AST.body.length; i++) {
			if(AST.body[i].identifier == nextValue ){
				expression.value = AST.body[i].value;
			}
		}		
		return expression.value;
	}

}