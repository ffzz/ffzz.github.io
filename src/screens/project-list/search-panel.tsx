import React from "react"

export interface User {
    id: string;
    name: string;
    email: string;
    tittle: string;
    organization: string;
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
            <input
                type="text"
                value={param.name}
                onChange={handleChange}
            />
            <select
                value={param.personId}
                onChange={e => setParam({ ...param, personId: e.target.value })}

            >
                <option value=''>负责人</option>
                {
                    users.map((user) => <option value={user.id} key={user.id}>{user.name}</option>)
                }
            </select>
        </div>
    </form>


}