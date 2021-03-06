
(function(){



/// Note: keeping values as string so 0.01 is a possible input. Converted to numbers for calcs
/// Numbers listed here are inital values on page load. 
let vals = {
  F: "0", // [N]
  Isp: "0", // [s]
  mdot: "0", // [kg/s]
  cstar: "0", // [m/s]
  cf: "0", // [-]
  g0: "9.81", // [m/s^2]
  Gamma: "0.67", //[-]
  gamma: "1.3", // [-]
  P0: "200", // [bar]
  At: "0.5", // [m] 
  T0: "5", // [K]
  Ae: "5", // [m^2]
  Pa: "0.5", // [bar]
  R: "8314.47", // [[JK^-1mol^-1]]
  M: "20.81", // [kg/mol]
  PeP0: ".6", // [-]
  PaP0: ".6", // [-]
  AeAt: "1.1", // [-]
  alt: "5.8" // [m]
}

/// bounds for sliders and error messages. bounds set by functions are not listed (CfBound and PeP0 bound)
/// bounds for sliders are inputted manually in index.html (except for bounds that change)
let bounds = {
  mdot: [0, 15000],
  cstar: [0, 4000],
  Gamma: [0.609,0.77],
  gamma: [1.01, 2],
  P0: [0,400],
  Pa: [0,1.013],
  At: [0.1,10],
  Ae: [0.1,10],
  M: [1,50],
  T0: [0,5000],
  PeP0: [0.00005, 0.5],
  PaP0: [0, 1],
  alt: [0,75],
}

/// Menu options for Molar Mass card
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
                        <option>1.65</option>`
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
              }],
  'Custom': [`<option>Custom</option>`,{
              "Custom": `<option>Custom</option>`
  }]
}

/// Propellant T0 and M values for each combination of props and O/F in Molar Mass Card
let propVals = {
  "Oxygen": {
    "Methane": { 
        "3.20": [20.81, 3926],
        "3.00": [20.17, 3886]
      },
    "Hydrazine": {
        "0.74": [18.3, 3285],
        "0.90": [19.3, 3404]
    },
    "Hydrogen": {
        "3.40": [8.9, 2959],
        "4.02": [10, 2999]
    },
    "RP-1": {
        "2.24": [21.9, 3571],
        "2.56": [23.3, 3677]
    },
    "UDMH": {
        "1.39": [19.8, 3542],
        "1.65": [21.3, 3594]
    }
  },
  "Flourine": {
    "Hydrazine": {
        "1.83": [18.5, 4553],
        "2.30": [19.4, 4713]
    },
    "Hydrogen": {
        "4.54": [8.9, 3080],
        "7.60": [11.8, 3900]
    }
  },
  "Nitrogen Tetroxide": {
    "Hydrazine": {    
        "1.08": [19.5, 3258],
        "1.34": [20.9, 3152]
    },
    "RP-1": {
        "3.4": [24.1, 3290]
    }
  },
  "Hydrogen Peroxide": {
    "RP-1": {
        "7.00": [21.7, 2760]
    }
  }
} 

/// Initial functions on page load

MolarMass("Oxi") // load first option on drop downs for molar mass card
  vals.M = (assignValueMolar()[0]).toString()
  vals.T0 = (assignValueMolar()[1]).toString()
runEqsUp() //Load initial 0 values
updateRes() // update all fields and result boxes
PeP0Bound() // update PeP0 bound
CfBound() // Cfbound
initialChecks() // check one box on each card


/// Event listeners ///

// mdot_Thrust
document.getElementById("mdot_ThrustIn").addEventListener('input', function(e){
  document.getElementById("mdot_ThrustRange").value = e.target.value // attach to range
  vals.mdot = assignValue(e.target.value, bounds.mdot, "mdot_ThrustIn") // assignValue(user input value, allowable range, for error message)
  if(vals.mdot!==""){ // dont do anything until a real number is entered ("" - + e don't execute runFuncs)
    runFuncs("mdot") 
  }
})

document.getElementById("mdot_ThrustRange").addEventListener('input', function(e){
  document.getElementById("mdot_ThrustIn").value = e.target.value // attach to input field
  vals.mdot = assignValue(e.target.value, bounds.mdot, "mdot_ThrustIn") // assignValue(user input value, allowable range, for error message html handle)
  runFuncs("mdot")

})

// cstar_Thrust 
document.getElementById("cstar_ThrustIn").addEventListener('input', function(e){
  document.getElementById("cstar_ThrustRange").value = e.target.value
  vals.cstar = assignValue(e.target.value,bounds.cstar, "cstar_ThrustIn")
  if(vals.cstar!==""){
    runFuncs("cstar")
  }
})

document.getElementById("cstar_ThrustRange").addEventListener('input', function(e){
  document.getElementById("cstar_ThrustIn").value = e.target.value
  vals.cstar = assignValue(e.target.value,bounds.cstar, "cstar_ThrustIn")   
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
  vals.Gamma = assignValueGamma(e.target.value,bounds.Gamma,"Gamma_mdotIn",0.61) //special assign value func so that 0.000 can be an input
  if(vals.Gamma!=="" && vals.Gamma>0.609){ 
    runFuncs("Gamma")
  }
})

document.getElementById("Gamma_mdotRange").addEventListener('input', function(e){
  document.getElementById("Gamma_mdotIn").value = e.target.value
  vals.Gamma = assignValueGamma(e.target.value,bounds.Gamma,"Gamma_mdotIn",0.61)
  runFuncs("Gamma")  
})

// P0_mdot
document.getElementById("p0_mdotIn").addEventListener('input', function(e){
  document.getElementById("p0_mdotRange").value = e.target.value
  vals.P0 = assignValue(e.target.value,bounds.P0,"p0_mdotIn")
  if(vals.P0!==""){
    runFuncs()
  }
})

document.getElementById("p0_mdotRange").addEventListener('input', function(e){
  document.getElementById("p0_mdotIn").value = e.target.value
  vals.P0 = assignValue(e.target.value,bounds.P0,"p0_mdotIn")
  runFuncs()  
})

// At_mdot
document.getElementById("At_mdotIn").addEventListener('input', function(e){
  document.getElementById("At_mdotRange").value = e.target.value
  vals.At = assignValuegamma(e.target.value,bounds.At,"At_mdotIn",0) //special assign value func so that 0.000 can be an input and gives speical error message above 0
  Ae_At_value("At") // function keeps Ae bigger than At by 1.1 ratio
  if(vals.At!==""){
    runFuncs()
  }
  
})

document.getElementById("At_mdotRange").addEventListener('input', function(e){
  document.getElementById("At_mdotIn").value = e.target.value
  vals.At = assignValuegamma(e.target.value,bounds.At,"At_mdotIn",0)
  Ae_At_value("At") 
  runFuncs()  
  
})

// M_mdot
document.getElementById("M_mdotIn").addEventListener('input', function(e){
  document.getElementById("M_mdotRange").value = e.target.value
  vals.M = assignValue(e.target.value,bounds.M,"M_mdotIn")
  if(vals.M!==""){
    runFuncs()
  }
  customTempMolar() // function changes dropsdown to custom 
})

document.getElementById("M_mdotRange").addEventListener('input', function(e){
  document.getElementById("M_mdotIn").value = e.target.value
  vals.M = assignValue(e.target.value,bounds.M,"M_mdotIn")
  runFuncs()  
  customTempMolar()
})

// T0_mdot
document.getElementById("T0_mdotIn").addEventListener('input', function(e){
  document.getElementById("T0_mdotRange").value = e.target.value
  vals.T0 = assignValue(e.target.value,bounds.T0,"T0_mdotIn")
  if(vals.T0!==""){
    runFuncs()
  }
  customTempMolar()
})

document.getElementById("T0_mdotRange").addEventListener('input', function(e){
  document.getElementById("T0_mdotIn").value = e.target.value
  vals.T0 = assignValue(e.target.value,bounds.T0,"T0_mdotIn")
  runFuncs()  
  customTempMolar()
})

// Ae_Ae
document.getElementById("Ae_AeIn").addEventListener('input', function(e){
  document.getElementById("Ae_AeRange").value = e.target.value
  vals.Ae = assignValuegamma(e.target.value,bounds.Ae,"Ae_AeIn",0)
  Ae_At_value("Ae")
  if(vals.Ae!==""){
    runFuncs()
  }
  
})

document.getElementById("Ae_AeRange").addEventListener('input', function(e){
  document.getElementById("Ae_AeIn").value = e.target.value
  vals.Ae = assignValuegamma(e.target.value,bounds.Ae,"Ae_AeIn",0)
  Ae_At_value("Ae")
  runFuncs()  
  
})

// At_Ae
document.getElementById("At_AeIn").addEventListener('input', function(e){
  document.getElementById("At_AeRange").value = e.target.value
  vals.At = assignValuegamma(e.target.value,bounds.At,"At_AeIn",0)
  Ae_At_value("At")
  if(vals.At!==""){
  runFuncs()
  }
})

document.getElementById("At_AeRange").addEventListener('input', function(e){
  document.getElementById("At_AeIn").value = e.target.value
  vals.At = assignValuegamma(e.target.value,bounds.At,"At_AeIn",0)
  Ae_At_value("At")
  runFuncs() 
})

// Pa_P0
document.getElementById("pa_p0In").addEventListener('input', function(e){
  document.getElementById("pa_p0Range").value = e.target.value
  vals.Pa = assignValue(e.target.value,bounds.Pa,"pa_p0In")
  if(vals.Pa!==""){
  runFuncs("Pa")
  }
})

document.getElementById("pa_p0Range").addEventListener('input', function(e){
  document.getElementById("pa_p0In").value = e.target.value
  vals.Pa = assignValue(e.target.value,bounds.Pa,"pa_p0In")
  runFuncs("Pa")  
})

// P0_P0
document.getElementById("p0_p0In").addEventListener('input', function(e){
  document.getElementById("p0_p0Range").value = e.target.value
  vals.P0 = assignValue(e.target.value,bounds.P0,"pa_p0In")
  if(vals.P0!==""){
  runFuncs()
  }
})

document.getElementById("p0_p0Range").addEventListener('input', function(e){
  document.getElementById("p0_p0In").value = e.target.value
  vals.P0 = assignValue(e.target.value,bounds.P0,"p0_p0In")
  runFuncs()  
})

// Altitude
document.getElementById("altIn").addEventListener('input', function(e){
  document.getElementById("altRange").value = e.target.value
  vals.alt = assignValue(e.target.value,bounds.alt,"altIn")
  if(vals.alt!==""){
  runFuncs("alt")
  }
})

document.getElementById("altRange").addEventListener('input', function(e){
  document.getElementById("altIn").value = e.target.value
  vals.alt = assignValue(e.target.value,bounds.alt,"altIn")
  runFuncs("alt")  
})

// Gamma_cstar
document.getElementById("Gamma_cstarIn").addEventListener('input', function(e){
  document.getElementById("Gamma_cstarRange").value = e.target.value
  vals.Gamma = assignValueGamma(e.target.value,bounds.Gamma,"Gamma_cstarIn",0.61)
  if(vals.Gamma!=="" && vals.Gamma>0.609){
    runFuncs("Gamma")
  }
})

document.getElementById("Gamma_cstarRange").addEventListener('input', function(e){
  document.getElementById("Gamma_cstarIn").value = e.target.value
  vals.Gamma = assignValueGamma(e.target.value,bounds.Gamma,"Gamma_cstarIn",0.61)
  if(vals.Gamma!=="" && vals.Gamma>0.609){
  runFuncs("Gamma")
  }
})

// M_cstar
document.getElementById("M_cstarIn").addEventListener('input', function(e){
  document.getElementById("M_cstarRange").value = e.target.value
  vals.M = assignValue(e.target.value,bounds.M,"M_cstarIn")
  if(vals.M!==""){
    runFuncs()
  }
  customTempMolar()
})

document.getElementById("M_cstarRange").addEventListener('input', function(e){
  document.getElementById("M_cstarIn").value = e.target.value
  vals.M = assignValue(e.target.value,bounds.M,"M_cstarIn")
  runFuncs()  
  customTempMolar()
})

// T0_cstar
document.getElementById("T0_cstarIn").addEventListener('input', function(e){
  document.getElementById("T0_cstarRange").value = e.target.value
  vals.T0 = assignValue(e.target.value,bounds.T0,"T0_cstarIn")
  if(vals.T0!==""){
    runFuncs()
  }
  customTempMolar()
})

document.getElementById("T0_cstarRange").addEventListener('input', function(e){
  document.getElementById("T0_cstarIn").value = e.target.value
  vals.T0 = assignValue(e.target.value,bounds.T0,"T0_cstarIn")
  runFuncs()  
  customTempMolar()
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
  vals.gamma = assignValuegamma(e.target.value,bounds.gamma,"gamma_cfIn",1)
  if(vals.gamma!==""){
    runFuncs("gamma")
  }
})

document.getElementById("gamma_cfRange").addEventListener('input', function(e){
  document.getElementById("gamma_cfIn").value = e.target.value
  vals.gamma = assignValuegamma(e.target.value,bounds.gamma,"gamma_cfIn",1)
  runFuncs("gamma")  
})

// Pe/P0_cf
document.getElementById("Pe/_cfIn").addEventListener('input', function(e){
  document.getElementById("Pe/_cfRange").value = e.target.value
  vals.PeP0 = assignValuegamma(e.target.value,bounds.PeP0,"Pe/_cfIn",0)
  if(vals.PeP0!==""){
    runFuncs("PeP0")
  }
})

document.getElementById("Pe/_cfRange").addEventListener('input', function(e){
  document.getElementById("Pe/_cfIn").value = e.target.value
  vals.PeP0 = assignValue(e.target.value,bounds.PeP0,"Pe/_cfIn")
  runFuncs("PeP0")
})

// Pa/P0_cf
document.getElementById("Pa/_cfIn").addEventListener('input', function(e){
  document.getElementById("Pa/_cfRange").value = e.target.value
  vals.PaP0 = assignValue(e.target.value,bounds.PaP0,"Pa/_cfIn")
  if(vals.PaP0!==""){
    runFuncs("PaP0")
  }
})

document.getElementById("Pa/_cfRange").addEventListener('input', function(e){
  document.getElementById("Pa/_cfIn").value = e.target.value
  vals.PaP0 = assignValue(e.target.value,bounds.PaP0,"Pa/_cfIn")
  runFuncs("PaP0")  
})

// Ae/At_cf
document.getElementById("Ae/_cfIn").addEventListener('input', function(e){
  document.getElementById("Ae/_cfRange").value = e.target.value
  vals.AeAt = assignValuegamma(e.target.value,[1.1,10000],"Ae/_cfIn",1)
  if(vals.AeAt!==""){
    runFuncs("AeAt")
  }
})

document.getElementById("Ae/_cfRange").addEventListener('input', function(e){
  document.getElementById("Ae/_cfIn").value = e.target.value
  vals.AeAt = assignValuegamma(e.target.value,[1.1,10000],"Ae/_cfIn",1)
  runFuncs("AeAt")  
})

/// CheckBox Event Listeners - Check Equal Boxes ///
document.getElementById("p0_mdotBox").addEventListener('input',function(e){
  checkBoxes("mdot") // let checkSameBoxes function know in which card a box is checked
  e.target.checked=true
})
document.getElementById("At_mdotBox").addEventListener('input',function(e){
  checkBoxes("mdot")
  e.target.checked=true
})
document.getElementById("T0_mdotBox").addEventListener('input',function(e){
  checkBoxes("mdot") 
  e.target.checked=true
})
document.getElementById("M_mdotBox").addEventListener("input",function(e){
  checkBoxes("mdot")
  e.target.checked=true
})
document.getElementById("T0_cstarBox").addEventListener('input',function(e){
  checkBoxes("cstar")
  e.target.checked=true
})
document.getElementById("M_cstarBox").addEventListener('input',function(e){
  checkBoxes("cstar")
  e.target.checked=true
})
document.getElementById("Pe/_cfBox").addEventListener('input',function(e){
  checkBoxes("cf")
  e.target.checked=true
  document.getElementById("Ae/_cfBox").checked=true
})
document.getElementById("Pa/_cfBox").addEventListener('input',function(e){
  checkBoxes("cf")
  e.target.checked=true
})
document.getElementById("Ae/_cfBox").addEventListener('input',function(e){
  checkBoxes("cf")
  e.target.checked=true
  document.getElementById("Pe/_cfBox").checked=true
})
document.getElementById("pa_p0Box").addEventListener('input',function(e){
  checkBoxes("p0")
  e.target.checked=true
  document.getElementById("altBox").checked=true
})
document.getElementById("p0_p0Box").addEventListener('input',function(e){
  checkBoxes("p0")
  e.target.checked=true
})
document.getElementById("Ae_AeBox").addEventListener('input',function(e){
  checkBoxes("Ae")
  e.target.checked=true
})
document.getElementById("At_AeBox").addEventListener('input',function(e){
  checkBoxes("Ae")
  e.target.checked=true
})
document.getElementById("altBox").addEventListener('input',function(e){
  checkBoxes("p0")
  e.target.checked=true
  document.getElementById("pa_p0Box").checked=true
})


/// Molar Mass
document.getElementById("MOxi").addEventListener('input',function(e){
  MolarMass("Oxi") // load correct dropdowns
  vals.M = (assignValueMolar()[0]).toString() // retrieve value from assign value molar function
  vals.T0 = (assignValueMolar()[1]).toString()
  runFuncs()
})
document.getElementById("MFuel").addEventListener('input',function(e){
  MolarMass("Fuel")
  vals.M = (assignValueMolar()[0]).toString()
  vals.T0 = (assignValueMolar()[1]).toString()
  runFuncs()
})
document.getElementById("MOF").addEventListener('input',function(e){
  vals.M = (assignValueMolar()[0]).toString()
  vals.T0 = (assignValueMolar()[1]).toString()
  runFuncs()
})

/// Borders
//Mdot
document.getElementById("mdot_ThrustBtn").addEventListener('mouseover',function(e){
  
  document.getElementById("mdotCardHeader").classList.add("border")
  document.getElementById("mdotCardHeader").classList.add("border-primary")
  document.getElementById("mdotCardBody").classList.add("border")
  document.getElementById("mdotCardBody").classList.add("border-primary")
})

document.getElementById("mdot_ThrustBtn").addEventListener('mouseout',function(e){
  
  document.getElementById("mdotCardHeader").classList.remove("border")
  document.getElementById("mdotCardHeader").classList.remove("border-primary")
  document.getElementById("mdotCardBody").classList.remove("border")
  document.getElementById("mdotCardBody").classList.remove("border-primary")
})

//Cf
document.getElementById("cf_ThrustBtn").addEventListener('mouseover',function(e){
  
  document.getElementById("CfCardHeader").classList.add("border")
  document.getElementById("CfCardHeader").classList.add("border-primary")
  document.getElementById("CfCardBody").classList.add("border")
  document.getElementById("CfCardBody").classList.add("border-primary")
})
document.getElementById("cf_ThrustBtn").addEventListener('mouseout',function(e){
  
  document.getElementById("CfCardHeader").classList.remove("border")
  document.getElementById("CfCardHeader").classList.remove("border-primary")
  document.getElementById("CfCardBody").classList.remove("border")
  document.getElementById("CfCardBody").classList.remove("border-primary")
})

//Cstar
document.getElementById("cstar_ThrustBtn").addEventListener('mouseover',function(e){
  
  document.getElementById("cstarCardHeader").classList.add("border")
  document.getElementById("cstarCardHeader").classList.add("border-primary")
  document.getElementById("cstarCardBody").classList.add("border")
  document.getElementById("cstarCardBody").classList.add("border-primary")
})
document.getElementById("cstar_ThrustBtn").addEventListener('mouseout',function(e){
  
  document.getElementById("cstarCardHeader").classList.remove("border")
  document.getElementById("cstarCardHeader").classList.remove("border-primary")
  document.getElementById("cstarCardBody").classList.remove("border")
  document.getElementById("cstarCardBody").classList.remove("border-primary")
})

//Pa/P0
document.getElementById("Pa/_cfBtn").addEventListener('mouseover',function(e){
  
  document.getElementById("P0CardHeader").classList.add("border")
  document.getElementById("P0CardHeader").classList.add("border-info")
  document.getElementById("P0CardBody").classList.add("border")
  document.getElementById("P0CardBody").classList.add("border-info")
})
document.getElementById("Pa/_cfBtn").addEventListener('mouseout',function(e){
  
  document.getElementById("P0CardHeader").classList.remove("border")
  document.getElementById("P0CardHeader").classList.remove("border-info")
  document.getElementById("P0CardBody").classList.remove("border")
  document.getElementById("P0CardBody").classList.remove("border-info")
})

//Ae/At
document.getElementById("Ae/_cfBtn").addEventListener('mouseover',function(e){
  
  document.getElementById("AeCardHeader").classList.add("border")
  document.getElementById("AeCardHeader").classList.add("border-success")
  document.getElementById("AeCardBody").classList.add("border")
  document.getElementById("AeCardBody").classList.add("border-success")
})
document.getElementById("Ae/_cfBtn").addEventListener('mouseout',function(e){
  
  document.getElementById("AeCardHeader").classList.remove("border")
  document.getElementById("AeCardHeader").classList.remove("border-success")
  document.getElementById("AeCardBody").classList.remove("border")
  document.getElementById("AeCardBody").classList.remove("border-success")
})

//Molar
document.getElementById("M_mdotBtn").addEventListener('mouseover',function(){borderAdd("warning")})
document.getElementById("M_mdotBtn").addEventListener('mouseout',function(){borderRemove("warning")})
document.getElementById("T0_mdotBtn").addEventListener('mouseover',function(){borderAdd("danger")})
document.getElementById("T0_mdotBtn").addEventListener('mouseout',function(){borderRemove("danger")})
document.getElementById("M_cstarBtn").addEventListener('mouseover',function(){borderAdd("warning")})
document.getElementById("M_cstarBtn").addEventListener('mouseout',function(){borderRemove("warning")})
document.getElementById("T0_cstarBtn").addEventListener('mouseover',function(){borderAdd("danger")})
document.getElementById("T0_cstarBtn").addEventListener('mouseout',function(){borderRemove("danger")})
function borderAdd(input){
  
  document.getElementById("MCardHeader").classList.add("border")
  document.getElementById("MCardHeader").classList.add(`border-${input}`)
  document.getElementById("MCardBody").classList.add("border")
  document.getElementById("MCardBody").classList.add(`border-${input}`)

}

function borderRemove(input){
 
  document.getElementById("MCardHeader").classList.remove("border")
  document.getElementById("MCardHeader").classList.remove(`border-${input}`)
  document.getElementById("MCardBody").classList.remove("border")
  document.getElementById("MCardBody").classList.remove(`border-${input}`)

}

function runFuncs(branch) { // branch defines which input
  runEqsDown(branch)
  runEqsUp(branch)
  updateRes()
}




/// Function updates EQs from bottom level of EQs to top level (from chamber pressure to Isp) ///
/// Using Number() instead of parseFloat because Number("")=0, not NaN
function runEqsUp(branch) {

  //Level 3
  if(branch!=="PaP0"){ // can input full values without numbers updating immediately (0.0001 can be inputted)
    vals.PaP0 = (Math.round((Number(vals.Pa)/Number(vals.P0))*1000)/1000).toString() // round and then convert to string
  }
  if(branch!=="AeAt"){
    vals.AeAt = (Math.round((Number(vals.Ae)/Number(vals.At))*1000)/1000).toString()
    if(Number(vals.AeAt)<1.1){
      vals.AeAt="1.1" // makes sure Ae cant be smaller than At
      
    }
    if (branch!=="PeP0"){
      vals.PeP0=(AeAt_to_PeP0(vals.AeAt)).toFixed(5) // toFixed and Math.round use is somehwat arbitrary...
    }
  }
  //Level 2
  if(branch!=="mdot"){
    vals.mdot = (Math.round((Number(vals.Gamma)*(100000)*Number(vals.P0)*Number(vals.At)/Math.sqrt(Number(vals.R)*Number(vals.T0)/Number(vals.M)))*100)/100).toString() //mdot
  }
  if(branch!=="cf"){
    vals.cf = (Math.round((Number(vals.Gamma)*Math.sqrt((2*Number(vals.gamma)/(Number(vals.gamma)-1))*(1-Math.pow(Number(vals.PeP0),((Number(vals.gamma)-1)/Number(vals.gamma)))))+(Number(vals.PeP0)-Number(vals.PaP0))*Number(vals.AeAt))*100)/100).toString()
  }
  if(branch!=="cstar"){
    vals.cstar = (Math.round((1/Number(vals.Gamma))*Math.sqrt((Number(vals.R)*Number(vals.T0))/Number(vals.M))*100)/100).toString() //cstar
  }
  //Level 1
  vals.F = (Math.round((Number(vals.mdot)*Number(vals.cf)*Number(vals.cstar)/1000)*100)/100).toString() //Thrust
  vals.Isp = (Math.round((Number(vals.cf)*Number(vals.cstar)/Number(vals.g0))*100)/100).toString() //Isp

}

/// Function updates result boxes and input fields/range///

function updateRes() {

  // F
  if (isNaN(Number(vals.F))) {
    document.getElementById("fRes").firstChild.innerHTML=`Math Error` // executes if 0/0 or sqrt(-1) (1/0 = infinity)
  } else {
    document.getElementById("fRes").firstChild.innerHTML = `F = ${vals.F} [kN]` // executes for acceptable values
  }

  // Isp 
  if (isNaN(Number(vals.Isp))) {
    document.getElementById("ispRes").firstChild.innerHTML=`Math Error`
  } else {
    document.getElementById("ispRes").firstChild.innerHTML = `I<sub>sp</sub> = ${vals.Isp} [s]`
  }
  
  // mdot
  if (isNaN(Number(vals.mdot))) {
    document.getElementById("mdotRes").firstChild.innerHTML=`Math Error`
  } else {
    document.getElementById("mdotRes").firstChild.innerHTML = `m&#775; = ${vals.mdot} [kg/s]`
  }

  // Cstar
   if (isNaN(Number(vals.cstar))) {
    document.getElementById("cstarRes").firstChild.innerHTML=`Math Error`
  } else {
    document.getElementById("cstarRes").firstChild.innerHTML = `c* = ${vals.cstar} [m/s]`
  }

  // Cf
  if (isNaN(Number(vals.cf))) {
    document.getElementById("cfRes").firstChild.innerHTML=`Math Error`
  } else if (Number(vals.cf)<0){
    document.getElementById("cfRes").firstChild.innerHTML = `C<sub>f</sub> = ${vals.cf} (Flow Seperation)` 
  } else {
    document.getElementById("cfRes").firstChild.innerHTML = `C<sub>f</sub> = ${vals.cf}`
  }

  // PaP0
  if (isNaN(Number(vals.PaP0))) {
    document.getElementById("p0Res").firstChild.innerHTML=`Math Error`
  } else {
    document.getElementById("p0Res").firstChild.innerHTML = `P<sub>a</sub>/P<sub>0</sub> = ${vals.PaP0}`
  }

  // AeAt
  if (isNaN(Number(vals.AeAt))) {
    document.getElementById("AeRes").firstChild.innerHTML=`Math Error`
  } else {
    document.getElementById("AeRes").firstChild.innerHTML = `A<sub>e</sub>/A<sub>t</sub> = ${vals.AeAt}`
  }

  // M
  if (isNaN(Number(vals.M))) {
    document.getElementById("MRes").firstChild.innerHTML=`Math Error`
  } else {
    document.getElementById("MRes").firstChild.innerHTML = `M = ${vals.M} [kg/mol]`
  }

  // T0
  if (isNaN(Number(vals.T0))) {
    document.getElementById("T0Res").firstChild.innerHTML=`Math Error`
  } else {
    document.getElementById("T0Res").firstChild.innerHTML = `T<sub>0</sub> = ${vals.T0} [K]`
  }


  /// update fields and range ///

  //mdot_Thrust
  document.getElementById("mdot_ThrustRange").value = vals.mdot // updates range
  document.getElementById("mdot_ThrustIn").value = placeholderVals(vals.mdot, "mdot_ThrustIn")  // updates field. placeholder function puts infiinity and math error in input field
  //cstar_Thrust
  document.getElementById("cstar_ThrustRange").value = vals.cstar
  document.getElementById("cstar_ThrustIn").value = placeholderVals(vals.cstar, "cstar_ThrustIn")
  //cf_Thrust
  document.getElementById("cf_ThrustRange").value = vals.cf
  document.getElementById("cf_ThrustIn").value = placeholderVals(vals.cf, "cf_ThrustIn")
  //Gamma_mdot
  document.getElementById("Gamma_mdotRange").value = vals.Gamma
  document.getElementById("Gamma_mdotIn").value = vals.Gamma 
  //P0_mdot
  document.getElementById("p0_mdotRange").value = vals.P0
  document.getElementById("p0_mdotIn").value = placeholderVals(vals.P0, "p0_mdotIn") 
  //At_mdot
  document.getElementById("At_mdotRange").value = vals.At
  document.getElementById("At_mdotIn").value = vals.At
  //M_mdot
  document.getElementById("M_mdotRange").value = vals.M
  document.getElementById("M_mdotIn").value = placeholderVals(vals.M, "M_mdotIn")
  //T0_mdot
  document.getElementById("T0_mdotRange").value = vals.T0
  document.getElementById("T0_mdotIn").value = placeholderVals(vals.T0, "T0_mdotIn")
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
  document.getElementById("p0_p0In").value = placeholderVals(vals.P0, "p0_p0In")
  document.getElementById("p0_p0Range").value = vals.P0
  //T0_cstar
  document.getElementById("T0_cstarIn").value = placeholderVals(vals.T0, "T0_cstarIn")
  document.getElementById("T0_cstarRange").value = vals.T0
  //M_cstar
  document.getElementById("M_cstarIn").value = placeholderVals(vals.M, "M_cstarIn")
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
  document.getElementById("Pa/_cfIn").value = placeholderVals(vals.PaP0, "Pa/_cfIn")
  document.getElementById("Pa/_cfRange").value = vals.PaP0
  //AeAt_cf
  document.getElementById("Ae/_cfIn").value =  placeholderVals(vals.AeAt, "Ae/_cfIn")
  document.getElementById("Ae/_cfRange").value = vals.AeAt
  //alt
  document.getElementById("altIn").value = placeholderVals(vals.alt, "altIn")
  document.getElementById("altRange").value = vals.alt

  /// Update Out ///
  document.getElementById("forceOut").firstChild.innerHTML=`F = ${outNaN(vals.F)} [kN]`
  document.getElementById("ispOut").firstChild.innerHTML=`I<sub>sp</sub> = ${outNaN(vals.Isp)} [s]`
  document.getElementById("cstarOut").firstChild.innerHTML=`c* = ${outNaN(vals.cstar)} [m/s]`
  document.getElementById("cfOut").firstChild.innerHTML=`C<sub>f</sub> = ${vals.cf}`
  document.getElementById("veOut").firstChild.innerHTML=`V<sub>e</sub> = ${outNaN((Math.sqrt((2*Number(vals.gamma)/(Number(vals.gamma)-1))*(Number(vals.R)*Number(vals.T0)/Number(vals.M))*(1-Math.pow(Number(vals.PeP0),((Number(vals.gamma)-1)/Number(vals.gamma)))))).toString())} [m/s]` // exit vel function
  document.getElementById("p0Out").firstChild.innerHTML=`P<sub>0</sub> = ${outNaN(vals.P0)} [bar]`
  document.getElementById("t0Out").firstChild.innerHTML=`T<sub>0</sub> = ${outNaN(vals.T0)} [K]`
  document.getElementById("atOut").firstChild.innerHTML=`A<sub>t</sub> = ${vals.At} [m<sup>2</sup>]`

}

