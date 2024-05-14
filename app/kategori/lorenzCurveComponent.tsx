import React from 'react'
import axios from 'axios';
import { useEffect, useState, useRef} from 'react';
import { useSearchParams } from 'next/navigation';
import * as d3 from 'd3';

interface LorenzCurveSVGProps {
  attr: string;
}

const LorenzCurveSVG: React.FC<LorenzCurveSVGProps> = ({ attr }) => {
  const [data, setKategoriData] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const ylabel = attr === 'word_count' ? 'Cumulative Proportion of Words' : 'Cumulative Proportion of Blue-links';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParam = searchParams.get('nama_kategori') || '';
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/artikel/?nama_kategori=${encodeURIComponent(queryParam)}`);
        const responseData = response.data.data;
        const attrData = responseData.map((item: any) => item.attributes[attr])
        setKategoriData(attrData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [attr, searchParams]);

  return (
    <div>
      <LorenzCurve data={data} ylabel={ylabel} />
    </div>
  );
};

export default LorenzCurveSVG;

interface LorenzCurveProps {
  data: number[];
  ylabel: string;
}

const LorenzCurve: React.FC<LorenzCurveProps> = ({ data, ylabel }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  
  useEffect(() => {
    if (svgRef.current && data.length > 0) {
      const totalKata = data.reduce((acc, curr) => acc + curr, 0);
      const cumulativeKata = data
        .slice()
        .sort((a, b) => a - b)
        .reduce<number[]>((acc, curr, index) => {
          acc.push(curr / totalKata + (acc[index - 1] || 0));
          return acc;
        }, []);

      const totalArtikel = data.length;
      const cumulativePopulation = Array.from({ length: totalArtikel }, (_, i) => (i + 1) / totalArtikel);

      const width = 600; // Adjusted width
      const height = 600; // Adjusted height
      const margin = { top: 20, right: 20, bottom: 80, left: 80 }; // Adjusted margins

      const xScale = d3.scaleLinear().domain([0, 1]).range([margin.left, width - margin.right]);
      const yScale = d3.scaleLinear().domain([0, 1]).range([height - margin.bottom, margin.top]);

      const line = d3.line<[number, number]>()
        .x(([x]) => xScale(x))
        .y(([_, y]) => yScale(y));

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      const lorenzData = cumulativePopulation.map((d, i) => [d, cumulativeKata[i]] as [number, number]);

      svg.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).ticks(5).tickSize(-height + margin.top + margin.bottom));

      svg.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).ticks(5).tickSize(-width + margin.left + margin.right));

      svg.append('path')
        .datum(lorenzData)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('d', line);

      svg.append('line')
        .attr('x1', xScale(0))
        .attr('y1', yScale(0))
        .attr('x2', xScale(1))
        .attr('y2', yScale(1))
        .attr('stroke', 'red')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '5 5');

      svg.append('path')
        .datum(lorenzData)
        .attr('fill', 'skyblue')
        .attr('opacity', 0.5)
        .attr('d', line.y(yScale(1)));

      // Adding axis labels
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height - margin.bottom / 4)
        .style('text-anchor', 'middle')
        .style('font-size', '24px')
        .text('Cumulative Proportion of Articles');

      svg.append('text')
        .attr('x', -height / 2)
        .attr('y', margin.left / 2.5)
        .attr('transform', 'rotate(-90)')
        .style('text-anchor', 'middle')
        .style('font-size', '24px')
        .text(ylabel === 'word_count' ? 'Cumulative Proportion of Words' : 'Cumulative Proportion of Blue-links');

      svg.selectAll('.tick text')
        .style('font-size', '20px');
    }
  }, [data]);

  return (
    <div className="flex flex-col w-20/20 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col">
        <div className="px-4 py-1.5 mx-auto w-full bg-white rounded-xl border border-solid shadow-sm border-neutral-700 text-neutral-700 max-md:px-5 max-md:mt-10">
          <svg
            ref={svgRef}
            width={350} // Set explicit width
            height={350} // Set explicit height
            viewBox={`0 0 600 600`} // Adjusted viewBox
            preserveAspectRatio="xMidYMid meet"
          ></svg>
        </div>
      </div>
    </div>
  );
};