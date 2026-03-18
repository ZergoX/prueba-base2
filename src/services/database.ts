import { createClient } from '@supabase/supabase-js'

const dbConnection = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY
)

export class DataBase {


}