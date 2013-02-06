#PS.js

##Browser Usage
Minified and unminified versions in the __dist__ folder.

```html
	<script src="pubsub.min.js"></script>
	<script>
		var ps = new PS();
	</script>
```

##Node.js Usage

```
	npm install dtang-pubsub
```

Link to NPM page: [https://npmjs.org/package/dtang-pubsub](https://npmjs.org/package/dtang-pubsub)


```js
	var Evt = require('pubsub');
	var ps = new Evt.PS();
```


##Public Methods

####publish(topic, [data])
* topic (string) - your custom event name 
* data (mixed) optional argument for any data that you would like to be passed with a publication and used in subscriptions.

####subscribe(topic, callback, [context])
* topic (string) - your custom event name
* callback (function) - function invoked when _topic_ is published
* context (object) - optional argument for what _this_ will refer to within the callback function. By default, _this_ will point to the current PS instance
* returns a subscription ID to potentially be used in unsubscribing

####unsubscribe(subscriptionID)
* subscriptionID (int) - returned from the subscribe method 


##Examples

```js
	var ps = new PS();

	var s1 = ps.subscribe('test-topic', function(data) {
		console.log(this, data);
	});

	// 3rd argument will be the context used for the 2nd argument
	var s2 = ps.subscribe('test-topic', function(data) {
		console.log(this, data);
	}, {
		name: 'David',
		age: 27
	});

	ps.publish('test-topic', 'some data');

	ps.unsubscribe(s1); // unsubscribes s1
	console.log(ps);
```

