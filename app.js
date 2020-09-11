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

const mdot_ThrustBox = document.getElementById("mdot_ThrustBox")


// cstar_Thrust 
const cstar_ThrustBtn = document.getElementById("cstar_ThrustBtn")

const cstar_ThrustBox = document.getElementById("cstar_ThrustBox")


// cf_Thrust
const cf_ThrustBtn = document.getElementById("cf_ThrustBtn")

const cf_ThrustBox = document.getElementById("cf_ThrustBox")




/// Event listeners ///

// mdot_Thrust
document.getElementById("mdot_ThrustIn").addEventListener('input', function(e){
  mdot_ThrustRange.value = e.target.value
  // mdot = parseFloat(e.target.value)
  let mdot = assignValue(e.target.value,[0,10])
  // mdot_ThrustRange.value = mdot
  mdot_ThrustIn.value = mdot
  runFuncs()
})

document.getElementById("mdot_ThrustRange").addEventListener('input', function(e){
  mdot_ThrustIn.value = e.target.value
  mdot = assignValue(e.target.value,[0,10])
  runFuncs()    
})

// cstar_Thrust 
document.getElementById("cstar_ThrustIn").addEventListener('input', function(e){
  cstar_ThrustRange.value = e.target.value
  cstar = assignValue(e.target.value,[0,10])
  runFuncs()
})

document.getElementById("cstar_ThrustRange").addEventListener('input', function(e){
  cstar_ThrustIn.value = e.target.value
  cstar = assignValue(e.target.value,[0,10])   
  runFuncs() 
})

// cf_Thrust 
document.getElementById("cf_ThrustIn").addEventListener('input', function(e){
  cf_ThrustRange.value = e.target.value
  cf = assignValue(e.target.value,[0,10])
  runFuncs()
})

document.getElementById("cf_ThrustRange").addEventListener('input', function(e){
  cf_ThrustIn.value = e.target.value
  cf = assignValue(e.target.value,[0,10])
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
  
  const fRes = document.getElementById("fRes").firstChild
  const ispRes = document.getElementById("ispRes").firstChild


  if (isNaN(F)) {
    fRes.innerHTML=`Math Error`
  } else {
    fRes.innerHTML = `F = ${F} [N]` 
  }

  ispRes.innerHTML = `I<sub>sp</sub> = ${Isp} [s]`
}  


function assignValue(value, range) {
  if (value ==""){
    return ""
  } else if(value=="-") {
    return 0
    // function warning to give message change field to 0
  } else if(parseFloat(value)<range[0] || parseFloat(value)>range[1]) {
    //function warning
    return range[1]
  } else {
    return parseFloat(value)
  }

}
