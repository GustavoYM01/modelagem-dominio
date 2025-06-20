import RegiaoCpf from "@/core/shared/RegiaoCpf";

test("Deve criar uma RegiaoCpf por código", () => {
  const regiao = RegiaoCpf.porCodigo(0);

  expect(regiao.codigo).toEqual(0);
  expect(regiao.estados[0]).toEqual("RS");
});

test("Deve criar uma RegiaoCpf por CPF", () => {
  const regiao = RegiaoCpf.porCpf("720.495.290-15");

  expect(regiao.codigo).toEqual(0);
  expect(regiao.estados[0]).toEqual("RS");
});

test("Deve comparar regiões iguais (do mesmo estado)", () => {
  const regiaoA = RegiaoCpf.porCpf("263.575.817-47");
  const regiaoB = RegiaoCpf.porCpf("672.013.597-03");

  expect(regiaoA.igual(regiaoB)).toBeTruthy();
  expect(regiaoA.diferente(regiaoB)).toBeFalsy();
});

test("Deve comparar regiões diferentes (estados diferentes)", () => {
  const regiaoA = RegiaoCpf.porCpf("358.076.972-35");
  const regiaoB = RegiaoCpf.porCpf("859.540.358-90");

  expect(regiaoA.igual(regiaoB)).toBeFalsy();
  expect(regiaoA.diferente(regiaoB)).toBeTruthy();
});

test("Deve comparar uma região com undefined", () => {
  const regiao = RegiaoCpf.porCpf("358.076.972-35");

  expect(regiao.diferente(undefined as any)).toBeTruthy();
  expect(regiao.igual(undefined as any)).toBeFalsy();
});

test("Deve criar uma RegiaoCpf de SP", () => {
  const regiao = RegiaoCpf.SP;
  expect(regiao.codigo).toEqual(8);
  expect(regiao.estados[0]).toEqual("SP");
});

test("Deve comparar as mesmas instâncias", () => {
  const regiaoA = RegiaoCpf.porCpf("699.125.288-32");
  const regiaoB = RegiaoCpf.porCpf("859.540.358-90");

  expect(regiaoA === regiaoB).toBeTruthy();
});

test("Deve criar uma RegiaoCpf de CE_MA_PI", () => {
  const regiao = RegiaoCpf.CE_MA_PI;
  expect(regiao.codigo).toEqual(3)
  expect(regiao.estados[0]).toEqual('CE')
  expect(regiao.estados[1]).toEqual('MA')
  expect(regiao.estados[2]).toEqual('PI')
})