Template.postContent.helpers({
	ownPost:function(){
		return this.userId === Meteor.userId();
	},
	 upvotedClass: function() {
	    var userId = Meteor.userId();
	    if (userId && !_.include(this.upvoters, userId)) {
	      return 'btn-primary upvotable';
	    } else {
	      return 'disabled';
	    }
	  }

});