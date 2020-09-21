//Global values
// let F = 0// [N]
// let Isp = 0// [s]
// let mdot = 0// [kg/s]
// let cstar = 0// [m/s]
// let cf = 0// []
// let g0 = 9.81 // [m/s^2]

/// Note: keeping values as string so 0.01 is a possible input. Converted to numbers for calcs

let vals = {
  F: "0", // [N]
  Isp: "0", // [s]
  mdot: "0", // [kg/s]
  cstar: "0", // [m/s]
  cf: "0", // []
  g0: "9.81", // [m/s^2]
  Gamma: "1.7",
  gamma: "2", // []
  P0: "1", // [bar]
  At: "0", // [m] 
  T0: "5", // [K]
  Ae: "0", // [m^2]
  Pa: "0.5", // [bar]
  R: "5", // [?]
  M: "5",
  PeP0: ".6",
  PaP0: ".6",
  AeAt: "5" // [kg/?]
  }


runEqsUp() //Load initial 0 values
updateRes()


/// Event listeners ///

// mdot_Thrust
document.getElementById("mdot_ThrustIn").addEventListener('input', function(e){
  document.getElementById("mdot_ThrustRange").value = e.target.value // attach to range
  vals.mdot = assignValue(e.target.value,[0,10000], "mdot_ThrustIn") // assignValue(user input value, allowable range, for error message)
  if(vals.mdot!==""){ // dont do anything until a real number is entered ("" - + e don't execute runFuncs)
    runFuncs("mdot") 
  }
})

document.getElementById("mdot_ThrustRange").addEventListener('input', function(e){
  document.getElementById("mdot_ThrustIn").value = e.target.value // attach to input field
  vals.mdot = assignValue(e.target.value,[0,10000], "mdot_ThrustIn") // assignValue(user input value, allowable range, for error message html handle)
  runFuncs("mdot")

})

// cstar_Thrust 
document.getElementById("cstar_ThrustIn").addEventListener('input', function(e){
  document.getElementById("cstar_ThrustRange").value = e.target.value
  vals.cstar = assignValue(e.target.value,[0,10000], "cstar_ThrustIn")
  if(vals.cstar!==""){
    runFuncs("cstar")
  }
})

document.getElementById("cstar_ThrustRange").addEventListener('input', function(e){
  document.getElementById("cstar_ThrustIn").value = e.target.value
  vals.cstar = assignValue(e.target.value,[0,10000], "cstar_ThrustIn")   
  runFuncs("cstar") 
})

// cf_Thrust 
document.getElementById("cf_ThrustIn").addEventListener('input', function(e){
  document.getElementById("cf_ThrustRange").value = e.target.value
  vals.cf = assignValue(e.target.value,[0,CfBound()],"cf_ThrustIn")
  if(vals.cf!==""){
    runFuncs("cf")
  }
})

document.getElementById("cf_ThrustRange").addEventListener('input', function(e){
  document.getElementById("cf_ThrustIn").value = e.target.value
  vals.cf = assignValue(e.target.value,[0,CfBound()],"cf_ThrustIn")
  runFuncs("cf")  
})

// Gamma_mdot
document.getElementById("Gamma_mdotIn").addEventListener('input', function(e){
  document.getElementById("Gamma_mdotRange").value = e.target.value
  vals.Gamma = assignValue(e.target.value,[0,10000],"Gamma_mdotIn")
  if(vals.Gamma!==""){
    runFuncs()
  }
})

document.getElementById("Gamma_mdotRange").addEventListener('input', function(e){
  document.getElementById("Gamma_mdotIn").value = e.target.value
  vals.Gamma = assignValue(e.target.value,[0,10000],"Gamma_mdotIn")
  runFuncs()  
})

// P0_mdot
document.getElementById("p0_mdotIn").addEventListener('input', function(e){
  document.getElementById("p0_mdotRange").value = e.target.value
  vals.P0 = assignValue(e.target.value,[0,10000],"p0_mdotIn")
  if(vals.P0!==""){
    runFuncs()
  }
})

document.getElementById("p0_mdotRange").addEventListener('input', function(e){
  document.getElementById("p0_mdotIn").value = e.target.value
  vals.P0 = assignValue(e.target.value,[0,10000],"p0_mdotIn")
  runFuncs()  
})

// At_mdot
document.getElementById("At_mdotIn").addEventListener('input', function(e){
  document.getElementById("At_mdotRange").value = e.target.value
  vals.At = assignValue(e.target.value,[0,10000],"At_mdotIn")
  if(vals.At!==""){
    runFuncs()
  }
})

document.getElementById("At_mdotRange").addEventListener('input', function(e){
  document.getElementById("At_mdotIn").value = e.target.value
  vals.At = assignValue(e.target.value,[0,10000],"At_mdotIn")
  runFuncs()  
})

