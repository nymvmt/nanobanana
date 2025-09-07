
import React from 'react';
import Header from './components/Header';
import EditorWorkspace from './components/EditorWorkspace';

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col font-sans antialiased">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
        <EditorWorkspace />
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Powered by Google Gemini. All images are processed on the fly and are not stored.</p>
      </footer>
    </div>
  );
};

export default App;
