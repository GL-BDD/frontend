/**
 * EmployeesPage component fetches and displays a list of employees based on their profession.
 * It uses the `useParams` hook to get the profession from the URL and fetches the employees
 * from the API. It displays a loading message while the data is being fetched and then displays
 * the list of employees.
 *
 * @component
 * @example
 * return (
 *   <EmployeesPage />
 * )
 *
 * @returns {JSX.Element} The EmployeesPage component.
 */

/**
 * Employee component displays the details of an individual employee.
 *
 * @component
 * @example
 * return (
 *   <Employee nom="John Doe" phoneNumber="123-456-7890" imageURL="path/to/image.jpg" />
 * )
 *
 * @param {Object} props - The properties object.
 * @param {string} props.nom - The name of the employee.
 * @param {string} props.phoneNumber - The phone number of the employee.
 * @param {string} props.imageURL - The URL of the employee's image.
 *
 * @returns {JSX.Element} The Employee component.
 */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './employeespage.css'

const BASE_URL = import.meta.env.VITE_API_URL
export default function EmployeesPage() {
  const { profession } = useParams()
  interface Employee {
    id: number
    username: string
    phonenumber: string
  }

  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchEmployeesByProfession() {
    try {
      setLoading(true)
      const res = await fetch(
        `${BASE_URL}/api/artisans?specialization=${profession}`,
      )
      const data = await res.json()
      setLoading(false)
      setEmployees(data.artisans)
    } catch {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployeesByProfession()
  }, [profession])

  console.log(employees)

  return (
    <div className="employeespage container grid-container">
      {loading ? (
        <h1>Data is loading ... ! please wait</h1>
      ) : (
        <>
          {employees.map((employee) => (
            <Link to={`/profession/${profession}/${employee.id}`}>
              <Employee
                key={employee.id}
                nom={employee.username}
                phoneNumber={employee.phonenumber}
                imageURL=""
              />
            </Link>
          ))}
        </>
      )}
    </div>
  )
}

//employee component

interface EmployeeProps {
  nom: string
  phoneNumber: string
  imageURL: string
}

const Employee: React.FC<EmployeeProps> = ({ nom, phoneNumber }) => {
  return (
    <div className="employee">
      <div className="image"></div>
      <h2>{nom}</h2>
      <p>{phoneNumber}</p>
    </div>
  )
}
