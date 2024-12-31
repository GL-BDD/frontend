import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './employeespage.css'
const BASE_URL = import.meta.env.VITE_API_URL
export default function EmployeesPage() {
  const { profession } = useParams()
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)

  async function fetchEmployeesByProfession() {
    try {
      setLoading(true)
      const res = await fetch(
        `${BASE_URL}/api/artisans?specialization=${profession}`,
      )
      const data = await res.json()
      setLoading(false)
      setEmployees(data)
    } catch (e) {
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

const Employee: React.FC<EmployeeProps> = ({ nom, phoneNumber, imageURL }) => {
  return (
    <div className="employee">
      <div className="image">
        {/* <img src={imageURL} alt="employee image" /> */}
      </div>
      <h2>{nom}</h2>
      <p>{phoneNumber}</p>
    </div>
  )
}
