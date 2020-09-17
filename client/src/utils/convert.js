let convert = {
  
  kgToLbs: (kg)=>{
    var lbs = parseFloat(kg * 2.2046).toFixed(1);
    return lbs;
  },

  lbsToKg: (lbs)=>{
    var kg = parseFloat(lbs / 2.2046).toFixed(3);
    return kg;
  },

  cmToFtRemainderInInches: (cm)=>{
    var ft = parseInt((cm / 2.54) / 12);
    var inches = parseInt((cm / 2.54) % 12);
    return {ft, inches};
  },

  ftAndInchesToCm: (ft, inches)=>{
    inches += ft * 12;
    var cm = inches * 2.54;
    return cm
  }

  

}

export default convert; 