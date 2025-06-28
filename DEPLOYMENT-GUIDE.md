# 🚀 Deployment Guide - GitHub & Vercel

## 📁 Step 1: Push to GitHub

### 1.1 สร้าง GitHub Repository
1. ไปที่ [github.com](https://github.com) และ login
2. คลิก "New repository" (ปุ่มสีเขียว)
3. ตั้งชื่อ repository: `dotdeep-design`
4. เลือก **Public** (เพื่อใช้ Vercel ฟรี)
5. **ไม่ต้อง** เลือก "Add README" (เรามีแล้ว)
6. คลิก "Create repository"

### 1.2 เชื่อมต่อกับ Local Repository
```bash
# เพิ่ม remote origin (แทนที่ YOUR_USERNAME ด้วยชื่อ GitHub ของคุณ)
git remote add origin https://github.com/YOUR_USERNAME/dotdeep-design.git

# Push ขึ้น GitHub
git push -u origin main
```

### 1.3 ตรวจสอบ
- ไปดูที่ GitHub repository ควรเห็นไฟล์ทั้งหมด
- ตรวจสอบว่า README.md แสดงผลถูกต้อง

## 🌐 Step 2: Deploy to Vercel

### 2.1 Setup Vercel Account
1. ไปที่ [vercel.com](https://vercel.com)
2. คลิก "Sign up" และเลือก "Continue with GitHub"
3. อนุญาตให้ Vercel เข้าถึง GitHub repositories

### 2.2 Import Project
1. คลิก "New Project" ใน Vercel Dashboard
2. เลือก repository `dotdeep-design`
3. คลิก "Import"

### 2.3 Configure Project
**Framework Preset:** Vite
**Root Directory:** ปล่อยว่าง (ใช้ root)
**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 2.4 Environment Variables
เพิ่ม Environment Variables ใน Vercel:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**วิธีเพิ่ม:**
1. ไปที่ Project Settings > Environment Variables
2. เพิ่มทีละตัว:
   - Name: `VITE_SUPABASE_URL`
   - Value: ค่าจาก Supabase
   - Environment: Production, Preview, Development

### 2.5 Deploy
1. คลิก "Deploy"
2. รอ 2-3 นาที
3. จะได้ URL เช่น: `https://dotdeep-design.vercel.app`

## 🔧 Step 3: Custom Domain (Optional)

### 3.1 เพิ่ม Custom Domain
1. ไปที่ Project Settings > Domains
2. เพิ่ม domain เช่น: `dotdeep.com`
3. ตั้งค่า DNS ตามที่ Vercel บอก:
   ```
   Type: A
   Name: @
   Value: 76.76.19.61

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### 3.2 SSL Certificate
- Vercel จะสร้าง SSL certificate อัตโนมัติ
- รอ 5-10 นาที จะมี HTTPS

## ⚡ Step 4: Automatic Deployments

### 4.1 Setup Auto Deploy
- ทุกครั้งที่ push code ขึ้น GitHub
- Vercel จะ build และ deploy อัตโนมัติ
- Preview deployments สำหรับ PR

### 4.2 Build Optimization
Vercel จะ optimize อัตโนมัติ:
- ✅ Image optimization
- ✅ Edge caching
- ✅ Gzip compression
- ✅ Tree shaking

## 📊 Step 5: Monitoring & Analytics

### 5.1 Vercel Analytics
```bash
npm install @vercel/analytics
```

เพิ่มใน `src/main.tsx`:
```typescript
import { inject } from '@vercel/analytics';

inject();
```

### 5.2 Performance Monitoring
- ดู Performance metrics ใน Vercel Dashboard
- Real-time visitor analytics
- Core Web Vitals tracking

## 🔒 Step 6: Security & Performance

### 6.1 Environment Variables Security
- ❌ ไม่เอา `.env` files commit ลง Git
- ✅ ใช้ Vercel Environment Variables
- ✅ Supabase RLS สำหรับ database security

### 6.2 Performance Best Practices
- ✅ Image optimization (ใช้ Vercel Image)
- ✅ Code splitting (Vite รองรับ)
- ✅ Bundle analysis
- ✅ Edge functions (สำหรับ API routes)

## 🚨 Troubleshooting

### Build Errors
```bash
# ตรวจสอบ local build
npm run build

# ดู error logs ใน Vercel Dashboard
```

### Environment Variables
```bash
# ตรวจสอบว่า env vars ตั้งถูกต้อง
echo $VITE_SUPABASE_URL
```

### Domain Issues
- ตรวจสอบ DNS propagation: whatsmydns.net
- รอ 24-48 ชั่วโมงสำหรับ DNS changes

## ✅ Final Checklist

- [ ] Git repository created และ pushed
- [ ] Vercel project imported
- [ ] Environment variables added
- [ ] Supabase database setup
- [ ] First deployment successful
- [ ] Website accessible via URL
- [ ] Admin panel working
- [ ] Portfolio upload working
- [ ] Contact forms working
- [ ] Mobile responsive tested

## 🎉 Success!

Website จะอยู่ที่:
- **Vercel URL**: https://dotdeep-design.vercel.app
- **Custom Domain**: https://dotdeep.com (ถ้าตั้ง)

### Next Steps:
1. 📝 Test ทุกฟีเจอร์
2. 👥 เพิ่ม Admin users
3. 🖼️ อัพโหลด Portfolio จริง
4. 📞 อัพเดทข้อมูลติดต่อ
5. 🚀 Launch!

---

**Need Help?**
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
- GitHub Docs: [docs.github.com](https://docs.github.com) 