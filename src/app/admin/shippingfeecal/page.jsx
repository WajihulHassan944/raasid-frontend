'use client';
import React, { useState } from 'react';
import './shippingfeecal.css';
import { baseUrl } from '@/app/const';

const ShippingFee = () => {
  const [method, setMethod] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [feeResult, setFeeResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculateFee = async () => {
    setFeeResult(null);
    if (!weight) return alert('Please enter weight');

    try {
      setLoading(true);

      if (method === 'tcs') {
        if (!origin || !destination) return alert('Please fill both origin and destination');

        const res = await fetch(
          `${baseUrl}/cities/resolve-zone/${origin}/${destination}/${weight}`
        );
        const data = await res.json();

        if (res.ok) {
          setFeeResult({
            source: 'TCS',
            origin: data.origin,
            destination: data.destination,
            zone: data.zone,
            weight: `${data.weight}`,
            totalCharges: `Rs ${data.shippingFee}`,
          });
        } else {
          throw new Error(data.message || 'TCS fee error');
        }
      }

      if (method === 'post') {
        const weightInGrams = parseFloat(weight);
        const res = await fetch(`${baseUrl}/courier/get-tariff?weight=${weightInGrams}`);
        const data = await res.json();

        console.log('Pakistan Post raw response:', data.raw); // ✅ Debug

        if (res.ok && data?.raw) {
          setFeeResult({
            source: 'Pakistan Post',
            weight: data.raw.weight,
            moFees: `Rs ${data.raw.moFees}`,
            tariff: `Rs ${data.raw.tariff}`,
            totalCharges: `Rs ${data.raw.totalCharges}`,
          });
        } else {
          throw new Error(data.message || 'Post Office fee error');
        }
      }
    } catch (err) {
      console.error('❌ Fee error:', err);
      setFeeResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const labelMap = {
    source: 'Source',
    origin: 'Origin',
    destination: 'Destination',
    zone: 'Zone',
    weight: 'Weight',
    moFees: 'MO Fees',
    tariff: 'Tariff',
    totalCharges: 'Total Charges',
    error: 'Error',
  };

  return (
    <div className="shipping-container">
      <h2>Raasid Shipping Fee Calculator</h2>

      <div className="form-group">
        <label htmlFor="method">Shipping Method:</label>
        <select
          id="method"
          value={method}
          onChange={(e) => {
            setMethod(e.target.value);
            setFeeResult(null);
          }}
        >
          <option value="">Select</option>
          <option value="post">Pakistan Post Office</option>
          <option value="tcs">TCS</option>
        </select>
      </div>

      {method === 'tcs' && (
        <>
          <div className="form-group">
            <label>Origin:</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Enter origin city"
            />
          </div>
          <div className="form-group">
            <label>Destination:</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination city"
            />
          </div>
        </>
      )}

      {method && (
        <div className="form-group">
          <label>Weight (g):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
          />
        </div>
      )}

      {method && (
        <button className="calculate-btn" onClick={handleCalculateFee} disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Fee'}
        </button>
      )}

      {feeResult && (
        <div className="fee-result">
          {feeResult.error ? (
            <p className="error-text">{feeResult.error}</p>
          ) : (
            <ul>
              {Object.entries(feeResult).map(([k, v]) => (
                <li key={k}>
                  <strong>{labelMap[k] || k}:</strong> {v}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ShippingFee;
