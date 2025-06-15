// Common ECharts configuration helper

export const getLineChartOptions = (title, xData, yData) => {
    return {
        title: { text: title },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: xData },
        yAxis: { type: 'value' },
        series: [{ data: yData, type: 'line', smooth: true }]
    };
};
