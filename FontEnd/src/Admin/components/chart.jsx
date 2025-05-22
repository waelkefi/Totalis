import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card } from 'react-bootstrap';

export function PersonalityChart({ data, title }) {
  return (
    <Card className="shadow-sm">
      <Card.Header>
        <h5 className="mb-0">{title}</h5>
      </Card.Header>
      <Card.Body>
        <div style={{ height: "400px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value} personalities`, name]}
                contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
              />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
}

export function MBTIDistributionChart({ personalities }) {
  // Create data for personality types by category
  const getCategoryData = () => {
    // Handle case when personalities might be undefined
    if (!personalities || !Array.isArray(personalities)) {
      return [];
    }
    
    const categoryCounts = {
      'Analysts': 0,
      'Diplomats': 0,
      'Sentinels': 0,
      'Explorers': 0
    };
    
    personalities.forEach(p => {
      if (p && p.categorie) {
        categoryCounts[p.categorie] = (categoryCounts[p.categorie] || 0) + 1;
      }
    });
    
    return [
      { name: 'Analysts', value: categoryCounts['Analysts'], color: '#0d6efd' },
      { name: 'Diplomats', value: categoryCounts['Diplomats'], color: '#198754' },
      { name: 'Sentinels', value: categoryCounts['Sentinels'], color: '#ffc107' },
      { name: 'Explorers', value: categoryCounts['Explorers'], color: '#6f42c1' }
    ];
  };

  return <PersonalityChart data={getCategoryData()} title="MBTI Types Distribution" />;
}
