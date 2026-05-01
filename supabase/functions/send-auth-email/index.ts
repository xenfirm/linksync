import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  try {
    // Parse the payload from Supabase Auth Hook
    const payload = await req.json();
    const { type, user, email_data } = payload;
    
    // Default config
    let subject = "Message from LinkSync";
    let htmlBody = "";

    // Feature 2: Password Reset Email
    if (type === "recovery") {
      subject = "Reset your LinkSync password";
      htmlBody = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a;">
          <h2 style="color: #6d28d9;">Password Reset Request</h2>
          <p>We received a request to reset the password for your LinkSync account.</p>
          <a href="${email_data.confirmation_url}" style="display: inline-block; padding: 12px 24px; background-color: #6d28d9; color: white; text-decoration: none; font-weight: bold; border-radius: 6px; margin: 20px 0;">Reset Password</a>
          <p style="color: #64748b; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `;
    } 
    // Feature 3: Welcome Email (Triggered on Signup)
    else if (type === "signup" || type === "confirmation") {
      subject = "Welcome to LinkSync! 🎉";
      htmlBody = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a;">
          <h2 style="color: #6d28d9;">Welcome to LinkSync! 🎉</h2>
          <p>We're thrilled to have you on board. LinkSync helps you turn your bio link into a powerful lead generation machine.</p>
          <p>To get started, create your beautiful bio page and add your links.</p>
          <a href="${email_data?.confirmation_url || 'https://linksync.in/dashboard'}" style="display: inline-block; padding: 12px 24px; background-color: #6d28d9; color: white; text-decoration: none; font-weight: bold; border-radius: 6px; margin: 20px 0;">Create your bio page</a>
        </div>
      `;
    } else {
      // Fallback for other auth emails (magic link, email change, etc)
      subject = "LinkSync Account Update";
      htmlBody = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a;">
          <p>Click the link below to confirm your request:</p>
          <a href="${email_data.confirmation_url}" style="display: inline-block; padding: 12px 24px; background-color: #6d28d9; color: white; text-decoration: none; font-weight: bold; border-radius: 6px; margin: 20px 0;">Confirm Request</a>
        </div>
      `;
    }

    // Send the email using Resend
    const data = await resend.emails.send({
      from: 'LinkSync <onboarding@resend.dev>', // Keep simple for testing, use custom domain for prod
      to: [user.email],
      subject: subject,
      html: htmlBody,
    });

    // We must return the original payload back to Supabase auth hook to continue
    return new Response(JSON.stringify(payload), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: any) {
    console.error("Error handling auth email:", error);
    // Return empty payload on error so it doesn't break auth
    return new Response(JSON.stringify({}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
});
