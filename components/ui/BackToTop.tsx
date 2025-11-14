'use client'

export function BackToTop() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <a
      href="#"
      className="text-lime-green hover:opacity-80 transition-opacity text-sm md:text-base"
      onClick={handleClick}
    >
      BACK TO TOP ↑
    </a>
  )
}
