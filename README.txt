Check out the demo pages for examples on how to use the methods of the PS object.

====Subscribe======
Method: subscribe(topic, subName, function)
Example: PS.subscribe('search', 'handleResults', function() { /*your code goes here*/ });

====Unsubscribe====
Method: unsubscribe(topic, subName)
subName - a unique string identifier for a subscription
Example: PS.unsubscribe('search', 'handleResults');

====Publish========
Method: publish(topic [,arg]), 
Arguments: arg is an optional array of data that you would like to go along with a publication
Example: PS.publish('search', [searchPhrase, timeOfSearch]); where searchPhrase and timeOfSearch represent variables


