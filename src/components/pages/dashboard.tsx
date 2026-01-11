import { useState } from "react"
import './dashboard.css'

const Dashboard = () => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Message:', message)
    setMessage('')
  }

  return (
    <div className="dashboard-form">
      <form onSubmit={handleSubmit}>
                <textarea
                    rows={2}
                    className="react-aria-TextArea inset h-32"
                    placeholder="Enter a comment" />
            <button type="submit" style={{ marginLeft: '10px' }}>Metro Gönder</button>
      </form>
    </div>
  )
}

export default Dashboard