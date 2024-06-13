import React, { ReactNode, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import Button from './Button';
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '@/App'

const StyledDialog = styled.dialog`
  border: none;
  min-width: 400px;
`

function Dialog() {
}

interface Config {
  title?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
}

Dialog.confirm = (config: Config) => {
  const { title='', content='', footer='', onOk=() => {}, onCancel=() => {} } = config
  const container = document.createElement('div');
  document.body.appendChild(container);
  let myRef: HTMLDialogElement;

  const _onCancel = () => {
    myRef?.close()
    unmount()
    onCancel()
  }

  const _onOk = () => {
    myRef?.close()
    unmount()
    onOk()
  }

  const closeHandler = function(event: any) {
    if (event.target === myRef) {
        myRef.close();
    }
  }

  const unmount = () => {
    root.unmount()
    myRef.removeEventListener('click', closeHandler)
    container.parentNode?.removeChild(container)
  }
  const root = ReactDOM.createRoot(container)
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <StyledDialog
          ref={(ref: any) => {
            myRef = ref;
            ref?.showModal()
            // Close dialog when clicking on the backdrop
            ref.addEventListener('click', closeHandler);
          }}
        >
          <h2 style={{ margin:0, padding: 0}}>{ title }</h2>
          <div>{ content }</div>
          {
            !footer ? (
              <footer style={{display: 'flex', flexDirection: 'row-reverse'}}>
                <Button onClick={_onOk} size="small">Confirm</Button>&nbsp;
                <Button onClick={_onCancel} size="small" type="secondary">Cancel</Button>
              </footer>
            ) : (
              <footer>{ footer }</footer>
            )
          }
        </StyledDialog>
      </ThemeProvider>
    </React.StrictMode>,
  )
  return {
    hide: () => {
      unmount()
    }
  }
}

export default Dialog;
