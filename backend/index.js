require("dotenv").config();

const jwt = require("jsonwebtoken");

const socketIO = require("socket.io");
const models = require("./src/models");

const app = require("./src/app");

const port = parseInt(process.env.APP_PORT ?? "6000", 10);

const connectMessage = app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server is listening on ${port}`);
  }
});

const io = socketIO(connectMessage, {
  cors: {
    origin: [`${process.env.FRONTEND_URL ?? `http://localhost:3000`}`],
  },
});

io.on("connect", (socket) => {
  socket.on("token", (req) => {
    const authorization = req.Authorization;

    if (authorization == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization type is not 'Bearer'");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = payload.sub;

    models.message.findByIdFriendship(req).then(([rows]) => {
      socket.emit("messages", rows);
      socket.emit("myUser", req.user_id);
    });

    socket.on("newMessage", (newMessage) => {
      const Message = newMessage;
      Message.user_id = payload.sub;
      models.message.insert(Message).then(() => {
        models.message.findByIdFriendship(req).then(([rows]) => {
          io.emit("messages", rows);
        });
      });
    });
  });
});
