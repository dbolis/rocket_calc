// let pe // Exit Pressure
// let p0 // Chamber Pressure
// let pa // Atmospheric Pressure
// let Ae // Exit Area
// let At // Throat Area
// let R = 8.178 // Gas Constant (look up val)
// let T0  // Chamber Pressure
// let Mol // Average Molecular Mass
// let M // Mac number
// let gamma // Small Gamma
// let Gamma // Big Gamma

// let Cf = Gamma*Math.sqrt(((2*gamma)/(gamma-1))*(1-Math.pow((pe/p0),((gamma-1)/gamma))))+(pe/p0-pa/p0)*(Ae/At)

// c_star = (1/Gamma)*Math.sqrt((R*T0)/Mol)

MathJax.Hub.Config({
  "HTML-CSS": {
      sstyles: {

        ".MathJax_Display": {
          "text-align": "center",
          margin:       "0em 0em"
        },
  }
});