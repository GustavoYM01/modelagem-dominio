import Usuario from "@/core/usuario/UsuarioAnemicoV1";

const usuarioValido: Usuario = {
  id: 123,
  nome: "Fulano",
  email: "fulano@zzmail.com",
  senha: "123456",
};

test("Deve permitir usuário sem nome", () => {
  const usuario: Usuario = { ...usuarioValido, nome: "" };
  expect(usuario.nome).toBe("");
});

test("Deve permitir usuário com id negativo", () => {
  const usuario: Usuario = { ...usuarioValido, id: -300 };
  expect(usuario.id).toBe(-300);
});

test("Deve permitir usuário com email inválido", () => {
  const usuario: Usuario = { ...usuarioValido, email: "!@#$%" };
  expect(usuario.email).toBe("!@#$%");
});

test("Deve permitir usuário com senha inválida", () => {
  const usuario: Usuario = { ...usuarioValido, senha: "a" };
  expect(usuario.senha).toBe("a");
});
