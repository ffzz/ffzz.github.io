import React, { Component } from 'react'

type FallbackRender = ( props: { error: Error|null}) => React.ReactElement

export class ErrorBoundary extends Component<{children: React.ReactNode, fallbackRender: FallbackRender}, {error: Error | null}> {

    state={
        error:null
    }

    // when a child component throws an error, it is received here and called this function
    static getDerivedStateFromError(error: Error){
        return {error}
    }

    render() {
        const { error} = this.state
        const {fallbackRender, children} = this.props

        if (error) {
            return fallbackRender({error})
        }
        return children
    }
}

export default ErrorBoundary