function assignValue(value, range, id) {
  if (value === "") { // does nothing
    return ""
  } else if(parseFloat(value)>range[1]) { // if lower than lower bound, return lower bound and error message
    errorMessage(id, range)
    return range[1].toString()
  } else if (parseFloat(value)<range[0]) { // if higher than higher bound, return higher bound and error message
    errorMessage(id, range)
    return range[0].toString()
  } else {
    return value 
  }

}

function assignValuegamma(value, range, id, specVal) { // used also for At and Ae, not just gamma
  const tag = document.getElementById(id)
  if(parseFloat(value) === specVal){ // Value that field has to be above of but that need to wait for full input. ex: 0 but need to wait for 0.0001
    errorMessageSpecial(id,specVal) // return popover that stays until error over
    return value
  } else if(parseFloat(value)>range[1]) { // same as assignValue function bounds
    errorMessage(id, range)
    return range[1].toString()
  } else if (parseFloat(value)<range[0]) { // same as assignValue function bounds
    errorMessage(id, range)
    return range[0].toString()
  } else {
    $(tag).popover('hide') //hides popover when valid value
    return value 
  }
}

function assignValueGamma(value, range, id, specVal) { // similar to assignValuegamma
  const tag = document.getElementById(id)
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




function errorMessageSpecial(id, specVal) { //show pop up that doesnt disappear
  
  const tag = document.getElementById(id)
  $(tag)[0].dataset.content=`Value must be greater than ${specVal}` //Jqeury grabbing popover html
  $(tag).popover('show')

}

function errorMessage(id, range) { // for bound error popover
  
  const tag = document.getElementById(id)
  $(tag)[0].dataset.content=`Value must be between ${range[0]} and ${range[1]}`
  $(tag).popover('show')

  setTimeout(function(){ // hide original bound error popover
    $(tag).popover('hide')
  }, 2000)
}



function checkBoxes(box){

  //Mdot Box (One check at a time). Unchecks all in (box) card and input eventlistner func leave one checked
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
    document.getElementById("altBox").checked=false
  }

  if(box==="Ae"){
    document.getElementById("Ae_AeBox").checked=false
    document.getElementById("At_AeBox").checked=false
  }
}
/// solves vals on cards below before running equations up 

