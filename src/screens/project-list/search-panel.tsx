import { Input, Select } from "antd"
import React from "react"

export interface User {
    id: string;
    name: string;
    email: string;
    tittle: string;
    organization: string;
    token: string;
}

interface SearchPanelProps {
    users: User[],
    param: {
        name: string,
        personId: string
    },
    setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({users,param,setParam}:SearchPanelProps) => {

    const handleChange:(e: React.FormEvent<HTMLInputElement>) => void = (e) => {
        setParam({ ...param, name: e.currentTarget.value})
    }
   
    
    return <form>
        <div>
            <Input
                type="text"
                value={param.name}
                onChange={handleChange}
            />
            <Select
                value={param.personId}
                onChange={value => setParam({ ...param, personId: value })}
            >
                <Select.Option value={''}>负责人</Select.Option>
                {
                    users.map((user) => <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>)
                }
            </Select>
        </div>
    </form>


}