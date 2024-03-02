import {createClient, SupabaseClient} from "@supabase/supabase-js";

class SupabaseService {
    static createClient = (): SupabaseClient => {
        const supabaseUrl: string = process.env.SUPABASE_URL || ''
        const supabaseSecretKey: string = process.env.SUPABASE_SECRET_KEY || ''
        return createClient(supabaseUrl, supabaseSecretKey)
    }
}

const supabase: SupabaseClient = SupabaseService.createClient()
export default supabase