'use client';

interface NotesFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function NotesFilter({ categories, selectedCategory, onCategoryChange }: NotesFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 text-sm font-mono rounded-lg border transition-colors ${
            selectedCategory === category
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border text-foreground hover:bg-muted'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
