function encodeChar (char, key){
	//This function encodes a single char using corresponding key
	key = parseInt(key);
	if(key%2 != 0){
			return String.fromCharCode(char.charCodeAt(0)-key);
	}
	else{
			return String.fromCharCode(char.charCodeAt(0)+key);
	}
}

function decodeChar(key_str, char_str){
	//This function takes an input key-sting and an ecoded car-string to return a decoded char-string

	key_str_array = key_str.split(",");
	char_array = "";

	for (var i = 0; i < char_str.length; i++) {
		key = parseInt(key_str_array[i]);
		
		if(key%2 != 0){
			char_array += String.fromCharCode(char_str.charAt(i).charCodeAt(0)+key);
		}
		else{
			char_array += String.fromCharCode(char_str.charAt(i).charCodeAt(0)-key);
		}
	}
	return char_array;
}

function encodeKey(key){
	
	//convert key(number) to key(char)
	for (var i = 0; i < key.length; i++) {
		key = key.substr(0,i)+ String.fromCharCode(parseInt(key.charAt(i))+97) + key.substr(i+1,key.length-1);	
	}	

	// convert to binary and replace 0,1 with a or b and return a string
	code = "";

	for (var i=0; i < key.length; i++) {
		even = true;
		
		k = "";
		k += key.charAt(i).charCodeAt(0).toString(2);
		for (var count = 0; count < k.length; count++) {
			if(k.charAt(count)=="1"){	
				if(even)
					even=false;
				else
					even=true;
			}
		}
		if(even){
			k= "0"+ k;
		}else{
			k= "1"+ k;
		}
		for(var j=1; j<k.length; j++ ){
			if(even){
				if(k.charAt(j)=="0")
					k = k.substr(0,j)+ "b" + k.substr(j+1,k.length-1);	
				else
					k = k.substr(0,j)+ "a" + k.substr(j+1,k.length-1);
			}else{
				if(k.charAt(j)=="0")
					k = k.substr(0,j)+ "a" + k.substr(j+1,k.length-1);
				else
					k = k.substr(0,j)+ "b" + k.substr(j+1,k.length-1);
			}
		}
		
		code += k;
	}
	return code;
}

function decodeKey(key_str){
	// This fuinction decodes the encoded key-string

	key_str_array = key_str.split(",");
	decoded_key_str = "";
	for (var i = 0; i < key_str_array.length; i++) { // for each key in binary encoded form
		key_str = key_str_array[i];
	 	for (var j = 0; j < key_str.length; j+=8) { // for each byte of the key
	 		even = key_str.charAt(j) == "0";
	 		for (var k = j+1; k < j+8; k++) { // for each bit
	 			if(even){
	 				if(key_str.charAt(k)=="a")
	 					key_str = key_str.substr(0,k)+ "1" + key_str.substr(k+1,key_str.length-1);
	 				else
	 					key_str = key_str.substr(0,k)+ "0" + key_str.substr(k+1,key_str.length-1);
	 			}else{
	 				if(key_str.charAt(k)=="a")
	 					key_str = key_str.substr(0,k)+ "0" + key_str.substr(k+1,key_str.length-1);
	 				else
	 					key_str = key_str.substr(0,k)+ "1" + key_str.substr(k+1,key_str.length-1);
	 			}
	 		}
	 		decoded_key_str += String.fromCharCode(parseInt(key_str.substr(j+1,j+7), 2)).charCodeAt(0) - 97;

	 	}
	 	if(i<key_str_array.length-1)
	 		decoded_key_str += ",";
	}
	return(decoded_key_str);
}


function encode(key_str, input_str){
	// This function refractors the encoded key and input-string in required format[key](input)

	encoded_input = "("
	key_str_array = key_str.split(",");
	for (var i = 0; i < input_str.length; i++) {
		encoded_input += encodeChar(input_str.charAt(i), key_str_array[i]);
	}
	encoded_input += ")";

	encoded_key = "[";
	for (var i = 0; i < key_str_array.length; i++) {
		encoded_key += encodeKey(key_str_array[i]);
		if(i<key_str_array.length-1)
			encoded_key += ",";
	}
	encoded_key += "]";

	return encoded_key + encoded_input;
}
function decode(encoded_key_input_str){

	// This function calls decodeKey and uses the decoded key to decode the encoded input string
	alert("Encoded Key : "+encoded_key_input_str.split("]")[0].split("[")[1] );
	decoded_key_str = decodeKey(encoded_key_input_str.split("]")[0].split("[")[1] );
	alert("Decoded key : "+ decoded_key_str);
	
	alert("Encoded input : "+encoded_key_input_str.split("](")[1].substr(0,encoded_key_input_str.split("](")[1].length-1));
	decoded_input_str = decodeChar(decoded_key_str, encoded_key_input_str.split("](")[1].substr(0,encoded_key_input_str.split("](")[1].length-1));
	alert("Decoded input : "+ decoded_input_str);

	return decoded_input_str;

}

function formLineEquation(input_str){

	//This function creates a line equation using the points in the input

	input_num_array = input_str.match(/\d+/g).map(Number);
	line_equation = ""
	for (var i = 0; i < input_num_array.length; i++) {
		x1 = input_num_array[i]; i++;
		y1 = input_num_array[i]; i++;
		x2 = input_num_array[i]; i++;
		y2 = input_num_array[i];
		m = (y2-y1)/(x2-x1);
		c = y1- m*x1;
		line_equation += "y = "+m+"x ";
		if(c>0)
			line_equation +="+ "+c;
		else
			line_equation +="- "+ c*-1;

		if(i<input_num_array.length-1)
			line_equation += ",";
	}
	return line_equation.split(",");
}

function generateRandom(n){
	// this function returns a string of random numbers. The count of numbers is equal to the size of input string
	key_str="";

	for (var i = 0; i < n; i++) {
		key_str += Math.floor(Math.random()*30);
		if(i<n-1){
			key_str += ",";
		}
	}
	return key_str;
}

function encodeDecode(input_str, key_str="" ){

	// This is the starting point for the program

	if(key_str.split("[")[1].split("]")[0].split(",").length<input_str.length)
		key_str = generateRandom(input_str.length);
	else
		key_str = (key_str.split("[")[1].split("]")[0]);

	encoded_key_input_str = encode(key_str,input_str);

	decoded_input_str = decode(encoded_key_input_str);

	line_equation = formLineEquation(decoded_input_str)
	alert("line equation is "+line_equation);
}
encodeDecode("([(1,2) (3,4)][(5,3) (7,8)])", "[1,18,4,1,10,16,21,16,28,18,26,26,9,22,7,24,28,26,15,27,18,27,18,24,2,5,26,29]");
encodeDecode("([(1,2) (3,4)][(5,3) (7,8)])");