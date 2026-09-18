"use client"

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type ProfileId = "exec" | "content-analyst"

export const PROFILES: Record<
  ProfileId,
  { label: string; initials: string; avatarClass: string }
> = {
  exec: {
    label: "Exec",
    initials: "MR",
    avatarClass: "bg-sky-700",
  },
  "content-analyst": {
    label: "Content Analyst",
    initials: "CA",
    avatarClass: "bg-teal-600",
  },
}

interface ProfileContextValue {
  profileId: ProfileId
  setProfileId: (id: ProfileId) => void
  profile: (typeof PROFILES)[ProfileId]
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profileId, setProfileId] = useState<ProfileId>("exec")
  const value = useMemo(
    () => ({
      profileId,
      setProfileId,
      profile: PROFILES[profileId],
    }),
    [profileId],
  )
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) {
    throw new Error("useProfile must be used within ProfileProvider")
  }
  return ctx
}
