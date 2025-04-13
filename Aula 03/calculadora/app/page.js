"use client"
import { useState } from "react";
import styles from "./page.module.css";
import Botoes from "@/app/components/Botoes";
import Display from "@/app/components/Display";

export default function Home() {
  const [valorDisplay, setValorDisplay] = useState("");
  const [valorAnterior, setValorAnterior] = useState("");
  const [operador, setOperador] = useState("");
  const [expressao, setExpressao] = useState("");

  const clicarNumero = (num) => {
    setValorDisplay((prev) => prev + num);
    setExpressao((prev) => prev + num);
  };

  const clicarOperador = (op) => {
    if (!valorDisplay) return; // impede clicar operador no início

    setOperador(op);
    setValorAnterior(valorDisplay);
    setValorDisplay("");
    setExpressao((prev) => prev + " " + op + " ");
  };

  const calcular = () => {
    try {
      const resultado = eval(expressao.replace("×", "*").replace("÷", "/").replace(",", "."));
      setValorDisplay(String(resultado));
      setExpressao(String(resultado));
      setValorAnterior("");
      setOperador("");
    } catch (e) {
      setValorDisplay("Erro");
      setExpressao("");
    }
  };

  const limpar = () => {
    setValorDisplay("");
    setValorAnterior("");
    setOperador("");
    setExpressao("");
  };

  return (
    <div className={styles.page}>
      <div className={styles.calculadora}>
        <Display valorDisplay={expressao || "0"} />

        <Botoes valor="C" onClick={limpar} tipo="control" />
        <Botoes valor="+/-" onClick={() => {
          if (valorDisplay) {
            const valor = String(parseFloat(valorDisplay) * -1);
            setValorDisplay(valor);
            setExpressao((prev) => {
              const partes = prev.trim().split(" ");
              partes[partes.length - 1] = valor;
              return partes.join(" ");
            });
          }
        }} tipo="control" />
        <Botoes valor="%" onClick={() => {
          if (valorDisplay) {
            const valor = String(parseFloat(valorDisplay) / 100);
            setValorDisplay(valor);
            setExpressao((prev) => prev + " %");
          }
        }} tipo="control" />
        <Botoes valor="÷" onClick={() => clicarOperador("÷")} tipo="operador" />

        {[7, 8, 9].map(n => (
          <Botoes key={n} valor={n} onClick={() => clicarNumero(n)} tipo="numero" />
        ))}
        <Botoes valor="×" onClick={() => clicarOperador("×")} tipo="operador" />

        {[4, 5, 6].map(n => (
          <Botoes key={n} valor={n} onClick={() => clicarNumero(n)} tipo="numero" />
        ))}
        <Botoes valor="−" onClick={() => clicarOperador("-")} tipo="operador" />

        {[1, 2, 3].map(n => (
          <Botoes key={n} valor={n} onClick={() => clicarNumero(n)} tipo="numero" />
        ))}
        <Botoes valor="+" onClick={() => clicarOperador("+")} tipo="operador" />

        <Botoes valor="0" onClick={() => clicarNumero(0)} tipo="numero" style={{ gridColumn: "span 2" }} />
        <Botoes valor="," onClick={() => clicarNumero(",")} tipo="numero" />
        <Botoes valor="=" onClick={calcular} tipo="operador" />
      </div>
    </div>
  );
}
