import React from 'react';
import { Activity, Bell, Settings, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-purple-800 text-white shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Activity className="h-10 w-10 mr-3" />
              <div>
                <h1 className="text-2xl font-bold">Neosperience Enterprise Cloud</h1>
                <p className="text-sm text-blue-100">Piattaforma AI per la Trasformazione Digitale delle PMI</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Stato Sistema:</span>
              <span className="flex items-center">
                <span className="h-2 w-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                <span className="text-sm font-medium">Operativo</span>
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-white/10 rounded-lg transition">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition">
                <Settings className="h-5 w-5" />
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 hover:bg-white/10 rounded-lg transition">
                <User className="h-5 w-5" />
                <span className="text-sm">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;