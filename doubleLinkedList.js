function Node(data, previus, next){
	this.data = data;
	this._next = next;
	this._previous = previus;
};

function DoubleLinkedList(){
	this._head = null;
	this._tail = null;
	this._length = 0;
};

DoubleLinkedList.prototype.head = function(){
	if(this._head){
		return this._head.data;
	}
}

DoubleLinkedList.prototype.tail = function(){
	if(this._head){
		return this._tail.data;
	}
}

DoubleLinkedList.prototype.append = function(value){
	var temp = new Node(value, this._tail);
	if(this._head){
		this._tail._next = temp;
		this._tail = temp;
	}
	else{
		this._tail = this._head = temp;
	}
	this._length++;
	return this;
}

DoubleLinkedList.prototype.at = function(index){
	var current, i;
	if(index>=this._length){
		return;
	}
	current = this._head;
	i=0;
	while(current){
		if(i++ === index){
			return current.data;
		}
		current = current._next;
	}
}

DoubleLinkedList.prototype.reverse = function(){
	var current = this._head,
		temp;
	if(this._length<2){
		return this;
	}
	while(current){
		temp = current._next;
		current._next = current._previous;
		current._previous = temp;
		current = temp;
	}
	temp = this._head;
	this._head = this._tail; 
	this._tail = temp;
	return this;
}

DoubleLinkedList.prototype.indexOF = function(item){
	var current = this._head,
		i=0;
	while(current){
		if(item === current.data){
			return i;
		}
		current = current._next;
		i++;
	}
}

DoubleLinkedList.prototype.deleteAt = function(index){
	var current , i;
	if(!this._head || index>=this._length) return this;	
	if(index === 0){
		if(this._length === 1){
			this._head = this._tail = null;
		}
		else{
			this._head._next._previous = null;
			this._head = this._head._next;
		}
	}
	else{
		current = this._head._next;
		i=1; 	
		while(current){
			if(i++ === index){
				current._previous._next = current._next;
				if(current._next){
					current._next._previous = current._previous;
				}
				else{
					this._tail = current._previous;
				}
				break;
			}
			current = current._next;
		}
	}
	this._length--;
	return this;
}

DoubleLinkedList.prototype.insertAt = function(value, index){
	var current, newNode, i;
	if(index > this._length) return this;
	if(index === this._length){
		return this.append(value);
	}
	else{
		current = this._head;
		i=0;
		while(current){
			if(i++ === index){
				newNode = new Node(value,current._previous, current);
				if(current._previous){
					current._previous._next = newNode;
				}
				else{
					this._head = newNode;
				}
				current._previous = newNode;
				break;
			}
			current = current._next;
		}
		this._length++;
		return this;
	}
}

DoubleLinkedList.prototype.each = function(callback){
	var current = this._head,
		i=0;
	if(typeof callback === "function"){
		while(current){
			callback.call(this,i,current.data);
			current = current._next;
			i++;
		}
	}
}