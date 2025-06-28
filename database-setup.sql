-- ==============================================
-- DOTDEEP DESIGN DATABASE SETUP
-- Supabase PostgreSQL Schema
-- ==============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================
-- ENUMS
-- ==============================================

CREATE TYPE user_role AS ENUM ('admin', 'client', 'visitor');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE project_status AS ENUM ('pending', 'in_progress', 'review', 'revision', 'completed', 'cancelled');
CREATE TYPE package_code AS ENUM ('DOT1', 'DOT2', 'DOT3', 'CUSTOM');
CREATE TYPE currency AS ENUM ('LAK', 'USD', 'THB');
CREATE TYPE portfolio_category AS ENUM ('logo', 'branding', 'graphic', 'artboard', 'web', 'print');
CREATE TYPE message_type AS ENUM ('text', 'file', 'image', 'system');
CREATE TYPE invoice_status AS ENUM ('draft', 'sent', 'paid', 'overdue', 'cancelled');

-- ==============================================
-- TABLES
-- ==============================================

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  avatar_url TEXT,
  role user_role DEFAULT 'client',
  status user_status DEFAULT 'active',
  language_preference VARCHAR(2) DEFAULT 'en' CHECK (language_preference IN ('en', 'lo')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  package_type package_code NOT NULL,
  status project_status DEFAULT 'pending',
  price DECIMAL(12,2) NOT NULL,
  currency currency DEFAULT 'LAK',
  deadline TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  files JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio table
CREATE TABLE portfolio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  title_lao VARCHAR(500),
  description TEXT,
  description_lao TEXT,
  category portfolio_category NOT NULL,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  client_name VARCHAR(255),
  project_year INTEGER NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',
  before_image TEXT,
  after_image TEXT,
  case_study TEXT,
  testimonial TEXT,
  sort_order INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Packages table
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  name_lao VARCHAR(255),
  code package_code UNIQUE NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  currency currency DEFAULT 'LAK',
  description TEXT NOT NULL,
  description_lao TEXT,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  features_lao JSONB DEFAULT '[]'::jsonb,
  delivery_time INTEGER NOT NULL, -- in days
  revisions INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  is_popular BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type message_type DEFAULT 'text',
  file_url TEXT,
  file_name VARCHAR(255),
  file_size INTEGER,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoices table
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  currency currency DEFAULT 'LAK',
  status invoice_status DEFAULT 'draft',
  due_date TIMESTAMPTZ NOT NULL,
  paid_at TIMESTAMPTZ,
  payment_method VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  participants UUID[] NOT NULL,
  title VARCHAR(500),
  last_message TEXT,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key for messages after conversations table is created
ALTER TABLE messages ADD CONSTRAINT fk_messages_conversation 
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE;

-- ==============================================
-- INDEXES
-- ==============================================

-- Performance indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_package ON projects(package_type);
CREATE INDEX idx_projects_created ON projects(created_at DESC);

CREATE INDEX idx_portfolio_category ON portfolio(category);
CREATE INDEX idx_portfolio_featured ON portfolio(featured);
CREATE INDEX idx_portfolio_status ON portfolio(status);
CREATE INDEX idx_portfolio_year ON portfolio(project_year DESC);

CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);

CREATE INDEX idx_invoices_project ON invoices(project_id);
CREATE INDEX idx_invoices_client ON invoices(client_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);

-- ==============================================
-- FUNCTIONS
-- ==============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ==============================================
-- TRIGGERS
-- ==============================================

-- Auto-update updated_at timestamps
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_updated_at BEFORE UPDATE ON portfolio
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON packages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Projects policies
CREATE POLICY "Clients can view their own projects" ON projects
  FOR SELECT USING (client_id = auth.uid());

CREATE POLICY "Admins can view all projects" ON projects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Clients can create projects" ON projects
  FOR INSERT WITH CHECK (client_id = auth.uid());

-- Portfolio policies (public read access)
CREATE POLICY "Anyone can view published portfolio" ON portfolio
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage portfolio" ON portfolio
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Packages policies (public read access)
CREATE POLICY "Anyone can view active packages" ON packages
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage packages" ON packages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Messages policies
CREATE POLICY "Users can view messages in their conversations" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversations 
      WHERE id = conversation_id 
      AND auth.uid() = ANY(participants)
    )
  );

CREATE POLICY "Users can send messages in their conversations" ON messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM conversations 
      WHERE id = conversation_id 
      AND auth.uid() = ANY(participants)
    )
  );

-- Invoices policies
CREATE POLICY "Clients can view their own invoices" ON invoices
  FOR SELECT USING (client_id = auth.uid());

