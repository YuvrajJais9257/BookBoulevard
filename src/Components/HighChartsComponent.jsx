import React, { useEffect, useState } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Drilldown from "highcharts/modules/drilldown";

Drilldown(Highcharts);

const HighChartsComponent = () => {
  const [chartData, setChartData] = useState(null);

  const openNewWindow = (drilldownData) => {
    // Open a new window
    const newWindow = window.open("", "_blank", "width=500,height=400");

    // Write HTML content to the new window
    newWindow.document.write(`
    <html>
      <head>
        <title>${drilldownData.name}</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h3>${drilldownData.name}</h3>
        <table>
          <thead>
            <tr>
              ${drilldownData.data
                .map((item) => `<th>${item[0]}</th>`)
                .join("")}
            </tr>
          </thead>
          <tbody>
            <tr>
              ${drilldownData.data
                .map((item) => {
                  const value = Array.isArray(item[1])
                    ? item[1].join(", ")
                    : item[1];
                  return `<td>${value}</td>`;
                })
                .join("")}
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `);

    // Close the document stream
    newWindow.document.close();
  };
  const seriesData = {
    series: [
      {
        data: [
          "abhishekh@gmail.com",
          "piyush@gmail.com",
          "subham@gmail.com",
          "test@erasmith.com",
        ],
        name: "user_email_id",
      },
      {
        data: [
          "$2b$12$OchCao5XxVOYmd/1GV19FOnHzGQO3VRD1djnjkHO5uuyXhul0QJG.",
          "$2b$12$OchCao5XxVOYmd/1GV19FOnHzGQO3VRD1djnjkHO5uuyXhul0QJG.",
          "$2b$12$OchCao5XxVOYmd/1GV19FOnHzGQO3VRD1djnjkHO5uuyXhul0QJG.",
          "$2b$12$tZqxLuLkks/uqpqJcjsySO4sui5tdvSMwd/zcJZW9S3IBw5IUOR2m",
        ],
        name: "password",
      },
      {
        data: [1, 1, 1, 1],
        name: "customer_id",
      },
      {
        data: [2, 1, 9, 1],
        name: "group_id",
      },
      {
        data: ["Active", "Active", "Active", "Active"],
        name: "user_status",
      },
      {
        data: ["N", "N", "N", "N"],
        name: "user_logged_ind",
      },
      {
        data: [
          "2024-02-27T13:34:06",
          "2024-02-21T22:50:12",
          "2024-02-22T10:08:14",
          "2024-01-31T13:18:14",
        ],
        name: "user_creation_date",
      },
    ],
    title: "newreporttest",
    tooltip: {
      shared: true,
    },
    xAxis: [
      {
        categories: ["1", "2", "3", "4", "5"],
        crosshair: "true",
      },
    ],
    yAxis: [
      {
        min: 0,
        title: {
          text: "Values",
        },
      },
      {
        opposite: true,
        title: {
          text: "Time",
        },
      },
    ],
    chart_type: "column",
    report_type: "chart",
  };

  // Initialize an empty array to store the objects
  const dataArray = [];

  // Get the length of the data arrays (assuming they all have the same length)
  const dataLength = seriesData.series[0].data.length;

  // Iterate over each row of data
  for (let i = 0; i < dataLength; i++) {
    // Initialize an empty object for the current row
    const rowData = {};

    // Iterate through each series to populate the object with the current row's data
    seriesData.series.forEach((series) => {
      // Get the current series name and its corresponding data for this row
      const seriesName = series.name;
      const seriesDataForRow = series.data[i];

      // Add the series data to the row object
      rowData[seriesName] = seriesDataForRow;
    });

    // Push the row object to the array
    dataArray.push(rowData);
  }

  console.log(dataArray);

  const newArray1 = [];
  const newArray2 = [];

  // Iterate over each object in dataArray
  dataArray.forEach((item) => {
    // Check if the 'user_email_id' exists in the current item
    if (item.hasOwnProperty("user_email_id")) {
      // Construct the object for the first criteria
      const newObj1 = {
        name: item.user_email_id,
        y: item.group_id,
        drilldown: item.user_email_id,
      };
      // Push newObj1 to the newArray
      newArray1.push(newObj1);

      // Construct the object for the second criteria
      const newObj2 = {
        name: item.user_email_id,
        id: item.user_email_id,
        data: Object.entries(item).map(([key, value]) => {
          return [key, typeof value === "string" ? value : [value]];
        }),
      };
      // Push newObj2 to the newArray
      newArray2.push(newObj2);
    }
  });

  console.log(newArray1);
  console.log(newArray2);
  console.log(JSON.stringify(newArray2));

  // Options for the Highcharts chart
  const options = {
    chart: {
      type: "column",
      events: {
        drilldown: (event) => {
          // Find the drilldown data for the clicked bar
          console.log(event);
          console.log(options);

          const drilldownData = newArray2.find((series) => {
            console.log(series);

            if (series.name == event.point.drilldown) return series;
          });

          // Open a new window with the drilldown data
          console.log(drilldownData, "drilldown");
          openNewWindow(drilldownData);
        },
        drillup: () => {
          // Clear the active drilldown data when drilling up
        },
      },
    },
    title: {
      align: "left",
      text: "Browser market shares. January, 2022",
    },
    subtitle: {
      align: "left",
      text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Total percent market share",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y:.1f}%",
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
    },
    series: [
      {
        name: "Browsers",
        colorByPoint: true,
        data: newArray1,
      },
    ],
    drilldown: {
      breadcrumbs: {
        position: {
          align: "right",
        },
      },
      series: newArray1,
    },
  };

  return (
    <div id="chart-container" className="container-fluid">
      <div id="chart-display-container">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default HighChartsComponent;
