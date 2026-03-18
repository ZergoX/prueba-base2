import z from "zod";

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

export type DogTableInfo = z.infer<typeof DogTableSchema>
export type DogInformation = z.infer<typeof DogInfoSchema>