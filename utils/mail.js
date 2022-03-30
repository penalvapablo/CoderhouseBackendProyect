import { createTransport } from 'nodemailer';
import config from '../config/index.js';

const TEST_MAIL = 'hank.mosciski52@ethereal.email';

const transporter = createTransport({
  host: config.MAIL_ETH_HOST,
  port: config.MAIL_ETH_PORT,
  auth: {
    user: config.MAIL_ETH_USER,
    pass: config.MAIL_ETH_PASS,
  },
});

export async function signUpEmail(newUser) {
  const mailOptions = {
    from: 'Tercer Entrega',
    to: TEST_MAIL,
    subject: 'nuevo registro',
    html: `<h1>Nuevo Usuario</h1>
      <p>Mail: ${newUser.email}</p>
      <p>Nombre: ${newUser.fullname}</p>
      `,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error(`Error al enviar mail de registro. ${error}`);
  }
}

export async function checkOutEMail(newOrder) {
  const mailOptions = {
    from: 'Tercer Entrega',
    to: TEST_MAIL,
    subject: `nuevo pedido de ${newOrder.userName}, ${newOrder.userEmail}`,
    html: `<h1>Pedido</h1>
      ${newOrder.products.map(
        (x) =>
          `<li>${x.product}, precio: $${x.price}, cantidad: ${x.quantity}</li>`
      )}
      `,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error(`Error al enviar mail de pedido. ${error}`);
  }
}
