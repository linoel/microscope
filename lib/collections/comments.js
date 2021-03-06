Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      postId: String,
      body: String
    });

    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);

    if (!post)
      throw new Meteor.Error('invalid-comment', 'You must comment on a post');

    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    // 更新帖子的评论数 使用 Mongo 的 $inc 操作（给一个数字字段值加一）更新相关的commentCounts
    Posts.update(comment.postId, {$inc: {commentsCount: 1}});
    // 插入评论 ，保存评论id
    comment._id = Comments.insert(comment);
    //现在创建一个通知，告知用户存在已经有评论
    createCommentNotification(comment);

    return comment._id;
  }
});