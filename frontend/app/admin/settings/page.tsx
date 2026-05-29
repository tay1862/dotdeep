import {saveSettingsAction} from '@/app/admin/_actions/settings'
import {Field, Section} from '@/app/admin/_components/FormField'
import {SubmitButton} from '@/app/admin/_components/SubmitButton'
import {getSiteSettings} from '@/app/lib/db/settings'

export default async function SettingsPage({searchParams}: {searchParams: Promise<{saved?: string}>}) {
  const [settings, sp] = await Promise.all([getSiteSettings(), searchParams])
  const social = settings.socialLinks

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">Site Settings</h1>
        <p className="text-zinc-400 text-sm mt-1">Manage your contact information and social media links</p>
      </div>
      {sp.saved && (
        <div className="flex items-center gap-2 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <span className="text-green-400 text-sm font-medium">✓ Settings saved successfully</span>
        </div>
      )}
      <form action={saveSettingsAction} className="space-y-6">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <Section title="Contact Information">
            <Field label="Email" name="contact_email" defaultValue={settings.contactEmail} type="email" placeholder="hello@dotdeep.io" />
            <Field label="Phone" name="contact_phone" defaultValue={settings.contactPhone} placeholder="+85659814656" />
          </Section>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <Section title="Social Media">
            <Field label="Facebook URL" name="facebook" defaultValue={social.facebook} placeholder="https://facebook.com/..." />
            <Field label="Instagram URL" name="instagram" defaultValue={social.instagram} placeholder="https://instagram.com/..." />
            <Field label="TikTok URL" name="tiktok" defaultValue={social.tiktok} placeholder="https://tiktok.com/..." />
            <Field label="WhatsApp URL" name="whatsapp" defaultValue={social.whatsapp} placeholder="https://wa.me/856..." />
            <Field label="LINE URL" name="line" defaultValue={social.line} placeholder="https://line.me/ti/p/~lineid" />
            <Field label="LinkedIn URL" name="linkedin" defaultValue={social.linkedin} placeholder="https://linkedin.com/in/..." />
          </Section>
        </div>
        <SubmitButton />
      </form>
    </div>
  )
}
