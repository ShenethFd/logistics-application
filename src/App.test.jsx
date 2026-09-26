import { expect, test } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import App from './App'

test('demo shipment user can sign in and see shipment dashboard', async () => {
  sessionStorage.clear()
  render(<MemoryRouter initialEntries={['/login']}><AuthProvider><DataProvider><App/></DataProvider></AuthProvider></MemoryRouter>)
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
  expect(await screen.findByText(/Good morning, Ethan/i)).toBeInTheDocument()
  expect(screen.getByText('Active Shipments')).toBeInTheDocument()
})