CREATE POLICY "Admins can manage all invoices" ON invoices
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Conversations policies
CREATE POLICY "Users can view their own conversations" ON conversations
  FOR SELECT USING (auth.uid() = ANY(participants));

CREATE POLICY "Users can create conversations" ON conversations
  FOR INSERT WITH CHECK (auth.uid() = ANY(participants));

-- ==============================================
-- INITIAL DATA
-- ==============================================

-- Insert default packages
INSERT INTO packages (name, name_lao, code, price, currency, description, description_lao, features, features_lao, delivery_time, revisions, is_popular, sort_order) VALUES
(
  'DOT1 - Essential',
  'DOT1 - ພື້ນຖານ',
  'DOT1',
  2390.00,
  'LAK',
  'Perfect for startups and small businesses looking for professional logo design.',
  'ເໝາະສົມສຳລັບ startup ແລະທຸລະກິດຂະໜາດນ້ອຍທີ່ຕ້ອງການການອອກແບບໂລໂກ້ແບບມືອາຊີບ.',
  '["Logo Concept Development", "Basic Brand Guidelines", "High-Resolution Files", "Social Media Formats", "Email Support"]'::jsonb,
  '["ການພັດທະນາແນວຄວາມຄິດໂລໂກ້", "ຄູ່ມືແບຼນດ໌ພື້ນຖານ", "ໄຟລ໌ຄວາມລະອຽດສູງ", "ຮູບແບບສື່ສັງຄົມ", "ການສະໜັບສະໜູນອີເມວ"]'::jsonb,
  3,
  2,
  false,
  1
),
(
  'DOT2 - Professional',
  'DOT2 - ມືອາຊີບ',
  'DOT2',
  3990.00,
  'LAK',
  'Comprehensive branding solution for established businesses.',
  'ການແກ້ໄຂແບຼນດິ້ງທີ່ສົມບູນສຳລັບທຸລະກິດທີ່ໄດ້ສ້າງຕັ້ງແລ້ວ.',
  '["Multiple Logo Concepts", "Complete Brand Guidelines", "High-Resolution Files", "Social Media Kit", "Business Card Design", "Letterhead Design", "Priority Support"]'::jsonb,
  '["ແນວຄວາມຄິດໂລໂກ້ຫຼາຍແບບ", "ຄູ່ມືແບຼນດ໌ສົມບູນ", "ໄຟລ໌ຄວາມລະອຽດສູງ", "ຊຸດສື່ສັງຄົມ", "ການອອກແບບນາມບັດ", "ການອອກແບບເຈ້ຍໜັງສື", "ການສະໜັບສະໜູນລຳດັບຄວາມສຳຄັນ"]'::jsonb,
  5,
  3,
  true,
  2
),
(
  'DOT3 - Premium',
  'DOT3 - ພຣີເມ້ຍົມ',
  'DOT3',
  5500.00,
  'LAK',
  'Ultimate branding package for businesses ready to make a statement.',
  'ແພັກເກັດແບຼນດິ້ງສຸດຍອດສຳລັບທຸລະກິດທີ່ພ້ອມທີ່ຈະສ້າງຄວາມປະທັບໃຈ.',
  '["Premium Logo Concepts", "Complete Brand Identity", "High-Resolution Files", "Complete Marketing Kit", "Business Stationery Set", "Website Design Mockup", "Package Design Template", "Dedicated Support", "1-Year Brand Maintenance"]'::jsonb,
  '["ແນວຄວາມຄິດໂລໂກ້ພຣີເມ້ຍົມ", "ເອກະລັກແບຼນດ໌ສົມບູນ", "ໄຟລ໌ຄວາມລະອຽດສູງ", "ຊຸດການຕະຫຼາດສົມບູນ", "ຊຸດເຄື່ອງຂຽນທຸລະກິດ", "ແບບຈຳລອງການອອກແບບເວັບໄຊທ໌", "ແມ່ແບບການອອກແບບແພັກເກັດ", "ການສະໜັບສະໜູນທີ່ໄວເນື້ອເຊື່ອໃຈ", "ການບຳລຸງຮັກສາແບຼນດ໌ 1 ປີ"]'::jsonb,
  7,
  5,
  false,
  3
);

