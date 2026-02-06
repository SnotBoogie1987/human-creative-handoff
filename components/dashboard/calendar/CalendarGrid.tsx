'use client';

import { Card } from '@/components/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarGridProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  eventDays: number[];
}

export function CalendarGrid({ currentDate, setCurrentDate, eventDays }: CalendarGridProps) {
  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  return (
    <Card className="lg:col-span-2 bg-card border border-border rounded-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-headline text-foreground">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            title="Previous month"
            onClick={handlePrevMonth}
            className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <button
            type="button"
            title="Next month"
            onClick={handleNextMonth}
            className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
        {Array.from({ length: 35 }, (_, i) => {
          const dayNumber = i - 2; // Adjust based on month start
          const isToday = dayNumber === 15;
          const hasEvent = eventDays.includes(dayNumber);

          return (
            <div
              key={i}
              className={`aspect-square flex items-center justify-center rounded-lg text-sm cursor-pointer transition-colors ${
                dayNumber < 1 || dayNumber > 28
                  ? 'text-muted-foreground/30'
                  : isToday
                  ? 'bg-primary text-primary-foreground font-bold'
                  : hasEvent
                  ? 'bg-primary/10 text-foreground font-medium hover:bg-primary/20'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              {dayNumber > 0 && dayNumber <= 28 ? dayNumber : ''}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