// M_mdot
document.getElementById("M_mdotIn").addEventListener('input', function(e){
  document.getElementById("M_mdotRange").value = e.target.value
  vals.M = assignValue(e.target.value,[0,10000],"M_mdotIn")
  if(vals.M!==""){
    runFuncs()
  }
})

document.getElementById("M_mdotRange").addEventListener('input', function(e){
  document.getElementById("M_mdotIn").value = e.target.value
  vals.M = assignValue(e.target.value,[0,10000],"M_mdotIn")
  runFuncs()  
})

// T0_mdot
document.getElementById("T0_mdotIn").addEventListener('input', function(e){
  document.getElementById("T0_mdotRange").value = e.target.value
  vals.T0 = assignValue(e.target.value,[0,10000],"T0_mdotIn")
  if(vals.T0!==""){
    runFuncs()
  }
})

document.getElementById("T0_mdotRange").addEventListener('input', function(e){
  document.getElementById("T0_mdotIn").value = e.target.value
  vals.T0 = assignValue(e.target.value,[0,10000],"T0_mdotIn")
  runFuncs()  
})

// Ae_Ae
document.getElementById("Ae_AeIn").addEventListener('input', function(e){
  document.getElementById("Ae_AeRange").value = e.target.value
  vals.Ae = assignValue(e.target.value,[0,10000],"Ae_AeIn")
  runFuncs()
})

document.getElementById("Ae_AeRange").addEventListener('input', function(e){
  document.getElementById("Ae_AeIn").value = e.target.value
  vals.Ae = assignValue(e.target.value,[0,10000],"Ae_AeIn")
  runFuncs()  
})

// Ae_At
document.getElementById("At_AeIn").addEventListener('input', function(e){
  document.getElementById("At_AeRange").value = e.target.value
  vals.At = assignValue(e.target.value,[0,10000],"At_AeIn")
  runFuncs()
})

document.getElementById("At_AeRange").addEventListener('input', function(e){
  document.getElementById("At_AeIn").value = e.target.value
  vals.At = assignValue(e.target.value,[0,10000],"At_AeIn")
  runFuncs()  
})

// Pa_P0
document.getElementById("pa_p0In").addEventListener('input', function(e){
  document.getElementById("pa_p0Range").value = e.target.value
  vals.Pa = assignValue(e.target.value,[0,10000],"pa_p0In")
  runFuncs()
})

document.getElementById("pa_p0Range").addEventListener('input', function(e){
  document.getElementById("pa_p0In").value = e.target.value
  vals.Pa = assignValue(e.target.value,[0,10000],"pa_p0In")
  runFuncs()  
})

// P0_P0
document.getElementById("p0_p0In").addEventListener('input', function(e){
  document.getElementById("p0_p0Range").value = e.target.value
  vals.P0 = assignValue(e.target.value,[0,10000],"pa_p0In")
  runFuncs()
})

document.getElementById("p0_p0Range").addEventListener('input', function(e){
  document.getElementById("p0_p0In").value = e.target.value
  vals.P0 = assignValue(e.target.value,[0,10000],"p0_p0In")
  runFuncs()  
})

// Gamma_cstar
document.getElementById("Gamma_cstarIn").addEventListener('input', function(e){
  document.getElementById("Gamma_cstarRange").value = e.target.value
  vals.Gamma = assignValue(e.target.value,[0,10000],"Gamma_cstarIn")
  if(vals.Gamma!==""){
    runFuncs()
  }
})

document.getElementById("Gamma_cstarRange").addEventListener('input', function(e){
  document.getElementById("Gamma_cstarIn").value = e.target.value
  vals.Gamma = assignValue(e.target.value,[0,10000],"Gamma_cstarIn")
  runFuncs()  
})

// M_cstar
document.getElementById("M_cstarIn").addEventListener('input', function(e){
  document.getElementById("M_cstarRange").value = e.target.value
  vals.M = assignValue(e.target.value,[0,10000],"M_cstarIn")
  if(vals.M!==""){
    runFuncs()
  }
})

document.getElementById("M_cstarRange").addEventListener('input', function(e){
  document.getElementById("M_cstarIn").value = e.target.value
  vals.M = assignValue(e.target.value,[0,10000],"M_cstarIn")
  runFuncs()  
})

// T0_cstar
document.getElementById("T0_cstarIn").addEventListener('input', function(e){
  document.getElementById("T0_cstarRange").value = e.target.value
  vals.T0 = assignValue(e.target.value,[0,10000],"T0_cstarIn")
  if(vals.T0!==""){
    runFuncs()
  }
})

document.getElementById("T0_cstarRange").addEventListener('input', function(e){
  document.getElementById("T0_cstarIn").value = e.target.value
  vals.T0 = assignValue(e.target.value,[0,10000],"T0_cstarIn")
  runFuncs()  
})

