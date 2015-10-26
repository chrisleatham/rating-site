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



    reviewItem.save(null,{
        success: getData, 
    });

    return false;
})




var getData = function() {
    var query = new Parse.Query(Review);
    query.exists('title', '');
    query.exists('review', '');

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

}

var addItem = function(item) {
	var title = item.get('title')
	var review = item.get('review')
 
	var user = Math.random();

    var li = $('<li> User: ANON ' + user + '<h2>' + title + '</h2>' + '<p>' + review + '</p>');

	var button = $('<button class="btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button>');

	button.click(function(){
		item.destroy({
			success: getData
		})
	})

	li.append(button);
	$('#list').append(li);
}

getData();