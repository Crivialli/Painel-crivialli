// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ootilzitdpayupyykcuj.supabase.co";
const supabaseKey = "sb_publishable_3PEBQKv2shv9c6b7F4MVjQ_4Q3d6yRR";

export const supabase = createClient(supabaseUrl, supabaseKey);