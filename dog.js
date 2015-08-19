function Dog(name){
	this.name = name;
};

Dog.prototype = {
	bark : function(){
		console.log(this.name);
	},

	push : function(){
		setTimeout(this.bark.bind(this), 1000);
	}
}