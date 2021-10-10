import styled from "@emotion/styled"
import { Spin, Typography } from "antd"


const FullPage = styled.div `
    height:100vh;
    display: flex;
    justify-content: center;
    align-self: center;
`

export const FullPageLoading = () => {
    return (
        <FullPage>
            <Spin size='large' />
        </FullPage>
    )
}


export const FullPageError = ({error}:{error:Error|null}) => {
    return (
        <FullPage>
            <Typography.Text type='danger'>{error?.message}</Typography.Text>
        </FullPage>
    )
}

