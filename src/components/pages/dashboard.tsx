import { useState } from "react"
import { Button } from "../ui/Button"
import { Label, TextArea, TextField} from 'react-aria-components';
import './dashboard.css'
import "../ui/TextField.css";

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
        <TextField >
            <Label>Comment</Label>
                <TextArea
                    rows={2}
                    className="react-aria-TextArea inset h-32"
                    placeholder="Enter a comment" />
                </TextField>
            <Button type="submit">Gönder</Button>
      </form>
    </div>
  )
}

export default Dashboard