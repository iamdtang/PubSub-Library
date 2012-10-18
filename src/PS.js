(function(window, undefined) {
	 
	var PS = function() {
		this.topicList = {};
		this.topicLookup = {};
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
			if (this.topicList[topic]) {
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
					
			this.topicLookup[this.subID] = topic;
			return this.subID;
		},

		unsubscribe: function(subID) {
			var topic;

			if (typeof subID !== 'number') {
				throw new Error('Subscription ID of the wrong type.');
			}

			if (this.topicLookup.hasOwnProperty(subID)) {
				topic = this.topicLookup[subID];

				delete this.topicList[topic][subID];
				delete this.topicLookup[subID];
				return true;
			}

			return false;
		}
	};
	
	window.PS = PS;

})(window);
