import React from 'react';
import Sidebar from '../../components/Sidebar';
import MainContent from '../../components/MainContent';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - lado esquerdo */}
          <div className="lg:w-1/4 lg:sticky lg:top-8 lg:self-start">
            <Sidebar />
          </div>
          
          {/* MainContent - lado direito, mais estreito */}
          <div className="lg:w-2/3">
            <div className="p-6">
              <MainContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;