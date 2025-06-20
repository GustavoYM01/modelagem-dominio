import Entidade, { EntidadeProps } from "@/core/shared/Entidade";
import Id from "@/core/shared/Id";

interface TesteProps extends EntidadeProps {
  nome?: string;
  idade?: number;
}

class Teste extends Entidade<Teste, TesteProps> {
  readonly nome: string;
  readonly idade: number;

  constructor(props: TesteProps) {
    super(props);
    this.nome = props.nome ?? "";
    this.idade = props.idade ?? 0;
  }
}

test("Deve comparar duas entidades diferentes", () => {
  const entidade1 = new Teste({ nome: "Pedro", idade: 18 });
  const entidade2 = new Teste({ nome: "Pedro", idade: 18 });

  expect(entidade1.igual(entidade2)).toBe(false);
  expect(entidade1.diferente(entidade2)).toBe(true);
});

test("Deve comparar duas entidades com o mesmo id e atributos diferentes", () => {
  const id = Id.novo.valor;
  const entidade1 = new Teste({ id, nome: "Pedro", idade: 18 });
  const entidade2 = new Teste({ id, nome: "Maria", idade: 22 });

  expect(entidade1.igual(entidade2)).toBe(true);
  expect(entidade1.diferente(entidade2)).toBe(false);
});

test("Deve comparar entidade com undefined ou null", () => {
  const entidade1 = new Teste({ nome: "João", idade: 23 });

  expect(entidade1.igual(undefined as any)).toBeFalsy();
  expect(entidade1.igual(null as any)).toBeFalsy();
  expect(entidade1.diferente(undefined as any)).toBeTruthy();
  expect(entidade1.diferente(null as any)).toBeTruthy();
});

test("Deve clonar uma entidade com nome diferente", () => {
  const entidade1 = new Teste({ nome: "Maria", idade: 55 });
  const entidade2 = entidade1.clone({ nome: "Maria da Silva Pereira" });

  expect(entidade2.id.valor).toEqual(entidade1.id.valor);
  expect(entidade2.nome).toEqual("Maria da Silva Pereira");
  expect(entidade2.idade).toEqual(entidade1.idade);
});

test("Deve clonar uma entidade com ID diferente", () => {
  const entidade1 = new Teste({ nome: "Maria", idade: 55 });
  const entidade2 = entidade1.clone({ id: Id.novo.valor });

  expect(entidade2.id.diferente(entidade1.id)).toBeTruthy();
  expect(entidade2.nome).toEqual(entidade1.nome);
  expect(entidade2.idade).toEqual(entidade1.idade);
});
