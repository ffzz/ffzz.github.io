
import {  Link, Navigate, Route, Routes } from "react-router-dom"
import { EpicScreen } from "screens/Epic";
import { KanbanScreen } from "screens/kanban";

export const ProjectScreen = () => {
    return (
      <div>
        <h3>project screen</h3>
        <Link to="kanban">Kanban</Link>
        <Link to="epic">Epic</Link>
        <Routes>
            <Route path='kanban' element={<KanbanScreen />} />
            <Route path='epic' element={<EpicScreen />} />
            <Navigate to={window.location.pathname+'/kanban'} />
        </Routes>
      </div>
    );
}
