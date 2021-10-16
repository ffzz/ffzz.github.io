import { NavLink } from "react-router-dom";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { EpicScreen } from "screens/Epic";
import { KanbanScreen } from "screens/kanban";

export const ProjectScreen = () => {
  return (
    <div>
      <h3>project screen</h3>
      <nav>
        <Link to={"kanban"}>Kanban</Link>
        <Link to={"epic"}>Epic</Link>
      </nav>

      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen />} />
        <Route path={"/epic"} element={<EpicScreen />} />
        <Navigate to={window.location.pathname + "/kanban"} replace={true} />
      </Routes>
    </div>
  );
};
