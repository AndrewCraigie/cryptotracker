const PubSub = require('../helpers/pub_sub.js');
const element = require('../helpers/element.js');

const CoinView = function (container, coin) {

  this.container = container;
  this.coin = coin;

};

CoinView.prototype.handleCoinDivClick = function(event){

  PubSub.publish('CoinView:coin-selected', this.coin);

};

CoinView.prototype.render = function () {

  const coinDiv = element.make({
    tag: 'div',
    attribs: {
      class: 'coin',
      'data-coin-symbol': `${this.coin.symbol}`,
      'data-coin-price': `${this.coin.price}`,
      'data-coin-quantity': `${this.coin.portfolioQuantity}`,
      'data-portfolioId': `${this.coin.portfolioId}`
    }
  });

  const namePara = element.make({
    tag: 'p',
    attribs: {
      class: 'coin-view-coin-name'
    },
    content: this.coin.name
  });
  coinDiv.appendChild(namePara);

  const symbolPara = element.make({
    tag: 'p',
    attribs: {
      class: 'coin-view-coin-symbol'
    },
    content: this.coin.symbol
  })
  coinDiv.appendChild(symbolPara);

  const valuePara = element.make({
    tag: 'p',
    attribs: {
      class: 'coin-view-coin-price'
    },
    content: `${this.coin.portfolioValue.toFixed(0)}`
  });
  coinDiv.appendChild(valuePara);

  coinDiv.addEventListener('click', this.handleCoinDivClick.bind(this));

  this.container.appendChild(coinDiv);
};


module.exports = CoinView;