// Gamma_cf
document.getElementById("Gamma_cfIn").addEventListener('input', function(e){
  document.getElementById("Gamma_cfRange").value = e.target.value
  vals.Gamma = assignValueGamma(e.target.value,[0.609,0.77],"Gamma_cfIn",0.61)
  if(vals.Gamma!=="" && vals.Gamma>0.609){
    runFuncs("Gamma")
  }
})

document.getElementById("Gamma_cfRange").addEventListener('input', function(e){
  document.getElementById("Gamma_cfIn").value = e.target.value
  vals.Gamma = assignValueGamma(e.target.value,[0.609,0.77],"Gamma_cfIn",0.61)
  runFuncs("Gamma")  
})

// gamma_cf
document.getElementById("gamma_cfIn").addEventListener('input', function(e){
  document.getElementById("gamma_cfRange").value = e.target.value
  vals.gamma = assignValuegamma(e.target.value,[1,2],"gamma_cfIn",1)
  if(vals.gamma!==""){
    runFuncs("gamma")
  }
})

document.getElementById("gamma_cfRange").addEventListener('input', function(e){
  document.getElementById("gamma_cfIn").value = e.target.value
  vals.gamma = assignValuegamma(e.target.value,[1.01,2],"gamma_cfIn",1)
  runFuncs("gamma")  
})

// Pe/P0_cf
document.getElementById("Pe/_cfIn").addEventListener('input', function(e){
  document.getElementById("Pe/_cfRange").value = e.target.value
  vals.PeP0 = assignValue(e.target.value,[0,10000],"Pe/_cfIn")
  if(vals.PeP0!==""){
    runFuncs("PeP0")
  }
})

document.getElementById("Pe/_cfRange").addEventListener('input', function(e){
  document.getElementById("Pe/_cfIn").value = e.target.value
  vals.PeP0 = assignValue(e.target.value,[0,10000],"Pe/_cfIn")
  runFuncs("PeP0")  
})

// Pa/P0_cf
document.getElementById("Pa/_cfIn").addEventListener('input', function(e){
  document.getElementById("Pa/_cfRange").value = e.target.value
  vals.PaP0 = assignValue(e.target.value,[0,10000],"Pa/_cfIn")
  if(vals.PaP0!==""){
    runFuncs("Pa")
  }
})

document.getElementById("Pa/_cfRange").addEventListener('input', function(e){
  document.getElementById("Pa/_cfIn").value = e.target.value
  vals.PaP0 = assignValue(e.target.value,[0,10000],"Pa/_cfIn")
  runFuncs("Pa")  
})

// Ae/At_cf
document.getElementById("Ae/_cfIn").addEventListener('input', function(e){
  document.getElementById("Ae/_cfRange").value = e.target.value
  vals.AeAt = assignValue(e.target.value,[1,10000],"Ae/_cfIn")
  if(vals.AeAt!==""){
    runFuncs()
  }
})

document.getElementById("Ae/_cfRange").addEventListener('input', function(e){
  document.getElementById("Ae/_cfIn").value = e.target.value
  vals.AeAt = assignValue(e.target.value,[1,10000],"Ae/_cfIn")
  runFuncs()  
})

/// CheckBox Event Listeners - Check Equal Boxes ///
document.getElementById("p0_mdotBox").addEventListener('input',function(e){
  checkSameBoxes("mdot") // let checkSameBoxes function know which box is checked
  e.target.checked=true
})
document.getElementById("At_mdotBox").addEventListener('input',function(e){
  checkSameBoxes("mdot")
  e.target.checked=true
})
document.getElementById("T0_mdotBox").addEventListener('input',function(e){
  checkSameBoxes("mdot") 
  e.target.checked=true
})
document.getElementById("M_mdotBox").addEventListener("input",function(e){
  checkSameBoxes("mdot")
  e.target.checked=true
})
document.getElementById("T0_cstarBox").addEventListener('input',function(e){
  checkSameBoxes("cstar")
  e.target.checked=true
})
document.getElementById("M_cstarBox").addEventListener('input',function(e){
  checkSameBoxes("cstar")
  e.target.checked=true
})
document.getElementById("Pe/_cfBox").addEventListener('input',function(e){
  checkSameBoxes("cf")
  e.target.checked=true
  document.getElementById("Ae/_cfBox").checked=true
})
document.getElementById("Pa/_cfBox").addEventListener('input',function(e){
  checkSameBoxes("cf")
  e.target.checked=true
})
document.getElementById("Ae/_cfBox").addEventListener('input',function(e){
  checkSameBoxes("cf")
  e.target.checked=true
  document.getElementById("Pe/_cfBox").checked=true
})
document.getElementById("pa_p0Box").addEventListener('input',function(e){
  checkSameBoxes("p0")
  e.target.checked=true
})
document.getElementById("p0_p0Box").addEventListener('input',function(e){
  checkSameBoxes("p0")
  e.target.checked=true
})
document.getElementById("Ae_AeBox").addEventListener('input',function(e){
  checkSameBoxes("Ae_Ae")
})
document.getElementById("At_AeBox").addEventListener('input',function(e){
  checkSameBoxes("At_Ae")
})

