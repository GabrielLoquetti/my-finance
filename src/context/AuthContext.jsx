import { createContext, useContext, useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'

const AuthContext = createContext()

// Chave de criptografia (em produção, use variável de ambiente)
const ENCRYPTION_KEY = 'MyFinance_SecureKey_2026_v1'

// Credenciais (em produção, use backend com hash bcrypt)
const CREDENTIALS = {
  username: 'myfinance',
  passwordHash: CryptoJS.SHA256('finance1234').toString()
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    try {
      const encryptedAuth = localStorage.getItem('finance_auth_token')
      if (encryptedAuth) {
        const decrypted = CryptoJS.AES.decrypt(encryptedAuth, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
        const authData = JSON.parse(decrypted)

        // Verificar se o token ainda é válido (24h)
        const now = new Date().getTime()
        const tokenAge = now - authData.timestamp
        const maxAge = 24 * 60 * 60 * 1000 // 24 horas

        if (tokenAge < maxAge && authData.authenticated) {
          setIsAuthenticated(true)
        } else {
          logout()
        }
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = (username, password) => {
    const passwordHash = CryptoJS.SHA256(password).toString()

    if (username === CREDENTIALS.username && passwordHash === CREDENTIALS.passwordHash) {
      const authData = {
        authenticated: true,
        timestamp: new Date().getTime(),
        username: username
      }

      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(authData),
        ENCRYPTION_KEY
      ).toString()

      localStorage.setItem('finance_auth_token', encrypted)
      setIsAuthenticated(true)
      return { success: true }
    }

    return { success: false, error: 'Usuário ou senha incorretos' }
  }

  const logout = () => {
    localStorage.removeItem('finance_auth_token')
    setIsAuthenticated(false)
  }

  const value = {
    isAuthenticated,
    loading,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}
