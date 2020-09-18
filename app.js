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
  Gamma: "1.7", // []
  P0: "0", // [bar]
  At: "0", // [m]
  R: "5", // [??]
  T0: "5", // [K]
  Ae: "0", // [m^2]
  Pa: "0" // [bar]
  }


runEqsUp() //Load initial 0 values
updateRes()

/// Grab HTML ///
 
// mdot_Thrust 
const mdot_ThrustBtn = document.getElementById("mdot_ThrustBtn")




// cstar_Thrust 
const cstar_ThrustBtn = document.getElementById("cstar_ThrustBtn")




// cf_Thrust
const cf_ThrustBtn = document.getElementById("cf_ThrustBtn")






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
  runFuncs()
})

document.getElementById("cstar_ThrustRange").addEventListener('input', function(e){
  document.getElementById("cstar_ThrustIn").value = e.target.value
  vals.cstar = assignValue(e.target.value,[0,10000], "cstar_ThrustIn")   
  runFuncs() 
})

// cf_Thrust 
document.getElementById("cf_ThrustIn").addEventListener('input', function(e){
  document.getElementById("cf_ThrustRange").value = e.target.value
  vals.cf = assignValue(e.target.value,[0,10000],"cf_ThrustIn")
  runFuncs()
})

document.getElementById("cf_ThrustRange").addEventListener('input', function(e){
  document.getElementById("cf_ThrustIn").value = e.target.value
  vals.cf = assignValue(e.target.value,[0,10000],"cf_ThrustIn")
  runFuncs()  
})

// Gamma_mdot
document.getElementById("Gamma_mdotIn").addEventListener('input', function(e){
  document.getElementById("Gamma_mdotRange").value = e.target.value
  vals.Gamma = assignValue(e.target.value,[0,10000],"Gamma_mdotIn")
  runFuncs()
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
  runFuncs()
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
  runFuncs()
})

document.getElementById("At_mdotRange").addEventListener('input', function(e){
  document.getElementById("At_mdotIn").value = e.target.value
  vals.At = assignValue(e.target.value,[0,10000],"At_mdotIn")
  runFuncs()  
})

// R_mdot
document.getElementById("R_mdotIn").addEventListener('input', function(e){
  document.getElementById("R_mdotRange").value = e.target.value
  vals.R = assignValue(e.target.value,[0,10000],"R_mdotIn")
  runFuncs()
})

document.getElementById("R_mdotRange").addEventListener('input', function(e){
  document.getElementById("R_mdotIn").value = e.target.value
  vals.R = assignValue(e.target.value,[0,10000],"R_mdotIn")
  runFuncs()  
})

