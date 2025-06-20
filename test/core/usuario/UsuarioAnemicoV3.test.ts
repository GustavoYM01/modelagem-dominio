import Erros from "@/core/constants/Erros";
import Usuario from "@/core/usuario/UsuarioAnemicoV3";

const usuarioValido = () =>
  new Usuario(123, "Fulano", "fulano@zzmail.com", "123456");

test("Deve permitir usuário sem nome", () => {
  const usuario: Usuario = usuarioValido();
  usuario.setNome("");
  expect(usuario.getNome()).toBe("");
});

test("Deve permitir usuário com nome undefined", () => {
  const usuario: Usuario = usuarioValido();
  usuario.setNome(undefined as any);
  expect(usuario.getNome()).toBeUndefined();
});

test("Deve permitir usuário com id negativo", () => {
  const usuario: Usuario = usuarioValido();
  usuario.setId(-300);
  expect(usuario.getId()).toBe(-300);
});

test("Deve permitir usuário com email inválido", () => {
  const usuario: Usuario = usuarioValido();
  usuario.setEmail("!@#$%");
  expect(usuario.getEmail()).toBe(usuario.getEmail());
});

test("Deve lançar erro ao tentar alterar senha com tamanho menor que 6 caracteres", () => {
  const usuario: Usuario = usuarioValido();
  expect(() => usuario.setSenha("a")).toThrow(Erros.SENHA_INVALIDA);
});

test("Deve alterar senha com senha maior ou igual a 6 caracteres", () => {
  const novaSenhaValida = "123456";
  const usuario: Usuario = usuarioValido();
  usuario.setSenha(novaSenhaValida);
  expect(usuario.getSenha()).toBe(novaSenhaValida);
});

test("Deve chamar setSenha se senha for fornecida", () => {
  const spy = jest.spyOn(Usuario.prototype, "setSenha");
  const senhaUsuario = "senhaDoUsuario"
  new Usuario(1, "lorem", "lorem@email.com", senhaUsuario);
  expect(spy).toHaveBeenCalledWith(senhaUsuario);
  spy.mockRestore();
});

test("Não deve chamar setSenha se senha for falsy", () => {
  const spy = jest.spyOn(Usuario.prototype, "setSenha");
  new Usuario(2, "lorem2", "lorem2@email.com");
  expect(spy).not.toHaveBeenCalled();
  spy.mockRestore();
});
