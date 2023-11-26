'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Loading } from '~/components';
import { useAppState } from '~/context/useAppState';
import { type Color } from '~/types';
import styles from './page.module.css';

const CustomLegend = ({ data }: { data: Color[] }) => {
  return (
    <div className={styles.legend}>
      {data.map((item, index) => (
        <li
          key={index}
          style={{
            alignItems: 'center',
            display: 'flex',
            marginBottom: '10px',
          }}>
          <span
            style={{
              backgroundColor: item.hex,
              height: '20px',
              marginRight: '10px',
              width: '20px',
            }}
          />
          {item.count}
        </li>
      ))}
    </div>
  );
};

const PieChartPage = () => {
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
            label={({ percent, x, y }) => (
              <g>
                <rect
                  x={x - 20}
                  y={y - 12.5}
                  width={40}
                  height={25}
                  fill="rgba(0, 0, 0, 0.5)"
                />
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="central">
                  {`${(percent * 100).toFixed(0)}%`}
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
      <CustomLegend data={colors} />
    </div>
  );
};

export default PieChartPage;