/// Molar Mass
document.getElementById("MOxi").addEventListener('input',function(e){
  MolarMass("Oxi")
})
document.getElementById("MFuel").addEventListener('input',function(e){
  MolarMass("Fuel")
})

function runFuncs(branch) {
  
  
  runEqsDown(branch)
  runEqsUp(branch)
  updateRes()
}




/// Function updates EQs from bottom level of EQs to top level (from chamber pressure to Isp) ///
/// Using Number() instead of parseFloat because Number("")=0, not NaN
function runEqsUp(branch) {

  //Level 3
  vals.PaP0 = (Math.round((Number(vals.Pa)/Number(vals.P0))*100)/100).toString()

  //Level 2
  if(branch!=="mdot"){
    vals.mdot = (Math.round((Number(vals.Gamma)*Number(vals.P0)*Number(vals.At)/Math.sqrt(Number(vals.R)*Number(vals.T0)/Number(vals.M)))*100)/100).toString() //mdot
  }
  if(branch!=="cf"){
    vals.cf = (Math.round((Number(vals.Gamma)*Math.sqrt((2*Number(vals.gamma)/(Number(vals.gamma)-1))*(1-Math.pow(Number(vals.PeP0),((Number(vals.gamma)-1)/Number(vals.gamma)))))+(Number(vals.PeP0)-Number(vals.PaP0))*Number(vals.AeAt))*100)/100).toString()
  }
    vals.cstar = (Math.round((1/Number(vals.Gamma))*Math.sqrt((Number(vals.R)*Number(vals.T0))/Number(vals.M))*100)/100).toString() //cstar

  //Level 1
  vals.F = (Math.round((Number(vals.mdot)*Number(vals.cf)*Number(vals.cstar))*100)/100).toString() //Thrust
  vals.Isp = (Math.round((Number(vals.cf)*Number(vals.cstar)/Number(vals.g0))*100)/100).toString() //Isp

}

/// Function updates result boxes and input fields/range///

