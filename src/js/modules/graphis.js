// function graphis() {
//     let bgArr = [];
//     let costArr = [];
//     if (localStorage.getItem("categories")) {
//         let arrOfCategories = JSON.parse(localStorage.getItem("categories"));
        
//         arrOfCategories.forEach(item => {
//             bgArr.push(item.bg);
//             costArr.push(item.cost);
//         })
//     }

//     const ctx = document.getElementById('myChart');
      
//     new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             datasets: [{
//                 data: [...costArr],
//                 backgroundColor: [...bgArr],
//                 borderWidth: 1,
//             }]
//         },
//     });
// }

// export default graphis;


