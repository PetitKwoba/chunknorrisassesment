import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <Container style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <Typography variant="h4" gutterBottom>
                        Oops! Something went wrong
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        We encountered an unexpected error. Please try refreshing the page.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={this.handleReset}>
                        Refresh Page
                    </Button>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
