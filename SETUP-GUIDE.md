# 🚀 Dotdeep Design - Database Setup Guide

## ขั้นตอนการติดตั้ง Supabase Database

### 1. สร้าง Supabase Project
1. ไปที่ [supabase.com](https://supabase.com)
2. สร้างบัญชีหรือ Login
3. คลิก "New Project"
4. ตั้งชื่อ project: `dotdeep-design`
5. ตั้งรหัสผ่าน Database (จดไว้)
6. เลือก Region ใกล้เคียง (Singapore สำหรับ Laos)

### 2. รัน SQL Setup Script
1. ไปที่ SQL Editor ใน Supabase Dashboard
2. Copy ทั้งหมดจากไฟล์ `database-setup.sql`
3. Paste ลงใน SQL Editor
4. คลิก "RUN" เพื่อรัน script

✅ **สิ่งที่ SQL Script จะสร้างให้:**
- 📊 **7 Tables**: users, projects, portfolio, packages, messages, invoices, conversations
- 🔒 **Row Level Security** สำหรับความปลอดภัย
- 🗂️ **Storage Buckets** สำหรับอัพโหลดรูปภาพ
- 📦 **Sample Data**: 3 packages (DOT1, DOT2, DOT3) และ 4 portfolio items
- ⚡ **Performance Indexes** เพื่อความเร็ว

### 3. ตั้งค่า Environment Variables
1. Copy ไฟล์ `env.template` เป็น `.env`:
   ```bash
   cp env.template .env
   ```

2. เปิดไฟล์ `.env` และใส่ข้อมูลจาก Supabase:
   ```env
   # ได้จาก Project Settings > API
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

### 4. ทดสอบการเชื่อมต่อ
```bash
npm run dev
```
เปิดเบราว์เซอร์ไปที่: http://localhost:3000

### 5. สร้าง Admin User
1. ไปที่หน้า Register: http://localhost:3000/register
2. สมัครสมาชิกด้วยอีเมลของคุณ
3. ไปที่ Supabase Dashboard > Authentication > Users
4. คลิกที่ user ที่เพิ่งสร้าง
5. เปลี่ยน `role` จาก `client` เป็น `admin`
6. Logout และ Login ใหม่
7. ตอนนี้จะเข้า Admin Panel ได้ที่: http://localhost:3000/admin

## 🎯 การใช้งาน

### Portfolio Management
- ไปที่ `/admin/portfolio` เพื่อจัดการผลงาน
- อัพโหลดรูปภาพได้จริงผ่าน drag & drop
- ค้นหาและกรองตามหมวดหมู่ได้

### Package Management
- Packages มี 3 แบบ: DOT1 (2,390 LAK), DOT2 (3,990 LAK), DOT3 (5,500 LAK)
- สามารถแก้ไขราคาและรายละเอียดใน Supabase Dashboard

### User Management  
- Admin สามารถดู Users ทั้งหมดได้
- Client สามารถดูเฉพาะ Projects ของตัวเองได้

## 🔧 Advanced Configuration

### Custom Domain (Optional)
```env
VITE_SUPABASE_URL=https://your-custom-domain.com
```

### Email Templates
ใน Supabase Dashboard > Authentication > Email Templates
- ปรับแต่ง Email confirmation, Reset password templates

### Storage Setup
- Bucket `portfolio`: สำหรับรูป Portfolio (Public)
- Bucket `avatars`: สำหรับรูปโปรไฟล์ (Public)  
- Bucket `project-files`: สำหรับไฟล์โปรเจค (Private)

## 🚨 Important Notes

1. **Security**: ใช้ Row Level Security (RLS) ทุก Table
2. **Performance**: มี Indexes สำหรับ queries ที่ใช้บ่อย
3. **Backup**: Supabase ทำ backup อัตโนมัติ
4. **Monitoring**: ดู Performance ใน Supabase Dashboard

## 📞 Support

หากมีปัญหา:
1. ตรวจสอบ Console ใน Browser (F12)
2. ดู Logs ใน Supabase Dashboard
3. ตรวจสอบ Environment Variables
4. ลองรัน SQL Script ใหม่

---

**เมื่อเสร็จแล้วจะได้:**
✅ Website พร้อมใช้งาน 100%  
✅ Database มี Sample Data  
✅ Admin Panel ใช้งานได้  
✅ Portfolio System พร้อมอัพโหลดรูป  
✅ Authentication System พร้อม  

🎉 **Ready for Production!** 