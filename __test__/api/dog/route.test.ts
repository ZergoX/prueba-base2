import { GET } from '@/app/api/dog/route'
import { NextRequest } from 'next/server'

describe('GET /api/dog', () => {
  it('retorna el id desde query params', async () => {
    const request = new NextRequest(
      'http://localhost/api/dog?pageSize=10&pageNumber=1'
    )

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toMatchObject({
      data: {
        pagination: {
          current: expect.any(Number)
        },
        dogs: expect.any(Array),
      }
    })
  })
})