// T0_mdot
document.getElementById("T0_mdotIn").addEventListener('input', function(e){
  document.getElementById("T0_mdotRange").value = e.target.value
  vals.T0 = assignValue(e.target.value,[0,10000],"T0_mdotIn")
  runFuncs()
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

/// CheckBox Event Listeners - Check Equal Boxes ///
document.getElementById("p0_mdotBox").addEventListener('input',function(e){
  checkSameBoxes("P0_mdot") // let checkSameBoxes function know which box is checked
})
document.getElementById("At_mdotBox").addEventListener('input',function(e){
  checkSameBoxes("At_mdot")
})
document.getElementById("T0_mdotBox").addEventListener('input',function(e){
  checkSameBoxes("T0_mdot") 
})
document.getElementById("T0_cstarBox").addEventListener('input',function(e){
  checkSameBoxes("T0_cstar")
})
document.getElementById("M_cstarBox").addEventListener('input',function(e){
  checkSameBoxes("M_cstar")
})
document.getElementById("Pe/_cfBox").addEventListener('input',function(e){
  checkSameBoxes("Pe_cf")
})
document.getElementById("Pa/_cfBox").addEventListener('input',function(e){
  checkSameBoxes("Pa_cf")
})
document.getElementById("Ae/_cfBox").addEventListener('input',function(e){
  checkSameBoxes("Ae_cf")
})
document.getElementById("pa_p0Box").addEventListener('input',function(e){
  checkSameBoxes("Pa_P0")
})
document.getElementById("p0_p0Box").addEventListener('input',function(e){
  checkSameBoxes("P0_P0")
})
document.getElementById("Ae_AeBox").addEventListener('input',function(e){
  checkSameBoxes("Ae_Ae")
})
document.getElementById("At_AeBox").addEventListener('input',function(e){
  checkSameBoxes("At_Ae")
})
function runFuncs(branch) {
  
  
  runEqsDown(branch)
  runEqsUp()
  updateRes()
}





/// Function updates EQs from bottom level of EQs to top level (from chamber pressure to Isp) ///
/// Using Number() instead of parseFloat because Number("")=0, not NaN
function runEqsUp() {

  //Level 3
  

  //Level 2
  //mdot
  vals.mdot= (Math.round((Number(vals.Gamma)*Number(vals.P0)*Number(vals.At)/Math.sqrt(Number(vals.R)*Number(vals.T0)))*100)/100).toString()


  //Level 1
  vals.F = (Math.round((Number(vals.mdot)*Number(vals.cf)*Number(vals.cstar))*100)/100).toString() //Thrust
  vals.Isp = (Math.round((Number(vals.cf)*Number(vals.cstar)/Number(vals.g0))*100)/100).toString() //Isp

}

/// Function updates result boxes and input fields/range///

function updateRes() {
  
  const fRes = document.getElementById("fRes").firstChild
  const IspRes = document.getElementById("ispRes").firstChild
  const mdotRes = document.getElementById("mdotRes").firstChild

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
  document.getElementById("Gamma_mdotIn").value = (Math.round(Number(vals.Gamma)*100)/100).toString() // convert to number to round and back to str
  //P0_mdot
  document.getElementById("p0_mdotRange").value = vals.P0
  document.getElementById("p0_mdotIn").value = (Math.round(Number(vals.P0)*100)/100).toString() // If rounding is done in calcs in runEqsdown, there are rounding errors
  //At_mdot
  document.getElementById("At_mdotRange").value = vals.At
  document.getElementById("At_mdotIn").value = (Math.round(Number(vals.At)*100)/100).toString()
  //R_mdot
  document.getElementById("R_mdotRange").value = vals.R
  document.getElementById("R_mdotIn").value = vals.R
  //T0_mdot
  document.getElementById("T0_mdotRange").value = vals.T0
  document.getElementById("T0_mdotIn").value = (Math.round(Number(vals.T0)*100)/100).toString()
  //Ae_Ae
  document.getElementById("Ae_AeIn").value = (Math.round(Number(vals.Ae)*100)/100).toString()
  document.getElementById("Ae_AeRange").value = vals.Ae
  //At_Ae
  document.getElementById("At_AeIn").value = (Math.round(Number(vals.At)*100)/100).toString()
  document.getElementById("At_AeRange").value = vals.At
  //Pa_P0
  document.getElementById("pa_p0In").value = (Math.round(Number(vals.Pa)*100)/100).toString()
  document.getElementById("pa_p0Range").value = vals.Pa
  //P0_P0
  document.getElementById("p0_p0In").value = (Math.round(Number(vals.P0)*100)/100).toString()
  document.getElementById("p0_p0Range").value = vals.P0
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
  const M_cstarBox = document.getElementById("M_cstarBox")
  const P0_P0Box = document.getElementById("p0_p0Box")
  const Pa_P0Box = document.getElementById("pa_p0Box")
  const At_AeBox = document.getElementById("At_AeBox")
  const Ae_AeBox = document.getElementById("Ae_AeBox")
  const Pe_cfBox = document.getElementById("Pe/_cfBox")
  const Ae_cfBox = document.getElementById("Ae/_cfBox")
  const Pa_cfBox = document.getElementById("Pa/_cfBox")
  

  if (box === "T0_mdot"){
    T0_cstarBox.checked = T0_mdotBox.checked
  } else if(box === "T0_cstar"){
    T0_mdotBox.checked = T0_cstarBox.checked
  } else if(box === "P0_mdot"){
    P0_P0Box.checked = P0_mdotBox.checked
  } else if(box === "P0_P0"){
    P0_mdotBox.checked = P0_P0Box.checked
  } else if(box === "At_mdot"){
    At_AeBox.checked = At_mdotBox.checked
  } else if(box === "At_Ae"){
    At_mdotBox.checked = At_AeBox.checked
  } else if(box === "Pe_cf"){
    Ae_cfBox.checked=Pe_cfBox.checked
  } else if(box === "Ae_cf"){
    Pe_cfBox.checked=Ae_cfBox.checked
  }

  if (box==="T0_mdot" || box==="T0_cstar"){
    if(T0_mdotBox.checked===true && P0_mdotBox.checked===true && At_mdotBox.checked===true){
      P0_mdotBox.checked=false
      P0_P0Box.checked=false
    }
    if(T0_cstarBox.checked===true && M_cstarBox.checked===true){
      M_cstarBox.checked=false
    }
  }
  
  if (box==="P0_mdot" || box==="P0_P0"){
    if(T0_mdotBox.checked===true && P0_mdotBox.checked===true && At_mdotBox.checked===true){
      At_mdotBox.checked=false
      At_AeBox.checked=false
    }
    if(Pa_P0Box.checked===true && P0_P0Box.checked===true){
      Pa_P0Box.checked=false
    }
  }

  if (box==="At_mdot" || box==="At_Ae"){
    if(T0_mdotBox.checked===true && P0_mdotBox.checked===true && At_mdotBox.checked===true){
      T0_mdotBox.checked=false
      T0_cstarBox.checked=false
    }
    if(At_AeBox.checked===true && Ae_AeBox.checked===true){
      Ae_AeBox.checked=false
    }
  }

  if (box==="Pa_P0" && P0_P0Box.checked===true && Pa_P0Box.checked===true){
    P0_P0Box.checked=false
    P0_mdotBox.checked=false
  }

  if (box==="Ae_Ae" && Ae_AeBox.checked===true && At_AeBox.checked===true){
    At_AeBox.checked=false
    At_mdotBox.checked=false
  }
  
  if (box==="M_cstar" && M_cstarBox.checked===true && T0_cstarBox.checked===true){
    T0_cstarBox.checked=false
    T0_mdotBox.checked=false
  }

  if ((box==="Pe_cf" || box==="Ae_cf") && Pa_cfBox.checked===true && Ae_cfBox.checked===true){
    Pa_cfBox.checked=false
  }

  if(box==="Pa_cf" && Pa_cfBox.checked===true && Ae_cfBox.checked===true){
    Ae_cfBox.checked=false
    Pe_cfBox.checked=false
  }
}

function runEqsDown(branch){  
  const P0_mdotBox = document.getElementById("p0_mdotBox")
  const At_mdotBox = document.getElementById("At_mdotBox")
  const T0_mdotBox = document.getElementById("T0_mdotBox")
  const T0_cstarBox = document.getElementById("T0_cstarBox")
  const M_cstarBox = document.getElementById("M_cstarBox")
  const P0_P0Box = document.getElementById("p0_p0Box")
  const Pa_P0Box = document.getElementById("pa_p0Box")
  const At_AeBox = document.getElementById("At_AeBox")
  const Ae_AeBox = document.getElementById("Ae_AeBox")
  const Pe_cfBox = document.getElementById("Pe/_cfBox")
  const Ae_cfBox = document.getElementById("Ae/_cfBox")
  const Pa_cfBox = document.getElementById("Pa/_cfBox")
  

  if(branch==="mdot" && P0_mdotBox.checked===true && T0_mdotBox.checked===true){
    console.log("hi")
    if(Number(vals.P0)===0){
      vals.P0="0.01"
    }
    if(Number(vals.At)===0){
      vals.At="0.01"
    }
    if(Number(vals.T0)===0){
      vals.T0="0.01"
    }
    vals.At=(Number(vals.mdot)*Math.sqrt(Number(vals.R)*Number(vals.T0))/(Number(vals.Gamma)*Number(vals.P0))).toString()
  }

  if(branch==="mdot" && P0_mdotBox.checked===false){
    console.log("here")
    if(Number(vals.P0)===0){
      vals.P0="0.01"
    }
    if(Number(vals.At)===0){
      vals.At="0.01"
    }
    if(Number(vals.T0)===0){
      vals.T0="0.01"
    }
    vals.P0=(Number(vals.mdot)*Math.sqrt(Number(vals.R)*Number(vals.T0))/(Number(vals.Gamma)*Number(vals.At))).toString()
  }

  if(branch==="mdot" && ((P0_mdotBox.checked===true && At_mdotBox.checked===true)||P0_mdotBox.checked===true)){
    console.log("hi")
    if(Number(vals.P0)===0){
      vals.P0="0.01"
    }
    if(Number(vals.At)===0){
      vals.At="0.01"
    }
    if(Number(vals.T0)===0){
      vals.T0="0.01"
    }
    vals.T0=(Math.pow(Number(vals.Gamma)*Number(vals.P0)*Number(vals.At)/Number(vals.mdot),2)/Number(vals.R)).toString()
  }
}