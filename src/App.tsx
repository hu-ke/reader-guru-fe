import { useEffect } from "react";
import styled, { ThemeProvider } from 'styled-components'
import Menu from './components/Menu'
import Button from './components/Button'
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { testGet } from './utils/http';
import Logo from '@/assets/logo.png'

const Main = styled.div`
  flex: 1;
  height: 100%;
  margin: 0 8px 8px 8px;
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
`

const TopBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: var(--shadow-header);
  backface-visibility: hidden;
  height: 4em;
  background-color: #ffffff;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
  backface-visibility: hidden;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  padding-right: 60px;
`

const Content = styled.div`
  padding: 20px 40px 80px 40px;
  line-height: 1.5;
`

const Sep = styled.div`
  width: 20px;
`

export const StyledNavLink = styled(NavLink)<{ $active?: boolean }>`
  font-size: 16px;
  color: ${props => props.theme.green};
  cursor: pointer;
  &:hover {
    color: #1a7f64;
  }
  text-decoration: none;
`

function App() {
  const navigate = useNavigate()
  const doGet = async() => {
    let res = await testGet()
    console.log('res get', res)
  }
  useEffect(() => {
    doGet()
  }, [])

  const toUpload = () => {
    console.log('toUpload')
    navigate('/new-book')
  }

  const theme = {
    blue: "rgb(72, 152, 218)", // blue
    deepBlue: '#096398',
    green: '#10a37f',
    deepGreen: '#1a7f64',
    disabledBg: '#f5f7fa',
    disabledColor: '#c4c7cc'
  };
  

  return (
    <ThemeProvider theme={theme}>
      <TopBar>
        <div style={{cursor: 'pointer', display: 'flex', alignItems: 'center', marginRight: 'auto'}}>
          <img src={Logo} alt="logo" style={{width: '50px', marginLeft: '100px'}} />
          <div style={{marginLeft: '20px', marginRight: 'auto', fontFamily: 'Helloyasmin', letterSpacing: '4px', fontSize: '20px'}}>Your AI Reading Assistant.</div>
        </div>
        <>
          {/* <StyledNavLink to={"/new-book"}>Upload a book</StyledNavLink> */}
          <Button onClick={toUpload}>
            Upload a book&nbsp;
            <svg fill="#fff" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2152" width="20" height="20"><path d="M554.688 500.352v256H469.312v-256h-128L512 314.24l170.688 186.24h-128zM1024 640.192C1024 782.912 919.872 896 787.648 896h-512C123.904 896 0 761.6 0 597.504 0 451.968 94.656 331.52 226.432 302.976 284.16 195.456 391.808 128 512 128c152.32 0 282.112 108.416 323.392 261.12C941.888 413.44 1024 519.04 1024 640.192z m-259.2-205.312c-24.448-129.024-128.896-222.72-252.8-222.72-97.28 0-183.04 57.344-224.64 147.456l-9.28 20.224-20.928 2.944c-103.36 14.4-178.368 104.32-178.368 214.72 0 117.952 88.832 214.4 196.928 214.4h512c88.32 0 157.504-75.136 157.504-171.712 0-88.064-65.92-164.928-144.96-171.776l-29.504-2.56-5.888-30.976z" p-id="2153"></path></svg>
          </Button>
          <Sep />
          {/* <Button size="medium">contact me</Button> */}
        </>
      </TopBar>
      {/* <HkDialog /> */}
      <Main>
        <Menu></Menu>
        <Content>
          <Outlet />
        </Content>
      </Main>
    </ThemeProvider>
  )
}

export default App