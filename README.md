ADD your .env File and add the follwoing lines

USERNAME=<your user name>
PASSWORD=<your password>
TOKEN=<your security Token>

////////////////////////////////////


In the Eventlister.js

onst platformEvents = []   is a list of the events ( sheild events or other including platform Evetns tht you want to listend for. by default ALL availble sheild event types are scuscribed to )
NOTE   platform events take the form MyPlatformEventName__e

For change data capture you need to make sure any objects you try to listen to have been selected in you Change data capture set up in the Salesforce platform
const cdcEntities = []  contains a list of the objects you are listening for changes in rember that custom objects end in __c 
