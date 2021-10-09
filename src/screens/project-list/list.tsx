import {Table} from "antd"
import React from "react"
import { User } from "./search-panel"

interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
}

interface ListProps {
    list:Project[];
    users: User[];
}

export const List = ({list, users}:ListProps) => {

    return <Table pagination={false} columns={[{
        title: 'name',
        dataIndex:'name',
        sorter:(a,b) => a.name.localeCompare(b.name)
    },{
        title:'Leader',
        render(value, project){
            return <span>
                {
                    users.find((user:User) => user.id === project.personId)?.name || "unknown"
                }
            </span>
        }
    }]} dataSource={list} />
}