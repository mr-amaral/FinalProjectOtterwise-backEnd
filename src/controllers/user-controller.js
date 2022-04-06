import { prisma } from "../helpers/utils.js";

export const getByID = async (req, reply) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: { id: true, email: true, username: true, name: true },
    });
    return reply.send({ data: { user } });
  } catch (error) {
    reply.status(500).send({ error: "Erro no server!" });
  }
};

export const getByUsername = async (req, reply) => {
  const { username } = req.query;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        createdAt: true,
      },
    });
    return reply.send({ data: { user } });
  } catch (error) {
    reply.status(500).send({ error: "Erro no server!" });
  }
};
