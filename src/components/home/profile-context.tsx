"use client"

import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export type ProfileId = "exec" | "content-analyst"

export const DEFAULT_PROFILE_ID: ProfileId = "exec"

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

export function isProfileId(value: string | null | undefined): value is ProfileId {
  return value === "exec" || value === "content-analyst"
}

interface ProfileContextValue {
  profileId: ProfileId
  setProfileId: (id: ProfileId) => void
  profile: (typeof PROFILES)[ProfileId]
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

function ProfileProviderInner({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const profileParam = searchParams.get("profile")
  const profileId: ProfileId = isProfileId(profileParam)
    ? profileParam
    : DEFAULT_PROFILE_ID

  const setProfileId = useCallback(
    (id: ProfileId) => {
      const params = new URLSearchParams(searchParams.toString())
      if (id === DEFAULT_PROFILE_ID) params.delete("profile")
      else params.set("profile", id)
      const query = params.toString()
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
    },
    [pathname, router, searchParams],
  )

  const value = useMemo(
    () => ({
      profileId,
      setProfileId,
      profile: PROFILES[profileId],
    }),
    [profileId, setProfileId],
  )

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}

function ProfileProviderFallback({ children }: { children: ReactNode }) {
  const value = useMemo(
    () => ({
      profileId: DEFAULT_PROFILE_ID,
      setProfileId: (_id: ProfileId) => {},
      profile: PROFILES[DEFAULT_PROFILE_ID],
    }),
    [],
  )
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<ProfileProviderFallback>{children}</ProfileProviderFallback>}>
      <ProfileProviderInner>{children}</ProfileProviderInner>
    </Suspense>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) {
    throw new Error("useProfile must be used within ProfileProvider")
  }
  return ctx
}
