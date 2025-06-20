import Erros from "@/core/constants/Erros";
import Cpf from "@/core/shared/Cpf";
import RegiaoCpf from "@/core/shared/RegiaoCpf";

test("Deve retornar cpf inválido (false) para string vazia", () => {
  expect(Cpf.isValido("")).toBeFalsy();
});

test("Deve retornar cpf inválido (false) para string incompleta", () => {
  expect(Cpf.isValido("123")).toBeFalsy();
  expect(Cpf.isValido("1234")).toBeFalsy();
  expect(Cpf.isValido("12345")).toBeFalsy();
  expect(Cpf.isValido("123456")).toBeFalsy();
  expect(Cpf.isValido("123.456.789-0")).toBeFalsy();
});

test("Deve retornar cpf inválido (false) para DV (Dígito Verificador) inválido", () => {
  expect(Cpf.isValido("123.456.789-00")).toBeFalsy();
});

test("Deve retornar cpf válido (true) para DV (Dígito Verificador) válido", () => {
  expect(Cpf.isValido("280.012.389-38")).toBeTruthy();
  expect(Cpf.isValido("212.720.510-30")).toBeTruthy();
  expect(Cpf.isValido("586.159.270-57")).toBeTruthy();
  expect(Cpf.isValido("144.186.790-22")).toBeTruthy();
});

test("Deve retornar o DV (Dígito Verificador) do CPF", () => {
  expect(new Cpf("280.012.389-38").digitoVerificador).toBe("38");
  expect(new Cpf("212.720.510-30").digitoVerificador).toBe("30");
  expect(new Cpf("586.159.270-57").digitoVerificador).toBe("57");
  expect(new Cpf("144.186.790-22").digitoVerificador).toBe("22");
});

test("Deve lançar um erro para CPF vazio", () => {
  expect(() => new Cpf()).toThrow(Erros.CPF_INVALIDO);
  expect(() => new Cpf("")).toThrow(Erros.CPF_INVALIDO);
});

test("Deve lançar erro para CPF incompleto ou inválido", () => {
  expect(() => new Cpf("280.012.389")).toThrow(Erros.CPF_INVALIDO);
  expect(() => new Cpf("12345")).toThrow(Erros.CPF_INVALIDO);
  expect(() => new Cpf("586.159-57")).toThrow(Erros.CPF_INVALIDO);
  expect(() => new Cpf("123.456.789-00")).toThrow(Erros.CPF_INVALIDO);
});

test("Deve lançar erro para CPF com DV (Dígito Verificador) inválido", () => {
  expect(() => new Cpf("123.456.789-00")).toThrow(Erros.CPF_INVALIDO);
});

test("Deve retornar CPF formatado", () => {
  expect(new Cpf("28001238938").formatado).toBe("280.012.389-38");
  expect(new Cpf("21272051030").formatado).toBe("212.720.510-30");
  expect(new Cpf("58615927057").formatado).toBe("586.159.270-57");
  expect(new Cpf("144.186.790-22").formatado).toBe("144.186.790-22");
});

test("Deve retornar o valor do CPF", () => {
  expect(new Cpf("28001238938").valor).toBe("28001238938");
  expect(new Cpf("21272051030").valor).toBe("21272051030");
  expect(new Cpf("58615927057").valor).toBe("58615927057");
  expect(new Cpf("144.186.790-22").valor).toBe("14418679022");
});

test("Deve retornar a região do CPF", () => {
  expect(new Cpf("28001238938").regiao).toEqual(RegiaoCpf.PR_SC);
  expect(new Cpf("21272051030").regiao.codigo).toEqual(0);
  expect(new Cpf("725.359.682-07").regiao.estados).toEqual([
    "AC",
    "AM",
    "AP",
    "PA",
    "RO",
    "RR",
  ]);
  expect(new Cpf("144.186.790-22").regiao).toEqual(RegiaoCpf.RS);
});
