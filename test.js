var kafkaService = require('./KafkaService.js');

const ips = [
    "117.11.200.73",
    "36.192.78.56",
    "106.127.45.147",
    "222.207.123.45",
    "211.141.23.12",
    "218.79.17.19",
    "118.203.19.22",
    "118.125.29.32",
    "222.85.39.34",
    "175.43.49.44",
    "60.13.63.56",
    "103.22.11.33"
]

const urls = [
    "http://www.baidu.com",
    "http://www.google.com",
    "http://www.sina.com",
    "http://www.soho.com",
    "http://www.yahoo.com",
    "http://www.weibo.com",
    "http://www.wechat.com",
    "http://www.microsoft.com",
    "http://www.cisco.com",
    "http://www.boya-triz.com",
]

kafkaService.connect("localhost:2181", "nodejs-client")
            .then(() => {
                setInterval(() => {
                    const r = Math.random();
                    const ips_index = Math.floor(r * (ips.length - 1));
                    const urls_index = Math.floor(r * (urls.length - 1));
                    kafkaService.sendRecord("traffic-request", {"ip": ips[ips_index], "url": urls[urls_index]}, () => {
                        // console.log(`ip: ${ips[ips_index]}, url: ${urls[urls_index]}`)
                    });
                }, 0.1);
            })
            .catch(error => {
                console.log(error);
            });