import { Component, ReactNode, ErrorInfo } from 'react';
import { ServerError } from '..';

type MyProps = {
  children: ReactNode;
};
type MyState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      <ServerError/>
    }

    return this.props.children;
  }
}
