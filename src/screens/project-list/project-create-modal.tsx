import {  Drawer } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { projectListSliceActions, selectProjectModalOpen } from "./project-list.slice"

export const ProjectModal = () => {
    const dispatch = useDispatch()
    const  projectModalOpen  = useSelector(selectProjectModalOpen);
    
    return (
      <Drawer
        onClose={() => dispatch(projectListSliceActions.closeProjectModal())}
        visible={projectModalOpen}
        width={"100%"}
      >
        <h2>project modal</h2>
      </Drawer>
    );
}
