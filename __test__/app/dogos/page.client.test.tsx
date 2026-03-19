

import { render, screen } from '@testing-library/react'
import { CustomizableTable } from '@/components/table'
import { AppNavbar } from '@/components/navbar'

jest.mock('swr')


describe('Navbar', () => {
  it('renderiza links principales', () => {
    render(<AppNavbar />)

    expect(screen.getByText(/home/i)).toBeInTheDocument()
  })
})


describe('CustomizableTable', () => {
  it('muestra mensaje si no hay datos', () => {
    require('swr').default.mockReturnValue({
      data: {
        dogs: [
          { id: 1, name: 'Firulais', description: 'Perro feliz' }
        ],
        pagination: { current: 1, last: 3 }
      }
    })

    render(<CustomizableTable />)

    expect(screen.getByText(/no hay datos/i)).toBeInTheDocument()
  })
})

