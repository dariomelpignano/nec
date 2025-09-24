import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { productionByCategory } from '../../data/mockData';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

const ProductionChart: React.FC = () => {
  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Produzione per Categoria</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Distribuzione Unità</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productionByCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={11}
                stroke="#6b7280"
              />
              <YAxis fontSize={12} stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                labelStyle={{ color: '#111827', fontWeight: 'bold' }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]}>
                {productionByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Percentuale sul Totale</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={productionByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                fontSize={11}
              >
                {productionByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <p className="text-sm text-gray-600">Totale Unità Prodotte</p>
          <p className="text-2xl font-bold text-gray-900">
            {productionByCategory.reduce((sum, item) => sum + item.value, 0).toLocaleString('it-IT')}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Categoria Leader</p>
          <p className="text-lg font-bold text-blue-600">Valvole Industriali</p>
          <p className="text-xs text-gray-500">+12% vs mese precedente</p>
        </div>
      </div>
    </div>
  );
};

export default ProductionChart;