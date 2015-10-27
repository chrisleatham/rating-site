Parse.initialize("5sgSNcsqShnQdHqQ3ySvySymCeUpQEIfbVKbVBqA", "hWSQVuECvZe3gnOKYUQH5T66DWd73oVhDoSZjS91");

var Review = Parse.Object.extend('Review');
$('#stars').raty({
    'score': 3,
    size: 24
})

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

var total;
var average;
var totalRating;
var likes = 0;
var totalLikes = 0; 

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



var addItem = function(item) {
	var title = item.get('title');
	var review = item.get('review');
    var rating = item.get('rating');
	var user = Math.random();
    total++;

    totalRating += rating;

    

    var li = $('<li> User: ANON ' + user + '<h3>' + title + '</h3>' + '<p> Rating: <div id="ratingStars'+item.id+'" ></div></p>' + '<p id="content">' + review + '</p>' + '<p>' + likes + ' out of ' + totalLikes + ' found this review helpful </p>');
    var likeButton = $('<button class="btn-primary btn-xs"><span class="glyphicon glyphicon-thumbs-up"</span></button>');
    var dislikeButton = $('<button class="btn-primary btn-xs"><span class="glyphicon glyphicon-thumbs-down"</span></button>');

	var button = $('<button class="btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button>');

	button.click(function(){
		item.destroy({
			success: getData
		})
	})

    likeButton.click(function(){
        likes++
        totalLikes++
        getData
    })

    dislikeButton.click(function(){
        totalLikes++
        getData
    })

	li.append(likeButton, dislikeButton, button);
	$('#list').append(li);
    $('#ratingStars' + item.id).raty({readOnly: true, score: function() {
            return rating;
    }});
}

getData();