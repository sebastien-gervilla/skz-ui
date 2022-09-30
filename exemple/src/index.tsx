import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Snackbar } from 'skz-ui';

const App = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);

    return (
        <div className="App">
            <button onClick={() => setOpenSnackbar(true)}>Open snackbar !</button>
            <Snackbar 
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message={'You received a notification !'}
                buttonText={'CLOSE'}
                className={'my-snackbar'}
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