function updateRes() {
  
  const fRes = document.getElementById("fRes").firstChild
  const IspRes = document.getElementById("ispRes").firstChild
  const mdotRes = document.getElementById("mdotRes").firstChild
  const cstarRes = document.getElementById("cstarRes").firstChild
  const cfRes = document.getElementById("cfRes").firstChild

  /// update result boxes ///

  // F
  if (isNaN(Number(vals.F))) {
    fRes.innerHTML=`Math Error` // executes if 0/0 or sqrt(-1) (1/0 = infinity)
  } else {
    fRes.innerHTML = `F = ${vals.F} [N]` // executes for acceptable values
  }

  // Isp 
  if (isNaN(Number(vals.Isp))) {
    IspRes.innerHTML=`Math Error`
  } else {
    IspRes.innerHTML = `I<sub>sp</sub> = ${vals.Isp} [s]`
  }
  
  // mdot
  if (isNaN(Number(vals.mdot))) {
    mdotRes.innerHTML=`Math Error`
  } else {
    mdotRes.innerHTML = `m&#775; = ${vals.mdot} [kg/s]`
  }

  // Cstar
   if (isNaN(Number(vals.cstar))) {
    cstarRes.innerHTML=`Math Error`
  } else {
    cstarRes.innerHTML = `C* = ${vals.cstar} [m/s]`
  }

  // Cf
  if (isNaN(Number(vals.cf))) {
    cfRes.innerHTML=`Math Error`
  } else {
    cfRes.innerHTML = `C<sub>f</sub> = ${vals.cf}`
  }


  /// update fields and range ///

  //mdot_Thrust
  document.getElementById("mdot_ThrustRange").value = vals.mdot // updates range
  document.getElementById("mdot_ThrustIn").value = vals.mdot // updates field
  //cstar_Thrust
  document.getElementById("cstar_ThrustRange").value = vals.cstar
  document.getElementById("cstar_ThrustIn").value = vals.cstar
  //cf_Thrust
  document.getElementById("cf_ThrustRange").value = vals.cf
  document.getElementById("cf_ThrustIn").value = vals.cf
  //Gamma_mdot
  document.getElementById("Gamma_mdotRange").value = vals.Gamma
  document.getElementById("Gamma_mdotIn").value = vals.Gamma // convert to number to round and back to str
  //P0_mdot
  document.getElementById("p0_mdotRange").value = vals.P0
  document.getElementById("p0_mdotIn").value = vals.P0 // If rounding is done in calcs in runEqsdown, there are rounding errors
  //At_mdot
  document.getElementById("At_mdotRange").value = vals.At
  document.getElementById("At_mdotIn").value = vals.At
  //M_mdot
  document.getElementById("M_mdotRange").value = vals.M
  document.getElementById("M_mdotIn").value = vals.M
  //T0_mdot
  document.getElementById("T0_mdotRange").value = vals.T0
  document.getElementById("T0_mdotIn").value = vals.T0
  //Ae_Ae
  document.getElementById("Ae_AeIn").value = vals.Ae
  document.getElementById("Ae_AeRange").value = vals.Ae
  //At_Ae
  document.getElementById("At_AeIn").value = vals.At
  document.getElementById("At_AeRange").value = vals.At
  //Pa_P0
  document.getElementById("pa_p0In").value = vals.Pa
  document.getElementById("pa_p0Range").value = vals.Pa
  //P0_P0
  document.getElementById("p0_p0In").value = vals.P0
  document.getElementById("p0_p0Range").value = vals.P0
  //T0_cstar
  document.getElementById("T0_cstarIn").value = vals.T0
  document.getElementById("T0_cstarRange").value = vals.T0
  //M_cstar
  document.getElementById("M_cstarIn").value = vals.M
  document.getElementById("M_cstarRange").value = vals.M
  //Gamma_cstar
  document.getElementById("Gamma_cstarIn").value = vals.Gamma
  document.getElementById("Gamma_cstarRange").value = vals.Gamma
  //Gamma_cf
  document.getElementById("Gamma_cfIn").value = vals.Gamma
  document.getElementById("Gamma_cfRange").value = vals.Gamma
  //gamma_cf
  document.getElementById("gamma_cfIn").value = vals.gamma
  document.getElementById("gamma_cfRange").value = vals.gamma
  //PeP0_cf
  document.getElementById("Pe/_cfIn").value = vals.PeP0
  document.getElementById("Pe/_cfRange").value = vals.PeP0
  //PaP0_cf
  document.getElementById("Pa/_cfIn").value = vals.PaP0
  document.getElementById("Pa/_cfRange").value = vals.PaP0
  //AeAt_cf
  document.getElementById("Ae/_cfIn").value = vals.AeAt
  document.getElementById("Ae/_cfRange").value = vals.AeAt
}

function assignValue(value, range, id) {
  console.log(value)
  if (value === "") {
    return ""
  } else if(parseFloat(value)>range[1]) { 
    errorMessage(id, range)
    return range[1].toString()
  } else if (parseFloat(value)<range[0]) {
    errorMessage(id, range)
    return range[0].toString()
  } else {
    return value 
  }

}

function assignValuegamma(value, range, id, specVal) {
  const tag = document.getElementById(id)
  console.log(value)
  if(parseFloat(value) === specVal){
    errorMessageSpecial(id,specVal)
    return value
  } else if(parseFloat(value)>range[1]) { 
    errorMessage(id, range)
    return range[1].toString()
  } else if (parseFloat(value)<range[0]) {
    errorMessage(id, range)
    return range[0].toString()
  } else {
    $(tag).popover('hide')
    return value 
  }
}

function assignValueGamma(value, range, id, specVal) {
  const tag = document.getElementById(id)
  console.log(value)
  if (parseFloat(value) <= range[0]) {
    errorMessageSpecial(id,specVal)
    return value
  } else if(parseFloat(value)>range[1]) { 
    errorMessage(id, range)
    return range[1].toString()
  } else if (parseFloat(value)<range[0]) {
    errorMessage(id, range)
    return range[0].toString()
  } else {
    $(tag).popover('hide')
    return value 
  }
}




function errorMessageSpecial(id, specVal) {
  
  const tag = document.getElementById(id)
  $(tag)[0].dataset.content=`Value must be greater than ${specVal}`
  $(tag).popover('show')

  // setTimeout(function(){
  //   $(tag).popover('hide')
  // }, 2000)
}

function errorMessage(id, range) {
  
  const tag = document.getElementById(id)
  $(tag)[0].dataset.content=`Value must be between ${range[0]} and ${range[1]}`
  $(tag).popover('show')

  setTimeout(function(){
    $(tag).popover('hide')
  }, 2000)
}

