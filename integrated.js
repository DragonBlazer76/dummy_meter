#!/usr/bin/env node

'use strict';
var LocalStorage = require('node-localstorage').LocalStorage;
var localstorage = new LocalStorage('./energyvalue');

var CumulativeActiveEnergyExport = parseInt(localstorage.getItem('energy'));


var connectionString1 = 'HostName=AZSGP-REC-IOT-HUB-PRD.azure-devices.net;DeviceId=meter01;SharedAccessKey=M1te0W1w8Mghx/UyimQHE5lRQHqu50IvsVZdGsqfji0=';
// var connectionString2 = 'HostName=AZSGP-REC-IOT-HUB-PRD.azure-devices.net;DeviceId=meter02;SharedAccessKey=QEc+0aWFLO3ynpX+fOQYWcNR7HpXEZ+Wv764nQPfx4c=';
// var connectionString3 = 'HostName=AZSGP-REC-IOT-HUB-PRD.azure-devices.net;DeviceId=meter03;SharedAccessKey=fXfBNTO7DifqMF5ACvjbhfOe0inV77nxM6ETWui/AnY=';
// var connectionString4 = 'HostName=AZSGP-REC-IOT-HUB-PRD.azure-devices.net;DeviceId=meter04;SharedAccessKey=RHC8d6d3daJ7tuoFDM3mYqv/zB+wszKSiEs0mfjfE9Q=';
// var connectionString5 = 'HostName=AZSGP-REC-IOT-HUB-PRD.azure-devices.net;DeviceId=meter05;SharedAccessKey=uZETmgmMg0zeve4xIchJHWBi4j6if8LvqLZC5Qc+Ers=';
// var connectionString6 = 'HostName=AZSGP-REC-IOT-HUB-PRD.azure-devices.net;DeviceId=meter06;SharedAccessKey=wCtk7W06jcI5blDxOj2TGa65eFYDjI2qEcHQzpae4JA=';
// var connectionString7 = 'HostName=AZSGP-REC-IOT-HUB-PRD.azure-devices.net;DeviceId=meter07;SharedAccessKey=SlDBTYO+R5LESH+jDNtVHTDkORg5lRGiBYkvUET+7Sk=';
// var connectionString8 = 'HostName=AZSGP-REC-IOT-HUB-PRD.azure-devices.net;DeviceId=meter08;SharedAccessKey=aJJLkLQl3UYFglAV/6I1FLyFOHodtDuw4IQad3ZsKYE=';
// var connectionString9 = 'HostName=AZSGP-REC-IOT-HUB-PRD.azure-devices.net;DeviceId=meter09;SharedAccessKey=BMS4cshneE9AL4tVyz0RdMsD5rQF+mNj7N41cy93D6k=';
// var connectionString10 = 'HostName=AZSGP-REC-IOT-HUB-PRD.azure-devices.net;DeviceId=meter10;SharedAccessKey=6ELNJBAS9YZanntijrLrg0TF9ZHmGDd4UJ3KuFqYGLQ=';
// var connectionString11 = 'HostName=AZSGP-REC-IOT-HUB-PRD.azure-devices.net;DeviceId=meter11;SharedAccessKey=BRYvmeFpyPfrwZOb3J+NcE7QknhBmCmUDkSZ6+jsqfk=';
// var connectionString12 = 'HostName=AZSGP-REC-IOT-HUB-PRD.azure-devices.net;DeviceId=meter12;SharedAccessKey=FNqnw59Fg+OeGX4v7hoLcDZPQ4JfPtDbupPkRyV1F4o=';

var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;

var client1 = DeviceClient.fromConnectionString(connectionString1, Mqtt);
// var client2 = DeviceClient.fromConnectionString(connectionString2, Mqtt);
// var client3 = DeviceClient.fromConnectionString(connectionString3, Mqtt);
// var client4 = DeviceClient.fromConnectionString(connectionString4, Mqtt);
// var client5 = DeviceClient.fromConnectionString(connectionString5, Mqtt);
// var client6 = DeviceClient.fromConnectionString(connectionString6, Mqtt);
// var client7 = DeviceClient.fromConnectionString(connectionString7, Mqtt);
// var client8 = DeviceClient.fromConnectionString(connectionString8, Mqtt);
// var client9 = DeviceClient.fromConnectionString(connectionString9, Mqtt);
// var client10 = DeviceClient.fromConnectionString(connectionString10, Mqtt);
// var client11 = DeviceClient.fromConnectionString(connectionString11, Mqtt);
// var client12 = DeviceClient.fromConnectionString(connectionString12, Mqtt);

// Print results.
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

