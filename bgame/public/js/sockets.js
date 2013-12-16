//this js runs for broawer
//it receive data from node server.

// this wrapper makes sure that all html, css, and js links are loaded
window.onload = function() {

    // connect client to server
	var socket = io.connect(window.location.hostname);

	// mouse listener
	$(document).on('click', function(e) { // mouse clicks
	// $(document).mousemove(function(e) { // mouse movement
	    
	 	// grab location
		var posX = e.pageX,
			posY = e.pageY;

		// send movement to server	
        // console.log("sending: " + posX + ", " + posY); 
		socket.emit('mouse lion', { // player is a lion
			x: posX,
			y: posY
		});

		// listen for other user's mouse movement from server
		socket.on('mouse tigers', function(tiger) { // enemies
		// console.log(tiger.x, tiger.y, tiger.id );
			
			$('#' + tiger.id).css( { 'top':tiger.y, 'left':tiger.x } );
			
		});
		
		$('.me').css( { 'top':posY,'left':posX });
		
	});
	
	// user ready link
	$('#ready').on('click', function(){
	    console.log('i am ready');
	    socket.emit('ready', 'user is ready');  
	    $(this).fadeOut('slow');  
	});


	//Animation
	jQuery( document ).ready(function(){
		
		var breathing = 0;
		var n = 0;
		var nobreathing = 0;
		var myVar = setInterval(function(){myTimer()},1000);

		var avatar = $('.avatar');
		avatar.src = $('.avatar').attr('src');

		// receive general messages from server
		socket.on( "message", function ( data ) { // triggered everytime arduino send data
			data = myAnimation( data ); 
			console.log(data);
		});


		function myAnimation( data ){

		 	if (data > 5){
		 		$('.avatar').attr('src', '/images/avatar' + data + '.png');
		 	}
		 	else 
		 	{	
		 	}
		 	}

	 		function myTimer(){
			nobreathing = nobreathing +1;
			 console.log("nobreahthing");

			if(nobreathing > 20){
			$('.avatar').attr('src', '/images/avatar15.png');
			 console.log("image15");
			}
			document.getElementById("demo").innerHTML= nobreathing;
			}
	});

	// setup users
	var usertemplate = $('.template');
	var userspace = $('.container');
	
	//create new user
	socket.on('users', function(data){
	console.log(data);

	    // clone template
        var newuser = usertemplate.clone();
        newuser.removeClass('template');
        newuser.attr('id', data); // add user id

        // add user to html
        userspace.append(newuser); 
	  
	});
}