function checkSameBoxes(box){
  const P0_mdotBox = document.getElementById("p0_mdotBox")
  const At_mdotBox = document.getElementById("At_mdotBox")
  const T0_mdotBox = document.getElementById("T0_mdotBox")
  const T0_cstarBox = document.getElementById("T0_cstarBox")
  const RM_cstarBox = document.getElementById("M_cstarBox")
  const RM_mdotBox = document.getElementById("M_mdotBox")
  const P0_P0Box = document.getElementById("p0_p0Box")
  const Pa_P0Box = document.getElementById("pa_p0Box")
  const At_AeBox = document.getElementById("At_AeBox")
  const Ae_AeBox = document.getElementById("Ae_AeBox")
  const Pe_cfBox = document.getElementById("Pe/_cfBox")
  const Ae_cfBox = document.getElementById("Ae/_cfBox")
  const Pa_cfBox = document.getElementById("Pa/_cfBox")
  

  // if (box === "T0_mdot"){
  //   T0_cstarBox.checked = T0_mdotBox.checked
  // } else if(box === "T0_cstar"){
  //   T0_mdotBox.checked = T0_cstarBox.checked
  // } else if(box === "P0_mdot"){
  //   P0_P0Box.checked = P0_mdotBox.checked
  // } else if(box === "P0_P0"){
  //   P0_mdotBox.checked = P0_P0Box.checked
  // } else if(box === "At_mdot"){
  //   At_AeBox.checked = At_mdotBox.checked
  // } else if(box === "At_Ae"){
  //   At_mdotBox.checked = At_AeBox.checked
  // } else if(box === "Pe_cf"){
  //   Ae_cfBox.checked=Pe_cfBox.checked
  // } else if(box === "Ae_cf"){
  //   Pe_cfBox.checked=Ae_cfBox.checked
  // } else if(box === "RM_mdot"){
  //   RM_cstarBox.checked=RM_mdotBox.checked
  // } else if(box === "RM_cstar"){
  //   RM_mdotBox.checked=RM_cstarBox.checked
  // }

  // if (box==="T0_mdot" || box==="T0_cstar"){
  //   if(T0_mdotBox.checked===true && P0_mdotBox.checked===true && At_mdotBox.checked===true && RM_mdotBox.checked===true){
  //     RM_mdotBox.checked=false
  //     RM_cstarBox.checked=false
  //   }
  //   if(T0_cstarBox.checked===true && RM_cstarBox.checked===true){
  //     RM_cstarBox.checked=false
  //   }
  // }
  
  // if (box==="P0_mdot" || box==="P0_P0"){
  //   if(T0_mdotBox.checked===true && P0_mdotBox.checked===true && At_mdotBox.checked===true){
  //     At_mdotBox.checked=false
  //     At_AeBox.checked=false
  //   }
  //   if(Pa_P0Box.checked===true && P0_P0Box.checked===true){
  //     Pa_P0Box.checked=false
  //   }
  // }

  // if (box==="At_mdot" || box==="At_Ae"){
  //   if(T0_mdotBox.checked===true && P0_mdotBox.checked===true && At_mdotBox.checked===true){
  //     T0_mdotBox.checked=false
  //     T0_cstarBox.checked=false
  //   }
  //   if(At_AeBox.checked===true && Ae_AeBox.checked===true){
  //     Ae_AeBox.checked=false
  //   }
  // }

  // if (box==="Pa_P0" && P0_P0Box.checked===true && Pa_P0Box.checked===true){
  //   P0_P0Box.checked=false
  //   P0_mdotBox.checked=false
  // }

  // if (box==="Ae_Ae" && Ae_AeBox.checked===true && At_AeBox.checked===true){
  //   At_AeBox.checked=false
  //   At_mdotBox.checked=false
  // }
  
  // if (box==="M_cstar" && M_cstarBox.checked===true && T0_cstarBox.checked===true){
  //   T0_cstarBox.checked=false
  //   T0_mdotBox.checked=false
  // }

  // if ((box==="Pe_cf" || box==="Ae_cf") && Pa_cfBox.checked===true && Ae_cfBox.checked===true){
  //   Pa_cfBox.checked=false
  // }

  // if(box==="Pa_cf" && Pa_cfBox.checked===true && Ae_cfBox.checked===true){
  //   Ae_cfBox.checked=false
  //   Pe_cfBox.checked=false
  // }


  //Mdot Box (One check at a time)
  if (box==="mdot"){
    document.getElementById("p0_mdotBox").checked=false
    document.getElementById("At_mdotBox").checked=false
    document.getElementById("M_mdotBox").checked=false
    document.getElementById("T0_mdotBox").checked=false
  }

  if (box==="cstar"){
    document.getElementById("M_cstarBox").checked=false
    document.getElementById("T0_cstarBox").checked=false
  }
  
  if (box==="cf"){
    document.getElementById("Pe/_cfBox").checked=false
    document.getElementById("Ae/_cfBox").checked=false
    document.getElementById("Pa/_cfBox").checked=false
  }

  if (box==="p0"){
    document.getElementById("pa_p0Box").checked=false
    document.getElementById("p0_p0Box").checked=false
  }

}

