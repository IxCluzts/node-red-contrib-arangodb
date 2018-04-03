# node-red-contrib-arangodb
This is the project build dedicately for node-red (https://nodered.org)
to be easily connect with the arangodb (http://www.arangodb.com)
which is open-source graph database as well.

### How to use

#### 1. Create Collection Node
This is the node use for create collection for database. This is as same as the table for the RDBMS. 

#### 2. Insert
Data payload will be inserted into the selected collection that parse into this node.

#### 3. Query
This is the node to send AQL (Arango Query Language) to the database to query data as you want. Please refer to the document in the arangodb (http://www.arangodb.com) to learn more about how to use

#### 4. Update
Update data for specific document in the collection. The node need the id or the revision to update the document. This is not replace. 
