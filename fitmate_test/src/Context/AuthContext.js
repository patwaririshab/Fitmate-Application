import React from 'react'

const AuthContext = React.createContext({
  authenticated: false,
  userUID: ''
});


export default AuthContext
