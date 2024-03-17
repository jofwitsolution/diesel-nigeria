import {
  OrderCreatedToAdmin,
  OrderCreatedToBuyer,
  OrderCreatedToSeller,
  OrderPaymentToAdmin,
  OrderPaymentToBuyer,
  OrderPaymentToSeller,
  OrderStatusToBuyer,
} from "@/types";
import { Resend } from "resend";
import { formatPrice } from "../utils";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;
const dieselngEmail = process.env.DIESELNG_EMAIL as string;
const dieselngAdminEmail = process.env.DIESELNG_ADMIN_EMAIL as string;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: dieselngEmail,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: dieselngEmail,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const sendNewSellerEmail = async (email: string, password: string) => {
  await resend.emails.send({
    from: dieselngEmail,
    to: email,
    subject: "Welcome to Diesel NG",
    html: `
    <h1>Welcome to Diesel Nigeria.</h1>
    <p>You can log in with your email address and the following password; </p>
    <p>${password}</p>
    <p>Please, make sure you change your password.</p>
    <p>Thank you</p>
          `,
  });
};

export const sendOrderCreatedEmailToBuyer = async ({
  email,
  amount,
  orderNumber,
  businessName,
}: OrderCreatedToBuyer) => {
  await resend.emails.send({
    from: dieselngEmail,
    to: email,
    subject: `You placed an Order ${orderNumber}`,
    html: `
    <p>Dear ${businessName},</p> <br/>
    <p>You have successfully placed an order.</p>
    <p>Order Number: ${orderNumber}</p>
    <p>Amount: ${formatPrice(Number(amount))}</p>

    <p>Kindly make payment for your order as soon as possible.</p>
    <br/>
    <p>Thank you</p>
          `,
  });
};

export const sendOrderCreatedEmailToSeller = async ({
  email,
  orderNumber,
  quantity,
  deliveryLocation,
  businessName,
}: OrderCreatedToSeller) => {
  await resend.emails.send({
    from: dieselngEmail,
    to: email,
    subject: `New order ${orderNumber} arrival.`,
    html: `
    <h1>${businessName} has placed an order ${orderNumber}</h1>
    <p>Diesel Quantity: ${quantity} litres</p>
    <p>Business Name: ${businessName}</p>
    <p>Delivery Location: ${deliveryLocation}</p>

    <p>Please visit diselng to view order information.</p>
    <br/>
    <p>Thank you</p>
          `,
  });
};

export const sendOrderCreatedEmailToAdmin = async ({
  orderNumber,
  quantity,
  businessName,
}: OrderCreatedToAdmin) => {
  await resend.emails.send({
    from: dieselngEmail,
    to: dieselngAdminEmail,
    subject: `New order ${orderNumber} arrival.`,
    html: `
    <h1>${businessName} has placed an order ${orderNumber}</h1>
    <p>Diesel Quantity: ${quantity} litres</p>

    <p>Kindly monitor the order.</p>
    <br/>
    <p>Thank you</p>
          `,
  });
};

export const sendOrderPaymentEmailToBuyer = async ({
  email,
  amount,
  reference,
  businessName,
}: OrderPaymentToBuyer) => {
  await resend.emails.send({
    from: dieselngEmail,
    to: email,
    subject: `Order Payment of ${formatPrice(Number(amount))} received`,
    html: `
    <h1>Order Payment Receipt</h1>
    <p>Amount: ${formatPrice(Number(amount))}</p>
    <p>Reference: ${reference}</p>
    <p>Business Name: ${businessName}</p>

    <p>Your order is beign processed.</p>
    <br/>
    <p>Thank you</p>
          `,
  });
};

export const sendOrderPaymentEmailToSeller = async ({
  email,
  orderNumber,
  quantity,
  deliveryLocation,
  businessName,
}: OrderPaymentToSeller) => {
  await resend.emails.send({
    from: dieselngEmail,
    to: email,
    subject: `Payment received for order ${orderNumber}.`,
    html: `
    <h1>${businessName} has paid for order ${orderNumber}</h1>
    <p>Diesel Quantity: ${quantity} litres</p>
    <p>Business Name: ${businessName}</p>
    <p>Delivery Location: ${deliveryLocation}</p>

    <p>Please visit diselng to process the order.</p>
    <br/>
    <p>Thank you</p>
          `,
  });
};

export const sendOrderPaymentEmailToAdmin = async ({
  orderNumber,
  quantity,
  businessName,
}: OrderPaymentToAdmin) => {
  await resend.emails.send({
    from: dieselngEmail,
    to: dieselngAdminEmail,
    subject: `Payment received for order ${orderNumber}.`,
    html: `
    <h1>${businessName} has paid for order ${orderNumber}</h1>
    <p>Diesel Quantity: ${quantity} litres</p>
    <p>Business Name: ${businessName}</p>

    <p>Kindly ensure the order is fulfilled.</p>
    <br/>
    <p>Thank you</p>
          `,
  });
};

export const sendOrderInProgressEmailToBuyer = async ({
  orderNumber,
  email,
  businessName,
}: OrderStatusToBuyer) => {
  await resend.emails.send({
    from: dieselngEmail,
    to: email,
    subject: `Order ${orderNumber}, in progress.`,
    html: `
    <p>Dear ${businessName}</p>
    <p>Your order is on its way.</p>

    <br/>
    <p>Thank you</p>
          `,
  });
};

export const sendOrderDeliveredEmailToBuyer = async ({
  orderNumber,
  email,
  businessName,
}: OrderStatusToBuyer) => {
  await resend.emails.send({
    from: dieselngEmail,
    to: email,
    subject: `Order ${orderNumber}, delivered.`,
    html: `
    <p>Dear ${businessName}</p>
    <p>Your order has been delivered successfuly.</p>

    <br/>
    <p>Thank you</p>
          `,
  });
};

export const sendOrderDeliveredEmailToAdmin = async ({
  orderNumber,
  businessName,
}: {
  orderNumber: string;
  businessName: string;
}) => {
  await resend.emails.send({
    from: dieselngEmail,
    to: dieselngAdminEmail,
    subject: `Order ${orderNumber}, delivered.`,
    html: `
    <p>Dear Dieselng Admin</p>
    <p>Order ${orderNumber}, submitted by ${businessName} has been delivered successfuly.</p>

    <br/>
    <p>Thank you</p>
          `,
  });
};

export const sendDocumentVerifiedEmail = async ({
  email,
  businessName,
}: {
  email: string;
  businessName: string;
}) => {
  await resend.emails.send({
    from: dieselngEmail,
    to: email,
    subject: `Successful Document Verification.`,
    html: `
    <p>Dear ${businessName}</p>
    <p>Your business document has been verified successfuly.</p>

    <br/>
    <p>Thank you</p>
          `,
  });
};

export const sendDocumentRejectedEmail = async ({
  email,
  businessName,
  description,
}: {
  email: string;
  businessName: string;
  description: string;
}) => {
  await resend.emails.send({
    from: dieselngEmail,
    to: email,
    subject: `Unsuccessful Verification.`,
    html: `
    <p>Dear ${businessName}</p>
    <p>Your business document was rejected. See the details below;</p>
    <br/>
    <p>${description}</p>
    <br/>
    <p>After log in to your dashboard, go to settings to upload a valid business document.</p>
    <br/>
    <p>Thank you</p>
          `,
  });
};
