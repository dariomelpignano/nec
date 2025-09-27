import React, { useEffect, useState } from 'react'
import UltimateDashboard from './components/Dashboard/UltimateDashboard'
import ESGDashboard from './components/ESG/ESGDashboard'
import RBMDashboard from './components/RBM/RBMDashboard'

function App() {
  const [industry, setIndustry] = useState('manufacturing')

  useEffect(() => {
    const checkIndustry = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const industryParam = urlParams.get('industry')
      console.log('URL params:', window.location.search)
      console.log('Industry param:', industryParam)

      if (industryParam === 'esg') {
        console.log('Setting ESG')
        setIndustry('esg')
      } else if (industryParam === 'rbm') {
        console.log('Setting RBM')
        setIndustry('rbm')
      } else {
        console.log('Setting Manufacturing')
        setIndustry('manufacturing')
      }
    }

    checkIndustry()
    window.addEventListener('popstate', checkIndustry)

    return () => {
      window.removeEventListener('popstate', checkIndustry)
    }
  }, [])

  console.log('Current industry state:', industry)

  // Debug buttons for testing
  const debugButtons = (
    <div style={{
      position: 'fixed',
      top: 10,
      right: 10,
      zIndex: 9999,
      background: 'white',
      padding: '10px',
      border: '2px solid #333',
      borderRadius: '8px'
    }}>
      <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Debug: Current = {industry}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setIndustry('manufacturing')}
          style={{
            padding: '5px 10px',
            background: industry === 'manufacturing' ? '#0066cc' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Manufacturing
        </button>
        <button
          onClick={() => setIndustry('esg')}
          style={{
            padding: '5px 10px',
            background: industry === 'esg' ? '#0066cc' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ESG
        </button>
        <button
          onClick={() => setIndustry('rbm')}
          style={{
            padding: '5px 10px',
            background: industry === 'rbm' ? '#0066cc' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          RBM
        </button>
      </div>
    </div>
  )

  return (
    <>
      {debugButtons}
      {industry === 'esg' && <ESGDashboard />}
      {industry === 'rbm' && <RBMDashboard />}
      {industry === 'manufacturing' && <UltimateDashboard />}
    </>
  )
}

export default App