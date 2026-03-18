import axios, { AxiosRequestConfig } from "axios"

type NumericLimit = {
	max: number,
	min: number
}

export type DogResponse = {
	id: string,
	type: string,
	attributes: {
		name: string,
		description: string,
		life: NumericLimit,
		male_weight: NumericLimit,
		female_weight: NumericLimit,
		hypoallergenic: boolean
	}  ,
	relationships: {
		group: {
			data: {
				id: string,
				type: string
			}
		}
	}
}

const axiosRequest = async <T> (config: AxiosRequestConfig) => {
	return new Promise<{error?: string, data?: T }>((resolve) => {
		axios(config).then((response) => {
			resolve({data: response.data} )
		}).catch((reason) => {
			if (reason instanceof Error) resolve({ error: reason.message })
			else if (typeof reason === 'string')
				resolve({ error: new Error(reason).message })
			else
				resolve({
					error: new Error(
						`Could not retrieve cases. Error: ${reason}`,
					).message,
				})
		})
	} )
}

export const getAllDogs = async (pageNumber?: string,  pageQuery?: string) => {
	const axiosConfig: AxiosRequestConfig= {
		method: 'GET',
		baseURL: `${process.env.DOG_API}/breeds`,
		params: {
			...(pageNumber !== undefined && { "page[number]": pageNumber }),
    	...(pageQuery !== undefined && { "page[size]": pageQuery }),
		}
	}

	return await axiosRequest<
		{data: DogResponse[], meta: { pagination: {  
		current: number,
		next?: number,
		first?: number,
		last?: number,
		records?: number } },
		links?: {
			self?: string,
			current?: string,
			next?: string,
			last?: string
		}}>(axiosConfig)
}

export const getDog = async (id: string) => {
	const axiosConfig: AxiosRequestConfig= {
		method: 'GET',
		baseURL: `${process.env.DOG_API}/breeds/${id}`,
	}

		return await axiosRequest<
		{data: DogResponse,
		links: {
			self?: string
		}}>(axiosConfig)

}
  