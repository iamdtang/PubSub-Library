/*! PubSub-Library - v1.1.0 - 2012-09-21
* https://github.com/skaterdav85/PubSub-Library.git
* Copyright (c) 2012 David Tang; Licensed MIT, GPL */

(function(window, undefined) {
	 
	var PS = function() {
		this.topicList = {};
		this.subID = 0;
	};

	PS.prototype = {
		constructor: PS,

		publish: function(topic) {
			var key, sub, arg = null;
		
			if (typeof topic !== 'string'){
				throw new Error('Topic must be a string');
			}
			
			if (arguments[1] !== undefined) {
				arg = arguments[1];
			}
			
			//check if the topic exists. a topic exists if there are any subscriptions to it
			//if it doesnt exist, dont allow the user to publish this topic
			if (!this.topicList[topic]) {
				throw new Error('No subscriptions to topic: ' + topic);
			} else {
				/* iterate over the subscriptions for this topic and invoke each cb function
				 * passing it any arguments from the arguments array at position 1
				 */
				for (key in this.topicList[topic]) {
					if (this.topicList[topic].hasOwnProperty(key)) {
						sub = this.topicList[topic][key];
						sub.cb.call(sub.context, arg);
					}
				}
			}
		},

		subscribe: function(topic, cb, context) {
			var contx;

			if (typeof topic !== 'string' && typeof cb !== 'function') {
				throw new Error('Subscribe arguments of the wrong type.');
			}
			
			//if the topic doesn't exist, create the topic
			if ( !(this.topicList[topic]) ) {
				this.topicList[topic] = {};
			}
			
			//add the cb function to the topic under the key subID
			this.subID += 1;
			contx = context || this;

			this.topicList[topic][this.subID] = {
				cb: cb,
				context: contx
			};
					
			return this.subID;
		},

		unsubscribe: function(topic, subID) {
			if (typeof topic !== 'string' && typeof subID !== 'number') {
				throw new Error('Unsubscribe arguments of the wrong type.');
			}
			
			if (this.topicList[topic][subID]){
				delete this.topicList[topic][subID];
				return true;
			}

			return false;
		}
	};
	
	window.PS = PS;

})(window);
