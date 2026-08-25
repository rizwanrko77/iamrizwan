'use client';

import { useState } from 'react';

export default function CopyPromptBox({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = prompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div id="ai-prompt" className="prompt-box">
      <div className="prompt-box__header">
        <div className="prompt-box__title-wrap">
          <svg
            className="prompt-box__icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
          <div>
            <h3 className="prompt-box__title">Build your own with this AI prompt</h3>
            <p className="prompt-box__subtitle">
              Copy and paste this prompt into Claude, ChatGPT, or Cursor to scaffold a custom technical screening flow.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`prompt-box__copy-btn ${copied ? 'prompt-box__copy-btn--copied' : ''}`}
          aria-label="Copy prompt to clipboard"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy prompt</span>
            </>
          )}
        </button>
      </div>

      <div className="prompt-box__content">
        <pre className="prompt-box__pre">
          <code>{prompt}</code>
        </pre>
      </div>
    </div>
  );
}
