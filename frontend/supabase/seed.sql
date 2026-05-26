-- ============================================================
-- DotDeep Design — Seed Data
-- Run AFTER schema.sql in Supabase SQL Editor
-- ============================================================

-- ============================================================
-- Site Settings
-- ============================================================
insert into public.site_settings (id, contact_email, contact_phone, address, google_maps_embed, social_links)
values (
  'main',
  'hello@dotdeep.io',
  '+856 20 xxxx xxxx',
  '{"en":"Vientiane, Laos","th":"เวียงจันทน์, ลาว","lo":"ວຽງຈັນ, ລາວ"}',
  null,
  '{"facebook":null,"instagram":null,"tiktok":null,"whatsapp":null,"line":null,"linkedin":null}'
)
on conflict (id) do update set
  contact_email     = excluded.contact_email,
  contact_phone     = excluded.contact_phone,
  address           = excluded.address,
  google_maps_embed = excluded.google_maps_embed,
  social_links      = excluded.social_links;

-- ============================================================
-- About
-- ============================================================
insert into public.about (id, heading, vision, mission, story, story_image_url, tech_stack)
values (
  'main',
  '{"en":"We Create Design That Works","th":"เราสร้างงานดีไซน์ที่ใช้งานได้จริง","lo":"ພວກເຮົາສ້າງການ ອອກແບບ ທີ່ ໃຊ້ງານ ໄດ້ຈິງ"}',
  '{"en":"To be the leading creative studio in Southeast Asia, known for designs that are not only beautiful but drive real business results.","th":"เป็นสตูดิโอสร้างสรรค์ชั้นนำในเอเชียตะวันออกเฉียงใต้ ที่เป็นที่รู้จักในด้านการออกแบบที่ไม่เพียงแต่สวยงาม แต่ยังขับเคลื่อนผลลัพธ์ทางธุรกิจที่แท้จริง","lo":"ເປັນສຕູດິໂອ ສ້າງສັນ ຊັ້ນນໍາ ໃນ ອາຊີ ຕາ ເວັນ ອອກ ສ່ຽງ ໃຕ້"}',
  '{"en":"To deliver exceptional creative solutions that help businesses in Laos and the region stand out, grow, and succeed through the power of thoughtful design.","th":"มอบโซลูชั่นสร้างสรรค์ที่ยอดเยี่ยมที่ช่วยให้ธุรกิจในลาวและภูมิภาคโดดเด่น เติบโต และประสบความสำเร็จผ่านพลังของการออกแบบที่รอบคอบ","lo":"ສ່ງ ມອບ ການ ແກ້ ໄຂ ທີ່ ຍອດ ຍ້ຽມ ທີ່ ຊ່ວຍ ໃຫ້ ທຸ ລະ ກິດ ໃນ ລາວ ໂດດ ເດັ່ນ ແລະ ຂະ ຫຍາຍ"}',
  '{"en":"DotDeep Design was founded in Vientiane with a simple belief: great design should be accessible to every business. We started as a small team of passionate designers and grew into a full-service creative studio serving clients across Laos, Thailand, and beyond.","th":"DotDeep Design ก่อตั้งขึ้นในเวียงจันทน์ด้วยความเชื่อง่ายๆ ว่า การออกแบบที่ยอดเยี่ยมควรเข้าถึงได้สำหรับทุกธุรกิจ เราเริ่มต้นในฐานะทีมนักออกแบบที่มีความหลงใหลเล็กๆ และเติบโตเป็นสตูดิโอสร้างสรรค์แบบครบวงจร","lo":"DotDeep Design ກໍ່ ຕັ້ງ ໃນ ວຽງຈັນ ດ້ວຍ ຄວາມ ເຊື່ອ ງ່າຍໆ ວ່າ ການ ອອກ ແບບ ທີ່ ດີ ຄວນ ເຂົ້າ ເຖິງ ໄດ້ ສໍາ ລັບ ທຸກ ທຸ ລະ ກິດ"}',
  null,
  '["Figma","Adobe Illustrator","Adobe Photoshop","After Effects","Premiere Pro","Next.js","React","Tailwind CSS","Framer","Webflow"]'
)
on conflict (id) do update set
  heading         = excluded.heading,
  vision          = excluded.vision,
  mission         = excluded.mission,
  story           = excluded.story,
  story_image_url = excluded.story_image_url,
  tech_stack      = excluded.tech_stack;

