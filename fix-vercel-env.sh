#!/bin/bash

echo "🔧 Fixing Dotdeep Website - Adding Environment Variables to Vercel"
echo "=================================================="

# Add Supabase URL
echo "Adding VITE_SUPABASE_URL..."
echo "https://sinwrhbuhxjyxrthoiaz.supabase.co" | npx vercel env add VITE_SUPABASE_URL production

# Add Supabase Anon Key  
echo "Adding VITE_SUPABASE_ANON_KEY..."
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpbndyaGJ1aHhqeXhydGhvaWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMDQzODIsImV4cCI6MjA2NjY4MDM4Mn0.QPEAd2j6oT2wcG_rMGc6NzOrNi6KniCBZBWsZ04upA0" | npx vercel env add VITE_SUPABASE_ANON_KEY production

# Redeploy
echo "Redeploying website..."
npx vercel --prod

echo "✅ Done! Your website should be working at https://dotdeep.vercel.app/"
echo "Please wait 2-3 minutes for the deployment to complete." 