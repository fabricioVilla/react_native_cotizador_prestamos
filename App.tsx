/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect }  from 'react';
import {StyleSheet, View ,Text, SafeAreaView, StatusBar,Button} from 'react-native'
import colores from './src/utils/color'
import Formulario from './src/components/Formulario';
import { useState } from 'react';
import PieDePagina from './src/components/PieDePagina'
import ResultadosDECalculos from './src/components/ResultadosDeCalulos'

export default function App(){
  const [monto, setMonto] = useState(null);
  const [interes, setInteres] = useState(null);
  const [meses, setMeses] = useState(null);
  const [total, setTotal] = useState(null);
  const [erroMesage, setErrorMesage] = useState("");


  useEffect(()=>{
    if(monto >0 && interes >0  && meses >0 ) calcularFn();
    else reset();
  },
  [monto,interes,meses]);



  const calcularFn = ()=>{
    reset();
    console.log("--------meses: ", meses);
    if(!monto){
      setErrorMesage("El campo monto es requerido");
    }else if(!interes){
      setErrorMesage("El campo interes es requerido");
    }else if(!meses){
      setErrorMesage("El campo meses es requerido");
    }else{
      const i = interes / 100;
      console.log("i : ", i );
      const fee = monto / ((1-Math.pow(i+1,-meses))/i);

      setTotal({
        totalAlMes: fee.toFixed(2),
        totalPagar: (fee * meses).toFixed(2)
      });

      console.log("total al mes: ",total);
   
    }

  };

  const reset=()=>{
    setErrorMesage("");
    setTotal(null);
  };

  return (
    <>
    <StatusBar barStyle="light-content"></StatusBar>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.fondo}></View>
        <Text style={styles.tituloApp}>Cotizador de prestamos</Text>
        <Formulario
          setMonto={setMonto}
          setInteres ={setInteres}
          setMeses={setMeses}
        ></Formulario>
      </SafeAreaView>
   
      <ResultadosDECalculos 
        erroMesage={erroMesage} 
        total={total}
        meses={meses}
        interes={interes}
        monto={monto}
      >
      </ResultadosDECalculos>

      <PieDePagina calcularFn={calcularFn}></PieDePagina>
    </>
  );
}

const styles=StyleSheet.create({
  safeArea:{
    height: 290,
    // justifyContent: "center",
    alignItems: "center"
  },
  tituloApp:{
    fontSize: 25,
    fontWeight: "bold",
    color:"#fff",
    marginTop: 55
  },
  fondo:{
    position:"absolute",
    height: 200,
    backgroundColor: colores.PRIMARY_COLOR,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: "100%",
    top:0
  }
});