-- ============================================================
-- Team Members
-- ============================================================
insert into public.team_members (id, first_name, last_name, picture_url, role, bio, social_links, order_index)
values (
  '1', 'DotDeep', 'Team', null,
  '{"en":"Founder & Creative Director","th":"ผู้ก่อตั้ง & ผู้อำนวยการสร้างสรรค์","lo":"ຜູ້ກໍ່ຕັ້ງ & ຜູ້ອໍານວຍການສ້າງສັນ"}',
  '{"en":"Passionate about creating meaningful design experiences that connect brands with their audiences.","th":"มีความหลงใหลในการสร้างประสบการณ์การออกแบบที่มีความหมายซึ่งเชื่อมโยงแบรนด์กับผู้ชม","lo":"ມີຄວາມ ຮັກໃນການ ສ້າງ ປະສົບການ ການ ອອກແບບ ທີ່ ມີ ຄວາມ ໝາຍ"}',
  '{"facebook":null,"instagram":null,"linkedin":null,"tiktok":null,"whatsapp":null,"line":null}',
  0
)
on conflict (id) do update set
  first_name   = excluded.first_name,
  last_name    = excluded.last_name,
  picture_url  = excluded.picture_url,
  role         = excluded.role,
  bio          = excluded.bio,
  social_links = excluded.social_links,
  order_index  = excluded.order_index;

