import { supabase } from "@/integrations/supabase/client";
import type { Package } from "@/lib/packages";

export async function fetchPackages(): Promise<Package[]> {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("is_active", true)
    .order("price_usd", { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as Package[];
}

export async function fetchPackageBySlug(slug: string): Promise<Package | null> {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as unknown as Package | null;
}
