var data;

window.onload = function(){
    loadData();
}

function loadData() {

    var xmlhttp;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
            if(xmlhttp.status == 200){
           		data = JSON.parse(xmlhttp.responseText);
           		draw();
                document.getElementsByClassName('item_container')[0].classList.add("active");
            }
            else if(xmlhttp.status == 400) {
            	alert('There was an error 400')
            }
           else {
                alert('something else other than 200 was returned')
           }
        }
    }

    xmlhttp.open("GET", "https://copy.com/u46bmbzDeQrnokvp/images.json?download=1", true);
    xmlhttp.send();
};

function drawItem(data){
	var itemContainer = document.createElement('div');
	itemContainer.className = 'item_container';

	var imageContainer = document.createElement('div');
	imageContainer.className = 'image_container';

	var image = document.createElement('img');
	image.setAttribute('src','images/'+data.img);

	var titleContainer = document.createElement('div');
	titleContainer.className = 'title_container';
	titleContainer.innerHTML = data.title;
    
    imageContainer.appendChild(image);
	itemContainer.appendChild(imageContainer);
	itemContainer.appendChild(titleContainer);
    return itemContainer;
};

function draw(){
    var widget = document.getElementById('widget');
    var mainContainer = document.createElement('div');
    mainContainer.setAttribute('id','main_container');
	for(var i =0; i<data.length; i++){
        mainContainer.appendChild(drawItem(data[i]));
	}
    widget.replaceChild(mainContainer, widget.getElementsByClassName('loading')[0]);
};

document.onkeydown = function(e){
    var active = document.getElementsByClassName('active')[0];  
    if (e.keyCode == 39) {
        if( active.nextSibling){
            active.classList.toggle("active"); 
            active.nextSibling.classList.toggle("active");   
        }    
	}
    if (e.keyCode == 37) {    
        if( active.previousSibling){
            active.classList.toggle("active"); 
            active.previousSibling.classList.toggle("active");  
        }      
	}
    scroll();  
};

function scroll () {
    var container = document.getElementById('main_container');
    var active = document.getElementsByClassName('active')[0];
    var oldScroll = container.scrollLeft; 
    var shift;
    if((document.documentElement.clientWidth - getOffsetRect(active).left)<=active.offsetWidth){
            shift = active.offsetWidth + 20; // 20 - margin
            animate({
                duration: 500,
                timing: function(timeFraction) {
                    return timeFraction;
                },
                draw: function(progress) {
                    container.scrollLeft = oldScroll + shift*progress;
                }
            });
     }
     else if((getOffsetRect(active).left)<=0){
            shift = active.offsetWidth + 20; //20 - margin
            animate({
                duration: 500,
                timing: function(timeFraction) {
                    return timeFraction;
                },
                draw: function(progress) {
                    container.scrollLeft = oldScroll - shift*progress;
                }
            });
       }
}

function getOffsetRect(elem) {

    var box = elem.getBoundingClientRect()
    
    var body = document.body
    var docElem = document.documentElement
    
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
    
    var clientTop = docElem.clientTop || body.clientTop || 0
    var clientLeft = docElem.clientLeft || body.clientLeft || 0
    
    var top  = box.top +  scrollTop - clientTop
    var left = box.left + scrollLeft - clientLeft
    
    return { top: Math.round(top), left: Math.round(left)}
}


function animate(options) {

  var start = performance.now();

  requestAnimationFrame(function animate(time) {

    var timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;
    
    var progress = options.timing(timeFraction)

    options.draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}