/**
 *
 */
const shoesPrices = [100, 80];
const clothesPrices = [120, 200, 150];
// 計算Function
const totalPrice = (...prices) => prices.reduce((pre, cur) => pre + cur, 0);
const discount = (price, off) => price * ((100 - off) / 100);
// totalPrice Currying
const totalPriceCurrying =
  () =>
  (...prices) =>
    totalPrice(...prices);
// dicount currying
const discountCurrying = (off) => (price) => discount(price, off);
/**
 * calculate pipe
 * 先將公式傳入不作計算，拋出組合後的計算公式 (currying)
 * 計算時將每個公式的結果拋入給下一個公式去進行計算 (pipe)
 */
const calculate =
  (...formula) =>
  (...prices) =>
    formula.reduce(
      (prices, formulaFn) =>
        formulaFn(...(Array.isArray(prices) ? prices : [prices])),
      prices
    );

// 商品全面九折計算公式
const totalPriceCalculate = calculate(
  totalPriceCurrying(),
  discountCurrying(10)
);
console.log('A顧客金額');
console.log(totalPriceCalculate(...shoesPrices));

// 鞋子折扣計算公式
const shoesPriceCalcuate = calculate(
  totalPriceCurrying(),
  discountCurrying(10)
);
// 衣服折扣計算公式
const clothesPriceCalcuate = calculate(
  totalPriceCurrying(),
  discountCurrying(20)
);
console.log('B顧客金額');
console.log(
  totalPriceCalculate(
    shoesPriceCalcuate(...shoesPrices),
    clothesPriceCalcuate(...clothesPrices)
  )
);
