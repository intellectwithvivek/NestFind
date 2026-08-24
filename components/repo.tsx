import { Code, CopyButton, Text } from '@the_viveksingh/vivek-ui'
import { REPO } from '@/lib/site'

/**
 * The GitHub mark, inlined.
 *
 * VivekUI ships no icon set yet, and pulling in an icon package for one glyph
 * would put a runtime dependency into a template whose whole argument is that it
 * has none. Decorative by default — the link around it carries the name.
 */
export function GitHubMark({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
    </svg>
  )
}

/**
 * "Clone or fork this template" as a header-sized control.
 *
 * The label collapses below the navbar's own breakpoint so the bar does not
 * overflow on a phone; the accessible name stays complete either way, which is
 * the part that would otherwise silently regress.
 */
export function RepoLink() {
  return (
    <a
      className="nf-repo-link"
      href={REPO.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${REPO.name} on GitHub — clone or fork this template`}
    >
      <GitHubMark size={17} />
      <span className="nf-repo-link-label">Clone</span>
    </a>
  )
}

/**
 * A copyable shell command with a caption.
 *
 * `CopyButton` degrades to `execCommand` outside a secure context and surfaces a
 * real failure state, so this keeps working on a plain-HTTP preview deploy.
 */
export function CommandBlock({
  label,
  command,
  copyLabel,
}: {
  label: string
  command: string
  copyLabel: string
}) {
  return (
    <div>
      <Text as="p" size="sm" weight="medium" style={{ marginBlockEnd: 'var(--vk-space-2)' }}>
        {label}
      </Text>
      <div className="nf-install">
        <Code>{command}</Code>
        <CopyButton
          value={command}
          size="sm"
          variant="ghost"
          label="Copy"
          copiedLabel="Copied"
          copiedAnnouncement={copyLabel}
        />
      </div>
    </div>
  )
}
