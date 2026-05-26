interface FieldProps {
  label: string
  name: string
  defaultValue?: string | null
  type?: string
  required?: boolean
  placeholder?: string
  textarea?: boolean
  rows?: number
}

export function Field({label, name, defaultValue, type = 'text', required, placeholder, textarea, rows = 3}: FieldProps) {
  const base = 'w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-400 mb-1">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {textarea ? (
        <textarea name={name} defaultValue={defaultValue ?? ''} required={required} placeholder={placeholder} rows={rows} className={base} />
      ) : (
        <input name={name} type={type} defaultValue={defaultValue ?? ''} required={required} placeholder={placeholder} className={base} />
      )}
    </div>
  )
}

export function LocalizedFields({prefix, label, defaultValues, textarea, rows}: {
  prefix: string
  label: string
  defaultValues?: {en?: string; th?: string; lo?: string} | null
  textarea?: boolean
  rows?: number
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-zinc-300 mb-2">{label}</legend>
      <Field label="English" name={`${prefix}_en`} defaultValue={defaultValues?.en} required textarea={textarea} rows={rows} />
      <Field label="Thai (ภาษาไทย)" name={`${prefix}_th`} defaultValue={defaultValues?.th} textarea={textarea} rows={rows} />
      <Field label="Lao (ພາສາລາວ)" name={`${prefix}_lo`} defaultValue={defaultValues?.lo} textarea={textarea} rows={rows} />
    </fieldset>
  )
}

export function Section({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5 space-y-4">
      <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">{title}</h2>
      {children}
    </div>
  )
}

export function SaveBar({pending, error, success}: {pending: boolean; error?: string; success?: boolean}) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="submit"
        disabled={pending}
        className="px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-medium rounded-lg text-sm transition-colors"
      >
        {pending ? 'Saving…' : 'Save changes'}
      </button>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {success && <p className="text-green-400 text-sm">✓ Saved</p>}
    </div>
  )
}
