export default function Slug({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen">
      <h1>
        [slug]&nbsp;-&nbsp;
        {params.slug}
        .tsx
      </h1>
    </main>
  )
}
