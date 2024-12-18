'use client';

import * as React from 'react';
import { Label, Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import { getGenres } from '@/lib/discogsAPI';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface GenresPieChartProps {
  username: string;
}

export default function GenresPieChart({ username }: GenresPieChartProps) {
  const id = 'pie-genres';
  const [genresData, setGenresData] = React.useState<
    { genre: string; count: number; fill: string }[]
  >([]);
  const [activeGenre, setActiveGenre] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  const activeIndex = React.useMemo(
    () => genresData.findIndex((item) => item.genre === activeGenre),
    [activeGenre, genresData],
  );

  React.useEffect(() => {
    async function fetchData() {
      try {
        const genres = await getGenres(username);

        const formattedData = Object.keys(genres).map((genre, index) => ({
          genre,
          count: genres[genre],
          fill: `var(--chart-${(index % 5) + 1})`, // Use cyclic colors
        }));

        setGenresData(formattedData);
        setActiveGenre(formattedData[0]?.genre || null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  if (loading) {
    return <p>Loading genres...</p>;
  }

  if (!genresData.length) {
    return <p>No genres available for this user.</p>;
  }

  const chartConfig = genresData.reduce((acc, item, index) => {
    acc[item.genre] = {
      label: item.genre,
      color: item.fill,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Genre Distribution</CardTitle>
          <CardDescription>Collection Overview</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={genresData}
              dataKey="count"
              nameKey="genre"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {genresData[activeIndex]?.count?.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {genresData[activeIndex]?.genre}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
