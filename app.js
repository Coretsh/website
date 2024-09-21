function comparePrices() {
  // Get inputs for Item 1
  const item1Amount = parseFloat(document.getElementById('item1-amount').value);
  const item1Price = parseFloat(document.getElementById('item1-price').value);
  const item1Unit = document.getElementById('item1-unit').value;

  // Get inputs for Item 2
  const item2Amount = parseFloat(document.getElementById('item2-amount').value);
  const item2Price = parseFloat(document.getElementById('item2-price').value);
  const item2Unit = document.getElementById('item2-unit').value;

  // Conversion factors to grams (for uniform comparison)
  const conversionFactors = {
    lb: 453.592,
    oz: 28.3495,
    g: 1,
    kg: 1000
  };

  // Check if inputs are valid
  if (isNaN(item1Amount) || isNaN(item1Price) || isNaN(item2Amount) || isNaN(item2Price)) {
    document.getElementById('result').textContent = "Please enter valid numbers for both items.";
    return;
  }

  // Convert amounts to grams
  const item1AmountInGrams = item1Amount * conversionFactors[item1Unit];
  const item2AmountInGrams = item2Amount * conversionFactors[item2Unit];

  // Calculate price per gram for each item
  const pricePerGram1 = item1Price / item1AmountInGrams;
  const pricePerGram2 = item2Price / item2AmountInGrams;

  // Calculate the price per original unit for comparison display
  const pricePerUnit1 = item1Price / item1Amount;
  const pricePerUnit2 = item2Price / item2Amount;

  // Compare and display the result
  let resultText = '';
  if (pricePerGram1 < pricePerGram2) {
    resultText = `Item 1 is cheaper at $${pricePerUnit1.toFixed(2)} per ${item1Unit}.`;
  } else if (pricePerGram2 < pricePerGram1) {
    resultText = `Item 2 is cheaper at $${pricePerUnit2.toFixed(2)} per ${item2Unit}.`;
  } else {
    resultText = `Both items cost the same at $${pricePerUnit1.toFixed(2)} per ${item1Unit}.`;
  }

  document.getElementById('result').textContent = resultText;
}
