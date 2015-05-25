Meteor.publish('posts',function(){
	return Posts.find();
});

Meteor.publish('comments', function(postId) {

  check(postId, String);
  //console.log(Comments.find({postId: postId}));
  return Comments.find({postId: postId});
  //return Comments.find();
});