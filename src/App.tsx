import React, { useEffect, useState } from 'react'
import UltimateDashboard from './components/Dashboard/UltimateDashboard'
import ESGDashboard from './components/ESG/ESGDashboard'
import RBMDashboard from './components/RBM/RBMDashboard'
import SebinoDashboard from './components/Sebino/SebinoDashboard'

function App() {
  const [industry, setIndustry] = useState('manufacturing')

  useEffect(() => {
    const checkIndustry = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const industryParam = urlParams.get('industry')

      if (industryParam === 'esg') {
        setIndustry('esg')
      } else if (industryParam === 'rbm') {
        setIndustry('rbm')
      } else if (industryParam === 'sebino') {
        setIndustry('sebino')
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
    case 'rbm':
      return <RBMDashboard />
    case 'sebino':
      return <SebinoDashboard />
    case 'manufacturing':
    default:
      return <UltimateDashboard />
  }
}

export default App