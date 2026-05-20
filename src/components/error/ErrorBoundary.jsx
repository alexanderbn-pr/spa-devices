'use client';

import { Component } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ErrorBoundary.scss';

/**
 * ErrorBoundary - Shared functional component for catching render errors
 * Uses a class wrapper internally for lifecycle access (componentDidCatch equivalent)
 */
function ErrorBoundary({ children, fallback, onReset, level = 'section' }) {
  const { t } = useTranslation();
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = () => {
    setHasError(false);
    setError(null);
    if (onReset) onReset();
  };

  if (hasError) {
    if (fallback) {
      return fallback;
    }

    return (
      <section className={`error-state ${level}`}>
        <p className="error-message">
          {t('error.generic')}
        </p>
        <button className="retry-button" onClick={handleReset}>
          {t('error.retry')}
        </button>
      </section>
    );
  }

  return <ErrorBoundaryWrapper setHasError={setHasError} setError={setError} t={t}>{children}</ErrorBoundaryWrapper>;
}

/**
 * Internal class wrapper to capture errors via getDerivedStateFromError
 * This pattern allows using hooks inside while maintaining class-based error capturing
 */
class ErrorBoundaryWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error('ErrorBoundary caught an error:', error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error details:', error, errorInfo);
  }

  render() {
    const { t } = this.props;
    if (this.state.hasError) {
      this.props.setHasError(true);
      this.props.setError(this.state.hasError);
      return (
        <section className="error-state section">
          <p className="error-message">{t('error.generic')}</p>
          <button className="retry-button" onClick={() => this.props.setHasError(false)}>
            {t('error.retry')}
          </button>
        </section>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;