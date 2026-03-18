import { DogInformation, DogTableInfo, DogTablePagination } from "@/schemas/dog";
import { getAllDogs, getDog } from "@/services/dog";

export class Dogs {

	static async getInfoDogs (pageSize: string, pageNumber: string) {
		try {
			const {data: info, error} = await getAllDogs(pageNumber, pageSize)
			
			if (error) throw new Error(error)
			
			const response: { 
				pagination: DogTablePagination, 
				dogs: DogTableInfo[] 
			} = { 
				pagination: {
					current: info?.meta.pagination.current ?? 1,
					first: info?.meta.pagination.first ?? 0,
					last: info?.meta.pagination.last,
				}, 
				dogs:[]
			}

			info?.data.forEach((e) => (
				response.dogs.push({
					id: e.id,
					name: e.attributes.name,
					description: e.attributes.description
				})
			))


			return { data: response } 

		} catch (error) {
			return { error: (error as Error).message }
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