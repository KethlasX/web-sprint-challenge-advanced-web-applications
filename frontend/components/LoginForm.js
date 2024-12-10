import React, { useState, useEffect } from 'react'
import PT from 'prop-types'

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  const [isValid, setIsValid] = useState(true)
  // ✨ where are my props? Destructure them here

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
      
  }

  const onSubmit = evt => {
    evt.preventDefault()
    
    props.login(values)
    // ✨ implement
  }

  useEffect(() => {
    isDisabled()
  }, [values])
// line 73-94 on web-s7-challenge
// the idea is to create a slice of state for validation and put it in the onSubmit AND the isDisabled so we can check the value updates from state through the onSubmit before deciding to !isDisabled

  const isDisabled = () => {
   const checkValues = {
      username: values.username.trim(),
      password: values.password.trim()
    }
    
    if (checkValues.username.length >= 3 && checkValues.password.length >= 8) setIsValid(false)
    else setIsValid(true)
    // ✨ implement
    // Trimmed username must be >= 3, and
    // trimmed password must be >= 8 for
    // the button to become enabled
  }

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isValid} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
