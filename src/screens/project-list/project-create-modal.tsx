import {  Drawer } from "antd"

export const ProjectModal = (props:{projectModalOpen:boolean, onClose:()=>void}) => {
    return (
        <Drawer onClose={props.onClose} visible={props.projectModalOpen} width={'100%'} >
            <h2>project modal</h2>
        </Drawer>
    )
}
