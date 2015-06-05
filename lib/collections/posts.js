Posts = new Mongo.Collection('posts');

//赋予权限
Posts.allow({
	update: function (userId, post) {
		//...
		return ownsDocument(userId,post);
	},
	remove: function (userId, post) {
		//...
		return ownsDocument(userId,post);
	}
});
//限制权限
Posts.deny({
	update: function (userId, post, fieldNames) {
		//只能更改下面两个字段
		return (_.without(fieldNames,'url','title').length > 0);
	}
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  }
});


Meteor.methods({
	postInsert: function (postAttributes) {
		// 新增贴子的函数
		check(Meteor.userId(), String);//验证是否为字符串，meteor自带函数
		check(postAttributes, {
			title:String,
			url:String
		});

		//测试延时补偿
		// if(Meteor.isServer){
		// 	postAttributes.title+="(server)";
		// 	//延时5秒
		// 	Meteor._sleepForMs(5000);
		// }else{
		// 	postAttributes.title +="(client)";
		// }

		var errors = validatePost(postAttributes);
    		if (errors.title || errors.url)
      		throw new Meteor.Error('invalid-post', "你必须为你的帖子填写标题和 URL");

		//验证url唯一性
		var postWithSameLink = Posts.findOne({url:postAttributes.url});

		if(postWithSameLink){
			return{
				postExists : true,
				_id:postWithSameLink._id
			}
		}
		var user = Meteor.user();
		//post 继承传进来的对象，并且增加参数
		var post = _.extend(postAttributes,{
			userId:user._id,
			author:user.username,	//作者
			submitted:new Date(),	//发布时间
			commentsCount:0, 	//回帖数量
			upvoters: [], 		//投票者
  			votes: 0 		//票数
		});

		var postId = Posts.insert(post);

		return {
			_id:postId
		};
	},
	upvote: function(postId) {
	    check(this.userId, String);
	    check(postId, String);

	    var affected = Posts.update({
	      _id: postId,
	      upvoters: {$ne: this.userId}
	    }, {
	      $addToSet: {upvoters: this.userId},
	      $inc: {votes: 1}
	    });

	    if (! affected)
	      throw new Meteor.Error('invalid', "你不能投票");
	}
});


validatePost = function(post){
  var errors = {};

  if (!post.title)
    errors.title = "请填写标题";

  if (!post.url)
    errors.url =  "请填写内容";

  return errors;
}



