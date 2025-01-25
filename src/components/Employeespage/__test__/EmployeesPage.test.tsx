import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import EmployeesPage from '../EmployeesPage'

const mockEmployees = [
  { id: 1, username: 'Alice', phonenumber: '111-111-1111' },
  { id: 2, username: 'Bob', phonenumber: '222-222-2222' },
]

jest.mock('./EmployeesPage', () => {
  return jest.fn(() => ({
    fetchEmployeesByProfession: jest.fn(),
  }))
})

describe('EmployeesPage Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockEmployees),
      }),
    ) as jest.Mock
  })

  it('should render the loading message when data is loading', () => {
    render(
      <BrowserRouter>
        <EmployeesPage />
      </BrowserRouter>,
    )

    expect(screen.getByText(/Data is loading/)).toBeInTheDocument()
  })

  it('should render employees after fetching data', async () => {
    render(
      <BrowserRouter>
        <EmployeesPage />
      </BrowserRouter>,
    )

    const alice = await screen.findByText('Alice')
    const bob = await screen.findByText('Bob')

    expect(alice).toBeInTheDocument()
    expect(bob).toBeInTheDocument()
  })

  it('should create links for each employee', async () => {
    render(
      <BrowserRouter>
        <EmployeesPage />
      </BrowserRouter>,
    )

    const links = await screen.findAllByRole('link')
    expect(links).toHaveLength(mockEmployees.length)
  })
})
