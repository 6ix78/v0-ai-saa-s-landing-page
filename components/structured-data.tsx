interface StructuredDataProps {
  jsonLd: Record<string, any>
}

export function StructuredData({ jsonLd }: StructuredDataProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}
