//Global values

let massFlowRate
let C_star
let Cf



// Event listeners
document.getElementById('massFlowRate').addEventListener('keyup',function(e){
  massFlowRate = parseFloat(document.getElementById('massFlowRate').value)
  console.log(massFlowRate)
  updateEQs()
  
})
document.getElementById('C_star').addEventListener('keyup',function(e){
  C_star = parseFloat(document.getElementById('C_star').value)
  console.log(C_star)
})
document.getElementById('Cf').addEventListener('keyup',function(e){
  Cf = parseFloat(document.getElementById('Cf').value)
  
})


// Equations
function updateEQs(){
  thrust = massFlowRate*C_star*Cf
  console.log(thrust)
}