function runEqsDown(branch){  
  const P0_mdotBox = document.getElementById("p0_mdotBox")
  const At_mdotBox = document.getElementById("At_mdotBox")
  const T0_mdotBox = document.getElementById("T0_mdotBox")
  const M_mdotBox = document.getElementById("M_mdotBox")
  const T0_cstarBox = document.getElementById("T0_cstarBox")
  const M_cstarBox = document.getElementById("M_cstarBox")
  const P0_P0Box = document.getElementById("p0_p0Box")
  const Pa_P0Box = document.getElementById("pa_p0Box")
  const At_AeBox = document.getElementById("At_AeBox")
  const Ae_AeBox = document.getElementById("Ae_AeBox")
  const Pe_cfBox = document.getElementById("Pe/_cfBox")
  const Ae_cfBox = document.getElementById("Ae/_cfBox")
  const Pa_cfBox = document.getElementById("Pa/_cfBox")
  
  if(branch === "PeP0"){
    numGam = Number(vals.gamma)
    vals.AeAt=Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(vals.PeP0),(2/numGam))*(1-Math.pow(Number(vals.PeP0),((numGam-1)/numGam))))
  }

  if(branch === "Gamma"){
    vals.gamma = (Gamma_to_gamma(Number(vals.Gamma))).toFixed(2)
  }

  if(branch === "gamma"){
    numGam = Number(vals.gamma)
    vals.Gamma = (Math.sqrt(numGam)*Math.pow((2/(numGam+1)),((numGam+1)/(2*(numGam-1))))).toFixed(2)
  }
  if(branch==="mdot" && At_mdotBox.checked===true){
    
    if(Number(vals.P0)===0){
      vals.P0="0.01"
    }
    if(Number(vals.At)===0){
      vals.At="0.01"
    }
    if(Number(vals.T0)===0){
      vals.T0="0.01"
    }
    if(Number(vals.M)===0 || Number(vals.M)===Infinity){
      vals.M="0.01"
    }
    vals.At=(Number(vals.mdot)*Math.sqrt(Number(vals.R)*Number(vals.T0)/Number(vals.M))/(Number(vals.Gamma)*Number(vals.P0))).toFixed(2)
  }

  if(branch==="mdot" && P0_mdotBox.checked===true){
    
    if(Number(vals.P0)===0){
      vals.P0="0.01"
    }
    if(Number(vals.At)===0){
      vals.At="0.01"
    }
    if(Number(vals.T0)===0){
      vals.T0="0.01"
    }
    if(Number(vals.M)===0){
      vals.M="0.01"
    }
      vals.P0=(Number(vals.mdot)*Math.sqrt(Number(vals.R)*Number(vals.T0)/Number(vals.M))/(Number(vals.Gamma)*Number(vals.At))).toFixed(2)
  }

  if(branch==="mdot" && M_mdotBox.checked===true){
    
    if(Number(vals.P0)===0){
      vals.P0="0.01"
    }
    if(Number(vals.At)===0){
      vals.At="0.01"
    }
    if(Number(vals.T0)===0){
      vals.T0="0.01"
    }
    if(Number(vals.M)===0){
      vals.M="0.01"
    }
    vals.M=((Number(vals.T0)*Number(vals.R))/Math.pow(Number(vals.Gamma)*Number(vals.P0)*Number(vals.At)/Number(vals.mdot),2)).toFixed(2)
  }

  if(branch==="mdot" && T0_mdotBox.checked===true){
    
    if(Number(vals.P0)===0){
      vals.P0="0.01"
    }
    if(Number(vals.At)===0){
      vals.At="0.01"
    }
    if(Number(vals.T0)===0){
      vals.T0="0.01"
    }
    if(Number(vals.M)===0 ){
      vals.M="0.01"
    }
    vals.T0=(Math.pow(Number(vals.Gamma)*Number(vals.P0)*Number(vals.At)/Number(vals.mdot),2)*Number(vals.M)/Number(vals.R)).toFixed(2)
  }

  if(branch==="cstar" && T0_cstarBox.checked===true){
    if(Number(vals.M)===0){
      vals.M="0.01"
    }
    if(Number(vals.T0)===0){
      vals.T0="0.01"
    }
    vals.T0=(Number(vals.M)*Math.pow((Number(vals.cstar)*Number(vals.Gamma)),2)/Number(vals.R)).toFixed(2)
  }

  if(branch==="cstar" && M_cstarBox.checked===true){
    if(Number(vals.M)===0){
      vals.M="0.01"
    }
    if(Number(vals.T0)===0){
      vals.T0="0.01"
    }
    vals.M=((Number(vals.T0)*Number(vals.R))/Math.pow((Number(vals.cstar)*Number(vals.Gamma)),2)).toFixed(2)
  }

  if(branch==="cf" && Pa_cfBox.checked===true){
    vals.PaP0=(Number(vals.cf)-Number(vals.Gamma)*Math.sqrt((2*Number(vals.gamma)/(Number(vals.gamma)-1))*(1-Math.pow(Number(vals.PeP0),((Number(vals.gamma)-1)/Number(vals.gamma)))))-Number(vals.PeP0)*Number(vals.AeAt))/(-Number(vals.AeAt))
    if(Pa_P0Box.checked===true){
      vals.Pa=(Number(vals.PaP0)*Number(vals.P0)).toFixed(2)
    }else if(P0_P0Box.checked===true){
      vals.P0=(1/(Number(vals.PaP0)/Number(vals.Pa))).toFixed(2)
    }
  }

  if(branch==="Pa" && Pa_P0Box.checked===true){
    vals.Pa=(Number(vals.PaP0)*Number(vals.P0)).toFixed(2)
  }

  if(branch==="Pa" && P0_P0Box.checked===true){
    vals.P0=(1/(Number(vals.PaP0)/Number(vals.Pa))).toFixed(2)
  }
}

