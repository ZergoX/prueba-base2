import z from "zod";

export const DogTablePagSchema = z.object({
	current: z.number(), 
	last: z.number().optional(), 
	first: z.number().optional()
})

export const DogTableSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string()
})

export const DogInfoSchema = DogTableSchema.extend({
	maleWeight: z.string(),
	femaleWeight: z.string(),
	life: z.string(),
})

export type DogTablePagination = z.infer<typeof DogTablePagSchema>
export type DogTableInfo = z.infer<typeof DogTableSchema>
export type DogInformation = z.infer<typeof DogInfoSchema>