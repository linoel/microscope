Router.configure({
 layoutTemplate:'layout',
 loadingTemplate:'loading',
 notFoundTemplate:'notFound',
 waitOn:function(){
 	//目前是路由器级订阅，这意味着当路由器初始化时，加载所有数据。
 	//return [Meteor.subscribe('posts'), Meteor.subscribe('comments')]

 	//因此需要将我们的订阅代码从路由器级改到路径级。
 	//return Meteor.subscribe('posts');
 	 return [Meteor.subscribe('notifications')]

 }
});


//查看页面
Router.route('/posts/:_id',{
	name:'postPage',
	waitOn:function(){
		//console.log(Meteor.subscribe('comments', this.params._id));
		return[
		 Meteor.subscribe('singlePost', this.params._id),
		 Meteor.subscribe('comments', this.params._id)
		];

	},
	data:function(){return Posts.findOne(this.params._id);}
});

//编辑页面
Router.route('/posts/:_id/edit',{
	name:'postEdit',
	  waitOn: function() {
	    return Meteor.subscribe('singlePost', this.params._id);
	  },
	data:function(){return Posts.findOne(this.params._id);}
});

 //提交表单
Router.route('/submit',{name:'postSubmit'});


//初始 页面
//Router.route('/',{name: 'postsList'});

// 参数后面的 ? 表示参数是可选的。这样路由就能同时匹配 http://localhost:3000/50 和 http://localhost:3000。
// Router.route('/:postsLimit?', {
//   name: 'postsList'
// });



Router.route('/', {
  name: 'home',
  controller: NewPostsController
});

Router.route('/new/:postsLimit?', {name: 'newPosts'});

Router.route('/best/:postsLimit?', {name: 'bestPosts'});



//验证登录
var requireLogin = function(){
	if(!Meteor.user()){
		if(Meteor.loggingIn()){
			this.render(this.loadingTemplate);
		}else{
			this.render('accessDenied');
		}
	}else{
		this.next();
	}
}

Router.onBeforeAction('dataNotFound',{only:'postPage'});
Router.onBeforeAction(requireLogin,{only:'postSubmit'});