'use client'

import {useFormStatus} from 'react-dom'

export function SubmitButton({label = 'Save changes'}: {label?: string}) {
  const {pending} = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-medium rounded-lg text-sm transition-colors"
    >
      {pending ? 'Saving…' : label}
    </button>
  )
}
