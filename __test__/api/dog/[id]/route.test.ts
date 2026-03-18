// --- MOCK ESTRUCTURAL ---
var mockGetDogById = jest.fn();

jest.mock('@/models/dog', () => ({
  Dogs: {
    getDogById: (...args: any[]) => mockGetDogById(...args),
  },
}));

import { DogInfoResponseSchema } from '@/schemas/response';
import { NextRequest } from 'next/server';

describe('GET /api/dog/[id]', () => {
  const { GET } = require('@/app/api/dog/[id]/route');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testCases = [
    {
      desc: 'return 200 if found a dog',
      param: '3f17b92b-bd0c-499a-bc84-da8f2a206bab',
      // IMPORTANTE: Esta es la estructura que tu ruta "destructura"
      mockResponse: {
        data: {
          id: '3f17b92b-bd0c-499a-bc84-da8f2a206bab',
          name: 'Poodle',
          description: 'Small dog',
          maleWeight: '6kg',
          femaleWeight: '5kg',
          life: '12 years',
        },
        error: undefined
      },
      status: 200,
    },
    {
      desc: 'return 404 if not found a dog',
      param: 'not-found',
      mockResponse: {
        data: undefined,
        error: 'Dog not found'
      },
      status: 404,
    }
  ];

  testCases.forEach((tc) => {
    it(`${tc.desc}`, async () => {
      // Seteamos el mock para que devuelva el objeto { data, error }
      mockGetDogById.mockResolvedValue(tc.mockResponse);

      const request = new NextRequest(`http://localhost/api/dog/${tc.param}`);
      
      // Ejecutamos con params como Promesa (Next 15)
      const response = await GET(request, { 
        params: Promise.resolve({ id: tc.param }) 
      });

      const body = await response.json();

      expect(response.status).toBe(tc.status);

      if (tc.status === 200) {
        // Tu ruta hace: return NextResponse.json(data)
        // Por lo tanto 'body' debería ser el contenido de 'mockResponse.data'
        expect(() => DogInfoResponseSchema.parse(body)).not.toThrow();
      } else {
        // En el 404, tu ruta hace: return NextResponse.json({ error: error })
        expect(body.error).toBeDefined();
      }
    });
  });
});