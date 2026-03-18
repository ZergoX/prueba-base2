import { DogInformation, DogTableInfo } from "@/schemas/dog";
import { getAllDogs, getDog } from "@/services/dog";


export type DogPagination = {current: number, last?: number, first?: number}

export class Dogs {

	static async getInfoDogs (pageSize?: string, pageNumber?: string) {
		try {
			const {data, error} = await getAllDogs(pageNumber, pageSize)
			
			if (error) throw new Error(error)
			
			const response:{ 
				pagination: DogPagination, 
				dogs: DogTableInfo[] 
			} = { pagination: {
				current: data?.meta.pagination.current ?? 1,
				first: data?.meta.pagination.first,
				last: data?.meta.pagination.last,

			}, dogs:[  ]}

			data?.data.forEach((e) => (
				response.dogs.push({
					id: e.id,
					name: e.attributes.name,
					description: e.attributes.description
				})
			))


			return { data: response} 

		} catch (error) {
			return { error: error}
		}

	}
	
	static async getDogById (id: string) {
		try {
			const {data, error} = await getDog(id)

			if (error) throw new Error(error)

			const response: DogInformation = {
				id: data!.data.id, 
				name: data!.data.attributes.name,
				maleWeight: `${data?.data.attributes.male_weight.min}-${data?.data.attributes.male_weight.max}`,
				femaleWeight: `${data?.data.attributes.female_weight.min}-${data?.data.attributes.female_weight.max}`,
				life: `${data?.data.attributes.life.min}-${data?.data.attributes.life.max}`,
				description: data!.data.attributes.description
			}

			return { data: response }
		} catch (error) {
			let msg = ''

			if (!error)
				msg = 'No se ha podido realizar la consulta intente mas tarde'
			else
				msg = (error as Error).message

			return { error: msg }
		}
	}

}