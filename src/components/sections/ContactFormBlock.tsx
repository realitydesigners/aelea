import Container from '../ui/Container'
import { ContactFormBlock as ContactFormBlockType } from '@/lib/types'

export default function ContactFormBlock({ block }: { block: ContactFormBlockType }) {
  const action = block.formspreeEndpoint || 'https://formspree.io/f/your-id'
  const buttonLabel = block.buttonLabel || 'Send'
  const showMailingList = block.includeMailingListCheckbox !== false

  return (
    <section className="py-12">
      <Container className="max-w-5xl">
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-md border border-gray-100 p-8 md:p-10">
          {(block.title || block.description) && (
            <div className="mb-6">
              {block.title && (
                <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'var(--font-brandon), sans-serif' }}>
                  {block.title}
                </h2>
              )}
              {block.description && (
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {block.description}
                </p>
              )}
            </div>
          )}

          <form
            action={action}
            method="POST"
            className="space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Name *" name="firstName" type="text" required />
              <FormField label="Last Name *" name="lastName" type="text" required />
              <FormField label="Phone *" name="phone" type="tel" required />
              <FormField label="Birthday" name="birthday" type="date" />
              <FormField label="Subject *" name="subject" type="text" required className="md:col-span-2" />
              <FormField label="Your Timezone" name="timezone" type="text" />
              <FormField label="What service would you like to inquire about? *" name="service" type="text" required className="md:col-span-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                className="w-full rounded-lg border border-gray-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 text-gray-900 px-3 py-2 shadow-sm"
              />
            </div>

            {showMailingList && (
              <label className="inline-flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  name="mailinglist"
                  className="h-4 w-4 rounded border-gray-300 text-teal-500 focus:ring-teal-400"
                  defaultChecked
                />
                <span>I want to stay tuned via the mailing list</span>
              </label>
            )}

            <input type="hidden" name="_subject" value="New contact form submission" />
            <input type="hidden" name="_replyto" value="" />

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 bg-teal-500 text-white text-lg font-semibold rounded-lg shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition-colors"
                style={{ fontFamily: 'var(--font-brandon), sans-serif' }}
              >
                {buttonLabel}
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Submissions are sent to Formspree. Replace the endpoint later with your email service.
            </p>
          </form>
        </div>
      </Container>
    </section>
  )
}

function FormField({
  label,
  name,
  type,
  required,
  className = '',
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type || 'text'}
        name={name}
        required={required}
        className="w-full rounded-lg border border-gray-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 text-gray-900 px-3 py-2 shadow-sm"
      />
    </div>
  )
}


