//检查 用户 id 是否和 作者用户id一致
ownsDocument = function(userId,doc){
	return doc && doc.userId ===userId;
}