function runEqsDown(branch){  
  
  if(branch === "AeAt"){
    vals.PeP0=(AeAt_to_PeP0(vals.AeAt)).toFixed(5) // numerical method to solve for PeP0
  }
  

  if(branch === "Gamma"){
    vals.gamma = (Gamma_to_gamma(Number(vals.Gamma))).toFixed(2) // numerical method to solve for GAMMA

  }

  if(branch === "gamma"){
    let numGam = Number(vals.gamma) // just make it easier to write following eqs
    vals.Gamma = (Math.sqrt(numGam)*Math.pow((2/(numGam+1)),((numGam+1)/(2*(numGam-1))))).toFixed(2)
    vals.AeAt=(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(vals.PeP0),(2/numGam))*(1-Math.pow(Number(vals.PeP0),((numGam-1)/numGam))))).toFixed(5)
    PeP0Bound() // changes PeP0 bound based on new gamma
  }

  if(branch === "alt"){
    vals.Pa = ((101.325*Math.exp(-0.00012*(Number(vals.alt)*1000)))/100).toFixed(3)
  }

  if(branch === "Pa"){
    vals.alt = ((Math.log(0.986923*Number(vals.Pa))/(-0.00012))/1000).toFixed(3)
  }

  if(branch==="mdot" && document.getElementById("At_mdotBox").checked===true){ //check marks determine which params to keep constant
    if(Number(vals.Gamma)===0){ // when running eqs down, change to non-0 value to avoid infiniry and NAN error
      vals.Gamma="0.61"
    }
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
    vals.At=(Number(vals.mdot)*Math.sqrt(Number(vals.R)*Number(vals.T0)/Number(vals.M))/(Number(vals.Gamma)*100000*Number(vals.P0))).toFixed(2)
  }

  if(branch==="mdot" && document.getElementById("p0_mdotBox").checked===true){
    
    if(Number(vals.Gamma)===0){
      vals.Gamma="0.61"
    }
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
      vals.P0=((Number(vals.mdot)*Math.sqrt(Number(vals.R)*Number(vals.T0)/Number(vals.M))/(Number(vals.Gamma)*Number(vals.At)))/100000).toFixed(2)
  }

  if(branch==="mdot" && document.getElementById("M_mdotBox").checked===true){
    
    if(Number(vals.Gamma)===0){
      vals.Gamma="0.61"
    }
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
    vals.M=((Number(vals.T0)*Number(vals.R))/Math.pow(Number(vals.Gamma)*100000*Number(vals.P0)*Number(vals.At)/Number(vals.mdot),2)).toFixed(2)
  }

  if(branch==="mdot" && document.getElementById("T0_mdotBox").checked===true){
    if(Number(vals.Gamma)===0){
      vals.Gamma="0.61"
    }
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
    vals.T0=(Math.pow(Number(vals.Gamma)*100000*Number(vals.P0)*Number(vals.At)/Number(vals.mdot),2)*Number(vals.M)/Number(vals.R)).toFixed(2)
  }

  if(branch==="cstar" && document.getElementById("T0_cstarBox").checked===true){
    if(Number(vals.Gamma)===0){
      vals.Gamma="0.61"
    }
    if(Number(vals.M)===0){
      vals.M="0.01"
    }
    if(Number(vals.T0)===0){
      vals.T0="0.01"
    }
    vals.T0=(Number(vals.M)*Math.pow((Number(vals.cstar)*Number(vals.Gamma)),2)/Number(vals.R)).toFixed(2)
  }

  if(branch==="cstar" && document.getElementById("M_cstarBox").checked===true){
    if(Number(vals.Gamma)===0){
      vals.Gamma="0.61"
    }
    if(Number(vals.M)===0){
      vals.M="0.01"
    }
    if(Number(vals.T0)===0){
      vals.T0="0.01"
    }
    vals.M=((Number(vals.T0)*Number(vals.R))/Math.pow((Number(vals.cstar)*Number(vals.Gamma)),2)).toFixed(2)
  }

  if(branch==="cf" && document.getElementById("Pa/_cfBox").checked===true){
    let potenPaP0 = (Number(vals.cf)-Number(vals.Gamma)*Math.sqrt((2*Number(vals.gamma)/(Number(vals.gamma)-1))*(1-Math.pow(Number(vals.PeP0),((Number(vals.gamma)-1)/Number(vals.gamma)))))-Number(vals.PeP0)*Number(vals.AeAt))/(-Number(vals.AeAt))
    if (potenPaP0<0){ // makes sure PaP0 cant be negative (pressure always positive)
      vals.PaP0 = 0
    } else {
      vals.PaP0 = potenPaP0
    }
    
    if(document.getElementById("pa_p0Box").checked===true){
      if(Number(vals.Gamma)===0){
        vals.Gamma="0.61"
      }
      if(Number(vals.gamma)===0){
        vals.gamma="1.01"
      }
      if(Number(vals.Pa)===0){
        vals.Pa="0.01"
      }
      if(Number(vals.alt)===0){
        vals.alt="0.01"
      }
      if(Number(vals.P0)===0 || vals.P0==="Infinity"){
        vals.P0="0.01"
      }
      vals.Pa=(Number(vals.PaP0)*Number(vals.P0)).toFixed(2)
      vals.alt = ((Math.log(0.986923*Number(vals.Pa))/(-0.00012))/1000).toFixed(3)
    } else if(document.getElementById("p0_p0Box").checked===true){
      if(Number(vals.Gamma)===0){
        vals.Gamma="0.61"
      }
      if(Number(vals.gamma)===0){
        vals.gamma="1.01"
      }
      if(Number(vals.Pa)===0){
        vals.Pa="0.01"
      }
      if(Number(vals.alt)===0){
        vals.alt="0.01"
      }
      if(Number(vals.P0)===0 || vals.P0==="Infinity"){
        vals.P0="0.01"
      }
      vals.P0=(1/(Number(vals.PaP0)/Number(vals.Pa))).toFixed(2)
    }
  }



  if(branch==="PaP0" && document.getElementById("pa_p0Box").checked===true){
    if(Number(vals.Pa)===0){
      vals.Pa="0.01"
    }
    if(Number(vals.alt)===0){
      vals.alt="0.01"
    }
    if(Number(vals.P0)===0 || vals.P0==="Infinity"){
      vals.P0="0.01"
    }
    vals.Pa=(Number(vals.PaP0)*Number(vals.P0)).toFixed(2)
    vals.alt = ((Math.log(0.986923*Number(vals.Pa))/(-0.00012))/1000).toFixed(3)
  }

  if(branch==="PaP0" && document.getElementById("p0_p0Box").checked===true){
    if(Number(vals.Pa)===0){
      vals.Pa="0.01"
    }
    if(Number(vals.alt)===0){
      vals.alt="0.01"
    }
    if(Number(vals.P0)===0 || vals.P0==="Infinity"){
      vals.P0="0.01"
    }
    vals.P0=(1/(Number(vals.PaP0)/Number(vals.Pa))).toFixed(2)
  }

  if(branch==="AeAt" && document.getElementById("Ae_AeBox").checked===true){
    if(Number(vals.Ae)===0){
      vals.Ae="0.1"
    }
    if(Number(vals.At)===0){
      vals.At="0.1"
    }
    vals.Ae=(Number(vals.AeAt)*Number(vals.At)).toFixed(2)
  }

  if(branch==="AeAt" && document.getElementById("At_AeBox").checked===true){
    if(Number(vals.Ae)===0){
      vals.Ae="0.1"
    }
    if(Number(vals.At)===0){
      vals.At="0.1"
    }
    vals.At=(1/(Number(vals.AeAt)/Number(vals.Ae))).toFixed(2)
  }

  if(branch==="PeP0" && document.getElementById("Ae_AeBox").checked===true){
    if(Number(vals.Ae)===0){
      vals.Ae="0.1"
    }
    if(Number(vals.At)===0){
      vals.At="0.1"
    }
    let numGam = Number(vals.gamma)
    vals.AeAt=(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(vals.PeP0),(2/numGam))*(1-Math.pow(Number(vals.PeP0),((numGam-1)/numGam))))).toFixed(4)
    vals.Ae=(Number(vals.AeAt)*Number(vals.At)).toFixed(2)
  }

  if(branch==="PeP0" && document.getElementById("At_AeBox").checked===true){
    if(Number(vals.Ae)===0){
      vals.Ae="0.1"
    }
    if(Number(vals.At)===0){
      vals.At="0.1"
    }
    let numGam = Number(vals.gamma)
    vals.AeAt=(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(vals.PeP0),(2/numGam))*(1-Math.pow(Number(vals.PeP0),((numGam-1)/numGam))))).toFixed(4)
    vals.At=(1/(Number(vals.AeAt)/Number(vals.Ae))).toFixed(2)
    
  }
}

