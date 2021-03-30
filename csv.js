var buffer = [];

/*
 This function will be called each time a parameter of this module has changed, meaning a parameter or trigger inside the "Parameters" panel of this module
 This function only exists because the script is in a module
*/
function moduleParameterChanged(param)
{
	if(param.isParameter())
	{
		script.log("Module parameter changed : "+param.name+" > "+param.get());

		if(param.name == "csvFile") {
			csv = param.get();
		} 
	}else 
	{
		script.log("Module parameter triggered : "+param.name);	
	}
}


//Commands callbacks
function addInt(i) {
	buffer.push(i);	
}

function addFloat(f) {
	buffer.push(f);	
}

function addString(s) {
	buffer.push(s);	
}

function addBool(b) {
	buffer.push(b);	
}

function addTimeStamp() {
	var t = util.getTimestamp();
	buffer.push(t);
}

function saveToFile() {
	if(buffer.length > 0) {

		var fileBuffer = local.parameters.csvFile.readFile(false);
		var stringBuffer = "";

		for(var i = 0; i < buffer.length; i++) {
			if(i > 0) {
				stringBuffer += ", ";
			}
			stringBuffer += buffer[i];
		}

		script.log("writing…");
		script.log(stringBuffer);

		stringBuffer = fileBuffer + stringBuffer + "\n";
		local.parameters.csvFile.writeFile(stringBuffer, true);
		buffer = [];
	}
}