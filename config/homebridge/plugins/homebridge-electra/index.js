/*jshint sub:true*/

const request = require('request');
let Service, Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory(
    'homebridge-electra',
    'Electra',
    ElectraAccessory
  );
};

function ElectraAccessory(log, config) {
  this.log = log;
  this.name = config['name'] || 'Electra AC';
  this.url = config['url'];
  this.freq = config['freq'] || 60000;

  this.services = [];

  this.informationService = new Service.AccessoryInformation(this.name);
  informationService
    .setCharacteristic(Characteristic.Manufacturer, "Electra")
    .setCharacteristic(Characteristic.Model, 'RC3 ESP v0')
    .setCharacteristic(Characteristic.SerialNumber, this.url);

  this.thermostatService = new Service.Thermostat('Air Conditioner');
  // // Required Characteristics

  // this.addCharacteristic(Characteristic.CurrentHeatingCoolingState); //READ
  // Characteristic.CurrentHeatingCoolingState.OFF = 0;
  // Characteristic.CurrentHeatingCoolingState.HEAT = 1;
  // Characteristic.CurrentHeatingCoolingState.COOL = 2;

  // this.addCharacteristic(Characteristic.TargetHeatingCoolingState); // READ, WRITE
  // Characteristic.TargetHeatingCoolingState.OFF = 0;
  // Characteristic.TargetHeatingCoolingState.HEAT = 1;
  // Characteristic.TargetHeatingCoolingState.COOL = 2;
  // Characteristic.TargetHeatingCoolingState.AUTO = 3;

  // this.addCharacteristic(Characteristic.CurrentTemperature); // READ
  // this.addCharacteristic(Characteristic.TargetTemperature); //READ, WRITE

  // this.addCharacteristic(Characteristic.TemperatureDisplayUnits); //READ, WRITE
  // Characteristic.TemperatureDisplayUnits.CELSIUS = 0;
  // Characteristic.TemperatureDisplayUnits.FAHRENHEIT = 1;

  // // Optional Characteristics
  // this.addOptionalCharacteristic(Characteristic.CurrentRelativeHumidity); //READ

}

ElectraAccessory.prototype.getServices = function() {
  return this.services;
};
