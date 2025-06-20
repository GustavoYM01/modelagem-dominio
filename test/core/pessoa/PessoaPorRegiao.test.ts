import PessoasPorRegiao from "@/core/pessoa/PessoasPorRegiao";
import RegiaoCpf from "@/core/shared/RegiaoCpf";
import PessoaBuilder from "@/test/data/PessoaBuilder";

test("Deve agrupar as pessoas da região de SP", () => {
  const pessoas = PessoaBuilder.criarLista(10000);
  const agrupadas = new PessoasPorRegiao(pessoas).agrupar();

  const pessoasSP = agrupadas.get(RegiaoCpf.SP) ?? [];
  const mesmaRegiao = pessoasSP.every((pessoa) =>
    pessoa.cpf.regiao.igual(RegiaoCpf.SP)
  );
  expect(mesmaRegiao).toBeTruthy();

  const pessoasES_RJ = agrupadas.get(RegiaoCpf.ES_RJ) ?? [];
  const regiaoDiferente = pessoasES_RJ.every((pessoa) =>
    pessoa.cpf.regiao.diferente(RegiaoCpf.SP)
  );
  expect(regiaoDiferente).toBeTruthy();
});
