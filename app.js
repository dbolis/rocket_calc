//Global values

let massFlowRate
let C_star
let Cf


//Grab HTML
const mdot_ThrustBtn = document.getElementById("mdot_ThrustBtn")
const mdot_ThrustIn = document.getElementById("mdot_ThrustIn")
const mdot_ThrustBox = document.getElementById("mdot_ThrustBox")
const mdot_ThrustRange = document.getElementById("mdot_ThrustRange")


// Event listeners
mdot_ThrustIn.addEventListener('input', function(e){
  mdot_ThrustRange.value = e.target.value
})

mdot_ThrustRange.addEventListener('input', function(e){
  mdot_ThrustIn.value = e.target.value
})


// document.getElementById('massFlowRate').addEventListener('keyup',function(e){
//   massFlowRate = parseFloat(document.getElementById('massFlowRate').value)
//   console.log(massFlowRate)
//   updateEQs()
  
// })
// document.getElementById('C_star').addEventListener('keyup',function(e){
//   C_star = parseFloat(document.getElementById('C_star').value)
//   console.log(C_star)
// })
// document.getElementById('Cf').addEventListener('keyup',function(e){
//   Cf = parseFloat(document.getElementById('Cf').value)
  
// })


// // Equations
// function updateEQs(){
//   thrust = massFlowRate*C_star*Cf
//   console.log(thrust)
// }

