import { simpleGit } from 'simple-git';
import fs from 'fs';
import { JSDOM } from 'jsdom';
import * as d3 from 'd3';
import { exec as execCallback } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const exec = promisify(execCallback);

async function countLinesInCommit(git, commitHash) {
    await git.checkout(commitHash);
    try {
        const { stdout } = await exec('git ls-files');
        const files = stdout.split('\n').filter(Boolean);
        
        const metrics = {
            rubyCode: 0,
            testCode: 0,
            templates: 0,
            migrations: 0
        };

        for (const file of files) {
            try {
                const content = await fs.promises.readFile(file, 'utf8');
                const lines = content.split('\n').length;
                const ext = path.extname(file);
                const isTestFile = file.includes('/spec/') || file.includes('/test/');
                
                // Count Ruby code (excluding tests and migrations)
                if (ext === '.rb' && !isTestFile && !file.includes('/db/migrate/')) {
                    metrics.rubyCode += lines;
                }
                // Count test code
                else if (ext === '.rb' && isTestFile) {
                    metrics.testCode += lines;
                }
                // Count templates
                else if (['.erb', '.haml', '.slim'].includes(ext)) {
                    metrics.templates += lines;
                }
                // Count migrations
                else if (ext === '.rb' && file.includes('/db/migrate/')) {
                    metrics.migrations += lines;
                }
            } catch (error) {
                console.warn(`Skipping file ${file}: ${error.message}`);
            }
        }
        
        return metrics;
    } catch (error) {
        console.error('Error listing files:', error);
        return { rubyCode: 0, testCode: 0, templates: 0, migrations: 0 };
    }
}

async function generateMetrics() {
    const git = simpleGit();
    const logs = await git.log(['--reverse']);
    const commits = logs.all;
    
    const metrics = [];
    for (const commit of commits) {
        const lines = await countLinesInCommit(git, commit.hash);
        metrics.push({
            date: new Date(commit.date),
            ...lines
        });
        console.log(`Processed commit ${commit.hash}`);
    }
    
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    const document = dom.window.document;
    
    const margin = { top: 40, right: 150, bottom: 60, left: 70 };
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    
    const svg = d3.select(document.body)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .attr('xmlns', 'http://www.w3.org/2000/svg');
        
    svg.append('rect')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', 'white');
        
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleTime()
        .domain(d3.extent(metrics, d => d.date))
        .range([0, width]);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(metrics, d => Math.max(
            d.rubyCode,
            d.testCode,
            d.templates,
            d.migrations
        )) * 1.1])
        .nice()
        .range([height, 0]);
    
    // Add grid lines
    g.append('g')
        .attr('class', 'grid')
        .attr('opacity', 0.1)
        .call(d3.axisLeft(y)
            .tickSize(-width)
            .tickFormat('')
        );
    
    const lineColors = {
        rubyCode: '#CC0000',     // Ruby red
        testCode: '#4CAF50',     // Green
        templates: '#2196F3',    // Blue
        migrations: '#FF9800'     // Orange
    };
    
    // Add lines for each metric
    Object.entries(lineColors).forEach(([metric, color]) => {
        g.append('path')
            .datum(metrics)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', 2.5)
            .attr('d', d3.line()
                .x(d => x(d.date))
                .y(d => y(d[metric]))
            );
    });
    
    // Add axes
    const xAxis = d3.axisBottom(x)
        .ticks(6)
        .tickFormat(d3.timeFormat('%b %Y'));
    
    const yAxis = d3.axisLeft(y)
        .ticks(8)
        .tickFormat(d => d.toLocaleString());
    
    g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis)
        .style('font-size', '12px')
        .style('font-family', 'Arial, sans-serif')
        .call(g => g.select('.domain').attr('stroke-width', 2));
    
    g.append('g')
        .call(yAxis)
        .style('font-size', '12px')
        .style('font-family', 'Arial, sans-serif')
        .call(g => g.select('.domain').attr('stroke-width', 2));
    
    // Add axis labels
    g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left + 20)
        .attr('x', -height / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('font-family', 'Arial, sans-serif')
        .style('font-weight', 'bold')
        .text('Lines of Code');
    
    g.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom - 10)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('font-family', 'Arial, sans-serif')
        .style('font-weight', 'bold')
        .text('Date');
    
    // Add title
    g.append('text')
        .attr('x', width / 2)
        .attr('y', -margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('font-family', 'Arial, sans-serif')
        .style('font-weight', 'bold')
        .text('Rails Application Code Metrics');
    
    // Add legend
    const legend = g.append('g')
        .attr('font-family', 'Arial, sans-serif')
        .attr('font-size', '12px')
        .attr('text-anchor', 'start')
        .selectAll('g')
        .data([
            ['Ruby Code', 'rubyCode'],
            ['Test Code', 'testCode'],
            ['Templates', 'templates'],
            ['Migrations', 'migrations']
        ])
        .join('g')
        .attr('transform', (d, i) => `translate(${width + 10},${i * 25})`);

    legend.append('rect')
        .attr('x', 0)
        .attr('width', 19)
        .attr('height', 19)
        .attr('fill', d => lineColors[d[1]]);

    legend.append('text')
        .attr('x', 24)
        .attr('y', 9.5)
        .attr('dy', '0.32em')
        .text(d => d[0]);
    
    const svgString = document.body.innerHTML;
    await fs.promises.writeFile('metrics.svg', svgString);
    
    await git.checkout('main');
}

generateMetrics().catch(console.error);
