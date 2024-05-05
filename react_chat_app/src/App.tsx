import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import './App.css'
import { Rooms } from "./pages/chat/rooms";
import { Login } from "./pages/Login";
import { List } from "./pages/chat/list";
import { Layout } from "./pages/chat/layout";



const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "list", element: <List /> },
      { path: "rooms", element: <Rooms /> },
    ]
  },
]);


const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body{
  background-color:#ffffff;
  color:black;
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;

const Wrapper = styled.div`
  width:100%;
  height: 100vh;
  display:flex;
  margin:auto;
`;


function App() {

  return (
    <>
      <Wrapper>
        <GlobalStyles />
        <RouterProvider router={router} />
      </Wrapper>

    </>
  )
}

export default App
