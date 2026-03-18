export {}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			//#region Supabase
			/**
			 *@ServerSide
			 */
			SUPABASE_URL: string
			SUPABASE_KEY: string
			SUPABASE_SECRET_KEY: string
			//#endregion
			//#region APIS Services
			DOG_API: string
			//#endregion
		}
	}
}