import Pessoa, { PessoaProps } from "@/core/pessoa/Pessoa";
import Id from "@/core/shared/Id";
import { faker } from "@faker-js/faker";
import { generate as cpf } from "gerador-validador-cpf";

export default class PessoaBuilder {
  private constructor(private props: PessoaProps) {}

  static criar() {
    return new PessoaBuilder({
      id: Id.novo.valor,
      nome: faker.person.fullName(),
      cpf: cpf(),
    });
  }

  static criarLista(quantidade: number = 10) {
    return Array(quantidade)
      .fill(0)
      .map(() => {
        return PessoaBuilder.criar().agora();
      });
  }

  comId(id: string): PessoaBuilder {
    this.props.id = id;
    return this;
  }

  semId(): PessoaBuilder {
    this.props.id = undefined;
    return this;
  }

  comNome(nome: string): PessoaBuilder {
    this.props.nome = nome;
    return this;
  }

  semNome(): PessoaBuilder {
    this.props.nome = undefined;
    return this;
  }

  comCpf(cpf: string): PessoaBuilder {
    this.props.cpf = cpf;
    return this;
  }

  semCpf(): PessoaBuilder {
    this.props.cpf = undefined;
    return this;
  }

  agora(): Pessoa {
    return new Pessoa(this.props);
  }
}
