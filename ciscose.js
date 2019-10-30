#!/usr/bin/env node

'use strict';

var CumulativeActiveEnergyExport = 900;
var connectionString1 = 'HostName=AZSGP-REC-IOT-HUB-PRD.azure-devices.net;DeviceId=gatewayprd2_dummy;SharedAccessKey=CxytWGY3gw7cKW6YZNQguIUEIvvNQhvjhZZEn5QbWJE=';
var connectionString2 = 'HostName=AZSGP-REC-IOT-HUB-PRD.azure-devices.net;DeviceId=gatewayprd3_dummy;SharedAccessKey=XMVgqkNAfF3nuZxJpI4/wtuOkk1SGrM2XWFbVH6VSzw=';

var Mqtt = require('azure-iot-device-http').Http;
var DeviceClient = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;

var clientone = DeviceClient.fromConnectionString(connectionString, Mqtt);
var clienttwo = DeviceClient.fromConnectionString(connectionString1, Mqtt);

// Print results.
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

// Create a message and send it to the IoT hub every second
setInterval(function(){
  // Simulate telemetry.
  var UniqueDeviceIdentifierone = 'ZC2000222'
  var UniqueDeviceIdentifiertwo = 'ZC2000223'
  var Timestamp = new Date();
  CumulativeActiveEnergyExport += 100;
  //44500000 + (Math.random() * 6669);
  //900 += 100

  // Add the telemetry to the message body.
  var dataone = JSON.stringify({ UniqueDeviceIdentifier: UniqueDeviceIdentifierone, Timestamp: Timestamp, CumulativeActiveEnergyExport: CumulativeActiveEnergyExport});
  var datatwo = JSON.stringify({ UniqueDeviceIdentifier: UniqueDeviceIdentifiertwo, Timestamp: Timestamp, CumulativeActiveEnergyExport: CumulativeActiveEnergyExport});
  var messageone = new Message(dataone);
  var messagetwo = new Message(datatwo);

  console.log('Sending message: ' + messageone.getData());
  console.log('Sending message: ' + messagetwo.getData());

  // Send the message.
  clientone.sendEvent(messageone, printResultFor('send'));
  clienttwo.sendEvent(messagetwo, printResultFor('send'));
}, 2000);
