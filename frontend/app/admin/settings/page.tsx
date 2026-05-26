import {saveSettingsAction} from '@/app/admin/_actions/settings'
import {Field, Section} from '@/app/admin/_components/FormField'
import {SubmitButton} from '@/app/admin/_components/SubmitButton'
import {getSiteSettings} from '@/app/lib/db/settings'

export default async function SettingsPage({searchParams}: {searchParams: Promise<{saved?: string}>}) {
  const [settings, sp] = await Promise.all([getSiteSettings(), searchParams])
  const social = settings.socialLinks

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Site Settings</h1>
      {sp.saved && <p className="text-green-400 text-sm bg-green-400/10 px-4 py-2 rounded-lg">✓ Saved successfully</p>}
      <form action={saveSettingsAction} className="space-y-6">
        <Section title="Contact">
          <Field label="Email" name="contact_email" defaultValue={settings.contactEmail} type="email" placeholder="hello@dotdeep.io" />
          <Field label="Phone" name="contact_phone" defaultValue={settings.contactPhone} placeholder="+85659814656" />
        </Section>
        <Section title="Social Links">
          <Field label="Facebook URL" name="facebook" defaultValue={social.facebook} placeholder="https://facebook.com/..." />
          <Field label="Instagram URL" name="instagram" defaultValue={social.instagram} placeholder="https://instagram.com/..." />
          <Field label="TikTok URL" name="tiktok" defaultValue={social.tiktok} placeholder="https://tiktok.com/..." />
          <Field label="WhatsApp URL" name="whatsapp" defaultValue={social.whatsapp} placeholder="https://wa.me/856..." />
          <Field label="LINE URL" name="line" defaultValue={social.line} placeholder="https://line.me/ti/p/~lineid" />
          <Field label="LinkedIn URL" name="linkedin" defaultValue={social.linkedin} placeholder="https://linkedin.com/in/..." />
        </Section>
        <SubmitButton />
      </form>
    </div>
  )
}
