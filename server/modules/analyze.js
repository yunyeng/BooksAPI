function theData(data, name){
	var arr = data.items;
	var author = data.items[0].volumeInfo.authors[0];
	var num = 0;
	for(var i=0; i<arr.length; i++){
		for(var j=0; j < arr[i].volumeInfo.authors.length; j++)	if(arr[i].volumeInfo.authors[j] === author)	num++;
	}
	if(num > 8) return author;
	else return null;
	//console.log(data);
}
exports.theData = theData;