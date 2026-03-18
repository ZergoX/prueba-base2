import { GET } from '@/app/api/dog/[id]/route'
import { DogInfoSchema } from '@/schemas/dog'
import { DogInfoResponseSchema } from '@/schemas/response'
import { NextRequest } from 'next/server'


describe('GET /api/dog/[id]', () => {

	const testCases = [
		{
			desc: 'return 200 if found a dog',
			param: '3f17b92b-bd0c-499a-bc84-da8f2a206bab',
			url: 'http://localhost/api/dog/3f17b92b-bd0c-499a-bc84-da8f2a206bab',
			status: 200,
			},
		{
			desc: 'return 404 if not found a dog',
			param: '3f17b92b-bd0c-499a-bc84-da8f2a206b',
			url: 'http://localhost/api/dog/3f17b92b-bd0c-499a-bc84-da8f2a206b',
			status: 404,
		}
	]

	testCases.forEach((e) => {
		it(`${e.desc} ${e.url}`, async () => {
			const request = new NextRequest(e.url)
			
			const response = await GET(request, { params: { id: e.param}} )
			const data = await response.json()

			expect(response.status).toBe(e.status)
			expect(() => DogInfoResponseSchema.parse(data)).not.toThrow()
		})
	})
})