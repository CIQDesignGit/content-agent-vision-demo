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
import { PROFILES, useProfile, type ProfileId } from "./profile-context"

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
        aria-label={`Profile: ${profile.label}`}
        title={profile.label}
        className={cn(
          "ml-1 grid size-7 place-items-center rounded-full text-xs font-semibold text-white",
          "outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-slate-400/50",
          profile.avatarClass,
        )}
      >
        {profile.initials}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="min-w-48 p-1.5">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 pt-1 pb-1.5 text-xs font-medium tracking-wider text-slate-400 uppercase">
            Switch profile
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup value={profileId} onValueChange={selectProfile}>
            {(Object.keys(PROFILES) as ProfileId[]).map((id) => {
              const option = PROFILES[id]
              return (
                <DropdownMenuRadioItem key={id} value={id} className="gap-2.5 py-1.5">
                  <span
                    className={cn(
                      "grid size-6 shrink-0 place-items-center rounded-full text-[10px] font-semibold text-white",
                      option.avatarClass,
                    )}
                  >
                    {option.initials}
                  </span>
                  <span className="font-medium text-slate-800">{option.label}</span>
                </DropdownMenuRadioItem>
              )
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