-- ============================================================
-- Services
-- ============================================================
insert into public.services (id, slug, icon, title, short_description, description, features, order_index)
values
(
  '1', 'graphic-design', 'palette',
  '{"en":"Graphic Design","th":"ออกแบบกราฟิก","lo":"ອອກແບບກຣາຟິກ"}',
  '{"en":"Brand identity, logo design, and marketing materials that make your business stand out.","th":"อัตลักษณ์แบรนด์ ออกแบบโลโก้ และสื่อการตลาดที่ทำให้ธุรกิจของคุณโดดเด่น","lo":"ຍີ່ຫໍ້, ໂລໂກ້ ແລະ ສື່ການຕະຫຼາດທີ່ເຮັດໃຫ້ທຸລະກິດຂອງທ່ານໂດດເດັ່ນ"}',
  '{"en":"We create compelling visual identities that communicate your brand story. From initial concept to final delivery, our graphic design service covers everything your business needs to look professional and memorable.","th":"เราสร้างอัตลักษณ์ทางภาพที่น่าสนใจซึ่งสื่อสารเรื่องราวของแบรนด์คุณ ตั้งแต่แนวคิดเริ่มต้นจนถึงการส่งมอบขั้นสุดท้าย","lo":"ພວກເຮົາສ້າງຕົວຕົນທາງສາຍຕາທີ່ດຶງດູດໃຈທີ່ສື່ສານເລື່ອງຂອງຍີ່ຫໍ້ຂອງທ່ານ ຕັ້ງແຕ່ແນວຄິດເລີ່ມຕົ້ນຈົນເຖິງການສົ່ງມອບ"}',
  '[{"en":"Logo & Brand Identity","th":"โลโก้ & อัตลักษณ์แบรนด์","lo":"ໂລໂກ້ & ຍີ່ຫໍ້"},{"en":"Business Cards & Stationery","th":"นามบัตร & เครื่องเขียน","lo":"ນາມບັດ & ເຄື່ອງຂຽນ"},{"en":"Social Media Graphics","th":"กราฟิกโซเชียลมีเดีย","lo":"ກຣາຟິກໂຊຊຽນ"},{"en":"Brochure & Print Design","th":"โบรชัวร์ & งานพิมพ์","lo":"ໂບຊົວ & ວຽກພິມ"},{"en":"Packaging Design","th":"ออกแบบบรรจุภัณฑ์","lo":"ອອກແບບໜ້າຫໍ່"},{"en":"Banner & Poster Design","th":"แบนเนอร์ & โปสเตอร์","lo":"ແບນເນີ & ໂປສເຕີ"}]',
  0
),
(
  '2', 'web-development', 'code',
  '{"en":"Web Development","th":"พัฒนาเว็บไซต์","lo":"ພັດທະນາເວັບໄຊ"}',
  '{"en":"Fast, responsive, and modern websites built with the latest technologies.","th":"เว็บไซต์ที่รวดเร็ว ตอบสนอง และทันสมัย สร้างด้วยเทคโนโลยีล่าสุด","lo":"ເວັບໄຊທີ່ໄວ, ຕອບສະຫນອງ ແລະ ທັນສະໄໝ ສ້າງດ້ວຍເທັກໂນໂລຊີຫຼ້າສຸດ"}',
  '{"en":"We build high-performance websites that look great on every device. Our development process focuses on clean code, fast load times, and SEO-friendly architecture to help your business grow online.","th":"เราสร้างเว็บไซต์ประสิทธิภาพสูงที่ดูดีบนทุกอุปกรณ์ กระบวนการพัฒนาของเรามุ่งเน้นที่โค้ดสะอาด เวลาโหลดเร็ว และสถาปัตยกรรมที่เป็นมิตรกับ SEO","lo":"ພວກເຮົາສ້າງເວັບໄຊທີ່ດູດີທຸກອຸປະກອນ ໂດຍສຸມໃສ່ code ທີ່ສະອາດ, ໂຫຼດໄວ ແລະ SEO"}',
  '[{"en":"Responsive Web Design","th":"เว็บดีไซน์ที่ตอบสนอง","lo":"ເວັບດີໄຊທ໌ຕອບສະຫນອງ"},{"en":"Next.js / React Development","th":"พัฒนา Next.js / React","lo":"ພັດທະນາ Next.js / React"},{"en":"E-commerce Solutions","th":"โซลูชั่น E-commerce","lo":"E-commerce"},{"en":"SEO Optimization","th":"การเพิ่มประสิทธิภาพ SEO","lo":"ການເພີ່ມປະສິດທິພາບ SEO"},{"en":"CMS Integration","th":"การรวม CMS","lo":"ການລວມ CMS"},{"en":"Performance & Security","th":"ประสิทธิภาพ & ความปลอดภัย","lo":"ປະສິດທິພາບ & ຄວາມປອດໄພ"}]',
  1
),
(
  '3', 'ui-ux-design', 'layout',
  '{"en":"UI/UX Design","th":"ออกแบบ UI/UX","lo":"ອອກແບບ UI/UX"}',
  '{"en":"User-centered interface design and prototyping that converts visitors into customers.","th":"การออกแบบอินเทอร์เฟซที่ยึดผู้ใช้เป็นศูนย์กลาง ทำให้ผู้เยี่ยมชมกลายเป็นลูกค้า","lo":"ການອອກແບບທີ່ສຸມໃສ່ຜູ້ໃຊ້ ເຮັດໃຫ້ຜູ້ເຂົ້າຊົມກາຍເປັນລູກຄ້າ"}',
  '{"en":"Great design is about more than looks — it is about how it works. We design intuitive user experiences that guide your customers smoothly from first click to conversion.","th":"การออกแบบที่ยอดเยี่ยมไม่ใช่แค่รูปลักษณ์ แต่เกี่ยวกับวิธีที่มันทำงาน เราออกแบบประสบการณ์ผู้ใช้ที่สัญชาตญาณ","lo":"ການອອກແບບທີ່ດີບໍ່ໄດ້ກ່ຽວກັບຮູບລັກສະນາພຽງຢ່າງດຽວ ພວກເຮົາອອກແບບປະສົບການທີ່ໃຊ້ງ່າຍ"}',
  '[{"en":"User Research & Analysis","th":"การวิจัยและวิเคราะห์ผู้ใช้","lo":"ການຄົ້ນຄ້ວາຜູ້ໃຊ້"},{"en":"Wireframing & Prototyping","th":"ไวร์เฟรม & โปรโตไทป์","lo":"ໄວຣ໌ເຟຣມ & ໂປຣໂຕໄທ"},{"en":"UI Design (Figma)","th":"ออกแบบ UI (Figma)","lo":"ອອກແບບ UI (Figma)"},{"en":"Design System","th":"ระบบออกแบบ","lo":"ລະບົບອອກແບບ"},{"en":"Usability Testing","th":"การทดสอบการใช้งาน","lo":"ການທົດສອບການໃຊ້ງານ"},{"en":"Handoff to Developers","th":"ส่งมอบให้นักพัฒนา","lo":"ສົ່ງມອບໃຫ້ນັກພັດທະນາ"}]',
  2
),
(
  '4', 'video-production', 'video',
  '{"en":"Video Production","th":"ผลิตวิดีโอ","lo":"ຜະລິດວິດີໂອ"}',
  '{"en":"Motion graphics, promotional videos, and social media content that engages your audience.","th":"กราฟิกเคลื่อนไหว วิดีโอโปรโมชั่น และเนื้อหาโซเชียลมีเดียที่ดึงดูดผู้ชม","lo":"ກຣາຟິກເຄື່ອນໄຫວ, ວິດີໂອໂປຣໂມຊັ່ນ ແລະ ເນື້ອຫາໂຊຊຽນ"}',
  '{"en":"Video is the most powerful form of content marketing. We produce high-quality motion graphics and video content that tells your brand story and captures attention on any platform.","th":"วิดีโอเป็นรูปแบบการตลาดเนื้อหาที่ทรงพลังที่สุด เราผลิตกราฟิกเคลื่อนไหวและวิดีโอคุณภาพสูง","lo":"ວິດີໂອເປັນຮູບແບບການຕະຫຼາດທີ່ມີປະສິດທິພາບທີ່ສຸດ ພວກເຮົາຜະລິດວິດີໂອຄຸນນະພາບສູງ"}',
  '[{"en":"Motion Graphics","th":"กราฟิกเคลื่อนไหว","lo":"ກຣາຟິກເຄື່ອນໄຫວ"},{"en":"Promotional Videos","th":"วิดีโอโปรโมชั่น","lo":"ວິດີໂອໂປຣໂມຊັ່ນ"},{"en":"Social Media Reels","th":"โซเชียลมีเดียรีลส์","lo":"ໂຊຊຽນ Reels"},{"en":"Product Demo Videos","th":"วิดีโอสาธิตผลิตภัณฑ์","lo":"ວິດີໂອສາທິດ"},{"en":"Animation & 2D/3D","th":"อนิเมชั่น & 2D/3D","lo":"ອານິເມຊັ່ນ & 2D/3D"},{"en":"Video Editing","th":"ตัดต่อวิดีโอ","lo":"ຕັດຕໍ່ວິດີໂອ"}]',
  3
)
on conflict (id) do update set
  slug              = excluded.slug,
  icon              = excluded.icon,
  title             = excluded.title,
  short_description = excluded.short_description,
  description       = excluded.description,
  features          = excluded.features,
  order_index       = excluded.order_index;

