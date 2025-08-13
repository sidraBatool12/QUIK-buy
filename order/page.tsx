'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function OrderSummaryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Product details from URL
  const productId = searchParams.get('id') || '';
  const color = searchParams.get('color') || '';
  const quantity = parseInt(searchParams.get('quantity') || '1', 10);

  // Example product data (replace with real data or fetch)
  const product = {
    id: productId,
    name: 'Sample Product',
    price: 444,
    image: 'https://images.unsplash.com/photo-1570841355079-3bc20c0ba1c1', // example image
  };

  // User data from localStorage (simulate)
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Delivery option state
  const deliveryFee = 200;

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('');

  // Payment specific fields
  const [easyPaisaNumber, setEasyPaisaNumber] = useState('');
  const [jazzCashNumber, setJazzCashNumber] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');

  useEffect(() => {
    setUserName(localStorage.getItem('userName') || '');
    setPhone(localStorage.getItem('phone') || '');
    setAddress(localStorage.getItem('address') || '');
  }, []);

  const totalItemPrice = product.price * quantity;
  const totalPrice = totalItemPrice + deliveryFee;

  function handleProceedToPay() {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    // Payment method specific validation
    if (paymentMethod === 'easypaisa' && !easyPaisaNumber) {
      alert('Please enter your EasyPaisa number.');
      return;
    }
    if (paymentMethod === 'jazzcash' && !jazzCashNumber) {
      alert('Please enter your JazzCash number.');
      return;
    }
    if (paymentMethod === 'bank') {
      if (!bankName || !bankAccountNumber) {
        alert('Please enter your bank name and account number.');
        return;
      }
    }

    if (paymentMethod === 'cod') {
      alert('Order confirmed! You chose Cash on Delivery.');
      router.push('/order-confirmation');
      return;
    }

    // For other payments, simulate payment process and then redirect/order confirmation
    alert(`Payment initiated via ${paymentMethod.toUpperCase()}.`);
    router.push('/order-confirmation');
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 max-w-5xl mx-auto rounded-lg grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Shipping & product details */}
      <div className="md:col-span-2 bg-gray-800 p-6 rounded-lg space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Shipping & Billing</h2>
          <p><strong>Name:</strong> {userName || 'No name saved'}</p>
          <p><strong>Phone:</strong> {phone || 'No phone saved'}</p>
          <p><strong>Address:</strong> {address || 'No address saved'}</p>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-lg font-semibold mb-4">Delivery Option</h3>
          <label className="block border border-blue-500 rounded-lg p-4 cursor-pointer hover:bg-blue-800">
            <input
              type="radio"
              name="delivery"
              checked
              readOnly
              className="mr-3"
            />
            Rs. {deliveryFee} — Standard Delivery (5-7 days)
          </label>
        </div>

        <div className="border-t border-gray-700 pt-6 flex gap-4 items-center">
          <img src={product.image} alt={product.name} className="w-24 rounded" />
          <div>
            <p className="font-semibold">{product.name}</p>
            <p>Color: {color}</p>
            <p>Quantity: {quantity}</p>
            <p>Price per item: Rs. {product.price}</p>
          </div>
        </div>
      </div>

      {/* Right: Order Summary and Payment Methods */}
      <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Items Total ({quantity} item{quantity > 1 ? 's' : ''})</span>
            <span>Rs. {totalItemPrice}</span>
          </div>

          <div className="flex justify-between mb-6 border-b border-gray-700 pb-6">
            <span>Delivery Fee</span>
            <span>Rs. {deliveryFee}</span>
          </div>

          <div className="flex justify-between text-lg font-bold text-orange-400 mb-6">
            <span>Total</span>
            <span>Rs. {totalPrice}</span>
          </div>

          <h3 className="mb-3 font-semibold">Select Payment Method</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="easypaisa"
                checked={paymentMethod === 'easypaisa'}
                onChange={() => setPaymentMethod('easypaisa')}
              />
              EasyPaisa
            </label>

            {paymentMethod === 'easypaisa' && (
              <input
                type="text"
                placeholder="Enter EasyPaisa Number"
                value={easyPaisaNumber}
                onChange={(e) => setEasyPaisaNumber(e.target.value)}
                className="mt-2 p-2 rounded text-black w-full"
              />
            )}

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="jazzcash"
                checked={paymentMethod === 'jazzcash'}
                onChange={() => setPaymentMethod('jazzcash')}
              />
              JazzCash
            </label>

            {paymentMethod === 'jazzcash' && (
              <input
                type="text"
                placeholder="Enter JazzCash Number"
                value={jazzCashNumber}
                onChange={(e) => setJazzCashNumber(e.target.value)}
                className="mt-2 p-2 rounded text-black w-full"
              />
            )}

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={paymentMethod === 'bank'}
                onChange={() => setPaymentMethod('bank')}
              />
              Bank Transfer
            </label>

            {paymentMethod === 'bank' && (
              <div className="mt-2 space-y-2">
                <input
                  type="text"
                  placeholder="Enter Bank Name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="p-2 rounded text-black w-full"
                />
                <input
                  type="text"
                  placeholder="Enter Account Number"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  className="p-2 rounded text-black w-full"
                />
              </div>
            )}

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
              />
              Cash on Delivery
            </label>
          </div>
        </div>

        <button
          onClick={handleProceedToPay}
          className="mt-8 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded py-3"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}
