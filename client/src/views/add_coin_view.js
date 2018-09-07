const PubSub = require('../helpers/pub_sub.js');


const AddCoinView = function (form) {
  this.form = form;
  this.coinsList = [];
};

AddCoinView.prototype.bindEvents = function () {
  PubSub.subscribe('Cryptotracker:coins-list-data', (event) => {
    this.coinsList = event.detail;
    this.render();
  })
};

AddCoinView.prototype.render = function () {

  const dropDownLabel = this.createLabel();
  dropDownLabel.textContent = "Select a coin :";
  this.form.appendChild(dropDownLabel);

  const coinSelect = this.createSelect();
  this.form.appendChild(coinSelect);

  this.coinsList.forEach((coin) => {
    const coinOption = this.createOption(coin);
    coinSelect.appendChild(coinOption);
  });

  const numberLabel = this.createLabel();
  numberLabel.textContent = "Number of coins :";
  this.form.appendChild(numberLabel);
  
  const numberInput = this.createInput();
  this.form.appendChild(numberInput);
};

AddCoinView.prototype.createOption = function (coin) {
  const option = document.createElement('option');
  option.value = coin.symbol;
  const coinPrice = coin.quotes.USD.price;
  option.textContent = `${coin.name} (${coin.symbol}) - Price: ${coin.quotes.USD.price.toFixed(2)}`;
  return option;
};

AddCoinView.prototype.createSelect = function () {
  const select = document.createElement('select');
  select.id = "coin-select";
  return select;
};

AddCoinView.prototype.createInput = function () {
  const input = document.createElement('input');
  input.type = 'number';
  input.min = 0;
  input.step = 0.01;
  return input;
};

AddCoinView.prototype.createLabel = function () {
  const label = document.createElement('label');
  return label;
};

module.exports = AddCoinView;
