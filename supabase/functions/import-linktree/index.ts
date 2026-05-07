import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { url } = await req.json()

    if (!url) {
      throw new Error('URL is required')
    }

    // Format URL
    let targetUrl = url.trim()
    if (!targetUrl.startsWith('http')) {
      targetUrl = `https://${targetUrl}`
    }

    console.log(`Fetching Linktree: ${targetUrl}`)

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Linktree page: ${response.status} ${response.statusText}`)
    }

    const html = await response.text()
    
    // Strategy: Look for __NEXT_DATA__ which contains the profile state
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">([^<]+)<\/script>/)
    
    if (!nextDataMatch) {
      // Fallback: Try window.__INITIAL_STATE__
      const initialStateMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*({.+});/)
      if (!initialStateMatch) {
        throw new Error('Could not find profile data. The page might be private or uses a different layout.')
      }
      
      // Parse initial state (simplified logic)
      const data = JSON.parse(initialStateMatch[1])
      const profile = data.account || {}
      const links = (data.links || []).map((l: any) => ({
        id: String(l.id),
        title: l.title || 'Untitled Link',
        url: l.url,
        active: true
      }))

      return new Response(JSON.stringify({
        name: profile.username || '',
        bio: profile.description || '',
        avatar: profile.profilePictureUrl || '',
        links: links
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    const data = JSON.parse(nextDataMatch[1])
    const pageProps = data.props?.pageProps || {}
    const account = pageProps.account || {}
    const linksData = pageProps.links || []
    
    // Clean up links
    const links = linksData
      .filter((l: any) => l.url && l.title)
      .map((l: any) => ({
        id: String(l.id),
        title: l.title,
        url: l.url,
        active: true
      }))

    const result = {
      name: account.username || account.profileTitle || '',
      bio: account.description || account.bio || '',
      avatar: account.profilePictureUrl || '',
      links: links
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Scraping error:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
