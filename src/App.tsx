import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Layout } from './components/Layout'
import { IssuePage } from './pages/IssuePage'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<IssuePage issueKey="YZ-1" />} />
          <Route path="YZ-1" element={<Navigate to="/" replace />} />
          <Route path=":issueKey" element={<IssuePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  )
}
