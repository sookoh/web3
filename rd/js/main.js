/**
 * forms
 *
 */

var box = document.getElementById('box');
box.onfocus = function(){
    console.log('box has focus');
    console.log(this); // this refers to element where event occurred
    
    if (!this.value) { this.value = 'dogs & cats' };

    output.innerHTML = 'enter any text please';
    catBack(cat.oldsrc);
}


var button = document.getElementById('submit');
submit.onclick = function(event){
    
    // event can pass things to your f(x) if you want
    console.log(event);
    console.log(event.screenX); // you can get mouselocation even without a click. 
    
    
    event.preventDefault(); // prevent link or button from doing anything else;
    
    button.innerHTML = box.value;
    box.value = 'again plz';
}