function Gamma_to_gamma(val){ // solve for gamma using Secant numerical method
  let x1=1.2
  let x2=1.1
  let xc = Math.sqrt(x2)*Math.pow((2/(x2+1)),((x2+1)/(2*(x2-1))))
  let xnp
  while (Math.abs(val-xc)>.001){
    xnp = x2 - (val - Math.sqrt(x2)*Math.pow((2/(x2+1)),((x2+1)/(2*(x2-1)))))/(((val - Math.sqrt(x2)*Math.pow((2/(x2+1)),((x2+1)/(2*(x2-1)))))-(val - Math.sqrt(x1)*Math.pow((2/(x1+1)),((x1+1)/(2*(x1-1))))))/(x2-x1))
    xc = Math.sqrt(xnp)*Math.pow((2/(xnp+1)),((xnp+1)/(2*(xnp-1))))
    x1=x2
    x2=xnp
  }
  return xnp
}

function cf_to_pep0(val){ // tried to solve for PeP0.. so far no numerical methods work
  // let numGam = Number(vals.gamma)
  // let x1=0.1
  // let x2=0.8
  // let xc = Number(vals.Gamma)*Math.sqrt((2*Number(vals.gamma)/(Number(vals.gamma)-1))*(1-Math.pow(x2,((Number(vals.gamma)-1)/Number(vals.gamma)))))+(x2-Number(vals.PaP0))*Number(vals.AeAt)
  // let xnp
  // let AeAt = vals.AeAt
  // // while (Math.abs(val-xc)>.001){
  // for (i=0;i<30;i++){
  //   xnp = x2 - (Number(vals.Gamma)*Math.sqrt((2*Number(vals.gamma)/(Number(vals.gamma)-1))*(1-Math.pow(x2,((Number(vals.gamma)-1)/Number(vals.gamma)))))+(x2-Number(vals.PaP0))*Number(AeAt))/(((val - Number(vals.Gamma)*Math.sqrt((2*Number(vals.gamma)/(Number(vals.gamma)-1))*(1-Math.pow(x2,((Number(vals.gamma)-1)/Number(vals.gamma)))))+(x2-Number(vals.PaP0))*Number(AeAt))-(val - Number(vals.Gamma)*Math.sqrt((2*Number(vals.gamma)/(Number(vals.gamma)-1))*(1-Math.pow(x1,((Number(vals.gamma)-1)/Number(vals.gamma)))))+(x1-Number(vals.PaP0))*Number(AeAt)))/(x2-x1))
  //   AeAt = (Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(vals.PeP0),(2/numGam))*(1-Math.pow(Number(vals.PeP0),((numGam-1)/numGam)))))
  //   xc = Number(vals.Gamma)*Math.sqrt((2*Number(vals.gamma)/(Number(vals.gamma)-1))*(1-Math.pow(xnp,((Number(vals.gamma)-1)/Number(vals.gamma)))))+(xnp-Number(vals.PaP0))*Number(AeAt)
  //   x1=x2
  //   x2=xnp
  //   console.log([xnp,xc])
    
  // }
  
  // // return xnp
  // let x1=0.4
  // let x2=0.401
  // let xc = Number(vals.Gamma)*Math.sqrt((2*numGam/(numGam-1))*(1-Math.pow(Number(x2),((numGam-1)/numGam))))+(Number(x2)-Number(vals.PaP0))*(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x2),(2/numGam))*(1-Math.pow(Number(x2),((numGam-1)/numGam)))))
  // let xnp
  // // // while (Math.abs(val-xc)>.001){
  // // // for (i=0; i<10; i++){
  // // //   xnp = x2 - (val - Math.sqrt(x2)*Math.pow((2/(x2+1)),((x2+1)/(2*(x2-1)))))/(((val - Math.sqrt(x2)*Math.pow((2/(x2+1)),((x2+1)/(2*(x2-1)))))-(val - Math.sqrt(x1)*Math.pow((2/(x1+1)),((x1+1)/(2*(x1-1))))))/(x2-x1))
  // // //   xc = Math.sqrt(xnp)*Math.pow((2/(xnp+1)),((xnp+1)/(2*(xnp-1))))
  // // //   x1=x2
  // // //   x2=xnp
  // // //   console.log([xnp,xc])
  // // // }
  // for (i=0; i<10; i++){
  //   xnp = x2 - (val-(Number(vals.Gamma)*Math.sqrt((2*numGam/(numGam-1))*(1-Math.pow(Number(x2),((numGam-1)/numGam))))+(Number(x2)-Number(vals.PaP0))*(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x2),(2/numGam))*(1-Math.pow(Number(x2),((numGam-1)/numGam)))))))/((((val-(Number(vals.Gamma)*Math.sqrt((2*numGam/(numGam-1))*(1-Math.pow(Number(x2),((numGam-1)/numGam))))+(Number(x2)-Number(vals.PaP0))*(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x2),(2/numGam))*(1-Math.pow(Number(x2),((numGam-1)/numGam))))))))-((val-(Number(vals.Gamma)*Math.sqrt((2*numGam/(numGam-1))*(1-Math.pow(Number(x1),((numGam-1)/numGam))))+(Number(x1)-Number(vals.PaP0))*(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x1),(2/numGam))*(1-Math.pow(Number(x1),((numGam-1)/numGam)))))))))/(x2-x1))
  //   xc = Number(vals.Gamma)*Math.sqrt((2*numGam/(numGam-1))*(1-Math.pow(Number(xnp),((numGam-1)/numGam))))+(Number(xnp)-Number(vals.PaP0))*(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(xnp),(2/numGam))*(1-Math.pow(Number(xnp),((numGam-1)/numGam)))))
  //   x1=x2
  //   x2=xnp
  //   console.log([xnp,xc])

  // }
  
  // return xnp


  // let x0 = 0.000001
  // let x1 = 0.3
  // let numGam = Number(vals.gamma)
  // let xout = Number(vals.Gamma)*Math.sqrt((2*numGam/(numGam-1))*(1-Math.pow(Number(x0),((numGam-1)/numGam))))+(Number(x0)-Number(vals.PaP0))*(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x0),(2/numGam))*(1-Math.pow(Number(x0),((numGam-1)/numGam)))))
  // let fout = 0
  // let testlist=[]
  // // while (Math.abs(fout-val)>0.01){
  // for(i=0;i<50;i++)  {
  //   // let f0 = val - Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x0),(2/numGam))*(1-Math.pow(Number(x0),((numGam-1)/numGam))))
  //   let f1 = val - Number(vals.Gamma)*Math.sqrt((2*numGam/(numGam-1))*(1-Math.pow(Number(x1),((numGam-1)/numGam))))+(Number(x1)-Number(vals.PaP0))*(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x1),(2/numGam))*(1-Math.pow(Number(x1),((numGam-1)/numGam)))))
  //   let xn = (x0+x1)/2
  //   let fn = val - Number(vals.Gamma)*Math.sqrt((2*numGam/(numGam-1))*(1-Math.pow(Number(xn),((numGam-1)/numGam))))+(Number(xn)-Number(vals.PaP0))*(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(xn),(2/numGam))*(1-Math.pow(Number(xn),((numGam-1)/numGam)))))
    
  //   console.log([f1,x0,x1,xout,Math.abs(fout-val)])
  //   testlist.push([Math.abs(fout-val),xout])
  //   if (fn*f1<0){
  //     x0 = (x0+x1)/2
  //     fout = Number(vals.Gamma)*Math.sqrt((2*numGam/(numGam-1))*(1-Math.pow(Number(x0),((numGam-1)/numGam))))+(Number(x0)-Number(vals.PaP0))*(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x0),(2/numGam))*(1-Math.pow(Number(x0),((numGam-1)/numGam)))))
  //     xout=x0
  //   } else {
  //     x1 = (x1+x0)/2
  //     fout = Number(vals.Gamma)*Math.sqrt((2*numGam/(numGam-1))*(1-Math.pow(Number(x1),((numGam-1)/numGam))))+(Number(x1)-Number(vals.PaP0))*(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x1),(2/numGam))*(1-Math.pow(Number(x1),((numGam-1)/numGam)))))
  //     xout=x1
  //   }
  // }
  // testlist.sort()
  // console.log(testlist)
  // return testlist[0][1]
  // return xout
  // let numGam = Number(vals.gamma)
  // let bound = 100*findMin()

  // for(i=0; i<bound; i++){
  //   if (i<60){
  //     x0 = Math.log((i/1000)+1)
  //     let fout=Number(vals.Gamma)*Math.sqrt((2*numGam/(numGam-1))*(1-Math.pow(Number(x0),((numGam-1)/numGam))))+(Number(x0)-Number(vals.PaP0))*(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x0),(2/numGam))*(1-Math.pow(Number(x0),((numGam-1)/numGam)))))
  //     console.log([x0,fout])
      
  //   }else{
  //     x0=i/100
  //     let fout=Number(vals.Gamma)*Math.sqrt((2*numGam/(numGam-1))*(1-Math.pow(Number(x0),((numGam-1)/numGam))))+(Number(x0)-Number(vals.PaP0))*(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x0),(2/numGam))*(1-Math.pow(Number(x0),((numGam-1)/numGam)))))
  //     console.log([i/100, fout])
  //   }
    // let x0=i/100
    // let fout=Number(vals.Gamma)*Math.sqrt((2*numGam/(numGam-1))*(1-Math.pow(Number(x0),((numGam-1)/numGam))))+(Number(x0)-Number(vals.PaP0))*(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x0),(2/numGam))*(1-Math.pow(Number(x0),((numGam-1)/numGam)))))
    // console.log([fout,i/100])
  // }  
  
//   let numGam = Number(vals.gamma)
//   let bound = Math.floor(100*findMin())
//   for (i=bound;i>0;i--){
//     let x0=i/100
//     let fout=Number(vals.Gamma)*Math.sqrt((2*numGam/(numGam-1))*(1-Math.pow(Number(x0),((numGam-1)/numGam))))+(Number(x0)-Number(vals.PaP0))*(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x0),(2/numGam))*(1-Math.pow(Number(x0),((numGam-1)/numGam)))))
//     console.log([fout,x0,Math.abs(val-fout)])
//     if(Math.abs(val-fout)<0.1){
//       return x0
//     } else if(fout<0) {
//       break
//     }
//   }
  
//   for(i=100;i>0;i--){
//     let x0=i/10000
//     let fout=Number(vals.Gamma)*Math.sqrt((2*numGam/(numGam-1))*(1-Math.pow(Number(x0),((numGam-1)/numGam))))+(Number(x0)-Number(vals.PaP0))*(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x0),(2/numGam))*(1-Math.pow(Number(x0),((numGam-1)/numGam)))))
//     console.log([fout,x0,Math.abs(val-fout)])
//     if(Math.abs(val-fout)<0.1){
//       return x0
//     } else if(fout<0) {
//       break
//     }
//   } 
//   for(i=100;i>0;i--){
//     let x0=i/100000
//     let fout=Number(vals.Gamma)*Math.sqrt((2*numGam/(numGam-1))*(1-Math.pow(Number(x0),((numGam-1)/numGam))))+(Number(x0)-Number(vals.PaP0))*(Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x0),(2/numGam))*(1-Math.pow(Number(x0),((numGam-1)/numGam)))))
//     console.log([fout,x0,Math.abs(val-fout)])
//     if(Math.abs(val-fout)<0.1){
//       return x0
//     } else if(fout<0) {
//       break
//     }
//   } 
  
//   return 0.00001
}

