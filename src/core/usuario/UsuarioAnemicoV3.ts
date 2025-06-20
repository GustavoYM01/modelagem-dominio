import Erros from "../constants/Erros";
import Validador from "../utils/Validador";

export default class UsuarioAnemicoV3 {
  constructor(
    private id: number,
    private nome: string,
    private email: string,
    private senha?: string
  ) {
    this.setId(id);
    this.setNome(nome);
    this.setEmail(email);
    if (senha) this.setSenha(senha);
  }

  getId() {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  getNome() {
    return this.nome;
  }

  setNome(nome: string) {
    this.nome = nome;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email: string) {
    if (Validador.isEmailValido(email)) {
      this.email = email;
    }
  }

  getSenha() {
    return this.senha;
  }

  setSenha(senha: string) {
    if (senha.length < 6) throw new Error(Erros.SENHA_INVALIDA);
    this.senha = senha;
  }
}
