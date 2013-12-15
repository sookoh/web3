//this js runs for broawer
//it receive data from node server.

// this wrapper makes sure that all html, css, and js links are loaded
window.onload = function() {

    // connect client to server
	var socket = io.connect(window.location.hostname);

	//my code starts
	jQuery( document ).ready(function(){
		//var $sketch = $( "#sketch" );
		
		var breathing = 0;
		var n = 0;
		
		var avatar = $('#avatar');
		avatar.src = $('#avatar').attr('src');

		var socket = io.connect( "/", {
			"reconnect"                :true,
			"reconnection delay"       :500,
			"max reconnection attempts":10
		});

 
	// mouse listener
	$(document).on('click', function(data) { // mouse clicks
	// $(document).mousemove(function(e) { // mouse movement
	    
	 	// grab location
		var posX = data.pageX,
			posY = data.pageY;

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
		
		$('#avatar').css( { 'top':posY,'left':posX });
		
	});
	
	// user ready link
	$('#ready').on('click', function(){
	    console.log('i am ready');
	    socket.emit('ready', 'user is ready');  
	    $(this).fadeOut('slow');  
	});





	// receive general messages from server
		socket.on( "message", function ( data ) { // triggered everytime arduino send data
			data = myAnimation( data ); 
			console.log(data);
		});

		function myAnimation( data ){

			if (data > 3){
				$('#avatar').attr('src', '/images/avatar' + data + '.png');
			}
				
			else 
			{
				function myTimer()
				{
					if(nobreathing > 5)
					{
					$('#avatar').attr('src', '/images/avatar15.png');
					console.log("image15");
					}
				}
			}
		}





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

	});
}

