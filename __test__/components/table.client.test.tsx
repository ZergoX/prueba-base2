import { render, screen } from '@testing-library/react'
import { CustomizableTable } from '@/components/table'

jest.mock('swr')

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