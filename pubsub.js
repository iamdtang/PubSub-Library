var PS = {
	//topicList is an array of topics. Each topic contains an array of functions
	topicList: [],
	
	//subscribe a function to a particular topic
	subscribe: function (topic, cb) {
		if (typeof topic !== 'string'){
			throw new Error('Topic must be a string');
			return;
		}
	
		if ( !(this.topicList[topic]) ) {
			this.topicList[topic] = [];
		}
		this.topicList[topic].push(cb);
		
		//return current index so that it can be used for unsubscribing
		return (this.topicList[topic].length - 1);
	},
	
	/*
	* unsubscribe a function from a topic. index argument refers to the position  
	* for where the fn you want to remove resides for a specified topic.
	* topicList['topic1'] = [fn1, fn2, fn3 ...]
	*/
	unsubscribe: function (topic, index) {
		this.topicList[topic].splice(index, 1);
	},
	
	//publish a topic
	publish: function (topic) {
		var len = null, arg = [];
		
		//check if the topic exists. if it doesnt, return from the function
		if (this.topicList[topic] === undefined) {
			throw new Error('No subscriptions to topic: '+topic);
			return;
		}
		
		len = this.topicList[topic].length;
		
		//any arguments passed the subscribed fn's will need to be an array
		if ( (arguments[1] !== undefined) && (arguments[1] instanceof Array) ) {
			arg = arguments[1];
		}
		
		for (var i=0; i<len; i++) {
			//invoke fn for specified topic, passing it an array of arguments
			this.topicList[topic][i](arg);
		}
	}
};
