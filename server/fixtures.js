// Fixture data
if (Posts.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var tomId = Meteor.users.insert({
    profile: { name: 'sandy' }
  });
  var tom = Meteor.users.findOne(tomId);
  var sachaId = Meteor.users.insert({
    profile: { name: 'linoel' }
  });
  var sacha = Meteor.users.findOne(sachaId);

  var telescopeId = Posts.insert({
    title: '这个问题值得讨论么？',
    userId: sacha._id,
    author: sacha.profile.name,
    url: 'http://zhidao.baidu.com/',
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2,
    upvoters: [],
    votes: 0
  });

  Comments.insert({
    postId: telescopeId,
    userId: tom._id,
    author: tom.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: '挺有趣的，我可以参与下么?'
  });

  Comments.insert({
    postId: telescopeId,
    userId: sacha._id,
    author: sacha.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: '当然!'
  });

  Posts.insert({
    title: '馒头商学院',
    userId: tom._id,
    author: tom.profile.name,
    url: 'http://www.mtedu.com，好课多，来分享',
    submitted: new Date(now - 10 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [],
    votes: 0
  });

  Posts.insert({
    title: '馒头圈',
    userId: tom._id,
    author: tom.profile.name,
    url: 'http://bbs.mtedu.com，内容丰富',
    submitted: new Date(now - 12 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [],
    votes: 0
  });

  for (var i = 0; i < 10; i++) {
    Posts.insert({
      title: '论坛测试 #' + i,
      author: sacha.profile.name,
      userId: sacha._id,
      url: '测试一些又不会怀孕，test-' + i,
      submitted: new Date(now - i * 3600 * 1000 + 1),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });
  }
}