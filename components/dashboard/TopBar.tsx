'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, Menu } from 'lucide-react';
import {
  Button,
  Input,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';

interface TopBarProps {
  sidebarCollapsed: boolean;
  onToggleMobileMenu: () => void;
}

export default function TopBar({ onToggleMobileMenu }: TopBarProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="h-20 bg-gray-900 border-b border-primary/20 flex items-center px-8 gap-6">
      <Button
        variant="outline"
        onClick={onToggleMobileMenu}
        className="lg:hidden bg-transparent text-foreground hover:bg-muted hover:text-foreground p-2"
        aria-label="Toggle mobile menu"
      >
        <Menu className="w-6 h-6" />
      </Button>

      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className={`pl-10 bg-tertiary text-foreground border-border focus:border-primary transition-all duration-200 ${
              searchFocused ? 'ring-2 ring-primary' : ''
            }`}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            aria-label="Search"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="relative bg-transparent text-foreground hover:bg-muted hover:text-foreground p-2"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative h-10 w-10 rounded-full bg-transparent hover:bg-muted">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe" alt="User avatar" />
                <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-popover text-popover-foreground border-border">
            <DropdownMenuLabel className="text-foreground">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem asChild className="text-foreground hover:bg-muted focus:bg-muted cursor-pointer">
              <Link href="/dashboard/profile/view">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-foreground hover:bg-muted focus:bg-muted cursor-pointer">
              <Link href="/dashboard/settings">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="text-foreground hover:bg-muted focus:bg-muted cursor-pointer">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