function AeAt_to_PeP0(val){ //solve for PeP0 using bisection method (slower than secant method but always converges) Secant doenst work with the particular equation beacuse it is local min 
  
  let fout = 0
  let x0 = bounds.PeP0[0]
  let x1 = bounds.PeP0[1]
  let numGam = Number(vals.gamma)
  let xout = Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x0),(2/numGam))*(1-Math.pow(Number(x0),((numGam-1)/numGam))))
  // while (Math.abs(fout-val)>0.01){
  for(i=0;i<20;i++)  { // Could be while but want to limit numebr of iterations (could lead to small innacuraices)
    // let f0 = val - Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x0),(2/numGam))*(1-Math.pow(Number(x0),((numGam-1)/numGam))))
    let f1 = val - Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x1),(2/numGam))*(1-Math.pow(Number(x1),((numGam-1)/numGam))))
    let xn = (x0+x1)/2
    let fn = val - Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(xn),(2/numGam))*(1-Math.pow(Number(xn),((numGam-1)/numGam))))
    

    if (fn*f1<0){
      x0 = (x0+x1)/2
      fout = Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x0),(2/numGam))*(1-Math.pow(Number(x0),((numGam-1)/numGam))))
      xout=x0
    } else {
      x1 = (x1+x0)/2
      fout = Number(vals.Gamma)/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x1),(2/numGam))*(1-Math.pow(Number(x1),((numGam-1)/numGam))))
      xout=x1
    }
  }
  return xout
}