function Gamma_to_gamma(val){
  let x1=1.2
  let x2=1.1
  xc = Math.sqrt(x2)*Math.pow((2/(x2+1)),((x2+1)/(2*(x2-1))))
  while (Math.abs(val-xc)>.001){
    xnp = x2 - (val - Math.sqrt(x2)*Math.pow((2/(x2+1)),((x2+1)/(2*(x2-1)))))/(((val - Math.sqrt(x2)*Math.pow((2/(x2+1)),((x2+1)/(2*(x2-1)))))-(val - Math.sqrt(x1)*Math.pow((2/(x1+1)),((x1+1)/(2*(x1-1))))))/(x2-x1))
    xc = Math.sqrt(xnp)*Math.pow((2/(xnp+1)),((xnp+1)/(2*(xnp-1))))
    x1=x2
    x2=xnp
    console.log([xnp,xc])
    
  }
  return xnp
}

function CfBound(){
  let bound = Math.round((Number(vals.Gamma)*Math.sqrt((2*Number(vals.gamma)/(Number(vals.gamma)-1))*(1-Math.pow(Number(vals.PeP0),((Number(vals.gamma)-1)/Number(vals.gamma)))))+Number(vals.PeP0)*Number(vals.AeAt))*100)/100
  document.getElementById("cf_ThrustRange").max=bound
  return bound
}

let propsHTML = {
  "Oxygen":[`
          <option>Methane</option>
          <option>Hydrazine</option>
          <option>Hydrogen</option>
          <option>RP-1</option>
          <option>UDMH</option>
          <option>Hydrogen</option>`,{
            "Methane":`<option>3.20</option>
                      <option>3.00</option>`,
            "Hydrazine":`<option>0.74</option>
                        <option>0.90</option>`,
            "Hydrogen": `<option>3.40</option>
                        <option>4.02</option>`,
            "RP-1":     `<option>2.24</option>
                        <option>2.56</option>`,
            "UDMH":     `<option>1.39</option>
                        <option>1.56</option>`
        }],
  'Flourine': [`<option>Hydrazine</option>
              <option>Hydrogen</option>`,{
                "Hydrazine":`<option>1.83</option>
                            <option>2.30</option>`,
                "Hydrogen": `<option>4.54</option>
                            <option>7.60</option>`,
        }],
  'Nitrogen Tetroxide': [`<option>Hydrazine</option>
                          <option>RP-1</option>`,{
                "Hydrazine": `<option>1.08</option>
                            <option>1.34</option>`,
                "RP-1":    `<option>3.4</option>`
        }],
  'Hydrogen Peroxide': [`<option>RP-1</option>`,{
                "RP-1": `<option>7.00</option>`
              }]
}

let OFHTML = {
  "Methane":`
            <option>3.20</option>
            <option>3.00</option>`
}

function MolarMass(option){
  const MOxi = document.getElementById("MOxi")
  const MFuel = document.getElementById("MFuel")
  const MOF = document.getElementById("MOF")
  let oxi = MOxi.selectedOptions[0].label
  // if(MOxi.selectedOptions[0].label === "Oxygen"){
  //   Mfuel.innerHTML=props.Oxygen
  // }
  if (option==="Oxi"){
    MFuel.innerHTML=propsHTML[oxi][0]
  }

  MOF.innerHTML=propsHTML[oxi][1][MFuel.selectedOptions[0].label]
}

let propVals = {
  "Oxygen": {
    "Methane": { 
          "3.20": [20.81, 3926],
          "3.00": [20.17, 3886]

    }
  }
}

function assignValueMolar(){}