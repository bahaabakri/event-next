import { API_BASE_URL } from "@/api.config"
import { MyHero } from "@/types/hero.type"

export async function getActiveHero(): Promise<MyHero> {
  const res = await fetch(`${API_BASE_URL}/heros/activeHero`, {cache: 'force-cache'})

  if (!res.ok) throw new Error("Failed to load event")

  return res.json() as Promise<MyHero>
}