function CfBound(){ // changes CfBound based on gammas and pep0 values
  let bound = Math.round((Number(vals.Gamma)*Math.sqrt((2*Number(vals.gamma)/(Number(vals.gamma)-1))*(1-Math.pow(Number(vals.PeP0),((Number(vals.gamma)-1)/Number(vals.gamma)))))+Number(vals.PeP0)*Number(vals.AeAt))*100)/100
  document.getElementById("cf_ThrustRange").max=bound // changes html slider to correct range
  return bound
}

function PeP0Bound(){ // changes PeP0 bounds based on gamma values

  let bound = [0.00001, Math.round(findMin()*100)/100] // uses findMin function to find upper bound
  document.getElementById("Pe/_cfRange").max=(bound[1]-0.175) // changes html slider with margin so slider is closer to end
  bounds.PeP0=bound
}


function MolarMass(option){ // change dropdown to appropriate options based on propsHTML object
  const MOxi = document.getElementById("MOxi")
  const MFuel = document.getElementById("MFuel")
  const MOF = document.getElementById("MOF")
  let oxi = MOxi.selectedOptions[0].label
  
  if (option==="Oxi"){
    MFuel.innerHTML=propsHTML[oxi][0]
  }
  
  MOF.innerHTML=propsHTML[oxi][1][MFuel.selectedOptions[0].label]
  
  if(document.getElementById("MOxi").selectedOptions[0].label ==="Custom"){ // for Custom selection - disables molar mass card
    customTempMolar()
  } else {
    document.getElementById("MFuel").disabled=false
    document.getElementById("MOF").disabled=false
  }

}


