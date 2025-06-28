# Vercel Environment Variables Setup

## 1. Go to Vercel Dashboard
- Visit: https://vercel.com/dashboard
- Click on your `dotdeep` project

## 2. Navigate to Settings
- Click "Settings" tab
- Click "Environment Variables" in sidebar

## 3. Add These Variables:

### Variable 1:
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://sinwrhbuhxjyxrthoiaz.supabase.co`
- **Environments:** Production, Preview, Development ✅

### Variable 2:
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpbndyaGJ1aHhqeXhydGhvaWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMDQzODIsImV4cCI6MjA2NjY4MDM4Mn0.QPEAd2j6oT2wcG_rMGc6NzOrNi6KniCBZBWsZ04upA0`
- **Environments:** Production, Preview, Development ✅

## 4. Redeploy
After adding environment variables:
- Go to "Deployments" tab
- Click "..." on latest deployment
- Click "Redeploy"

## 5. Your Live Website
Your site will be available at:
- **URL:** https://dotdeep-[random].vercel.app
- **Custom Domain:** Setup available in project settings

---

## Optional: Custom Domain Setup

### If you have a domain (like dotdeep.com):
1. Go to Project Settings > Domains
2. Add your domain: `dotdeep.com`
3. Add www version: `www.dotdeep.com`
4. Update your domain's DNS settings:
   ```
   Type: A
   Name: @
   Value: 76.76.19.61

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Free Vercel Domain:
Your site is already live at the Vercel-provided URL! 