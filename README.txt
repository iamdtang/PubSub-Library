Check out the demo page for examples on how to use the methods of the PS object.

====Subscribe======
Method: subscribe(topic, function)
Example: var subscription1 = PS.subscribe('newSearch', function() { /*your code goes here*/ });
Return Value: The subscribe method returns a subscription identifier that can be used for unsubscribing the function from this topic

====Unsubscribe====
Method: unsubscribe(topic, index), index refers to the subscription ID returned from the subscribe method
Example: PS.unsubscribe('newSearch', subsciption1);

====Publish========
Method: publish(topic [,arg]), 
Arguments: arg is an optional array of data that you would like to go along with a publication
Example: PS.publish('newSearch', [searchPhrase, timeOfSearch]); where searchPhrase and timeOfSearch represent variables