-- ============================================================
-- Pricing Items
-- ============================================================
insert into public.pricing_items (id, service_id, name, price, currency, description, features, popular, order_index)
values
-- Graphic Design
(
  'gd-basic', '1',
  '{"en":"Basic","th":"เบสิก","lo":"ພື້ນຖານ"}',
  500000, 'LAK',
  '{"en":"Logo + 2 revisions","th":"โลโก้ + แก้ไข 2 ครั้ง","lo":"ໂລໂກ້ + ແກ້ໄຂ 2 ຄັ້ງ"}',
  '[{"en":"Logo design (3 concepts)","th":"ออกแบบโลโก้ (3 แนวคิด)","lo":"ອອກແບບໂລໂກ້ (3 ແນວຄິດ)"},{"en":"2 rounds of revisions","th":"แก้ไข 2 รอบ","lo":"ແກ້ໄຂ 2 ຮອບ"},{"en":"Final files (PNG, SVG)","th":"ไฟล์สุดท้าย (PNG, SVG)","lo":"ໄຟລ໌ສຸດທ້າຍ (PNG, SVG)"}]',
  false, 0
),
(
  'gd-standard', '1',
  '{"en":"Standard","th":"สแตนดาร์ด","lo":"ມາດຕະຖານ"}',
  1500000, 'LAK',
  '{"en":"Full brand identity package","th":"แพ็คเกจอัตลักษณ์แบรนด์ครบชุด","lo":"ຊຸດຍີ່ຫໍ້ຄົບ"}',
  '[{"en":"Logo + brand guidelines","th":"โลโก้ + คู่มือแบรนด์","lo":"ໂລໂກ້ + ຄູ່ມືຍີ່ຫໍ້"},{"en":"Business card design","th":"ออกแบบนามบัตร","lo":"ອອກແບບນາມບັດ"},{"en":"Social media kit","th":"ชุดโซเชียลมีเดีย","lo":"ຊຸດໂຊຊຽນ"},{"en":"5 rounds of revisions","th":"แก้ไข 5 รอบ","lo":"ແກ້ໄຂ 5 ຮອບ"}]',
  true, 1
),
-- Web Development
(
  'web-landing', '2',
  '{"en":"Landing Page","th":"หน้าแลนดิ้ง","lo":"ໜ້າ Landing"}',
  3000000, 'LAK',
  '{"en":"Single-page website","th":"เว็บไซต์หน้าเดียว","lo":"ເວັບໄຊໜ້າດຽວ"}',
  '[{"en":"Custom design","th":"ดีไซน์ตามสั่ง","lo":"ດີໄຊທ໌ຕາມສັ່ງ"},{"en":"Mobile responsive","th":"รองรับมือถือ","lo":"ຮອງຮັບມືຖື"},{"en":"Contact form","th":"แบบฟอร์มติดต่อ","lo":"ແບບຟອມຕິດຕໍ່"},{"en":"Basic SEO setup","th":"ตั้งค่า SEO พื้นฐาน","lo":"ຕັ້ງຄ່າ SEO ພື້ນຖານ"}]',
  false, 0
),
(
  'web-full', '2',
  '{"en":"Full Website","th":"เว็บไซต์เต็มรูปแบบ","lo":"ເວັບໄຊເຕັມຮູບແບບ"}',
  8000000, 'LAK',
  '{"en":"Multi-page website with CMS","th":"เว็บไซต์หลายหน้าพร้อม CMS","lo":"ເວັບໄຊຫຼາຍໜ້າພ້ອມ CMS"}',
  '[{"en":"Up to 10 pages","th":"สูงสุด 10 หน้า","lo":"ສູງສຸດ 10 ໜ້າ"},{"en":"CMS for easy editing","th":"CMS สำหรับแก้ไขง่าย","lo":"CMS ສໍາລັບແກ້ໄຂງ່າຍ"},{"en":"Advanced SEO","th":"SEO ขั้นสูง","lo":"SEO ຂັ້ນສູງ"},{"en":"3 months support","th":"ซัพพอร์ต 3 เดือน","lo":"ຊັບພອດ 3 ເດືອນ"}]',
  true, 1
),
-- UI/UX Design
(
  'ux-app', '3',
  '{"en":"App Design","th":"ออกแบบแอป","lo":"ອອກແບບແອັບ"}',
  5000000, 'LAK',
  '{"en":"Mobile or web app UI/UX","th":"UI/UX สำหรับแอปมือถือหรือเว็บ","lo":"UI/UX ສໍາລັບແອັບ"}',
  '[{"en":"Up to 15 screens","th":"สูงสุด 15 หน้าจอ","lo":"ສູງສຸດ 15 ໜ້າຈໍ"},{"en":"Interactive prototype","th":"โปรโตไทป์แบบโต้ตอบ","lo":"ໂປຣໂຕໄທແບບໂຕ້ຕອບ"},{"en":"Figma source files","th":"ไฟล์ต้นฉบับ Figma","lo":"ໄຟລ໌ Figma"},{"en":"Dev handoff","th":"ส่งมอบนักพัฒนา","lo":"ສົ່ງມອບໃຫ້ Dev"}]',
  true, 0
),
-- Video Production
(
  'vid-short', '4',
  '{"en":"Short Clip","th":"คลิปสั้น","lo":"ຄລິບສັ້ນ"}',
  2000000, 'LAK',
  '{"en":"Up to 60 seconds","th":"สูงสุด 60 วินาที","lo":"ສູງສຸດ 60 ວິນາທີ"}',
  '[{"en":"Script & storyboard","th":"สคริปต์ & สตอรี่บอร์ด","lo":"ສະຄຣິບ & ສະຕໍລີ"},{"en":"Motion graphics","th":"กราฟิกเคลื่อนไหว","lo":"ກຣາຟິກເຄື່ອນໄຫວ"},{"en":"Music & sound effects","th":"เพลง & เอฟเฟกต์เสียง","lo":"ດົນຕີ & ສຽງ"},{"en":"HD export (1080p)","th":"ส่งออก HD (1080p)","lo":"ສົ່ງອອກ HD (1080p)"}]',
  true, 0
)
on conflict (id) do update set
  service_id  = excluded.service_id,
  name        = excluded.name,
  price       = excluded.price,
  currency    = excluded.currency,
  description = excluded.description,
  features    = excluded.features,
  popular     = excluded.popular,
  order_index = excluded.order_index;

