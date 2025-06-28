# 🔧 Fix Dotdeep Website - Vercel Environment Variables

## 🚨 Current Issue
Your website at https://dotdeep.vercel.app/ is showing a blank page due to missing Supabase environment variables.

## ✅ Solution - Add Environment Variables

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Find and click on your `dotdeep` project

### Step 2: Navigate to Settings
1. Click the "Settings" tab (top navigation)
2. Click "Environment Variables" in the left sidebar

### Step 3: Add These Variables

#### Variable 1 - Supabase URL
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://sinwrhbuhxjyxrthoiaz.supabase.co`
- **Environments:** Check ALL three boxes:
  - ✅ Production
  - ✅ Preview  
  - ✅ Development

#### Variable 2 - Supabase Anon Key
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpbndyaGJ1aHhqeXhydGhvaWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMDQzODIsImV4cCI6MjA2NjY4MDM4Mn0.QPEAd2j6oT2wcG_rMGc6NzOrNi6KniCBZBWsZ04upA0`
- **Environments:** Check ALL three boxes:
  - ✅ Production
  - ✅ Preview
  - ✅ Development

### Step 4: Redeploy
1. Go to "Deployments" tab
2. Find the latest deployment
3. Click the three dots "..." menu
4. Click "Redeploy"
5. Confirm redeployment

### Step 5: Wait for Build
- Build will take 2-3 minutes
- You'll see a green ✅ when successful

## 🎉 Expected Result
After adding environment variables and redeploying:
- ✅ Website loads properly
- ✅ Homepage shows with Dotdeep branding
- ✅ Authentication works
- ✅ All features functional

---

## 🆘 Need Help?
If you need assistance:
1. Take a screenshot of the Vercel settings page
2. Check the deployment logs for any errors
3. Test the website after redeployment

Your website should be fully functional within 5 minutes of completing these steps! 