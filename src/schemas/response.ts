import z from "zod";
import { DogInfoSchema, DogTablePagSchema, DogTableSchema } from "./dog";

export const DogTableResponseSchema = z.object({
	data: z.object({
		pagination: DogTablePagSchema, 
		dogs: z.array(DogTableSchema)
	}).optional(),
	error: z.string().optional()
})

export const DogInfoResponseSchema = z.union([DogInfoSchema, z.object({error: z.string()})])

export type DogTableResponse = z.infer<typeof DogTableResponseSchema>
export type DogInfoResponse = z.infer<typeof DogInfoResponseSchema>
