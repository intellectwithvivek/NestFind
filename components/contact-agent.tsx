'use client'

import {
  Button,
  Field,
  Input,
  Modal,
  Stack,
  Textarea,
  Text,
  useToast,
} from '@the_viveksingh/vivek-ui'
import { useId, useState } from 'react'

/**
 * "Contact agent" → modal → toast.
 *
 * Nothing is sent anywhere; there is no backend on a static template and
 * pretending otherwise would be worse than saying so. The form still validates
 * and still announces, because that is the part worth demonstrating.
 */
export function ContactAgent({
  agentName,
  subject,
  trigger = 'Contact agent',
  variant = 'solid',
  fullWidth = false,
}: {
  agentName: string
  /** What the enquiry is about — a listing title, or the agent's patch. */
  subject: string
  trigger?: string
  variant?: 'solid' | 'outline' | 'ghost'
  fullWidth?: boolean
}) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(`Hello ${agentName}, I would like to know more about ${subject}.`)
  const [touched, setTouched] = useState(false)
  const formId = useId()

  const nameError = touched && name.trim().length === 0 ? 'Tell them who is asking.' : undefined
  const emailError =
    touched && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? 'A valid email, so they can reply.' : undefined

  function submit(event: React.FormEvent) {
    event.preventDefault()
    setTouched(true)
    if (name.trim().length === 0 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return

    setOpen(false)
    setTouched(false)
    toast({
      title: 'Enquiry sent (demo)',
      description: `${agentName} would reply to ${email} within a working day. Nothing left your browser.`,
      tone: 'success',
      duration: 6000,
    })
  }

  return (
    <>
      <Button variant={variant} fullWidth={fullWidth} onClick={() => setOpen(true)}>
        {trigger}
      </Button>

      <Modal open={open} onOpenChange={setOpen} size="md" title={`Contact ${agentName}`}>
        <form id={formId} onSubmit={submit} noValidate>
          <Modal.Body>
            <Stack gap={4}>
              <Text size="sm" tone="muted">
                About <strong>{subject}</strong>. This is a template — the form validates and then
                shows a toast. No message is sent.
              </Text>

              <Field label="Your name" required error={nameError}>
                <Input
                  value={name}
                  autoComplete="name"
                  onChange={(event) => setName(event.target.value)}
                />
              </Field>

              <Field label="Email" required error={emailError}>
                <Input
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Field>

              <Field label="Message">
                <Textarea
                  rows={4}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </Field>
            </Stack>
          </Modal.Body>

          <Modal.Footer>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Send enquiry</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}
