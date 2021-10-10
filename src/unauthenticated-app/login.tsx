import { Button, Form, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { useAuth } from 'context/auth-context';
import React from 'react'

export default function LoginScreen() {

    const {login} = useAuth()
    
    const handleSubmit = (values: {username:string, password:string}) => {
        
        login(values)
        
    }

    
    return (
        <Form onFinish={handleSubmit} autoComplete="off">
            
            <Form.Item name={'username'}>
                <Input placeholder={'username'} type="text" id={'username'} />
            </Form.Item>
            <FormItem name={'password'}>
                <Input placeholder={'password'} type="password" id={'password'} />
            </FormItem>
            <Button htmlType={'submit'} type={'primary'}>Login</Button>
        </Form>
    )
}
