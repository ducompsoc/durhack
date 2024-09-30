import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-muted-foreground border-t py-6 md:px-8 md:py-0 bg-[rgba(29,25,52,1)]">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <Link className="underline" href="https://hackp.ac/coc">
          MLH Code of Conduct
        </Link>
      </div>
    </footer>
  )
}