-- ============================================================
-- Projects
-- ============================================================
insert into public.projects (id, slug, title, description, category, cover_url, image_urls, client, tech_stack, project_url, video_url, featured, completed_at, order_index)
values
(
  '1', 'dotdeep-brand-identity',
  '{"en":"DotDeep Brand Identity","th":"อัตลักษณ์แบรนด์ DotDeep","lo":"ຍີ່ຫໍ້ DotDeep"}',
  '{"en":"Complete brand identity for DotDeep Design Studio including logo, color palette, typography, and brand guidelines.","th":"อัตลักษณ์แบรนด์ครบชุดสำหรับ DotDeep Design Studio รวมถึงโลโก้ จานสี ตัวอักษร และคู่มือแบรนด์","lo":"ຍີ່ຫໍ້ຄົບຊຸດສໍາລັບ DotDeep Design Studio"}',
  'graphic', null, '[]', 'DotDeep Design', '["Illustrator","Figma"]', null, null, true, '2024-01-01', 0
),
(
  '2', 'cafe-website',
  '{"en":"Café Lao Website","th":"เว็บไซต์ Café Lao","lo":"ເວັບໄຊ Café Lao"}',
  '{"en":"Modern restaurant website with online menu, booking system, and multilingual support for a Vientiane café.","th":"เว็บไซต์ร้านอาหารสมัยใหม่พร้อมเมนูออนไลน์ ระบบจองโต๊ะ และรองรับหลายภาษาสำหรับร้านกาแฟในเวียงจันทน์","lo":"ເວັບໄຊຮ້ານ ອາຫານທັນສະໄໝ ພ້ອມລາຍການ ອາຫານ, ລະບົບຈອງ ແລະ ຫຼາຍພາສາ"}',
  'web', null, '[]', 'Café Lao', '["Next.js","Tailwind CSS","Vercel"]', null, null, true, '2024-03-01', 1
),
(
  '3', 'fintech-app-design',
  '{"en":"FinTech App UI","th":"UI แอป FinTech","lo":"UI ແອັບ FinTech"}',
  '{"en":"User interface design for a mobile banking application targeting young professionals in Southeast Asia.","th":"การออกแบบส่วนติดต่อผู้ใช้สำหรับแอปพลิเคชันธนาคารมือถือสำหรับมืออาชีพรุ่นใหม่ในเอเชียตะวันออกเฉียงใต้","lo":"ການອອກແບບ UI ສໍາລັບແອັບ ທະນາຄານ ມືຖືສໍາລັບ ຜູ້ຊ່ຽວຊານ ໃຫ້ໜຸ່ມໃນອາຊີ"}',
  'uiux', null, '[]', 'Confidential', '["Figma","Protopie"]', null, null, true, '2024-05-01', 2
),
(
  '4', 'product-launch-video',
  '{"en":"Product Launch Video","th":"วิดีโอเปิดตัวผลิตภัณฑ์","lo":"ວິດີໂອ ເປີດໂຕ ຜະລິດຕະພັນ"}',
  '{"en":"60-second promotional video with motion graphics for a new product launch campaign.","th":"วิดีโอโปรโมชั่น 60 วินาทีพร้อมกราฟิกเคลื่อนไหวสำหรับแคมเปญเปิดตัวผลิตภัณฑ์ใหม่","lo":"ວິດີໂອໂປຣໂມຊັ່ນ 60 ວິນາທີ ພ້ອມກຣາຟິກ ສໍາລັບ ການ ເປີດໂຕ"}',
  'video', null, '[]', 'Local Brand', '["After Effects","Premiere Pro"]', null, null, false, '2024-07-01', 3
),
(
  '5', 'real-estate-platform',
  '{"en":"Real Estate Platform","th":"แพลตฟอร์มอสังหาริมทรัพย์","lo":"ແພລດຟອມ ອະສັງຫາ"}',
  '{"en":"Property listing platform with search filters, map integration, and agent contact system.","th":"แพลตฟอร์มรายการอสังหาริมทรัพย์พร้อมตัวกรองการค้นหา การรวมแผนที่ และระบบติดต่อตัวแทน","lo":"ແພລດຟອມ ລາຍຊື່ ອະສັງຫາ ພ້ອມ ການຄົ້ນຫາ ແລະ ແຜນທີ່"}',
  'web', null, '[]', 'LaoHomes', '["React","Node.js","Google Maps API"]', null, null, false, '2024-09-01', 4
),
(
  '6', 'food-packaging-design',
  '{"en":"Food Packaging Design","th":"ออกแบบบรรจุภัณฑ์อาหาร","lo":"ອອກແບບ ໜ້າຫໍ່ ອາຫານ"}',
  '{"en":"Packaging design for a local food brand including labels, boxes, and promotional materials.","th":"ออกแบบบรรจุภัณฑ์สำหรับแบรนด์อาหารท้องถิ่น รวมถึงฉลาก กล่อง และสื่อโปรโมชั่น","lo":"ການອອກແບບໜ້າຫໍ່ ສໍາລັບ ຍີ່ຫໍ້ ອາຫານທ້ອງຖິ່ນ"}',
  'graphic', null, '[]', 'Lao Foods', '["Illustrator","Photoshop"]', null, null, false, '2024-11-01', 5
)
on conflict (id) do update set
  slug         = excluded.slug,
  title        = excluded.title,
  description  = excluded.description,
  category     = excluded.category,
  cover_url    = excluded.cover_url,
  image_urls   = excluded.image_urls,
  client       = excluded.client,
  tech_stack   = excluded.tech_stack,
  project_url  = excluded.project_url,
  video_url    = excluded.video_url,
  featured     = excluded.featured,
  completed_at = excluded.completed_at,
  order_index  = excluded.order_index;
