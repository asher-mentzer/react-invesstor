import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface Investment {
  id: number
  name: string
  value: number
  change: string
}

interface BackendData {
  message: string
  investments: Investment[]
  totalValue: number
  fetchedAt: string
}

function App() {
  const [count, setCount] = useState(0)
  const [backendData, setBackendData] = useState<BackendData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [backendUrl, setBackendUrl] = useState('http://localhost:3000')

  const fetchBackendData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${backendUrl}/api/data`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setBackendData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
      console.error('Error fetching backend data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBackendData()
  }, [backendUrl])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Investment Tracker - Microservices Demo</h1>

      <div className="card">
        <div style={{ marginBottom: '20px' }}>
          <label>
            Backend URL:
            <input
              type="text"
              value={backendUrl}
              onChange={(e) => setBackendUrl(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
              placeholder="http://backend-service-ip:3000"
            />
          </label>
          <button onClick={fetchBackendData} style={{ marginLeft: '10px' }}>
            Refresh Data
          </button>
        </div>

        {loading && <p>Loading backend data...</p>}

        {error && (
          <div style={{ color: 'red', padding: '10px', border: '1px solid red', borderRadius: '5px' }}>
            <strong>Error:</strong> {error}
            <br />
            <small>Make sure backend is running and URL is correct</small>
          </div>
        )}

        {backendData && !loading && (
          <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
            <h2>📊 {backendData.message}</h2>
            <p><strong>Total Portfolio Value:</strong> ${backendData.totalValue.toLocaleString()}</p>

            <h3>Investments:</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {backendData.investments.map((inv) => (
                <li key={inv.id} style={{
                  padding: '10px',
                  marginBottom: '10px',
                  background: '#1a1a1a',
                  borderRadius: '5px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>{inv.name}</span>
                  <span>
                    ${inv.value.toLocaleString()}
                    <span style={{ color: inv.change.startsWith('+') ? '#4ade80' : '#f87171', marginLeft: '10px' }}>
                      {inv.change}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: '12px', color: '#888' }}>
              Last updated: {new Date(backendData.fetchedAt).toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
