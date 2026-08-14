import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaCreditCard, FaLock, FaCopy, FaCheckCircle } from 'react-icons/fa';

/* ── Demo card hint ──────────────────────────────────────────────────────── */
const DEMO_CARD = '4242 4242 4242 4242';
const DEMO_EXPIRY = '12/29';
const DEMO_CVC = '123';

const DemoCardBadge = () => {
  const [copied, setCopied] = useState(false);

  const copy = (text) => {
    navigator.clipboard.writeText(text.replace(/\s/g, '')).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-5 rounded-xl bg-gradient-to-r from-primary/8 to-green-50 border border-primary/20 p-4">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center">
          <FaCreditCard size={11} />
        </div>
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">Test Card — Demo Mode</span>
      </div>

      <div className="space-y-1.5 text-xs">
        <div className="flex items-center justify-between bg-white/70 rounded-lg px-3 py-2">
          <div>
            <span className="text-slate-400 mr-2">Card number</span>
            <span className="font-mono font-semibold text-secondary">{DEMO_CARD}</span>
          </div>
          <button
            type="button"
            onClick={() => copy(DEMO_CARD)}
            className="text-slate-400 hover:text-primary transition flex items-center gap-1"
            title="Copy card number"
          >
            {copied ? <FaCheckCircle size={12} className="text-primary" /> : <FaCopy size={12} />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <div className="flex items-center justify-between bg-white/70 rounded-lg px-3 py-2">
            <span className="text-slate-400 mr-2">Expiry</span>
            <span className="font-mono font-semibold text-secondary">{DEMO_EXPIRY}</span>
          </div>
          <div className="flex items-center justify-between bg-white/70 rounded-lg px-3 py-2">
            <span className="text-slate-400 mr-2">CVC</span>
            <span className="font-mono font-semibold text-secondary">{DEMO_CVC}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
        Enter the card number above in the Stripe field below. Use any future date for expiry and any 3-digit CVC.
      </p>
    </div>
  );
};

/* ── Stripe CardElement styling ─────────────────────────────────────────── */
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '15px',
      color: '#1e293b',
      fontFamily: '"Baloo Da 2", system-ui, sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#94a3b8',
      },
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444',
    },
  },
  hidePostalCode: true,
};

/* ── Main form ───────────────────────────────────────────────────────────── */
const CheckoutForm = ({ courseInfo }) => {
  const [error, setError]           = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret]   = useState('');

  const axiosSecure = useAxiosSecure();
  const stripe      = useStripe();
  const elements    = useElements();
  const { user }    = useAuth();
  const navigate    = useNavigate();

  const totalPrice = courseInfo?.price;

  /* create payment intent once price is known */
  useEffect(() => {
    if (!totalPrice || totalPrice <= 0) return;
    axiosSecure
      .post('/create-payment-intent', { price: totalPrice })
      .then(res => setClientSecret(res.data.clientSecret))
      .catch(() => {});
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setError('');
    setProcessing(true);

    /* validate card */
    const { error: methodError } = await stripe.createPaymentMethod({ type: 'card', card });
    if (methodError) {
      setError(methodError.message);
      setProcessing(false);
      return;
    }

    /* confirm payment */
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user?.email || 'anonymous',
          name:  user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      setTransactionId(paymentIntent.id);

      const payment = {
        email:           user?.email,
        name:            user?.displayName,
        date:            new Date(),
        price:           totalPrice,
        transactionId:   paymentIntent.id,
        courseId:        courseInfo?._id,
        courseName:      courseInfo?.courseName,
        courseImage:     courseInfo?.courseImage,
        instructorName:  courseInfo?.instructorName,
      };

      try {
        await axiosSecure.patch(`/enroll/${courseInfo?._id}`);
        const res = await axiosSecure.post('/payments', payment);
        if (res.data?.insertedId) {
          Swal.fire({
            title: 'Enrollment Confirmed!',
            html: `<p class="text-slate-500 text-sm">You've successfully enrolled in <strong>${courseInfo?.courseName}</strong>.</p>`,
            icon: 'success',
            confirmButtonColor: '#0BAC7C',
            confirmButtonText: 'Start Learning →',
          });
          navigate(`/course/${courseInfo?._id}`);
        }
      } catch {
        setError('Payment succeeded but enrollment failed. Please contact support.');
      }
    }

    setProcessing(false);
  };

  const isReady = !!(stripe && clientSecret);

  return (
    <div>
      <DemoCardBadge />

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Cardholder name (display only — pre-filled) */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">
            Cardholder Name
          </label>
          <input
            type="text"
            defaultValue={user?.displayName || ''}
            readOnly
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-slate-500 outline-none"
          />
        </div>

        {/* Stripe CardElement */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">
            Card Details
          </label>
          <div className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus-within:border-primary transition">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
            <span className="shrink-0 mt-0.5">⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* Success transaction ID */}
        {transactionId && (
          <div className="flex items-start gap-2.5 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
            <FaCheckCircle className="shrink-0 mt-0.5" size={14} />
            <div>
              <div className="font-semibold">Payment successful!</div>
              <div className="text-xs text-green-600 mt-0.5 font-mono break-all">
                Transaction ID: {transactionId}
              </div>
            </div>
          </div>
        )}

        {/* Pay button */}
        <button
          type="submit"
          disabled={!isReady || processing}
          className={`w-full py-3.5 rounded-xl font-bold text-base transition flex items-center justify-center gap-2.5 shadow-lg ${
            isReady && !processing
              ? 'bg-gradient-to-r from-primary to-green-600 text-white hover:from-green-600 hover:to-primary shadow-primary/25'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
          }`}
        >
          {processing ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing…
            </>
          ) : (
            <>
              <FaLock size={13} />
              Pay ${totalPrice} Securely
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-400">
          By completing your purchase you agree to our{' '}
          <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>.
        </p>
      </form>
    </div>
  );
};

export default CheckoutForm;
