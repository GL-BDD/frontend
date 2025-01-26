import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import React from 'react'

import Employee from '../Employee'
import { useAuth } from '../../../context/AuthContext'

// Mock du hook useAuth
jest.mock('../../../context/AuthContext', () => ({
  useAuth: jest.fn(() => ({ user: { role: 'client' } })),
}))

const mockEmployeeData = {
  username: 'John Doe',
  specialization: 'Electrician',
  phonenumber: '123456789',
  email: 'johndoe@example.com',
}

const mockFetch = jest.fn()

global.fetch = mockFetch

describe('Employee Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAuth as jest.Mock).mockReturnValue({ user: { role: 'client' } })
  })

  test('renders loading state initially', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ artisan: mockEmployeeData }),
    })

    render(
      <MemoryRouter initialEntries={['/employee/1']}>
        <Routes>
          <Route path="/employee/:idUtilisateur" element={<Employee />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByText('Data is Loading ...')).toBeInTheDocument()
    await screen.findByText('John Doe')
  })

  test('renders employee data after fetching', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ artisan: mockEmployeeData }),
    })

    render(
      <MemoryRouter initialEntries={['/employee/1']}>
        <Routes>
          <Route path="/employee/:idUtilisateur" element={<Employee />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(await screen.findByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Electrician :Electrician')).toBeInTheDocument()
    expect(screen.getByText('123456789')).toBeInTheDocument()
    expect(screen.getByText('johndoe@example.com')).toBeInTheDocument()
  })

  test('toggles the realization section', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ artisan: mockEmployeeData }),
    })

    render(
      <MemoryRouter initialEntries={['/employee/1']}>
        <Routes>
          <Route path="/employee/:idUtilisateur" element={<Employee />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(await screen.findByText('Réalisation')).toBeInTheDocument()

    const toggleButton = screen.getByText('+')
    fireEvent.click(toggleButton)

    expect(screen.getByText('-')).toBeInTheDocument()
  })

  test('navigates to project proposal page on button click', async () => {
    const mockNavigate = jest.fn()
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }))

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ artisan: mockEmployeeData }),
    })

    render(
      <MemoryRouter initialEntries={['/employee/1']}>
        <Routes>
          <Route path="/employee/:idUtilisateur" element={<Employee />} />
        </Routes>
      </MemoryRouter>,
    )

    const button = await screen.findByText('Demander un Devis')
    fireEvent.click(button)

    expect(mockNavigate).toHaveBeenCalledWith('/project-proposal/1')
  })
})
