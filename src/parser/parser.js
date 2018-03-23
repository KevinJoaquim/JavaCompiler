module.exports = tokens => {
	var AST = { body: [] };
	var last_token = null;
	while (tokens.length > 0) {
		var current_token = tokens.shift();
		switch (current_token.type) {
			case 'package-project':
				var next = tokens.shift();
				current_token = next;
				if (next.type === "identifier") {
					var expression = {
						type: 'PackageExpression',
						value: ''
					}
					expression.value = next.value;
					next = tokens.shift();
					current_token = next;
					if (next.type === "point") {
						var isEnding = false;
						expression.value = expression.value + next.value;
						do {
							next = tokens.shift();
							current_token = next;
							switch (next.type) {
								case 'identifier':
									expression.value = expression.value + next.value;
									break;
								case 'instruction-end':
									isEnding = true;
									break;
								case 'point':
									expression.value = expression.value + next.value;
									if(tokens.shift().type==='instruction-end'){
										throw 'Error of using arguments or instruction-end ;';
									}

									break;
								default:
									throw 'Error of using arguments or instruction-end ;';
							}
						} while (next.type != "instruction-end" && tokens.length > 0);
						if (!isEnding) {
							throw 'You have to close package ;';
						} else {
							AST.body.push(expression);
						}
					} else if (next.type !== "instruction-end" || next.type === "") {
						throw 'You have to close package ; or is null ';
					}
				}
				break;

			case 'import-call':
				var next = tokens.shift();
				current_token = next;
				if (next.type === "identifier") {
					var expression = {
						type: 'ImportExpression',
						value: ''
					}
					expression.value = next.value;
					next = tokens.shift();
					current_token = next;
					if (next.type === "point") {
						var isEnding = false;
						expression.value = expression.value + next.value;
						do {
							next = tokens.shift();
							current_token = next;
							switch (next.type) {
								case 'identifier':
									expression.value = expression.value + next.value;
									break;
								case 'instruction-end':
									isEnding = true;
									break;
								case 'point':
									expression.value = expression.value + next.value;
									if(tokens.shift().type==='instruction-end'){
										throw 'Error of using arguments or instruction-end ;';
									}
									break;
								default:
									throw 'Error of using arguments or instruction-end ;';
							}
						} while (next.type != "instruction-end" && tokens.length > 0);
						if (!isEnding) {
							throw 'You have to close import ;';
						} else {
							AST.body.push(expression);
						}
					} else if (next.type !== "instruction-end" || next.type === "") {
						throw 'You have to close import ; or is null ';
					}
				}
				break;

			case 'public-class':
				var expression = {
					type: 'publicClassExpression',
					value: '',
				}
				var next = tokens.shift();
				current_token = next;
				if (next.type === "identifier") {
					expression.value = next.value;
					AST.body.push(expression);
				} else {
					throw 'Error of using name class.';
				}
				break;

			case 'public-static-void':
				var expression = {
					type: 'publicStaticVoidExpression',
					value: '',
					arguments: [],
				}
				var next = tokens.shift();
				current_token = next;
				if (next.type === "identifier") {
					expression.value = next.value;
					var next = tokens.shift();
					current_token = next;
					if (next.type === "parenthesis-start") {
						var isEnding = false;
						do {
							next = tokens.shift();
							current_token = next;
							switch (next.type) {
								case 'object-string':
								case 'identifier':
									expression.arguments.push(next);
									break;
								case 'parenthesis-end':
									isEnding = true;
									break;
								case 'virgule':
									break;
								default:
									throw 'Error of using arguments or close parenthesis';
							}
						} while (next.type != "parenthesis-end" && tokens.length > 0);
						if (!isEnding) {
							throw 'You have to close parenthesis.';
						} else {
							AST.body.push(expression);
						}

					} else {
						throw 'You have to open (.';
					}
					AST.body.push(expression);
				} else {
					throw 'Error of using name public static .';
				}
				break;

			case 'variable-declaration-call':
				var expression = {
					type: 'variableDeclatationExpression',
					value: '',
				}
				var next = tokens.shift();
				current_token = next;
				if (next.type === "identifier") {
					expression.value = next.value;

				} else {
					throw 'You have to define a identifier for a variable.';
				}

				AST.body.push(expression);
				break;

			case 'equal':
				var next = tokens.shift();
				current_token = next;
				if (last_token.type == "identifier") {
					var expression = {
						type: 'VariableAssignationExpression',
						identifier: last_token.value,
						value: current_token
					}

					switch (next.type) {
						case 'object-string':
						case 'number':
						case 'number-float':
							expression.value = next.value;
							endLine();
							break;
						case 'identifier':
							val1 = nextValueVariable(next.value);
							next = tokens.shift();
							current_token = next;
							calcul(val1);


							break;
						default:
							throw 'You have to assigne a know type to variable ' + last_token.value;
					}

					AST.body.push(expression);

				}
				break;



			case 'system-object':
				var next = tokens.shift();
				current_token = next;
				if (next.type == "point") {
					var expression = {
						type: 'SystemUseMethodeExpression',
						methode: '',
						arguments: [],
						value: '',
					}
					next = tokens.shift();
					current_token = next;
					if (next.type === "identifier") {
						expression.methode = next.value;
						next = tokens.shift();
						current_token = next;
						if (next.type === "parenthesis-start") {
							var isEnding = false;
							do {
								next = tokens.shift();
								current_token = next;
								switch (next.type) {
									case 'object-string':
										expression.arguments.push(next);
										expression.value = expression.value + next.value;
									case 'number':
									case 'number-float':
									case 'identifier':
										expression.arguments.push(next);
										expression.value = expression.value + next.value;

										break;
									case '"':
										expression.arguments.push(next);
										expression.value = expression.value + next.value;

										break;
									case 'parenthesis-end':
										isEnding = true;
										break;
									case 'virgule':
										break;

								}
							} while (next.type != "parenthesis-end" && tokens.length > 0);
							if (!isEnding) {
								throw 'You have to close parenthesis whene you use method or ;.';
							} else {
								endLine()
								AST.body.push(expression);
							}
						} else {
							throw 'You have to use parenthesis to use method.';
						}

					} else {
						throw 'You have to define a identifier for a variable.';
					}
				}
				break;
			case 'instruction-end':
			case 'line-break':
				break;

		}
		last_token = current_token;
	}
	return AST;

	function endLine() {
		next = tokens.shift();
		current_token = next;
		if (next.type != "instruction-end") {
			throw 'il manque un " ; " à la position = ' + next.pos;
		}

	}
	function calcul(lastValue) {
		if (next.type === "plus") {
			next = tokens.shift();
			current_token = next;
			if (next.type === "identifier") {
				val2 = nextValueVariable(next.value);
				val3 = parseInt(lastValue) + parseInt(val2);
				expression.value = val3;
				endLine();
			}
		}
		if (next.type === "time") {
			next = tokens.shift();
			current_token = next;
			if (next.type === "identifier") {
				val2 = nextValueVariable(next.value);
				val3 = parseInt(lastValue) * parseInt(val2);
				expression.value = val3;
				endLine();
			}
		}
		if (next.type === "less") {
			next = tokens.shift();
			current_token = next;
			if (next.type === "identifier") {
				val2 = nextValueVariable(next.value);
				val3 = parseInt(lastValue) - parseInt(val2);
				expression.value = val3;
				endLine();
			}
		}
		if (next.type === "division") {
			next = tokens.shift();
			current_token = next;
			if (next.type === "identifier") {
				val2 = nextValueVariable(next.value);
				val3 = parseInt(lastValue) / parseInt(val2);
				expression.value = val3;
				endLine();
			}
		}

	}

	function nextValueVariable(nextValue) {
		for (let i = 0; i < AST.body.length; i++) {
			if (AST.body[i].identifier == nextValue) {
				expression.value = AST.body[i].value;
			}
		}
		return expression.value;
	}

}