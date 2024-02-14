const jsforce = require('jsforce');
require('dotenv').config();



// Salesforce login credentials
const username = process.env.USERNAME;
const password = process.env.PASSWORD + process.env.TOKEN; // Include your security token if required

// Initialize a new Salesforce connection
const conn = new jsforce.Connection({
    loginUrl: 'https://login.salesforce.com' // Use https://test.salesforce.com for sandbox
});

// Lists of Platform Events and CDC entities to subscribe to
const platformEvents = [
    'ApiEventStream',
    'ApiAnomalyEvent',
    'BulkApiResultEvent',
    'ConcurLongRunApexErrEvent',
    'CredentialStuffingEvent',
    'FileEvent',
    'GuestUserAnomalyEvent',
    'LightningUriEventStream',
    'ListViewEventStream',
    'LoginEventStream',
    'LoginAsEventStream',
    'LogoutEventStream',
    'PermissionSetEvent',
    'ReportEventStream',
    'ReportAnomalyEvent',
    'SessionHijackingEvent',
    'UriEventStream',
    'demo__e'
    // Add more Platform Event API names as needed
];
const cdcEntities = [
    'Account',
    'Contact',
    // Add more CDC-enabled objects as needed
];

// Login to Salesforce
conn.login(username, password, (err, userInfo) => {
    if (err) {
        console.error('Error connecting to Salesforce:', err);
        return;
    }

    console.log('Successfully connected to Salesforce');

    // Subscribe to Platform Events
    platformEvents.forEach((event) => {
        const channel = `/event/${event}`;
        conn.streaming.topic(channel).subscribe((message) => {
            //console.log(`Received Platform Event (${event}):`, message);
            console.log(`Received Platform Event (${event}):`, JSON.stringify(message.payload, null, 2));
            // Handle the Platform Event message here
        });
        console.log(`Subscribed to Platform Event: ${event}`);
    });

    // Subscribe to CDC Events for specified entities
    const cdcChannel = '/data/ChangeEvents';
    conn.streaming.topic(cdcChannel).subscribe((message) => {
        // Extract the entity name from the event message
        const entityName = message.payload.ChangeEventHeader.entityName;
        // Check if the event is for one of the specified entities
        if (cdcEntities.includes(entityName)) {
            //console.log(`Received CDC Event for ${entityName}:`, message);
            console.log(`Received CDC Event for ${entityName}:`, JSON.stringify(message.payload, null, 2));
            // Handle the CDC Event message here
        }
    });
    console.log(`Subscribed to CDC Events for entities: ${cdcEntities.join(', ')}`);
});
