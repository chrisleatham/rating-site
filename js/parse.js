Parse.initialize("9w3zkAemBkVmgQjtHvVRudKNMNUGtCT94WnQrOYc", "SWCpPCOCyHWpoVwNyNfB1MY579rOL0BciLLVYv3U");

var Review = Parse.Object.extend('Review');


$('form').submit(function() {
    
    var reviewItem = new Review();

    $(this).find('input').each(function(){
        review.set($(this).attr('id'), $(this).val());
        $(this).val('');
    })

    music.save(null,{
        success: function() {
            getData();
        }
    });

    return false;
)}

var getData = function() {
    var query = new Parse.Query(Review);
    query.exists('title');
    query.exists('review');

    query.find({
        success: function(response){
            buildList(response);
        }
    });
}