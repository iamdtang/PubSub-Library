#PS() Methods
* publish(topic, [data])
	* topic (_string_) - your custom event name 
	* data (_mixed_) optional argument for any data that you would like to be passed with a publication and used in
	subscriptions.
* subscribe(topic, callback, [context])
	* topic (_string_) - your custom event name
	* callback (_function_) - function invoked when _topic_ is published
	* context (_object_) - optional argument for what _this_ will refer to within the callback function. By default, _this_ will point to the current PS instance
	* returns a subscription ID to potentially be used in unsubscribing
* unsubscribe(topic, subscriptionID)
	* topic (_string_) - your custom event name
	* subscriptionID (_int_) - returned from the subscribe method 



##Examples
```js
	
	var ps = new PS();

	var s1 = ps.subscribe('test-topic', function(data) {
		console.log(this, data);
	});

	var s2 = ps.subscribe('test-topic', function(data) {
		console.log(this, data);
	}, {
		name: 'David',
		age: 26
	});

	ps.publish('test-topic', 'some data');

	ps.unsubscribe('test-topic', s1); // removes s1 from topicList
	console.log(ps);
```

