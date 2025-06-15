<template>
  <div>
    <v-chart :option="chartOption" style="height: 400px;" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getHistoryData } from '../api/influx';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent, DatasetComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';

echarts.use([LineChart, TitleComponent, TooltipComponent, GridComponent, DatasetComponent, CanvasRenderer]);

const chartOption = ref({});

onMounted(async () => {
  const rawData = await getHistoryData();
  const timestamps = rawData.map(item => item._time);
  const temperatures = rawData.map(item => item._field === 'temperature' ? item._value : null);

  chartOption.value = {
    title: { text: 'Temperature Over Time' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: timestamps },
    yAxis: { type: 'value' },
    series: [{ data: temperatures, type: 'line', smooth: true }]
  };
});
</script>
