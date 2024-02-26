
import { callApi } from "./fetch.js"

let magnitudes = [];
let georeferencia = [];

const backroundRedColor = 'rgba(255, 99, 132, 0.2)';
const backroundOrangeColor = 'rgba(255, 159, 64, 0.2)';

const borderRedColor = 'rgb(255, 99, 132)';
const borderOrangeColor = 'rgb(255, 159, 64)';



//llamo callApi desde archivo fetch.js
const getData = async () => {
    const earthquake = await callApi('https://api.gael.cloud/general/public/sismos');
    console.log('arreglo original es: ', earthquake);

    magnitudes = earthquake.map (earthquake => earthquake.Magnitud);
    
    georeferencia = earthquake.map (earthquake => earthquake.RefGeografica)
    
    const backroundColors = magnitudes.map(magnitude  => magnitude > 3 ?  backroundRedColor: backroundOrangeColor);
    console.log(backroundColors);
    const borderColors = magnitudes.map(magnitude => magnitude > 3 ? borderRedColor : borderOrangeColor);
    console.log (borderColors);
    

    //copie y pegue desde https://www.chartjs.org/docs/latest/getting-started/

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: georeferencia,
          datasets: [{
            label: 'Magnitud', 
            data: magnitudes,
            backgroundColor: backroundColors,
            borderColor:  borderColors,
            borderWidth: 1
          }]
        },
        options: {
            scales: {
                
                y: {
                    beginAtZero: true
                }
            },
        plugins: {
             title: {
                display: true,
                 text: 'Magnitud de sismos en Chile'
    },
        tooltip:{
            callbacks: {
                label: function (context){
                    let label = context.dataset.label || '';

                    if(label){
                        label += `: `;
                    }
                    if (context.parsed.y != null){
                        label += context.parsed.y + '°';
                    };
                    return label
                }
            }
        }
            }

        }
    });


}
getData();