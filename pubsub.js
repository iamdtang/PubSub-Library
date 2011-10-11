var PS = {
	 
	/* topicList is an object containing topics. 
	 * Each topic is an associative array, where the key is the subscription name and the value is the function
	 */
	topicList: {},
	
	subscribe: function (topic, subName, cb) {		
		if (typeof topic !== 'string' && typeof subName !== 'string' && typeof cb !== 'function'){
			throw new Error('Subscribe arguments of the wrong type.');
		}
		
		//if the topic doesn't exist, create the topic
		if ( !(this.topicList[topic]) ) {
			this.topicList[topic] = [];
		}

		//add the cb function to the topic under the key subName if subName does not exist
		//console.log(this.topicList[topic])
		if(typeof this.topicList[topic][subName] === 'undefined') {
			this.topicList[topic][subName] = cb;
		}
		else {
			throw new Error('Subscription already exists');
		}	
	},
	
	unsubscribe: function (topic, subName) {
		if(typeof topic !== 'string' && typeof subName !== 'string') {
			throw new Error('Unsubscribe arguments of the wrong type.')
		}
			
		delete this.topicList[topic][subName];
	},
	
	publish: function (topic) {
		var arg = [];
		
		if (typeof topic !== 'string'){
			throw new Error('Topic must be a string');
		}
		
		//any arguments passed to the subscribed fn's will need to be an array
		if ( (arguments[1] !== undefined) && (arguments[1] instanceof Array) ) {
			arg = arguments[1];
		}
		
		//check if the topic exists. a topic exists if there are any subscriptions to it
		//if it doesnt exist, dont allow the user to publish this topic
		if (this.topicList[topic] === undefined) {
			throw new Error('No subscriptions to topic: '+topic);
		}
		else {
			/* iterate over the subscriptions for this topic and invoke each cb function
			 * passing it any arguments from the arguments array at position 1
			 */
			for(var key in this.topicList[topic]) {	
				if(this.topicList[topic].hasOwnProperty(key)) {
					this.topicList[topic][key](arg);
				}
			}
		}
	}
};
