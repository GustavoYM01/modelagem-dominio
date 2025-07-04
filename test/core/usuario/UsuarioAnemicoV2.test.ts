import Usuario from "@/core/usuario/UsuarioAnemicoV2";

const usuarioValido = () =>
  new Usuario(123, "Fulano", "fulano@zzmail.com", "123456");

test("Deve permitir usuário sem nome", () => {
  const usuario: Usuario = usuarioValido();
  usuario.nome = "";
  expect(usuario.nome).toBe("");
});

test("Deve permitir usuário com nome undefined", () => {
  const usuario: Usuario = usuarioValido();
  usuario.nome = undefined as any;
  expect(usuario.nome).toBeUndefined();
});

test("Deve permitir usuário com id negativo", () => {
  const usuario: Usuario = usuarioValido();
  usuario.id = -300;
  expect(usuario.id).toBe(-300);
});

test("Deve permitir usuário com email inválido", () => {
  const usuario: Usuario = usuarioValido();
  usuario.email = "!@#$%";
  expect(usuario.email).toBe("!@#$%");
});

test("Deve permitir usuário com senha inválida", () => {
  const usuario: Usuario = usuarioValido();
  usuario.senha = "a";
  expect(usuario.senha).toBe("a");
});
