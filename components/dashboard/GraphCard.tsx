'use client';

import React from 'react';
import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  Area,
  Bar,
  Line,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui';

interface GraphCardProps {
  title: string;
  data: Record<string, any>[];
  type: 'area' | 'bar' | 'line' | 'pie';
  dataKey: string;
  secondaryDataKey?: string;
  tertiaryDataKey?: string;
  xAxisKey?: string;
  nameKey?: string;
}

const PRIMARY_COLOR = '#D2F865';
const SECONDARY_COLOR = '#A0E86E';
const TERTIARY_COLOR = '#6ECC77';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded p-2 shadow-lg">
        <p className="text-gray-300 text-sm">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function GraphCard({
  title,
  data,
  type,
  dataKey,
  secondaryDataKey,
  tertiaryDataKey,
  xAxisKey = 'name',
  nameKey = 'name',
}: GraphCardProps) {
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={PRIMARY_COLOR} stopOpacity={0.8} />
                <stop offset="95%" stopColor={PRIMARY_COLOR} stopOpacity={0} />
              </linearGradient>
              {secondaryDataKey && (
                <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={SECONDARY_COLOR} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={SECONDARY_COLOR} stopOpacity={0} />
                </linearGradient>
              )}
              {tertiaryDataKey && (
                <linearGradient id="colorTertiary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={TERTIARY_COLOR} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={TERTIARY_COLOR} stopOpacity={0} />
                </linearGradient>
              )}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey={xAxisKey} stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={PRIMARY_COLOR}
              fillOpacity={1}
              fill="url(#colorPrimary)"
            />
            {secondaryDataKey && (
              <Area
                type="monotone"
                dataKey={secondaryDataKey}
                stroke={SECONDARY_COLOR}
                fillOpacity={1}
                fill="url(#colorSecondary)"
              />
            )}
            {tertiaryDataKey && (
              <Area
                type="monotone"
                dataKey={tertiaryDataKey}
                stroke={TERTIARY_COLOR}
                fillOpacity={1}
                fill="url(#colorTertiary)"
              />
            )}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey={xAxisKey} stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey={dataKey} fill={PRIMARY_COLOR} />
            {secondaryDataKey && <Bar dataKey={secondaryDataKey} fill={SECONDARY_COLOR} />}
            {tertiaryDataKey && <Bar dataKey={tertiaryDataKey} fill={TERTIARY_COLOR} />}
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey={xAxisKey} stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={PRIMARY_COLOR}
              strokeWidth={2}
              dot={{ fill: PRIMARY_COLOR, r: 4 }}
              activeDot={{ r: 6 }}
            />
            {secondaryDataKey && (
              <Line
                type="monotone"
                dataKey={secondaryDataKey}
                stroke={SECONDARY_COLOR}
                strokeWidth={2}
                dot={{ fill: SECONDARY_COLOR, r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
            {tertiaryDataKey && (
              <Line
                type="monotone"
                dataKey={tertiaryDataKey}
                stroke={TERTIARY_COLOR}
                strokeWidth={2}
                dot={{ fill: TERTIARY_COLOR, r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        );

      case 'pie':
        return (
          <PieChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill={PRIMARY_COLOR}
              dataKey={dataKey}
            >
              <Cell fill={PRIMARY_COLOR} />
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index % 3 === 0
                      ? PRIMARY_COLOR
                      : index % 3 === 1
                        ? SECONDARY_COLOR
                        : TERTIARY_COLOR
                  }
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="p-6 bg-gray-950 border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </Card>
  );
}
