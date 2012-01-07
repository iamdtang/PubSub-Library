var PS = (function() {
	 
	/* topicList is an object containing topics. 
	 * Each topic is an associative array, where the key is the subscription name and the value is the function
	 */
	var topicList = {},
		subID = 0;
	
	var subscribe = function (topic, cb) {	
		if (typeof topic !== 'string' && typeof cb !== 'function') {
			throw new Error('Subscribe arguments of the wrong type.');
		}
		
		//if the topic doesn't exist, create the topic
		if ( !(topicList[topic]) ) {
			topicList[topic] = {};
		}
		
		//add the cb function to the topic under the key subID
		subID += 1;
		topicList[topic][subID] = cb;
				
		return subID;
	};
	
	var unsubscribe = function (topic, subID) {
		if(typeof topic !== 'string' && typeof subID !== 'number') {
			throw new Error('Unsubscribe arguments of the wrong type.')
		}
		
		if(topicList[topic][subID]){
			delete topicList[topic][subID];
			return true;
		}	
	};
	
	var publish = function (topic) {
		var arg = null;
		
		if (typeof topic !== 'string'){
			throw new Error('Topic must be a string');
		}
		
		if (arguments[1] !== undefined) {
			arg = arguments[1];
		}
		
		//check if the topic exists. a topic exists if there are any subscriptions to it
		//if it doesnt exist, dont allow the user to publish this topic
		if (topicList[topic] === undefined) {
			throw new Error('No subscriptions to topic: '+topic);
		}
		else {
			/* iterate over the subscriptions for this topic and invoke each cb function
			 * passing it any arguments from the arguments array at position 1
			 */
			for(var key in topicList[topic]) {	
				if(topicList[topic].hasOwnProperty(key)) {
					topicList[topic][key](arg);
				}
			}
		}
	};
	
	return {
		publish: publish,
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
	
})();
