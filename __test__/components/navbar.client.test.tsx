import { render, screen } from '@testing-library/react'
import { AppNavbar } from '@/components/navbar'


describe('Navbar', () => {
	it('renderiza links principales', () => {
		render(<AppNavbar />)

		expect(screen.getByText(/home/i)).toBeInTheDocument()
	})
})