function assignValueMolar(){ // assign temperature and molar mass values based on selected dropdowns and propVals object
  const MOxi = document.getElementById("MOxi").selectedOptions[0].label
  const MFuel = document.getElementById("MFuel").selectedOptions[0].label
  const MOF = document.getElementById("MOF").selectedOptions[0].label

  if(MOxi!=="Custom"){
    return propVals[MOxi][MFuel][MOF]
  } else {
    return [vals.M, vals.T0]
  }
}

function findMin(){ // find min by walking down parabola by 0.005 (slow method)
  let numGam = Number(vals.gamma)
  let Gamma = Number(vals.Gamma)
  if (numGam===1){
    numGam=1.01
    Gamma=0.61
  }
  
  
  let x1 = 0.525
  let xn = 0.53
  let f1 = Gamma/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(x1),(2/numGam))*(1-Math.pow(Number(x1),((numGam-1)/numGam))))
  let fn = Gamma/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(xn),(2/numGam))*(1-Math.pow(Number(xn),((numGam-1)/numGam))))

  while(true){
    if(fn<f1){
      let fbef = Gamma/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(xn),(2/numGam))*(1-Math.pow(Number(xn),((numGam-1)/numGam))))
      xn = xn+.005
      let fn = Gamma/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(xn),(2/numGam))*(1-Math.pow(Number(xn),((numGam-1)/numGam))))
      
      if(fbef<fn){
        return xn-0.005
      }
      
    } else {
      let fbef = Gamma/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(xn),(2/numGam))*(1-Math.pow(Number(xn),((numGam-1)/numGam))))
      xn = xn-0.005
      let fn = Gamma/Math.sqrt(((2*numGam)/(numGam-1))*Math.pow(Number(xn),(2/numGam))*(1-Math.pow(Number(xn),((numGam-1)/numGam))))
      
      
      if(fbef<fn){
        return xn+0.005
      }
      
    }
  }
}

