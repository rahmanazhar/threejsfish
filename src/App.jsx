import Scene3D from './components/Scene3D'
import './App.css'

function App() {
  return (
    <div className="app">
      <Scene3D />
      <div className="content">
        <header>
          <h1>Deep Ocean Explorer</h1>
          <p>Scroll to dive deeper into the ocean</p>
        </header>
        
        <div className="depth-markers">
          <div className="marker" style={{ top: '25%' }}>
            <span>Sunlight Zone</span>
            <p>0-200m deep</p>
          </div>
          
          <div className="marker" style={{ top: '50%' }}>
            <span>Twilight Zone</span>
            <p>200-1000m deep</p>
          </div>
          
          <div className="marker" style={{ top: '75%' }}>
            <span>Midnight Zone</span>
            <p>1000-4000m deep</p>
          </div>
          
          <div className="marker" style={{ top: '90%' }}>
            <span>Abyssal Zone</span>
            <p>4000+ meters deep</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
