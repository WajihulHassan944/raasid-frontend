"use client";

import Head from "next/head";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";
import "./styles.css";
import { baseUrl } from '@/app/const';
import { clearCart } from '@/app/redux/features/cartSlice';
import { toast } from "react-toastify";

const TCS_TARIFF = {
  'withinCity': { 'upto0_5': 127, 'upto1': 170, 'additional': 170 },
  'sameZone': { 'upto0_5': 170, 'upto1': 212, 'additional': 170 },
  'differentZone': { 'upto0_5': 212, 'upto1': 255, 'additional': 170 },
};
const BASE_WEIGHT_MAP = {
  'ready to eat meals': 275,
  'granola bars': 80,
  'mres': 1280,
};
export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { userData } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    phone: '',
    shippingMethod: '',
    paymentMethod: '',
  });

  const [loading, setLoading] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        email: userData.email,
        fullName: `${userData.firstName} ${userData.lastName || ''}`,
      }));
    }
  }, [userData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
const BASE_WEIGHT_MAP = {
  'ready to eat meals': 275,
  'granola bars': 80,
  'mres': 1280,
};

const calculateWeight = () => {
  return cartItems.reduce((total, item) => {
    const category = item.category?.toLowerCase() || '';
    const description = item.description?.toLowerCase() || '';

    let matchedWeight = 0;
    let matchedLabel = 'Unknown';

    if (category.includes('ready') && category.includes('meal')) {
      matchedWeight = BASE_WEIGHT_MAP['ready to eat meals'];
      matchedLabel = 'Ready to Eat Meals';
    } else if (category.includes('granola')) {
      matchedWeight = BASE_WEIGHT_MAP['granola bars'];
      matchedLabel = 'Granola Bars';
    } else if (category.includes('mre')) {
      // Check for specific MRE description
      if (
        description.includes('chicken based with rich energy bars') ||
        description.includes('beef based with rich energy bars')
      ) {
        matchedWeight = 1230;
        matchedLabel = 'MREs (lighter variant)';
      } else {
        matchedWeight = BASE_WEIGHT_MAP['mres'];
        matchedLabel = 'MREs (standard)';
      }
    }

    const totalItemWeight = matchedWeight * item.quantity;

    console.log(
      `Items: ${item.category} | Description: ${item.description} | Matched: ${matchedLabel} | Quantity: ${item.quantity} | Per Unit Weight: ${matchedWeight}g | Total Weight: ${totalItemWeight}g`
    );

    return total + totalItemWeight;
  }, 0);
};
  const resolveTCSZone = async (originCity, deliveryCity) => {
  try {
    const res = await fetch(`${baseUrl}/cities/resolve-zone/${originCity}/${deliveryCity}`);
    const data = await res.json();
    return data.zone || 'differentZone';
  } catch (err) {
    console.error('TCS zone resolution error:', err);
    return 'differentZone';
  }
};

  const calculateTCSFee = async (weightGrams, deliveryCity) => {
  const zone = await resolveTCSZone('Nowshera', deliveryCity); // origin hardcoded here
  const weightKg = weightGrams / 1000;

  if (weightKg <= 0.5) return TCS_TARIFF[zone].upto0_5;
  if (weightKg <= 1) return TCS_TARIFF[zone].upto1;

  const additionalUnits = Math.ceil(weightKg - 1);
  return TCS_TARIFF[zone].upto1 + additionalUnits * TCS_TARIFF[zone].additional;
};

  const calculatePakistanPostFee = async (weightGrams) => {
    try {
      const res = await fetch(`${baseUrl}/courier/tariff?weight=${weightGrams}`);
      const data = await res.json();
      return data.totalCharges || 0;
    } catch (err) {
      console.error("Pakistan Post Fee Error:", err);
      return 0;
    }
  };

  useEffect(() => {
  const updateShippingFee = async () => {
    const totalWeight = calculateWeight();
    setWeight(totalWeight);

    if (formData.shippingMethod === 'TCS') {
      const fee = await calculateTCSFee(totalWeight, formData.city);
      setShippingFee(fee);
    } else if (formData.shippingMethod === 'Pakistan Post') {
      const fee = await calculatePakistanPostFee(totalWeight);
      setShippingFee(fee);
    }
  };

  if (formData.shippingMethod && formData.city) {
    updateShippingFee();
  }
}, [formData.shippingMethod, formData.city, cartItems]);

  const getTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + shippingFee;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const products = cartItems.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));

    const orderData = {
      ...formData,
      products,
      totalAmount: getTotal(),
      shippingFee,
      weight,
    };

    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/order/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(clearCart());
        toast.success("Order Placed successfully");
        router.push('/shop');
      } else {
        toast.error(data.message || 'Failed to place order.');
      }
    } catch (err) {
      console.error(err);
      alert('Error placing order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <div className="checkout-container">
        <h1>Checkout</h1>
        <div className="checkout-content">
          <CheckoutForm
            formData={formData}
            onChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
          />
          <OrderSummary shippingFee={shippingFee} weight={weight} />
        </div>
      </div>
    </>
  );
}