function Ae_At_value(branch){ // keep Ae larger than At by factor of at least 1.1
  if(branch==="Ae"){
    
    if(Number(vals.Ae)/Number(vals.At)<=1.1 && Number(vals.Ae)!==0){
      vals.At=(Number(vals.Ae)/1.1).toFixed(2)
    }
  } else if(branch==="At"){
    if(Number(vals.Ae)/Number(vals.At)<=1.1 && Number(vals.At)!==0){
      vals.Ae=(Number(vals.At)*1.1).toFixed(2)
    }
  }
  
}

function customTempMolar(){
  document.getElementById("MOxi").selectedIndex=4 // first option is "custom"
  document.getElementById("MFuel").selectedOptions[0].label="Custom"
  document.getElementById("MOF").selectedOptions[0].label="Custom"
  document.getElementById("MFuel").disabled=true // disables dropdown
  document.getElementById("MOF").disabled=true // disables dropdown
}

function initialChecks(){ // check boxes on page load
  document.getElementById("T0_mdotBox").checked=true
  document.getElementById("T0_cstarBox").checked=true
  document.getElementById("Pa/_cfBox").checked=true
  document.getElementById("p0_p0Box").checked=true
  document.getElementById("Ae_AeBox").checked=true
}

function placeholderVals(val, tag){ // puts placeholder message an input field
  if(val==="Infinity" || val==="-Infinity"){
    document.getElementById(tag).placeholder=val
  } else if (val==="NaN"){
    document.getElementById(tag).placeholder="Math Error"
  } else {
    return val
  }
}

function outNaN(val){ // for left card output. returns "Math Error" instead of NaN
  if(val==="NaN"){
    return "Math Error"
  } else if(val==="Infinity" || val==="-Infinity"){
    return val
  }else{
    return (Math.round(Number(val))).toString()
  }
}


}())