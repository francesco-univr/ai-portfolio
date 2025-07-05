import React from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
// import Timeline from './components/sections/Timeline';
// import Projects from './components/sections/Projects';
// import ResearchStats from './components/sections/ResearchStats';
// import NeuralNetworkVisualization from './components/sections/NeuralNetworkVisualization';
// import Contact from './components/sections/Contact';

// Error boundary component
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-500 min-h-screen flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-4xl mb-4">Something went wrong</h1>
            <p className="text-lg">{this.state.error?.message || 'Unknown error'}</p>
            <p className="text-sm mt-4">Check browser console for details</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  console.log('App component rendering...');
  
  return (
    <ErrorBoundary>
      <div className="bg-cyber-black min-h-screen">
        <Header />
        <main>
          <ErrorBoundary>
            <Hero />
          </ErrorBoundary>
          {/* Temporarily disabled other sections to isolate the issue */}
          <div className="py-24 text-center text-white">
            <h2 className="text-2xl">Testing Hero section only</h2>
            <p>If you see this text and Hero particles above, Hero component works!</p>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
