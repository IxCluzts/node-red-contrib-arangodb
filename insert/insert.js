module.exports = function(RED) {
    function ArangoInsertNode(config) {
        RED.nodes.createNode(this, config);
        this.dbname = config.dbname;
        this.dbconfig = RED.nodes.getNode(config.dbconfig);
        this.url = config.url;
        var node = this;

        node.on('input', function(msg) {
            Database = require('arangojs').Database;
            db = new Database(node.dbconfig.url);
            
            db.useDatabase(node.dbconfig.dbname);

            if(!msg.collection){
                msg.payload = { "status": "fail", 
                                "error": "No collection provided"}
                node.send(msg)
                return;
            }

            collection = db.collection(msg.collection);
            collection.save(msg.payload).then(
                meta => {
                    msg.payload = { "status":' Document saved',
                                    "revision": meta._rev };
                    node.send(msg)
                },
                err => {
                    msg.payload = { "status": "fail", 
                                    "error": err }
                    node.send(msg)
                }
            );
        });
    }
    RED.nodes.registerType("[Arango]insert",ArangoInsertNode);

}
