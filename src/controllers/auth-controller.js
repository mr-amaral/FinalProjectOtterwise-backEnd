import {
  comparePassword,
  createAccessToken,
  hashPassword,
  prisma,
} from "../helpers/utils.js";

export const signup = async (req, reply) => {
  const { email, password: pass, username, name } = req.body;

  try {
    const password = await hashPassword(pass);

    const alreadyHas = await prisma.user.findMany({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (alreadyHas.length > 0) {
      reply.status(400).send(`Nome de usuario ou email já existente`);
    } else {
      const { password: hashedPassword, ...user } = await prisma.user.create({
        data: {
          email,
          password,
          username,
          name,
        },
      });
      reply.send(user);
    }
  } catch (error) {
    console.log(error);
    reply.status(400).send({ error: `Erro ao carregar!` });
  }
};

export const login = async (req, reply) => {
  try {
    const { email, password } = req.body;
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return reply.status(401).send({ error: "Email ou senha invalida" });
    }

    if (!(await comparePassword(password, user.password))) {
      return reply.status(401).send({ error: "Email ou senha invalida" });
    }

    let { password: pass, ...data } = user;
    return reply.send({
      user: data,
      accessToken: await createAccessToken(data),
    });
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error: "Server error!" });
  }
};
