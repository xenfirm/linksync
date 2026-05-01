import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { Resend } from "npm:resend";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { profile_id, name, phone } = await req.json();

    if (!profile_id || !name || !phone) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { 
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    // Initialize Supabase admin client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch the profile to get the user_id
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('id', profile_id)
      .single();

    if (profileError || !profile) {
      console.error("Profile not found:", profileError);
      return new Response(JSON.stringify({ error: 'Profile not found' }), { 
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    // Fetch the user to get their email address
    const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(profile.user_id);

    if (userError || !user || !user.email) {
      console.error("User not found or has no email:", userError);
      return new Response(JSON.stringify({ error: 'User not found' }), { 
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    // Clean, minimal HTML design for the email
    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a;">
        <h2 style="color: #6d28d9;">New Lead Received 🚀</h2>
        <p>You just received a new lead from your LinkSync bio page.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 0;"><strong>Phone:</strong> ${phone}</p>
        </div>
        
        <p>Reach out immediately to convert this lead.</p>
        <a href="https://wa.me/${phone.replace(/\D/g, '')}" style="display: inline-block; padding: 12px 24px; background-color: #25d366; color: white; text-decoration: none; font-weight: bold; border-radius: 6px; margin-top: 15px;">Contact on WhatsApp now</a>
      </div>
    `;

    // Send the email using Resend
    const data = await resend.emails.send({
      from: 'LinkSync <onboarding@resend.dev>', // Keep simple for testing, use custom domain for prod
      to: [user.email],
      subject: 'New Lead Received 🚀',
      html: htmlBody,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: any) {
    console.error("Error sending email:", error);
    // Return success response regardless to not block the lead creation flow
    return new Response(JSON.stringify({ success: true, error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
