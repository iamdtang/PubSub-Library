Check out the demo pages for examples on how to use the methods of the PS object. 

====Subscribe======
Method: subscribe(topic, function)
Return: a unique id for the unsubscribe method
Example: var sub1 = PS.subscribe('search', function() { /*your code goes here*/ });

====Unsubscribe====
Method: unsubscribe(topic, subID)
subID - a unique identifier returned from a subscription.
Example: PS.unsubscribe('search', sub1);

====Publish========
Method: publish(topic, arg), 
Arguments: arg is an optional parameter for data that you would like to be passed with a publication and used in subscriptions. arg can be any data type
Example: PS.publish('search', searchPhrase);

see demo file more a more detailed example

