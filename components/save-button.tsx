'use client'

import { IconButton, useToast } from '@the_viveksingh/vivek-ui'
import { useState } from 'react'

/**
 * The heart on a listing card.
 *
 * Local state only — there is no account system on a static template, and
 * pretending otherwise by writing to `localStorage` would be a lie that
 * survives a refresh. The toast says "demo" for the same reason.
 */
export function SaveButton({ title }: { title: string }) {
  const { toast } = useToast()
  const [saved, setSaved] = useState(false)

  return (
    <IconButton
      className="nf-card-save"
      variant="solid"
      size="sm"
      round
      aria-label={saved ? `Remove ${title} from saved` : `Save ${title}`}
      aria-pressed={saved}
      onClick={() => {
        const next = !saved
        setSaved(next)
        toast({
          title: next ? 'Saved (demo)' : 'Removed (demo)',
          description: next
            ? `${title} would be added to your shortlist.`
            : `${title} would come off your shortlist.`,
          tone: next ? 'success' : 'info',
        })
      }}
    >
      <span aria-hidden="true">{saved ? '♥' : '♡'}</span>
    </IconButton>
  )
}
