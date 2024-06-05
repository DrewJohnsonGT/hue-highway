'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
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
            fontWeight: 'bold',
            marginBottom: '10px',
          }}>
          <span
            style={{
              backgroundColor: item.hex,
              border: '2px solid black',
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

const BarChartPage = () => {
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
        <BarChart data={colorsWithCount}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" stroke="black" strokeWidth={2}>
            {colorsWithCount.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.hex} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <CustomLegend data={colors} />
    </div>
  );
};

export default BarChartPage;
