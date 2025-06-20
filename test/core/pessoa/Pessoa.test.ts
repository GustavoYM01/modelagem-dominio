import Erros from "@/core/constants/Erros";
import Cpf from "@/core/shared/Cpf";
import Id from "@/core/shared/Id";
import PessoaBuilder from "@/test/data/PessoaBuilder";
import { generate as gerarCpf } from "gerador-validador-cpf";

test("Deve lançar erro ao tentar criar uma pessoa com nome vazio", () => {
  expect(() => PessoaBuilder.criar().semNome().semCpf().agora()).toThrow(
    Erros.NOME_VAZIO
  );
});

test("Deve lançar erro ao tentar criar uma pessoa sem CPF", () => {
  expect(() => PessoaBuilder.criar().semCpf().agora()).toThrow(
    Erros.CPF_INVALIDO
  );
});

test("Deve criar uma pessoa válida", () => {
  // const pessoa = new Pessoa({
  //   nome: "Pedro Augusto Soares",
  //   cpf: "586.159.270-57",
  // });
  const nome = "Pedro Augusto Soares";
  const pessoa = PessoaBuilder.criar().comNome(nome).semId().agora();
  expect(pessoa.nome.completo).toBe(nome);
  expect(pessoa.id.novo).toBeTruthy();
});

test("Deve criar uma pessoa válida com ID por parâmetro", () => {
  const id = Id.novo.valor;
  const pessoa = PessoaBuilder.criar().comId(id).agora();
  expect(pessoa.id.novo).toBeFalsy();
  expect(pessoa.id).not.toBeNull();
  expect(pessoa.id).not.toBeUndefined();
});

test("Deve criar uma pessoa válida com CPF válido por parâmetro", () => {
  const cpf = gerarCpf();
  const pessoa = PessoaBuilder.criar().comCpf(cpf).agora();
  expect(pessoa.cpf.valor).not.toBeUndefined();
  expect(pessoa.cpf.valor).not.toBeNull();
  expect(Cpf.isValido(pessoa.cpf.valor)).toBeTruthy();
});

test("Deve clonar objeto com nome alterado", () => {
  const pessoa = PessoaBuilder.criar().agora();
  const novaPessoa = pessoa.clone({ nome: "Pedro Augusto Pereira" });
  expect(pessoa.nome.completo).not.toEqual(novaPessoa.nome.completo);
  expect(pessoa.cpf.valor).toBe(novaPessoa.cpf.valor);
  expect(pessoa.id.valor).toBe(novaPessoa.id.valor);
});

test("Deve clonar objeto com id alterado", () => {
  const pessoa = PessoaBuilder.criar().agora();
  const novaPessoa = pessoa.clone({ id: Id.novo.valor });
  expect(novaPessoa.id.valor).not.toEqual(pessoa.id.valor);
  expect(novaPessoa.nome.completo).toBe(pessoa.nome.completo);
  expect(novaPessoa.cpf.valor).toBe(pessoa.cpf.valor);
});
