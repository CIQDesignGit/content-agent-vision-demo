"use client"

import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export type ProfileId = "exec" | "sales-analyst" | "content-analyst"

export const DEFAULT_PROFILE_ID: ProfileId = "exec"

const PROFILE_STORAGE_KEY = "ally.viewing-as-profile"

export const PROFILES: Record<
  ProfileId,
  {
    label: string
    description: string
    initials: string
    avatarClass: string
  }
> = {
  exec: {
    label: "Exec",
    description: "Deepak Kulkarni",
    initials: "DK",
    avatarClass: "bg-orange-600",
  },
  "sales-analyst": {
    label: "Sales Analyst",
    description: "Ravi Shankar",
    initials: "RS",
    avatarClass: "bg-sky-700",
  },
  "content-analyst": {
    label: "Content Analyst",
    description: "Opens Content Agent",
    initials: "CA",
    avatarClass: "bg-teal-600",
  },
}

export const PROFILE_ORDER: ProfileId[] = [
  "exec",
  "sales-analyst",
  "content-analyst",
]

export function isProfileId(value: string | null | undefined): value is ProfileId {
  return (
    value === "exec" ||
    value === "sales-analyst" ||
    value === "content-analyst"
  )
}

function readStoredProfile(): ProfileId | null {
  if (typeof window === "undefined") return null
  try {
    const value = window.sessionStorage.getItem(PROFILE_STORAGE_KEY)
    return isProfileId(value) ? value : null
  } catch {
    return null
  }
}

function writeStoredProfile(id: ProfileId) {
  if (typeof window === "undefined") return
  try {
    if (id === DEFAULT_PROFILE_ID) {
      window.sessionStorage.removeItem(PROFILE_STORAGE_KEY)
    } else {
      window.sessionStorage.setItem(PROFILE_STORAGE_KEY, id)
    }
  } catch {
    // Ignore quota / private-mode failures.
  }
}

/** Keep the active profile on in-app navigations that rebuild the query string. */
export function withProfileParam(href: string, profileId: ProfileId): string {
  if (profileId === DEFAULT_PROFILE_ID) return href
  const [pathAndQuery, hash = ""] = href.split("#")
  const [path, query = ""] = pathAndQuery.split("?")
  const params = new URLSearchParams(query)
  params.set("profile", profileId)
  const nextQuery = params.toString()
  return `${path}?${nextQuery}${hash ? `#${hash}` : ""}`
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

  // Persist selection, and restore it when a link drops `?profile=`.
  useEffect(() => {
    if (isProfileId(profileParam)) {
      writeStoredProfile(profileParam)
      return
    }
    const stored = readStoredProfile()
    if (!stored || stored === DEFAULT_PROFILE_ID) return
    const params = new URLSearchParams(searchParams.toString())
    params.set("profile", stored)
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }, [pathname, profileParam, router, searchParams])

  const setProfileId = useCallback(
    (id: ProfileId) => {
      writeStoredProfile(id)
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
