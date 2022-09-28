import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { SkzModal } from 'skz-ui';

const App = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="App">
            <button onClick={() => setOpenModal(true)}>Open modal</button>
            <SkzModal 
                open={openModal}
                setOpen={setOpenModal}
                body={
                    <p>Hello world !</p>
                }
            />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)