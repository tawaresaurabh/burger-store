# Server B

This directory is for the code of the _server B_. A starter Dockerfile has been added, it has some comments to get you started.

To get started you should run `npm init` in this directory to initialize the Node project. This will create a `package.json`-file, which is used to define the project's attributes, dependencies etc. You should next create the index.js file.

### RabbiMQ
server-b uses two queue to communicate with server-a

**orderGenerationQueue** : This queue contains the newly placed order to be sent from server-a to server-b for processing.

**orderCompletionQueue** : This queue contains orders processed by server-b to be sent to server-a