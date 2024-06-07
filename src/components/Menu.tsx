import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { useEffect } from 'react';
import { bookService } from '@/utils/services/book';
import { useSelector, useDispatch } from 'react-redux';
import { setMyBooks } from '@/store/bookSlice'
// NavLinkRenderProps
const Wrapper = styled.div`
  position: relative;
  min-width: 200px;
  background-color: #fbfbfb;
  border-radius: inherit;
  padding: 16px;
  box-sizing: border-box;s
`

const SubHead = styled.div`
  color: #202123;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .08em;
  line-height: 16px;
  text-transform: uppercase;
  margin: 10px;
`

const StyledNavLink = styled(NavLink)<{ $active?: boolean }>`
  cursor: pointer;
  align-items: baseline;
  border-radius: 8px;
  display: flex;
  flex-wrap: nowrap;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 1px;
  padding: 6px 12px;
  text-decoration: none;
  transition: background-color .1s ease-in-out;
  color: #6e6e80; // #202123=--text-primary
  font-weight: normal;
  background-color: none;
  &.active {
    color: #202123;
    font-weight: 500;
    background-color: #ececf1;
  }
  &:hover {
    color: #353740; // --text-default
    background-color: #ececf1;
  }
`

const DragBar = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  // height: 90%;
  height: 100%;
  width: 2px;
  background: #eee;
  cursor: ew-resize;
`
let isDragging = false
let startX = 0
let sidebarWidth = 200;
let SIDEBAR_MAX_WIDTH = 1000;

function Menu() {
  // const [myBooks, setMyBooks] = useState<Book[]>([])
  const myBooks = useSelector((state: any) => state.book.myBooks)
  const dispatch = useDispatch()

  const fetchDbBooks = async() => {
    let dbBooks = await bookService.listBooks()
    if (dbBooks?.length > 0) {
      dispatch(setMyBooks(dbBooks))
    }
  }

  useEffect(() => {
    // Initialize the sidebar position
    if (localStorage.getItem("sidebarWidth")) {
      // @ts-ignore
      sidebarWidth = +localStorage.getItem("sidebarWidth")
    }

    const sideBar = document.getElementById('sideBar')
    const dragBar = document.getElementById('dragBar')


    if (sidebarWidth) {
      sideBar!.style.minWidth = sidebarWidth + "px";
    }

    dragBar?.addEventListener("mousedown", function(e) {
      isDragging = true
      startX = e.clientX
    });

    document.addEventListener("mousemove", function(e) {
      if (isDragging) {
        var newWidth = sidebarWidth + (e.clientX - startX);
        if (newWidth <= SIDEBAR_MAX_WIDTH) {
          sideBar!.style.minWidth = newWidth + "px";
        }
      }
    });

    document.addEventListener("mouseup", function() {
      if (isDragging) {
        isDragging = false
        // Save the sidebar width
        if (sideBar?.offsetWidth) {
          console.log('sideBar?.offsetWidth', sideBar?.offsetWidth)
          localStorage.setItem("sidebarWidth", `${sideBar.offsetWidth}`);
          sidebarWidth = sideBar?.offsetWidth
        }
      }
    });

    fetchDbBooks()
  }, [])

  return (
    <Wrapper id="sideBar">
      <DragBar id="dragBar" />
      <SubHead>Get Started</SubHead>
      <StyledNavLink to="/introduction">Introduction</StyledNavLink>
      <StyledNavLink to="/new-book">Upload a Book</StyledNavLink>
      {/* <StyledNavLink to="/charlie-and-the-chocolate-factory-by-roald-dahl">Sample Book: charlie-and-the-chocolate-factory-by-roald-dahl</StyledNavLink> */}
      <SubHead>My Books</SubHead>
      {
        myBooks.length > 0 ? (
          myBooks.map(book => {
            return <StyledNavLink key={book.name} to={`/mybooks/${book.name}`}>{book.name}</StyledNavLink>
          })
        ) : ''
      }
    </Wrapper>
  );
}

export default Menu;