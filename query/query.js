module.exports = function(RED) {
    function ArangoQueryNode(config) {
        RED.nodes.createNode(this, config);
        this.dbname = config.dbname;
        this.url = config.url;
        this.dbconfig = RED.nodes.getNode(config.dbconfig);
        var node = this;

        node.on('input', function(msg) {
            Database = require('arangojs').Database;
            db = new Database(node.dbconfig.url);
            
            db.useDatabase(node.dbconfig.dbname);
         
                db.query(
                    msg.query,
                    msg.vars || {}
                )
                .catch(function (error){
                    msg.payload = {
                        "status": "fail",
                        "error": error
                    }
                    node.send(msg)
                }).then(function (cursor) {
                    cursor
                        .map(x => x)
                        .then(x => {
                            msg.payload = x;
                            node.send(msg)
                        }) 
                })
                
            
        });
    }
    RED.nodes.registerType("[Arango]query", ArangoQueryNode);

}