function UTCtolocal(date){
  var newDate = new Date();
  newDate.setTime(date.getTime()-(date.getTimezoneOffset()*60000));
  return newDate;
}
// Create a message and send it to the IoT hub every second
setInterval(function(){
  // Simulate telemetry.
  var UniqueDeviceIdentifier1 = 'Meter01'
  // var UniqueDeviceIdentifier2 = 'Meter02'
  // var UniqueDeviceIdentifier3 = 'Meter03'
  // var UniqueDeviceIdentifier4 = 'Meter04'
  // var UniqueDeviceIdentifier5 = 'Meter05'
  // var UniqueDeviceIdentifier6 = 'Meter06'
  // var UniqueDeviceIdentifier7 = 'Meter07'
  // var UniqueDeviceIdentifier8 = 'Meter08'
  // var UniqueDeviceIdentifier9 = 'Meter09'
  // var UniqueDeviceIdentifier10 = 'Meter10'
  // var UniqueDeviceIdentifier11 = 'Meter11'
  // var UniqueDeviceIdentifier12 = 'Meter12' 
  var utctime = new Date()
  var Timestamp = UTCtolocal(utctime);
  CumulativeActiveEnergyExport += 100;
  localstorage.setItem('energy',CumulativeActiveEnergyExport);
  
  // Add the telemetry to the message body.
  var data1 = JSON.stringify({ UniqueDeviceIdentifier: UniqueDeviceIdentifier1, Timestamp: Timestamp, CumulativeActiveEnergyExport: CumulativeActiveEnergyExport});
  // var data2 = JSON.stringify({ UniqueDeviceIdentifier: UniqueDeviceIdentifier2, Timestamp: Timestamp, CumulativeActiveEnergyExport: CumulativeActiveEnergyExport});
  var message1 = new Message(data1);
  // var message2 = new Message(data2);

  // var data3 = JSON.stringify({ UniqueDeviceIdentifier: UniqueDeviceIdentifier3, Timestamp: Timestamp, CumulativeActiveEnergyExport: CumulativeActiveEnergyExport});
  // var data4 = JSON.stringify({ UniqueDeviceIdentifier: UniqueDeviceIdentifier4, Timestamp: Timestamp, CumulativeActiveEnergyExport: CumulativeActiveEnergyExport});
  // var message3 = new Message(data3);
  // var message4 = new Message(data4);
  
  // var data5 = JSON.stringify({ UniqueDeviceIdentifier: UniqueDeviceIdentifier5, Timestamp: Timestamp, CumulativeActiveEnergyExport: CumulativeActiveEnergyExport});
  // var data6 = JSON.stringify({ UniqueDeviceIdentifier: UniqueDeviceIdentifier6, Timestamp: Timestamp, CumulativeActiveEnergyExport: CumulativeActiveEnergyExport});
  // var message5 = new Message(data5);
  // var message6 = new Message(data6);
  
  
  // var data7 = JSON.stringify({ UniqueDeviceIdentifier: UniqueDeviceIdentifier7, Timestamp: Timestamp, CumulativeActiveEnergyExport: CumulativeActiveEnergyExport});
  // var data8 = JSON.stringify({ UniqueDeviceIdentifier: UniqueDeviceIdentifier8, Timestamp: Timestamp, CumulativeActiveEnergyExport: CumulativeActiveEnergyExport});
  // var message7 = new Message(data7);
  // var message8 = new Message(data8);
  
  // var data9 = JSON.stringify({ UniqueDeviceIdentifier: UniqueDeviceIdentifier9, Timestamp: Timestamp, CumulativeActiveEnergyExport: CumulativeActiveEnergyExport});
  // var data10 = JSON.stringify({ UniqueDeviceIdentifier: UniqueDeviceIdentifier10, Timestamp: Timestamp, CumulativeActiveEnergyExport: CumulativeActiveEnergyExport});
  // var message9 = new Message(data9);
  // var message10 = new Message(data10);
  
  // var data11 = JSON.stringify({ UniqueDeviceIdentifier: UniqueDeviceIdentifier11, Timestamp: Timestamp, CumulativeActiveEnergyExport: CumulativeActiveEnergyExport});
  // var data12 = JSON.stringify({ UniqueDeviceIdentifier: UniqueDeviceIdentifier12, Timestamp: Timestamp, CumulativeActiveEnergyExport: CumulativeActiveEnergyExport});
  // var message11 = new Message(data11);
  // var message12 = new Message(data12);

  
  console.log('Sending message: ' + message1.getData());
  // console.log('Sending message: ' + message2.getData());
  // console.log('Sending message: ' + message3.getData());
  // console.log('Sending message: ' + message4.getData());
  // console.log('Sending message: ' + message5.getData());
  // console.log('Sending message: ' + message6.getData());
  // console.log('Sending message: ' + message7.getData());
  // console.log('Sending message: ' + message8.getData());
  // console.log('Sending message: ' + message9.getData());
  // console.log('Sending message: ' + message10.getData());
  // console.log('Sending message: ' + message11.getData());
  // console.log('Sending message: ' + message12.getData());

  // Send the message.
  client1.sendEvent(message1, printResultFor('send'));
  // client2.sendEvent(message2, printResultFor('send'));
  // client3.sendEvent(message3, printResultFor('send'));
  // client4.sendEvent(message4, printResultFor('send'));
  // client5.sendEvent(message5, printResultFor('send'));
  // client6.sendEvent(message6, printResultFor('send'));
  // client7.sendEvent(message7, printResultFor('send'));
  // client8.sendEvent(message8, printResultFor('send'));
  // client9.sendEvent(message9, printResultFor('send'));
  // client10.sendEvent(message10, printResultFor('send'));
  // client11.sendEvent(message11, printResultFor('send'));
  // client12.sendEvent(message12, printResultFor('send'));
}, 5000);