-- Insert sample portfolio items
INSERT INTO portfolio (title, title_lao, category, images, client_name, project_year, featured, tags, description, description_lao, status) VALUES
(
  'Lao Coffee House Branding',
  'ແບຼນດິ້ງຮ້ານກາເຟລາວ',
  'branding',
  '["/images/portfolio/portfolio-sample-1.jpg", "/images/portfolio/portfolio-sample-2.jpg", "/images/portfolio/portfolio-sample-3.jpg", "/images/portfolio/portfolio-sample-4.jpg"]'::jsonb,
  'Lao Coffee House',
  2024,
  true,
  '{Branding, "Logo Design", Packaging, "Print Design"}',
  'Complete branding solution for a premium coffee house in Vientiane, including logo design, business cards, and packaging.',
  'ການແກ້ໄຂແບຼນດິ້ງຄົບຖ້ວນສຳລັບຮ້ານກາເຟທີ່ມີຄຸນນະພາບໃນວຽງຈັນ, ລວມທັງການອອກແບບໂລໂກ້, ນາມບັດ, ແລະບັນຈຸພັນ.',
  'published'
),
(
  'Modern Restaurant Logo',
  'ໂລໂກ້ຮ້ານອາຫານທັນສະໄໝ',
  'logo',
  '["/images/portfolio/portfolio-sample-5.jpg", "/images/portfolio/portfolio-sample-6.jpg", "/images/portfolio/portfolio-sample-7.jpg"]'::jsonb,
  'Sabaidee Restaurant',
  2024,
  false,
  '{"Logo Design", Restaurant, Modern}',
  'Modern logo design for a contemporary Lao restaurant featuring traditional elements with modern typography.',
  'ການອອກແບບໂລໂກ້ທັນສະໄໝສຳລັບຮ້ານອາຫານລາວທີ່ມີການປະສົມປະສານລະຫວ່າງອົງປະກອບພື້ນເມືອງແລະຕົວອັກສອນທັນສະໄໝ.',
  'published'
),
(
  'Tech Startup Identity',
  'ເອກະລັກບໍລິສັດເທັກໂນໂລຍີ',
  'branding',
  '["/images/portfolio/portfolio-sample-8.jpg", "/images/portfolio/portfolio-sample-9.jpg", "/images/portfolio/portfolio-sample-10.jpg", "/images/portfolio/portfolio-sample-11.jpg"]'::jsonb,
  'Lao Tech Solutions',
  2024,
  true,
  '{Branding, Tech, Modern, Digital}',
  'Complete brand identity for a technology startup, including logo, website design, and digital assets.',
  'ເອກະລັກແບຼນດ໌ຄົບຖ້ວນສຳລັບບໍລິສັດເທັກໂນໂລຍີໃໝ່, ລວມທັງໂລໂກ້, ການອອກແບບເວັບໄຊທ໌, ແລະຊັບສິນດິຈິຕອນ.',
  'published'
),
(
  'Luxury Hotel Branding',
  'ແບຼນດິ້ງໂຮງແຮມຫຼູຫຼາ',
  'branding',
  '["/images/portfolio/portfolio-sample-12.jpg", "/images/portfolio/portfolio-sample-13.jpg", "/images/portfolio/portfolio-sample-14.jpg", "/images/portfolio/portfolio-sample-15.jpg"]'::jsonb,
  'Mekong Luxury Resort',
  2023,
  true,
  '{Luxury, Hospitality, Elegant, Premium}',
  'Elegant branding for a luxury resort featuring sophisticated typography and premium finishes.',
  'ແບຼນດິ້ງທີ່ສະຫງ່າງາມສຳລັບຣີສອດຫຼູຫຼາທີ່ມີຕົວອັກສອນທີ່ຊັບຊ້ອນແລະການສຳເລັດແບບພຣີມຽມ.',
  'published'
);

-- ==============================================
-- STORAGE SETUP
-- ==============================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('portfolio', 'portfolio', true),
  ('avatars', 'avatars', true),
  ('project-files', 'project-files', false);

-- Storage policies
CREATE POLICY "Portfolio images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio');

CREATE POLICY "Admins can upload portfolio images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'portfolio' AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own project files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'project-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- ==============================================
-- COMPLETE!
-- ==============================================

-- Display completion message
DO $$
BEGIN
  RAISE NOTICE 'Dotdeep Design database setup completed successfully!';
  RAISE NOTICE 'Created tables: users, projects, portfolio, packages, messages, invoices, conversations';
  RAISE NOTICE 'Added RLS policies for security';
  RAISE NOTICE 'Inserted sample data for packages and portfolio';
  RAISE NOTICE 'Setup storage buckets for images and files';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Update your .env file with Supabase credentials';
  RAISE NOTICE '2. Test the website at http://localhost:3000';
  RAISE NOTICE '3. Create an admin user to access the admin panel';
END $$; 