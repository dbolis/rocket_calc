//Global values
// let F = 0// [N]
// let Isp = 0// [s]
// let mdot = 0// [kg/s]
// let cstar = 0// [m/s]
// let cf = 0// []
// let g0 = 9.81 // [m/s^2]

let vals = {
  F: 0, // [N]
  Isp: 0, // [s]
  mdot: 0, // [kg/s]
  cstar: 0, // [m/s]
  cf: 0, // []
  g0: 9.81 // [m/s^2]

  }


runEqsUp() //Load initial 0 values


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
  document.getElementById("mdot_ThrustRange").value = e.target.value
  vals.mdot = assignValue(e.target.value,[5,100])
  runFuncs()
})

document.getElementById("mdot_ThrustRange").addEventListener('input', function(e){
  document.getElementById("mdot_ThrustIn").value = e.target.value
  vals.mdot = assignValue(e.target.value,[0,100])
  runFuncs()    
})

// cstar_Thrust 
document.getElementById("cstar_ThrustIn").addEventListener('input', function(e){
  document.getElementById("cstar_ThrustRange").value = e.target.value
  vals.cstar = assignValue(e.target.value,[0,100])
  runFuncs()
})

document.getElementById("cstar_ThrustRange").addEventListener('input', function(e){
  document.getElementById("cstar_ThrustIn").value = e.target.value
  vals.cstar = assignValue(e.target.value,[0,100])   
  runFuncs() 
})

// cf_Thrust 
document.getElementById("cf_ThrustIn").addEventListener('input', function(e){
  document.getElementById("cf_ThrustRange").value = e.target.value
  vals.cf = assignValue(e.target.value,[0,100])
  runFuncs()
})

document.getElementById("cf_ThrustRange").addEventListener('input', function(e){
  document.getElementById("cf_ThrustIn").value = e.target.value
  vals.cf = assignValue(e.target.value,[0,100])
  runFuncs()  
})


function runFuncs() {
  runEqsUp()
  updateRes()
}






function runEqsUp() {

  //Level 1
  vals.F = Math.round((vals.mdot*vals.cf*vals.cstar)*100)/100 //Thrust
  vals.Isp = Math.round((vals.cf*vals.cstar/vals.g0)*100)/100 //Isp

}


function updateRes() {
  
  const fRes = document.getElementById("fRes").firstChild
  const ispRes = document.getElementById("ispRes").firstChild

  /// update result boxes ///

  if (isNaN(vals.F)) {
    fRes.innerHTML=`Math Error`
  } else {
    fRes.innerHTML = `F = ${vals.F} [N]` 
  }

  ispRes.innerHTML = `I<sub>sp</sub> = ${vals.Isp} [s]`



  /// update fields ///

  //mdot
  document.getElementById("mdot_ThrustRange").value = vals.mdot
  document.getElementById("mdot_ThrustIn").value = vals.mdot

  
}  


function assignValue(value, range) {
  console.log(value)
  if (value == ""){
    return ""
  } else if(parseFloat(value)>range[1]) {
    //function warning too high 
    errorMessage()
    return range[1]
  } else if (parseFloat(value)<range[0]) {
    // functino warning too low
    return range[0]
  } else {
    return parseFloat(value)
  }

}

// function errorMessage() {
//   setTimeout(function(){
//     document.getElementById()
//   })
//   document.getElementById('badge').innerHTML="10 is too high"
// }