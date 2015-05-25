Router.configure({
 layoutTemplate:'layout',
 loadingTemplate:'loading',
 notFoundTemplate:'notFound',
 waitOn:function(){
 	//目前是路由器级订阅，这意味着当路由器初始化时，加载所有数据。
 	//return [Meteor.subscribe('posts'), Meteor.subscribe('comments')]

 	//因此需要将我们的订阅代码从路由器级改到路径级。
 	return Meteor.subscribe('posts');
 }
});
//初始 页面
Router.route('/',{name: 'postsList'});

//查看页面
Router.route('/posts/:_id',{
	name:'postPage',
	waitOn:function(){
		//console.log(Meteor.subscribe('comments', this.params._id));
		return Meteor.subscribe('comments', this.params._id);
	},
	data:function(){return Posts.findOne(this.params._id);}
});

Router.route('/posts/:_id/edit',{
	name:'postEdit',
	data:function(){return Posts.findOne(this.params._id);}
});

 //提交表单
Router.route('/submit',{name:'postSubmit'});

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