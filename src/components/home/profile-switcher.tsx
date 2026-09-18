"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  PROFILE_ORDER,
  PROFILES,
  useProfile,
  type ProfileId,
} from "./profile-context"

export function ProfileSwitcher() {
  const { profileId, setProfileId, profile } = useProfile()
  const [open, setOpen] = useState(false)

  function selectProfile(value: string) {
    setProfileId(value as ProfileId)
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        aria-label={`Viewing as ${profile.label}`}
        title={profile.label}
        className={cn(
          "ml-1 grid size-7 place-items-center rounded-full text-xs font-semibold text-white",
          "outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-slate-400/50",
          profile.avatarClass,
        )}
      >
        {profile.initials}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="min-w-56 rounded-2xl p-2 shadow-lg ring-1 ring-slate-200/80"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2.5 pt-1 pb-2 text-xs font-medium text-slate-400">
            Viewing as
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={profileId}
            onValueChange={selectProfile}
          >
            {PROFILE_ORDER.map((id) => {
              const option = PROFILES[id]
              return (
                <DropdownMenuRadioItem
                  key={id}
                  value={id}
                  className={cn(
                    "flex cursor-pointer flex-col items-start gap-0.5 rounded-xl px-2.5 py-2.5 pr-2.5",
                    "text-sm outline-hidden select-none",
                    "focus:bg-brand-50 focus:text-slate-900",
                    "data-checked:bg-brand-100 data-checked:text-slate-900",
                    "**:data-[slot=dropdown-menu-radio-item-indicator]:hidden",
                  )}
                >
                  <span className="font-semibold text-slate-900">
                    {option.label}
                  </span>
                  <span className="text-xs font-normal text-slate-500">
                    {option.description}
                  </span>
                </DropdownMenuRadioItem>
              )
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
