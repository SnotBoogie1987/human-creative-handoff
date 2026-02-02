'use client'

import Image from 'next/image'
import Link from 'next/link'

export interface WorkItem {
  id: string
  title: string
  slug: string
  image: string
  category?: string
}

interface WorkGridProps {
  items: WorkItem[]
}

export function WorkGrid({ items }: WorkGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {items.map((item) => (
        <div key={item.id} className="relative group flex justify-center">
          <Link
            href={`/work/${item.slug}`}
            className="relative block w-[295px] h-[368px] overflow-hidden"
          >
            {/* Project Image */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay with Title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
              <h3 className="font-display text-2xl text-primary uppercase leading-tight">
                {item.title}
              </h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
