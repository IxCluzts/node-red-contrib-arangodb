module.exports = function(RED) {
    function ArangoCreateCollectionNode(config) {
        RED.nodes.createNode(this, config);
        this.dbconfig = RED.nodes.getNode(config.dbconfig);
        this.dbname = config.dbname;
        this.url = config.url;

        var node = this;

        node.on('input', function(msg) {
            Database = require('arangojs').Database;
            db = new Database(node.dbconfig.url);
            
            db.useDatabase(msg.arangodb || node.dbconfig.dbname);

            if(!msg.collection){
                msg.payload = { "status": "fail", 
                                "error": "No collection provided"}
                node.send(msg)
                return;
            }
            collection = db.collection(msg.collection);

            collection.create().then(
                () => { 
                    msg.payload = { "status": "success" };
                    node.send(msg)
                },
                err => {
                    msg.payload = { "status": "fail", "error": err }
                    node.send(msg)
                }
            );

        });
    }
    RED.nodes.registerType("[Arango]createcollection",ArangoCreateCollectionNode);

}
