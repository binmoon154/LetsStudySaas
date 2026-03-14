import { useState } from 'react'
import Workbook from './components/Workbook'
import Practice from './components/Practice'
import RpsGame from './components/RpsGame'
import GoalTracker from './components/GoalTracker'
import IdCardGenerator from './components/IdCardGenerator'
import FaceRecognition from './components/FaceRecognition'
import './App.css'

function App() {
  const [tab, setTab] = useState('react-workbook')

  return (
    <div className="app-container">
      <nav className="nav-bar">
        <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary)' }}>LetsStudySaas</span>
        </div>
        <button
          className={tab === 'react-workbook' ? 'nav-link active' : 'nav-link'}
          onClick={() => setTab('react-workbook')}
          style={{ background: 'none', boxShadow: 'none' }}
        >
          React 워크북
        </button>
        <button
          className={tab === 'flask-workbook' ? 'nav-link active' : 'nav-link'}
          onClick={() => setTab('flask-workbook')}
          style={{ background: 'none', boxShadow: 'none' }}
        >
          Flask 워크북
        </button>
        <button
          className={tab === 'practice' ? 'nav-link active' : 'nav-link'}
          onClick={() => setTab('practice')}
          style={{ background: 'none', boxShadow: 'none' }}
        >
          실습실
        </button>
      </nav>

      <main className="container">
        {tab === 'react-workbook' && <Workbook type="react" />}
        {tab === 'flask-workbook' && <Workbook type="flask" />}
        {tab === 'practice' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Practice type="react" />
            <GoalTracker />
            <Practice type="flask" />
            <IdCardGenerator />
            <FaceRecognition />
            <RpsGame />
          </div>
        )}
      </main>

      <footer style={{ marginTop: 'auto', padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        React, Vite, Flask, 그리고 Supabase로 제작됨
      </footer>
    </div>
  )
}

export default App
