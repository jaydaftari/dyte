# dyte
#npm install 
run npm install to download all dependencies
# nodemon
run nodemon to run index.js file


#Backend should have the following routes:
A set of routes that lets an “admin” create, read, update, and delete webhooks. The routes should use actions  (“register”, “list”, “update”, “delete”) to carry out the actual functionality and return the result of the action call appropriately as a response.
A route called ‘/action?ip’, which calls the “trigger” action exposed by the “webhooks microservice”. The IP of the user visiting this route should be sent as a parameter to the action.
The “webhooks”  have the following actions:
“webhooks.register”:
This accepts a single parameter called “targetUrl” (the URL to which the webhook be sent out) and id that should be unique , I have not used inbuilt mongodb id for easily recollecting the id for testing purpose.
The action should generate a unique ID (inserted by admin , he can also use mongodb _id if he wants)for the webhook to be created and then save the ID and the “targetUrl” in the database.
This action should return the unique ID as a response.
“webhooks.update”:
This accepts two parameters, “id” and “newTargetUrl”.
 The action should update the target endpoint of a webhook with the specified id to “newTargetUrl”.
Return a success response if the webhook was updated, otherwise, return an appropriate error response (if the webhook wasn't found).
“webhooks.list”:
This action takes no parameters.
The action should query all registered webhooks from the database and return them as a response.
“webhooks.trigger”: 
This accepts a single parameter called “ipAddress”.
Upon calling this action, the list of target URLs for the webhooks is extracted from the database.
An HTTP POST request is sent to each of these target URLs. The request body contains a JSON with the “ipAddress” and a UNIX timestamp of when the webhook was sent.
The requests must be sent to all the target URLs in parallel. Since there might be a huge number of target URLs, you must limit the number of requests that happen concurrently. (E.G., If 200 requests are to be made, you can make the requests in 20 batches of 10 parallel requests)
Bonus: 
If a request to any target URL fails in the “webhooks.trigger” action (i.e. the response has a non 200 status code), the microservice should keep retrying the request until it succeeds (maximum of 5 retries) has been implemented

