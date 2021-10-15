import {  Drawer } from "antd"
import { useProjectModal } from "./util"

export const ProjectModal = () => {
    const {isOpen, close} = useProjectModal()


    return (
        <Drawer onClose={close} visible={isOpen} width={'100%'} >
            <h2>project modal</h2>
        </Drawer>
    )
} 
