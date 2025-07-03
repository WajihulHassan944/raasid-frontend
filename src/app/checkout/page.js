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


export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { userData } = useSelector((state) => state.user);
  const [originCity, setOriginCity] = useState('');

const [formData, setFormData] = useState({
  email: '',
  fullName: '',
  house: '',
  street: '',
  town: '',
  tehsil: '',
  city: '',
  province: '',
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
  
  const calculateWeight = () => {
  return cartItems.reduce((total, item) => {
    const packaging = item.packaging || '';
    const match = packaging.match(/Net Weight:\s*(\d+)g/i);

    let itemWeight = 0;

    if (match && match[1]) {
      itemWeight = parseInt(match[1], 10);
    } else {
      console.warn(`Could not extract weight for item: ${item.category}, packaging: "${packaging}"`);
    }

    const totalItemWeight = itemWeight * item.quantity;

    console.log(
      `Category: ${item.category} | Packaging: ${item.packaging} | Per Unit Weight: ${itemWeight}g | Quantity: ${item.quantity} | Total Weight: ${totalItemWeight}g`
    );

    return total + totalItemWeight;
  }, 0);
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

    const weightStr = `${totalWeight}g`;

    try {
      if (formData.shippingMethod === 'TCS') {
        const res = await fetch(`${baseUrl}/cities/resolve-shipping-fee/${formData.city}/${weightStr}`);
        const data = await res.json();
        console.log("tcs data is",data)
        if (res.ok) {
          setShippingFee(data.shippingFee || 0);
          setOriginCity(data.origin || ""); 
        } else {
          console.log("Failed to fetch TCS shipping fee");
          setShippingFee(0);
        }
      } else if (formData.shippingMethod === 'Pakistan Post') {
        const fee = await calculatePakistanPostFee(totalWeight);
        setShippingFee(fee);
      }
    } catch (error) {
      console.error("Shipping fee calculation error:", error);
      console.log("Error calculating shipping fee");
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

  // ✅ Phone format validation: must start with 03 and be exactly 11 digits
  const phoneRegex = /^03[0-9]{9}$/;
  if (!phoneRegex.test(formData.phone)) {
    toast.error("Please enter a valid phone number without country code (e.g., 03123456789)");
    return;
  }

  // 🧷 Prepare products array
  const products = cartItems.map((item) => ({
    productId: item._id,
    quantity: item.quantity,
  }));

  // 🧷 Construct CNIC-style address
  const fullAddress = `House: ${formData.house}, Street: ${formData.street}, Town: ${formData.town}, Tehsil: ${formData.tehsil}, City: ${formData.city}, Province: ${formData.province}`;

  // 🧷 Create order payload
  const orderData = {
    email: formData.email,
    fullName: formData.fullName,
    address: fullAddress,
    city: formData.city,
    phone: formData.phone,
    shippingMethod: formData.shippingMethod,
    paymentMethod: formData.paymentMethod,
    products,
    totalAmount: getTotal(),
    shippingFee,
    weight,
    originCity,
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
