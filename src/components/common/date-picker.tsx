'use client';

import * as React from 'react';

import { CalendarIcon, CheckIcon, ChevronDownIcon, Clock3Icon } from 'lucide-react';

import { BSCalendar } from '@/components/common/bs-calendar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BS_MONTHS, adToBS } from '@/lib/date/bs';
import { cn } from '@/lib/utils';

type CalendarSystem = 'ad' | 'bs';

type DatePickerProps = {
  readonly value?: Date;
  readonly onChange: (date: Date | undefined) => void;
  readonly includeTime?: boolean;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly className?: string;
};

function formatADDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

function formatBSDate(date: Date): string {
  const bsDate = adToBS(date);

  return `${BS_MONTHS[bsDate.month]} ${bsDate.day}, ${bsDate.year}`;
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function padTime(value: number): string {
  return String(value).padStart(2, '0');
}

function createDateWithTime(date: Date, hours: number, minutes: number): Date {
  const nextDate = new Date(date);

  nextDate.setHours(hours, minutes, 0, 0);

  return nextDate;
}

export function DatePicker({
  value,
  onChange,
  includeTime = false,
  placeholder = 'Select date',
  disabled = false,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const [calendarSystem, setCalendarSystem] = React.useState<CalendarSystem>('ad');

  const handleDateChange = (date: Date | undefined) => {
    if (!date) {
      onChange(undefined);
      return;
    }

    if (!includeTime || !value) {
      onChange(new Date(date));
      return;
    }

    onChange(createDateWithTime(date, value.getHours(), value.getMinutes()));
  };

  const handleTimeChange = (hours: number, minutes: number) => {
    if (!value) {
      return;
    }

    onChange(createDateWithTime(value, hours, minutes));
  };

  const handleToday = () => {
    const today = new Date();

    if (includeTime) {
      onChange(today);
    } else {
      today.setHours(0, 0, 0, 0);
      onChange(today);
    }
  };

  const handleClear = () => {
    onChange(undefined);
    setOpen(false);
  };

  const handleDone = () => {
    setOpen(false);
  };

  const displayValue = value
    ? calendarSystem === 'ad'
      ? formatADDate(value)
      : formatBSDate(value)
    : placeholder;

  const selectedHours = value?.getHours() ?? 0;
  const selectedMinutes = value?.getMinutes() ?? 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          <CalendarIcon className="mr-2 size-4 shrink-0" />

          <span className="min-w-0 truncate">
            {displayValue}

            {includeTime && value && (
              <span className="ml-2 text-muted-foreground">{formatTime(value)}</span>
            )}
          </span>

          <ChevronDownIcon className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-auto min-w-[300px] p-0">
        <div className="p-3">
          {/* Calendar system switch */}
          <div
            role="group"
            aria-label="Calendar system"
            className="mb-3 grid grid-cols-2 rounded-lg bg-muted p-1"
          >
            <button
              type="button"
              aria-pressed={calendarSystem === 'ad'}
              onClick={() => setCalendarSystem('ad')}
              className={cn(
                'flex h-9 items-center justify-center rounded-md text-sm font-medium transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                calendarSystem === 'ad'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {calendarSystem === 'ad' && <CheckIcon className="mr-1.5 size-3.5" />}
              AD
            </button>

            <button
              type="button"
              aria-pressed={calendarSystem === 'bs'}
              onClick={() => setCalendarSystem('bs')}
              className={cn(
                'flex h-9 items-center justify-center rounded-md text-sm font-medium transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                calendarSystem === 'bs'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {calendarSystem === 'bs' && <CheckIcon className="mr-1.5 size-3.5" />}
              BS
            </button>
          </div>

          {/* Calendar */}
          {calendarSystem === 'ad' ? (
            <Calendar mode="single" selected={value} onSelect={handleDateChange} />
          ) : (
            <BSCalendar value={value} onChange={handleDateChange} />
          )}

          {/* Time */}
          {includeTime && (
            <div className="mt-3 border-t border-border pt-3">
              <div className="mb-2 flex items-center gap-2">
                <Clock3Icon className="size-4 text-muted-foreground" />

                <span className="text-sm font-medium">Time</span>

                {value && (
                  <span className="ml-auto text-xs text-muted-foreground">{formatTime(value)}</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={padTime(selectedHours)}
                  disabled={!value}
                  onChange={(event) =>
                    handleTimeChange(Number(event.target.value), selectedMinutes)
                  }
                  aria-label="Hour"
                  className={cn(
                    'h-9 rounded-md border border-input bg-background px-2 text-sm',
                    'outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                  )}
                >
                  {Array.from({ length: 24 }, (_, hour) => (
                    <option key={hour} value={padTime(hour)}>
                      {padTime(hour)}
                    </option>
                  ))}
                </select>

                <span className="text-sm font-medium text-muted-foreground">:</span>

                <select
                  value={padTime(selectedMinutes)}
                  disabled={!value}
                  onChange={(event) => handleTimeChange(selectedHours, Number(event.target.value))}
                  aria-label="Minute"
                  className={cn(
                    'h-9 rounded-md border border-input bg-background px-2 text-sm',
                    'outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                  )}
                >
                  {Array.from({ length: 60 }, (_, minute) => (
                    <option key={minute} value={padTime(minute)}>
                      {padTime(minute)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <Button type="button" variant="ghost" size="sm" onClick={handleClear} disabled={!value}>
              Clear
            </Button>

            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={handleToday}>
                Today
              </Button>

              <Button type="button" size="sm" onClick={handleDone}>
                Done
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
