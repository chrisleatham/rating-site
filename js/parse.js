//Chris Leatham

//Initializing Parse
Parse.initialize("5sgSNcsqShnQdHqQ3ySvySymCeUpQEIfbVKbVBqA", "hWSQVuECvZe3gnOKYUQH5T66DWd73oVhDoSZjS91");

//Setting up the review stars with Raty
var Review = Parse.Object.extend('Review');
$('#stars').raty({
    'score': 3,
    size: 24
})

//Sending the form inputs to Parse
$('form').submit(function() {
    
    var reviewItem = new Review();
    var rating = $('.rating').raty('score');

    $(this).find('input').each(function(){
        reviewItem.set($(this).attr('id'), $(this).val());
        $(this).val('');
    })

    $(this).find('textarea').each(function(){
        reviewItem.set($(this).attr('id'), $(this).val());
        $(this).val('');
    })

    reviewItem.set('rating', rating);
    reviewItem.set('likes', 0);
    reviewItem.set('totalLikes', 0);



    reviewItem.save(null,{
        success: getData, 
    });

    return false;
})

//Initializing variables
var total;
var average;
var totalRating;
var likes = 0;
var totalLikes = 0; 

//Finding data in Parse
var getData = function() {
    var query = new Parse.Query(Review);
    query.exists('title', '');
    query.exists('review', '');
    total = 0;
    average = 0;
    totalRating = 0;
    query.find({
        success: function(response){
            buildList(response);
        }
    })
}

//Building the data list and setting the average
var buildList = function(data) {
	$('#list').empty()

    data.forEach(function(d){
        addItem(d);
    })
    average = Math.round((totalRating/total));
    $('#average').raty({readOnly: true, score: function() {
            return average;
    }});
}


//Adding the items to the list to display
var addItem = function(item) {
	var title = item.get('title');
	var review = item.get('review');
    var rating = item.get('rating'); 
    var likes = item.get('likes');
    var totalLikes = item.get('totalLikes'); 
	var user = Math.random();
    total++;

    totalRating += rating;

    

    var li = $('<li> User: ANON ' + user + '<h3 id="title">' + '</h3>' + '<p> Rating: <div id="ratingStars'+item.id+'" ></div></p>' + '<p id="content">' + review + '</p>' + '<p>' + likes + ' out of ' + totalLikes + ' found this review helpful </p>');
    var likeButton = $('<button class="btn-primary btn-xs"><span class="glyphicon glyphicon-thumbs-up"</span></button>');
    var dislikeButton = $('<button class="btn-primary btn-xs"><span class="glyphicon glyphicon-thumbs-down"</span></button>');
    li.find('#title').text(title);

	var button = $('<button class="btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button>');

	button.click(function(){
		item.destroy({
			success: getData
		})
	})

    likeButton.click(function(){
        item.increment('likes');
        item.increment('totalLikes');
        item.save();
        console.log('likes')
        getData();
    })

    dislikeButton.click(function(){
        item.increment('totalLikes');
        item.save();
        getData();
    })

	li.append(likeButton, dislikeButton, button);
	$('#list').append(li);
    $('#ratingStars' + item.id).raty({readOnly: true, score: function() {
            return rating;
    }});
}

getData();