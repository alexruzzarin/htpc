/*jshint sub:true*/

const request = require('request');
let Service, Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory(
    'homebridge-meteostation',
    'HomeMeteo',
    HomeMeteoAccessory
  );
};

function HomeMeteoAccessory(log, config) {
  this.log = log;
  this.name = config['name'] || 'Meteostation';
  this.url = config['url'];
  this.temp_url = config['temp_url'] || '/temperature';
  this.humi_url = config['humi_url'] || '/humidity';
  this.freq = config['freq'] || 60000;

  this.services = [];

  this.informationService = new Service.AccessoryInformation();
  informationService
    .setCharacteristic(Characteristic.Name, this.name)
    .setCharacteristic(Characteristic.Manufacturer, 'Alex')
    .setCharacteristic(Characteristic.Model, 'ESP v0')
    .setCharacteristic(Characteristic.SerialNumber, this.url);

  this.temperatureService = new Service.TemperatureSensor();
  this.temperatureService
    .setCharacteristic(Characteristic.Name, 'Temperature Sensor')
    .getCharacteristic(Characteristic.CurrentTemperature)
    .on('get', this.getTemperature.bind(this));
  this.services.push(this.temperatureService);

  this.humidityService = new Service.HumiditySensor('Humidity Sensor');
  this.humidityService
    .setCharacteristic(Characteristic.Name, 'Humidity Sensor')
    .getCharacteristic(Characteristic.CurrentRelativeHumidity)
    .on('get', this.getHumidity.bind(this));
  this.services.push(this.humidityService);

  setInterval(() => {
    this.getTemperature((err, value) => {
      if (err) {
        this.temperatureService.setCharacteristic(
          Characteristic.StatusFault,
          Characteristic.StatusFault.GENERAL_FAULT
        );
        return;
      }

      this.temperatureService.setCharacteristic(
        Characteristic.StatusFault,
        Characteristic.StatusFault.NO_FAULT
      );
      this.temperatureService.setCharacteristic(
        Characteristic.CurrentTemperature,
        value
      );
    });

    this.getHumidity((err, value) => {
      if (err) {
        this.humidityService.setCharacteristic(
          Characteristic.StatusFault,
          Characteristic.StatusFault.GENERAL_FAULT
        );
        return;
      }

      this.humidityService.setCharacteristic(
        Characteristic.StatusFault,
        Characteristic.StatusFault.NO_FAULT
      );
      this.humidityService.setCharacteristic(
        Characteristic.CurrentRelativeHumidity,
        value
      );
    });
  }, this.freq);
}

HomeMeteoAccessory.prototype.getTemperature = function(callback) {
  getValue(this.url + this.temp_url, callback);
};

HomeMeteoAccessory.prototype.getHumidity = function(callback) {
  getValue(this.url + this.humi_url, callback);
};

function getValue(url, callback) {
  request(url, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return callback(error);
    }
    const value = parseFloat(body);
    return callback(null, value);
  });
}

HomeMeteoAccessory.prototype.getServices = function() {
  return this.services;
};
