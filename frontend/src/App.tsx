import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  return(
    <div>
      <h1>App</h1>
      <Outlet></Outlet>
    </div>
  )
}

export default App;
