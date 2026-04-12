import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Charts = ({ transactions }) => {
  const categories = [...new Set(transactions.map(t => t.category))];
  const categoryData = categories.map(cat => 
    transactions.filter(t => t.category === cat && t.type === 'expense')
                .reduce((acc, t) => acc + Number(t.amount), 0)
  );

  const pieData = {
    labels: categories,
    datasets: [{
      data: categoryData,
      backgroundColor: ['#60A5FA', '#F87171', '#34D399', '#FBBF24', '#A78BFA'],
      borderWidth: 0,
    }]
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
      <div className="h-64 flex justify-center">
        <Pie data={pieData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};
export default Charts;
