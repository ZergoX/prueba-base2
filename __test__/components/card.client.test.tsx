import { render, screen } from '@testing-library/react'
import { Card } from '@/components/card'

jest.mock('swr')

describe('Card', () => {
	it('Show props correctly', () => {
  
    render(<Card
			title='Danis'
			description='is a good dog'
			femaleWight='29-33'
			maleWight='35-40'
			life='13-15'
			/>)

    expect(screen.getByText('is a good dog')).toBeInTheDocument()
		expect(screen.getByText('Danis')).toBeInTheDocument()
		expect(screen.getByText('29-33')).toBeInTheDocument()
		expect(screen.getByText('35-40')).toBeInTheDocument()
		expect(screen.getByText('13-15')).toBeInTheDocument()
  })
} )