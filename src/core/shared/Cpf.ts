import Erros from "../constants/Erros";
import RegiaoCpf from "./RegiaoCpf";

export default class Cpf {
  readonly valor: string;

  constructor(valor?: string) {
    this.valor = Cpf.manterSomenteNumeros(valor);
    if (!Cpf.isValido(this.valor)) throw new Error(Erros.CPF_INVALIDO);
  }

  get regiao(): RegiaoCpf {
    return RegiaoCpf.porCpf(this.valor);
  }

  get formatado() {
    return this.valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  get digitoVerificador() {
    return this.valor.slice(9);
  }

  static isValido(cpf: string): boolean {
    if (!cpf) return false;
    const nums = Cpf.manterSomenteNumeros(cpf).split("");
    if (nums.length !== 11) return false;
    const dv1 = Cpf.validarDV(nums.slice(0, 9), nums[9]);
    const dv2 = Cpf.validarDV(nums.slice(1, 10), nums[10]);
    return dv1 && dv2;
  }

  private static manterSomenteNumeros(valor?: string) {
    return valor ? valor.replace(/\D/g, "") : "";
  }

  private static validarDV(digitos: string[], dvInformado: string): boolean {
    const fatores = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const total = digitos.reduce((total, digito, indice) => {
      return total + +digito * fatores[indice];
    }, 0);
    const resto = total % 11;
    const dvCalculado = resto < 2 ? 0 : 11 - resto;
    return dvCalculado === +dvInformado;
  }
}
