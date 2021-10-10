import {Table} from "antd"
import dayjs from "dayjs"
import React from "react"
import { User } from "./search-panel"

interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
    createdAt:string;
}

interface ListProps {
    list:Project[];
    users: User[];
}

export const List = ({list, users}:ListProps) => {

    return <Table pagination={false} columns={[{
        title: 'Name',
        dataIndex:'name',
        sorter:(a,b) => a.name.localeCompare(b.name)
    },{
        title:'Organization',
        dataIndex: 'organization'
    },
    {
        title:'Leader',
        render(value, project){
            return <span>
                {
                    users.find((user:User) => user.id === project.personId)?.name || "unknown"
                }
            </span>
        }
    },{
        title: "Created Date",
        render(value,project){
            return (
                <span>
                    {
                        project.createdAt? dayjs(project.createdAt).format('MM-DD-YYYY') : ''
                    }
                </span>
            )
        }
    }]} dataSource={list} />
}