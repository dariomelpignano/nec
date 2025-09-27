import React, { useEffect, useState } from 'react'
import UltimateDashboard from './components/Dashboard/UltimateDashboard'
import ESGDashboard from './components/ESG/ESGDashboard'

function App() {
  const [industry, setIndustry] = useState('manufacturing')

  useEffect(() => {
    const checkIndustry = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const industryParam = urlParams.get('industry')
      if (industryParam === 'esg') {
        setIndustry('esg')
      } else {
        setIndustry('manufacturing')
      }
    }

    checkIndustry()
    window.addEventListener('popstate', checkIndustry)

    return () => {
      window.removeEventListener('popstate', checkIndustry)
    }
  }, [])

  switch (industry) {
    case 'esg':
      return <ESGDashboard />
    case 'manufacturing':
    default:
      return <UltimateDashboard />
  }
}

export default App