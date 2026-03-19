import { render, screen } from '@testing-library/react'
import DogDetails from '@/app/dog/[id]/page'

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: '1' })
}))

jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn()
}))


describe('DogDetails Page', () => {
  it('renderiza datos del perro', () => {
    require('swr').default.mockReturnValue({
      data: {
        data: {
					id: '1232122321321',
          name: 'Firulais',
          description: 'Perro feliz',
          maleWeight: '20kg',
          femaleWeight: '18kg',
          life: '10 años'
        }
      }
    })

    render(<DogDetails />)

    expect(screen.getByText('Firulais')).toBeInTheDocument()
  })
})