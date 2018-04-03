module.exports = function(RED) {
    function DBConfigNode(n) {
        RED.nodes.createNode(this,n);
        this.url = n.url;
        this.dbname = n.dbname;

        // this.on('close', function() {
        //     // tidy up any state
        // });
    }
    RED.nodes.registerType("dbconfig", DBConfigNode);

}
