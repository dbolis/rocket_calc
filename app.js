//Global values
let F = 0// [N]
let Isp = 0// [s]
let mdot = 0// [kg/s]
let cstar = 0// [m/s]
let cf = 0// []
let g0 = 9.81 // [m/s^2]

runEqsUp() //Load initial 0 values
var decimals = 3 //Project wide decimals why only var works??

/// Grab HTML ///
 
// mdot_Thrust 
const mdot_ThrustBtn = document.getElementById("mdot_ThrustBtn")
const mdot_ThrustIn = document.getElementById("mdot_ThrustIn")
const mdot_ThrustBox = document.getElementById("mdot_ThrustBox")
const mdot_ThrustRange = document.getElementById("mdot_ThrustRange")

// cstar_Thrust 
const cstar_ThrustBtn = document.getElementById("cstar_ThrustBtn")
const cstar_ThrustIn = document.getElementById("cstar_ThrustIn")
const cstar_ThrustBox = document.getElementById("cstar_ThrustBox")
const cstar_ThrustRange = document.getElementById("cstar_ThrustRange")

// cf_Thrust
const cf_ThrustBtn = document.getElementById("cf_ThrustBtn")
const cf_ThrustIn = document.getElementById("cf_ThrustIn")
const cf_ThrustBox = document.getElementById("cf_ThrustBox")
const cf_ThrustRange = document.getElementById("cf_ThrustRange")


// Card Results
const fRes = document.getElementById("fRes").firstChild
const ispRes = document.getElementById("ispRes").firstChild



/// Event listeners ///

// mdot_Thrust
mdot_ThrustIn.addEventListener('input', function(e){
  mdot_ThrustRange.value = e.target.value
  mdot = parseFloat(e.target.value).toFixed(decimals)
  runFuncs()
})

mdot_ThrustRange.addEventListener('input', function(e){
  mdot_ThrustIn.value = e.target.value
  mdot = parseFloat(e.target.value)
  runFuncs()    
})

// cstar_Thrust 
cstar_ThrustIn.addEventListener('input', function(e){
  cstar_ThrustRange.value = e.target.value
  cstar = parseFloat(e.target.value)
  runFuncs()
})

cstar_ThrustRange.addEventListener('input', function(e){
  cstar_ThrustIn.value = e.target.value
  cstar = parseFloat(e.target.value)   
  runFuncs() 
})

// cf_Thrust 
cf_ThrustIn.addEventListener('input', function(e){
  cf_ThrustRange.value = e.target.value
  cf = parseFloat(e.target.value)
  runFuncs()
})

cf_ThrustRange.addEventListener('input', function(e){
  cf_ThrustIn.value = e.target.value
  cf = parseFloat(e.target.value)
  runFuncs()  
})


function runFuncs() {
  runEqsUp()
  updateRes()
}






function runEqsUp() {

  
  //Level 1
  F = Math.round((mdot*cf*cstar)*100)/100 //Thrust
  Isp = Math.round((cf*cstar/g0)*100)/100 //Isp

}


function updateRes() {

fRes.innerHTML = `F = ${F} [kN]` 
ispRes.innerHTML = `I<sub>sp</sub> = ${Isp} [s]`
}
