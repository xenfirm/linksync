import { useState } from 'react'
import { supabase } from '../lib/supabase'

declare global {
  interface Window {
    Razorpay: any
  }
}

export function usePayments() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpgrade = async (userId: string, email: string, plan: 'basic' | 'pro') => {
    setLoading(true)
    setError(null)

    const amount = plan === 'pro' ? 299 : 99
    const planName = plan === 'pro' ? 'LinkSync Pro' : 'LinkSync Basic'

    try {
      // 1. Create order via Edge Function
      const { data: order, error: orderError } = await supabase.functions.invoke('create-order', {
        body: { amount, plan } 
      })

      if (orderError) throw new Error(orderError.message)

      // 2. Initialize Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: planName,
        description: plan === 'pro' ? "Unlimited Links & Lead Capture" : "10 Links & WhatsApp Button",
        order_id: order.id,
        prefill: {
          email: email,
        },
        theme: {
          color: "#6d28d9",
        },
        handler: async function (response: any) {
          try {
            setLoading(true)
            // 3. Verify payment via Edge Function
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-payment', {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan: plan // Pass plan to verification so backend knows which plan to set
              }
            })

            if (verifyError) throw new Error(verifyError.message)

            if (verifyData.success) {
              window.location.reload() // Refresh to unlock features
            }
          } catch (err: any) {
            setError(err.message || 'Payment verification failed')
            setLoading(false)
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
          }
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err: any) {
      setError(err.message || 'Failed to initialize payment')
      setLoading(false)
    }
  }

  return { handleUpgrade, loading, error }
}
