Template.postSubmit.onCreated(function(){
	Session.set('postSubmitErrors',{});
});

Template.postSubmit.helpers({
	errorMessage: function (field) {
		// ...
		return Session.get('postSubmitErrors')[field];
	},
	errorClass:function(field){
		return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
	}
});


Template.postSubmit.events({
	'submit form': function (e) {
		// ...
		e.preventDefault();

		var post = {
			url:$(e.target).find('[name=url]').val(),
			title:$(e.target).find('[name=title]').val()
		};

		var errors = validatePost(post);
		if(errors.title || errors.url){
			return Session.set('postSubmitErrors',errors);
		}

		Meteor.call('postInsert', post, function (error, result) {
			//显示错误信息并且退出
			if(error){
				//return alert(error.reason); //老方法
				return Errors.throw(error.reason);
			}

			//显示结果，跳转页面
			if(result.postExists){
				//alert('链接已经存在');
				Errors.throw('链接已经存在');
			}

			Router.go('postPage',{_id:result._id});

		});
		//测试延时补偿
		//Router.go('postsList');
	}
});