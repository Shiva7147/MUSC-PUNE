'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ShoppingBag,
  Plane,
  Award,
  Loader2,
  Phone,
  Mail,
  MapPin,
  User,
} from 'lucide-react';
import { CartItem, ProductOrderRecord } from '@/lib/types';
import { officialLogoUrl, officialMembershipImageUrl, defaultTourConfig } from '@/lib/data';
import {
  getSiteTaxConfigStore,
  getMembershipConfigStore,
  getTourConfigStore,
  addProductOrderToStore,
  fetchConfigRemoteAsync,
  subscribeStore,
} from '@/lib/ticketStore';

export interface UniversalCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'MERCHANDISE' | 'MEMBERSHIP' | 'TOUR';
  cartItems?: CartItem[];
  membershipDetails?: {
    size: string;
    price: number;
    name?: string;
  };
  tourDetails?: {
    title: string;
    price: number;
    batch: string;
  };
  onSuccess?: (order: ProductOrderRecord) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const UniversalCheckoutModal: React.FC<UniversalCheckoutModalProps> = ({
  isOpen,
  onClose,
  mode,
  cartItems = [],
  membershipDetails,
  tourDetails,
  onSuccess,
}) => {
  const [siteTaxConfig, setSiteTaxConfig] = useState(getSiteTaxConfigStore());
  const [membershipConfig, setMembershipConfig] = useState(getMembershipConfigStore());
  const [tourConfig, setTourConfig] = useState(getTourConfigStore());

  // Customer Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Shipping Address state (for merchandise)
  const [streetAddress, setStreetAddress] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('Pune');
  const [stateName, setStateName] = useState('Maharashtra');
  const [pincode, setPincode] = useState('');

  // Merchandise Delivery Option: 'PICKUP' (Free at screening) vs 'HOME_DELIVERY' (Chargeable, ₹99)
  const [deliveryOption, setDeliveryOption] = useState<'PICKUP' | 'HOME_DELIVERY'>('PICKUP');

  // Tour specific details
  const [passportName, setPassportName] = useState('');
  const [preferredBatch, setPreferredBatch] = useState(tourDetails?.batch || 'October 18 – 24, 2026');

  // Checkout UI States
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<ProductOrderRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSiteTaxConfig(getSiteTaxConfigStore());
      setMembershipConfig(getMembershipConfigStore());
      setTourConfig(getTourConfigStore());
      setOrderComplete(false);
      setCompletedOrder(null);
      setErrorMessage(null);
      fetchConfigRemoteAsync()
        .then((res) => {
          if (res?.taxConfig) setSiteTaxConfig(res.taxConfig);
          if (res?.membership) setMembershipConfig(res.membership);
          if (res?.tour) setTourConfig(res.tour);
        })
        .catch(() => {});

      const unsubscribe = subscribeStore(() => {
        setSiteTaxConfig(getSiteTaxConfigStore());
        setMembershipConfig(getMembershipConfigStore());
        setTourConfig(getTourConfigStore());
      });
      return () => {
        unsubscribe();
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Compute Base Total, Delivery Fee, Tax, Platform Fee, and Final Total
  let baseAmount = 0;
  let taxRate = 0.18;
  let feeRate = 0.03;
  const deliveryFee = mode === 'MERCHANDISE' && deliveryOption === 'HOME_DELIVERY' ? 99 : 0;

  if (mode === 'MERCHANDISE') {
    baseAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    taxRate = siteTaxConfig.productsTaxRate ?? 0.18;
    feeRate = siteTaxConfig.productsPlatformFeeRate ?? 0.03;
  } else if (mode === 'MEMBERSHIP') {
    baseAmount = membershipDetails?.price || membershipConfig.basePrice || 999;
    taxRate = siteTaxConfig.membershipTaxRate ?? membershipConfig.taxRate ?? 0.18;
    feeRate = siteTaxConfig.membershipPlatformFeeRate ?? membershipConfig.platformFeeRate ?? 0.03;
  } else if (mode === 'TOUR') {
    baseAmount = tourDetails?.price || tourConfig.price || 125000;
    taxRate = siteTaxConfig.toursTaxRate ?? tourConfig.taxRate ?? 0.05;
    feeRate = siteTaxConfig.toursPlatformFeeRate ?? tourConfig.platformFeeRate ?? 0.02;
  }

  const taxAmount = Math.round(baseAmount * taxRate);
  const platformFee = Math.round(baseAmount * feeRate);
  const totalAmount = baseAmount + deliveryFee + taxAmount + platformFee;

  // Validation
  const validateForm = () => {
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return false;
    }

    if (mode === 'MEMBERSHIP' || (mode === 'MERCHANDISE' && deliveryOption === 'HOME_DELIVERY')) {
      if (!streetAddress.trim()) {
        setErrorMessage(mode === 'MEMBERSHIP' ? 'Please enter your postal address for membership kit delivery.' : 'Please enter your street address for home delivery.');
        return false;
      }
      if (!city.trim()) {
        setErrorMessage('Please enter your delivery city.');
        return false;
      }
      if (!pincode.trim() || pincode.trim().length < 6) {
        setErrorMessage('Please enter a valid 6-digit postal pincode.');
        return false;
      }
    }

    setErrorMessage(null);
    return true;
  };

  // Helper: Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Helper: Dispatch Order to Formspree
  const dispatchToFormspree = async (orderRecord: ProductOrderRecord) => {
    const formspreeUrl = siteTaxConfig.formspreeEndpoint || 'https://formspree.io/f/xrppgvbv';

    const itemsSummary = orderRecord.items
      .map((it) => `${it.name} [Size: ${it.size}] x ${it.quantity} = ₹${it.price * it.quantity}`)
      .join('\n');

    const formPayload = {
      _subject: `New Official MUSC Pune ${orderRecord.orderType} Order - ${orderRecord.orderId}`,
      order_id: orderRecord.orderId,
      payment_id: orderRecord.paymentId,
      order_type: orderRecord.orderType,
      customer_name: orderRecord.customerName,
      customer_email: orderRecord.customerEmail,
      customer_phone: orderRecord.customerPhone,
      delivery_method: mode === 'MERCHANDISE'
        ? (deliveryOption === 'PICKUP' ? 'Free pickup at screening (₹0)' : 'Home delivery (₹99)')
        : 'N/A',
      delivery_charge_inr: `₹${deliveryFee}`,
      subtotal_inr: `₹${orderRecord.baseAmount}`,
      tax_amount_inr: `₹${orderRecord.taxAmount}`,
      platform_fee_inr: `₹${orderRecord.platformFee}`,
      total_paid_inr: `₹${orderRecord.totalAmount}`,
      items_ordered: itemsSummary,
      shipping_address: orderRecord.shippingAddress
        ? `${orderRecord.shippingAddress.address}, ${orderRecord.shippingAddress.city}, ${orderRecord.shippingAddress.state} - ${orderRecord.shippingAddress.pincode}`
        : (mode === 'MERCHANDISE' ? 'Free pickup at next match screening venue (The Mills, Pune)' : 'N/A (Membership / Tour)'),
      order_notes: orderRecord.notes || (deliveryOption === 'PICKUP' ? 'Supporter will collect at next screening desk' : 'Doorstep home delivery requested'),
      submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    try {
      fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formPayload),
      }).catch((err) => console.warn('Formspree background dispatch warning:', err));
    } catch (err) {
      console.warn('Formspree dispatch notification attempt completed:', err);
    }
  };

  // Main Handle Payment
  const handleProceedToPayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setErrorMessage(null);

    // Build items record
    const itemsList =
      mode === 'MERCHANDISE'
        ? cartItems.map((c) => ({
            id: c.product.id,
            name: c.product.name,
            size: c.size,
            quantity: c.quantity,
            price: c.product.price,
          }))
        : mode === 'MEMBERSHIP'
        ? [
            {
              id: 'musc-pune-membership',
              name: "Pune's Red Army Official Membership",
              size: membershipDetails?.size || 'M',
              quantity: 1,
              price: baseAmount,
            },
          ]
        : [
            {
              id: 'tour-autumn-2026',
              name: 'Trip to Old Trafford (Deposit / Registration)',
              size: preferredBatch,
              quantity: 1,
              price: baseAmount,
            },
          ];

    try {
      // 1. Create Razorpay Order via API route
      const receiptId = `musc_${mode.toLowerCase().slice(0, 4)}_${Date.now()}`.slice(0, 40);
      const res = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          currency: 'INR',
          receipt: receiptId,
          notes: {
            mode,
            customerName: fullName,
            customerPhone: phone,
            customerEmail: email,
          },
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.orderId) {
        throw new Error(orderData.error || 'Failed to initialize payment gateway.');
      }

      // Check if real Razorpay is active or simulated fallback
      const isSimulated = orderData.simulated === true;
      const keyId = orderData.key;

      if (!isSimulated && keyId && !keyId.startsWith('rzp_test_musc')) {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          throw new Error('Unable to connect to Razorpay payment gateway. Please check your internet connection.');
        }

        const formattedPhone = phone.trim().startsWith('+') ? phone.trim() : `+91${phone.trim().replace(/^0+/, '')}`;

        const options = {
          key: keyId,
          amount: orderData.amount,
          currency: orderData.currency || 'INR',
          name: 'MUSC Pune',
          description: `Official ${mode} Payment (${itemsList[0]?.name || 'Order'})`,
          image: officialLogoUrl,
          order_id: orderData.orderId,
          prefill: {
            name: fullName,
            email: email,
            contact: formattedPhone,
          },
          theme: {
            color: '#E60012',
          },
          handler: async (response: any) => {
            // Step 5 of Razorpay Standard Checkout: Verify payment signature server-side
            try {
              const verifyRes = await fetch('/api/razorpay', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });
              const verifyData = await verifyRes.json().catch(() => ({}));
              if (!verifyRes.ok || verifyData.error) {
                console.error('Signature verification warning:', verifyData);
                setErrorMessage('Payment verification warning: Signature mismatch. If money was debited, please contact ebrahimmred@gmail.com.');
              }
            } catch (verifyErr) {
              console.error('Signature verification network error:', verifyErr);
            }

            const finalOrder: ProductOrderRecord = {
              orderId: orderData.orderId,
              paymentId: response.razorpay_payment_id || `pay_${Date.now()}`,
              orderType: mode,
              customerName: fullName,
              customerEmail: email,
              customerPhone: phone,
              deliveryOption: mode === 'MERCHANDISE'
                ? (deliveryOption === 'PICKUP' ? 'Free pickup at screening' : 'Home delivery')
                : undefined,
              shippingFee: deliveryFee,
              shippingAddress:
                (mode === 'MEMBERSHIP' || (mode === 'MERCHANDISE' && deliveryOption === 'HOME_DELIVERY'))
                  ? {
                      address: streetAddress,
                      city,
                      state: stateName,
                      pincode,
                    }
                  : undefined,
              items: itemsList,
              baseAmount,
              taxAmount,
              platformFee,
              totalAmount,
              notes: mode === 'TOUR'
                ? `Passport Name: ${passportName}`
                : (deliveryOption === 'PICKUP' ? 'Free screening pickup' : 'Home delivery'),
              createdAt: new Date().toISOString(),
              status: 'PAID',
            };

            // Save to Store and Formspree
            addProductOrderToStore(finalOrder);
            dispatchToFormspree(finalOrder).catch(() => {});

            setCompletedOrder(finalOrder);
            setOrderComplete(true);
            setIsProcessing(false);
            if (onSuccess) onSuccess(finalOrder);
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', (failResp: any) => {
          setIsProcessing(false);
          setErrorMessage(
            `Payment was interrupted: ${failResp.error?.description || 'Transaction cancelled'}. Please do not worry, if any money was debited, contact our support with your phone (${phone}).`
          );
        });
        rzp.open();
      } else {
        // Simulated Direct Booking (Pre-Live Activation)
        const finalOrder: ProductOrderRecord = {
          orderId: orderData.orderId,
          paymentId: `pay_sim_${Date.now()}`,
          orderType: mode,
          customerName: fullName,
          customerEmail: email,
          customerPhone: phone,
          deliveryOption: mode === 'MERCHANDISE'
            ? (deliveryOption === 'PICKUP' ? 'Free pickup at screening' : 'Home delivery')
            : undefined,
          shippingFee: deliveryFee,
          shippingAddress:
            (mode === 'MEMBERSHIP' || (mode === 'MERCHANDISE' && deliveryOption === 'HOME_DELIVERY'))
              ? {
                  address: streetAddress,
                  city,
                  state: stateName,
                  pincode,
                }
              : undefined,
          items: itemsList,
          baseAmount,
          taxAmount,
          platformFee,
          totalAmount,
          notes: mode === 'TOUR'
            ? `Passport Name: ${passportName}`
            : (deliveryOption === 'PICKUP' ? 'Free screening pickup' : 'Home delivery'),
          createdAt: new Date().toISOString(),
          status: 'PAID',
        };

        addProductOrderToStore(finalOrder);
        dispatchToFormspree(finalOrder).catch(() => {});

        setCompletedOrder(finalOrder);
        setOrderComplete(true);
        setIsProcessing(false);
        if (onSuccess) onSuccess(finalOrder);
      }
    } catch (err: any) {
      setIsProcessing(false);
      setErrorMessage(err.message || 'Payment initiation failed. Please try again.');
    }
  };

  const copyOrderId = () => {
    if (completedOrder) {
      navigator.clipboard.writeText(completedOrder.orderId);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#121212] border border-white/15 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-white relative my-auto">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#171717] via-[#050505] to-[#171717] p-4 sm:p-6 border-b border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {mode === 'MERCHANDISE' && <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-[#E60012] shrink-0" />}
            {mode === 'MEMBERSHIP' && <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#E60012] shrink-0" />}
            {mode === 'TOUR' && <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-[#E60012] shrink-0" />}
            <div className="min-w-0">
              <span className="text-[10px] font-display uppercase tracking-widest text-[#E60012] font-bold block truncate">
                OFFICIAL MUSC PUNE CHECKOUT
              </span>
              <h3 className="font-display text-base sm:text-xl lg:text-2xl font-bold uppercase tracking-tight text-white truncate">
                {mode === 'MERCHANDISE' && 'MERCHANDISE ORDER'}
                {mode === 'MEMBERSHIP' && "PUNE'S RED ARMY MEMBERSHIP"}
                {mode === 'TOUR' && 'TRIP TO OLD TRAFFORD BOOKING'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-xl bg-[#171717] border border-white/10 text-white/70 hover:text-white cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0"
            aria-label="Close Checkout"
          >
            <X className="w-5 h-5 text-[#E60012]" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {orderComplete && completedOrder ? (
            /* ORDER SUCCESS SCREEN */
            <div className="py-6 text-center space-y-5 animate-in fade-in duration-300">
              <div className="w-20 h-20 rounded-full bg-[#E60012]/15 border-2 border-[#E60012] text-[#E60012] mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(230,0,18,0.4)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="badge-united text-xs font-display font-bold px-3 py-1 rounded-full uppercase">
                  ORDER VERIFIED & CONFIRMED
                </span>
                <h2 className="font-display text-3xl font-bold uppercase text-white mt-2">
                  THANK YOU, {completedOrder.customerName}!
                </h2>
                <p className="text-sm font-sans text-white/70 max-w-md mx-auto leading-relaxed">
                  Your order has been authorized through the payment gateway and officially registered in our dispatch ledger.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="bg-[#050505] border border-white/10 rounded-2xl p-4 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-sans text-white/60">Order Reference:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white">{completedOrder.orderId}</span>
                    <button
                      onClick={copyOrderId}
                      className="text-white/60 hover:text-white p-1 rounded"
                      title="Copy Reference"
                    >
                      {copiedOrderId ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-sans text-white/60">Payment ID:</span>
                  <span className="font-mono text-xs text-white/80">{completedOrder.paymentId}</span>
                </div>

                {completedOrder.deliveryOption && (
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-sans text-white/60">Delivery Method:</span>
                    <span className="font-mono text-xs text-white font-bold">{completedOrder.deliveryOption}</span>
                  </div>
                )}

                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-sans text-white/60">Total Amount Paid:</span>
                  <span className="font-display text-base font-bold text-[#E60012]">
                    ₹{completedOrder.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                {completedOrder.shippingAddress ? (
                  <div className="pt-1">
                    <span className="text-xs font-sans text-white/60 block mb-1">Home Delivery Address:</span>
                    <p className="font-sans text-xs text-white/90 leading-relaxed bg-[#121212] p-2.5 rounded-lg border border-white/5">
                      {completedOrder.shippingAddress.address}, {completedOrder.shippingAddress.city},{' '}
                      {completedOrder.shippingAddress.state} - {completedOrder.shippingAddress.pincode}
                    </p>
                  </div>
                ) : completedOrder.orderType === 'MERCHANDISE' ? (
                  <div className="pt-1">
                    <span className="text-xs font-sans text-white/60 block mb-1">Collection Instructions:</span>
                    <p className="font-sans text-xs text-emerald-300 leading-relaxed bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/30">
                      📍 <strong>Free Screening Pickup:</strong> Please show your Order Reference (<code className="font-bold text-white">{completedOrder.orderId}</code>) or registered phone number at the merchandise desk during our next match screening at BIRA 91 Taproom, The Mills, Pune!
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="bg-[#E60012] hover:bg-[#B3000C] text-white font-display text-sm font-bold py-3.5 px-8 rounded-xl uppercase tracking-wider transition-all"
                >
                  CLOSE & RETURN TO STORE
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM & PAYMENT SUMMARY */
            <div className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#E60012] shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. ORDER SUMMARY CARD */}
              <div className="bg-[#050505] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="text-xs font-display text-white/60 uppercase font-bold">ORDER ITEMS</span>
                  <span className="text-xs font-display text-[#E60012] font-bold">PRICE</span>
                </div>

                {mode === 'MERCHANDISE' && (
                  <div className="space-y-2.5">
                    {cartItems.map((item) => (
                      <div key={`${item.product.id}-${item.size}`} className="flex items-center justify-between text-xs gap-2">
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                            <Image src={item.product.image} alt={item.product.name} fill unoptimized className="object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-display font-bold uppercase text-white truncate max-w-full">
                              {item.product.name}
                            </p>
                            <p className="font-sans text-[11px] text-white/50">
                              Size: <strong className="text-white">{item.size}</strong> × {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-display text-sm font-bold text-white shrink-0 ml-2">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {mode === 'MEMBERSHIP' && (
                  <div className="flex items-center justify-between text-xs py-1 gap-2">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                        <Image src={officialMembershipImageUrl} alt="Membership Poster" fill unoptimized className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display font-bold uppercase text-white truncate max-w-full">
                          {membershipDetails?.name || "Pune's Red Army Official Membership"}
                        </p>
                        <p className="font-sans text-[11px] text-white/50">
                          Official Supporter T-Shirt (Size: <strong className="text-white">{membershipDetails?.size || 'M'}</strong>)
                        </p>
                      </div>
                    </div>
                    <span className="font-display text-base font-bold text-white shrink-0 ml-2">
                      ₹{baseAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                {mode === 'TOUR' && (
                  <div className="flex items-center justify-between text-xs py-1 gap-2">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                        <Image src={tourConfig.image || defaultTourConfig.image} alt="Tour Photo" fill unoptimized className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display font-bold uppercase text-white truncate max-w-full">
                          {tourDetails?.title || 'Trip to Old Trafford'}
                        </p>
                        <p className="font-sans text-[11px] text-white/50">
                          Batch: <strong className="text-white">{preferredBatch}</strong>
                        </p>
                      </div>
                    </div>
                    <span className="font-display text-base font-bold text-white shrink-0 ml-2">
                      ₹{baseAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                {/* Tax Slab & Platform Fee Calculation Breakdown */}
                <div className="border-t border-white/10 pt-3 space-y-1.5 text-xs font-sans">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal Base Amount:</span>
                    <span className="font-mono text-white">₹{baseAmount.toLocaleString('en-IN')}</span>
                  </div>
                  {mode === 'MERCHANDISE' && (
                    <div className="flex justify-between text-white/60">
                      <span>Delivery Method:</span>
                      <span className="font-mono text-white font-semibold">
                        {deliveryOption === 'PICKUP' ? 'Free pickup at screening (₹0)' : 'Home delivery (+₹99)'}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-white/60">
                    <span>Applicable Tax ({Math.round(taxRate * 100)}%):</span>
                    <span className="font-mono text-white">₹{taxAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Applicable Platform Fees ({Math.round(feeRate * 100)}%):</span>
                    <span className="font-mono text-white">₹{platformFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-white/10 text-sm">
                    <span className="font-display font-bold uppercase text-white">Total Amount Payable:</span>
                    <span className="font-display text-xl font-black text-[#E60012]">
                      ₹{totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. CUSTOMER CONTACT DETAILS FORM */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <User className="w-4 h-4 text-[#E60012]" />
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                    CUSTOMER CONTACT DETAILS
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-display text-white/80 font-bold uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#050505] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E60012]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-display text-white/80 font-bold uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#050505] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E60012]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-display text-white/80 font-bold uppercase mb-1">
                      WhatsApp / Mobile Number (10 digits) *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#050505] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E60012]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. DELIVERY OPTIONS & SHIPPING ADDRESS (FOR MERCHANDISE) */}
              {mode === 'MERCHANDISE' && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                    <Truck className="w-4 h-4 text-[#E60012]" />
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                      DELIVERY METHOD & OPTIONS
                    </h4>
                  </div>

                  {/* 2 Selectable Options: Free Pickup at Screening vs Home Delivery */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryOption('PICKUP')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                        deliveryOption === 'PICKUP'
                          ? 'bg-[#E60012]/15 border-[#E60012] shadow-[0_0_20px_rgba(230,0,18,0.25)]'
                          : 'bg-[#050505] border-white/10 hover:border-white/30 text-white/70'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-display text-sm font-bold uppercase text-white">
                          <MapPin className="w-4 h-4 text-[#E60012]" />
                          <span>Free pickup at screening</span>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-display font-bold px-2 py-0.5 rounded uppercase">
                          FREE (₹0)
                        </span>
                      </div>
                      <p className="text-[11px] font-sans text-white/60 leading-relaxed">
                        Collect in person at the next official MUSC Pune match screening (The Mills, Pune).
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryOption('HOME_DELIVERY')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                        deliveryOption === 'HOME_DELIVERY'
                          ? 'bg-[#E60012]/15 border-[#E60012] shadow-[0_0_20px_rgba(230,0,18,0.25)]'
                          : 'bg-[#050505] border-white/10 hover:border-white/30 text-white/70'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-display text-sm font-bold uppercase text-white">
                          <Truck className="w-4 h-4 text-[#E60012]" />
                          <span>Home delivery</span>
                        </div>
                        <span className="bg-[#E60012] text-white text-[10px] font-display font-bold px-2 py-0.5 rounded uppercase">
                          +₹99
                        </span>
                      </div>
                      <p className="text-[11px] font-sans text-white/60 leading-relaxed">
                        Tracked courier delivery directly to your home address anywhere in India.
                      </p>
                    </button>
                  </div>

                  {deliveryOption === 'PICKUP' ? (
                    <div className="bg-[#050505] border border-emerald-500/30 p-4 rounded-xl flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-xs font-display font-bold uppercase text-emerald-300">
                          MATCHDAY SCREENING VENUE PICKUP
                        </p>
                        <p className="text-xs font-sans text-white/70 leading-relaxed">
                          Your ordered merchandise will be packed and ready for collection at our official desk during the next match screening at <strong>BIRA 91 Taproom, The Mills, Pune</strong>. Simply show your Order ID or phone number. No shipping charge!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3.5 bg-[#050505] p-4 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-display font-bold uppercase text-white/90">
                          ENTER HOME SHIPPING ADDRESS (REQUIRED)
                        </span>
                      </div>
                      <div>
                        <label className="block text-xs font-display text-white/80 font-bold uppercase mb-1">
                          Flat / Building / Street Address *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Flat 402, Royal Palms, FC Road"
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
                          className="w-full bg-[#171717] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E60012]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        <div>
                          <label className="block text-xs font-display text-white/80 font-bold uppercase mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-[#171717] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E60012]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-display text-white/80 font-bold uppercase mb-1">
                            State *
                          </label>
                          <input
                            type="text"
                            required
                            value={stateName}
                            onChange={(e) => setStateName(e.target.value)}
                            className="w-full bg-[#171717] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E60012]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-display text-white/80 font-bold uppercase mb-1">
                            Pincode *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            placeholder="e.g. 411001"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className="w-full bg-[#171717] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E60012]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3B. MEMBERSHIP SHIPPING ADDRESS */}
              {mode === 'MEMBERSHIP' && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                    <Truck className="w-4 h-4 text-[#E60012]" />
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                      MEMBERSHIP PACK POSTAL ADDRESS
                    </h4>
                  </div>
                  <div className="space-y-3.5 bg-[#050505] p-4 rounded-2xl border border-white/10">
                    <p className="text-xs font-sans text-white/70">
                      Enter your postal shipping address to receive the official MUSC Pune membership kit, welcome pack, member card, and exclusive supporter gifts.
                    </p>
                    <div>
                      <label className="block text-xs font-display text-white/80 font-bold uppercase mb-1">
                        Flat / Building / Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Flat 402, Royal Palms, FC Road"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        className="w-full bg-[#171717] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E60012]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      <div>
                        <label className="block text-xs font-display text-white/80 font-bold uppercase mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Pune"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-[#171717] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E60012]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-display text-white/80 font-bold uppercase mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Maharashtra"
                          value={stateName}
                          onChange={(e) => setStateName(e.target.value)}
                          className="w-full bg-[#171717] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E60012]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-display text-white/80 font-bold uppercase mb-1">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="e.g. 411001"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="w-full bg-[#171717] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E60012]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security & Payment Notice */}
              <div className="bg-[#171717] p-3.5 rounded-xl border border-white/10 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
                <p className="text-[11px] font-sans text-white/70 leading-relaxed">
                  256-bit Encrypted checkout via Razorpay (UPI, GPay, PhonePe, Cards, NetBanking). Form confirmation sent automatically upon payment verification.
                </p>
              </div>

              {/* Direct Error Display above CTA */}
              {errorMessage && (
                <div className="p-3.5 bg-red-950/80 border border-red-500/50 rounded-xl flex items-center gap-2.5 text-red-200 text-xs font-sans">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="font-medium">{errorMessage}</span>
                </div>
              )}

              {/* CTA Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleProceedToPayment}
                  className="w-full bg-[#E60012] hover:bg-[#B3000C] text-white font-display text-sm sm:text-base font-bold py-3.5 sm:py-4 px-3 sm:px-6 rounded-2xl shadow-[0_8px_30px_rgba(230,0,18,0.5)] flex items-center justify-center gap-2 sm:gap-2.5 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 uppercase cursor-pointer text-center"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>INITIALIZING PAYMENT GATEWAY...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>PAY ₹{totalAmount.toLocaleString('en-IN')} & CONFIRM ORDER</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
