/**
 * advanced:
 * make this work offline
 * https://developer.mozilla.org/en-US/docs/HTML/Using_the_application_cache
 * note: you must edit the manifest to update files
 *
 */


$('.select').click(function() {
    console.log($(this).text());
    displayMoodPost($(this).text());
});

function displayMoodPost(mood) {
    $('article').hide();
    $('article.' + mood).show();
}


$('.feelings').click(function(event){
	event.preventDefault();
	console.log('feeling click');
	var myemo = $(this).attr('id');
	$('#currentemo').val(myemo);
	console.log(myemo);
});

var posts = [];

/**
 * form action
 *
 */

$('#save').click( function(event){

    // stop from trying to send & refresh page
    event.preventDefault();

    // create post from form
    var post = {};
    post.title = $('#currentemo').val();
    post.content = $('#content').val();
    post.date = new Date();

    
	// set id 
	// the id will be last id + 1

    // add post to posts
    posts.push(post);

    console.log('post: ',post);
    console.log('posts: ',posts);

    displayPost(post);
    storePosts(posts);

});



/**
 * display posts
 *
 */

function displayPost(post){
 //  var html = '<article class="'+ post.title +'"><h2>'+ post.title +'</h2><p>'+ post.content +'</p></article>';
  var html = '<article class="'+ post.title +'"><h2>'+ post.title +'</h2><p>'+ post.content +'</p><p class=mydate>'+ post.date +'</p></article>';
    $('#feed').prepend(html);
}
 /*
    for(var i=0; i< 20; i++){
   var html = '<article id="a'+[i] + '" class="'+ post.title +'"><h2>'+ post.title +'</h2><p>'+ post.content +'</p></article>';
    $('#feed').prepend(html);
    }
    */

/*
$('#feed').click( function(){
	$('#feed').text('yaya');
});
*/

$('section').on('click', 'article', function(){
	//$(this).text('yaya');
	//$('article').removeClass('article');
	$(this).toggleClass('change');
/*
for (var i=0; i<20; i++){
    $('#a'+[i]).toggleClass('change');
*/
	
	//$(this).css('color','#0f0');
	
	console.log('hi soooo');
});

/*
$('#happy').on('click', 'article', function(){  
	//$(this).load('happy.html');
	$(this).text('yaya');
	console.log('sooo happy');
});
*/
/*
$('section').on('click', '.feelings', function(){
	$(this).toggleClass('changeicon');
});
*/

/**
 * store posts
 *
 * note: localStorage only stores STRINGS
 *          arrays/objects must be STRINGIFIED
 *          numbers are fine but will be returned as a strong
 *
*/

function storePosts(posts){

    console.log('array: ' + posts);

    // make the array a string
    posts = JSON.stringify(posts);
    console.log('json: ' + posts);


    // store the string
    localStorage.posts = posts;
}


/**
 * localStorage = STRINGS only!!
 *
 * note: localStorage only stores STRINGS
 *  - arrays/objects must be STRINGIFIED before storage, PARSED after retrieval. 
 *  - numbers also: 
 *       var num = localStorage.mynumber;   // '10.123' 
 *           num = parseFloat(num);         // 10.123 
 *           num = parseInt(num);           // 10
 *
 */


/**
 * load posts
 *
 * note: localStorage only stores STRINGS
 *          arrays/objects must be PARSED
 *          numbers also: var num = parseInt(); 
 *
 */

function loadPosts(){

    // check for posts in storage
    if (localStorage.posts) { 

        posts = localStorage.posts;

        // turn string into an array
        posts = JSON.parse(posts);

        // loop thru items in the array
        for( i=0, count=posts.length; i<count; i++ ){

            var post = posts[i]
            console.log( post );
            displayPost(post);
        }
    } else { // nothing in storage?
    
        posts = []; 
    
    }

}

// load posts on page load
//if (opst[0].title !='') $('input#title').hide();
loadPosts();


/**
 * advanced
 * alternative way to organize your code
 * not currently in use
*/

var app = {
    load : function(){
        if (localStorage.posts) { 
            posts = localStorage.posts;
            posts = JSON.parse(posts);
            for( i=0, count=posts.length; i<count; i++ ){
                var post = posts[i]
                displayPost(post);
            }
        }        
    },
    store : function(posts){
        posts = JSON.stringify(posts);
        localStorage.posts = posts;
    }
}
 
// app.load();
// app.store(posts);
