'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Loading } from '~/components';
import { useAppState } from '~/context/useAppState';
import styles from './page.module.css';

const ChartPage = () => {
  const {
    state: { colors, isLoading },
  } = useAppState();
  const colorsWithCount = colors.filter((color) => color.count > 0);
  const totalCount = colorsWithCount.reduce(
    (acc, color) => acc + color.count,
    0,
  );
  return isLoading ? (
    <Loading />
  ) : (
    <div className={styles.root}>
      <h2 className={styles.total}>Total: {totalCount}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={colorsWithCount}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ count, percent, x, y }) => (
              <g>
                <rect
                  x={x - 40}
                  y={y - 12.5}
                  width={80}
                  height={25}
                  fill="rgba(0, 0, 0, 0.5)"
                />
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="central">
                  {`${count} - ${(percent * 100).toFixed(0)}%`}
                </text>
              </g>
            )}
            outerRadius={150}
            dataKey="count">
            {colorsWithCount.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.hex} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPage;
