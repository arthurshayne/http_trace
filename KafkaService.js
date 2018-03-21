var kafka = require('kafka-node');
 
const KafkaService = {
    producer: null,
    connect: (connectionString, clientId) => {
        return new Promise(function(resolve, reject){
            const client = new kafka.Client(connectionString, clientId, {
                sessionTimeout: 300,
                spinDelay: 100,
                retries: 2
            });
            
            // For this demo we just log client errors to the console.
            client.on('error', function(error) {
                reject(error);
            });

            KafkaService.producer = new kafka.HighLevelProducer(client);
            KafkaService.producer.on("ready", function() {
                console.log("Kafka Producer is connected and ready.");
                resolve();
            });
             
            // For this demo we just log producer errors to the console.
            KafkaService.producer.on("error", function(error) {
                reject(error);
            });
        });
    },
    sendRecord: (topic, jsonData, callback = () => {}) => {
        const buffer = new Buffer.from(JSON.stringify(jsonData));
 
        // Create a new payload
        const record = [
            {
                topic: topic,
                messages: buffer,
                attributes: 1 /* Use GZip compression for the payload */
            }
        ];
 
        //Send record to Kafka and log result/error
        KafkaService.producer.send(record, callback);
    }
};
 
module.exports = KafkaService;