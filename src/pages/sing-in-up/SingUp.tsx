import { useState } from 'react'
import styles from './SignUp.module.css'
export default function SingUp() {
  const [user, setUser] = useState(true)
  function handleUserEmployee() {
    setUser(!user)
  }
  return (
    <div className={styles.form}>
      <div className={styles.switch_button}>
        <p>User</p>
        <p>Employee</p>
      </div>
    </div>
  )
}
